/*
 * IDS ESTABLES EN LAS FILAS (oct. 2026) — arreglo de «no se guardan los cambios».
 *
 * Cuando dos sesiones guardan casi a la vez, sync.js junta los dos cambios (merge3). Las listas
 * se juntan elemento por elemento SOLO si cada elemento tiene id; si no, la lista se toma entera
 * y gana la copia de esta pestaña: el cambio de la otra persona se pierde sin aviso.
 * Las filas de Empresas, Sv. Profesionales y las tablas anuales (Industria y Comercio) no tenían id,
 * y las de Sueldos tampoco hasta «Pasar al formato nuevo». Por eso, con dos o tres editando a la
 * vez, a veces un cambio «no se guardaba».
 *
 * Acá se le pone un id a cada fila que no lo tenga. El id sale del nombre de la fila (y de la
 * pestaña), así que todas las sesiones calculan EL MISMO: no hay ida y vuelta entre ellas.
 * Corre después de cada lectura de la nube (registerStructureInitializer) y antes de cada guardado.
 */
function idEstableHash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
function idEstableTieneClave(x) { return x.id != null || x.__key != null || x.key != null; }

function idsEstables() {
  if (typeof state === 'undefined' || !state) return false;
  let n = 0;
  (state.tabs || []).forEach(t => {
    if (!t || !Array.isArray(t.rows)) return;
    t.rows.forEach(r => {
      if (!r || typeof r !== 'object' || idEstableTieneClave(r)) return;
      const base = 'f_' + idEstableHash(t.id + '|' + String(r.name || '').trim().toLowerCase());
      let id = base, k = 2;
      while (t.rows.some(x => x !== r && x && x.id === id)) id = base + '_' + (k++);
      r.id = id; n++;
    });
  });
  // Sueldos antes del paso al formato nuevo: el mismo id que le daría ese paso (sldIdPara).
  Object.keys(state.sueldos || {}).forEach(ym => ['sueldos', 'sd', 'reliq', 'ctlExtra'].forEach(sub => {
    const l = state.sueldos[ym] && state.sueldos[ym][sub];
    if (!Array.isArray(l)) return;
    l.forEach(r => {
      if (!r || typeof r !== 'object' || idEstableTieneClave(r)) return;
      r.id = (typeof sldIdPara === 'function') ? sldIdPara(r.name, sub, l) : 'sl_' + sub + '_' + idEstableHash(String(r.name || ''));
      n++;
    });
  }));
  return n > 0;
}

if (typeof registerStructureInitializer === 'function') registerStructureInitializer('ids-estables', idsEstables);
// Antes de cada guardado: una fila recién agregada sale ya con su id.
if (typeof saveState === 'function') {
  const _saveStateIds = saveState;
  saveState = function () { try { idsEstables(); } catch (e) { console.warn('ids', e); } return _saveStateIds.apply(this, arguments); };
}
