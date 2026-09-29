// ============ MODULO CLIENTES (extraído de app.js) ============

function renderClientes() {
  if (!state.clientes) state.clientes = [];
  if (!state.tipoColors) state.tipoColors = JSON.parse(JSON.stringify(INIT_TIPO_COLORS));

  const layout = userPrefs.clientsLayout || 1;
  const search = (userPrefs.clientsSearch || '').toLowerCase();
  const tipoFilter = userPrefs.clientsTipoFilter || '';
  const sortBy = userPrefs.clientsSortBy || 'nombre_asc';

  if (vaultActive() && !vaultUnlocked) { return renderVaultLockedHTML(); }
  if (vaultActive() && vaultUnlocked) { _resetVaultTimer(); }

  // Counts per tipo
  const tipoCounts = {};
  state.clientes.forEach(c => { tipoCounts[c.tipo] = (tipoCounts[c.tipo]||0) + 1; });
  const allTipos = Object.keys(tipoCounts).sort();

  // Filtered list
  let filtered = state.clientes.map(cView);
  if (tipoFilter) filtered = filtered.filter(c => c.tipo === tipoFilter);
  if (search) {
    filtered = filtered.filter(c => {
      return (c.nombre||'').toLowerCase().includes(search) ||
             (c.rut||'').toLowerCase().includes(search) ||
             (c.ci||'').toLowerCase().includes(search) ||
             (c.bps||'').toLowerCase().includes(search) ||
             (c.correo||'').toLowerCase().includes(search) ||
             (c.direccion||'').toLowerCase().includes(search);
    });
  }
  // Sort
  filtered = sortClientes(filtered.slice(), sortBy);

  // Sort options (used only in Directorio view; for others, default by name)
  const sortOptions = [
    { val: 'nombre_asc',  label: '🔤 Nombre (A → Z)' },
    { val: 'nombre_desc', label: '🔤 Nombre (Z → A)' },
    { val: 'tipo_asc',    label: '🏷 Tipo (A → Z)' },
    { val: 'tipo_desc',   label: '🏷 Tipo (Z → A)' },
    { val: 'rut_asc',     label: '🔢 RUT (ascendente)' },
    { val: 'rut_desc',    label: '🔢 RUT (descendente)' },
    { val: 'ci_asc',      label: '🪪 CI (ascendente)' },
    { val: 'ci_desc',     label: '🪪 CI (descendente)' },
    { val: 'fnac_asc',    label: '🎂 F. Nac. (más antiguo)' },
    { val: 'fnac_desc',   label: '🎂 F. Nac. (más reciente)' },
    { val: 'created_desc',label: '🆕 Más recientes primero' },
    { val: 'created_asc', label: '📜 Más antiguos primero' }
  ];

  let html = `
    <div class="section-header">
      <div>
        <div class="section-title">👥 Información de Clientes</div>
        <div style="font-size:12px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;">${state.clientes.filter(c=>!c.archived).length} activos · ${state.clientes.filter(c=>c.archived).length} archivados${filtered.length!==state.clientes.length?' · '+filtered.length+' coinciden con el filtro':''}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <div class="layout-switcher" title="Cambiar vista">
          <button class="layout-opt${layout===1?' active':''}" onclick="setClientsLayout(1)" title="Expediente individual">📋 Expediente</button>
          <button class="layout-opt${layout===2?' active':''}" onclick="setClientsLayout(2)" title="Directorio">📊 Directorio</button>
          <button class="layout-opt${layout===3?' active':''}" onclick="setClientsLayout(3)" title="Panel-detalle">📑 Panel</button>
          <button class="layout-opt${layout===4?' active':''}" onclick="setClientsLayout(4)" title="Galería">🗂 Galería</button>
        </div>
        ${vaultToolbarHTML()}
        <button class="btn btn-outline" onclick="exportClientesXLSX()" title="Exportar a Excel">⬇ Excel</button>
        <button class="btn btn-outline" onclick="exportClientesPDF()" title="Exportar a PDF">⬇ PDF</button>
        <button class="btn btn-gold" onclick="openNewClienteModal()">+ Nuevo cliente</button>
      </div>
    </div>

    <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
      <input id="clientes-search-input" placeholder="Buscar por nombre, RUT, CI, BPS, correo, dirección..." value="${search}" style="flex:1;min-width:240px;max-width:480px;padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);">
      <select id="clientes-tipo-filter" style="padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);">
        <option value="">Todos los tipos (${state.clientes.length})</option>
        ${allTipos.map(t => `<option value="${t}"${t===tipoFilter?' selected':''}>${(state.tipoColors[t]||{label:t}).label} (${tipoCounts[t]})</option>`).join('')}
      </select>
      <select id="clientes-sort-sel" title="Ordenar por" style="padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);min-width:200px;">
        ${sortOptions.map(o => `<option value="${o.val}"${o.val===sortBy?' selected':''}>${o.label}</option>`).join('')}
      </select>
      ${(search || tipoFilter || sortBy !== 'nombre_asc') ? `<button class="btn btn-outline btn-sm" onclick="clearClientesFilters()" title="Limpiar filtros">✕ Limpiar</button>` : ''}
      <button class="btn btn-outline" onclick="openTipoColorsEditor()" title="Personalizar colores por tipo">🎨 Colores</button>
    </div>`;

  if (layout === 1) html += renderClientesLayout1(filtered);
  else if (layout === 2) html += renderClientesLayout2(filtered);
  else if (layout === 3) html += renderClientesLayout3(filtered);
  else if (layout === 4) html += renderClientesLayout4(filtered);

  return html;
}

function sortClientes(list, sortBy) {
  const cmp = (a,b) => (a||'').toString().localeCompare((b||'').toString(), 'es', { numeric:true, sensitivity:'base' });
  // Función base de ordenamiento según el criterio elegido
  let cmpFn;
  switch (sortBy) {
    case 'nombre_desc':  cmpFn = (a,b) => cmp(b.nombre, a.nombre); break;
    case 'tipo_asc':     cmpFn = (a,b) => cmp(a.tipo, b.tipo) || cmp(a.nombre, b.nombre); break;
    case 'tipo_desc':    cmpFn = (a,b) => cmp(b.tipo, a.tipo) || cmp(a.nombre, b.nombre); break;
    case 'rut_asc':      cmpFn = (a,b) => cmp(a.rut, b.rut); break;
    case 'rut_desc':     cmpFn = (a,b) => cmp(b.rut, a.rut); break;
    case 'ci_asc':       cmpFn = (a,b) => cmp(a.ci, b.ci); break;
    case 'ci_desc':      cmpFn = (a,b) => cmp(b.ci, a.ci); break;
    case 'fnac_asc':     cmpFn = (a,b) => cmp(a.fechaNac, b.fechaNac); break;
    case 'fnac_desc':    cmpFn = (a,b) => cmp(b.fechaNac, a.fechaNac); break;
    case 'created_desc': cmpFn = (a,b) => (b._created||0) - (a._created||0); break;
    case 'created_asc':  cmpFn = (a,b) => (a._created||0) - (b._created||0); break;
    case 'nombre_asc':
    default:             cmpFn = (a,b) => cmp(a.nombre, b.nombre);
  }
  // Activos siempre antes que archivados; dentro de cada grupo, aplica cmpFn
  return list.sort((a, b) => {
    const aArch = a.archived ? 1 : 0;
    const bArch = b.archived ? 1 : 0;
    if (aArch !== bArch) return aArch - bArch; // archivados al final
    return cmpFn(a, b);
  });
}

function clearClientesFilters() {
  userPrefs.clientsSearch = '';
  userPrefs.clientsTipoFilter = '';
  userPrefs.clientsSortBy = 'nombre_asc';
  saveUserPrefs();
  renderContent();
}

function setClientsLayout(n) {
  userPrefs.clientsLayout = n;
  saveUserPrefs();
  renderContent();
}

function tipoBadge(tipo) {
  if (!tipo) return '<span class="tipo-badge" style="background:#eee;color:#666;">—</span>';
  const tc = (state.tipoColors||{})[tipo];
  if (!tc || tc.enabled === false) return `<span class="tipo-badge" style="background:#eee;color:#666;">${tipo}</span>`;
  return `<span class="tipo-badge" style="background:${tc.bg};color:${tc.fg};">${tc.label || tipo}</span>`;
}

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
}

function fmtCliField(val, mono) {
  if (!val) return '<span style="color:var(--c-text-muted);font-style:italic;">—</span>';
  return mono ? `<span style="font-family:monospace;">${val}</span>` : val;
}

function fmtFechaNac(s) {
  if (!s || s === '0') return '—';
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const [y,m,d] = s.slice(0,10).split('-');
    return `${d}/${m}/${y}`;
  }
  return s;
}

// LAYOUT 1: Expediente individual (one client at a time, big detailed card)
function renderClientesLayout1(filtered) {
  let selected = filtered.find(c => clienteId(c) === userPrefs.clientsSelectedId);
  if (!selected && filtered.length) selected = filtered[0];
  if (!selected) return '<div style="background:var(--c-card);padding:40px;text-align:center;color:var(--c-text-muted);border-radius:6px;">No hay clientes que coincidan con el filtro.</div>';

  // Nav bar with prev/next
  const idx = filtered.indexOf(selected);
  const prev = idx > 0 ? filtered[idx-1] : null;
  const next = idx < filtered.length-1 ? filtered[idx+1] : null;

  let html = `<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
    <button class="btn btn-outline" ${prev?`onclick="selectCliente('${clienteId(prev)}')"`:'disabled style="opacity:.4;cursor:default;"'}>← Anterior</button>
    <select onchange="selectCliente(this.value)" style="flex:1;min-width:200px;padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);">
      ${filtered.map(c => `<option value="${clienteId(c)}"${c===selected?' selected':''}>${c.archived?'📦 ':''}${c.nombre}${c.archived?' (archivado)':''}</option>`).join('')}
    </select>
    <button class="btn btn-outline" ${next?`onclick="selectCliente('${clienteId(next)}')"`:'disabled style="opacity:.4;cursor:default;"'}>Siguiente →</button>
    <span style="color:var(--c-text-muted);font-size:12px;">${idx+1} de ${filtered.length}</span>
  </div>`;

  html += `<div class="cliente-expediente${selected.archived?' cliente-archived':''}">
    <div class="cli-exp-header">
      <div style="display:flex;align-items:center;gap:14px;">
        <div class="cli-avatar-lg">${initials(selected.nombre)}</div>
        <div>
          <div class="cli-exp-name">${selected.nombre} ${selected.archived?'<span class="cliente-archived-badge">📦 ARCHIVADO</span>':''}</div>
          <div style="margin-top:4px;">${tipoBadge(selected.tipo)}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;">
        ${cliLayoutBtn()}
        <button class="btn btn-outline" onclick="openEditCliente('${clienteId(selected)}')">✎ Editar</button>
        <button class="btn btn-outline" onclick="toggleClienteArchived('${clienteId(selected)}')" title="${selected.archived?'Reactivar':'Archivar'}">${selected.archived?'↩':'📦'}</button>
        <button class="btn btn-outline" onclick="deleteCliente('${clienteId(selected)}')" style="color:var(--c-red);border-color:var(--c-red);">🗑 Eliminar</button>
      </div>
    </div>

    <div class="cli-exp-body">
      ${renderCliSections(selected, '')}
    </div>

    <div class="cli-exp-actions">
      <a href="https://www.bps.gub.uy" target="_blank" rel="noopener" class="cli-exp-link">↗ BPS</a>
      <a href="https://servicios.dgi.gub.uy" target="_blank" rel="noopener" class="cli-exp-link">↗ DGI</a>
      <a href="https://mi.iduruguay.gub.uy" target="_blank" rel="noopener" class="cli-exp-link">↗ Gub.uy</a>
      <a href="https://www.cjppu.org.uy" target="_blank" rel="noopener" class="cli-exp-link">↗ CJPPU</a>
      <a href="https://www.comprasestatales.gub.uy" target="_blank" rel="noopener" class="cli-exp-link">↗ RUPE</a>
    </div>
  </div>`;
  return html;
}

// ============================================================
//  FICHA DE CLIENTE CONFIGURABLE (v8-ficha)
//  Los campos ya no están fijos en el código: viven en state.cliLayout, así que
//  se pueden mover de sección, reordenar, ocultar y renombrar desde la pantalla.
//  El ícono de WhatsApp es un campo más: se arrastra a donde quieras.
// ============================================================
const CLI_FIELD_DEFS = {
  rut:         { label:'RUT',                  kind:'mono' },
  bps:         { label:'BPS',                  kind:'mono' },
  ci:          { label:'CI',                   kind:'mono' },
  fechaNac:    { label:'F. nac.',              kind:'fecha' },
  passBPS:     { label:'Contraseña BPS',       kind:'pass' },
  passGubUy:   { label:'Contraseña Gub.uy',    kind:'pass' },
  codGubUy:    { label:'Códigos Gub.uy',       kind:'text' },
  cjppu:       { label:'N° CJPPU',             kind:'mono' },
  passCjppu:   { label:'Contraseña CJPPU',     kind:'pass' },
  rupe:        { label:'RUPE',                 kind:'text' },
  facturacion: { label:'Facturación',          kind:'text' },
  telefono:    { label:'WhatsApp',             kind:'whatsapp' },
  correo:      { label:'Correo',               kind:'mail' },
  direccion:   { label:'Dirección',            kind:'text' },
  fosmetal:    { label:'FOSMETAL',             kind:'text' },
  otros:       { label:'Otros',                kind:'text' }
};

function defaultCliLayout() {
  return { sections: [
    { id:'s_ident', icon:'📇', title:'Identificación',       fields:['rut','bps','ci','fechaNac'] },
    { id:'s_cred',  icon:'🔐', title:'Credenciales',          fields:['passBPS','passGubUy','codGubUy'] },
    { id:'s_prof',  icon:'💼', title:'Profesional / CJPPU',   fields:['cjppu','passCjppu','rupe','facturacion'] },
    { id:'s_cont',  icon:'📍', title:'Contacto',              fields:['telefono','correo','direccion','fosmetal','otros'] }
  ]};
}
function cliLayout() {
  if (!state.cliLayout || !Array.isArray(state.cliLayout.sections) || !state.cliLayout.sections.length) {
    state.cliLayout = defaultCliLayout();
  }
  return state.cliLayout;
}
function cliUsedKeys() {
  const out = [];
  cliLayout().sections.forEach(sec => (sec.fields || []).forEach(k => { if (CLI_FIELD_DEFS[k]) out.push(k); }));
  return out;
}
function cliHiddenKeys() {
  const used = cliUsedKeys();
  return Object.keys(CLI_FIELD_DEFS).filter(k => used.indexOf(k) < 0);
}

// ---------- WhatsApp ----------
// Normaliza a formato internacional. Uruguay: 09X XXX XXX → 5989XXXXXXX
function waNormalize(raw) {
  let d = String(raw == null ? '' : raw).replace(/[^\d]/g, '');
  if (!d) return '';
  if (d.slice(0,2) === '00') d = d.slice(2);
  if (d.slice(0,3) === '598') return d;
  d = d.replace(/^0+/, '');
  if (d.length >= 8 && d.length <= 9) return '598' + d; // número uruguayo sin prefijo
  return d;
}
function waIconSvg(size, color) {
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + color + '" aria-hidden="true">' +
    '<path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"/>' +
    '<path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.05 22l5.35-1.4a9.8 9.8 0 0 0 4.64 1.18h.01c5.43 0 9.85-4.42 9.85-9.86A9.8 9.8 0 0 0 12.04 2zm0 17.96h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.19-8.2 2.19 0 4.24.86 5.79 2.4a8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19z"/></svg>';
}
function cliFieldWhatsApp(label, raw, c) {
  const num = waNormalize(raw);
  if (!num) {
    return '<div class="cli-field"><div class="cli-field-label">' + label + '</div>' +
      '<div class="cli-field-value"><span class="wa-chip wa-off" onclick="openEditCliente(\'' + clienteId(c) + '\')" title="Agregar número de WhatsApp">' +
      waIconSvg(16, '#9aa0a6') + '<span>Agregar número</span></span></div></div>';
  }
  const shown = String(raw || '').trim();
  return '<div class="cli-field"><div class="cli-field-label">' + label + '</div>' +
    '<div class="cli-field-value"><a class="wa-chip" href="https://wa.me/' + num + '" target="_blank" rel="noopener" title="Abrir chat de WhatsApp con ' + shown.replace(/"/g,'&quot;') + '">' +
    waIconSvg(16, '#ffffff') + '<span>' + shown + '</span></a>' +
    '<button class="pass-btn" onclick="copyToClipboard(\'' + shown.replace(/'/g,"\\'") + '\')" title="Copiar número">⎘</button></div></div>';
}

// ---------- Render de una ficha según el diseño guardado ----------
function renderCliFieldByKey(key, c, sfx) {
  const def = CLI_FIELD_DEFS[key];
  if (!def) return '';
  const raw = c[key];
  if (def.kind === 'pass')     return cliFieldPassword(def.label, raw, clienteId(c) + '_' + key + (sfx || ''));
  if (def.kind === 'whatsapp') return cliFieldWhatsApp(def.label, raw, c);
  if (def.kind === 'fecha')    return cliField(def.label, fmtFechaNac(raw));
  if (def.kind === 'mail') {
    if (!raw) return cliField(def.label, raw);
    return '<div class="cli-field"><div class="cli-field-label">' + def.label + '</div>' +
      '<div class="cli-field-value"><a href="mailto:' + String(raw).replace(/"/g,'&quot;') + '" class="cli-mail-link">' + String(raw).replace(/</g,'&lt;') + '</a></div></div>';
  }
  return cliField(def.label, raw, def.kind === 'mono');
}

function renderCliSections(c, sfx, opts) {
  opts = opts || {};
  const lay = cliLayout();
  let html = '';
  if (_cliLayoutEdit) return renderCliLayoutEditor(c, sfx);
  lay.sections.forEach(sec => {
    const keys = (sec.fields || []).filter(k => CLI_FIELD_DEFS[k]);
    if (!keys.length) return;
    if (opts.hideEmpty && !keys.some(k => c[k])) return;
    html += '<div class="cli-exp-section"><div class="cli-exp-section-title">' + (sec.icon || '') + ' ' + (sec.title || '') + '</div>' +
      '<div class="cli-exp-grid">' + keys.map(k => renderCliFieldByKey(k, c, sfx)).join('') + '</div></div>';
  });
  return html;
}

// ---------- Modo "acomodar campos" (arrastrar y soltar) ----------
let _cliLayoutEdit = false;
let _cliDrag = null;

function toggleCliLayoutEdit() {
  _cliLayoutEdit = !_cliLayoutEdit;
  renderContent();
  if (_cliLayoutEdit) toast('⇅ Arrastrá los campos a donde quieras');
}
function cliLayoutBtn() {
  return '<button class="btn btn-outline" onclick="toggleCliLayoutEdit()" title="Mover, ocultar y renombrar los datos de la ficha">' +
    (_cliLayoutEdit ? '✓ Listo' : '⇅ Acomodar') + '</button>';
}

function renderCliLayoutEditor(c, sfx) {
  const lay = cliLayout();
  let html = '<div class="cli-layedit-bar">⇅ <b>Acomodando la ficha.</b> Arrastrá los campos entre secciones o al depósito de abajo para ocultarlos. ' +
    'Arrastrá el ⠿ de una sección para cambiarla de orden. Los cambios los ven las tres. ' +
    '<button class="btn btn-outline btn-sm" onclick="cliAddSection()">+ Sección</button> ' +
    '<button class="btn btn-outline btn-sm" onclick="cliResetLayout()">↺ Volver al original</button></div>';

  lay.sections.forEach(sec => {
    const keys = (sec.fields || []).filter(k => CLI_FIELD_DEFS[k]);
    html += '<div class="cli-exp-section cli-dsec" data-sid="' + sec.id + '">' +
      '<div class="cli-exp-section-title cli-sec-head">' +
        '<span class="cli-sec-grip" draggable="true" data-sid="' + sec.id + '" title="Arrastrar la sección">⠿</span>' +
        '<span>' + (sec.icon || '') + ' ' + (sec.title || '') + '</span>' +
        '<button class="pass-btn" onclick="cliRenameSection(\'' + sec.id + '\')" title="Renombrar">✎</button>' +
        '<button class="pass-btn" onclick="cliDeleteSection(\'' + sec.id + '\')" title="Quitar sección (los campos van al depósito)">🗑</button>' +
      '</div>' +
      '<div class="cli-exp-grid cli-dropzone" data-sid="' + sec.id + '">' +
        (keys.length ? keys.map(k =>
          '<div class="cli-dragf" draggable="true" data-fkey="' + k + '" data-sid="' + sec.id + '">' +
            '<span class="cli-dragf-grip">⠿</span>' +
            '<div style="min-width:0;"><div class="cli-field-label">' + CLI_FIELD_DEFS[k].label + '</div>' +
            '<div class="cli-field-value" style="opacity:.65;">' + (CLI_FIELD_DEFS[k].kind === 'whatsapp' ? 'ícono de WhatsApp' : (c && c[k] ? String(c[k]).slice(0,28) : '—')) + '</div></div>' +
          '</div>').join('')
          : '<div class="cli-drop-empty">Soltá campos acá</div>') +
      '</div></div>';
  });

  const hid = cliHiddenKeys();
  html += '<div class="cli-exp-section cli-hidden-bin"><div class="cli-exp-section-title">🗄 Campos ocultos</div>' +
    '<div class="cli-exp-grid cli-dropzone" data-sid="__hidden">' +
      (hid.length ? hid.map(k =>
        '<div class="cli-dragf" draggable="true" data-fkey="' + k + '" data-sid="__hidden">' +
          '<span class="cli-dragf-grip">⠿</span>' +
          '<div><div class="cli-field-label">' + CLI_FIELD_DEFS[k].label + '</div></div>' +
        '</div>').join('')
        : '<div class="cli-drop-empty">No hay campos ocultos</div>') +
    '</div></div>';
  return html;
}

function cliMoveField(key, toSid, beforeKey) {
  const lay = cliLayout();
  lay.sections.forEach(s => { s.fields = (s.fields || []).filter(k => k !== key); });
  if (toSid !== '__hidden') {
    const sec = lay.sections.find(s => s.id === toSid);
    if (!sec) return;
    sec.fields = sec.fields || [];
    const at = beforeKey ? sec.fields.indexOf(beforeKey) : -1;
    if (at >= 0) sec.fields.splice(at, 0, key); else sec.fields.push(key);
  }
  saveState(); renderContent();
}
function cliMoveSection(sid, beforeSid) {
  const lay = cliLayout();
  const i = lay.sections.findIndex(s => s.id === sid);
  if (i < 0) return;
  const [sec] = lay.sections.splice(i, 1);
  const at = beforeSid ? lay.sections.findIndex(s => s.id === beforeSid) : -1;
  if (at >= 0) lay.sections.splice(at, 0, sec); else lay.sections.push(sec);
  saveState(); renderContent();
}
function cliRenameSection(sid) {
  const sec = cliLayout().sections.find(s => s.id === sid);
  if (!sec) return;
  const t = prompt('Nombre de la sección:', sec.title || '');
  if (t === null) return;
  const ic = prompt('Ícono (podés dejarlo vacío):', sec.icon || '');
  sec.title = t.trim();
  if (ic !== null) sec.icon = ic.trim();
  saveState(); renderContent();
}
function cliDeleteSection(sid) {
  const lay = cliLayout();
  if (lay.sections.length <= 1) { alert('Tiene que quedar al menos una sección.'); return; }
  const sec = lay.sections.find(s => s.id === sid);
  if (!sec) return;
  if (!confirm('¿Quitar la sección "' + (sec.title || '') + '"?\n\nLos campos que tenga pasan a "Campos ocultos", no se borra ningún dato de los clientes.')) return;
  lay.sections = lay.sections.filter(s => s.id !== sid);
  saveState(); renderContent();
}
function cliAddSection() {
  const t = prompt('Nombre de la nueva sección:', 'Nueva sección');
  if (t === null) return;
  cliLayout().sections.push({ id: 'sec_' + Date.now().toString(36), icon: '📌', title: t.trim() || 'Nueva sección', fields: [] });
  saveState(); renderContent();
}
function cliResetLayout() {
  if (!confirm('¿Volver al orden original de la ficha?\n\nNo se borra ningún dato de los clientes.')) return;
  state.cliLayout = defaultCliLayout();
  saveState(); renderContent();
}

function cliLayoutAttachDnD() {
  if (!_cliLayoutEdit) return;
  const clearHints = () => document.querySelectorAll('.cli-drop-hint').forEach(x => x.classList.remove('cli-drop-hint'));

  document.querySelectorAll('.cli-dragf').forEach(el => {
    el.addEventListener('dragstart', e => {
      _cliDrag = { type:'field', key: el.dataset.fkey };
      el.classList.add('cli-dragging');
      try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', el.dataset.fkey); } catch(_) {}
    });
    el.addEventListener('dragend', () => { el.classList.remove('cli-dragging'); _cliDrag = null; clearHints(); });
    el.addEventListener('dragover', e => {
      if (!_cliDrag || _cliDrag.type !== 'field' || _cliDrag.key === el.dataset.fkey) return;
      e.preventDefault(); e.stopPropagation(); el.classList.add('cli-drop-hint');
    });
    el.addEventListener('dragleave', () => el.classList.remove('cli-drop-hint'));
    el.addEventListener('drop', e => {
      e.preventDefault(); e.stopPropagation(); clearHints();
      if (!_cliDrag || _cliDrag.type !== 'field') return;
      cliMoveField(_cliDrag.key, el.dataset.sid, el.dataset.fkey);
    });
  });

  document.querySelectorAll('.cli-dropzone').forEach(z => {
    z.addEventListener('dragover', e => {
      if (!_cliDrag || _cliDrag.type !== 'field') return;
      e.preventDefault(); z.classList.add('cli-drop-hint');
    });
    z.addEventListener('dragleave', () => z.classList.remove('cli-drop-hint'));
    z.addEventListener('drop', e => {
      e.preventDefault(); clearHints();
      if (!_cliDrag || _cliDrag.type !== 'field') return;
      cliMoveField(_cliDrag.key, z.dataset.sid, null);
    });
  });

  document.querySelectorAll('.cli-sec-grip').forEach(g => {
    g.addEventListener('dragstart', e => {
      _cliDrag = { type:'section', id: g.dataset.sid };
      try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', g.dataset.sid); } catch(_) {}
    });
    g.addEventListener('dragend', () => { _cliDrag = null; clearHints(); });
  });
  document.querySelectorAll('.cli-dsec').forEach(sec => {
    sec.addEventListener('dragover', e => {
      if (!_cliDrag || _cliDrag.type !== 'section' || _cliDrag.id === sec.dataset.sid) return;
      e.preventDefault(); sec.classList.add('cli-drop-hint');
    });
    sec.addEventListener('dragleave', () => sec.classList.remove('cli-drop-hint'));
    sec.addEventListener('drop', e => {
      if (!_cliDrag || _cliDrag.type !== 'section') return;
      e.preventDefault(); clearHints();
      cliMoveSection(_cliDrag.id, sec.dataset.sid);
    });
  });
}

function cliField(label, value, mono) {
  return `<div class="cli-field"><div class="cli-field-label">${label}</div><div class="cli-field-value">${fmtCliField(value, mono)}</div></div>`;
}

function cliFieldPassword(label, value, fieldId) {
  if (!value) return `<div class="cli-field"><div class="cli-field-label">${label}</div><div class="cli-field-value"><span style="color:var(--c-text-muted);font-style:italic;">—</span></div></div>`;
  return `<div class="cli-field">
    <div class="cli-field-label">${label}</div>
    <div class="cli-field-value cli-field-pass" id="pass-${fieldId}">
      <span class="pass-text" data-pass="${value.replace(/"/g,'&quot;')}">••••••••</span>
      <button class="pass-btn" onclick="togglePassVisible('${fieldId}')" title="Mostrar/ocultar">👁</button>
      <button class="pass-btn" onclick="copyToClipboard('${value.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')" title="Copiar">⎘</button>
    </div>
  </div>`;
}

function togglePassVisible(fieldId) {
  const wrap = document.getElementById('pass-' + fieldId);
  if (!wrap) return;
  const span = wrap.querySelector('.pass-text');
  if (!span) return;
  const real = span.getAttribute('data-pass');
  if (span.textContent === '••••••••') span.textContent = real;
  else span.textContent = '••••••••';
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => toast('📋 Copiado')).catch(() => fallbackCopy(text));
  } else fallbackCopy(text);
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); toast('📋 Copiado'); } catch(e) { toast('No se pudo copiar'); }
  document.body.removeChild(ta);
}

function clienteId(c) {
  // ID unico y permanente de cada cliente. Se asigna en ensureClientIds() al cargar
  // y tras sincronizar con Firebase, para que dos clientes con la misma CI/RUT/nombre
  // (ej: una empresa con 2 duenos, o un dueno con 2 empresas) NO se pisen entre si.
  if (c && c.id) return c.id;
  return (c.ci || c.rut || c.nombre || '').toString().replace(/[^a-zA-Z0-9]/g,'_').substring(0,40);
}
function ensureClientIds() {
  // Migracion idempotente: cada cliente debe tener un id unico y estable.
  if (!state.clientes || !Array.isArray(state.clientes)) return false;
  let changed = false;
  const vistos = new Set();
  state.clientes.forEach((c, i) => {
    if (!c.id || vistos.has(c.id)) {
      let nid;
      do {
        nid = 'cli_' + Date.now().toString(36) + '_' + i + '_' + Math.random().toString(36).slice(2, 8);
      } while (vistos.has(nid));
      c.id = nid;
      changed = true;
    }
    vistos.add(c.id);
  });
  return changed;
}

function selectCliente(id) {
  userPrefs.clientsSelectedId = id;
  saveUserPrefs();
  renderContent();
}

// LAYOUT 2: Directorio compacto (lista densa con muchas columnas)
function renderClientesLayout2(filtered) {
  const sortBy = userPrefs.clientsSortBy || 'nombre_asc';
  const sortIcon = (field) => {
    if (sortBy === field+'_asc')  return ' <span style="opacity:.9;">▲</span>';
    if (sortBy === field+'_desc') return ' <span style="opacity:.9;">▼</span>';
    return ' <span style="opacity:.3;">↕</span>';
  };
  const sortClick = (field) => {
    const next = (sortBy === field+'_asc') ? field+'_desc' : field+'_asc';
    return `onclick="setClientsSort('${next}')"`;
  };

  let html = `<div class="table-wrap"><table class="clientes-table"><thead><tr>
    <th style="text-align:left;width:60px;cursor:pointer;" ${sortClick('tipo')}>Tipo${sortIcon('tipo')}</th>
    <th style="text-align:left;min-width:220px;cursor:pointer;" ${sortClick('nombre')}>Nombre${sortIcon('nombre')}</th>
    <th style="width:120px;cursor:pointer;" ${sortClick('rut')}>RUT${sortIcon('rut')}</th>
    <th style="width:90px;">BPS</th>
    <th style="width:100px;cursor:pointer;" ${sortClick('ci')}>CI${sortIcon('ci')}</th>
    <th style="width:100px;cursor:pointer;" ${sortClick('fnac')}>F. Nac.${sortIcon('fnac')}</th>
    <th style="text-align:left;min-width:160px;">Correo</th>
    <th style="width:90px;"></th>
  </tr></thead><tbody>`;
  if (filtered.length === 0) {
    html += `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--c-text-muted);">No hay clientes que coincidan con el filtro.</td></tr>`;
  } else {
    const showArch = !!userPrefs.showArchivedClients;
    const archCount = filtered.filter(x => x.archived).length;
    let firstArchivedSeen = false;
    filtered.forEach(c => {
      // Insertar separador antes del primer archivado (siempre que haya archivados)
      if (c.archived && !firstArchivedSeen) {
        firstArchivedSeen = true;
        html += `<tr class="cli-archived-sep" onclick="toggleArchivedSection()"><td colspan="8"><span>${showArch?'▼':'▶'} 📦 Archivados (${archCount}) <small>${showArch?'· clic para ocultar':'· clic para mostrar'}</small></span></td></tr>`;
      }
      // Si está colapsado, NO renderizamos las filas archivadas
      if (c.archived && !showArch) return;
      html += `<tr class="${c.archived?'cli-row-archived':''}" style="cursor:pointer;" onclick="openEditCliente('${clienteId(c)}')">
        <td>${tipoBadge(c.tipo)}</td>
        <td><strong>${c.nombre||'—'}</strong>${c.archived?' <span class="cliente-archived-badge">📦</span>':''}</td>
        <td style="font-family:monospace;font-size:12px;">${c.rut||'<span style="color:var(--c-text-muted);">—</span>'}</td>
        <td style="font-family:monospace;font-size:12px;">${c.bps||'<span style="color:var(--c-text-muted);">—</span>'}</td>
        <td style="font-family:monospace;font-size:12px;">${c.ci||'<span style="color:var(--c-text-muted);">—</span>'}</td>
        <td style="font-size:12px;">${fmtFechaNac(c.fechaNac)}</td>
        <td style="font-size:12px;">${c.correo||'<span style="color:var(--c-text-muted);">—</span>'}</td>
        <td onclick="event.stopPropagation();">
          <button class="btn-icon" onclick="openEditCliente('${clienteId(c)}')" title="Editar">✎</button>
          <button class="btn-icon" onclick="toggleClienteArchived('${clienteId(c)}')" title="${c.archived?'Reactivar':'Archivar'}">${c.archived?'↩':'📦'}</button>
          <button class="btn-icon" onclick="deleteCliente('${clienteId(c)}')" title="Eliminar" style="color:var(--c-red);">🗑</button>
        </td>
      </tr>`;
    });
  }
  html += `</tbody></table></div>`;
  return html;
}

function setClientsSort(sortBy) {
  userPrefs.clientsSortBy = sortBy;
  saveUserPrefs();
  renderContent();
}

// LAYOUT 3: Panel-detalle (left list + right detail)
function renderClientesLayout3(filtered) {
  let selected = filtered.find(c => clienteId(c) === userPrefs.clientsSelectedId);
  if (!selected && filtered.length) selected = filtered[0];

  let html = `<div class="cli-panel-layout">
    <div class="cli-panel-list">`;
  if (filtered.length === 0) {
    html += `<div style="padding:20px;text-align:center;color:var(--c-text-muted);font-size:12px;">Sin resultados</div>`;
  } else {
    const showArch = !!userPrefs.showArchivedClients;
    const archCount = filtered.filter(x => x.archived).length;
    let firstArchivedSeen = false;
    filtered.forEach(c => {
      const id = clienteId(c);
      const isSel = c === selected;
      if (c.archived && !firstArchivedSeen) {
        firstArchivedSeen = true;
        html += `<div class="cli-archived-sep clickable" onclick="toggleArchivedSection()"><span>${showArch?'▼':'▶'} 📦 Archivados (${archCount})</span></div>`;
      }
      if (c.archived && !showArch) return;
      html += `<div class="cli-panel-item${isSel?' selected':''}${c.archived?' cli-row-archived':''}" onclick="selectCliente('${id}')">
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="cli-avatar-sm">${initials(c.nombre)}</div>
          <div style="flex:1;min-width:0;">
            <div class="cli-panel-name">${c.archived?'📦 ':''}${c.nombre||'—'}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">${tipoBadge(c.tipo)}</div>
          </div>
        </div>
      </div>`;
    });
  }
  html += `</div><div class="cli-panel-detail">`;

  if (!selected) {
    html += `<div style="padding:40px;text-align:center;color:var(--c-text-muted);">Seleccioná un cliente de la lista</div>`;
  } else {
    const nomSel = selected.nombre || '—';
    const nomAttr = nomSel.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;');
    html += `<div class="cli-panel-head">
      <div class="cli-panel-head-left">
        <div class="cli-avatar-md">${initials(selected.nombre)}</div>
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <div class="cli-panel-title" title="Clic para seleccionar todo el nombre">${nomSel}</div>
            <button class="pass-btn" onclick="copyToClipboard('${nomAttr}')" title="Copiar nombre">⎘</button>
            ${selected.archived?'<span class="cliente-archived-badge">📦 ARCHIVADO</span>':''}
          </div>
          <div style="margin-top:6px;">${tipoBadge(selected.tipo)}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-shrink:0;">
        ${cliLayoutBtn()}
        <button class="btn btn-outline" onclick="openEditCliente('${clienteId(selected)}')">✎ Editar</button>
        <button class="btn btn-outline" onclick="deleteCliente('${clienteId(selected)}')" style="color:var(--c-red);border-color:var(--c-red);">🗑</button>
      </div>
    </div>`;

    html += renderCliSections(selected, '3', { hideEmpty:false });
  }
  html += `</div></div>`;
  return html;
}

// LAYOUT 4: Galería de tarjetas
function renderClientesLayout4(filtered) {
  if (filtered.length === 0) {
    return `<div style="background:var(--c-card);padding:40px;text-align:center;color:var(--c-text-muted);border-radius:6px;">No hay clientes que coincidan con el filtro.</div>`;
  }
  const showArch = !!userPrefs.showArchivedClients;
  const archCount = filtered.filter(x => x.archived).length;
  let html = `<div class="cli-cards-grid">`;
  let firstArchivedSeen = false;
  filtered.forEach(c => {
    if (c.archived && !firstArchivedSeen) {
      firstArchivedSeen = true;
      html += `</div><div class="cli-archived-sep cards clickable" onclick="toggleArchivedSection()"><span>${showArch?'▼':'▶'} 📦 Archivados (${archCount}) <small>${showArch?'· clic para ocultar':'· clic para mostrar'}</small></span></div>`;
      if (showArch) html += `<div class="cli-cards-grid">`;
    }
    if (c.archived && !showArch) return;
    html += `<div class="cli-card${c.archived?' cli-card-archived':''}" onclick="openEditCliente('${clienteId(c)}')">
      <div class="cli-card-header">
        <div class="cli-avatar-md">${initials(c.nombre)}</div>
        <div style="flex:1;min-width:0;">
          <div class="cli-card-name">${c.nombre} ${c.archived?'<span class="cliente-archived-badge">📦</span>':''}</div>
          <div style="margin-top:4px;">${tipoBadge(c.tipo)}</div>
        </div>
      </div>
      <div class="cli-card-body">
        <div class="cli-card-row"><span>RUT</span><strong>${c.rut||'—'}</strong></div>
        <div class="cli-card-row"><span>BPS</span><strong>${c.bps||'—'}</strong></div>
        <div class="cli-card-row"><span>CI</span><strong>${c.ci||'—'}</strong></div>
        <div class="cli-card-row"><span>F. nac.</span><strong>${fmtFechaNac(c.fechaNac)}</strong></div>
      </div>
      <div class="cli-card-footer">
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();openEditCliente('${clienteId(c)}')">✎ Ver / Editar</button>
        <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();toggleClienteArchived('${clienteId(c)}')" title="${c.archived?'Reactivar':'Archivar'}">${c.archived?'↩':'📦'}</button>
      </div>
    </div>`;
  });
  // Si no abrimos div del grid (porque mostramos solo el sep), igual cerrar bien
  if (!firstArchivedSeen || showArch) html += `</div>`;
  return html;
}

function attachClientesHandlers() {
  try { cliLayoutAttachDnD(); } catch(e) { console.warn('dnd ficha', e); }
  const s = document.getElementById('clientes-search-input');
  if (s) {
    s.addEventListener('input', () => {
      userPrefs.clientsSearch = s.value;
      saveUserPrefs();
      renderContent();
      const ns = document.getElementById('clientes-search-input');
      if (ns) { ns.focus(); ns.setSelectionRange(ns.value.length, ns.value.length); }
    });
  }
  const tf = document.getElementById('clientes-tipo-filter');
  if (tf) tf.addEventListener('change', () => {
    userPrefs.clientsTipoFilter = tf.value;
    saveUserPrefs();
    renderContent();
  });
  const sortSel = document.getElementById('clientes-sort-sel');
  if (sortSel) sortSel.addEventListener('change', () => {
    userPrefs.clientsSortBy = sortSel.value;
    saveUserPrefs();
    renderContent();
  });
}

function openNewClienteModal() {
  if (vaultActive() && !vaultUnlocked) { toast('🔒 Poné el PIN para agregar un cliente'); return; }
  const id = 'cli_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  const newC = { id, tipo: 'IyC', nombre: '', _created: Date.now() };
  if (vaultActive()) {
    const empty = {}; VAULT_SENS.forEach(f => empty[f] = '');
    vaultPlain[id] = empty;
  } else {
    VAULT_SENS.forEach(f => newC[f] = '');
  }
  state.clientes.push(newC);
  saveState();
  userPrefs.clientsSelectedId = id;
  saveUserPrefs();
  openEditCliente(id);
}

function openEditCliente(id) {
  const raw = state.clientes.find(cl => clienteId(cl) === id);
  if (!raw) return;
  if (vaultActive() && !vaultUnlocked) { toast('🔒 Poné el PIN para ver o editar la ficha'); return; }
  const c = cView(raw);
  const allTipos = Object.keys(state.tipoColors || INIT_TIPO_COLORS);
  const html = `<div class="modal cliente-edit-modal">
    <button class="modal-close" onclick="closeModal('modal-cli-edit')">×</button>
    <h3>${c.nombre || 'Nuevo cliente'}</h3>
    <div class="modal-sub">Editá los datos. Los cambios se guardan al cerrar.</div>
    <div class="cli-edit-grid">
      <label>Tipo<select id="cli-tipo">${allTipos.map(t => `<option value="${t}"${t===c.tipo?' selected':''}>${(state.tipoColors[t]||{label:t}).label}</option>`).join('')}</select></label>
      <label class="full">Nombre<input id="cli-nombre" type="text" value="${(c.nombre||'').replace(/"/g,'&quot;')}"></label>
      <label>RUT<input id="cli-rut" type="text" value="${(c.rut||'').replace(/"/g,'&quot;')}"></label>
      <label>BPS<input id="cli-bps" type="text" value="${(c.bps||'').replace(/"/g,'&quot;')}"></label>
      <label>CI<input id="cli-ci" type="text" value="${(c.ci||'').replace(/"/g,'&quot;')}"></label>
      <label>Fecha de nacimiento<input id="cli-fecha" type="date" value="${(c.fechaNac && /^\d{4}-\d{2}-\d{2}/.test(c.fechaNac))?c.fechaNac.slice(0,10):''}"></label>
      <label>Contraseña BPS<input id="cli-passbps" type="text" value="${(c.passBPS||'').replace(/"/g,'&quot;')}"></label>
      <label>Contraseña Gub.uy<input id="cli-passgub" type="text" value="${(c.passGubUy||'').replace(/"/g,'&quot;')}"></label>
      <label class="full">Códigos identificador Gub.uy<input id="cli-codgub" type="text" value="${(c.codGubUy||'').replace(/"/g,'&quot;')}"></label>
      <label class="full">📱 WhatsApp / Teléfono<input id="cli-telefono" type="tel" placeholder="099 123 456" value="${(c.telefono||'').replace(/"/g,'&quot;')}"><span style="font-size:10px;color:var(--c-text-muted);">Podés escribirlo como quieras. Si no ponés país, se asume Uruguay (+598).</span></label>
      <label class="full">Correo electrónico<input id="cli-correo" type="email" value="${(c.correo||'').replace(/"/g,'&quot;')}"></label>
      <label class="full">Dirección<input id="cli-direccion" type="text" value="${(c.direccion||'').replace(/"/g,'&quot;')}"></label>
      <label class="full">Sistema de Facturación<input id="cli-facturacion" type="text" value="${(c.facturacion||'').replace(/"/g,'&quot;')}"></label>
      <label>N° CJPPU<input id="cli-cjppu" type="text" value="${(c.cjppu||'').replace(/"/g,'&quot;')}"></label>
      <label>Contraseña CJPPU<input id="cli-passcjppu" type="text" value="${(c.passCjppu||'').replace(/"/g,'&quot;')}"></label>
      <label>RUPE<input id="cli-rupe" type="text" value="${(c.rupe||'').replace(/"/g,'&quot;')}"></label>
      <label>FOSMETAL<input id="cli-fosmetal" type="text" value="${(c.fosmetal||'').replace(/"/g,'&quot;')}"></label>
      <label class="full">Otros<textarea id="cli-otros" rows="2">${(c.otros||'').replace(/</g,'&lt;')}</textarea></label>
    </div>
    <div class="form-actions">
      <button class="btn btn-outline" onclick="deleteCliente('${id}')" style="color:var(--c-red);border-color:var(--c-red);">🗑 Eliminar</button>
      <button class="btn btn-outline" onclick="toggleClienteArchived('${id}')" title="${c.archived?'Reactivar este cliente':'Archivar — queda visible pero atenuado al final'}">${c.archived?'↩ Reactivar':'📦 Archivar'}</button>
      <button class="btn btn-outline" onclick="closeModal('modal-cli-edit')">Cancelar</button>
      <button class="btn btn-gold" onclick="saveClienteFromModal('${id}')">Guardar</button>
    </div>
  </div>`;
  ensureModal('modal-cli-edit', html);
  document.getElementById('modal-cli-edit').classList.add('open');
}

async function saveClienteFromModal(id) {
  const c = state.clientes.find(cl => clienteId(cl) === id);
  if (!c) return;
  const get = sid => (document.getElementById(sid) || {}).value || '';
  c.tipo = get('cli-tipo');
  c.nombre = get('cli-nombre').trim();
  const sens = {
    rut: get('cli-rut').trim(), bps: get('cli-bps').trim(), ci: get('cli-ci').trim(),
    fechaNac: get('cli-fecha').trim(), passBPS: get('cli-passbps').trim(), passGubUy: get('cli-passgub').trim(),
    codGubUy: get('cli-codgub').trim(), telefono: get('cli-telefono').trim(), correo: get('cli-correo').trim(),
    direccion: get('cli-direccion').trim(), facturacion: get('cli-facturacion').trim(), cjppu: get('cli-cjppu').trim(),
    passCjppu: get('cli-passcjppu').trim(), rupe: get('cli-rupe').trim(), fosmetal: get('cli-fosmetal').trim(), otros: get('cli-otros').trim()
  };
  if (vaultActive()) {
    if (!vaultUnlocked) { toast('🔒 Desbloqueá para guardar'); return; }
    vaultPlain[id] = sens;
    try {
      const enc = await _vaultEnc(vaultDEK, JSON.stringify(sens));
      c._iv = enc.iv; c._enc = enc.ct;
      VAULT_SENS.forEach(f => { delete c[f]; });
    } catch (e) { toast('✕ No se pudo cifrar'); return; }
  } else {
    Object.assign(c, sens);
  }
  const newId = clienteId(c);
  userPrefs.clientsSelectedId = newId;
  saveUserPrefs();
  saveState();
  closeModal('modal-cli-edit');
  renderContent();
  toast('Guardado');
}

function deleteCliente(id) {
  const idx = state.clientes.findIndex(cl => clienteId(cl) === id);
  if (idx < 0) return;
  const c = state.clientes[idx];
  if (!confirm(`¿Eliminar a "${c.nombre}"? Esta acción no se puede deshacer.`)) return;
  state.clientes.splice(idx, 1);
  if (userPrefs.clientsSelectedId === id) userPrefs.clientsSelectedId = null;
  saveUserPrefs();
  saveState();
  closeModal('modal-cli-edit');
  renderContent();
  toast('Eliminado');
}

// Mostrar/ocultar la sección de clientes archivados (preferencia por usuario)
function toggleArchivedSection() {
  userPrefs.showArchivedClients = !userPrefs.showArchivedClients;
  saveUserPrefs();
  renderContent();
}

// Archivar/reactivar cliente: queda visible pero atenuado y al final
function toggleClienteArchived(id) {
  const c = state.clientes.find(cl => clienteId(cl) === id);
  if (!c) return;
  const wasArchived = !!c.archived;
  c.archived = !wasArchived;
  if (c.archived) c._archivedAt = Date.now();
  else delete c._archivedAt;
  // Log al audit si está disponible
  if (typeof logAudit === 'function') {
    logAudit(c.archived ? 'lock' : 'unlock', 'row',
      (c.archived ? 'Archivó' : 'Reactivó') + ' al cliente "' + (c.nombre||'?') + '"',
      null, null, 'clientes');
  }
  saveState();
  // Cerrar modal si está abierto (puede no estarlo si vienen del botón en la lista)
  const m = document.getElementById('modal-cli-edit');
  if (m && m.classList.contains('open')) closeModal('modal-cli-edit');
  // Si recién archivamos, expandir la sección de archivados para que sepa dónde quedó
  if (c.archived && !userPrefs.showArchivedClients) {
    userPrefs.showArchivedClients = true;
    saveUserPrefs();
  }
  renderContent();
  toast(c.archived ? '📦 Cliente archivado (ver sección archivados)' : '↩ Cliente reactivado');
}

function ensureModal(id, innerHTML) {
  let m = document.getElementById(id);
  if (m) m.innerHTML = innerHTML;
  else {
    const wrap = document.createElement('div');
    wrap.className = 'modal-overlay';
    wrap.id = id;
    wrap.innerHTML = innerHTML;
    document.body.appendChild(wrap);
  }
}

// ============ TIPO COLORS EDITOR ============
function openTipoColorsEditor() {
  const allTipos = Object.keys(state.tipoColors || INIT_TIPO_COLORS);
  let rowsHtml = allTipos.map(t => {
    const tc = state.tipoColors[t] || {bg:'#eee',fg:'#666',label:t,enabled:true};
    return `<tr>
      <td><input type="text" value="${(tc.label||t).replace(/"/g,'&quot;')}" onchange="updateTipoColor('${t.replace(/'/g,"\\'")}','label',this.value)" style="width:140px;padding:5px 8px;font-size:12px;border:1px solid var(--c-border);border-radius:3px;"></td>
      <td style="text-align:center;">${tipoBadge(t)}</td>
      <td><input type="color" value="${tc.bg||'#eeeeee'}" onchange="updateTipoColor('${t.replace(/'/g,"\\'")}','bg',this.value)"></td>
      <td><input type="color" value="${tc.fg||'#666666'}" onchange="updateTipoColor('${t.replace(/'/g,"\\'")}','fg',this.value)"></td>
      <td style="text-align:center;"><label class="sueldos-check-wrap"><input type="checkbox" ${tc.enabled===false?'':'checked'} onchange="updateTipoColor('${t.replace(/'/g,"\\'")}','enabled',this.checked)"><span class="sueldos-check-box"></span></label></td>
    </tr>`;
  }).join('');
  const html = `<div class="modal" style="max-width:600px;">
    <button class="modal-close" onclick="closeModal('modal-tipo-colors')">×</button>
    <h3>🎨 Colores por tipo de cliente</h3>
    <div class="modal-sub">Personalizá el color de cada categoría. Los cambios se aplican a todos los usuarios.</div>
    <div class="table-wrap" style="margin-top:14px;">
      <table style="width:100%;font-size:12px;">
        <thead><tr>
          <th style="text-align:left;">Etiqueta</th>
          <th>Preview</th>
          <th>Fondo</th>
          <th>Texto</th>
          <th>Activo</th>
        </tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
    <div class="form-actions">
      <button class="btn btn-outline" onclick="resetTipoColors()" style="color:var(--c-red);border-color:var(--c-red);">Restaurar por defecto</button>
      <button class="btn btn-gold" onclick="closeModal('modal-tipo-colors')">Cerrar</button>
    </div>
  </div>`;
  ensureModal('modal-tipo-colors', html);
  document.getElementById('modal-tipo-colors').classList.add('open');
}

function updateTipoColor(tipo, field, value) {
  if (!state.tipoColors[tipo]) state.tipoColors[tipo] = {};
  state.tipoColors[tipo][field] = value;
  saveState();
  // Refresh modal in place
  openTipoColorsEditor();
}

function resetTipoColors() {
  if (!confirm('¿Restaurar todos los colores a los valores por defecto?')) return;
  state.tipoColors = JSON.parse(JSON.stringify(INIT_TIPO_COLORS));
  saveState();
  openTipoColorsEditor();
  renderContent();
}

// ============ EXPORT (XLSX / PDF) ============

var _CLI_HEADERS = ['Tipo','Nombre','Estado','RUT','BPS','CI','F. Nac.','Contraseña BPS','Contraseña Gub.uy','Códigos Gub.uy','Teléfono','Correo','Dirección','Facturación','N° CJPPU','Contraseña CJPPU','RUPE','FOSMETAL','Otros'];
var _CLI_WIDTHS  = [16,34,11,16,12,12,12,18,18,20,14,26,30,32,14,18,14,14,32];
var _CLI_KEYS    = [null,null,null,'rut','bps','ci','fechaNac','passBPS','passGubUy','codGubUy','telefono','correo','direccion','facturacion','cjppu','passCjppu','rupe','fosmetal','otros'];
function _xlsxClientesSheet(wb){
  var title = 'W. Machado — Estudio Contable · Clientes';
  if (vaultActive() && !vaultUnlocked) {
    buildStyledSheet(wb, 'Clientes', title, _CLI_HEADERS, _CLI_WIDTHS,
      [['🔒 Bóveda bloqueada — poné el PIN en Info. Clientes y reexportá para incluir los datos.','','','','','','','','','','','','','','','','','','']], {});
    return;
  }
  var list = (state.clientes||[]).map(cView).slice();
  list.sort(function(a,b){
    var aa = a.archived?1:0, bb = b.archived?1:0;
    if (aa!==bb) return aa-bb;
    return (a.nombre||'').localeCompare(b.nombre||'');
  });
  var rows = list.map(function(c){
    return _CLI_HEADERS.map(function(h,idx){
      if (idx===0) return c.tipo||'';
      if (idx===1) return c.nombre||'';
      if (idx===2) return c.archived ? 'Archivado' : 'Activo';
      var k = _CLI_KEYS[idx];
      return (c[k]==null) ? '' : String(c[k]);
    });
  });
  buildStyledSheet(wb, 'Clientes', title, _CLI_HEADERS, _CLI_WIDTHS, rows, {
    wrapCols: [1,9,11,12,13,18],
    freezeCols: 2,
    cellFill: function(r,c,v){ if (c===2 && v==='Archivado') return 'FFF3E2E2'; return null; }
  });
}

async function exportClientesXLSX() {
  if (vaultActive() && !vaultUnlocked) { toast('🔒 Poné el PIN para exportar'); return; }
  toast('⏳ Generando Excel…');
  try { if (!window.ExcelJS) await _loadScriptOnce(_XLSX_CDN); }
  catch(e){ toast('✕ No se pudo cargar el generador de Excel (revisá internet)'); return; }
  var wb = new ExcelJS.Workbook(); wb.creator = 'W. Machado Estudio Contable';
  _xlsxClientesSheet(wb);
  var fecha = (typeof todayLocalStr === 'function') ? todayLocalStr() : new Date().toISOString().slice(0,10);
  await _xlsxDownload(wb, 'Clientes_W_Machado_' + fecha + '.xlsx');
  toast('✓ Excel de clientes generado');
}

async

function exportClientesPDF() {
  if (vaultActive() && !vaultUnlocked) { toast('🔒 Poné el PIN para exportar'); return; }
  // Open a new window with print-styled HTML and trigger print
  const w = window.open('', '_blank');
  if (!w) { toast('Permití pop-ups para exportar a PDF'); return; }
  const rows = state.clientes.map(cView).sort((a,b)=>(a.nombre||'').localeCompare(b.nombre||''));
  let body = `<style>
    body{font-family:Lato,Arial,sans-serif;color:#0a0a0a;padding:18px;}
    h1{font-family:'Playfair Display',Georgia,serif;color:#0a0a0a;border-bottom:2px solid #b8972d;padding-bottom:8px;}
    .sub{color:#888;font-size:11px;margin-bottom:18px;}
    table{width:100%;border-collapse:collapse;font-size:10px;}
    th{background:#0a0a0a;color:#fff;padding:6px;text-align:left;}
    td{padding:5px 6px;border-bottom:0.5px solid #ccc;vertical-align:top;}
    .tipo{font-weight:700;font-size:9px;text-transform:uppercase;padding:2px 6px;border-radius:8px;}
    @media print{ @page{margin:1cm;} }
  </style>
  <h1>Información de Clientes — Estudio W. Machado</h1>
  <div class="sub">Exportado el ${new Date().toLocaleDateString('es')} · ${rows.length} clientes</div>
  <table><thead><tr>
    <th>Tipo</th><th>Nombre</th><th>RUT</th><th>BPS</th><th>CI</th><th>F. nac.</th><th>Correo</th><th>Dirección</th>
  </tr></thead><tbody>`;
  rows.forEach(c => {
    const tc = (state.tipoColors||{})[c.tipo] || {bg:'#eee',fg:'#666',label:c.tipo};
    body += `<tr>
      <td><span class="tipo" style="background:${tc.bg};color:${tc.fg};">${tc.label||c.tipo||'—'}</span></td>
      <td><strong>${c.nombre||'—'}</strong></td>
      <td style="font-family:monospace;">${c.rut||''}</td>
      <td style="font-family:monospace;">${c.bps||''}</td>
      <td style="font-family:monospace;">${c.ci||''}</td>
      <td>${fmtFechaNac(c.fechaNac)}</td>
      <td>${c.correo||''}</td>
      <td>${c.direccion||''}</td>
    </tr>`;
  });
  body += `</tbody></table>
  <script>setTimeout(function(){window.print();},500);<\/script>`;
  w.document.write(body);
  w.document.close();
}

