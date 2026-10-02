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
   Arriba del Dashboard y de Personal: «Buenos días, Wendy · jueves 2 de octubre». */
function saludoHTML() {
  const u = (typeof currentUser === 'function') ? currentUser() : null;
  const nombre = u ? (u.displayName || u.name) : '';
  const h = new Date().getHours(), ico = h >= 6 && h < 13 ? '☀️' : h >= 13 && h < 20 ? '🌤️' : '🌙';
  const fecha = new Date().toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' });
  return '<div class="saludo-app"><span class="saludo-ico">' + ico + '</span><div><div class="saludo-t">' + saludoHora()
    + (nombre ? ', ' + bbEscape(nombre) : '') + '</div><div class="saludo-f">' + fecha + '</div></div></div>';
}
if (typeof registerTabRenderer === 'function') {
  registerTabRenderer('dashboard', (tab, mc) => { mc.innerHTML = saludoHTML() + renderDashboard(); attachDashboardHandlers(); });
  registerTabRenderer('mydash', (tab, mc) => { mc.innerHTML = saludoHTML() + renderMyDashboard(tab); });
}
