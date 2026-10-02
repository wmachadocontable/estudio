/*
 * Le pone un número de versión a los archivos que carga index.html (css/, js/, img/).
 * (Copiado del demo de María Lucía y adaptado: acá index.html está en la raíz y usa «./js/…».)
 *
 * ¿Para qué? El navegador guarda los archivos por un rato. Si publicamos un cambio, alguien que
 * había abierto la página antes puede quedarse con una parte vieja y otra nueva, y esa mezcla
 * rompe la página (se ve en blanco o sin datos). Con el número de versión, al publicar un cambio
 * el navegador baja todo nuevo de una.
 *
 * Uso (antes de publicar):  node herramientas/version-archivos.js
 */
const fs = require('fs');
const path = require('path');

const archivo = process.argv[2] || path.join(__dirname, '..', 'index.html');
const version = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');

let html = fs.readFileSync(archivo, 'utf8');
let cambios = 0;
html = html.replace(/(src|href)="(\.\/)?((?:js|css|img)\/[^"?]+)(?:\?v=[^"]*)?"/g, function (m, attr, punto, ruta) {
  cambios++;
  return attr + '="' + (punto || '') + ruta + '?v=' + version + '"';
});
fs.writeFileSync(archivo, html);
console.log('Versión ' + version + ' puesta en ' + cambios + ' archivos de ' + path.basename(archivo));
