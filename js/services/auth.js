// Auth/session/authorization base extracted from app.js (Etapa 13).
// Classic scripts only: global functions and variables.

// ===== AUTENTICACION REAL (Firebase Auth) =====
// Cada usuaria interna se mapea a un "mail oculto" de Firebase Auth. En pantalla
// siguen entrando con su nombre; por detras se autentica contra Firebase.
const AUTH_EMAIL_MAP = { 'Daniela':'daniela@wmachado.com', 'Wendy':'wendy@wmachado.com', 'Lorena':'lorena@wmachado.com' };
function nameToAuthEmail(name){ return AUTH_EMAIL_MAP[name] || null; }
function authEmailToName(email){ email=(email||'').toLowerCase(); for(var n in AUTH_EMAIL_MAP){ if(AUTH_EMAIL_MAP[n].toLowerCase()===email) return n; } return null; }

// El usuario actualmente logueado
function currentUser() {
  const s = getSession();
  if (!s || !s.user) return null;
  const u = findUserByName(s.user);
  if (!u) return null;
  // 🔧 Si la sesión actual es de mantenimiento, devolver el usuario con rol "admin" virtualmente
  // (esto permite que durante mantenimiento se tengan permisos completos en la cuenta accedida)
  if (sessionStorage.getItem('wm_maintenance_mode') === '1' && u.role !== 'admin') {
    return Object.assign({}, u, { role: 'admin', _maintenanceElevation: true, _originalRole: u.role });
  }
  return u;
}

// ¿El usuario actual tiene rol >= que el requerido?
function userHasRole(requiredRole) {
  const u = currentUser();
  if (!u) return false;
  const userIdx = ROLES.indexOf(u.role || 'editor');
  const reqIdx = ROLES.indexOf(requiredRole);
  if (userIdx < 0 || reqIdx < 0) return false;
  return userIdx <= reqIdx; // admin(0) <= editor(1) → true
}

function isAdmin()  { return userHasRole('admin'); }
function isEditor() { return userHasRole('editor'); }
function isViewer() { return userHasRole('viewer'); }

// Guardia: si la acción requiere rol y no lo tiene, muestra toast y retorna false
function requireRole(role, action) {
  if (userHasRole(role)) return true;
  toast('⛔ No tenés permiso para: ' + (action || 'esa acción'));
  return false;
}

async function doLogin() {
  const userName = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  if (!userName) { errEl.textContent = 'Seleccioná un usuario'; return; }
  if (!pass) { errEl.textContent = 'Ingresá la contraseña'; return; }
  const email = nameToAuthEmail(userName);
  if (!email) { errEl.textContent = '✕ Usuario no habilitado'; return; }
  if (typeof firebase === 'undefined' || !firebase.auth) {
    errEl.textContent = '✕ No se pudo conectar con el servidor de acceso'; return;
  }
  errEl.textContent = '⏳ Verificando…';
  try {
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    errEl.textContent = ''; // onAuthStateChanged se encarga de entrar a la app
  } catch (e) {
    document.getElementById('login-pass').value = '';
    const code = e && e.code;
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential' || code === 'auth/user-not-found') {
      errEl.textContent = '✕ Usuario o contraseña incorrectos';
    } else if (code === 'auth/too-many-requests') {
      errEl.textContent = '✕ Demasiados intentos. Esperá unos minutos.';
    } else if (code === 'auth/network-request-failed') {
      errEl.textContent = '✕ Sin conexión. Revisá internet.';
    } else {
      errEl.textContent = '✕ No se pudo iniciar sesión' + (code ? ' ('+code+')' : '');
    }
  }
}

function doLogout() {
  if (!confirm('¿Cerrar sesión?')) return;
  try { if (typeof firebase !== 'undefined' && firebase.auth) firebase.auth().signOut(); } catch(e){}
  try { if (typeof vaultLock === 'function') vaultLock(); } catch(e){}
  // Sesión 6: registrar logout y parar presencia
  logAudit('logout', 'session', 'Cerró sesión', null, null);
  saveState();
  if (typeof stopPresence === 'function') stopPresence();
  // Sesión 7: parar chat
  if (typeof stopChat === 'function') stopChat();
  // Limpiar flag de mantenimiento si quedó activo
  sessionStorage.removeItem('wm_maintenance_mode');
  sessionStorage.removeItem('wm_maintenance_user');
  clearSession();
  // Sesión 5: limpiar pestañas desbloqueadas por sesión
  if (typeof _unlockedTabsThisSession !== 'undefined') _unlockedTabsThisSession.clear();
  document.getElementById('login-pass').value = '';
  document.getElementById('login-user').value = '';
  showLogin();
}
