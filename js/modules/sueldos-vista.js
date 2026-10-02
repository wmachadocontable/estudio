/*
 * SUELDOS — la pantalla (rediseño oct. 2026). Datos y acciones en sueldos.js.
 * Subpestañas: Sueldos · Servicios Domésticos · Reliquidaciones · Controles.
 * Arriba de la tabla va la bandeja «Esto está esperando por vos» (sueldos-bandeja.js).
 */

function renderSueldos() {
  const ym = getCurrentSueldosMonth();
  const md = ensureSueldosMonth(ym);
  const pref = userPrefs.sueldosSubtab;
  const sub = (SLD_SUBS[pref] || pref === 'controles') ? pref : 'sueldos';
  const [y, m] = ym.split('-');
  let h = '<div class="sld-app">';
  h += '<div class="section-header"><div class="section-title">Sueldos <span>' + MONTHS[parseInt(m, 10) - 1] + ' ' + y + '</span></div>'
    + '<div class="sld-top">'
    + '<select id="sueldos-month-sel" class="sld-sel">' + MONTHS.map((mn, i) => { const v = String(i + 1).padStart(2, '0'); return '<option value="' + v + '"' + (v === m ? ' selected' : '') + '>' + mn + '</option>'; }).join('') + '</select>'
    + '<select id="sueldos-year-sel" class="sld-sel">' + [2024, 2025, 2026, 2027, 2028, 2029, 2030].map(v => '<option' + (String(v) === y ? ' selected' : '') + '>' + v + '</option>').join('') + '</select>'
    + '<button class="btn btn-outline btn-sm" onclick="copySueldosFromPreviousMonth()" title="Trae las empresas, «Envía», los «No lleva» y las Observaciones del mes anterior (sin los tildes)">⤵ Copiar mes anterior</button>'
    + '</div></div>';

  // Hasta que alguien haga el paso al formato nuevo, se muestra eso y nada más.
  if (!state.sueldosV2 && sldFilasViejas().length) return h + sldMigracionHTML() + '</div>';

  h += sldBandejaHTML();

  const pendCtl = sldControlesPendientes(ym);
  h += '<div class="sueldos-subtabs">'
    + Object.keys(SLD_SUBS).map(k => '<button class="sueldos-subtab' + (sub === k ? ' active' : '') + '" onclick="setSueldosSubtab(\'' + k + '\')">' + SLD_SUBS[k] + ' <span class="sueldos-subtab-count">' + md[k].length + '</span></button>').join('')
    + '<button class="sueldos-subtab' + (sub === 'controles' ? ' active' : '') + '" onclick="setSueldosSubtab(\'controles\')">Controles'
    + (pendCtl ? ' <span class="sueldos-subtab-count sld-cnt-alerta" title="' + pendCtl + ' controles pendientes">' + pendCtl + ' pendiente' + (pendCtl === 1 ? '' : 's') + '</span>' : '') + '</button>'
    + '</div>';

  if (sub === 'controles') return h + sldControlesHTML(ym) + '</div>';
  return h + sldTablaHTML(ym, sub) + '</div>';
}

function attachSueldosHandlers() {
  const m = document.getElementById('sueldos-month-sel'), y = document.getElementById('sueldos-year-sel');
  const ir = () => { if (m && y) setSueldosMonth(y.value + '-' + m.value); };
  if (m) m.addEventListener('change', ir);
  if (y) y.addEventListener('change', ir);
  const s = document.getElementById('sueldos-search-input');
  if (s) s.addEventListener('input', () => {
    userPrefs.sueldosSearch = s.value; saveUserPrefs(); renderContent();
    const ns = document.getElementById('sueldos-search-input'); if (ns) { ns.focus(); ns.setSelectionRange(ns.value.length, ns.value.length); }
  });
  sldAutoAltura();
}
if (typeof registerTabRenderer === 'function') registerTabRenderer('sueldos', (tab, mc) => { mc.innerHTML = renderSueldos(); attachSueldosHandlers(); });

/* ===== LA TABLA (Sueldos · Servicios Domésticos · Reliquidaciones) ===== */
function sldTablaHTML(ym, sub) {
  const q = (userPrefs.sueldosSearch || '').toLowerCase();
  const filtro = userPrefs.sldFiltroEstado || '';
  const todas = sldFilas(ym, sub);
  const cuenta = {}; SLD_ESTADOS.forEach(s => cuenta[s.key] = 0);
  todas.forEach(r => cuenta[sldEstado(r, sub)]++);
  const filas = todas.filter(r => (!q || [r.name, r.observaciones, r.grupo, r.concepto].some(v => String(v || '').toLowerCase().includes(q)))
    && (!filtro || sldEstado(r, sub) === filtro));

  let h = '<div class="sld-barra"><input type="text" id="sueldos-search-input" class="sld-buscar" placeholder="Buscar empresa, grupo u observación…" value="' + bbEscape(userPrefs.sueldosSearch || '') + '">'
    + '<button class="btn btn-gold btn-sm" onclick="openAddSueldoRow()">+ Agregar fila</button></div>';
  h += '<div class="stats-bar sld-stats">' + SLD_ESTADOS.map(s => '<div class="stat-card sld-st-' + s.key + (filtro === s.key ? ' sld-st-on' : '') + '" onclick="sldFiltrarEstado(\'' + s.key + '\')" title="Tocá para ver solo estas">'
    + '<div class="stat-num">' + cuenta[s.key] + '</div><div class="stat-label">' + s.label + '</div></div>').join('') + '</div>';
  if (filtro) h += '<div class="sld-filtro-on">Mostrando solo «' + sldEstadoInfo(filtro).label + '» · <a onclick="sldFiltrarEstado(\'' + filtro + '\')">ver todas</a></div>';

  const reliq = sub === 'reliq';
  h += '<div class="table-wrap sld-wrap"><table class="sld-table"><thead><tr>'
    + '<th rowspan="2" class="sld-emp">' + (sub === 'sd' ? 'Empleado / Familia' : 'Empresa') + '</th>'
    + (reliq ? '<th rowspan="2">Empleado / Concepto</th><th rowspan="2">Importe</th>' : '')
    + '<th rowspan="2">Estado</th><th rowspan="2">Envía</th>'
    + '<th colspan="2" class="sld-grupo-th">Recibos</th><th colspan="2" class="sld-grupo-th">Factura BPS</th>'
    + '<th rowspan="2">Grupo</th><th rowspan="2" class="sld-obs-th">Observaciones</th><th rowspan="2"></th></tr>'
    + '<tr class="sld-sub-th"><th>Liquidados</th><th>Enviados</th><th>Emitida</th><th>Enviada</th></tr></thead><tbody>';
  if (!filas.length) h += '<tr><td colspan="' + (reliq ? 12 : 10) + '" class="sld-vacio">' + (todas.length ? 'Nada coincide con la búsqueda.' : 'No hay filas en ' + formatYearMonth(ym) + '. Usá «Copiar mes anterior» o «+ Agregar fila».') + '</td></tr>';
  filas.forEach(r => { h += sldFilaHTML(ym, sub, r); });
  h += '</tbody></table></div>';
  h += '<div class="sld-pie">El estado se calcula solo con los tildes. Cada tilde guarda quién lo marcó y cuándo. «⋯» en Liquidados o Emitida para marcar que esa empresa no lo lleva.</div>';
  return h;
}

function sldFilaHTML(ym, sub, r) {
  const est = sldEstado(r, sub), falta = sldFaltaEnviar(r);
  const rojo = falta && falta.dias !== null && falta.dias >= SLD_DIAS_ALERTA;
  const cls = falta ? (rojo ? ' sld-fila-roja' : ' sld-fila-amarilla') : '';
  const a = (fn) => '\'' + ym + '\',\'' + sub + '\',\'' + r.id + '\'' + (fn ? ',' + fn : '');
  let h = '<tr class="sld-fila' + cls + '" data-id="' + r.id + '"><td class="sld-emp"><strong>' + bbEscape(r.name || '—') + '</strong></td>';
  if (sub === 'reliq') {
    h += '<td><input class="sld-in" value="' + bbEscape(r.concepto || '') + '" onblur="sldSetCampo(' + a() + ',\'concepto\',this.value)" placeholder="—"></td>'
      + '<td><input class="sld-in sld-num" value="' + bbEscape(r.importe || '') + '" onblur="sldSetCampo(' + a() + ',\'importe\',this.value)" placeholder="—"></td>';
  }
  h += '<td><span class="sld-est sld-est-' + est + '">' + sldEstadoInfo(est).label + '</span>'
    + (falta ? '<div class="sld-falta' + (rojo ? ' rojo' : '') + '">Falta enviar' + (falta.dias !== null ? ' · ' + (falta.dias === 0 ? 'hoy' : falta.dias + (falta.dias === 1 ? ' día' : ' días')) : '') + '</div>' : '') + '</td>';
  const env = sldEnvia(r);
  h += '<td><button class="sld-envia" onclick="sldMenuEnvia(event,' + a() + ')" title="Quién envía recibos y factura a esta empresa">'
    + (env ? sldIni(env) + '<span>' + bbEscape(sldNombre(env)) + '</span>' : '<span class="sld-sin">Sin asignar</span>') + '</button></td>';
  Object.keys(SLD_GRUPOS).forEach(g => {
    const G = SLD_GRUPOS[g];
    if (!sldLleva(r, g)) {
      h += '<td colspan="2" class="sld-nl-td"><span class="sld-nolleva">No lleva</span>'
        + '<button class="sld-mas" title="Opciones" onclick="sldMenuNoLleva(event,' + a('\'' + g + '\'') + ')">⋯</button></td>';
      return;
    }
    h += '<td class="sld-paso-td">' + sldCelda(ym, sub, r, G.hecho) + '<button class="sld-mas" title="Opciones" onclick="sldMenuNoLleva(event,' + a('\'' + g + '\'') + ')">⋯</button></td>';
    h += '<td class="sld-paso-td">' + sldCelda(ym, sub, r, G.envio, !sldMarca(r, G.hecho) ? 'Primero tiene que estar «' + G.hLabel + '»' : '') + '</td>';
  });
  h += '<td><input class="sld-in sld-grupo" value="' + bbEscape(r.grupo || '') + '" onblur="sldSetCampo(' + a() + ',\'grupo\',this.value)" placeholder="—"></td>';
  h += '<td class="sld-obs-td"><textarea class="sld-obs" rows="1" title="' + bbEscape(r.observaciones || '') + '" placeholder="—" onfocus="sldObsAbrir(this)" onblur="sldObsCerrar(this);sldSetCampo(' + a() + ',\'observaciones\',this.value)">' + bbEscape(r.observaciones || '') + '</textarea></td>';
  h += '<td><button class="sueldos-del-btn" onclick="removeSueldoRow(\'' + sub + '\',\'' + r.id + '\')" aria-label="Eliminar fila" title="Eliminar fila">✕</button></td></tr>';
  return h;
}

// Una casilla de paso o de control: tilde con inicial + fecha, o casillero vacío para marcar.
function sldCelda(ym, sub, r, k, bloqueo) {
  const m = sldMarca(r, k), args = '\'' + ym + '\',\'' + sub + '\',\'' + r.id + '\',\'' + k + '\'';
  if (m) {
    const tit = (m.u ? sldNombre(m.u) : 'Marcado antes del cambio') + ' · ' + sldFechaLarga(m.t) + (m.nota ? ' · ' + m.nota : '') + ' · tocá para desmarcar';
    return '<button class="sld-hecho" onclick="sldTocar(' + args + ')" title="' + bbEscape(tit) + '">' + sldIni(m.u) + '<span class="sld-f">' + (m.t ? sldFechaCorta(m.t) : '✓') + '</span></button>';
  }
  return '<button class="sld-tilde' + (bloqueo ? ' sld-bloq' : '') + '" onclick="sldTocar(' + args + ')" title="' + bbEscape(bloqueo || 'Tocá para marcar') + '"></button>';
}

function sldFiltrarEstado(k) { userPrefs.sldFiltroEstado = (userPrefs.sldFiltroEstado === k) ? '' : k; saveUserPrefs(); renderContent(); }

/* ===== Observaciones: se abre al tocarla para ver el texto completo ===== */
function sldObsAbrir(t) { t.classList.add('abierta'); t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight, 34) + 'px'; }
function sldObsCerrar(t) { t.classList.remove('abierta'); t.style.height = ''; t.title = t.value; }
function sldAutoAltura() {
  document.querySelectorAll('.sld-obs').forEach(t => t.addEventListener('input', () => { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }));
}

/* ===== Menús chiquitos («Envía» y «No lleva») ===== */
function sldMenu(ev, html) {
  ev.stopPropagation();
  sldMenuCerrar();
  const d = document.createElement('div');
  d.id = 'sld-menu'; d.className = 'sld-menu'; d.innerHTML = html;
  document.body.appendChild(d);
  const b = ev.currentTarget.getBoundingClientRect(), w = d.offsetWidth, hh = d.offsetHeight;
  let left = Math.min(b.left, window.innerWidth - w - 8), top = b.bottom + 4;
  if (top + hh > window.innerHeight - 8) top = Math.max(8, b.top - hh - 4);
  d.style.left = Math.max(8, left) + 'px'; d.style.top = top + 'px';
  setTimeout(() => document.addEventListener('click', sldMenuFuera), 0);
}
function sldMenuFuera(e) { const d = document.getElementById('sld-menu'); if (d && !d.contains(e.target)) sldMenuCerrar(); }
function sldMenuCerrar() { const d = document.getElementById('sld-menu'); if (d) d.remove(); document.removeEventListener('click', sldMenuFuera); }

function sldMenuEnvia(ev, ym, sub, id) {
  const r = sldFila(ym, sub, id); if (!r) return;
  const act = sldEnvia(r);
  const op = (n) => '<button class="sld-menu-op' + (act === n ? ' on' : '') + '" onclick="sldElegirEnvia(\'' + ym + '\',\'' + sub + '\',\'' + id + '\',\'' + n + '\')">'
    + (n ? sldIni(n) + bbEscape(sldNombre(n)) : '<span class="sld-ini sld-ini-nadie">—</span>Sin asignar') + '</button>';
  sldMenu(ev, '<div class="sld-menu-t">Envía recibos y factura</div>' + SLD_ENVIAN.map(op).join('') + op('')
    + '<label class="sld-menu-chk"><input type="checkbox" id="sld-solo-este"> Solo ' + bbEscape(formatYearMonth(ym)) + '</label>'
    + '<div class="sld-menu-ayuda">Si no marcás «Solo…», queda para los meses siguientes.</div>');
}
function sldElegirEnvia(ym, sub, id, n) {
  const solo = !!(document.getElementById('sld-solo-este') || {}).checked;
  sldMenuCerrar(); sldSetEnvia(ym, sub, id, n, solo);
}
// x = 'recibos' | 'bps' | una clave de control
function sldMenuNoLleva(ev, ym, sub, id, x) {
  const r = sldFila(ym, sub, id); if (!r) return;
  const nombre = SLD_GRUPOS[x] ? SLD_GRUPOS[x].label : ((SLD_CONTROLES.find(c => c.key === x) || {}).label || x);
  const no = !sldLleva(r, x);
  sldMenu(ev, '<div class="sld-menu-t">' + bbEscape(r.name) + ' · ' + bbEscape(nombre) + '</div>'
    + '<button class="sld-menu-op" onclick="sldMenuCerrar();sldNoLleva(\'' + ym + '\',\'' + sub + '\',\'' + id + '\',\'' + x + '\',' + (!no) + ')">'
    + (no ? '↩ Sí lleva (vuelve a quedar pendiente)' : '⊘ No lleva') + '</button>'
    + '<div class="sld-menu-ayuda">Vale para ' + bbEscape(formatYearMonth(ym)) + ' y los meses siguientes. Lo que no lleva no cuenta como pendiente.</div>');
}

/* ===== Pantalla del paso al formato nuevo ===== */
function sldMigracionHTML() {
  const viejas = sldFilasViejas();
  const conNota = viejas.filter(v => String(v.r.notaInterna || '').trim());
  const soloBps = viejas.filter(v => /factura\s*bps/i.test(v.r.name || ''));
  const meses = [...new Set(viejas.map(v => v.ym))];
  let h = '<div class="sld-mig"><h3>Sueldos cambia de formato</h3>'
    + '<p>Ahora cada tilde guarda <b>quién lo marcó y cuándo</b>, el estado se calcula solo y los controles pasan a su propia pestaña. '
    + 'Antes de seguir hay que pasar lo cargado (' + viejas.length + ' filas de ' + meses.length + ' mes' + (meses.length === 1 ? '' : 'es') + ') al formato nuevo. No se pierde nada:</p>'
    + '<ul><li>Prontos → <b>Recibos liquidados</b> · Avisado/Enviado → <b>Recibos enviados</b> (con su fecha).</li>'
    + '<li>BPS → <b>Factura BPS emitida</b> (queda pendiente de enviar).</li>'
    + '<li>Fosmetal, Contabilizado, Control fact. BPS y Auditoría → pestaña <b>Controles</b>.</li>'
    + '<li>Los tildes viejos quedan con su fecha pero <b>sin inicial («—»)</b>: no se inventan responsables.</li>'
    + '<li>La <b>Nota interna</b> pasa a Observaciones (si ya había una, van juntas separadas con « · »).</li></ul>';
  if (soloBps.length) h += '<p><b>Recibos «No lleva»</b> (solo llevan factura BPS): ' + [...new Set(soloBps.map(v => v.r.name))].map(bbEscape).join(', ') + '.</p>';
  if (conNota.length) {
    h += '<h4>Cómo quedan las Observaciones (' + conNota.length + ')</h4><div class="table-wrap"><table class="sld-mig-t"><thead><tr><th>Mes</th><th>Empresa</th><th>Nota interna</th><th>Observaciones hoy</th><th>Observaciones después</th></tr></thead><tbody>'
      + conNota.map(v => '<tr><td>' + formatYearMonth(v.ym) + '</td><td>' + bbEscape(v.r.name) + '</td><td>' + bbEscape(v.r.notaInterna) + '</td><td>' + bbEscape(v.r.observaciones || '—') + '</td><td><b>'
        + bbEscape([v.r.observaciones, v.r.notaInterna].map(x => String(x || '').trim()).filter(Boolean).join(' · ')) + '</b></td></tr>').join('') + '</tbody></table></div>';
  } else h += '<p>No hay Notas internas para pasar.</p>';
  h += '<div class="sld-mig-acc"><button class="btn btn-outline" onclick="sldDescargarRespaldo()">⬇ Descargar respaldo</button>'
    + (isAdmin() ? '<button class="btn btn-gold" onclick="sldAplicarMigracion()">Pasar al formato nuevo</button>'
                 : '<span class="sld-mig-esp">Lo tiene que hacer una administradora (Wendy o Daniela).</span>')
    + '</div><p class="sld-mig-nota">Al tocar «Pasar al formato nuevo» primero se descarga un respaldo de Sueldos, por las dudas.</p></div>';
  return h;
}
