/*
 * FONASA (27/10/2026, pedido de la usuaria) — dentro de Finanzas › Impuestos, debajo del registro de IVA e IRPF.
 *
 * Un renglón por mes:
 *   Base    = lo FACTURADO sin IVA en el mes, por fecha de emisión de la factura (Honorarios con N° de factura,
 *             igual que el IVA: honNumerosMes(...).sub).
 *   Cálculo = Base × tasa.  Mínimo = el que escribe ella.
 *   «Aplica mínimo» Sí/No: sugerido solo (Sí cuando el cálculo da menos que el mínimo); si lo toca queda el suyo
 *             (f.aplicaMin) y ↺ lo vuelve a automático. A pagar = el mínimo si aplica, si no el cálculo.
 *   Vence   = calendario de BPS Servicios Personales del mes siguiente (vencFecha('bps_sp')), corregible.
 * La TASA y el MÍNIMO los escribe ella (vencCfg().fonasa): cambian con la BPC y con su situación, así que la
 * página no trae valores «oficiales». Los meses que todavía no terminaron y no tienen nada facturado no piden pago.
 * «Desde» (fonCfg().desde, 'AAAA-MM'): los meses anteriores no piden pago (ya se pagaban por fuera de la página).
 * Al poner la tasa por primera vez arranca en el mes anterior (el que se paga ahora); se cambia arriba del cuadro.
 * Al marcarlo pagado se guarda el importe (f.importe): si después cambia Honorarios, lo pagado no se mueve.
 * Datos: FinStore 'impuestos', filas { id:'foAAAA-MM', tipo:'fonasa', anio, mes, aplicaMin, venc, pagado, fechaPago, importe }.
 * También aparecen en Gastos (impuestos-gastos.js).
 */
function fonCfg(){ var c=vencCfg(); if(!c.fonasa||typeof c.fonasa!=='object')c.fonasa={tasa:null,minimo:null,desde:''}; return c.fonasa; }
function fonYM(y,m){ return y+'-'+String(m+1).padStart(2,'0'); }
function fonId(y,m){ return 'fo'+fonYM(y,m); }
function fonFila(y,m,crear){
  var id=fonId(y,m), f=FinStore.get('impuestos',id);
  if(!f&&crear){ f={id:id,tipo:'fonasa',anio:y,mes:m,aplicaMin:null,venc:'',pagado:false,fechaPago:'',importe:null}; FinStore.data.impuestos.push(f); }
  return f;
}
// La base: lo facturado sin IVA en ese mes (null si Honorarios tiene cargado otro año).
function fonBase(y,m){
  var t=finHonTab(), hy=finHonAnio(); if(!t||(y!==hy&&y!==hy+1))return null;
  return honNumerosMes(t.honData,hy,y,m).sub;
}
function fonCalculo(y,m){
  var cfg=fonCfg(), f=fonFila(y,m,false)||null;
  var base=fonBase(y,m), tasa=honNum(cfg.tasa), minimo=honNum(cfg.minimo);
  var terminado=new Date(y,m+1,0,23,59,59)<new Date();
  // Un mes futuro sin facturas, o anterior a «Desde», no pide pago.
  var activo=(!!base||terminado)&&!(cfg.desde&&fonYM(y,m)<cfg.desde);
  var calc=(base!=null&&tasa!=null)?Math.round(base*tasa)/100:null;
  var auto=(minimo!=null&&calc!=null&&calc<minimo);
  var manual=!!f&&(f.aplicaMin===true||f.aplicaMin===false);
  var aplica=manual?f.aplicaMin:auto;
  var aPagar=!activo?null:(aplica&&minimo!=null?minimo:calc);
  if(f&&f.pagado&&honNum(f.importe)!=null)aPagar=honNum(f.importe);
  var vy=m===11?y+1:y, vm=(m+1)%12;
  var venc=(f&&f.venc)||vencFecha('bps_sp',vy,vm)||'';
  return {y:y,m:m,f:f,base:base,tasa:tasa,minimo:minimo,calc:calc,auto:auto,manual:manual,aplica:aplica,aPagar:aPagar,activo:activo,venc:venc,
    pagado:!!(f&&f.pagado),fechaPago:(f&&f.fechaPago)||''};
}
function fonEstado(c){ return c.pagado?'pag':(c.venc&&daysTo(c.venc)<0?'venc':'pen'); }

/* ===== cambios ===== */
function fonSetCfg(campo,v){
  var c=fonCfg();
  if(campo==='desde')c.desde=v||'';
  else{
    c[campo]=honNum(v);
    if(campo==='tasa'&&!c.desde){ var d=new Date(); d.setMonth(d.getMonth()-1); c.desde=fonYM(d.getFullYear(),d.getMonth()); }
  }
  FinStore.save(); renderImpuestos();
}
function fonSet(y,m,campo,v){ var f=fonFila(y,m,true); f[campo]=v; FinStore.save(); renderImpuestos(); }
function fonToggleMin(y,m){ var c=fonCalculo(y,m), f=fonFila(y,m,true); f.aplicaMin=!c.aplica; FinStore.save(); renderImpuestos(); }
function fonMinAuto(y,m){ var f=fonFila(y,m,true); f.aplicaMin=null; FinStore.save(); renderImpuestos(); }
// sinPintar: desde Gastos (que se redibuja solo).
function fonTogglePago(y,m,sinPintar){
  var c=fonCalculo(y,m), f=fonFila(y,m,true);
  f.pagado=!f.pagado;
  if(f.pagado){ f.fechaPago=f.fechaPago||finHoy(); f.importe=c.aPagar; } else { f.fechaPago=''; f.importe=null; }
  FinStore.save(); if(!sinPintar)renderImpuestos();
}
// Para los indicadores de Impuestos: lo de FONASA del año.
function fonTotalesAnio(y){
  var t={aPagar:0,sinPagar:0,venc:0};
  for(var m=0;m<12;m++){ var c=fonCalculo(y,m); if(!c.aPagar)continue; t.aPagar+=c.aPagar; if(!c.pagado){ t.sinPagar+=c.aPagar; if(fonEstado(c)==='venc')t.venc++; } }
  return t;
}

/* ===== el cuadro ===== */
function fonDesdeHTML(){
  var c=fonCfg(), hoy=new Date(), op='<option value="">Todo el año</option>';
  for(var i=-14;i<=2;i++){
    var d=new Date(hoy.getFullYear(),hoy.getMonth()+i,1), k=fonYM(d.getFullYear(),d.getMonth());
    op+='<option value="'+k+'"'+(k===c.desde?' selected':'')+'>'+MONTHS[d.getMonth()]+' '+d.getFullYear()+'</option>';
  }
  return '<label class="fon-cfg-i" title="Los meses anteriores no piden pago (ya los pagabas por fuera de la página)"><span>Desde</span>'
    +'<select class="filt" onchange="fonSetCfg(\'desde\',this.value)">'+op+'</select></label>';
}
function fonTablaHTML(y){
  var cfg=fonCfg(), hay=honNum(cfg.tasa)!=null, t={base:0,calc:0,pag:0};
  var inCfg=function(campo,ph,suf){
    return '<label class="fon-cfg-i"><span>'+(campo==='tasa'?'Tasa':'Mínimo mensual')+'</span><input class="cell-in num" value="'
      +finEsc(numTxt(cfg[campo]))+'" placeholder="'+ph+'" onchange="fonSetCfg(\''+campo+'\',this.value)">'+suf+'</label>';
  };
  var h='<div class="card-head imp-head fon-head"><h3>FONASA '+y+'</h3><div class="fon-cfg">'
    +inCfg('tasa','Ej.: 6','%')+inCfg('minimo','$ por mes','')+fonDesdeHTML()+'</div></div>';
  if(!hay)h+='<div class="venc-aviso">Escribí la <b>tasa</b> (y el <b>mínimo</b>, si corresponde) para que la página calcule el FONASA de cada mes. '
    +'La base es lo facturado sin IVA, por fecha de emisión de la factura.</div>';
  var filas='';
  for(var m=0;m<12;m++){
    var c=fonCalculo(y,m), est=fonEstado(c), A=y+','+m;
    if(c.activo){ if(c.base)t.base+=c.base; if(c.calc)t.calc+=c.calc; }
    if(c.aPagar)t.pag+=c.aPagar;
    var minBtn=(c.minimo==null||c.calc==null||!c.activo)?'<span class="muted-cell">—</span>'
      :'<button class="fon-min'+(c.aplica?' si':'')+'" onclick="fonToggleMin('+A+')" title="'+(c.auto?'El cálculo da menos que el mínimo':'El cálculo supera el mínimo')
        +(c.manual?' · lo elegiste vos':' · sugerido por la página')+'. Tocá para cambiarlo.">'+(c.aplica?'Sí':'No')+'</button>'
        +(c.manual?'<button class="fon-auto" onclick="fonMinAuto('+A+')" title="Volver a lo sugerido">↺</button>':'<span class="fon-sug">auto</span>');
    filas+='<tr'+(c.activo?'':' class="imp-vacio"')+'><td><b>'+MONTHS[m]+'</b></td>'
      +'<td class="num">'+(c.base==null?'<span class="muted-cell" title="Honorarios tiene cargado otro año">—</span>':(c.base?money(c.base):'—'))+'</td>'
      +'<td class="num">'+(c.calc==null||!c.activo?'—':money(c.calc))+'</td>'
      +'<td class="num">'+(c.minimo==null?'—':money(c.minimo))+'</td>'
      +'<td class="fon-min-td">'+minBtn+'</td>'
      +'<td class="num"><b>'+(c.aPagar==null?'—':money(c.aPagar))+'</b></td>'
      +'<td class="imp-venc"><input class="cell-in" type="date"'+FIN_DR+' value="'+finEsc(c.venc)+'" onchange="if(finFechaOk(this))fonSet('+A+',\'venc\',this.value)"></td>'
      +'<td>'+(c.aPagar?'<span class="pill clk imp-'+est+'" onclick="fonTogglePago('+A+')">'+IMP_EST[est]+'</span>':'<span class="muted-cell">—</span>')+'</td>'
      +'<td><input class="cell-in" type="date"'+FIN_DR+' value="'+finEsc(c.fechaPago)+'" onchange="if(finFechaOk(this))fonSet('+A+',\'fechaPago\',this.value)"></td></tr>';
  }
  var tot='<tr class="gst-tot"><td>TOTAL '+y+'</td><td class="num">'+money(t.base)+'</td><td class="num">'+money(t.calc)+'</td><td></td><td></td>'
    +'<td class="num"><b>'+money(t.pag)+'</b></td><td colspan="3"></td></tr>';
  return h+'<div class="table-wrap"><table class="fon-tabla" style="min-width:980px"><thead><tr><th>Mes</th><th class="num">Base (facturado s/IVA)</th>'
    +'<th class="num">Cálculo'+(hay?' · '+numTxt(cfg.tasa)+'%':'')+'</th><th class="num">Mínimo</th><th>Aplica mínimo</th><th class="num">A pagar</th>'
    +'<th class="imp-venc">Vence</th><th>Estado</th><th>Fecha de pago</th></tr></thead><tbody>'+filas+tot+'</tbody></table></div>'
    +'<div class="fin-nota">💡 <b>Aplica mínimo</b> se marca solo cuando el cálculo da menos que el mínimo; si lo cambiás queda el tuyo (↺ vuelve a lo sugerido). '
    +'La fecha de vencimiento sale del calendario de BPS (Servicios Personales, mes siguiente) y se puede corregir. '
    +'<b>Desde</b>: los meses anteriores no piden pago. Lo pendiente y lo pagado aparece también en <b>Gastos</b>.</div>';
}
