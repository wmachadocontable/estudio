/*
 * PANTALLA DE INGRESO (oct. 2026): el fondo a elección y el saludo.
 * El fondo se guarda en state.branding.loginFondo ('elegante' | 'clasico') y vale para las tres:
 * se lee del último estado guardado en el navegador, así ya se ve antes de entrar.
 * Estilos en css/ingreso.css. La tarjeta para elegirlo está en Configuración (ingresoCfgCard).
 */
const LOGIN_FONDOS = [
  { id: 'elegante', label: 'Elegante', desc: 'Azul marino con luces plateadas que se mueven despacio.' },
  { id: 'clasico',  label: 'Clásico',  desc: 'El de siempre, quieto.' }
];
function loginFondo() {
  const f = state && state.branding && state.branding.loginFondo;
  return f === 'clasico' ? 'clasico' : 'elegante';
}
function aplicarFondoIngreso() {
  const el = document.getElementById('login-screen'); if (!el) return;
  const f = loginFondo();
  LOGIN_FONDOS.forEach(x => el.classList.toggle('fondo-' + x.id, x.id === f));
  const s = document.getElementById('login-saludo');
  if (s) { const h = new Date().getHours(); s.textContent = h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches'; }
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
  aplicarFondoIngreso();
  const img = document.getElementById('login-logo-img');
  if (img && state.branding) { img.src = state.branding.logo; img.className = state.branding.logoInvert ? 'invert' : ''; }
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
      + '<div class="ing-mini ' + x.id + '"></div><b>' + (x.id === f ? '✓ ' : '') + x.label + '</b><span>' + x.desc + '</span></button>').join('') + '</div>'
    + '<button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="verIngresoPrevia()">👁 Ver cómo queda</button></div>';
}
