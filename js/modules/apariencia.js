/*
 * APARIENCIA (oct. 2026): estilo del encabezado y de la barra de pestañas, a elección en
 * ⋯ → Personalizar. Valen para las tres (state.branding.encabezado / state.branding.barraPestanas).
 * Estilos en css/apariencia.css. Se aplican con una clase en <body>: enc-<id> y barra-<id>.
 *
 * Además, en todas las opciones: la rueda del mouse mueve las pestañas de costado y la pestaña
 * abierta queda siempre a la vista.
 */
const ENC_ESTILOS = [
  { id: 'clasico',  label: 'Clásico',               desc: 'El de siempre.' },
  { id: 'brillo',   label: 'Brillo plateado',       desc: 'Un reflejo plateado que cruza cada tanto. Animado.' },
  { id: 'degrade',  label: 'Degradé en movimiento', desc: 'Azules que se mueven muy despacio. Animado.' },
  { id: 'lino',     label: 'Textura de lino',       desc: 'Un tejido fino, apenas visible.' },
  { id: 'lineas',   label: 'Líneas finas',          desc: 'Trama de líneas curvas, como la de un billete.' }
];
const BARRA_ESTILOS = [
  { id: 'clasica',   label: 'Clásica',     desc: 'La de siempre: la barra azul debajo de las pestañas.' },
  { id: 'fina',      label: 'Fina',        desc: 'Una línea finita, casi transparente.' },
  { id: 'flechas',   label: 'Con flechas', desc: 'Botones ‹ › en las puntas para moverse.' },
  { id: 'plateada',  label: 'Plateada',    desc: 'Una barra más visible, redondeada.' },
  { id: 'oculta',    label: 'Oculta',      desc: 'Sin barra; los bordes se difuminan.' }
];
function encEstilo()   { const v = state && state.branding && state.branding.encabezado;    return ENC_ESTILOS.some(x => x.id === v) ? v : 'clasico'; }
function barraEstilo() { const v = state && state.branding && state.branding.barraPestanas; return BARRA_ESTILOS.some(x => x.id === v) ? v : 'clasica'; }

function aplicarApariencia() {
  const b = document.body; if (!b) return;
  ENC_ESTILOS.forEach(x => b.classList.toggle('enc-' + x.id, x.id === encEstilo()));
  BARRA_ESTILOS.forEach(x => b.classList.toggle('barra-' + x.id, x.id === barraEstilo()));
  // Logo del encabezado: solo el monograma WM (por defecto) o el logo completo.
  b.classList.toggle('logo-monograma', logoEstilo() === 'monograma');
  // Íconos sobrios (js/modules/iconos.js)
  if (typeof iconosEstilo === 'function') { b.classList.toggle('iconos-sobrios', iconosEstilo() === 'sobrios'); iconosAplicar(); }
  pestanasFlechas();
}
const LOGO_ESTILOS = [
  { id: 'monograma', label: 'Solo el monograma', desc: 'Las letras WM, grandes y legibles.' },
  { id: 'completo',  label: 'Logo completo',     desc: 'El recuadro entero, como antes.' }
];
function logoEstilo() { const v = state && state.branding && state.branding.logoEncabezado; return v === 'completo' ? 'completo' : 'monograma'; }
function setApariencia(campo, v) {
  if (!state.branding) state.branding = {};
  state.branding[campo] = v;
  saveState(); aplicarApariencia(); pintarAparienciaCustom();
}

/* ===== Flechas ‹ › (solo en la opción «Con flechas») ===== */
function pestanasFlechas() {
  const nav = document.getElementById('nav-tabs'); if (!nav) return;
  nav.querySelectorAll('.nav-flecha').forEach(x => x.remove());
  if (barraEstilo() !== 'flechas') return;
  const mk = (dir) => { const s = document.createElement('button'); s.className = 'nav-flecha nav-flecha-' + dir; s.type = 'button';
    s.setAttribute('aria-label', dir === 'izq' ? 'Pestañas anteriores' : 'Pestañas siguientes'); s.textContent = dir === 'izq' ? '‹' : '›';
    s.onclick = (e) => { e.stopPropagation(); nav.scrollBy({ left: (dir === 'izq' ? -1 : 1) * Math.max(200, nav.clientWidth * .6), behavior: 'smooth' }); };
    return s; };
  nav.insertBefore(mk('izq'), nav.firstChild); nav.appendChild(mk('der'));
  pestanasFlechasEstado();
}
function pestanasFlechasEstado() {
  const nav = document.getElementById('nav-tabs'); if (!nav) return;
  const max = nav.scrollWidth - nav.clientWidth;
  nav.classList.toggle('puede-izq', nav.scrollLeft > 4);
  nav.classList.toggle('puede-der', nav.scrollLeft < max - 4);
}
// La pestaña abierta, siempre a la vista.
function pestanaActivaAVista() {
  const nav = document.getElementById('nav-tabs'), a = nav && nav.querySelector('.nav-tab.active'); if (!a) return;
  const izq = a.offsetLeft - 40, der = a.offsetLeft + a.offsetWidth + 40;
  if (izq < nav.scrollLeft || der > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: Math.max(0, izq - 20), behavior: 'smooth' });
}
(function () {
  const nav = document.getElementById('nav-tabs'); if (!nav) return;
  // Rueda del mouse: si la barra se pasa de ancho, la rueda la mueve de costado.
  nav.addEventListener('wheel', function (e) {
    if (nav.scrollWidth <= nav.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    nav.scrollLeft += e.deltaY; e.preventDefault();
  }, { passive: false });
  nav.addEventListener('scroll', pestanasFlechasEstado, { passive: true });
  window.addEventListener('resize', pestanasFlechasEstado);
})();
if (typeof renderTabs === 'function') {
  const _renderTabs = renderTabs;
  renderTabs = function () { _renderTabs.apply(this, arguments); pestanasFlechas(); setTimeout(pestanaActivaAVista, 0); };
}
if (typeof applyBranding === 'function') {
  const _applyBranding = applyBranding;
  applyBranding = function () { _applyBranding.apply(this, arguments); aplicarApariencia(); };
}
aplicarApariencia();

/* ===== Las opciones en ⋯ → Personalizar ===== */
function pintarAparienciaCustom() {
  const box = document.getElementById('cust-apariencia'); if (!box) return;
  // al: qué se llama al elegir (setApariencia con su campo, o setIconos)
  const grupo = (titulo, lista, actual, al, mini) => '<div class="form-group"><label>' + titulo + '</label><div class="ap-opciones">'
    + lista.map(x => '<button type="button" class="ap-op' + (x.id === actual ? ' on' : '') + '" onclick="' + al(x.id) + '">'
      + '<span class="ap-mini ' + mini + '-' + x.id + '"><i></i></span><b>' + (x.id === actual ? '✓ ' : '') + x.label + '</b><small>' + x.desc + '</small></button>').join('')
    + '</div></div>';
  const campo = (c) => (id) => 'setApariencia(\'' + c + '\',\'' + id + '\')';
  box.innerHTML = grupo('Estilo del encabezado', ENC_ESTILOS, encEstilo(), campo('encabezado'), 'apm-enc')
    + grupo('Logo del encabezado', LOGO_ESTILOS, logoEstilo(), campo('logoEncabezado'), 'apm-logo')
    + grupo('Barra para desplazar las pestañas', BARRA_ESTILOS, barraEstilo(), campo('barraPestanas'), 'apm-barra')
    + (typeof ICONOS_OPCIONES !== 'undefined' ? grupo('Íconos', ICONOS_OPCIONES, iconosEstilo(), (id) => 'setIconos(\'' + id + '\')', 'apm-ico') : '')
    + '<small class="ap-nota">Se ve al instante. Vale para las tres.</small>';
  // Las miniaturas de los íconos: unos de muestra de cada tipo.
  const c = box.querySelector('.apm-ico-colores'), s = box.querySelector('.apm-ico-sobrios');
  if (c) c.innerHTML = '<span class="no-iconos">🏢 💼 🧾 📋</span>';
  if (s && typeof ICO_SVG === 'function') s.innerHTML = ['edificio', 'maletin', 'recibo', 'portapapeles'].map(k => ICO_SVG(ICONOS_LINEA[k])).join('');
}
if (typeof openCustomize === 'function') {
  const _openCustomize = openCustomize;
  openCustomize = function () { _openCustomize.apply(this, arguments); pintarAparienciaCustom(); };
}
