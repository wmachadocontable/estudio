// ============ SESIÓN 8: NOTIFICACIONES + MI DASHBOARD ============

// ----- Configuración por defecto -----
// Tipos de notificaciones:
//   chat_group   : mensaje en canal grupal
//   chat_dm      : mensaje en DM (1-a-1)
//   mention      : me mencionaron en chat
//   cell_comment : alguien comentó en una celda
//   event        : nuevo evento del calendario en una pestaña que me asignaron
//   deadline     : vencimiento se acerca (hoy / 3 días)
//   assignment   : me asignaron una fila/tarea

const NOTIF_TYPES = [
  { key:'chat_group',   icon:'💬', label:'Mensajes en el grupo',     desc:'Cualquier mensaje en el canal General' },
  { key:'chat_dm',      icon:'👤', label:'Mensajes directos',        desc:'Cuando alguien te escribe en privado' },
  { key:'mention',      icon:'@',  label:'Menciones (@yo)',          desc:'Cuando te etiquetan con @ en cualquier chat' },
  { key:'cell_comment', icon:'💭', label:'Comentarios en celdas',    desc:'Cuando comentan en una fila/celda' },
  { key:'event',        icon:'📅', label:'Eventos del calendario',   desc:'Nuevos eventos en los que estés asignada' },
  { key:'deadline',     icon:'⏰', label:'Vencimientos cercanos',    desc:'Avisos cuando se acerca un vencimiento' },
  { key:'assignment',   icon:'📌', label:'Asignaciones',             desc:'Cuando te asignan una fila/tarea' }
];

// Por cada tipo, 3 canales de salida: banner (toast), sound, browser (notif del SO)
function defaultNotifSettings() {
  const s = { dnd: { enabled: false, workOnly: false, workStart: '09:00', workEnd: '18:00', workDays: [1,2,3,4,5], allowMentions: true } };
  NOTIF_TYPES.forEach(t => {
    s[t.key] = { banner: true, sound: t.key === 'mention' || t.key === 'chat_dm', browser: false };
  });
  return s;
}

function getNotifSettings() {
  if (!userPrefs.notifSettings) userPrefs.notifSettings = defaultNotifSettings();
  // Garantizar que existan todos los tipos (por si se agregan nuevos)
  NOTIF_TYPES.forEach(t => {
    if (!userPrefs.notifSettings[t.key]) userPrefs.notifSettings[t.key] = { banner: true, sound: false, browser: false };
  });
  if (!userPrefs.notifSettings.dnd) userPrefs.notifSettings.dnd = defaultNotifSettings().dnd;
  return userPrefs.notifSettings;
}

// ----- Modo "no molestar" -----
function isInDND() {
  const s = getNotifSettings();
  if (!s.dnd) return false;
  if (!s.dnd.enabled && !s.dnd.workOnly) return false;
  if (s.dnd.enabled) return true; // silencio manual ON
  if (s.dnd.workOnly) {
    // Permitir notificaciones SOLO en horario laboral; fuera de ese horario, no molestar
    const now = new Date();
    const day = now.getDay(); // 0=domingo .. 6=sábado
    if (!Array.isArray(s.dnd.workDays) || !s.dnd.workDays.includes(day)) return true; // hoy no es laboral
    const hh = now.getHours(), mm = now.getMinutes();
    const cur = hh * 60 + mm;
    const [sh, sm] = (s.dnd.workStart || '09:00').split(':').map(n => parseInt(n));
    const [eh, em] = (s.dnd.workEnd || '18:00').split(':').map(n => parseInt(n));
    const start = sh * 60 + sm, end = eh * 60 + em;
    if (cur < start || cur > end) return true; // fuera de horario
  }
  return false;
}

function shouldNotify(type, isMention) {
  const s = getNotifSettings();
  if (isInDND()) {
    // En DND, solo dejar pasar menciones si está marcado allowMentions
    if (isMention && s.dnd.allowMentions) return s[type] || { banner: true, sound: false, browser: false };
    return null;
  }
  return s[type] || null;
}

// ----- Buffer de notificaciones recientes (solo en memoria de esta sesión) -----
let _notifInbox = []; // [{id, type, title, body, ts, read, link}]
const NOTIF_INBOX_MAX = 50;

// ============ NOTIFICACIONES PERSISTENTES POR USUARIA ============
// state.userNotifications[userName] = [...notificaciones]
// Cuando una usuaria inicia sesión, se cargan sus notificaciones pendientes.
function ensureUserNotificationsStore() {
  if (!state.userNotifications) state.userNotifications = {};
}

// Cargar inbox de la usuaria actual desde state al iniciar sesión
function loadMyNotifInbox() {
  ensureUserNotificationsStore();
  const me = currentUser();
  if (!me) { _notifInbox = []; return; }
  const stored = state.userNotifications[me.name];
  _notifInbox = Array.isArray(stored) ? stored.slice(0, NOTIF_INBOX_MAX) : [];
  updateNotifBadge();
}

// Sincronizar inbox local con state (para que persista entre sesiones)
function persistMyNotifInbox() {
  ensureUserNotificationsStore();
  const me = currentUser();
  if (!me) return;
  state.userNotifications[me.name] = _notifInbox.slice();
  saveState();
}

// Enviar una notificación a OTRA usuaria (queda guardada hasta que la lea)
// userName: nombre de la destinataria
// type/title/body/link: igual que pushNotif
// Si la usuaria es la misma que la actual, usa fireNotification para que la vea en banner también.
function notifyUserByName(userName, type, title, body, link) {
  if (!userName) return;
  ensureUserNotificationsStore();
  const me = currentUser();
  if (me && me.name === userName) {
    // Es para mí misma: usar fireNotification (banner + sonido)
    fireNotification(type, title, body, { link });
    return;
  }
  // Para otra usuaria: guardar en su inbox persistente
  const id = 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  const notif = { id, type, title, body, ts: Date.now(), read: false, link: link || null, sentBy: me ? me.name : null };
  if (!Array.isArray(state.userNotifications[userName])) state.userNotifications[userName] = [];
  state.userNotifications[userName].unshift(notif);
  if (state.userNotifications[userName].length > NOTIF_INBOX_MAX) {
    state.userNotifications[userName].length = NOTIF_INBOX_MAX;
  }
  saveState();
  // Si esa usuaria está actualmente en una pestaña abierta en otro dispositivo, Firebase sincroniza
  // y al cargar verá la notificación. No hay forma de "empujar" un banner en vivo sin un servidor de eventos.
}

function pushNotif(type, title, body, link) {
  const id = 'n_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  _notifInbox.unshift({ id, type, title, body, ts: Date.now(), read: false, link: link || null });
  if (_notifInbox.length > NOTIF_INBOX_MAX) _notifInbox.length = NOTIF_INBOX_MAX;
  persistMyNotifInbox(); // Guardar en state para que persista
  updateNotifBadge();
  // Si el panel está abierto, re-renderizar
  if (document.getElementById('notif-panel') && document.getElementById('notif-panel').classList.contains('open')) {
    renderNotifInbox();
  }
}

// ----- Disparador principal -----
function fireNotification(type, title, body, opts) {
  opts = opts || {};
  const decision = shouldNotify(type, !!opts.isMention);
  if (!decision) return; // silenciado por DND
  // Banner in-app
  if (decision.banner) {
    pushNotif(type, title, body, opts.link);
    if (opts.showToast !== false) toast('🔔 ' + title);
  }
  // Sonido
  if (decision.sound) playNotifSound(type);
  // Browser notification (requiere permiso)
  if (decision.browser && typeof Notification !== 'undefined') {
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, { body: body || '', icon: state.branding?.logo || undefined });
      } catch(_) {}
    }
  }
}

// ----- Sonidos sintetizados (Web Audio, sin URLs externas) -----
let _audioCtx = null;
function getAudioCtx() {
  if (_audioCtx) return _audioCtx;
  try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(_) { _audioCtx = null; }
  return _audioCtx;
}

function playNotifSound(type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  // Frecuencias por tipo
  const freqs = {
    mention:      [880, 1100],   // doble pitido alto
    chat_dm:      [660],
    chat_group:   [520],
    cell_comment: [620],
    event:        [770, 660],
    deadline:     [440, 440, 440], // triple para urgencia
    assignment:   [800]
  };
  const seq = freqs[type] || [600];
  let t = ctx.currentTime;
  seq.forEach(f => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = f;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
    t += 0.22;
  });
}

// ----- Notificaciones del browser (permiso) -----
function requestBrowserNotifPermission() {
  if (typeof Notification === 'undefined') {
    toast('Este navegador no soporta notificaciones del sistema');
    return;
  }
  if (Notification.permission === 'granted') {
    toast('Las notificaciones del sistema ya están habilitadas');
    return;
  }
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') toast('✓ Notificaciones habilitadas');
    else if (perm === 'denied') toast('Notificaciones bloqueadas. Habilitalas desde la configuración del navegador.');
  });
}

// ----- Badge de no leídas + render del panel -----
function unreadNotifsCount() {
  return _notifInbox.filter(n => !n.read).length;
}

function updateNotifBadge() {
  const badge = document.getElementById('notif-unread-badge');
  if (!badge) return;
  const n = unreadNotifsCount();
  if (n > 0) {
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

function openNotifPanel() {
  renderNotifInbox();
  document.getElementById('notif-panel').classList.add('open');
}

function closeNotifPanel() {
  document.getElementById('notif-panel').classList.remove('open');
}

function toggleNotifPanel() {
  const el = document.getElementById('notif-panel');
  if (el.classList.contains('open')) closeNotifPanel();
  else openNotifPanel();
}

function markAllNotifsRead() {
  _notifInbox.forEach(n => n.read = true);
  persistMyNotifInbox();
  updateNotifBadge();
  renderNotifInbox();
}

function clearAllNotifs() {
  _notifInbox = [];
  persistMyNotifInbox();
  updateNotifBadge();
  renderNotifInbox();
}

function markNotifRead(id) {
  const n = _notifInbox.find(x => x.id === id);
  if (n) {
    n.read = true;
    persistMyNotifInbox();
    updateNotifBadge();
    renderNotifInbox();
  }
}

function openNotifLink(id) {
  markNotifRead(id);
  const n = _notifInbox.find(x => x.id === id);
  if (!n || !n.link) return;
  // Soportados: {type:'tab', tabId} | {type:'chat', channelId} | {type:'cell', tabId, rowKey, colKey, meta}
  if (n.link.type === 'tab' && n.link.tabId) {
    closeNotifPanel();
    switchTab(n.link.tabId);
  } else if (n.link.type === 'chat' && n.link.channelId) {
    closeNotifPanel();
    openChatPanel();
    switchChatChannel(n.link.channelId);
  } else if (n.link.type === 'cell') {
    closeNotifPanel();
    openCellCommentsModal(n.link.tabId, n.link.rowKey, n.link.colKey, n.link.meta || {});
  }
}

function renderNotifInbox() {
  const el = document.getElementById('notif-inbox');
  if (!el) return;
  if (!_notifInbox.length) {
    el.innerHTML = '<div class="notif-empty">Sin notificaciones recientes.</div>';
    return;
  }
  el.innerHTML = _notifInbox.map(n => {
    const def = NOTIF_TYPES.find(t => t.key === n.type) || { icon:'🔔', label:n.type };
    const time = new Date(n.ts).toLocaleTimeString('es-UY', { hour:'2-digit', minute:'2-digit' });
    return `<div class="notif-item${n.read?' read':''}" onclick="openNotifLink('${n.id}')">
      <span class="notif-ico">${def.icon}</span>
      <div class="notif-body">
        <div class="notif-title"><strong>${bbEscape(n.title)}</strong> <span class="notif-time">${time}</span></div>
        ${n.body ? `<div class="notif-msg">${bbEscape(n.body)}</div>` : ''}
      </div>
      ${!n.read ? '<span class="notif-dot"></span>' : ''}
    </div>`;
  }).join('');
}

// ----- Modal de configuración de notificaciones -----
function openNotifSettings() {
  renderNotifSettingsContent();
  document.getElementById('modal-notif-settings').classList.add('open');
}

function renderNotifSettingsContent() {
  const s = getNotifSettings();
  // Lista de tipos
  const typesHtml = NOTIF_TYPES.map(t => {
    const cfg = s[t.key];
    return `<div class="notif-type-row">
      <div class="notif-type-info">
        <span class="notif-type-ico">${t.icon}</span>
        <div>
          <strong>${t.label}</strong>
          <small style="display:block;color:var(--c-text-muted);">${t.desc}</small>
        </div>
      </div>
      <div class="notif-type-toggles">
        <label title="Banner en la app"><input type="checkbox" ${cfg.banner?'checked':''} onchange="setNotifChannel('${t.key}','banner',this.checked)"> 🔔</label>
        <label title="Sonido"><input type="checkbox" ${cfg.sound?'checked':''} onchange="setNotifChannel('${t.key}','sound',this.checked)"> 🔊</label>
        <label title="Notificación del navegador"><input type="checkbox" ${cfg.browser?'checked':''} onchange="setNotifChannel('${t.key}','browser',this.checked)"> 🖥</label>
      </div>
    </div>`;
  }).join('');

  // DND
  const dnd = s.dnd;
  const days = [
    { v:1, label:'L' }, { v:2, label:'M' }, { v:3, label:'M' },
    { v:4, label:'J' }, { v:5, label:'V' }, { v:6, label:'S' }, { v:0, label:'D' }
  ];
  const dndHtml = `
    <div style="background:var(--c-bg-alt);padding:14px;border-radius:6px;">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:400;text-transform:none;letter-spacing:0;font-size:13px;">
        <input type="checkbox" id="dnd-enabled" ${dnd.enabled?'checked':''} onchange="setDND('enabled', this.checked)" style="width:auto;">
        <strong>🔕 Silencio total (no molestar)</strong>
      </label>
      <small style="display:block;color:var(--c-text-muted);margin:2px 0 12px 26px;">Bloquea todas las notificaciones excepto las menciones directas (si está habilitado abajo).</small>

      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:400;text-transform:none;letter-spacing:0;font-size:13px;">
        <input type="checkbox" id="dnd-work-only" ${dnd.workOnly?'checked':''} onchange="setDND('workOnly', this.checked)" style="width:auto;">
        <strong>🕘 Solo en horario laboral</strong>
      </label>
      <small style="display:block;color:var(--c-text-muted);margin:2px 0 8px 26px;">Fuera del horario indicado, no recibís notificaciones.</small>

      <div style="margin-left:26px;display:flex;gap:8px;align-items:center;font-size:12px;margin-bottom:8px;">
        Desde <input type="time" id="dnd-work-start" value="${dnd.workStart}" onchange="setDND('workStart', this.value)" style="padding:3px 6px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;">
        hasta <input type="time" id="dnd-work-end" value="${dnd.workEnd}" onchange="setDND('workEnd', this.value)" style="padding:3px 6px;border:1px solid var(--c-border);border-radius:3px;font-family:inherit;">
      </div>
      <div style="margin-left:26px;display:flex;gap:4px;flex-wrap:wrap;align-items:center;font-size:11px;color:var(--c-text-muted);">
        Días laborales:
        ${days.map(d => `<label class="dnd-day-chk ${Array.isArray(dnd.workDays) && dnd.workDays.includes(d.v) ? 'on' : ''}" onclick="toggleDndDay(${d.v})">${d.label}</label>`).join('')}
      </div>

      <div style="border-top:1px solid var(--c-border);margin-top:12px;padding-top:10px;">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:400;text-transform:none;letter-spacing:0;font-size:13px;">
          <input type="checkbox" id="dnd-allow-mentions" ${dnd.allowMentions?'checked':''} onchange="setDND('allowMentions', this.checked)" style="width:auto;">
          Dejar pasar <strong>menciones directas (@yo)</strong> incluso en modo silencio
        </label>
      </div>
    </div>
  `;

  document.getElementById('notif-types-list').innerHTML = typesHtml;
  document.getElementById('notif-dnd-section').innerHTML = dndHtml;

  // Permiso del navegador
  let permLabel = 'No solicitado';
  if (typeof Notification !== 'undefined') {
    permLabel = Notification.permission === 'granted' ? '✓ Habilitadas' :
                Notification.permission === 'denied' ? '✕ Bloqueadas (cambialo desde el navegador)' :
                'Hacé clic para solicitar permiso';
  } else {
    permLabel = 'No soportado por este navegador';
  }
  document.getElementById('notif-browser-perm-label').textContent = permLabel;
}

function setNotifChannel(typeKey, channel, value) {
  const s = getNotifSettings();
  if (!s[typeKey]) s[typeKey] = { banner: true, sound: false, browser: false };
  s[typeKey][channel] = !!value;
  // Si activan browser, solicitar permiso
  if (channel === 'browser' && value) requestBrowserNotifPermission();
  saveUserPrefs();
}

function setDND(field, value) {
  const s = getNotifSettings();
  if (!s.dnd) s.dnd = {};
  s.dnd[field] = value;
  saveUserPrefs();
}

function toggleDndDay(day) {
  const s = getNotifSettings();
  if (!Array.isArray(s.dnd.workDays)) s.dnd.workDays = [];
  const idx = s.dnd.workDays.indexOf(day);
  if (idx >= 0) s.dnd.workDays.splice(idx, 1);
  else s.dnd.workDays.push(day);
  saveUserPrefs();
  renderNotifSettingsContent();
}

// ----- Conectar notificaciones con eventos de chat -----
// Esta función se llama cuando llega un mensaje nuevo en cualquier canal.
// Decide si genera una notificación y de qué tipo.
let _lastSeenMessagesByChannel = {}; // {channelId: ts}

function checkChatMessagesForNotifications(channelId) {
  const me = currentUser();
  if (!me) return;
  const msgsMap = (_chatState.channels[channelId] || {}).messages || {};
  const msgs = Object.values(msgsMap);
  const lastSeen = _lastSeenMessagesByChannel[channelId] || 0;
  // El panel está abierto en este canal → marcamos como leído sin notificar
  const isViewing = _chatState.open && _chatState.activeChannelId === channelId;
  let maxTs = lastSeen;
  msgs.forEach(m => {
    if (!m || !m.ts) return;
    if (m.ts <= lastSeen) return;
    if (m.by === me.name) { maxTs = Math.max(maxTs, m.ts); return; } // mensajes propios no notifican
    maxTs = Math.max(maxTs, m.ts);
    if (isViewing) return; // estoy mirando este canal en vivo

    // Detectar tipo
    const isDM = channelId.startsWith('dm_');
    const meMentioned = Array.isArray(m.mentions) && m.mentions.includes(me.name);
    let type;
    if (meMentioned) type = 'mention';
    else if (isDM) type = 'chat_dm';
    else type = 'chat_group';

    const title = (m.byDisplayName || m.by) + (type === 'mention' ? ' te mencionó' : ' escribió');
    const body  = (m.text || '').slice(0, 100);
    fireNotification(type, title, body, {
      isMention: meMentioned,
      link: { type: 'chat', channelId },
      showToast: false // ya hay panel chat, no saturar con toast
    });
  });
  _lastSeenMessagesByChannel[channelId] = maxTs;
}
