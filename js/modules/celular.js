/*
 * CELULAR (oct. 2026): lo poco que necesita código; el resto está en css/celular.css.
 * - Al cambiar de pestaña en el celular, la página vuelve arriba (si no, se quedaba a mitad de
 *   la pestaña anterior).
 */
const CEL_ANCHO = 760;
function esCelular() { return window.innerWidth <= CEL_ANCHO; }
if (typeof switchTab === 'function') {
  const _switchTab = switchTab;
  switchTab = function () { _switchTab.apply(this, arguments); if (esCelular()) window.scrollTo(0, 0); };
}
