// Levanta los emuladores de Firebase (Auth + Realtime Database) y carga los datos de prueba.
// Uso: node herramientas/prueba/emuladores.js
//
// - Proyecto FICTICIO "demo-wmachado": aunque algo saliera mal, no hay forma de llegar a la base real.
// - Crea las tres usuarias de prueba (Daniela, Wendy y Lorena) con una contraseña de prueba que se
//   genera la primera vez y queda en datos-locales/usuarias.json (esa carpeta NO va a Git).
// - Cada vez que se levanta, la base de prueba arranca de cero con semilla.js.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { estadoDePrueba } = require('./semilla');

const PROYECTO = 'demo-wmachado';
const NS = PROYECTO + '-default-rtdb';
const JAVA = process.env.WM_JAVA_HOME || 'C:\\Program Files\\Eclipse Adoptium\\jre-21.0.12.101-hotspot';
const LOCAL = path.join(__dirname, 'datos-locales');

function claveDePrueba() {
  const f = path.join(LOCAL, 'usuarias.json');
  if (!fs.existsSync(LOCAL)) fs.mkdirSync(LOCAL);
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8')).clave;
  const clave = ['prueba', crypto.randomBytes(4).toString('hex')].join('-');
  fs.writeFileSync(f, JSON.stringify({ aviso: 'Solo para los emuladores locales', clave }, null, 2));
  return clave;
}

const env = Object.assign({}, process.env, { JAVA_HOME: JAVA, PATH: path.join(JAVA, 'bin') + path.delimiter + process.env.PATH });
const cli = spawn('firebase', ['emulators:start', '--only', 'auth,database', '--project', PROYECTO], { cwd: __dirname, env, shell: true });
cli.stdout.pipe(process.stdout);
cli.stderr.pipe(process.stderr);
cli.on('exit', (c) => process.exit(c || 0));
process.on('SIGINT', () => cli.kill('SIGINT'));

async function listo(url) {
  for (let i = 0; i < 120; i++) {
    try { await fetch(url); return; } catch (e) { await new Promise(r => setTimeout(r, 1000)); }
  }
  throw new Error('El emulador no respondió: ' + url);
}

(async () => {
  await listo('http://127.0.0.1:9000/.json?ns=' + NS);
  await listo('http://127.0.0.1:9099/');
  const clave = claveDePrueba();
  for (const n of ['daniela', 'wendy', 'lorena']) {
    await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: n + '@wmachado.com', password: clave, returnSecureToken: false })
    });
  }
  // wm_app_v2 se guarda como TEXTO JSON (igual que en la base real).
  const r = await fetch('http://127.0.0.1:9000/wm_app_v2.json?ns=' + NS, {
    method: 'PUT', headers: { Authorization: 'Bearer owner' }, body: JSON.stringify(JSON.stringify(estadoDePrueba()))
  });
  console.log(r.ok ? '\n✓ Datos de prueba cargados. Página: http://localhost:5540  ·  Emuladores: http://127.0.0.1:4000'
                   : '\n✕ No se pudieron cargar los datos de prueba: ' + r.status);
})().catch(e => console.error(e));
