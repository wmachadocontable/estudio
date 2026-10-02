# Contrato Firebase (nodos congelados)

Fuente: index.html (estado actual auditado).  
Objetivo: congelar rutas de nodos y tipo de operaciones durante el refactor.

## Regla de congelamiento

Estos nombres de nodo quedan congelados en esta etapa:

- `wm_app_v2`
- `wm_writes`
- `wm_presence_v2`
- `wm_chats_v2/channels`
- `wm_chats_v2/typing`
- `wm_chats_v2/last_read`
- `wm_chats_v2/cell_comments`
- `wm_backups`

## Matriz de contratos por nodo

| Nodo | Lectura | Escritura | Listener realtime | Transaction | onDisconnect | Modulo principal |
|---|---|---|---|---|---|---|
| `wm_app_v2` | `once('value')`, `on('value')` | `set` (en restauraciones), escritura normal por guardado | Si (`on('value')`) | Si (guardado principal anti-pisado) | No | Core estado/sync/concurrencia |
| `wm_writes` | `once('value')` | `push`, `remove` (poda) | No continuo | No | No | Auditoria tecnica de escrituras |
| `wm_presence_v2` | `on('value')` | `set` heartbeat, `remove` salida | Si (`on('value')`) | No | Si (`onDisconnect().remove()`) | Presencia multiusuario |
| `wm_chats_v2/channels` | `on('value')` en mensajes por canal | `set` mensaje, `set` edicion, `remove` borrado, `set` readBy | Si (`on('value')`) | No | No | Chat |
| `wm_chats_v2/typing` | `on('value')` por canal | `set` typing timestamp, `remove` stop typing | Si (`on('value')`) | No | No (se limpia explicitamente) | Chat typing |
| `wm_chats_v2/last_read` | lectura puntual/listeners segun flujo de chat | `set` marca de leido | Si (segun subscripcion de chat) | No | No | Chat unread/last read |
| `wm_chats_v2/cell_comments` | `on('value')` por celda | `set` comentario, `remove` comentario | Si (`on('value')`) | No | No | Comentarios de celda |
| `wm_backups` | `once('value')` | `set` backup, `remove` poda backups | No continuo | No | No | Honorarios (sistema de respaldo interno) |

## Detalles operativos relevantes

### `wm_v3/p` (desde el 02/10/2026: guardado por partes)

- El estado compartido, partido en claves (`js/services/sync-partes.js`): una por pestaña (`tab~<id>` + el orden en `tabs`),
  un mes de Sueldos por clave (`sueldos~AAAA-MM`), avisos y paneles por usuaria, `branding` por campo (el logo aparte)
  y el historial por día (`auditLog~AAAA-MM-DD`); el resto, una clave por dato de primer nivel.
- Cada clave es un texto JSON `{ r, by, at, ver, sid, d }`: `r` es la versión de ESA clave (anti-pisado por clave,
  igual que `_rev`), `d` el dato. Un cambio sube y baja solo las claves que cambiaron.
- Listener `on('value')` en `wm_v3/p` (el servidor manda solo las claves cambiadas); arma el estado entero y lo pasa
  por el mismo `mergeIncomingState` / `merge3` de siempre. `wm_v3/meta` anota cuándo se hizo el paso.
- Paso inicial automático: si `wm_v3/p` está vacío, la primera sesión copia `wm_app_v2` partido (transacción atómica)
  y le reescribe a `wm_app_v2` el mismo contenido sin `_at`, para que las pestañas viejas muestren el cartel rojo.

### `wm_app_v2` (hasta el 02/10/2026)

- **Ya no se usa** desde el paso a `wm_v3`: queda como copia del momento del cambio. `rescate.html` todavía escribe acá
  (no tiene efecto en la página nueva).
- Era el estado compartido principal serializado en JSON.
- Usa metadata de concurrencia (`_rev`, `_by`, `_at`, `_ver`, `_sid`).
- Escritura principal via `transaction` para evitar pisado entre pestañas/sesiones.
- Listener realtime central para merge de 3 vias.

### `wm_writes`

- Nodo auxiliar de diagnostico de escrituras.
- No contiene el estado principal de negocio.
- Se limita con poda por maximo de entradas.

### `wm_presence_v2`

- Mapa de presencia por usuario/sesion.
- Incluye `lastSeen` y `editingRow` para advertencias de colision.
- Usa `onDisconnect().remove()` para limpiar presencia al cerrar.

### `wm_chats_v2/*`

- `channels`: mensajes por canal.
- `typing`: estado efimero de tipeo por canal/usuario.
- `last_read`: marca temporal de lectura por usuario/canal.
- `cell_comments`: hilos de comentarios asociados a celda.

### `wm_backups`

- Copias internas de estado (modulo Honorarios).
- Incluye backups automaticos y manuales.
- Puede participar en restauracion con escritura a `wm_app_v2`.

## Restricciones de esta etapa

No permitido:

- renombrar nodos;
- mover rutas;
- cambiar tipo de operacion esperada por nodo (ej. reemplazar transaction en `wm_app_v2`);
- alterar contratos de presencia/chat sobre estas rutas.