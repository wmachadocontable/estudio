# Contrato de Estado y Persistencia

Fuente: index.html (estado actual auditado).  
Objetivo: congelar forma y claves durante la refactorizacion arquitectonica.

## Regla de congelamiento

Durante el refactor NO cambiar:

- nombres de propiedades documentadas aqui;
- tipo estructural de cada seccion;
- claves de persistencia;
- metadata de concurrencia compartida.

## 1) state (objeto raiz)

Forma general esperada (resumen):

- `state`: objeto
- `state.branding`: objeto (name, subtitle, year, logo, logoInvert, colors, fonts)
- `state.tabs`: array de tabs
- `state.users`: array (con migracion legacy de string -> objeto)
- `state.calendarEvents`: array
- `state.clientes`: array
- `state.tipoColors`: objeto mapa
- `state.sueldos`: objeto por periodo
- `state.sueldosColumns`: array
- `state.vault`: objeto cuando la boveda esta habilitada
- otras secciones agregadas por modulos (ej. declaraciones/honorarios dentro de tabs)

## 2) state.users

Forma vigente:

- array de objetos usuario:
  - `id` (string)
  - `name` (string, identificador estable)
  - `displayName` (string)
  - `role` (`admin|editor|viewer|maintenance`)
  - `color` (string)
  - `photo` (string|null)
  - `passwordHash` (string|null)
  - `passwordNeedsReset` (boolean)
  - `createdAt` (number epoch ms)

Compatibilidad legacy:

- Se admiten arrays antiguos de strings, migrados en runtime por `ensureUsersAsObjects()`.
- No remover esta compatibilidad en esta etapa.

## 3) state.tabs

Forma vigente:

- array de objetos tab, con shape base:
  - `id` (string)
  - `name` (string)
  - `type` (string)
  - opcionales segun tipo: `rows`, `columns`, `folders`, `types`, `honData`, `tabYear`, `privacy`, etc.

Tipos observados:

- `dashboard`
- `mydash`
- `settings`
- `calendar`
- `sueldos`
- `clientes`
- `table`
- `annual`
- `page`
- `builder`
- `declaraciones`
- `honorarios` (inyectado)

Regla:

- Mantener id/type/nombre y campos usados por render y permisos.

## 4) state.clientes

Forma vigente:

- array de objetos cliente con campos mixtos (identificacion, contactos, credenciales, notas, etc.).
- campos sensibles conviven con mecanismo vault (`_enc`, `_iv` por cliente en flujos cifrados).

Regla:

- No alterar forma de objetos ni claves historicas.
- No alterar mapeo de campos sensibles (`VAULT_SENS`).

## 5) state.sueldos

Forma vigente:

- objeto indexado por periodo (`YYYY-MM`), con estructura interna de filas y estados por columna de sueldos.

Regla:

- Mantener esquema por periodo y claves de estado usadas por render y notificaciones.

## 6) state.vault

Forma vigente (cuando activo):

- `enabled` (boolean)
- `iter` (number, actualmente 310000)
- `salt` (base64)
- `salt2` (base64)
- `wrapPin` ({iv, ct})
- `wrapRec` ({iv, ct})
- `verifier` ({iv, ct})
- `createdAt` (number)

Estado de runtime asociado (no persistente completo):

- `vaultDEK`, `_vaultDEKraw`, `vaultPlain`, `vaultUnlocked`.

Regla:

- No cambiar nombres ni semantica de estos campos en esta etapa.

## 7) calendarEvents

Forma vigente:

- array en `state.calendarEvents`.
- cada evento maneja al menos id/titulo/tipo/fecha y campos de notificacion/asignacion segun flujo.

Regla:

- conservar forma esperada por calendario, notificaciones y chat/comentarios relacionados.

## 8) auditLog

Forma vigente:

- historico de auditoria almacenado dentro del estado compartido (y vistas de auditoria), con entradas de accion/target/autor/fecha/before-after segun caso.

Regla:

- mantener compatibilidad de lectura/escritura del log.

## 9) userPrefs

Forma vigente:

- objeto por usuario persistido en localStorage (`wm_userPrefs_<usuario>`), con preferencias UI.
- keys observadas incluyen: `activeTabId`, `editMode`, layouts de paneles, filtros, vista de modulos, etc.

Regla:

- mantener clave por usuario y campos usados por render.

## 10) Metadata de concurrencia (congelada)

Campos de metadata sobre estado compartido en Firebase:

- `_rev`
- `_at`
- `_ver`
- `_sid`
- `_by` (tambien observado y operativo)

Regla:

- no renombrar ni remover.
- no cambiar semantica de incremento/control de `_rev`.

## 11) Claves de persistencia congeladas

LocalStorage:

- `wm_app_v2`
- `wm_userPrefs_<usuario>`
- `NOTIF_SHOWN_KEY` (valor actual: `wm_notif_shown`)
- `TASK_FILTER_KEY`

SessionStorage:

- `SESSION_KEY`
- `wm_session`
- `wm_maintenance_mode`
- `wm_maintenance_user`

Regla:

- no cambiar nombres ni ambito en esta etapa.

## 12) Restricciones operativas

No permitido durante este refactor arquitectonico:

- cambiar shape de `state` y subestructuras listadas;
- cambiar keys de persistencia;
- cambiar metadata de concurrencia;
- cambiar reglas de serializacion JSON actuales.