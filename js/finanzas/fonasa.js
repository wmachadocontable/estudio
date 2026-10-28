/*
 * FONASA (27/10/2026, pedido de la usuaria) — en Finanzas › Impuestos, como una columna más de la tabla del IVA (28/10).
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

/* ===== en la tabla del IVA (28/10/2026: antes era un cuadro aparte) ===== */
function fonDesdeHTML(){
  var c=fonCfg(), hoy=new Date(), op='<option value="">Todo el año</option>';
  for(var i=-14;i<=2;i++){
    var d=new Date(hoy.getFullYear(),hoy.getMonth()+i,1), k=fonYM(d.getFullYear(),d.getMonth());
    op+='<option value="'+k+'"'+(k===c.desde?' selected':'')+'>'+MONTHS[d.getMonth()]+' '+d.getFullYear()+'</option>';
  }
  return '<label class="fon-cfg-i" title="Los meses anteriores no piden pago (ya los pagabas por fuera de la página)"><span>Desde</span>'
    +'<select class="filt" onchange="fonSetCfg(\'desde\',this.value)">'+op+'</select></label>';
}
// Arriba de la tabla del IVA: tasa, mínimo y desde.
function fonCfgHTML(){
  var cfg=fonCfg();
  var inCfg=function(campo,ph,lbl,suf){
    return '<label class="fon-cfg-i"><span>'+lbl+'</span><input class="cell-in num" value="'+finEsc(numTxt(cfg[campo]))+'" placeholder="'+ph+'"'
      +' onchange="fonSetCfg(\''+campo+'\',this.value)">'+suf+'</label>';
  };
  return '<div class="fon-cfg"><b class="fon-cfg-t">FONASA</b>'+inCfg('tasa','Ej.: 6','Tasa','%')+inCfg('minimo','$ por mes','Mínimo','')+fonDesdeHTML()+'</div>';
}
// Lo de FONASA de los meses de un período (1 en mensual, 2 en bimestral).
function fonDelPeriodo(y,meses){
  var r={total:0,hay:false};
  meses.forEach(function(m){ var c=fonCalculo(y,m); if(c.aPagar){ r.total+=c.aPagar; r.hay=true; } });
  r.total=Math.round(r.total*100)/100; return r;
}
/* La celda FONASA de un renglón de la tabla del IVA: una línea por mes, cada una con su importe, de dónde sale,
   «mín.» Sí/No, su vencimiento de BPS y su propio Pagado (se paga aparte del IVA). */
function fonCeldaHTML(y,meses){
  if(honNum(fonCfg().tasa)==null)return '<span class="muted-cell" title="Escribí la tasa de FONASA arriba de la tabla">—</span>';
  var h='';
  meses.forEach(function(m){
    var c=fonCalculo(y,m), A=y+','+m, ms=MONTHS_SHORT[m];
    if(!c.activo){ h+='<div class="fon-l fon-off"><span class="fon-mes">'+ms+'</span><span class="muted-cell" title="'
      +(fonCfg().desde&&fonYM(y,m)<fonCfg().desde?'Antes de «Desde»: no pide pago':'Todavía sin facturas: el mes no terminó')+'">—</span></div>'; return; }
    var est=fonEstado(c);
    var min=(c.minimo==null||c.calc==null)?''
      :'<button class="fon-min'+(c.aplica?' si':'')+'" onclick="fonToggleMin('+A+')" title="Aplica el mínimo: '+(c.aplica?'Sí':'No')
        +(c.manual?' (lo elegiste vos)':' (sugerido: el cálculo da '+(c.auto?'menos':'más')+' que el mínimo)')+'. Tocá para cambiarlo.">mín. '+(c.aplica?'Sí':'No')+'</button>'
        +(c.manual?'<button class="fon-auto" onclick="fonMinAuto('+A+')" title="Volver a lo sugerido">↺</button>':'');
    var de=c.calc==null?'':numTxt(c.tasa)+' % de '+money(c.base||0)+(c.aplica&&c.minimo!=null?' = '+money(c.calc)+' → mínimo':'');
    h+='<div class="fon-l">'
      +'<div class="fon-l1"><span class="fon-mes">'+ms+'</span><b>'+money(c.aPagar)+'</b>'+min
        +'<span class="pill clk imp-'+est+'" onclick="fonTogglePago('+A+')" title="Tocá para cambiarlo">'+IMP_EST[est]+'</span></div>'
      +'<div class="fon-l2">'+de+'</div>'
      +'<div class="fon-l2">vence <input class="cell-in fon-fecha" type="date"'+FIN_DR+' value="'+finEsc(c.venc)+'" onchange="if(finFechaOk(this))fonSet('+A+',\'venc\',this.value)">'
        +(c.pagado?' · pagado <input class="cell-in fon-fecha" type="date"'+FIN_DR+' value="'+finEsc(c.fechaPago)+'" onchange="if(finFechaOk(this))fonSet('+A+',\'fechaPago\',this.value)">':'')+'</div>'
      +'</div>';
  });
  return h;
}
