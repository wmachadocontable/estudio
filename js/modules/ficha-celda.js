/*
 * LA FICHA DE CADA MES (oct. 2026): la ventana que se abre al tocar una casilla de Empresas,
 * Sv. Profesionales o Industria y Comercio. La lógica sigue en app.js (openCellModal,
 * updateCellModalFields, saveCellEdit); acá se suma:
 *   - el estado con botones grandes (el select queda oculto y es el que se guarda);
 *   - «Realizó» y «Envió»: quién lo hizo. Se completan solos con quien está usando la página al
 *     marcar «Realizado» o «Enviado» (y la fecha de hoy si está vacía), y se pueden cambiar.
 *     Se guardan en la casilla como rq (realizó) y eq (envió). Lo marcado antes queda en «—».
 */
let _fcAbriendo = false;
function fcYo() { const u = (typeof currentUser === 'function') ? currentUser() : null; return u ? u.name : ''; }
function fcNombre(n) { const u = n && typeof findUserByName === 'function' && findUserByName(n); return u ? (u.displayName || u.name) : (n || ''); }
function fcOpciones(sel, val) {
  if (!sel) return;
  const nombres = (state.users || []).map(u => u.name).filter(Boolean);
  if (val && !nombres.includes(val)) nombres.push(val);
  sel.innerHTML = '<option value="">— (sin dato)</option>' + nombres.map(n => '<option value="' + bbEscape(n) + '"' + (n === val ? ' selected' : '') + '>' + bbEscape(fcNombre(n)) + '</option>').join('');
}
function fcPintarEstados() {
  const sel = document.getElementById('modal-cell-status'), box = document.getElementById('mc-estados');
  if (!sel || !box) return;
  box.innerHTML = [...sel.options].map(o => '<button type="button" class="mc-est mc-est-' + o.value + (o.value === sel.value ? ' on' : '') + '" data-v="' + o.value + '">' + bbEscape(o.textContent.trim()) + '</button>').join('');
}
document.addEventListener('click', function (e) {
  const b = e.target.closest && e.target.closest('#mc-estados .mc-est');
  if (!b) return;
  const sel = document.getElementById('modal-cell-status');
  sel.value = b.getAttribute('data-v');
  updateCellModalFields();
  fcPintarEstados();
});

if (typeof openCellModal === 'function') {
  const _openCellModal = openCellModal;
  openCellModal = function (tabId, rowIdx, colIdx) {
    _fcAbriendo = true;
    try { _openCellModal.apply(this, arguments); } finally { _fcAbriendo = false; }
    const tab = state.tabs.find(t => t.id === tabId), row = tab && tab.rows[rowIdx];
    if (!row) return;
    const cell = getCell(tab, row, colIdx);
    fcOpciones(document.getElementById('modal-cell-rq'), cell.rq || '');
    fcOpciones(document.getElementById('modal-cell-eq'), cell.eq || '');
    fcPintarEstados();
    updateCellModalFields();
  };
}
if (typeof updateCellModalFields === 'function') {
  const _upd = updateCellModalFields;
  updateCellModalFields = function () {
    _upd.apply(this, arguments);
    const sel = document.getElementById('modal-cell-status'); if (!sel) return;
    const normal = sel.getAttribute('data-mode') !== 'comments', hecho = normal && sel.value === 'done';
    const rqG = document.getElementById('mc-rq-group'); if (rqG) rqG.style.display = hecho ? '' : 'none';
    if (_fcAbriendo) return;
    const hoy = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0, 10);
    // Al pasar a «Realizado»: quién y la fecha de hoy, si no estaban.
    const rq = document.getElementById('modal-cell-rq'), d = document.getElementById('modal-cell-date');
    if (hecho && rq && !rq.value && fcYo()) rq.value = fcYo();
    if (hecho && d && !d.value) d.value = hoy;
    // Al tildar «Enviado al cliente»: quién y la fecha de hoy, si no estaban.
    const sent = document.getElementById('modal-cell-sent'), eq = document.getElementById('modal-cell-eq'), ed = document.getElementById('modal-cell-sent-date');
    if (hecho && sent && sent.checked) {
      if (eq && !eq.value && fcYo()) eq.value = fcYo();
      if (ed && !ed.value) ed.value = hoy;
    }
    const env = document.getElementById('modal-sent-group'); if (env) env.classList.toggle('on', !!(sent && sent.checked));
  };
}
if (typeof saveCellEdit === 'function') {
  const _save = saveCellEdit;
  saveCellEdit = function () {
    const ec = (typeof editingCell !== 'undefined' && editingCell) ? Object.assign({}, editingCell) : null;
    const rq = (document.getElementById('modal-cell-rq') || {}).value || '';
    const eq = (document.getElementById('modal-cell-eq') || {}).value || '';
    _save.apply(this, arguments);
    if (!ec) return;
    const tab = state.tabs.find(t => t.id === ec.tabId), row = tab && tab.rows[ec.rowIdx];
    if (!row) return;
    const cell = getCell(tab, row, ec.colIdx);
    if (cell.s === 'done' && rq) cell.rq = rq; else delete cell.rq;
    if (cell.s === 'done' && cell.es && eq) cell.eq = eq; else delete cell.eq;
    setCell(tab, row, ec.colIdx, cell);
    saveState();
    renderContent();
  };
}
