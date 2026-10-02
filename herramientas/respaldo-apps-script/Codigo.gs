/**
 * Respaldo diario — Página del Estudio W. Machado (oct. 2026).
 *
 * Corre en Google Apps Script con la cuenta wmachadocontable@gmail.com (dueña del proyecto de
 * Firebase «w-machado-contable»). No necesita claves guardadas: usa el permiso de la propia cuenta.
 *
 * - respaldoDiario(): todas las noches (23 h, hora de Uruguay) lee TODA la base de la página
 *   (nodo wm_app_v2), y guarda en Drive → Respaldos / Página del estudio W. Machado:
 *     · un JSON, para restaurar (Personalizar → Datos → Importar JSON), y
 *     · un Excel, para leer.
 *   Manda un mail a wmachadocontable@gmail.com con el JSON adjunto, el resumen y el link a la carpeta.
 *   Anota en la base (nodo wm_respaldo) cuándo se hizo: la página avisa si pasan 2 días sin respaldo.
 * - Si algo falla, manda un mail de ERROR con el detalle (antes se cortaba en silencio).
 * - Borra los respaldos de más de 90 días, salvo el del día 1 de cada mes (queda uno por mes).
 * - instalarDisparador(): se ejecuta UNA sola vez y programa el respaldo de todas las noches.
 * - probarAhora(): hace un respaldo en el momento (para verificar que anda).
 */
const BASE_URL = 'https://w-machado-contable-default-rtdb.firebaseio.com/';
const NODO = 'wm_app_v2';
const NODO_ESTADO = 'wm_respaldo';
const CARPETA = ['Respaldos', 'Página del estudio W. Machado'];
const AVISO_A = 'wmachadocontable@gmail.com';
const ZONA = 'America/Montevideo';
const DIAS_GUARDAR = 90;

/* ===================== RESPALDO ===================== */
function respaldoDiario() {
  const marca = Utilities.formatDate(new Date(), ZONA, 'yyyy-MM-dd_HH-mm');
  const hoy = marca.slice(0, 10);
  try {
    const estado = leerEstado_();
    const resumen = resumen_(estado);
    const dir = carpeta_(), nombre = 'estudio_machado_backup_' + marca;
    const texto = JSON.stringify(estado, null, 1);
    const json = dir.createFile(nombre + '.json', texto, 'application/json');
    let xlsxNombre = '', avisoExcel = '';
    try { xlsxNombre = dir.createFile(excel_(estado, nombre)).getName(); }
    catch (e) { avisoExcel = '<p style="color:#a33">El Excel no se pudo armar (' + e.message + '). El JSON está bien: es el que sirve para restaurar.</p>'; }
    MailApp.sendEmail({
      to: AVISO_A,
      subject: '✅ Respaldo W. Machado – ' + marca,
      htmlBody: '<p>El respaldo de la <b>página del estudio</b> se hizo correctamente.</p>'
        + '<p>📁 <a href="' + dir.getUrl() + '">Abrir la carpeta de respaldos en Drive</a></p>'
        + '<ul><li>' + resumen.join('</li><li>') + '</li></ul>' + avisoExcel
        + '<p style="color:#5d6f80;font-size:12px">Archivos: ' + json.getName() + ' (para restaurar: Personalizar → Datos → '
        + 'Importar JSON)' + (xlsxNombre ? ' y ' + xlsxNombre + ' (para leer)' : '') + '. El JSON va también adjunto.</p>',
      attachments: [Utilities.newBlob(texto, 'application/json', nombre + '.json')],
    });
    anotarEstado_({ ultimo: new Date().toISOString(), ok: true, archivo: json.getName(), tamano: texto.length, rev: estado._rev || null });
    limpiarViejos_(dir);
  } catch (e) {
    try { anotarEstado_({ ultimoError: new Date().toISOString(), error: String(e.message).slice(0, 300) }, true); } catch (e2) {}
    MailApp.sendEmail({
      to: AVISO_A,
      subject: '⚠️ ERROR en el respaldo W. Machado – ' + hoy,
      body: 'El respaldo de la página del estudio NO se pudo hacer.\n\nDetalle: ' + e.message
        + '\n\nRevisar en script.google.com → «Respaldo W. Machado» → Ejecuciones.'
        + '\nSi el detalle dice 401 o 403 (sin permiso), la cuenta que corre el script tiene que ser dueña o editora '
        + 'del proyecto de Firebase «w-machado-contable».',
    });
    throw e;
  }
}
function probarAhora() { respaldoDiario(); Logger.log('Listo: revisá el mail y la carpeta de Drive.'); }

/* ===================== DISPARADOR ===================== */
function instalarDisparador() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'respaldoDiario') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('respaldoDiario').timeBased().everyDays(1).atHour(23).nearMinute(0).inTimezone(ZONA).create();
  Logger.log('Respaldo programado todas las noches a las 23 h (Uruguay).');
}

/* ===================== BASE (Realtime Database, API REST) ===================== */
function url_(ruta) { return BASE_URL + ruta + '.json?access_token=' + encodeURIComponent(ScriptApp.getOAuthToken()); }
function leerEstado_() {
  const r = UrlFetchApp.fetch(url_(NODO), { muteHttpExceptions: true });
  const c = r.getResponseCode();
  if (c >= 300) throw new Error('No se pudo leer la base (' + c + '): ' + r.getContentText().slice(0, 200));
  let v = JSON.parse(r.getContentText() || 'null');
  if (typeof v === 'string') v = JSON.parse(v);           // la página guarda el estado como texto JSON
  if (!v || !v.tabs) throw new Error('La base respondió vacía o sin pestañas: no se guarda un respaldo vacío.');
  return v;
}
// Lo que lee la página para avisar si el respaldo dejó de hacerse.
function anotarEstado_(datos, soloAgregar) {
  UrlFetchApp.fetch(url_(NODO_ESTADO), { method: soloAgregar ? 'patch' : 'put', contentType: 'application/json',
    payload: JSON.stringify(datos), muteHttpExceptions: true });
}

/* ===================== DRIVE ===================== */
function carpeta_() {
  let f = DriveApp.getRootFolder();
  CARPETA.forEach(function (n) { const it = f.getFoldersByName(n); f = it.hasNext() ? it.next() : f.createFolder(n); });
  return f;
}
// Más de 90 días: se borran, salvo los del día 1 de cada mes.
function limpiarViejos_(dir) {
  const limite = Date.now() - DIAS_GUARDAR * 86400000, it = dir.getFiles();
  while (it.hasNext()) {
    const f = it.next(), m = f.getName().match(/_(\d{4})-(\d{2})-(\d{2})_/);
    if (!m || m[3] === '01') continue;
    if (f.getDateCreated().getTime() < limite) f.setTrashed(true);
  }
}

/* ===================== RESUMEN Y EXCEL ===================== */
function resumen_(e) {
  const meses = Object.keys(e.sueldos || {}), filasSueldos = meses.reduce(function (a, m) {
    return a + ['sueldos', 'sd', 'reliq'].reduce(function (b, s) { return b + (((e.sueldos[m] || {})[s]) || []).length; }, 0); }, 0);
  const fin = e.finanzas || {};
  return [
    'Pestañas: ' + (e.tabs || []).length,
    'Clientes (Info. Clientes): ' + (e.clientes || []).length,
    'Sueldos: ' + filasSueldos + ' filas en ' + meses.length + ' meses',
    'Gastos del estudio: ' + (fin.gastos || []).length,
    'Versión de los datos: ' + (e._rev || '—') + (e._by ? ' · último cambio de ' + e._by : ''),
  ];
}
function excel_(estado, nombre) {
  const hojas = hojas_(estado);
  const ss = SpreadsheetApp.create(nombre + ' (temporal)');
  Object.keys(hojas).forEach(function (t, i) {
    const filas = hojas[t];
    const ancho = Math.max.apply(null, filas.map(function (f) { return f.length; }));
    const parejas = filas.map(function (f) { const g = f.slice(); while (g.length < ancho) g.push(''); return g; });
    const h = i === 0 ? ss.getSheets()[0].setName(t) : ss.insertSheet(t);
    h.getRange(1, 1, parejas.length, ancho).setValues(parejas);
    h.getRange(1, 1, 1, ancho).setFontWeight('bold');
    h.setFrozenRows(1);
  });
  SpreadsheetApp.flush();
  const blob = UrlFetchApp.fetch('https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=xlsx',
    { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() } }).getBlob().setName(nombre + '.xlsx');
  DriveApp.getFileById(ss.getId()).setTrashed(true);
  return blob;
}

/* Las hojas del Excel (función pura: se prueba en la PC con herramientas/respaldo-apps-script/probar-hojas.js).
   Nunca van contraseñas ni datos cifrados de la bóveda. */
const MESES_ = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const SENSIBLE_ = /pass|clave|contrase|^cod|pin$|token|secret|^_enc|^_iv|^_sec|photo|foto|logo/i;
function celda_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'Sí' : 'No';
  if (typeof v === 'number') return v;
  let s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  if (/^[=+\-@]/.test(s)) s = "'" + s;                    // que Excel no lo tome como fórmula
  return s.length > 49000 ? s.slice(0, 49000) + '…' : s;
}
function tablaDe_(lista) {
  if (!lista || !lista.length) return [['(sin registros)']];
  const set = {};
  lista.forEach(function (d) { Object.keys(d || {}).forEach(function (k) { if (!SENSIBLE_.test(k)) set[k] = 1; }); });
  const cols = Object.keys(set);
  return [cols].concat(lista.map(function (d) { return cols.map(function (k) { return celda_((d || {})[k]); }); }));
}
function hojas_(e) {
  const H = {};
  H['Resumen'] = [['Dato', 'Valor']].concat(resumen_(e).map(function (l) { const i = l.indexOf(':'); return [l.slice(0, i), l.slice(i + 2)]; }));
  H['Clientes'] = tablaDe_(e.clientes || []);
  // Pestañas tipo tabla (Empresas, Sv. Profesionales…): una fila por empresa, una columna por mes.
  (e.tabs || []).filter(function (t) { return t.type === 'table'; }).forEach(function (t) {
    const nombre = String(t.name || t.id).replace(/[^\wÁÉÍÓÚÑáéíóúñ .-]/g, '').trim().slice(0, 28) || t.id;
    const cols = t.columns || [];
    const filas = [['Nombre', 'Tipo'].concat(cols)];
    (t.rows || []).forEach(function (r) {
      const celdas = (r.cellsByYear && r.cellsByYear[t.tabYear]) || r.cells || {};
      filas.push([celda_(r.name), celda_(r.tag)].concat(cols.map(function (c, i) {
        const x = celdas[i] || {};
        if (x.s === 'done') return 'Hecho' + (x.d ? ' ' + x.d : '') + (x.es ? ' · enviado' : '');
        if (x.s === 'pending') return 'Pendiente';
        if (x.s === 'na') return 'N/A';
        return '';
      })));
    });
    H[nombre] = filas;
  });
  // Sueldos: todos los meses.
  const s = [['Mes', 'Sección', 'Empresa', 'Envía', 'Recibos liquidados', 'Recibos enviados', 'Factura BPS emitida', 'Factura BPS enviada',
    'Fosmetal', 'Contabilizado', 'Control fact. BPS', 'Auditoría', 'Grupo', 'Observaciones']];
  const marca = function (r, k, nl) { if (r.noLleva && r.noLleva[nl || k]) return 'No lleva'; const m = r.marcas && r.marcas[k]; return m ? ((m.u || '—') + ' ' + (m.t || '✓')) : ''; };
  Object.keys(e.sueldos || {}).sort().forEach(function (mes) {
    ['sueldos', 'sd', 'reliq'].forEach(function (sub) {
      ((e.sueldos[mes] || {})[sub] || []).forEach(function (r) {
        s.push([mes, sub, celda_(r.name), celda_(r.envia), marca(r, 'recLiq', 'recibos'), marca(r, 'recEnv', 'recibos'), marca(r, 'bpsEmi', 'bps'),
          marca(r, 'bpsEnv', 'bps'), marca(r, 'fosmetal'), marca(r, 'contabilizado'), marca(r, 'controlFacturaBps'), marca(r, 'auditoria'),
          celda_(r.grupo), celda_(r.observaciones)]);
      });
    });
  });
  H['Sueldos'] = s;
  // Honorarios: un cliente por fila, importe sin IVA y fecha de cobro por mes.
  const hon = (e.tabs || []).find(function (t) { return t.type === 'honorarios' && t.honData; });
  if (hon) {
    const h = [['Cliente'].concat(MESES_.map(function (m) { return m + ' sin IVA'; })).concat(MESES_.map(function (m) { return m + ' cobrado'; }))];
    (hon.honData.clients || []).forEach(function (c) {
      const ms = c.months || [];
      h.push([celda_(c.name)].concat(MESES_.map(function (_, i) { return celda_((ms[i] || {}).sinIva); }))
        .concat(MESES_.map(function (_, i) { return celda_((ms[i] || {}).fecha); })));
    });
    H['Honorarios ' + (hon.tabYear || '')] = h;
  }
  const fin = e.finanzas || {};
  if ((fin.gastos || []).length) H['Gastos'] = tablaDe_(fin.gastos);
  if ((fin.impuestos || []).length) H['Impuestos'] = tablaDe_(fin.impuestos);
  return H;
}
