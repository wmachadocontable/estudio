/*
 * EMPRESAS Y SV. PROFESIONALES — VISTA NUEVA (oct. 2026, diseño «H» elegido por la usuaria)
 *
 * Se elige en Configuración → «Vista de Empresas y Sv. Profesionales» (cada una la suya:
 * userPrefs.vistaEmpresas = 'clasica' | 'nueva'). La clásica sigue igual que siempre.
 *   - Botón Mensual / Anual (userPrefs.empVista[tabId]) y el mes elegido (userPrefs.empMes[tabId]).
 *   - Azul = realizada (falta enviar) · Verde = enviada, con la inicial de quien la envió.
 *   - «Envía» al lado de cada empresa: quién le manda la información (row.envia). También en la clásica.
 * Los datos son los de siempre (getCell / openCellModal de app.js); la ficha está en ficha-celda.js.
 */
const EMP_MS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const EMP_MF = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const _empQ = {};

function empEsMensual(tab) {
  return !!tab && tab.type === 'table' && tab.columns && tab.columns.length === 12
    && tab.columns.every(c => MONTHS.includes(c) || MONTHS_SHORT.includes(c));
}
function empVistaNueva(tab) { return userPrefs.vistaEmpresas === 'nueva' && empEsMensual(tab); }
function setVistaEmpresas(v) { userPrefs.vistaEmpresas = v; saveUserPrefs(); renderContent(); toast(v === 'nueva' ? '✓ Vista nueva en Empresas y Sv. Profesionales' : '✓ Vista clásica'); }
function empVista(tab) { return (userPrefs.empVista && userPrefs.empVista[tab.id]) || 'anual'; }
function setEmpVista(tabId, v) { if (!userPrefs.empVista) userPrefs.empVista = {}; userPrefs.empVista[tabId] = v; saveUserPrefs(); renderContent(); }
function empMes(tab) {
  const m = userPrefs.empMes && userPrefs.empMes[tab.id];
  return (m === undefined || m === null) ? new Date().getMonth() : m;
}
function setEmpMes(tabId, m) { if (!userPrefs.empMes) userPrefs.empMes = {}; userPrefs.empMes[tabId] = m; saveUserPrefs(); renderContent(); }

/* ---- Quién: circulito con la inicial y el color de cada usuaria ---- */
function empIni(n, size) {
  if (!n) return '';
  const u = typeof findUserByName === 'function' ? findUserByName(n) : null;
  const col = (u && u.color) || 'var(--c-text-muted)', nom = u ? (u.displayName || u.name) : n;
  size = size || 16;
  return '<span class="emp-ini" style="background:' + col + ';width:' + size + 'px;height:' + size + 'px;font-size:' + Math.round(size * .55) + 'px" title="' + bbEscape(nom) + '">' + bbEscape(String(nom).charAt(0).toUpperCase()) + '</span>';
}
function empDM(d) { return d ? String(d).slice(8, 10) + '/' + String(d).slice(5, 7) : ''; }

/* ---- «Envía» por empresa (también se ve en la vista clásica) ---- */
function filaEnviaChip(tab, ri) {
  const r = tab.rows[ri]; if (!r) return '';
  const u = r.envia && typeof findUserByName === 'function' ? findUserByName(r.envia) : null;
  const nom = u ? (u.displayName || u.name) : (r.envia || '');
  return '<button type="button" class="emp-envia' + (r.envia ? ' on' : '') + '" title="Quién le envía la información a esta empresa" onclick="event.stopPropagation();empMenuEnvia(event,\'' + tab.id + '\',' + ri + ')">'
    + (r.envia ? empIni(r.envia, 15) + '<span>' + bbEscape(nom) + '</span>' : '<span>+ Envía</span>') + '</button>';
}
function empMenuCerrar() { const m = document.getElementById('emp-menu'); if (m) m.remove(); }
function empMenuEnvia(ev, tabId, ri) {
  empMenuCerrar();
  const tab = state.tabs.find(t => t.id === tabId), r = tab && tab.rows[ri]; if (!r) return;
  const m = document.createElement('div'); m.id = 'emp-menu'; m.className = 'emp-menu';
  m.innerHTML = '<div class="emp-menu-t">Envía la información de<br><b>' + bbEscape(r.name) + '</b></div>'
    + (state.users || []).map(u => '<button class="emp-menu-op' + (r.envia === u.name ? ' on' : '') + '" onclick="setFilaEnvia(\'' + tabId + '\',' + ri + ',\'' + bbEscape(u.name) + '\')">' + empIni(u.name, 18) + ' ' + bbEscape(u.displayName || u.name) + '</button>').join('')
    + '<button class="emp-menu-op" onclick="setFilaEnvia(\'' + tabId + '\',' + ri + ',\'\')">— Nadie</button>';
  document.body.appendChild(m);
  const b = ev.currentTarget || ev.target, rc = b.getBoundingClientRect();
  m.style.left = Math.max(8, Math.min(rc.left, window.innerWidth - m.offsetWidth - 8)) + 'px';
  const abajo = rc.bottom + 4 + m.offsetHeight < window.innerHeight;
  m.style.top = (abajo ? rc.bottom + 4 : Math.max(8, rc.top - m.offsetHeight - 4)) + 'px';
  setTimeout(() => document.addEventListener('click', empMenuCerrar, { once: true }), 0);
}
function setFilaEnvia(tabId, ri, quien) {
  empMenuCerrar();
  const tab = state.tabs.find(t => t.id === tabId), r = tab && tab.rows[ri]; if (!r) return;
  if (quien) r.envia = quien; else delete r.envia;
  saveState(); renderContent();
  toast(quien ? 'Envía: ' + quien + ' · ' + r.name : 'Sin asignar · ' + r.name);
}

/* ---- Una casilla ---- */
function empTip(c, mes) {
  const p = [mes];
  if (c.s === 'done') {
    p.push('Realizada' + (c.d ? ' el ' + empDM(c.d) : '') + (c.rq ? ' por ' + c.rq : ''));
    p.push(c.es ? 'Enviada' + (c.ed ? ' el ' + empDM(c.ed) : '') + (c.eq ? ' por ' + c.eq : '') : 'Falta enviar');
  } else p.push({ pending: 'Pendiente', na: 'No corresponde' }[c.s] || 'Sin registrar');
  if (c.c && c.c.trim()) p.push('💬 ' + c.c.trim());
  return bbEscape(p.join(' · '));
}
function empCelda(c) {
  const com = (c.c && c.c.trim()) ? '<i class="emp-com"></i>' : '';
  if (c.s === 'done' && c.es) return '<span class="emp-p emp-env">' + bbEscape((c.t && c.t.trim()) || empDM(c.ed || c.d) || '✓') + empIni(c.eq, 15) + com + '</span>';
  if (c.s === 'done') return '<span class="emp-p emp-real">✓ ' + bbEscape((c.t && c.t.trim()) || empDM(c.d)) + com + '</span>';
  if (c.s === 'pending') return '<span class="emp-p emp-pend">⏳' + com + '</span>';
  if (c.s === 'na') return '<span class="emp-na">—</span>';
  return '<span class="emp-dot"></span>' + com;
}
function empCuenta(tab, filas, cols) {
  const cs = filas.flatMap(r => cols.map(ci => getCell(tab, r, ci)));
  const env = cs.filter(c => c.s === 'done' && c.es).length, real = cs.filter(c => c.s === 'done' && !c.es).length;
  const pend = cs.filter(c => c.s === 'empty' || c.s === 'pending' || !c.s).length;
  return { env, real, pend, pct: (env + real + pend) ? Math.round((env + real) / (env + real + pend) * 100) : 0 };
}
function empFiltrar(tabId, q) {
  _empQ[tabId] = q;
  const t = String(q || '').trim().toLowerCase();
  document.querySelectorAll('.emp-v [data-emp-n]').forEach(el => { el.style.display = (!t || el.getAttribute('data-emp-n').includes(t)) ? '' : 'none'; });
}
function empNombreHTML(tab, r, ri) {
  const lock = '<span class="row-lock' + (r.locked ? ' locked' : '') + '" onclick="event.stopPropagation();toggleRowLock(\'' + tab.id + '\',' + ri + ')" title="' + (r.locked ? 'Fila bloqueada: tocá para desbloquear' : 'Bloquear fila') + '">' + (r.locked ? '🔒' : '🔓') + '</span>';
  const borrar = '<span class="row-x" onclick="event.stopPropagation();removeRow(\'' + tab.id + '\',' + ri + ')" title="Eliminar">✕</span>';
  const tag = tab.hasTag ? '<span class="emp-tag" onclick="event.stopPropagation();' + (r.locked ? '' : 'editTag(\'' + tab.id + '\',' + ri + ')') + '" title="Etiqueta">' + bbEscape(r.tag || '—') + '</span>' : '';
  return '<div class="emp-nom"><span class="editable-title" data-edit="row" data-tab-id="' + tab.id + '" data-row="' + ri + '">' + bbEscape(r.name) + '</span>' + lock + borrar + '</div>'
    + '<div class="emp-nom-sub">' + tag + filaEnviaChip(tab, ri) + '</div>';
}

/* ---- La pantalla ---- */
function empRender(tab) {
  const vista = empVista(tab), mes = empMes(tab), year = tab.tabYear || state.branding.year;
  const filas = getVisibleRows(tab);
  const cols = vista === 'mensual' ? [mes] : tab.columns.map((_, i) => i);
  const k = empCuenta(tab, filas, cols);
  const baseY = parseInt(state.branding.year) || new Date().getFullYear(), anios = [];
  for (let y = baseY - 3; y <= baseY + 10; y++) anios.push(y);
  const titulo = String(tab.name || '').replace(/^[\p{Extended_Pictographic}️\s]+/u, '');

  let h = '<div class="emp-v">';
  h += '<div class="emp-top"><div class="emp-tit"><span class="editable-title" data-edit="tab.name" data-tab-id="' + tab.id + '">' + bbEscape(titulo) + '</span> <i>' + year + '</i></div>'
    + '<div class="emp-acc"><select class="emp-anio" onchange="setTabYear(\'' + tab.id + '\', this.value)" title="Año">' + anios.map(y => '<option value="' + y + '"' + (String(y) === String(year) ? ' selected' : '') + '>' + y + '</option>').join('') + '</select>'
    + '<div class="emp-seg"><button class="' + (vista === 'mensual' ? 'on' : '') + '" onclick="setEmpVista(\'' + tab.id + '\',\'mensual\')">Mensual</button><button class="' + (vista === 'anual' ? 'on' : '') + '" onclick="setEmpVista(\'' + tab.id + '\',\'anual\')">Anual</button></div>'
    + '<button class="btn btn-gold" onclick="openAddEntity(\'' + tab.id + '\')">+ Agregar fila</button>' + (typeof tabPrivacyButton === 'function' ? tabPrivacyButton(tab) : '') + '</div></div>';
  h += (typeof renderSubTabsBar === 'function' ? renderSubTabsBar(tab) : '');
  if (vista === 'mensual') h += '<div class="emp-meses">' + EMP_MS.map((m, i) => '<button class="' + (i === mes ? 'on' : '') + '" onclick="setEmpMes(\'' + tab.id + '\',' + i + ')">' + m + '</button>').join('') + '</div>';
  const kp = (n, t, cls) => '<div class="emp-kpi ' + cls + '"><b>' + n + '</b><span>' + t + '</span></div>';
  h += '<div class="emp-kpis">' + kp(k.real, 'Realizadas · sin enviar', 'k-real') + kp(k.env, 'Enviadas', 'k-env') + kp(k.pend, 'Pendientes', 'k-pend') + kp(k.pct + '%', 'Completado', 'k-pct') + '</div>';
  h += '<div class="emp-herr"><input type="search" class="emp-buscar" placeholder="Buscar empresa…" value="' + bbEscape(_empQ[tab.id] || '') + '" oninput="empFiltrar(\'' + tab.id + '\',this.value)">'
    + '<div class="emp-leg"><span class="emp-p emp-real">✓ realizada</span><span class="emp-p emp-env">enviada' + empIni(((state.users || [])[0] || {}).name, 13) + '</span><span class="emp-p emp-pend">⏳ pendiente</span><span>inicial = quién la envió</span></div></div>';

  if (!filas.length) h += '<div class="emp-vacio">No hay registros. Tocá «+ Agregar fila».</div>';
  else if (vista === 'anual') {
    h += '<div class="table-wrap emp-wrap"><table class="emp-anual"><thead><tr><th class="emp-th-nom">Empresa</th>' + EMP_MS.map((m, i) => '<th' + (i === new Date().getMonth() && String(year) === String(new Date().getFullYear()) ? ' class="emp-hoy"' : '') + '>' + m + '</th>').join('') + '</tr></thead><tbody>';
    filas.forEach(r => {
      const ri = tab.rows.indexOf(r);
      h += '<tr data-emp-n="' + bbEscape(String(r.name || '').toLowerCase()) + '"' + (r.locked ? ' class="row-locked"' : '') + '><td class="emp-td-nom">' + empNombreHTML(tab, r, ri) + '</td>';
      tab.columns.forEach((_, ci) => {
        const c = getCell(tab, r, ci);
        h += '<td class="emp-c"' + (r.locked ? '' : ' onclick="openCellModal(\'' + tab.id + '\',' + ri + ',' + ci + ')"') + ' title="' + empTip(c, EMP_MF[ci]) + '">' + empCelda(c) + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div>';
  } else {
    h += '<div class="emp-mlista"><div class="emp-mcab"><span>Empresa · ' + EMP_MF[mes] + '</span><span>Realizada</span><span>Enviada</span><span>Estado</span><span>Comentario</span></div>';
    filas.forEach(r => {
      const ri = tab.rows.indexOf(r), c = getCell(tab, r, mes);
      const real = c.s === 'done' ? '<span class="emp-dato emp-c-real">✓ ' + (empDM(c.d) || 'sin fecha') + ' ' + empIni(c.rq, 16) + '</span>' + (c.t ? '<small class="emp-etq">' + bbEscape(c.t) + '</small>' : '') : '<span class="emp-nada">—</span>';
      const env = (c.s === 'done' && c.es) ? '<span class="emp-dato emp-c-env">📤 ' + (empDM(c.ed) || 'sin fecha') + ' ' + empIni(c.eq, 16) + '</span>'
        : (c.s === 'done' ? '<span class="emp-falta">Falta enviar</span>' : '<span class="emp-nada">—</span>');
      const est = (c.s === 'done' && c.es) ? ['Enviada', 'e-env'] : c.s === 'done' ? ['Realizada', 'e-real'] : c.s === 'pending' ? ['Pendiente', 'e-pend'] : c.s === 'na' ? ['No corresponde', 'e-na'] : ['Sin registrar', 'e-vacio'];
      h += '<div class="emp-mfila' + (r.locked ? ' row-locked' : '') + '" data-emp-n="' + bbEscape(String(r.name || '').toLowerCase()) + '"' + (r.locked ? '' : ' onclick="openCellModal(\'' + tab.id + '\',' + ri + ',' + mes + ')"') + '>'
        + '<div class="emp-mnom">' + empNombreHTML(tab, r, ri) + '</div>'
        + '<div data-l="Realizada">' + real + '</div><div data-l="Enviada">' + env + '</div>'
        + '<div data-l="Estado"><span class="emp-est ' + est[1] + '">' + est[0] + '</span></div>'
        + '<div data-l="Comentario" class="emp-mcom">' + (c.c && c.c.trim() ? bbEscape(c.c.trim()) : '<span class="emp-nada">—</span>') + '</div></div>';
    });
    h += '</div>';
  }
  h += '</div>';
  return h;
}

/* ---- Se engancha a la pestaña tipo «table» (si la vista nueva no está elegida, dibuja la de siempre) ---- */
if (typeof registerTabRenderer === 'function') {
  registerTabRenderer('table', (tab, mc) => {
    mc.innerHTML = empVistaNueva(tab) ? empRender(tab) : renderTable(tab);
    attachInlineEditHandlers();
    if (empVistaNueva(tab) && _empQ[tab.id]) empFiltrar(tab.id, _empQ[tab.id]);
  });
}

/* ---- Configuración: la tarjeta para elegir la vista ---- */
function empVistaCfgCard() {
  const v = userPrefs.vistaEmpresas === 'nueva' ? 'nueva' : 'clasica';
  const op = (id, t, d) => '<button type="button" class="emp-cfg-op' + (v === id ? ' on' : '') + '" onclick="setVistaEmpresas(\'' + id + '\')"><span class="emp-cfg-mini emp-cfg-' + id + '"><i></i><i></i><i></i></span><b>' + (v === id ? '✓ ' : '') + t + '</b><small>' + d + '</small></button>';
  return '<div class="settings-card emp-cfg"><h4>🏢 Vista de Empresas y Sv. Profesionales</h4>'
    + '<div class="emp-cfg-ops">' + op('clasica', 'Clásica', 'La de siempre: tabla con los 12 meses.') + op('nueva', 'Nueva', 'Mensual y anual; azul realizada, verde enviada con quién la envió.') + '</div>'
    + '<small class="ap-nota">Vale solo para vos: cada una elige la suya.</small></div>';
}
if (typeof renderSettings === 'function') {
  const _renderSettingsEmp = renderSettings;
  renderSettings = function () {
    const h = _renderSettingsEmp.apply(this, arguments), i = h.lastIndexOf('</div>');
    return i < 0 ? h + empVistaCfgCard() : h.slice(0, i) + empVistaCfgCard() + h.slice(i);
  };
}
