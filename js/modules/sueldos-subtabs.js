/*
 * SUELDOS — SUBPESTAÑAS PROPIAS (oct. 2026, pedido de la usuaria)
 *
 * «+ Subpestaña» crea una nueva (ej. Aguinaldos). Funciona como Sueldos pero solo con Recibos
 * (Liquidados → Enviados): sus filas nacen con la factura BPS en «No lleva». Tiene Envía, Grupo y
 * Observaciones, se copia de un mes al otro y sus pendientes van a la bandeja y a la campanita.
 * La ✕ de una subpestaña la QUITA (queda oculta, no se borra nada) y desde «Ocultas» se vuelve a mostrar.
 * Sueldos y Controles no se pueden quitar.
 * Datos: state.sueldosSubs = { extra:[{ id, nombre, _alta }], ocultas:{ clave:{u,t} } } (ayudas en sueldos.js).
 */
function sldSubsDatos() {
  if (!state.sueldosSubs || typeof state.sueldosSubs !== 'object') state.sueldosSubs = {};
  if (!Array.isArray(state.sueldosSubs.extra)) state.sueldosSubs.extra = [];
  if (!state.sueldosSubs.ocultas || typeof state.sueldosSubs.ocultas !== 'object') state.sueldosSubs.ocultas = {};
  return state.sueldosSubs;
}
async function sldSubNueva() {
  const nombre = await pedirCliente({ titulo: 'Nueva subpestaña de Sueldos', sub: 'Funciona como Sueldos, solo con Recibos (sin factura BPS).',
    etiqueta: 'Nombre', placeholder: 'Ej.: Aguinaldos', boton: 'Crear', lista: false });
  if (!nombre) return;
  const n = nombre.trim(), d = sldSubsDatos();
  const ya = sldSubsTodas().find(x => x.nombre.trim().toLowerCase() === n.toLowerCase());
  if (ya) {
    if (d.ocultas[ya.key]) { sldSubMostrar(ya.key); return; }
    toast('Ya existe «' + ya.nombre + '»'); setSueldosSubtab(ya.key); return;
  }
  let id = 'sx_' + sldSlug(n), k = 2;
  while (sldSubKeys().includes(id)) id = 'sx_' + sldSlug(n) + '_' + (k++);
  d.extra.push({ id, nombre: n, _alta: { u: sldYo() || null, t: sldAhora() } });
  ensureSueldosMonth(getCurrentSueldosMonth());
  userPrefs.sueldosSubtab = id; saveUserPrefs();
  sldGuardar();
  toast('✓ Subpestaña «' + n + '» creada. Agregá las empresas con «+ Agregar fila».');
}
function sldSubOcultar(key) {
  const x = sldSubsTodas().find(s => s.key === key); if (!x || x.fija) return;
  if (!confirm('¿Quitar la subpestaña «' + x.nombre + '»?\n\nNo se borra nada: queda oculta y la podés volver a mostrar desde «Ocultas».')) return;
  sldSubsDatos().ocultas[key] = { u: sldYo() || null, t: sldAhora() };
  if (userPrefs.sueldosSubtab === key) { userPrefs.sueldosSubtab = 'sueldos'; saveUserPrefs(); }
  sldGuardar();
  toast('Subpestaña «' + x.nombre + '» quitada');
}
function sldSubMostrar(key) {
  if (typeof sldMenuCerrar === 'function') sldMenuCerrar();
  const d = sldSubsDatos(); delete d.ocultas[key];
  ensureSueldosMonth(getCurrentSueldosMonth());
  userPrefs.sueldosSubtab = key; saveUserPrefs();
  sldGuardar();
  toast('✓ «' + sldSubNombre(key) + '» vuelve a estar');
}
// El menú de las subpestañas quitadas (con quién la quitó y cuándo).
function sldMenuOcultas(ev) {
  const o = sldSubsCfg().ocultas;
  const lista = sldSubsTodas().filter(x => !x.fija && o[x.key]);
  sldMenu(ev, '<div class="sld-menu-t">Subpestañas quitadas</div>'
    + lista.map(x => '<button class="sld-menu-op" onclick="sldSubMostrar(\'' + x.key + '\')">↩ ' + bbEscape(x.nombre)
      + '<small class="sld-menu-sub">quitada por ' + bbEscape(o[x.key].u ? sldNombre(o[x.key].u) : 'alguien') + ' · ' + sldFechaLarga(o[x.key].t) + '</small></button>').join('')
    + '<div class="sld-menu-ayuda">Sus datos siguen guardados: al volver a mostrarla aparece todo como estaba.</div>');
}
