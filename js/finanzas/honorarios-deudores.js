/*
 * HONORARIOS ATRASADOS (oct. 2026) — solo Wendy (como toda Finanzas).
 * - «Quién debe»: arriba de Honorarios, la lista de clientes con meses sin cobrar, con el total
 *   y un botón para copiarla (para mandarla por WhatsApp o mail).
 * - Campanita: una vez por día, al entrar, «N clientes deben honorarios ($ total)».
 * Atrasado = igual que en Honorarios: el mes ya terminó, tiene importe y no tiene fecha de cobro.
 * Honorarios guarda un solo año (tab.tabYear): se mira ese año.
 */
if (typeof NOTIF_TYPES !== 'undefined' && !NOTIF_TYPES.some(t => t.key === 'honorarios')) {
  NOTIF_TYPES.push({ key: 'honorarios', icon: '💲', label: 'Honorarios atrasados', desc: 'Resumen diario de los clientes que deben honorarios (solo Wendy)' });
}

function honDeudores() {
  const t = finHonTab(); if (!t) return [];
  const hd = t.honData, y = finHonAnio(), rate = (typeof hd.taxRate === 'number') ? hd.taxRate : 0.22;
  const hoy = new Date();
  const out = [];
  (hd.clients || []).forEach(c => {
    const meses = [];
    (c.months || []).forEach((cell, m) => {
      if (!cell) return;
      const sin = Number(cell.sinIva); if (cell.sinIva == null || cell.sinIva === '' || isNaN(sin) || !sin) return;
      if (cell.fecha) return;                                             // cobrado
      if (new Date(y, m + 1, 0, 23, 59, 59) >= hoy) return;              // el mes todavía no terminó
      if (c.archivedFrom) { const p = c.archivedFrom.split('-').map(Number); if (y > p[0] || (y === p[0] && m >= p[1] - 1)) return; }
      const conFac = !!(cell.factura && String(cell.factura).trim());
      meses.push({ m, importe: Math.round((sin + (conFac ? sin * rate : 0)) * 100) / 100 });
    });
    if (meses.length) out.push({ id: c.id, nombre: c.name || '(sin nombre)', meses, total: meses.reduce((a, x) => a + x.importe, 0) });
  });
  return out.sort((a, b) => b.total - a.total);
}

function honDeudoresHTML() {
  const l = honDeudores();
  if (!l.length) return '<div class="hon-deu hon-deu-ok">✓ Nadie debe honorarios de meses anteriores.</div>';
  const total = l.reduce((a, x) => a + x.total, 0);
  const abierto = userPrefs.honDeuAbierto !== false;
  return '<details class="hon-deu"' + (abierto ? ' open' : '') + ' ontoggle="userPrefs.honDeuAbierto=this.open;saveUserPrefs()">'
    + '<summary><span class="hon-deu-t">⚠ Quién debe</span><span class="hon-deu-n">' + l.length + ' cliente' + (l.length === 1 ? '' : 's')
    + ' · <b>' + money(total) + '</b></span><button class="btn btn-outline btn-sm" onclick="event.preventDefault();honDeudoresCopiar()">📋 Copiar lista</button></summary>'
    + '<table class="hon-deu-t2"><thead><tr><th>Cliente</th><th>Meses sin cobrar</th><th class="num">Total</th></tr></thead><tbody>'
    + l.map(x => '<tr><td><b>' + finEsc(x.nombre) + '</b></td><td>' + x.meses.map(k => '<span class="hon-deu-mes" title="' + money(k.importe) + '">' + MONTHS_SHORT[k.m] + '</span>').join(' ')
      + '</td><td class="num">' + money(x.total) + '</td></tr>').join('')
    + '</tbody></table><div class="hon-deu-pie">Para que deje de figurar, cargá la fecha de cobro en ese mes. Los montos incluyen IVA cuando hay N° de factura.</div></details>';
}
function honDeudoresTexto() {
  const l = honDeudores(), y = finHonAnio();
  return 'Honorarios pendientes de cobro (' + y + ') — ' + new Date().toLocaleDateString('es-UY') + '\n\n'
    + l.map(x => '• ' + x.nombre + ': ' + x.meses.map(k => MONTHS[k.m]).join(', ') + ' — ' + money(x.total)).join('\n')
    + '\n\nTotal: ' + money(l.reduce((a, x) => a + x.total, 0));
}
function honDeudoresCopiar() {
  const t = honDeudoresTexto();
  const ok = () => toast('📋 Lista copiada: pegala donde quieras');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, () => prompt('Copiá la lista:', t));
  else prompt('Copiá la lista:', t);
}

// Campanita: una vez por día, a Wendy.
function honAvisoDiario() {
  if (typeof finEsDuena !== 'function' || !finEsDuena()) return;
  const yo = currentUser().name, hoy = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0, 10);
  if (!userPrefs.honAvisoDia) userPrefs.honAvisoDia = {};
  if (userPrefs.honAvisoDia[yo] === hoy) return;
  userPrefs.honAvisoDia[yo] = hoy; saveUserPrefs();
  const l = honDeudores(); if (!l.length) return;
  const total = l.reduce((a, x) => a + x.total, 0);
  fireNotification('honorarios', '💲 Honorarios atrasados',
    l.length + (l.length === 1 ? ' cliente debe' : ' clientes deben') + ' ' + money(total) + ': '
    + l.slice(0, 3).map(x => x.nombre).join(', ') + (l.length > 3 ? '…' : '') + '. La lista está en Finanzas → Honorarios.',
    { link: { type: 'tab', tabId: 'finanzas' } });
}
if (typeof showApp === 'function') {
  const _showAppHon = showApp;
  showApp = function () { _showAppHon.apply(this, arguments); setTimeout(() => { try { honAvisoDiario(); } catch (e) { console.warn(e); } }, 3200); };
}
