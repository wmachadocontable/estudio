# Checklist Manual de Regresion (por etapa)

Aplicar despues de cada etapa de refactor.  
Objetivo: detectar regresiones funcionales inmediatamente.

## ARRANQUE

- [ ] La pagina abre sin errores JS
- [ ] Se muestra login
- [ ] Firebase carga correctamente

## AUTH

- [ ] Login Daniela
- [ ] Login Wendy
- [ ] Login Lorena
- [ ] Logout
- [ ] Persistencia SESSION funciona
- [ ] Roles se mantienen

## DATOS

- [ ] Estado carga desde Firebase
- [ ] Estado carga desde localStorage cuando corresponde
- [ ] Guardado funciona
- [ ] wm_app_v2 actualiza
- [ ] _rev incrementa correctamente

## MULTIUSUARIO

- [ ] Dos pestanas reciben cambios
- [ ] No se pisan datos
- [ ] merge3 funciona
- [ ] visibilitychange relee nube
- [ ] conflictos se gestionan correctamente

## PRESENCIA

- [ ] Usuario aparece online
- [ ] heartbeat funciona
- [ ] onDisconnect elimina presencia
- [ ] editingRow continua funcionando

## CLIENTES

- [ ] Listado abre
- [ ] Crear
- [ ] Editar
- [ ] Archivar
- [ ] Restaurar
- [ ] Export XLSX
- [ ] Export PDF

## VAULT

- [ ] Unlock por PIN
- [ ] Lock
- [ ] Datos cifrados se leen correctamente
- [ ] Guardado cifrado funciona
- [ ] Recovery funciona
- [ ] Nunca aparecen datos sensibles en claro en Firebase

## EMPRESAS / SERVICIOS PROFESIONALES

- [ ] Render
- [ ] Cambios por mes
- [ ] Estados
- [ ] Guardado

## SUELDOS

- [ ] Render por periodo
- [ ] Cambio status
- [ ] Flags
- [ ] Observaciones
- [ ] Guardado
- [ ] Notificaciones relacionadas

## HONORARIOS

- [ ] Solo usuario autorizado
- [ ] Render
- [ ] Editar
- [ ] Guardar
- [ ] Clientes
- [ ] Backup
- [ ] Restore

## DECLARACIONES

- [ ] Render
- [ ] Agregar fila
- [ ] Editar
- [ ] Eliminar
- [ ] Carry
- [ ] Papelera

## CALENDARIO

- [ ] Render
- [ ] Crear evento
- [ ] Editar
- [ ] Eliminar
- [ ] Navegacion
- [ ] Sincronizacion externa existente

## CHAT

- [ ] Abrir panel
- [ ] Enviar mensaje
- [ ] Recibir mensaje
- [ ] Typing
- [ ] Last read
- [ ] Comentarios de celda

## UI

- [ ] Dashboard
- [ ] Mi Dashboard
- [ ] Tabs
- [ ] Modales
- [ ] Edit mode
- [ ] Tab locked
- [ ] Branding
- [ ] Responsive basico

## Evidencia minima sugerida por corrida

- [ ] Captura de consola sin errores bloqueantes
- [ ] Captura de `wm_app_v2` antes y despues de una edicion
- [ ] Captura de dos pestanas para prueba de merge/concurrencia
- [ ] Registro breve de resultado (OK/FAIL + fecha + responsable)