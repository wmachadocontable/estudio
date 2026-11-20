/*
 * IVA: DE DÓNDE SALE CADA NÚMERO (19/11/2026, pedido de la usuaria). Solo muestra; no cambia ningún cálculo ni dato.
 *
 * El IVA va por FECHA DE FACTURA (como lo toma DGI), y la lista de Gastos va por VENCIMIENTO: por eso costaba
 * encontrar qué IVA de compras tomaba cada mes. Acá:
 *   1. Gastos (vista mensual), debajo de la tabla: «IVA de compras del mes», factura por factura, con el total
 *      que va a Impuestos (mismo cálculo que gstIvaDelMes). En amarillo lo que conviene revisar: sin N° de
 *      factura o copiado solo. Excel / PDF con finExportar('ivacomp').
 *   2. Gastos: los gastos con IVA de otro mes llevan la marca «IVA en <mes>» y el IVA en gris.
 *   3. Impuestos: tocar el «IVA de gastos» de un período despliega esa lista (los dos meses si es bimestral).
 *   4. Impuestos: tocar el «IVA facturado» despliega las facturas de Honorarios (mismo cálculo que honNumerosMes).
 */

/* ===== los datos (los mismos cálculos que usa la página) ===== */
// Las compras con IVA cuya FACTURA es del mes (y, m).
function ivaCompFilas(y, m) {
  return FinStore.all('gastos')
    .filter(g => gstAnioDe(g) === y && gstMesDe(g) === m && (honNum(g.iva) || 0) > 0)
    .map(g => {
      const n = String(g.factura || '').trim();
      return { g, fecha: g.fecha || '', concepto: g.concepto || '', prov: g.proveedor || '', n, iva: honNum(g.iva) || 0,
        pct: g.ivaDed || 100, ded: gstIvaDeducible(g), auto: !!g._auto, credito: g.forma === 'credito', revisar: !n };
    })
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.concepto.localeCompare(b.concepto));
}
// Las facturas de Honorarios con FECHA DE FACTURA en el mes (y, m). null si Honorarios tiene otro año.
function ivaVenFilas(y, m) {
  const t = finHonTab(), hy = finHonAnio(); if (!t || (y !== hy && y !== hy + 1)) return null;
  const hd = t.honData, rate = (typeof hd.taxRate === 'number') ? hd.taxRate : 0.22, ym = honYM(y, m), out = [];
  (hd.clients || []).forEach(c => (c.months || []).forEach((cell, mi) => {
    const sin = honImporte(cell); if (sin == null || honArchivadoEn(c, hy, mi) || !honConFactura(cell)) return;
    if (honMesFactura(cell, hy, mi) !== ym) return;
    out.push({ fecha: cell.fFac || '', n: String(cell.factura).trim(), cliente: c.name || '', sin, iva: Math.round(sin * rate * 100) / 100,
      otroMes: !(hy === y && mi === m), mesTrabajo: mi, anioTrabajo: hy });
  }));
  return out.sort((a, b) => (a.fecha || '').localeCompare(b.fecha || '') || b.iva - a.iva);
}
const ivaDM = iso => iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) : '—';
const ivaR = n => Math.round(n * 100) / 100;

/* ===== 1. El cuadro debajo de Gastos ===== */
function ivaCompCardHTML(y, m) {
  const f = ivaCompFilas(y, m), tot = f.reduce((a, x) => a + x.iva, 0), ded = f.reduce((a, x) => a + x.ded, 0);
  const abierto = userPrefs.ivaCompAbierto !== false;
  let h = '<details class="ivad-card"' + (abierto ? ' open' : '') + ' ontoggle="userPrefs.ivaCompAbierto=this.open;saveUserPrefs()">'
    + '<summary><span class="ivad-tit">🧾 IVA de compras de ' + MONTHS[m].toLowerCase() + '</span>'
    + '<span class="ivad-tot">se deduce <b>' + money(ivaR(ded)) + '</b></span>'
    + (f.length ? '<span class="ivad-exp"><button class="btn btn-outline btn-sm" onclick="event.preventDefault();finExportar(\'ivacomp\',\'xls\')">⬇ Excel</button>'
      + '<button class="btn btn-outline btn-sm" onclick="event.preventDefault();finExportar(\'ivacomp\',\'pdf\')">⬇ PDF</button></span>' : '')
    + '</summary>'
    + '<div class="ivad-sub">Por <b>fecha de factura</b>, como lo toma DGI. Es el «IVA de gastos» de ' + MONTHS[m].toLowerCase() + ' en Impuestos. '
    + 'Puede incluir facturas que vencen en otro mes, y no incluye las de arriba que tienen la marca «IVA en …».</div>';
  if (!f.length) return h + '<div class="ivad-vacio">No hay facturas con IVA de ' + MONTHS[m].toLowerCase() + '.</div></details>';
  h += '<div class="kpis ' + (tot !== ded ? 'kpis-3' : 'kpis-2') + '">'
    + finKpi('IVA de las facturas', money(ivaR(tot)), f.length + (f.length === 1 ? ' factura' : ' facturas'), '')
    + (tot !== ded ? finKpi('No deducible', '− ' + money(ivaR(tot - ded)), 'las que van al 50 %', 'k-amber') : '')
    + finKpi('Se deduce en ' + MONTHS[m].toLowerCase(), money(ivaR(ded)), 'va a Impuestos', 'k-green') + '</div>';
  h += '<div class="table-wrap"><table class="ivad-tabla"><thead><tr><th>Factura</th><th>Gasto</th><th>N°</th><th class="num">IVA</th>'
    + '<th class="num">% deducible</th><th class="num">Deduce</th></tr></thead><tbody>'
    + f.map(x => '<tr' + (x.revisar ? ' class="ivad-rev"' : '') + '><td>' + ivaDM(x.fecha) + '</td>'
      + '<td><b>' + finEsc(x.concepto) + '</b>' + (x.prov ? ' <span class="muted-cell">· ' + finEsc(x.prov) + '</span>' : '')
        + (x.auto ? '<span class="ivad-chip" title="Gasto fijo que se copió solo del mes anterior: revisá que sea la factura real">copiado solo</span>' : '')
        + (x.credito ? '<span class="ivad-chip ivad-chip-n" title="Compra a crédito: el IVA entero va al mes de la compra, no a cada cuota">a crédito</span>' : '') + '</td>'
      + '<td>' + (x.n ? finEsc(x.n) : '<span class="ivad-sinn">sin N°</span>') + '</td>'
      + '<td class="num">' + money(x.iva) + '</td><td class="num">' + x.pct + ' %</td><td class="num"><b>' + money(x.ded) + '</b></td></tr>').join('')
    + '<tr class="gst-tot"><td colspan="3">Total de ' + MONTHS[m].toLowerCase() + '</td><td class="num">' + money(ivaR(tot)) + '</td><td></td>'
    + '<td class="num">' + money(ivaR(ded)) + '</td></tr></tbody></table></div>'
    + (f.some(x => x.revisar) ? '<div class="ivad-pie">En amarillo: sin N° de factura. Si es un gasto fijo copiado solo, ponele el N° cuando llegue la factura real '
      + '(o corregí el importe); si cargás la factura como un gasto nuevo, ese IVA se cuenta dos veces.</div>' : '');
  return h + '</details>';
}
// Excel / PDF del cuadro (finExportar llama a finExpRows por nombre: se agrega el tipo «ivacomp»).
if (typeof finExpRows === 'function') {
  const _finExpRowsIva = finExpRows;
  finExpRows = function (kind) {
    if (kind !== 'ivacomp') return _finExpRowsIva.apply(this, arguments);
    const y = gstYear(), m = gstMes, f = ivaCompFilas(y, m);
    return { title: 'IVA de compras · ' + MONTHS[m] + ' ' + y,
      cols: ['Fecha de factura', 'Gasto', 'Proveedor', 'N° de factura', 'IVA', '% deducible', 'IVA deducible', 'Observación'],
      data: f.map(x => [fDate(x.fecha), x.concepto, x.prov, x.n, numTxt(x.iva), x.pct + '%', numTxt(x.ded),
        [x.n ? '' : 'sin N° de factura', x.auto ? 'copiado solo' : '', x.credito ? 'a crédito' : ''].filter(Boolean).join(' · ')])
        .concat([['', 'TOTAL', '', '', numTxt(ivaR(f.reduce((a, x) => a + x.iva, 0))), '', numTxt(ivaR(f.reduce((a, x) => a + x.ded, 0))), '']]) };
  };
}

/* ===== 2. La marca en la lista de Gastos: el IVA de esta factura cuenta en otro mes ===== */
function ivaEsDeOtroMes(f) {
  if (!f || f.tipo !== 'gasto' || !((honNum(f.g.iva) || 0) > 0)) return false;
  return !(gstAnioDe(f.g) === gstYear() && gstMesDe(f.g) === gstMes);
}
function ivaOtroMesChip(f) {
  if (!ivaEsDeOtroMes(f)) return '';
  const a = gstAnioDe(f.g), mm = gstMesDe(f.g);
  return '<span class="gst-ivaotro" title="La factura es del ' + fDate(f.g.fecha) + ': su IVA cuenta en ' + MONTHS[mm].toLowerCase()
    + (a !== gstYear() ? ' ' + a : '') + ' (por fecha de factura, como lo toma DGI)">IVA en ' + MONTHS[mm].toLowerCase() + (a !== gstYear() ? ' ' + a : '') + '</span>';
}
if (typeof gstCeldaIva === 'function') {
  const _gstCeldaIvaOtro = gstCeldaIva;
  gstCeldaIva = function (f) { const h = _gstCeldaIvaOtro(f); return ivaEsDeOtroMes(f) ? '<span class="gst-iva-gris">' + h + '</span>' : h; };
}

/* ===== 3 y 4. Impuestos: tocar el importe despliega de dónde sale ===== */
var ivaDetAbiertos = {};                                    // 'AAAA-pi-v' (ventas) / 'AAAA-pi-c' (compras)
function ivaDetToggle(k) { if (ivaDetAbiertos[k]) delete ivaDetAbiertos[k]; else ivaDetAbiertos[k] = 1; renderImpuestos(); }
// La celda del importe: se puede tocar si hay algo.
function ivaDetCelda(y, pi, tipo, valor) {
  if (!valor) return '<td class="num">—</td>';
  const k = y + '-' + pi + '-' + tipo, ab = !!ivaDetAbiertos[k];
  return '<td class="num"><button class="ivad-btn' + (ab ? ' on' : '') + '" onclick="ivaDetToggle(\'' + k + '\')" title="'
    + (ab ? 'Cerrar el detalle' : 'Ver de dónde sale') + '">' + money(valor) + ' <span class="ivad-flecha">' + (ab ? '▴' : '▾') + '</span></button></td>';
}
// Los renglones de detalle que van debajo del período (0, 1 o 2).
function ivaDetFilas(y, p, cols) {
  let h = '';
  if (ivaDetAbiertos[y + '-' + p.i + '-v']) h += '<tr class="ivad-tr"><td colspan="' + cols + '">' + ivaDetVentas(y, p) + '</td></tr>';
  if (ivaDetAbiertos[y + '-' + p.i + '-c']) h += '<tr class="ivad-tr"><td colspan="' + cols + '">' + ivaDetCompras(y, p) + '</td></tr>';
  return h;
}
function ivaDetVentas(y, p) {
  let h = '<div class="ivad-caja"><div class="ivad-caja-t">IVA facturado · ' + p.label + ' <span class="muted-cell">(Honorarios, por fecha de factura)</span>'
    + '<button class="ivad-x" onclick="ivaDetToggle(\'' + y + '-' + p.i + '-v\')" title="Cerrar">✕</button></div>';
  let total = 0, n = 0;
  p.meses.forEach(m => {
    const f = ivaVenFilas(y, m) || [];
    if (p.meses.length > 1) h += '<div class="ivad-mes">' + MONTHS[m] + '</div>';
    if (!f.length) { h += '<div class="ivad-vacio">Sin facturas con fecha de ' + MONTHS[m].toLowerCase() + '.</div>'; return; }
    h += '<table class="ivad-mini">' + f.map(x => '<tr><td>' + (x.fecha ? ivaDM(x.fecha) : '<span class="muted-cell" title="Sin fecha de factura: cuenta en el mes del trabajo">s/fecha</span>') + '</td><td>N° ' + finEsc(x.n) + '</td><td><b>' + finEsc(x.cliente) + '</b>'
      + (x.otroMes ? ' <span class="ivad-chip ivad-chip-n" title="Trabajo de ' + MONTHS[x.mesTrabajo].toLowerCase() + ', facturado en ' + MONTHS[m].toLowerCase() + '">trabajo de '
        + MONTHS_SHORT[x.mesTrabajo].toLowerCase() + '</span>' : '') + '</td><td class="num">' + money(x.sin) + '</td><td class="num"><b>' + money(x.iva) + '</b></td></tr>').join('') + '</table>';
    total += f.reduce((a, x) => a + x.iva, 0); n += f.length;
  });
  return h + '<div class="ivad-caja-tot"><span>' + n + (n === 1 ? ' factura' : ' facturas') + ' · importe sin IVA a la izquierda, IVA a la derecha</span><b>' + money(ivaR(total)) + '</b></div></div>';
}
function ivaDetCompras(y, p) {
  let h = '<div class="ivad-caja"><div class="ivad-caja-t">IVA de gastos · ' + p.label + ' <span class="muted-cell">(Gastos, por fecha de factura)</span>'
    + '<button class="ivad-x" onclick="ivaDetToggle(\'' + y + '-' + p.i + '-c\')" title="Cerrar">✕</button></div>';
  let total = 0, n = 0;
  p.meses.forEach(m => {
    const f = ivaCompFilas(y, m);
    if (p.meses.length > 1) h += '<div class="ivad-mes">' + MONTHS[m] + '</div>';
    if (!f.length) { h += '<div class="ivad-vacio">Sin facturas con IVA de ' + MONTHS[m].toLowerCase() + '.</div>'; return; }
    h += '<table class="ivad-mini">' + f.map(x => '<tr' + (x.revisar ? ' class="ivad-rev"' : '') + '><td>' + ivaDM(x.fecha) + '</td><td>' + (x.n ? 'N° ' + finEsc(x.n) : '<span class="ivad-sinn">sin N°</span>')
      + '</td><td><b>' + finEsc(x.concepto) + '</b>' + (x.auto ? ' <span class="ivad-chip">copiado solo</span>' : '') + '</td><td class="num">' + money(x.iva)
      + (x.pct !== 100 ? ' · ' + x.pct + ' %' : '') + '</td><td class="num"><b>' + money(x.ded) + '</b></td></tr>').join('') + '</table>';
    total += f.reduce((a, x) => a + x.ded, 0); n += f.length;
  });
  return h + '<div class="ivad-caja-tot"><span>' + n + (n === 1 ? ' factura' : ' facturas') + ' · IVA de la factura a la izquierda, lo que se deduce a la derecha</span><b>' + money(ivaR(total)) + '</b></div></div>';
}
