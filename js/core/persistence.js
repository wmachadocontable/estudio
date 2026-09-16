// Storage helpers and user preference persistence kept separate from app logic.
// These are intentionally conservative: only local/session persistence and per-user prefs.

function getCurrentUserName() {
  try {
    const s = JSON.parse(sessionStorage.getItem('wm_session') || 'null');
    return s && s.user ? s.user : 'default';
  } catch (e) { return 'default'; }
}

function userPrefsKey() { return 'wm_userPrefs_' + getCurrentUserName(); }

let userPrefs = {
  activeTabId: 'dashboard',
  editMode: false,
  monthFilters: {},
  dashMonth: undefined,
  dashOrder: [],
  dashCollapsed: {},
  tabLayouts: {},
  clientsLayout: 1,
  clientsSelectedId: null,
  clientsSearch: '',
  clientsTipoFilter: '',
  sueldosMonth: undefined,
  sueldosSubtab: 'sueldos',
  sueldosSearch: ''
};

function loadUserPrefs() {
  try {
    const raw = localStorage.getItem(userPrefsKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      userPrefs = Object.assign({}, userPrefs, parsed);
    }
  } catch (e) {}
}

function saveUserPrefs() {
  try { localStorage.setItem(userPrefsKey(), JSON.stringify(userPrefs)); } catch (e) {}
}

function getTabLayout(tabId) {
  return userPrefs.tabLayouts[tabId] || 'table';
}

function setTabLayoutPref(tabId, layout) {
  userPrefs.tabLayouts[tabId] = layout;
  saveUserPrefs();
}

function getSession() {
  try { return JSON.parse(sessionStorage.getItem('wm_app_session') || 'null'); } catch (e) { return null; }
}

function setSession(userName) { sessionStorage.setItem('wm_app_session', JSON.stringify({user: userName, loginAt: Date.now()})); }
function clearSession() { sessionStorage.removeItem('wm_app_session'); }

function getShownNotifs() {
  try { return JSON.parse(localStorage.getItem('wm_notif_shown') || '{}'); } catch (e) { return {}; }
}

function markNotifShown(eventId, dateStr) {
  const m = getShownNotifs();
  m[eventId + '_' + dateStr] = Date.now();
  const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 60;
  Object.keys(m).forEach(k => { if (m[k] < cutoff) delete m[k]; });
  localStorage.setItem('wm_notif_shown', JSON.stringify(m));
}

function wasNotifShown(eventId, dateStr) {
  const m = getShownNotifs();
  return !!m[eventId + '_' + dateStr];
}

const TASK_FILTER_KEY = 'wm_task_filter';

function getTaskFilter() {
  try {
    const f = localStorage.getItem(TASK_FILTER_KEY);
    if (['pendientes', 'hechas', 'todas', 'archivadas'].includes(f)) return f;
  } catch (e) {}
  return 'pendientes';
}

function setTaskFilter(f) {
  try { localStorage.setItem(TASK_FILTER_KEY, f); } catch (e) {}
}
