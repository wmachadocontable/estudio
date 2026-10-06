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

function sldHoyYM() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
// Oct. 2026: los meses que mira la bandeja terminan en el mes elegido (o en el actual, si se eligió uno
// futuro): nunca aparecen pendientes de meses que vienen después. El número rojo de la pestaña mira hoy.
// Decisión de la usuaria (06/10/2026): los pendientes cuentan desde septiembre 2026; lo anterior no aparece.
const SLD_PENDIENTES_DESDE = '2026-09';
function sldMesesBandeja(hasta) {
  const hoy = sldHoyYM(), lim = (hasta && hasta < hoy) ? hasta : hoy;
  return [sldMesSumar(lim, -1), lim].filter(m => m >= SLD_PENDIENTES_DESDE && state.sueldos && state.sueldos[m]);
}

// Todas las tareas pendientes. resp = a quién le toca ('' = sin asignar).
// Liquidar y emitir: solo de meses que ya terminaron (los sueldos de octubre se hacen en noviembre).
// Enviar: siempre que ya esté liquidado o emitido, aunque el mes esté en curso.
function sldTareas(hasta) {
  const out = [], hoy = sldHoyYM();
  sldMesesBandeja(hasta).forEach(ym => sldSubsVisibles().map(s => s.key).concat(['ctlExtra']).forEach(sub => sldFilas(ym, sub).forEach(r => {
    if (!r._v2) return;
    const terminado = ym < hoy;
    const base = { ym, sub, id: r.id, nombre: r.name };
    Object.keys(SLD_GRUPOS).forEach(g => {
      if (!sldLleva(r, g)) return;
      const G = SLD_GRUPOS[g], h = sldMarca(r, G.hecho);
      if (!h) { if (terminado) out.push(Object.assign({ tipo: 'hacer', grupo: g, paso: G.hecho, resp: SLD_LIQUIDA, orden: 2 }, base)); }
      else if (!sldMarca(r, G.envio)) out.push(Object.assign({ tipo: 'enviar', grupo: g, paso: G.envio, resp: sldEnvia(r), desde: h, orden: 1, dias: sldDiasDesde(h.t) }, base));
    });
    if ((sub === 'sueldos' && sldEstado(r, sub) === 'enviado') || (sub === 'ctlExtra' && terminado)) {
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
  const sel = getCurrentSueldosMonth(), todas = sldTareas(sel), lista = sldTareasDe(quien, todas);
  const max = userPrefs.sldBandejaTodo ? 999 : 6;
  const titulo = f === 'mio' ? 'Esto está esperando por vos' : (f === 'todas' ? 'Todo lo pendiente' : 'Lo que le toca a ' + sldNombre(f));
  let h = '<div class="sld-bandeja"><div class="sld-band-head"><div><div class="sld-band-t">' + titulo + '</div>'
    + '<div class="sld-band-s">' + sldMesesBandeja(sel).map(formatYearMonth).join(' y ') + '</div></div>'
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
  const donde = bbEscape(t.nombre) + ' <span class="sld-t-mes">' + mes + (t.sub !== 'sueldos' ? ' · ' + sldSubNombre(t.sub) : '') + '</span>';
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

/* ===== CONTROLES =====
   Las empresas de Sueldos del mes + las agregadas solo a Controles (ctlExtra), menos las quitadas
   (sinCtl). Agregar y quitar queda firmado: quién y cuándo (oct. 2026). */
function sldCtlFilas(ym) {
  const out = [];
  sldFilas(ym, 'sueldos').forEach(r => { if (r._v2 && !r.sinCtl) out.push({ sub: 'sueldos', r }); });
  sldFilas(ym, 'ctlExtra').forEach(r => { if (!r.sinCtl) out.push({ sub: 'ctlExtra', r }); });
  return out;
}
function sldCtlQuitadas(ym) {
  const out = [];
  ['sueldos', 'ctlExtra'].forEach(sub => sldFilas(ym, sub).forEach(r => { if (r.sinCtl) out.push({ sub, r }); }));
  return out;
}
function sldControlesPendientes(ym) {
  let n = 0;
  sldCtlFilas(ym).forEach(x => sldControlesDe(x.r, x.sub).forEach(c => { if (!sldMarca(x.r, c.key)) n++; }));
  return n;
}
function setSldCtl(campo, v) { userPrefs[campo] = v; saveUserPrefs(); renderContent(); }
function sldFirma(m) { return m ? (m.u ? sldNombre(m.u) : 'alguien') + ' · ' + sldFechaLarga(m.t) : ''; }
const sldQ = (x) => "'" + x + "'";

async function sldCtlAgregar(ym) {
  const nombre = await pedirCliente({ titulo: 'Agregar a Controles', sub: formatYearMonth(ym) + ' y los meses siguientes', etiqueta: 'Empresa' });
  if (!nombre) return;
  const igual = (r) => String(r.name || '').trim().toLowerCase() === nombre.trim().toLowerCase();
  // Si ya estaba quitada, vuelve. Si ya está, avisa.
  const deSueldos = sldFilas(ym, 'sueldos').find(igual), extra = sldFilas(ym, 'ctlExtra').find(igual), ya = deSueldos || extra;
  if (ya && !ya.sinCtl) { toast('«' + ya.name + '» ya está en Controles'); return; }
  if (ya) { sldCtlVolver(ym, deSueldos ? 'sueldos' : 'ctlExtra', ya.id); return; }
  const mes = ensureSueldosMonth(ym); if (!mes.ctlExtra) mes.ctlExtra = [];
  mes.ctlExtra.push({ id: sldIdPara(nombre, 'ctlExtra', mes.ctlExtra), name: nombre.trim(), marcas: {}, noLleva: { recibos: true, bps: true },
    observaciones: '', envia: '', grupo: '', _v2: true, _alta: { u: sldYo() || null, t: sldAhora() } });
  sldGuardar();
  toast('✓ ' + nombre.trim() + ' agregada a Controles');
}
// Quitar / volver: desde este mes en adelante (en los meses que ya existan), como «No lleva».
function sldCtlQuitar(ym, sub, id) {
  const r = sldFila(ym, sub, id); if (!r) return;
  if (!confirm('¿Quitar «' + r.name + '» de Controles desde ' + formatYearMonth(ym) + '?\n\nNo se borra nada de Sueldos: solo deja de aparecer en Controles. Se puede volver a agregar.')) return;
  const firma = { u: sldYo() || null, t: sldAhora() };
  Object.keys(state.sueldos || {}).filter(m => m >= ym).forEach(m => { const x = sldFila(m, sub, id); if (x) x.sinCtl = Object.assign({}, firma); });
  sldGuardar();
  toast('Quitada de Controles: ' + r.name);
}
function sldCtlVolver(ym, sub, id) {
  const r = sldFila(ym, sub, id); if (!r) return;
  const firma = { u: sldYo() || null, t: sldAhora() };
  Object.keys(state.sueldos || {}).filter(m => m >= ym).forEach(m => {
    const x = sldFila(m, sub, id); if (!x) return;
    delete x.sinCtl; if (sub === 'ctlExtra') x._alta = Object.assign({}, firma);
  });
  sldGuardar();
  toast('✓ ' + r.name + ' vuelve a Controles');
}

function sldControlesHTML(ym) {
  const filas = sldCtlFilas(ym);
  const q = (userPrefs.sldCtlQ || '').toLowerCase(), cf = userPrefs.sldCtlFiltro || '', solo = !!userPrefs.sldCtlPend;
  const ctls = cf ? SLD_CONTROLES.filter(c => c.key === cf) : SLD_CONTROLES;
  // Avance de cada control: «14 de 19 contabilizados» (lo que no lleva no cuenta).
  let h = '<div class="sld-avances">' + SLD_CONTROLES.map(c => {
    const aplica = filas.filter(x => sldLleva(x.r, c.key)), hechos = aplica.filter(x => sldMarca(x.r, c.key)).length;
    const pct = aplica.length ? Math.round(hechos / aplica.length * 100) : 100;
    return '<div class="sld-av' + (cf === c.key ? ' on' : '') + '" onclick="setSldCtl(' + sldQ('sldCtlFiltro') + ',' + sldQ(cf === c.key ? '' : c.key) + ')" title="Tocá para ver solo este control">'
      + '<div class="sld-av-t">' + c.label + '</div><div class="sld-av-n"><b>' + hechos + '</b> de ' + aplica.length + ' ' + c.avance + '</div>'
      + '<div class="sld-av-bar"><i style="width:' + pct + '%"></i></div></div>';
  }).join('') + '</div>';
  h += '<div class="sld-barra"><input type="text" class="sld-buscar" placeholder="Buscar empresa…" value="' + bbEscape(userPrefs.sldCtlQ || '') + '" onchange="setSldCtl(' + sldQ('sldCtlQ') + ',this.value)">'
    + '<select class="sld-sel" onchange="setSldCtl(' + sldQ('sldCtlFiltro') + ',this.value)"><option value="">Todos los controles</option>'
    + SLD_CONTROLES.map(c => '<option value="' + c.key + '"' + (cf === c.key ? ' selected' : '') + '>' + c.label + '</option>').join('') + '</select>'
    + '<div class="gseg-sld"><button class="' + (solo ? 'on' : '') + '" onclick="setSldCtl(' + sldQ('sldCtlPend') + ',true)">Solo pendientes</button><button class="' + (!solo ? 'on' : '') + '" onclick="setSldCtl(' + sldQ('sldCtlPend') + ',false)">Todo</button></div>'
    + '<button class="btn btn-gold sld-ctl-add" onclick="sldCtlAgregar(' + sldQ(ym) + ')">+ Agregar a Controles</button></div>';
  const vis = filas.filter(x => (!q || String(x.r.name || '').toLowerCase().includes(q))
    && (!solo || ctls.some(c => sldLleva(x.r, c.key) && !sldMarca(x.r, c.key))));
  h += '<div class="table-wrap sld-wrap"><table class="sld-table sld-ctl-table"><thead><tr><th class="sld-emp">Empresa</th>'
    + ctls.map(c => '<th>' + c.label + '</th>').join('') + '</tr></thead><tbody>';
  if (!vis.length) h += '<tr><td colspan="' + (ctls.length + 1) + '" class="sld-vacio">' + (filas.length ? (solo ? '✓ No hay controles pendientes.' : 'Nada coincide con la búsqueda.') : 'No hay empresas en Controles para ' + formatYearMonth(ym) + '.') + '</td></tr>';
  vis.forEach(({ sub, r }) => {
    const a = (x) => sldQ(ym) + ',' + sldQ(sub) + ',' + sldQ(r.id) + (x ? ',' + sldQ(x) : '');
    const alta = sub === 'ctlExtra' && r._alta ? '<div class="sld-ctl-firma" title="Agregada a Controles">Agregada por ' + bbEscape(sldFirma(r._alta)) + '</div>' : '';
    h += '<tr><td class="sld-emp"><div class="sld-ctl-emp"><strong>' + bbEscape(r.name) + '</strong>'
      + '<button class="sld-ctl-x" title="Quitar de Controles" onclick="sldCtlQuitar(' + a() + ')">✕</button></div>' + alta + '</td>';
    ctls.forEach(c => {
      const nl = !sldLleva(r, c.key), menu = '<button class="sld-mas" title="Opciones" onclick="sldMenuNoLleva(event,' + a(c.key) + ')">⋯</button>';
      h += '<td class="sld-paso-td">' + (nl ? '<span class="sld-nolleva">No lleva</span>' : (sldMarca(r, c.key) ? sldCelda(ym, sub, r, c.key) : '<button class="sld-pend" onclick="sldTocar(' + a(c.key) + ')" title="Tocá para marcarlo hecho">Pendiente</button>')) + menu + '</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  const fuera = sldCtlQuitadas(ym);
  if (fuera.length) {
    h += '<details class="sld-ctl-fuera"><summary>Quitadas de Controles (' + fuera.length + ')</summary>'
      + fuera.map(({ sub, r }) => '<div class="sld-ctl-fuera-f"><span><strong>' + bbEscape(r.name) + '</strong> <small>quitada por ' + bbEscape(sldFirma(r.sinCtl)) + '</small></span>'
        + '<button class="btn btn-outline" onclick="sldCtlVolver(' + sldQ(ym) + ',' + sldQ(sub) + ',' + sldQ(r.id) + ')">↩ Volver a agregar</button></div>').join('')
      + '</details>';
  }
  h += '<div class="sld-pie">Servicios Domésticos y Reliquidaciones no llevan controles. «⋯» en cada casilla para marcar que esa empresa no lo lleva: queda para los meses siguientes. «+ Agregar a Controles» suma una empresa que no está en Sueldos; ✕ la quita desde este mes (no se borra nada de Sueldos).</div>';
  return h;
}
