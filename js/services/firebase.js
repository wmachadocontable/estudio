// Firebase infrastructure only. This file intentionally does not move sync, merge,
// listeners, auth, presence, chat, or business logic. It only owns the base config
// and the database handle used by the app.

const FIREBASE_CONFIG_REAL = {
  apiKey: "AIzaSyDJlc6wV_4uROXfU0pJ_RBBV-499LwTnsA",
  authDomain: "w-machado-contable.firebaseapp.com",
  databaseURL: "https://w-machado-contable-default-rtdb.firebaseio.com",
  projectId: "w-machado-contable",
  storageBucket: "w-machado-contable.firebasestorage.app",
  messagingSenderId: "479317191824",
  appId: "1:479317191824:web:eea071a3db62e8268b3c15",
  measurementId: "G-LPVSLGP3SW"
};

// ===== MODO PRUEBA (emuladores locales) =====
// Abierta desde esta PC (localhost / 127.0.0.1) la página usa los EMULADORES de
// herramientas/prueba con un proyecto ficticio: nunca toca la base real.
// Para abrir la base real desde la PC hay que pedirlo a propósito con ?real=1.
const WM_EMULADOR = (function(){
  try {
    var h = location.hostname;
    return (h === 'localhost' || h === '127.0.0.1') && !/[?&]real=1(&|$)/.test(location.search);
  } catch(e) { return false; }
})();
const FIREBASE_CONFIG = WM_EMULADOR ? {
  apiKey: "demo-clave-emulador",
  authDomain: "demo-wmachado.firebaseapp.com",
  databaseURL: "http://127.0.0.1:9000/?ns=demo-wmachado-default-rtdb",
  projectId: "demo-wmachado"
} : FIREBASE_CONFIG_REAL;

var _wmEmuConectado = false;
// Se llama una sola vez, justo después de initializeApp y antes de usar Auth o la base.
function wmConectarEmuladores() {
  if (!WM_EMULADOR || _wmEmuConectado || typeof firebase === 'undefined') return;
  _wmEmuConectado = true;
  try { firebase.auth().useEmulator('http://127.0.0.1:9099', { disableWarnings: true }); } catch(e) { console.warn(e); }
  try { firebase.database().useEmulator('127.0.0.1', 9000); } catch(e) { console.warn(e); }
  var marca = function(){
    if (document.getElementById('wm-modo-prueba')) return;
    var d = document.createElement('div');
    d.id = 'wm-modo-prueba';
    d.textContent = 'MODO PRUEBA · emuladores locales';
    d.style.cssText = 'position:fixed;bottom:8px;right:8px;z-index:99999;background:#c0392b;color:#fff;font:600 11px/1 Lato,sans-serif;letter-spacing:.5px;padding:6px 10px;border-radius:4px;opacity:.85;pointer-events:none';
    document.body.appendChild(d);
  };
  if (document.body) marca(); else document.addEventListener('DOMContentLoaded', marca);
}

let firebaseDB = null;
