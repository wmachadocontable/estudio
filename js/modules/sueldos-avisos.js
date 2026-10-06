/*
 * SUELDOS ↔ CAMPANITA (oct. 2026)
 *
 * 1) Avisos de Sueldos (tipo «Sueldos» en la configuración de la campanita):
 *    - Lorena marca «Liquidados» o «Emitida» → le avisa a quien envía esa empresa
 *      (si no tiene a nadie asignado, a las otras).
 *    - Se envió todo y faltan controles → le avisa a Lorena.
 *    - Le asignan «Envía» a alguien → se lo avisa.
 *    - Una vez por día, al entrar: «Tenés N envíos atrasados» (desde SLD_DIAS_ALERTA días).
 * 2) Campanita en vivo: cuando llegan cambios de la nube se actualiza la campanita de quien tiene
 *    la página abierta y aparece un aviso. (Antes solo se veían al volver a entrar, y al marcar
 *    una como leída se podía perder otra que hubiera llegado mientras tanto.)
 */
if (typeof NOTIF_TYPES !== 'undefined' && !NOTIF_TYPES.some(t => t.key === 'sueldos')) {
  NOTIF_TYPES.push({ key: 'sueldos', icon: '💼', label: 'Sueldos', desc: 'Recibos y facturas listos para enviar, envíos atrasados y controles' });
}
const SLD_LINK = { type: 'tab', tabId: 'sueldos' };

function sldAvisar(destinos, titulo, cuerpo) {
  const yo = sldYo();
  [...new Set(destinos)].filter(n => n && n !== yo && findUserByName(n))
    .forEach(n => notifyUserByName(n, 'sueldos', titulo, cuerpo, SLD_LINK));
}
function sldDonde(r, ym, sub) { return '«' + (r.name || '') + '» (' + formatYearMonth(ym) + (sub !== 'sueldos' ? ' · ' + sldSubNombre(sub) : '') + ')'; }

// Se llama desde sldTocar, después de marcar un paso.
function sldAvisarMarca(ym, sub, r, k, estadoAntes) {
  const yo = sldNombre(sldYo()) || 'Alguien';
  const g = Object.keys(SLD_GRUPOS).find(x => SLD_GRUPOS[x].hecho === k);
  if (g) {
    const G = SLD_GRUPOS[g], env = sldEnvia(r);
    const titulo = g === 'recibos' ? '📤 Recibos listos para enviar' : '📤 Factura BPS lista para enviar';
    const cuerpo = yo + ' ' + (g === 'recibos' ? 'liquidó los recibos' : 'emitió la factura BPS') + ' de ' + sldDonde(r, ym, sub) + '. '
      + (env ? 'Te toca enviar' + (g === 'recibos' ? 'los.' : 'la.') : 'No tiene a nadie asignado: lo puede enviar cualquiera.');
    sldAvisar(env ? [env] : SLD_ENVIAN, titulo, cuerpo);
    return;
  }
  // Se terminó de enviar todo y quedan controles → a Lorena.
  if (estadoAntes !== 'enviado' && sldEstado(r, sub) === 'enviado' && sldControlesDe(r, sub).length) {
    sldAvisar([SLD_LIQUIDA], '🔎 Controles pendientes', 'Ya se envió todo de ' + sldDonde(r, ym, sub) + '. Faltan los controles.');
  }
}
// Se llama desde sldSetEnvia.
function sldAvisarEnvia(ym, sub, id, quien, soloEste) {
  const r = sldFila(ym, sub, id); if (!r || !quien) return;
  sldAvisar([quien], '📌 Te asignaron un envío', sldNombre(sldYo()) + ' te asignó el envío de recibos y factura de «' + r.name + '» '
    + (soloEste ? 'para ' + formatYearMonth(ym) + '.' : 'desde ' + formatYearMonth(ym) + ' en adelante.'));
}

// Una vez por día: los envíos atrasados de cada una.
function sldAvisoDiario() {
  const yo = sldYo(); if (!yo || !state.sueldosV2) return;
  const hoy = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0, 10);
  if (!userPrefs.sldAvisoDia) userPrefs.sldAvisoDia = {};
  if (userPrefs.sldAvisoDia[yo] === hoy) return;
  const atrasados = sldTareasDe(yo).filter(t => t.tipo === 'enviar' && t.dias !== null && t.dias >= SLD_DIAS_ALERTA);
  userPrefs.sldAvisoDia[yo] = hoy; saveUserPrefs();
  if (!atrasados.length) return;
  fireNotification('sueldos', '⏰ Envíos atrasados en Sueldos',
    'Tenés ' + atrasados.length + (atrasados.length === 1 ? ' envío' : ' envíos') + ' de hace ' + SLD_DIAS_ALERTA + ' días o más: '
    + atrasados.slice(0, 3).map(t => t.nombre).join(', ') + (atrasados.length > 3 ? '…' : '') + '.', { link: SLD_LINK });
}

/* ===== Campanita en vivo ===== */
let _campanitaVistas = null;
function campanitaRefrescar() {
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  if (!me || !state.userNotifications || typeof _notifInbox === 'undefined') return;
  const lista = Array.isArray(state.userNotifications[me.name]) ? state.userNotifications[me.name] : [];
  const nuevas = _campanitaVistas ? lista.filter(n => !n.read && !_campanitaVistas.has(n.id)) : [];
  _campanitaVistas = new Set(lista.map(n => n.id));
  _notifInbox = lista.slice(0, NOTIF_INBOX_MAX);
  if (typeof updateNotifBadge === 'function') updateNotifBadge();
  const panel = document.getElementById('notif-panel');
  if (panel && panel.classList.contains('open') && typeof renderNotifInbox === 'function') renderNotifInbox();
  nuevas.slice(0, 2).forEach(n => toast('🔔 ' + n.title + (n.sentBy ? ' · ' + sldNombre(n.sentBy) : '')));
}
if (typeof registerStructureInitializer === 'function') {
  registerStructureInitializer('campanita-en-vivo', function () {
    try { campanitaRefrescar(); } catch (e) { console.warn('campanita', e); }
    return false;   // nunca fuerza un guardado
  });
}
// Al entrar: arrancar la campanita y, un rato después, el resumen del día.
if (typeof showApp === 'function') {
  const _showApp = showApp;
  showApp = function () {
    _showApp.apply(this, arguments);
    _campanitaVistas = null;
    setTimeout(() => { try { campanitaRefrescar(); sldAvisoDiario(); } catch (e) { console.warn(e); } }, 2500);
  };
}
