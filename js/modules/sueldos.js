/*
 * SUELDOS — datos, estado automático y acciones (rediseño oct. 2026).
 * La pantalla está en sueldos-vista.js; la bandeja «Esto está esperando por vos» y la
 * subpestaña Controles, en sueldos-bandeja.js.
 *
 * QUIÉN HACE QUÉ
 *   Lorena liquida los recibos, emite la factura de BPS y hace los controles.
 *   Envía los recibos y la factura quien figura en «Envía» (Wendy, Daniela o Lorena).
 *
 * DATOS — state.sueldos['AAAA-MM'] = { sueldos:[], sd:[], reliq:[] }, y cada fila:
 *   id          fijo, sale del nombre de la empresa: es EL MISMO en todos los meses. Así la
 *               sincronización mezcla fila por fila (merge3) y dos usuarias no se pisan.
 *   name, grupo, observaciones (y concepto / importe en Reliquidaciones)
 *   envia       'Wendy' | 'Daniela' | 'Lorena' | ''  (vacío = sin asignar)
 *   marcas      { recLiq, recEnv, bpsEmi, bpsEnv, fosmetal, contabilizado, controlFacturaBps,
 *                 auditoria } → cada una { u: quién la marcó, t: 'AAAA-MM-DDTHH:MM' }.
 *               Lo que se pasó del formato viejo queda con u:null (no se inventan responsables)
 *               y con la fecha que tuviera (o sin fecha). nota = la etiqueta vieja de la celda.
 *   noLleva     { recibos, bps, fosmetal, contabilizado, controlFacturaBps, auditoria } → true
 *   _v2         la fila ya está en el formato nuevo.
 *   El ESTADO no se guarda: se calcula de las marcas (sldEstado). Los campos viejos (status,
 *   prontos, avisadoEnviado, bps, flagLabels…) se dejan como estaban, sin uso, por si hay que
 *   volver atrás; la Nota interna se pasa a Observaciones y se borra.
 */

/* ===== CONFIGURACIÓN (fácil de cambiar) ===== */
const SLD_LIQUIDA = 'Lorena';                 // liquida, emite BPS y hace los controles
const SLD_ENVIAN = ['Wendy', 'Daniela', 'Lorena'];
const SLD_DIAS_ALERTA = 3;                    // «Falta enviar» se pone rojo a partir de estos días

const SLD_SUBS = { sueldos: 'Sueldos', sd: 'Servicios Domésticos', reliq: 'Reliquidaciones' };
const SLD_GRUPOS = {
  recibos: { label: 'Recibos',     hecho: 'recLiq', envio: 'recEnv', hLabel: 'Liquidados', eLabel: 'Enviados', hVerbo: 'liquidó', eVerbo: 'envió',  objeto: 'los recibos' },
  bps:     { label: 'Factura BPS', hecho: 'bpsEmi', envio: 'bpsEnv', hLabel: 'Emitida',    eLabel: 'Enviada',  hVerbo: 'emitió',  eVerbo: 'envió',  objeto: 'la factura BPS' }
};
const SLD_CONTROLES = [
  { key: 'fosmetal',          label: 'Fosmetal',          avance: 'con Fosmetal' },
  { key: 'contabilizado',     label: 'Contabilizado',     avance: 'contabilizados' },
  { key: 'controlFacturaBps', label: 'Control fact. BPS', avance: 'con la factura BPS controlada' },
  { key: 'auditoria',         label: 'Auditoría',         avance: 'auditados' }
];
const SLD_ESTADOS = [
  { key: 'liquidar', label: 'Por liquidar' },
  { key: 'listo',    label: 'Listo sin enviar' },
  { key: 'enviado',  label: 'Enviado' },
  { key: 'cerrado',  label: 'Cerrado' }
];

/* ===== MES ===== */
function getCurrentSueldosMonth() {
  if (userPrefs.sueldosMonth) return userPrefs.sueldosMonth;
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}
// Crea el mes en memoria si no existe. No guarda: se guarda con el primer cambio.
function ensureSueldosMonth(ym) {
  if (!state.sueldos) state.sueldos = {};
  if (!state.sueldos[ym]) state.sueldos[ym] = { sueldos: [], sd: [], reliq: [] };
  ['sueldos', 'sd', 'reliq'].forEach(k => { if (!Array.isArray(state.sueldos[ym][k])) state.sueldos[ym][k] = []; });
  return state.sueldos[ym];
}
function setSueldosMonth(ym) { userPrefs.sueldosMonth = ym; saveUserPrefs(); ensureSueldosMonth(ym); renderContent(); }
function setSueldosSubtab(name) { userPrefs.sueldosSubtab = name; saveUserPrefs(); renderContent(); }
function sldMesSumar(ym, n) { const p = ym.split('-').map(Number); const d = new Date(p[0], p[1] - 1 + n, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
function formatYearMonth(ym) {
  if (!ym || typeof ym !== 'string') return ym || '';
  const p = ym.split('-'); return (MONTHS[parseInt(p[1], 10) - 1] || p[1]) + ' ' + p[0];
}

/* ===== FILAS ===== */
function sldFilas(ym, sub) { const m = state.sueldos && state.sueldos[ym]; return (m && m[sub]) || []; }
function sldFila(ym, sub, id) { return sldFilas(ym, sub).find(r => r.id === id) || null; }
function sldSlug(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40) || 'fila'; }
function sldIdPara(name, sub, lista) {
  const base = 'sl_' + sub + '_' + sldSlug(name);
  let id = base, n = 2;
  while (lista.some(r => r.id === id)) id = base + '_' + (n++);
  return id;
}
function sldMarca(row, k) { return (row && row.marcas && row.marcas[k]) || null; }
function sldLleva(row, x) { return !(row && row.noLleva && row.noLleva[x]); }
function sldEnvia(row) { return (row && row.envia) || ''; }

/* ===== ESTADO AUTOMÁTICO =====
   Por liquidar → Listo sin enviar → Enviado → Cerrado.
   Cerrado = todo enviado Y todos los controles que le corresponden hechos (solo Sueldos lleva controles). */
function sldControlesDe(row, sub) { return sub === 'sueldos' ? SLD_CONTROLES.filter(c => sldLleva(row, c.key)) : []; }
function sldEstado(row, sub) {
  let faltaEnviar = false, todoEnviado = true;
  Object.keys(SLD_GRUPOS).forEach(g => {
    if (!sldLleva(row, g)) return;
    const G = SLD_GRUPOS[g], h = sldMarca(row, G.hecho), e = sldMarca(row, G.envio);
    if (!e) todoEnviado = false;
    if (h && !e) faltaEnviar = true;
  });
  if (faltaEnviar) return 'listo';
  if (!todoEnviado) return 'liquidar';
  return sldControlesDe(row, sub).every(c => sldMarca(row, c.key)) ? 'cerrado' : 'enviado';
}
function sldEstadoInfo(key) { return SLD_ESTADOS.find(s => s.key === key) || SLD_ESTADOS[0]; }
// Lo hecho que falta enviar: { dias, grupos:[...] }. dias = null si la marca vieja no tenía fecha.
function sldFaltaEnviar(row) {
  let dias = null, grupos = [];
  Object.keys(SLD_GRUPOS).forEach(g => {
    if (!sldLleva(row, g)) return;
    const G = SLD_GRUPOS[g], h = sldMarca(row, G.hecho);
    if (!h || sldMarca(row, G.envio)) return;
    grupos.push(g);
    const d = sldDiasDesde(h.t);
    if (d !== null && (dias === null || d > dias)) dias = d;
  });
  return grupos.length ? { dias, grupos } : null;
}

/* ===== FECHAS Y PERSONAS ===== */
function sldAhora() { const d = new Date(); return (typeof todayLocalStr === 'function' ? todayLocalStr() : d.toISOString().slice(0, 10)) + 'T' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
function sldDiasDesde(t) { if (!t) return null; const p = t.slice(0, 10).split('-').map(Number); const a = new Date(p[0], p[1] - 1, p[2]); const h = new Date(); h.setHours(0, 0, 0, 0); return Math.max(0, Math.round((h - a) / 86400000)); }
function sldFechaCorta(t) { if (!t) return ''; const p = t.slice(0, 10).split('-'); return p[2] + '/' + p[1]; }
function sldFechaLarga(t) { if (!t) return 'sin fecha'; const p = t.slice(0, 10).split('-'); return p[2] + '/' + p[1] + '/' + p[0] + (t.length > 10 ? ' ' + t.slice(11, 16) : ''); }
function sldHace(t) { const d = sldDiasDesde(t); if (d === null) return ''; return d === 0 ? 'hoy' : d === 1 ? 'ayer' : 'hace ' + d + ' días'; }
function sldYo() { const u = (typeof currentUser === 'function') ? currentUser() : null; return u ? u.name : ''; }
function sldNombre(n) { const u = n && findUserByName(n); return u ? (u.displayName || u.name) : (n || ''); }
// Circulito con la inicial y el color de cada usuaria. Sin responsable (tilde viejo): «—».
function sldIni(n, extra) {
  if (!n) return '<span class="sld-ini sld-ini-nadie" title="Marcado antes del cambio: no se sabe quién">—</span>';
  const u = findUserByName(n), col = (u && u.color) || 'var(--c-text-muted)';
  return '<span class="sld-ini' + (extra ? ' ' + extra : '') + '" style="background:' + col + '" title="' + bbEscape(sldNombre(n)) + '">' + bbEscape(sldNombre(n).charAt(0).toUpperCase()) + '</span>';
}

/* ===== GUARDAR ===== */
function sldGuardar(sinRedibujar) {
  saveState();
  if (typeof renderTabs === 'function') renderTabs();   // el número rojo de la pestaña
  if (!sinRedibujar) renderContent();
}

/* ===== ACCIONES ===== */
// Tocar un paso: marca (con quién y cuándo) o desmarca.
function sldTocar(ym, sub, id, k) {
  const row = sldFila(ym, sub, id); if (!row) return;
  if (!row.marcas) row.marcas = {};
  const G = Object.values(SLD_GRUPOS).find(x => x.hecho === k || x.envio === k);
  if (row.marcas[k]) {
    const m = row.marcas[k];
    const quien = m.u ? sldNombre(m.u) : 'alguien (antes del cambio)';
    const extra = (G && G.hecho === k && row.marcas[G.envio]) ? '\n\nTambién se desmarca «' + G.eLabel + '», porque no se puede enviar algo que no está hecho.' : '';
    if (!confirm('¿Desmarcar? Lo había marcado ' + quien + ' (' + sldFechaLarga(m.t) + ').' + extra)) return;
    delete row.marcas[k];
    if (extra) delete row.marcas[G.envio];
  } else {
    if (G && G.envio === k && !row.marcas[G.hecho]) { toast('Primero tiene que estar «' + G.hLabel + '»'); return; }
    const antes = sldEstado(row, sub);
    row.marcas[k] = { u: sldYo() || null, t: sldAhora() };
    // La campanita: le avisa a quien le toca seguir (sueldos-avisos.js).
    if (typeof sldAvisarMarca === 'function') sldAvisarMarca(ym, sub, row, k, antes);
  }
  sldGuardar();
}
// «No lleva»: se aplica a este mes y a los siguientes que ya existan (se puede corregir).
function sldNoLleva(ym, sub, id, x, on) {
  let n = 0;
  Object.keys(state.sueldos || {}).filter(m => m >= ym).forEach(m => {
    const r = sldFila(m, sub, id); if (!r) return;
    if (!r.noLleva) r.noLleva = {};
    if (on) r.noLleva[x] = true; else delete r.noLleva[x];
    n++;
  });
  sldGuardar();
  toast(on ? '«No lleva» desde ' + formatYearMonth(ym) + (n > 1 ? ' en adelante' : '') : 'Vuelve a contar como pendiente');
}
// «Envía»: desde este mes en adelante (por defecto) o solo este mes.
function sldSetEnvia(ym, sub, id, quien, soloEste) {
  const meses = soloEste ? [ym] : Object.keys(state.sueldos || {}).filter(m => m >= ym);
  meses.forEach(m => { const r = sldFila(m, sub, id); if (r) r.envia = quien || ''; });
  if (typeof sldAvisarEnvia === 'function') sldAvisarEnvia(ym, sub, id, quien, soloEste);
  sldGuardar();
  toast((quien ? 'Envía ' + sldNombre(quien) : 'Sin asignar') + (soloEste ? ' · solo ' + formatYearMonth(ym) : ' · desde ' + formatYearMonth(ym)));
}
function sldSetCampo(ym, sub, id, campo, valor) {
  const row = sldFila(ym, sub, id); if (!row) return;
  valor = String(valor == null ? '' : valor);
  if ((row[campo] || '') === valor) return;
  row[campo] = valor;
  sldGuardar(true);
  if (campo === 'observaciones' && valor.trim()) triggerSueldoObservacionNotify(row, valor.trim(), sub);
}
function openAddSueldoRow() {
  const sub = userPrefs.sueldosSubtab || 'sueldos';
  const label = { sueldos: 'la empresa', sd: 'el empleado o familia', reliq: 'la empresa o concepto' }[sub] || 'la fila';
  const name = prompt('Nombre de ' + label + ':');
  if (!name || !name.trim()) return;
  const ym = getCurrentSueldosMonth(), lista = ensureSueldosMonth(ym)[sub];
  const row = { id: sldIdPara(name.trim(), sub, lista), name: name.trim(), grupo: '', observaciones: '', envia: '', marcas: {}, noLleva: {}, _v2: true };
  if (/factura\s*bps/i.test(row.name)) row.noLleva.recibos = true;
  if (sub === 'reliq') { row.concepto = ''; row.importe = ''; }
  lista.push(row);
  sldGuardar();
  toast('Agregado: ' + row.name);
}
function removeSueldoRow(sub, id) {
  const ym = getCurrentSueldosMonth(), m = state.sueldos && state.sueldos[ym]; if (!m) return;
  const row = sldFila(ym, sub, id); if (!row) return;
  if (!confirm('¿Eliminar «' + row.name + '» de ' + formatYearMonth(ym) + '?')) return;
  m[sub] = m[sub].filter(r => r.id !== id);
  sldGuardar();
}
// Copia del mes anterior las empresas, «Envía», los «No lleva» y las Observaciones. NO los tildes.
// Si este mes ya tiene filas, solo agrega las que falten (nunca borra lo cargado).
function copySueldosFromPreviousMonth() {
  const ym = getCurrentSueldosMonth(), prev = sldMesSumar(ym, -1);
  const src = state.sueldos && state.sueldos[prev];
  if (!src) { toast('No hay datos en ' + formatYearMonth(prev)); return; }
  const dst = ensureSueldosMonth(ym);
  const yaHay = ['sueldos', 'sd', 'reliq'].reduce((a, s) => a + dst[s].length, 0);
  if (!confirm(yaHay ? '¿Traer de ' + formatYearMonth(prev) + ' las empresas que falten en ' + formatYearMonth(ym) + '? Lo que ya está cargado no se toca.'
                     : '¿Copiar las empresas de ' + formatYearMonth(prev) + ' a ' + formatYearMonth(ym) + '? Se copian «Envía», los «No lleva» y las Observaciones, sin los tildes.')) return;
  let n = 0;
  ['sueldos', 'sd', 'reliq'].forEach(sub => {
    (src[sub] || []).forEach(r => {
      if (!r.id || dst[sub].some(x => x.id === r.id)) return;
      const c = { id: r.id, name: r.name, grupo: r.grupo || '', observaciones: r.observaciones || '', envia: r.envia || '',
        marcas: {}, noLleva: Object.assign({}, r.noLleva || {}), _v2: true };
      if (sub === 'reliq') { c.concepto = r.concepto || ''; c.importe = r.importe || ''; }
      dst[sub].push(c); n++;
    });
  });
  sldGuardar();
  toast(n ? '✓ ' + n + ' fila' + (n === 1 ? '' : 's') + ' copiada' + (n === 1 ? '' : 's') + ' de ' + formatYearMonth(prev) : 'No faltaba ninguna');
}

// Al escribir una observación, le avisa a Lorena (como antes).
function triggerSueldoObservacionNotify(row, observacion, sub) {
  const destino = SLD_LIQUIDA;
  if (!findUserByName(destino)) return;
  const me = currentUser(); if (me && me.name === destino) return;
  const empresa = row.name || '(sin nombre)', ym = getCurrentSueldosMonth(), mes = formatYearMonth(ym);
  const corta = (n) => observacion.slice(0, n) + (observacion.length > n ? '…' : '');
  notifyUserByName(destino, 'cell_comment', '📋 Observación en Sueldos', (me ? me.name + ' agregó' : 'Se agregó') + ' una observación en "' + empresa + '" (' + mes + '): ' + corta(80), { type: 'tab', tabId: 'sueldos' });
  addTaskToUser(destino, '📋 Revisar observación en Sueldos · ' + empresa + ' (' + mes + '): ' + corta(60), { origin: 'sueldos-observacion', empresa, ym, subtab: sub });
}

/* ===== PASO AL FORMATO NUEVO =====
   No es automático: la pestaña muestra cómo queda cada empresa, descarga un respaldo y recién
   ahí se aplica (sldMigrarTodo). Después, si aparece alguna fila vieja (una pestaña abierta con
   la versión anterior), se pasa sola con las mismas reglas. */
function sldFilasViejas() {
  const out = [];
  Object.keys(state.sueldos || {}).sort().forEach(ym => ['sueldos', 'sd', 'reliq'].forEach(sub => sldFilas(ym, sub).forEach(r => { if (!r._v2) out.push({ ym, sub, r }); })));
  return out;
}
function sldMigrarFila(r, sub, lista) {
  const fl = r.flagLabels || {};
  const m = (k) => { const x = { u: null, t: (fl[k] && fl[k].d) || null }; if (fl[k] && fl[k].t) x.nota = fl[k].t; return x; };
  const marcas = {};
  if (sub === 'reliq') {
    // Reliquidaciones no tenía tildes, solo el estado elegido a mano.
    if (['pronto', 'enviado', 'finalizado'].includes(r.status)) marcas.recLiq = { u: null, t: null };
    if (['enviado', 'finalizado'].includes(r.status)) marcas.recEnv = { u: null, t: null };
  } else {
    if (r.prontos) marcas.recLiq = m('prontos');
    if (r.avisadoEnviado) { marcas.recEnv = m('avisadoEnviado'); if (!marcas.recLiq) marcas.recLiq = { u: null, t: null }; }
    if (r.bps) marcas.bpsEmi = m('bps');                       // el tilde viejo de BPS = «Emitida» (02/10/2026)
    if (sub === 'sueldos') SLD_CONTROLES.forEach(c => { if (r[c.key]) marcas[c.key] = m(c.key); });
  }
  const notas = [r.observaciones, r.notaInterna].map(x => String(x || '').trim()).filter(Boolean);
  const out = { id: r.id || sldIdPara(r.name, sub, lista), envia: r.envia || '', marcas, noLleva: Object.assign({}, r.noLleva || {}), observaciones: notas.join(' · ') };
  if (/factura\s*bps/i.test(r.name || '')) out.noLleva.recibos = true;
  return out;
}
function sldMigrarTodo(automatico) {
  let n = 0;
  Object.keys(state.sueldos || {}).forEach(ym => ['sueldos', 'sd', 'reliq'].forEach(sub => {
    const lista = sldFilas(ym, sub);
    lista.forEach(r => {
      if (r._v2) return;
      const nuevo = sldMigrarFila(r, sub, lista);
      Object.assign(r, nuevo); r._v2 = true; delete r.notaInterna; n++;
    });
  }));
  if (!automatico) state.sueldosV2 = { at: Date.now(), by: sldYo() };
  return n;
}
function sldDescargarRespaldo() {
  const data = JSON.stringify({ exportado: new Date().toISOString(), por: sldYo(), sueldos: state.sueldos, sueldosColumns: state.sueldosColumns }, null, 1);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  a.download = 'respaldo-sueldos-' + (typeof todayLocalStr === 'function' ? todayLocalStr() : 'hoy') + '.json';
  a.click();
}
function sldAplicarMigracion() {
  if (!isAdmin()) { toast('⛔ Solo una administradora puede hacer el cambio'); return; }
  if (!confirm('Se va a descargar un respaldo de Sueldos y después se pasan todos los meses al formato nuevo.\n\n¿Seguimos?')) return;
  sldDescargarRespaldo();
  const n = sldMigrarTodo(false);
  sldGuardar();
  toast('✓ ' + n + ' filas pasadas al formato nuevo. El respaldo quedó en Descargas.');
}
if (typeof registerStructureInitializer === 'function') registerStructureInitializer('sueldos-v2', function () {
  if (!state.sueldosV2) return false;                 // el primer paso lo hace una persona, a mano
  return sldMigrarTodo(true) > 0;
});
