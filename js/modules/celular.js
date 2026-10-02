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

/* ===== FICHAS EN EL CELULAR (Finanzas y CEDE) — copiado del estándar de María Lucía =====
   En una pantalla chica, una tabla de 4 a 11 columnas obliga a deslizar de costado y se pierde de
   qué fila es cada dato. Esas tablas pasan a ser fichas: cada fila una tarjeta, y cada celda lleva
   el título de su columna (data-l) que el CSS muestra a la izquierda. Solo dentro de Finanzas
   (.fin-app) y CEDE (.ce-v); el resto de la página sigue como estaba. */
(function () {
  const ZONAS = '.fin-app table, .ce-v table';
  function marcar(t) {
    if (t._celMarcada) return; t._celMarcada = true;
    const cols = t.querySelectorAll('thead tr:last-child th').length, filas = t.querySelectorAll('thead tr').length;
    if (filas === 1 && cols >= 4 && cols <= 11) {
      t.classList.add('t-ficha');
      const caja = t.closest('.table-wrap'); if (caja) caja.classList.add('tw-ficha');
    }
  }
  function etiquetar(t) {
    const tit = [...t.querySelectorAll('thead tr:last-child th')].map(x => (x.textContent || '').trim());
    t.querySelectorAll('tbody tr').forEach(tr => {
      if (tr._celEtiq) return; tr._celEtiq = true;
      [...tr.children].forEach((td, i) => { if (td.colSpan <= 1 && tit[i]) td.setAttribute('data-l', tit[i]); });
    });
  }
  let pend = false;
  function revisar() {
    if (pend) return; pend = true;
    setTimeout(() => { pend = false; document.querySelectorAll(ZONAS).forEach(t => { if (!t.tHead) return; marcar(t); etiquetar(t); }); }, 0);
  }
  const mc = document.getElementById('main-content');
  if (mc && window.MutationObserver) new MutationObserver(revisar).observe(mc, { childList: true, subtree: true });
  revisar();
})();
