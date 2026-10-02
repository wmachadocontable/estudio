
// ============ DEFAULTS ============
const DEFAULT_LOGO = "data:image/png;base64,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";

const INIT_EMPRESAS = [];

const INIT_SPROF_NAMES = [];
const INIT_SPROF_DONE = {};

const INIT_CLIENTES = [];
const INIT_SUELDOS = {};

// Default colors for "Tipo" categories (clients)
const INIT_TIPO_COLORS = {
  "IyC":{bg:"#e8f0f8",fg:"#1a4a7a",label:"IyC"},
  "IyC-pequeña empresa":{bg:"#fdf2e9",fg:"#a04000",label:"IyC pequeña"},
  "IyC-monotributo":{bg:"#fef9e7",fg:"#7d6608",label:"IyC monotrib"},
  "IyC-monotributo mides":{bg:"#fef5e7",fg:"#9c640c",label:"IyC mono MIDES"},
  "IyC-Rural":{bg:"#e9f7ef",fg:"#196f3d",label:"IyC Rural"},
  "IyC-contruccion":{bg:"#fdebd0",fg:"#935116",label:"IyC Constr."},
  "IyC- Transporte carga":{bg:"#ebdef0",fg:"#5b2c6f",label:"IyC Transp."},
  "S.Prof":{bg:"#e8f5ee",fg:"#1e6b3a",label:"Serv. Prof."},
  "PF":{bg:"#fef8e8",fg:"#b7651b",label:"PF"},
  "SD":{bg:"#fce4e4",fg:"#922b21",label:"SD"},
  "As. Civil":{bg:"#eaeded",fg:"#34495e",label:"Asoc. Civil"},
  "I.Primaria":{bg:"#f4ecf7",fg:"#6c3483",label:"I. Primaria"}
};

function buildInitState() {
  const sprofRows = INIT_SPROF_NAMES.map(n => {
    const cells = {};
    (INIT_SPROF_DONE[n]||[]).forEach(m => cells[m] = {s:'done'});
    return { name: n, tag: '', cells };
  });
  return {
    branding: {
      name: 'W. Machado',
      subtitle: 'Estudio Contable',
      year: '2026',
      logo: DEFAULT_LOGO,
      logoInvert: true,
      colors: { accent:'#b8c1cc', header:'#102030', bg:'#ffffff', text:'#0a0a0a' },
      fonts: { display: "'Playfair Display', serif", body: "'Lato', sans-serif" }
    },
    tabs: [
      { id:'dashboard', name:'Dashboard', type:'dashboard', removable:false },
      { id:'empresas', name:'Empresas', type:'table', columns: [...MONTHS], rows: INIT_EMPRESAS, hasTag:true, tagLabel:'Tipo' },
      { id:'sprof', name:'Serv. Profesionales', type:'table', columns: [...MONTHS], rows: sprofRows, hasTag:false },
      { id:'sueldos', name:'💼 Sueldos', type:'sueldos', removable:false },
      { id:'clientes', name:'👥 Info. Clientes', type:'clientes', removable:false },
      { id:'calendario', name:'📅 Calendario', type:'calendar', removable:false },
      { id:'settings', name:'Configuración', type:'settings', removable:false }
    ],
    users: ['Daniela','Wendy','Lorena'],
    calendarEvents: [],
    clientes: JSON.parse(JSON.stringify(INIT_CLIENTES)),
    tipoColors: JSON.parse(JSON.stringify(INIT_TIPO_COLORS)),
    sueldos: JSON.parse(JSON.stringify(INIT_SUELDOS)),
    sueldosColumns: [
      {key:'prontos', label:'Prontos'},
      {key:'avisadoEnviado', label:'Avisado/Enviado'},
      {key:'fosmetal', label:'Fosmetal'},
      {key:'bps', label:'BPS'},
      {key:'contabilizado', label:'Contabilizado'},
      {key:'controlFacturaBps', label:'Control Fact. BPS'},
      {key:'auditoria', label:'Auditoría'}
    ]
  };
}

function initFirebase() {
  try {
    if (firebaseDB) return; // ya conectado: no re-adjuntar el listener de la nube
    if (WM_SAFE) { showSafeBanner(); }
    // Modo copia: NO conectar. Una copia vieja abierta por error jamás debe
    // escribir en la base que están usando en el estudio.
    if (WM_SNAPSHOT) { showSnapshotBanner(); return; }
    if (typeof firebase === 'undefined') return;
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    firebaseDB = firebase.database();
    // Escuchar cambios en tiempo real
    firebaseDB.ref('wm_app_v2').on('value', function(snapshot) {
      const data = snapshot.val();
      if (data) {
        cloudSynced = true; // recién ahora sabemos que la nube tiene datos: podemos subir
        const incoming = typeof data === 'string' ? JSON.parse(data) : data;
        // Guard anti-pisado: registrar la versión de la nube que estamos viendo.
        // IMPORTANTE: esto se hace SIEMPRE, incluso si diferimos el render, porque si no
        // la próxima transacción se abortaría por "la nube es más nueva" y se perdería
        // lo que la usuaria está escribiendo.
        const incomingRev = (incoming && incoming._rev) || 0;
        if (incomingRev >= lastSeenRev) lastSeenRev = incomingRev;
        _lastCloudAuthor = (incoming && incoming._by) || '';
        _lastCloudMeta = { by: _lastCloudAuthor, at: (incoming && incoming._at) || 0,
                           ver: (incoming && incoming._ver) || '', sid: (incoming && incoming._sid) || '' };
        ['_rev','_by','_at','_ver','_sid'].forEach(k => { if (incoming && (k in incoming)) delete incoming[k]; });
        // Primera lectura de la sesión: esta copia de la nube es nuestra base.
        // NO tocar baseState acá: mergeIncomingState necesita saber si es la
        // primera lectura de la sesión para adoptar la nube tal cual.
        // Strip any view-state that legacy versions might still send,
        // so it doesn't override this user's navigation.
        ['activeTabId','editMode','monthFilters','dashMonth'].forEach(k => { if (k in incoming) delete incoming[k]; });
        if (incoming.tabs) incoming.tabs.forEach(t => { if ('layout' in t) delete t.layout; });

        // ===== CANDADO DE EDICIÓN =====
        // Si la usuaria está escribiendo dentro de una nota, NO tocamos el estado ni
        // re-renderizamos: eso reconstruía el contenteditable, perdía el cursor y dejaba
        // el texto cortado en la última versión guardada. Encolamos el cambio remoto y
        // lo aplicamos (fusionado) apenas salga de la nota.
        // Fusionamos SIEMPRE (aunque estés escribiendo una nota): así el cambio de
        // la otra usuaria entra en el estado y ya no puede perderse. Lo único que se
        // difiere es volver a dibujar la pantalla, para no romperte el cursor.
        if (isEditingSticky()) {
          mergeIncomingState(incoming, /*render=*/false);
          _pendingRemoteRender = true;
          showSyncIndicator('✏️ Escribiendo — se actualiza al salir');
          return;
        }
        mergeIncomingState(incoming, /*render=*/true);
      } else {
        // ===== CAUSA RAÍZ DEL BORRADO TOTAL (arreglado en v8.5) =====
        // Antes acá había un saveState() directo. Si la lectura volvía vacía por
        // CUALQUIER motivo (hipo de red, corte, permiso), esta pestaña subía su
        // estado. Y si había abierto sin datos locales, su estado era la plantilla
        // en blanco: se borraba el estudio entero (sin logo, contraseñas de fábrica,
        // pestañas por defecto). Ahora no se sube nada solo: se reintenta y, si de
        // verdad está vacía, se pregunta.
        handleEmptyCloud();
      }
    });
    showSyncIndicator('🟢 Conectado');

    // Pestaña que estuvo dormida (minimizada, PC suspendida, otro escritorio):
    // al volver pedimos la nube de nuevo y fusionamos antes de dejarla escribir.
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState !== 'visible' || !firebaseDB) return;
      firebaseDB.ref('wm_app_v2').once('value').then(function(snap) {
        var data = snap.val();
        if (!data) return;
        var inc = typeof data === 'string' ? JSON.parse(data) : data;
        var r = (inc && inc._rev) || 0;
        if (r >= lastSeenRev) lastSeenRev = r;
        _lastCloudAuthor = (inc && inc._by) || '';
        _lastCloudMeta = { by: _lastCloudAuthor, at: (inc && inc._at) || 0,
                           ver: (inc && inc._ver) || '', sid: (inc && inc._sid) || '' };
        ['_rev','_by','_at','_ver','_sid'].forEach(function(k){ if (inc && (k in inc)) delete inc[k]; });
        ['activeTabId','editMode','monthFilters','dashMonth'].forEach(function(k){ if (k in inc) delete inc[k]; });
        if (inc.tabs) inc.tabs.forEach(function(t){ if ('layout' in t) delete t.layout; });
        mergeIncomingState(inc, !isEditingSticky());
      }).catch(function(){});
    });
  } catch(e) {
    console.warn('Firebase no disponible, usando localStorage', e);
  }
}

function showSafeBanner() {
  try {
    const b = document.createElement('div');
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#2b6cb0;color:#fff;' +
      'font-size:13px;padding:10px 16px;text-align:center;';
    b.innerHTML = '\ud83d\udd12 <b>Modo seguro</b> \u2014 esta pesta\u00f1a LEE los datos pero no escribe nada. Sirve para mirar sin riesgo.';
    document.body.appendChild(b);
    document.body.style.paddingBottom = '46px';
  } catch(e) {}
}

function showSnapshotBanner() {
  try {
    const info = WM_SNAPSHOT || {};
    const f = info.savedAt ? new Date(info.savedAt).toLocaleString('es-UY') : '';
    const b = document.createElement('div');
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#8a6d1f;color:#fff;' +
      'font-family:inherit;font-size:13px;padding:10px 16px;text-align:center;box-shadow:0 -2px 12px rgba(0,0,0,.25);';
    b.innerHTML = '\ud83d\udcc4 <b>Copia de respaldo</b> \u2014 datos del ' + (f || 'archivo descargado') +
      (info.by ? (' (por ' + String(info.by).replace(/[<>]/g,'') + ')') : '') +
      '. Esta copia <b>no se sincroniza</b>: lo que edites ac\u00e1 no llega al estudio ni afecta los datos reales.';
    document.body.appendChild(b);
    document.body.style.paddingBottom = '46px';
    const v = document.getElementById('build-version');
    if (v) { v.textContent = 'COPIA'; v.style.color = '#8a6d1f'; v.style.borderColor = '#8a6d1f'; }
  } catch(e) {}
}

function showSyncIndicator(msg) {
  if (WM_SNAPSHOT) return;
  let el = document.getElementById('sync-indicator');
  if (!el) return;
  el.textContent = msg;
}

// ============ CANDADO DE EDICIÓN DE NOTAS ============
// Problema que resuelve: mientras escribías una nota, volvía el eco de Firebase con la
// versión de hace ~600 ms (más vieja que la pantalla). El listener hacía state = incoming
// + renderContent(), lo que reconstruía el <div contenteditable> y te cortaba el texto.
let _stickyEditingId = null;      // id de la nota que tiene el foco ahora mismo
let _stickyEditingIsStudio = false;
let _stickyBlurTimer = null;
let _pendingRemoteRender = false; // hay cambios remotos ya fusionados, falta redibujar

function isEditingSticky() { return _stickyEditingId !== null; }

function onStickyFocus(noteId, isStudio) {
  clearTimeout(_stickyBlurTimer);
  _stickyEditingId = noteId;
  _stickyEditingIsStudio = !!isStudio;
}

function onStickyBlur(noteId) {
  // Damos margen para que (a) un clic en la barra de formato no cuente como salida y
  // (b) el guardado con debounce de 600 ms suba lo último antes de sincronizar.
  clearTimeout(_stickyBlurTimer);
  _stickyBlurTimer = setTimeout(function() {
    // ¿Volvió el foco a alguna nota? Entonces seguimos editando.
    const ae = document.activeElement;
    if (ae && ae.classList && ae.classList.contains('sticky-content')) return;
    _stickyEditingId = null;
    flushPendingRemoteRender();
  }, 900);
}

function flushPendingRemoteRender() {
  // El estado ya viene fusionado por mergeIncomingState(): acá sólo redibujamos y
  // subimos lo que hayas escrito para que las demás vean el texto final.
  if (!_pendingRemoteRender) { saveState(); return; }
  _pendingRemoteRender = false;
  applyBranding();
  renderTabs();
  renderContent();
  showSyncIndicator('\ud83d\udfe2 Sincronizado');
  saveState();
}

// Cuenta rápida del contenido, para detectar escrituras que "achican" los datos.
window.openWriteLog = function() {
  if (!firebaseDB) { alert('Sin conexión con la base.'); return; }
  let d = document.getElementById('modal-wmwrites');
  if (!d) {
    d = document.createElement('div');
    d.className = 'modal-overlay'; d.id = 'modal-wmwrites';
    d.innerHTML = '<div class="modal" style="width:760px;"><button class="modal-close" onclick="closeModal(\'modal-wmwrites\')">×</button>' +
      '<h3>🔎 Quién escribió</h3><div class="modal-sub">Últimas escrituras a los datos compartidos. ' +
      'Si algo "se revierte solo", acá se ve qué pestaña lo hizo. Esta pestaña es <b>' + WM_SID + '</b> (' + WM_VER + ').</div>' +
      '<div id="wmwrites-list">Cargando…</div></div>';
    document.body.appendChild(d);
  }
  d.classList.add('open');
  const list = document.getElementById('wmwrites-list');
  list.innerHTML = 'Cargando…';
  firebaseDB.ref(WM_WRITES_REF).once('value').then(function(snap) {
    const v = snap.val() || {};
    const keys = Object.keys(v).sort(function(a, b) { return (v[b].at || 0) - (v[a].at || 0); }).slice(0, 80);
    if (!keys.length) { list.innerHTML = '<p style="color:var(--c-text-muted);">Todavía no hay registros. Se van a ir anotando a medida que usen la app.</p>'; return; }
    let prev = null;
    const rows = keys.map(function(k) {
      const e = v[k] || {};
      const c = e.counts || {};
      let flag = '';
      if (e.tipo === 'RECHAZADO') flag = '<span style="color:#a33;font-weight:700;">⛔ rechazada (versión vieja)</span>';
      else if (e.tipo === 'ACHICA') flag = '<span style="color:#a33;font-weight:700;">⚠ trajo menos datos</span>';
      else if (prev && c.cl != null && prev.cl != null && c.cl < prev.cl) flag = '<span style="color:#a33;">⚠ bajaron clientes</span>';
      if (c.cl != null) prev = c;
      const f = e.at ? new Date(e.at).toLocaleString('es-UY') : '';
      return '<tr><td style="text-align:left;">' + f + '</td><td>' + (e.by || '?') + '</td><td>' +
        (e.ver || '<i>vieja</i>') + '</td><td><code>' + (e.sid || '?') + '</code></td><td>' +
        (c.cl != null ? c.cl : '?') + '</td><td>' + (c.rows != null ? c.rows : '?') + '</td><td>' + flag + '</td></tr>';
    }).join('');
    list.innerHTML = '<div class="table-wrap" style="max-height:420px;overflow:auto;"><table class="hon-table">' +
      '<thead><tr><th>Cuándo</th><th>Quién</th><th>Versión</th><th>Pestaña</th><th>Clientes</th><th>Filas</th><th></th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>';
  }).catch(function() { list.innerHTML = '<p>Error al leer el registro.</p>'; });
};

const WM_SNAPSHOT = (function() {
  try {
    const el = document.getElementById('wm-snapshot');
    if (!el) return null;
    const o = JSON.parse(el.textContent);
    return (o && o.state) ? o : null;
  } catch(e) { return null; }
})();

function loadState() {
  // 1) Copia descargada: mandan los datos incrustados en el propio archivo.
  if (WM_SNAPSHOT) return WM_SNAPSHOT.state;
  try { const s = localStorage.getItem('wm_app_v2'); if (s) return JSON.parse(s); } catch(e) {}
  return buildInitState();
}

let state = loadState();
// migrate: if old state missing structure, rebuild
if (!state.tabs || !state.branding) state = buildInitState();

// Migration: ensure new tabs and shared data exist for older saved states
function buildDeclaracionesInit() {
  const irpfFolder = {
    id: 'fld_irpf',
    name: 'IRPF 2025',
    icon: '📄',
    color: '#2f6f4f',
    block: {
      id: 'blk_irpf_2025',
      type: 'cTable',
      title: 'IRPF 2025',
      cols: [
        {key:'c_cliente',label:'Cliente',ctype:'text'},
        {key:'c_hirpf',label:'Hecho IRPF',ctype:'checkbox'},
        {key:'c_hiva',label:'Hecho IVA',ctype:'tag',options:['SI','No','N/A']},
        {key:'c_pres',label:'Presentado IRPF',ctype:'date'},
        {key:'c_importe',label:'Importe',ctype:'money',currency:''},
        {key:'c_medio',label:'Medio de pago',ctype:'tag',options:['Scotia','BBVA','Itaú','Santander','BROU','Efectivo','Transferencia']},
        {key:'c_pago',label:'Fecha de pago',ctype:'date'},
        {key:'c_ejec',label:'Ejecutor',ctype:'person'},
        {key:'c_timbre',label:'Timbre',ctype:'money',currency:''},
        {key:'c_saldo',label:'Saldo / Notas',ctype:'text'},
        {key:'c_estado',label:'Estado',ctype:'tag',options:['Pendiente','En curso','Presentada','Cobrada']}
      ],
      rows: []
    }
  };
  return { id:'declaraciones', name:'📋 Declaraciones', type:'declaraciones', removable:true, folders:[ irpfFolder ] };
}

function ensureNewStructures() {
  let changed = false;
  // v8-ficha: diseño configurable de la ficha de cliente (secciones y orden de campos)
  if (!state.cliLayout || !Array.isArray(state.cliLayout.sections) || !state.cliLayout.sections.length) {
    state.cliLayout = defaultCliLayout();
    changed = true;
  }
  // Inject missing tabs
  const hasTab = id => state.tabs.some(t => t.id === id);
  const insertBeforeId = (newTab, beforeId) => {
    const idx = state.tabs.findIndex(t => t.id === beforeId);
    if (idx >= 0) state.tabs.splice(idx, 0, newTab);
    else state.tabs.push(newTab);
  };
  if (!hasTab('sueldos')) {
    insertBeforeId({ id:'sueldos', name:'💼 Sueldos', type:'sueldos', removable:false }, 'calendario');
    changed = true;
  }
  if (!hasTab('clientes')) {
    insertBeforeId({ id:'clientes', name:'👥 Info. Clientes', type:'clientes', removable:false }, 'calendario');
    changed = true;
  }
  // Sesión 8: Mi Dashboard (pestaña compartida pero contenido por usuaria)
  if (!hasTab('mydash')) {
    insertBeforeId({ id:'mydash', name:'📌 Mi Dashboard', type:'mydash', removable:false }, 'settings');
    changed = true;
  }
  // Declaraciones: pestaña compartida con carpetas de DJ (IRPF precargada).
  if (!hasTab('declaraciones')) {
    insertBeforeId(buildDeclaracionesInit(), 'calendario');
    changed = true;
  }
  // Asegurar state.userDashboards
  if (!state.userDashboards) { state.userDashboards = {}; changed = true; }
  if (!state.clientes) { state.clientes = JSON.parse(JSON.stringify(INIT_CLIENTES)); changed = true; }
  if (!state.tipoColors) { state.tipoColors = JSON.parse(JSON.stringify(INIT_TIPO_COLORS)); changed = true; }
  if (!state.sueldos) { state.sueldos = JSON.parse(JSON.stringify(INIT_SUELDOS)); changed = true; }
  if (!state.sueldosColumns) {
    state.sueldosColumns = [
      {key:'prontos', label:'Prontos'},
      {key:'avisadoEnviado', label:'Avisado/Enviado'},
      {key:'fosmetal', label:'Fosmetal'},
      {key:'bps', label:'BPS'},
      {key:'contabilizado', label:'Contabilizado'},
      {key:'controlFacturaBps', label:'Control Fact. BPS'},
      {key:'auditoria', label:'Auditoría'}
    ];
    changed = true;
  }
  if (!state.users) { state.users = ['Daniela','Wendy','Lorena']; changed = true; }
  // Sesión 4: migrar usuarios a formato objeto (idempotente)
  if (typeof ensureUsersAsObjects === 'function') {
    if (ensureUsersAsObjects()) changed = true;
  } else {
    // Si la función todavía no está definida (carga inicial muy temprano), hacemos la migración mínima
    if (state.users.some(u => typeof u === 'string')) {
      state.users = state.users.map((u, i) => typeof u === 'string' ? {
        id: 'usr_' + u.toLowerCase().replace(/[^a-z0-9]/g,'') + '_' + Math.random().toString(36).slice(2,6),
        name: u, displayName: u,
        role: i === 0 ? 'admin' : 'editor',
        color: ['#16a085','#1a4a7a','#2e7d52','#c0392b','#8e44ad','#d4860a','#34495e','#27ae60'][i % 8],
        photo: null, createdAt: Date.now()
      } : u);
      changed = true;
    }
  }

  // Sesión 1: migración automática de paleta dorada/crema a plateada/blanca.
  // Detecta el preset clásico dorado original y lo reemplaza por el plateado nuevo.
  // No toca paletas personalizadas (navy, burgundy, etc.) ni colores únicos elegidos por la usuaria.
  if (state.branding && state.branding.colors) {
    const c = state.branding.colors;
    const isOriginalGold = (c.accent === '#b8972d' || c.accent === '#B8972D');
    const isOriginalBg   = (c.bg === '#f9f8f6' || c.bg === '#F9F8F6');
    const isOriginalHeader = (c.header === '#0a0a0a' || c.header === '#0A0A0A');
    if (isOriginalGold && isOriginalBg && isOriginalHeader) {
      state.branding.colors = { accent:'#b8c1cc', header:'#102030', bg:'#ffffff', text:'#0a0a0a' };
      changed = true;
    } else if (isOriginalGold) {
      // Solo el acento es el dorado original → migrarlo a plateado pero respetar lo demás
      state.branding.colors.accent = '#b8c1cc';
      changed = true;
    }
  }

  // Sesión 5: asegurar papelera y purgar items vencidos
  if (typeof ensureTrashAndPurge === 'function') {
    if (ensureTrashAndPurge()) changed = true;
  } else {
    if (!state.trash) { state.trash = []; changed = true; }
  }

  // Sesión 6: asegurar audit log
  if (!Array.isArray(state.auditLog)) { state.auditLog = []; changed = true; }
  // Rotación al cargar (por si se cambió AUDIT_MAX_ENTRIES o vino más grande)
  if (state.auditLog.length > AUDIT_MAX_ENTRIES) {
    state.auditLog.splice(0, state.auditLog.length - AUDIT_MAX_ENTRIES);
    changed = true;
  }

  // Id unico y permanente por cliente (arregla que clientes con misma CI/RUT/nombre se pisen).
  if (typeof ensureClientIds === 'function') {
    if (ensureClientIds()) changed = true;
  }

  if (typeof runStructureInitializers === 'function') {
    if (runStructureInitializers()) changed = true;
  }

  return changed;
}
if (ensureNewStructures()) saveState();

// Helper: from a previous installation, "state.activeTabId/editMode/monthFilters/dashMonth"
// might exist in the global state object. Strip them so they don't keep syncing.
function stripViewStateFromShared() {
  let changed = false;
  ['activeTabId','editMode','monthFilters','dashMonth'].forEach(k => {
    if (k in state) { delete state[k]; changed = true; }
  });
  // Also strip per-tab "layout" since that's per-user now
  if (state.tabs) {
    state.tabs.forEach(t => {
      if ('layout' in t) {
        // First time only: migrate the existing layout to userPrefs for this user
        if (userPrefs.tabLayouts[t.id] === undefined) userPrefs.tabLayouts[t.id] = t.layout;
        delete t.layout;
        changed = true;
      }
    });
  }
  return changed;
}

// ============ INIT / APPLY ============
function applyBranding() {
  const b = state.branding;
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
  set('header-name', el => el.textContent = b.name);
  set('header-subtitle', el => el.textContent = b.subtitle);
  set('year-badge', el => el.textContent = b.year);
  set('header-logo-img', el => { el.src = b.logo; el.className = b.logoInvert ? 'invert' : ''; });
  // also sync login screen if visible
  set('login-logo-img', el => { el.src = b.logo; el.className = b.logoInvert ? 'invert' : ''; });
  set('login-name', el => el.textContent = b.name);
  set('login-subtitle', el => el.textContent = b.subtitle);
  set('login-year', el => el.textContent = b.year);
  document.title = b.name + ' – ' + b.subtitle;
  const r = document.documentElement.style;
  r.setProperty('--c-accent', b.colors.accent);
  r.setProperty('--c-accent-light', shadeColor(b.colors.accent, 25));
  r.setProperty('--c-header', b.colors.header);
  r.setProperty('--c-bg', b.colors.bg);
  r.setProperty('--c-text', b.colors.text);
  r.setProperty('--font-display', b.fonts.display);
  r.setProperty('--font-body', b.fonts.body);
}

function shadeColor(color, percent) {
  const f = parseInt(color.slice(1),16), t = percent<0?0:255, p = Math.abs(percent)/100,
    R = f>>16, G = f>>8&0x00FF, B = f&0x0000FF;
  return "#" + (0x1000000 + (Math.round((t-R)*p)+R)*0x10000 + (Math.round((t-G)*p)+G)*0x100 + (Math.round((t-B)*p)+B)).toString(16).slice(1);
}

// Calcula la altura real del header y la expone como CSS var para que nav-tabs
// se pegue justo abajo cuando se hace scroll
function updateStickyOffsets() {
  const header = document.querySelector('header');
  if (!header) return;
  const h = header.offsetHeight;
  if (h > 0) {
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
}
window.addEventListener('resize', updateStickyOffsets);
window.addEventListener('load', updateStickyOffsets);

// ============ SUBPESTAÑAS (FORMA A) ============
// Cada pestaña tipo tabla o annual puede tener subpestañas.
// Las filas que no tienen subTabId asignado se muestran en "Todas" (subTabId vacío/null).
// Si la pestaña no tiene subTabs definidas, comportamiento legacy (todo se muestra).

function tabSupportsSubTabs(tab) {
  if (!tab) return false;
  return tab.type === 'table' || tab.type === 'annual';
}

function getTabSubTabs(tab) {
  if (!Array.isArray(tab.subTabs)) tab.subTabs = [];
  return tab.subTabs;
}

function getActiveSubTabId(tab) {
  const subs = getTabSubTabs(tab);
  if (!subs.length) return '';
  const key = `subTab_${tab.id}`;
  const stored = userPrefs[key];
  if (stored !== undefined && (stored === '' || subs.some(s => s.id === stored))) return stored;
  return ''; // por defecto "Todas"
}

function setActiveSubTabId(tabId, subTabId) {
  userPrefs[`subTab_${tabId}`] = subTabId;
  saveUserPrefs();
}

function getVisibleRows(tab) {
  const subs = getTabSubTabs(tab);
  if (!subs.length) return tab.rows;
  const active = getActiveSubTabId(tab);
  if (!active) return tab.rows; // "Todas"
  return tab.rows.filter(r => r.subTabId === active);
}

function renderSubTabsBar(tab) {
  if (!tabSupportsSubTabs(tab)) return '';
  const subs = getTabSubTabs(tab);
  const active = getActiveSubTabId(tab);
  // Si no hay subpestañas, mostrar solo botón "+ Crear carpeta"
  if (!subs.length) {
    return `<div class="subtabs-bar">
      <button class="subtabs-add" onclick="openAddSubTab('${tab.id}')" title="Crear carpeta (subpestaña)">+ Carpeta</button>
      <span class="subtabs-hint">💡 Las carpetas te dejan separar filas en grupos (ej: IRAE, Rural, Archivadas)</span>
    </div>`;
  }
  let html = `<div class="subtabs-bar">`;
  html += `<div class="subtab${active===''?' active':''}" onclick="switchSubTab('${tab.id}','')">▸ Todas <span class="subtab-count">${tab.rows.length}</span></div>`;
  subs.forEach(s => {
    const count = tab.rows.filter(r => r.subTabId === s.id).length;
    const isActive = active === s.id;
    html += `<div class="subtab${isActive?' active':''}" onclick="switchSubTab('${tab.id}','${s.id}')" ondblclick="renameSubTab('${tab.id}','${s.id}')" title="Doble clic para renombrar">📁 ${bbEscape(s.name)} <span class="subtab-count">${count}</span>${isActive?`<span class="subtab-del" onclick="event.stopPropagation();deleteSubTab('${tab.id}','${s.id}')" title="Eliminar carpeta">✕</span>`:''}</div>`;
  });
  html += `<button class="subtabs-add" onclick="openAddSubTab('${tab.id}')" title="Crear carpeta">+</button>`;
  html += `</div>`;
  return html;
}

function switchSubTab(tabId, subTabId) {
  setActiveSubTabId(tabId, subTabId);
  renderContent();
}

function openAddSubTab(tabId) {
  const name = prompt('Nombre de la nueva carpeta (ej: IRAE, Rural, Archivadas):', '');
  if (!name || !name.trim()) return;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const subs = getTabSubTabs(tab);
  const id = 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5);
  subs.push({ id, name: name.trim() });
  saveState();
  setActiveSubTabId(tabId, id);
  renderContent();
  toast('✓ Carpeta creada');
}

function renameSubTab(tabId, subTabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const sub = getTabSubTabs(tab).find(s => s.id === subTabId);
  if (!sub) return;
  const name = prompt('Nuevo nombre:', sub.name);
  if (!name || !name.trim()) return;
  sub.name = name.trim();
  saveState();
  renderContent();
  toast('✓ Carpeta renombrada');
}

function deleteSubTab(tabId, subTabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const subs = getTabSubTabs(tab);
  const sub = subs.find(s => s.id === subTabId);
  if (!sub) return;
  const rowsInside = tab.rows.filter(r => r.subTabId === subTabId).length;
  const msg = rowsInside
    ? `¿Eliminar la carpeta "${sub.name}"? Las ${rowsInside} fila(s) que tiene adentro se moverán a "Todas".`
    : `¿Eliminar la carpeta "${sub.name}"?`;
  if (!confirm(msg)) return;
  // Mover filas
  tab.rows.forEach(r => { if (r.subTabId === subTabId) delete r.subTabId; });
  // Eliminar sub
  tab.subTabs = subs.filter(s => s.id !== subTabId);
  setActiveSubTabId(tabId, '');
  saveState();
  renderContent();
  toast('✓ Carpeta eliminada');
}

function moveRowToSubTab(tabId, rowIdx, subTabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const r = tab.rows[rowIdx];
  if (!r) return;
  if (subTabId) r.subTabId = subTabId;
  else delete r.subTabId;
  saveState();
  renderContent();
}

// ============ TABLE RENDER ============
function renderTable(tab) {
  // Si esta pestaña fue detectada como "tabla anual mal armada", abrimos el wizard
  maybeShowAnnualConversionWizard(tab);
  const filter = userPrefs.monthFilters[tab.id];
  const cols = (filter !== undefined && filter !== -1 && filter < tab.columns.length) ? [filter] : tab.columns.map((_,i)=>i);
  const allCells = tab.rows.flatMap(r => cols.map(ci => getCell(tab, r, ci)));
  const doneAll = allCells.filter(c => c.s==='done').length;
  const sent    = allCells.filter(c => c.s==='done' && c.es).length;  // finalizados (enviados al cliente)
  const done    = doneAll - sent;                                     // realizados, sin enviar
  const pending = allCells.filter(c => c.s==='empty' || c.s==='pending').length;
  const total = done + sent + pending;
  const pct = total > 0 ? Math.round((done+sent)/total*100) : 0;      // % completado (hecho, enviado o no)

  const isMonths = tab.columns.length === 12 && tab.columns.every((c,i)=>MONTHS.includes(c)||MONTHS_SHORT.includes(c));
  const isYearsMode = (tab.colMode === 'years') ||
    (tab.columns.length > 0 && tab.columns.every(c => /^\d{4}$/.test(String(c))));
  const layout = getTabLayout(tab.id);
  const displayYear = tab.tabYear || state.branding.year;

  // Build year selector options for monthly tabs (current ± 5 from app branding year)
  const baseY = parseInt(state.branding.year) || new Date().getFullYear();
  const yearOpts = [];
  for (let y = baseY - 3; y <= baseY + 10; y++) yearOpts.push(y);

  let html = `
    <div class="section-header">
      <div class="section-title editable-title" data-edit="tab.name" data-tab-id="${tab.id}">${tab.name} ${isMonths ? `<span>${displayYear}</span>` : (isYearsMode ? `<span>${tab.columns[0]}–${tab.columns[tab.columns.length-1]}</span>` : `<span>${displayYear}</span>`)}</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        ${isMonths ? `<select id="tab-year-sel" onchange="setTabYear('${tab.id}', this.value)" title="Año de esta pestaña" style="padding:6px 10px;border:1px solid var(--c-border);background:var(--c-card);border-radius:2px;font-family:inherit;font-size:13px;font-weight:700;color:var(--c-text);cursor:pointer;">${yearOpts.map(y => `<option value="${y}"${String(y)===String(displayYear)?' selected':''}>${y}</option>`).join('')}</select>
        <button class="btn btn-outline btn-sm" onclick="openYearRepairTool('${tab.id}')" title="Ver y reparar datos por año" style="font-size:11px;background:#fff4d6;border-color:var(--c-accent);">🔧 Reparar años</button>` : ''}
        <div class="layout-switcher" title="Cambiar vista">
          <button class="layout-opt${layout==='table'?' active':''}" onclick="setTabLayout('${tab.id}','table')" title="Tabla clásica">📊 Tabla</button>
          <button class="layout-opt${layout==='cards'?' active':''}" onclick="setTabLayout('${tab.id}','cards')" title="Tarjetas">🗂️ Tarjetas</button>
          <button class="layout-opt${layout==='kanban'?' active':''}" onclick="setTabLayout('${tab.id}','kanban')" title="Kanban por estado">📋 Kanban</button>
          <button class="layout-opt${layout==='compact'?' active':''}" onclick="setTabLayout('${tab.id}','compact')" title="Vista compacta">≡ Compacta</button>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-green)"></div> Hecho</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-pending)"></div> Pendiente</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-border)"></div> N/A</div>
        </div>
        <button class="btn btn-gold" onclick="openAddEntity('${tab.id}')">+ Agregar fila</button>
        ${tabPrivacyButton(tab)}
      </div>
    </div>`;

  html += renderSubTabsBar(tab);

  // month filter (only meaningful for table/compact)
  if (layout === 'table' || layout === 'compact') {
    html += `<div class="month-filter">`;
    html += `<button class="month-btn${(filter===undefined||filter===-1)?' active':''}" onclick="setMonthFilter('${tab.id}',-1)">Todos</button>`;
    html += tab.columns.map((c,i) => {
      const label = isMonths ? MONTHS_SHORT[MONTHS.indexOf(c)] || c.substring(0,3) : c;
      return `<button class="month-btn${filter===i?' active':''}" onclick="setMonthFilter('${tab.id}',${i})">${label}</button>`;
    }).join('');
    html += `</div>`;
  }

  html += `<div class="stats-bar">
    <div class="stat-card green"><div class="stat-num">${done}</div><div class="stat-label">Realizados${sent>0?' (sin enviar)':''}</div></div>
    ${sent>0?`<div class="stat-card" style="border-left:3px solid #4a9eff;"><div class="stat-num" style="color:#0066cc;">${sent}</div><div class="stat-label">📤 Finalizados</div></div>`:''}
    <div class="stat-card red"><div class="stat-num">${pending}</div><div class="stat-label">Pendientes</div></div>
    <div class="stat-card"><div class="stat-num">${pct}%</div><div class="stat-label">Completado</div></div>
  </div>`;

  if (layout === 'cards') html += renderTabAsCards(tab, isMonths);
  else if (layout === 'kanban') html += renderTabAsKanban(tab, isMonths);
  else if (layout === 'compact') html += renderTabAsCompact(tab, cols, isMonths);
  else html += renderTabAsTable(tab, cols, isMonths);

  return html;
}

// ============ ANNUAL TABLE (Ej. Económicos / DDJJ por año) ============
// Pestañas donde las MISMAS columnas (ej: DDJJ 2178, 1050, 3107) se repiten cada año,
// y cada celda guarda el estado de un año específico. Las filas son las empresas.

function getAnnualYearsAvailable(tab) {
  let years = Array.isArray(tab.years) ? tab.years.slice() : [];
  tab.rows.forEach(r => {
    if (r.cellsByYear) {
      Object.keys(r.cellsByYear).forEach(y => {
        if (/^\d{4}$/.test(y) && !years.includes(y)) years.push(y);
      });
    }
  });
  if (tab.tabYear && !years.includes(String(tab.tabYear))) years.push(String(tab.tabYear));
  if (!years.length) {
    const cur = String(state.branding.year || new Date().getFullYear());
    years.push(cur);
  }
  return years.sort();
}

function renderAnnualTable(tab) {
  if (!Array.isArray(tab.years)) tab.years = [String(tab.tabYear || state.branding.year || new Date().getFullYear())];
  if (!tab.tabYear) tab.tabYear = tab.years[tab.years.length - 1];

  // Auto-detectar columnas tipo "date" por nombre (Fecha Balance, vencimiento, etc.) ANTES de calcular stats
  autoDetectDateCols(tab);

  const allYears = getAnnualYearsAvailable(tab);
  const showAll = !!userPrefs[`annualShowAll_${tab.id}`];
  const currentYear = String(tab.tabYear);

  const yearsToCount = showAll ? allYears : [currentYear];
  // Calcular estadísticas completas (para todos los KPIs disponibles)
  const annualStats = computeAnnualStats(tab, yearsToCount);
  const { done, pending, total, pct, naTotal, overdueRows } = annualStats;

  const baseY = parseInt(currentYear) || new Date().getFullYear();
  const yearOpts = [];
  for (let y = baseY - 5; y <= baseY + 5; y++) yearOpts.push(String(y));
  allYears.forEach(y => { if (!yearOpts.includes(y)) yearOpts.push(y); });
  yearOpts.sort();

  let html = `
    <div class="section-header">
      <div class="section-title editable-title" data-edit="tab.name" data-tab-id="${tab.id}">
        ${tab.name} <span>${showAll ? allYears[0]+'–'+allYears[allYears.length-1] : currentYear}</span>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        ${!showAll ? `<select id="annual-year-sel" onchange="setAnnualYear('${tab.id}', this.value)" title="Año de balance" style="padding:6px 10px;border:1px solid var(--c-border);background:var(--c-card);border-radius:2px;font-family:inherit;font-size:13px;font-weight:700;color:var(--c-text);cursor:pointer;">
          ${yearOpts.map(y => `<option value="${y}"${y===currentYear?' selected':''}>${y}</option>`).join('')}
        </select>` : ''}
        <button class="btn btn-outline btn-sm" onclick="toggleAnnualShowAll('${tab.id}')" title="${showAll ? 'Ver solo el año seleccionado' : 'Ver todos los años en una sola vista'}">
          ${showAll ? '◧ Ver un año' : '⊞ Ver todos los años'}
        </button>
        <div class="legend">
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-green)"></div> Hecho</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-pending)"></div> Pendiente</div>
          <div class="legend-item"><div class="legend-dot" style="background:var(--c-border)"></div> N/A</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="openAnnualKPIsConfig('${tab.id}')" title="Configurar qué KPIs ver arriba" style="font-size:11px;">⚙ KPIs</button>
        <button class="btn btn-gold" onclick="openAddEntity('${tab.id}')">+ Agregar fila</button>
        ${tabPrivacyButton(tab)}
      </div>
    </div>`;

  html += renderSubTabsBar(tab);
  html += renderAnnualKPIs(tab, annualStats);

  if (showAll) html += renderAnnualAllYears(tab, allYears);
  else html += renderAnnualSingleYear(tab, currentYear);

  return html;
}

// ===== KPIs configurables (pestañas annual) =====
// Catálogo de KPIs disponibles
const ANNUAL_KPI_CATALOG = {
  done:      { label: 'Realizados',      icon: '✅', color: 'green' },
  pending:   { label: 'Pendientes',      icon: '⏳', color: 'red' },
  pct:       { label: '% Completado',    icon: '📊', color: '' },
  total:     { label: 'Aplicables',      icon: '📋', color: '' },
  na:        { label: 'No aplicables',   icon: '➖', color: '' },
  overdue:   { label: 'Empresas atrasadas', icon: '🔴', color: 'red' },
  topPend:   { label: 'Empresa con más pendientes', icon: '🏆', color: '' },
};

function getAnnualKPIs(tab) {
  if (!Array.isArray(tab.kpis) || !tab.kpis.length) return ['done', 'pending', 'pct'];
  return tab.kpis.filter(k => ANNUAL_KPI_CATALOG[k]).slice(0, 4);
}

function computeAnnualStats(tab, years) {
  let done = 0, pending = 0, naTotal = 0;
  const rowPendings = {}; // rowIdx -> count pendientes
  let overdueRowsCount = 0;
  const today = new Date().toISOString().slice(0, 10);

  years.forEach(y => {
    tab.rows.forEach((r, ri) => {
      const cellsY = (r.cellsByYear && r.cellsByYear[y]) || {};
      tab.columns.forEach((_, ci) => {
        const colType = annualColType(tab, ci);
        if (colType === 'date' || colType === 'comments') return; // las fecha y comentarios no cuentan
        if (isCellNA(r, ci)) { naTotal++; return; } // N/A no cuenta
        const c = cellsY[ci] || { s: 'empty' };
        if (c.s === 'done') done++;
        else if (c.s === 'empty' || c.s === 'pending') {
          pending++;
          rowPendings[ri] = (rowPendings[ri] || 0) + 1;
        }
      });
    });
  });

  // Empresas atrasadas: filas que tienen al menos una columna 'date' con fecha pasada
  // y al menos una celda 'normal' en estado pendiente.
  tab.rows.forEach((r, ri) => {
    let hasOverdueDate = false;
    let hasPending = false;
    years.forEach(y => {
      const cellsY = (r.cellsByYear && r.cellsByYear[y]) || {};
      tab.columns.forEach((_, ci) => {
        const colType = annualColType(tab, ci);
        const c = cellsY[ci] || { s: 'empty' };
        if (colType === 'date') {
          if (c.d && c.d < today) hasOverdueDate = true;
        } else if (colType !== 'comments' && !isCellNA(r, ci) && (c.s === 'empty' || c.s === 'pending')) {
          hasPending = true;
        }
      });
    });
    if (hasOverdueDate && hasPending) overdueRowsCount++;
  });

  const total = done + pending;
  const pct = total > 0 ? Math.round(done / total * 100) : 0;

  // Top pending row
  let topPendRow = null, topPendCount = 0;
  Object.keys(rowPendings).forEach(ri => {
    if (rowPendings[ri] > topPendCount) {
      topPendCount = rowPendings[ri];
      topPendRow = tab.rows[ri];
    }
  });

  return {
    done, pending, total, pct, naTotal,
    overdueRows: overdueRowsCount,
    topPendName: topPendRow ? topPendRow.name : '—',
    topPendCount
  };
}

function renderAnnualKPIs(tab, stats) {
  const kpis = getAnnualKPIs(tab);
  const cards = kpis.map(k => {
    const def = ANNUAL_KPI_CATALOG[k] || {};
    let num = '', label = def.label || k;
    if (k === 'done') num = stats.done;
    else if (k === 'pending') num = stats.pending;
    else if (k === 'pct') num = stats.pct + '%';
    else if (k === 'total') num = stats.total;
    else if (k === 'na') num = stats.naTotal;
    else if (k === 'overdue') num = stats.overdueRows;
    else if (k === 'topPend') {
      num = stats.topPendCount;
      label = stats.topPendName === '—' ? 'Sin pendientes' : `Más pendientes: ${stats.topPendName}`;
    }
    const cls = def.color ? ` ${def.color}` : '';
    return `<div class="stat-card${cls}"><div class="stat-num">${num}</div><div class="stat-label">${def.icon || ''} ${label}</div></div>`;
  }).join('');
  return `<div class="stats-bar">${cards}</div>`;
}

function openAnnualKPIsConfig(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const current = getAnnualKPIs(tab);
  const wrap = document.getElementById('kpi-config-list');
  if (!wrap) return;
  wrap.innerHTML = Object.entries(ANNUAL_KPI_CATALOG).map(([k, def]) => `
    <label class="kpi-config-row" style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid var(--c-border);border-radius:4px;margin-bottom:6px;cursor:pointer;">
      <input type="checkbox" value="${k}"${current.includes(k)?' checked':''} onchange="onKPIToggleChange(this)">
      <span style="font-size:18px;">${def.icon}</span>
      <span style="flex:1;">${def.label}</span>
    </label>
  `).join('');
  document.getElementById('kpi-config-tabid').value = tabId;
  updateKPIConfigCount();
  document.getElementById('modal-kpi-config').classList.add('open');
}

function onKPIToggleChange(cb) {
  const wrap = document.getElementById('kpi-config-list');
  const checked = wrap.querySelectorAll('input[type="checkbox"]:checked');
  if (checked.length > 4) {
    cb.checked = false;
    toast('Máximo 4 KPIs');
  }
  updateKPIConfigCount();
}

function updateKPIConfigCount() {
  const wrap = document.getElementById('kpi-config-list');
  if (!wrap) return;
  const n = wrap.querySelectorAll('input[type="checkbox"]:checked').length;
  const counter = document.getElementById('kpi-config-count');
  if (counter) counter.textContent = `${n} / 4 seleccionados`;
}

function saveAnnualKPIsConfig() {
  const tabId = document.getElementById('kpi-config-tabid').value;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const wrap = document.getElementById('kpi-config-list');
  const selected = Array.from(wrap.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  if (!selected.length) { toast('Elegí al menos un KPI'); return; }
  tab.kpis = selected;
  saveState();
  document.getElementById('modal-kpi-config').classList.remove('open');
  renderContent();
  toast('✓ KPIs actualizados');
}

// Helper: tipo de columna en una pestaña annual
// Devuelve 'date' para columnas informativas (fecha) o 'normal' (estado hecho/pendiente)
function annualColType(tab, colIdx) {
  if (!tab.colTypes) return 'normal';
  return tab.colTypes[colIdx] || 'normal';
}

// ¿Esta celda está marcada como N/A para esta empresa? (no aplica)
function isCellNA(row, colIdx) {
  if (!row || !Array.isArray(row.naCols)) return false;
  return row.naCols.includes(Number(colIdx));
}

function setRowNACols(tab, rowIdx, naColsArr) {
  const r = tab.rows[rowIdx];
  if (!r) return;
  r.naCols = Array.isArray(naColsArr) ? naColsArr.map(Number).filter(n => !isNaN(n)) : [];
  saveState();
}

function setAnnualColType(tab, colIdx, type) {
  if (!tab.colTypes) tab.colTypes = {};
  if (type === 'normal') delete tab.colTypes[colIdx];
  else tab.colTypes[colIdx] = type;
}

// Auto-detectar columnas que se ven como "fecha" por su nombre (heurística para columnas existentes)
function autoDetectDateCols(tab) {
  if (!tab || !Array.isArray(tab.columns)) return false;
  if (tab._dateColsDetected) return false; // solo una vez
  let changed = false;
  tab.columns.forEach((name, ci) => {
    const n = String(name || '').toLowerCase();
    // Si el nombre incluye "fecha", "balance", "vto", "vencimiento" — sugerir tipo date
    if (annualColType(tab, ci) === 'normal' && /\b(fecha|balance|vto|vencimiento|cierre)\b/.test(n)) {
      setAnnualColType(tab, ci, 'date');
      changed = true;
    }
    // Si el nombre incluye "comentario(s)", "observacion(es)" — sugerir tipo comments
    if (annualColType(tab, ci) === 'normal' && /\b(comentario|comentarios|observaci|nota)/.test(n)) {
      setAnnualColType(tab, ci, 'comments');
      changed = true;
    }
  });
  tab._dateColsDetected = true;
  return changed;
}

// Estados para columna tipo "comments" (saldo a pagar, no aplica, CCE a solicitar)
const COMMENT_STATES = {
  empty:        { label: 'Sin definir',        icon: '○',    color: '#999',    bg: 'transparent' },
  pay:          { label: 'Saldo a pagar',      icon: '💰',   color: '#fff',    bg: '#c0392b' },
  na:           { label: 'No aplica',          icon: '—',    color: '#888',    bg: '#e8e8e8' },
  credit:       { label: 'CCE a solicitar',    icon: '✓',    color: '#fff',    bg: '#27ae60' }
};

// HTML de la celda según tipo de columna
function annualCellInnerHTML(cell, colType) {
  if (colType === 'date') {
    // Solo mostramos la fecha; no usamos el estado hecho/pendiente
    if (cell && cell.d) {
      return `<div class="cell-date-only" title="${cell.c ? cell.c.replace(/"/g,'&quot;') : ''}">${fmtDate(cell.d)}</div>`;
    }
    return `<span class="cell-empty">—</span>`;
  }
  if (colType === 'comments') {
    // Estados especiales para comentarios contables
    const state = (cell && cell.cs) || 'empty';
    const def = COMMENT_STATES[state] || COMMENT_STATES.empty;
    const hasComment = cell && cell.c && cell.c.trim();
    const dotEl = hasComment ? '<span class="comment-dot"></span>' : '';
    const tooltip = hasComment ? cell.c.replace(/"/g,'&quot;') : def.label;
    if (state === 'empty') {
      return `<span class="cell-empty" title="${tooltip}">○${dotEl}</span>`;
    }
    return `<div class="cell-comment-state" style="background:${def.bg};color:${def.color};" title="${tooltip}">${def.icon} ${def.label}${dotEl}</div>`;
  }
  // Normal: usa el renderizador existente
  return cellInnerHTML(cell);
}

// Encabezado para columna (con ícono si es date)
function annualColHeader(tab, ci) {
  const name = tab.columns[ci];
  const type = annualColType(tab, ci);
  let icon = '';
  let typeTooltip = '';
  if (type === 'date') {
    icon = '<span class="col-type-icon" title="Columna tipo fecha (no cuenta para el % completado)">📅</span> ';
    typeTooltip = 'Tipo actual: 📅 Fecha. Clic para cambiar a 💬 Comentario.';
  } else if (type === 'comments') {
    icon = '<span class="col-type-icon" title="Columna tipo comentario (estados saldo a pagar/no aplica/CCE)">💬</span> ';
    typeTooltip = 'Tipo actual: 💬 Comentario. Clic para cambiar a Normal.';
  } else {
    typeTooltip = 'Tipo actual: Normal (realizado/pendiente). Clic para cambiar a 📅 Fecha.';
  }
  return `${icon}<span class="editable-title" data-edit="col" data-tab-id="${tab.id}" data-col="${ci}">${name}</span><span class="col-type-toggle" onclick="event.stopPropagation();toggleAnnualColType('${tab.id}',${ci})" title="${typeTooltip}">⚙</span><span class="col-x" onclick="removeColumn('${tab.id}',${ci})">×</span>`;
}

function toggleAnnualColType(tabId, ci) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const current = annualColType(tab, ci);
  // Ciclo: normal → date → comments → normal
  let next, msg;
  if (current === 'normal') { next = 'date';     msg = '📅 Columna ahora es Fecha (informativa, no cuenta para %)'; }
  else if (current === 'date')    { next = 'comments'; msg = '💬 Columna ahora es Comentario (saldo a pagar / no aplica / CCE)'; }
  else                             { next = 'normal';   msg = 'Columna ahora es Normal (realizado/pendiente, cuenta para %)'; }
  setAnnualColType(tab, ci, next);
  saveState();
  toast(msg);
  renderContent();
}

function renderAnnualSingleYear(tab, year) {
  autoDetectDateCols(tab);
  let html = `<div class="table-wrap"><table><thead><tr>`;
  html += `<th>Empresa</th>`;
  html += tab.columns.map((_, ci) => `<th>${annualColHeader(tab, ci)}</th>`).join('');
  html += `<th class="th-accent" style="cursor:pointer" onclick="openAddCol('${tab.id}')">+</th>`;
  html += `</tr></thead><tbody>`;

  const visibleRows = getVisibleRows(tab);
  visibleRows.forEach((r) => {
    const ri = tab.rows.indexOf(r);
    const lockBtn = `<span class="row-lock${r.locked?' locked':''}" onclick="event.stopPropagation();toggleRowLock('${tab.id}',${ri})" title="${r.locked?'Fila bloqueada':'Bloquear fila'}">${r.locked?'🔒':'🔓'}</span>`;
    const naBtn = `<span class="row-na-cfg" onclick="event.stopPropagation();openRowNAConfig('${tab.id}',${ri})" title="Configurar qué declaraciones aplican a esta empresa">⚙</span>`;
    const moveBtn = tabSupportsSubTabs(tab) && getTabSubTabs(tab).length ? `<span class="row-move-sub" onclick="event.stopPropagation();openMoveToSubTab('${tab.id}',${ri})" title="Mover a otra carpeta">📁</span>` : '';
    html += `<tr${r.locked?' class="row-locked"':''}><td><span class="editable-title" data-edit="row" data-tab-id="${tab.id}" data-row="${ri}">${r.name}</span>${naBtn}${moveBtn}${lockBtn}<span class="row-x" onclick="removeRow('${tab.id}',${ri})">✕</span></td>`;
    tab.columns.forEach((_, ci) => {
      const colType = annualColType(tab, ci);
      const isNA = colType !== 'date' && isCellNA(r, ci);
      if (isNA) {
        html += `<td class="cell-na" title="No aplica a esta empresa">➖</td>`;
        return;
      }
      const c = getCell(tab, r, ci);
      const clickAction = r.locked ? '' :
        (colType === 'date'
          ? `onclick="openAnnualDateCell('${tab.id}',${ri},${ci})"`
          : `onclick="openCellModal('${tab.id}',${ri},${ci})"`);
      html += `<td style="cursor:${r.locked?'default':'pointer'}" ${clickAction}>${annualCellInnerHTML(c, colType)}</td>`;
    });
    html += `<td></td></tr>`;
  });
  if (visibleRows.length === 0) {
    const isFiltered = getTabSubTabs(tab).length && getActiveSubTabId(tab);
    const msg = isFiltered ? 'No hay empresas en esta carpeta. Movélas desde "Todas" con 📁.' : 'No hay empresas registradas. Hacé clic en "+ Agregar fila".';
    html += `<tr><td colspan="${tab.columns.length + 2}" style="text-align:center;color:var(--c-text-muted);padding:30px;">${msg}</td></tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

function renderAnnualAllYears(tab, years) {
  autoDetectDateCols(tab);
  let html = `<div class="table-wrap"><table class="annual-multi-table"><thead>`;
  html += `<tr><th rowspan="2">Empresa</th>`;
  years.forEach(y => {
    html += `<th colspan="${tab.columns.length}" style="background:var(--c-header);color:#fff;text-align:center;border-left:2px solid var(--c-accent);font-size:14px;font-weight:700;letter-spacing:2px;padding:8px 4px;">${y}</th>`;
  });
  html += `</tr>`;
  html += `<tr>`;
  years.forEach(() => {
    tab.columns.forEach((c, ci) => {
      const leftBorder = ci === 0 ? 'border-left:2px solid var(--c-accent);' : '';
      const type = annualColType(tab, ci);
      const ico = type === 'date' ? '📅 ' : (type === 'comments' ? '💬 ' : '');
      html += `<th style="${leftBorder}font-size:11px;font-weight:600;">${ico}${c}</th>`;
    });
  });
  html += `</tr></thead><tbody>`;

  const visibleRows = getVisibleRows(tab);
  visibleRows.forEach((r) => {
    const ri = tab.rows.indexOf(r);
    const lockBtn = `<span class="row-lock${r.locked?' locked':''}" onclick="event.stopPropagation();toggleRowLock('${tab.id}',${ri})">${r.locked?'🔒':'🔓'}</span>`;
    const naBtn = `<span class="row-na-cfg" onclick="event.stopPropagation();openRowNAConfig('${tab.id}',${ri})" title="Configurar qué declaraciones aplican">⚙</span>`;
    const moveBtn = tabSupportsSubTabs(tab) && getTabSubTabs(tab).length ? `<span class="row-move-sub" onclick="event.stopPropagation();openMoveToSubTab('${tab.id}',${ri})" title="Mover a otra carpeta">📁</span>` : '';
    html += `<tr${r.locked?' class="row-locked"':''}><td><span class="editable-title" data-edit="row" data-tab-id="${tab.id}" data-row="${ri}">${r.name}</span>${naBtn}${moveBtn}${lockBtn}</td>`;
    years.forEach(y => {
      const cellsY = (r.cellsByYear && r.cellsByYear[y]) || {};
      tab.columns.forEach((_, ci) => {
        const colType = annualColType(tab, ci);
        const leftBorder = ci === 0 ? 'border-left:2px solid var(--c-accent);' : '';
        const isNA = colType !== 'date' && isCellNA(r, ci);
        if (isNA) {
          html += `<td class="cell-na" style="${leftBorder}" title="No aplica a esta empresa">➖</td>`;
          return;
        }
        const c = cellsY[ci] || { s: 'empty' };
        const clickAction = r.locked ? '' : `onclick="openAnnualCellAtYear('${tab.id}',${ri},${ci},'${y}')"`;
        html += `<td style="cursor:${r.locked?'default':'pointer'};${leftBorder}" ${clickAction}>${cellInnerHTML(c)}</td>`;
      });
    });
    html += `</tr>`;
  });
  if (visibleRows.length === 0) {
    html += `<tr><td colspan="${years.length * tab.columns.length + 1}" style="text-align:center;color:var(--c-text-muted);padding:30px;">No hay empresas registradas.</td></tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

// Mover fila a otra subpestaña (modal simple)
function openMoveToSubTab(tabId, rowIdx) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const r = tab.rows[rowIdx];
  if (!r) return;
  const subs = getTabSubTabs(tab);
  const current = r.subTabId || '';
  const opts = ['', ...subs.map(s => s.id)];
  const labels = ['Todas (sin carpeta)', ...subs.map(s => `📁 ${s.name}`)];
  const currentIdx = opts.indexOf(current);
  const optionsText = opts.map((id, i) => `${i+1}. ${labels[i]}${id===current?' ← actual':''}`).join('\n');
  const input = prompt(`Mover "${r.name}" a:\n\n${optionsText}\n\nEscribí el número:`, String(currentIdx+1));
  if (!input) return;
  const idx = parseInt(input) - 1;
  if (isNaN(idx) || idx < 0 || idx >= opts.length) { toast('Número inválido'); return; }
  moveRowToSubTab(tabId, rowIdx, opts[idx]);
  toast(`✓ Movida a "${labels[idx]}"`);
}

// ===== Configurar columnas N/A por empresa =====
function openRowNAConfig(tabId, rowIdx) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const r = tab.rows[rowIdx];
  if (!r) return;
  const currentNA = Array.isArray(r.naCols) ? r.naCols.map(Number) : [];

  document.getElementById('row-na-tabid').value = tabId;
  document.getElementById('row-na-rowidx').value = rowIdx;
  document.getElementById('row-na-empresa').textContent = r.name;

  const wrap = document.getElementById('row-na-cols-list');
  wrap.innerHTML = tab.columns.map((colName, ci) => {
    const colType = annualColType(tab, ci);
    if (colType === 'date') {
      return `<div style="padding:8px;color:var(--c-text-muted);font-size:12px;font-style:italic;border:1px dashed var(--c-border-soft);border-radius:4px;margin-bottom:6px;">📅 ${bbEscape(colName)} <span style="opacity:.7;">(columna fecha, siempre aplica)</span></div>`;
    }
    const applies = !currentNA.includes(ci); // SÍ aplica si NO está en N/A
    return `<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--c-border);border-radius:4px;margin-bottom:6px;cursor:pointer;background:${applies?'var(--c-bg-soft, transparent)':'#fafafa'};">
      <input type="checkbox" value="${ci}"${applies?' checked':''}>
      <span style="font-weight:600;">${bbEscape(colName)}</span>
      <span style="margin-left:auto;font-size:11px;color:var(--c-text-muted);">${applies ? 'SÍ aplica' : 'NO aplica'}</span>
    </label>`;
  }).join('');
  document.getElementById('modal-row-na').classList.add('open');
}

function saveRowNAConfig() {
  const tabId = document.getElementById('row-na-tabid').value;
  const rowIdx = parseInt(document.getElementById('row-na-rowidx').value);
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const wrap = document.getElementById('row-na-cols-list');
  const checkedCols = Array.from(wrap.querySelectorAll('input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
  // naCols = columnas que NO están tildadas (las que NO aplican)
  const naCols = [];
  tab.columns.forEach((_, ci) => {
    if (annualColType(tab, ci) === 'date') return; // las fecha nunca son N/A
    if (!checkedCols.includes(ci)) naCols.push(ci);
  });
  setRowNACols(tab, rowIdx, naCols);
  document.getElementById('modal-row-na').classList.remove('open');
  renderContent();
  const appliesCount = tab.columns.length - naCols.length;
  toast(`✓ Configurado: ${appliesCount} declaraciones aplican`);
}

function setAnnualYear(tabId, year) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  tab.tabYear = String(year);
  if (!Array.isArray(tab.years)) tab.years = [];
  if (!tab.years.includes(String(year))) {
    tab.years.push(String(year));
    tab.years.sort();
  }
  saveState();
  renderContent();
}

function toggleAnnualShowAll(tabId) {
  const key = `annualShowAll_${tabId}`;
  userPrefs[key] = !userPrefs[key];
  saveUserPrefs();
  renderContent();
}

function openAnnualCellAtYear(tabId, ri, ci, year) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  tab.tabYear = String(year);
  // Si la columna es tipo "date", abrir el modal de fecha en vez del de estado
  if (annualColType(tab, ci) === 'date') {
    openAnnualDateCell(tabId, ri, ci);
  } else {
    openCellModal(tabId, ri, ci);
  }
}

// Modal simple para celdas tipo "date": solo input de fecha, sin estado hecho/pendiente
let _annualDateCtx = null;
function openAnnualDateCell(tabId, ri, ci) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const row = tab.rows[ri];
  if (!row) return;
  const cell = getCell(tab, row, ci);
  _annualDateCtx = { tabId, ri, ci };
  // Llenar el modal
  document.getElementById('annual-date-row-name').textContent = row.name || '—';
  document.getElementById('annual-date-col-name').textContent = tab.columns[ci] || '—';
  document.getElementById('annual-date-year-label').textContent = tab.tabYear || '';
  document.getElementById('annual-date-input').value = cell.d || '';
  document.getElementById('annual-date-comment').value = cell.c || '';
  document.getElementById('modal-annual-date').classList.add('open');
  setTimeout(() => document.getElementById('annual-date-input').focus(), 100);
}

function saveAnnualDateCell() {
  if (!_annualDateCtx) return;
  const { tabId, ri, ci } = _annualDateCtx;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const row = tab.rows[ri];
  if (!row) return;
  const dateVal = document.getElementById('annual-date-input').value;
  const commentVal = document.getElementById('annual-date-comment').value.trim();
  // Guardamos como celda con campo .d (la fecha) y .c (comentario) pero SIN estado.
  // Si está vacío, borramos la celda.
  const cells = getCells(tab, row);
  if (!dateVal && !commentVal) {
    delete cells[ci];
  } else {
    cells[ci] = { s: 'empty' }; // estado neutro — no cuenta como done ni pending para esta columna porque es tipo date
    if (dateVal) cells[ci].d = dateVal;
    if (commentVal) cells[ci].c = commentVal;
  }
  saveState();
  logAudit('edit', 'cell',
    `Editó fecha en "${row.name}" / ${tab.columns[ci]} (${tab.tabYear})`,
    null, { date: dateVal, comment: commentVal }, tab.id);
  closeModal('modal-annual-date');
  _annualDateCtx = null;
  renderContent();
}

function clearAnnualDateCell() {
  if (!_annualDateCtx) return;
  const { tabId, ri, ci } = _annualDateCtx;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const row = tab.rows[ri];
  const cells = getCells(tab, row);
  delete cells[ci];
  saveState();
  closeModal('modal-annual-date');
  _annualDateCtx = null;
  renderContent();
  toast('Celda vaciada');
}

function setTabLayout(tabId, layout) {
  setTabLayoutPref(tabId, layout);
  renderContent();
}

// ============ DETECCIÓN Y CONVERSIÓN AUTOMÁTICA A TIPO ANNUAL ============
// Detecta pestañas table cuyas columnas son años (sintomático de "quise hacer una anual").
// Las marca con _suggestAnnual=true. El primer render que las muestre abre el wizard.

function detectMisbuiltAnnualTabs() {
  if (!state.tabs) return;
  state.tabs.forEach(tab => {
    if (tab.type !== 'table') return;
    if (tab._annualConversionDeclined) return; // ya dijo "no"
    if (tab._suggestAnnual) return;             // ya marcada
    if (tab.colMode !== 'years') return;        // solo si la crearon con modo "varios años"
    if (!Array.isArray(tab.columns) || !tab.columns.length) return;
    // Heurística: al menos 2 columnas son años de 4 dígitos
    const yearCols = tab.columns.filter(c => /^\d{4}$/.test(String(c).trim()));
    if (yearCols.length >= 2) {
      tab._suggestAnnual = true;
    }
  });
}

// Cuando renderContent va a mostrar una pestaña con _suggestAnnual, abrimos el wizard
let _annualConversionShownFor = null;

function maybeShowAnnualConversionWizard(tab) {
  if (!tab._suggestAnnual) return false;
  if (_annualConversionShownFor === tab.id) return false; // ya se mostró en esta sesión
  _annualConversionShownFor = tab.id;
  setTimeout(() => openAnnualConversionWizard(tab.id), 200);
  return true;
}

function openAnnualConversionWizard(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  // Detectar años y columnas no-año
  const yearCols = tab.columns.filter(c => /^\d{4}$/.test(String(c).trim())).map(c => String(c).trim());
  const otherCols = tab.columns.filter(c => !/^\d{4}$/.test(String(c).trim()));
  // Sugerir DDJJ por defecto si "otras columnas" tiene cosas razonables
  const suggestedCols = otherCols.length > 0
    ? otherCols.filter(c => c && c.length < 40 && !c.toLowerCase().includes('no quiero')).join(', ')
    : 'Fecha Balance, DJ 2178, DJ 1050, DJ 3107, Comentarios';
  // Llenar el modal
  document.getElementById('conv-annual-tab-name').textContent = tab.name;
  document.getElementById('conv-annual-tab-id').value = tabId;
  document.getElementById('conv-annual-detected').textContent = yearCols.join(', ') || '(ninguno detectado)';
  document.getElementById('conv-annual-cols').value = suggestedCols;
  document.getElementById('modal-conv-annual').classList.add('open');
}

function confirmAnnualConversion() {
  const tabId = document.getElementById('conv-annual-tab-id').value;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) { closeModal('modal-conv-annual'); return; }
  const newCols = document.getElementById('conv-annual-cols').value
    .split(',').map(s => s.trim()).filter(Boolean);
  if (!newCols.length) { toast('Definí al menos una columna'); return; }
  // Detectar años existentes
  const yearCols = tab.columns
    .map((c, i) => ({c: String(c).trim(), i}))
    .filter(o => /^\d{4}$/.test(o.c));
  const years = yearCols.map(o => o.c).sort();
  // Si no había años detectados, usar el año actual del estudio
  if (!years.length) years.push(String(state.branding.year || new Date().getFullYear()));
  // Migrar datos existentes: para cada fila, las celdas que estaban en columna-año se mueven
  // a cellsByYear[ese_año] con índice 0. Las celdas de columnas no-año se descartan (no hay
  // forma razonable de mapear sin perder semántica, pero podemos guardarlas como
  // "Comentarios" en el año actual si tienen contenido).
  tab.rows.forEach(row => {
    if (!row.cellsByYear) row.cellsByYear = {};
    const oldCells = row.cells || {};
    yearCols.forEach(yc => {
      const cell = oldCells[yc.i];
      if (cell && (cell.s === 'done' || cell.s === 'pending' || cell.c || cell.d)) {
        if (!row.cellsByYear[yc.c]) row.cellsByYear[yc.c] = {};
        // Lo guardamos en el índice 0 (primera columna nueva)
        row.cellsByYear[yc.c][0] = cell;
      }
    });
    row.cells = {}; // limpio el formato viejo
  });
  // Aplicar nueva estructura
  tab.type = 'annual';
  tab.columns = newCols;
  tab.years = years;
  tab.tabYear = years[years.length - 1]; // año más reciente por defecto
  delete tab.colMode;
  delete tab._suggestAnnual;
  // Audit
  if (typeof logAudit === 'function') {
    logAudit('edit', 'tab', 'Convirtió "' + tab.name + '" a Tabla Anual', null,
      { newColumns: newCols, years }, tab.id);
  }
  saveState();
  closeModal('modal-conv-annual');
  renderContent();
  toast('✓ Pestaña convertida a Tabla Anual');
}

function declineAnnualConversion() {
  const tabId = document.getElementById('conv-annual-tab-id').value;
  const tab = state.tabs.find(t => t.id === tabId);
  if (tab) {
    tab._annualConversionDeclined = true;
    delete tab._suggestAnnual;
    saveState();
  }
  closeModal('modal-conv-annual');
}

// ============ CELL ACCESS BY YEAR ============
// Las pestañas mensuales pueden tener datos distintos por año.
// Una pestaña se considera "por año" si:
//   - tiene tabYear definido, Y
//   - sus 12 columnas son meses (isMonths)
// En ese caso, row.cellsByYear[año] guarda las celdas; row.cells es legado.

function tabIsMonthlyByYear(tab) {
  if (!tab || tab.type !== 'table') return false;
  if (!tab.tabYear) return false;
  if (tab.columns.length !== 12) return false;
  return tab.columns.every(c => MONTHS.includes(c) || MONTHS_SHORT.includes(c));
}

// Annual: pestaña donde cada año tiene su propio set de estados para las MISMAS columnas (DDJJ)
function tabIsAnnual(tab) {
  return !!(tab && tab.type === 'annual');
}

// Helper unificado: ¿esta pestaña almacena celdas por año?
function tabStoresCellsByYear(tab) {
  return tabIsMonthlyByYear(tab) || tabIsAnnual(tab);
}

function migrateRowToYear(row, year) {
  // Si la fila tenía row.cells (formato viejo) y la pestaña ahora es por año,
  // los datos existentes se asignan al año actual antes de cambiar.
  if (!row.cellsByYear) row.cellsByYear = {};
  if (row.cells && Object.keys(row.cells).length && !row.cellsByYear[year]) {
    row.cellsByYear[year] = row.cells;
    row.cells = {};
  }
  if (!row.cellsByYear[year]) row.cellsByYear[year] = {};
}

function getCells(tab, row) {
  // Si la pestaña usa años (mensual con año global, o annual con año independiente):
  //   - Lee/escribe de cellsByYear[tabYear].
  //   - Si el año pedido === año global Y row.cells tiene datos Y cellsByYear no existe, usa row.cells (compat).
  if (tabStoresCellsByYear(tab)) {
    if (!row.cellsByYear) row.cellsByYear = {};
    const tabY = String(tab.tabYear);
    const globalY = String(state.branding.year || '');

    // Modo compatibilidad: si el año pedido es el global y solo hay datos en row.cells, devolverlos.
    if (tabY === globalY && row.cells && Object.keys(row.cells).length) {
      if (!row.cellsByYear[tabY]) {
        row.cellsByYear[tabY] = row.cells;
        row.cells = {}; // ya migrado, nunca más se va a tocar
      }
      return row.cellsByYear[tabY];
    }
    if (!row.cellsByYear[tabY]) row.cellsByYear[tabY] = {};
    return row.cellsByYear[tabY];
  }
  if (!row.cells) row.cells = {};
  return row.cells;
}

function getCell(tab, row, colIdx) {
  const cells = getCells(tab, row);
  return cells[colIdx] || { s: 'empty' };
}

function setCell(tab, row, colIdx, value) {
  const cells = getCells(tab, row);
  cells[colIdx] = value;
}

function deleteCellAtIdx(tab, row, colIdx) {
  // Para columnas removidas / reordenadas
  const cells = getCells(tab, row);
  delete cells[colIdx];
}

function setTabYear(tabId, year) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  tab.tabYear = String(year);
  saveState();
  renderContent();
  toast('📅 Año cambiado a ' + year);
}

// REPARACIÓN: si las celdas guardadas en un año tienen fechas (campo .d) de OTRO año,
// las movemos al año correcto según la fecha. Esto arregla el bug donde celdas con
// fecha 2026-04-15 terminaron guardadas en cellsByYear['2027'].
function repairCellsByDate(silent) {
  if (!state.tabs) return 0;
  let moved = 0;
  state.tabs.forEach(tab => {
    if (tab.type !== 'table') return;
    const isMonthly = tab.columns && tab.columns.length === 12 &&
      tab.columns.every(c => MONTHS.includes(c) || MONTHS_SHORT.includes(c));
    if (!isMonthly) return;
    (tab.rows || []).forEach(row => {
      if (!row.cellsByYear) return;
      const yearsToProcess = Object.keys(row.cellsByYear);
      yearsToProcess.forEach(storedYear => {
        const cells = row.cellsByYear[storedYear];
        if (!cells) return;
        const cellKeys = Object.keys(cells);
        cellKeys.forEach(colIdx => {
          const cell = cells[colIdx];
          if (!cell || !cell.d) return; // sin fecha, no podemos saber
          const dateYear = (cell.d.match(/^(\d{4})/) || [])[1];
          if (!dateYear) return;
          if (dateYear === storedYear) return; // ya está en el año correcto
          // Moverlo al año correcto
          if (!row.cellsByYear[dateYear]) row.cellsByYear[dateYear] = {};
          // No pisar si ya hay algo distinto allí
          if (!row.cellsByYear[dateYear][colIdx]) {
            row.cellsByYear[dateYear][colIdx] = cell;
            delete cells[colIdx];
            moved++;
          }
        });
      });
      // Limpieza: borrar años que quedaron sin celdas
      Object.keys(row.cellsByYear).forEach(y => {
        if (row.cellsByYear[y] && Object.keys(row.cellsByYear[y]).length === 0) {
          delete row.cellsByYear[y];
        }
      });
    });
  });
  if (moved > 0) {
    saveState();
    if (!silent) toast(`🔧 ${moved} celda(s) movidas al año correcto según su fecha`);
  }
  return moved;
}

// Mover datos entre años (para arreglar casos donde quedaron en el año equivocado)
function moveTabDataBetweenYears(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab || !tabIsMonthlyByYear(tab)) {
    toast('Esta pestaña no soporta años múltiples');
    return;
  }
  // Listar años con datos
  const yearsWithData = new Set();
  (tab.rows || []).forEach(r => {
    if (r.cellsByYear) Object.keys(r.cellsByYear).forEach(y => {
      if (Object.keys(r.cellsByYear[y] || {}).length) yearsWithData.add(y);
    });
  });
  const yearList = Array.from(yearsWithData).sort();
  if (yearList.length === 0) { toast('No hay datos para mover'); return; }

  const from = prompt('¿De qué año querés mover los datos?\n\nAños con datos: ' + yearList.join(', '));
  if (!from || !yearList.includes(from)) { toast('Año inválido o cancelado'); return; }
  const to = prompt('¿A qué año querés moverlos? (ej. 2026)', '2026');
  if (!to || !/^\d{4}$/.test(to.trim())) { toast('Año inválido'); return; }
  const toYear = to.trim();
  if (from === toYear) { toast('Origen y destino son el mismo año'); return; }

  let conflicts = 0;
  (tab.rows || []).forEach(r => {
    if (!r.cellsByYear || !r.cellsByYear[from]) return;
    if (!r.cellsByYear[toYear]) r.cellsByYear[toYear] = {};
    Object.keys(r.cellsByYear[from]).forEach(colIdx => {
      if (r.cellsByYear[toYear][colIdx]) conflicts++;
      r.cellsByYear[toYear][colIdx] = r.cellsByYear[from][colIdx];
    });
    delete r.cellsByYear[from];
  });

  if (conflicts > 0) {
    if (!confirm(`Habrá ${conflicts} celda(s) sobrescrita(s) en ${toYear}. ¿Continuar?`)) {
      // Revertir? Simplificación: ya está hecho, advertimos.
    }
  }
  saveState();
  renderContent();
  toast(`✅ Datos movidos de ${from} a ${toYear}`);
}

// =========== HERRAMIENTA VISUAL DE REPARACIÓN POR AÑO ===========
function openYearRepairTool(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;

  // Recolectar datos por año
  const yearStats = {}; // { '2026': { rows: N, cells: M, sample: '...' } }
  const baseYear = String(state.branding.year);

  (tab.rows || []).forEach(row => {
    // row.cells (sin año asignado)
    if (row.cells && Object.keys(row.cells).length) {
      const key = '(sin año)';
      if (!yearStats[key]) yearStats[key] = { cells: 0, rowsAffected: new Set(), samples: [] };
      yearStats[key].cells += Object.keys(row.cells).length;
      yearStats[key].rowsAffected.add(row.name);
      Object.keys(row.cells).slice(0,3).forEach(k => {
        const c = row.cells[k];
        yearStats[key].samples.push(`${row.name} · ${tab.columns[k]||'col'+k}${c.d?' ('+c.d+')':''}`);
      });
    }
    // row.cellsByYear
    if (row.cellsByYear) {
      Object.keys(row.cellsByYear).forEach(y => {
        const cells = row.cellsByYear[y];
        if (!cells || !Object.keys(cells).length) return;
        if (!yearStats[y]) yearStats[y] = { cells: 0, rowsAffected: new Set(), samples: [] };
        yearStats[y].cells += Object.keys(cells).length;
        yearStats[y].rowsAffected.add(row.name);
        Object.keys(cells).slice(0,3).forEach(k => {
          const c = cells[k];
          yearStats[y].samples.push(`${row.name} · ${tab.columns[k]||'col'+k}${c.d?' ('+c.d+')':''}`);
        });
      });
    }
  });

  const years = Object.keys(yearStats).sort();
  const escapeJs = s => String(s).replace(/'/g,"\\'");

  let body = `
    <div style="margin-bottom:16px;padding:12px;background:#fff4d6;border-left:4px solid var(--c-accent);border-radius:4px;font-size:13px;">
      <strong>🔧 Reparador de años — ${tab.name}</strong><br>
      <span style="color:var(--c-text-muted);font-size:12px;">Año global del estudio: <strong>${baseYear}</strong></span>
    </div>
    <div style="margin-bottom:12px;">
      <button class="btn btn-gold btn-sm" onclick="repairByDate('${tab.id}')">✨ Auto-reparar por fecha</button>
      <small style="color:var(--c-text-muted);font-size:11px;display:block;margin-top:4px;">Mueve cada celda al año que indica su fecha (ej. fecha 2026-04-15 va al año 2026).</small>
    </div>
    <div class="table-wrap" style="max-height:400px;overflow:auto;">
      <table style="width:100%;font-size:13px;">
        <thead><tr style="position:sticky;top:0;background:var(--c-header);color:var(--c-accent);">
          <th style="padding:8px;text-align:left;">Año</th>
          <th style="padding:8px;text-align:right;">Filas</th>
          <th style="padding:8px;text-align:right;">Celdas</th>
          <th style="padding:8px;text-align:left;">Ejemplos</th>
          <th style="padding:8px;text-align:center;">Acciones</th>
        </tr></thead>
        <tbody>`;

  if (years.length === 0) {
    body += `<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--c-text-muted);">No hay datos en esta pestaña.</td></tr>`;
  } else {
    years.forEach(y => {
      const s = yearStats[y];
      const isBase = (y === baseYear);
      const isLegacy = (y === '(sin año)');
      body += `<tr style="border-bottom:1px solid var(--c-border);">
        <td style="padding:10px;font-weight:700;${isBase?'color:var(--c-green);':''}">${y}${isBase?' ⭐':''}${isLegacy?' ⚠️':''}</td>
        <td style="padding:10px;text-align:right;">${s.rowsAffected.size}</td>
        <td style="padding:10px;text-align:right;">${s.cells}</td>
        <td style="padding:10px;font-size:11px;color:var(--c-text-muted);">${s.samples.slice(0,3).map(escapeHtml).join('<br>')}${s.samples.length>3?'<br>…':''}</td>
        <td style="padding:10px;text-align:center;white-space:nowrap;">
          <button class="btn btn-outline btn-sm" onclick="moveYearTo('${tab.id}','${escapeJs(y)}')" title="Mover todo a otro año" style="font-size:11px;">⇄ Mover</button>
          <button class="btn btn-outline btn-sm" onclick="clearYearData('${tab.id}','${escapeJs(y)}')" title="Vaciar este año" style="font-size:11px;color:var(--c-red);border-color:var(--c-red);">🗑</button>
        </td>
      </tr>`;
    });
  }

  body += `</tbody></table></div>
    <div style="margin-top:14px;font-size:11px;color:var(--c-text-muted);">
      ⭐ = año global del estudio · ⚠️ = datos sin año asignado (legado)<br>
      Las celdas con fecha (ej. <code>2026-04-15</code>) deberían estar en el año de esa fecha.
    </div>`;

  // Modal genérico
  showCustomModal('🔧 Reparar datos por año', body, '900px');
}

// Helper: modal genérico simple
function showCustomModal(title, htmlBody, maxWidth) {
  let modal = document.getElementById('modal-custom');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'modal-custom';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `<div class="modal" style="max-width:${maxWidth||'600px'};">
    <button class="modal-close" onclick="closeModal('modal-custom')">×</button>
    <h3 style="margin-bottom:8px;">${title}</h3>
    <div>${htmlBody}</div>
    <div class="form-actions" style="margin-top:18px;">
      <button class="btn btn-gold" onclick="closeModal('modal-custom')">Cerrar</button>
    </div>
  </div>`;
  modal.classList.add('open');
}

function repairByDate(tabId) {
  const moved = repairCellsByDate(false);
  if (moved === 0) toast('✅ Todo está en su año correcto');
  closeModal('modal-custom');
  openYearRepairTool(tabId); // refrescar
}

function moveYearTo(tabId, fromYear) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const to = prompt(`Mover todos los datos del año "${fromYear}" a:`, state.branding.year);
  if (!to || !/^\d{4}$/.test(to.trim())) { toast('Año inválido'); return; }
  const toYear = to.trim();
  if (fromYear === toYear) { toast('Origen y destino son el mismo'); return; }

  let movedCells = 0;
  (tab.rows || []).forEach(r => {
    let sourceCells = null;
    if (fromYear === '(sin año)') {
      sourceCells = r.cells;
    } else {
      sourceCells = r.cellsByYear ? r.cellsByYear[fromYear] : null;
    }
    if (!sourceCells || !Object.keys(sourceCells).length) return;
    if (!r.cellsByYear) r.cellsByYear = {};
    if (!r.cellsByYear[toYear]) r.cellsByYear[toYear] = {};
    Object.keys(sourceCells).forEach(k => {
      r.cellsByYear[toYear][k] = sourceCells[k];
      movedCells++;
    });
    if (fromYear === '(sin año)') {
      r.cells = {};
    } else {
      delete r.cellsByYear[fromYear];
    }
  });
  saveState();
  closeModal('modal-custom');
  renderContent();
  toast(`✅ ${movedCells} celda(s) movidas de "${fromYear}" a ${toYear}`);
}

function clearYearData(tabId, year) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  if (!confirm(`¿Vaciar TODOS los datos del año "${year}" en "${tab.name}"?\n\nLas filas se mantienen, solo se borran las marcas. Esta acción no se puede deshacer.`)) return;
  let cleared = 0;
  (tab.rows || []).forEach(r => {
    if (year === '(sin año)') {
      if (r.cells) { cleared += Object.keys(r.cells).length; r.cells = {}; }
    } else {
      if (r.cellsByYear && r.cellsByYear[year]) {
        cleared += Object.keys(r.cellsByYear[year]).length;
        delete r.cellsByYear[year];
      }
    }
  });
  saveState();
  closeModal('modal-custom');
  renderContent();
  toast(`🗑 ${cleared} celda(s) borradas del año "${year}"`);
}

function renderTabAsTable(tab, cols, isMonths) {
  let html = `<div class="table-wrap"><table><thead><tr>`;
  html += `<th>Nombre</th>`;
  if (tab.hasTag) html += `<th class="th-accent">${tab.tagLabel||'Etiqueta'}</th>`;
  html += cols.map(ci => {
    const label = isMonths ? (MONTHS_SHORT[MONTHS.indexOf(tab.columns[ci])] || tab.columns[ci].substring(0,3)) : tab.columns[ci];
    return `<th><span class="editable-title" data-edit="col" data-tab-id="${tab.id}" data-col="${ci}">${label}</span><span class="col-x" onclick="removeColumn('${tab.id}',${ci})">×</span></th>`;
  }).join('');
  html += `<th class="th-accent" style="cursor:pointer" onclick="openAddCol('${tab.id}')">+</th>`;
  html += `</tr></thead><tbody>`;

  const visibleRows = getVisibleRows(tab);
  visibleRows.forEach((r) => {
    const ri = tab.rows.indexOf(r);
    const lockBtn = `<span class="row-lock${r.locked?' locked':''}" onclick="event.stopPropagation();toggleRowLock('${tab.id}',${ri})" title="${r.locked?'Fila bloqueada - clic para desbloquear':'Bloquear fila'}">${r.locked?'🔒':'🔓'}</span>`;
    const moveBtn = tabSupportsSubTabs(tab) && getTabSubTabs(tab).length ? `<span class="row-move-sub" onclick="event.stopPropagation();openMoveToSubTab('${tab.id}',${ri})" title="Mover a otra carpeta">📁</span>` : '';
    html += `<tr${r.locked?' class="row-locked"':''}><td><span class="editable-title" data-edit="row" data-tab-id="${tab.id}" data-row="${ri}">${r.name}</span>${moveBtn}${lockBtn}<span class="row-x" onclick="removeRow('${tab.id}',${ri})">✕</span></td>`;
    if (tab.hasTag) html += `<td><span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);" onclick="${r.locked?'':`editTag('${tab.id}',${ri})`}">${r.tag||'—'}</span></td>`;
    cols.forEach(ci => {
      const c = getCell(tab, r, ci);
      const clickAction = r.locked ? '' : `onclick="openCellModal('${tab.id}',${ri},${ci})"`;
      html += `<td style="cursor:${r.locked?'default':'pointer'}" ${clickAction}>${cellInnerHTML(c)}</td>`;
    });
    html += `<td></td></tr>`;
  });
  if (visibleRows.length === 0) {
    const isFiltered = getTabSubTabs(tab).length && getActiveSubTabId(tab);
    const msg = isFiltered ? 'No hay filas en esta carpeta. Movélas desde "Todas" con el botón 📁.' : 'No hay registros.';
    html += `<tr><td colspan="${cols.length + (tab.hasTag?3:2)}" style="text-align:center;color:var(--c-text-muted);padding:30px;">${msg}</td></tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

function cellInnerHTML(c) {
  const hasComment = c.c && c.c.trim();
  const dot = hasComment ? '<span class="comment-dot"></span>' : '';
  // Ícono de "enviado al cliente" (solo si la celda está done y tiene es=true)
  const sentIcon = (c.s === 'done' && c.es) ? `<span class="cell-sent-icon" title="📤 Enviado al cliente${c.ed ? ' el ' + fmtDate(c.ed) : ''}">📤</span>` : '';
  if (c.s === 'done') {
    // Si hay etiqueta corta (cell.t), mostrarla en verde. Si no, mostrar fecha. Si no, ✓.
    const label = (c.t && c.t.trim()) ? c.t.trim() : (c.d ? fmtDate(c.d) : '✓');
    const tooltip = [
      c.d ? 'Realizado: ' + fmtDate(c.d) : '',
      c.es && c.ed ? 'Enviado al cliente: ' + fmtDate(c.ed) : (c.es ? 'Enviado al cliente' : ''),
      hasComment ? c.c.replace(/"/g,'&quot;') : ''
    ].filter(Boolean).join(' · ');
    return `<div class="cell-done${c.es?' cell-done-sent':''}" title="${tooltip}">${label}${sentIcon}${dot}</div>`;
  }
  if (c.s === 'pending') return `<div class="cell-pending" title="${hasComment?c.c.replace(/"/g,'&quot;'):''}">⏳${dot}</div>`;
  if (c.s === 'na')      return `<span class="cell-na">—</span>`;
  return `<span class="cell-empty" title="${hasComment?c.c.replace(/"/g,'&quot;'):''}">○${dot}</span>`;
}

function renderTabAsCards(tab, isMonths) {
  if (tab.rows.length === 0) return `<div style="text-align:center;color:var(--c-text-muted);padding:40px;background:var(--c-card);border:1px dashed var(--c-border);border-radius:6px;">No hay registros. Hacé clic en "+ Agregar fila".</div>`;
  let html = `<div class="cards-grid">`;
  tab.rows.forEach((r, ri) => {
    const cells = tab.columns.map((c,i) => getCell(tab, r, i));
    const doneCount = cells.filter(c=>c.s==='done').length;
    const pendCount = cells.filter(c=>c.s==='pending'||c.s==='empty').length;
    const pct = (doneCount+pendCount) ? Math.round(doneCount/(doneCount+pendCount)*100) : 0;
    html += `<div class="entity-card">
      <div class="entity-card-header">
        <div>
          <div class="entity-card-name editable-title" data-edit="row" data-tab-id="${tab.id}" data-row="${ri}">${r.name}</div>
          ${tab.hasTag && r.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-top:4px;display:inline-block;">${r.tag}</span>`:''}
        </div>
        <div class="entity-card-pct" style="color:${pct===100?'var(--c-green)':pct>50?'var(--c-accent)':'var(--c-red)'}">${pct}%</div>
      </div>
      <div class="entity-card-progress"><div class="entity-card-progress-bar" style="width:${pct}%;background:${pct===100?'var(--c-green)':pct>50?'var(--c-accent)':'var(--c-red)'}"></div></div>
      <div class="entity-card-grid">`;
    tab.columns.forEach((cn, ci) => {
      const c = getCell(tab, r, ci);
      const label = isMonths ? (MONTHS_SHORT[MONTHS.indexOf(cn)] || cn.substring(0,3)) : cn;
      const cls = c.s === 'done' ? 'done' : c.s === 'pending' ? 'pend' : c.s === 'na' ? 'na' : 'empty';
      html += `<div class="entity-card-cell ${cls}" onclick="openCellModal('${tab.id}',${ri},${ci})" title="${cn}">
        <div class="ec-month">${label}</div>
        <div class="ec-status">${c.s==='done'?(c.d?fmtDate(c.d):'✓'):c.s==='pending'?'⏳':c.s==='na'?'—':'○'}</div>
      </div>`;
    });
    html += `</div>
      <div class="entity-card-footer"><button class="btn btn-outline btn-sm" onclick="removeRow('${tab.id}',${ri})">🗑️ Eliminar</button></div>
    </div>`;
  });
  html += `</div>`;
  return html;
}

function renderTabAsKanban(tab, isMonths) {
  // Group cells by status: Done | Pending | Empty | NA
  const groups = { done: [], pending: [], empty: [], na: [] };
  tab.rows.forEach((r, ri) => {
    tab.columns.forEach((cn, ci) => {
      const c = getCell(tab, r, ci);
      groups[c.s || 'empty'].push({ row: r, rowIdx: ri, colIdx: ci, colName: cn, cell: c });
    });
  });
  const cols = [
    { key:'done', title:'✓ Realizados', color:'var(--c-green)', bg:'var(--c-green-light)' },
    { key:'pending', title:'⏳ Pendientes', color:'var(--c-pending)', bg:'var(--c-pending-light)' },
    { key:'empty', title:'○ Sin registrar', color:'var(--c-text-muted)', bg:'#f5f4ef' },
    { key:'na', title:'— N/A', color:'#999', bg:'#f0f0f0' }
  ];
  let html = `<div class="kanban-board">`;
  cols.forEach(col => {
    const items = groups[col.key];
    html += `<div class="kanban-col" style="border-top:3px solid ${col.color}">
      <div class="kanban-col-header">${col.title} <span class="kanban-count">${items.length}</span></div>
      <div class="kanban-list">`;
    if (items.length === 0) {
      html += `<div style="text-align:center;color:var(--c-text-muted);padding:20px;font-size:12px;font-style:italic;">— vacío —</div>`;
    } else {
      items.slice(0, 80).forEach(item => {
        const label = isMonths ? (MONTHS_SHORT[MONTHS.indexOf(item.colName)] || item.colName.substring(0,3)) : item.colName;
        html += `<div class="kanban-card" style="background:${col.bg}" onclick="openCellModal('${tab.id}',${item.rowIdx},${item.colIdx})">
          <div class="kc-name">${item.row.name}</div>
          <div class="kc-meta"><span class="kc-month" style="background:${col.color};color:white">${label}</span>${item.cell.d?'<span class="kc-date">'+fmtDate(item.cell.d)+'</span>':''}</div>
          ${item.cell.c?`<div class="kc-comment">💬 ${item.cell.c.substring(0,60)}${item.cell.c.length>60?'...':''}</div>`:''}
        </div>`;
      });
      if (items.length > 80) html += `<div style="text-align:center;padding:10px;color:var(--c-text-muted);font-size:11px;">+ ${items.length-80} más...</div>`;
    }
    html += `</div></div>`;
  });
  html += `</div>`;
  return html;
}

function renderTabAsCompact(tab, cols, isMonths) {
  let html = `<div class="table-wrap"><table class="compact-table"><thead><tr>`;
  html += `<th>Nombre</th>`;
  if (tab.hasTag) html += `<th>Tipo</th>`;
  cols.forEach(ci => {
    const label = isMonths ? (MONTHS_SHORT[MONTHS.indexOf(tab.columns[ci])] || tab.columns[ci].substring(0,3)) : tab.columns[ci];
    html += `<th class="compact-col">${label}</th>`;
  });
  html += `</tr></thead><tbody>`;
  tab.rows.forEach((r, ri) => {
    html += `<tr><td><strong>${r.name}</strong></td>`;
    if (tab.hasTag) html += `<td>${r.tag?`<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);">${r.tag}</span>`:'—'}</td>`;
    cols.forEach(ci => {
      const c = getCell(tab, r, ci);
      const dotColor = c.s === 'done' ? 'var(--c-green)' : c.s === 'pending' ? 'var(--c-pending)' : c.s === 'na' ? 'var(--c-border)' : '#ddd';
      html += `<td class="compact-cell" onclick="openCellModal('${tab.id}',${ri},${ci})" title="${tab.columns[ci]}${c.d?' · '+fmtDate(c.d):''}${c.c?' · '+c.c.replace(/"/g,'&quot;'):''}"><div class="compact-dot" style="background:${dotColor}"></div></td>`;
    });
    html += `</tr>`;
  });
  if (tab.rows.length === 0) html += `<tr><td colspan="${cols.length+(tab.hasTag?2:1)}" style="text-align:center;color:var(--c-text-muted);padding:30px;">No hay registros.</td></tr>`;
  html += `</tbody></table></div>`;
  return html;
}

function fmtDate(d) {
  if (!d) return '✓';
  // Parse YYYY-MM-DD as local date (avoid UTC shift)
  try {
    if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d)) {
      const [y,m,day] = d.slice(0,10).split('-');
      return day.padStart(2,'0')+'/'+m.padStart(2,'0');
    }
    const dt = new Date(d); return (dt.getDate()).toString().padStart(2,'0')+'/'+(dt.getMonth()+1).toString().padStart(2,'0');
  }
  catch(e) { return d; }
}

// Build a local Date from a YYYY-MM-DD string without timezone shift
function parseLocalDate(s) {
  if (!s) return null;
  const [y,m,d] = s.slice(0,10).split('-').map(Number);
  return new Date(y, m-1, d);
}

// Today as YYYY-MM-DD in local time (avoids toISOString's UTC shift)
function todayLocalStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// ============ DASHBOARD ============
function renderDashboard() {
  const tabs = state.tabs.filter(t => t.type === 'table');
  // determine columns available across tabs (union, preserve order from MONTHS if present)
  const colSet = new Set();
  tabs.forEach(t => t.columns.forEach(c => colSet.add(c)));
  const allCols = [...colSet];

  // active month filter (string column name, or '' for whole year)
  let activeCol = userPrefs.dashMonth;
  if (activeCol === undefined) activeCol = MONTHS[new Date().getMonth()];
  if (activeCol && !allCols.includes(activeCol)) activeCol = allCols[0] || '';

  // helper: filter cells for a tab by activeCol or all
  function tabCells(tab) {
    if (activeCol) {
      const idx = tab.columns.indexOf(activeCol);
      if (idx === -1) return [];
      return tab.rows.map(r => getCell(tab, r, idx));
    }
    return tab.rows.flatMap(r => tab.columns.map((_,i) => getCell(tab, r, i)));
  }

  // Conteos por sector (Empresas, Serv. Profesionales, Sueldos, ...) — MISMA fuente que el
  // detalle clickeable (computeDashSectorsAll), así la tarjeta y el desglose siempre coinciden.
  const sectorData = computeDashSectorsAll();
  const countCat = cat => sectorData[cat].reduce((s,g)=>s+g.items.length,0);
  const done      = countCat('realizado');   // REALIZADOS (hechos, sin enviar)
  const sentCount = countCat('finalizado');  // FINALIZADOS (enviados al cliente)
  const pending   = countCat('pendiente');   // PENDIENTES / en proceso / sin registrar
  const universo  = done + sentCount + pending;                         // total de trabajo del período
  const pct       = universo > 0 ? Math.round((done+sentCount)/universo*100) : 0; // % completado (hecho, enviado o no)
  const sentPct   = universo > 0 ? Math.round(sentCount/universo*100) : 0;        // % finalizados (enviados) sobre el total
  const realizPct = universo > 0 ? Math.round(done/universo*100) : 0;             // % realizados (sin enviar) sobre el total
  const totalRows = tabs.reduce((s,t)=>s+t.rows.length,0);
  const label = activeCol ? activeCol : 'Año completo';

  // Build per-section content (will be ordered later by userPrefs.dashOrder)
  const sections = [];

  // -- KPI strip is always on top, not movable
  const kpiHtml = `<div class="stats-bar" style="margin-bottom:24px;">
      <div class="stat-card green" style="cursor:pointer;" title="Tocar para ver el detalle por sector" onclick="openDashDrill('realizado')"><div class="stat-num">${done}</div><div class="stat-label">Realizados${universo>0?' ('+realizPct+'%)':''}${activeCol?'':' (año)'} <span style="opacity:.5;font-size:11px;">🔍</span></div></div>
      <div class="stat-card" style="border-left:3px solid #4a9eff;cursor:pointer;" title="Tocar para ver el detalle por sector" onclick="openDashDrill('finalizado')"><div class="stat-num" style="color:#0066cc;">${sentCount}</div><div class="stat-label">📤 Finalizados / enviados${universo>0?' ('+sentPct+'%)':''} <span style="opacity:.5;font-size:11px;">🔍</span></div></div>
      <div class="stat-card red" style="cursor:pointer;" title="Tocar para ver el detalle por sector" onclick="openDashDrill('pendiente')"><div class="stat-num">${pending}</div><div class="stat-label">Pendientes${activeCol?'':' (año)'} <span style="opacity:.5;font-size:11px;">🔍</span></div></div>
      <div class="stat-card"><div class="stat-num">${pct}%</div><div class="stat-label">Completado</div></div>
      <div class="stat-card blue"><div class="stat-num">${totalRows}</div><div class="stat-label">Registros activos</div></div>
    </div>`;

  // -- Section per table tab: Sueldos-style operational view (KPIs + side-by-side blocks)
  tabs.slice(0,2).forEach(tab => {
    sections.push(buildTabOperationalSection(tab, activeCol));
  });

  // -- Section: Sueldos (existing function, but adapted to descriptor format)
  const sueldoSec = buildSueldosDashboardDescriptor();
  if (sueldoSec) sections.push(sueldoSec);

  // Apply user-defined order
  const orderedSections = orderDashboardSections(sections);

  // Header + KPIs + sections
  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">Resumen <span>${state.branding.year}</span></div>
        <div style="font-size:12px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;">Período: <strong style="color:var(--c-accent)">${label}</strong></div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <label style="font-size:11px;color:var(--c-text-muted);text-transform:uppercase;letter-spacing:1px;font-weight:700;">Mes:</label>
        <select id="dash-month-select" onchange="setDashMonth(this.value)" style="padding:8px 14px;border:1px solid var(--c-border);background:var(--c-card);border-radius:2px;font-family:inherit;font-size:13px;font-weight:700;color:var(--c-text);cursor:pointer;min-width:170px;">
          <option value="">— Año completo —</option>
          ${allCols.map(c => `<option value="${c}"${c===activeCol?' selected':''}>${c}</option>`).join('')}
        </select>
        <button class="btn btn-outline" onclick="expandAllDashSections()" title="Expandir todas">⊞ Todas</button>
        <button class="btn btn-outline" onclick="collapseAllDashSections()" title="Colapsar todas">⊟ Ninguna</button>
        <button class="btn btn-outline" onclick="resetDashLayout()" title="Reset orden y colapso">↺</button>
      </div>
    </div>
    ${kpiHtml}
    <div style="font-size:11px;color:var(--c-text-muted);margin-bottom:10px;letter-spacing:0.3px;">
      💡 Arrastrá las secciones desde el ícono <strong>⋮⋮</strong> para reordenarlas. Clic en el título para colapsar/expandir.
    </div>
    <div id="dash-sections-wrap" class="dash-sections-wrap">`;

  orderedSections.forEach(sec => {
    const collapsed = userPrefs.dashCollapsed && userPrefs.dashCollapsed[sec.id];
    const countBadge = sec.count !== null && sec.count !== undefined ? `<span class="dash-section-count">${sec.count}</span>` : '';
    html += `<div class="dash-section${collapsed?' collapsed':''}" data-section-id="${sec.id}" draggable="true">
      <div class="dash-section-header" onclick="toggleDashSection('${sec.id}')">
        <span class="dash-drag-handle" title="Arrastrar para mover">⋮⋮</span>
        <span class="dash-section-title">${sec.icon||''} ${sec.title}</span>
        ${countBadge}
        <span class="dash-section-toggle">${collapsed?'▸':'▾'}</span>
      </div>
      <div class="dash-section-body">${sec.body}</div>
    </div>`;
  });

  html += `</div>`;
  return html;
}

function orderDashboardSections(sections) {
  const order = userPrefs.dashOrder || [];
  const byId = {};
  sections.forEach(s => byId[s.id] = s);
  const result = [];
  // First, sections in the saved order (if still present)
  order.forEach(id => { if (byId[id]) { result.push(byId[id]); delete byId[id]; } });
  // Then, any new sections that didn't have a saved position
  sections.forEach(s => { if (byId[s.id]) result.push(s); });
  return result;
}

function toggleDashSection(id) {
  if (!userPrefs.dashCollapsed) userPrefs.dashCollapsed = {};
  userPrefs.dashCollapsed[id] = !userPrefs.dashCollapsed[id];
  saveUserPrefs();
  // Animate without re-render: toggle CSS class
  const el = document.querySelector(`.dash-section[data-section-id="${id}"]`);
  if (el) {
    el.classList.toggle('collapsed', userPrefs.dashCollapsed[id]);
    const tog = el.querySelector('.dash-section-toggle');
    if (tog) tog.textContent = userPrefs.dashCollapsed[id] ? '▸' : '▾';
  }
}

function collapseAllDashSections() {
  if (!userPrefs.dashCollapsed) userPrefs.dashCollapsed = {};
  document.querySelectorAll('.dash-section').forEach(el => {
    const id = el.getAttribute('data-section-id');
    userPrefs.dashCollapsed[id] = true;
    el.classList.add('collapsed');
    const tog = el.querySelector('.dash-section-toggle');
    if (tog) tog.textContent = '▸';
  });
  saveUserPrefs();
}

function expandAllDashSections() {
  if (!userPrefs.dashCollapsed) userPrefs.dashCollapsed = {};
  document.querySelectorAll('.dash-section').forEach(el => {
    const id = el.getAttribute('data-section-id');
    userPrefs.dashCollapsed[id] = false;
    el.classList.remove('collapsed');
    const tog = el.querySelector('.dash-section-toggle');
    if (tog) tog.textContent = '▾';
  });
  saveUserPrefs();
}

function resetDashLayout() {
  if (!confirm('¿Restablecer el orden y colapso del dashboard a los valores por defecto?')) return;
  userPrefs.dashOrder = [];
  userPrefs.dashCollapsed = {};
  saveUserPrefs();
  renderContent();
}

function attachDashboardHandlers() {
  // Drag and drop sections to reorder
  const wrap = document.getElementById('dash-sections-wrap');
  if (!wrap) return;
  let dragSrc = null;

  wrap.querySelectorAll('.dash-section').forEach(el => {
    el.addEventListener('dragstart', e => {
      // Only drag from the handle or from header area
      dragSrc = el;
      el.classList.add('dragging');
      try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', el.getAttribute('data-section-id')); } catch(_) {}
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      document.querySelectorAll('.dash-section.drag-over').forEach(x => x.classList.remove('drag-over'));
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      if (dragSrc && dragSrc !== el) el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      if (!dragSrc || dragSrc === el) return;
      const fromId = dragSrc.getAttribute('data-section-id');
      const toId = el.getAttribute('data-section-id');
      // Build new order from current DOM, swapping fromId before toId
      const currentIds = Array.from(wrap.querySelectorAll('.dash-section')).map(x => x.getAttribute('data-section-id'));
      const fromIdx = currentIds.indexOf(fromId);
      currentIds.splice(fromIdx, 1);
      const toIdx = currentIds.indexOf(toId);
      currentIds.splice(toIdx, 0, fromId);
      userPrefs.dashOrder = currentIds;
      saveUserPrefs();
      renderContent();
    });
  });
}

// Adapt the existing sueldos dashboard into a section descriptor
// ============ DRILL-DOWN: detalle de una sumatoria por sector ============
// Recalcula, para el período del dashboard, qué ítems caen en cada categoría
// (pendiente / realizado / finalizado) separados por sector (cada pestaña tabla + Sueldos).
// Es la fuente ÚNICA: los KPIs de arriba y este detalle salen de acá, así siempre coinciden.
function computeDashSectorsAll() {
  let activeCol = userPrefs.dashMonth;
  if (activeCol === undefined) activeCol = MONTHS[new Date().getMonth()];
  const out = { pendiente: [], realizado: [], finalizado: [] };
  const cats = ['pendiente','realizado','finalizado'];

  // --- Pestañas tipo tabla (Empresas, Serv. Profesionales, etc.) ---
  state.tabs.filter(t => t.type === 'table').forEach(tab => {
    const g = { pendiente:[], realizado:[], finalizado:[] };
    if (activeCol) {
      const idx = tab.columns.indexOf(activeCol);
      if (idx !== -1) tab.rows.forEach(r => {
        const c = getCell(tab, r, idx);
        if (!c || c.s === 'na') return;
        if (c.s === 'done' && c.es)  g.finalizado.push({ name:r.name, tag:r.tag, detail: c.ed ? ('📅 '+fmtDate(c.ed)) : '📤 enviado' });
        else if (c.s === 'done')     g.realizado.push({ name:r.name, tag:r.tag, detail: c.d ? fmtDate(c.d) : '✓' });
        else if (c.s === 'empty' || c.s === 'pending') g.pendiente.push({ name:r.name, tag:r.tag, detail: c.s==='pending' ? '⏳ pendiente' : '○ sin registrar' });
      });
    } else {
      tab.rows.forEach(r => {
        let done=0, pend=0, sent=0, total=0;
        tab.columns.forEach((c,i)=>{ const cell=getCell(tab,r,i); if(!cell||cell.s==='na')return; total++; if(cell.s==='done'){done++; if(cell.es)sent++;} else if(cell.s==='empty'||cell.s==='pending')pend++; });
        if(total===0)return;
        if(pend>0) g.pendiente.push({ name:r.name, tag:r.tag, detail: pend+'/'+total+' pend.' });
        else if(sent===done && sent>0) g.finalizado.push({ name:r.name, tag:r.tag, detail: sent+' env.' });
        else g.realizado.push({ name:r.name, tag:r.tag, detail: done+'/'+total+' ✓' });
      });
    }
    cats.forEach(cat => { if (g[cat].length) out[cat].push({ sector: tab.name, tabId: tab.id, period: activeCol || 'año completo', items: g[cat] }); });
  });

  // --- Sueldos (modelo de datos propio, con su propio período) ---
  if (state.sueldos) {
    const ym = getCurrentSueldosMonth();
    const md = state.sueldos[ym] || { sueldos:[], sd:[] };
    const parts = ym.split('-'); const yy = parts[0], mm = parts[1];
    const periodLabel = (MONTHS[parseInt(mm)-1] || mm) + ' ' + yy;
    const items = [
      ...((md.sueldos)||[]).map(r=>({ ...r, _g:'Sueldo' })),
      ...((md.sd)||[]).map(r=>({ ...r, _g:'Serv. Doméstico' }))
    ];
    const g = { pendiente:[], realizado:[], finalizado:[] };
    items.forEach(it=>{
      const st = it.status || 'pendiente';
      const row = { name: it.name, tag: it._g + (it.grupo ? ' · '+it.grupo : ''), detail: getSueldoStateInfo(st).label };
      if (st==='enviado' || st==='finalizado') g.finalizado.push(row);
      else if (st==='pronto') g.realizado.push(row);           // pronto = hecho, listo para enviar
      else g.pendiente.push(row);                               // pendiente + proceso
    });
    cats.forEach(cat => { if (g[cat].length) out[cat].push({ sector:'Sueldos', tabId:'sueldos', period: periodLabel, items: g[cat] }); });
  }
  return out;
}

const DASH_DRILL_META = {
  pendiente:  { title:'Pendientes',              icon:'⏳', color:'var(--c-pending,#d4860a)' },
  realizado:  { title:'Realizados (sin enviar)', icon:'✅', color:'var(--c-green,#2e7d52)' },
  finalizado: { title:'Finalizados / enviados',  icon:'📤', color:'#0066cc' }
};

// Abre el modal con el detalle de una categoría, agrupado por sector y clickeable
function openDashDrill(cat) {
  const meta = DASH_DRILL_META[cat] || DASH_DRILL_META.pendiente;
  const data = computeDashSectorsAll()[cat] || [];
  const totalItems = data.reduce((s,grp)=>s+grp.items.length, 0);

  const titleEl = document.getElementById('dash-drill-title');
  const bodyEl  = document.getElementById('dash-drill-body');
  if (titleEl) titleEl.innerHTML = `${meta.icon} ${meta.title} — por sector <span style="color:var(--c-text-muted);font-weight:400;">(${totalItems})</span>`;

  let html = '';
  if (totalItems === 0) {
    html = `<div style="padding:24px 8px;color:var(--c-text-muted);font-style:italic;text-align:center;">No hay nada en esta categoría para el período actual.</div>`;
  } else {
    data.forEach(grp => {
      html += `<div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--c-bg-alt);border-radius:4px;border-left:3px solid ${meta.color};">
          <span><strong>${grp.sector}</strong> <span style="color:var(--c-text-muted);font-size:11px;">${grp.period?('· '+grp.period):''}</span></span>
          <span style="display:flex;align-items:center;gap:10px;">
            <span class="tag-pill" style="background:var(--c-card);color:var(--c-text);font-weight:700;">${grp.items.length}</span>
            <button class="btn btn-outline btn-sm" style="font-size:11px;" onclick="closeModal('modal-dash-drill');switchTab('${grp.tabId}')">Ir →</button>
          </span>
        </div>
        <ul class="pending-list" style="margin:6px 0 0;">`;
      grp.items.forEach(it => {
        const tagPill = it.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${it.tag}</span>` : '';
        html += `<li style="cursor:pointer;" title="Ir a ${grp.sector}" onclick="closeModal('modal-dash-drill');switchTab('${grp.tabId}')"><span class="pending-name">${it.name}${tagPill}</span><span class="tag-pill" style="background:var(--c-bg-alt);color:var(--c-text-muted);">${it.detail||''}</span></li>`;
      });
      html += `</ul></div>`;
    });
  }
  if (bodyEl) bodyEl.innerHTML = html;
  document.getElementById('modal-dash-drill').classList.add('open');
}

function buildSueldosDashboardDescriptor() {
  if (!state.sueldos) return null;
  const ym = getCurrentSueldosMonth();
  ensureSueldosMonth(ym);
  const [y, m] = ym.split('-');
  const monthLabel = MONTHS[parseInt(m)-1] + ' ' + y;
  const monthData = state.sueldos[ym] || { sueldos:[], sd:[], reliq:[] };
  const allItems = [
    ...(monthData.sueldos||[]).map(r => ({...r, _grp:'Sueldos'})),
    ...(monthData.sd||[]).map(r => ({...r, _grp:'Serv. Doméstico'}))
  ];
  const groups = {};
  SUELDO_STATES.forEach(s => groups[s.key] = []);
  allItems.forEach(it => {
    const st = it.status || 'pendiente';
    if (groups[st]) groups[st].push(it);
  });
  const counts = {};
  SUELDO_STATES.forEach(s => counts[s.key] = groups[s.key].length);

  let body = `<div style="font-size:11px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Período: <strong style="color:var(--c-accent)">${monthLabel}</strong> · <span onclick="switchTab('sueldos')" style="color:var(--c-accent);cursor:pointer;font-weight:700;">Ir a Sueldos →</span></div>
    <div class="stats-bar" style="margin-bottom:16px;">`;
  SUELDO_STATES.forEach(s => {
    body += `<div class="stat-card" style="border-left-color:${s.color};cursor:pointer;" onclick="switchTab('sueldos')">
      <div class="stat-num" style="color:${s.color}">${counts[s.key]}</div>
      <div class="stat-label">${s.label}</div>
    </div>`;
  });
  body += `</div>`;

  // Sub-cards: Prontos + En proceso/pendientes
  body += `<div class="dashboard-grid">`;
  body += `<div class="dash-card" style="border-left:3px solid var(--c-green,#2e7d52);">
    <h4 style="color:var(--c-green,#2e7d52);">✅ Prontos para enviar <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.pronto.length}</span></h4>
    <ul class="pending-list">`;
  if (groups.pronto.length === 0) {
    body += '<li style="color:var(--c-text-muted);padding:14px 0;font-style:italic;">Ningún sueldo pronto este mes</li>';
  } else {
    groups.pronto.slice(0,12).forEach(it => {
      const grp = it.grupo ? `<span style="font-size:10px;color:var(--c-text-muted);">${it.grupo}</span>` : '';
      body += `<li><span class="pending-name">${it.name} ${grp}</span><span style="font-size:10px;color:var(--c-text-muted);">${it._grp}</span></li>`;
    });
  }
  body += `</ul></div>`;

  body += `<div class="dash-card" style="border-left:3px solid var(--c-pending,#d4860a);">
    <h4 style="color:var(--c-pending,#d4860a);">⏳ Pendientes / en proceso <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.pendiente.length + groups.proceso.length}</span></h4>
    <ul class="pending-list">`;
  const wait = [...groups.proceso, ...groups.pendiente];
  if (wait.length === 0) {
    body += '<li style="color:var(--c-green);padding:14px 0;">✓ Todos avanzados</li>';
  } else {
    wait.slice(0,12).forEach(it => {
      const stinfo = getSueldoStateInfo(it.status||'pendiente');
      const grp = it.grupo ? `<span style="font-size:10px;color:var(--c-text-muted);">${it.grupo}</span>` : '';
      body += `<li><span class="pending-name">${it.name} ${grp}</span><span class="tag-pill" style="background:${stinfo.bg};color:${stinfo.color};">${stinfo.label}</span></li>`;
    });
  }
  body += `</ul></div></div>`;

  if (groups.enviado.length > 0 || groups.finalizado.length > 0) {
    body += `<div class="dash-card" style="border-left:3px solid var(--c-blue,#1a4a7a);margin-top:16px;">
      <h4 style="color:var(--c-blue,#1a4a7a);">✈ Enviados / finalizados <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.enviado.length + groups.finalizado.length}</span></h4>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">`;
    [...groups.enviado, ...groups.finalizado].forEach(it => {
      const stinfo = getSueldoStateInfo(it.status||'enviado');
      body += `<span class="tag-pill" style="background:${stinfo.bg};color:${stinfo.color};font-size:11px;padding:4px 10px;">${stinfo.icon} ${it.name}${sueldoSentChip(it)}</span>`;
    });
    body += `</div></div>`;
  }

  return {
    id: 'sueldos_dashboard',
    icon: '💼',
    title: 'Sueldos — Vista operativa',
    count: null,
    body
  };
}

// ============ NOTAS RAPIDAS EN DASHBOARD ============
// Muestra un chip junto al estado cuando la celda tiene COMENTARIO cargado
// (el que se escribe en Sv.Profesionales / Empresas al abrir la ficha del mes).
// Pasando el cursor se despliega el cartel con la nota; haciendo clic va a la ficha.

// CONFIG: false = el chip dice siempre "Consultar estado" (recomendado, es claro para todas)
//         true  = el chip muestra un adelanto del texto de la nota
const NOTE_CHIP_PREVIEW = false;
// Texto del chip cuando NOTE_CHIP_PREVIEW = false
const NOTE_CHIP_LABEL = 'Consultar estado';

function noteTipEl() {
  let el = document.getElementById('note-tip');
  if (!el) { el = document.createElement('div'); el.id = 'note-tip'; document.body.appendChild(el); }
  return el;
}
function showNoteTip(chip) {
  const el = noteTipEl();
  const txt = chip.getAttribute('data-note') || '';
  const head = chip.getAttribute('data-note-head') || 'Nota';
  el.innerHTML = '<div class="note-tip-h">' + escapeHtml(head) + '</div>' + escapeHtml(txt) +
                 '<div class="note-tip-f">Clic para abrir la ficha y editar la nota</div>';
  el.classList.add('show');
  positionNoteTip(chip);
}
function positionNoteTip(chip) {
  const el = document.getElementById('note-tip');
  if (!el) return;
  const r = chip.getBoundingClientRect();
  const w = el.offsetWidth, h = el.offsetHeight;
  let left = r.left + r.width / 2 - w / 2;
  let top = r.top - h - 8;
  if (top < 8) top = r.bottom + 8;
  if (left < 8) left = 8;
  if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
  el.style.left = left + 'px';
  el.style.top = top + 'px';
}
function hideNoteTip() {
  const el = document.getElementById('note-tip');
  if (el) el.classList.remove('show');
}
document.addEventListener('mouseover', function(e){
  const c = e.target && e.target.closest ? e.target.closest('.note-chip') : null;
  if (c) showNoteTip(c);
});
document.addEventListener('mouseout', function(e){
  const c = e.target && e.target.closest ? e.target.closest('.note-chip') : null;
  if (c) hideNoteTip();
});
window.addEventListener('scroll', hideNoteTip, true);

// Devuelve el HTML del chip (vacio si no hay comentario)
function noteChip(tabId, rowIdx, colIdx, text, head) {
  if (!text) return '';
  const t = String(text).trim();
  if (!t) return '';
  const flat = t.replace(/\s+/g, ' ');
  const label = NOTE_CHIP_PREVIEW ? (flat.length > 24 ? flat.slice(0, 24) + '…' : flat) : NOTE_CHIP_LABEL;
  return '<span class="note-chip" title="' + escapeHtml(flat) + '" data-note="' + escapeHtml(t) + '" data-note-head="' + escapeHtml(head || '') +
         '" onclick="gotoCellNote(\'' + tabId + '\',' + rowIdx + ',' + colIdx + ')">💬 ' + escapeHtml(label) + '</span>';
}

// Salta a la pestaña y abre la ficha del cliente/mes donde esta la nota
function gotoCellNote(tabId, rowIdx, colIdx) {
  hideNoteTip();
  switchTab(tabId);
  setTimeout(function(){
    if (typeof openCellModal === 'function') openCellModal(tabId, rowIdx, colIdx);
  }, 80);
}

// Build the Sueldos-style operational section for a table tab (Empresas / Serv. Profesionales)
function buildTabOperationalSection(tab, activeCol) {
  // Bucket rows by their status in the active column (or aggregate across year if no col).
  // Embudo: empty/pending -> done (realizado, sin enviar) -> sent (finalizado, enviado al cliente).
  // Una empresa enviada cae SOLO en 'sent', nunca en 'done'.
  const groups = { done: [], sent: [], pending: [], empty: [], na: [] };

  if (activeCol) {
    const idx = tab.columns.indexOf(activeCol);
    tab.rows.forEach((r, ri) => {
      const cell = idx === -1 ? {s:'empty'} : getCell(tab, r, idx);
      // Hecho + enviado al cliente => finalizado (sale de "realizados")
      if (cell.s === 'done' && cell.es) {
        groups.sent.push({ name: r.name, tag: r.tag, date: cell.d, ed: cell.ed, comment: cell.c, ri: ri, ci: idx });
      } else {
        groups[cell.s || 'empty'].push({ name: r.name, tag: r.tag, date: cell.d, comment: cell.c, ri: ri, ci: idx });
      }
    });
  } else {
    // Aggregate: classify each row by counts across all months
    tab.rows.forEach((r, ri) => {
      let done = 0, pend = 0, sent = 0, total = 0, lastSent = '';
      const notes = [];
      tab.columns.forEach((c,i) => {
        const cell = getCell(tab, r, i);
        if (cell.c && String(cell.c).trim()) notes.push({ ci: i, col: c, text: cell.c });
        if (cell.s === 'na') return;
        total++;
        if (cell.s === 'done') { done++; if (cell.es) { sent++; if (cell.ed && cell.ed > lastSent) lastSent = cell.ed; } }
        else if (cell.s === 'empty' || cell.s === 'pending') pend++;
      });
      if (total === 0) return;
      if (pend > 0 && done > 0) groups.pending.push({ name: r.name, tag: r.tag, doneCount: done, pendCount: pend, total, ri: ri, notes: notes });
      else if (pend > 0) groups.empty.push({ name: r.name, tag: r.tag, pendCount: pend, total, ri: ri, notes: notes });
      else if (sent === done && sent > 0) groups.sent.push({ name: r.name, tag: r.tag, cnt: sent, total, ed: lastSent, ri: ri, notes: notes }); // todo hecho y todo enviado
      else groups.done.push({ name: r.name, tag: r.tag, doneCount: done, sentCount: sent, total, ri: ri, notes: notes }); // hecho, falta enviar
    });
  }

  const counts = {
    done: groups.done.length,      // realizados (hechos, sin enviar)
    sent: groups.sent.length,      // finalizados (enviados al cliente)
    pending: groups.pending.length,
    empty: groups.empty.length,
    na: tab.rows.length - (groups.done.length + groups.sent.length + groups.pending.length + groups.empty.length)
  };
  const total = counts.done + counts.sent + counts.pending + counts.empty;
  const pct = total > 0 ? Math.round((counts.done + counts.sent) / total * 100) : 0; // % completado (hecho, enviado o no)

  // KPI strip
  let body = `<div class="stats-bar" style="margin-bottom:16px;">
    <div class="stat-card green" style="border-left-color:var(--c-green);"><div class="stat-num" style="color:var(--c-green);">${counts.done}</div><div class="stat-label">Realizados (sin enviar)</div></div>
    <div class="stat-card" style="border-left:3px solid #4a9eff;"><div class="stat-num" style="color:#0066cc;">${counts.sent}</div><div class="stat-label">📤 Finalizados (enviados)</div></div>
    <div class="stat-card" style="border-left-color:var(--c-pending);"><div class="stat-num" style="color:var(--c-pending);">${counts.pending}</div><div class="stat-label">En proceso</div></div>
    <div class="stat-card red" style="border-left-color:var(--c-red);"><div class="stat-num" style="color:var(--c-red);">${counts.empty}</div><div class="stat-label">Sin registrar</div></div>
    <div class="stat-card" style="border-left-color:var(--c-accent);"><div class="stat-num">${pct}%</div><div class="stat-label">Completado</div></div>
  </div>`;

  // Two columns side-by-side: Pendientes/Sin registrar (left) + Realizados (right)
  body += `<div class="dashboard-grid">`;

  // LEFT: Pending block (combines empty + pending)
  const pendingItems = [...groups.empty, ...groups.pending];
  body += `<div class="dash-card" style="border-left:3px solid var(--c-pending,#d4860a);">
    <h4 style="color:var(--c-pending,#d4860a);">⏳ Pendientes / Sin registrar <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${pendingItems.length}</span></h4>
    <ul class="pending-list">`;
  if (pendingItems.length === 0) {
    body += '<li style="color:var(--c-green);padding:14px 0;">✓ Todo al día en este período</li>';
  } else if (activeCol) {
    pendingItems.slice(0, 15).forEach(x => {
      const tagPill = x.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${x.tag}</span>` : '';
      // Find if it came from groups.pending or groups.empty
      const wasPending = groups.pending.some(p => p.name === x.name);
      const statusPill = wasPending
        ? '<span class="tag-pill" style="background:var(--c-pending-light);color:var(--c-pending);">⏳ Pendiente</span>'
        : '<span class="tag-pill" style="background:#f0eee9;color:var(--c-text-muted);">○ Sin registrar</span>';
      const chip = noteChip(tab.id, x.ri, x.ci, x.comment, x.name + ' · ' + activeCol);
      body += `<li><span class="pending-name">${x.name}${tagPill}</span><span style="display:flex;align-items:center;gap:6px;">${chip}${statusPill}</span></li>`;
    });
    if (pendingItems.length > 15) body += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${pendingItems.length - 15} más...</li>`;
  } else {
    pendingItems.sort((a,b) => (b.pendCount||0) - (a.pendCount||0));
    pendingItems.slice(0, 15).forEach(x => {
      const tagPill = x.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${x.tag}</span>` : '';
      const n = (x.notes && x.notes.length) ? x.notes[x.notes.length-1] : null;
      const chip = n ? noteChip(tab.id, x.ri, n.ci, n.text, x.name + ' · ' + n.col) : '';
      body += `<li><span class="pending-name">${x.name}${tagPill}</span><span style="display:flex;align-items:center;gap:6px;">${chip}<span class="tag-pill" style="background:var(--c-pending-light);color:var(--c-pending);">${x.pendCount}/${x.total} pend.</span></span></li>`;
    });
    if (pendingItems.length > 15) body += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${pendingItems.length - 15} más...</li>`;
  }
  body += `</ul></div>`;

  // RIGHT: Realizados block
  body += `<div class="dash-card" style="border-left:3px solid var(--c-green,#2e7d52);">
    <h4 style="color:var(--c-green,#2e7d52);">✅ Realizados <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${counts.done}</span></h4>
    <ul class="pending-list">`;
  if (counts.done === 0) {
    body += '<li style="color:var(--c-text-muted);padding:14px 0;font-style:italic;">Sin registros realizados todavía</li>';
  } else if (activeCol) {
    groups.done.slice(0, 15).forEach(x => {
      const dateLabel = x.date ? fmtDate(x.date) : '✓';
      const tagPill = x.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${x.tag}</span>` : '';
      const chip = noteChip(tab.id, x.ri, x.ci, x.comment, x.name + ' · ' + activeCol);
      body += `<li><span class="pending-name">${x.name}${tagPill}</span><span style="display:flex;align-items:center;gap:6px;">${chip}<span class="tag-pill" style="background:var(--c-green-light);color:var(--c-green);">${dateLabel}</span></span></li>`;
    });
    if (groups.done.length > 15) body += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${groups.done.length - 15} más...</li>`;
  } else {
    groups.done.slice(0, 15).forEach(x => {
      const tagPill = x.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${x.tag}</span>` : '';
      const n = (x.notes && x.notes.length) ? x.notes[x.notes.length-1] : null;
      const chip = n ? noteChip(tab.id, x.ri, n.ci, n.text, x.name + ' · ' + n.col) : '';
      body += `<li><span class="pending-name">${x.name}${tagPill}</span><span style="display:flex;align-items:center;gap:6px;">${chip}<span class="tag-pill" style="background:var(--c-green-light);color:var(--c-green);">${x.doneCount}/${x.total} ✓</span></span></li>`;
    });
    if (groups.done.length > 15) body += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${groups.done.length - 15} más...</li>`;
  }
  body += `</ul></div>`;

  body += `</div>`;  // end dashboard-grid

  // === Bloque "Finalizados — Enviados al cliente" (mismos datos que el KPI de finalizados) ===
  body += `<div class="dash-card" style="margin-top:16px;border-left:3px solid #4a9eff;">
    <h4 style="color:#0066cc;">📤 Finalizados — Enviados al cliente <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.sent.length}</span></h4>
    <ul class="pending-list">`;
  if (groups.sent.length === 0) {
    body += '<li style="color:var(--c-text-muted);padding:14px 0;font-style:italic;">Todavía no se finalizó (envió) ninguno en este período</li>';
  } else {
    groups.sent.slice(0, 40).forEach(function(x){
      var tagPill = x.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${x.tag}</span>` : '';
      var dateLabel = activeCol
        ? (x.ed ? ('📅 ' + fmtDate(x.ed)) : '📤 enviado')
        : ((x.cnt||0) + ' env.' + (x.ed ? (' · últ. ' + fmtDate(x.ed)) : ''));
      var nS = activeCol ? null : ((x.notes && x.notes.length) ? x.notes[x.notes.length-1] : null);
      var chipS = activeCol
        ? noteChip(tab.id, x.ri, x.ci, x.comment, x.name + ' · ' + activeCol)
        : (nS ? noteChip(tab.id, x.ri, nS.ci, nS.text, x.name + ' · ' + nS.col) : '');
      body += `<li><span class="pending-name">${x.name}${tagPill}</span><span style="display:flex;align-items:center;gap:6px;">${chipS}<span class="tag-pill" style="background:#e8f0f8;color:#0066cc;">${dateLabel}</span></span></li>`;
    });
    if (groups.sent.length > 40) body += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${groups.sent.length - 40} más...</li>`;
  }
  body += `</ul></div>`;

  // If no specific month selected, also show progress bars per month below (compact)
  if (!activeCol) {
    body += `<div style="margin-top:16px;background:var(--c-bg);padding:14px;border-radius:6px;">
      <div style="font-size:11px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;font-weight:700;">Avance por mes — clic para filtrar</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;">`;
    tab.columns.forEach((c, i) => {
      const cells = tab.rows.map(r => getCell(tab, r, i));
      const d = cells.filter(x => x.s === 'done').length;
      const t = cells.length || 1;
      const p = Math.round(d / t * 100);
      const barColor = p === 100 ? 'var(--c-green)' : p > 50 ? 'var(--c-accent)' : 'var(--c-red)';
      body += `<div style="cursor:pointer;" onclick="setDashMonth('${c}')">
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;"><span>${c}</span><span style="color:var(--c-text-muted)">${d}/${t}</span></div>
        <div class="progress-bar-wrap"><div class="progress-bar" style="width:${p}%;background:${barColor}"></div></div>
      </div>`;
    });
    body += `</div></div>`;
  }

  const icon = tab.id === 'empresas' ? '🏢' : tab.id === 'sprof' ? '👤' : '📊';
  const periodLabel = activeCol ? `${activeCol}` : `año completo`;

  return {
    id: 'tab_op_' + tab.id,
    icon: icon,
    title: `${tab.name} — Vista operativa (${periodLabel})`,
    count: null,
    body
  };
}

function renderSueldosDashboardSection() {
  if (!state.sueldos) return '';
  const ym = getCurrentSueldosMonth();
  ensureSueldosMonth(ym);
  const [y, m] = ym.split('-');
  const monthLabel = MONTHS[parseInt(m)-1] + ' ' + y;
  const monthData = state.sueldos[ym] || { sueldos:[], sd:[], reliq:[] };
  const allItems = [
    ...(monthData.sueldos||[]).map(r => ({...r, _grp:'Sueldos'})),
    ...(monthData.sd||[]).map(r => ({...r, _grp:'Serv. Doméstico'}))
  ];

  // Group by status
  const groups = {};
  SUELDO_STATES.forEach(s => groups[s.key] = []);
  allItems.forEach(it => {
    const st = it.status || 'pendiente';
    if (groups[st]) groups[st].push(it);
  });

  // Counters
  const counts = {};
  SUELDO_STATES.forEach(s => counts[s.key] = groups[s.key].length);

  let html = `<div style="margin-top:32px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
      <div>
        <div class="section-title" style="font-size:18px;">💼 Sueldos <span style="color:var(--c-text-muted);font-size:14px;font-family:var(--font-body);font-weight:400;">— Vista operativa rápida</span></div>
        <div style="font-size:11px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:2px;">Período: <strong style="color:var(--c-accent)">${monthLabel}</strong></div>
      </div>
      <button class="btn btn-outline" onclick="switchTab('sueldos')">Ir a Sueldos →</button>
    </div>
    <div class="stats-bar">`;
  SUELDO_STATES.forEach(s => {
    html += `<div class="stat-card" style="border-left-color:${s.color};cursor:pointer;" onclick="switchTab('sueldos')">
      <div class="stat-num" style="color:${s.color}">${counts[s.key]}</div>
      <div class="stat-label">${s.label}</div>
    </div>`;
  });
  html += `</div>`;

  // Two highlighted blocks: PRONTOS to send, and ENVIADOS recently
  html += `<div class="dashboard-grid">`;

  // Block 1: Prontos para enviar (workflow handoff)
  html += `<div class="dash-card" style="border-left:3px solid var(--c-green,#2e7d52);">
    <h4 style="color:var(--c-green,#2e7d52);">✅ Sueldos PRONTOS para enviar <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.pronto.length} ${groups.pronto.length===1?'item':'items'}</span></h4>
    <ul class="pending-list">`;
  if (groups.pronto.length === 0) {
    html += '<li style="color:var(--c-text-muted);padding:14px 0;font-style:italic;">Ningún sueldo pronto todavía este mes</li>';
  } else {
    groups.pronto.slice(0,12).forEach(it => {
      const grp = it.grupo ? `<span style="font-size:10px;color:var(--c-text-muted);">${it.grupo}</span>` : '';
      const tag = `<span style="font-size:10px;color:var(--c-text-muted);">${it._grp}</span>`;
      html += `<li><span class="pending-name">${it.name} ${grp}</span>${tag}</li>`;
    });
    if (groups.pronto.length > 12) html += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${groups.pronto.length-12} más...</li>`;
  }
  html += `</ul></div>`;

  // Block 2: En proceso + Pendientes
  html += `<div class="dash-card" style="border-left:3px solid var(--c-pending,#d4860a);">
    <h4 style="color:var(--c-pending,#d4860a);">⏳ Pendientes / en proceso <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.pendiente.length + groups.proceso.length} items</span></h4>
    <ul class="pending-list">`;
  const wait = [...groups.proceso, ...groups.pendiente];
  if (wait.length === 0) {
    html += '<li style="color:var(--c-green);padding:14px 0;">✓ Todos avanzados</li>';
  } else {
    wait.slice(0,12).forEach(it => {
      const stinfo = getSueldoStateInfo(it.status||'pendiente');
      const grp = it.grupo ? `<span style="font-size:10px;color:var(--c-text-muted);">${it.grupo}</span>` : '';
      html += `<li><span class="pending-name">${it.name} ${grp}</span><span class="tag-pill" style="background:${stinfo.bg};color:${stinfo.color};">${stinfo.label}</span></li>`;
    });
    if (wait.length > 12) html += `<li style="color:var(--c-text-muted);padding-top:8px;font-style:italic;">+ ${wait.length-12} más...</li>`;
  }
  html += `</ul></div>`;

  html += `</div>`;

  // Recently sent block (full width)
  if (groups.enviado.length > 0 || groups.finalizado.length > 0) {
    html += `<div class="dash-card" style="border-left:3px solid var(--c-blue,#1a4a7a);margin-top:16px;">
      <h4 style="color:var(--c-blue,#1a4a7a);">✈ Enviados / finalizados este mes <span style="float:right;color:var(--c-text-muted);font-weight:400;font-size:12px;">${groups.enviado.length + groups.finalizado.length} items</span></h4>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">`;
    [...groups.enviado, ...groups.finalizado].forEach(it => {
      const stinfo = getSueldoStateInfo(it.status||'enviado');
      html += `<span class="tag-pill" style="background:${stinfo.bg};color:${stinfo.color};font-size:11px;padding:4px 10px;">${stinfo.icon} ${it.name}${sueldoSentChip(it)}</span>`;
    });
    html += `</div></div>`;
  }

  return html;
}

function setDashMonth(val) {
  userPrefs.dashMonth = val;
  saveUserPrefs();
  renderContent();
}

// ============ SETTINGS ============
function renderSettings() {
  const tableTabs = state.tabs.filter(t => t.type === 'table');
  let html = `
    <div class="section-header">
      <div class="section-title">Configuración</div>
    </div>
    <div class="settings-grid">`;

  tableTabs.forEach(tab => {
    html += `<div class="settings-card"><h4>${tab.name}</h4><ul class="entity-list">`;
    tab.rows.forEach((r, ri) => {
      const tag = tab.hasTag && r.tag ? `<span class="tag-pill" style="background:var(--c-blue-light);color:var(--c-blue);margin-left:6px;">${r.tag}</span>` : '';
      html += `<li><span>${r.name}${tag}</span><button class="btn btn-outline btn-sm" onclick="removeRow('${tab.id}',${ri})">✕</button></li>`;
    });
    html += `</ul><div class="add-entity-form"><input type="text" id="quick-add-${tab.id}" placeholder="Nuevo nombre...">`;
    if (tab.hasTag) html += `<input type="text" id="quick-tag-${tab.id}" placeholder="Etiqueta" style="max-width:90px;">`;
    html += `<button class="btn btn-gold btn-sm" onclick="quickAddRow('${tab.id}')">+</button></div></div>`;
  });

  html += `<div class="settings-card"><h4>Año fiscal</h4>
      <div class="form-group" style="margin-top:8px;">
        <label>Año mostrado en la cabecera</label>
        <input type="text" value="${state.branding.year}" onchange="state.branding.year=this.value;saveState();applyBranding();renderContent();">
      </div>
      <p style="font-size:12px;color:var(--c-text-muted);">Tip: cuando cambies de año, exportá los datos primero como backup desde "Personalizar".</p>
    </div>`;

  html += `<div class="settings-card"><h4>Apariencia</h4>
      <p style="font-size:13px;color:var(--c-text-muted);margin-bottom:14px;">Cambiá logo, colores, fuentes, nombre del estudio y exportá/importá datos.</p>
      <button class="btn btn-gold" onclick="openCustomize()">⚙ Abrir personalización</button>
    </div>`;

  html += `</div>`;
  return html;
}

// ============ CELL EDIT ============
let editingCell = null;
function openCellModal(tabId, rowIdx, colIdx) {
  const tab = state.tabs.find(t=>t.id===tabId);
  if (!tab) return;
  // Sesión 5: defensa en profundidad — no abrir el modal si está bloqueada
  if (tab.locked) { toast('🔒 Pestaña bloqueada'); return; }
  const row = tab.rows[rowIdx];
  if (!row) return;
  if (row.locked) { toast('🔒 Fila bloqueada'); return; }
  const cell = getCell(tab, row, colIdx);
  editingCell = { tabId, rowIdx, colIdx };
  // Sesión 6: marcar a otras usuarias que estoy editando esta fila
  if (typeof setEditingRowPresence === 'function') setEditingRowPresence(tabId, rowIdx, row.name);
  document.getElementById('modal-cell-title').textContent = row.name;
  document.getElementById('modal-cell-sub').textContent = tab.columns[colIdx] + ' · ' + (tab.tabYear || state.branding.year);

  // Detectar tipo de columna (solo aplica si la pestaña es annual)
  const isAnnual = (typeof tabIsAnnual === 'function') ? tabIsAnnual(tab) : false;
  const colType = isAnnual ? annualColType(tab, colIdx) : 'normal';

  // ¿Esta pestaña soporta el flujo "Enviado al cliente"? Sí: pestañas tipo table NO annual NO comments
  // (Empresas, Serv. Profesionales, Sueldos como pestañas... típicamente las que tienen meses)
  const supportsSent = !isAnnual && colType !== 'comments' && (tab.type === 'table');

  const statusSelect = document.getElementById('modal-cell-status');
  const dateGroup = document.getElementById('modal-date-group');
  const labelGroup = document.getElementById('modal-label-group');
  const sentGroup = document.getElementById('modal-sent-group');
  const commentLabel = document.querySelector('#modal-cell label[for="modal-cell-comment"], #modal-cell .form-group:last-of-type label');

  // CASO ESPECIAL: columna tipo "comments" → estados especiales (saldo a pagar / no aplica / CCE)
  if (colType === 'comments') {
    statusSelect.innerHTML = `
      <option value="empty">○ Sin definir</option>
      <option value="pay">💰 Saldo a pagar</option>
      <option value="na">— No aplica</option>
      <option value="credit">✓ CCE a solicitar</option>
    `;
    statusSelect.value = cell.cs || 'empty';
    statusSelect.setAttribute('data-mode', 'comments');
    // Ocultar fecha, etiqueta corta y enviado en este modo
    if (dateGroup) dateGroup.style.display = 'none';
    if (labelGroup) labelGroup.style.display = 'none';
    if (sentGroup) sentGroup.style.display = 'none';
  } else {
    // MODO NORMAL: estados de DDJJ (realizado / pendiente / N/A)
    statusSelect.innerHTML = `
      <option value="done">✓ Realizado</option>
      <option value="pending">⏳ Pendiente</option>
      <option value="na">— N/A</option>
      <option value="empty">○ Sin registrar</option>
    `;
    statusSelect.value = cell.s || 'empty';
    statusSelect.setAttribute('data-mode', 'normal');
    statusSelect.setAttribute('data-supports-sent', supportsSent ? '1' : '0');
    if (dateGroup) dateGroup.style.display = '';
    if (labelGroup) labelGroup.style.display = '';
    // Cuando arranca, mostrar/ocultar etiqueta corta y sent según estado
    updateCellModalFields();
  }

  document.getElementById('modal-cell-date').value = cell.d || '';
  document.getElementById('modal-cell-label').value = cell.t || '';
  document.getElementById('modal-cell-comment').value = cell.c || '';
  // Cargar estado "enviado al cliente"
  const sentCheck = document.getElementById('modal-cell-sent');
  const sentDate = document.getElementById('modal-cell-sent-date');
  if (sentCheck) sentCheck.checked = !!(cell.es); // es: true si está enviado
  if (sentDate) sentDate.value = cell.ed || ''; // ed: fecha de envío
  updateCellModalFields();
  document.getElementById('modal-cell').classList.add('open');
}

// Muestra/oculta los grupos según estado y tipo
function updateCellModalFields() {
  const statusSelect = document.getElementById('modal-cell-status');
  const mode = statusSelect.getAttribute('data-mode');
  if (mode === 'comments') return;
  const status = statusSelect.value;
  const supportsSent = statusSelect.getAttribute('data-supports-sent') === '1';
  const dateGroup = document.getElementById('modal-date-group');
  const labelGroup = document.getElementById('modal-label-group');
  const sentGroup = document.getElementById('modal-sent-group');
  const sentDateWrap = document.getElementById('modal-sent-date-wrap');
  if (status === 'done') {
    if (dateGroup) dateGroup.style.display = '';
    if (labelGroup) labelGroup.style.display = '';
    if (sentGroup) sentGroup.style.display = supportsSent ? '' : 'none';
  } else {
    if (dateGroup) dateGroup.style.display = (status === 'pending') ? '' : 'none';
    if (labelGroup) labelGroup.style.display = 'none';
    if (sentGroup) sentGroup.style.display = 'none';
  }
  // Sub-toggle: el campo de fecha de envío solo si el checkbox está marcado
  const sentCheck = document.getElementById('modal-cell-sent');
  if (sentDateWrap && sentCheck) {
    sentDateWrap.style.display = sentCheck.checked ? '' : 'none';
  }
}

function saveCellEdit() {
  if (!editingCell) return;
  const { tabId, rowIdx, colIdx } = editingCell;
  const tab = state.tabs.find(t=>t.id===tabId);
  const row = tab.rows[rowIdx];
  const oldCell = getCell(tab, row, colIdx);
  const before = { s: oldCell.s || 'empty', d: oldCell.d || '', c: oldCell.c || '', t: oldCell.t || '', cs: oldCell.cs || '', es: !!oldCell.es, ed: oldCell.ed || '' };
  const statusSelect = document.getElementById('modal-cell-status');
  const mode = statusSelect.getAttribute('data-mode');
  const status = statusSelect.value;
  const date = document.getElementById('modal-cell-date').value;
  const label = (document.getElementById('modal-cell-label').value || '').slice(0, 10);
  const comment = document.getElementById('modal-cell-comment').value;
  const sentCheck = document.getElementById('modal-cell-sent');
  const sentDate = document.getElementById('modal-cell-sent-date');
  const isSent = sentCheck ? sentCheck.checked : false;
  const sentDateVal = sentDate ? sentDate.value : '';
  let after;
  if (mode === 'comments') {
    after = { s: oldCell.s || 'empty', d: '', c: comment, t: '', cs: status, es: false, ed: '' };
  } else {
    // "Enviado al cliente" solo aplica cuando estado es "done"
    after = {
      s: status,
      d: date,
      c: comment,
      t: (status === 'done' ? label : ''),
      cs: '',
      es: (status === 'done' && isSent) ? true : false,
      ed: (status === 'done' && isSent && sentDateVal) ? sentDateVal : ''
    };
  }
  // ¿Antes ya estaba completa la empresa para este año? (solo annual)
  const wasCompleteBefore = (typeof tabIsAnnual === 'function' && tabIsAnnual(tab))
    ? (typeof isRowCompleteForYear === 'function' && isRowCompleteForYear(tab, row, tab.tabYear))
    : false;
  setCell(tab, row, colIdx, after);
  // Solo loguear si hubo cambio real
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    const colLabel = tab.columns[colIdx];
    const stateLabel = mode === 'comments' ? (COMMENT_STATES[status]?.label || status) : (after.s || 'vacío');
    logAudit('update', 'cell',
      'Cambió celda de "' + row.name + '" / ' + colLabel + ' en ' + tab.name + ' → ' + stateLabel,
      before, after, tab.id);
  }
  saveState();
  closeModal('modal-cell');
  // Sesión 6: limpiar presencia de edición
  if (typeof clearEditingRowPresence === 'function') clearEditingRowPresence();
  // 🔔 Trigger: si la celda ahora es "CCE a solicitar" (estado credit en columna comments),
  // notificar a Daniela y crearle una tarea automática
  if (mode === 'comments' && status === 'credit' && before.cs !== 'credit') {
    triggerCCESolicitar(tab, row, colIdx, comment);
  }
  // 🎉 Festejo si esta celda completó la empresa (solo en modo normal y annual)
  if (mode !== 'comments' && typeof tabIsAnnual === 'function' && tabIsAnnual(tab) && !wasCompleteBefore && status === 'done') {
    if (typeof isRowCompleteForYear === 'function' && isRowCompleteForYear(tab, row, tab.tabYear)) {
      if (typeof celebrateRowComplete === 'function') celebrateRowComplete(row, tab.tabYear);
    }
  }
  renderContent();
  toast('Guardado');
}

// Notificar a Daniela cuando se marca un comentario como "CCE a solicitar"
function triggerCCESolicitar(tab, row, colIdx, comment) {
  const targetUser = 'Daniela';
  if (!findUserByName(targetUser)) return;
  const me = currentUser();
  if (me && me.name === targetUser) return; // no auto-notificar
  const empresaName = row.name || '(sin nombre)';
  const colName = tab.columns[colIdx] || 'Comentarios';
  const year = tab.tabYear || (state.branding ? state.branding.year : '');
  const title = `✅ CCE a solicitar`;
  const body = `${me ? me.name + ' marcó' : 'Se marcó'} "${empresaName}" (${year}) con estado CCE a solicitar${comment ? ': ' + comment.slice(0, 60) + (comment.length > 60 ? '…' : '') : ''}`;
  notifyUserByName(targetUser, 'cell_comment', title, body, { type:'tab', tabId: tab.id });
  // Crear tarea automática
  addTaskToUser(targetUser, `✅ Solicitar CCE para ${empresaName} (${year})${comment ? ' · ' + comment.slice(0, 50) + (comment.length > 50 ? '…' : '') : ''}`, {
    origin: 'cce-solicitar',
    empresa: empresaName,
    tabId: tab.id,
    year: year
  });
}

// ============ ADD ENTITY ============
let addingTo = null;
function openAddEntity(tabId) {
  const tab = state.tabs.find(t=>t.id===tabId);
  addingTo = tabId;
  document.getElementById('modal-add-title').textContent = 'Agregar a ' + tab.name;
  document.getElementById('modal-add-name').value = '';
  document.getElementById('modal-add-tag').value = '';
  document.getElementById('modal-add-tag-group').style.display = tab.hasTag ? 'block' : 'none';
  document.getElementById('modal-add-entity').classList.add('open');
  setTimeout(() => document.getElementById('modal-add-name').focus(), 100);
}

function saveNewEntity() {
  const name = document.getElementById('modal-add-name').value.trim();
  if (!name) { toast('Ingresá un nombre'); return; }
  const tag = document.getElementById('modal-add-tag').value.trim();
  const tab = state.tabs.find(t=>t.id===addingTo);
  const newRow = { name, tag, cells: {} };
  // Si hay subpestaña activa, asignar
  const activeSub = getActiveSubTabId(tab);
  if (activeSub) newRow.subTabId = activeSub;
  tab.rows.push(newRow);
  logAudit('create', 'row', 'Agregó "' + name + '" a ' + tab.name, null, { name, tag }, tab.id);
  saveState();
  closeModal('modal-add-entity');
  renderContent();
  toast('Agregado: ' + name);
}

function quickAddRow(tabId) {
  const tab = state.tabs.find(t=>t.id===tabId);
  const name = document.getElementById('quick-add-'+tabId).value.trim();
  if (!name) return;
  const tag = tab.hasTag ? (document.getElementById('quick-tag-'+tabId).value.trim()) : '';
  const newRow = { name, tag, cells: {} };
  const activeSub = getActiveSubTabId(tab);
  if (activeSub) newRow.subTabId = activeSub;
  tab.rows.push(newRow);
  logAudit('create', 'row', 'Agregó "' + name + '" a ' + tab.name, null, { name, tag }, tab.id);
  saveState();
  renderContent();
  toast('Agregado: ' + name);
}

function removeRow(tabId, rowIdx) {
  const tab = state.tabs.find(t=>t.id===tabId);
  if (!tab || !tab.rows[rowIdx]) return;
  if (tab.locked) { toast('🔒 La pestaña está bloqueada'); return; }
  if (isRowLocked(tab, rowIdx)) { toast('🔒 Esta fila está bloqueada. Desbloqueala primero (clic derecho → Desbloquear).'); return; }
  if (!confirm('¿Mover "' + tab.rows[rowIdx].name + '" a la papelera? Vas a poder restaurarla durante ' + TRASH_RETENTION_DAYS + ' días.')) return;
  const rowName = tab.rows[rowIdx].name;
  moveToTrash('row', { tabId, idx: rowIdx, row: tab.rows[rowIdx] }, (rowName || '?') + ' (en ' + tab.name + ')');
  logAudit('delete', 'row', 'Eliminó "' + rowName + '" de ' + tab.name, { name: rowName }, null, tab.id);
  tab.rows.splice(rowIdx, 1);
  saveState(); renderContent();
  toast('🗑 Fila movida a la papelera');
}

function editTag(tabId, rowIdx) {
  const tab = state.tabs.find(t=>t.id===tabId);
  const row = tab.rows[rowIdx];
  const t = prompt('Etiqueta para "' + row.name + '":', row.tag || '');
  if (t !== null) { row.tag = t; saveState(); renderContent(); }
}

// ============ COLUMNS ============
let addingColTo = null;
function openAddCol(tabId) {
  addingColTo = tabId;
  const tab = state.tabs.find(t => t.id === tabId);
  let suggestion = '';
  if (tab && tab.colMode === 'years') {
    // Sugerir el año siguiente al último
    const lastYear = tab.columns.map(c => parseInt(c)).filter(n => !isNaN(n)).sort((a,b)=>b-a)[0];
    if (lastYear) suggestion = String(lastYear + 1);
  }
  document.getElementById('new-col-name').value = suggestion;
  document.getElementById('modal-add-col').classList.add('open');
  setTimeout(() => {
    const inp = document.getElementById('new-col-name');
    inp.focus();
    if (suggestion) inp.select();
  }, 100);
}

function saveNewCol() {
  const name = document.getElementById('new-col-name').value.trim();
  if (!name) return;
  const tab = state.tabs.find(t=>t.id===addingColTo);
  tab.columns.push(name);
  logAudit('create', 'column', 'Agregó columna "' + name + '" a ' + tab.name, null, name, tab.id);
  saveState();
  closeModal('modal-add-col');
  renderContent();
  toast('Columna agregada: ' + name);
}

function removeColumn(tabId, colIdx) {
  const tab = state.tabs.find(t=>t.id===tabId);
  if (!tab) return;
  if (tab.locked) { toast('🔒 La pestaña está bloqueada'); return; }
  if (!confirm('¿Mover la columna "' + tab.columns[colIdx] + '" a la papelera? Vas a poder restaurarla durante ' + TRASH_RETENTION_DAYS + ' días.')) return;
  // Backup: guardamos columna + celdas de cada fila en esa columna (de cellsByYear si hay)
  const cellsBackup = {};
  tab.rows.forEach((r, ri) => {
    if (r.cells && r.cells[colIdx] !== undefined) cellsBackup[ri] = r.cells[colIdx];
    // Si cellsByYear existe, agarramos del año activo
    if (r.cellsByYear) {
      const yr = tab.tabYear || state.branding.year;
      if (r.cellsByYear[yr] && r.cellsByYear[yr][colIdx] !== undefined && cellsBackup[ri] === undefined) {
        cellsBackup[ri] = r.cellsByYear[yr][colIdx];
      }
    }
  });
  moveToTrash('column', {
    tabId,
    idx: colIdx,
    column: tab.columns[colIdx],
    cells: cellsBackup
  }, 'Columna "' + tab.columns[colIdx] + '" de ' + tab.name);
  const colName = tab.columns[colIdx];
  logAudit('delete', 'column', 'Eliminó columna "' + colName + '" de ' + tab.name, colName, null, tab.id);
  tab.columns.splice(colIdx, 1);

  // Helper: reindex an object of cells removing colIdx
  const reindex = (cells) => {
    const out = {};
    Object.keys(cells || {}).forEach(k => {
      const idx = parseInt(k);
      if (idx < colIdx) out[idx] = cells[k];
      else if (idx > colIdx) out[idx-1] = cells[k];
    });
    return out;
  };

  tab.rows.forEach(r => {
    if (r.cells) r.cells = reindex(r.cells);
    if (r.cellsByYear) {
      Object.keys(r.cellsByYear).forEach(y => {
        r.cellsByYear[y] = reindex(r.cellsByYear[y]);
      });
    }
  });
  saveState(); renderContent();
  toast('🗑 Columna movida a la papelera');
}

// ============ TABS MGMT ============
function openAddTab() {
  document.getElementById('new-tab-name').value = '';
  document.getElementById('new-tab-type').value = 'table';
  document.getElementById('new-tab-colmode').value = 'months';

  // Build year selectors (current year - 2 to current year + 10)
  const baseYear = parseInt(state.branding.year) || new Date().getFullYear();
  const yearOpts = [];
  for (let y = baseYear - 2; y <= baseYear + 10; y++) yearOpts.push(y);
  const yearSelHTML = yearOpts.map(y => `<option value="${y}"${y===baseYear?' selected':''}>${y}</option>`).join('');
  document.getElementById('new-tab-year').innerHTML = yearSelHTML;
  document.getElementById('new-tab-year-from').innerHTML = yearOpts.map(y => `<option value="${y}"${y===baseYear?' selected':''}>${y}</option>`).join('');
  document.getElementById('new-tab-year-to').innerHTML = yearOpts.map(y => `<option value="${y}"${y===baseYear+4?' selected':''}>${y}</option>`).join('');

  document.getElementById('new-tab-cols').value = 'Q1,Q2,Q3,Q4';
  toggleNewTabCols();
  document.getElementById('modal-add-tab').classList.add('open');
}

document.addEventListener('change', (e) => {
  if (e.target.id === 'new-tab-type') toggleNewTabCols();
  if (e.target.id === 'new-tab-colmode') toggleNewTabCols();
});

function toggleNewTabCols() {
  const type = document.getElementById('new-tab-type').value;
  const isTable = (type === 'table');
  const isAnnual = (type === 'annual');
  const colmode = document.getElementById('new-tab-colmode').value;
  const show = (id, on) => { const el = document.getElementById(id); if (el) el.style.display = on ? 'block' : 'none'; };
  show('new-tab-colmode-group', isTable);
  show('new-tab-year-group',      isTable && colmode === 'months');
  show('new-tab-yearrange-group', isTable && colmode === 'years');
  show('new-tab-cols-group',      isTable && colmode === 'custom');
  // Annual: muestra inputs propios
  show('new-tab-annual-cols-group', isAnnual);
  show('new-tab-annual-year-group', isAnnual);
  // Poblar selector de año annual al vuelo si está vacío
  if (isAnnual) {
    const sel = document.getElementById('new-tab-annual-year');
    if (sel && !sel.options.length) {
      const baseYear = parseInt(state.branding.year) || new Date().getFullYear();
      const opts = [];
      for (let y = baseYear - 3; y <= baseYear + 5; y++) opts.push(y);
      sel.innerHTML = opts.map(y => `<option value="${y}"${y===baseYear?' selected':''}>${y}</option>`).join('');
    }
  }
}

function saveNewTab() {
  const name = document.getElementById('new-tab-name').value.trim();
  if (!name) { toast('Ingresá un nombre'); return; }
  const type = document.getElementById('new-tab-type').value;
  const id = 'tab_' + Date.now();
  if (type === 'table') {
    const colmode = document.getElementById('new-tab-colmode').value;
    let cols = [];
    let tabYear = null;
    if (colmode === 'months') {
      cols = MONTHS.slice();
      tabYear = String(document.getElementById('new-tab-year').value);
    } else if (colmode === 'years') {
      const from = parseInt(document.getElementById('new-tab-year-from').value);
      const to   = parseInt(document.getElementById('new-tab-year-to').value);
      if (to < from) { toast('El año final debe ser mayor o igual al inicial'); return; }
      if (to - from > 50) { toast('Rango demasiado grande (máx. 50 años)'); return; }
      for (let y = from; y <= to; y++) cols.push(String(y));
    } else {
      cols = document.getElementById('new-tab-cols').value.split(',').map(s=>s.trim()).filter(Boolean);
    }
    if (!cols.length) { toast('Definí al menos una columna'); return; }
    const tab = { id, name, type:'table', columns:cols, rows:[], hasTag:false, colMode: colmode };
    if (tabYear) tab.tabYear = tabYear;
    state.tabs.splice(state.tabs.length-1, 0, tab);
  } else if (type === 'annual') {
    const cols = document.getElementById('new-tab-annual-cols').value.split(',').map(s=>s.trim()).filter(Boolean);
    if (!cols.length) { toast('Definí al menos una columna (DDJJ)'); return; }
    const year = String(document.getElementById('new-tab-annual-year').value);
    const tab = {
      id, name, type:'annual',
      columns: cols, rows: [], hasTag: false,
      tabYear: year, years: [year]
    };
    state.tabs.splice(state.tabs.length-1, 0, tab);
  } else if (type === 'builder') {
    const tab = { id, name, type:'builder', blocks: [] };
    state.tabs.splice(state.tabs.length-1, 0, tab);
  } else {
    state.tabs.splice(state.tabs.length-1, 0, { id, name, type:'page', html: '<h2>'+name+'</h2><p>Hacé clic acá y editá el contenido cuando el modo edición esté activo.</p>' });
  }
  userPrefs.activeTabId = id;
  saveUserPrefs();
  logAudit('create', 'tab', 'Creó la pestaña "' + name + '" (' + type + ')', null, { id, name, type }, id);
  saveState();
  closeModal('modal-add-tab');
  renderTabs(); renderContent();
  toast('✓ Pestaña creada');
}

function renameTab(e, tabId) {
  e.stopPropagation();
  const tab = state.tabs.find(t=>t.id===tabId);
  if (!tab) return;
  // Permisos: en pestañas privadas con dueños, solo los dueños o admin pueden renombrar
  const me = currentUser();
  const isOwner = me && (tab.privateOwners || []).includes(me.name);
  if (me && me.role !== 'admin' && tabPrivacy(tab) === 'private_user' && !isOwner) {
    toast('⛔ No tenés permiso para renombrar esta pestaña privada');
    return;
  }
  if (tab.locked && me && me.role !== 'admin') {
    toast('🔒 La pestaña está bloqueada. Desbloqueala primero.');
    return;
  }
  const oldName = tab.name;
  const newName = prompt('Renombrar pestaña\n\n(Podés usar texto, emojis, o solo un emoji 📌)', tab.name);
  if (newName === null) return; // cancelado
  const trimmed = newName.trim();
  if (!trimmed) { toast('El nombre no puede estar vacío'); return; }
  if (trimmed === oldName) return; // sin cambios
  tab.name = trimmed;
  logAudit('rename', 'tab', 'Renombró "' + oldName + '" → "' + tab.name + '"', oldName, tab.name, tab.id);
  saveState(); renderTabs();
  toast('✓ Pestaña renombrada');
}

function removeTab(tabId) {
  const tab = state.tabs.find(t=>t.id===tabId);
  if (!tab) return;
  if (tab.removable === false) { toast('⛔ Esta pestaña no se puede eliminar'); return; }
  if (tab.locked) { toast('🔒 La pestaña está bloqueada. Desbloqueala primero desde "Privacidad y bloqueo".'); return; }
  // Sesión 5: solo admin o dueños (en privadas) pueden eliminar
  const me = currentUser();
  const isOwner = me && (tab.privateOwners || []).includes(me.name);
  if (me && me.role !== 'admin' && tabPrivacy(tab) === 'private_user' && !isOwner) {
    toast('⛔ No tenés permiso para eliminar esta pestaña privada'); return;
  }
  if (!confirm('¿Mover la pestaña "' + tab.name + '" a la papelera? Vas a poder restaurarla durante ' + TRASH_RETENTION_DAYS + ' días.')) return;
  moveToTrash('tab', tab, tab.name);
  logAudit('delete', 'tab', 'Eliminó la pestaña "' + tab.name + '"', { id: tab.id, name: tab.name, type: tab.type }, null, tab.id);
  state.tabs = state.tabs.filter(t => t.id !== tabId);
  if (userPrefs.activeTabId === tabId) { userPrefs.activeTabId = 'dashboard'; saveUserPrefs(); }
  saveState(); renderTabs(); renderContent();
  toast('🗑 Pestaña movida a la papelera');
}

// ============ PAGE TYPE ============
function renderPage(tab) {
  const editing = userPrefs.editMode;
  // Sesión 5: si la pestaña está bloqueada, forzar lectura (no contenteditable)
  const readOnly = tab.locked || !editing;
  return `
    <div class="section-header">
      <div class="section-title editable-title" data-edit="tab.name" data-tab-id="${tab.id}">${tab.name}</div>
      <div style="display:flex;gap:8px;align-items:center;">${tabPrivacyButton(tab)}</div>
    </div>
    <div class="custom-page-content" ${!readOnly?`contenteditable="true" onblur="savePageContent('${tab.id}',this.innerHTML)"`:''}>${tab.html}</div>
    ${editing && !tab.locked ?'<p style="margin-top:10px;font-size:11px;color:var(--c-text-muted);">Modo edición: hacé clic dentro del recuadro para editar. Se guarda al hacer clic fuera.</p>':''}
    ${tab.locked ?'<p style="margin-top:10px;font-size:11px;color:var(--c-pending);">🔒 Esta pestaña está bloqueada (solo lectura). Desbloqueala desde el botón 🔒/🔓 arriba para editarla.</p>':''}
  `;
}

function savePageContent(tabId, html) {
  const tab = state.tabs.find(t=>t.id===tabId);
  if (tab) { tab.html = html; saveState(); toast('Página guardada'); }
}

// ============ BUILDER: CONSTRUCTOR LIBRE DE BLOQUES ============
// Modelo:
//   tab.type === 'builder'
//   tab.blocks = [{ id, type, ... props específicos de cada tipo }]
//
// Tipos soportados (los 14 de la lista de Sesión 2):
//   richtext       — texto enriquecido contenteditable
//   ctable         — tabla configurable con tipos de columnas (Sesión 2 punto 2)
//   tasks          — lista de tareas
//   kanban         — kanban (3 columnas configurables)
//   gallery        — galería de tarjetas
//   minical        — mini calendario (lee state.calendarEvents)
//   image          — imagen embebida (base64) + caption
//   files          — archivos adjuntos (base64, máx ~500KB cada uno)
//   links          — enlaces externos
//   chart          — gráfico de barras simple
//   kpi            — KPIs en grilla
//   divider        — divisor (línea horizontal)
//   callout        — caja de aviso (info/warn/success/danger/neutral)
//   separator      — espaciador vertical

const BUILDER_BLOCK_CATALOG = [
  { type:'richtext', icon:'📝', label:'Texto enriquecido' },
  { type:'ctable',   icon:'📊', label:'Tabla configurable' },
  { type:'tasks',    icon:'✅', label:'Lista de tareas' },
  { type:'kanban',   icon:'📋', label:'Kanban' },
  { type:'gallery',  icon:'🗂️', label:'Galería de tarjetas' },
  { type:'minical',  icon:'📅', label:'Mini calendario' },
  { type:'image',    icon:'🖼️', label:'Imagen' },
  { type:'files',    icon:'📎', label:'Archivos adjuntos' },
  { type:'links',    icon:'🔗', label:'Enlaces' },
  { type:'chart',    icon:'📈', label:'Gráfico' },
  { type:'kpi',      icon:'💯', label:'KPIs' },
  { type:'callout',  icon:'💡', label:'Caja de aviso' },
  { type:'divider',  icon:'➖', label:'Divisor' },
  { type:'separator',icon:'⎵',  label:'Separador' }
];

// Tipos de columnas para la tabla configurable
const COL_TYPE_CATALOG = [
  { type:'text',      icon:'🔤', label:'Texto' },
  { type:'number',    icon:'🔢', label:'Número' },
  { type:'money',     icon:'💰', label:'Dinero' },
  { type:'date',      icon:'📅', label:'Fecha' },
  { type:'tag',       icon:'🏷️', label:'Etiqueta' },
  { type:'person',    icon:'👤', label:'Persona' },
  { type:'checkbox',  icon:'☑️', label:'Checkbox' },
  { type:'formula',   icon:'🧮', label:'Fórmula' },
  { type:'rating',    icon:'⭐', label:'Rating' },
  { type:'progress',  icon:'📊', label:'Progreso' },
  { type:'file',      icon:'📎', label:'Archivo' },
  { type:'color',     icon:'🎨', label:'Color' },
  { type:'reference', icon:'🔗', label:'Referencia' }
];

function genBlockId() { return 'blk_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }
function genColKey()   { return 'col_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }
function genRowKey()   { return 'row_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

// Plantilla de bloque vacío según tipo
function buildEmptyBlock(type) {
  const id = genBlockId();
  switch(type) {
    case 'richtext':
      return { id, type, html: '<p>Escribí acá tu texto…</p>' };
    case 'ctable':
      return {
        id, type, title:'Nueva tabla',
        cols: [
          { key: genColKey(), label:'Concepto',     ctype:'text' },
          { key: genColKey(), label:'Estado',       ctype:'tag', options:['Pendiente','Hecho','En curso'] },
          { key: genColKey(), label:'Vence',        ctype:'date' }
        ],
        rows: []
      };
    case 'tasks':
      return { id, type, title:'Lista de tareas', items: [] };
    case 'kanban':
      return {
        id, type, title:'Tablero',
        cols: [
          { key:'todo',   label:'Por hacer', cards: [] },
          { key:'doing',  label:'Haciendo',  cards: [] },
          { key:'done',   label:'Hecho',     cards: [] }
        ]
      };
    case 'gallery':
      return { id, type, title:'Galería', items: [] };
    case 'minical':
      return { id, type, monthOffset: 0 };
    case 'image':
      return { id, type, src:'', caption:'' };
    case 'files':
      return { id, type, items: [] };
    case 'links':
      return { id, type, items: [] };
    case 'chart':
      return {
        id, type, title:'Gráfico',
        data: [
          { label:'Ene', value: 30 },
          { label:'Feb', value: 50 },
          { label:'Mar', value: 45 },
          { label:'Abr', value: 70 }
        ]
      };
    case 'kpi':
      return {
        id, type,
        items: [
          { label:'Indicador', value:'0', delta:'' }
        ]
      };
    case 'callout':
      return { id, type, variant:'info', title:'Aviso', text:'Editá este mensaje desde el modo edición.' };
    case 'divider':
      return { id, type };
    case 'separator':
      return { id, type };
    default:
      return { id, type:'richtext', html:'<p>Bloque desconocido — convertido en texto.</p>' };
  }
}

// Util: escape HTML
function bbEscape(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

// ============ BUILDER: RENDER ============
function renderBuilder(tab) {
  if (!Array.isArray(tab.blocks)) tab.blocks = [];
  // Sesión 5: si la pestaña está bloqueada, ignoramos editMode (siempre solo lectura)
  const editing = userPrefs.editMode && !tab.locked;
  const isEmpty = tab.blocks.length === 0;

  let html = `
    <div class="section-header">
      <div class="section-title editable-title" data-edit="tab.name" data-tab-id="${tab.id}">${bbEscape(tab.name)}</div>
      <div style="display:flex;gap:10px;">
        ${editing ? `<button class="btn btn-gold btn-sm" onclick="openAddBlockModal('${tab.id}')">+ Agregar bloque</button>` : ''}
        ${tabPrivacyButton(tab)}
      </div>
    </div>
    ${tab.locked ?'<div style="background:var(--c-pending-light);color:var(--c-pending);padding:8px 14px;border-radius:4px;margin:0 16px;font-size:12px;border-left:3px solid var(--c-pending);">🔒 Esta pestaña está bloqueada (solo lectura).</div>':''}
    <div class="builder-wrap">`;

  // Panel lateral con paleta de bloques (solo en modo edición)
  html += `<aside class="builder-palette">
    <div class="builder-palette-title">Bloques disponibles</div>
    ${BUILDER_BLOCK_CATALOG.map(b => `
      <div class="builder-palette-item" draggable="true" data-palette-type="${b.type}" onclick="addBlockToBuilder('${tab.id}','${b.type}')">
        <span class="bpi-icon">${b.icon}</span>
        <span class="bpi-label">${b.label}</span>
      </div>
    `).join('')}
  </aside>`;

  // Canvas con los bloques
  if (isEmpty) {
    html += `<div class="builder-canvas is-empty">
      <div class="empty-msg">
        ${editing ? '🧱 <strong>Pestaña vacía.</strong><br>Hacé clic en un bloque del panel izquierdo o en "+ Agregar bloque" para empezar.' : '✨ Esta pestaña está vacía.<br>Activá el modo edición desde el menú ⋯ para agregar bloques.'}
      </div>
    </div>`;
  } else {
    html += `<div class="builder-canvas" id="builder-canvas-${tab.id}" data-tab-id="${tab.id}">`;
    tab.blocks.forEach((blk, idx) => {
      html += renderBuilderBlock(tab, blk, idx);
    });
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function renderBuilderBlock(tab, blk, idx) {
  const editing = userPrefs.editMode;
  const cat = BUILDER_BLOCK_CATALOG.find(c => c.type === blk.type);
  const badge = cat ? `${cat.icon} ${cat.label}` : blk.type;
  const toolbar = editing ? `
    <span class="bb-handle" title="Arrastrar para reordenar">⠿</span>
    <span class="bb-type-badge">${badge}</span>
    <div class="bb-toolbar">
      <button onclick="moveBuilderBlock('${tab.id}','${blk.id}',-1)" title="Subir">↑</button>
      <button onclick="moveBuilderBlock('${tab.id}','${blk.id}',1)" title="Bajar">↓</button>
      <button onclick="duplicateBuilderBlock('${tab.id}','${blk.id}')" title="Duplicar">⎘</button>
      <button class="bb-danger" onclick="removeBuilderBlock('${tab.id}','${blk.id}')" title="Eliminar">✕</button>
    </div>` : '';

  let body = '';
  switch(blk.type) {
    case 'richtext':  body = renderBlockRichtext(tab, blk); break;
    case 'ctable':    body = renderBlockCTable(tab, blk); break;
    case 'tasks':     body = renderBlockTasks(tab, blk); break;
    case 'kanban':    body = renderBlockKanban(tab, blk); break;
    case 'gallery':   body = renderBlockGallery(tab, blk); break;
    case 'minical':   body = renderBlockMinical(tab, blk); break;
    case 'image':     body = renderBlockImage(tab, blk); break;
    case 'files':     body = renderBlockFiles(tab, blk); break;
    case 'links':     body = renderBlockLinks(tab, blk); break;
    case 'chart':     body = renderBlockChart(tab, blk); break;
    case 'kpi':       body = renderBlockKPI(tab, blk); break;
    case 'callout':   body = renderBlockCallout(tab, blk); break;
    case 'divider':   body = `<div class="bb-divider"></div>`; break;
    case 'separator': body = `<div class="bb-separator"></div>`; break;
    default:          body = `<div style="color:var(--c-red);">Bloque desconocido: ${bbEscape(blk.type)}</div>`;
  }

  return `<div class="builder-block" data-block-id="${blk.id}" data-block-type="${blk.type}" data-tab-id="${tab.id}">
    ${toolbar}
    <div class="builder-block-body">${body}</div>
  </div>`;
}

// --- Render: Richtext ---
function renderBlockRichtext(tab, blk) {
  const editing = userPrefs.editMode;
  if (editing) {
    return `
      <div class="bb-richtext-toolbar">
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('bold')" title="Negrita"><b>B</b></button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('italic')" title="Cursiva"><i>I</i></button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('underline')" title="Subrayado"><u>U</u></button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('formatBlock','H2')" title="Título">H</button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('insertUnorderedList')" title="Viñetas">•</button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('insertOrderedList')" title="Lista numerada">1.</button>
        <button onmousedown="event.preventDefault();" onclick="document.execCommand('removeFormat')" title="Quitar formato">⟲</button>
      </div>
      <div class="bb-richtext" contenteditable="true" data-block-id="${blk.id}" data-tab-id="${tab.id}" onblur="saveBlockRichtext('${tab.id}','${blk.id}',this.innerHTML)">${blk.html || ''}</div>
    `;
  }
  return `<div class="bb-richtext">${blk.html || ''}</div>`;
}

// --- Render: Configurable Table (con tipos de columnas) ---
function renderBlockCTable(tab, blk) {
  const editing = userPrefs.editMode;
  if (!blk.cols) blk.cols = [];
  if (!blk.rows) blk.rows = [];

  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;color:var(--c-text);" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || 'Tabla')}</div>`;
  html += `<div class="bb-ctable-wrap"><table class="bb-ctable"><thead><tr>`;
  if (editing) html += `<th style="width:32px;"></th>`;
  blk.cols.forEach((col, ci) => {
    const cat = COL_TYPE_CATALOG.find(c => c.type === col.ctype);
    const ico = cat ? cat.icon : '';
    html += `<th>
      <span>${bbEscape(col.label)} <span class="col-type-badge">${ico}</span></span>
      ${editing ? `<span class="col-actions">
        <button onclick="editCTableColumn('${tab.id}','${blk.id}','${col.key}')" title="Editar columna">✎</button>
        <button onclick="removeCTableColumn('${tab.id}','${blk.id}','${col.key}')" title="Eliminar columna">✕</button>
      </span>` : ''}
    </th>`;
  });
  if (editing) html += `<th class="ctable-add-col" onclick="openColConfig('${tab.id}','${blk.id}',null)" title="Agregar columna">+</th>`;
  html += `</tr></thead><tbody>`;

  if (blk.rows.length === 0) {
    const colspan = blk.cols.length + (editing ? 2 : 0);
    html += `<tr><td colspan="${colspan}" style="text-align:center;color:var(--c-text-muted);padding:20px;font-style:italic;">Sin filas. ${editing ? 'Hacé clic en "+ Fila" para agregar.' : ''}</td></tr>`;
  } else {
    blk.rows.forEach(row => {
      html += `<tr data-row-key="${row.__key}">`;
      if (editing) html += `<td><button class="row-remove" onclick="removeCTableRow('${tab.id}','${blk.id}','${row.__key}')" title="Eliminar fila">✕</button></td>`;
      blk.cols.forEach(col => {
        html += `<td>${renderCTableCell(tab, blk, col, row)}</td>`;
      });
      if (editing) html += `<td></td>`;
      html += `</tr>`;
    });
  }
  html += `</tbody></table></div>`;
  if (editing) html += `<div class="bb-ctable-footer"><button onclick="addCTableRow('${tab.id}','${blk.id}')">+ Fila</button></div>`;
  return html;
}

function renderCTableCell(tab, blk, col, row) {
  const editing = userPrefs.editMode;
  const v = row[col.key];
  const k = col.key;
  switch(col.ctype) {
    case 'text':
      if (editing) return `<input class="cell-edit" type="text" value="${bbEscape(v || '')}" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">`;
      return bbEscape(v || '');
    case 'number':
      if (editing) return `<input class="cell-edit" type="number" step="any" value="${v != null ? v : ''}" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value === '' ? null : parseFloat(this.value))">`;
      return `<span class="ct-number">${v != null ? v : ''}</span>`;
    case 'money': {
      const curr = col.currency || '$U';
      if (editing) return `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:11px;color:var(--c-text-muted);">${curr}</span><input class="cell-edit" type="number" step="any" value="${v != null ? v : ''}" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value === '' ? null : parseFloat(this.value))"></div>`;
      return v != null ? `<span class="ct-money">${curr} ${Number(v).toLocaleString('es-UY',{minimumFractionDigits:2,maximumFractionDigits:2})}</span>` : '';
    }
    case 'date':
      if (editing) return `<input class="cell-edit" type="date" value="${v || ''}" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">`;
      return v ? new Date(v + 'T12:00:00').toLocaleDateString('es-UY',{day:'2-digit',month:'2-digit',year:'numeric'}) : '';
    case 'tag': {
      const opts = col.options || [];
      if (editing) {
        return `<select class="cell-edit" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">
          <option value="">—</option>
          ${opts.map(o => `<option value="${bbEscape(o)}"${v===o?' selected':''}>${bbEscape(o)}</option>`).join('')}
        </select>`;
      }
      return v ? `<span class="ct-tag">${bbEscape(v)}</span>` : '';
    }
    case 'person': {
      const opts = getValidUsers(); // siempre objetos ahora
      if (editing) {
        return `<select class="cell-edit" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">
          <option value="">—</option>
          ${opts.map(u => `<option value="${bbEscape(u.name)}"${v===u.name?' selected':''}>${bbEscape(u.displayName || u.name)}</option>`).join('')}
        </select>`;
      }
      if (!v) return '';
      const u = findUserByName(v);
      const label = u ? (u.displayName || u.name) : v;
      const color = u ? userColor(u) : userColor(v);
      const initial = label.charAt(0).toUpperCase();
      return `<span class="ct-person-chip"><span class="ct-avatar" style="background:${color};color:#fff;">${bbEscape(initial)}</span>${bbEscape(label)}</span>`;
    }
    case 'checkbox':
      return `<input class="ct-checkbox" type="checkbox" ${v ? 'checked' : ''} ${editing?'':'disabled'} onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.checked)">`;
    case 'formula': {
      const calc = evaluateFormula(col.formula || '', blk, row);
      return `<span class="ct-formula" title="Fórmula: ${bbEscape(col.formula||'')}">${calc}</span>`;
    }
    case 'rating': {
      const n = parseInt(v) || 0;
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        if (editing) stars += `<span class="star${i<=n?' on':''}" onclick="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',${i===n?0:i})">★</span>`;
        else stars += `<span class="star${i<=n?' on':''}">★</span>`;
      }
      return `<span class="ct-rating">${stars}</span>`;
    }
    case 'progress': {
      const n = Math.max(0, Math.min(100, parseFloat(v) || 0));
      if (editing) {
        return `<input class="cell-edit" type="number" min="0" max="100" value="${n}" style="max-width:80px;" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',Math.max(0,Math.min(100,parseFloat(this.value)||0)))"> %`;
      }
      return `<span class="ct-progress"><span class="ct-progress-bar" style="width:${n}%"></span></span><span class="ct-progress-label">${n}%</span>`;
    }
    case 'file': {
      const f = v;
      if (editing) {
        if (f && f.name) {
          return `<span class="ct-file-chip">📎 ${bbEscape(f.name)} <button style="background:none;border:none;cursor:pointer;color:var(--c-red);" onclick="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',null);renderContent();">✕</button></span>`;
        }
        return `<input type="file" style="font-size:11px;" onchange="onCTableFileUpload(event,'${tab.id}','${blk.id}','${row.__key}','${k}')">`;
      }
      if (f && f.name) {
        return `<a class="ct-file-chip" href="${f.data || '#'}" download="${bbEscape(f.name)}">📎 ${bbEscape(f.name)}</a>`;
      }
      return '';
    }
    case 'color': {
      if (editing) {
        return `<input type="color" value="${v || '#b8c1cc'}" style="width:40px;height:28px;padding:0;border:1px solid var(--c-border);border-radius:3px;cursor:pointer;" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">`;
      }
      return v ? `<span class="ct-color-swatch" style="background:${bbEscape(v)};" title="${bbEscape(v)}"></span>` : '';
    }
    case 'reference': {
      const targetTabs = (state.tabs || []).filter(t => t.id !== tab.id && (t.type === 'table' || t.type === 'builder'));
      if (editing) {
        return `<select class="cell-edit" onchange="setCTableCell('${tab.id}','${blk.id}','${row.__key}','${k}',this.value)">
          <option value="">—</option>
          ${targetTabs.map(t => `<option value="${bbEscape(t.id)}"${v===t.id?' selected':''}>${bbEscape(t.name)}</option>`).join('')}
        </select>`;
      }
      const t = targetTabs.find(x => x.id === v);
      return t ? `<span class="ct-reference" onclick="switchTab('${t.id}')">→ ${bbEscape(t.name)}</span>` : '';
    }
    default:
      return bbEscape(v || '');
  }
}

// Evaluador de fórmulas (seguro: no usa eval, parser propio)
function evaluateFormula(formula, blk, row) {
  if (!formula) return '';
  // Reemplaza {{NombreColumna}} por el valor numérico de esa celda en la misma fila
  const expanded = formula.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, name) => {
    const col = (blk.cols || []).find(c => c.label === name.trim());
    if (!col) return '0';
    const v = row[col.key];
    const n = parseFloat(v);
    return isNaN(n) ? '0' : String(n);
  });
  // Validar que solo queden números y operadores básicos
  if (!/^[\d\s+\-*/().,]*$/.test(expanded)) return '⚠ fórmula inválida';
  try {
    // Parser simple shunting-yard
    const result = safeEvalArith(expanded);
    if (result == null || isNaN(result)) return '';
    return Number(result).toLocaleString('es-UY', { maximumFractionDigits: 2 });
  } catch(e) {
    return '⚠ error';
  }
}

function safeEvalArith(expr) {
  // Shunting-yard básico (sin eval)
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[\d.]/.test(c)) {
      let num = '';
      while (i < expr.length && /[\d.]/.test(expr[i])) { num += expr[i++]; }
      tokens.push({ t:'num', v: parseFloat(num) });
      continue;
    }
    if ('+-*/()'.includes(c)) { tokens.push({ t:'op', v:c }); i++; continue; }
    return null;
  }
  // Convertir infix a RPN
  const out = [], op = [];
  const prec = { '+':1, '-':1, '*':2, '/':2 };
  for (const tk of tokens) {
    if (tk.t === 'num') out.push(tk);
    else if (tk.v === '(') op.push(tk);
    else if (tk.v === ')') {
      while (op.length && op[op.length-1].v !== '(') out.push(op.pop());
      op.pop();
    } else {
      while (op.length && op[op.length-1].v !== '(' && prec[op[op.length-1].v] >= prec[tk.v]) out.push(op.pop());
      op.push(tk);
    }
  }
  while (op.length) out.push(op.pop());
  // Evaluar RPN
  const stk = [];
  for (const tk of out) {
    if (tk.t === 'num') stk.push(tk.v);
    else {
      const b = stk.pop(), a = stk.pop();
      if (tk.v === '+') stk.push(a + b);
      else if (tk.v === '-') stk.push(a - b);
      else if (tk.v === '*') stk.push(a * b);
      else if (tk.v === '/') stk.push(b === 0 ? 0 : a / b);
    }
  }
  return stk[0];
}

// --- Render: Tasks ---
function renderBlockTasks(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || 'Lista de tareas')}</div>`;
  html += `<div class="bb-tasks">`;
  (blk.items || []).forEach((it, idx) => {
    html += `<div class="bb-task${it.done?' done':''}">
      <input type="checkbox" ${it.done?'checked':''} onchange="toggleTaskBlock('${tab.id}','${blk.id}',${idx},this.checked)">
      <span class="tk-text" ${editing?`contenteditable="true" onblur="updateTaskBlockText('${tab.id}','${blk.id}',${idx},this.textContent)"`:''}>${bbEscape(it.text || '')}</span>
      ${editing?`<button class="tk-remove" onclick="removeTaskBlock('${tab.id}','${blk.id}',${idx})">✕</button>`:''}
    </div>`;
  });
  html += `</div>`;
  if (editing) {
    html += `<div class="bb-task-add">
      <input type="text" placeholder="Nueva tarea..." onkeydown="if(event.key==='Enter'){addTaskBlock('${tab.id}','${blk.id}',this.value);this.value='';}">
      <button class="btn btn-outline btn-sm" onclick="const i=this.previousElementSibling; if(i.value){addTaskBlock('${tab.id}','${blk.id}',i.value);i.value='';}">+</button>
    </div>`;
  }
  return html;
}

// --- Render: Kanban ---
function renderBlockKanban(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || 'Tablero')}</div>`;
  html += `<div class="bb-kanban">`;
  (blk.cols || []).forEach(col => {
    html += `<div class="bb-kanban-col" data-kanban-col="${col.key}" data-block-id="${blk.id}" data-tab-id="${tab.id}">
      <div class="bb-kanban-col-header">
        <span ${editing?`contenteditable="true" onblur="updateKanbanColLabel('${tab.id}','${blk.id}','${col.key}',this.textContent)"`:''}>${bbEscape(col.label)}</span>
        <span style="font-size:11px;color:var(--c-text-muted);">${(col.cards||[]).length}</span>
      </div>`;
    (col.cards || []).forEach((card, ci) => {
      html += `<div class="bb-kanban-card" draggable="true" data-card-idx="${ci}" data-block-id="${blk.id}" data-tab-id="${tab.id}" data-from-col="${col.key}">
        <span ${editing?`contenteditable="true" onblur="updateKanbanCard('${tab.id}','${blk.id}','${col.key}',${ci},this.textContent)"`:''}>${bbEscape(card)}</span>
        ${editing?`<button class="kc-remove" onclick="removeKanbanCard('${tab.id}','${blk.id}','${col.key}',${ci})">✕</button>`:''}
      </div>`;
    });
    if (editing) html += `<button class="bb-kanban-add-btn" onclick="const t=prompt('Texto de la tarjeta:'); if(t)addKanbanCard('${tab.id}','${blk.id}','${col.key}',t);">+ Tarjeta</button>`;
    html += `</div>`;
  });
  html += `</div>`;
  return html;
}

// --- Render: Gallery ---
function renderBlockGallery(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
    <div style="font-weight:700;font-size:14px;" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || 'Galería')}</div>
    ${editing?`<button class="btn btn-outline btn-sm" onclick="addGalleryCard('${tab.id}','${blk.id}')">+ Tarjeta</button>`:''}
  </div>`;
  html += `<div class="bb-gallery">`;
  if ((blk.items || []).length === 0) {
    html += `<div style="grid-column:1/-1;text-align:center;color:var(--c-text-muted);padding:20px;font-style:italic;">Galería vacía.</div>`;
  }
  (blk.items || []).forEach((it, idx) => {
    html += `<div class="bb-gallery-card">
      ${editing?`<button class="gc-remove" onclick="removeGalleryCard('${tab.id}','${blk.id}',${idx})">✕</button>`:''}
      <div class="gc-title" ${editing?`contenteditable="true" onblur="updateGalleryCard('${tab.id}','${blk.id}',${idx},'title',this.textContent)"`:''}>${bbEscape(it.title || 'Sin título')}</div>
      <div class="gc-text" ${editing?`contenteditable="true" onblur="updateGalleryCard('${tab.id}','${blk.id}',${idx},'text',this.textContent)"`:''}>${bbEscape(it.text || '')}</div>
    </div>`;
  });
  html += `</div>`;
  return html;
}

// --- Render: Mini calendar ---
function renderBlockMinical(tab, blk) {
  const today = new Date();
  const refDate = new Date(today.getFullYear(), today.getMonth() + (blk.monthOffset || 0), 1);
  const yr = refDate.getFullYear(), mo = refDate.getMonth();
  const firstDow = new Date(yr, mo, 1).getDay(); // 0=dom
  const daysInMonth = new Date(yr, mo + 1, 0).getDate();
  const daysInPrev = new Date(yr, mo, 0).getDate();
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  // Eventos del mes (state.calendarEvents si existe)
  const eventsByDay = {};
  (state.calendarEvents || []).forEach(ev => {
    if (!ev.date) return;
    const d = new Date(ev.date + 'T12:00:00');
    if (d.getFullYear() === yr && d.getMonth() === mo) {
      eventsByDay[d.getDate()] = true;
    }
  });

  let html = `<div class="bb-minical">
    <div class="bb-minical-header">
      <div class="bb-minical-title">${monthNames[mo]} ${yr}</div>
      <div class="bb-minical-nav">
        <button onclick="moveMinical('${tab.id}','${blk.id}',-1)" title="Mes anterior">‹</button>
        <button onclick="moveMinical('${tab.id}','${blk.id}',0)" title="Mes actual">●</button>
        <button onclick="moveMinical('${tab.id}','${blk.id}',1)" title="Mes siguiente">›</button>
      </div>
    </div>
    <div class="bb-minical-grid">`;
  ['Do','Lu','Ma','Mi','Ju','Vi','Sa'].forEach(d => { html += `<div class="dow">${d}</div>`; });
  // días del mes previo (relleno)
  for (let i = firstDow - 1; i >= 0; i--) {
    html += `<div class="dnum other-month">${daysInPrev - i}</div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = (d === today.getDate() && mo === today.getMonth() && yr === today.getFullYear());
    const hasEv = !!eventsByDay[d];
    const cls = ['dnum'];
    if (isToday) cls.push('today');
    if (hasEv) cls.push('has-event');
    html += `<div class="${cls.join(' ')}">${d}</div>`;
  }
  // relleno del siguiente mes hasta llenar la grilla a 42 celdas
  const totalCells = firstDow + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="dnum other-month">${i}</div>`;
  }
  html += `</div></div>`;
  return html;
}

// --- Render: Image ---
function renderBlockImage(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div class="bb-image-wrap">`;
  if (blk.src) {
    html += `<img src="${blk.src}" alt="${bbEscape(blk.caption || '')}">`;
  } else {
    html += `<div style="padding:30px;border:1px dashed var(--c-border);border-radius:6px;color:var(--c-text-muted);text-align:center;">Sin imagen ${editing ? '— subila abajo' : ''}</div>`;
  }
  html += `</div>`;
  if (blk.caption || editing) {
    html += `<div class="bb-image-caption" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','caption',this.textContent)"`:''}>${bbEscape(blk.caption || (editing ? 'Pie de imagen...' : ''))}</div>`;
  }
  if (editing) {
    html += `<div style="margin-top:10px;text-align:center;"><input type="file" accept="image/*" onchange="onImageBlockUpload(event,'${tab.id}','${blk.id}')"></div>`;
  }
  return html;
}

// --- Render: Files ---
function renderBlockFiles(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;">📎 Archivos adjuntos</div>`;
  html += `<div class="bb-files">`;
  if ((blk.items || []).length === 0) {
    html += `<div style="text-align:center;color:var(--c-text-muted);padding:14px;font-style:italic;">Sin archivos.</div>`;
  }
  (blk.items || []).forEach((f, idx) => {
    const sizeKB = f.size ? (f.size / 1024).toFixed(1) + ' KB' : '';
    html += `<div class="bb-file-item">
      <span class="fl-icon">📄</span>
      <span class="fl-name">${bbEscape(f.name)}</span>
      <span class="fl-size">${sizeKB}</span>
      <span class="fl-actions">
        <button onclick="downloadFileBlock('${tab.id}','${blk.id}',${idx})">⬇</button>
        ${editing?`<button onclick="removeFileBlock('${tab.id}','${blk.id}',${idx})">✕</button>`:''}
      </span>
    </div>`;
  });
  html += `</div>`;
  if (editing) {
    html += `<div style="margin-top:10px;"><input type="file" onchange="onFilesBlockUpload(event,'${tab.id}','${blk.id}')"><small style="display:block;color:var(--c-text-muted);font-size:11px;margin-top:4px;">Máx. 500 KB por archivo (guardado embebido en el HTML).</small></div>`;
  }
  return html;
}

// --- Render: Links ---
function renderBlockLinks(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;">🔗 Enlaces</div>`;
  html += `<div class="bb-links">`;
  if ((blk.items || []).length === 0) {
    html += `<div style="text-align:center;color:var(--c-text-muted);padding:14px;font-style:italic;">Sin enlaces.</div>`;
  }
  (blk.items || []).forEach((lnk, idx) => {
    html += `<a class="bb-link-item" href="${lnk.url}" target="_blank" rel="noopener" ${editing?'onclick="event.preventDefault()"':''}>
      <span class="lnk-icon">🔗</span>
      <span class="lnk-title">${bbEscape(lnk.title)}</span>
      <span class="lnk-url">${bbEscape(lnk.url)}</span>
      ${editing?`<span class="lnk-remove" onclick="event.preventDefault();event.stopPropagation();removeLinkBlock('${tab.id}','${blk.id}',${idx})">✕</span>`:''}
    </a>`;
  });
  html += `</div>`;
  if (editing) {
    html += `<div style="margin-top:10px;display:flex;gap:6px;">
      <input type="text" id="link-add-title-${blk.id}" placeholder="Título" style="flex:1;padding:6px 10px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;font-size:13px;">
      <input type="text" id="link-add-url-${blk.id}" placeholder="https://..." style="flex:2;padding:6px 10px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;font-size:13px;">
      <button class="btn btn-outline btn-sm" onclick="addLinkBlock('${tab.id}','${blk.id}')">+ Agregar</button>
    </div>`;
  }
  return html;
}

// --- Render: Chart (barras simple, SVG-less, divs) ---
function renderBlockChart(tab, blk) {
  const editing = userPrefs.editMode;
  const data = blk.data || [];
  const max = Math.max(1, ...data.map(d => parseFloat(d.value) || 0));
  let html = `<div style="font-weight:700;font-size:14px;margin-bottom:10px;" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || 'Gráfico')}</div>`;
  html += `<div class="bb-chart-wrap">`;
  html += `<div class="bb-chart-bars">`;
  data.forEach(d => {
    const h = ((parseFloat(d.value) || 0) / max) * 100;
    html += `<div class="bb-chart-bar" style="height:${h}%;" title="${bbEscape(d.label)}: ${bbEscape(String(d.value))}">
      <span class="bar-value">${bbEscape(String(d.value))}</span>
    </div>`;
  });
  html += `</div><div class="bb-chart-labels">`;
  data.forEach(d => { html += `<div>${bbEscape(d.label)}</div>`; });
  html += `</div></div>`;
  if (editing) {
    html += `<div style="margin-top:10px;font-size:11px;color:var(--c-text-muted);">Datos (etiqueta:valor por línea):</div>
      <textarea rows="${Math.max(3, data.length)}" style="width:100%;padding:8px;border:1px solid var(--c-border);border-radius:3px;font-family:monospace;font-size:12px;" onblur="saveChartData('${tab.id}','${blk.id}',this.value)">${data.map(d => `${d.label}:${d.value}`).join('\n')}</textarea>`;
  }
  return html;
}

// --- Render: KPIs ---
function renderBlockKPI(tab, blk) {
  const editing = userPrefs.editMode;
  let html = `<div class="bb-kpi-grid">`;
  (blk.items || []).forEach((kpi, idx) => {
    const dCls = (kpi.delta || '').startsWith('-') ? 'down' : ((kpi.delta || '').startsWith('+') ? 'up' : '');
    html += `<div class="bb-kpi">
      <div class="bb-kpi-label" ${editing?`contenteditable="true" onblur="updateKPI('${tab.id}','${blk.id}',${idx},'label',this.textContent)"`:''}>${bbEscape(kpi.label || 'Indicador')}</div>
      <div class="bb-kpi-value" ${editing?`contenteditable="true" onblur="updateKPI('${tab.id}','${blk.id}',${idx},'value',this.textContent)"`:''}>${bbEscape(kpi.value || '0')}</div>
      ${(kpi.delta || editing) ? `<div class="bb-kpi-delta ${dCls}" ${editing?`contenteditable="true" onblur="updateKPI('${tab.id}','${blk.id}',${idx},'delta',this.textContent)"`:''}>${bbEscape(kpi.delta || (editing?'+0%':''))}</div>` : ''}
      ${editing?`<button style="position:absolute;top:4px;right:4px;background:transparent;border:none;color:var(--c-text-muted);cursor:pointer;" onclick="removeKPI('${tab.id}','${blk.id}',${idx})">✕</button>`:''}
    </div>`;
  });
  html += `</div>`;
  if (editing) {
    html += `<div style="margin-top:10px;"><button class="btn btn-outline btn-sm" onclick="addKPI('${tab.id}','${blk.id}')">+ Agregar KPI</button></div>`;
  }
  return html;
}

// --- Render: Callout ---
function renderBlockCallout(tab, blk) {
  const editing = userPrefs.editMode;
  const variants = { info:'ℹ️', warn:'⚠️', success:'✅', danger:'❌', neutral:'💡' };
  const v = blk.variant || 'info';
  const ico = variants[v] || '💡';
  let html = `<div class="bb-callout ${v}">
    <div class="bb-callout-icon">${ico}</div>
    <div class="bb-callout-body">
      <div class="bb-callout-title" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','title',this.textContent)"`:''}>${bbEscape(blk.title || '')}</div>
      <div class="bb-callout-text" ${editing?`contenteditable="true" onblur="saveBlockField('${tab.id}','${blk.id}','text',this.textContent)"`:''}>${bbEscape(blk.text || '')}</div>
    </div>
  </div>`;
  if (editing) {
    html += `<div style="margin-top:8px;display:flex;gap:6px;align-items:center;font-size:12px;">
      <label style="color:var(--c-text-muted);">Tipo:</label>
      <select onchange="saveBlockField('${tab.id}','${blk.id}','variant',this.value)" style="padding:4px 8px;border:1px solid var(--c-border);border-radius:3px;">
        ${Object.keys(variants).map(k => `<option value="${k}"${v===k?' selected':''}>${variants[k]} ${k}</option>`).join('')}
      </select>
    </div>`;
  }
  return html;
}

// ============ BUILDER: CRUD DE BLOQUES ============
function findBuilderBlock(tabId, blockId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return { tab:null, blk:null, idx:-1 };
  // Declaraciones: cada carpeta tiene UNA tabla (block). Reutilizamos todo el
  // motor de columnas/celdas existente buscando el bloque dentro de las carpetas.
  if (tab.type === 'declaraciones') {
    if (typeof window.declEnsureTypes === 'function') window.declEnsureTypes(tab);
    const types = tab.types || [];
    for (const ty of types) {
      const yrs = ty.years || {};
      for (const y in yrs) {
        if (yrs[y] && yrs[y].id === blockId)
          return { tab, blk: { id: yrs[y].id, type:'cTable', title: (ty.name + ' ' + y), cols: ty.cols, rows: yrs[y].rows }, idx:0 };
      }
    }
    return { tab, blk:null, idx:-1 };
  }
  if (tab.type !== 'builder') return { tab:null, blk:null, idx:-1 };
  const idx = (tab.blocks || []).findIndex(b => b.id === blockId);
  return { tab, blk: idx >= 0 ? tab.blocks[idx] : null, idx };
}

function openAddBlockModal(tabId) {
  const host = document.getElementById('add-block-grid-host');
  host.innerHTML = `<div class="add-block-grid">
    ${BUILDER_BLOCK_CATALOG.map(b => `
      <div class="blk-opt" onclick="addBlockToBuilder('${tabId}','${b.type}');closeModal('modal-add-block');">
        <div class="blk-ico">${b.icon}</div>
        <div class="blk-name">${b.label}</div>
      </div>
    `).join('')}
  </div>`;
  document.getElementById('modal-add-block').classList.add('open');
}

function addBlockToBuilder(tabId, type) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab || tab.type !== 'builder') return;
  if (!tab.blocks) tab.blocks = [];
  tab.blocks.push(buildEmptyBlock(type));
  const cat = BUILDER_BLOCK_CATALOG.find(c => c.type === type);
  logAudit('create', 'block', 'Agregó bloque ' + (cat ? cat.label : type) + ' a ' + tab.name, null, type, tab.id);
  saveState();
  renderContent();
}

function removeBuilderBlock(tabId, blockId) {
  const { tab, blk, idx } = findBuilderBlock(tabId, blockId);
  if (idx < 0) return;
  if (tab.locked) { toast('🔒 La pestaña está bloqueada'); return; }
  if (!confirm('¿Mover este bloque a la papelera? Vas a poder restaurarlo durante ' + TRASH_RETENTION_DAYS + ' días.')) return;
  const cat = BUILDER_BLOCK_CATALOG.find(c => c.type === blk.type);
  const desc = (cat ? cat.label : blk.type) + (blk.title ? ': ' + blk.title : '') + ' (en ' + tab.name + ')';
  moveToTrash('block', { tabId, idx, block: blk }, desc);
  logAudit('delete', 'block', 'Eliminó bloque ' + (cat ? cat.label : blk.type) + ' de ' + tab.name, blk.type, null, tab.id);
  tab.blocks.splice(idx, 1);
  saveState();
  renderContent();
  toast('🗑 Bloque movido a la papelera');
}

function duplicateBuilderBlock(tabId, blockId) {
  const { tab, blk, idx } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const copy = JSON.parse(JSON.stringify(blk));
  copy.id = genBlockId();
  // Re-keyear filas de tabla configurable para no duplicar refs
  if (copy.type === 'ctable' && Array.isArray(copy.rows)) {
    copy.rows.forEach(r => { r.__key = genRowKey(); });
  }
  tab.blocks.splice(idx + 1, 0, copy);
  saveState();
  renderContent();
}

function moveBuilderBlock(tabId, blockId, delta) {
  const { tab, idx } = findBuilderBlock(tabId, blockId);
  if (idx < 0) return;
  const newIdx = idx + delta;
  if (newIdx < 0 || newIdx >= tab.blocks.length) return;
  const [item] = tab.blocks.splice(idx, 1);
  tab.blocks.splice(newIdx, 0, item);
  saveState();
  renderContent();
}

function saveBlockField(tabId, blockId, field, value) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  blk[field] = value;
  saveState();
}

function saveBlockRichtext(tabId, blockId, html) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  blk.html = html;
  saveState();
}

// --- Tasks block ---
function addTaskBlock(tabId, blockId, text) {
  if (!text || !text.trim()) return;
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.items) blk.items = [];
  blk.items.push({ text: text.trim(), done: false });
  saveState();
  renderContent();
}
function toggleTaskBlock(tabId, blockId, idx, checked) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items[idx]) return;
  blk.items[idx].done = !!checked;
  saveState();
  renderContent();
}
function updateTaskBlockText(tabId, blockId, idx, text) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items[idx]) return;
  blk.items[idx].text = text;
  saveState();
}
function removeTaskBlock(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items) return;
  blk.items.splice(idx, 1);
  saveState();
  renderContent();
}

// --- Kanban block ---
function addKanbanCard(tabId, blockId, colKey, text) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const col = (blk.cols || []).find(c => c.key === colKey);
  if (!col) return;
  if (!col.cards) col.cards = [];
  col.cards.push(text);
  saveState();
  renderContent();
}
function updateKanbanCard(tabId, blockId, colKey, cardIdx, text) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const col = (blk.cols || []).find(c => c.key === colKey);
  if (!col || !col.cards) return;
  col.cards[cardIdx] = text;
  saveState();
}
function removeKanbanCard(tabId, blockId, colKey, cardIdx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const col = (blk.cols || []).find(c => c.key === colKey);
  if (!col || !col.cards) return;
  col.cards.splice(cardIdx, 1);
  saveState();
  renderContent();
}
function updateKanbanColLabel(tabId, blockId, colKey, label) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const col = (blk.cols || []).find(c => c.key === colKey);
  if (!col) return;
  col.label = label;
  saveState();
}

// --- Gallery block ---
function addGalleryCard(tabId, blockId) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.items) blk.items = [];
  blk.items.push({ title: 'Nueva tarjeta', text: '' });
  saveState();
  renderContent();
}
function updateGalleryCard(tabId, blockId, idx, field, value) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items[idx]) return;
  blk.items[idx][field] = value;
  saveState();
}
function removeGalleryCard(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items) return;
  blk.items.splice(idx, 1);
  saveState();
  renderContent();
}

// --- Minical block ---
function moveMinical(tabId, blockId, dir) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (dir === 0) blk.monthOffset = 0;
  else blk.monthOffset = (blk.monthOffset || 0) + dir;
  saveState();
  renderContent();
}

// --- Image block ---
function onImageBlockUpload(e, tabId, blockId) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 1024 * 1024) {
    if (!confirm('La imagen pesa más de 1 MB. Esto puede ralentizar la sincronización. ¿Continuar?')) return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    const { blk } = findBuilderBlock(tabId, blockId);
    if (!blk) return;
    blk.src = ev.target.result;
    saveState();
    renderContent();
  };
  reader.readAsDataURL(file);
}

// --- Files block ---
function onFilesBlockUpload(e, tabId, blockId) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) {
    toast('⚠ El archivo supera los 500 KB. Reducí el tamaño o usá un enlace.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    const { blk } = findBuilderBlock(tabId, blockId);
    if (!blk) return;
    if (!blk.items) blk.items = [];
    blk.items.push({ name: file.name, size: file.size, type: file.type, data: ev.target.result });
    saveState();
    renderContent();
  };
  reader.readAsDataURL(file);
}
function downloadFileBlock(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items[idx]) return;
  const f = blk.items[idx];
  const a = document.createElement('a');
  a.href = f.data;
  a.download = f.name;
  a.click();
}
function removeFileBlock(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items) return;
  blk.items.splice(idx, 1);
  saveState();
  renderContent();
}

// --- Links block ---
function addLinkBlock(tabId, blockId) {
  const titleEl = document.getElementById(`link-add-title-${blockId}`);
  const urlEl = document.getElementById(`link-add-url-${blockId}`);
  const title = titleEl ? titleEl.value.trim() : '';
  let url = urlEl ? urlEl.value.trim() : '';
  if (!title || !url) { toast('Completá título y URL'); return; }
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.items) blk.items = [];
  blk.items.push({ title, url });
  saveState();
  renderContent();
}
function removeLinkBlock(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items) return;
  blk.items.splice(idx, 1);
  saveState();
  renderContent();
}

// --- Chart block ---
function saveChartData(tabId, blockId, raw) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const data = raw.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [label, value] = line.split(':');
      return { label: (label || '').trim(), value: parseFloat(value) || 0 };
    });
  blk.data = data;
  saveState();
  renderContent();
}

// --- KPI block ---
function addKPI(tabId, blockId) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.items) blk.items = [];
  blk.items.push({ label: 'Nuevo KPI', value: '0', delta: '' });
  saveState();
  renderContent();
}
function updateKPI(tabId, blockId, idx, field, value) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items[idx]) return;
  blk.items[idx][field] = value;
  saveState();
}
function removeKPI(tabId, blockId, idx) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.items) return;
  blk.items.splice(idx, 1);
  saveState();
  renderContent();
}

// ============ BUILDER: CONFIGURABLE TABLE — Tipos de columnas ============
// Estado temporal del modal de configuración de columna
let _colConfigCtx = null; // { tabId, blockId, colKey: null | key }

function openColConfig(tabId, blockId, colKey) {
  _colConfigCtx = { tabId, blockId, colKey };
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const existing = colKey ? (blk.cols || []).find(c => c.key === colKey) : null;

  document.getElementById('col-config-title').textContent = existing ? 'Editar columna' : 'Nueva columna';
  document.getElementById('col-config-name').value = existing ? (existing.label || '') : '';
  const currentType = existing ? (existing.ctype || 'text') : 'text';
  document.getElementById('col-config-type').value = currentType;

  // Render grid de tipos
  const grid = document.getElementById('col-type-grid');
  grid.innerHTML = COL_TYPE_CATALOG.map(ct => `
    <div class="ct-opt${ct.type===currentType?' selected':''}" data-ct="${ct.type}" onclick="selectColType('${ct.type}')">
      <span class="ct-ico">${ct.icon}</span>
      ${ct.label}
    </div>
  `).join('');

  // Campos condicionales
  document.getElementById('col-config-options').value = existing && Array.isArray(existing.options) ? existing.options.join('\n') : '';
  document.getElementById('col-config-formula').value = existing ? (existing.formula || '') : '';
  document.getElementById('col-config-currency').value = existing ? (existing.currency || '$U') : '$U';
  updateColConfigFields(currentType);

  document.getElementById('modal-col-config').classList.add('open');
}

function selectColType(type) {
  document.getElementById('col-config-type').value = type;
  document.querySelectorAll('#col-type-grid .ct-opt').forEach(el => {
    el.classList.toggle('selected', el.getAttribute('data-ct') === type);
  });
  updateColConfigFields(type);
}

function updateColConfigFields(type) {
  const show = (id, on) => { const el = document.getElementById(id); if (el) el.style.display = on ? 'block' : 'none'; };
  show('col-config-options-group', type === 'tag');
  show('col-config-formula-group', type === 'formula');
  show('col-config-currency-group', type === 'money');
  const lblEl = document.getElementById('col-config-options-label');
  if (lblEl && type === 'tag') lblEl.textContent = 'Opciones de etiqueta (una por línea)';
}

function saveColConfig() {
  if (!_colConfigCtx) return;
  const { tabId, blockId, colKey } = _colConfigCtx;
  const name = document.getElementById('col-config-name').value.trim();
  if (!name) { toast('Ingresá un nombre'); return; }
  const ctype = document.getElementById('col-config-type').value;
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.cols) blk.cols = [];

  const colData = { label: name, ctype };
  if (ctype === 'tag') {
    colData.options = document.getElementById('col-config-options').value.split('\n').map(s => s.trim()).filter(Boolean);
  }
  if (ctype === 'formula') {
    colData.formula = document.getElementById('col-config-formula').value.trim();
  }
  if (ctype === 'money') {
    colData.currency = document.getElementById('col-config-currency').value;
  }

  if (colKey) {
    // Editar columna existente
    const col = blk.cols.find(c => c.key === colKey);
    if (col) {
      // Si cambió el tipo, limpiar valores incompatibles
      const oldType = col.ctype;
      Object.assign(col, colData);
      if (oldType !== ctype && Array.isArray(blk.rows)) {
        // No borramos los datos, solo notificamos: el render mostrará lo que pueda
      }
    }
  } else {
    // Nueva columna
    colData.key = genColKey();
    blk.cols.push(colData);
  }
  saveState();
  closeModal('modal-col-config');
  renderContent();
}

function editCTableColumn(tabId, blockId, colKey) {
  openColConfig(tabId, blockId, colKey);
}

function removeCTableColumn(tabId, blockId, colKey) {
  if (!confirm('¿Eliminar esta columna? Los datos de la columna se perderán.')) return;
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  blk.cols = (blk.cols || []).filter(c => c.key !== colKey);
  // Limpiar el valor de cada fila para esa columna
  (blk.rows || []).forEach(r => { delete r[colKey]; });
  saveState();
  renderContent();
}

function addCTableRow(tabId, blockId) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  if (!blk.rows) blk.rows = [];
  blk.rows.push({ __key: genRowKey() });
  saveState();
  renderContent();
}

function removeCTableRow(tabId, blockId, rowKey) {
  const { tab, blk } = findBuilderBlock(tabId, blockId);
  if (!blk || !blk.rows) return;
  if (tab.locked) { toast('🔒 La pestaña está bloqueada'); return; }
  const row = blk.rows.find(r => r.__key === rowKey);
  if (!row) return;
  // Descripción legible: primer valor de la fila
  const firstCol = (blk.cols || [])[0];
  const desc = (firstCol ? (row[firstCol.key] || '(fila vacía)') : '(fila)') + ' (en ' + (blk.title || 'tabla') + ', ' + tab.name + ')';
  moveToTrash('ctable_row', { tabId, blockId, row }, desc);
  blk.rows = blk.rows.filter(r => r.__key !== rowKey);
  saveState();
  renderContent();
  toast('🗑 Fila movida a la papelera');
}

function setCTableCell(tabId, blockId, rowKey, colKey, value) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const row = (blk.rows || []).find(r => r.__key === rowKey);
  if (!row) return;
  row[colKey] = value;
  saveState();
  // Re-render solo si hay fórmulas (porque pueden cambiar valores derivados)
  const hasFormula = (blk.cols || []).some(c => c.ctype === 'formula');
  if (hasFormula) renderContent();
}

function onCTableFileUpload(e, tabId, blockId, rowKey, colKey) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) {
    toast('⚠ El archivo supera los 500 KB.');
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    setCTableCell(tabId, blockId, rowKey, colKey, { name: file.name, size: file.size, type: file.type, data: ev.target.result });
    renderContent();
  };
  reader.readAsDataURL(file);
}

// ============ BUILDER: DRAG & DROP de bloques + tarjetas Kanban ============
function attachBuilderHandlers(tab) {
  if (!userPrefs.editMode) return;
  // Drag bloques por el handle
  const canvas = document.querySelector(`#builder-canvas-${tab.id}`);
  if (canvas) {
    canvas.querySelectorAll('.builder-block').forEach(blockEl => {
      const handle = blockEl.querySelector('.bb-handle');
      if (!handle) return;
      handle.addEventListener('mousedown', () => { blockEl.setAttribute('draggable', 'true'); });
      handle.addEventListener('mouseup', () => { blockEl.removeAttribute('draggable'); });
      blockEl.addEventListener('dragstart', (e) => {
        if (!blockEl.hasAttribute('draggable')) { e.preventDefault(); return; }
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', blockEl.getAttribute('data-block-id'));
        blockEl.classList.add('dragging');
      });
      blockEl.addEventListener('dragend', () => {
        blockEl.classList.remove('dragging');
        blockEl.removeAttribute('draggable');
        canvas.querySelectorAll('.builder-block').forEach(b => { b.classList.remove('drag-over-top','drag-over-bottom'); });
      });
      blockEl.addEventListener('dragover', (e) => {
        if (e.dataTransfer.types.includes('text/plain')) {
          e.preventDefault();
          const rect = blockEl.getBoundingClientRect();
          const isTop = (e.clientY - rect.top) < rect.height / 2;
          blockEl.classList.toggle('drag-over-top', isTop);
          blockEl.classList.toggle('drag-over-bottom', !isTop);
        }
      });
      blockEl.addEventListener('dragleave', () => {
        blockEl.classList.remove('drag-over-top','drag-over-bottom');
      });
      blockEl.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        if (!draggedId) return;
        const targetId = blockEl.getAttribute('data-block-id');
        if (draggedId === targetId) return;
        const rect = blockEl.getBoundingClientRect();
        const isTop = (e.clientY - rect.top) < rect.height / 2;
        moveBlockToBlock(tab.id, draggedId, targetId, isTop ? 'before' : 'after');
      });
    });
  }

  // Drag desde paleta lateral al canvas (inserta nuevo bloque)
  document.querySelectorAll('.builder-palette-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('application/x-palette-type', item.getAttribute('data-palette-type'));
    });
  });
  if (canvas) {
    canvas.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types.includes('application/x-palette-type')) {
        e.preventDefault();
      }
    });
    canvas.addEventListener('drop', (e) => {
      const type = e.dataTransfer.getData('application/x-palette-type');
      if (type) {
        e.preventDefault();
        addBlockToBuilder(tab.id, type);
      }
    });
  }

  // Drag kanban cards entre columnas
  document.querySelectorAll('.bb-kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      const payload = {
        cardIdx: parseInt(card.getAttribute('data-card-idx')),
        blockId: card.getAttribute('data-block-id'),
        tabId: card.getAttribute('data-tab-id'),
        fromCol: card.getAttribute('data-from-col')
      };
      e.dataTransfer.setData('application/x-kanban-card', JSON.stringify(payload));
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); });
  });
  document.querySelectorAll('.bb-kanban-col').forEach(col => {
    col.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types.includes('application/x-kanban-card')) {
        e.preventDefault();
        col.classList.add('drag-over');
      }
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', (e) => {
      col.classList.remove('drag-over');
      const raw = e.dataTransfer.getData('application/x-kanban-card');
      if (!raw) return;
      try {
        const payload = JSON.parse(raw);
        const toCol = col.getAttribute('data-kanban-col');
        if (payload.fromCol === toCol) return;
        moveKanbanCard(payload.tabId, payload.blockId, payload.fromCol, payload.cardIdx, toCol);
      } catch(_) {}
    });
  });
}

function moveBlockToBlock(tabId, draggedId, targetId, position) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab || !tab.blocks) return;
  const fromIdx = tab.blocks.findIndex(b => b.id === draggedId);
  if (fromIdx < 0) return;
  const [item] = tab.blocks.splice(fromIdx, 1);
  let toIdx = tab.blocks.findIndex(b => b.id === targetId);
  if (toIdx < 0) { tab.blocks.push(item); }
  else {
    if (position === 'after') toIdx += 1;
    tab.blocks.splice(toIdx, 0, item);
  }
  saveState();
  renderContent();
}

function moveKanbanCard(tabId, blockId, fromColKey, cardIdx, toColKey) {
  const { blk } = findBuilderBlock(tabId, blockId);
  if (!blk) return;
  const fromCol = (blk.cols || []).find(c => c.key === fromColKey);
  const toCol   = (blk.cols || []).find(c => c.key === toColKey);
  if (!fromCol || !toCol) return;
  const [card] = fromCol.cards.splice(cardIdx, 1);
  if (!toCol.cards) toCol.cards = [];
  toCol.cards.push(card);
  saveState();
  renderContent();
}

// ============ INLINE EDIT ============
function attachInlineEditHandlers() {
  document.querySelectorAll('.editable-title').forEach(el => {
    el.onclick = function(e) {
      if (!userPrefs.editMode) return;
      e.stopPropagation();
      const type = el.getAttribute('data-edit');
      const tabId = el.getAttribute('data-tab-id');
      if (type === 'tab.name') {
        renameTab(e, tabId);
      } else if (type === 'col') {
        const colIdx = parseInt(el.getAttribute('data-col'));
        const tab = state.tabs.find(t=>t.id===tabId);
        const newName = prompt('Renombrar columna:', tab.columns[colIdx]);
        if (newName && newName.trim()) { tab.columns[colIdx] = newName.trim(); saveState(); renderContent(); }
      } else if (type === 'row') {
        const rowIdx = parseInt(el.getAttribute('data-row'));
        const tab = state.tabs.find(t=>t.id===tabId);
        const newName = prompt('Renombrar fila:', tab.rows[rowIdx].name);
        if (newName && newName.trim()) { tab.rows[rowIdx].name = newName.trim(); saveState(); renderContent(); }
      }
    };
  });
}

// ============ MONTH FILTER ============
function setMonthFilter(tabId, idx) {
  userPrefs.monthFilters[tabId] = idx;
  saveUserPrefs();
  renderContent();
}

// ============ HEADER DROPDOWN MENU (⋯) ============
function toggleHeaderMenu(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('header-menu-dropdown');
  const btn = document.getElementById('header-menu-btn');
  if (!dd || !btn) return;
  const isOpen = dd.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
function closeHeaderMenu() {
  const dd = document.getElementById('header-menu-dropdown');
  const btn = document.getElementById('header-menu-btn');
  if (dd) dd.classList.remove('open');
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
}
// Cerrar al hacer clic fuera o tocar Escape
document.addEventListener('click', (e) => {
  const wrap = e.target.closest('.header-menu-wrap');
  if (!wrap) closeHeaderMenu();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHeaderMenu();
});

// ============ EDIT MODE ============
function toggleEditMode() {
  // Sesión 4: viewer no puede entrar en modo edición
  const me = currentUser();
  if (me && me.role === 'viewer' && !userPrefs.editMode) {
    toast('⛔ Tu rol es Solo lectura — no podés activar edición');
    return;
  }
  userPrefs.editMode = !userPrefs.editMode;
  document.body.classList.toggle('edit-mode', userPrefs.editMode);
  const btn = document.getElementById('edit-toggle-btn');
  if (btn) {
    btn.classList.toggle('active', userPrefs.editMode);
    const labelEl = btn.querySelector('.hmi-label');
    const iconEl = btn.querySelector('.hmi-icon');
    if (labelEl && iconEl) {
      iconEl.textContent = userPrefs.editMode ? '✓' : '✎';
      labelEl.textContent = userPrefs.editMode ? 'Listo' : 'Editar';
    } else {
      // fallback (markup viejo)
      btn.textContent = userPrefs.editMode ? '✓ Listo' : '✎ Editar';
    }
  }
  // Marcar el botón ⋯ con un punto indicador cuando edit está activo
  const menuBtn = document.getElementById('header-menu-btn');
  if (menuBtn) menuBtn.classList.toggle('has-active', userPrefs.editMode);
  saveUserPrefs();
  renderTabs();
  renderContent();
}

// ============ CUSTOMIZE ============
function openCustomize() {
  // Sesión 4: solo admin puede modificar branding y configuración global
  if (!requireRole('admin', 'personalizar la app')) return;
  const b = state.branding;
  document.getElementById('customize-logo-preview').src = b.logo;
  document.getElementById('customize-name').value = b.name;
  document.getElementById('customize-subtitle').value = b.subtitle;
  document.getElementById('color-accent').value = b.colors.accent;
  document.getElementById('color-header').value = b.colors.header;
  document.getElementById('color-bg').value = b.colors.bg;
  document.getElementById('color-text').value = b.colors.text;
  document.getElementById('font-display').value = b.fonts.display;
  document.getElementById('font-body').value = b.fonts.body;
  document.getElementById('logo-invert-chk').checked = b.logoInvert;
  document.getElementById('modal-customize').classList.add('open');
}

function updateBranding() {
  state.branding.name = document.getElementById('customize-name').value;
  state.branding.subtitle = document.getElementById('customize-subtitle').value;
  saveState(); applyBranding();
}

function updateColors() {
  state.branding.colors.accent = document.getElementById('color-accent').value;
  state.branding.colors.header = document.getElementById('color-header').value;
  state.branding.colors.bg = document.getElementById('color-bg').value;
  state.branding.colors.text = document.getElementById('color-text').value;
  saveState(); applyBranding(); renderContent();
}

function updateFonts() {
  state.branding.fonts.display = document.getElementById('font-display').value;
  state.branding.fonts.body = document.getElementById('font-body').value;
  saveState(); applyBranding();
}

function applyPreset(name) {
  const presets = {
    classic: { accent:'#b8c1cc', header:'#102030', bg:'#ffffff', text:'#0a0a0a' },
    silver:  { accent:'#b8c1cc', header:'#102030', bg:'#ffffff', text:'#0a0a0a' },
    navy:    { accent:'#c5cdd5', header:'#0f1f3a', bg:'#ffffff', text:'#1a2540' },
    forest:  { accent:'#b8c8b8', header:'#1a3a2a', bg:'#ffffff', text:'#1a2620' },
    burgundy:{ accent:'#cdb8be', header:'#3a1520', bg:'#ffffff', text:'#2a1015' },
    mono:    { accent:'#6c757d', header:'#1a1a1a', bg:'#ffffff', text:'#1a1a1a' },
    gold:    { accent:'#b8972d', header:'#0a0a0a', bg:'#f9f8f6', text:'#0a0a0a' }
  };
  state.branding.colors = presets[name];
  saveState(); applyBranding(); renderContent(); openCustomize();
}

function uploadLogo(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    state.branding.logo = ev.target.result;
    saveState(); applyBranding();
    document.getElementById('customize-logo-preview').src = ev.target.result;
    toast('Logo actualizado');
  };
  reader.readAsDataURL(file);
}

function resetLogo() {
  state.branding.logo = DEFAULT_LOGO;
  saveState(); applyBranding();
  document.getElementById('customize-logo-preview').src = DEFAULT_LOGO;
}

function toggleLogoInvert(v) {
  state.branding.logoInvert = v;
  saveState(); applyBranding();
}

function openYearSettings() {
  const v = prompt('Año principal del estudio (afecta al título del header y al dashboard):', state.branding.year);
  if (!v || !v.trim()) return;
  const newYear = v.trim();
  const oldYear = state.branding.year;
  state.branding.year = newYear;

  // Buscar pestañas mensuales con su propio tabYear
  const tabsWithYear = (state.tabs||[]).filter(t => t.type === 'table' && t.tabYear);
  if (tabsWithYear.length && newYear !== oldYear) {
    if (confirm(`También querés actualizar las ${tabsWithYear.length} pestaña(s) que tienen año propio a ${newYear}?\n\nAceptar: todas pasan a ${newYear}.\nCancelar: cada pestaña mantiene su año.`)) {
      tabsWithYear.forEach(t => t.tabYear = newYear);
    }
  }
  saveState(); applyBranding(); renderContent();
}

// ============ DATA ============
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'estudio_machado_backup_' + new Date().toISOString().slice(0,10) + '.json'; a.click();
}

async function exportHTML() {
  // ARREGLADO: antes esto tomaba el DOM ya dibujado y hacía un reemplazo que no
  // cambiaba nada, así que el archivo bajaba SIN los datos. Ahora:
  //  1) traemos el HTML original de la página (no el DOM mutado),
  //  2) le incrustamos el estado actual como un bloque JSON,
  //  3) lo marcamos como copia: al abrirlo NO se conecta a Firebase, así una copia
  //     vieja nunca puede pisar los datos en uso.
  toast('⏳ Preparando archivo…');
  let html = '';
  try {
    const resp = await fetch(location.href.split('#')[0] + (location.href.includes('?') ? '&' : '?') + '_wm=' + Date.now(), { cache: 'no-store' });
    if (resp.ok) html = await resp.text();
  } catch (e) { console.warn('fetch fuente', e); }
  if (!html || html.indexOf('wm_app_v2') === -1) {
    html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML; // respaldo
  }

  // OJO: los textos de abajo se arman por pedazos a propósito. Si el código
  // contuviera la etiqueta escrita entera, la limpieza de más abajo se encontraría
  // a sí misma y borraría medio archivo al exportar.
  const S_OPEN  = '<scr' + 'ipt id="wm-snapshot" type="application/json">';
  const S_CLOSE = '<\/scr' + 'ipt>';
  const S_RE    = new RegExp('<scr' + 'ipt id="wm-snapshot"[\\s\\S]*?<\\/scr' + 'ipt>\\s*', 'g');

  // Sacamos cualquier copia incrustada previa para no encadenar respaldos.
  html = html.replace(S_RE, '');

  const payload = JSON.stringify({ savedAt: Date.now(), by: (function(){ try { const u = currentUser(); return (u && u.name) || ''; } catch(e){ return ''; } })(), state: state });
  // Escapamos las barras de cierre para que el JSON no corte la etiqueta.
  const safe = payload.replace(/<\//g, '<\\/');
  const tag = S_OPEN + safe + S_CLOSE + '\n';

  if (html.indexOf('</head>') !== -1) html = html.replace('</head>', tag + '</head>');
  else html = tag + html;

  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'W_Machado_Estudio_Contable_' + new Date().toISOString().slice(0,10) + '.html';
  document.body.appendChild(a);
  a.click();
  setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 200);
  toast('✅ HTML descargado con los datos incluidos');
}

function importData(e) {
  // Sesión 4: solo admin
  if (!requireRole('admin', 'importar datos')) { e.target.value = ''; return; }
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try { state = JSON.parse(ev.target.result); ensureUsersAsObjects(); saveState(); applyBranding(); renderTabs(); renderContent(); toast('Datos importados'); }
    catch(err) { alert('Error al importar el archivo.'); }
  };
  reader.readAsText(file);
}

function resetAll() {
  // Sesión 4: solo admin
  if (!requireRole('admin', 'resetear todo')) return;
  if (!confirm('¿Resetear TODO? Se perderán todas las modificaciones y se volverá a los datos iniciales de la planilla.')) return;
  if (!confirm('Confirmá una segunda vez: esto borra todos los cambios.')) return;
  state = buildInitState(); saveState(); applyBranding(); renderTabs(); renderContent();
}

// ============ HELPERS ============
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  // Sesión 6: si cerramos el modal de edición de celda sin guardar, limpiar presencia
  if (id === 'modal-cell' && typeof clearEditingRowPresence === 'function') clearEditingRowPresence();
}

function toast(msg) {
  const el = document.getElementById('tooltip-msg');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2200);
}

// ============ SESIÓN 5: PAPELERA, PRIVACIDAD Y BLOQUEOS ============
// Constante TRASH_RETENTION_DAYS definida al inicio del script (junto a las de Sesión 4)

// Garantiza que state.trash exista y purga items vencidos.
function ensureTrashAndPurge() {
  if (!state.trash) state.trash = [];
  const now = Date.now();
  const cutoff = now - (TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const before = state.trash.length;
  state.trash = state.trash.filter(item => (item.deletedAt || now) >= cutoff);
  return before !== state.trash.length;
}

function genTrashId() { return 'trash_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

// Mover un objeto a la papelera. type: 'tab'|'row'|'column'|'block'|'ctable_row'
// payload: lo que necesitemos para restaurar
function moveToTrash(type, payload, description) {
  if (!state.trash) state.trash = [];
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  state.trash.push({
    id: genTrashId(),
    type,
    description: description || type,
    payload: JSON.parse(JSON.stringify(payload)), // deep copy para evitar refs vivas
    deletedAt: Date.now(),
    deletedBy: me ? me.name : 'sistema'
  });
}

// Cuántos días le quedan a un item en la papelera
function trashDaysLeft(item) {
  const elapsed = (Date.now() - (item.deletedAt || Date.now())) / (24 * 60 * 60 * 1000);
  return Math.max(0, Math.ceil(TRASH_RETENTION_DAYS - elapsed));
}

// ============ BLOQUEO DE FILAS ============
function toggleRowLock(tabId, rowIdx) {
  if (!requireRole('editor', 'bloquear filas')) return;
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab || !tab.rows || !tab.rows[rowIdx]) return;
  tab.rows[rowIdx].locked = !tab.rows[rowIdx].locked;
  logAudit(tab.rows[rowIdx].locked ? 'lock' : 'unlock', 'row',
    (tab.rows[rowIdx].locked ? 'Bloqueó' : 'Desbloqueó') + ' la fila "' + tab.rows[rowIdx].name + '" en ' + tab.name,
    null, null, tab.id);
  saveState();
  renderContent();
  toast(tab.rows[rowIdx].locked ? '🔒 Fila bloqueada' : '🔓 Fila desbloqueada');
}

// Verificar si la fila está bloqueada antes de permitir edición
function isRowLocked(tab, rowIdx) {
  return !!(tab && tab.rows && tab.rows[rowIdx] && tab.rows[rowIdx].locked);
}

// ============ PAPELERA: UI ============
function openTrashView() {
  ensureTrashAndPurge();
  const me = currentUser();
  const items = (state.trash || []).slice().sort((a,b) => b.deletedAt - a.deletedAt);
  const el = document.getElementById('trash-list');
  if (!items.length) {
    el.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--c-text-muted);font-style:italic;">La papelera está vacía.</div>';
  } else {
    el.innerHTML = items.map(item => {
      const daysLeft = trashDaysLeft(item);
      const date = new Date(item.deletedAt).toLocaleString('es-UY', { dateStyle:'short', timeStyle:'short' });
      const typeLabels = { tab:'📑 Pestaña', row:'🧾 Fila', column:'📊 Columna', block:'🧱 Bloque', ctable_row:'🧾 Fila' };
      return `
      <div class="trash-item">
        <div class="trash-item-info">
          <div class="trash-item-title">${typeLabels[item.type]||item.type}: ${bbEscape(item.description)}</div>
          <div class="trash-item-meta">
            Eliminado por <strong>${bbEscape(item.deletedBy||'?')}</strong> · ${date} ·
            <span class="trash-days-left${daysLeft<=3?' urgent':''}">${daysLeft} día${daysLeft===1?'':'s'} restantes</span>
          </div>
        </div>
        <div class="trash-item-actions">
          <button class="btn btn-outline btn-sm" onclick="restoreTrashItem('${item.id}')" title="Restaurar">↩ Restaurar</button>
          ${me && me.role === 'admin' ? `<button class="btn btn-outline btn-sm" onclick="purgeTrashItem('${item.id}')" title="Eliminar definitivamente" style="color:var(--c-red);border-color:var(--c-red);">✕</button>` : ''}
        </div>
      </div>`;
    }).join('');
  }
  // Botón vaciar (admin only)
  const emptyBtn = document.getElementById('trash-empty-btn');
  if (emptyBtn) emptyBtn.style.display = (me && me.role === 'admin') ? '' : 'none';

  document.getElementById('trash-count-label').textContent = items.length + ' elemento' + (items.length===1?'':'s');
  document.getElementById('modal-trash').classList.add('open');
}

function restoreTrashItem(itemId) {
  const idx = (state.trash || []).findIndex(t => t.id === itemId);
  if (idx < 0) return;
  const item = state.trash[idx];
  let ok = false;
  try {
    switch(item.type) {
      case 'tab': {
        // Restaurar la pestaña: la metemos antes de settings si existe
        const settingsIdx = state.tabs.findIndex(t => t.id === 'settings');
        const restored = item.payload;
        if (state.tabs.some(t => t.id === restored.id)) {
          // Si ya hay una con el mismo id, le cambiamos el id
          restored.id = 'tab_' + Date.now();
        }
        if (settingsIdx >= 0) state.tabs.splice(settingsIdx, 0, restored);
        else state.tabs.push(restored);
        ok = true;
        break;
      }
      case 'row': {
        const tab = state.tabs.find(t => t.id === item.payload.tabId);
        if (!tab) { toast('⚠ La pestaña ya no existe — restaurá la pestaña primero'); return; }
        if (!tab.rows) tab.rows = [];
        const targetIdx = Math.min(item.payload.idx, tab.rows.length);
        tab.rows.splice(targetIdx, 0, item.payload.row);
        ok = true;
        break;
      }
      case 'column': {
        const tab = state.tabs.find(t => t.id === item.payload.tabId);
        if (!tab) { toast('⚠ La pestaña ya no existe'); return; }
        if (!tab.columns) tab.columns = [];
        const targetIdx = Math.min(item.payload.idx, tab.columns.length);
        tab.columns.splice(targetIdx, 0, item.payload.column);
        // Re-insertar celdas de esa columna
        const cellsBackup = item.payload.cells || {};
        (tab.rows || []).forEach((r, ri) => {
          // Desplazar índices >= targetIdx +1
          const shift = (cells) => {
            const out = {};
            Object.keys(cells || {}).forEach(k => {
              const ki = parseInt(k);
              if (ki < targetIdx) out[ki] = cells[k];
              else out[ki+1] = cells[k];
            });
            return out;
          };
          if (r.cells) r.cells = shift(r.cells);
          if (r.cellsByYear) {
            Object.keys(r.cellsByYear).forEach(y => { r.cellsByYear[y] = shift(r.cellsByYear[y]); });
          }
          if (cellsBackup[ri] !== undefined) {
            if (!r.cells) r.cells = {};
            r.cells[targetIdx] = cellsBackup[ri];
          }
        });
        ok = true;
        break;
      }
      case 'block': {
        const tab = state.tabs.find(t => t.id === item.payload.tabId);
        if (!tab || tab.type !== 'builder') { toast('⚠ La pestaña builder ya no existe'); return; }
        if (!tab.blocks) tab.blocks = [];
        const targetIdx = Math.min(item.payload.idx, tab.blocks.length);
        tab.blocks.splice(targetIdx, 0, item.payload.block);
        ok = true;
        break;
      }
      case 'ctable_row': {
        const tab = state.tabs.find(t => t.id === item.payload.tabId);
        if (!tab || tab.type !== 'builder') { toast('⚠ La pestaña builder ya no existe'); return; }
        const blk = (tab.blocks || []).find(b => b.id === item.payload.blockId);
        if (!blk) { toast('⚠ La tabla ya no existe'); return; }
        if (!blk.rows) blk.rows = [];
        blk.rows.push(item.payload.row);
        ok = true;
        break;
      }
    }
  } catch(e) {
    console.error(e);
    toast('✗ Error al restaurar: ' + e.message);
    return;
  }
  if (ok) {
    state.trash.splice(idx, 1);
    saveState();
    renderTabs();
    renderContent();
    openTrashView();
    toast('↩ Restaurado');
  }
}

function purgeTrashItem(itemId) {
  if (!requireRole('admin', 'eliminar definitivamente')) return;
  if (!confirm('¿Eliminar definitivamente este elemento? No se puede deshacer.')) return;
  state.trash = (state.trash || []).filter(t => t.id !== itemId);
  saveState();
  openTrashView();
  toast('Elemento eliminado definitivamente');
}

function emptyTrash() {
  if (!requireRole('admin', 'vaciar la papelera')) return;
  const count = (state.trash || []).length;
  if (!count) { toast('La papelera ya está vacía'); return; }
  if (!confirm('¿Vaciar la papelera? Se eliminarán definitivamente ' + count + ' elemento' + (count===1?'':'s') + '. No se puede deshacer.')) return;
  if (!confirm('Confirmá una segunda vez: estos datos NO se pueden recuperar después.')) return;
  state.trash = [];
  saveState();
  openTrashView();
  toast('Papelera vaciada');
}

// ============ SESIÓN 6: AUDIT LOG, PRESENCIA, HEADER REORGANIZABLE ============

// ----- Audit Log -----
// state.auditLog = [{id, action, target, before, after, by, byDisplayName, at, tabId}]
// AUDIT_MAX_ENTRIES está definido como const al inicio del script.

function ensureAuditLog() {
  if (!Array.isArray(state.auditLog)) { state.auditLog = []; return true; }
  return false;
}

function genAuditId() { return 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2,6); }

// Registra una acción en el audit log. No falla si currentUser() no está definido.
// action: 'create' | 'update' | 'delete' | 'restore' | 'rename' | 'move' | 'lock' | 'unlock' | 'privacy'
// targetType: 'tab' | 'row' | 'column' | 'cell' | 'block' | 'ctable_row' | 'user' | 'event' | 'settings'
// summary: texto corto legible de qué pasó
// before/after: snapshots opcionales
function logAudit(action, targetType, summary, before, after, tabId) {
  ensureAuditLog();
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  state.auditLog.push({
    id: genAuditId(),
    action,
    targetType,
    summary: String(summary || ''),
    before: before === undefined ? null : before,
    after: after === undefined ? null : after,
    by: me ? me.name : 'sistema',
    byDisplayName: me ? (me.displayName || me.name) : 'Sistema',
    at: Date.now(),
    tabId: tabId || null
  });
  // Rotación: si pasamos AUDIT_MAX_ENTRIES, descartamos los más viejos
  if (state.auditLog.length > AUDIT_MAX_ENTRIES) {
    state.auditLog.splice(0, state.auditLog.length - AUDIT_MAX_ENTRIES);
  }
  // Nota: NO llamamos saveState() aquí porque eso lo hace la función que nos invoca.
  // Si quisiéramos forzar guardar, el caller lo hace; eso evita doble-sync.
}

// Etiquetas legibles
const AUDIT_ACTION_LABELS = {
  create:'➕ Creó', update:'✎ Modificó', delete:'🗑 Eliminó', restore:'↩ Restauró',
  rename:'✏ Renombró', move:'↔ Movió', lock:'🔒 Bloqueó', unlock:'🔓 Desbloqueó',
  privacy:'🔐 Cambió privacidad', login:'🔓 Inició sesión', logout:'⏻ Cerró sesión',
  password:'🔑 Cambió contraseña'
};
const AUDIT_TARGET_LABELS = {
  tab:'Pestaña', row:'Fila', column:'Columna', cell:'Celda', block:'Bloque',
  ctable_row:'Fila de tabla', user:'Usuaria', event:'Evento', settings:'Configuración',
  password:'Contraseña', session:'Sesión'
};

// ----- Modal de Audit Log -----
let _auditFilter = { user:'', action:'', target:'', tabId:'', from:'', to:'' };

function openAuditLogView() {
  ensureAuditLog();
  // Reset filtros
  _auditFilter = { user:'', action:'', target:'', tabId:'', from:'', to:'' };
  populateAuditFilters();
  renderAuditLogList();
  document.getElementById('modal-audit').classList.add('open');
}

function populateAuditFilters() {
  // Llenar selects con valores únicos del log
  const users = [...new Set((state.auditLog || []).map(e => e.by))].filter(Boolean).sort();
  const tabs = (state.tabs || []).map(t => ({ id: t.id, name: t.name }));
  document.getElementById('audit-filter-user').innerHTML = '<option value="">Todas las usuarias</option>' +
    users.map(u => `<option value="${bbEscape(u)}">${bbEscape(u)}</option>`).join('');
  document.getElementById('audit-filter-action').innerHTML = '<option value="">Todas las acciones</option>' +
    Object.keys(AUDIT_ACTION_LABELS).map(a => `<option value="${a}">${AUDIT_ACTION_LABELS[a]}</option>`).join('');
  document.getElementById('audit-filter-target').innerHTML = '<option value="">Todos los objetos</option>' +
    Object.keys(AUDIT_TARGET_LABELS).map(t => `<option value="${t}">${AUDIT_TARGET_LABELS[t]}</option>`).join('');
  document.getElementById('audit-filter-tab').innerHTML = '<option value="">Todas las pestañas</option>' +
    tabs.map(t => `<option value="${bbEscape(t.id)}">${bbEscape(t.name)}</option>`).join('');
  document.getElementById('audit-filter-from').value = '';
  document.getElementById('audit-filter-to').value = '';
}

function applyAuditFilters() {
  _auditFilter.user = document.getElementById('audit-filter-user').value;
  _auditFilter.action = document.getElementById('audit-filter-action').value;
  _auditFilter.target = document.getElementById('audit-filter-target').value;
  _auditFilter.tabId = document.getElementById('audit-filter-tab').value;
  _auditFilter.from = document.getElementById('audit-filter-from').value;
  _auditFilter.to = document.getElementById('audit-filter-to').value;
  renderAuditLogList();
}

function clearAuditFilters() {
  _auditFilter = { user:'', action:'', target:'', tabId:'', from:'', to:'' };
  document.getElementById('audit-filter-user').value = '';
  document.getElementById('audit-filter-action').value = '';
  document.getElementById('audit-filter-target').value = '';
  document.getElementById('audit-filter-tab').value = '';
  document.getElementById('audit-filter-from').value = '';
  document.getElementById('audit-filter-to').value = '';
  renderAuditLogList();
}

function renderAuditLogList() {
  const el = document.getElementById('audit-list');
  if (!el) return;
  const f = _auditFilter;
  const fromTs = f.from ? new Date(f.from + 'T00:00:00').getTime() : 0;
  const toTs   = f.to   ? new Date(f.to + 'T23:59:59').getTime() : Infinity;
  const filtered = (state.auditLog || []).filter(e => {
    if (f.user && e.by !== f.user) return false;
    if (f.action && e.action !== f.action) return false;
    if (f.target && e.targetType !== f.target) return false;
    if (f.tabId && e.tabId !== f.tabId) return false;
    if (e.at < fromTs || e.at > toTs) return false;
    return true;
  }).slice().reverse(); // más recientes primero

  document.getElementById('audit-count-label').textContent =
    filtered.length + ' de ' + (state.auditLog || []).length + ' registros';

  if (!filtered.length) {
    el.innerHTML = '<div style="text-align:center;padding:40px;color:var(--c-text-muted);font-style:italic;">Sin registros que coincidan con los filtros.</div>';
    return;
  }

  el.innerHTML = filtered.slice(0, 500).map(e => {
    const dt = new Date(e.at).toLocaleString('es-UY', { dateStyle:'short', timeStyle:'short' });
    const actLabel = AUDIT_ACTION_LABELS[e.action] || e.action;
    const tgtLabel = AUDIT_TARGET_LABELS[e.targetType] || e.targetType;
    const u = findUserByName ? findUserByName(e.by) : null;
    const avatar = u && u.photo
      ? `<span class="audit-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="audit-avatar" style="background:${userColor(u || e.by)};color:#fff;">${(e.byDisplayName || e.by || '?').charAt(0).toUpperCase()}</span>`;
    let beforeAfter = '';
    const hasB = e.before !== null && e.before !== undefined;
    const hasA = e.after !== null && e.after !== undefined;
    if (hasB || hasA) {
      const b = hasB ? JSON.stringify(e.before).slice(0, 80) : '';
      const a = hasA ? JSON.stringify(e.after).slice(0, 80)  : '';
      if (b || a) {
        beforeAfter = `<div class="audit-diff">${b?`<span class="diff-before"><strong>Antes:</strong> ${bbEscape(b)}</span>`:''}${a?`<span class="diff-after"><strong>Después:</strong> ${bbEscape(a)}</span>`:''}</div>`;
      }
    }
    return `<div class="audit-item">
      ${avatar}
      <div class="audit-body">
        <div class="audit-line">
          <strong>${bbEscape(e.byDisplayName || e.by)}</strong>
          <span class="audit-action">${actLabel}</span>
          <span class="audit-target">${tgtLabel}</span>
        </div>
        <div class="audit-summary">${bbEscape(e.summary)}</div>
        ${beforeAfter}
        <div class="audit-time">${dt}</div>
      </div>
    </div>`;
  }).join('');
  if (filtered.length > 500) {
    el.innerHTML += `<div style="text-align:center;padding:14px;color:var(--c-text-muted);font-size:11px;">Mostrando los 500 registros más recientes. Refiná los filtros para ver más antiguos.</div>`;
  }
}

// ============ HEADER REORGANIZABLE (Sesión 6) ============
// Paneles disponibles: 'presence' | 'audit' | 'notifications' | 'chat'
// Zonas: 'main' (visible expandido) | 'collapsed' (solo ícono) | 'hidden'
// Preferencia por usuaria, en userPrefs.headerLayout = { presence:'main', audit:'collapsed', notifications:'collapsed', chat:'collapsed' }

const HEADER_PANELS = [
  { key:'presence',     icon:'🟢', label:'Presencia',     title:'Quién está en línea' },
  { key:'audit',        icon:'🕒', label:'Historial',     title:'Audit log: ver historial de cambios' },
  { key:'notifications',icon:'🔔', label:'Notificaciones',title:'Notificaciones' },
  { key:'chat',         icon:'💬', label:'Chat',          title:'Chat interno' }
];

function getHeaderLayout() {
  if (!userPrefs.headerLayout) {
    userPrefs.headerLayout = { presence:'collapsed', audit:'collapsed', notifications:'collapsed', chat:'collapsed' };
  }
  // Asegurar que todos los paneles tengan un valor (por si se agregan nuevos)
  HEADER_PANELS.forEach(p => {
    if (!userPrefs.headerLayout[p.key]) userPrefs.headerLayout[p.key] = 'hidden';
  });
  // Si tenían notifications hidden por defecto viejo, hacerlo collapsed
  if (userPrefs.headerLayout.notifications === 'hidden' && !userPrefs._notifMigrated) {
    userPrefs.headerLayout.notifications = 'collapsed';
    userPrefs._notifMigrated = true;
  }
  return userPrefs.headerLayout;
}

function renderHeaderPanels() {
  const layout = getHeaderLayout();
  const container = document.getElementById('header-panels');
  if (!container) return;
  container.innerHTML = HEADER_PANELS.filter(p => layout[p.key] !== 'hidden').map(p => {
    const zone = layout[p.key]; // 'main' o 'collapsed'
    let onclick;
    if (p.key === 'audit') onclick = `openAuditLogView()`;
    else if (p.key === 'chat') onclick = `toggleChatPanel()`;
    else if (p.key === 'notifications') onclick = `toggleNotifPanel()`;
    else onclick = `togglePanelZone('${p.key}')`;
    if (zone === 'main' && p.key === 'presence') {
      return `<div class="header-panel header-panel-presence" data-panel="${p.key}" draggable="true">
        <span class="panel-handle">⠿</span>
        <span class="panel-icon" title="${p.title}">${p.icon}</span>
        <div id="presence-panel-body" class="presence-panel-body"></div>
        <button class="panel-collapse" onclick="togglePanelZone('${p.key}')" title="Colapsar">⊟</button>
      </div>`;
    }
    // Estado colapsado: solo ícono clickeable, con badge de no leídos para chat / notif
    let badge = '';
    if (p.key === 'chat') badge = `<span id="chat-unread-badge" class="chat-unread-badge" style="display:none;">0</span>`;
    if (p.key === 'notifications') badge = `<span id="notif-unread-badge" class="chat-unread-badge" style="display:none;">0</span>`;
    return `<div class="header-panel header-panel-${p.key} collapsed" data-panel="${p.key}" draggable="true">
      <span class="panel-handle">⠿</span>
      <button class="panel-btn" onclick="${onclick}" title="${p.title}">${p.icon}${badge}</button>
    </div>`;
  }).join('');
  // Render presencia si está en main
  if (layout.presence === 'main') renderPresence();
  // Drag handlers
  attachHeaderPanelDragHandlers();
  // Actualizar badges
  if (typeof updateChatUnreadCount === 'function') updateChatUnreadCount();
  if (typeof updateNotifBadge === 'function') updateNotifBadge();
}

function togglePanelZone(panelKey) {
  const layout = getHeaderLayout();
  if (panelKey === 'audit') { openAuditLogView(); return; }
  if (panelKey === 'chat')  { toggleChatPanel(); return; }
  if (panelKey === 'notifications') { toggleNotifPanel(); return; }
  if (panelKey === 'presence') {
    // alterna main / collapsed
    layout.presence = (layout.presence === 'main') ? 'collapsed' : 'main';
    saveUserPrefs();
    renderHeaderPanels();
    return;
  }
}

function openHeaderLayoutSettings() {
  const layout = getHeaderLayout();
  const el = document.getElementById('header-layout-panels-list');
  if (!el) return;
  el.innerHTML = HEADER_PANELS.map(p => `
    <div class="hl-panel-item">
      <div class="hl-panel-info">
        <span class="hl-panel-icon">${p.icon}</span>
        <strong>${p.label}</strong>
        <small style="color:var(--c-text-muted);">${p.title}</small>
      </div>
      <select onchange="setPanelZone('${p.key}', this.value)" style="padding:6px 8px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;font-size:12px;">
        <option value="main"${layout[p.key]==='main'?' selected':''}>📍 Anclado expandido</option>
        <option value="collapsed"${layout[p.key]==='collapsed'?' selected':''}>📌 Colapsado (solo ícono)</option>
        <option value="hidden"${layout[p.key]==='hidden'?' selected':''}>🚫 Oculto</option>
      </select>
    </div>
  `).join('');
  document.getElementById('modal-header-layout').classList.add('open');
}

function setPanelZone(panelKey, zone) {
  const layout = getHeaderLayout();
  layout[panelKey] = zone;
  saveUserPrefs();
  renderHeaderPanels();
}

function attachHeaderPanelDragHandlers() {
  const container = document.getElementById('header-panels');
  if (!container) return;
  let dragged = null;
  container.querySelectorAll('.header-panel').forEach(el => {
    el.addEventListener('dragstart', e => {
      dragged = el;
      el.classList.add('dragging');
      try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', el.dataset.panel); } catch(_) {}
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      container.querySelectorAll('.header-panel.drag-over').forEach(x => x.classList.remove('drag-over'));
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      if (dragged && dragged !== el) el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      if (!dragged || dragged === el) return;
      // Reorder en HEADER_PANELS... pero como su orden está fijo, no movemos nada del orden.
      // El drag entre paneles solo intercambia su posición visual (no su estado).
      // Para mantenerlo simple, hacemos un intercambio de orden temporal vía DOM.
      const parent = el.parentNode;
      const draggedIdx = Array.from(parent.children).indexOf(dragged);
      const targetIdx = Array.from(parent.children).indexOf(el);
      if (draggedIdx < targetIdx) parent.insertBefore(dragged, el.nextSibling);
      else parent.insertBefore(dragged, el);
      // Persistir el orden en userPrefs
      const newOrder = Array.from(parent.querySelectorAll('.header-panel')).map(x => x.dataset.panel);
      userPrefs.headerPanelOrder = newOrder;
      saveUserPrefs();
    });
  });
}

// ============ SESIÓN 8: NOTIFICACIONES + MI DASHBOARD ============

// Crear una tarea automática en el Mi Dashboard de OTRA usuaria
// text: texto de la tarea
// meta: { sourceTab, sourceRow, sourceCol, origin } - info para mostrar de dónde vino
function addTaskToUser(userName, text, meta) {
  if (!userName || !text) return null;
  if (!state.userDashboards) state.userDashboards = {};
  if (!state.userDashboards[userName]) {
    state.userDashboards[userName] = {
      stickyNotes: [], tasks: [], kanban: { todo:[], doing:[], done:[] }, shortcuts: [],
      sections: { stickyNotes:true, tasks:true, kanban:true, agenda:true, shortcuts:true },
      sectionOrder: ['stickyNotes','tasks','kanban','agenda','shortcuts']
    };
  }
  const d = state.userDashboards[userName];
  if (!Array.isArray(d.tasks)) d.tasks = [];
  const me = currentUser();
  const task = {
    id: 't_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
    text: text,
    done: false,
    ts: Date.now(),
    auto: true,
    createdBy: me ? me.name : null,
    sourceMeta: meta || null
  };
  d.tasks.unshift(task);
  saveState();
  return task;
}
// ============ MI DASHBOARD (Sesión 8) ============
// Cada usuaria tiene un dashboard personal en state.userDashboards[userName]
// Aunque está en state (sync), solo SU DUEÑA lo ve. No es privado-de-pestaña: es directamente invisible para las demás.

function ensureUserDashboards() {
  if (!state.userDashboards) { state.userDashboards = {}; return true; }
  return false;
}

function getMyDashboard() {
  ensureUserDashboards();
  const me = currentUser();
  if (!me) return null;
  if (!state.userDashboards[me.name]) {
    state.userDashboards[me.name] = {
      stickyNotes: [],   // {id, html, color, ts, size, pinned, groupId, clientId, sharedWith, scope}
      tasks: [],         // {id, text, done, ts}
      kanban: { todo: [], doing: [], done: [] },
      shortcuts: [],
      sections: { stickyNotes: true, tasks: true, kanban: true, agenda: true, shortcuts: true },
      sectionOrder: ['stickyNotes', 'tasks', 'kanban', 'agenda', 'shortcuts'],
      // NUEVO: features opcionales de notas (cada usuaria activa lo que quiere)
      stickyFeatures: {
        size: false,        // tamaños S/M/L/XL
        reorder: false,     // drag & drop entre notas
        checkboxes: true,   // listas tachables (suele ser útil para todas)
        search: false,      // barra de búsqueda
        linkClient: false,  // vincular a cliente
        share: false,       // compartir con compañera
        groups: false,      // grupos / categorías
        autoFit: false      // tamaño se ajusta al contenido
      },
      stickyGroups: [],     // [{id, name, color, ts}]
      stickyOrder: [],      // ids en orden personalizado
      stickyStudioCollapsed: true, // sección Notas del Estudio colapsada por defecto
      stickySearchTerm: ''  // búsqueda en vivo (no se persiste a Firebase, solo runtime)
    };
  }
  const d = state.userDashboards[me.name];
  if (!Array.isArray(d.stickyNotes)) d.stickyNotes = [];
  if (!Array.isArray(d.tasks)) d.tasks = [];
  if (!d.kanban) d.kanban = { todo:[], doing:[], done:[] };
  ['todo','doing','done'].forEach(c => { if (!Array.isArray(d.kanban[c])) d.kanban[c] = []; });
  if (!Array.isArray(d.shortcuts)) d.shortcuts = [];
  if (!d.sections) d.sections = { stickyNotes:true, tasks:true, kanban:true, agenda:true, shortcuts:true };
  const DEFAULT_ORDER = ['stickyNotes', 'tasks', 'kanban', 'agenda', 'shortcuts'];
  if (!Array.isArray(d.sectionOrder)) d.sectionOrder = DEFAULT_ORDER.slice();
  DEFAULT_ORDER.forEach(k => { if (!d.sectionOrder.includes(k)) d.sectionOrder.push(k); });
  d.sectionOrder = d.sectionOrder.filter(k => DEFAULT_ORDER.includes(k));
  // Garantizar campos nuevos de stickies
  if (!d.stickyFeatures) d.stickyFeatures = { size:false, reorder:false, checkboxes:true, search:false, linkClient:false, share:false, groups:false, autoFit:false };
  ['size','reorder','checkboxes','search','linkClient','share','groups','autoFit'].forEach(k => {
    if (typeof d.stickyFeatures[k] !== 'boolean') d.stickyFeatures[k] = (k === 'checkboxes');
  });
  if (!Array.isArray(d.stickyGroups)) d.stickyGroups = [];
  if (!Array.isArray(d.stickyOrder)) d.stickyOrder = [];
  if (typeof d.stickyStudioCollapsed !== 'boolean') d.stickyStudioCollapsed = true;
  // Migrar notas viejas a tener size por defecto
  d.stickyNotes.forEach(n => {
    if (!n.size) n.size = 'M';
    if (!Array.isArray(n.sharedWith)) n.sharedWith = [];
  });
  return d;
}

// ============ NOTAS DEL ESTUDIO (compartidas) ============
function getStudioStickyNotes() {
  if (!Array.isArray(state.studioStickyNotes)) state.studioStickyNotes = [];
  state.studioStickyNotes.forEach(n => {
    if (!n.size) n.size = 'M';
  });
  return state.studioStickyNotes;
}

// Devuelve todas las notas visibles para mí (mis personales + las que me comparten + estudio si activado)
// Las "compartidas conmigo" están en otros dashboards con sharedWith incluyéndome
function getSharedToMe() {
  const me = currentUser();
  if (!me) return [];
  const result = [];
  if (!state.userDashboards) return result;
  Object.keys(state.userDashboards).forEach(userName => {
    if (userName === me.name) return;
    const otherDash = state.userDashboards[userName];
    if (!otherDash || !Array.isArray(otherDash.stickyNotes)) return;
    otherDash.stickyNotes.forEach(n => {
      if (Array.isArray(n.sharedWith) && n.sharedWith.includes(me.name)) {
        result.push({ ...n, _sharedBy: userName, _readonly: true });
      }
    });
  });
  return result;
}

// ----- Render principal -----
function renderMyDashboard(tab) {
  const me = currentUser();
  if (!me) return '<div>Inicia sesión para ver tu dashboard.</div>';
  const d = getMyDashboard();
  if (!d) return '<div>No se pudo cargar tu dashboard.</div>';

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">📌 Mi Dashboard <span style="font-size:14px;color:var(--c-text-muted);font-weight:400;text-transform:none;letter-spacing:normal;">— ${bbEscape(me.displayName || me.name)}</span></div>
        <div style="font-size:12px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;">Tu espacio personal · solo vos lo ves</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="openMyDashSettings()" title="Configurar secciones">⚙ Secciones</button>
      </div>
    </div>
    <div style="font-size:11px;color:var(--c-text-muted);margin-bottom:10px;padding:6px 10px;background:var(--c-bg-alt);border-radius:3px;display:inline-block;">
      💡 Arrastrá las secciones desde el ícono <strong>⋮⋮</strong> para reordenarlas a tu gusto
    </div>
  `;

  // Render por orden personalizable
  d.sectionOrder.forEach(key => {
    if (!d.sections[key]) return; // sección oculta
    const block = renderMyDashSection(key, d);
    if (block) html += block;
  });

  return html;
}

// Cada sección de Mi Dashboard como bloque drag-and-droppable
function renderMyDashSection(key, d) {
  const dragAttrs = `draggable="true"
    ondragstart="onMyDashSectionDragStart(event,'${key}')"
    ondragover="onMyDashSectionDragOver(event,'${key}')"
    ondragleave="onMyDashSectionDragLeave(event,'${key}')"
    ondrop="onMyDashSectionDrop(event,'${key}')"
    ondragend="onMyDashSectionDragEnd(event)"`;
  const dragHandle = `<span class="mydash-section-drag" title="Arrastrá para reordenar">⋮⋮</span>`;

  if (key === 'stickyNotes') {
    const F = d.stickyFeatures;
    // Toolbar de la sección con todos los controles según features activas
    let topBar = `<div class="stickies-toolbar">`;
    if (F.search) {
      topBar += `<div class="stickies-search">
        <input type="text" id="stickies-search-input" placeholder="🔍 Buscar en mis notas..." value="${bbEscape(d.stickySearchTerm || '')}" oninput="onStickiesSearch(this.value)">
        ${d.stickySearchTerm ? `<button class="stickies-search-clear" onclick="onStickiesSearch('')" title="Limpiar">×</button>` : ''}
      </div>`;
    }
    if (F.groups) {
      const groupChips = (d.stickyGroups || []).map(g => {
        const isActive = d._stickyFilterGroup === g.id;
        return `<button class="sticky-group-chip${isActive?' active':''}" style="border-left:3px solid ${g.color||'#888'};" onclick="filterStickiesByGroup('${g.id}')">${bbEscape(g.name)}</button>`;
      }).join('');
      const allActive = !d._stickyFilterGroup;
      topBar += `<div class="sticky-groups-bar">
        <button class="sticky-group-chip${allActive?' active':''}" onclick="filterStickiesByGroup('')">Todos</button>
        ${groupChips}
        <button class="sticky-group-add" onclick="openStickyGroupModal()" title="Crear grupo">+ Grupo</button>
      </div>`;
    }
    topBar += `<button class="btn btn-outline btn-sm" onclick="openStickyFeaturesModal()" title="Activar/desactivar funciones de las notas" style="margin-left:auto;font-size:11px;">⚙ Opciones</button>`;
    topBar += `<button class="btn btn-gold btn-sm" onclick="addMyDashStickyNote()">+ Nota</button>`;
    topBar += `</div>`;

    // Filtrar notas según búsqueda y grupo activo
    let myNotes = d.stickyNotes.slice();
    // Aplicar orden personalizado si reorder activo
    if (F.reorder && Array.isArray(d.stickyOrder) && d.stickyOrder.length) {
      myNotes.sort((a, b) => {
        const ai = d.stickyOrder.indexOf(a.id);
        const bi = d.stickyOrder.indexOf(b.id);
        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
    }
    if (F.groups && d._stickyFilterGroup) {
      myNotes = myNotes.filter(n => n.groupId === d._stickyFilterGroup);
    }
    if (F.search && d.stickySearchTerm) {
      const term = d.stickySearchTerm.toLowerCase();
      myNotes = myNotes.filter(n => {
        const text = (n.html || '').replace(/<[^>]+>/g, ' ').toLowerCase();
        return text.includes(term);
      });
    }

    // Notas compartidas conmigo por otra usuaria (read-only)
    const sharedToMe = F.share ? getSharedToMe() : [];

    // Notas del estudio (compartidas con todo el mundo)
    const studioNotes = getStudioStickyNotes();

    let notesHTML = myNotes.map(n => renderStickyNote(n, d)).join('');
    if (F.share && sharedToMe.length) {
      notesHTML += sharedToMe.map(n => renderStickyNote(n, d)).join('');
    }

    let html = `<div class="mydash-section" data-section="stickyNotes" ${dragAttrs}>
      <div class="mydash-section-head">
        <span class="mydash-section-title">${dragHandle}📝 Notas adhesivas</span>
      </div>
      ${topBar}
      <div class="mydash-stickies" id="mydash-stickies"
           ${F.reorder ? `ondragover="onStickyContainerDragOver(event)"` : ''}>
        ${notesHTML}
        ${!myNotes.length && !sharedToMe.length ? `<div class="mydash-empty">${d.stickySearchTerm ? 'Ninguna nota coincide con la búsqueda.' : 'Sin notas todavía. Hacé clic en "+ Nota" para agregar una.'}</div>` : ''}
      </div>`;

    // Sección "Notas del estudio" (compartidas con TODO el estudio) - desplegable
    const studioOpen = !d.stickyStudioCollapsed;
    html += `<div class="studio-stickies-wrap">
      <div class="studio-stickies-head" onclick="toggleStudioStickies()">
        <span class="studio-toggle-arrow">${studioOpen ? '▼' : '▶'}</span>
        <strong>📋 Notas del estudio</strong>
        <span class="studio-stickies-count">${studioNotes.length}</span>
        <span style="margin-left:auto;font-size:11px;color:var(--c-text-muted);">${studioOpen ? '' : 'Clic para ver'}</span>
      </div>
      ${studioOpen ? `
        <div class="studio-stickies-body">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;font-size:11px;color:var(--c-text-muted);">
            <span>👥 Estas notas las ven todas las usuarias del estudio</span>
            <button class="btn btn-gold btn-sm" onclick="addStudioStickyNote()" style="margin-left:auto;">+ Nota del estudio</button>
          </div>
          <div class="mydash-stickies">
            ${studioNotes.map(n => renderStickyNote(n, d, true)).join('')}
            ${!studioNotes.length ? '<div class="mydash-empty" style="padding:14px;">Sin notas del estudio todavía.</div>' : ''}
          </div>
        </div>
      ` : ''}
    </div>`;

    html += `</div>`;
    return html;
  }
  if (key === 'tasks') {
    const all = Array.isArray(d.tasks) ? d.tasks : [];
    const filter = getTaskFilter();
    const nPend = all.filter(t => !t.archived && !t.done).length;
    const nDone = all.filter(t => !t.archived && t.done).length;
    const nArch = all.filter(t => t.archived).length;

    let list;
    if (filter === 'pendientes')      list = all.filter(t => !t.archived && !t.done);
    else if (filter === 'hechas')     list = all.filter(t => !t.archived && t.done);
    else if (filter === 'archivadas') list = all.filter(t => t.archived);
    else                              list = all.filter(t => !t.archived);

    const chip = (k, label, count) =>
      `<button class="mydash-task-chip${filter === k ? ' active' : ''}" onclick="setTaskFilter('${k}')">${label}<span class="mydash-task-chip-n">${count}</span></button>`;

    const emptyMsg = {
      pendientes: '🎉 No te quedan tareas pendientes.',
      hechas:     'Todavía no marcaste ninguna tarea como realizada.',
      archivadas: 'No hay tareas archivadas.',
      todas:      'Sin tareas. Escribí una arriba y dale Enter.'
    }[filter];

    const rows = list.map(t => {
      // Modo edición inline
      if (_editingTaskId === t.id) {
        return `<div class="mydash-task">
          <input type="checkbox" ${t.done?'checked':''} disabled>
          <input type="text" class="mydash-task-edit" id="mydash-task-edit-input" value="${bbEscape(t.text)}"
                 onkeydown="onMyDashTaskEditKey(event,'${t.id}')"
                 onblur="saveMyDashTaskEdit('${t.id}', this.value)">
        </div>`;
      }
      let badges = '';
      if (t.assignedTo) badges += `<span class="mydash-task-badge" title="Se la asignaste a ${bbEscape(t.assignedTo)}">→ ${bbEscape(t.assignedTo)}</span>`;
      if (t.assignedBy) badges += `<span class="mydash-task-badge in" title="Te la asignó ${bbEscape(t.assignedBy)}">de ${bbEscape(t.assignedBy)}</span>`;
      if (t.archived)   badges += `<span class="mydash-task-badge arch">archivada</span>`;

      const acts = t.archived
        ? `<button class="mydash-task-act" onclick="toggleArchiveMyDashTask('${t.id}')" title="Desarchivar">↩️</button>
           <button class="mydash-task-act" onclick="removeMyDashTask('${t.id}')" title="Eliminar definitivamente" style="color:var(--c-red);">×</button>`
        : `<button class="mydash-task-act" onclick="editMyDashTask('${t.id}')" title="Modificar">✏️</button>
           <button class="mydash-task-act" onclick="openTaskAssign('${t.id}')" title="Asignar a otra usuaria">👤</button>
           <button class="mydash-task-act" onclick="toggleArchiveMyDashTask('${t.id}')" title="Archivar">📥</button>
           <button class="mydash-task-act" onclick="removeMyDashTask('${t.id}')" title="Eliminar" style="color:var(--c-red);">×</button>`;

      return `<div class="mydash-task ${t.done?'done':''}${t.archived?' archived':''}">
        <input type="checkbox" ${t.done?'checked':''} onchange="toggleMyDashTask('${t.id}')">
        <span class="mydash-task-text" ondblclick="editMyDashTask('${t.id}')" title="Doble clic para modificar">${bbEscape(t.text)}</span>
        ${badges}
        <div class="mydash-task-acts">${acts}</div>
      </div>`;
    }).join('');

    return `<div class="mydash-section" data-section="tasks" ${dragAttrs}>
      <div class="mydash-section-head">
        <span class="mydash-section-title">${dragHandle}✅ Mis tareas</span>
        <div style="display:flex;gap:6px;">
          <input type="text" id="mydash-task-input" placeholder="Nueva tarea..." onkeydown="if(event.key==='Enter')addMyDashTask()" style="padding:5px 8px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;font-size:12px;width:240px;">
          <button class="btn btn-gold btn-sm" onclick="addMyDashTask()">Agregar</button>
        </div>
      </div>
      <div class="mydash-task-filters">
        ${chip('pendientes', 'Pendientes', nPend)}
        ${chip('hechas', 'Realizadas', nDone)}
        ${chip('todas', 'Todas', nPend + nDone)}
        ${chip('archivadas', 'Archivadas', nArch)}
      </div>
      <div class="mydash-tasks">
        ${rows}
        ${!list.length ? `<div class="mydash-empty">${emptyMsg}</div>` : ''}
      </div>
    </div>`;
  }
  if (key === 'kanban') {
    const cols = [
      { key:'todo',  title:'⏳ Por hacer',  color:'var(--c-pending)' },
      { key:'doing', title:'⚡ Haciendo',    color:'var(--c-blue)' },
      { key:'done',  title:'✅ Hecho',       color:'var(--c-green)' }
    ];
    return `<div class="mydash-section" data-section="kanban" ${dragAttrs}>
      <div class="mydash-section-head">
        <span class="mydash-section-title">${dragHandle}📋 Mi Kanban</span>
      </div>
      <div class="mydash-kanban">
        ${cols.map(c => `<div class="mydash-kanban-col" data-col="${c.key}" ondrop="onMyDashKanbanDrop(event,'${c.key}')" ondragover="event.preventDefault()">
          <div class="mydash-kanban-col-head" style="border-bottom-color:${c.color};">
            <span>${c.title}</span>
            <span class="mydash-kanban-count">${d.kanban[c.key].length}</span>
          </div>
          <div class="mydash-kanban-cards">
            ${d.kanban[c.key].map(card => `<div class="mydash-kanban-card" draggable="true" data-card-id="${card.id}" ondragstart="onMyDashKanbanDragStart(event,'${c.key}','${card.id}')">
              <span>${bbEscape(card.text)}</span>
              <button class="mydash-kanban-del" onclick="removeMyDashKanbanCard('${c.key}','${card.id}')" title="Eliminar">×</button>
            </div>`).join('')}
          </div>
          <div class="mydash-kanban-add">
            <input type="text" placeholder="+ Tarjeta" onkeydown="if(event.key==='Enter'){addMyDashKanbanCard('${c.key}',this.value);this.value='';}">
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }
  if (key === 'agenda') {
    return `<div class="mydash-section" data-section="agenda" ${dragAttrs}>
      <div class="mydash-section-head">
        <span class="mydash-section-title">${dragHandle}📅 Agenda de hoy</span>
        <button class="btn btn-outline btn-sm" onclick="switchTab('calendario')">Ver calendario</button>
      </div>
      ${renderMyDashAgenda()}
    </div>`;
  }
  if (key === 'shortcuts') {
    return `<div class="mydash-section" data-section="shortcuts" ${dragAttrs}>
      <div class="mydash-section-head">
        <span class="mydash-section-title">${dragHandle}🔗 Atajos rápidos</span>
        <button class="btn btn-gold btn-sm" onclick="addMyDashShortcut()">+ Atajo</button>
      </div>
      <div class="mydash-shortcuts">
        ${d.shortcuts.map(s => renderShortcut(s)).join('')}
        ${!d.shortcuts.length ? '<div class="mydash-empty">Sin atajos. Agregá accesos rápidos a pestañas, URLs, o clientes que uses seguido.</div>' : ''}
      </div>
    </div>`;
  }
  return '';
}

// ===== Drag & drop de secciones de Mi Dashboard =====
let _myDashDragKey = null;

function onMyDashSectionDragStart(ev, key) {
  // Solo permitir drag desde el handle ⋮⋮ — si el target es input/textarea/button, cancelar
  const tag = ev.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') {
    ev.preventDefault();
    return;
  }
  _myDashDragKey = key;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/plain', key);
  // Visual: marcar la sección que se arrastra
  const el = ev.currentTarget;
  setTimeout(() => el.classList.add('mydash-dragging'), 0);
}

function onMyDashSectionDragOver(ev, key) {
  if (!_myDashDragKey || _myDashDragKey === key) return;
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  ev.currentTarget.classList.add('mydash-drag-over');
}

function onMyDashSectionDragLeave(ev, key) {
  ev.currentTarget.classList.remove('mydash-drag-over');
}

function onMyDashSectionDrop(ev, targetKey) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('mydash-drag-over');
  const fromKey = _myDashDragKey;
  if (!fromKey || fromKey === targetKey) return;
  // Reordenar en la lista
  const d = getMyDashboard();
  const order = d.sectionOrder.slice();
  const fromIdx = order.indexOf(fromKey);
  const toIdx = order.indexOf(targetKey);
  if (fromIdx < 0 || toIdx < 0) return;
  // Sacar fromKey y reinsertarlo en la posición target
  order.splice(fromIdx, 1);
  order.splice(toIdx, 0, fromKey);
  d.sectionOrder = order;
  saveState();
  renderContent();
  toast('✓ Sección movida');
}

function onMyDashSectionDragEnd(ev) {
  _myDashDragKey = null;
  document.querySelectorAll('.mydash-section.mydash-dragging').forEach(el => el.classList.remove('mydash-dragging'));
  document.querySelectorAll('.mydash-section.mydash-drag-over').forEach(el => el.classList.remove('mydash-drag-over'));
}

function renderStickyNote(n, d, isStudio) {
  // Compatibilidad hacia atrás: si la nota tiene `text` (plano) y no `html`, migrar
  let html = n.html;
  if (!html && n.text) {
    html = bbEscape(n.text).replace(/\n/g, '<br>');
  }
  if (!html) html = '';

  d = d || getMyDashboard();
  const F = d ? d.stickyFeatures : { size:false, reorder:false, checkboxes:true, search:false, linkClient:false, share:false, groups:false, autoFit:false };

  const size = n.size || 'M';
  const sizeClass = F.autoFit ? 'sticky-size-auto' : ('sticky-size-' + size.toLowerCase());
  const readonly = !!n._readonly;
  const isStudioNote = !!isStudio;

  // Resaltar coincidencias si hay búsqueda
  let displayHtml = html;
  if (d && d.stickySearchTerm && !readonly) {
    const term = d.stickySearchTerm;
    if (term.length >= 2) {
      try {
        const re = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        // Sólo resaltar fuera de tags HTML
        displayHtml = displayHtml.replace(/(>[^<]+<)/g, m => m.replace(re, '<mark class="sticky-match">$1</mark>'));
      } catch(e) {}
    }
  }

  // Grupo / cliente vinculado en footer
  let footerHTML = '';
  if (F.groups && n.groupId && d) {
    const g = (d.stickyGroups || []).find(x => x.id === n.groupId);
    if (g) {
      footerHTML += `<span class="sticky-meta-chip" style="border-left:3px solid ${g.color||'#888'};">${bbEscape(g.name)}</span>`;
    }
  }
  if (F.linkClient && n.clientId) {
    const client = (state.clientes || []).find(c => clienteId(c) === n.clientId);
    if (client) {
      footerHTML += `<span class="sticky-meta-chip" onclick="event.stopPropagation();goToClient('${clienteId(client)}')" style="cursor:pointer;border-left:3px solid var(--c-accent);" title="Ir a la ficha del cliente">🔗 ${bbEscape(client.nombre)}</span>`;
    }
  }
  if (readonly && n._sharedBy) {
    footerHTML += `<span class="sticky-meta-chip" style="background:#f0e6ff;color:#5b3b9e;">👤 ${bbEscape(n._sharedBy)}</span>`;
  }
  if (isStudioNote) {
    footerHTML += `<span class="sticky-meta-chip" style="background:#fff5d6;color:#8a6d00;">🏛 Estudio</span>`;
  }
  if (F.share && Array.isArray(n.sharedWith) && n.sharedWith.length && !readonly && !isStudioNote) {
    footerHTML += `<span class="sticky-meta-chip" style="background:#e8f5e9;color:#2e7d32;">👥 ${n.sharedWith.join(', ')}</span>`;
  }

  // Atributos drag-and-drop si reorder está activo (sólo para mis notas, no read-only ni estudio)
  const dragAttrs = (F.reorder && !readonly && !isStudioNote)
    ? `draggable="true" ondragstart="onStickyDragStart(event,'${n.id}')" ondragover="onStickyDragOver(event,'${n.id}')" ondragleave="onStickyDragLeave(event)" ondrop="onStickyDrop(event,'${n.id}')" ondragend="onStickyDragEnd(event)"`
    : '';

  // Click handler para checkboxes (delegado en el contenedor de contenido)
  const checkboxClickHandler = F.checkboxes ? `onclick="onStickyClick(event,'${n.id}',${isStudioNote ? 'true' : 'false'})"` : '';

  // Onsave handlers diferentes para estudio vs personal
  const saveHandler = isStudioNote
    ? `updateStudioStickyNote('${n.id}', this.innerHTML)`
    : (readonly ? '' : `updateStickyNote('${n.id}', this.innerHTML)`);

  // Acciones (botones top-right)
  let actions = '';
  if (!readonly) {
    actions += `<button class="sticky-color" onclick="cycleStickyColor('${n.id}',${isStudioNote ? 'true' : 'false'})" title="Cambiar color">🎨</button>`;
    if (F.size && !F.autoFit && !isStudioNote) {
      actions += `<button class="sticky-size-btn" onclick="cycleStickySize('${n.id}')" title="Cambiar tamaño (S/M/L/XL)">${size}</button>`;
    }
    if (F.linkClient && !isStudioNote) {
      actions += `<button class="sticky-link-btn" onclick="openStickyClientLink('${n.id}')" title="Vincular a cliente">🔗</button>`;
    }
    if (F.share && !isStudioNote) {
      actions += `<button class="sticky-share-btn" onclick="openStickyShareModal('${n.id}')" title="Compartir con compañera">👥</button>`;
    }
    if (F.groups && !isStudioNote) {
      actions += `<button class="sticky-group-btn" onclick="openStickyGroupAssign('${n.id}')" title="Mover a grupo">📁</button>`;
    }
    actions += `<button class="sticky-del" onclick="removeStickyNote('${n.id}',${isStudioNote ? 'true' : 'false'})" title="Eliminar">×</button>`;
  } else {
    actions = `<span class="sticky-readonly-badge" title="Compartida por ${bbEscape(n._sharedBy||'')}">🔒</span>`;
  }

  // Toolbar (sólo si no es read-only)
  const toolbar = readonly ? '' : `<div class="sticky-toolbar" onmousedown="event.preventDefault();">
      <button onclick="stickyFmt('${n.id}','bold',${isStudioNote ? 'true' : 'false'})" title="Negrita (Ctrl+B)"><b>B</b></button>
      <button onclick="stickyFmt('${n.id}','italic',${isStudioNote ? 'true' : 'false'})" title="Cursiva (Ctrl+I)"><i>I</i></button>
      <button onclick="stickyFmt('${n.id}','underline',${isStudioNote ? 'true' : 'false'})" title="Subrayado (Ctrl+U)"><u>U</u></button>
      <span class="sticky-toolbar-sep"></span>
      <button onclick="stickyTitle('${n.id}',${isStudioNote ? 'true' : 'false'})" title="Título / Encabezado" style="font-weight:700;font-size:13px;">T</button>
      <button onclick="stickyFmt('${n.id}','insertUnorderedList',${isStudioNote ? 'true' : 'false'})" title="Lista con viñetas">•</button>
      <button onclick="stickyFmt('${n.id}','insertOrderedList',${isStudioNote ? 'true' : 'false'})" title="Lista numerada">1.</button>
      ${F.checkboxes ? `<button onclick="stickyToggleCheckbox('${n.id}',${isStudioNote ? 'true' : 'false'})" title="Lista con casillas (☐ tachable)">☐</button>` : ''}
      <span class="sticky-toolbar-sep"></span>
      <button onclick="stickyFmt('${n.id}','removeFormat',${isStudioNote ? 'true' : 'false'})" title="Quitar formato" style="font-size:10px;">⌫T</button>
    </div>`;

  return `<div class="sticky-note ${sizeClass}${readonly?' sticky-readonly':''}${isStudioNote?' sticky-studio':''}" style="background:${n.color || '#fff3a0'};" data-id="${n.id}" ${dragAttrs}>
    ${toolbar}
    <div class="sticky-content" ${readonly?'':`contenteditable="true"`}
         ${readonly ? '' : `oninput="${saveHandler}" onkeydown="stickyKeyHandler(event, '${n.id}')" onfocus="onStickyFocus('${n.id}',${isStudioNote ? 'true' : 'false'})" onblur="onStickyBlur('${n.id}')"`}
         ${checkboxClickHandler}
         data-placeholder="Escribí tu nota...">${displayHtml}</div>
    ${footerHTML ? `<div class="sticky-footer">${footerHTML}</div>` : ''}
    <div class="sticky-actions">
      ${actions}
    </div>
  </div>`;
}

const STICKY_COLORS = ['#fff3a0','#ffe0b2','#c5f5d4','#bbdefb','#f8bbd0','#e1bee7','#d7ccc8'];
const STICKY_SIZES = ['S','M','L','XL'];

// Helper: obtener nota (personal o estudio) por id
function findStickyNote(id, isStudio) {
  if (isStudio) {
    return getStudioStickyNotes().find(n => n.id === id);
  }
  const d = getMyDashboard();
  return d.stickyNotes.find(n => n.id === id);
}

function stickyKeyHandler(event, id) {
  // Ctrl+B / Ctrl+I / Ctrl+U los maneja el navegador con contenteditable
}

// Aplicar formato (negrita/cursiva/etc) — soporta personal y estudio
function stickyFmt(id, command, isStudio) {
  const note = document.querySelector(`.sticky-note[data-id="${id}"] .sticky-content`);
  if (!note) return;
  note.focus();
  document.execCommand(command, false, null);
  if (isStudio) updateStudioStickyNote(id, note.innerHTML);
  else updateStickyNote(id, note.innerHTML);
}

function stickyTitle(id, isStudio) {
  const note = document.querySelector(`.sticky-note[data-id="${id}"] .sticky-content`);
  if (!note) return;
  note.focus();
  const sel = window.getSelection();
  let isHeading = false;
  if (sel.rangeCount) {
    let node = sel.anchorNode;
    while (node && node !== note) {
      if (node.nodeName === 'H4') { isHeading = true; break; }
      node = node.parentNode;
    }
  }
  document.execCommand('formatBlock', false, isHeading ? 'P' : 'H4');
  if (isStudio) updateStudioStickyNote(id, note.innerHTML);
  else updateStickyNote(id, note.innerHTML);
}

// Convertir lista en checkboxes (o insertar una lista vacía)
function stickyToggleCheckbox(id, isStudio) {
  const note = document.querySelector(`.sticky-note[data-id="${id}"] .sticky-content`);
  if (!note) return;
  note.focus();
  const sel = window.getSelection();
  // Si no hay selección, insertar un item nuevo
  if (!sel.rangeCount || sel.toString().trim().length === 0) {
    document.execCommand('insertHTML', false, '<ul class="sticky-checks"><li data-checked="false">☐ </li></ul>');
  } else {
    // Convertir selección en lista de checks
    document.execCommand('insertUnorderedList', false, null);
    // Marcar el UL más cercano como checkbox list
    setTimeout(() => {
      const sel2 = window.getSelection();
      if (sel2.rangeCount) {
        let node = sel2.anchorNode;
        while (node && node !== note) {
          if (node.nodeName === 'UL') {
            node.classList.add('sticky-checks');
            node.querySelectorAll('li').forEach(li => {
              if (!li.hasAttribute('data-checked')) {
                li.setAttribute('data-checked', 'false');
              }
            });
            break;
          }
          node = node.parentNode;
        }
      }
      if (isStudio) updateStudioStickyNote(id, note.innerHTML);
      else updateStickyNote(id, note.innerHTML);
    }, 10);
  }
  setTimeout(() => {
    if (isStudio) updateStudioStickyNote(id, note.innerHTML);
    else updateStickyNote(id, note.innerHTML);
  }, 20);
}

// Click en checkbox dentro de una nota → tilda/destilda
function onStickyClick(event, id, isStudio) {
  const target = event.target;
  if (target.tagName !== 'LI') return;
  const ul = target.parentElement;
  if (!ul || !ul.classList.contains('sticky-checks')) return;
  // Solo si el click fue cerca del inicio del LI (zona del checkbox visual)
  const rect = target.getBoundingClientRect();
  if (event.clientX - rect.left > 26) return;
  event.preventDefault();
  const isChecked = target.getAttribute('data-checked') === 'true';
  target.setAttribute('data-checked', isChecked ? 'false' : 'true');
  const note = document.querySelector(`.sticky-note[data-id="${id}"] .sticky-content`);
  if (note) {
    if (isStudio) updateStudioStickyNote(id, note.innerHTML);
    else updateStickyNote(id, note.innerHTML);
  }
}

function addMyDashStickyNote() {
  const d = getMyDashboard();
  const me = currentUser();
  const newNote = {
    id: 'sn_' + Date.now() + '_' + Math.random().toString(36).slice(2,5),
    html: '',
    color: STICKY_COLORS[d.stickyNotes.length % STICKY_COLORS.length],
    ts: Date.now(),
    size: 'M',
    sharedWith: []
  };
  d.stickyNotes.push(newNote);
  // Si reorder activo, agregar al final del orden
  if (d.stickyFeatures.reorder) {
    if (!Array.isArray(d.stickyOrder)) d.stickyOrder = [];
    d.stickyOrder.push(newNote.id);
  }
  saveState();
  renderContent();
  setTimeout(() => {
    const notes = document.querySelectorAll('.sticky-note:not(.sticky-readonly):not(.sticky-studio) .sticky-content');
    if (notes.length) notes[notes.length - 1].focus();
  }, 50);
}

function addStudioStickyNote() {
  const arr = getStudioStickyNotes();
  const newNote = {
    id: 'st_' + Date.now() + '_' + Math.random().toString(36).slice(2,5),
    html: '',
    color: STICKY_COLORS[arr.length % STICKY_COLORS.length],
    ts: Date.now(),
    size: 'M',
    createdBy: currentUser()?.name || ''
  };
  arr.push(newNote);
  state.studioStickyNotes = arr;
  saveState();
  renderContent();
  setTimeout(() => {
    const notes = document.querySelectorAll('.sticky-studio .sticky-content');
    if (notes.length) notes[notes.length - 1].focus();
  }, 50);
}

function updateStickyNote(id, html) {
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === id);
  if (n) {
    n.html = html;
    if (n.html && n.html.indexOf('<script') !== -1) {
      n.html = n.html.replace(/<script[\s\S]*?<\/script>/gi, '');
    }
    if (n.text !== undefined) delete n.text;
    saveState();
  }
}

function updateStudioStickyNote(id, html) {
  const arr = getStudioStickyNotes();
  const n = arr.find(x => x.id === id);
  if (n) {
    n.html = html;
    if (n.html && n.html.indexOf('<script') !== -1) {
      n.html = n.html.replace(/<script[\s\S]*?<\/script>/gi, '');
    }
    saveState();
  }
}

function cycleStickyColor(id, isStudio) {
  if (isStudio) {
    const arr = getStudioStickyNotes();
    const n = arr.find(x => x.id === id);
    if (!n) return;
    const idx = STICKY_COLORS.indexOf(n.color);
    n.color = STICKY_COLORS[(idx + 1) % STICKY_COLORS.length];
    saveState();
    renderContent();
    return;
  }
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === id);
  if (!n) return;
  const idx = STICKY_COLORS.indexOf(n.color);
  n.color = STICKY_COLORS[(idx + 1) % STICKY_COLORS.length];
  saveState();
  renderContent();
}

function cycleStickySize(id) {
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === id);
  if (!n) return;
  const idx = STICKY_SIZES.indexOf(n.size || 'M');
  n.size = STICKY_SIZES[(idx + 1) % STICKY_SIZES.length];
  saveState();
  renderContent();
}

function removeStickyNote(id, isStudio) {
  if (isStudio) {
    if (!confirm('¿Eliminar esta nota del estudio? Todas las usuarias dejarán de verla.')) return;
    state.studioStickyNotes = getStudioStickyNotes().filter(x => x.id !== id);
    saveState();
    renderContent();
    return;
  }
  if (!confirm('¿Eliminar esta nota?')) return;
  const d = getMyDashboard();
  d.stickyNotes = d.stickyNotes.filter(x => x.id !== id);
  if (Array.isArray(d.stickyOrder)) d.stickyOrder = d.stickyOrder.filter(x => x !== id);
  saveState();
  renderContent();
}

// =========== Búsqueda ===========
function onStickiesSearch(term) {
  const d = getMyDashboard();
  d.stickySearchTerm = term;
  saveState();
  renderContent();
  // Devolver el foco al input
  setTimeout(() => {
    const inp = document.getElementById('stickies-search-input');
    if (inp) {
      inp.focus();
      inp.setSelectionRange(inp.value.length, inp.value.length);
    }
  }, 30);
}

// =========== Notas del estudio (desplegable) ===========
function toggleStudioStickies() {
  const d = getMyDashboard();
  d.stickyStudioCollapsed = !d.stickyStudioCollapsed;
  saveState();
  renderContent();
}

// =========== Reorder drag & drop ===========
let _stickyDragId = null;

function onStickyDragStart(ev, id) {
  // Si el target está adentro de zona editable (.sticky-content), cancelar
  if (ev.target.classList.contains('sticky-content') || ev.target.closest('.sticky-content') || ev.target.closest('.sticky-toolbar') || ev.target.closest('.sticky-actions')) {
    ev.preventDefault();
    return;
  }
  _stickyDragId = id;
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/plain', id);
  setTimeout(() => ev.currentTarget.classList.add('sticky-dragging'), 0);
}

function onStickyDragOver(ev, id) {
  if (!_stickyDragId || _stickyDragId === id) return;
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  ev.currentTarget.classList.add('sticky-drag-over');
}

function onStickyDragLeave(ev) {
  ev.currentTarget.classList.remove('sticky-drag-over');
}

function onStickyDrop(ev, targetId) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('sticky-drag-over');
  const fromId = _stickyDragId;
  if (!fromId || fromId === targetId) return;
  const d = getMyDashboard();
  // Construir orden actual si no existe
  if (!Array.isArray(d.stickyOrder) || !d.stickyOrder.length) {
    d.stickyOrder = d.stickyNotes.map(n => n.id);
  } else {
    // Agregar ids faltantes al final
    d.stickyNotes.forEach(n => { if (!d.stickyOrder.includes(n.id)) d.stickyOrder.push(n.id); });
  }
  const order = d.stickyOrder.slice();
  const fromIdx = order.indexOf(fromId);
  const toIdx = order.indexOf(targetId);
  if (fromIdx < 0 || toIdx < 0) return;
  order.splice(fromIdx, 1);
  order.splice(toIdx, 0, fromId);
  d.stickyOrder = order;
  saveState();
  renderContent();
  toast('✓ Nota movida');
}

function onStickyDragEnd(ev) {
  _stickyDragId = null;
  document.querySelectorAll('.sticky-note.sticky-dragging').forEach(el => el.classList.remove('sticky-dragging'));
  document.querySelectorAll('.sticky-note.sticky-drag-over').forEach(el => el.classList.remove('sticky-drag-over'));
}

function onStickyContainerDragOver(ev) {
  if (_stickyDragId) ev.preventDefault();
}

// =========== Vincular cliente (orden alfabético + autocompletado) ===========
// Normaliza para comparar sin tildes ni mayúsculas: "Núñez" == "nunez".
function cliNorm(s) {
  return String(s == null ? '' : s)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim();
}

// Clientes SIEMPRE ordenados alfabéticamente. Se ordena al mostrar, no al guardar:
// así los clientes nuevos caen solos en su lugar sin tocar los datos.
function clientesAlfabetico() {
  return (state.clientes || []).slice().sort(function(a, b) {
    return String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es', { sensitivity: 'base' });
  });
}

let _stickyLinkMatches = [];
let _stickyLinkIdx = -1;
const STICKY_LINK_MAX = 8;

function openStickyClientLink(noteId) {
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  if (!clientesAlfabetico().length) { toast('No hay clientes cargados todavía'); return; }
  document.getElementById('sticky-link-note-id').value = noteId;
  document.getElementById('sticky-link-value').value = n.clientId || '';
  document.getElementById('sticky-link-search').value = '';
  renderStickyLinkCurrent();
  onStickyLinkSearch('');
  document.getElementById('modal-sticky-link').classList.add('open');
  setTimeout(function() {
    const i = document.getElementById('sticky-link-search');
    if (i) i.focus();
  }, 80);
}

function renderStickyLinkCurrent() {
  const el = document.getElementById('sticky-link-current');
  if (!el) return;
  const id = document.getElementById('sticky-link-value').value;
  if (!id) { el.innerHTML = '<span style="color:var(--c-text-muted);">Sin cliente vinculado.</span>'; return; }
  const c = clientesAlfabetico().find(function(x) { return clienteId(x) === id; });
  el.innerHTML = '✅ <strong>' + bbEscape(c ? c.nombre : id) + '</strong> ' +
    '<button class="btn btn-outline btn-sm" style="margin-left:8px;" onclick="clearStickyLink()">Quitar vínculo</button>';
}

function clearStickyLink() {
  document.getElementById('sticky-link-value').value = '';
  document.getElementById('sticky-link-search').value = '';
  renderStickyLinkCurrent();
  onStickyLinkSearch('');
}

function onStickyLinkSearch(term) {
  const q = cliNorm(term);
  const todos = clientesAlfabetico();
  if (!q) {
    // Sin texto: mostramos los primeros en orden alfabético como punto de partida.
    _stickyLinkMatches = todos;
  } else {
    // Búsqueda SOLO por nombre. Los que empiezan con lo tipeado van primero;
    // dentro de cada grupo se respeta el orden alfabético.
    const empiezan = [], contienen = [];
    todos.forEach(function(c) {
      const nom = cliNorm(c.nombre);
      if (nom.startsWith(q)) empiezan.push(c);
      else if (nom.indexOf(q) !== -1) contienen.push(c);
    });
    _stickyLinkMatches = empiezan.concat(contienen);
  }
  _stickyLinkIdx = _stickyLinkMatches.length ? 0 : -1;
  renderStickyLinkResults(term);
}

function renderStickyLinkResults(term) {
  const box = document.getElementById('sticky-link-results');
  if (!box) return;
  if (!_stickyLinkMatches.length) {
    box.innerHTML = '<div class="cli-ac-more">Ningún cliente coincide con “' + bbEscape(term) + '”.</div>';
    return;
  }
  const q = cliNorm(term);
  const visibles = _stickyLinkMatches.slice(0, STICKY_LINK_MAX);
  let h = visibles.map(function(c, i) {
    let nom = bbEscape(c.nombre || '');
    // Resaltar el tramo tipeado (calculado sobre el nombre normalizado, misma longitud)
    if (q) {
      const pos = cliNorm(c.nombre).indexOf(q);
      if (pos >= 0) {
        const raw = String(c.nombre || '');
        nom = bbEscape(raw.slice(0, pos)) + '<b>' + bbEscape(raw.slice(pos, pos + q.length)) + '</b>' + bbEscape(raw.slice(pos + q.length));
      }
    }
    return '<div class="cli-ac-item' + (i === _stickyLinkIdx ? ' sel' : '') + '" ' +
           'onmousedown="event.preventDefault();pickStickyLink(' + i + ')">' +
           '<span>' + nom + '</span>' +
           (c.tipo ? '<span class="cli-ac-item-tipo">' + bbEscape(c.tipo) + '</span>' : '') +
           '</div>';
  }).join('');
  if (_stickyLinkMatches.length > STICKY_LINK_MAX) {
    h += '<div class="cli-ac-more">…y ' + (_stickyLinkMatches.length - STICKY_LINK_MAX) + ' más. Seguí escribiendo para afinar.</div>';
  }
  box.innerHTML = h;
}

function pickStickyLink(i) {
  const c = _stickyLinkMatches[i];
  if (!c) return;
  document.getElementById('sticky-link-value').value = clienteId(c);
  document.getElementById('sticky-link-search').value = c.nombre || '';
  document.getElementById('sticky-link-results').innerHTML = '';
  _stickyLinkMatches = [];
  _stickyLinkIdx = -1;
  renderStickyLinkCurrent();
}

function onStickyLinkKey(ev) {
  const max = Math.min(_stickyLinkMatches.length, STICKY_LINK_MAX);
  if (ev.key === 'ArrowDown') {
    ev.preventDefault();
    if (!max) return;
    _stickyLinkIdx = (_stickyLinkIdx + 1) % max;
    renderStickyLinkResults(ev.target.value);
  } else if (ev.key === 'ArrowUp') {
    ev.preventDefault();
    if (!max) return;
    _stickyLinkIdx = (_stickyLinkIdx - 1 + max) % max;
    renderStickyLinkResults(ev.target.value);
  } else if (ev.key === 'Enter') {
    ev.preventDefault();
    if (_stickyLinkIdx >= 0) pickStickyLink(_stickyLinkIdx);
    else saveStickyClientLink();
  } else if (ev.key === 'Escape') {
    ev.preventDefault();
    closeModal('modal-sticky-link');
  }
}

function saveStickyClientLink() {
  const noteId = document.getElementById('sticky-link-note-id').value;
  const clientId = document.getElementById('sticky-link-value').value;
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  if (clientId) n.clientId = clientId;
  else delete n.clientId;
  saveState();
  closeModal('modal-sticky-link');
  renderContent();
  toast(clientId ? '✓ Nota vinculada al cliente' : '✓ Vínculo eliminado');
}

function goToClient(clientId) {
  switchTab('clientes');
  setTimeout(() => {
    if (typeof openClient === 'function') openClient(clientId);
    else if (typeof showClientDetails === 'function') showClientDetails(clientId);
  }, 200);
}

// =========== Compartir con compañera ===========
function openStickyShareModal(noteId) {
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  const me = currentUser();
  const others = state.users.filter(u => u.name !== me.name);
  if (!others.length) {
    toast('No hay otras usuarias para compartir');
    return;
  }
  document.getElementById('sticky-share-note-id').value = noteId;
  const wrap = document.getElementById('sticky-share-list');
  wrap.innerHTML = others.map(u => `
    <label style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid var(--c-border);border-radius:4px;margin-bottom:6px;cursor:pointer;">
      <input type="checkbox" value="${u.name}"${(n.sharedWith||[]).includes(u.name)?' checked':''}>
      <span style="font-weight:600;">${bbEscape(u.displayName || u.name)}</span>
    </label>
  `).join('');
  document.getElementById('modal-sticky-share').classList.add('open');
}

function saveStickyShare() {
  const noteId = document.getElementById('sticky-share-note-id').value;
  const wrap = document.getElementById('sticky-share-list');
  const checked = Array.from(wrap.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  n.sharedWith = checked;
  saveState();
  closeModal('modal-sticky-share');
  renderContent();
  toast(checked.length ? '✓ Nota compartida con ' + checked.join(', ') : '✓ Nota ya no se comparte');
}

// =========== Grupos ===========
function openStickyGroupModal() {
  const d = getMyDashboard();
  const wrap = document.getElementById('sticky-groups-list');
  wrap.innerHTML = (d.stickyGroups || []).map(g => `
    <div style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--c-border);border-radius:4px;margin-bottom:6px;">
      <span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${g.color||'#888'};"></span>
      <span style="flex:1;">${bbEscape(g.name)}</span>
      <button class="btn btn-outline btn-sm" onclick="renameStickyGroup('${g.id}')">✏</button>
      <button class="btn btn-outline btn-sm" onclick="deleteStickyGroup('${g.id}')" style="color:var(--c-red);">×</button>
    </div>
  `).join('') || '<div style="padding:14px;color:var(--c-text-muted);font-style:italic;text-align:center;">Sin grupos. Creá uno abajo.</div>';
  document.getElementById('modal-sticky-groups').classList.add('open');
}

const GROUP_COLORS = ['#7fb685','#e8a87c','#85bdbf','#c89eb0','#d4af37','#9c89b8','#f4a261'];

function createStickyGroup() {
  const name = document.getElementById('sticky-new-group-name').value.trim();
  if (!name) { toast('Ingresá un nombre'); return; }
  const d = getMyDashboard();
  if (!Array.isArray(d.stickyGroups)) d.stickyGroups = [];
  const id = 'sg_' + Date.now() + '_' + Math.random().toString(36).slice(2,5);
  d.stickyGroups.push({ id, name, color: GROUP_COLORS[d.stickyGroups.length % GROUP_COLORS.length], ts: Date.now() });
  document.getElementById('sticky-new-group-name').value = '';
  saveState();
  openStickyGroupModal();
  toast('✓ Grupo creado');
}

function renameStickyGroup(id) {
  const d = getMyDashboard();
  const g = (d.stickyGroups||[]).find(x => x.id === id);
  if (!g) return;
  const name = prompt('Nuevo nombre del grupo:', g.name);
  if (!name || !name.trim()) return;
  g.name = name.trim();
  saveState();
  openStickyGroupModal();
}

function deleteStickyGroup(id) {
  const d = getMyDashboard();
  const g = (d.stickyGroups||[]).find(x => x.id === id);
  if (!g) return;
  const inGroup = d.stickyNotes.filter(n => n.groupId === id).length;
  if (!confirm(`¿Eliminar el grupo "${g.name}"? ${inGroup ? `Las ${inGroup} nota(s) que pertenecen quedan sin grupo.` : ''}`)) return;
  d.stickyGroups = d.stickyGroups.filter(x => x.id !== id);
  d.stickyNotes.forEach(n => { if (n.groupId === id) delete n.groupId; });
  if (d._stickyFilterGroup === id) d._stickyFilterGroup = '';
  saveState();
  openStickyGroupModal();
  renderContent();
}

function filterStickiesByGroup(groupId) {
  const d = getMyDashboard();
  d._stickyFilterGroup = groupId || '';
  saveState();
  renderContent();
}

function openStickyGroupAssign(noteId) {
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  if (!d.stickyGroups || !d.stickyGroups.length) {
    toast('Primero creá un grupo desde "+ Grupo"');
    return;
  }
  // Modal simple con select
  document.getElementById('sticky-assign-note-id').value = noteId;
  const sel = document.getElementById('sticky-assign-select');
  sel.innerHTML = '<option value="">(sin grupo)</option>' +
    d.stickyGroups.map(g => `<option value="${g.id}"${g.id===n.groupId?' selected':''}>${bbEscape(g.name)}</option>`).join('');
  document.getElementById('modal-sticky-assign').classList.add('open');
}

function saveStickyGroupAssign() {
  const noteId = document.getElementById('sticky-assign-note-id').value;
  const groupId = document.getElementById('sticky-assign-select').value;
  const d = getMyDashboard();
  const n = d.stickyNotes.find(x => x.id === noteId);
  if (!n) return;
  if (groupId) n.groupId = groupId;
  else delete n.groupId;
  saveState();
  closeModal('modal-sticky-assign');
  renderContent();
  toast(groupId ? '✓ Asignada al grupo' : '✓ Quitada del grupo');
}

// =========== Modal de features (opciones) ===========
const STICKY_FEATURES_META = [
  { key: 'size',       label: 'Tamaños variables (S/M/L/XL)', desc: 'Permite cambiar el tamaño de cada nota individualmente.' },
  { key: 'autoFit',    label: 'Tamaño automático al contenido', desc: 'La nota se ajusta sola al texto (anula tamaños fijos).' },
  { key: 'reorder',    label: 'Reordenar arrastrando',           desc: 'Mové las notas por el borde superior para reordenar.' },
  { key: 'checkboxes', label: 'Listas con casillas tachables',   desc: 'Convierte listas en checklists clickeables.' },
  { key: 'search',     label: 'Buscador en notas',                desc: 'Barra de búsqueda en vivo arriba.' },
  { key: 'linkClient', label: 'Vincular a cliente',               desc: 'Cada nota puede asociarse a una empresa de Info. Clientes.' },
  { key: 'share',      label: 'Compartir con compañera',          desc: 'Mandá una nota a otra usuaria del estudio.' },
  { key: 'groups',     label: 'Grupos / categorías',              desc: 'Organizá tus notas en carpetas con color.' }
];

function openStickyFeaturesModal() {
  const d = getMyDashboard();
  const F = d.stickyFeatures;
  const wrap = document.getElementById('sticky-features-list');
  wrap.innerHTML = STICKY_FEATURES_META.map(m => `
    <label class="sticky-feat-row">
      <input type="checkbox" data-feat="${m.key}"${F[m.key]?' checked':''}>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:13px;">${m.label}</div>
        <div style="font-size:11px;color:var(--c-text-muted);">${m.desc}</div>
      </div>
    </label>
  `).join('');
  document.getElementById('modal-sticky-features').classList.add('open');
}

function saveStickyFeatures() {
  const d = getMyDashboard();
  const wrap = document.getElementById('sticky-features-list');
  wrap.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    d.stickyFeatures[cb.getAttribute('data-feat')] = cb.checked;
  });
  saveState();
  closeModal('modal-sticky-features');
  renderContent();
  toast('✓ Opciones actualizadas');
}

// ----- Tareas -----
// El filtro es LOCAL de cada navegador (no viaja a Firebase) para no generar ruido de
// sincronización cada vez que se toca un chip.
let _editingTaskId = null;

function addMyDashTask() {
  const inp = document.getElementById('mydash-task-input');
  const text = (inp.value || '').trim();
  if (!text) return;
  const d = getMyDashboard();
  d.tasks.unshift({ id: 't_' + Date.now() + '_' + Math.random().toString(36).slice(2,5), text, done: false, ts: Date.now() });
  inp.value = '';
  // Si estabas mirando "Realizadas" o "Archivadas", la tarea nueva no se vería: saltamos a Pendientes.
  const f = getTaskFilter();
  if (f === 'hechas' || f === 'archivadas') { try { localStorage.setItem(TASK_FILTER_KEY, 'pendientes'); } catch(e) {} }
  saveState();
  renderContent();
}

function toggleMyDashTask(id) {
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  t.doneTs = t.done ? Date.now() : null;
  saveState();
  renderContent();
}

function removeMyDashTask(id) {
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === id);
  if (!t) return;
  if (!confirm('¿Eliminar definitivamente esta tarea?\n\n"' + t.text + '"\n\nSi solo querés sacarla de la vista, usá Archivar (📥).')) return;
  d.tasks = d.tasks.filter(x => x.id !== id);
  saveState();
  renderContent();
}

// ----- Archivar / desarchivar -----
function toggleArchiveMyDashTask(id) {
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === id);
  if (!t) return;
  t.archived = !t.archived;
  t.archivedTs = t.archived ? Date.now() : null;
  saveState();
  renderContent();
  toast(t.archived ? '📥 Tarea archivada' : '↩️ Tarea restaurada');
}

// ----- Modificar el texto -----
function editMyDashTask(id) {
  _editingTaskId = id;
  renderContent();
  setTimeout(() => {
    const i = document.getElementById('mydash-task-edit-input');
    if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  }, 40);
}

function onMyDashTaskEditKey(ev, id) {
  if (ev.key === 'Enter') { ev.preventDefault(); saveMyDashTaskEdit(id, ev.target.value); }
  else if (ev.key === 'Escape') { ev.preventDefault(); _editingTaskId = null; renderContent(); }
}

function saveMyDashTaskEdit(id, value) {
  if (_editingTaskId !== id) return; // evita el doble disparo Enter + blur
  _editingTaskId = null;
  const text = (value || '').trim();
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === id);
  if (t && text) { t.text = text; t.editedTs = Date.now(); saveState(); }
  renderContent();
}

// ----- Asignar a otra usuaria -----
function ensureDashboardOf(name) {
  ensureUserDashboards();
  if (!state.userDashboards[name]) {
    state.userDashboards[name] = {
      stickyNotes: [], tasks: [], kanban: { todo:[], doing:[], done:[] }, shortcuts: [],
      sections: { stickyNotes:true, tasks:true, kanban:true, agenda:true, shortcuts:true },
      sectionOrder: ['stickyNotes','tasks','kanban','agenda','shortcuts']
    };
  }
  const dd = state.userDashboards[name];
  if (!Array.isArray(dd.tasks)) dd.tasks = [];
  return dd;
}

function openTaskAssign(taskId) {
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === taskId);
  if (!t) return;
  const me = currentUser();
  const others = (state.users || []).filter(u => u && u.name && (!me || u.name !== me.name));
  if (!others.length) { toast('No hay otras usuarias cargadas'); return; }
  document.getElementById('task-assign-id').value = taskId;
  document.getElementById('task-assign-text').textContent = '“' + t.text + '”';
  document.getElementById('task-assign-user').innerHTML =
    others.map(u => `<option value="${bbEscape(u.name)}">${bbEscape(u.name)}</option>`).join('');
  document.getElementById('task-assign-keep').checked = true;
  document.getElementById('modal-task-assign').classList.add('open');
}

function saveTaskAssign() {
  const id     = document.getElementById('task-assign-id').value;
  const target = document.getElementById('task-assign-user').value;
  const keep   = document.getElementById('task-assign-keep').checked;
  if (!target) { toast('Elegí a quién asignársela'); return; }
  const d = getMyDashboard();
  const t = d.tasks.find(x => x.id === id);
  if (!t) return;
  const me = currentUser();
  const dd = ensureDashboardOf(target);
  dd.tasks.unshift({
    id: 't_' + Date.now() + '_' + Math.random().toString(36).slice(2,5),
    text: t.text, done: false, ts: Date.now(),
    assignedBy: me ? me.name : null
  });
  if (keep) { t.assignedTo = target; }
  else { d.tasks = d.tasks.filter(x => x.id !== id); }
  saveState();
  closeModal('modal-task-assign');
  renderContent();
  try { notifyUserByName(target, 'assignment', '📌 Te asignaron una tarea', t.text, null); } catch(e) {}
  toast(keep ? '✓ Asignada a ' + target + ' — mantenés tu copia' : '✓ Tarea enviada a ' + target);
}

// ----- Kanban -----
let _kanbanDragSrc = null;
function onMyDashKanbanDragStart(e, fromCol, cardId) {
  _kanbanDragSrc = { col: fromCol, id: cardId };
  try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', cardId); } catch(_) {}
}

function onMyDashKanbanDrop(e, toCol) {
  e.preventDefault();
  if (!_kanbanDragSrc) return;
  const d = getMyDashboard();
  const { col: fromCol, id } = _kanbanDragSrc;
  if (fromCol === toCol) { _kanbanDragSrc = null; return; }
  const idx = d.kanban[fromCol].findIndex(c => c.id === id);
  if (idx < 0) return;
  const [card] = d.kanban[fromCol].splice(idx, 1);
  d.kanban[toCol].push(card);
  _kanbanDragSrc = null;
  saveState();
  renderContent();
}

function addMyDashKanbanCard(col, text) {
  text = (text || '').trim();
  if (!text) return;
  const d = getMyDashboard();
  d.kanban[col].push({ id: 'k_' + Date.now() + '_' + Math.random().toString(36).slice(2,5), text });
  saveState();
  renderContent();
}

function removeMyDashKanbanCard(col, id) {
  const d = getMyDashboard();
  d.kanban[col] = d.kanban[col].filter(c => c.id !== id);
  saveState();
  renderContent();
}

// ----- Agenda del día -----
function renderMyDashAgenda() {
  const me = currentUser();
  if (!me) return '';
  const d = getMyDashboard();
  // Preferencia persistente: agenda mode ('mine' = solo asignadas a mí, 'all' = todas las del día)
  if (!d.agendaMode) d.agendaMode = 'mine';
  const mode = d.agendaMode;

  const events = Array.isArray(state.calendarEvents) ? state.calendarEvents : [];
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayEvents = events
    .filter(ev => {
      if (!ev || !ev.date) return false;
      if (ev.date !== todayStr) return false;
      if (mode === 'all') return true; // ver TODO lo de hoy (del estudio)
      // mode === 'mine': solo eventos donde el usuario está ASIGNADO explícitamente
      // (eventos sin asignados son "del estudio" y NO se ven en "Mis asignados")
      const assignees = Array.isArray(ev.assignedTo) ? ev.assignedTo : (typeof ev.assignedTo === 'string' && ev.assignedTo ? [ev.assignedTo] : []);
      return assignees.includes(me.name);
    })
    .sort((a,b) => (a.time || '').localeCompare(b.time || ''));

  // Toggle UI
  const toggleHTML = `<div class="agenda-mode-toggle" style="display:inline-flex;gap:0;margin-bottom:10px;border:1px solid var(--c-border);border-radius:3px;overflow:hidden;font-size:11px;">
    <button class="agenda-mode-btn${mode==='mine'?' active':''}" onclick="setAgendaMode('mine')" title="Solo eventos donde estás asignada">👤 Mis asignados</button>
    <button class="agenda-mode-btn${mode==='all'?' active':''}" onclick="setAgendaMode('all')" title="Todos los eventos del estudio para hoy">🌐 Todo el estudio</button>
  </div>`;

  if (!todayEvents.length) {
    const emptyMsg = mode === 'mine'
      ? 'No tenés eventos asignados a vos para hoy 🎉<br><span style="font-size:11px;opacity:.7;">Tip: revisá "Todo el estudio" para ver eventos generales</span>'
      : 'No hay eventos para hoy 🎉';
    return toggleHTML + `<div class="mydash-empty">${emptyMsg}</div>`;
  }

  // Renderizar marcando con avatares los asignados para que se note quién va
  return toggleHTML + `<div class="mydash-agenda">
    ${todayEvents.map(ev => {
      const assignees = Array.isArray(ev.assignedTo) ? ev.assignedTo : (typeof ev.assignedTo === 'string' && ev.assignedTo ? [ev.assignedTo] : []);
      const isMine = assignees.includes(me.name);
      const isGeneral = !assignees.length;
      const tagsHTML = assignees.length
        ? `<span class="mydash-agenda-who">${assignees.map(n => `<span class="mydash-agenda-chip${n===me.name?' mine':''}">${bbEscape(n)}</span>`).join('')}</span>`
        : `<span class="mydash-agenda-who"><span class="mydash-agenda-chip general">🏛 General</span></span>`;
      return `<div class="mydash-agenda-item${isMine?'':(isGeneral?' general':' not-mine')}">
        <span class="mydash-agenda-time">${ev.time || '--:--'}</span>
        <span class="mydash-agenda-title">${bbEscape(ev.title || '(sin título)')}</span>
        ${ev.location ? `<span class="mydash-agenda-loc">📍 ${bbEscape(ev.location)}</span>` : ''}
        ${tagsHTML}
      </div>`;
    }).join('')}
  </div>`;
}

function setAgendaMode(mode) {
  const d = getMyDashboard();
  if (!d) return;
  d.agendaMode = mode;
  saveState();
  renderContent();
}

// ----- Atajos -----
function renderShortcut(s) {
  const color = s.color || 'var(--c-accent)';
  return `<div class="mydash-shortcut" style="border-left:3px solid ${color};" onclick="openShortcut('${s.id}')">
    <span class="mydash-shortcut-icon" style="color:${color};">${s.icon || '🔗'}</span>
    <span class="mydash-shortcut-label">${bbEscape(s.label)}</span>
    <button class="mydash-shortcut-del" onclick="event.stopPropagation();removeMyDashShortcut('${s.id}')" title="Eliminar">×</button>
  </div>`;
}

function openShortcut(id) {
  const d = getMyDashboard();
  const s = d.shortcuts.find(x => x.id === id);
  if (!s) return;
  if (s.type === 'tab') switchTab(s.target);
  else if (s.type === 'url') window.open(s.target, '_blank');
  else if (s.type === 'cliente') {
    // Saltar a pestaña clientes y resaltar
    switchTab('clientes');
    setTimeout(() => {
      const el = document.querySelector(`[data-cliente-id="${s.target}"]`);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('highlight'); setTimeout(()=>el.classList.remove('highlight'), 2000); }
    }, 300);
  }
}

function addMyDashShortcut() {
  // Modal simple para configurar
  document.getElementById('mydash-shortcut-label').value = '';
  document.getElementById('mydash-shortcut-icon').value = '🔗';
  document.getElementById('mydash-shortcut-color').value = '#b8c1cc';
  document.getElementById('mydash-shortcut-type').value = 'tab';
  // Llenar selectores
  const tabSel = document.getElementById('mydash-shortcut-tab');
  tabSel.innerHTML = state.tabs.filter(t => t.id !== 'mydash').map(t => `<option value="${bbEscape(t.id)}">${bbEscape(t.name)}</option>`).join('');
  toggleShortcutTargetField();
  document.getElementById('modal-mydash-shortcut').classList.add('open');
}

function toggleShortcutTargetField() {
  const type = document.getElementById('mydash-shortcut-type').value;
  document.getElementById('mydash-shortcut-tab-group').style.display = (type === 'tab') ? 'block' : 'none';
  document.getElementById('mydash-shortcut-url-group').style.display = (type === 'url') ? 'block' : 'none';
}

function saveMyDashShortcut() {
  const label = document.getElementById('mydash-shortcut-label').value.trim();
  if (!label) { toast('Ingresá un nombre'); return; }
  const icon = document.getElementById('mydash-shortcut-icon').value || '🔗';
  const color = document.getElementById('mydash-shortcut-color').value || '#b8c1cc';
  const type = document.getElementById('mydash-shortcut-type').value;
  let target;
  if (type === 'tab') target = document.getElementById('mydash-shortcut-tab').value;
  else if (type === 'url') {
    target = document.getElementById('mydash-shortcut-url').value.trim();
    if (!target) { toast('Ingresá la URL'); return; }
    if (!/^https?:\/\//.test(target)) target = 'https://' + target;
  }
  const d = getMyDashboard();
  d.shortcuts.push({ id: 'sc_' + Date.now() + '_' + Math.random().toString(36).slice(2,5), label, icon, color, type, target });
  saveState();
  closeModal('modal-mydash-shortcut');
  renderContent();
}

function removeMyDashShortcut(id) {
  if (!confirm('¿Eliminar este atajo?')) return;
  const d = getMyDashboard();
  d.shortcuts = d.shortcuts.filter(x => x.id !== id);
  saveState();
  renderContent();
}

// ----- Configurar secciones del Dashboard -----
function openMyDashSettings() {
  const d = getMyDashboard();
  const sections = [
    { key:'stickyNotes', label:'📝 Notas adhesivas' },
    { key:'tasks',       label:'✅ Tareas' },
    { key:'kanban',      label:'📋 Kanban' },
    { key:'agenda',      label:'📅 Agenda del día' },
    { key:'shortcuts',   label:'🔗 Atajos' }
  ];
  document.getElementById('mydash-sections-list').innerHTML = sections.map(s => `
    <label style="display:flex;align-items:center;gap:8px;padding:8px;cursor:pointer;background:var(--c-bg-alt);border-radius:4px;margin-bottom:6px;">
      <input type="checkbox" ${d.sections[s.key]?'checked':''} onchange="toggleMyDashSection('${s.key}', this.checked)" style="width:auto;">
      <strong>${s.label}</strong>
    </label>
  `).join('');
  document.getElementById('modal-mydash-settings').classList.add('open');
}

function toggleMyDashSection(key, value) {
  const d = getMyDashboard();
  d.sections[key] = !!value;
  saveState();
  renderContent();
}

// ============ AUTH (Sesión 4: roles y perfiles) ============
// Constantes ROLES, ROLE_LABELS, ROLE_ICONS y AVATAR_COLORS definidas al inicio del script
const MASTER_CODE_DEFAULT_LABEL = 'WM-MASTER'; // identificador visible al usar el código maestro

// Hash SHA-256 usando la Web Crypto API (nativo del navegador).
async function sha256(text) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// Color determinístico desde un nombre (fallback si user.color no está definido)
function userColor(u) {
  // u puede ser string (legacy) o objeto user
  if (u && typeof u === 'object') {
    if (u.color) return u.color;
    u = u.name || '';
  }
  let h = 0; for (let i=0;i<String(u).length;i++) h = (h*31 + String(u).charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

// Devuelve el nombre visible (displayName) a partir de un name interno (o el name si no hay user)
function userLabel(name) {
  const u = (typeof name === 'object') ? name : findUserByName(name);
  if (u) return u.displayName || u.name;
  return String(name || '');
}

// Renderiza un avatar pequeño (foto o color+inicial). Devuelve HTML string.
function userAvatarSmall(name, size) {
  size = size || 14;
  const u = (typeof name === 'object') ? name : findUserByName(name);
  const label = u ? (u.displayName || u.name) : String(name || '');
  const initial = label ? label.charAt(0).toUpperCase() : '?';
  if (u && u.photo) {
    return `<span class="assignee-mini" style="width:${size}px;height:${size}px;font-size:${Math.floor(size*0.55)}px;background:center/cover no-repeat url(${u.photo});"></span>`;
  }
  const color = userColor(u || name);
  return `<span class="assignee-mini" style="width:${size}px;height:${size}px;font-size:${Math.floor(size*0.55)}px;background:${color}">${bbEscape(initial)}</span>`;
}

// Devuelve el array de usuarios en formato OBJETO (siempre).
// Migra automáticamente arrays de strings al pasar.
function getValidUsers() {
  ensureUsersAsObjects();
  return state.users;
}

// Devuelve un array de NOMBRES para retrocompatibilidad con código viejo
function getValidUserNames() {
  return getValidUsers().map(u => u.name);
}

// Encuentra un usuario por su name (identificador interno)
function findUserByName(name) {
  if (!name) return null;
  return getValidUsers().find(u => u.name === name) || null;
}

// Migración: convierte state.users de array de strings a array de objetos.
// Es idempotente — se puede llamar muchas veces sin efecto adverso.
function ensureUsersAsObjects() {
  if (!Array.isArray(state.users)) {
    state.users = [];
  }
  let changed = false;
  state.users = state.users.map((u, idx) => {
    if (typeof u === 'string') {
      changed = true;
      return {
        id: 'usr_' + u.toLowerCase().replace(/[^a-z0-9]/g,'') + '_' + Date.now().toString(36).slice(-4),
        name: u,
        displayName: u,
        role: idx === 0 ? 'admin' : 'editor', // el primero queda como admin
        color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
        photo: null,
        createdAt: Date.now()
      };
    }
    // Si ya es objeto pero le faltan campos nuevos, completar defaults
    if (typeof u === 'object' && u !== null) {
      let touched = false;
      if (!u.id) { u.id = 'usr_' + (u.name||'').toLowerCase().replace(/[^a-z0-9]/g,'') + '_' + Date.now().toString(36).slice(-4); touched = true; }
      if (!u.displayName) { u.displayName = u.name; touched = true; }
      if (!u.role) { u.role = idx === 0 ? 'admin' : 'editor'; touched = true; }
      if (!u.color) { u.color = AVATAR_COLORS[idx % AVATAR_COLORS.length]; touched = true; }
      if (u.photo === undefined) { u.photo = null; touched = true; }
      if (!u.createdAt) { u.createdAt = Date.now(); touched = true; }
      if (touched) changed = true;
    }
    return u;
  });
  // Garantizar al menos un admin o maintenance (que tenga permisos suficientes para administrar)
  if (state.users.length > 0 && !state.users.some(u => u.role === 'admin' || u.role === 'maintenance')) {
    state.users[0].role = 'admin';
    changed = true;
  }
  return changed;
}

function showLogin() {
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  // sync login-side branding
  document.getElementById('login-logo-img').src = state.branding.logo;
  document.getElementById('login-logo-img').className = state.branding.logoInvert ? 'invert' : '';
  document.getElementById('login-name').textContent = state.branding.name;
  document.getElementById('login-subtitle').textContent = state.branding.subtitle;
  document.getElementById('login-year').textContent = state.branding.year;
  refreshLoginSelect();
  setTimeout(() => document.getElementById('login-user').focus(), 100);
}

function showApp(userName) {
  ensureUsersAsObjects();
  const user = findUserByName(userName);
  if (!user) { showLogin(); return; }

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  // Mostrar displayName y avatar con color/foto
  document.getElementById('user-name-label').textContent = user.displayName || user.name;
  applyUserAvatar(user);
  // SAFETY: close any modal that might have been saved open in the HTML
  document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  // Load per-user nav prefs now that we know who's logged in
  loadUserPrefs();
  // ALWAYS start on Dashboard after login (not where the user was last time)
  userPrefs.activeTabId = 'dashboard';
  // Also turn off edit mode on login (safer default)
  userPrefs.editMode = false;
  saveUserPrefs();
  // Strip any legacy view-state coming from shared state and migrate per-tab layouts
  if (stripViewStateFromShared()) { saveState(); saveUserPrefs(); }
  // Reparación automática: celdas con fecha de un año almacenadas en cellsByYear[otro_año]
  repairCellsByDate(true);
  // Detectar pestañas tipo "table" con columnas que son años — probablemente se quería annual
  detectMisbuiltAnnualTabs();
  // Aplicar restricciones del rol a la UI
  applyRoleRestrictions();
  applyBranding();
  renderTabs();
  renderContent();
  // Actualizar el offset sticky de la barra de pestañas (top = altura del header)
  updateStickyOffsets();
  // Cargar notificaciones persistentes de esta usuaria
  loadMyNotifInbox();
  document.body.classList.remove('edit-mode');
  const editBtn = document.getElementById('edit-toggle-btn');
  if (editBtn) {
    editBtn.classList.remove('active');
    const labelEl = editBtn.querySelector('.hmi-label');
    const iconEl = editBtn.querySelector('.hmi-icon');
    if (labelEl && iconEl) {
      iconEl.textContent = '✎';
      labelEl.textContent = 'Editar';
    } else {
      editBtn.textContent = '✎ Editar';
    }
  }
  const menuBtn = document.getElementById('header-menu-btn');
  if (menuBtn) menuBtn.classList.remove('has-active');
  startNotificationChecker();
  // Sesión 6: renderizar paneles del header (presencia, audit, etc.)
  if (typeof renderHeaderPanels === 'function') renderHeaderPanels();
}

// Aplica la foto o color al div del avatar del usuario logueado
function applyUserAvatar(user) {
  const av = document.getElementById('user-avatar');
  if (!av) return;
  if (user.photo) {
    av.style.backgroundImage = `url(${user.photo})`;
    av.style.backgroundSize = 'cover';
    av.style.backgroundPosition = 'center';
    av.textContent = '';
    av.style.background = `center/cover no-repeat url(${user.photo})`;
  } else {
    av.style.backgroundImage = '';
    av.style.background = userColor(user);
    av.textContent = (user.displayName || user.name).charAt(0).toUpperCase();
    av.style.color = '#fff';
  }
}

// Aplica restricciones visuales según el rol (viewer no ve botón "Editar")
function applyRoleRestrictions() {
  const u = currentUser();
  if (!u) return;
  document.body.setAttribute('data-role', u.role);
  // viewer: ocultar el botón de modo edición del menú ⋯
  const editBtn = document.getElementById('edit-toggle-btn');
  if (editBtn) editBtn.style.display = (u.role === 'viewer') ? 'none' : '';
  // Ocultar items admin-only si no soy admin
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = (u.role === 'admin') ? '' : 'none';
  });
  // Mostrar banner de mantenimiento si la sesión actual es de mantenimiento
  applyMaintenanceBanner();
}

// Muestra/oculta el banner naranja de modo mantenimiento
function applyMaintenanceBanner() {
  const banner = document.getElementById('maintenance-banner');
  if (!banner) return;
  const isMaint = sessionStorage.getItem('wm_maintenance_mode') === '1';
  if (isMaint) {
    const userName = sessionStorage.getItem('wm_maintenance_user') || '?';
    document.getElementById('maint-user-name').textContent = userName;
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
  // Recalcular offset sticky del header (el banner empuja todo hacia abajo)
  if (typeof updateStickyOffsets === 'function') updateStickyOffsets();
}

// Salir del modo mantenimiento → cierra sesión
function exitMaintenanceMode() {
  if (!confirm('¿Salir del modo mantenimiento? Esto te va a cerrar sesión.')) return;
  sessionStorage.removeItem('wm_maintenance_mode');
  sessionStorage.removeItem('wm_maintenance_user');
  logAudit('logout', 'session', '🔧 Salió del modo mantenimiento', null, null);
  saveState();
  // Limpiar sesión normal
  if (typeof stopPresence === 'function') stopPresence();
  if (typeof stopChat === 'function') stopChat();
  setSession('');
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('login-screen').style.display = '';
  toast('🔧 Modo mantenimiento finalizado');
}

// ============ USER MANAGEMENT (Sesión 4) ============
function openManageUsers() {
  ensureUsersAsObjects();
  renderUsersList();
  document.getElementById('modal-manage-users').classList.add('open');
}

function renderUsersList() {
  ensureUsersAsObjects();
  const users = state.users;
  const el = document.getElementById('users-list');
  if (!el) return;
  const me = currentUser();
  const canManage = !me || isAdmin(); // si nadie logueado (gestión pre-login) o admin

  el.innerHTML = users.map((u,i) => {
    const isMe = me && me.name === u.name;
    const av = u.photo
      ? `<span class="users-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="users-avatar" style="background:${userColor(u)};color:#fff;">${(u.displayName||u.name).charAt(0).toUpperCase()}</span>`;
    const rolePill = `<span class="role-pill role-${u.role}">${ROLE_ICONS[u.role]||''} ${ROLE_LABELS[u.role]||u.role}</span>`;
    return `
    <div class="users-list-item">
      ${av}
      <div class="users-info">
        <div class="users-name">${bbEscape(u.displayName || u.name)} ${isMe?'<span class="users-me-tag">vos</span>':''}</div>
        <div class="users-sub">${rolePill} <span class="users-id">@${bbEscape(u.name)}</span></div>
      </div>
      <div class="users-actions">
        ${canManage ? `<button onclick="openEditUser('${bbEscape(u.name)}')" title="Editar usuario">✎</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function showUsersManagedInFirebaseInfo() {
  alert('👥 Gestión de usuarios\n\n' +
    'Las cuentas de acceso se administran en Firebase Authentication (Console).\n\n' +
    'Desde esta app solo se editan datos de perfil interno (nombre visible, avatar y rol).\n\n' +
    'Ruta: console.firebase.google.com → Authentication → Usuarios.');
}

function addUser() {
  showUsersManagedInFirebaseInfo();
}

function removeUser(idx) {
  showUsersManagedInFirebaseInfo();
}

function refreshLoginSelect() {
  const sel = document.getElementById('login-user');
  if (!sel) return;
  const users = getValidUsers();
  sel.innerHTML = '<option value="">— Seleccionar usuario —</option>' +
    users.map(u => `<option value="${bbEscape(u.name)}">${bbEscape(u.displayName || u.name)}</option>`).join('');
}

// ============ EDITAR USUARIO (Sesión 4) ============
let _editingUserName = null;

// Atajo: editar el perfil propio (desde el menú ⋯)
function openEditMyProfile() {
  const me = currentUser();
  if (!me) { toast('Iniciá sesión primero'); return; }
  openEditUser(me.name);
}

function openEditUser(userName) {
  ensureUsersAsObjects();
  const u = findUserByName(userName);
  if (!u) return;
  const me = currentUser();
  const canEditAll = isAdmin();
  const isMe = me && me.name === u.name;
  if (!canEditAll && !isMe) { toast('⛔ Sin permiso'); return; }

  _editingUserName = userName;
  document.getElementById('edit-user-title').textContent = 'Editar ' + (u.displayName || u.name);
  document.getElementById('edit-user-displayname').value = u.displayName || u.name;
  document.getElementById('edit-user-name-internal').textContent = u.name;
  document.getElementById('edit-user-role').value = u.role || 'editor';
  document.getElementById('edit-user-role').disabled = !canEditAll || (isMe && u.role === 'admin' && state.users.filter(x => x.role === 'admin').length <= 1);
  // Paleta de colores
  const palette = document.getElementById('edit-user-colors');
  palette.innerHTML = AVATAR_COLORS.map(c => `
    <span class="color-swatch${(u.color||'')===c?' selected':''}" data-color="${c}" style="background:${c}" onclick="selectUserColor('${c}')"></span>
  `).join('');
  // Preview avatar
  updateUserAvatarPreview();
  // Toggle: mostrar/ocultar opciones admin
  document.getElementById('edit-user-role-row').style.display = canEditAll ? 'flex' : 'none';
  document.getElementById('modal-edit-user').classList.add('open');
}

function selectUserColor(color) {
  const u = findUserByName(_editingUserName);
  if (!u) return;
  u._tempColor = color; // guardar temporalmente hasta confirmar
  document.querySelectorAll('#edit-user-colors .color-swatch').forEach(el => {
    el.classList.toggle('selected', el.getAttribute('data-color') === color);
  });
  updateUserAvatarPreview();
}

function updateUserAvatarPreview() {
  const u = findUserByName(_editingUserName);
  if (!u) return;
  const av = document.getElementById('edit-user-avatar-preview');
  if (!av) return;
  const color = u._tempColor || u.color || userColor(u);
  const photo = u._tempPhoto !== undefined ? u._tempPhoto : u.photo;
  const displayName = document.getElementById('edit-user-displayname').value.trim() || u.name;
  if (photo) {
    av.style.background = `center/cover no-repeat url(${photo})`;
    av.textContent = '';
  } else {
    av.style.background = color;
    av.textContent = displayName.charAt(0).toUpperCase();
    av.style.color = '#fff';
  }
}

function onEditUserPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) { toast('⚠ La foto no debe superar los 500 KB'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const u = findUserByName(_editingUserName);
    if (!u) return;
    u._tempPhoto = ev.target.result;
    updateUserAvatarPreview();
  };
  reader.readAsDataURL(file);
}

function removeEditUserPhoto() {
  const u = findUserByName(_editingUserName);
  if (!u) return;
  u._tempPhoto = null;
  updateUserAvatarPreview();
}

function saveEditUser() {
  ensureUsersAsObjects();
  const u = findUserByName(_editingUserName);
  if (!u) { toast('Usuario no encontrado'); return; }
  const me = currentUser();
  const canEditAll = isAdmin();
  const isMe = me && me.name === u.name;

  const oldDisplay = u.displayName;
  const oldRole = u.role;

  const newDisplay = document.getElementById('edit-user-displayname').value.trim();
  if (!newDisplay) { toast('El nombre visible no puede estar vacío'); return; }
  u.displayName = newDisplay;
  if (u._tempColor) u.color = u._tempColor;
  if (u._tempPhoto !== undefined) u.photo = u._tempPhoto;
  delete u._tempColor;
  delete u._tempPhoto;

  if (canEditAll) {
    const newRole = document.getElementById('edit-user-role').value;
    if (ROLES.includes(newRole)) {
      // No permitir quitar el rol al único admin
      if (u.role === 'admin' && newRole !== 'admin' && state.users.filter(x => x.role === 'admin').length <= 1) {
        toast('⛔ No se puede degradar al único administrador');
        return;
      }
      u.role = newRole;
    }
  }
  // Audit log
  if (oldDisplay !== u.displayName) {
    logAudit('rename', 'user', 'Renombró "' + oldDisplay + '" → "' + u.displayName + '"', oldDisplay, u.displayName);
  }
  if (oldRole !== u.role) {
    logAudit('update', 'user', 'Cambió rol de "' + (u.displayName || u.name) + '": ' + oldRole + ' → ' + u.role, oldRole, u.role);
  }
  saveState();
  // Si edité a mí misma, actualizar el header
  if (isMe) {
    document.getElementById('user-name-label').textContent = u.displayName || u.name;
    applyUserAvatar(u);
    applyRoleRestrictions();
  }
  renderUsersList();
  refreshLoginSelect();
  closeModal('modal-edit-user');
  toast('✓ Usuario actualizado');
}

// ============ CAMBIAR CONTRASEÑA (Sesión 4) ============

function openChangePassword() {
  const me = currentUser();
  if (!me) { toast('Iniciá sesión primero'); return; }
  document.getElementById('change-pwd-title').textContent = 'Cambiar mi contraseña';
  document.getElementById('change-pwd-sub').textContent = 'Ingresá tu contraseña actual y la nueva dos veces.';
  document.getElementById('change-pwd-current-row').style.display = 'block';
  document.getElementById('change-pwd-current').value = '';
  document.getElementById('change-pwd-new').value = '';
  document.getElementById('change-pwd-new2').value = '';
  document.getElementById('change-pwd-error').textContent = '';
  document.getElementById('change-pwd-cancel-btn').style.display = '';
  document.getElementById('modal-change-pwd').classList.add('open');
}

async function saveChangePassword() {
  const me = currentUser();
  if (!me) return;
  const errEl = document.getElementById('change-pwd-error');
  errEl.textContent = '';
  const newPwd = document.getElementById('change-pwd-new').value;
  const newPwd2 = document.getElementById('change-pwd-new2').value;
  if (!newPwd || newPwd.length < 6) { errEl.textContent = 'La contraseña debe tener al menos 6 caracteres'; return; }
  if (newPwd !== newPwd2) { errEl.textContent = '✕ Las contraseñas nuevas no coinciden'; return; }
  const fbUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
  if (!fbUser) { errEl.textContent = '✕ Sesión expirada. Cerrá sesión y volvé a entrar.'; return; }
  errEl.textContent = '⏳ Guardando…';
  try {
    const current = document.getElementById('change-pwd-current').value;
    if (!current) { errEl.textContent = 'Ingresá tu contraseña actual'; return; }
    const cred = firebase.auth.EmailAuthProvider.credential(fbUser.email, current);
    await fbUser.reauthenticateWithCredential(cred);
    await fbUser.updatePassword(newPwd);
    logAudit('password', 'password', 'Cambió su propia contraseña', null, null);
    saveState();
    closeModal('modal-change-pwd');
    toast('✓ Contraseña actualizada');
  } catch (e) {
    const code = e && e.code;
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      errEl.textContent = '✕ Contraseña actual incorrecta';
    } else if (code === 'auth/weak-password') {
      errEl.textContent = '✕ La contraseña es demasiado débil';
    } else if (code === 'auth/requires-recent-login') {
      errEl.textContent = '✕ Por seguridad, cerrá sesión, volvé a entrar y probá de nuevo';
    } else {
      errEl.textContent = '✕ No se pudo cambiar' + (code ? ' ('+code+')' : '');
    }
  }
}

function cancelChangePassword() {
  closeModal('modal-change-pwd');
}

// ============ RESET DE CONTRASEÑA POR ADMIN (Sesión 4) ============
function openResetUserPassword(userName) {
  if (!isAdmin()) { toast('⛔ Solo administradores'); return; }
  const u = findUserByName(userName);
  const quien = u ? (u.displayName || u.name) : userName;
  alert('🔐 Resetear la contraseña de ' + quien + '\n\n' +
    'Con la seguridad nueva, las contraseñas se administran desde Firebase:\n\n' +
    '1. Entrá a console.firebase.google.com → proyecto W Machado Contable\n' +
    '2. Menú Authentication → pestaña Usuarios\n' +
    '3. Buscá a ' + quien + ', tocá los 3 puntos ⋮ → "Restablecer contraseña" (o Editar)\n' +
    '4. Definí una contraseña provisoria y pasásela.\n\n' +
    'Esa persona entra con la provisoria y después la cambia desde "Cambiar contraseña".');
}

// ============ CÓDIGO MAESTRO DE EMERGENCIA (Sesión 4) ============
function openMasterCodeSettings() {
  if (!isAdmin()) { toast('⛔ Solo administradores'); return; }
  alert('🔑 Código maestro de emergencia\n\n' +
    'Esta función quedó desactivada al pasar a la autenticación real de Firebase ' +
    '(era una vía de acceso que cualquiera podía ver en el código).\n\n' +
    'Si alguien olvida su contraseña, una administradora la resetea desde ' +
    'console.firebase.google.com → Authentication → Usuarios.');
}

// ============ CALENDAR ============
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
let calDay = new Date().getDate();
let calView = 'month'; // 'day' | 'week' | 'month' | 'year'

function calViewLabel() {
  const d = new Date(calYear, calMonth, calDay);
  if (calView === 'day') {
    return d.toLocaleDateString('es', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  }
  if (calView === 'week') {
    const start = startOfWeek(d);
    const end = new Date(start); end.setDate(end.getDate() + 6);
    const sameMonth = start.getMonth() === end.getMonth();
    if (sameMonth) {
      return `${start.getDate()} – ${end.getDate()} de ${start.toLocaleString('es',{month:'long'})} ${start.getFullYear()}`;
    }
    return `${start.getDate()} ${start.toLocaleString('es',{month:'short'})} – ${end.getDate()} ${end.toLocaleString('es',{month:'short'})} ${end.getFullYear()}`;
  }
  if (calView === 'year') {
    return String(calYear);
  }
  return new Date(calYear, calMonth, 1).toLocaleString('es', {month:'long', year:'numeric'});
}

function startOfWeek(d) {
  // Semana arranca en domingo (0)
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  r.setDate(r.getDate() - r.getDay());
  return r;
}

function calPrev() {
  if (calView === 'day') {
    const d = new Date(calYear, calMonth, calDay); d.setDate(d.getDate()-1);
    calYear=d.getFullYear(); calMonth=d.getMonth(); calDay=d.getDate();
  } else if (calView === 'week') {
    const d = new Date(calYear, calMonth, calDay); d.setDate(d.getDate()-7);
    calYear=d.getFullYear(); calMonth=d.getMonth(); calDay=d.getDate();
  } else if (calView === 'year') {
    calYear--;
  } else {
    calMonth--; if (calMonth<0) { calMonth=11; calYear--; }
  }
  renderContent();
}
function calNext() {
  if (calView === 'day') {
    const d = new Date(calYear, calMonth, calDay); d.setDate(d.getDate()+1);
    calYear=d.getFullYear(); calMonth=d.getMonth(); calDay=d.getDate();
  } else if (calView === 'week') {
    const d = new Date(calYear, calMonth, calDay); d.setDate(d.getDate()+7);
    calYear=d.getFullYear(); calMonth=d.getMonth(); calDay=d.getDate();
  } else if (calView === 'year') {
    calYear++;
  } else {
    calMonth++; if (calMonth>11) { calMonth=0; calYear++; }
  }
  renderContent();
}
function calToday() {
  const t = new Date();
  calYear = t.getFullYear(); calMonth = t.getMonth(); calDay = t.getDate();
  renderContent();
}

function setCalView(v) {
  calView = v;
  renderContent();
}

function gotoDay(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  calYear = y; calMonth = m-1; calDay = d; calView = 'day';
  renderContent();
}

function renderCalendar() {
  const events = (state.calendarEvents || []);

  const viewBtns = ['day','week','month','year'].map(v => {
    const labels = {day:'Día', week:'Semana', month:'Mes', year:'Año'};
    return `<button class="${calView===v?'active':''}" onclick="setCalView('${v}')">${labels[v]}</button>`;
  }).join('');

  const title = calViewLabel();

  let html = `<div class="cal-wrap">
    <div class="cal-header">
      <div class="cal-nav">
        <button onclick="calPrev()" title="Anterior">◀</button>
        <div class="cal-month-title">${title.charAt(0).toUpperCase()+title.slice(1)}</div>
        <button onclick="calNext()" title="Siguiente">▶</button>
        <button onclick="calToday()">Hoy</button>
        <div class="cal-view-switcher" style="margin-left:8px;">${viewBtns}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <button class="btn btn-gold" onclick="openNewCalEvent()">+ Nuevo evento</button>
      </div>
    </div>`;

  if (calView === 'year')        html += renderCalYear(events);
  else if (calView === 'week')   html += renderCalWeek(events, false);
  else if (calView === 'day')    html += renderCalWeek(events, true);
  else                            html += renderCalMonth(events);

  // Lista "Próximos eventos" solo en vistas mes/año
  if (calView === 'month' || calView === 'year') {
    const todayStr = todayLocalStr();
    const upcoming = events.filter(e => e.date >= todayStr).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||'')).slice(0,12);
    if (upcoming.length) {
      html += `<div class="cal-sidebar"><div class="section-title" style="margin:24px 0 12px;">Próximos eventos</div>
      <div class="cal-event-list">`;
      upcoming.forEach(ev => {
        const d = new Date(ev.date+'T12:00:00');
        const label = d.toLocaleDateString('es',{weekday:'short',day:'numeric',month:'short'});
        const typeLabels = {tarea:'✅ Tarea',evento:'📅 Evento',vencimiento:'⚠️ Vencimiento',reunion:'🤝 Reunión'};
        const ass = normalizeAssignees(ev);
        const assPills = ass.map(u => `<span class="assignee-pill" style="background:${userColor(u)}">${bbEscape(userLabel(u).charAt(0).toUpperCase())} ${bbEscape(userLabel(u))}</span>`).join(' ');
        const doneClass = ev.done ? ' done' : '';
        html += `<div class="cal-event-card ${ev.type}${doneClass}" onclick="openEditCalEvent('${ev.id}')">
          <div class="ev-title">${ev.done?'✅ ':''}${ev.title}${ev.notify?' <span style="font-size:13px;opacity:.7;" title="Recordatorio activo">🔔</span>':''}</div>
          <div class="ev-meta">
            <span>📆 ${label}${ev.time?' · '+ev.time:''}</span>
            <span class="cal-event-pill ${ev.type}" style="margin:0;">${typeLabels[ev.type]||ev.type}</span>
            ${ass.length?'<span class="assignee-pill-wrap">'+assPills+'</span>':''}
          </div>
          ${ev.notes?`<div style="font-size:11px;color:var(--c-text-muted);margin-top:6px;">${escapeHtml(ev.notes)}</div>`:''}
        </div>`;
      });
      html += `</div></div>`;
    }
  }

  html += `</div>`;
  return html;
}

function escapeHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// -------- Vista Mes --------
function renderCalMonth(events) {
  const today = new Date();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const daysInPrev = new Date(calYear, calMonth, 0).getDate();
  const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

  let html = `<div class="cal-grid">`;
  DAY_NAMES.forEach(d => html += `<div class="cal-day-header">${d}</div>`);

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 0; i < totalCells; i++) {
    let day, month, year, isOther = false;
    if (i < firstDay) {
      day = daysInPrev - firstDay + i + 1;
      month = calMonth - 1; year = calYear;
      if (month < 0) { month = 11; year--; }
      isOther = true;
    } else if (i >= firstDay + daysInMonth) {
      day = i - firstDay - daysInMonth + 1;
      month = calMonth + 1; year = calYear;
      if (month > 11) { month = 0; year++; }
      isOther = true;
    } else {
      day = i - firstDay + 1;
      month = calMonth; year = calYear;
    }
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const dayEvents = events.filter(e => e.date === dateStr)
      .sort((a,b) => (a.time||'99:99').localeCompare(b.time||'99:99'));

    html += `<div class="cal-cell${isOther?' other-month':''}${isToday?' today':''}" ondblclick="gotoDay('${dateStr}')" onclick="openNewCalEventDate('${dateStr}')">
      <div class="cal-day-num">${day}</div>`;
    dayEvents.slice(0,4).forEach(ev => {
      const ass = normalizeAssignees(ev);
      const assText = ass.length ? ' → ' + ass.map(u => userLabel(u)).join(', ') : '';
      const avatars = ass.length ? ass.slice(0,3).map(u => userAvatarSmall(u, 14)).join('') : '';
      const doneCls = ev.done ? ' done' : '';
      const checkCls = ev.done ? 'ev-pill-check done' : 'ev-pill-check';
      html += `<div class="cal-event-pill ${ev.type}${doneCls}" onclick="event.stopPropagation();openEditCalEvent('${ev.id}')" title="${escapeHtml(ev.title)}${assText}">
        <span class="${checkCls}" onclick="event.stopPropagation();toggleEventDone('${ev.id}')" title="Marcar como ${ev.done?'pendiente':'completado'}"></span>
        <span class="ev-pill-text">${ev.time?ev.time+' ':''}${escapeHtml(ev.title)}${avatars?' '+avatars:''}${ev.notify?' 🔔':''}</span>
      </div>`;
    });
    if (dayEvents.length > 4) html += `<div style="font-size:10px;color:var(--c-text-muted);padding:2px 4px;cursor:pointer;" onclick="event.stopPropagation();gotoDay('${dateStr}')">+${dayEvents.length-4} más…</div>`;
    html += `<button class="cal-add-btn" onclick="event.stopPropagation();openNewCalEventDate('${dateStr}')">+</button>
    </div>`;
  }
  html += `</div>`;
  return html;
}

// -------- Vista Semana / Día --------
function renderCalWeek(events, singleDay) {
  const today = new Date();
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate();
  const cols = singleDay ? 1 : 7;
  const start = singleDay ? new Date(calYear, calMonth, calDay) : startOfWeek(new Date(calYear, calMonth, calDay));

  const days = [];
  for (let i = 0; i < cols; i++) {
    const d = new Date(start); d.setDate(start.getDate()+i);
    days.push(d);
  }
  const DAY_NAMES_FULL = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

  // Cabecera
  let html = `<div class="cal-week-wrap" style="--week-cols:${cols};">
    <div class="cal-week-header">
      <div></div>`;
  days.forEach(d => {
    const isToday = d.getFullYear()===todayY && d.getMonth()===todayM && d.getDate()===todayD;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    html += `<div onclick="gotoDay('${dateStr}')" style="cursor:pointer;">
      <div>${DAY_NAMES_FULL[d.getDay()].slice(0,3)}</div>
      <div class="cal-week-daynum ${isToday?'cal-week-day-today':''}">${d.getDate()}</div>
    </div>`;
  });
  html += `</div>`;

  // Fila de todo el día
  html += `<div class="cal-week-allday">
    <div class="cal-time-label">Todo<br>el día</div>`;
  days.forEach(d => {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const allDayEvents = events.filter(e => e.date === dateStr && !e.time);
    html += `<div class="cal-allday-cell" onclick="openNewCalEventDate('${dateStr}')">`;
    allDayEvents.forEach(ev => {
      html += renderWeekEventInline(ev);
    });
    html += `</div>`;
  });
  html += `</div>`;

  // Cuerpo con horas
  html += `<div class="cal-week-body">
    <div class="cal-time-col">`;
  for (let h = 0; h < 24; h++) {
    html += `<div class="cal-time-slot">${String(h).padStart(2,'0')}:00</div>`;
  }
  html += `</div>`;

  days.forEach(d => {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const timedEvents = events.filter(e => e.date === dateStr && e.time);
    const isToday = d.getFullYear()===todayY && d.getMonth()===todayM && d.getDate()===todayD;

    html += `<div class="cal-day-col" data-date="${dateStr}">`;
    for (let h = 0; h < 24; h++) {
      html += `<div class="cal-hour-slot" onclick="openNewCalEventDateTime('${dateStr}','${String(h).padStart(2,'0')}:00')"></div>`;
    }
    // Eventos posicionados
    timedEvents.forEach(ev => {
      const [hh, mm] = (ev.time||'00:00').split(':').map(Number);
      const top = (hh * 42) + (mm/60 * 42);
      const height = 42; // 1h por defecto (no tenemos duración)
      const doneCls = ev.done ? ' done' : '';
      const checkCls = ev.done ? 'ev-week-check done' : 'ev-week-check';
      const ass = normalizeAssignees(ev);
      const assText = ass.length ? ' · ' + ass.join(', ') : '';
      html += `<div class="cal-week-event ${ev.type}${doneCls}" style="top:${top}px;height:${height}px;min-height:24px;" onclick="event.stopPropagation();openEditCalEvent('${ev.id}')" title="${escapeHtml(ev.title)}${assText}">
        <span class="${checkCls}" onclick="event.stopPropagation();toggleEventDone('${ev.id}')" title="Marcar como ${ev.done?'pendiente':'completado'}"></span><span class="ev-week-text">${ev.time} ${escapeHtml(ev.title)}${ev.notify?' 🔔':''}</span>
      </div>`;
    });

    // Línea "ahora"
    if (isToday) {
      const now = new Date();
      const nowTop = now.getHours()*42 + now.getMinutes()/60*42;
      html += `<div class="cal-now-line" style="top:${nowTop}px;"></div>`;
    }
    html += `</div>`;
  });
  html += `</div></div>`;

  // Scroll automático a la hora actual (o 8am si no es hoy)
  setTimeout(() => {
    const body = document.querySelector('.cal-week-body');
    if (body) {
      const hourTarget = (singleDay && days[0].getFullYear()===todayY && days[0].getMonth()===todayM && days[0].getDate()===todayD)
        ? today.getHours() : 8;
      const parent = body.parentElement;
      if (parent) parent.scrollTop = Math.max(0, hourTarget * 42 - 60);
    }
  }, 50);

  return html;
}

function renderWeekEventInline(ev) {
  const doneCls = ev.done ? ' done' : '';
  const checkCls = ev.done ? 'ev-pill-check done' : 'ev-pill-check';
  return `<div class="cal-event-pill ${ev.type}${doneCls}" onclick="event.stopPropagation();openEditCalEvent('${ev.id}')" title="${escapeHtml(ev.title)}">
    <span class="${checkCls}" onclick="event.stopPropagation();toggleEventDone('${ev.id}')"></span>
    <span class="ev-pill-text">${escapeHtml(ev.title)}${ev.notify?' 🔔':''}</span>
  </div>`;
}

// -------- Vista Año --------
function renderCalYear(events) {
  const today = new Date();
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate();
  const eventsByDate = {};
  events.forEach(e => { if (e.date) eventsByDate[e.date] = (eventsByDate[e.date]||0)+1; });

  const DOW = ['D','L','M','M','J','V','S'];
  let html = `<div class="cal-year-wrap">`;
  for (let m = 0; m < 12; m++) {
    const monthName = new Date(calYear, m, 1).toLocaleString('es', {month:'long'});
    const firstDay = new Date(calYear, m, 1).getDay();
    const daysInMonth = new Date(calYear, m+1, 0).getDate();
    html += `<div class="cal-year-month" onclick="calMonth=${m};calView='month';renderContent();">
      <h5>${monthName}</h5>
      <div class="cal-year-grid">`;
    DOW.forEach(dn => html += `<div class="ycell ydow">${dn}</div>`);
    for (let i = 0; i < firstDay; i++) html += `<div class="ycell"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calYear}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const has = eventsByDate[dateStr];
      const isToday = (calYear===todayY && m===todayM && d===todayD);
      const cls = ['ycell'];
      if (has) cls.push('has-event');
      if (isToday) cls.push('today');
      html += `<div class="${cls.join(' ')}" title="${dateStr}${has?' · '+has+' evento(s)':''}" onclick="event.stopPropagation();gotoDay('${dateStr}')">${d}</div>`;
    }
    html += `</div></div>`;
  }
  html += `</div>`;
  return html;
}

function initCalendarHandlers() { /* handlers already inline */ }

function openNewCalEventDateTime(dateStr, timeStr) {
  openNewCalEventDate(dateStr);
  document.getElementById('cal-event-time').value = timeStr;
}

function toggleEventDone(id) {
  const ev = (state.calendarEvents||[]).find(e=>e.id===id);
  if (!ev) return;
  ev.done = !ev.done;
  saveState();
  renderContent();
  toast(ev.done ? '✅ Marcado como completado' : '↩ Marcado como pendiente');
}

function openNewCalEvent() { openNewCalEventDate(todayLocalStr()); }

function openNewCalEventDate(dateStr) {
  document.getElementById('modal-cal-title').textContent = 'Nuevo evento';
  document.getElementById('cal-event-id').value = '';
  document.getElementById('cal-event-title').value = '';
  document.getElementById('cal-event-date').value = dateStr;
  document.getElementById('cal-event-time').value = '';
  document.getElementById('cal-event-type').value = 'tarea';
  document.getElementById('cal-event-notes').value = '';
  document.getElementById('cal-event-notify').checked = true;
  document.getElementById('cal-event-done').checked = false;
  document.getElementById('cal-delete-btn').style.display = 'none';
  refreshCalAssignedMulti([]);
  updateNotifPermissionStatus();
  document.getElementById('modal-cal-event').classList.add('open');
  setTimeout(() => document.getElementById('cal-event-title').focus(), 100);
}

function openEditCalEvent(id) {
  const ev = (state.calendarEvents||[]).find(e=>e.id===id);
  if (!ev) return;
  document.getElementById('modal-cal-title').textContent = 'Editar evento';
  document.getElementById('cal-event-id').value = ev.id;
  document.getElementById('cal-event-title').value = ev.title;
  document.getElementById('cal-event-date').value = ev.date;
  document.getElementById('cal-event-time').value = ev.time||'';
  document.getElementById('cal-event-type').value = ev.type;
  document.getElementById('cal-event-notes').value = ev.notes||'';
  document.getElementById('cal-event-notify').checked = ev.notify !== false;
  document.getElementById('cal-event-done').checked = !!ev.done;
  document.getElementById('cal-delete-btn').style.display = 'inline-block';
  // Backward compat: single 'assignedTo' string → array
  let assignees = ev.assignedTo;
  if (typeof assignees === 'string') assignees = assignees ? [assignees] : [];
  refreshCalAssignedMulti(assignees || []);
  updateNotifPermissionStatus();
  document.getElementById('modal-cal-event').classList.add('open');
}

function refreshCalAssignedMulti(selected) {
  const container = document.getElementById('cal-event-assigned-multi');
  if (!container) return;
  const users = getValidUsers(); // ahora son objetos
  if (!users.length) { container.innerHTML = '<div style="color:var(--c-text-muted);font-size:12px;font-style:italic;">No hay usuarios configurados</div>'; return; }
  container.innerHTML = users.map(u => {
    const label = u.displayName || u.name;
    const initial = label.charAt(0).toUpperCase();
    const av = u.photo
      ? `<span class="assignee-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="assignee-avatar" style="background:${userColor(u)};color:#fff;">${initial}</span>`;
    return `
    <label class="assignee-chk">
      <input type="checkbox" value="${bbEscape(u.name)}"${selected.includes(u.name)?' checked':''}>
      <span class="assignee-chk-label">
        ${av}
        ${bbEscape(label)}
      </span>
    </label>`;
  }).join('');
}

function getSelectedAssignees() {
  const container = document.getElementById('cal-event-assigned-multi');
  if (!container) return [];
  return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
}

function updateNotifPermissionStatus() {
  const el = document.getElementById('notif-permission-status');
  if (!el || !('Notification' in window)) {
    if (el) el.innerHTML = '<em style="color:var(--c-red);">Tu navegador no soporta notificaciones.</em>';
    return;
  }
  if (Notification.permission === 'granted') el.innerHTML = '<em style="color:var(--c-green);">✓ Notificaciones activadas</em>';
  else if (Notification.permission === 'denied') el.innerHTML = '<em style="color:var(--c-red);">⚠ Bloqueadas. Activalas en el candado del navegador.</em>';
  else el.innerHTML = '<a href="#" onclick="event.preventDefault();askNotifPermission()" style="color:var(--c-accent);font-weight:700;">→ Activar notificaciones</a>';
}

function askNotifPermission() {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(() => { updateNotifPermissionStatus(); });
}

function saveCalEvent() {
  const title = document.getElementById('cal-event-title').value.trim();
  if (!title) { toast('Ingresá un título'); return; }
  const id = document.getElementById('cal-event-id').value || 'ev_' + Date.now();
  const ev = {
    id,
    title,
    date: document.getElementById('cal-event-date').value,
    time: document.getElementById('cal-event-time').value,
    type: document.getElementById('cal-event-type').value,
    assignedTo: getSelectedAssignees(), // now an array
    notify: document.getElementById('cal-event-notify').checked,
    done: document.getElementById('cal-event-done').checked,
    notes: document.getElementById('cal-event-notes').value.trim()
  };
  if (!state.calendarEvents) state.calendarEvents = [];
  const idx = state.calendarEvents.findIndex(e=>e.id===id);
  const isNew = idx < 0;
  if (idx >= 0) state.calendarEvents[idx] = ev;
  else state.calendarEvents.push(ev);
  saveState();
  closeModal('modal-cal-event');
  renderContent();
  toast(idx >= 0 ? 'Evento actualizado' : 'Evento agregado');
  // Sesión 8: si es nuevo y tengo asignadas, no me notifico a mí pero las demás se enterarán al sincronizar
  if (isNew && typeof fireNotification === 'function') {
    const me = currentUser();
    const assignees = Array.isArray(ev.assignedTo) ? ev.assignedTo : [];
    // Si yo estoy entre las asignadas y NO fui quien lo creó (raro pero posible vía Firebase), notificar.
    // Como soy quien crea, mejor no notificarme. Pero igual dejamos hook para Firebase sync.
    if (assignees.includes(me?.name) && false) {  // skip self
      fireNotification('event', 'Nuevo evento: ' + ev.title, ev.date + (ev.time ? ' ' + ev.time : ''), { link: { type:'tab', tabId:'calendario' } });
    }
  }
  // Ensure notification check is running
  startNotificationChecker();
}

function deleteCalEvent() {
  const id = document.getElementById('cal-event-id').value;
  if (!id || !confirm('¿Eliminar este evento?')) return;
  state.calendarEvents = (state.calendarEvents||[]).filter(e=>e.id!==id);
  saveState();
  closeModal('modal-cal-event');
  renderContent();
  toast('Evento eliminado');
}

// Backward compat: assignedTo could be string (old) or array (new)
function normalizeAssignees(ev) {
  if (!ev) return [];
  const a = ev.assignedTo;
  if (Array.isArray(a)) return a.filter(Boolean);
  if (typeof a === 'string' && a) return [a];
  return [];
}

// ============ SUELDOS ============
// Sueldos workflow states (status)
const SUELDO_STATES = [
  { key:'pendiente', label:'Pendiente', icon:'○', color:'#888', bg:'#f0eee8' },
  { key:'proceso',   label:'En proceso', icon:'⏳', color:'#d4860a', bg:'#fef8e8' },
  { key:'pronto',    label:'Pronto',     icon:'✓', color:'#2e7d52', bg:'#e8f5ee' },
  { key:'enviado',   label:'Enviado',    icon:'✈', color:'#1a4a7a', bg:'#e8f0f8' },
  { key:'finalizado',label:'Finalizado', icon:'★', color:'#5b2c6f', bg:'#ebdef0' }
];

function getSueldoStateInfo(key) {
  return SUELDO_STATES.find(s => s.key === key) || SUELDO_STATES[0];
}

function getCurrentSueldosMonth() {
  if (userPrefs.sueldosMonth) return userPrefs.sueldosMonth;
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}

function ensureSueldosMonth(ym) {
  if (!state.sueldos) state.sueldos = {};
  if (!state.sueldos[ym]) {
    state.sueldos[ym] = { sueldos: [], sd: [], reliq: [] };
    saveState();
  }
}

function setSueldosMonth(ym) {
  userPrefs.sueldosMonth = ym;
  saveUserPrefs();
  ensureSueldosMonth(ym);
  renderContent();
}

function setSueldosSubtab(name) {
  userPrefs.sueldosSubtab = name;
  saveUserPrefs();
  renderContent();
}

function renderSueldos() {
  const ym = getCurrentSueldosMonth();
  ensureSueldosMonth(ym);
  const monthData = state.sueldos[ym];
  const subtab = userPrefs.sueldosSubtab || 'sueldos';
  const search = (userPrefs.sueldosSearch || '').toLowerCase();
  const cols = state.sueldosColumns || [];

  const [y, m] = ym.split('-');
  const monthLabel = MONTHS[parseInt(m)-1] + ' ' + y;

  // Build month/year options
  const yearOpts = [];
  for (let yy = 2024; yy <= 2030; yy++) yearOpts.push(yy);
  const monthOpts = MONTHS.map((mn,i) => ({ val: String(i+1).padStart(2,'0'), label: mn }));
  const curYear = parseInt(y);
  const curMonth = m;

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">💼 Sueldos <span>${monthLabel}</span></div>
        <div style="font-size:12px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;">Coordinación mensual de trabajos</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select id="sueldos-month-sel" style="padding:8px 12px;border:1px solid var(--c-border);background:var(--c-card);border-radius:2px;font-family:inherit;font-size:13px;font-weight:700;color:var(--c-text);cursor:pointer;">
          ${monthOpts.map(o => `<option value="${o.val}"${o.val===curMonth?' selected':''}>${o.label}</option>`).join('')}
        </select>
        <select id="sueldos-year-sel" style="padding:8px 12px;border:1px solid var(--c-border);background:var(--c-card);border-radius:2px;font-family:inherit;font-size:13px;font-weight:700;color:var(--c-text);cursor:pointer;">
          ${yearOpts.map(yy => `<option value="${yy}"${yy===curYear?' selected':''}>${yy}</option>`).join('')}
        </select>
        <button class="btn btn-outline" onclick="copySueldosFromPreviousMonth()" title="Copiar listado y observaciones del mes anterior"><span style="font-size:14px;">⎘</span> Copiar mes anterior</button>
      </div>
    </div>

    <div class="sueldos-subtabs">
      <button class="sueldos-subtab${subtab==='sueldos'?' active':''}" onclick="setSueldosSubtab('sueldos')">Sueldos <span class="sueldos-subtab-count">${monthData.sueldos.length}</span></button>
      <button class="sueldos-subtab${subtab==='sd'?' active':''}" onclick="setSueldosSubtab('sd')">Servicios Domésticos <span class="sueldos-subtab-count">${monthData.sd.length}</span></button>
      <button class="sueldos-subtab${subtab==='reliq'?' active':''}" onclick="setSueldosSubtab('reliq')">Reliquidaciones <span class="sueldos-subtab-count">${(monthData.reliq||[]).length}</span></button>
    </div>

    <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
      <input id="sueldos-search-input" placeholder="Buscar empresa..." value="${search}" style="flex:1;min-width:200px;max-width:380px;padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);">
      <div class="sueldos-legend">
        ${SUELDO_STATES.map(s => `<span class="sueldos-legend-item"><span class="sueldos-status-dot" style="background:${s.color}"></span>${s.label}</span>`).join('')}
      </div>
      <button class="btn btn-gold" onclick="openAddSueldoRow()">+ Agregar fila</button>
    </div>`;

  // Stats bar — count items per state across active subtab
  const items = monthData[subtab] || [];
  const stateCounts = {};
  SUELDO_STATES.forEach(s => stateCounts[s.key] = 0);
  items.forEach(it => { const st = it.status || 'pendiente'; if (stateCounts[st] !== undefined) stateCounts[st]++; });
  html += `<div class="stats-bar">`;
  SUELDO_STATES.forEach(s => {
    html += `<div class="stat-card" style="border-left-color:${s.color};cursor:pointer;" onclick="filterSueldosByState('${s.key}')">
      <div class="stat-num">${stateCounts[s.key]}</div>
      <div class="stat-label">${s.label}</div>
    </div>`;
  });
  html += `</div>`;

  // Table
  const filteredItems = items
    .map((it, idx) => ({...it, _idx: idx}))
    .filter(it => !search || (it.name||'').toLowerCase().includes(search) || (it.observaciones||'').toLowerCase().includes(search) || (it.grupo||'').toLowerCase().includes(search));

  html += `<div class="table-wrap"><table class="sueldos-table"><thead><tr>
    <th style="text-align:left;width:180px;">Empresa</th>
    <th style="width:140px;">Estado</th>`;
  if (subtab === 'sueldos' || subtab === 'sd') {
    cols.forEach((c,ci) => {
      if (subtab === 'sd' && !['prontos','avisadoEnviado','fosmetal','bps'].includes(c.key)) return;
      html += `<th style="width:90px;"><span title="${c.label}">${c.label}</span></th>`;
    });
  } else {
    // reliq: simpler columns
    html += `<th style="width:120px;">Empleado/Concepto</th>`;
    html += `<th style="width:120px;">Importe</th>`;
  }
  html += `<th style="width:120px;">Grupo</th>
    <th style="text-align:left;min-width:200px;">Observaciones</th>
    <th style="width:50px;"></th>
  </tr></thead><tbody>`;

  if (filteredItems.length === 0) {
    const colspan = 5 + (subtab === 'sueldos' ? cols.length : (subtab === 'sd' ? 4 : 2));
    html += `<tr><td colspan="${colspan}" style="text-align:center;padding:32px;color:var(--c-text-muted);">No hay registros. ${search ? 'Probá con otra búsqueda o' : 'Hacé clic en'} <strong>+ Agregar fila</strong>.</td></tr>`;
  } else {
    filteredItems.forEach(item => {
      const stinfo = getSueldoStateInfo(item.status || 'pendiente');
      html += `<tr data-row-idx="${item._idx}">
        <td><strong>${item.name||'—'}</strong></td>
        <td>
          <select class="sueldos-status-select" onchange="changeSueldoStatus('${subtab}',${item._idx},this.value)" style="background:${stinfo.bg};color:${stinfo.color};">
            ${SUELDO_STATES.map(s => `<option value="${s.key}"${s.key===(item.status||'pendiente')?' selected':''}>${s.icon} ${s.label}</option>`).join('')}
          </select>
        </td>`;
      if (subtab === 'sueldos' || subtab === 'sd') {
        cols.forEach(c => {
          if (subtab === 'sd' && !['prontos','avisadoEnviado','fosmetal','bps'].includes(c.key)) return;
          const checked = item[c.key] ? 'checked' : '';
          const fl = (item.flagLabels || {})[c.key];
          const flText = fl ? (fl.t || (fl.d ? fmtDate(fl.d) : '')) : '';
          const flTextSafe = flText.replace(/</g,'&lt;').replace(/"/g,'&quot;');
          const flTitle = fl && fl.t && fl.d ? (flTextSafe + ' — ' + fmtDate(fl.d)) : flTextSafe;
          const chip = flText ? `<span class="sueldos-flag-chip" title="${flTitle} · Clic para editar" onclick="openSueldoFlagModal('${subtab}',${item._idx},'${c.key}')">${flTextSafe}</span>` : '';
          html += `<td style="text-align:center;"><div class="sueldos-flag-cell"><label class="sueldos-check-wrap"><input type="checkbox" class="sueldos-check" ${checked} onchange="toggleSueldoFlag('${subtab}',${item._idx},'${c.key}',this.checked)"><span class="sueldos-check-box"></span></label>${chip}<span class="sueldos-flag-edit" title="Agregar etiqueta o fecha en esta celda (como en Empresas)" onclick="openSueldoFlagModal('${subtab}',${item._idx},'${c.key}')">✎</span></div></td>`;
        });
      } else {
        html += `<td><input type="text" value="${(item.concepto||'').replace(/"/g,'&quot;')}" onblur="updateReliqField(${item._idx},'concepto',this.value)" style="width:100%;padding:5px 8px;border:1px solid var(--c-border);border-radius:3px;font-size:12px;"></td>`;
        html += `<td><input type="text" value="${(item.importe||'').replace(/"/g,'&quot;')}" onblur="updateReliqField(${item._idx},'importe',this.value)" style="width:100%;padding:5px 8px;border:1px solid var(--c-border);border-radius:3px;font-size:12px;font-family:monospace;"></td>`;
      }
      html += `<td><input type="text" value="${(item.grupo||'').replace(/"/g,'&quot;')}" onblur="updateSueldoField('${subtab}',${item._idx},'grupo',this.value)" placeholder="—" style="width:100%;padding:5px 8px;border:1px solid var(--c-border);border-radius:3px;font-size:12px;"></td>`;
      html += `<td><input type="text" value="${(item.observaciones||'').replace(/"/g,'&quot;')}" onblur="updateSueldoField('${subtab}',${item._idx},'observaciones',this.value)" placeholder="—" style="width:100%;padding:5px 8px;border:1px solid var(--c-border);border-radius:3px;font-size:12px;"></td>`;
      html += `<td><button class="sueldos-del-btn" onclick="removeSueldoRow('${subtab}',${item._idx})" aria-label="Eliminar fila">✕</button></td>`;
      html += `</tr>`;
      // Nota interna row (if any)
      if (item.notaInterna) {
        html += `<tr class="sueldos-nota-row"><td colspan="${5 + (subtab==='sueldos'?cols.length:(subtab==='sd'?4:2))}" style="background:#fef9e7;font-size:11px;color:#7d6608;padding:4px 14px;font-style:italic;border-left:3px solid #d4ac0d;">💬 Nota interna: ${item.notaInterna}</td></tr>`;
      }
    });
  }

  html += `</tbody></table></div>`;

  // Note at the bottom
  html += `<div style="margin-top:16px;font-size:11px;color:var(--c-text-muted);">
    Tip: cuando un sueldo queda en estado <strong style="color:var(--c-green)">Pronto</strong>, aparece en el Dashboard para que quien envía sepa qué empresas están listas.
  </div>`;

  return html;
}

function attachSueldosHandlers() {
  const m = document.getElementById('sueldos-month-sel');
  const y = document.getElementById('sueldos-year-sel');
  const trigger = () => {
    if (!m || !y) return;
    setSueldosMonth(y.value + '-' + m.value);
  };
  if (m) m.addEventListener('change', trigger);
  if (y) y.addEventListener('change', trigger);
  const s = document.getElementById('sueldos-search-input');
  if (s) {
    s.addEventListener('input', () => {
      userPrefs.sueldosSearch = s.value;
      saveUserPrefs();
      // Re-render but try to keep focus
      renderContent();
      const ns = document.getElementById('sueldos-search-input');
      if (ns) { ns.focus(); ns.setSelectionRange(ns.value.length, ns.value.length); }
    });
  }
}

function changeSueldoStatus(subtab, rowIdx, newStatus) {
  const ym = getCurrentSueldosMonth();
  if (!state.sueldos[ym]) return;
  const row = state.sueldos[ym][subtab][rowIdx];
  if (!row) return;
  row.status = newStatus;
  // Auto-set flags based on transitions (optional convenience)
  if (newStatus === 'pronto' && !row.prontos) row.prontos = true;
  if (newStatus === 'enviado') { row.prontos = true; row.avisadoEnviado = true; autoSetSueldoSentDate(row); }
  saveState();
  renderContent();
}

// Si se marca como enviado y no hay etiqueta/fecha cargada, registrar la fecha de hoy automáticamente
function autoSetSueldoSentDate(row) {
  if (!row.flagLabels) row.flagLabels = {};
  if (!row.flagLabels.avisadoEnviado) {
    row.flagLabels.avisadoEnviado = { d: new Date().toISOString().slice(0,10), auto: true };
  }
}

function toggleSueldoFlag(subtab, rowIdx, flagKey, checked) {
  const ym = getCurrentSueldosMonth();
  if (!state.sueldos[ym]) return;
  const row = state.sueldos[ym][subtab][rowIdx];
  if (!row) return;
  row[flagKey] = checked;
  // Convenience: if user manually checks "Prontos", set status to 'pronto' if it was 'pendiente'
  if (flagKey === 'prontos' && checked && (!row.status || row.status === 'pendiente')) row.status = 'pronto';
  if (flagKey === 'avisadoEnviado' && checked && row.status !== 'finalizado') row.status = 'enviado';
  // Fecha de envío automática al tildar Avisado/Enviado; si se destilda, borrar solo la automática
  if (flagKey === 'avisadoEnviado') {
    if (checked) autoSetSueldoSentDate(row);
    else if (row.flagLabels && row.flagLabels.avisadoEnviado && row.flagLabels.avisadoEnviado.auto && !row.flagLabels.avisadoEnviado.t) {
      delete row.flagLabels.avisadoEnviado;
    }
  }
  saveState();
  renderContent();
}

// ===== Etiqueta/fecha personalizada en celdas de Sueldos (estilo Empresas) =====
let _sueldoFlagCtx = null;
function openSueldoFlagModal(subtab, rowIdx, flagKey) {
  const ym = getCurrentSueldosMonth();
  const row = state.sueldos[ym] && state.sueldos[ym][subtab] ? state.sueldos[ym][subtab][rowIdx] : null;
  if (!row) return;
  _sueldoFlagCtx = { subtab, rowIdx, flagKey };
  const colDef = (state.sueldosColumns || []).find(c => c.key === flagKey);
  document.getElementById('sueldo-flag-row-name').textContent = row.name || '—';
  document.getElementById('sueldo-flag-col-name').textContent = (colDef ? colDef.label : flagKey) + ' · ' + ym;
  const fl = (row.flagLabels || {})[flagKey] || {};
  document.getElementById('sueldo-flag-label').value = fl.t || '';
  document.getElementById('sueldo-flag-date').value = fl.d || '';
  document.getElementById('modal-sueldo-flag').classList.add('open');
  setTimeout(() => document.getElementById('sueldo-flag-label').focus(), 100);
}

function saveSueldoFlagLabel() {
  if (!_sueldoFlagCtx) return;
  const { subtab, rowIdx, flagKey } = _sueldoFlagCtx;
  const ym = getCurrentSueldosMonth();
  const row = state.sueldos[ym] && state.sueldos[ym][subtab] ? state.sueldos[ym][subtab][rowIdx] : null;
  if (!row) return;
  const t = document.getElementById('sueldo-flag-label').value.trim();
  const d = document.getElementById('sueldo-flag-date').value;
  if (!row.flagLabels) row.flagLabels = {};
  if (!t && !d) {
    delete row.flagLabels[flagKey];
  } else {
    row.flagLabels[flagKey] = {};
    if (t) row.flagLabels[flagKey].t = t;
    if (d) row.flagLabels[flagKey].d = d;
  }
  saveState();
  closeModal('modal-sueldo-flag');
  _sueldoFlagCtx = null;
  renderContent();
}

function clearSueldoFlagLabel() {
  if (!_sueldoFlagCtx) return;
  const { subtab, rowIdx, flagKey } = _sueldoFlagCtx;
  const ym = getCurrentSueldosMonth();
  const row = state.sueldos[ym] && state.sueldos[ym][subtab] ? state.sueldos[ym][subtab][rowIdx] : null;
  if (row && row.flagLabels) delete row.flagLabels[flagKey];
  saveState();
  closeModal('modal-sueldo-flag');
  _sueldoFlagCtx = null;
  renderContent();
}

// Chip con la etiqueta/fecha de envío (celda Avisado/Enviado) — estilo Empresas, para el Dashboard
function sueldoSentChip(it) {
  const fl = (it.flagLabels || {}).avisadoEnviado;
  if (!fl) return '';
  const raw = fl.t || (fl.d ? fmtDate(fl.d) : '');
  if (!raw) return '';
  const txt = raw.replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const title = fl.t && fl.d ? (txt + ' — ' + fmtDate(fl.d)) : txt;
  return `<span class="cell-date-only" style="font-size:10px;padding:2px 7px;min-width:0;margin-left:4px;vertical-align:middle;" title="Enviado: ${title}">📤 ${txt}</span>`;
}

function updateSueldoField(subtab, rowIdx, field, value) {
  const ym = getCurrentSueldosMonth();
  if (!state.sueldos[ym]) return;
  const row = state.sueldos[ym][subtab][rowIdx];
  if (!row) return;
  if (row[field] === value) return;
  const oldValue = row[field];
  row[field] = value;
  saveState();
  // 🔔 Trigger: si se modifica el campo "observaciones" y hay contenido nuevo,
  // notificar a Lorena y crearle una tarea automática en Mi Dashboard
  if (field === 'observaciones' && value && value.trim() && value.trim() !== (oldValue||'').trim()) {
    triggerSueldoObservacionNotify(row, value.trim(), subtab);
  }
}

// Notificar a Lorena cuando se carga una observación en Sueldos
function triggerSueldoObservacionNotify(sueldoRow, observacion, subtab) {
  const targetUser = 'Lorena';
  // Verificar que la usuaria destino exista
  if (!findUserByName(targetUser)) return;
  const me = currentUser();
  // No auto-notificar a uno mismo
  if (me && me.name === targetUser) return;
  const empresaName = sueldoRow.name || '(sin nombre)';
  const ym = getCurrentSueldosMonth();
  const monthLabel = formatYearMonth(ym);
  const title = `📋 Observación en Sueldos`;
  const body = `${me ? me.name + ' agregó' : 'Se agregó'} una observación en "${empresaName}" (${monthLabel}): ${observacion.slice(0, 80)}${observacion.length > 80 ? '…' : ''}`;
  notifyUserByName(targetUser, 'cell_comment', title, body, { type:'tab', tabId:'sueldos' });
  // Crear tarea automática
  addTaskToUser(targetUser, `📋 Revisar observación en Sueldos · ${empresaName} (${monthLabel}): ${observacion.slice(0, 60)}${observacion.length > 60 ? '…' : ''}`, {
    origin: 'sueldos-observacion',
    empresa: empresaName,
    ym: ym,
    subtab: subtab
  });
}

// Formatear "2026-05" como "Mayo 2026"
function formatYearMonth(ym) {
  if (!ym || typeof ym !== 'string') return ym || '';
  const [y, m] = ym.split('-');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const idx = parseInt(m, 10) - 1;
  return (months[idx] || m) + ' ' + y;
}

function updateReliqField(rowIdx, field, value) {
  updateSueldoField('reliq', rowIdx, field, value);
}

function openAddSueldoRow() {
  const subtab = userPrefs.sueldosSubtab || 'sueldos';
  const labelMap = { sueldos: 'Empresa', sd: 'Empleado/Familia', reliq: 'Empresa o concepto' };
  const name = prompt(`Nombre de ${labelMap[subtab]||'fila'}:`);
  if (!name || !name.trim()) return;
  const ym = getCurrentSueldosMonth();
  ensureSueldosMonth(ym);
  if (!state.sueldos[ym][subtab]) state.sueldos[ym][subtab] = [];
  const newRow = { name: name.trim(), status: 'pendiente' };
  if (subtab === 'reliq') { newRow.concepto = ''; newRow.importe = ''; }
  state.sueldos[ym][subtab].push(newRow);
  saveState();
  renderContent();
  toast('Agregado: ' + name);
}

function removeSueldoRow(subtab, rowIdx) {
  const ym = getCurrentSueldosMonth();
  if (!state.sueldos[ym] || !state.sueldos[ym][subtab]) return;
  const row = state.sueldos[ym][subtab][rowIdx];
  if (!row) return;
  if (!confirm('¿Eliminar "' + row.name + '"?')) return;
  state.sueldos[ym][subtab].splice(rowIdx, 1);
  saveState();
  renderContent();
}

function copySueldosFromPreviousMonth() {
  const ym = getCurrentSueldosMonth();
  const [y, m] = ym.split('-').map(Number);
  let prevY = y, prevM = m - 1;
  if (prevM === 0) { prevM = 12; prevY--; }
  const prevYm = prevY + '-' + String(prevM).padStart(2,'0');
  if (!state.sueldos[prevYm]) {
    toast('No hay datos del mes anterior (' + prevYm + ')');
    return;
  }
  if (!confirm(`Esto copiará todas las filas y observaciones de ${prevYm} a ${ym}.\nLos estados volverán a "Pendiente", los checkboxes se desmarcarán y las etiquetas de celda se borrarán.\n¿Continuar?`)) return;
  const src = state.sueldos[prevYm];
  const dst = { sueldos: [], sd: [], reliq: [] };
  ['sueldos','sd','reliq'].forEach(k => {
    (src[k]||[]).forEach(r => {
      const copy = JSON.parse(JSON.stringify(r));
      // Reset flags
      copy.status = 'pendiente';
      ['prontos','avisadoEnviado','fosmetal','bps','contabilizado','controlFacturaBps','auditoria'].forEach(f => copy[f] = false);
      delete copy.flagLabels;
      dst[k].push(copy);
    });
  });
  state.sueldos[ym] = dst;
  saveState();
  renderContent();
  toast('Datos copiados desde ' + prevYm);
}

function filterSueldosByState(stateKey) {
  // Reuses the search box — just sets search to nothing and renderContent.
  // For now, just visual feedback via toast.
  toast('Filtro por estado próximamente. Usá el buscador.');
}

// ============ CLIENTES ============

function _loadScriptOnce(src) {
  return new Promise(function(resolve, reject) {
    var exists = Array.prototype.some.call(document.scripts, function(sc){ return sc.src === src; });
    if (exists && window.ExcelJS) return resolve();
    var el = document.createElement('script');
    el.src = src;
    el.onload = function(){ resolve(); };
    el.onerror = function(){ reject(new Error('load-failed')); };
    document.head.appendChild(el);
  });
}
var _XLSX_CDN = 'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';

function _fmtD(s){
  if (!s || typeof s !== 'string') return s || '';
  var m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? (m[3] + '/' + m[2]) : s;
}

// Construye una hoja con título, encabezado de color, cebra, congelado y filtros.
function buildStyledSheet(wb, name, title, headers, widths, rows, opts){
  opts = opts || {};
  var ws = wb.addWorksheet(name);
  var n = headers.length;
  for (var i=0;i<n;i++){ ws.getColumn(i+1).width = widths[i] || 14; }
  ws.mergeCells(1,1,1,n);
  var tc = ws.getCell(1,1);
  tc.value = title;
  tc.font = { name:'Calibri', bold:true, size:14, color:{argb:'FFFFFFFF'} };
  tc.fill = { type:'pattern', pattern:'solid', fgColor:{argb:'FF0A1626'} };
  tc.alignment = { vertical:'middle', horizontal:'left', indent:1 };
  ws.getRow(1).height = 30;
  for (var j=0;j<n;j++){
    var hc = ws.getCell(2, j+1);
    hc.value = headers[j];
    hc.font = { bold:true, color:{argb:'FFFFFFFF'}, size:11 };
    hc.fill = { type:'pattern', pattern:'solid', fgColor:{argb:'FF102030'} };
    hc.alignment = { vertical:'middle', horizontal:'left', wrapText:true };
  }
  ws.getRow(2).height = 22;
  for (var r=0;r<rows.length;r++){
    var er = ws.getRow(3 + r);
    for (var c=0;c<n;c++){
      var cell = er.getCell(c+1);
      cell.value = (rows[r][c]==null) ? '' : rows[r][c];
      cell.border = { bottom:{style:'thin', color:{argb:'FFE8EBEE'}} };
      var wrap = opts.wrapCols && opts.wrapCols.indexOf(c) >= 0;
      cell.alignment = { vertical:'top', wrapText: !!wrap };
      var fill = opts.cellFill ? opts.cellFill(r, c, rows[r][c]) : null;
      if (fill) cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb:fill} };
      else if ((3+r) % 2 === 1) cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb:'FFF6F7F9'} };
    }
  }
  ws.views = [{ state:'frozen', xSplit: (opts.freezeCols||0), ySplit: 2 }];
  ws.autoFilter = { from:{row:2, column:1}, to:{row:2, column:n} };
  return ws;
}

// ---------- CLIENTES ----------
// ---------- EMPRESAS / SV.PROFESIONALES (tablas mensuales) ----------
function _empCellText(cell){
  if (!cell) return '';
  var s = cell.s, out;
  if (s==='done') out = cell.d ? _fmtD(cell.d) : '✓';
  else if (s==='pending') out = 'Pendiente';
  else if (s==='na') out = 'N/A';
  else out = '';
  if (cell.t) out = (out ? out+' · ' : '') + cell.t;
  if (cell.es && cell.ed) out = (out ? out+' · ' : '') + 'Env ' + _fmtD(cell.ed);
  return out;
}
function _empStatusColor(s){
  if (s==='done') return 'FFDCF0E1';
  if (s==='pending') return 'FFFCF3D6';
  if (s==='na') return 'FFECEEF0';
  return null;
}
function _xlsxTablaSheet(wb, sheetName, tabId, titleName){
  var tab = (state.tabs||[]).find(function(t){ return t.id===tabId; });
  if (!tab) return;
  var cols = tab.columns || [];
  var year = tab.tabYear;
  var hasTag = !!tab.hasTag;
  var headers = ['Nombre'];
  if (hasTag) headers.push(tab.tagLabel || 'Tipo');
  cols.forEach(function(cn){ headers.push(cn); });
  var widths = [34]; if (hasTag) widths.push(14); cols.forEach(function(){ widths.push(15); });
  var firstMonth = hasTag ? 2 : 1;
  var statusMatrix = [];
  var rows = (tab.rows||[]).map(function(rw){
    var src = (rw.cellsByYear && year && rw.cellsByYear[year]) ? rw.cellsByYear[year] : (rw.cells || {});
    var line = [rw.name || ''];
    if (hasTag) line.push(rw.tag || '');
    var st = [];
    cols.forEach(function(cn,ci){ var cell = src[String(ci)]; line.push(_empCellText(cell)); st.push(cell ? cell.s : ''); });
    statusMatrix.push(st);
    return line;
  });
  var titleYear = year ? (' · ' + year) : '';
  buildStyledSheet(wb, sheetName, 'W. Machado — ' + titleName + titleYear, headers, widths, rows, {
    freezeCols: firstMonth,
    cellFill: function(r,c,v){
      if (c >= firstMonth){ return _empStatusColor(statusMatrix[r][c-firstMonth]); }
      return null;
    }
  });
}

// ---------- SUELDOS (Sueldos / Servicios Domésticos / Reliquidaciones) ----------
function _chk(v){ return v ? '✓' : ''; }
function _sueldoStatusColor(s){
  s = (s||'').toLowerCase();
  if (s==='finalizado') return 'FFE7DEF2';
  if (s==='enviado') return 'FFD9E8F5';
  if (s==='pronto') return 'FFDCF0E1';
  if (s==='en proceso' || s==='enproceso') return 'FFFCF3D6';
  if (s==='pendiente') return 'FFECEEF0';
  return null;
}
function _sortedSueldoMonths(){ return Object.keys(state.sueldos||{}).sort(); }
function _xlsxSueldosSheets(wb){
  var meses = _sortedSueldoMonths();
  // Sueldos + Servicios Domésticos comparten estructura
  var colsFull = [
    ['status','Estado'],['prontos','Prontos'],['avisadoEnviado','Avisado/Enviado'],['fosmetal','Fosmetal'],
    ['bps','BPS'],['contabilizado','Contabilizado'],['controlFacturaBps','Control Fact. BPS'],
    ['auditoria','Auditoría'],['grupo','Grupo'],['observaciones','Observaciones'],['notaInterna','Nota interna']
  ];
  function buildFull(sheetName, subKey, titleName){
    var headers = ['Mes','Empresa'].concat(colsFull.map(function(x){ return x[1]; }));
    var widths  = [10,30, 14,10,16,10,8,14,16,12,14,26,30];
    var rows = [];
    meses.forEach(function(mes){
      var lst = (state.sueldos[mes] && state.sueldos[mes][subKey]) || [];
      lst.forEach(function(r){
        var line = [mes, r.name || ''];
        colsFull.forEach(function(x){
          var k = x[0], v = r[k];
          if (k==='status') line.push(v || '');
          else if (typeof v === 'boolean') line.push(_chk(v));
          else line.push(v==null ? '' : String(v));
        });
        rows.push(line);
      });
    });
    if (!rows.length) return;
    buildStyledSheet(wb, sheetName, 'W. Machado — ' + titleName, headers, widths, rows, {
      wrapCols: [12,13],
      freezeCols: 2,
      cellFill: function(r,c,v){ if (c===2) return _sueldoStatusColor(v); return null; }
    });
  }
  buildFull('Sueldos', 'sueldos', 'Sueldos (todos los meses)');
  buildFull('Serv. Domésticos', 'sd', 'Servicios Domésticos');
  // Reliquidaciones (estructura distinta)
  var relRows = [];
  meses.forEach(function(mes){
    var lst = (state.sueldos[mes] && state.sueldos[mes].reliq) || [];
    lst.forEach(function(r){ relRows.push([mes, r.name||'', r.status||'', r.concepto||'', r.importe||'', r.observaciones||'']); });
  });
  if (relRows.length){
    buildStyledSheet(wb, 'Reliquidaciones', 'W. Machado — Reliquidaciones',
      ['Mes','Empresa','Estado','Concepto','Importe','Observaciones'], [10,30,14,26,14,30], relRows, {
      wrapCols: [3,5], freezeCols: 2,
      cellFill: function(r,c,v){ if (c===2) return _sueldoStatusColor(v); return null; }
    });
  }
}

function _xlsxDownload(wb, filename){
  return wb.xlsx.writeBuffer().then(function(buf){
    var blob = new Blob([buf], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 3000);
  });
}

function _honCellText(m){
  if (!m) return '';
  var amt = (m.sinIva !== undefined && m.sinIva !== '' && m.sinIva !== null) ? ('$ ' + Number(m.sinIva).toLocaleString('es-UY')) : '';
  var pago = m.fecha ? (_fmtD(m.fecha) + (m.medio ? ' ' + m.medio : '')) : '';
  if (amt && pago) return amt + ' · ' + pago;
  return amt || pago || '';
}
function _honCellColor(m){
  if (!m) return null;
  if (m.fecha) return 'FFDCF0E1';
  if (m.sinIva) return 'FFFCF3D6';
  return null;
}
function _xlsxHonorariosSheet(wb){
  var tab = (state.tabs||[]).find(function(t){ return t.type === 'honorarios'; });
  if (!tab || !tab.honData) return;
  // Respeto de privacidad: si es privada, solo la incluye Wendy (dueña) o una admin.
  try {
    if (tab.privacy === 'private_user') {
      var me = (typeof currentUser === 'function') ? currentUser() : null;
      var owners = tab.privateOwners || [];
      var isOwner = me && (owners.indexOf(me.name) >= 0 || (me.id && owners.indexOf(me.id) >= 0));
      if (!isOwner) return; // solo la dueña (Wendy) puede exportar honorarios, ni admins
    }
  } catch(e){}
  var MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  var headers = ['Cliente'].concat(MESES);
  var widths = [34]; MESES.forEach(function(){ widths.push(18); });
  var cli = tab.honData.clients || [];
  var statusMatrix = [];
  var rows = cli.map(function(c){
    var line = [c.name || ''];
    var st = [];
    var ms = c.months || [];
    for (var i=0;i<12;i++){ var m = ms[i]; line.push(_honCellText(m)); st.push(m); }
    statusMatrix.push(st);
    return line;
  });
  var year = tab.tabYear ? (' · ' + tab.tabYear) : '';
  buildStyledSheet(wb, 'Honorarios', 'W. Machado — Honorarios' + year, headers, widths, rows, {
    freezeCols: 1,
    cellFill: function(r,c,v){ if (c >= 1) return _honCellColor(statusMatrix[r][c-1]); return null; }
  });
}

async function exportAllXLSX(){
  toast('⏳ Generando Excel…');
  try { if (!window.ExcelJS) await _loadScriptOnce(_XLSX_CDN); }
  catch(e){ toast('✕ No se pudo cargar el generador de Excel (revisá internet)'); return; }
  var wb = new ExcelJS.Workbook(); wb.creator = 'W. Machado Estudio Contable';
  _xlsxClientesSheet(wb);
  _xlsxTablaSheet(wb, 'Empresas', 'empresas', 'Empresas');
  _xlsxTablaSheet(wb, 'Serv. Profesionales', 'sprof', 'Servicios Profesionales');
  _xlsxSueldosSheets(wb);
  _xlsxHonorariosSheet(wb);
  var fecha = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0,10);
  await _xlsxDownload(wb, 'W_Machado_Datos_' + fecha + '.xlsx');
  toast('✓ Excel generado (Clientes, Empresas, Sv.Prof., Sueldos, Honorarios)');
}


// ============ BOOT ============
(function boot() {
  applyBranding();
  showLogin(); // pantalla de acceso por defecto hasta confirmar la autenticacion
  if (typeof firebase === 'undefined' || !firebase.auth) { return; }
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  // Persistencia por pestaña: al cerrar la pestaña se cierra la sesion (como antes).
  try { firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION); } catch(e){}
  var _authCurrentName = null;
  firebase.auth().onAuthStateChanged(function(fbUser){
    if (fbUser) {
      var name = authEmailToName(fbUser.email);
      if (!name) { try{ firebase.auth().signOut(); }catch(e){} showLogin(); return; }
      if (_authCurrentName === name) return; // evita re-render en refresh de token
      _authCurrentName = name;
      initFirebase();        // recien ahora conectamos la nube (ya autenticadas)
      setSession(name);
      showApp(name);
      logAudit('login', 'session', 'Inició sesión', null, null);
      if (typeof startPresence === 'function') setTimeout(function(){ startPresence(); }, 800);
      if (typeof startChat === 'function') setTimeout(function(){ startChat(); }, 1000);
    } else {
      _authCurrentName = null;
      showLogin();
    }
  });
})();
