/*
 * SUELDOS — la bandeja «Esto está esperando por vos», el número rojo de la pestaña y la
 * subpestaña Controles (oct. 2026). Datos y acciones en sueldos.js.
 *
 * LA BANDEJA mira el mes en curso y el anterior (los sueldos de setiembre se trabajan a
 * principios de octubre), sin importar qué mes esté abierto en la tabla.
 *   Lorena: empresas para liquidar, facturas BPS para emitir, controles pendientes (de las que ya
 *           están enviadas) y los envíos de sus empresas.
 *   Quien envía: recibos y facturas listos para enviar de las empresas que tiene asignadas.
 *   Los envíos sin nadie asignado les aparecen a las tres como «sin asignar».
 */

function sldMesesBandeja() {
  const d = new Date(), hoy = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  return [sldMesSumar(hoy, -1), hoy].filter(m => state.sueldos && state.sueldos[m]);
}

// Todas las tareas pendientes. resp = a quién le toca ('' = sin asignar).
function sldTareas() {
  const out = [];
  sldMesesBandeja().forEach(ym => ['sueldos', 'sd', 'reliq'].forEach(sub => sldFilas(ym, sub).forEach(r => {
    if (!r._v2) return;
    const base = { ym, sub, id: r.id, nombre: r.name };
    Object.keys(SLD_GRUPOS).forEach(g => {
      if (!sldLleva(r, g)) return;
      const G = SLD_GRUPOS[g], h = sldMarca(r, G.hecho);
      if (!h) out.push(Object.assign({ tipo: 'hacer', grupo: g, paso: G.hecho, resp: SLD_LIQUIDA, orden: 2 }, base));
      else if (!sldMarca(r, G.envio)) out.push(Object.assign({ tipo: 'enviar', grupo: g, paso: G.envio, resp: sldEnvia(r), desde: h, orden: 1, dias: sldDiasDesde(h.t) }, base));
    });
    if (sub === 'sueldos' && sldEstado(r, sub) === 'enviado') {
      const faltan = sldControlesDe(r, sub).filter(c => !sldMarca(r, c.key));
      if (faltan.length) out.push(Object.assign({ tipo: 'controles', faltan, resp: SLD_LIQUIDA, orden: 3 }, base));
    }
  })));
  return out.sort((a, b) => a.orden - b.orden || ((b.dias || 0) - (a.dias || 0)) || a.nombre.localeCompare(b.nombre));
}
function sldTareasDe(quien, lista) {
  lista = lista || sldTareas();
  if (quien === 'todas') return lista;
  return lista.filter(t => t.resp === quien || (t.tipo === 'enviar' && !t.resp));
}
// Para el número rojo de la pestaña: lo propio.
function sldPendientesMios() { const yo = sldYo(); return yo ? sldTareasDe(yo).length : 0; }
function tabBadge(t) {
  if (!t || t.type !== 'sueldos' || !state.sueldosV2) return '';
  const n = sldPendientesMios();
  return n ? '<span class="nav-badge" title="' + n + ' para vos">' + n + '</span>' : '';
}

function sldFiltroBandeja() { return userPrefs.sldBandeja || 'mio'; }
function setSldFiltroBandeja(v) { userPrefs.sldBandeja = v; saveUserPrefs(); renderContent(); }
function sldBandejaVerTodo() { userPrefs.sldBandejaTodo = !userPrefs.sldBandejaTodo; saveUserPrefs(); renderContent(); }

function sldBandejaHTML() {
  const yo = sldYo(), f = sldFiltroBandeja();
  const quien = f === 'mio' ? yo : f;
  const todas = sldTareas(), lista = sldTareasDe(quien, todas);
  const max = userPrefs.sldBandejaTodo ? 999 : 6;
  const titulo = f === 'mio' ? 'Esto está esperando por vos' : (f === 'todas' ? 'Todo lo pendiente' : 'Lo que le toca a ' + sldNombre(f));
  let h = '<div class="sld-bandeja"><div class="sld-band-head"><div><div class="sld-band-t">' + titulo + '</div>'
    + '<div class="sld-band-s">' + sldMesesBandeja().map(formatYearMonth).join(' y ') + '</div></div>'
    + '<div class="sld-band-f">' + [['mio', 'Mío']].concat(SLD_ENVIAN.map(n => [n, sldNombre(n)])).concat([['todas', 'Todas']])
      .map(([k, l]) => '<button class="' + (f === k ? 'on' : '') + '" onclick="setSldFiltroBandeja(\'' + k + '\')">' + bbEscape(l) + '</button>').join('') + '</div></div>';
  if (!lista.length) return h + '<div class="sld-band-vacia">✓ No hay nada pendiente' + (f === 'mio' ? ' para vos' : '') + '.</div></div>';
  h += '<div class="sld-band-lista">' + lista.slice(0, max).map(t => sldTareaHTML(t, f !== 'mio')).join('') + '</div>';
  if (lista.length > 6) h += '<button class="sld-band-mas" onclick="sldBandejaVerTodo()">' + (userPrefs.sldBandejaTodo ? 'Ver menos' : 'Ver todas (' + lista.length + ')') + '</button>';
  return h + '</div>';
}

function sldTareaHTML(t, mostrarResp) {
  const mes = MONTHS[parseInt(t.ym.split('-')[1], 10) - 1];
  const args = (k) => '\'' + t.ym + '\',\'' + t.sub + '\',\'' + t.id + '\',\'' + k + '\'';
  const donde = bbEscape(t.nombre) + ' <span class="sld-t-mes">' + mes + (t.sub !== 'sueldos' ? ' · ' + SLD_SUBS[t.sub] : '') + '</span>';
  let ico, que, det = '', btn = '', cls = '';
  if (t.tipo === 'hacer') {
    const G = SLD_GRUPOS[t.grupo];
    ico = t.grupo === 'recibos' ? '🧾' : '🏛'; que = t.grupo === 'recibos' ? 'Liquidar recibos' : 'Emitir factura BPS';
    btn = '<button class="btn btn-outline btn-sm" onclick="sldTocar(' + args(t.paso) + ')">✓ ' + G.hLabel + '</button>';
  } else if (t.tipo === 'enviar') {
    const G = SLD_GRUPOS[t.grupo], d = t.desde;
    ico = '📤'; que = 'Enviar ' + G.objeto;
    det = (d.u ? sldNombre(d.u) + ' ' + (t.grupo === 'recibos' ? 'los' : 'la') + ' ' + G.hVerbo : (t.grupo === 'recibos' ? 'Liquidados' : 'Emitida'))
      + (d.t ? ' el ' + sldFechaCorta(d.t) + ' · ' + sldHace(d.t) : ' (antes del cambio)');
    cls = (t.dias !== null && t.dias >= SLD_DIAS_ALERTA) ? ' rojo' : ' amarilla';
    btn = '<button class="btn btn-gold btn-sm" onclick="sldTocar(' + args(t.paso) + ')">✓ ' + G.eLabel + '</button>';
  } else {
    ico = '🔎'; que = 'Controles';
    det = 'Falta: ' + t.faltan.map(c => c.label).join(', ');
    btn = t.faltan.map(c => '<button class="btn btn-outline btn-sm" onclick="sldTocar(' + args(c.key) + ')">✓ ' + c.label + '</button>').join('');
  }
  const resp = mostrarResp || t.tipo === 'enviar'
    ? (t.resp ? '<span class="sld-t-resp">' + sldIni(t.resp) + '</span>' : '<span class="sld-t-sin">sin asignar</span>') : '';
  return '<div class="sld-tarea' + cls + '"><span class="sld-t-ico">' + ico + '</span><div class="sld-t-txt"><div><b>' + que + '</b> · ' + donde + '</div>'
    + (det ? '<div class="sld-t-det">' + bbEscape(det) + '</div>' : '') + '</div>' + resp + '<div class="sld-t-btn">' + btn + '</div></div>';
}

/* ===== CONTROLES ===== */
function sldControlesPendientes(ym) {
  let n = 0;
  sldFilas(ym, 'sueldos').forEach(r => { if (r._v2) sldControlesDe(r, 'sueldos').forEach(c => { if (!sldMarca(r, c.key)) n++; }); });
  return n;
}
function setSldCtl(campo, v) { userPrefs[campo] = v; saveUserPrefs(); renderContent(); }

function sldControlesHTML(ym) {
  const filas = sldFilas(ym, 'sueldos');
  const q = (userPrefs.sldCtlQ || '').toLowerCase(), cf = userPrefs.sldCtlFiltro || '', solo = !!userPrefs.sldCtlPend;
  const ctls = cf ? SLD_CONTROLES.filter(c => c.key === cf) : SLD_CONTROLES;
  // Avance de cada control: «14 de 19 contabilizados» (lo que no lleva no cuenta).
  let h = '<div class="sld-avances">' + SLD_CONTROLES.map(c => {
    const aplica = filas.filter(r => sldLleva(r, c.key)), hechos = aplica.filter(r => sldMarca(r, c.key)).length;
    const pct = aplica.length ? Math.round(hechos / aplica.length * 100) : 100;
    return '<div class="sld-av' + (cf === c.key ? ' on' : '') + '" onclick="setSldCtl(\'sldCtlFiltro\',\'' + (cf === c.key ? '' : c.key) + '\')" title="Tocá para ver solo este control">'
      + '<div class="sld-av-t">' + c.label + '</div><div class="sld-av-n"><b>' + hechos + '</b> de ' + aplica.length + ' ' + c.avance + '</div>'
      + '<div class="sld-av-bar"><i style="width:' + pct + '%"></i></div></div>';
  }).join('') + '</div>';
  h += '<div class="sld-barra"><input type="text" class="sld-buscar" placeholder="Buscar empresa…" value="' + bbEscape(userPrefs.sldCtlQ || '') + '" onchange="setSldCtl(\'sldCtlQ\',this.value)">'
    + '<select class="sld-sel" onchange="setSldCtl(\'sldCtlFiltro\',this.value)"><option value="">Todos los controles</option>'
    + SLD_CONTROLES.map(c => '<option value="' + c.key + '"' + (cf === c.key ? ' selected' : '') + '>' + c.label + '</option>').join('') + '</select>'
    + '<div class="gseg-sld"><button class="' + (solo ? 'on' : '') + '" onclick="setSldCtl(\'sldCtlPend\',true)">Solo pendientes</button><button class="' + (!solo ? 'on' : '') + '" onclick="setSldCtl(\'sldCtlPend\',false)">Todo</button></div></div>';
  const vis = filas.filter(r => (!q || String(r.name || '').toLowerCase().includes(q))
    && (!solo || ctls.some(c => sldLleva(r, c.key) && !sldMarca(r, c.key))));
  h += '<div class="table-wrap sld-wrap"><table class="sld-table sld-ctl-table"><thead><tr><th class="sld-emp">Empresa</th>'
    + ctls.map(c => '<th>' + c.label + '</th>').join('') + '</tr></thead><tbody>';
  if (!vis.length) h += '<tr><td colspan="' + (ctls.length + 1) + '" class="sld-vacio">' + (filas.length ? (solo ? '✓ No hay controles pendientes.' : 'Nada coincide con la búsqueda.') : 'No hay empresas en ' + formatYearMonth(ym) + '.') + '</td></tr>';
  vis.forEach(r => {
    h += '<tr><td class="sld-emp"><strong>' + bbEscape(r.name) + '</strong></td>';
    ctls.forEach(c => {
      const nl = !sldLleva(r, c.key), menu = '<button class="sld-mas" title="Opciones" onclick="sldMenuNoLleva(event,\'' + ym + '\',\'sueldos\',\'' + r.id + '\',\'' + c.key + '\')">⋯</button>';
      h += '<td class="sld-paso-td">' + (nl ? '<span class="sld-nolleva">No lleva</span>' : (sldMarca(r, c.key) ? sldCelda(ym, 'sueldos', r, c.key) : '<button class="sld-pend" onclick="sldTocar(\'' + ym + '\',\'sueldos\',\'' + r.id + '\',\'' + c.key + '\')" title="Tocá para marcarlo hecho">Pendiente</button>')) + menu + '</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table></div><div class="sld-pie">Servicios Domésticos y Reliquidaciones no llevan controles. «⋯» en cada casilla para marcar que esa empresa no lo lleva: queda para los meses siguientes.</div>';
  return h;
}
