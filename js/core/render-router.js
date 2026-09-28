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
