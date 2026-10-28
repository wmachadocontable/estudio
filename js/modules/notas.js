/*
 * NOTAS ADHESIVAS de Personal (oct. 2026): el aspecto de las del demo de María Lucía
 * (papel pastel, cinta arriba, leve inclinación, fecha, círculos de colores), sin perder nada de
 * lo que ya hacían acá (escribir sobre la nota, formato, tamaños, grupos, compartir, notas del
 * estudio). El armado sigue en app.js (renderStickyNote); estilos en css/notas.css.
 */

// Las notas viejas tienen colores fuertes: se muestran con su equivalente pastel (no se toca el dato).
const NOTA_COLOR_SUAVE = {
  '#fff3a0': '#fff3bf', '#ffe0b2': '#ffe4c4', '#c5f5d4': '#d3f0dd', '#bbdefb': '#d6e6fb',
  '#f8bbd0': '#ffd8e4', '#e1bee7': '#eadcf7', '#d7ccc8': '#ece4df'
};
function notaColor(c) { c = String(c || '').toLowerCase(); return NOTA_COLOR_SUAVE[c] || c || STICKY_COLORS[0]; }

// La fecha abajo de la nota: «02/10» (con el año si no es este).
function notaFechaHTML(n) {
  if (!n || !n.ts) return '';
  const d = new Date(n.ts); if (isNaN(d)) return '';
  const dd = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
  return '<div class="nota-fecha">' + dd + (d.getFullYear() !== new Date().getFullYear() ? '/' + d.getFullYear() : '') + '</div>';
}

// Los círculos de colores (como en María Lucía), en un globito al lado del botón 🎨.
function notaPaleta(ev, id, esEstudio) {
  ev.stopPropagation();
  notaPaletaCerrar();
  const n = findStickyNote(id, esEstudio); if (!n) return;
  const actual = notaColor(n.color);
  const p = document.createElement('div');
  p.id = 'nota-paleta'; p.className = 'nota-paleta';
  p.innerHTML = STICKY_COLORS.map(c => '<button class="ncol' + (c === actual ? ' active' : '') + '" style="background:' + c + '" title="Este color"'
    + ' onclick="notaSetColor(\'' + id + '\',' + (esEstudio ? 'true' : 'false') + ',\'' + c + '\')"></button>').join('');
  document.body.appendChild(p);
  const b = ev.currentTarget.getBoundingClientRect();
  p.style.top = (b.bottom + 6) + 'px';
  p.style.left = Math.max(8, Math.min(b.right - p.offsetWidth, window.innerWidth - p.offsetWidth - 8)) + 'px';
  setTimeout(() => document.addEventListener('click', notaPaletaFuera), 0);
}
function notaPaletaFuera(e) { const p = document.getElementById('nota-paleta'); if (p && !p.contains(e.target)) notaPaletaCerrar(); }
function notaPaletaCerrar() { const p = document.getElementById('nota-paleta'); if (p) p.remove(); document.removeEventListener('click', notaPaletaFuera); }
function notaSetColor(id, esEstudio, c) {
  const n = findStickyNote(id, esEstudio); if (!n) return;
  n.color = c;
  notaPaletaCerrar(); saveState(); renderContent();
}

// Sin notas todavía.
function notasVacioHTML() {
  return '<div class="notas-vacio"><div class="ne-ico">🗒️</div><p>Sin notas todavía.</p>'
    + '<button class="btn btn-gold btn-sm" onclick="addMyDashStickyNote()">✎ Escribir una nota</button></div>';
}

/* ===== REALIZADAS Y PENDIENTES (27/10/2026, pedido de la usuaria) =====
   Cada nota personal tiene ✓ para marcarla como realizada (n.hecha = fecha ISO, n.hechaPor). Arriba,
   Pendientes · Realizadas · Todas (cada una el suyo: userPrefs.notasFiltro, por defecto Pendientes).
   No se borra nada: una realizada solo pasa a la otra lista. Las «Notas del estudio» no cambian. */
function notasFiltro() { const f = userPrefs.notasFiltro; return (f === 'hechas' || f === 'todas') ? f : 'pendientes'; }
function setNotasFiltro(f) { userPrefs.notasFiltro = f; if (typeof saveUserPrefs === 'function') saveUserPrefs(); renderContent(); }
function notasFiltrar(lista) {
  const f = notasFiltro();
  if (f === 'hechas') return lista.filter(n => n.hecha);
  if (f === 'pendientes') return lista.filter(n => !n.hecha);
  return lista;
}
function notasFiltroHTML(d) {
  const t = d.stickyNotes || [], nH = t.filter(n => n.hecha).length, nP = t.length - nH, f = notasFiltro();
  const chip = (k, l, c) => '<button class="mydash-task-chip' + (f === k ? ' active' : '') + '" onclick="setNotasFiltro(\'' + k + '\')">' + l
    + '<span class="mydash-task-chip-n">' + c + '</span></button>';
  return '<div class="notas-filtro">' + chip('pendientes', 'Pendientes', nP) + chip('hechas', 'Realizadas', nH) + chip('todas', 'Todas', t.length) + '</div>';
}
function notasVacioFiltroHTML() {
  return '<div class="mydash-empty">' + (notasFiltro() === 'hechas' ? 'Todavía no marcaste ninguna nota como realizada. Usá ✓ en la nota.'
    : '🎉 No te quedan notas pendientes. Las realizadas están en «Realizadas».') + '</div>';
}
function notaBotonHecha(n) {
  return '<button class="sticky-hecha-btn' + (n.hecha ? ' on' : '') + '" onclick="notaMarcarHecha(\'' + n.id + '\')" title="'
    + (n.hecha ? 'Volver a pendiente' : 'Marcar como realizada') + '">✓</button>';
}
function notaSelloHecha(n) {
  if (!n.hecha) return '';
  const d = new Date(n.hecha), f = isNaN(d) ? '' : ' ' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
  return '<div class="nota-sello">✓ Realizada' + f + '</div>';
}
function notaMarcarHecha(id) {
  const n = findStickyNote(id, false); if (!n) return;
  if (n.hecha) { delete n.hecha; delete n.hechaPor; } else { n.hecha = new Date().toISOString(); n.hechaPor = (currentUser() || {}).name || ''; }
  saveState(); renderContent();
  toast(n.hecha ? (notasFiltro() === 'pendientes' ? '✓ Nota realizada: la tenés en «Realizadas»' : '✓ Nota realizada') : 'La nota volvió a pendientes');
}
// «Reordenar notas»: la nota se arrastra desde el borde; desde el texto, la barra o los botones, no (así se puede escribir).
function notaArrastrable(ev, el) {
  el.draggable = !(ev.target.closest && ev.target.closest('.sticky-content, .sticky-toolbar, .sticky-actions'));
}
