// Motor de sincronizacion y concurrencia extraido desde app.js (Etapa 12)
// Mantener JavaScript clasico, sin modulos.

let firebaseSaveTimeout = null;
// Traba de seguridad: recién permitimos subir a la nube DESPUÉS de haberla leído
// una vez. Evita que una copia vieja/vacía pise la versión buena al abrir la página.
let cloudSynced = false;
let lastSeenRev = 0; // versión más nueva que vimos de la nube (guard anti-pisado)

// ============================================================
//  FUSIÓN DE CAMBIOS (v6-merge)  ← corrige la pérdida de datos
// ------------------------------------------------------------
//  ANTES: cuando llegaba un cambio de otra usuaria, se hacía  state = incoming,
//  es decir se PISABA todo el estado local. Si vos habías tocado algo en los
//  últimos segundos y todavía no había subido (hay 600 ms de espera antes de
//  subir, y se reinician con cada tecla), tu cambio se borraba de la memoria y
//  después se volvía a subir la copia ajena. Ese es el "lo puse y ya no está".
//
//  AHORA: se guarda una foto (baseState) de lo último que sabemos que está en la
//  nube. Cuando llega un cambio remoto se hace una fusión de tres vías:
//     base  = lo que había en la nube
//     mío   = lo que tengo en pantalla (con mis cambios sin subir)
//     ajeno = lo que acaba de llegar
//  Campo por campo: si sólo yo lo cambié, gana el mío; si sólo lo cambió la otra,
//  gana el suyo; si ninguno lo tocó, queda igual. Nadie pisa a nadie.
// ============================================================
const WM_VER = 'v8.3';
const WM_SID = Math.random().toString(36).slice(2, 8); // id de ESTA pestaña
let _lastCloudMeta = {};    // metadatos de la última escritura que llegó de la nube
let _legacyWarned = false;
let baseState = null;       // foto de lo último confirmado en la nube
let _mergeConflicts = 0;    // contador informativo de choques en el mismo campo
let _conflictLog = [];      // choques de la fusión en curso (ruta + valor mío + valor ajeno)
let _lastCloudAuthor = '';  // quién hizo la última escritura que llegó de la nube

function _clone(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
function _isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
function _eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

// Clave estable de un elemento de lista (para fusionar filas/clientes/notas por id
// y no por posición, que es lo que hacía que se "corrieran" los datos).
function _itemKey(x) {
  if (!_isObj(x)) return null;
  if (x.id != null) return 'id:' + x.id;
  if (x.__key != null) return 'k:' + x.__key;
  if (x.key != null) return 'key:' + x.key;
  return null;
}
function _keyedList(arr) {
  return Array.isArray(arr) && arr.length > 0 && arr.every(x => _itemKey(x) !== null);
}

// Fusión de tres vías. Devuelve el valor resultante.
// `path` es la ruta del campo (para poder avisar de un choque y ofrecer deshacerlo).
function merge3(base, mine, theirs, path) {
  path = path || [];
  // Mi valor y el de la nube ya son iguales: no hay nada que fusionar ni que avisar.
  // (Pasaba todo el tiempo con un solo usuario: al guardar, el eco de Firebase llega
  //  ANTES de que se actualice la base, así que base=viejo pero mío=ajeno=nuevo. Sin
  //  esta comprobación se tomaba como "choque" y salía el cartel contra vos misma.)
  if (_eq(mine, theirs)) return _clone(mine);
  // Sin cambios locales respecto de la base → la nube manda (caso más común).
  if (_eq(mine, base)) return _clone(theirs);
  // Sin cambios remotos → mando yo.
  if (_eq(theirs, base)) return _clone(mine);

  // Listas con id estable: fusionar elemento por elemento.
  if (Array.isArray(mine) && Array.isArray(theirs) &&
      _keyedList(mine) && _keyedList(theirs) && (base == null || _keyedList(base) || (Array.isArray(base) && base.length === 0))) {
    const bMap = new Map(), mMap = new Map(), tMap = new Map();
    (Array.isArray(base) ? base : []).forEach(x => bMap.set(_itemKey(x), x));
    mine.forEach((x, i) => mMap.set(_itemKey(x), { v: x, i }));
    theirs.forEach((x, i) => tMap.set(_itemKey(x), { v: x, i }));

    const out = [];
    // 1) Recorremos el orden de la nube.
    theirs.forEach(tItem => {
      const k = _itemKey(tItem);
      const inBase = bMap.has(k), m = mMap.get(k);
      if (!m) {
        // Yo no lo tengo. Si estaba en la base, es que YO lo borré → respetar el borrado.
        if (inBase) return;
        out.push(_clone(tItem)); // alta ajena → entra
        return;
      }
      out.push(merge3(inBase ? bMap.get(k) : undefined, m.v, tItem, path.concat([{ t:'item', k:k }])));
    });
    // 2) Altas mías que la nube todavía no tiene, y elementos que la otra borró
    //    pero yo modifiqué (ante la duda, NO se pierde: se conserva).
    mine.forEach((mItem, i) => {
      const k = _itemKey(mItem);
      if (tMap.has(k)) return;
      const inBase = bMap.has(k);
      if (inBase && _eq(bMap.get(k), mItem)) return; // borrado ajeno, yo no lo toqué → respetar
      const at = Math.min(i, out.length);
      out.splice(at, 0, _clone(mItem));
    });
    return out;
  }

  // Objetos: fusionar clave por clave.
  if (_isObj(mine) && _isObj(theirs)) {
    const b = _isObj(base) ? base : {};
    const out = {};
    const keys = new Set([...Object.keys(mine), ...Object.keys(theirs)]);
    keys.forEach(k => {
      const inB = Object.prototype.hasOwnProperty.call(b, k);
      const inM = Object.prototype.hasOwnProperty.call(mine, k);
      const inT = Object.prototype.hasOwnProperty.call(theirs, k);
      if (inM && inT) { out[k] = merge3(inB ? b[k] : undefined, mine[k], theirs[k], path.concat([{ t:'key', k:k }])); return; }
      if (inM && !inT) { // la otra lo borró
        if (inB && _eq(b[k], mine[k])) return;   // yo no lo toqué → respetar borrado
        out[k] = _clone(mine[k]); return;        // yo lo cambié → conservar
      }
      if (!inM && inT) { // yo lo borré
        if (inB) return;                          // borrado mío → respetar
        out[k] = _clone(theirs[k]); return;       // alta ajena → entra
      }
    });
    return out;
  }

  // Valor simple que cambiaron los dos (mismo campo, misma ventana de tiempo).
  // Gana el local: es la usuaria que está trabajando ahora y su cambio se sube
  // enseguida; la otra lo verá al instante.
  _mergeConflicts++;
  _conflictLog.push({ path: path, mine: _clone(mine), theirs: _clone(theirs) });
  return _clone(mine);
}

// ============================================================
//  AVISO DE CHOQUE (v7-conflictos)
//  Si dos personas tocan EXACTAMENTE el mismo campo en el mismo momento, un campo
//  no puede tener dos valores: queda el tuyo (sos quien está trabajando ahora).
//  Pero ya no pasa en silencio: se muestra qué puso la otra y podés aplicarlo.
// ============================================================
function _cEsc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
  });
}

// Camina el estado siguiendo una ruta. devuelve {parent, key} del último tramo.
function _pathResolve(root, path) {
  let cur = root;
  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i];
    if (cur == null) return null;
    if (seg.t === 'key') cur = cur[seg.k];
    else cur = Array.isArray(cur) ? cur.find(x => _itemKey(x) === seg.k) : null;
  }
  if (cur == null || !path.length) return null;
  const last = path[path.length - 1];
  if (last.t === 'key') return { parent: cur, key: last.k, isItem: false };
  if (!Array.isArray(cur)) return null;
  const idx = cur.findIndex(x => _itemKey(x) === last.k);
  return idx < 0 ? null : { parent: cur, key: idx, isItem: true };
}

const _PATH_LABELS = {
  tabs:'Pestaña', rows:'Fila', cells:'Celda', folders:'Carpeta', clientes:'Cliente',
  clients:'Cliente', cols:'Columna', blocks:'Bloque', block:'Bloque',
  studioStickyNotes:'Nota del estudio', userDashboards:'Tablero', tasks:'Tarea',
  honorarios:'Honorarios', branding:'Marca', users:'Usuario', meses:'Mes', months:'Mes'
};
function _itemLabel(root, path, upto) {
  // Busca un nombre legible del elemento al que apunta el tramo `upto`.
  let cur = root;
  for (let i = 0; i <= upto; i++) {
    const seg = path[i];
    if (cur == null) return null;
    if (seg.t === 'key') cur = cur[seg.k];
    else cur = Array.isArray(cur) ? cur.find(x => _itemKey(x) === seg.k) : null;
  }
  if (!_isObj(cur)) return null;
  return cur.name || cur.title || cur.c_cliente || cur.label || cur.nombre || null;
}
// Códigos internos de una celda → nombre entendible.
const _CELL_FIELDS = { s:'Estado', d:'Fecha', c:'Comentario', t:'Etiqueta',
  cs:'Estado del comentario', es:'Enviado al cliente', ed:'Fecha de envío' };

function _describePath(root, path) {
  const parts = [];
  let cur = root;
  let colsHolder = null; // último objeto visto que define columnas

  for (let i = 0; i < path.length; i++) {
    const seg = path[i];

    // Caso especial: cells › <índice de columna> › <campo interno>
    if (seg.t === 'key' && seg.k === 'cells' && path[i + 1] && path[i + 1].t === 'key') {
      const ci = parseInt(path[i + 1].k, 10);
      let colName = null;
      if (colsHolder && Array.isArray(colsHolder.cols) && colsHolder.cols[ci]) {
        colName = colsHolder.cols[ci].label || colsHolder.cols[ci].name || null;
      }
      parts.push(colName ? ('Columna \u201c' + colName + '\u201d') : ('Columna ' + (isNaN(ci) ? path[i + 1].k : ci + 1)));
      const fseg = path[i + 2];
      if (fseg && fseg.t === 'key') parts.push(_CELL_FIELDS[fseg.k] || fseg.k);
      return parts.join(' \u203a ');
    }

    // Avanzamos por el estado para poder leer nombres y definiciones de columna.
    if (cur != null) {
      if (seg.t === 'key') cur = cur[seg.k];
      else cur = Array.isArray(cur) ? cur.find(x => _itemKey(x) === seg.k) : null;
      if (_isObj(cur) && Array.isArray(cur.cols)) colsHolder = cur;
    }

    if (seg.t === 'key') {
      if (_PATH_LABELS[seg.k]) parts.push(_PATH_LABELS[seg.k]);
      else if (/^c_/.test(seg.k)) {
        let lbl = null;
        if (colsHolder && Array.isArray(colsHolder.cols)) {
          const cd = colsHolder.cols.find(x => x && x.key === seg.k);
          if (cd) lbl = cd.label || cd.name;
        }
        parts.push(lbl || seg.k.replace(/^c_/, ''));
      }
      else if (!/^(__|_)/.test(seg.k)) parts.push(seg.k);
    } else {
      const lbl = _itemLabel(root, path, i);
      if (lbl) { if (parts.length) parts[parts.length - 1] += ' \u201c' + lbl + '\u201d'; else parts.push('\u201c' + lbl + '\u201d'); }
    }
  }
  return parts.length ? parts.join(' \u203a ') : 'un campo';
}
function _fmtVal(v) {
  if (v === true) return 'Sí';
  if (v === false) return 'No';
  if (v === '' || v == null) return '(vacío)';
  if (typeof v === 'object') { const t = JSON.stringify(v); return t.length > 90 ? t.slice(0, 90) + '…' : t; }
  return String(v);
}

function queueConflicts(list, author) {
  // A pedido del estudio: NO se muestra ningún cartel. Si dos personas cambian el
  // mismo campo en el mismo instante, queda el valor local y no se interrumpe a nadie.
  // Queda rastro solo en la consola del navegador (F12) por si alguna vez hay que mirar.
  if (!list || !list.length) return;
  list = list.filter(function(c) { return !_eq(c.mine, c.theirs); });
  if (!list.length) return;
  try {
    console.info('[WM] ' + list.length + ' campo(s) cambiados a la vez' +
      (author ? ' (junto con ' + author + ')' : '') + '. Quedó el valor local:',
      list.map(function(c) {
        return { campo: _describePath(state, c.path), local: c.mine, remoto: c.theirs };
      }));
  } catch(e) {}
}

const WM_SAFE = /[?&]safe=1/.test(location.search); // modo seguro: no escribe nada

let _emptyCloudTries = 0;
function looksSubstantial(st) {
  try {
    const c = stateCounts(st);
    return (c.cl > 0 || c.rows > 0);
  } catch(e) { return false; }
}
function handleEmptyCloud() {
  _emptyCloudTries++;
  console.warn('[WM] La nube vino vacía (intento ' + _emptyCloudTries + '). NO se sube nada automáticamente.');
  showSyncIndicator('\ud83d\udfe1 Verificando la nube\u2026');

  // Reintentar: casi siempre es un hipo momentáneo y a la segunda lectura ya viene bien.
  if (_emptyCloudTries <= 3) {
    setTimeout(function() {
      if (!firebaseDB) return;
      firebaseDB.ref('wm_app_v2').once('value').then(function(snap) {
        const d = snap.val();
        if (d) { _emptyCloudTries = 0; return; } // el listener se encarga
        handleEmptyCloud();
      }).catch(function() { handleEmptyCloud(); });
    }, 1500 * _emptyCloudTries);
    return;
  }

  // Después de 4 lecturas seguidas vacías: no subimos nada por las dudas.
  logWriteEvent({ tipo: 'NUBE_VACIA', motivo: 'la base vino sin datos', counts: stateCounts(state) });
  if (!looksSubstantial(state)) {
    // Esta pestaña tampoco tiene datos: subir sería escribir la plantilla en blanco
    // encima de todo. Jamás.
    cloudSynced = false;
    showSyncIndicator('\ud83d\udd34 Sin datos \u2014 no se guarda');
    try {
      const b = document.createElement('div');
      b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#a33;color:#fff;' +
        'font-size:13px;padding:12px 16px;text-align:center;';
      b.innerHTML = '\ud83d\uded1 <b>La base vino vac\u00eda y esta pesta\u00f1a tampoco tiene datos.</b> ' +
        'Para no borrar nada, se desactiv\u00f3 el guardado. Cerr\u00e1 esta pesta\u00f1a y avis\u00e1 \u2014 hay que restaurar desde un respaldo.';
      document.body.appendChild(b);
    } catch(e) {}
    return;
  }
  // Tenemos datos locales y la nube está realmente vacía: preguntar antes de subir.
  if (confirm('La base en la nube figura VACÍA.\n\nEsta pestaña sí tiene datos (' +
      stateCounts(state).cl + ' clientes, ' + stateCounts(state).rows + ' filas).\n\n' +
      '¿Querés subir estos datos a la nube?\n\n' +
      'Si no estás segura, cancelá y avisá antes de tocar nada.')) {
    cloudSynced = true;
    saveState();
  } else {
    cloudSynced = false;
    showSyncIndicator('\ud83d\udd34 Guardado desactivado');
  }
}

function stateCounts(st) {
  let cl = 0, rows = 0;
  try {
    cl = (st.clientes || []).length;
    (st.tabs || []).forEach(t => { if (Array.isArray(t.rows)) rows += t.rows.length; });
  } catch(e) {}
  return { cl: cl, rows: rows };
}

// ============================================================
//  DIAGNÓSTICO DE ESCRITURAS (v8.3)
//  Cada pestaña anota en la nube qué subió, cuándo y con qué versión. Sirve para
//  ver quién está pisando datos cuando algo "se revierte solo".
//  Vive en el nodo wm_writes: NO toca los datos del estudio.
// ============================================================
const WM_WRITES_REF = 'wm_writes';
const WM_WRITES_MAX = 200;

function logWriteEvent(info) {
  if (!firebaseDB || WM_SNAPSHOT) return;
  try {
    const me = (function(){ try { const u = currentUser(); return (u && u.name) || '?'; } catch(e) { return '?'; } })();
    firebaseDB.ref(WM_WRITES_REF).push(Object.assign({
      at: Date.now(), by: me, ver: WM_VER, sid: WM_SID
    }, info || {}));
  } catch(e) {}
}
function pruneWriteLog() {
  if (!firebaseDB) return;
  try {
    firebaseDB.ref(WM_WRITES_REF).once('value').then(function(snap) {
      const v = snap.val() || {};
      const keys = Object.keys(v);
      if (keys.length <= WM_WRITES_MAX) return;
      keys.sort(function(a, b) { return (v[a].at || 0) - (v[b].at || 0); });
      keys.slice(0, keys.length - WM_WRITES_MAX).forEach(function(k) {
        firebaseDB.ref(WM_WRITES_REF + '/' + k).remove();
      });
    });
  } catch(e) {}
}

function warnLegacyTab() {
  if (_legacyWarned) return;
  _legacyWarned = true;
  try {
    const b = document.createElement('div');
    b.id = 'wm-legacy-warn';
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#a33;color:#fff;' +
      'font-size:13px;padding:12px 16px;text-align:center;box-shadow:0 -2px 12px rgba(0,0,0,.3);';
    b.innerHTML = '\u26a0\ufe0f <b>Lleg\u00f3 un cambio sin firma.</b> Puede ser una restauraci\u00f3n (normal) o una pesta\u00f1a con la versi\u00f3n vieja. ' +
      'Si NO acabas de restaurar: cerr\u00e1 las dem\u00e1s pesta\u00f1as y ventanas (revis\u00e1 tambi\u00e9n otros navegadores) y mir\u00e1 que arriba diga ' + WM_VER + '. ' +
      '<button onclick="this.parentNode.remove()" style="margin-left:10px;background:#fff;color:#a33;border:none;padding:3px 10px;border-radius:3px;cursor:pointer;">Entendido</button>';
    document.body.appendChild(b);
  } catch(e) {}
}

function mergeIncomingState(incoming, doRender) {
  // ===== ESCUDO CONTRA PESTAÑAS VIEJAS (v8.3) =====
  // Toda versión de la app desde v7 firma sus escrituras con la hora (_at). Si llega
  // algo SIN firma, lo escribió una pestaña con código anterior al arreglo: esa pestaña
  // sube su copia entera y vieja. NO la adoptamos: volvemos a subir lo nuestro y avisamos.
  // IMPORTANTE: sólo AVISA, no pelea. La versión anterior re-subía el estado local,
  // y eso deshacía las restauraciones hechas con reparar-nube.html (que escribe sin
  // firma). Una restauración legítima siempre tiene que poder entrar.
  if (baseState !== null && !(_lastCloudMeta && _lastCloudMeta.at)) {
    console.warn('[WM] Escritura sin firma: puede ser una pestaña vieja o una restauración.');
    logWriteEvent({ tipo: 'SIN_FIRMA', motivo: 'pestaña vieja o restauración', counts: stateCounts(incoming) });
    warnLegacyTab();
  }
  // Aviso si la escritura que llegó achica los datos (menos clientes o menos filas).
  try {
    if (baseState !== null) {
      const a = stateCounts(baseState), b = stateCounts(incoming);
      if (b.cl < a.cl || b.rows < a.rows) {
        console.warn('[WM] La escritura recibida trae MENOS datos', { antes: a, ahora: b, de: _lastCloudMeta });
        logWriteEvent({ tipo: 'ACHICA', motivo: 'llegaron menos datos que los que había', counts: b, antes: a });
      }
    }
  } catch(e) {}

  // Fusión de tres vías: base (nube) + mío (pantalla) + ajeno (lo que llegó).
  _conflictLog = [];
  // ===== PRIMERA LECTURA DE LA SESIÓN (arreglado en v8.6) =====
  // Lo que hay en localStorage al abrir NO son "cambios sin guardar": es una foto
  // vieja de la sesión anterior. Antes se la trataba como cambios locales y la
  // fusión la devolvía entera, así que la pestaña recién abierta subía su copia
  // vieja y revertía lo que las demás habían hecho (Daiana y Luis volviendo a
  // Pendiente con las notas viejas apenas se conectaba otra usuaria).
  // Al conectarse, la nube manda. Punto.
  if (baseState === null) {
    baseState = _clone(incoming);
    state = _clone(incoming);
    if (!state.tabs || !state.branding) state = buildInitState();
    try { localStorage.setItem('wm_app_v2', JSON.stringify(state)); } catch(e) {}
    let mig = false;
    try { mig = ensureNewStructures(); } catch(e) { console.warn('migraciones', e); }
    if (doRender) { applyBranding(); renderTabs(); renderContent(); }
    logWriteEvent({ tipo: 'ADOPTA_NUBE', motivo: 'primera lectura de la sesión', counts: stateCounts(incoming) });
    if (mig) saveState(); else showSyncIndicator('\ud83d\udfe2 Sincronizado');
    return;
  }

  const merged = merge3(baseState, state, incoming, []);
  const iHadChanges = !_eq(merged, incoming); // tengo cosas que la nube todavía no tiene
  const changedOnScreen = !_eq(merged, state);

  baseState = _clone(incoming); // la nube quedó en esta versión
  if (changedOnScreen) {
    state = merged;
    if (!state.tabs || !state.branding) state = buildInitState();
    try { localStorage.setItem('wm_app_v2', JSON.stringify(state)); } catch(e) {}
  }

  // Migraciones (pestañas/campos nuevos) después de traer de la nube.
  let migrated = false;
  try { migrated = ensureNewStructures(); } catch(e) { console.warn('migraciones', e); }

  if (doRender && (changedOnScreen || migrated)) {
    applyBranding();
    renderTabs();
    renderContent();
  }
  // Si la fusión conservó cambios míos que la nube no tiene, hay que subirlos.
  if (iHadChanges || migrated) saveState();
  else showSyncIndicator('\ud83d\udfe2 Sincronizado');

  // Choques en el mismo campo: avisar (nunca en silencio).
  if (_conflictLog.length) { queueConflicts(_conflictLog, _lastCloudAuthor); _conflictLog = []; }
}

// Compatibilidad: alguna parte vieja del código puede seguir llamando a esta función.
function applyIncomingState(incoming) { mergeIncomingState(incoming, true); }

// ¿Este archivo es una copia descargada (con datos incrustados)?

function saveState() {
  // Ensure per-user fields are not in shared state
  stripViewStateFromShared();
  // Modo copia: no tocar el almacenamiento del navegador ni la nube.
  if (WM_SNAPSHOT) return;
  localStorage.setItem('wm_app_v2', JSON.stringify(state));
  // Guardar en Firebase con un pequeño delay para no saturar.
  // Solo subimos si YA leímos la nube al menos una vez (cloudSynced), para que
  // una copia vieja/vacía recién abierta no pueda pisar la versión buena.
  if (firebaseDB && cloudSynced && !WM_SAFE) {
    clearTimeout(firebaseSaveTimeout);
    firebaseSaveTimeout = setTimeout(function() {
      showSyncIndicator('\u23f3 Guardando...');
      var snapshotOfWhatWeSend = _clone(state); // para saber qué quedó confirmado
      firebaseDB.ref('wm_app_v2').transaction(function(current) {
        // GUARD ANTI-PISADO: nunca sobreescribir una versión más nueva que la última que vimos.
        var curRev = 0;
        if (current != null) {
          try {
            var parsed = typeof current === 'string' ? JSON.parse(current) : current;
            curRev = (parsed && parsed._rev) || 0;
          } catch(e) { curRev = 0; }
          if (curRev > lastSeenRev) {
            // La nube tiene cambios más nuevos que esta pestaña no vio: abortar para no
            // pisarlos. El listener los va a traer y fusionar, y desde ahí se reintenta.
            return; // aborta la transacción
          }
        }
        var newRev = Math.max(curRev, lastSeenRev) + 1;
        var _me = '';
        try { var _u = currentUser(); _me = (_u && _u.name) || ''; } catch(e) {}
        var toWrite = Object.assign({}, state, { _rev: newRev, _by: _me, _at: Date.now(), _ver: WM_VER, _sid: WM_SID });
        snapshotOfWhatWeSend = _clone(state);
        return JSON.stringify(toWrite);
      }, function(error, committed, snapshot) {
        if (error) {
          showSyncIndicator('\ud83d\udd34 Error al guardar \u2014 reintentando');
          setTimeout(saveState, 2500); // no perder el cambio por un corte de red
          return;
        }
        if (!committed) {
          // Se abortó porque la nube tenía algo más nuevo. El listener ya va a fusionar
          // esa versión con la nuestra; reintentamos para que nuestros cambios suban.
          showSyncIndicator('\ud83d\udfe1 Otra sesión ten\u00eda cambios \u2014 fusionando');
          setTimeout(saveState, 900);
          return;
        }
        try {
          var v = snapshot && snapshot.val();
          var p = typeof v === 'string' ? JSON.parse(v) : v;
          if (p && p._rev) lastSeenRev = p._rev;
        } catch(e) {}
        // Lo que acabamos de subir es ahora la base confirmada de la nube.
        baseState = snapshotOfWhatWeSend;
        try {
          logWriteEvent({ tipo: 'OK', counts: stateCounts(snapshotOfWhatWeSend) });
          if (Math.random() < 0.05) pruneWriteLog();
        } catch(e) {}
        showSyncIndicator('\ud83d\udfe2 Guardado');
      }, false); // applyLocally=false: no re-disparar el render local con datos crudos
    }, 600);
  }
}
