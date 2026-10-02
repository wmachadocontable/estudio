/*
 * PANTALLA DE INGRESO (oct. 2026): el fondo a elección y el saludo.
 * El fondo se guarda en state.branding.loginFondo ('elegante' | 'ondas' | 'clasico') y vale para
 * las tres: se lee del último estado guardado en el navegador, así ya se ve antes de entrar.
 * Estilos en css/ingreso.css. La tarjeta para elegirlo está en Configuración (ingresoCfgCard).
 */
const LOGIN_FONDOS = [
  { id: 'elegante', label: 'Luces',   animado: true,  desc: 'Azul marino con luces plateadas que se mueven despacio.' },
  { id: 'ondas',    label: 'Ondas',   animado: true,  desc: 'Ondas plateadas que avanzan y partículas que suben.' },
  { id: 'clasico',  label: 'Clásico', animado: false, desc: 'El de siempre, quieto.' }
];
function loginFondo() {
  const f = state && state.branding && state.branding.loginFondo;
  return LOGIN_FONDOS.some(x => x.id === f) ? f : 'elegante';
}
// Saludo según la hora (lo usan el ingreso y el Panel).
function saludoHora() {
  const h = new Date().getHours();
  return h >= 6 && h < 13 ? 'Buenos días' : h >= 13 && h < 20 ? 'Buenas tardes' : 'Buenas noches';
}
function aplicarFondoIngreso() {
  const el = document.getElementById('login-screen'); if (!el) return;
  const f = loginFondo(), def = LOGIN_FONDOS.find(x => x.id === f);
  LOGIN_FONDOS.forEach(x => el.classList.toggle('fondo-' + x.id, x.id === f));
  el.classList.toggle('ing-animada', !!def.animado);
  // Logo blanco (invertido): necesita fondo azul y mostrar el título. Se marca acá (sin :has(), que
  // algunos navegadores viejos no entienden).
  const card = el.querySelector('.login-card');
  if (card) card.classList.toggle('logo-blanco', !!(state && state.branding && state.branding.logoInvert));
  const s = document.getElementById('login-saludo');
  if (s) s.textContent = saludoHora();
}
// Cada vez que se muestra el ingreso, con el fondo elegido.
if (typeof showLogin === 'function') {
  const _showLogin = showLogin;
  showLogin = function () { _showLogin.apply(this, arguments); aplicarFondoIngreso(); };
}
aplicarFondoIngreso();

function setLoginFondo(f) {
  if (!state.branding) state.branding = {};
  state.branding.loginFondo = f;
  saveState(); aplicarFondoIngreso(); renderContent();
  toast('✓ Pantalla de ingreso: ' + (LOGIN_FONDOS.find(x => x.id === f) || {}).label);
}
// Muestra la pantalla de ingreso como se va a ver, sin cerrar la sesión.
function verIngresoPrevia() {
  const el = document.getElementById('login-screen'); if (!el) return;
  const img = document.getElementById('login-logo-img');
  if (img && state.branding) { img.src = state.branding.logo; img.className = state.branding.logoInvert ? 'invert' : ''; }
  aplicarFondoIngreso();
  el.classList.add('vista-previa'); el.style.display = 'flex';
  const b = document.createElement('button');
  b.className = 'ing-cerrar-previa'; b.textContent = '✕ Cerrar vista previa';
  b.onclick = () => { el.classList.remove('vista-previa'); el.style.display = 'none'; b.remove(); };
  document.body.appendChild(b);
}
function ingresoCfgCard() {
  const f = loginFondo();
  return '<div class="settings-card"><h4>Pantalla de ingreso</h4>'
    + '<p style="font-size:13px;color:var(--c-text-muted);margin:6px 0 4px;">El fondo que se ve antes de entrar. Vale para las tres.</p>'
    + '<div class="ing-opciones">' + LOGIN_FONDOS.map(x => '<button class="ing-op' + (x.id === f ? ' on' : '') + '" onclick="setLoginFondo(\'' + x.id + '\')">'
      + '<div class="ing-mini ' + x.id + '"></div><b>' + (x.id === f ? '✓ ' : '') + x.label + (x.animado ? ' <small>· animado</small>' : '') + '</b><span>' + x.desc + '</span></button>').join('') + '</div>'
    + '<button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="verIngresoPrevia()">👁 Ver cómo queda</button></div>';
}

/* ===== SALUDO EN LA PÁGINA =====
   Solo arriba del Dashboard (no en Personal): «Buenos días, Wendy · viernes 2 de octubre».
   El ícono es el CLIMA DE RIVERA en este momento (sol, nublado, lluvia, tormenta, viento…), con la
   temperatura al lado. Sale de Open-Meteo (gratis, sin cuenta ni clave; solo se le mandan las
   coordenadas de Rivera) y se guarda 30 minutos en el navegador. Si no hay internet o el servicio
   no contesta, queda un ícono según la hora. */
const CLIMA_LUGAR = { nombre: 'Rivera', lat: -30.9053, lon: -55.5508 };
const CLIMA_VIGENCIA_MIN = 30;
const CLIMA_GUARDADO = 'wm_clima_rivera';

// Código del tiempo (WMO, el que usa Open-Meteo) → ícono y palabra.
function climaDe(codigo, esDeDia, vientoKmh) {
  const c = Number(codigo);
  let ico, txt;
  if (c >= 95)                    { ico = '⛈️'; txt = 'Tormenta'; }
  else if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) { ico = '🌧️'; txt = 'Lluvia'; }
  else if (c >= 51 && c <= 57)    { ico = '🌦️'; txt = 'Llovizna'; }
  else if ((c >= 71 && c <= 77) || c === 85 || c === 86) { ico = '🌨️'; txt = 'Nieve'; }
  else if (c === 45 || c === 48)  { ico = '🌫️'; txt = 'Niebla'; }
  else if (c === 3)               { ico = '☁️'; txt = 'Nublado'; }
  else if (c === 2)               { ico = esDeDia ? '⛅' : '☁️'; txt = 'Parcialmente nublado'; }
  else if (c === 1)               { ico = esDeDia ? '🌤️' : '🌙'; txt = 'Mayormente despejado'; }
  else                            { ico = esDeDia ? '☀️' : '🌙'; txt = 'Despejado'; }
  // Mucho viento (y sin lluvia ni tormenta): manda el viento.
  if (vientoKmh >= 35 && c < 51) { ico = '💨'; txt = 'Ventoso'; }
  return { ico, txt };
}
function climaPorHora() { const h = new Date().getHours(); return { ico: h >= 6 && h < 20 ? '☀️' : '🌙', txt: '' }; }

let _climaPedido = null;
function climaRivera() {
  try {
    const g = JSON.parse(localStorage.getItem(CLIMA_GUARDADO) || 'null');
    if (g && Date.now() - g.at < CLIMA_VIGENCIA_MIN * 60000) return Promise.resolve(g);
  } catch (e) {}
  if (_climaPedido) return _climaPedido;
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + CLIMA_LUGAR.lat + '&longitude=' + CLIMA_LUGAR.lon
    + '&current=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=America%2FMontevideo';
  _climaPedido = fetch(url).then(r => { if (!r.ok) throw new Error('clima ' + r.status); return r.json(); }).then(j => {
    const a = j.current || {};
    const g = { at: Date.now(), codigo: a.weather_code, dia: a.is_day === 1, viento: a.wind_speed_10m || 0, temp: a.temperature_2m };
    try { localStorage.setItem(CLIMA_GUARDADO, JSON.stringify(g)); } catch (e) {}
    return g;
  }).finally(() => { _climaPedido = null; });
  return _climaPedido;
}
// Pone el ícono y la temperatura en el saludo que esté en pantalla.
function climaPintar() {
  climaRivera().then(g => {
    const k = climaDe(g.codigo, g.dia, g.viento);
    const ico = document.getElementById('saludo-ico'), info = document.getElementById('saludo-clima');
    if (ico) { ico.textContent = k.ico; ico.title = CLIMA_LUGAR.nombre + ': ' + k.txt; }
    if (info) info.textContent = ' · ' + CLIMA_LUGAR.nombre + ' ' + Math.round(g.temp) + '° · ' + k.txt.toLowerCase();
  }).catch(() => { /* sin clima: queda el ícono según la hora */ });
}

function saludoHTML() {
  const u = (typeof currentUser === 'function') ? currentUser() : null;
  const nombre = u ? (u.displayName || u.name) : '';
  const fecha = new Date().toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' });
  return '<div class="saludo-app"><span class="saludo-ico" id="saludo-ico">' + climaPorHora().ico + '</span><div><div class="saludo-t">' + saludoHora()
    + (nombre ? ', ' + bbEscape(nombre) : '') + '</div><div class="saludo-f">' + fecha + '<span id="saludo-clima"></span></div></div></div>';
}
if (typeof registerTabRenderer === 'function') {
  registerTabRenderer('dashboard', (tab, mc) => { mc.innerHTML = saludoHTML() + renderDashboard(); attachDashboardHandlers(); climaPintar(); });
}
