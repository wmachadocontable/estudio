// Datos de PRUEBA para los emuladores. Todo es inventado: ninguna empresa, persona ni
// importe es real. Se cargan solos al levantar los emuladores (ver emuladores.js).
const fs = require('fs');
const path = require('path');

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// El logo: si está el real en datos-locales/logo.png (sacado del historial, no va a Git) se usa ese;
// si no, el de reserva de app.js (DEFAULT_LOGO).
function logoDelEstudio() {
  const real = path.join(__dirname, 'datos-locales', 'logo.png');
  if (fs.existsSync(real)) return 'data:image/png;base64,' + fs.readFileSync(real).toString('base64');
  const app = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'app.js'), 'utf8');
  const m = app.match(/const DEFAULT_LOGO = "([^"]+)"/);
  return m ? m[1] : '';
}

function celdas(hechos, pendientes) {
  const c = {};
  hechos.forEach(i => { c[i] = { s: 'done', d: '2026-' + String(i + 1).padStart(2, '0') + '-12' }; });
  (pendientes || []).forEach(i => { c[i] = { s: 'pending' }; });
  return c;
}

function sueldosMes(ym, avanzado) {
  const d = (dia) => ym + '-' + String(dia).padStart(2, '0');
  return {
    sueldos: [
      { name: 'Agropecuaria El Ceibo', status: 'enviado', prontos: true, avisadoEnviado: true, bps: true, fosmetal: false,
        contabilizado: true, controlFacturaBps: true, auditoria: false,
        flagLabels: { avisadoEnviado: { d: d(6), auto: true }, bps: { d: d(8) } },
        grupo: 'A', observaciones: 'igual al mes anterior - Lleva factura BPS aparte por el aguinaldo de dos empleados',
        notaInterna: 'Pedir planilla de horas extras antes del 3' },
      { name: 'Ferretería Los Robles', status: 'pronto', prontos: true, flagLabels: { prontos: { d: d(5) } },
        grupo: 'A', observaciones: 'Ingresó un empleado nuevo', notaInterna: '' },
      { name: 'Transportes Rivera Sur', status: 'enviado', grupo: 'B', observaciones: '', notaInterna: 'Mandar recibos por WhatsApp al encargado' },
      { name: 'Panadería La Espiga', status: 'pendiente', grupo: 'B', observaciones: '' },
      { name: 'Comercial Pampa (factura BPS)', status: 'proceso', bps: avanzado, flagLabels: avanzado ? { bps: { d: d(9) } } : {},
        grupo: 'C', observaciones: 'Solo factura BPS' },
      { name: 'Clínica Dental Sonrisas', status: 'finalizado', prontos: true, avisadoEnviado: true, fosmetal: true, bps: true,
        contabilizado: true, controlFacturaBps: true, auditoria: true,
        flagLabels: { avisadoEnviado: { t: 'x mail', d: d(4) } }, grupo: 'C', observaciones: 'Cerrado' },
      { name: 'Estudio Arquitectura Norte', status: 'pronto', prontos: true, contabilizado: avanzado,
        flagLabels: { prontos: { t: 'x mail' } }, grupo: 'A', observaciones: '', notaInterna: 'Tiene convenio especial de la construcción' },
      { name: 'Metalúrgica San Martín', status: 'pendiente', fosmetal: false, grupo: 'B', observaciones: 'Lleva Fosmetal' }
    ],
    sd: [
      { name: 'Familia González', status: 'enviado', prontos: true, avisadoEnviado: true, flagLabels: { avisadoEnviado: { d: d(3), auto: true } }, grupo: '', observaciones: '' },
      { name: 'Familia Pereira', status: 'pendiente', grupo: '', observaciones: 'Cambió el horario' },
      { name: 'Familia Suárez', status: 'pronto', prontos: true, bps: true, grupo: '', observaciones: '' }
    ],
    reliq: [
      { name: 'Agropecuaria El Ceibo', status: 'pendiente', concepto: 'Ana Rodríguez', importe: '12.500', grupo: 'A', observaciones: '' }
    ]
  };
}

function honorarios() {
  const cli = (id, name, base, pagos) => ({
    id, name,
    months: MESES.map((_, i) => ({
      sinIva: i < 10 ? base : null,
      factura: i < 9 && pagos ? 'A-' + (1000 + i * 7 + id.length) : '',
      recibo: '', fecha: i < 8 ? '2026-' + String(i + 1).padStart(2, '0') + '-10' : '',
      medio: i < 8 ? 'Transferencia' : '', extra: {}
    }))
  });
  return {
    taxRate: 0.22, methods: ['Transferencia', 'Efectivo', 'Depósito', 'Cheque'], extraCols: [], colors: {},
    clients: [
      cli('hc_ceibo', 'Agropecuaria El Ceibo', 9500, true),
      cli('hc_robles', 'Ferretería Los Robles', 6200, true),
      cli('hc_rivera', 'Transportes Rivera Sur', 7800, false),
      cli('hc_espiga', 'Panadería La Espiga', 4300, true),
      cli('hc_sonrisas', 'Clínica Dental Sonrisas', 5100, true)
    ]
  };
}

function estadoDePrueba() {
  const ahora = Date.now();
  return {
    branding: {
      name: 'W. Machado', subtitle: 'Estudio Contable', year: '2026', logo: logoDelEstudio(), logoInvert: false,
      colors: { accent: '#a8b0b8', header: '#102030', bg: '#f9f8f6', text: '#0a0a0a' },
      fonts: { display: "'Playfair Display', serif", body: "'Lato', sans-serif" }
    },
    tabs: [
      { id: 'dashboard', name: 'Dashboard', type: 'dashboard', removable: false },
      { id: 'mydash', name: '📌 Personal', type: 'mydash', removable: false },
      { id: 'empresas', name: '🏢 Empresas', type: 'table', columns: MESES.slice(), hasTag: true, tagLabel: 'Tipo', tabYear: '2026',
        subTabs: [{ id: 'st_rivera', name: 'Rivera' }],
        rows: [
          { name: 'Agropecuaria El Ceibo', tag: 'IyC-Rural', cells: celdas([0,1,2,3,4,5,6,7], [8]) },
          { name: 'Ferretería Los Robles', tag: 'IyC', cells: celdas([0,1,2,3,4,5,6,7,8]), subTabId: 'st_rivera' },
          { name: 'Transportes Rivera Sur', tag: 'IyC- Transporte carga', cells: celdas([0,1,2,3,4,5,6], [7,8]) },
          { name: 'Panadería La Espiga', tag: 'IyC-pequeña empresa', cells: celdas([0,1,2,3,4,5,6,7]) },
          { name: 'Metalúrgica San Martín', tag: 'IyC', cells: celdas([0,1,2,3,4,5], [6,7,8]) },
          { name: 'Kiosco Don Pepe', tag: 'IyC-monotributo', cells: celdas([0,1,2,3,4,5,6,7,8]) }
        ] },
      { id: 'sprof', name: '📋 Sv.Profesionales', type: 'table', columns: MESES.slice(), hasTag: false, tabYear: '2026',
        rows: [
          { name: 'Cra. Laura Méndez (inventada)', tag: '', cells: celdas([0,1,2,3,4,5,6,7]) },
          { name: 'Dr. Martín Silva (inventado)', tag: '', cells: celdas([0,1,2,3,4,5], [6,7]) },
          { name: 'Arq. Sofía Ríos (inventada)', tag: '', cells: celdas([0,1,2,3,4,5,6,7,8]) }
        ] },
      { id: 'sueldos', name: '💼 Sueldos', type: 'sueldos', removable: false },
      { id: 'tab_1779884915309', name: '📊 EJ Económicos', type: 'annual', tabYear: '2026', years: ['2025', '2026'],
        columns: ['Fecha Balance', 'DJ 2178', 'DJ 1050', 'DJ 3107', 'Comentarios'], colTypes: { 0: 'date', 4: 'comments' }, hasTag: false,
        rows: [
          { name: 'Agropecuaria El Ceibo', cellsByYear: { '2026': { 0: { s: 'done', d: '2026-06-30' }, 1: { s: 'done', d: '2026-09-15' }, 2: { s: 'pending' }, 4: { cs: 'pay', c: 'Paga en 3 cuotas' } } } },
          { name: 'Metalúrgica San Martín', cellsByYear: { '2026': { 0: { s: 'done', d: '2026-03-31' }, 1: { s: 'done', d: '2026-07-20' }, 2: { s: 'done', d: '2026-07-22' }, 3: { s: 'pending' } } } },
          { name: 'Transportes Rivera Sur', naCols: [3], cellsByYear: { '2026': { 0: { s: 'done', d: '2026-12-31' }, 4: { cs: 'credit', c: 'Crédito fiscal a favor' } } } }
        ] },
      { id: 'clientes', name: '👥 Info. Clientes', type: 'clientes', removable: false },
      // Declaraciones con un CEDE «por año» como el que crearon el 02/10/2026 (lo pasa a mensual declaraciones-cede.js).
      { id: 'declaraciones', name: '📋 Declaraciones', type: 'declaraciones', removable: false, types: [
        { id: 'dty_cede_prueba', name: 'CEDE', icon: '📄', color: '#0f6e72', years: { '2025': { id: 'dyr_cede_2025', rows: [{ __key: 'row_cede_1', c_cli: 'Metalúrgica San Martín' }] } },
          cols: [{ key: 'c_cli', label: 'Cliente', ctype: 'text' }, { key: 'c_pre', label: 'Presentado', ctype: 'date' }, { key: 'c_imp', label: 'Importe', ctype: 'money', currency: '$U' },
                 { key: 'c_not', label: 'Saldo / Notas', ctype: 'text' }, { key: 'c_est', label: 'Estado', ctype: 'tag', options: ['Pendiente', 'En curso', 'Presentada', 'Cobrada'] }] }
      ] },
      { id: 'calendario', name: '📅 Calendario', type: 'calendar', removable: false },
      { id: 'settings', name: 'Configuración', type: 'settings', removable: false },
      { id: 'tab_1780081397523', name: 'Honorarios', type: 'honorarios', tabYear: '2026', privacy: 'private_user', privateOwners: ['Wendy'], honData: honorarios() }
    ],
    users: [
      { id: 'usr_daniela', name: 'Daniela', displayName: 'Daniela', role: 'admin', color: '#1a4a7a', photo: null, createdAt: ahora },
      { id: 'usr_wendy', name: 'Wendy', displayName: 'Wendy', role: 'admin', color: '#16a085', photo: null, createdAt: ahora },
      { id: 'usr_lorena', name: 'Lorena', displayName: 'Lorena', role: 'editor', color: '#8e44ad', photo: null, createdAt: ahora }
    ],
    calendarEvents: [
      { id: 'ev_prueba1', title: 'Reunión de prueba', date: '2026-10-05', time: '10:00', type: 'reunion', assignedTo: ['Wendy'], notify: false, done: false, notes: '' }
    ],
    clientes: ['Agropecuaria El Ceibo', 'Metalúrgica San Martín', 'Transportes Rivera Sur', 'Panadería La Espiga', 'Ferretería Los Robles', 'Clínica Sonrisas'].map((n, i) => ({ id: 'cli_prueba_' + i, nombre: n + ' (inventada)', tipo: 'Empresa' })),
    tipoColors: {},
    sueldos: { '2026-09': sueldosMes('2026-09', true), '2026-10': sueldosMes('2026-10', false) },
    sueldosColumns: [
      { key: 'prontos', label: 'Prontos' }, { key: 'avisadoEnviado', label: 'Avisado/Enviado' }, { key: 'fosmetal', label: 'Fosmetal' },
      { key: 'bps', label: 'BPS' }, { key: 'contabilizado', label: 'Contabilizado' }, { key: 'controlFacturaBps', label: 'Control Fact. BPS' },
      { key: 'auditoria', label: 'Auditoría' }
    ],
    trash: [], auditLog: [],
    _rev: 1, _by: 'semilla', _at: ahora
  };
}

module.exports = { estadoDePrueba };
