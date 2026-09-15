# Refactor Baseline Tecnico - index.html

Fecha de auditoria: 2026-09-15  
Archivo auditado: index.html (rama desarrollo-arquitectura)

## Alcance y regla aplicada

- Esta auditoria es solo de analisis.
- No se modifico comportamiento, logica, estilos ni estructura de datos de la aplicacion.
- No se movio codigo del archivo principal.

## 1. Estructura general de index.html

- Archivo monolitico de aproximadamente 3.86 MB.
- Estructura general observada:
  - Head con metadatos, iconos embebidos (data URI), fuente externa, SDKs Firebase.
  - Bloque CSS principal grande para toda la UI.
  - HTML de app + login + modales.
  - Script inline principal (core de estado, render, auth, firebase, concurrencia, auditoria, chat, presencia, calendario, clientes, sueldos, etc.).
  - Bloque de estilos del modulo Honorarios.
  - Script inline del modulo Honorarios (IIFE + parches sobre funciones globales).
  - Bloque de estilos del modulo Declaraciones.
  - Script inline del modulo Declaraciones (IIFE + funciones globales window.decl*).

## 2. Bloques <style>

### Cantidad y ubicacion

Inventario detectado por analisis de etiquetas:

- 4 coincidencias de <style>...</style> en el archivo crudo.
- De esas 4:
  - 3 son bloques CSS de app real en DOM.
  - 1 corresponde a CSS generado dentro de un string JS (exportacion PDF), no a stylesheet global de la app.

Ubicacion aproximada:

- Style principal: linea ~14 (muy grande, ~121k chars).
- Style dentro de string JS (exportClientesPDF): linea ~15599 (~619 chars).
- Style modulo Honorarios: linea ~15720 (id=hon-styles, ~6.8k chars).
- Style modulo Declaraciones: linea ~16436 (~15.3k chars).

### Dependencias CSS

- Uso extensivo de variables CSS (`--c-*`, `--font-*`) definidas en `:root` y en `html` inline.
- Dependencia de estados globales por clase en `body`:
  - `edit-mode`
  - `tab-locked`
  - `data-role`
- Dependencia de estilos por modulos:
  - Prefijo `hon-*` para Honorarios.
  - Prefijo `decl-*` para Declaraciones.
  - Prefijos de paneles (`presence-*`, `chat-*`, `notif-*`, etc.).

### Variables CSS

Variables principales detectadas:

- Color: `--c-bg`, `--c-bg-alt`, `--c-header`, `--c-accent`, `--c-accent-light`, `--c-accent-dark`, `--c-text`, `--c-text-muted`, `--c-border`, `--c-border-soft`, `--c-card`, `--c-green`, `--c-red`, `--c-blue`, `--c-pending`.
- Tipografia: `--font-display`, `--font-body`.
- Layout: `--header-h`, `--week-cols`.

### Estilos dinamicos que NO conviene extraer automaticamente

No extraer automaticamente sin encapsular primero la logica JS que los usa:

- `style="..."` inline en markup estatico (aprox 482 atributos estilo estaticos).
- `style="..."` generado en templates JS (aprox 1045 contando HTML generado por JS).
- Asignaciones por JS a `element.style.cssText` (6 usos).
- Escritura de variables en runtime (`document.documentElement.style.setProperty`, al menos 1 uso).
- Estilos incrustados en ventanas auxiliares (`exportClientesPDF` arma HTML+<style> en runtime).

## 3. Bloques <script>

### Scripts externos

Orden de carga (head):

1. Firebase App compat (`firebase-app-compat.js`)
2. Firebase Realtime Database compat (`firebase-database-compat.js`)
3. Firebase Auth compat (`firebase-auth-compat.js`)

### Scripts inline y orden de ejecucion

Detectados 3 scripts inline reales:

1. Script principal (linea ~3011, ~663k chars)
   - Define estado global, render, auth, firebase sync, concurrencia, auditoria, presencia, chat, modulos base y BOOT.
2. Script modulo Honorarios (linea ~15795, ~100k chars, `id="hon-module"`)
   - IIFE que registra `window.hon*`, parchea `renderContent`, `ensureNewStructures`, permisos de tab, backups.
3. Script modulo Declaraciones (linea ~16624, ~156k chars)
   - IIFE que registra `window.decl*`, render de declaraciones, modales, traspasos, papelera, etc.

### Dependencias entre scripts

- El script principal debe correr antes de Honorarios y Declaraciones.
- Honorarios y Declaraciones dependen de simbolos globales definidos en core:
  - `state`, `userPrefs`, `saveState`, `renderContent`, `renderTabs`, `switchTab`, `currentUser`, etc.
- Honorarios y Declaraciones realizan monkey patching sobre funciones ya existentes (riesgo alto de orden).
- BOOT esta en script principal y se ejecuta inmediatamente; los modulos posteriores fuerzan re-render/ajustes al cargar.

## 4. Librerias externas via CDN

Directas por etiqueta:

- Google Fonts
- Firebase App compat v9.23.0
- Firebase Realtime Database compat v9.23.0
- Firebase Auth compat v9.23.0

Bajo demanda en runtime:

- ExcelJS (`cdn.jsdelivr.net/npm/exceljs@4.4.0/...`)
- MSAL Browser (`cdn.jsdelivr.net/npm/@azure/msal-browser@3.28.1/...`)

Servicios/proxies externos usados por logica de calendario:

- `corsproxy.io`
- `api.allorigins.win`
- `api.codetabs.com`
- `thingproxy.freeboard.io`
- `cors.sh`

## 5. Firebase

### Configuracion e inicializacion

- Objeto `FIREBASE_CONFIG` definido en script principal.
- Inicializacion condicionada: `if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);`
- `firebaseDB = firebase.database();`

### Firebase Auth

- `firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)`.
- `firebase.auth().onAuthStateChanged(...)` en BOOT.
- Login por `signInWithEmailAndPassword`.
- Logout por `signOut`.

### Realtime Database: nodos usados

Nodos principales detectados:

- `wm_app_v2` (estado compartido principal)
- `wm_writes` (log de escrituras)
- `wm_presence_v2` (presencia)
- `wm_chats_v2/channels/.../messages`
- `wm_chats_v2/typing/...`
- `wm_chats_v2/last_read/...`
- `wm_chats_v2/cell_comments/.../messages`
- `wm_backups/...` (modulo Honorarios, backups internos)

### Listeners

- Estado principal:
  - `ref('wm_app_v2').on('value', ...)`
  - `ref('wm_app_v2').once('value', ...)` (relecturas/validaciones)
- Presencia:
  - `ref('wm_presence_v2').on('value', ...)`
  - `onDisconnect().remove()`
- Chat y comentarios:
  - listeners `on('value')` sobre nodos de mensajes/typing/lecturas.

### Transactions

- 1 transaccion clave sobre `wm_app_v2` para guardado anti-pisado y control de `_rev`.

### Presence

- Heartbeat cada 30s.
- Umbral online de 60s.
- Publica `editingRow` para advertencia de colision visual.

### Logs de escritura

- `wm_writes` guarda metadata de escrituras (`at`, `by`, `ver`, `sid`, `tipo`, `counts`).
- Poda automatica por maximo (`WM_WRITES_MAX`).

## 6. Autenticacion

### Login actual

- Login por usuario visible + password.
- Mapeo usuario interno -> email Firebase via `AUTH_EMAIL_MAP`.
- `doLogin()` usa `signInWithEmailAndPassword(email, pass)`.

### Logout

- `doLogout()` confirma, ejecuta `firebase.auth().signOut()`, bloquea vault, limpia session flags y vuelve a login.

### onAuthStateChanged

- BOOT define listener central.
- Si hay `fbUser`:
  - map email -> usuario local.
  - `initFirebase()`.
  - `setSession(name)`.
  - `showApp(name)`.
  - inicia `startPresence()` y `startChat()` con delay.
- Si no hay `fbUser`: `showLogin()`.

### currentUser

- `currentUser()` deriva desde `sessionStorage` (`SESSION_KEY`) y `state.users`.
- Tiene elevacion virtual de rol en modo mantenimiento.

### Usuarios locales

- `state.users` (migra strings -> objetos con `id/name/displayName/role/color/photo/...`).
- Roles: `admin`, `editor`, `viewer`, `maintenance`.
- Funciones asociadas: `ensureUsersAsObjects`, `findUserByName`, `userHasRole`, `requireRole`, gestion de usuarios.

## 7. Estado global

Variables globales relevantes detectadas (subset critico):

- Estado/sync:
  - `state`
  - `baseState`
  - `firebaseDB`
  - `firebaseSaveTimeout`
  - `cloudSynced`
  - `lastSeenRev`
  - `WM_VER`, `WM_SID`, `_lastCloudMeta`
- Usuario/sesion:
  - `SESSION_KEY`
  - `userPrefs`
  - `currentUser()`
- Concurrencia/edicion:
  - `_stickyEditingId`, `_pendingRemoteRender`
  - `_mergeConflicts`, `_conflictLog`
- Presencia/chat/notificaciones:
  - `_presenceMap`, `_presenceHeartbeatTimer`
  - `_chatState`, `_lastSeenMessagesByChannel`
  - `_notifInbox`
- Boveda:
  - `vaultDEK`, `_vaultDEKraw`, `vaultPlain`, `vaultUnlocked`, `VAULT_ITER`
- UI:
  - `calYear`, `calMonth`, `calView`
  - varios contextos `_...Ctx` para modales/configs

Nota: se detectaron mas de 100 globals top-level; el listado anterior prioriza los de mayor impacto arquitectonico.

## 8. Persistencia

### localStorage

Claves/rutas detectadas:

- `wm_app_v2` (copia local de estado)
- preferencias por usuario (`userPrefsKey()` -> `wm_userPrefs_<usuario>`)
- `NOTIF_SHOWN_KEY` (notificaciones mostradas)
- `TASK_FILTER_KEY` (filtro de tareas)

### sessionStorage

- `SESSION_KEY` (sesion usuario)
- `wm_session`
- `wm_maintenance_mode`
- `wm_maintenance_user`

### Firebase Realtime Database

- Persistencia colaborativa en `wm_app_v2`.
- Presencia en `wm_presence_v2`.
- Auditoria de escrituras en `wm_writes`.
- Chat/comentarios en `wm_chats_v2/...`.
- Backups en `wm_backups`.

### Otras

- Export/import por archivo JSON.
- Export XLSX (ExcelJS) y PDF (HTML temporal).

## 9. Concurrencia

Elementos criticos detectados:

- `_rev` en payload de estado compartido.
- `lastSeenRev` como guard local anti-pisado.
- `merge3(base, mine, theirs, path)` para merge de 3 vias.
- `mergeIncomingState(incoming, doRender)` como orquestador de fusion.
- `transaction` sobre `wm_app_v2` para escritura segura.
- Logica anti-pisado:
  - aborta transaccion si `curRev > lastSeenRev`.
  - reintentos controlados.
- Manejo de pestañas antiguas / escrituras sin firma:
  - deteccion por metadata (`_at`, `_ver`, `_sid`).
  - warning y log en `wm_writes`.
- `visibilitychange`:
  - al volver visible, re-lee nube y fusiona antes de seguir escribiendo.
- Candado de edicion de notas:
  - difiere render cuando `isEditingSticky()` para no romper cursor.

## 10. Boveda cifrada (sin cambios)

Implementacion detectada (Web Crypto API):

- KDF: `PBKDF2` con hash `SHA-256`.
- Iteraciones: `VAULT_ITER = 310000`.
- Cifrado: `AES-GCM` (256 bits).
- Material clave:
  - DEK aleatoria (data encryption key), envuelta por PIN y por codigo de recuperacion.
- Salt:
  - `state.vault.salt` (PIN)
  - `state.vault.salt2` (recovery)
- IV:
  - IV aleatorio por cifrado, guardado junto con ciphertext (`{iv, ct}`).
- Recuperacion:
  - `vaultUnlockRecovery(code)` usando wrap de recovery.
- Funciones asociadas:
  - `_vaultDeriveKey`, `_vaultEnc`, `_vaultDec`, `_vaultImportDEK`, `_vaultLoadAll`
  - `vaultCreate`, `vaultUnlock`, `vaultUnlockRecovery`, `vaultLock`, `vaultMigrateAll`, `vaultDryRun`

## 11. Funciones llamadas desde HTML inline handlers

### Conteos

- Handlers inline totales detectados (incluyendo HTML generado por JS): ~711
- En HTML estatico (sin templates de scripts): ~284

Distribucion total aproximada:

- `onclick`: 544
- `onchange`: 79
- `oninput`: 12
- `onsubmit`: 0
- otros (`ondblclick`, `ondrag*`, `onkeydown`, etc.): resto

### Observacion critica

- Hay un volumen alto de funciones dependientes de alcance global (`function ...` top-level o `window.*`).
- Durante modularizacion, estas funciones deben seguir resolviendo desde HTML/plantillas sin romper.

### Grupos de funciones identificadas (muestra representativa)

- Auth/sesion: `doLogin`, `doLogout`, `openChangePassword`, `saveChangePassword`, `exitMaintenanceMode`.
- Tabs/render: `switchTab`, `switchSubTab`, `setTabYear`, `renderContent`, `toggleEditMode`.
- Clientes: `openEditCliente`, `saveClienteFromModal`, `deleteCliente`, `toggleClienteArchived`, `exportClientesXLSX`, `exportClientesPDF`.
- Sueldos: `openAddSueldoRow`, `updateSueldoField`, `changeSueldoStatus`, `toggleSueldoFlag`.
- Calendario: `openNewCalEvent`, `saveCalEvent`, `deleteCalEvent`, `setCalView`, `calPrev`, `calNext`.
- Tareas/notas/mydash: `addMyDashTask`, `toggleMyDashTask`, `onStickyFocus`, `onStickyBlur`, `stickyFmt`.
- Chat/notifs: `toggleChatPanel`, `handleChatSend`, `switchChatChannel`, `toggleNotifPanel`.
- Declaraciones: `declSet`, `declAddRow`, `declRemoveRow`, `declOpenType`, `declOpenCarry`, `declDoCarry`, `declOpenTrash`.
- Honorarios: `honEdit`, `honSaveModal`, `honAddClient`, `honArchiveClient`, `honOpenRestore`, `honDoRestore`.

## 12. Modulos funcionales existentes

Detectados por `tab.type`, funciones y prefijos:

- Dashboard (`dashboard`)
- Mi Dashboard / stickies / kanban (`mydash`)
- Clientes (`clientes`)
- Empresas (`table`, tab id `empresas`)
- Servicios profesionales (`table`, tab id `sprof`)
- Sueldos (`sueldos`)
- Honorarios (`honorarios`, modulo inyectado)
- Calendario (`calendar`)
- Declaraciones (`declaraciones`, modulo inyectado)
- Tareas (submodulo en dashboard/mydash)
- Notificaciones
- Configuracion (`settings`)
- Auditoria (audit log + panel)
- Presencia
- Chat y comentarios de celda
- Papelera (trash de declaraciones y otros flujos)
- Paginas personalizadas / builder (`page`, `builder`)

## 13. Codigo inicializador / BOOT

Inicializacion principal:

- IIFE `boot()` en script principal.
- Flujo:
  - `applyBranding()`
  - `showLogin()`
  - init Firebase app/auth persistence
  - `onAuthStateChanged(...)`
    - autenticado -> `initFirebase()`, `setSession`, `showApp`, `startPresence`, `startChat`
    - no autenticado -> `showLogin()`

Inicializacion secundaria:

- IIFE Honorarios:
  - `ensureHonorarios()`, re-render, inyeccion botones de backup, auto backup.
- IIFE Declaraciones:
  - registra API `window.decl*`, inyecta modales segun `DOMContentLoaded`.

## 14. Dependencias entre modulos

Dependencias transversales principales:

- Todos los modulos dependen de:
  - `state`
  - `userPrefs`
  - `saveState()`
  - `renderTabs()` / `renderContent()`
  - `currentUser()` / roles
- Modulos colaborativos dependen de Firebase:
  - sync de estado, presencia, chat, comments, backups, logs.
- Honorarios y Declaraciones dependen de extensibilidad via monkey patch:
  - parchean funciones core existentes.
- Auditoria/presencia/chat dependen de auth y sesion activa.
- Vault impacta clientes/exportaciones (lectura/escritura de campos sensibles).

## 15. Orden seguro recomendado de extraccion (sin cambio funcional)

Objetivo: desacoplar sin romper handlers globales, sync ni auth.

1. Inventario congelado de API global
- congelar lista de funciones usadas por inline handlers.
- agregar tests smoke de existencia en `window` (sin cambiar runtime productivo).

2. Constantes y utilidades puras
- extraer primero constantes, helpers sin side effects y funciones puras (formateo, escapes, clones).
- mantener reexport global transparente.

3. Persistencia local y preferencias
- aislar `loadState/saveState`, `localStorage/sessionStorage`, `userPrefs`.
- no tocar semantica ni claves.

4. Capa Firebase infra (sin negocio)
- encapsular inicializacion firebase, refs y wrappers de lectura/escritura.
- conservar nodos, payloads y timing.

5. Concurrencia y merge
- extraer bloque `_rev/lastSeenRev/merge3/mergeIncomingState/transaction` como unidad unica.
- no fragmentar hasta tener pruebas de regresion.

6. Auth/sesion/roles
- extraer `currentUser`, sesiones, login/logout, guardas de rol.
- preservar exactamente mapping de usuarios y flujo `onAuthStateChanged`.

7. Render core y enrutado de tabs
- extraer `renderContent`, `renderTabs`, `switchTab`, lockscreen.
- mantener contrato con modulos inyectados.

8. Modulos de UI por dominio de menor acoplamiento
- notificaciones, calendario utilitario, paneles.

9. Modulos de alto acoplamiento
- clientes (incluye vault), sueldos, mydash, chat/presencia/auditoria.

10. Modulos inyectados tardios
- Honorarios y Declaraciones al final, porque actualmente parchean core en runtime.

11. CSS por capas
- recien despues de estabilizar JS:
  - tokens base
  - layout global
  - modulos por prefijo (`hon-*`, `decl-*`, etc.)
- no tocar todavia inline styles dinamicos hasta encapsular su generador JS.

## Riesgos tecnicos principales detectados

- Riesgo alto por acoplamiento global y monkey patching entre scripts.
- Riesgo alto por dependencia de handlers inline (estaticos y generados).
- Riesgo alto en sincronizacion concurrente (merge + transaction + guardas de revision).
- Riesgo alto en seguridad/datos sensibles por coexistencia de vault con flujos legacy.
- Riesgo medio-alto por multiples responsabilidades en un solo script (auth, data, render, realtime, modulos).
- Riesgo medio por estilos inline y estilos generados dinamicamente que dificultan extraccion automatica de CSS.

## Metricas resumidas (aproximadas)

- CSS inline en bloques `<style>` reales: ~143k caracteres.
- JS inline en bloques `<script>` reales: ~920k caracteres.
- Handlers HTML inline detectados:
  - total incluyendo HTML generado por JS: ~711
  - estaticos en markup: ~284
