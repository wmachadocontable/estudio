/*
 * CLIENTES YA CARGADOS (oct. 2026): al agregar una fila en cualquier pestaña (Empresas, Sv.
 * Profesionales, Sueldos, Controles, Declaraciones, Honorarios) el campo del nombre despliega los
 * clientes de Info. Clientes. Igual se puede escribir uno que no esté.
 *
 * - <datalist id="dl-clientes"> con los nombres (sin los archivados). La lista que se ve la arma
 *   js/modules/lista.js (la del navegador no anda en el celular). Se actualiza justo antes de abrirse.
 * - pedirCliente({...}) reemplaza a los prompt() de «Nombre de la empresa»: una ventanita con la lista.
 */
function clientesNombres() {
  const vistos = new Set(), out = [];
  (state.clientes || []).forEach(c => {
    const n = String((c && c.nombre) || '').trim();
    if (!n || c.archived || vistos.has(n.toLowerCase())) return;
    vistos.add(n.toLowerCase()); out.push(n);
  });
  return out.sort((a, b) => a.localeCompare(b, 'es'));
}
function clientesDatalist() {
  let dl = document.getElementById('dl-clientes');
  if (!dl) { dl = document.createElement('datalist'); dl.id = 'dl-clientes'; document.body.appendChild(dl); }
  dl.innerHTML = clientesNombres().map(n => '<option value="' + bbEscape(n) + '"></option>').join('');
  return dl;
}
// Antes de que lista.js arme las opciones (este listener va en captura: corre primero).
document.addEventListener('focusin', function (e) {
  const el = e.target;
  if (el && el.getAttribute && (el.getAttribute('list') === 'dl-clientes' || el.getAttribute('data-lista') === 'dl-clientes')) clientesDatalist();
}, true);

// Ventanita para pedir un nombre con la lista de clientes. Devuelve una promesa con el texto (o null).
function pedirCliente(o) {
  o = o || {};
  clientesDatalist();
  let ov = document.getElementById('modal-pedir-cliente');
  if (!ov) {
    ov = document.createElement('div');
    ov.className = 'modal-overlay'; ov.id = 'modal-pedir-cliente';
    ov.innerHTML = '<div class="modal pc-modal"><button class="modal-close" data-pc="no">×</button><h3 id="pc-titulo"></h3>'
      + '<div class="modal-sub" id="pc-sub"></div><div class="form-group"><label id="pc-etiqueta"></label>'
      + '<input type="text" id="pc-nombre" list="dl-clientes" autocomplete="off"></div>'
      + '<div class="pc-ayuda">Elegí uno de Info. Clientes o escribí un nombre nuevo.</div>'
      + '<div class="form-actions"><button class="btn btn-outline" data-pc="no">Cancelar</button><button class="btn btn-gold" data-pc="si" id="pc-ok"></button></div></div>';
    document.body.appendChild(ov);
  }
  document.getElementById('pc-titulo').textContent = o.titulo || 'Agregar';
  document.getElementById('pc-sub').textContent = o.sub || '';
  document.getElementById('pc-etiqueta').textContent = o.etiqueta || 'Cliente';
  document.getElementById('pc-ok').textContent = o.boton || 'Agregar';
  const inp = document.getElementById('pc-nombre');
  inp.value = o.valor || ''; inp.placeholder = o.placeholder || 'Empezá a escribir…';
  // o.lista === false: un texto cualquiera (sin la lista de Info. Clientes).
  const ayuda = ov.querySelector('.pc-ayuda');
  if (o.lista === false) { inp.removeAttribute('list'); inp.removeAttribute('data-lista'); inp.classList.remove('con-lista'); if (ayuda) ayuda.style.display = 'none'; }
  else { inp.setAttribute('data-lista', 'dl-clientes'); inp.classList.add('con-lista'); if (ayuda) ayuda.style.display = ''; }
  ov.classList.add('open');
  setTimeout(() => inp.focus(), 80);
  return new Promise(resolve => {
    const fin = (v) => { ov.classList.remove('open'); ov.onclick = null; inp.onkeydown = null; resolve(v); };
    ov.onclick = (e) => {
      const b = e.target.closest && e.target.closest('[data-pc]');
      if (b) { const v = inp.value.trim(); if (b.getAttribute('data-pc') === 'si') { if (!v) { toast('Escribí un nombre'); return; } fin(v); } else fin(null); }
      else if (e.target === ov) fin(null);
    };
    inp.onkeydown = (e) => {
      if (e.key === 'Enter' && !document.querySelector('.lista-pop.abierto')) { e.preventDefault(); const v = inp.value.trim(); if (v) fin(v); }
      if (e.key === 'Escape' && !document.querySelector('.lista-pop.abierto')) fin(null);
    };
  });
}

// Empresas y Sv. Profesionales: el campo de la ventana «Agregar a…» ya trae la lista.
(function () { const i = document.getElementById('modal-add-name'); if (i) { i.setAttribute('list', 'dl-clientes'); i.setAttribute('autocomplete', 'off'); } })();
