# CLAUDE.md — Página del Estudio W. Machado (gestión interna)

## Proyecto
- **Qué es:** la página de gestión del **Estudio Contable W. Machado**. La usan tres usuarias, cada una con
  su cuenta: **Wendy**, **Daniela** y **Lorena** (Lorena liquida sueldos, emite BPS y hace los controles).
- **Repo:** https://github.com/wmachadocontable/estudio (privado, cuenta **wmachadocontable**).
  - `main`: la versión publicada (un solo HTML grande, la vieja).
  - `desarrollo-arquitectura`: la reorganización en archivos que hizo **Álvaro** (técnico).
  - `mejoras-octubre`: los cambios del 02/10/2026 (sale de la rama de Álvaro). **Sin publicar.**
- **Firebase:** proyecto `w-machado-contable`, Auth + **Realtime Database** (nodo `wm_app_v2`, todo el
  estado como un texto JSON; la mezcla entre sesiones la hace `merge3` en `js/services/sync.js`).
- **Base real: nunca sin aprobación explícita.** Se prueba con los emuladores (ver abajo).
- Leer también `README.md` y `docs/` (contratos de Álvaro: qué no tocar).

## Cómo probar en esta PC (emuladores, datos inventados)
1. `node herramientas/prueba/emuladores.js` (o `estudio-emuladores` en la vista previa de Claude).
2. `node herramientas/servidor-local.js` → http://localhost:5540 (o `estudio-local`).
3. Desde localhost la página usa **siempre** los emuladores (proyecto ficticio `demo-wmachado`); la base
   real solo con `?real=1`. Cartel rojo «MODO PRUEBA».
4. Clave de prueba de las tres usuarias: `herramientas/prueba/datos-locales/usuarias.json` (no va a Git;
   no repetirla en el chat). El logo real para la prueba también está ahí (`logo.png`).

## Cambios del 02/10/2026 (rama mejoras-octubre)
- **Fuera:** Calendario (los datos siguen guardados), «Sincronizado» (solo aparece si falla el guardado),
  versión, año, Historial de cambios, Chat interno, y en ⋯ Historial y Papelera. Botón «Probar» de la
  bóveda. En Empresas y Sv. Profesionales: «Reparar años», vistas Tarjetas/Kanban/Compacta y «+ Carpeta».
- **Ej. Económicos → Declaraciones › «Industria y Comercio»**: tipo vinculado (`linkTabId`) que muestra la
  misma tabla, sin copiar datos y sin el botón Privacidad.
- **Finanzas** (solo Wendy): Honorarios (el de siempre) · Gastos · Impuestos, traídos del demo de María
  Lucía (`_Plantillas/04-prompt-finanzas.md`). Datos en `state.finanzas`. Honorarios guarda **un solo año**:
  el IVA facturado de Impuestos sale de ese año.
- **Sueldos rediseñado** (`js/modules/sueldos*.js`): quién y cuándo en cada tilde, Recibos (Liquidados →
  Enviados) y Factura BPS (Emitida → Enviada), «Envía» por empresa, «Falta enviar · N días» (rojo desde
  `SLD_DIAS_ALERTA` = 3), bandeja «Esto está esperando por vos», número rojo en la pestaña, estado
  automático, subpestaña Controles con «No lleva», sin Notas internas.
  - Decisión de la usuaria: el tilde viejo de **BPS se pasa como «Emitida»** (pendiente de enviar).
  - **Toda Finanzas es solo de Wendy.**
  - El paso al formato nuevo **no es automático**: Sueldos muestra cómo queda cada empresa, descarga un
    respaldo y recién ahí lo aplica una administradora. Antes, revisar la lista con la usuaria:
    `node herramientas/vista-previa-sueldos.js respaldo.json` (respaldo = Personalizar → Exportar JSON).
- **Pantalla de ingreso:** fondo «Elegante» (animado, por defecto) o «Clásico», en Configuración. Marca de
  agua y «Desarrollado por Wydan» discretos.
- **Pulido visual:** `css/pulido.css` (se carga último; sacándolo vuelve todo a como estaba).
- **index.html limpio:** antes era una foto de una sesión real (chat, fotos, Dashboard, 2,8 MB).

## Segunda tanda (02/10/2026, misma rama)
- **Ingreso:** sin marca de agua; tres fondos: **Luces** (por defecto), **Ondas** (animados) y Clásico.
  Solo se anima transform/opacity, sin `:has()`, y la animación NO se apaga con «reducir movimiento»
  (pedido de la usuaria: que se vea en todos los dispositivos).
- **Saludo** «Buenos días / Buenas tardes / Buenas noches, <nombre>» solo arriba del Dashboard, con el ícono
  del **clima de Rivera** (Open-Meteo, sin clave, guardado 30 min; si falla, ícono según la hora).
- **Sueldos ↔ campanita** (`js/modules/sueldos-avisos.js`): liquidados/emitida → a quien envía; todo
  enviado con controles pendientes → a Lorena; «Envía» asignado; resumen diario de atrasados. La
  campanita se actualiza en vivo al llegar cambios.
- **Personalizar** (`js/modules/apariencia.js`): estilo del encabezado (Clásico, Brillo, Degradé, Lino,
  Líneas finas) y barra de pestañas (Clásica, Fina, Con flechas, Plateada, Oculta; ojo: declaraciones.css pinta la Clásica con #nav-tabs, por eso las opciones van con el id). Rueda del mouse = mover pestañas.
- **Selectores** con flechita propia (en `css/pulido.css`).
- **Botón principal** (.btn-gold) en azul marino con letra blanca (antes gris, parecía desactivado).
- **Logo del encabezado:** solo el monograma WM, recortado del logo con CSS (opción «Logo completo» en Personalizar).
- **Íconos** (`js/modules/iconos.js`): «De colores» (por defecto) o «Sobrios» (de línea), en Personalizar. Cambia los
  emojis en pantalla, nunca los datos ni lo que se escribe. **Fundido** corto al cambiar de pestaña.
- **Notas adhesivas** de Personal al estilo de María Lucía (`js/modules/notas.js`, `css/notas.css`): papel pastel,
  cinta, leve inclinación, fecha y círculos de colores. Se mantiene todo lo que ya hacían. Los colores viejos
  se muestran con su equivalente pastel (`notaColor`), sin tocar el dato.
- **Celular** (`css/celular.css`, `js/modules/celular.js`): pestañas en una barra abajo con ícono, campanita
  visible, tablas con la primera columna fija, ventanas de abajo hacia arriba. Revisado a 375 px.

## Automatizaciones y respaldo (02/10/2026)
- **Sueldos:** el mes en curso se crea solo desde el día 1 (`sldMesAutomatico`, una vez por mes: `_auto`).
- **Gastos fijos:** aparecen solos cada mes (`gstFijosAutomaticos`, `finanzas.fijosAuto`, ids fijos `gf<mes>_<concepto>`).
- **Honorarios atrasados:** «Quién debe» arriba de Honorarios + aviso diario a Wendy (`js/finanzas/honorarios-deudores.js`).
- **Respaldo:** el viejo (Apps Script, no estaba en el repo) se cortó en silencio el **19/08/2026**. Nuevo script en
  `herramientas/respaldo-apps-script/` (ver su LEEME): 23 h, JSON + Excel en Drive y mail. Anota `wm_respaldo` en la base;
  la página lo muestra en Configuración y avisa si pasan 2 días (`js/modules/respaldo-estado.js`).
  **Instalado el 02/10/2026** en script.google.com (cuenta wmachadocontable, proyecto «Respaldo W. Machado», todas las noches
  23 h). Primer respaldo OK (11 pestañas, 94 clientes, 143 filas de Sueldos). Causa del corte: el script viejo («Proyecto sin
  título», 22:16) fallaba con 401 al leer Firebase desde que se ajustaron los permisos de la base; se borró su activador.

## Pendiente
- Revisión de **Álvaro** (pull request de `mejoras-octubre`).
- Publicar: **solo con aprobación explícita**. Antes: `node herramientas/version-archivos.js`. Después de
  publicar, que las tres recarguen la página (una pestaña vieja abierta podría seguir escribiendo con el
  formato anterior) y que una administradora haga el paso de Sueldos.

## Reglas
- Siempre en español rioplatense, explicaciones simples. Las del manual general (`..\CLAUDE.md`).
- Un archivo por sección; si pasa ~400 líneas, dividirlo. Colores solo en variables de `:root`.
- Listas nuevas en el estado: **cada elemento con `id`** (si no, `merge3` las trata enteras y se pisan).
- Correr `scripts/check-sensitive.ps1` y `node --check` antes de cada versión en Git.
