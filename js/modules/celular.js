/*
 * CAMBIO DE PESTAÑA (oct. 2026): lo poco que necesita código; el resto está en css/celular.css
 * y css/pulido.css.
 * - Un fundido corto al cambiar de pestaña (solo ahí: no cuando llegan datos de la nube, así no
 *   parpadea mientras se trabaja).
 * - En el celular, la página vuelve arriba (si no, se quedaba a mitad de la pestaña anterior).
 */
const CEL_ANCHO = 760;
function esCelular() { return window.innerWidth <= CEL_ANCHO; }
function paginaFundido() {
  const mc = document.getElementById('main-content'); if (!mc) return;
  mc.classList.remove('pag-entra'); void mc.offsetWidth; mc.classList.add('pag-entra');
}
if (typeof switchTab === 'function') {
  const _switchTab = switchTab;
  switchTab = function (id) {
    const antes = userPrefs.activeTabId;
    _switchTab.apply(this, arguments);
    if (userPrefs.activeTabId !== antes) paginaFundido();
    if (esCelular()) window.scrollTo(0, 0);
  };
}
