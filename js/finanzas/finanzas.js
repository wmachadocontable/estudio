/*
 * FINANZAS (oct. 2026): una pestaña con tres subpestañas — Honorarios · Gastos · Impuestos.
 *
 * - Honorarios es la de siempre (js/honorarios.js, sus datos en tab.honData): solo se dibuja
 *   adentro de Finanzas. La pestaña vieja sigue en state.tabs pero ya no aparece en la barra.
 * - Gastos e Impuestos vienen del demo de la Cra. María Lucía Furtado (js/finanzas/gastos.js,
 *   gastos-form.js, impuestos.js, vencimientos.js). Sus datos viven en state.finanzas:
 *     gastos[]    las compras (cada una con id)
 *     cuotas[]    los pagos programados de una compra a crédito (cada una con id)
 *     impuestos[] una fila por período (IVA, IRPF, pago, comprobante)
 *     gastoCats[] las categorías · venc{} qué impuestos son suyos y las fechas corregidas
 *   Todas las listas tienen id: así la sincronización las mezcla elemento por elemento
 *   (merge3 en js/services/sync.js) y nunca pisa lo que guardó otra sesión.
 * - Toda la pestaña es SOLO de Wendy, igual que Honorarios (decisión del 02/10/2026).
 *
 * Este archivo tiene la capa de datos (FinStore), las ayudas que usan los archivos traídos,
 * la ventana de la ficha, la exportación y la pestaña.
 */
const FIN_DUENA = 'Wendy';
const FIN_TAB_ID = 'finanzas';

/* ===== DATOS ===== */
function finData(){
  if (!state.finanzas || typeof state.finanzas !== 'object') state.finanzas = {};
  const d = state.finanzas;
  ['gastos','cuotas','impuestos'].forEach(k => { if (!Array.isArray(d[k])) d[k] = []; });
  return d;
}
// Misma forma que el Store de María Lucía, así los archivos traídos casi no cambian.
const FinStore = {
  get data(){ return finData(); },
  all(c){ return finData()[c] || []; },
  get(c, id){ return this.all(c).find(x => x.id === id); },
  upsert(c, o){
    const d = finData();
    if (!o.id) { o.id = c[0] + Date.now().toString(36) + Math.random().toString(36).slice(2,6); o._t = Date.now(); d[c].push(o); }
    else { const i = d[c].findIndex(x => x.id === o.id); if (i >= 0) d[c][i] = o; else d[c].push(o); }
    this.save(); return o;
  },
  remove(c, id){ const d = finData(); d[c] = (d[c] || []).filter(x => x.id !== id); this.save(); },
  save(){ if (typeof saveState === 'function') saveState(); }
};

/* ===== AYUDAS (las usan gastos.js, gastos-form.js, impuestos.js y vencimientos.js) ===== */
function finQ(sel){ return document.querySelector(sel); }
function finEsc(s){ return (s == null ? '' : String(s)).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function finHoy(){ return (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0,10); }
function fDate(iso){ if (!iso) return '—'; const p = String(iso).split('-'); return p.length === 3 ? p[2]+'/'+p[1]+'/'+p[0] : iso; }
function daysTo(iso){ if (!iso) return null; const t = new Date(); t.setHours(0,0,0,0); const p = iso.split('-').map(Number); return Math.round((new Date(p[0],p[1]-1,p[2]) - t) / 86400000); }
const FIN_DR = ' min="2000-01-01" max="2099-12-31"';
function finFechaOk(el){ if (!el.value) return true; const min = el.min || '2000-01-01', max = el.max || '2099-12-31';
  if (el.value < min || el.value > max) { toast('Revisá la fecha: tiene que estar entre ' + fDate(min) + ' y ' + fDate(max)); return false; } return true; }
function finFechasOk(){ return !Array.from(document.querySelectorAll('#fin-ficha-body input[type="date"]')).some(i => !finFechaOk(i)); }
// Números: aceptan "12.600", "12600,50", "$ 1.200".
function honNum(v){ if (v === '' || v == null) return null; if (typeof v === 'number') return v;
  const n = parseFloat(String(v).replace(/[^\d,.-]/g,'').replace(/\./g,'').replace(',','.')); return isNaN(n) ? null : n; }
function numTxt(n){ if (n == null || n === '') return ''; n = Number(n); return n.toLocaleString('es-UY', {minimumFractionDigits:(n%1?2:0), maximumFractionDigits:2}); }
function money(n){ return '$ ' + numTxt(n || 0); }
function finAnioActivo(){ return parseInt(state.branding && state.branding.year, 10) || new Date().getFullYear(); }
function finYearSelect(sel, fn){
  const now = new Date().getFullYear(), min = Math.min(2024, sel, finAnioActivo()), max = Math.max(now + 1, sel, finAnioActivo());
  let o = ''; for (let y = max; y >= min; y--) o += '<option' + (y === sel ? ' selected' : '') + '>' + y + '</option>';
  return '<select class="fin-ysel" onchange="' + fn + '(+this.value)">' + o + '</select>';
}
function finEmptyRow(cols, msg){ return '<tr><td colspan="' + cols + '"><div class="fin-vacio"><div class="e-ico">📭</div><p>' + msg + '</p></div></td></tr>'; }
// Un indicador, con el mismo diseño que los del resto de la página (stat-card).
function finKpi(label, valor, sub, cls){
  const c = {'k-green':' green', 'k-amber':' amber', 'k-alerta':' red', 'k-acento':' blue'}[cls] || '';
  return '<div class="stat-card' + c + '"><div class="stat-num">' + valor + '</div><div class="stat-label">' + finEsc(label) + '</div>'
    + (sub !== '' && sub != null ? '<div class="fin-kpi-sub">' + finEsc(String(sub)) + '</div>' : '') + '</div>';
}
// Campo editable dentro de la tabla (Gastos).
function finCellIn(col, id, f, v, opt){
  opt = opt || {}; const d = opt.type === 'date';
  return '<input class="cell-in' + (opt.cls ? ' ' + opt.cls : '') + '"' + (opt.type ? ' type="' + opt.type + '"' : '') + (d ? FIN_DR : '')
    + (opt.list ? ' list="' + opt.list + '" autocomplete="off"' : '') + ' value="' + finEsc(v || '') + '" placeholder="' + finEsc(opt.ph || '—') + '"'
    + ' onchange="' + (d ? 'if(finFechaOk(this))' : '') + 'gstSet(\'' + id + '\',\'' + f + '\',this.value)">';
}

/* ===== HONORARIOS → IVA facturado y cobrado =====
   Honorarios guarda UN año (12 meses por cliente, tab.tabYear). Para otro año no hay datos: null. */
function finHonTab(){ return state.tabs.find(t => t.type === 'honorarios' && t.honData) || null; }
function finHonAnio(){ const t = finHonTab(); return t ? (parseInt(t.tabYear || finAnioActivo(), 10)) : null; }
function finHonMes(y, m, que){
  const t = finHonTab(); if (!t || finHonAnio() !== y) return null;
  const hd = t.honData, rate = (typeof hd.taxRate === 'number') ? hd.taxRate : 0.22;
  let tot = 0;
  (hd.clients || []).forEach(c => {
    if (c.archivedFrom) { const p = c.archivedFrom.split('-').map(Number); if (y > p[0] || (y === p[0] && m >= p[1]-1)) return; }
    const cell = (c.months || [])[m]; if (!cell) return;
    const sin = Number(cell.sinIva); if (cell.sinIva == null || cell.sinIva === '' || isNaN(sin) || !sin) return;
    const conFac = !!(cell.factura && String(cell.factura).trim());
    const iva = conFac ? Math.round(sin * rate * 100) / 100 : 0;
    if (que === 'iva') tot += iva;
    else if (que === 'cobrado' && cell.fecha) tot += sin + iva;
  });
  return Math.round(tot * 100) / 100;
}

/* ===== LA FICHA DE GASTO (ventana) ===== */
function finAsegurarFicha(){
  if (document.getElementById('modal-fin-ficha')) return;
  const w = document.createElement('div');
  w.id = 'modal-fin-ficha'; w.className = 'modal-overlay';
  w.innerHTML = '<div class="modal fin-app fin-ficha"><button class="modal-close" onclick="finCerrarFicha()">×</button>'
    + '<h3 id="fin-ficha-title">Gasto</h3><div id="fin-ficha-body"></div>'
    + '<div class="form-actions"><button class="btn btn-red btn-sm" id="fin-ficha-del" onclick="gastoDel()">Eliminar</button>'
    + '<span style="flex:1"></span><button class="btn btn-outline" onclick="finCerrarFicha()">Cancelar</button>'
    + '<button class="btn btn-gold" onclick="gastoSave()">Guardar</button></div></div>';
  w.addEventListener('click', e => { if (e.target === w) finCerrarFicha(); });
  document.body.appendChild(w);
}
function finAbrirFicha(){ finAsegurarFicha(); document.getElementById('modal-fin-ficha').classList.add('open'); }
function finCerrarFicha(){ const m = document.getElementById('modal-fin-ficha'); if (m) m.classList.remove('open'); _gstCur = {form:null, id:null}; }
var _gstCur = {form:null, id:null};

/* ===== LISTAS PARA AUTOCOMPLETAR ===== */
function finListas(){
  const medios = ['Transferencia','Efectivo','Débito','Tarjeta de crédito','BROU','Itaú','Santander','Scotiabank','BBVA'];
  const plat = ['Visa','Mastercard','OCA','Creditel','Anda','Cabal'];
  const conceptos = [...new Set(FinStore.all('gastos').map(g => (g.concepto || '').trim()).filter(Boolean))].sort();
  const op = a => a.map(x => '<option value="' + finEsc(x) + '">').join('');
  return '<datalist id="dl-gastocats"></datalist><datalist id="dl-proveedores"></datalist>'
    + '<datalist id="dl-gastos">' + op(conceptos) + '</datalist>'
    + '<datalist id="dl-medio">' + op(medios) + '</datalist><datalist id="dl-plat">' + op(plat) + '</datalist>';
}

/* ===== EXPORTAR (Excel y PDF de Gastos e Impuestos) ===== */
function finExpBtns(kind){
  return '<button class="btn btn-outline btn-sm" onclick="finExportar(\'' + kind + '\',\'xls\')">⬇ Excel</button>'
    + '<button class="btn btn-outline btn-sm" onclick="finExportar(\'' + kind + '\',\'pdf\')">⬇ PDF</button>';
}
function finExpRows(kind){
  if (kind === 'imp') return impExpRows();
  // Gastos: lo que se ve (mes elegido o todo el año), con el desglose del IVA.
  const y = gstYear();
  const filas = gstVista === 'anual' ? [].concat(...Array.from({length:12}, (_, m) => gstFilasCaja(y, m))) : gstFiltradas();
  return {
    title: 'Gastos del estudio · ' + (gstVista === 'anual' ? y : MONTHS[gstMes] + ' ' + y),
    cols: ['Vence','Gasto','Categoría','Proveedor','Subtotal','IVA','% deducible','IVA deducible','Importe','Estado','Fecha de pago'],
    data: filas.map(f => {
      const g = f.g, cuota = f.tipo === 'cuota', iva = (!cuota && g.conIva) ? (honNum(g.iva) || 0) : 0;
      return [fDate(f.fecha), (g.concepto || '') + (f.det ? ' · ' + f.det : ''), g.cat || '', g.proveedor || '',
        cuota ? numTxt(f.importe) : numTxt((f.importe || 0) - iva), iva ? numTxt(iva) : '', iva ? (g.ivaDed || 100) + '%' : '',
        iva ? numTxt(gstIvaDeducible(g)) : '', numTxt(f.importe), f.pagado ? 'Pagado' : (f.fecha && f.fecha < finHoy() ? 'Vencido' : 'Pendiente'), fDate(f.fechaPago)];
    })
  };
}
function finExportar(kind, fmt){
  const r = finExpRows(kind);
  const nombre = (state.branding && state.branding.name) || 'W. Machado';
  const sub = (state.branding && state.branding.subtitle) || 'Estudio Contable';
  const fecha = new Date().toLocaleDateString('es-UY');
  const head = r.cols.map(c => '<th>' + finEsc(c) + '</th>').join('');
  const body = r.data.map(row => '<tr>' + row.map(v => '<td>' + finEsc(v == null ? '' : v) + '</td>').join('') + '</tr>').join('');
  if (fmt === 'xls') {
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body>'
      + '<table><tr><td style="font-family:Georgia;font-size:18px;color:#102030"><b>' + finEsc(nombre) + ' · ' + finEsc(sub) + '</b></td></tr>'
      + '<tr><td style="font-size:12px;color:#6c757d">' + finEsc(r.title) + ' — ' + fecha + '</td></tr></table><br>'
      + '<table style="border-collapse:collapse;font-family:Arial;font-size:12px"><tr style="background:#102030;color:#fff">'
      + r.cols.map(c => '<th style="padding:6px 10px;border:1px solid #0b1722;text-align:left">' + finEsc(c) + '</th>').join('') + '</tr>'
      + r.data.map((row, i) => '<tr style="background:' + (i % 2 ? '#f3f5f7' : '#ffffff') + '">' + row.map(v => '<td style="padding:5px 10px;border:1px solid #dee2e6;mso-number-format:\'\\@\'">' + finEsc(v == null ? '' : v) + '</td>').join('') + '</tr>').join('')
      + '</table></body></html>';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + html], {type:'application/vnd.ms-excel'}));
    a.download = r.title.replace(/[^\wáéíóúñÁÉÍÓÚÑ]+/g, '_') + '.xls'; a.click(); toast('⬇ Excel generado');
    return;
  }
  const w = window.open('', '_blank'); if (!w) { toast('Permití las ventanas emergentes para el PDF'); return; }
  w.document.write('<html><head><meta charset="utf-8"><title>' + finEsc(r.title) + '</title><style>'
    + 'body{font-family:Lato,Arial,sans-serif;color:#0a0a0a;padding:28px}h1{font-family:Georgia,serif;color:#102030;font-size:22px;margin:0}'
    + '.s{font-size:11px;letter-spacing:2px;color:#6c757d;text-transform:uppercase;border-bottom:3px solid #102030;padding-bottom:12px;margin-bottom:16px}'
    + '.t{font-weight:bold;margin:0 0 10px}table{width:100%;border-collapse:collapse;font-size:11.5px}th{background:#102030;color:#fff;text-align:left;padding:6px 8px}'
    + 'td{padding:5px 8px;border-bottom:1px solid #dee2e6}tr:nth-child(even) td{background:#f8f9fa}.ft{margin-top:18px;font-size:10px;color:#6c757d}'
    + '@media print{.noprint{display:none}}</style></head><body>'
    + '<h1>' + finEsc(nombre) + '</h1><div class="s">' + finEsc(sub) + '</div><div class="t">' + finEsc(r.title) + ' — ' + fecha + '</div>'
    + '<table><tr>' + head + '</tr>' + body + '</table><div class="ft">Generado desde la página del estudio · ' + new Date().toLocaleString('es-UY') + '</div>'
    + '<div class="noprint" style="margin-top:20px"><button onclick="window.print()" style="padding:10px 18px;background:#102030;color:#fff;border:none;border-radius:6px;font-weight:bold;cursor:pointer">🖨 Imprimir / Guardar PDF</button></div></body></html>');
  w.document.close();
}

/* ===== LA PESTAÑA ===== */
const FIN_TABS = [
  {id:'hon',    ico:'💲', label:'Honorarios'},
  {id:'gastos', ico:'🧾', label:'Gastos'},
  {id:'imp',    ico:'🏛', label:'Impuestos'}
];
function finSub(){ const s = userPrefs.finSub; return FIN_TABS.some(t => t.id === s) ? s : 'hon'; }
function setFinSub(id){ userPrefs.finSub = id; if (typeof saveUserPrefs === 'function') saveUserPrefs(); renderContent(); }
// Contador rojo en «Impuestos» cuando hay algo vencido sin pagar.
function finBadge(id){ if (id !== 'imp') return ''; const n = impVencidos().length; return n ? '<span class="fin-badge">' + n + '</span>' : ''; }

function renderFinanzas(tab, mc){
  const sub = finSub();
  let h = '<div class="fin-app">'
    + '<div class="fin-tabs">' + FIN_TABS.map(t => '<button class="fin-tab' + (t.id === sub ? ' active' : '') + '" onclick="setFinSub(\'' + t.id + '\')">'
      + '<span class="fin-tab-ico">' + t.ico + '</span>' + t.label + finBadge(t.id) + '</button>').join('') + '</div>'
    + finListas();
  if (sub === 'hon') {
    const hon = finHonTab();
    // Arriba de Honorarios: quién debe (js/finanzas/honorarios-deudores.js)
    h += hon ? ((typeof honDeudoresHTML === 'function' ? honDeudoresHTML() : '') + '<div id="fin-hon-host"></div>') : '<div class="fin-vacio"><div class="e-ico">💲</div><p>Todavía no hay Honorarios cargados.</p></div>';
    mc.innerHTML = h + '</div>';
    if (hon) { document.getElementById('fin-hon-host').innerHTML = renderHonorarios(hon); attachHonorariosHandlers(hon); }
    return;
  }
  h += '<div id="view-' + sub + '"></div></div>';
  mc.innerHTML = h;
  if (sub === 'gastos') renderGastos(); else renderImpuestos();
}

/* ===== ACCESO: solo Wendy (igual que Honorarios) ===== */
function finEsDuena(){ try { const u = currentUser(); return !!u && String(u.name || '').trim().toLowerCase() === FIN_DUENA.toLowerCase(); } catch (e) { return false; } }
if (typeof userCanSeeTab === 'function') { const _s = userCanSeeTab; userCanSeeTab = function(t){ if (t && t.type === 'finanzas') return finEsDuena(); return _s(t); }; }
if (typeof userCanEnterTab === 'function') { const _e = userCanEnterTab; userCanEnterTab = function(t){ if (t && t.type === 'finanzas') return finEsDuena(); return _e(t); }; }

/* ===== REGISTRO EN LA PÁGINA ===== */
if (typeof registerTabRenderer === 'function') registerTabRenderer('finanzas', renderFinanzas);
if (typeof registerStructureInitializer === 'function') registerStructureInitializer('finanzas', function(){
  let changed = false;
  if (!state.tabs.some(t => t.type === 'finanzas')) {
    // Va donde estaba Honorarios en la barra, o antes de Configuración.
    const ref = state.tabs.findIndex(t => t.type === 'honorarios');
    const set = state.tabs.findIndex(t => t.type === 'settings');
    const tab = { id: FIN_TAB_ID, name: '💲 Finanzas', type: 'finanzas', removable: false, privacy: 'private_user', privateOwners: [FIN_DUENA] };
    const at = (set >= 0 && (ref < 0 || ref > set)) ? set : (ref >= 0 ? ref : state.tabs.length);
    state.tabs.splice(at, 0, tab);
    changed = true;
  }
  if (!state.finanzas || typeof state.finanzas !== 'object') { finData(); changed = true; }
  if (!Array.isArray(state.finanzas.gastoCats) || !state.finanzas.gastoCats.length) { state.finanzas.gastoCats = GASTO_CATS_DEF.slice(); changed = true; }
  return changed;
});
