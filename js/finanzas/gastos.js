/* Traído del demo de la Cra. María Lucía Furtado (02/10/2026) y adaptado al estudio:
   los datos viven en state.finanzas (ver js/finanzas/finanzas.js, FinStore). */
/*
 * Sección: Gastos del estudio (alquiler, luz, agua, muebles y útiles, papelería…).
 * - Vista MENSUAL: lo que hay que pagar ese mes, con los números arriba y el resultado abajo.
 * - Vista ANUAL: cuánto se gastó en cada categoría, mes a mes.
 *
 * CONTADO Y CRÉDITO (criterio de caja): una compra se carga UNA sola vez.
 * Si es a crédito, sus cuotas son la forma de pagarla: cada cuota aparece en el mes que vence,
 * nunca la compra entera. Así el "total del mes" siempre significa lo que sale del bolsillo.
 *
 * VENCIMIENTO Y PAGO (oct. 2026, pedido de la usuaria): la caja se mira por cuándo VENCE y cuándo se
 * PAGÓ, no por la fecha de la factura (la luz facturada el 25/09 que vence el 10/10 es de octubre).
 *   - g.vence (opcional; si falta, la fecha de la compra). Las cuotas: su fecha ya es el vencimiento.
 *   - «A pagar este mes»: lo que vence en el mes. «Pagado este mes»: lo pagado en el mes (fechaPago),
 *     aunque venciera en otro: es el egreso real. Lo vencido sin pagar de meses anteriores aparece en
 *     el mes en curso, en rojo, hasta que se pague.
 *   - El IVA de compras sigue por fecha de factura (como lo toma DGI).
 * Datos: colección "gastos" (la compra) + colección "cuotas" (los pagos programados de una compra).
 * La ficha de alta y edición está en gastos-form.js.
 */
/* ===== GASTOS ===== */
var gstAnio=null, gstMes=new Date().getMonth(), gstVista='mensual', gstQ='', gstCat='';
// Categorías con las que arranca. La usuaria puede agregar las que quiera (se guardan en gastoCats).
const GASTO_CATS_DEF=['Alquiler','Luz','Agua','Internet y teléfono','Muebles y útiles','Papelería y librería','Limpieza','Software y sistemas','Impuestos y tasas','Otros'];
const IVA_GASTO=0.22;
// Íconos por palabra clave: si crea una categoría nueva, igual le toca un ícono razonable.
const GASTO_ICOS=[[/alquil|local|oficina/i,'🏠'],[/luz|ute|electri/i,'💡'],[/agua|ose/i,'🚰'],[/internet|tel|antel|celu/i,'🌐'],
  [/mueble|equipa|comput|impres/i,'🪑'],[/papel|librer|insumo/i,'🖊'],[/limpie/i,'🧹'],[/software|sistema|licen|nube/i,'💻'],
  [/impuesto|tasa|dgi|bps|contrib/i,'🧾'],[/sueldo|personal|honorar/i,'👥'],[/curso|formac|capacit/i,'📚'],[/nafta|combusti|movili|viaje/i,'🚗'],
  [/banco|comisi/i,'🏦'],[/seguro/i,'🛡']];
function gstIco(c){ for(var i=0;i<GASTO_ICOS.length;i++){ if(GASTO_ICOS[i][0].test(c||''))return GASTO_ICOS[i][1]; } return '•'; }
function gastoCats(){ if(!Array.isArray(FinStore.data.gastoCats)||!FinStore.data.gastoCats.length)FinStore.data.gastoCats=GASTO_CATS_DEF.slice(); return FinStore.data.gastoCats; }
function gstCatAddName(n){ n=(n||'').trim(); if(n&&gastoCats().indexOf(n)<0){ gastoCats().push(n); FinStore.save(); syncGstListas(); } }
// Listas para autocompletar: categorías y proveedores ya usados.
function syncGstListas(){
  var dc=document.getElementById('dl-gastocats');
  if(dc)dc.innerHTML=gastoCats().map(function(c){return '<option value="'+finEsc(c)+'">';}).join('');
  var dp=document.getElementById('dl-proveedores');
  if(dp){
    var vistos={}, lista=[];
    FinStore.all('gastos').forEach(function(g){ var p=(g.proveedor||'').trim(); if(p&&!vistos[p.toLowerCase()]){vistos[p.toLowerCase()]=1;lista.push(p);} });
    dp.innerHTML=lista.sort(function(a,b){return a.localeCompare(b);}).map(function(p){return '<option value="'+finEsc(p)+'">';}).join('');
  }
}

function gstYear(){ return gstAnio||finAnioActivo(); }
function setGstAnio(y){ gstAnio=y; renderGastos(); }
function setGstMes(m){ gstMes=+m; renderGastos(); }
function setGstVista(v){ gstVista=v; renderGastos(); }

/* ===== fechas y cuotas ===== */
function gstAnioDe(x){ return x&&x.fecha?+x.fecha.slice(0,4):null; }
function gstMesDe(x){ return x&&x.fecha?+x.fecha.slice(5,7)-1:null; }
// Cuándo vence: el campo «vence» del gasto o, si no lo tiene, su fecha (en una cuota, su fecha).
function gstVence(x){ return (x&&(x.vence||x.fecha))||''; }
function gstEnMes(iso,y,m){ return !!iso&&+iso.slice(0,4)===y&&+iso.slice(5,7)-1===m; }
function gstMesesEntre(a,b){ if(!a||!b)return 0; return (+b.slice(0,4)-+a.slice(0,4))*12+(+b.slice(5,7)-+a.slice(5,7)); }
// Suma meses a una fecha. Si el día no existe en el mes destino (31 en febrero), va al último día.
function gstSumarMeses(iso,n){
  var p=(iso||finHoy()).split('-'), d=+p[2];
  var t=new Date(+p[0],+p[1]-1+n,1);
  var ultimo=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();
  return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(Math.min(d,ultimo)).padStart(2,'0');
}
function gstCuotasDe(id){ return FinStore.all('cuotas').filter(function(c){return c.gastoId===id;}).sort(function(a,b){return a.n-b.n;}); }
// Arma (o rehace) las cuotas de una compra a crédito.
// Las cuotas YA PAGADAS no se tocan nunca: son historia real de la caja. El saldo se reparte entre las que faltan.
function gstSincronizarCuotas(g){
  var previas=gstCuotasDe(g.id), porN={};
  previas.forEach(function(c){ porN[c.n]=c; });
  if(g.forma!=='credito'){ previas.forEach(function(c){ FinStore.remove('cuotas',c.id); }); return; }
  var N=Math.max(1,parseInt(g.cuotas,10)||1), total=honNum(g.importe)||0;
  var yaPago=previas.filter(function(c){ return c.pagado&&c.n<=N; }).reduce(function(a,c){ return a+(honNum(c.importe)||0); },0);
  var faltan=[]; for(var n=1;n<=N;n++){ if(!(porN[n]&&porN[n].pagado))faltan.push(n); }
  var saldo=Math.max(0,Math.round((total-yaPago)*100)/100);
  var base=faltan.length?Math.floor(saldo/faltan.length*100)/100:0, acum=0;
  for(var k=1;k<=N;k++){
    var vieja=porN[k];
    if(vieja&&vieja.pagado)continue;                        // paga: se deja como está
    var ultima=(k===faltan[faltan.length-1]);
    var imp=ultima?Math.round((saldo-acum)*100)/100:base;    // la última ajusta para que sumen exacto
    if(!ultima)acum=Math.round((acum+base)*100)/100;
    var c=vieja||{gastoId:g.id,n:k};
    c.importe=imp; c.fecha=gstSumarMeses(g.primera||g.fecha,k-1); c.pagado=false; c.fechaPago='';
    FinStore.upsert('cuotas',c);
  }
  previas.forEach(function(c){ if(c.n>N)FinStore.remove('cuotas',c.id); }); // si achicó el plan
}
// Lo que falta pagar de cuotas después de este mes: la plata futura ya comprometida.
function gstComprometido(y,m){
  var corte=y+'-'+String(m+1).padStart(2,'0')+'-31', t=0, n=0;
  FinStore.all('cuotas').forEach(function(c){ if(!c.pagado&&c.fecha>corte){ t+=honNum(c.importe)||0; n++; } });
  return {total:t,n:n};
}

/* ===== lo que se paga: gastos al contado + cuotas (cada uno una vez) ===== */
function gstItems(){
  var out=[];
  FinStore.all('gastos').forEach(function(g){
    if(g.forma==='credito')return;                         // la compra a crédito se ve a través de sus cuotas
    out.push({id:g.id,tipo:'gasto',g:g,vence:gstVence(g),importe:honNum(g.importe),pagado:!!g.pagado,fechaPago:g.fechaPago||'',det:''});
  });
  FinStore.all('cuotas').forEach(function(c){
    var g=FinStore.get('gastos',c.gastoId); if(!g)return;
    out.push({id:c.id,tipo:'cuota',g:g,c:c,vence:c.fecha||'',importe:honNum(c.importe),pagado:!!c.pagado,fechaPago:c.fechaPago||'',det:'Cuota '+c.n+'/'+(g.cuotas||'?')});
  });
  return out;
}
/* ===== las filas de un mes =====
   Lo que vence en el mes, lo que se pagó en el mes (aunque venciera en otro) y, en el mes en curso,
   lo vencido de antes que sigue sin pagar. f.fecha = vencimiento (para ordenar y mostrar). */
function gstFilasMes(y,m){
  var hoy=new Date(), esActual=(y===hoy.getFullYear()&&m===hoy.getMonth());
  var inicio=y+'-'+String(m+1).padStart(2,'0')+'-01';
  var filas=[];
  gstItems().forEach(function(it){
    var vence=gstEnMes(it.vence,y,m), pagoAca=it.pagado&&gstEnMes(it.fechaPago,y,m);
    var arrastre=esActual&&!it.pagado&&!!it.vence&&it.vence<inicio;
    if(!vence&&!pagoAca&&!arrastre)return;
    it.fecha=it.vence; it.venceAca=vence; it.pagoAca=pagoAca; it.arrastre=arrastre;
    filas.push(it);
  });
  return filas.sort(function(a,b){ return (b.arrastre?1:0)-(a.arrastre?1:0)||(a.fecha||'').localeCompare(b.fecha||''); });
}
// Para la vista anual y el Excel del año: cada pago UNA vez, en el mes en que salió la plata
// (o, si todavía no se pagó, en el mes en que vence).
function gstMesCaja(it){ var d=it.pagado&&it.fechaPago?it.fechaPago:it.vence; return d?{y:+d.slice(0,4),m:+d.slice(5,7)-1}:null; }
function gstFilasCaja(y,m){
  return gstItems().filter(function(it){ var k=gstMesCaja(it); return k&&k.y===y&&k.m===m; })
    .map(function(it){ it.fecha=it.vence; it.venceAca=true; it.pagoAca=it.pagado; return it; })
    .sort(function(a,b){ return (a.fecha||'').localeCompare(b.fecha||''); });
}
function gstFiltradas(){
  var q=gstQ.trim().toLowerCase();
  return gstFilasMes(gstYear(),gstMes).filter(function(f){
    if(gstCat&&(f.g.cat||'')!==gstCat)return false;
    if(q&&!((f.g.concepto||'')+' '+(f.g.cat||'')+' '+(f.g.proveedor||'')).toLowerCase().includes(q))return false;
    return true;
  });
}
// A pagar = vence en el mes · Pagado = salió en el mes · Pendiente = lo del mes sin pagar + lo vencido de antes.
function gstTotales(filas){
  var t={total:0,pag:0,pen:0,nPen:0,venc:0,nVenc:0};
  filas.forEach(function(f){
    var n=f.importe||0;
    if(f.venceAca)t.total+=n;
    if(f.pagoAca)t.pag+=n;
    if(!f.pagado){ t.pen+=n; t.nPen++; if(f.arrastre){ t.venc+=n; t.nVenc++; } }
  });
  return t;
}
// IVA de las COMPRAS del mes (el crédito fiscal corresponde a la fecha de la factura, no a la de la cuota).
// Devuelve el IVA de las facturas y cuánto de eso se puede deducir (hay compras que se computan al 50%).
function gstIvaDelMes(y,m){
  var t=0, ded=0;
  FinStore.all('gastos').forEach(function(g){
    if(gstAnioDe(g)!==y||gstMesDe(g)!==m)return;
    var iva=honNum(g.iva)||0; t+=iva; ded+=gstIvaDeducible(g);
  });
  return {iva:t,ded:ded};
}
// Lo deducible de un gasto: el IVA por su porcentaje (100% o 50%).
function gstIvaDeducible(g){ return Math.round((honNum(g.iva)||0)*(g.ivaDed||100))/100; }
// La celda de IVA en la tabla: el IVA de la factura y, si se computa al 50%, cuánto queda deducible.
function gstCeldaIva(f){
  var g=f.g, iva=honNum(g.iva)||0;
  if(f.tipo==='cuota')return '<span class="muted-cell" title="El IVA se cuenta en el mes de la compra, no en el de la cuota">—</span>';
  if(!g.conIva||!iva)return '<span class="muted-cell">—</span>';
  return money(iva)+((g.ivaDed||100)===50?'<span class="gst-ded">50% → '+money(gstIvaDeducible(g))+'</span>':'');
}
// Honorarios cobrados en el mes (para la línea de resultado). Si no hay Honorarios de ese año, null.
function gstCobradoDelMes(y,m){ return finHonMes(y,m,'cobrado'); }

/* ===== guardar desde la tabla ===== */
function gstSet(id,f,v){ var g=FinStore.get('gastos',id); if(!g)return; g[f]=v; if(f==='cat')gstCatAddName(v); FinStore.upsert('gastos',g); renderGstBody(); }
function gstTogglePago(tipo,id){
  var col=tipo==='cuota'?'cuotas':'gastos', o=FinStore.get(col,id); if(!o)return;
  o.pagado=!o.pagado; o.fechaPago=o.pagado?(o.fechaPago||finHoy()):'';
  FinStore.upsert(col,o); renderGstBody();
}
function gstBorrar(tipo,id){
  var g=tipo==='cuota'?FinStore.get('gastos',(FinStore.get('cuotas',id)||{}).gastoId):FinStore.get('gastos',id);
  if(!g)return;
  var cs=gstCuotasDe(g.id), pagas=cs.filter(function(c){return c.pagado;}).length;
  var msg=cs.length
    ? '¿Eliminar la compra «'+g.concepto+'»?\n\nSe borran también sus '+cs.length+' cuotas'+(pagas?' ('+pagas+' ya pagadas)':'')+'.'
    : '¿Eliminar este gasto?';
  if(!confirm(msg))return;
  cs.forEach(function(c){ FinStore.remove('cuotas',c.id); });
  FinStore.remove('gastos',g.id);
  renderGastos(); toast('Gasto eliminado');
}
// Duplicar: copia la compra sin los pagos hechos, para no volver a escribir todo.
function gstDuplicar(id){
  var g=FinStore.get('gastos',id); if(!g)return;
  var n=Object.assign({},g); delete n.id; delete n._t;
  n.fecha=finHoy(); n.vence=''; n.pagado=false; n.fechaPago=''; n.factura='';
  if(n.forma==='credito')n.primera=gstSumarMeses(finHoy(),1);
  var nuevo=FinStore.upsert('gastos',n);
  gstSincronizarCuotas(nuevo);
  renderGastos(); toast('✓ Gasto duplicado: revisá la fecha y el importe');
}

/* ===== pantalla ===== */
function renderGastos(){
  var y=gstYear();
  var h='<div class="view-head"><div><h2>Gastos del estudio <span style="color:var(--muted);font-weight:400">'+y+'</span></h2>'
    +'<div class="sub">Lo que se paga para que el estudio funcione</div></div>'
    +'<span class="sld-top">'+finYearSelect(y,'setGstAnio')
    +'<span class="gseg"><button class="gv'+(gstVista==='mensual'?' active':'')+'" onclick="setGstVista(\'mensual\')">▦ Mensual</button>'
    +'<button class="gv'+(gstVista==='anual'?' active':'')+'" onclick="setGstVista(\'anual\')">▤ Anual</button></span>'
    +finExpBtns('gastos')+'<button class="btn btn-gold btn-sm" onclick="gastoForm()">+ Gasto</button></span></div>';
  if(gstVista==='mensual'){
    h+='<div class="toolbar"><div class="search"><input placeholder="Buscar gasto…" value="'+finEsc(gstQ)+'" oninput="gstQ=this.value;renderGstBody()"></div>'
      +'<select class="filt" onchange="gstCat=this.value;renderGstBody()"><option value="">Todas las categorías</option>'
      +gastoCats().map(function(c){return '<option'+(c===gstCat?' selected':'')+'>'+finEsc(c)+'</option>';}).join('')+'</select>'
      +'<button class="btn btn-outline btn-sm" onclick="gstCopiarFijos()" title="Trae los gastos marcados como fijos (alquiler, luz, agua…) del mes anterior">🔁 Traer los fijos del mes anterior</button></div>';
    h+='<div class="month-filter">'+MONTHS_SHORT.map(function(m,i){return '<button class="month-btn'+(i===gstMes?' active':'')+'" onclick="setGstMes('+i+')">'+m.toUpperCase()+'</button>';}).join('')+'</div>';
  }
  h+='<div id="gst-body"></div>';
  h+='<div class="fin-nota">💡 Marcá un gasto como <b>fijo</b> (alquiler, luz, agua…) y el mes que viene lo traés con un solo botón. Cada gasto aparece en el mes en que <b>vence</b>; «Pagado este mes» es la plata que salió de verdad. Las compras <b>a crédito</b> aparecen en el mes de cada cuota, nunca el total de golpe.</div>';
  finQ('#view-gastos').innerHTML=h;
  syncGstListas(); renderGstBody();
}
function renderGstBody(){ finQ('#gst-body').innerHTML = gstVista==='anual' ? gstTablaAnual() : gstTablaMensual(); }

function gstTablaMensual(){
  var y=gstYear(), m=gstMes, filas=gstFiltradas(), t=gstTotales(filas), comp=gstComprometido(y,m);
  var kpis='<div class="kpis '+(comp.n?'kpis-4':'kpis-3')+'">'
    +finKpi('A pagar este mes',money(t.total),'lo que vence en '+MONTHS[m],'')
    +finKpi('Pagado este mes',money(t.pag),'la plata que salió','k-green')
    +finKpi('Pendiente',money(t.pen),t.nVenc?('incluye '+money(t.venc)+' vencido de antes'):(t.nPen?(t.nPen+' sin pagar'):'todo al día'),t.nVenc?'k-alerta':(t.pen?'k-amber':''))
    +(comp.n?finKpi('Comprometido a futuro',money(comp.total),comp.n+(comp.n===1?' cuota por venir':' cuotas por venir'),'k-acento'):'')
    +'</div>';
  var cuerpo=filas.map(function(f){
    var g=f.g;
    return '<tr>'
      +'<td style="white-space:nowrap" title="'+(f.tipo==='cuota'?'Vence la cuota':'Vence · factura del '+fDate(g.fecha))+'">'+(f.tipo==='cuota'?'<span class="gst-fecha">'+fDate(f.fecha)+'</span>':finCellIn('gastos',g.id,'vence',gstVence(g),{type:'date'}))+'</td>'
      +'<td><div class="name-cell"><span class="gst-ico">'+gstIco(g.cat)+'</span>'
        +(f.tipo==='cuota'?'<b class="gst-nom">'+finEsc(g.concepto)+'</b>':finCellIn('gastos',g.id,'concepto',g.concepto,{ph:'¿Qué se pagó?'}))
        +(f.det?'<span class="gst-cuota">'+f.det+'</span>':'')
        +(g.fijo?'<span class="gst-fijo" title="Gasto fijo: se puede traer del mes anterior con un botón">fijo</span>':'')
        +(f.arrastre?'<span class="gst-venc" title="Venció en un mes anterior y sigue sin pagar">vencido</span>':'')
        +(!f.venceAca&&f.pagoAca?'<span class="gst-otro" title="Vence en otro mes, pero se pagó en este">pagado este mes</span>':'')+'</div></td>'
      +'<td>'+(f.tipo==='cuota'?'<span class="muted-cell">'+finEsc(g.cat||'—')+'</span>':finCellIn('gastos',g.id,'cat',g.cat,{list:'dl-gastocats',ph:'Categoría'}))+'</td>'
      +'<td class="num"><b>'+(f.importe===null?'<span class="muted-cell">—</span>':money(f.importe))+'</b></td>'
      +'<td class="num gst-iva">'+gstCeldaIva(f)+'</td>'
      +'<td>'+(f.pagado
        ?'<span class="pill st-done clk" onclick="gstTogglePago(\''+f.tipo+'\',\''+f.id+'\')" title="Tocá para marcarlo como pendiente">Pagado</span>'+(f.fechaPago?'<span class="gst-pago">el '+fDate(f.fechaPago)+'</span>':'')
        :(f.vence&&f.vence<finHoy()
          ?'<span class="pill st-venc clk" onclick="gstTogglePago(\''+f.tipo+'\',\''+f.id+'\')" title="Venció y no está pagado. Tocá para marcarlo como pagado">Vencido</span>'
          :'<span class="pill st-pend clk" onclick="gstTogglePago(\''+f.tipo+'\',\''+f.id+'\')" title="Tocá para marcarlo como pagado">Pendiente</span>'))+'</td>'
      +'<td><div class="row-act">'
        +'<button class="btn-ghost" title="Ver o editar" onclick="gastoForm(\''+g.id+'\')">✎</button>'
        +'<button class="btn-ghost" title="Duplicar" onclick="gstDuplicar(\''+g.id+'\')">⧉</button>'
        +'<button class="btn-ghost" title="Eliminar" style="color:var(--red)" onclick="gstBorrar(\''+f.tipo+'\',\''+f.id+'\')">🗑</button>'
      +'</div></td></tr>';
  }).join('');
  if(!cuerpo)cuerpo=finEmptyRow(7,'Todavía no hay gastos cargados en '+MONTHS[m]+'.');
  var pie=filas.length?'<tr class="gst-tot"><td colspan="3">Vence en '+MONTHS[m]+'</td><td class="num">'+money(t.total)+'</td><td colspan="3"></td></tr>':'';
  return kpis+'<div class="table-wrap"><table style="min-width:900px"><thead><tr><th>Vence</th><th>Gasto</th><th>Categoría</th><th class="num">Importe</th><th class="num">IVA</th><th>Estado</th><th></th></tr></thead>'
    +'<tbody>'+cuerpo+pie+'</tbody></table></div>'+gstResultado(y,m,t);
}

// Barra de resultado del mes: lo que entró, lo que salió y la diferencia.
function gstResultado(y,m,t){
  var cob=gstCobradoDelMes(y,m), iv=gstIvaDelMes(y,m), iva=iv.iva;
  var celda=function(l,v,cls){ return '<div class="gst-res-i"><span>'+l+'</span><b'+(cls?' class="'+cls+'"':'')+'>'+v+'</b></div>'; };
  if(cob===null&&!iva)return '';
  var h='<div class="gst-res">';
  if(cob!==null){
    var dif=cob-t.pag;
    h+=celda('Honorarios cobrados',money(cob),'ok')
      +celda('Gastos pagados',money(t.pag))
      +celda('Diferencia',(dif<0?'− ':'')+money(Math.abs(dif)),dif<0?'neg':'ok');
  }
  if(iva)h+=celda(iv.ded===iva?'IVA de compras del mes':'IVA deducible del mes',money(iv.ded));
  return h+'</div>';
}

function gstTablaAnual(){
  var y=gstYear(), cats=[], porCat={}, porMes=new Array(12).fill(0), total=0;
  for(var m=0;m<12;m++){
    gstFilasCaja(y,m).forEach(function(f){
      var c=(f.g.cat||'Sin categoría').trim(), n=f.importe||0;
      if(!porCat[c]){ porCat[c]=new Array(12).fill(0); cats.push(c); }
      porCat[c][m]+=n; porMes[m]+=n; total+=n;
    });
  }
  cats.sort(function(a,b){ var sa=porCat[a].reduce(function(x,z){return x+z;},0), sb=porCat[b].reduce(function(x,z){return x+z;},0); return sb-sa; });
  var meses=0; porMes.forEach(function(v){ if(v)meses++; });
  var kpis='<div class="kpis kpis-2">'
    +finKpi('Total del año',money(total),y,'')
    +finKpi('Promedio por mes',money(meses?Math.round(total/meses):0),meses?('sobre '+meses+(meses===1?' mes con gastos':' meses con gastos')):'','')
    +'</div>';
  if(!cats.length)return kpis+'<div class="table-wrap"><table><tbody>'+finEmptyRow(1,'Todavía no hay gastos cargados en '+y+'.')+'</tbody></table></div>';
  var head='<tr><th>Categoría</th>'+MONTHS_SHORT.map(function(m){return '<th class="num">'+m+'</th>';}).join('')+'<th class="num">Total</th></tr>';
  var cuerpo=cats.map(function(c){
    var fila=porCat[c], suma=fila.reduce(function(x,z){return x+z;},0);
    return '<tr><td><div class="name-cell"><span class="gst-ico">'+gstIco(c)+'</span><b>'+finEsc(c)+'</b></div></td>'
      +fila.map(function(v){return '<td class="num">'+(v?numTxt(v):'<span class="muted-cell">—</span>')+'</td>';}).join('')
      +'<td class="num"><b>'+money(suma)+'</b></td></tr>';
  }).join('');
  var pie='<tr class="gst-tot"><td>Total por mes</td>'+porMes.map(function(v){return '<td class="num">'+(v?numTxt(v):'—')+'</td>';}).join('')+'<td class="num">'+money(total)+'</td></tr>';
  return kpis+'<div class="table-wrap"><table style="min-width:1040px"><thead>'+head+'</thead><tbody>'+cuerpo+pie+'</tbody></table></div>';
}

/* ===== traer los gastos fijos del mes anterior ===== */
function gstCopiarFijos(){
  var y=gstYear(), m=gstMes, pm=m-1, py=y; if(pm<0){ pm=11; py--; }
  var fijos=FinStore.all('gastos').filter(function(g){ return g.fijo&&g.forma!=='credito'&&gstAnioDe(g)===py&&gstMesDe(g)===pm; });
  if(!fijos.length){ toast('El mes anterior no tiene gastos fijos marcados'); return; }
  var yaHay=FinStore.all('gastos').filter(function(g){ return gstAnioDe(g)===y&&gstMesDe(g)===m; }), nuevos=0;
  fijos.forEach(function(g){
    var repetido=yaHay.some(function(x){ return (x.concepto||'').trim().toLowerCase()===(g.concepto||'').trim().toLowerCase(); });
    if(repetido)return;
    var nf=y+'-'+String(m+1).padStart(2,'0')+'-'+((g.fecha||'').slice(8,10)||'01');
    FinStore.upsert('gastos',{concepto:g.concepto,cat:g.cat,importe:g.importe,proveedor:g.proveedor||'',medio:g.medio||'',
      fecha:nf, vence:g.vence?gstSumarMeses(g.vence,gstMesesEntre(g.fecha,nf)):'', pagado:false, fechaPago:'', factura:'',
      fijo:true, forma:'contado', conIva:!!g.conIva, iva:g.conIva?g.iva:0, notas:''});
    nuevos++;
  });
  renderGastos();
  toast(nuevos?('✓ Se trajeron '+nuevos+' gastos fijos de '+MONTHS[pm]):'Esos gastos fijos ya estaban cargados');
}


/* ===== LOS GASTOS FIJOS SE TRAEN SOLOS (oct. 2026) =====
   Desde el día 1, al entrar a la página (con los datos ya leídos de la nube), se crean en el mes en
   curso los gastos marcados como fijos del último mes que tenga (hasta 3 meses atrás), como pendientes
   y con el mismo día del mes. Se hace UNA vez por mes (finanzas.fijosAuto[AAAA-MM]): si después borran
   uno, no vuelve. Cada gasto creado tiene un id fijo (mes + concepto), así dos sesiones a la vez no lo
   duplican. El botón «Traer los fijos del mes anterior» sigue estando, para hacerlo a mano. */
function gstFijosAutomaticos() {
  if (typeof cloudSynced === 'undefined' || !cloudSynced || typeof currentUser !== 'function' || !currentUser()) return false;
  if (!state.finanzas || !Array.isArray(state.finanzas.gastos)) return false;
  const f = state.finanzas, hoy = new Date(), y = hoy.getFullYear(), m = hoy.getMonth();
  const clave = y + '-' + String(m + 1).padStart(2, '0');
  if (f.fijosAuto && f.fijosAuto[clave]) return false;
  let origen = [], de = '';
  for (let i = 1; i <= 3 && !origen.length; i++) {
    const t = new Date(y, m - i, 1), py = t.getFullYear(), pm = t.getMonth();
    origen = f.gastos.filter(g => g.fijo && g.forma !== 'credito' && gstAnioDe(g) === py && gstMesDe(g) === pm);
    de = MONTHS[pm] + ' ' + py;
  }
  if (!origen.length) return false;                    // nada para traer (se vuelve a mirar la próxima vez)
  const yaHay = f.gastos.filter(g => gstAnioDe(g) === y && gstMesDe(g) === m);
  const ultimo = new Date(y, m + 1, 0).getDate();
  const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30);
  let n = 0;
  origen.forEach(g => {
    const id = 'gf' + clave + '_' + slug(g.concepto);
    if (f.gastos.some(x => x.id === id)) return;
    if (yaHay.some(x => (x.concepto || '').trim().toLowerCase() === (g.concepto || '').trim().toLowerCase())) return;
    const dia = Math.min(+((g.fecha || '').slice(8, 10)) || 1, ultimo), nf = clave + '-' + String(dia).padStart(2, '0');
    f.gastos.push({ id, _t: Date.now(), concepto: g.concepto, cat: g.cat, importe: g.importe, proveedor: g.proveedor || '', medio: g.medio || '',
      fecha: nf, vence: g.vence ? gstSumarMeses(g.vence, gstMesesEntre(g.fecha, nf)) : '', pagado: false, fechaPago: '', factura: '', fijo: true, forma: 'contado',
      conIva: !!g.conIva, iva: g.conIva ? g.iva : 0, ivaModo: g.ivaModo || 'incluido', ivaDed: g.ivaDed || 100, notas: '', _auto: true });
    n++;
  });
  if (!f.fijosAuto) f.fijosAuto = {};
  f.fijosAuto[clave] = { at: Date.now(), n: n, de: de };
  if (n) setTimeout(() => { if (typeof finEsDuena === 'function' && finEsDuena()) toast('🧾 Gastos: se trajeron ' + n + ' gastos fijos de ' + de); }, 1200);
  return true;
}
if (typeof registerStructureInitializer === 'function') registerStructureInitializer('gastos-fijos-auto', gstFijosAutomaticos);
