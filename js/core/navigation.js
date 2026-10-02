// ============ PESTAÑAS FUERA DE LA BARRA (oct. 2026) ============
// Siguen existiendo en state.tabs (no se pierde ningún dato), pero no se muestran:
//  - el Calendario se sacó;
//  - Honorarios vive adentro de Finanzas;
//  - Ej. Económicos vive adentro de Declaraciones como «Industria y Comercio».
function tabFueraDelMenu(t) {
  if (!t) return false;
  if (t.type === 'calendar') return true;
  if (t.type === 'honorarios' && state.tabs.some(x => x.type === 'finanzas')) return true;
  if (typeof declTabVinculada === 'function' && declTabVinculada(t.id)) return true;
  return false;
}
// A dónde ir si alguien abre una de esas pestañas (un acceso viejo, una notificación…)
function tabDestinoDe(t) {
  if (t.type === 'honorarios') return 'finanzas';
  if (typeof declTabVinculada === 'function' && declTabVinculada(t.id)) {
    const d = state.tabs.find(x => x.type === 'declaraciones');
    if (d) return d.id;
  }
  return 'dashboard';
}

// ============ TABS RENDER ============
function renderTabs() {
  const nav = document.getElementById('nav-tabs');
  // Sesión 5: filtrar pestañas que la usuaria no puede ver (privadas-de-usuario sin permiso)
  const visibleTabs = state.tabs.filter(t => userCanSeeTab(t) && !tabFueraDelMenu(t));
  nav.innerHTML = visibleTabs.map((t, i) => {
    const active = t.id === userPrefs.activeTabId ? ' active' : '';
    const removable = t.removable !== false && t.type !== 'dashboard' && t.type !== 'settings';
    const x = removable ? `<span class="tab-x" onclick="event.stopPropagation();removeTab('${t.id}')">✕</span>` : '';
    // Todas las pestañas son renombrables con doble clic, excepto el Dashboard global y Configuración (que tienen nombres reservados)
    const renamable = t.type !== 'dashboard' && t.type !== 'settings';
    const editable = renamable ? ` ondblclick="renameTab(event,'${t.id}')" title="Doble clic para renombrar"` : '';
    const draggable = userPrefs.editMode ? ' draggable="true"' : '';
    // Íconos de privacidad/bloqueo
    const p = tabPrivacy(t);
    let privacyIcon = '';
    if (t.locked) privacyIcon += '<span class="tab-privacy-icon" title="Bloqueada (solo lectura)">🔒</span>';
    if (p === 'private_user') privacyIcon += '<span class="tab-privacy-icon" title="Privada (solo usuarias autorizadas)">👁</span>';
    else if (p === 'private_password') {
      const unlocked = _unlockedTabsThisSession.has(t.id);
      privacyIcon += `<span class="tab-privacy-icon" title="${unlocked?'Desbloqueada esta sesión':'Protegida con contraseña'}">${unlocked?'🔓':'🔐'}</span>`;
    }
    return `<div class="nav-tab${active}" data-tab-id="${t.id}" data-tab-idx="${i}"${draggable} onclick="${t.type==='declaraciones'?`declTabClick('${t.id}')`:`switchTab('${t.id}')`}"${editable}>${privacyIcon}<span>${bbEscape(t.name)}</span>${x}</div>`;
  }).join('') + `<span class="nav-tab-add" onclick="openAddTab()">+ Nueva pestaña</span>`;
  if (userPrefs.editMode) attachTabDragHandlers();
}

function attachTabDragHandlers() {
  let dragSrc = null;
  document.querySelectorAll('.nav-tab').forEach(el => {
    el.addEventListener('dragstart', e => {
      dragSrc = el;
      el.classList.add('dragging');
      try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', el.dataset.tabId); } catch(_) {}
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      document.querySelectorAll('.nav-tab.drag-over').forEach(x => x.classList.remove('drag-over'));
    });
    el.addEventListener('dragover', e => {
      e.preventDefault();
      if (dragSrc && dragSrc !== el) el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      if (!dragSrc || dragSrc === el) return;
      const fromId = dragSrc.dataset.tabId;
      const toId = el.dataset.tabId;
      const fromIdx = state.tabs.findIndex(t => t.id === fromId);
      const toIdx = state.tabs.findIndex(t => t.id === toId);
      if (fromIdx < 0 || toIdx < 0) return;
      const [moved] = state.tabs.splice(fromIdx, 1);
      state.tabs.splice(toIdx, 0, moved);
      saveState();
      renderTabs();
      toast('Pestaña movida');
    });
  });
}

function switchTab(id) {
  userPrefs.activeTabId = id;
  saveUserPrefs();
  renderTabs();
  renderContent();
  // Sesión 6: actualizar warning de presencia (otras usuarias editando en esta pestaña)
  if (typeof renderPresenceWarning === 'function') renderPresenceWarning();
}
