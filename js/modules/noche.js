/*
 * MODO NOCHE «MEDIANOCHE» (oct. 2026, pedido de la usuaria)
 *
 * De 20:00 a 8:00 toda la página pasa a modo noche (los colores están en css/noche.css); a las 8 vuelve
 * sola, aunque esté abierta. Cada una lo puede desactivar en el menú ⋯ («Modo noche»): queda en sus
 * preferencias (userPrefs.modoNoche = 'auto' | 'off'). La pantalla de ingreso no cambia.
 * Para probar de día: userPrefs.modoNoche = 'siempre' (no aparece en el menú).
 */
const NOCHE_DESDE = 20, NOCHE_HASTA = 8;
function nocheModo() { const v = userPrefs && userPrefs.modoNoche; return v === 'off' || v === 'siempre' ? v : 'auto'; }
function nocheEsHora(d) { const h = (d || new Date()).getHours(); return h >= NOCHE_DESDE || h < NOCHE_HASTA; }
function nocheActiva() { const m = nocheModo(); return m === 'siempre' || (m === 'auto' && nocheEsHora()); }
function nocheAplicar() {
  const on = nocheActiva();
  document.documentElement.classList.toggle('noche', on);
  if (document.body) document.body.classList.toggle('noche', on);
  nochePintarMenu();
}
function setModoNoche(v) {
  userPrefs.modoNoche = v; saveUserPrefs(); nocheAplicar();
  toast(v === 'off' ? '☀️ Modo noche desactivado' : '🌙 Modo noche automático: de 20:00 a 8:00');
}
// El botón en el menú ⋯ (alterna entre automático y desactivado).
function nochePintarMenu() {
  const menu = document.getElementById('header-menu-dropdown'); if (!menu) return;
  let b = document.getElementById('noche-menu-item');
  if (!b) {
    b = document.createElement('button');
    b.id = 'noche-menu-item'; b.className = 'header-menu-item'; b.setAttribute('role', 'menuitem');
    b.onclick = () => { setModoNoche(nocheModo() === 'off' ? 'auto' : 'off'); if (typeof closeHeaderMenu === 'function') closeHeaderMenu(); };
    menu.appendChild(b);
  }
  const off = nocheModo() === 'off';
  b.innerHTML = '<span class="hmi-icon">' + (off ? '☀️' : '🌙') + '</span><span class="hmi-label">Modo noche: '
    + (off ? 'desactivado' : 'automático') + '<small class="noche-menu-sub">' + (off ? 'Tocá para activarlo (de 20 a 8 h)' : 'De 20 a 8 h · tocá para desactivarlo') + '</small></span>';
}
// Se revisa cada minuto (para cambiar a las 20 y a las 8 con la página abierta) y al volver a la pestaña.
setInterval(nocheAplicar, 60000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') nocheAplicar(); });
// Las preferencias son de cada usuaria: se aplican de nuevo al entrar.
if (typeof showApp === 'function') {
  const _showAppNoche = showApp;
  showApp = function () { _showAppNoche.apply(this, arguments); nocheAplicar(); };
}
nocheAplicar();

// Para revisar una sección nueva de noche (en la consola, con userPrefs.modoNoche='siempre'; nocheAplicar()):
// nocheAuditar() lista lo que quedó con fondo claro o con letra oscura.
function nocheAuditar() {
  const lum = c => { const m = String(c).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); if (!m) return null; if (m[4] !== undefined && +m[4] < .35) return null; return (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) / 255; };
  const claros = {}, oscuros = {};
  document.querySelectorAll('#app-container *, .modal-overlay.open *').forEach(e => {
    const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return;
    const cs = getComputedStyle(e); if (cs.visibility === 'hidden') return;
    const k = e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
    const lb = lum(cs.backgroundColor); if (lb !== null && lb > .75) claros[k] = (claros[k] || 0) + 1;
    if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const lt = lum(cs.color); if (lt !== null && lt < .35) oscuros[k] = cs.color; }
  });
  return { claros, oscuros };
}
