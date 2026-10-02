/*
 * ¿SE ESTÁ HACIENDO EL RESPALDO? (oct. 2026)
 * El respaldo lo hace todas las noches un script de Google en la cuenta wmachadocontable
 * (herramientas/respaldo-apps-script). Al terminar, anota en la base (nodo wm_respaldo) cuándo
 * se hizo. Acá la página lo lee:
 * - Configuración → tarjeta «Respaldo automático» con la fecha del último y su estado.
 * - Campanita (solo administradoras, una vez por día): si pasan 2 días sin respaldo o si falló.
 * (En julio/agosto 2026 el respaldo viejo se cortó en silencio y nadie se enteró por 44 días.)
 */
const RESP_DIAS_ALERTA = 2;
if (typeof NOTIF_TYPES !== 'undefined' && !NOTIF_TYPES.some(t => t.key === 'respaldo')) {
  NOTIF_TYPES.push({ key: 'respaldo', icon: '💾', label: 'Respaldo automático', desc: 'Aviso si el respaldo de todas las noches no se hizo (solo administradoras)' });
}
let _respEstado = null;   // { ultimo, ok, archivo, tamano, ultimoError, error } | { sinDatos } | { sinPermiso }

function respLeer() {
  if (typeof firebaseDB === 'undefined' || !firebaseDB) return Promise.resolve(null);
  return firebaseDB.ref('wm_respaldo').once('value')
    .then(s => { _respEstado = s.val() || { sinDatos: true }; return _respEstado; })
    .catch(e => { _respEstado = { sinPermiso: true, detalle: e && e.message }; return _respEstado; });
}
function respDias(iso) { if (!iso) return null; return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); }
function respFecha(iso) { const d = new Date(iso); return d.toLocaleDateString('es-UY') + ' ' + d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' }); }
// 'ok' | 'atrasado' | 'error' | 'sin-datos' | 'sin-permiso' | 'cargando'
function respSituacion(e) {
  if (!e) return 'cargando';
  if (e.sinPermiso) return 'sin-permiso';
  if (!e.ultimo) return e.ultimoError ? 'error' : 'sin-datos';
  if (e.ultimoError && e.ultimoError > e.ultimo) return 'error';
  return respDias(e.ultimo) >= RESP_DIAS_ALERTA ? 'atrasado' : 'ok';
}

function respaldoCfgCard() {
  const e = _respEstado, s = respSituacion(e);
  const txt = {
    'ok':          '✓ Al día. Último respaldo: <b>' + (e && e.ultimo ? respFecha(e.ultimo) : '') + '</b>',
    'atrasado':    '⚠ El último respaldo es del <b>' + (e && e.ultimo ? respFecha(e.ultimo) : '') + '</b> (hace ' + (e ? respDias(e.ultimo) : '') + ' días). Avisale a Wydan.',
    'error':       '⚠ La última vez <b>falló</b>' + (e && e.ultimoError ? ' (' + respFecha(e.ultimoError) + ')' : '') + ': ' + bbEscape((e && e.error) || '') + '. Avisale a Wydan.',
    'sin-datos':   'Todavía no hay registro del respaldo automático nuevo. Aparece después de la primera noche en que corra.',
    'sin-permiso': 'No se pudo leer el estado del respaldo (permisos de la base). Avisale a Wydan.',
    'cargando':    'Revisando…'
  }[s];
  return '<div class="settings-card resp-card resp-' + s + '"><h4>💾 Respaldo automático</h4>'
    + '<p class="resp-txt">' + txt + '</p>'
    + (e && e.archivo && s === 'ok' ? '<p class="resp-sub">Archivo: ' + bbEscape(e.archivo) + ' · en el Drive y el mail de wmachadocontable@gmail.com</p>' : '')
    + '<p class="resp-sub">Se hace todas las noches a las 23 h: un JSON (para restaurar) y un Excel (para leer), en Drive y por mail.</p>'
    + '<button class="btn btn-outline btn-sm" onclick="exportData()">⬇ Descargar un respaldo ahora</button></div>';
}
// La tarjeta va al final de Configuración.
if (typeof renderSettings === 'function') {
  const _renderSettings = renderSettings;
  renderSettings = function () {
    const h = _renderSettings.apply(this, arguments), i = h.lastIndexOf('</div>');
    if (!_respEstado) respLeer().then(() => { if (userPrefs.activeTabId === 'settings') renderContent(); });
    return i < 0 ? h + respaldoCfgCard() : h.slice(0, i) + respaldoCfgCard() + h.slice(i);
  };
}
// Al entrar: si es administradora y el respaldo está atrasado o falló, aviso (una vez por día).
function respAvisoDiario() {
  if (typeof isAdmin !== 'function' || !isAdmin()) return;
  respLeer().then(e => {
    const s = respSituacion(e); if (s !== 'atrasado' && s !== 'error') return;
    const yo = currentUser().name, hoy = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0, 10);
    if (!userPrefs.respAvisoDia) userPrefs.respAvisoDia = {};
    if (userPrefs.respAvisoDia[yo] === hoy) return;
    userPrefs.respAvisoDia[yo] = hoy; saveUserPrefs();
    fireNotification('respaldo', '💾 El respaldo automático no se está haciendo',
      s === 'error' ? 'La última vez falló: ' + (e.error || '') + '. Avisale a Wydan.'
                    : 'El último es del ' + respFecha(e.ultimo) + ' (hace ' + respDias(e.ultimo) + ' días). Avisale a Wydan.',
      { link: { type: 'tab', tabId: 'settings' } });
  });
}
if (typeof showApp === 'function') {
  const _showAppResp = showApp;
  showApp = function () { _showAppResp.apply(this, arguments); setTimeout(() => { try { respAvisoDiario(); } catch (e) { console.warn(e); } }, 4000); };
}
