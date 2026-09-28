// ============ PRIVACIDAD DE PESTAÑAS ============
// privacy = 'public' (default) | 'private_user' | 'private_password'
// privateOwners: array de nombres de usuario que pueden ver la pestaña (si privacy='private_user')
// passwordHash: hash SHA-256 de la contraseña (si privacy='private_password')

// Helper: botón de privacidad/bloqueo para mostrar en headers de pestañas
function tabPrivacyButton(tab) {
  if (!tab || tab.removable === false) return ''; // pestañas core (dashboard, sueldos, etc) no se privatizan
  const me = currentUser();
  if (!me) return '';
  const isOwner = (tab.privateOwners || []).includes(me.name);
  if (me.role !== 'admin' && !isOwner && tabPrivacy(tab) !== 'public') {
    // No-admin sin ser dueña: ve el ícono pero no puede cambiarlo (igual lo mostramos para que sepa)
    const p = tabPrivacy(tab);
    const ico = tab.locked ? '🔒' : (p === 'private_password' ? '🔐' : (p === 'private_user' ? '👁' : '🔓'));
    return `<button class="btn btn-outline btn-sm" disabled title="Solo el admin o la dueña puede cambiar la privacidad" style="opacity:0.6;cursor:not-allowed;">${ico}</button>`;
  }
  const p = tabPrivacy(tab);
  const ico = tab.locked ? '🔒' : (p === 'private_password' ? '🔐' : (p === 'private_user' ? '👁' : '🔓'));
  const title = tab.locked ? 'Bloqueada · clic para configurar' : (p === 'public' ? 'Pública · clic para hacer privada' : 'Privada · clic para configurar');
  return `<button class="btn btn-outline btn-sm" onclick="openTabPrivacySettings('${tab.id}')" title="${title}">${ico} Privacidad</button>`;
}

// Conjunto de pestañas privadas-con-contraseña ya desbloqueadas en ESTA SESIÓN (no se sincroniza ni persiste)
const _unlockedTabsThisSession = new Set();

function tabPrivacy(tab) {
  return (tab && tab.privacy) || 'public';
}

// ¿La usuaria actual puede VER esta pestaña en el sidebar?
function userCanSeeTab(tab) {
  const p = tabPrivacy(tab);
  if (p === 'public' || p === 'private_password') return true; // password = visible pero pedirá clave
  if (p === 'private_user') {
    const me = currentUser();
    if (!me) return false;
    // Admin siempre ve todo
    if (me.role === 'admin') return true;
    const owners = Array.isArray(tab.privateOwners) ? tab.privateOwners : [];
    return owners.includes(me.name);
  }
  return true;
}

// ¿La usuaria actual puede ENTRAR (renderizar contenido) en esta pestaña?
function userCanEnterTab(tab) {
  const p = tabPrivacy(tab);
  if (p === 'public') return true;
  if (p === 'private_user') return userCanSeeTab(tab);
  if (p === 'private_password') {
    const me = currentUser();
    if (me && me.role === 'admin') return true; // admin bypassea contraseña
    return _unlockedTabsThisSession.has(tab.id);
  }
  return true;
}

// Renderizar la pantalla de bloqueo para una pestaña privada con contraseña
function renderTabLockscreen(tab) {
  return `
    <div class="tab-lockscreen">
      <div class="tab-lock-icon">🔒</div>
      <div class="tab-lock-title">Pestaña protegida</div>
      <div class="tab-lock-sub">"${bbEscape(tab.name)}" tiene una contraseña configurada. Ingresala para acceder.</div>
      <div class="tab-lock-form">
        <input type="password" id="tab-unlock-pwd" placeholder="Contraseña de la pestaña" autocomplete="current-password" onkeydown="if(event.key==='Enter')unlockTabAttempt('${tab.id}')">
        <button class="btn btn-gold" onclick="unlockTabAttempt('${tab.id}')">🔓 Desbloquear</button>
      </div>
      <div id="tab-unlock-error" class="tab-lock-error"></div>
    </div>
  `;
}

async function unlockTabAttempt(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  const errEl = document.getElementById('tab-unlock-error');
  if (errEl) errEl.textContent = '';
  const inp = document.getElementById('tab-unlock-pwd');
  if (!inp) return;
  const pwd = inp.value;
  if (!pwd) { if (errEl) errEl.textContent = 'Ingresá la contraseña'; return; }
  const tryHash = await sha256(pwd);
  if (tryHash === tab.passwordHash) {
    _unlockedTabsThisSession.add(tab.id);
    toast('🔓 Pestaña desbloqueada para esta sesión');
    renderContent();
  } else {
    if (errEl) errEl.textContent = '✕ Contraseña incorrecta';
    inp.value = '';
    inp.focus();
  }
}

// Cerrar manualmente una pestaña desbloqueada (re-bloquearla)
function relockTab(tabId) {
  _unlockedTabsThisSession.delete(tabId);
  toast('🔒 Pestaña bloqueada de nuevo');
  renderContent();
  renderTabs();
}

// ============ MODAL DE CONFIGURACIÓN DE PRIVACIDAD ============
let _privacyTabId = null;
function openTabPrivacySettings(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  // Solo admin o dueños actuales pueden cambiar privacidad
  const me = currentUser();
  if (!me) return;
  const isOwner = (tab.privateOwners || []).includes(me.name);
  if (me.role !== 'admin' && !isOwner) {
    toast('⛔ Solo el administrador o las dueñas de esta pestaña pueden cambiar la privacidad');
    return;
  }
  _privacyTabId = tabId;
  document.getElementById('privacy-tab-name').textContent = tab.name;
  document.getElementById('privacy-mode').value = tabPrivacy(tab);
  document.getElementById('privacy-locked').checked = !!tab.locked;
  document.getElementById('privacy-pwd-new').value = '';
  document.getElementById('privacy-pwd-current-info').style.display = (tabPrivacy(tab) === 'private_password' && tab.passwordHash) ? 'block' : 'none';
  // Lista de usuarios para private_user
  const users = getValidUsers();
  const ownersChecked = tab.privateOwners || [me.name];
  document.getElementById('privacy-owners-list').innerHTML = users.map(u => `
    <label class="privacy-owner-chk">
      <input type="checkbox" value="${bbEscape(u.name)}"${ownersChecked.includes(u.name)?' checked':''}>
      <span class="users-avatar" style="width:24px;height:24px;font-size:11px;background:${userColor(u)};color:#fff;">${(u.displayName||u.name).charAt(0).toUpperCase()}</span>
      ${bbEscape(u.displayName || u.name)}
      ${u.role==='admin'?'<span class="role-pill role-admin" style="font-size:9px;">👑</span>':''}
    </label>
  `).join('');
  updatePrivacyModalSections();
  document.getElementById('modal-privacy').classList.add('open');
}

function updatePrivacyModalSections() {
  const mode = document.getElementById('privacy-mode').value;
  document.getElementById('privacy-owners-group').style.display = (mode === 'private_user') ? 'block' : 'none';
  document.getElementById('privacy-pwd-group').style.display = (mode === 'private_password') ? 'block' : 'none';
}

async function saveTabPrivacy() {
  const tab = state.tabs.find(t => t.id === _privacyTabId);
  if (!tab) return;
  const oldPrivacy = tabPrivacy(tab);
  const oldLocked = !!tab.locked;
  const mode = document.getElementById('privacy-mode').value;
  const locked = document.getElementById('privacy-locked').checked;
  const errEl = document.getElementById('privacy-error');
  if (errEl) errEl.textContent = '';

  tab.locked = locked;

  if (mode === 'public') {
    tab.privacy = 'public';
    delete tab.privateOwners;
    delete tab.passwordHash;
  } else if (mode === 'private_user') {
    const owners = Array.from(document.querySelectorAll('#privacy-owners-list input[type="checkbox"]:checked')).map(cb => cb.value);
    if (!owners.length) { if (errEl) errEl.textContent = 'Seleccioná al menos una usuaria con acceso'; return; }
    // Garantizar que quien lo guarda quede dentro (si no es admin)
    const me = currentUser();
    if (me && me.role !== 'admin' && !owners.includes(me.name)) owners.push(me.name);
    tab.privacy = 'private_user';
    tab.privateOwners = owners;
    delete tab.passwordHash;
  } else if (mode === 'private_password') {
    const newPwd = document.getElementById('privacy-pwd-new').value;
    if (!tab.passwordHash && !newPwd) { if (errEl) errEl.textContent = 'Ingresá una contraseña para la pestaña'; return; }
    if (newPwd) {
      if (newPwd.length < 4) { if (errEl) errEl.textContent = 'La contraseña debe tener al menos 4 caracteres'; return; }
      tab.passwordHash = await sha256(newPwd);
      _unlockedTabsThisSession.add(tab.id); // quien la cambió ya queda desbloqueada
    }
    tab.privacy = 'private_password';
    delete tab.privateOwners;
  }
  // Audit log: privacidad y/o bloqueo
  if (oldPrivacy !== tabPrivacy(tab)) {
    logAudit('privacy', 'tab', 'Cambió privacidad de "' + tab.name + '"', oldPrivacy, tabPrivacy(tab), tab.id);
  }
  if (oldLocked !== !!tab.locked) {
    logAudit(tab.locked ? 'lock' : 'unlock', 'tab', (tab.locked ? 'Bloqueó' : 'Desbloqueó') + ' la pestaña "' + tab.name + '"', null, null, tab.id);
  }
  saveState();
  closeModal('modal-privacy');
  renderTabs();
  renderContent();
  toast('✓ Privacidad actualizada');
}
