/* Traído del demo de la Cra. María Lucía Furtado (02/10/2026) y adaptado al estudio:
   los datos viven en state.finanzas (ver js/finanzas/finanzas.js, FinStore). */
/*
 * Subpestaña: Impuestos (dentro de Finanzas).
 *
 * UN SOLO CUADRO (decisión de la usuaria, 30/09/2026): el «Registro del año», con una fila por
 * período. Ahí está todo: el IVA facturado, el IVA de gastos, lo que da a pagar de IVA, el IRPF,
 * el vencimiento, el estado y el comprobante.
 *   - El IVA facturado y el IVA de gastos los calcula la página.
 *   - El IVA a pagar y el IRPF los escribe ella (el IVA viene sugerido).
 * IVA e IRPF van juntos en la misma fila porque vencen el mismo día: DGI los pone en la misma
 * línea de su cuadro de Servicios Personales.
 *
 * Antes hubo otros dos cuadros («Por mes» y «Otros impuestos y aportes») y una calculadora de IVA;
 * los tres se sacaron a pedido de la usuaria. Están en el historial de Git por si se retoman.
 */
/* ===== IMPUESTOS ===== */
var impAnio=null;
const IMP_EST={pag:'Pagado',pen:'Pendiente',venc:'Vencido'};

function impYear(){ return impAnio||finAnioActivo(); }
function setImpAnio(y){ impAnio=y; renderImpuestos(); }
function impFrecuencia(){ return vencCfg().frecuencia==='mensual'?'mensual':'bimestral'; }
function setImpFrecuencia(f){ vencCfg().frecuencia=f; FinStore.save(); renderImpuestos(); }

/* ===== LO QUE CALCULA LA PÁGINA ===== */
// IVA de lo facturado en Honorarios: solo las celdas con N° de factura (igual que Honorarios).
function impIvaVentas(y,m){ return finHonMes(y,m,'iva')||0; }
// IVA deducible de los gastos del mes (ya contempla el 50% cuando corresponde).
function impIvaCompras(y,m){ return Math.round(gstIvaDelMes(y,m).ded*100)/100; }

/* Los períodos del año, según trabaje mensual o bimestral.
   El IVA de Servicios Personales vence por bimestre: el bimestre i (meses 2i y 2i+1) vence en el
   mes 2i+2, igual que el cuadro de DGI. Enero-Febrero vence en marzo, y Noviembre-Diciembre en
   enero del año siguiente (ese queda sin fecha hasta que DGI publique el año nuevo).
   En la vista mensual, cada mes muestra el vencimiento del bimestre al que pertenece. */
function impPeriodos(y){
  var bim=impFrecuencia()==='bimestral', out=[];
  for(var i=0;i<(bim?6:12);i++){
    var meses=bim?[i*2,i*2+1]:[i];
    var b=bim?i:Math.floor(i/2), vAnio=(b===5?y+1:y), vMes=(b*2+2)%12;
    var v=0,c=0;
    meses.forEach(function(m){ v+=impIvaVentas(y,m); c+=impIvaCompras(y,m); });
    v=Math.round(v*100)/100; c=Math.round(c*100)/100;
    out.push({i:i,meses:meses,ventas:v,compras:c,sugerido:Math.round((v-c)*100)/100,
      label:bim?(MONTHS[i*2]+'-'+MONTHS[i*2+1]):MONTHS[i],
      venc:vencFecha('dgi_sp',vAnio,vMes)});
  }
  return out;
}

/* ===== EL REGISTRO ===== */
/* Una fila por período. Se crea recién cuando ella escribe algo. */
function impFilaPeriodo(y,pi,crear){
  var f=FinStore.all('impuestos').find(function(x){ return x.anio===y&&x.pi===pi; });
  if(!f&&crear){
    f={id:'ip'+y+'-'+pi+'-'+Math.floor(Math.random()*999),tipo:'periodo',anio:y,pi:pi,
       iva:null,irpf:null,venc:'',pagado:false,fechaPago:'',comprobante:'',notas:''};
    FinStore.data.impuestos.push(f);
  }
  return f;
}
function impEstado(x){ return x.pagado?'pag':(x.venc&&daysTo(x.venc)<0?'venc':'pen'); }
function impTotalFila(x){ return (honNum(x.iva)||0)+(honNum(x.irpf)||0); }
// Para el contador rojo de la subpestaña y el indicador del Panel.
function impVencidos(){ return FinStore.all('impuestos').filter(function(x){
  return impEstado(x)==='venc' && impTotalFila(x)>0; }); }

function impSetPer(y,pi,campo,valor){
  var f=impFilaPeriodo(y,pi,true);
  f[campo]=(campo==='iva'||campo==='irpf')?honNum(valor):valor;
  FinStore.save(); impRefrescar();
}
function impTogglePagoPer(y,pi){
  var f=impFilaPeriodo(y,pi,true);
  f.pagado=!f.pagado; if(f.pagado&&!f.fechaPago)f.fechaPago=finHoy(); if(!f.pagado)f.fechaPago='';
  FinStore.save(); renderImpuestos();
}
function impRefrescar(){ var k=document.getElementById('imp-kpis'); if(k)k.innerHTML=impKpisHtml(impYear()); }

/* Rellena el IVA de los períodos que estén vacíos con lo que calculó la página. */
function impUsarCalculado(){
  var y=impYear(), n=0;
  impPeriodos(y).forEach(function(p){
    if(!p.ventas&&!p.compras)return;
    var f=impFilaPeriodo(y,p.i,false);
    if(f&&honNum(f.iva)!==null)return;
    impFilaPeriodo(y,p.i,true).iva=p.sugerido; n++;
  });
  FinStore.save(); renderImpuestos();
  toast(n?('✓ '+n+' período'+(n===1?'':'s')+' completado'+(n===1?'':'s')):'Ya estaban todos completos');
}

/* ===== LA PANTALLA ===== */
function renderImpuestos(){
  var y=impYear();
  var h='<div class="view-head"><div><h2>Impuestos <span style="color:var(--muted);font-weight:400">'+y+'</span></h2>'
    +'<div class="sub">Lo que facturaste, lo que gastaste y lo que hay que pagar</div></div>'
    +'<span class="sld-top">'+finYearSelect(y,'setImpAnio')
    +'<span class="gseg"><button class="gv'+(impFrecuencia()==='bimestral'?' active':'')+'" onclick="setImpFrecuencia(\'bimestral\')">Bimestral</button>'
    +'<button class="gv'+(impFrecuencia()==='mensual'?' active':'')+'" onclick="setImpFrecuencia(\'mensual\')">Mensual</button></span>'
    +finExpBtns('imp')
    +'<button class="btn btn-outline btn-sm'+(impCfgAbierta?' fin-on':'')+'" onclick="impToggleCfg()">⚙ Mis impuestos</button></span></div>';
  if(impCfgAbierta)h+=vencCfgCard();
  // Honorarios guarda un solo año (sus 12 meses): el IVA facturado sale de ese año.
  var hy=finHonAnio();
  if(hy&&hy!==y)h+='<div class="venc-aviso">Honorarios tiene cargado el año <b>'+hy+'</b>: el IVA facturado de '+y
    +' no se puede calcular. Lo que pagaste lo podés escribir igual en cada período.</div>';
  h+='<div id="imp-kpis">'+impKpisHtml(y)+'</div>';
  h+=impTablaPeriodos(y);
  h+='<div class="fin-nota">💡 El <b>IVA facturado</b> sale de Honorarios y cuenta solo las filas con N° de factura. '
    +'El <b>IVA de gastos</b> sale de Gastos y ya contempla el 50% cuando corresponde. Lo que escribas en '
    +'<b>IVA a pagar</b> e <b>IRPF</b> manda sobre lo calculado: la sugerencia es una ayuda. '
    +'Las fechas de vencimiento se corrigen en <b>⚙ Mis impuestos</b>.</div>';
  finQ('#view-imp').innerHTML=h;
}
var impCfgAbierta=false;
function impToggleCfg(){ impCfgAbierta=!impCfgAbierta; renderImpuestos(); }

function impMoney(n){ return n<0 ? '− '+money(Math.abs(n)) : money(n); }

function impKpisHtml(y){
  var per=impPeriodos(y), v=0,c=0,aPagar=0,sinPagar=0,venc=0;
  per.forEach(function(p){
    v+=p.ventas; c+=p.compras;
    var f=impFilaPeriodo(y,p.i,false); if(!f)return;
    var t=impTotalFila(f); aPagar+=t;
    if(!f.pagado){ sinPagar+=t; if(impEstado(f)==='venc'&&t>0)venc++; }
  });
  return '<div class="kpis kpis-4">'
    +finKpi('IVA facturado · '+y,money(v),'de los honorarios con factura','')
    +finKpi('IVA de gastos',money(c),'deducible','k-green')
    +finKpi('A pagar en el año',money(aPagar),'IVA e IRPF','')
    +finKpi('Sin pagar',money(sinPagar),venc?(venc+' vencido'+(venc===1?'':'s')):'al día',venc?'k-alerta':(sinPagar?'k-amber':'k-green'))
    +'</div>';
}

function impTablaPeriodos(y){
  var per=impPeriodos(y), t={v:0,c:0,iva:0,irpf:0};
  var filas=per.map(function(p){
    var f=impFilaPeriodo(y,p.i,false)||{};
    var iva=honNum(f.iva), irpf=honNum(f.irpf);
    var venc=f.venc||p.venc||'';
    var est=(f.pagado?'pag':(venc&&daysTo(venc)<0?'venc':'pen'));
    var hayAlgo=p.ventas||p.compras||iva!==null||irpf!==null;
    t.v+=p.ventas; t.c+=p.compras; t.iva+=iva||0; t.irpf+=irpf||0;
    return '<tr'+(hayAlgo?'':' class="imp-vacio"')+'>'
      +'<td><b>'+p.label+'</b></td>'
      +'<td class="imp-venc">'+impInPer(y,p.i,'venc',venc,{type:'date'})
        +(venc?'':'<div class="imp-falta">vence en enero de '+(y+1)+', que DGI publica en diciembre</div>')+'</td>'
      +'<td class="num">'+(p.ventas?money(p.ventas):'—')+'</td>'
      +'<td class="num">'+(p.compras?money(p.compras):'—')+'</td>'
      +'<td>'+impInPer(y,p.i,'iva',iva,{ph:p.sugerido?numTxt(p.sugerido):'—',sug:p.sugerido})+'</td>'
      +'<td>'+impInPer(y,p.i,'irpf',irpf,{ph:'—'})+'</td>'
      +'<td>'+((iva||irpf)?'<span class="pill clk imp-'+est+'" onclick="impTogglePagoPer('+y+','+p.i+')">'+IMP_EST[est]+'</span>'
                         :'<span class="muted-cell">—</span>')+'</td>'
      +'<td>'+impInPer(y,p.i,'fechaPago',f.fechaPago,{type:'date'})+'</td>'
      +'<td>'+impInPer(y,p.i,'comprobante',f.comprobante,{ph:'+ N°'})+'</td></tr>';
  }).join('');
  var tot='<tr class="gst-tot"><td>TOTAL '+y+'</td><td></td><td class="num">'+money(t.v)+'</td><td class="num">'+money(t.c)+'</td>'
    +'<td class="num"><b>'+money(t.iva)+'</b></td><td class="num"><b>'+money(t.irpf)+'</b></td><td colspan="3"></td></tr>';
  return '<div class="card-head imp-head"><h3>Registro de '+y+'</h3>'
    +'<button class="btn btn-outline btn-sm" onclick="impUsarCalculado()">✨ Completar el IVA con lo calculado</button></div>'
    +'<div class="table-wrap"><table style="min-width:1020px"><thead><tr>'
    +'<th>Período</th><th class="imp-venc">Vence</th>'
    +'<th class="num">IVA facturado</th><th class="num">IVA de gastos</th>'
    +'<th class="num">IVA a pagar</th><th class="num">IRPF</th>'
    +'<th>Estado</th><th>Fecha de pago</th><th>Comprobante</th>'
    +'</tr></thead><tbody>'+filas+tot+'</tbody></table></div>';
}

function impInPer(y,pi,campo,v,o){
  o=o||{}; var d=o.type==='date';
  var val=(campo==='iva'||campo==='irpf')?numTxt(v):(v==null?'':v);
  return '<input class="cell-in'+(d?'':' num')+(o.sug&&v==null?' imp-sug':'')+'"'+(d?' type="date"'+FIN_DR:'')
    +' value="'+finEsc(val)+'" placeholder="'+finEsc(o.ph||'—')+'"'
    +(o.sug?' title="La página calculó '+finEsc(numTxt(o.sug))+'. Podés escribir otro importe."':'')
    +' onchange="'+(d?'if(finFechaOk(this))':'')+'impSetPer('+y+','+pi+',\''+campo+'\',this.value)">';
}

function impExpRows(){
  var y=impYear(), datos=[];
  impPeriodos(y).forEach(function(p){
    var f=impFilaPeriodo(y,p.i,false)||{};
    datos.push([p.label,fDate(f.venc||p.venc),numTxt(p.ventas),numTxt(p.compras),
      numTxt(honNum(f.iva)),numTxt(honNum(f.irpf)),
      IMP_EST[impEstado(f.id?f:{venc:p.venc})],fDate(f.fechaPago),f.comprobante||'']);
  });
  return {title:'Impuestos '+y,
    cols:['Período','Vence','IVA facturado','IVA de gastos','IVA a pagar','IRPF','Estado','Fecha de pago','Comprobante'],
    data:datos};
}


/* ===== ⚙ MIS IMPUESTOS (traído de config.js de María Lucía) =====
   En el estudio va acá adentro y no en Configuración: Finanzas la ve solo Wendy. */
function vencCfgGrupo(gid,on){
  var c=vencCfg(), a=c.grupos.filter(function(x){ return x!==gid; });
  if(on)a.push(gid);
  c.grupos=a; FinStore.save(); renderImpuestos();
}

function vencCfgCard(){
  var y=impYear(), c=vencCfg(), mios=c.grupos.length;
  var h='<div class="card"><div class="card-head"><h3>🏛 Mis impuestos</h3>'
    +'<span class="csub">'+mios+' marcado'+(mios===1?'':'s')+' · '+y+'</span></div><div class="card-body">';
  h+='<p class="muted-cell" style="font-size:13px;margin:2px 0 14px">Marcá <b>los que te corresponden</b>. El IVA se calcula solo con Honorarios y Gastos; las fechas de cada uno se pueden corregir a mano.</p>';

  h+=vencCfgDesplegable('impuestos','🏛','Impuestos','DGI y BPS, con el calendario del año ya cargado',
      VENC_GRUPOS.map(function(g){ return vencCfgFila(g,y); }).join(''),
      VENC_GRUPOS.filter(function(g){ return vencEsMio(g.id); }).length, VENC_GRUPOS.length,
      '<div class="venc-aviso">⚠ Estas fechas son una <b>ayuda</b>, no la fuente oficial: DGI las corrige durante '
      +'el año por resoluciones nuevas (en '+y+' ya cambió seis, marcadas con *). Revisalas y tocá «Sin revisar» '
      +'para dejarlas confirmadas. <a href="https://www.gub.uy/direccion-general-impositiva/" target="_blank" '
      +'rel="noopener">Ver el calendario en gub.uy →</a></div>'
      +(vencHayAnio(y)?'':'<div class="venc-aviso">Todavía no están las fechas de '+y+'. DGI y BPS publican el '
        +'calendario del año siguiente en diciembre; hasta entonces las podés cargar a mano.</div>'));

  return h+'</div></div>';
}

/* El grupo se abre al tocarlo. Arranca cerrado, salvo que ella lo haya dejado abierto. */
function vencCfgDesplegable(id,ico,titulo,sub,contenido,marcados,total,intro){
  var abierto=(vencCfg().abiertos||[]).indexOf(id)>=0;
  return '<details class="venc-grupo"'+(abierto?' open':'')+' ontoggle="vencCfgAbrir(\''+id+'\',this.open)">'
    +'<summary><span class="vg-ico">'+ico+'</span><span class="vg-t"><b>'+titulo+'</b><span>'+finEsc(sub)+'</span></span>'
    +'<span class="vg-n'+(marcados?' on':'')+'">'+marcados+' de '+total+'</span></summary>'
    +'<div class="vg-body">'+(intro||'')+contenido+'</div></details>';
}
function vencCfgAbrir(id,abierto){
  var c=vencCfg();
  if(!Array.isArray(c.abiertos))c.abiertos=[];
  var i=c.abiertos.indexOf(id);
  if(abierto&&i<0)c.abiertos.push(id);
  if(!abierto&&i>=0)c.abiertos.splice(i,1);
  FinStore.save();
}

/* Una fila de la lista: el casillero, el nombre, y abajo las fechas del año. */
function vencCfgFila(g,y){
  var mio=vencEsMio(g.id), ok=vencConfirmado(g.id,y);
  return '<div class="venc-g'+(mio?' mio':'')+'">'
    +'<label class="venc-g-top"><input type="checkbox" '+(mio?'checked':'')+' onchange="vencCfgGrupo(\''+g.id+'\',this.checked)">'
    +'<i style="background:'+g.color+'"></i><b>'+finEsc(vencNombre(g))+'</b>'
    +'<span class="venc-ok'+(ok?' on':'')+'" onclick="event.preventDefault();vencConfirmar(\''+g.id+'\','+y+','+(!ok)+')">'
    +(ok?'✓ Revisado':'Sin revisar')+'</span></label>'
    +(g.nota?'<div class="venc-nota">'+finEsc(g.nota)+'</div>':'')
    +'<div class="venc-meses">'+vencMesesHtml(g,y)+'</div></div>';
}

function vencMesesHtml(g,y){
  var out='';
  for(var m=0;m<12;m++){
    var iso=vencFecha(g.id,y,m);
    var cambio=VENC_CAMBIOS[vencClave(g.id,y,m)];
    var mano=vencCfg().editadas[vencClave(g.id,y,m)];
    if(!iso&&g.tipo!=='mensual'&&!mano)continue;
    out+='<label class="venc-m'+(mano?' mano':'')+(cambio?' cambio':'')+'"'
      +(cambio?' title="Fecha corregida por '+finEsc(cambio)+'"':'')+'>'
      +'<span>'+MONTHS_SHORT[m].toUpperCase()+'</span>'
      +'<input type="date"'+FIN_DR+' value="'+(iso||'')+'" onchange="if(finFechaOk(this))vencSetFecha(\''+g.id+'\','+y+','+m+',this.value)"></label>';
  }
  return out||'<div class="muted-cell" style="font-size:12px">Sin fechas para '+y+'.</div>';
}
