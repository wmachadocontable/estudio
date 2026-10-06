# CLAUDE.md — Página del Estudio W. Machado (gestión interna)

## Proyecto
- **Qué es:** la página de gestión del **Estudio Contable W. Machado**. La usan tres usuarias, cada una con
  su cuenta: **Wendy**, **Daniela** y **Lorena** (Lorena liquida sueldos, emite BPS y hace los controles).
- **Repo:** https://github.com/wmachadocontable/estudio (privado, cuenta **wmachadocontable**).
  - `main`: la versión publicada (un solo HTML grande, la vieja).
  - `desarrollo-arquitectura`: la reorganización en archivos que hizo **Álvaro** (técnico).
  - `mejoras-octubre`: los cambios del 02/10/2026 (sale de la rama de Álvaro). **Sin publicar.**
- **Firebase:** proyecto `w-machado-contable`, Auth + **Realtime Database**, plan Spark (10 GB de descargas
  por mes). **Desde el 02/10/2026 el estado se guarda por partes** en `wm_v3/p` (`js/services/sync-partes.js`):
  una clave por pestaña, por mes de Sueldos, por usuaria, por día de historial, etc.; cada cambio viaja solo con
  su parte (antes viajaba todo el estudio, ~1,3 MB, y se iba a agotar el límite a mitad de mes). En pantalla sigue
  habiendo un único `state` y la mezcla entre sesiones es la misma `merge3` de `js/services/sync.js`.
  `wm_app_v2` (el texto único de antes) quedó como copia del día del cambio; `rescate.html` todavía escribe ahí.
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
  Va en un recuadro con tres estilos en Personalizar (`SALUDO_ESTILOS`, `state.branding.saludo`, clase
  `sal-<id>` en body): **Tarjeta con el clima** a la derecha (por defecto, elegida por la usuaria), Banda
  azul marino y Suave.
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

## Tercera tanda (02/10/2026, misma rama)
- **Arreglo de «no se guardan los cambios»** (`js/modules/ids-estables.js`): las filas de Empresas, Sv.
  Profesionales, Industria y Comercio (y Sueldos antes del paso) no tenían `id`, y `merge3` toma una lista sin
  ids ENTERA: si dos guardaban casi a la vez, se perdía el cambio de una. Ahora cada fila lleva un id que sale
  del nombre (todas las sesiones calculan el mismo). Probado con dos sesiones en los emuladores.
  **Regla:** toda lista nueva en el estado, con `id` en cada elemento.
- **Empresas y Sv. Profesionales, vista nueva** (`js/modules/empresas-vista.js`, `css/empresas.css`): se elige en
  Configuración (cada una la suya, `userPrefs.vistaEmpresas`). Mensual / Anual; azul = realizada, verde =
  enviada con la inicial de quien envió. Diseño «H» elegido por la usuaria, con las tarjetas en blanco.
- **«Envía» por empresa** (`row.envia`), en las dos vistas.
- **La ficha de cada mes** (`js/modules/ficha-celda.js` + `#modal-cell` en index.html): estado con botones,
  «Realizó» (`cell.rq`) y «Envió» (`cell.eq`), que se completan solos con quien la usa. Mismos ids de siempre.
- **Clientes de Info. Clientes al agregar** (`js/modules/clientes-lista.js`, `pedirCliente()`): Empresas, Sv.
  Prof., Sueldos, Controles, Declaraciones, Honorarios y CEDE. Lista propia `js/modules/lista.js` (estándar
  de María Lucía: el `<datalist>` no anda en el celular). También arregla las listas de Finanzas en el celular.
- **Controles**: «+ Agregar a Controles» (`ctlExtra` del mes) y ✕ para quitar (`sinCtl`), firmados.
- **CEDE mensual** (`js/declaraciones-cede.js`, `css/cede.css`): `ty.meses['AAAA-MM'].rows`, tipo de DJ que se
  copia al mes siguiente; lo que había por año se pasó al mes en curso (ty.years queda).
- **Celular:** Finanzas y CEDE en fichas (final de `js/modules/celular.js` y `css/celular.css`), «Quién debe»
  en fichas, subpestañas de Finanzas entran en el ancho. Honorarios anual entra en la pantalla (computadora).

## Sueldos: meses futuros, Reliquidaciones y subpestañas propias (06/10/2026)
- **Bandeja y número rojo:** liquidar/emitir solo de meses **terminados** (los sueldos de octubre se hacen en
  noviembre); con un mes elegido, la bandeja mira ese mes y el anterior, nunca los siguientes
  (`sldTareas(hasta)`, `sldMesesBandeja(hasta)`). Los envíos de lo ya liquidado/emitido sí aparecen aunque el
  mes esté en curso. El número rojo de la pestaña mira hoy.
  **Los pendientes cuentan desde septiembre 2026** (`SLD_PENDIENTES_DESDE`, decisión de la usuaria): lo anterior
  no aparece en la bandeja, el número rojo ni los avisos.
- **Botones al lado del nombre** en todas las subpestañas: ✎ cambiar el nombre (`sldRenombrarFila`, este mes y
  los siguientes) y ✕ sacar (solo este mes). Antes la ✕ estaba al final de una tabla muy ancha y no se veía
  (en Reliquidaciones, nunca). «+ Agregar a …» quedó al comienzo de la barra.
- **Subpestañas propias** (`js/modules/sueldos-subtabs.js`, `state.sueldosSubs = { extra:[{id,nombre,_alta}],
  ocultas:{clave:{u,t}} }`): «+ Subpestaña» crea una (ej. Aguinaldos) que funciona **como Sueldos pero solo con
  Recibos** (filas con `noLleva.bps`). La ✕ de la subpestaña la oculta sin borrar datos; «Ocultas (N)» las
  vuelve a mostrar. Sueldos y Controles son fijas. Entran en copiar mes, mes automático, bandeja, campanita,
  ids estables y el Excel. En el código: `sldSubsTodas()`, `sldSubsVisibles()`, `sldSubKeys()`, `sldSubNombre()`.

## Gastos por vencimiento y pago (06/10/2026, pedido de la usuaria)
- Para ver el egreso real de efectivo, los gastos al contado ya no van por la fecha de la factura:
  campo nuevo **`vence`** (opcional; vacío = la fecha de la compra). Las cuotas ya iban por vencimiento.
- Vista mensual (`gstFilasMes`): lo que vence en el mes + lo pagado en el mes aunque venciera en otro
  («pagado este mes») + en el mes en curso, lo vencido de antes sin pagar (en rojo). Números: **A pagar** (vence
  en el mes) · **Pagado este mes** (por `fechaPago`, la plata que salió) · **Pendiente** (incluye lo vencido).
  La barra de resultado usa lo pagado. Vista anual y Excel del año: cada pago una vez, en su mes de caja
  (`gstFilasCaja`: el de pago o, si no se pagó, el de vencimiento).
- **El IVA de compras sigue por fecha de factura** (como lo toma DGI). Los gastos fijos que se traen solos
  corren también el vencimiento (`gstMesesEntre`).

## Honorarios: mes corriente / mes vencido y fecha de factura (06/10/2026, pedido de la usuaria)
- El casillero de cada mes es el **mes del trabajo**. Aparte (`js/finanzas/honorarios-factura.js`):
  `cell.fFac` = **fecha de factura** → el IVA va a ese mes (vacía = el mes del casillero, lo viejo no se movió);
  `cell.fecha` = fecha de cobro (caja); `c.facturacion = 'vencido'` (vacío = mes corriente) en la ficha del cliente.
- Mes vencido: al escribir el N° la fecha de factura se sugiere en el mes siguiente, y no figura «Atrasado» ni en
  «Quién debe» hasta que termina ese mes (`honPlazoCobro`).
- Vista mensual: Honorarios del mes · **Facturado en el mes** (por fecha de factura, el IVA) · **Cobrado en el mes**
  (por fecha de pago) · Pendiente de cobro. `finHonMes` (Impuestos y la línea de resultado de Gastos) usa las mismas
  fechas; una factura de diciembre emitida en enero cae en el IVA de enero del año siguiente.

## «Se borró Sv. Profesionales» (02/10/2026) — no se había borrado
- El año del estudio estaba guardado como `"2026 "` (con un espacio). Sv. Profesionales tenía los datos en el
  formato viejo (`row.cells`) y no tenía `tabYear`; al elegir un año en el selector se puso `tabYear: '2026'`,
  `getCells` comparó `'2026'` con `'2026 '`, creó `cellsByYear['2026'] = {}` vacío y mostró ese.
- Arreglo en `js/app.js`: los años se comparan sin espacios, un año vacío no tapa los datos viejos, y el
  inicializador `celdas-del-anio` (`repararCeldasDelAnio`) pasa `row.cells` al año del estudio sin pisar lo
  cargado y deja el año sin el espacio. Probado reproduciendo el caso en los emuladores.

## Modo noche «Medianoche» (02/10/2026)
- De **20:00 a 8:00** toda la página pasa a modo noche, sola y con la página abierta (`js/modules/noche.js`,
  clase `noche` en `<html>` y `<body>`). Se desactiva en el menú **⋯ → Modo noche** (cada una la suya:
  `userPrefs.modoNoche` = `auto` | `off`; `siempre` sirve para probar de día). La pantalla de ingreso no cambia.
- Colores en `css/noche.css` (se carga último): redefine las variables `--c-*` y las de Empresas, CEDE y Sueldos,
  y corrige los lugares con colores fijos. Para que los títulos azules no desaparecieran de noche, el texto
  que usaba `var(--c-header)` ahora usa `var(--c-header-tx, var(--c-header))` (de día es el mismo color).
- **Al agregar algo nuevo:** usar las variables (`--c-card`, `--c-text`, `--c-border`…) y no colores fijos;
  y pasar la revisión automática (`nocheAuditar()` en la consola con `userPrefs.modoNoche='siempre'`).

## Guardado por partes (02/10/2026, misma rama)
- Pedido de la usuaria al ver el uso de Firebase: 2 GB de descargas en 2 días (límite 10 GB/mes). Causa: todo el
  estudio en un texto que viajaba entero con cada tilde. Ahora `wm_v3/p/<clave>` (ver `docs/firebase-contract.md`).
- Probado en los emuladores: el paso automático desde `wm_app_v2`; un cambio en Empresas sube ~3 KB (antes todo);
  dos sesiones cambiando a la vez Empresas, Sueldos y Finanzas → se guardan las cuatro cosas; las dos sesiones
  quedan idénticas a la nube; una pestaña con la versión vieja recibe el cartel rojo y no se le tocan los datos.
- **El respaldo de las 23 h** (`herramientas/respaldo-apps-script/Codigo.gs`) lee `wm_v3/p` y lo vuelve a juntar.
  Hay que pegar esa versión en script.google.com («Respaldo W. Machado») al publicar.
- Después de publicar: que las tres cierren TODAS las pestañas (también el celular). Una pestaña vieja guarda en
  `wm_app_v2`, que la página nueva ya no lee: lo que cambie ahí se pierde (le aparece el cartel rojo).

## Publicación (02/10/2026)
- **Publicada el 02/10/2026** por decisión de la usuaria («publicá y que funcione»), **sin esperar la revisión
  de Álvaro** (queda para después, sobre `main`). Antes se ensayó con una copia de los datos reales en los
  emuladores: Wendy y Lorena, todas las pestañas, paso de Sueldos (65 notas y 309 tildes sin pérdidas), celular.
- Se publica con **GitHub Pages desde `main`** (raíz) → https://wmachadocontable.github.io/estudio/.
  ⚠ **El repositorio es PÚBLICO** (se vio el 02/10/2026; antes estaba anotado como privado): todo lo que se
  sube se puede leer en github.com. `_config.yml` solo saca de la *web* CLAUDE.md, README, docs, herramientas
  y scripts. El `index.html` viejo de `main` (una foto de una sesión real) quedó en el historial. Propuesta
  pendiente de charlar: repo privado + publicar con Firebase Hosting (proyecto `w-machado-contable`, gratis).
- **Para publicar un cambio:** `node herramientas/version-archivos.js` → commit en `mejoras-octubre` →
  `git push origin mejoras-octubre:main` (avance directo) → a los 2-3 minutos está en la web.
  La subida (`git push`) la hace la usuaria con los botones ▶: el control automático de Claude Code la frena.
- **Logo antes de ingresar:** `img/logo-estudio.png` (antes de entrar no se puede leer la base).
- Después de publicar, que las tres recarguen la página (una pestaña vieja abierta podría seguir escribiendo
  con el formato anterior) y que una administradora haga el paso de Sueldos.

## Pendiente
- Revisión de **Álvaro** de lo ya publicado.
- Paso de Sueldos al formato nuevo (lo hace Wendy o Daniela desde la página).

## Reglas
- Siempre en español rioplatense, explicaciones simples. Las del manual general (`..\CLAUDE.md`).
- Un archivo por sección; si pasa ~400 líneas, dividirlo. Colores solo en variables de `:root`.
- Listas nuevas en el estado: **cada elemento con `id`** (si no, `merge3` las trata enteras y se pisan).
- Correr `scripts/check-sensitive.ps1` y `node --check` antes de cada versión en Git.
