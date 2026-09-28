// ============ PRESENCIA ONLINE (Sesión 6) ============
// Usamos un ref de Firebase aparte: wm_presence_v2 / <userId> = {name, displayName, color, photo, lastSeen, editingRow}
// El estado de presencia NO se mezcla con state principal.

let _presenceMap = {}; // {userId: {name, displayName, color, photo, lastSeen, editingRow}}
let _presenceHeartbeatTimer = null;
let _presenceUnsub = null;
const PRESENCE_HEARTBEAT_MS = 30 * 1000;   // 30 segundos
const PRESENCE_ONLINE_THRESHOLD_MS = 60 * 1000; // online si lastSeen < 60s

function presenceUserId(user) {
  if (!user) return null;
  return user.id || ('usr_' + user.name.toLowerCase().replace(/[^a-z0-9]/g,''));
}

function startPresence() {
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  if (!me || !firebaseDB) return;
  stopPresence(); // por las dudas
  const myId = presenceUserId(me);
  if (!myId) return;

  // Suscribirse al mapa de presencia
  const presenceRef = firebaseDB.ref('wm_presence_v2');
  _presenceUnsub = presenceRef.on('value', snap => {
    const data = snap.val() || {};
    _presenceMap = data;
    renderPresence();
    renderPresenceWarning();
  });

  // Heartbeat inicial inmediato
  pushPresenceHeartbeat();
  // Heartbeat periódico
  _presenceHeartbeatTimer = setInterval(pushPresenceHeartbeat, PRESENCE_HEARTBEAT_MS);

  // onDisconnect: cuando cierre el navegador, marcar offline (borrar)
  try {
    firebaseDB.ref('wm_presence_v2/' + myId).onDisconnect().remove();
  } catch(_) {}
}

function stopPresence() {
  if (_presenceHeartbeatTimer) { clearInterval(_presenceHeartbeatTimer); _presenceHeartbeatTimer = null; }
  if (_presenceUnsub && firebaseDB) {
    try { firebaseDB.ref('wm_presence_v2').off('value', _presenceUnsub); } catch(_) {}
    _presenceUnsub = null;
  }
  // Borrar mi presencia inmediatamente
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  if (me && firebaseDB) {
    try { firebaseDB.ref('wm_presence_v2/' + presenceUserId(me)).remove(); } catch(_) {}
  }
  _presenceMap = {};
}

function pushPresenceHeartbeat() {
  if (!firebaseDB) return;
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  if (!me) return;
  const myId = presenceUserId(me);
  const payload = {
    name: me.name,
    displayName: me.displayName || me.name,
    color: me.color || userColor(me),
    photo: me.photo || null,
    role: me.role || 'editor',
    lastSeen: Date.now(),
    editingRow: _editingRowPresence || null
  };
  try { firebaseDB.ref('wm_presence_v2/' + myId).set(payload); } catch(_) {}
}

// El usuario actual está editando una fila — registrar para señalizarlo a otros
let _editingRowPresence = null;
function setEditingRowPresence(tabId, rowKey, rowLabel) {
  _editingRowPresence = (tabId && rowKey != null) ? { tabId, rowKey: String(rowKey), rowLabel: rowLabel || '' } : null;
  pushPresenceHeartbeat();
}

function clearEditingRowPresence() {
  setEditingRowPresence(null, null);
}

// Lista de usuarias online (que no soy yo) cuya lastSeen está dentro del threshold
function getOnlineUsers(excludeSelf) {
  const now = Date.now();
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  const myId = me ? presenceUserId(me) : null;
  return Object.entries(_presenceMap || {})
    .filter(([id, info]) => {
      if (!info || !info.lastSeen) return false;
      if (excludeSelf && id === myId) return false;
      return (now - info.lastSeen) < PRESENCE_ONLINE_THRESHOLD_MS;
    })
    .map(([id, info]) => ({ id, ...info }));
}

function renderPresence() {
  const el = document.getElementById('presence-panel-body');
  if (!el) return;
  const online = getOnlineUsers(true); // sin contar a mí
  if (!online.length) {
    el.innerHTML = '<div class="presence-empty">Nadie más en línea</div>';
    return;
  }
  el.innerHTML = online.map(u => {
    const av = u.photo
      ? `<span class="presence-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="presence-avatar" style="background:${u.color || userColor(u)};color:#fff;">${(u.displayName || u.name || '?').charAt(0).toUpperCase()}</span>`;
    return `<span class="presence-user" title="${bbEscape(u.displayName || u.name)} (en línea)">
      ${av}
      <span class="presence-dot" title="En línea"></span>
      <span class="presence-name">${bbEscape(u.displayName || u.name)}</span>
    </span>`;
  }).join('');
}

// Mostrar aviso si OTRA usuaria está editando una fila en la pestaña actual
function renderPresenceWarning() {
  const el = document.getElementById('presence-warning');
  if (!el) return;
  const me = (typeof currentUser === 'function') ? currentUser() : null;
  const myId = me ? presenceUserId(me) : null;
  const activeTabId = (typeof userPrefs !== 'undefined') ? userPrefs.activeTabId : null;
  // Otras usuarias editando en esta pestaña
  const others = Object.entries(_presenceMap || {})
    .filter(([id, info]) => {
      if (id === myId) return false;
      if (!info || !info.editingRow) return false;
      if (info.editingRow.tabId !== activeTabId) return false;
      // Solo si están online (lastSeen reciente)
      return (Date.now() - (info.lastSeen||0)) < PRESENCE_ONLINE_THRESHOLD_MS;
    })
    .map(([id, info]) => ({ id, ...info }));

  if (!others.length) { el.innerHTML = ''; el.style.display = 'none'; return; }

  // Detectar conflicto: ¿alguien más está en la misma fila que yo?
  let conflictWith = null;
  if (_editingRowPresence) {
    conflictWith = others.find(o =>
      o.editingRow && o.editingRow.tabId === _editingRowPresence.tabId &&
      o.editingRow.rowKey === _editingRowPresence.rowKey
    );
  }

  if (conflictWith) {
    el.style.display = 'flex';
    el.innerHTML = `<span class="presence-warning-icon">⚠️</span>
      <span><strong>${bbEscape(conflictWith.displayName || conflictWith.name)}</strong> está editando la misma fila que vos. Cuidado con los conflictos.</span>`;
    el.className = 'presence-warning conflict';
  } else {
    el.style.display = 'flex';
    el.className = 'presence-warning info';
    const list = others.map(o => `<strong>${bbEscape(o.displayName || o.name)}</strong>` +
      (o.editingRow && o.editingRow.rowLabel ? ` en "${bbEscape(o.editingRow.rowLabel)}"` : '')).join(', ');
    el.innerHTML = `<span class="presence-warning-icon">✎</span> ${list} ${others.length === 1 ? 'está editando' : 'están editando'} en esta pestaña.`;
  }
}
