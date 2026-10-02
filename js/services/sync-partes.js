/*
 * GUARDADO POR PARTES (oct. 2026) — «datos separados por documento», regla de Wydan.
 *
 * Antes todo el estudio era UN texto en wm_app_v2 (~1,3 MB): cada tilde subía el texto entero y la
 * base se lo mandaba entero a cada pantalla abierta. Con 3 usuarias, el plan gratis (10 GB de
 * descargas por mes) se iba a agotar a mitad de mes.
 *
 * Ahora cada sección es su propio texto en wm_v3/p/<clave>:
 *   - una clave por pestaña (tab~<id>) y el orden de las pestañas (tabs);
 *   - un mes de Sueldos por clave (sueldos~AAAA-MM);
 *   - avisos y paneles de cada usuaria (userNotifications~<nombre>, userDashboards~<nombre>);
 *   - el historial de cambios por día (auditLog~AAAA-MM-DD);
 *   - el resto, una clave por cada dato de primer nivel (clientes, branding, finanzas…).
 * Un cambio sube y baja solo las claves que cambiaron.
 *
 * Lo que NO cambia: en la pantalla sigue habiendo un único `state`, y la fusión entre sesiones es la
 * misma de siempre (mergeIncomingState / merge3 de sync.js). Cada clave lleva su propia versión
 * (r): si la nube tiene una más nueva que la que vio esta pestaña, no se pisa: se espera, se fusiona
 * y se reintenta (lo mismo que hacía _rev con el texto entero).
 *
 * Paso inicial (una sola vez): si wm_v3 está vacío, la primera sesión que entra copia wm_app_v2
 * partido en claves. wm_app_v2 queda como estaba (copia de seguridad del momento del cambio).
 */
const WM_V3 = 'wm_v3';
const WM_V3_P = WM_V3 + '/p';
const PARTES_POR_CLAVE = ['sueldos', 'userNotifications', 'userDashboards', 'branding'];   // objeto → una parte por clave (branding: el logo pesa ~0,5 MB y cambia casi nunca)
const PARTES_META = ['_rev', '_by', '_at', '_ver', '_sid', '_movido', '_movidoAt'];
const PARTE_DIVIDIDA = '__dividido__';

let _baseP = null;          // clave → texto canónico de lo último confirmado en la nube
let _revP = {};             // clave → versión (r) más nueva que vio esta pestaña
let _ultimoSnapP = null;    // último {claveCodificada: texto} recibido
let _cacheP = {};           // claveCodificada → { s: texto, o: objeto ya leído }

function _encP(k) { return encodeURIComponent(k).replace(/\./g, '%2E'); }
function _decP(k) { try { return decodeURIComponent(k); } catch (e) { return k; } }
// Texto con las claves ordenadas: dos objetos iguales dan el mismo texto aunque el orden sea otro.
function _estable(v) {
  if (v === undefined) return undefined;
  return JSON.stringify(v, function (k, x) {
    if (x && typeof x === 'object' && !Array.isArray(x)) { const o = {}; Object.keys(x).sort().forEach(z => { o[z] = x[z]; }); return o; }
    return x;
  });
}
function _diaAudit(e) {
  const d = new Date((e && e.at) || 0);
  return isNaN(d) ? '0000-00-00' : d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// El estado completo → { clave: dato }
function partesDe(st) {
  const p = {};
  Object.keys(st || {}).forEach(k => {
    if (PARTES_META.includes(k)) return;
    const v = st[k];
    if (k === 'tabs' && Array.isArray(v) && v.every(t => t && t.id != null)) {
      p.tabs = v.map(t => t.id);
      v.forEach(t => { p['tab~' + t.id] = t; });
    } else if (PARTES_POR_CLAVE.includes(k) && v && typeof v === 'object' && !Array.isArray(v)) {
      p[k] = PARTE_DIVIDIDA;
      Object.keys(v).forEach(s => { p[k + '~' + s] = v[s]; });
    } else if (k === 'auditLog' && Array.isArray(v)) {
      p[k] = PARTE_DIVIDIDA;
      v.forEach(e => { const c = k + '~' + _diaAudit(e); (p[c] = p[c] || []).push(e); });
    } else p[k] = v;
  });
  return p;
}
// { clave: dato } → el estado completo
function estadoDesde(p) {
  const st = {}, tabsSueltas = {};
  Object.keys(p).sort().forEach(c => {
    const i = c.indexOf('~');
    if (i < 0) { if (c !== 'tabs' && p[c] !== PARTE_DIVIDIDA) st[c] = p[c]; else if (p[c] === PARTE_DIVIDIDA && !st[c]) st[c] = c === 'auditLog' ? [] : {}; return; }
    const k = c.slice(0, i), s = c.slice(i + 1);
    if (k === 'tab') tabsSueltas[s] = p[c];
    else if (k === 'auditLog') { if (!Array.isArray(st.auditLog)) st.auditLog = []; st.auditLog = st.auditLog.concat(p[c] || []); }
    else { if (!st[k] || typeof st[k] !== 'object' || Array.isArray(st[k])) st[k] = {}; st[k][s] = p[c]; }
  });
  if (Array.isArray(p.tabs)) {
    st.tabs = p.tabs.map(id => tabsSueltas[id]).filter(Boolean);
    Object.keys(tabsSueltas).forEach(id => { if (!p.tabs.includes(id)) st.tabs.push(tabsSueltas[id]); });
  }
  if (Array.isArray(st.auditLog)) st.auditLog.sort((a, b) => ((a && a.at) || 0) - ((b && b.at) || 0));
  return st;
}
function _basePDe(st) { const p = partesDe(st), o = {}; Object.keys(p).forEach(k => { o[k] = _estable(p[k]); }); return o; }

/* ===== Lo que llega de la nube ===== */
function _leerSnapP(val) {
  const partes = {};
  let meta = { by: '', at: 0, ver: '', sid: '' };
  Object.keys(val || {}).forEach(ck => {
    const s = val[ck];
    let o = _cacheP[ck];
    if (!o || o.s !== s) { try { o = { s, o: JSON.parse(s) }; } catch (e) { o = { s, o: null }; } _cacheP[ck] = o; }
    if (!o.o) return;
    const k = _decP(ck);
    partes[k] = o.o.d;
    const r = o.o.r || 0;
    if (r > (_revP[k] || 0)) _revP[k] = r;
    if ((o.o.at || 0) > meta.at) meta = { by: o.o.by || '', at: o.o.at || 0, ver: o.o.ver || '', sid: o.o.sid || '' };
  });
  return { partes, meta };
}
function _aplicarSnapP(val, doRender) {
  const { partes, meta } = _leerSnapP(val);
  const incoming = estadoDesde(partes);
  cloudSynced = true;
  _lastCloudAuthor = meta.by;
  _lastCloudMeta = meta;
  ['activeTabId', 'editMode', 'monthFilters', 'dashMonth'].forEach(k => { if (k in incoming) delete incoming[k]; });
  if (incoming.tabs) incoming.tabs.forEach(t => { if (t && 'layout' in t) delete t.layout; });
  // La base (lo que hay en la nube) se fija ANTES de fusionar: si la fusión deja cambios míos, el
  // guardado que se agenda los compara contra esto.
  _baseP = {}; Object.keys(partes).forEach(k => { _baseP[k] = _estable(partes[k]); });
  if (isEditingSticky()) {
    mergeIncomingState(incoming, false);
    _pendingRemoteRender = true;
    showSyncIndicator('✏️ Escribiendo — se actualiza al salir');
    return;
  }
  mergeIncomingState(incoming, doRender !== false);
}

/* ===== El paso inicial: wm_app_v2 (un texto) → wm_v3 (por partes) ===== */
let _migrandoP = false;
function _migrarAPartes() {
  if (_migrandoP) return; _migrandoP = true;
  showSyncIndicator('🟡 Preparando el guardado por secciones…');
  firebaseDB.ref('wm_app_v2').once('value').then(snap => {
    const v = snap.val();
    if (!v) { _migrandoP = false; if (!_baseP) _baseP = {}; handleEmptyCloud(); return; }
    const viejo = typeof v === 'string' ? JSON.parse(v) : v;
    const p = partesDe(viejo), obj = {}, ahora = Date.now();
    let yo = ''; try { const u = currentUser(); yo = (u && u.name) || ''; } catch (e) {}
    Object.keys(p).forEach(k => { obj[_encP(k)] = JSON.stringify({ r: 1, by: yo, at: ahora, ver: WM_VER, sid: WM_SID, d: p[k] }); });
    // Atómico: si otra sesión ya lo hizo, no se pisa.
    return firebaseDB.ref(WM_V3_P).transaction(cur => (cur ? undefined : obj), (err, ok) => {
      _migrandoP = false;
      if (err) { showSyncIndicator('🔴 No se pudo preparar el guardado — reintentando'); setTimeout(_migrarAPartes, 3000); return; }
      if (ok) {
        firebaseDB.ref(WM_V3 + '/meta').set({ desde: 'wm_app_v2', revViejo: viejo._rev || 0, por: yo, at: ahora, ver: WM_VER });
        logWriteEvent({ tipo: 'PASO_A_PARTES', motivo: Object.keys(obj).length + ' partes', counts: stateCounts(viejo) });
        // Las pestañas con la versión vieja escuchan wm_app_v2: se les manda el mismo contenido SIN firma
        // (_at), y eso les muestra el cartel rojo «cerrá las demás pestañas» (warnLegacyTab). Desde acá,
        // lo que guarde una pestaña vieja ya no llega a la página nueva.
        const aviso = Object.assign({}, viejo, { _movido: 'wm_v3', _movidoAt: ahora });
        delete aviso._at; delete aviso._by; delete aviso._sid;
        firebaseDB.ref('wm_app_v2').set(JSON.stringify(aviso)).catch(() => {});
      }
    }, false);
  }).catch(e => { _migrandoP = false; console.warn('paso a partes', e); setTimeout(_migrarAPartes, 3000); });
}

/* ===== Escuchar la nube (reemplaza al listener de wm_app_v2) ===== */
function wmEscucharPartes() {
  firebaseDB.ref(WM_V3_P).on('value', function (snapshot) {
    const val = snapshot.val();
    _ultimoSnapP = val;
    if (!val || !Object.keys(val).length) { _migrarAPartes(); return; }
    _aplicarSnapP(val, true);
  });
  // Pestaña que estuvo dormida: al volver, se fusiona lo último que llegó (sin bajar nada de nuevo).
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible' || !_ultimoSnapP) return;
    _aplicarSnapP(_ultimoSnapP, !isEditingSticky());
  });
}

/* ===== Guardar: solo las partes que cambiaron ===== */
function _subirPartes() {
  if (!_baseP) return;
  const mias = partesDe(state), cambios = [];
  const misTextos = {};
  Object.keys(mias).forEach(k => { misTextos[k] = _estable(mias[k]); if (misTextos[k] !== _baseP[k]) cambios.push(k); });
  Object.keys(_baseP).forEach(k => { if (!(k in mias)) cambios.push(k); });
  if (!cambios.length) { showSyncIndicator('🟢 Guardado'); return; }
  showSyncIndicator('⏳ Guardando...');
  let yo = ''; try { const u = currentUser(); yo = (u && u.name) || ''; } catch (e) {}
  let faltan = cambios.length, abortada = false, fallo = false;
  const fin = () => {
    if (--faltan) return;
    if (fallo) { showSyncIndicator('🔴 Error al guardar — reintentando'); setTimeout(saveState, 2500); return; }
    if (abortada) { showSyncIndicator('🟡 Otra sesión tenía cambios — fusionando'); setTimeout(saveState, 900); return; }
    try { logWriteEvent({ tipo: 'OK', motivo: cambios.length + ' parte' + (cambios.length === 1 ? '' : 's') + ': ' + cambios.slice(0, 4).join(', '), counts: stateCounts(state) }); if (Math.random() < 0.05) pruneWriteLog(); } catch (e) {}
    showSyncIndicator('🟢 Guardado');
  };
  cambios.forEach(k => {
    const dato = mias[k], texto = misTextos[k];
    firebaseDB.ref(WM_V3_P + '/' + _encP(k)).transaction(function (cur) {
      let r = 0;
      if (cur != null) { try { r = JSON.parse(cur).r || 0; } catch (e) {} }
      if (cur != null && r > (_revP[k] || 0)) return;          // la nube tiene algo más nuevo: no pisar
      if (dato === undefined) return null;                        // se borró la parte
      return JSON.stringify({ r: Math.max(r, _revP[k] || 0) + 1, by: yo, at: Date.now(), ver: WM_VER, sid: WM_SID, d: dato });
    }, function (err, ok, snap) {
      if (err) fallo = true;
      else if (!ok) abortada = true;
      else {
        const v = snap && snap.val();
        if (v) { try { _revP[k] = JSON.parse(v).r || _revP[k]; } catch (e) {} }
        if (dato === undefined) delete _baseP[k]; else _baseP[k] = texto;
      }
      fin();
    }, false);
  });
}

// Reemplaza al saveState de sync.js: lo local queda igual; a la nube van solo las partes cambiadas.
saveState = function () {
  stripViewStateFromShared();
  if (WM_SNAPSHOT) return;
  try { localStorage.setItem('wm_app_v2', JSON.stringify(state)); } catch (e) {}
  if (firebaseDB && cloudSynced && !WM_SAFE && _baseP) {
    clearTimeout(firebaseSaveTimeout);
    firebaseSaveTimeout = setTimeout(_subirPartes, 600);
  }
};

// Para restaurar un respaldo entero (honorarios.js, importar JSON): todas las partes, por encima de lo que haya.
function wmGuardarTodo(nuevo) {
  const p = partesDe(nuevo), obj = {}, ahora = Date.now();
  let yo = ''; try { const u = currentUser(); yo = (u && u.name) || ''; } catch (e) {}
  Object.keys(p).forEach(k => { obj[_encP(k)] = JSON.stringify({ r: (_revP[k] || 0) + 1000, by: yo, at: ahora, ver: WM_VER, sid: WM_SID, d: p[k] }); });
  return firebaseDB.ref(WM_V3_P).set(obj);
}
