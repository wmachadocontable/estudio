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
