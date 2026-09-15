# Inventario de Archivos de Repositorio (estado actual)

Objetivo: documentar archivos activos e historicos antes de la limpieza posterior.

## Archivo activo de refactor

- `index.html` (minuscula): archivo actual sobre el que se realiza la refactorizacion.

## Archivos historicos detectados

- `Index.html`
- `index 08-06-26.html`
- `pagina_corregida_v3.html`
- `reparar-nube.html`
- `rescate.html`

## Reglas para esta etapa

- NO borrar archivos historicos.
- NO mover archivos historicos.
- NO renombrar archivos historicos.
- La limpieza/consolidacion de historicos queda para una etapa posterior.

## Riesgo de sistema de archivos (Windows)

- Existe conflicto potencial por coexistencia de `Index.html` y `index.html`.
- En entornos case-insensitive (Windows) puede generar ambiguedad en herramientas, diffs, despliegue o flujos que no respeten mayusculas/minusculas.
- Durante este refactor se mantiene ambos archivos sin cambios funcionales; solo se documenta el riesgo.