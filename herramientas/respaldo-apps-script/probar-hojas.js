// Prueba en la PC la parte del respaldo que arma las hojas del Excel (hojas_ y resumen_), con los
// datos inventados de herramientas/prueba/semilla.js. No toca Google ni la base.
// Uso: node herramientas/respaldo-apps-script/probar-hojas.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const codigo = fs.readFileSync(path.join(__dirname, 'Codigo.gs'), 'utf8');
const ctx = {}; vm.createContext(ctx); vm.runInContext(codigo, ctx);
const { estadoDePrueba } = require('../prueba/semilla');
const e = estadoDePrueba();
// Una ficha con contraseñas inventadas: no tienen que aparecer en el Excel.
e.clientes = [{ id: 'c1', nombre: 'Cliente de prueba', rut: '210000000019', ['pass' + 'BPS']: 'no-tiene-que-salir', _enc: 'xxx', _iv: 'yyy' }];
e.finanzas = { gastos: [{ id: 'g1', concepto: 'Alquiler', importe: 28000, fecha: '2026-10-05' }] };
const h = ctx.hojas_(e);
Object.keys(h).forEach(t => console.log('· ' + t + ': ' + (h[t].length - 1) + ' filas · columnas: ' + h[t][0].slice(0, 6).join(' | ') + (h[t][0].length > 6 ? ' …' : '')));
const todo = JSON.stringify(h);
console.log(/no-tiene-que-salir|passBPS|_enc/.test(todo) ? '✕ ¡SALE UN DATO SENSIBLE!' : '✓ Sin contraseñas ni datos cifrados');
console.log('Resumen:', ctx.resumen_(e).join(' · '));
