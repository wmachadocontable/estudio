// ============ SESIÓN 7: CHAT INTERNO ============
// Estructura Firebase:
//   wm_chats_v2/channels/<channelId>/messages/<msgId> = { id, by, byDisplayName, text, ts, edited, attachments, mentions, readBy }
//   wm_chats_v2/cell_comments/<commentKey>/messages/<msgId> = { ... } (commentKey = tabId__rowKey__colKey)
//   wm_chats_v2/typing/<channelId>/<userName> = lastTypingTs
//   wm_chats_v2/last_read/<userName>/<channelId> = ts (cuándo leyó por última vez)
//
// Canales:
//   "general"         → chat grupal con todas las usuarias
//   "dm_<u1>_<u2>"    → DM 1-a-1, donde u1 < u2 alfabéticamente (id estable)

// Constantes ya definidas al inicio del script:
// CHAT_TYPING_TIMEOUT_MS (cuánto dura el "está escribiendo")
// CHAT_ATTACHMENT_MAX_BYTES = 500*1024

const CHAT_TYPING_REFRESH_MS = 4000;     // cada cuánto re-emitir typing mientras se sigue tipeando
const CHAT_TYPING_STALE_AFTER_MS = 6000; // typing se considera vencido después de este tiempo

let _chatState = {
  open: false,                  // si el panel lateral está abierto
  activeChannelId: null,        // canal activo
  channels: {},                 // { channelId: { messages: {msgId: msg}, lastFetch } }
  cellComments: {},             // commentKey: { messages: {msgId: msg} }
  typing: {},                   // channelId: { userName: ts }
  lastRead: {},                 // channelId: ts (de esta usuaria)
  unsubscribers: [],            // funciones para desconectar listeners de Firebase
  typingTimer: null,            // timeout activo para emitir mi propio typing
  searchQuery: '',              // filtro local de mensajes
  editingMsgId: null            // mensaje que estoy editando
};

function genMsgId() { return 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2,6); }

// Construye el ID estable de un DM entre 2 usuarias
function dmChannelId(userA, userB) {
  const a = String(userA), b = String(userB);
  const sorted = [a, b].sort();
  return 'dm_' + sorted[0].toLowerCase().replace(/[^a-z0-9]/g,'') + '_' + sorted[1].toLowerCase().replace(/[^a-z0-9]/g,'');
}

// Lista de canales visibles para la usuaria actual
function getChannelsForCurrentUser() {
  const me = currentUser();
  if (!me) return [];
  const channels = [
    { id: 'general', type: 'group', name: 'General', icon: '👥' }
  ];
  const others = getValidUsers().filter(u => u.name !== me.name);
  others.forEach(u => {
    channels.push({
      id: dmChannelId(me.name, u.name),
      type: 'dm',
      name: u.displayName || u.name,
      icon: '',
      otherUser: u
    });
  });
  return channels;
}

// ----- Firebase: suscripción a canales -----
function chatSubscribeToChannel(channelId) {
  if (!firebaseDB) return;
  if (!_chatState.channels[channelId]) _chatState.channels[channelId] = { messages: {} };
  // Snapshot inicial — registramos el ts actual para no notificar TODO el histórico al conectar
  const ref = firebaseDB.ref('wm_chats_v2/channels/' + channelId + '/messages');
  let firstSnap = true;
  const handler = ref.on('value', snap => {
    _chatState.channels[channelId].messages = snap.val() || {};
    if (_chatState.activeChannelId === channelId) renderChatMessages();
    updateChatUnreadCount();
    // Sesión 8: detectar mensajes nuevos y generar notificaciones (saltando el primer snap = histórico)
    if (firstSnap) {
      firstSnap = false;
      // Marcar el último ts visto como "ahora" para evitar bombardear
      const msgs = Object.values(_chatState.channels[channelId].messages || {});
      const maxTs = msgs.reduce((m, x) => Math.max(m, x.ts || 0), 0);
      _lastSeenMessagesByChannel[channelId] = maxTs;
    } else {
      if (typeof checkChatMessagesForNotifications === 'function') {
        checkChatMessagesForNotifications(channelId);
      }
    }
  });
  _chatState.unsubscribers.push(() => ref.off('value', handler));
}

function chatSubscribeToTyping(channelId) {
  if (!firebaseDB) return;
  const ref = firebaseDB.ref('wm_chats_v2/typing/' + channelId);
  const handler = ref.on('value', snap => {
    _chatState.typing[channelId] = snap.val() || {};
    if (_chatState.activeChannelId === channelId) renderTypingIndicator();
  });
  _chatState.unsubscribers.push(() => ref.off('value', handler));
}

function chatSubscribeToLastRead() {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  const ref = firebaseDB.ref('wm_chats_v2/last_read/' + me.name);
  const handler = ref.on('value', snap => {
    _chatState.lastRead = snap.val() || {};
    updateChatUnreadCount();
  });
  _chatState.unsubscribers.push(() => ref.off('value', handler));
}

function chatUnsubscribeAll() {
  _chatState.unsubscribers.forEach(fn => { try { fn(); } catch(_) {} });
  _chatState.unsubscribers = [];
}

function startChat() {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  chatUnsubscribeAll();
  // Suscribirse al canal general y a todos los DMs de esta usuaria
  const channels = getChannelsForCurrentUser();
  channels.forEach(c => {
    chatSubscribeToChannel(c.id);
    chatSubscribeToTyping(c.id);
  });
  chatSubscribeToLastRead();
}

function stopChat() {
  chatUnsubscribeAll();
  if (_chatState.typingTimer) { clearTimeout(_chatState.typingTimer); _chatState.typingTimer = null; }
  _chatState = {
    open: false, activeChannelId: null, channels: {}, cellComments: {},
    typing: {}, lastRead: {}, unsubscribers: [], typingTimer: null,
    searchQuery: '', editingMsgId: null
  };
}

// ----- Mensajes: enviar / editar / eliminar -----
async function sendChatMessage(channelId, text, attachments) {
  if (!firebaseDB) { toast('Sin conexión'); return; }
  const me = currentUser();
  if (!me) return;
  if (!text || !text.trim()) {
    if (!attachments || !attachments.length) return;
  }
  const mentions = extractMentions(text);
  const msg = {
    id: genMsgId(),
    by: me.name,
    byDisplayName: me.displayName || me.name,
    text: text.trim(),
    ts: Date.now(),
    edited: false,
    attachments: attachments || null,
    mentions: mentions.length ? mentions : null,
    readBy: [me.name]
  };
  try {
    await firebaseDB.ref('wm_chats_v2/channels/' + channelId + '/messages/' + msg.id).set(msg);
    // Marcar el canal como leído por mí al enviar
    markChannelRead(channelId);
  } catch(e) {
    toast('Error al enviar: ' + e.message);
  }
}

async function editChatMessage(channelId, msgId, newText) {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  const msg = (_chatState.channels[channelId] || {}).messages?.[msgId];
  if (!msg) return;
  if (msg.by !== me.name) { toast('Solo podés editar tus propios mensajes'); return; }
  const updated = { ...msg, text: newText.trim(), edited: true, editedAt: Date.now() };
  try {
    await firebaseDB.ref('wm_chats_v2/channels/' + channelId + '/messages/' + msgId).set(updated);
  } catch(e) {
    toast('Error al editar: ' + e.message);
  }
}

async function deleteChatMessage(channelId, msgId) {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  const msg = (_chatState.channels[channelId] || {}).messages?.[msgId];
  if (!msg) return;
  if (msg.by !== me.name && !isAdmin()) { toast('Solo podés borrar tus propios mensajes'); return; }
  if (!confirm('¿Borrar este mensaje? No se puede deshacer.')) return;
  try {
    await firebaseDB.ref('wm_chats_v2/channels/' + channelId + '/messages/' + msgId).remove();
  } catch(e) {
    toast('Error al borrar: ' + e.message);
  }
}

// ----- Menciones -----
function extractMentions(text) {
  if (!text) return [];
  const matches = text.match(/@(\w+)/g) || [];
  return matches.map(m => m.slice(1));
}

function renderTextWithMentions(text) {
  if (!text) return '';
  // Escapamos y luego destacamos las menciones
  let esc = bbEscape(text);
  esc = esc.replace(/@(\w+)/g, (m, name) => {
    const u = findUserByName(name);
    if (u) return `<span class="chat-mention" title="Mención a ${bbEscape(u.displayName || u.name)}">@${bbEscape(u.displayName || u.name)}</span>`;
    return m;
  });
  // Reemplazar saltos de línea
  esc = esc.replace(/\n/g, '<br>');
  return esc;
}

// ----- Typing indicator -----
function emitTyping(channelId) {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  try {
    firebaseDB.ref('wm_chats_v2/typing/' + channelId + '/' + me.name).set(Date.now());
  } catch(_) {}
  // Re-emitir cada CHAT_TYPING_REFRESH_MS si sigue tipeando
  if (_chatState.typingTimer) clearTimeout(_chatState.typingTimer);
  _chatState.typingTimer = setTimeout(() => clearMyTyping(channelId), CHAT_TYPING_REFRESH_MS + 500);
}

function clearMyTyping(channelId) {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  try {
    firebaseDB.ref('wm_chats_v2/typing/' + channelId + '/' + me.name).remove();
  } catch(_) {}
  if (_chatState.typingTimer) { clearTimeout(_chatState.typingTimer); _chatState.typingTimer = null; }
}

function getTypingUsers(channelId) {
  const me = currentUser();
  const map = _chatState.typing[channelId] || {};
  const now = Date.now();
  return Object.keys(map).filter(name =>
    name !== (me && me.name) &&
    map[name] && (now - map[name]) < CHAT_TYPING_STALE_AFTER_MS
  );
}

function renderTypingIndicator() {
  const el = document.getElementById('chat-typing');
  if (!el || !_chatState.activeChannelId) return;
  const users = getTypingUsers(_chatState.activeChannelId);
  if (!users.length) { el.textContent = ''; el.style.display = 'none'; return; }
  el.style.display = 'block';
  const names = users.map(n => {
    const u = findUserByName(n);
    return u ? (u.displayName || u.name) : n;
  });
  el.textContent = (names.length === 1 ? names[0] + ' está escribiendo…' :
                    names.length === 2 ? names.join(' y ') + ' están escribiendo…' :
                    names.length + ' personas escribiendo…');
}

// ----- Tildes de leído / no leídos -----
function markChannelRead(channelId) {
  if (!firebaseDB) return;
  const me = currentUser();
  if (!me) return;
  const now = Date.now();
  _chatState.lastRead[channelId] = now;
  try {
    firebaseDB.ref('wm_chats_v2/last_read/' + me.name + '/' + channelId).set(now);
  } catch(_) {}
  // Marcar mensajes como leídos en el readBy individual (solo los que no había leído yo)
  const msgs = (_chatState.channels[channelId] || {}).messages || {};
  Object.keys(msgs).forEach(mId => {
    const m = msgs[mId];
    const rb = Array.isArray(m.readBy) ? m.readBy : [];
    if (!rb.includes(me.name)) {
      try {
        firebaseDB.ref('wm_chats_v2/channels/' + channelId + '/messages/' + mId + '/readBy').set([...rb, me.name]);
      } catch(_) {}
    }
  });
  updateChatUnreadCount();
}

function unreadCountForChannel(channelId) {
  const me = currentUser();
  if (!me) return 0;
  const msgs = (_chatState.channels[channelId] || {}).messages || {};
  const lastReadTs = _chatState.lastRead[channelId] || 0;
  let count = 0;
  Object.values(msgs).forEach(m => {
    if (!m || m.by === me.name) return; // no contar propios
    if ((m.ts || 0) > lastReadTs) count++;
  });
  return count;
}

function totalUnreadCount() {
  const channels = getChannelsForCurrentUser();
  return channels.reduce((s, c) => s + unreadCountForChannel(c.id), 0);
}

function updateChatUnreadCount() {
  const total = totalUnreadCount();
  const badge = document.getElementById('chat-unread-badge');
  if (badge) {
    if (total > 0) {
      badge.textContent = total > 99 ? '99+' : String(total);
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  // Si el panel está abierto, también actualizar la lista de canales (puede tener badges)
  if (_chatState.open) renderChatChannelList();
}

// ----- UI: Panel lateral -----
function openChatPanel() {
  _chatState.open = true;
  document.getElementById('chat-panel').classList.add('open');
  if (!_chatState.activeChannelId) _chatState.activeChannelId = 'general';
  renderChatChannelList();
  renderChatActiveChannel();
}

function closeChatPanel() {
  _chatState.open = false;
  document.getElementById('chat-panel').classList.remove('open');
  // Limpiar mi typing
  if (_chatState.activeChannelId) clearMyTyping(_chatState.activeChannelId);
}

function toggleChatPanel() {
  if (_chatState.open) closeChatPanel();
  else openChatPanel();
}

function switchChatChannel(channelId) {
  if (_chatState.activeChannelId && _chatState.activeChannelId !== channelId) {
    clearMyTyping(_chatState.activeChannelId);
  }
  _chatState.activeChannelId = channelId;
  _chatState.searchQuery = '';
  _chatState.editingMsgId = null;
  renderChatChannelList();
  renderChatActiveChannel();
  // Marcar como leído al entrar
  markChannelRead(channelId);
}

function renderChatChannelList() {
  const el = document.getElementById('chat-channel-list');
  if (!el) return;
  const channels = getChannelsForCurrentUser();
  el.innerHTML = channels.map(c => {
    const unread = unreadCountForChannel(c.id);
    const active = c.id === _chatState.activeChannelId ? ' active' : '';
    let avatar;
    if (c.type === 'group') {
      avatar = `<span class="chat-channel-icon">${c.icon}</span>`;
    } else {
      const u = c.otherUser;
      avatar = u.photo
        ? `<span class="chat-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
        : `<span class="chat-avatar" style="background:${userColor(u)};color:#fff;">${(u.displayName||u.name).charAt(0).toUpperCase()}</span>`;
    }
    return `<div class="chat-channel${active}" onclick="switchChatChannel('${c.id}')">
      ${avatar}
      <span class="chat-channel-name">${bbEscape(c.name)}</span>
      ${unread > 0 ? `<span class="chat-channel-badge">${unread > 99 ? '99+' : unread}</span>` : ''}
    </div>`;
  }).join('');
}

function renderChatActiveChannel() {
  const channelId = _chatState.activeChannelId;
  if (!channelId) return;
  const channels = getChannelsForCurrentUser();
  const channel = channels.find(c => c.id === channelId);
  const titleEl = document.getElementById('chat-title');
  if (titleEl && channel) {
    titleEl.innerHTML = (channel.type === 'group' ? channel.icon + ' ' : '👤 ') + bbEscape(channel.name);
  }
  renderChatMessages();
  renderTypingIndicator();
  // Foco en el input
  setTimeout(() => { const i = document.getElementById('chat-input-text'); if (i) i.focus(); }, 100);
}

function renderChatMessages() {
  const el = document.getElementById('chat-messages');
  if (!el) return;
  const channelId = _chatState.activeChannelId;
  if (!channelId) { el.innerHTML = ''; return; }
  const msgsMap = (_chatState.channels[channelId] || {}).messages || {};
  let msgs = Object.values(msgsMap).sort((a,b) => (a.ts || 0) - (b.ts || 0));

  // Filtro de búsqueda
  if (_chatState.searchQuery) {
    const q = _chatState.searchQuery.toLowerCase();
    msgs = msgs.filter(m => (m.text || '').toLowerCase().includes(q) || (m.byDisplayName || m.by || '').toLowerCase().includes(q));
  }

  if (!msgs.length) {
    el.innerHTML = `<div class="chat-empty">${_chatState.searchQuery ? 'Sin resultados' : 'No hay mensajes todavía. Sé la primera en escribir 👋'}</div>`;
    return;
  }

  const me = currentUser();
  // Agrupar por día para mostrar separadores
  let lastDay = null;
  let html = '';
  msgs.forEach(m => {
    const d = new Date(m.ts || Date.now());
    const day = d.toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' });
    if (day !== lastDay) {
      html += `<div class="chat-day-sep"><span>${day}</span></div>`;
      lastDay = day;
    }
    const isMe = me && m.by === me.name;
    const u = findUserByName(m.by);
    const time = d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
    const avatar = u && u.photo
      ? `<span class="chat-msg-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="chat-msg-avatar" style="background:${userColor(u || m.by)};color:#fff;">${(m.byDisplayName || m.by || '?').charAt(0).toUpperCase()}</span>`;
    const readBy = Array.isArray(m.readBy) ? m.readBy : [];
    const readByOthers = readBy.filter(n => n !== m.by);
    // Tildes de leído
    let readMark = '';
    if (isMe) {
      readMark = readByOthers.length > 0
        ? `<span class="chat-read-mark double" title="Leído por ${bbEscape(readByOthers.join(', '))}">✓✓</span>`
        : `<span class="chat-read-mark" title="Enviado">✓</span>`;
    }
    // Adjuntos
    let attHtml = '';
    if (m.attachments && m.attachments.length) {
      attHtml = '<div class="chat-attachments">' + m.attachments.map(a => {
        if (a.type && a.type.startsWith('image/')) {
          return `<img class="chat-attachment-img" src="${a.data}" alt="${bbEscape(a.name)}" onclick="window.open('${a.data}','_blank')">`;
        }
        return `<a class="chat-attachment-file" href="${a.data}" download="${bbEscape(a.name)}">📎 ${bbEscape(a.name)} <small>(${Math.round(a.size/1024)} KB)</small></a>`;
      }).join('') + '</div>';
    }
    // Acciones (editar/borrar) — solo propias o admin
    const canModify = isMe || (me && me.role === 'admin');
    const editingThis = _chatState.editingMsgId === m.id;
    let actions = '';
    if (canModify && !editingThis) {
      actions = `<div class="chat-msg-actions">
        ${isMe ? `<button onclick="startEditingChatMessage('${m.id}')" title="Editar">✎</button>` : ''}
        <button onclick="deleteChatMessage('${channelId}','${m.id}')" title="Borrar">🗑</button>
      </div>`;
    }
    const bodyHtml = editingThis
      ? `<div class="chat-msg-edit">
          <textarea id="chat-edit-text" rows="2">${bbEscape(m.text || '')}</textarea>
          <div class="chat-msg-edit-actions">
            <button class="btn btn-outline btn-sm" onclick="cancelEditingChatMessage()">Cancelar</button>
            <button class="btn btn-gold btn-sm" onclick="saveEditingChatMessage('${channelId}','${m.id}')">Guardar</button>
          </div>
        </div>`
      : `<div class="chat-msg-body">
          ${renderTextWithMentions(m.text || '')}
          ${attHtml}
          ${m.edited ? '<span class="chat-edited">(editado)</span>' : ''}
        </div>`;
    html += `<div class="chat-msg${isMe?' is-me':''}" data-msg-id="${m.id}">
      ${!isMe ? avatar : ''}
      <div class="chat-msg-inner">
        ${!isMe ? `<div class="chat-msg-header"><strong>${bbEscape(m.byDisplayName || m.by)}</strong> <span class="chat-msg-time">${time}</span></div>` : ''}
        ${bodyHtml}
        ${isMe ? `<div class="chat-msg-meta"><span class="chat-msg-time">${time}</span> ${readMark}</div>` : ''}
        ${actions}
      </div>
      ${isMe ? avatar : ''}
    </div>`;
  });
  el.innerHTML = html;
  // Auto-scroll al final
  setTimeout(() => { el.scrollTop = el.scrollHeight; }, 30);
}

function startEditingChatMessage(msgId) {
  _chatState.editingMsgId = msgId;
  renderChatMessages();
  setTimeout(() => { const t = document.getElementById('chat-edit-text'); if (t) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } }, 30);
}

function cancelEditingChatMessage() {
  _chatState.editingMsgId = null;
  renderChatMessages();
}

async function saveEditingChatMessage(channelId, msgId) {
  const t = document.getElementById('chat-edit-text');
  if (!t) return;
  const newText = t.value.trim();
  if (!newText) { toast('El mensaje no puede estar vacío'); return; }
  await editChatMessage(channelId, msgId, newText);
  _chatState.editingMsgId = null;
}

function onChatInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleChatSend();
    return;
  }
  // Emitir typing
  if (_chatState.activeChannelId) emitTyping(_chatState.activeChannelId);
  // Autocomplete de menciones (básico)
  setTimeout(updateMentionAutocomplete, 30);
}

function updateMentionAutocomplete() {
  const ta = document.getElementById('chat-input-text');
  const list = document.getElementById('chat-mention-list');
  if (!ta || !list) return;
  const text = ta.value;
  const caret = ta.selectionStart;
  // Buscar @<algo> justo antes del cursor
  const before = text.slice(0, caret);
  const m = before.match(/@(\w*)$/);
  if (!m) { list.style.display = 'none'; list.innerHTML = ''; return; }
  const q = (m[1] || '').toLowerCase();
  const candidates = getValidUsers().filter(u =>
    (u.name.toLowerCase().includes(q) || (u.displayName||'').toLowerCase().includes(q))
  );
  if (!candidates.length) { list.style.display = 'none'; return; }
  list.innerHTML = candidates.slice(0, 6).map(u => {
    const av = u.photo
      ? `<span class="chat-avatar" style="background:center/cover no-repeat url(${u.photo});width:20px;height:20px;font-size:10px;"></span>`
      : `<span class="chat-avatar" style="background:${userColor(u)};color:#fff;width:20px;height:20px;font-size:10px;">${(u.displayName||u.name).charAt(0).toUpperCase()}</span>`;
    return `<div class="chat-mention-opt" onclick="completeMention('${bbEscape(u.name)}')">${av} ${bbEscape(u.displayName || u.name)}</div>`;
  }).join('');
  list.style.display = 'block';
}

function completeMention(userName) {
  const ta = document.getElementById('chat-input-text');
  if (!ta) return;
  const caret = ta.selectionStart;
  const before = ta.value.slice(0, caret);
  const after = ta.value.slice(caret);
  const newBefore = before.replace(/@(\w*)$/, '@' + userName + ' ');
  ta.value = newBefore + after;
  ta.focus();
  ta.setSelectionRange(newBefore.length, newBefore.length);
  const list = document.getElementById('chat-mention-list');
  if (list) { list.style.display = 'none'; list.innerHTML = ''; }
}

let _pendingAttachments = [];

function onChatAttachmentSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > CHAT_ATTACHMENT_MAX_BYTES) {
    toast('⚠ Máximo ' + Math.round(CHAT_ATTACHMENT_MAX_BYTES/1024) + ' KB por archivo');
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    _pendingAttachments.push({ name: file.name, type: file.type, size: file.size, data: ev.target.result });
    renderPendingAttachments();
    e.target.value = '';
  };
  reader.readAsDataURL(file);
}

function removePendingAttachment(idx) {
  _pendingAttachments.splice(idx, 1);
  renderPendingAttachments();
}

function renderPendingAttachments() {
  const el = document.getElementById('chat-pending-attachments');
  if (!el) return;
  if (!_pendingAttachments.length) { el.innerHTML = ''; el.style.display = 'none'; return; }
  el.style.display = 'flex';
  el.innerHTML = _pendingAttachments.map((a, i) => `
    <div class="chat-pending-att">
      <span>📎 ${bbEscape(a.name)} <small>(${Math.round(a.size/1024)} KB)</small></span>
      <button onclick="removePendingAttachment(${i})">✕</button>
    </div>
  `).join('');
}

async function handleChatSend() {
  const ta = document.getElementById('chat-input-text');
  if (!ta || !_chatState.activeChannelId) return;
  const text = ta.value;
  if (!text.trim() && !_pendingAttachments.length) return;
  const attachments = _pendingAttachments.slice();
  ta.value = '';
  _pendingAttachments = [];
  renderPendingAttachments();
  clearMyTyping(_chatState.activeChannelId);
  await sendChatMessage(_chatState.activeChannelId, text, attachments);
}

function onChatSearchInput(e) {
  _chatState.searchQuery = e.target.value || '';
  renderChatMessages();
}

// ============ COMENTARIOS EN CELDAS ============
// Cada celda puede tener un mini-hilo de mensajes. Se guarda en wm_chats_v2/cell_comments/<key>/messages
// key = tabId__rowKey__colKey  (rowKey puede ser índice numérico o un __key como en builder ctables)

let _activeCellCommentKey = null;
let _activeCellCommentMeta = null; // { tabName, rowLabel, colLabel }
let _cellCommentsUnsub = null;
let _cellCommentsLocal = {}; // {msgId: msg}

function cellCommentKey(tabId, rowKey, colKey) {
  return tabId + '__' + String(rowKey) + '__' + String(colKey);
}

function openCellCommentsModal(tabId, rowKey, colKey, meta) {
  if (!firebaseDB) { toast('Sin conexión'); return; }
  _activeCellCommentKey = cellCommentKey(tabId, rowKey, colKey);
  _activeCellCommentMeta = meta || {};
  document.getElementById('cellcom-title').textContent =
    (meta && meta.rowLabel ? meta.rowLabel + ' / ' : '') +
    (meta && meta.colLabel ? meta.colLabel : 'celda');
  document.getElementById('cellcom-sub').textContent = meta && meta.tabName ? meta.tabName : '';
  // Suscribirse a los mensajes
  if (_cellCommentsUnsub) { try { _cellCommentsUnsub(); } catch(_) {} _cellCommentsUnsub = null; }
  const ref = firebaseDB.ref('wm_chats_v2/cell_comments/' + _activeCellCommentKey + '/messages');
  const handler = ref.on('value', snap => {
    _cellCommentsLocal = snap.val() || {};
    renderCellCommentsList();
  });
  _cellCommentsUnsub = () => ref.off('value', handler);
  document.getElementById('cellcom-input').value = '';
  document.getElementById('modal-cellcom').classList.add('open');
  renderCellCommentsList();
}

function closeCellCommentsModal() {
  if (_cellCommentsUnsub) { try { _cellCommentsUnsub(); } catch(_) {} _cellCommentsUnsub = null; }
  _activeCellCommentKey = null;
  _activeCellCommentMeta = null;
  _cellCommentsLocal = {};
  closeModal('modal-cellcom');
}

function renderCellCommentsList() {
  const el = document.getElementById('cellcom-list');
  if (!el) return;
  const msgs = Object.values(_cellCommentsLocal).sort((a,b) => (a.ts||0) - (b.ts||0));
  if (!msgs.length) {
    el.innerHTML = '<div class="cellcom-empty">Sin comentarios. Sé la primera en agregar uno.</div>';
    return;
  }
  const me = currentUser();
  el.innerHTML = msgs.map(m => {
    const u = findUserByName(m.by);
    const av = u && u.photo
      ? `<span class="cellcom-avatar" style="background:center/cover no-repeat url(${u.photo});"></span>`
      : `<span class="cellcom-avatar" style="background:${userColor(u || m.by)};color:#fff;">${(m.byDisplayName||m.by||'?').charAt(0).toUpperCase()}</span>`;
    const time = new Date(m.ts || Date.now()).toLocaleString('es-UY', { dateStyle:'short', timeStyle:'short' });
    const isMe = me && m.by === me.name;
    const canDelete = isMe || (me && me.role === 'admin');
    return `<div class="cellcom-item">
      ${av}
      <div class="cellcom-body">
        <div class="cellcom-head"><strong>${bbEscape(m.byDisplayName || m.by)}</strong> <span class="cellcom-time">${time}</span></div>
        <div class="cellcom-text">${renderTextWithMentions(m.text || '')}</div>
      </div>
      ${canDelete ? `<button class="cellcom-del" onclick="deleteCellComment('${m.id}')" title="Borrar">×</button>` : ''}
    </div>`;
  }).join('');
}

async function sendCellComment() {
  if (!_activeCellCommentKey || !firebaseDB) return;
  const ta = document.getElementById('cellcom-input');
  const text = ta.value.trim();
  if (!text) return;
  const me = currentUser();
  if (!me) return;
  const msg = {
    id: genMsgId(), by: me.name, byDisplayName: me.displayName || me.name,
    text, ts: Date.now()
  };
  try {
    await firebaseDB.ref('wm_chats_v2/cell_comments/' + _activeCellCommentKey + '/messages/' + msg.id).set(msg);
    ta.value = '';
  } catch(e) {
    toast('Error al guardar: ' + e.message);
  }
}

async function deleteCellComment(msgId) {
  if (!_activeCellCommentKey || !firebaseDB) return;
  if (!confirm('¿Borrar este comentario?')) return;
  try {
    await firebaseDB.ref('wm_chats_v2/cell_comments/' + _activeCellCommentKey + '/messages/' + msgId).remove();
  } catch(e) { toast('Error: ' + e.message); }
}
