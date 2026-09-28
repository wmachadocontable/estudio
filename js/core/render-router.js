const TAB_RENDERERS = new Map();

function registerTabRenderer(type, renderer) {
  TAB_RENDERERS.set(type, renderer);
}

function renderRegisteredTab(tab, container) {
  const renderer = TAB_RENDERERS.get(tab && tab.type);
  if (!renderer) return false;
  renderer(tab, container);
  return true;
}

function renderContent() {
  const tab = state.tabs.find(t => t.id === userPrefs.activeTabId);
  if (!tab) { userPrefs.activeTabId = 'dashboard'; saveUserPrefs(); renderContent(); return; }
  const mc = document.getElementById('main-content');
  // Sesión 5: si la usuaria no puede VER esta pestaña (privada-de-usuario sin permiso), redirigir al dashboard
  if (!userCanSeeTab(tab)) {
    userPrefs.activeTabId = 'dashboard';
    saveUserPrefs();
    toast('⛔ Esta pestaña es privada');
    renderTabs();
    renderContent();
    return;
  }
  // Sesión 5: si requiere contraseña y no está desbloqueada → lockscreen
  if (!userCanEnterTab(tab)) {
    mc.innerHTML = renderTabLockscreen(tab);
    setTimeout(() => { const i = document.getElementById('tab-unlock-pwd'); if (i) i.focus(); }, 50);
    return;
  }
  // Sesión 5: marca visual de bloqueo
  document.body.classList.toggle('tab-locked', !!tab.locked);
  if (
    typeof renderRegisteredTab === 'function' &&
    renderRegisteredTab(tab, mc)
  ) {
    return;
  }
  if (tab.type === 'dashboard') { mc.innerHTML = renderDashboard(); attachDashboardHandlers(); return; }
  else if (tab.type === 'mydash') { mc.innerHTML = renderMyDashboard(tab); return; }
  else if (tab.type === 'settings') mc.innerHTML = renderSettings();
  else if (tab.type === 'calendar') { mc.innerHTML = renderCalendar(); initCalendarHandlers(); return; }
  else if (tab.type === 'sueldos') { mc.innerHTML = renderSueldos(); attachSueldosHandlers(); return; }
  else if (tab.type === 'clientes') { mc.innerHTML = renderClientes(); attachClientesHandlers(); return; }
  else if (tab.type === 'table') mc.innerHTML = renderTable(tab);
  else if (tab.type === 'annual') mc.innerHTML = renderAnnualTable(tab);
  else if (tab.type === 'page') mc.innerHTML = renderPage(tab);
  else if (tab.type === 'builder') { mc.innerHTML = renderBuilder(tab); attachBuilderHandlers(tab); return; }
  else if (tab.type === 'declaraciones') { mc.innerHTML = renderDeclaraciones(tab); attachDeclHandlers(tab); return; }
  attachInlineEditHandlers();
}
