/*
 * Muestra cómo quedaría Sueldos en el formato nuevo, a partir de un respaldo exportado
 * (Personalizar → «⬇ Exportar JSON»). NO cambia nada: solo lee el archivo y lista.
 *
 * Uso:  node herramientas/vista-previa-sueldos.js "C:\ruta\estudio_machado_backup_2026-10-02.json"
 * Deja además una copia legible en herramientas/prueba/datos-locales/vista-previa-sueldos.txt
 * (esa carpeta no va a Git: tiene datos reales).
 */
const fs = require('fs');
const path = require('path');

const archivo = process.argv[2];
if (!archivo) { console.log('Falta el archivo. Uso: node herramientas/vista-previa-sueldos.js respaldo.json'); process.exit(1); }
let datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
if (typeof datos === 'string') datos = JSON.parse(datos);
const sueldos = datos.sueldos || (datos.state && datos.state.sueldos) || {};
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
const mes = (ym) => { const p = ym.split('-'); return (MESES[+p[1] - 1] || p[1]) + ' ' + p[0]; };
const SUBS = { sueldos: 'Sueldos', sd: 'Serv. Domésticos', reliq: 'Reliquidaciones' };

const lineas = [];
const out = (s) => { lineas.push(s); console.log(s); };
let total = 0, notas = 0, soloBps = new Set(), bps = 0, conCtl = 0, incoherentes = [];

out('VISTA PREVIA DEL PASO DE SUELDOS AL FORMATO NUEVO — no se cambió nada');
out('Respaldo: ' + path.basename(archivo));
out('');
out('1) NOTAS INTERNAS → OBSERVACIONES (si ya había, van juntas separadas con « · »)');
Object.keys(sueldos).sort().forEach(ym => Object.keys(SUBS).forEach(sub => (sueldos[ym][sub] || []).forEach(r => {
  total++;
  if (/factura\s*bps/i.test(r.name || '')) soloBps.add(r.name);
  if (r.bps) bps++;
  if (['fosmetal', 'contabilizado', 'controlFacturaBps', 'auditoria'].some(k => r[k])) conCtl++;
  const nada = !r.prontos && !r.avisadoEnviado && !r.bps;
  if (sub !== 'reliq' && ['enviado', 'finalizado'].includes(r.status) && nada) incoherentes.push(mes(ym) + ' · ' + r.name + ' (estaba en «' + r.status + '» sin tildes)');
  const nota = String(r.notaInterna || '').trim();
  if (!nota) return;
  notas++;
  const obs = String(r.observaciones || '').trim();
  out('');
  out('  ' + mes(ym) + ' · ' + SUBS[sub] + ' · ' + r.name);
  out('     Nota interna:          ' + nota);
  out('     Observaciones hoy:     ' + (obs || '—'));
  out('     Observaciones después: ' + [obs, nota].filter(Boolean).join(' · '));
})));
if (!notas) out('  No hay Notas internas.');
out('');
out('2) RECIBOS «NO LLEVA» (el nombre dice «factura BPS»): ' + (soloBps.size ? [...soloBps].join(', ') : 'ninguna'));
out('');
out('3) TILDE DE BPS → «Factura BPS emitida», pendiente de enviar: ' + bps + ' filas.');
out('   Van a aparecer en amarillo/rojo «Falta enviar» hasta que alguien marque «Enviada».');
out('');
out('4) Filas con algún control tildado (pasan a la pestaña Controles): ' + conCtl);
out('');
out('5) Estados elegidos a mano que no coincidían con los tildes (ahora el estado se calcula solo): ' + incoherentes.length);
incoherentes.forEach(x => out('   - ' + x));
out('');
out('Total de filas: ' + total + ' en ' + Object.keys(sueldos).length + ' meses.');

const dir = path.join(__dirname, 'prueba', 'datos-locales');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'vista-previa-sueldos.txt'), lineas.join('\n'));
