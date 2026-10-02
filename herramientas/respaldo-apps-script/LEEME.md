# Respaldo diario de la página del estudio (Google Apps Script)

**Qué hace:** todas las noches a las 23 h guarda toda la página en Drive (un JSON para restaurar y un
Excel para leer, en *Respaldos / Página del estudio W. Machado*) y manda un mail a
wmachadocontable@gmail.com con el JSON adjunto. Si falla, manda un mail de **ERROR**. Anota en la base
cuándo se hizo, y la página avisa en la campanita si pasan 2 días sin respaldo.

**Funciona con la página actual y con la nueva:** solo lee los datos, no depende de la versión publicada.

## Por qué se hizo nuevo (02/10/2026)
El respaldo anterior (mails «Respaldo W. Machado – fecha_22-16») llegaba todas las noches hasta
principios de julio, empezó a fallar y el último fue el **19/08/2026**. Google no mandó ningún aviso
de error: dejó de correr en silencio. El script viejo no estaba en el repositorio.

## Cómo instalarlo (una sola vez, con la cuenta wmachadocontable@gmail.com)
1. Entrar a https://script.google.com con **wmachadocontable@gmail.com** → **Nuevo proyecto**.
   Ponerle de nombre **Respaldo W. Machado**.
2. Borrar lo que trae y pegar todo `Codigo.gs`.
3. ⚙ **Configuración del proyecto** → tildar «Mostrar el archivo de manifiesto appsscript.json».
   Volver al editor, abrir `appsscript.json` y reemplazarlo por el de esta carpeta.
4. Arriba, elegir la función **probarAhora** → **Ejecutar** → aceptar los permisos que pide Google
   (es la propia cuenta). Al minuto tiene que llegar el mail «✅ Respaldo W. Machado».
5. Elegir **instalarDisparador** → **Ejecutar**. Desde ahí corre solo todas las noches.
6. **Apagar el respaldo viejo** (para no tener dos): en el proyecto viejo, ⏰ **Activadores** →
   borrar el activador. Si no se encuentra el proyecto viejo, no pasa nada: no está corriendo.

Si el mail de error dice **401 o 403**: la cuenta tiene que ser dueña o editora del proyecto de
Firebase «w-machado-contable».

## Probar en la PC (sin Google)
`node herramientas/respaldo-apps-script/probar-hojas.js` arma las hojas del Excel con datos inventados
y verifica que no salgan contraseñas ni datos cifrados.
