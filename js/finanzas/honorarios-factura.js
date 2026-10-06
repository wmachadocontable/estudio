/*
 * HONORARIOS: MES CORRIENTE / MES VENCIDO Y FECHA DE FACTURA (06/10/2026, pedido de la usuaria)
 *
 * El casillero de cada mes es el MES DEL TRABAJO. Aparte:
 *   - cell.fFac  'AAAA-MM-DD'  fecha de la factura → el IVA va al mes de esa fecha (devengado).
 *                Vacía = el mes del casillero, como antes (lo ya cargado no se mueve).
 *   - cell.fecha 'AAAA-MM-DD'  fecha de cobro → la plata que entró (caja), como siempre.
 *   - c.facturacion 'vencido' | (vacío = mes corriente). Mes vencido: la factura se sugiere en el mes
 *                siguiente y no figura «Atrasado» hasta que termina ese mes.
 * Honorarios guarda un solo año (tab.tabYear): una factura de diciembre emitida en enero va al IVA de
 * enero del año siguiente (finHonMes lo resuelve mirando la fecha de la factura).
 */
function honEsVencido(c) { return !!c && c.facturacion === 'vencido'; }
function honYM(y, m) { return y + '-' + String(m + 1).padStart(2, '0'); }
function honImporte(cell) {
  if (!cell || cell.sinIva == null || cell.sinIva === '') return null;
  const n = Number(cell.sinIva); return (isNaN(n) || !n) ? null : n;
}
function honConFactura(cell) { return !!(cell && cell.factura && String(cell.factura).trim()); }
// El mes (AAAA-MM) al que va el IVA de ese casillero.
function honMesFactura(cell, y, m) {
  const f = cell && cell.fFac ? String(cell.fFac) : '';
  return /^\d{4}-\d{2}/.test(f) ? f.slice(0, 7) : honYM(y, m);
}
// Hasta cuándo se espera el cobro: fin del mes del trabajo, o del siguiente si es a mes vencido.
function honPlazoCobro(c, y, m) { return new Date(y, m + 1 + (honEsVencido(c) ? 1 : 0), 0, 23, 59, 59); }
function honArchivadoEn(c, y, m) {
  if (!c || !c.archivedFrom) return false;
  const p = String(c.archivedFrom).split('-').map(Number);
  return y > p[0] || (y === p[0] && m >= p[1] - 1);
}
// Fecha de factura sugerida al cargar el N°: hoy, si cae en el mes esperado; si no, el 1.º de ese mes.
function honFFacSugerida(c, y, m) {
  const d = new Date(y, m + (honEsVencido(c) ? 1 : 0), 1);
  const esperado = honYM(d.getFullYear(), d.getMonth());
  const hoy = (typeof finHoy === 'function') ? finHoy() : new Date().toISOString().slice(0, 10);
  if (hoy.slice(0, 7) === esperado) return hoy;
  return esperado + '-01';
}

/* Los números del mes (y, m) mirando los 12 casilleros de todos los clientes:
   facturado = por fecha de factura (lo que va al IVA) · cobrado = por fecha de cobro (la plata que entró). */
function honNumerosMes(hd, hy, y, m) {
  const rate = (typeof hd.taxRate === 'number') ? hd.taxRate : 0.22, ym = honYM(y, m);
  const r = { fact: 0, iva: 0, nFact: 0, deOtroMes: 0, cobr: 0, nCobr: 0 };
  (hd.clients || []).forEach(c => (c.months || []).forEach((cell, mi) => {
    const sin = honImporte(cell); if (sin == null || honArchivadoEn(c, hy, mi)) return;
    const fac = honConFactura(cell), iva = fac ? Math.round(sin * rate * 100) / 100 : 0;
    if (fac && honMesFactura(cell, hy, mi) === ym) {
      r.fact += sin + iva; r.iva += iva; r.nFact++;
      if (!(hy === y && mi === m)) r.deOtroMes++;
    }
    if (cell.fecha && String(cell.fecha).slice(0, 7) === ym) { r.cobr += sin + iva; r.nCobr++; }
  }));
  ['fact', 'iva', 'cobr'].forEach(k => { r[k] = Math.round(r[k] * 100) / 100; });
  return r;
}

/* Los indicadores de la vista mensual de Honorarios. */
function honKpisMes(tab, filas, y, m) {
  const hd = tab.honData, rate = (typeof hd.taxRate === 'number') ? hd.taxRate : 0.22;
  let del = 0, nDel = 0, pend = 0, nPend = 0, nAtr = 0;
  filas.forEach(r => {
    const sin = honImporte(r.cell); if (sin == null) return;
    const tot = sin + (honConFactura(r.cell) ? Math.round(sin * rate * 100) / 100 : 0);
    del += tot; nDel++;
    if (!r.cell.fecha) { pend += tot; nPend++; if (new Date() > honPlazoCobro(r.client, y, m)) nAtr++; }
  });
  const n = honNumerosMes(hd, y, y, m), mes = MONTHS[m].toLowerCase();
  const sub = t => '<div class="fin-kpi-sub">' + t + '</div>';
  const card = (cls, num, lbl, s) => '<div class="stat-card' + cls + '"><div class="stat-num">' + money(num) + '</div><div class="stat-label">' + lbl + '</div>' + sub(s) + '</div>';
  return '<div class="stats-bar hon-kpis">'
    + card('', del, 'Honorarios de ' + mes, nDel + ' cliente' + (nDel === 1 ? '' : 's') + ' · el trabajo de este mes')
    + card(' blue', n.fact, 'Facturado en ' + mes, 'IVA ' + money(n.iva) + ' → va a Impuestos'
      + (n.deOtroMes ? ' · ' + n.deOtroMes + ' de otro mes' : ''))
    + card(' green', n.cobr, 'Cobrado en ' + mes, n.nCobr + ' cobro' + (n.nCobr === 1 ? '' : 's') + ' por fecha de pago')
    + card(nAtr ? ' red' : '', pend, 'Pendiente de cobro', nPend ? (nAtr ? nAtr + ' atrasado' + (nAtr === 1 ? '' : 's') : 'todavía en plazo') : 'nada pendiente')
    + '</div>';
}

// Debajo del N° de factura: la fecha y, si el IVA va a otro mes, a cuál.
function honFacturaTxt(cell, y, m) {
  if (!honConFactura(cell)) return '';
  const ym = honMesFactura(cell, y, m), p = ym.split('-').map(Number);
  let h = cell.fFac ? '<span class="hon-ffac">' + String(cell.fFac).slice(8, 10) + '/' + String(cell.fFac).slice(5, 7) + '</span>' : '';
  if (ym !== honYM(y, m)) h += '<span class="hon-iva-a" title="El IVA de esta factura va al mes de la factura">IVA → ' + MONTHS_SHORT[p[1] - 1].toLowerCase() + (p[0] !== y ? ' ' + p[0] : '') + '</span>';
  return h;
}
function honVencidoChip(c) { return honEsVencido(c) ? ' <span class="hon-venc-chip" title="Factura a mes vencido">mes vencido</span>' : ''; }

/* Ventana del casillero: el campo «Fecha de factura» se completa solo al escribir el N° (si está vacío). */
function honFFacAlEscribir(c, y, m) {
  const fac = document.getElementById('hon-f-fac'), ff = document.getElementById('hon-f-ffac');
  if (!fac || !ff) return;
  if (fac.value.trim() && !ff.value) ff.value = honFFacSugerida(c, y, m);
  honFFacAyuda(c, y, m);
}
function honFFacAyuda(c, y, m) {
  const ff = document.getElementById('hon-f-ffac'), el = document.getElementById('hon-f-ffac-ayuda'); if (!ff || !el) return;
  const fac = (document.getElementById('hon-f-fac') || {}).value || '';
  if (!fac.trim()) { el.textContent = 'Sin N° de factura no hay IVA.'; return; }
  const ym = ff.value ? ff.value.slice(0, 7) : honYM(y, m), p = ym.split('-').map(Number);
  el.textContent = 'El IVA va a ' + MONTHS[p[1] - 1] + ' ' + p[0] + (ff.value ? '' : ' (sin fecha: el mes del trabajo)') + '.';
}
