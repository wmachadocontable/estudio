/*
 * DECLARACIONES › CEDE MENSUAL (oct. 2026, pedido de la usuaria)
 *
 * CEDE se presenta todos los meses, así que deja de ser «por año» como IRPF o IVA:
 *   - arriba se elige el año y el mes (como en Sueldos);
 *   - cada mes tiene una fila por cliente: Cliente (de Info. Clientes), Tipo de DJ a presentar,
 *     Presentado, Estado y Notas, con la inicial de quien la tocó por última vez;
 *   - al abrir un mes nuevo se copian los clientes y su Tipo de DJ del último mes cargado.
 *     Si se cambia el tipo en un mes, se corrige también en los meses siguientes que ya existan
 *     y tenían el mismo tipo (y desde ahí se copia el nuevo).
 * Datos: ty.meses['AAAA-MM'] = { rows:[{ id, cliente, tipoDJ, presentado, estado, importe, notas, _u, _t }] }.
 * Lo que se había cargado por año (ty.years) no se borra: se pasa al mes en curso una sola vez.
 */
(function () {
  const ESTADOS = ['Pendiente', 'En curso', 'Presentada', 'No corresponde'];
  const MS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const q = (x) => "'" + String(x).replace(/'/g, "\\'") + "'";
  const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40) || 'fila';
  const yo = () => { const u = (typeof currentUser === 'function') ? currentUser() : null; return u ? u.name : ''; };
  const hoyYM = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  const sumarMes = (ym, n) => { const [y, m] = ym.split('-').map(Number), d = new Date(y, m - 1 + n, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };

  function esCede(ty) { return !!ty && !ty.linkTabId && (ty.mensual === true || /^\s*cede\s*$/i.test(ty.name || '')); }
  window.cedeEs = esCede;
  function declTabDe(id) { return state.tabs.find(t => t.id === id && t.type === 'declaraciones'); }
  function tipoDe(tab, id) { return (tab && Array.isArray(tab.types)) ? tab.types.find(t => t.id === id) : null; }
  function idPara(nombre, rows) { const base = 'ce_' + slug(nombre); let id = base, n = 2; while (rows.some(r => r.id === id)) id = base + '_' + (n++); return id; }

  // Lo cargado por año → al mes en curso (una sola vez; ty.years queda como estaba).
  function migrar(ty) {
    if (ty.meses) return false;
    ty.meses = {};
    const filas = [];
    const cols = ty.cols || [];
    const col = (re, tipo) => cols.find(c => (!tipo || c.ctype === tipo) && re.test(c.label || ''));
    const cCli = col(/cliente|empresa|nombre/i) || cols.find(c => c.ctype === 'text');
    const cPre = col(/present/i, 'date'), cImp = col(/importe/i), cEst = col(/estado/i), cNot = col(/nota|saldo/i);
    Object.keys(ty.years || {}).sort().forEach(y => ((ty.years[y] || {}).rows || []).forEach(r => {
      const nombre = String((cCli && r[cCli.key]) || '').trim();
      if (!nombre && !(cNot && r[cNot.key])) return;
      filas.push({ id: idPara(nombre || 'fila', filas), cliente: nombre, tipoDJ: '', presentado: (cPre && r[cPre.key]) || '', estado: (cEst && r[cEst.key]) || 'Pendiente',
        importe: (cImp && r[cImp.key]) != null ? r[cImp.key] : '', notas: (cNot && r[cNot.key]) || '', _u: null, _t: null });
    }));
    if (filas.length) ty.meses[hoyYM()] = { rows: filas, _de: 'por año' };
    ty.mensual = true;
    return true;
  }
  if (typeof registerStructureInitializer === 'function') registerStructureInitializer('cede-mensual', function () {
    let n = false;
    state.tabs.filter(t => t.type === 'declaraciones' && Array.isArray(t.types)).forEach(t => t.types.forEach(ty => { if (esCede(ty) && migrar(ty)) n = true; }));
    return n;
  });

  function mesActivo(ty) { return (userPrefs.cedeMes && userPrefs.cedeMes[ty.id]) || hoyYM(); }
  window.cedeIrMes = function (tabId, tyId, ym) { if (!userPrefs.cedeMes) userPrefs.cedeMes = {}; userPrefs.cedeMes[tyId] = ym; saveUserPrefs(); renderContent(); };
  window.cedeIrAnio = function (tabId, tyId, y) { const ym = mesActivo(tipoDe(declTabDe(tabId), tyId) || { id: tyId }); window.cedeIrMes(tabId, tyId, y + '-' + ym.slice(5)); };

  // Si el mes no existe, se arma copiando clientes y tipo de DJ del último mes cargado (hasta 12 atrás).
  function asegurarMes(ty, ym) {
    if (!ty.meses) migrar(ty);
    if (ty.meses[ym]) return { mes: ty.meses[ym], copiado: false };
    let de = null;
    for (let i = 1; i <= 12 && !de; i++) { const p = sumarMes(ym, -i); if (ty.meses[p] && (ty.meses[p].rows || []).length) de = p; }
    const rows = de ? ty.meses[de].rows.filter(r => r.cliente).map(r => ({ id: r.id, cliente: r.cliente, tipoDJ: r.tipoDJ || '', presentado: '', estado: 'Pendiente', importe: '', notas: '', _u: null, _t: null })) : [];
    ty.meses[ym] = { rows, _de: de || null };
    return { mes: ty.meses[ym], copiado: !!de, de };
  }
  window.cedeCopiarAnterior = function (tabId, tyId) {
    const ty = tipoDe(declTabDe(tabId), tyId); if (!ty) return;
    const ym = mesActivo(ty), mes = asegurarMes(ty, ym).mes;
    let de = null;
    for (let i = 1; i <= 12 && !de; i++) { const p = sumarMes(ym, -i); if (ty.meses[p] && (ty.meses[p].rows || []).length) de = p; }
    if (!de) { toast('No hay meses anteriores con clientes'); return; }
    let n = 0;
    ty.meses[de].rows.forEach(r => {
      if (!r.cliente || mes.rows.some(x => x.id === r.id || String(x.cliente).toLowerCase() === String(r.cliente).toLowerCase())) return;
      mes.rows.push({ id: r.id, cliente: r.cliente, tipoDJ: r.tipoDJ || '', presentado: '', estado: 'Pendiente', importe: '', notas: '', _u: null, _t: null }); n++;
    });
    saveState(); renderContent();
    toast(n ? '✓ ' + n + ' cliente' + (n === 1 ? '' : 's') + ' de ' + nombreMes(de) : 'No faltaba ninguno');
  };
  function nombreMes(ym) { return (typeof formatYearMonth === 'function') ? formatYearMonth(ym) : ym; }

  window.cedeSet = function (tabId, tyId, ym, id, campo, valor) {
    const ty = tipoDe(declTabDe(tabId), tyId); if (!ty || !ty.meses || !ty.meses[ym]) return;
    const r = ty.meses[ym].rows.find(x => x.id === id); if (!r) return;
    const antes = r[campo];
    if (String(antes == null ? '' : antes) === String(valor == null ? '' : valor)) return;
    r[campo] = valor; r._u = yo() || null; r._t = new Date().toISOString();
    if (campo === 'presentado' && valor && (!r.estado || r.estado === 'Pendiente' || r.estado === 'En curso')) r.estado = 'Presentada';
    let n = 0;
    // El tipo de DJ se arrastra: los meses siguientes que tenían el mismo tipo, pasan al nuevo.
    if (campo === 'tipoDJ') Object.keys(ty.meses).filter(m => m > ym).forEach(m => {
      const x = (ty.meses[m].rows || []).find(z => z.id === id);
      if (x && String(x.tipoDJ || '') === String(antes || '')) { x.tipoDJ = valor; n++; }
    });
    saveState();
    if (campo === 'estado' || campo === 'presentado' || campo === 'cliente') renderContent();
    if (n) toast('Tipo de DJ cambiado también en ' + n + ' mes' + (n === 1 ? '' : 'es') + ' siguiente' + (n === 1 ? '' : 's'));
  };
  window.cedeAgregar = async function (tabId, tyId) {
    const ty = tipoDe(declTabDe(tabId), tyId); if (!ty) return;
    const ym = mesActivo(ty);
    const nombre = await pedirCliente({ titulo: 'Agregar a CEDE', sub: nombreMes(ym) + ' (después se copia a los meses siguientes)', etiqueta: 'Cliente' });
    if (!nombre) return;
    const mes = asegurarMes(ty, ym).mes;
    if (mes.rows.some(r => String(r.cliente).toLowerCase() === nombre.toLowerCase())) { toast('«' + nombre + '» ya está en ' + nombreMes(ym)); return; }
    mes.rows.push({ id: idPara(nombre, mes.rows), cliente: nombre, tipoDJ: '', presentado: '', estado: 'Pendiente', importe: '', notas: '', _u: yo() || null, _t: new Date().toISOString() });
    saveState(); renderContent();
    toast('✓ Agregado: ' + nombre);
  };
  window.cedeQuitar = function (tabId, tyId, ym, id) {
    const ty = tipoDe(declTabDe(tabId), tyId); if (!ty || !ty.meses || !ty.meses[ym]) return;
    const r = ty.meses[ym].rows.find(x => x.id === id); if (!r) return;
    if (!confirm('¿Quitar «' + (r.cliente || 'esta fila') + '» de CEDE en ' + nombreMes(ym) + '?\n\nLos otros meses no se tocan, y el mes que viene ya no se copia.')) return;
    ty.meses[ym].rows = ty.meses[ym].rows.filter(x => x.id !== id);
    saveState(); renderContent();
  };

  function ini(n) {
    if (!n) return '';
    return (typeof empIni === 'function') ? empIni(n, 16) : '<b>' + bbEscape(String(n).charAt(0)) + '</b>';
  }
  function tiposUsados(ty) {
    const s = new Set();
    Object.values(ty.meses || {}).forEach(m => (m.rows || []).forEach(r => { if (r.tipoDJ) s.add(r.tipoDJ); }));
    return [...s].sort();
  }

  function render(tab, ty) {
    const ym = mesActivo(ty), info = asegurarMes(ty, ym), mes = info.mes;
    if (info.copiado) setTimeout(() => { saveState(); toast('📅 CEDE ' + nombreMes(ym) + ': se copiaron ' + mes.rows.length + ' clientes de ' + nombreMes(info.de)); }, 50);
    const y = ym.slice(0, 4), mi = +ym.slice(5) - 1, A = q(tab.id) + ',' + q(ty.id);
    const anios = []; for (let a = +y - 2; a <= +y + 2; a++) anios.push(a);
    const filas = mes.rows || [];
    const pres = filas.filter(r => r.estado === 'Presentada').length, nc = filas.filter(r => r.estado === 'No corresponde').length;
    const pend = filas.length - pres - nc;
    const colorEst = (e) => ({ 'Presentada': 'ce-ok', 'En curso': 'ce-curso', 'No corresponde': 'ce-nc' }[e] || 'ce-pend');
    let h = '<div class="decl-crumb"><span onclick="declBackLanding(' + q(tab.id) + ')">Declaraciones</span> › <b>' + bbEscape(ty.name) + '</b> › ' + bbEscape(nombreMes(ym)) + '</div>';
    h += '<div class="ce-v"><div class="ce-top"><div class="ce-tit">' + bbEscape(ty.name) + ' <i>' + bbEscape(nombreMes(ym)) + '</i></div>'
      + '<div class="ce-acc"><select class="ce-anio" onchange="cedeIrAnio(' + A + ',this.value)">' + anios.map(a => '<option' + (String(a) === y ? ' selected' : '') + '>' + a + '</option>').join('') + '</select>'
      + '<button class="btn btn-outline" onclick="cedeCopiarAnterior(' + A + ')">⤵ Traer del mes anterior</button>'
      + '<button class="btn btn-gold" onclick="cedeAgregar(' + A + ')">+ Cliente</button></div></div>';
    h += '<div class="ce-meses">' + MS.map((m, i) => { const k = y + '-' + String(i + 1).padStart(2, '0'), hay = ty.meses[k] && (ty.meses[k].rows || []).length;
      return '<button class="' + (i === mi ? 'on' : '') + (hay ? ' hay' : '') + '" onclick="cedeIrMes(' + A + ',' + q(k) + ')">' + m + '</button>'; }).join('') + '</div>';
    h += '<div class="ce-kpis"><div class="ce-kpi k-ok"><b>' + pres + '</b><span>Presentadas</span></div><div class="ce-kpi k-pend"><b>' + pend + '</b><span>Pendientes</span></div>'
      + '<div class="ce-kpi"><b>' + filas.length + '</b><span>Clientes en el mes</span></div></div>';
    h += '<datalist id="dl-cede-tipos">' + tiposUsados(ty).map(t => '<option value="' + bbEscape(t) + '"></option>').join('') + '</datalist>';
    h += '<div class="table-wrap ce-wrap"><table class="ce-tabla"><thead><tr><th>Cliente</th><th>Tipo de DJ a presentar</th><th>Presentado</th><th>Estado</th><th>Importe</th><th>Notas</th><th></th></tr></thead><tbody>';
    if (!filas.length) h += '<tr><td colspan="7" class="ce-vacio">No hay clientes en ' + bbEscape(nombreMes(ym)) + '. Tocá «+ Cliente» o «⤵ Traer del mes anterior».</td></tr>';
    filas.forEach(r => {
      const R = A + ',' + q(ym) + ',' + q(r.id);
      const firma = r._u ? (r._u + (r._t ? ' · ' + new Date(r._t).toLocaleDateString('es-UY') : '')) : '';
      h += '<tr><td><input class="ce-in ce-cli" list="dl-clientes" autocomplete="off" value="' + bbEscape(r.cliente || '') + '" onchange="cedeSet(' + R + ',\'cliente\',this.value)"></td>'
        + '<td><input class="ce-in ce-tipo" list="dl-cede-tipos" autocomplete="off" placeholder="Ej.: 2/181" value="' + bbEscape(r.tipoDJ || '') + '" onchange="cedeSet(' + R + ',\'tipoDJ\',this.value)"></td>'
        + '<td><input class="ce-in" type="date" value="' + bbEscape(r.presentado || '') + '" onchange="cedeSet(' + R + ',\'presentado\',this.value)"></td>'
        + '<td><select class="ce-in ce-est ' + colorEst(r.estado) + '" onchange="cedeSet(' + R + ',\'estado\',this.value)">' + ESTADOS.map(e => '<option' + (e === (r.estado || 'Pendiente') ? ' selected' : '') + '>' + e + '</option>').join('') + '</select></td>'
        + '<td><input class="ce-in ce-imp" type="number" step="any" placeholder="—" value="' + bbEscape(r.importe == null ? '' : r.importe) + '" onchange="cedeSet(' + R + ',\'importe\',this.value)"></td>'
        + '<td><input class="ce-in" placeholder="—" value="' + bbEscape(r.notas || '') + '" onchange="cedeSet(' + R + ',\'notas\',this.value)"></td>'
        + '<td class="ce-fin"><span class="ce-quien" title="' + bbEscape(firma ? 'Último cambio: ' + firma : 'Sin cambios todavía') + '">' + ini(r._u) + '</span><button class="ce-x" title="Quitar de este mes" onclick="cedeQuitar(' + R + ')">✕</button></td></tr>';
    });
    h += '</tbody></table></div>';
    h += '<div class="ce-pie">Al abrir un mes nuevo se copian los clientes y su <b>Tipo de DJ</b> del último mes cargado. Si cambiás el tipo, se corrige también en los meses siguientes que tenían el mismo.</div></div>';
    return h;
  }

  // Engancha: si el tipo abierto es CEDE, se dibuja la vista mensual en lugar de la anual.
  if (typeof window.renderDeclaraciones === 'function') {
    const _r = window.renderDeclaraciones;
    window.renderDeclaraciones = function (tab) {
      const D = window.__DECL || {}, navId = D.nav && D.nav[tab.id], ty = navId ? tipoDe(tab, navId) : null;
      if (esCede(ty)) return '<div class="decl-wrap" style="position:relative;">' + render(tab, ty) + '</div>';
      return _r.apply(this, arguments);
    };
    renderDeclaraciones = window.renderDeclaraciones;
  }
})();
