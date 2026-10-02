# W Machado Estudio Contable

Aplicación web interna para gestión operativa contable.

## Arquitectura

- Frontend vanilla: HTML + CSS + JavaScript clásico (scripts globales).
- Autenticación: Firebase Authentication.
- Datos compartidos: Firebase Realtime Database.
- Sin backend propio en este repositorio.
- Estado principal sincronizado entre sesiones con control de concurrencia.

### Estructura de código

- js/core
  - constants.js
  - navigation.js
  - persistence.js
  - render-router.js
  - structure-registry.js
  - utils.js
- js/services
  - auth.js
  - chat.js
  - firebase.js
  - notifications.js
  - presence.js
  - sync.js
- js/security
  - tab-access.js
  - vault.js
- js/modules
  - clientes.js
  - sueldos.js, sueldos-vista.js, sueldos-bandeja.js (oct. 2026: Sueldos, bandeja y Controles)
  - ingreso.js (oct. 2026: fondo de la pantalla de ingreso)
- js/finanzas (oct. 2026: pestaña Finanzas, solo Wendy)
  - finanzas.js (datos en state.finanzas, subpestañas, acceso, exportación)
  - gastos.js, gastos-form.js, impuestos.js, vencimientos.js
- Otros scripts
  - app.js
  - declaraciones.js (incluye «Industria y Comercio», vinculado a Ej. Económicos)
  - honorarios.js (se dibuja adentro de Finanzas)
- css: app.css, honorarios.css, declaraciones.css, sueldos.css, finanzas.css, ingreso.css y
  pulido.css (retoques visuales; se carga último y se puede sacar sin romper nada)

## Autenticación

- Las cuentas de acceso se administran en Firebase Authentication.
- El login en la app usa mapeo interno de usuaria a email de Auth mediante AUTH_EMAIL_MAP.
- El alta/baja real de cuentas se realiza desde Firebase Console.
- El cambio de contraseña usa Firebase Auth (reauthenticate + updatePassword).
- No existe contraseña maestra local para autenticación de cuentas.

## Datos

- Nodo principal compartido: wm_v3/p (por partes, desde el 02/10/2026; ver docs/firebase-contract.md). wm_app_v2 quedó como copia del día del cambio.
- Sincronización con transaction para evitar pisados entre sesiones.
- Control de versión con _rev.
- Fusión de estados y lógica anti-pisado en sync.
- No modificar flujo de _rev/merge/transaction sin pruebas de concurrencia.

## Vault

- Implementado en js/security/vault.js.
- Derivación de clave: PBKDF2 (SHA-256).
- Cifrado: AES-GCM.
- PIN no persistido en texto plano.
- Campos sensibles de Clientes se almacenan cifrados cuando Vault está migrada.
- Al bloquear Vault, se limpia plaintext en memoria y material de clave.

## Desarrollo local con emuladores (oct. 2026) — recomendado

Abierta desde **localhost / 127.0.0.1**, la página usa los **emuladores** de Firebase con un proyecto
ficticio (`demo-wmachado`): no hay forma de tocar la base real. Para abrir la base real desde la PC
hay que pedirlo a propósito con `?real=1`. Se ve el cartel rojo «MODO PRUEBA» abajo a la derecha.

1. `node herramientas/prueba/emuladores.js` — levanta Auth + Realtime Database (necesita Java 21 y
   firebase-tools), crea Daniela / Wendy / Lorena y carga datos **inventados** (`semilla.js`).
   La clave de prueba queda en `herramientas/prueba/datos-locales/usuarias.json` (no va a Git).
2. `node herramientas/servidor-local.js` → http://localhost:5540
3. Cada vez que se levantan los emuladores, la base de prueba arranca de cero.

Herramientas:

- `node herramientas/vista-previa-sueldos.js respaldo.json` — con un respaldo exportado
  (Personalizar → Exportar JSON) muestra cómo quedaría Sueldos en el formato nuevo. No cambia nada.
- `node herramientas/version-archivos.js` — **antes de publicar**: agrega `?v=fecha` a los css/js/img
  de index.html para que nadie quede con archivos viejos mezclados con nuevos.

## Desarrollo local contra la base real (con cuidado)

Recomendado ejecutar por HTTP local (no usar file://):

```bash
python -m http.server 8080
```

Abrir en navegador:

- http://127.0.0.1:8080/?real=1 — sin `?real=1`, desde localhost la página busca los emuladores.

## Validación antes de cambios

### Sintaxis JS

```bash
node --check js/app.js
```

Para validar todo JS versionado:

```bash
# PowerShell
$files = git ls-files "*.js"
foreach ($f in $files) { node --check $f }
```

### Sensibles

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-sensitive.ps1
```

Esperado:

- Sensitive check: clean.

## Firebase

- Firebase Auth: identidad y sesiones.
- Realtime Database: estado compartido y sincronización.
- FIREBASE_CONFIG web está en js/services/firebase.js.
- Las Rules actualmente se administran desde Firebase Console (si no están versionadas en repo).

## Módulos

La organización funcional actual está distribuida en:

- core: utilidades y estructura base de UI/estado.
- services: auth, sync, firebase, presencia, chat, notificaciones.
- security: acceso por pestaña y Vault.
- modules: render y edición de Clientes.

## Backups

- Export JSON y export HTML snapshot son herramientas de respaldo operativo.
- Los respaldos pueden contener información confidencial.
- Guardar backups solo en ubicaciones seguras y con acceso restringido.

## Notas

- Este repositorio está orientado a operación directa en frontend.
- Evitar cambios de arquitectura sin plan y pruebas de regresión.
- Para ajustes sensibles (sync, vault, auth), ejecutar validaciones completas antes de publicar.
