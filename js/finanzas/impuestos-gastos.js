/*
 * LOS IMPUESTOS EN GASTOS (27/10/2026, pedido de la usuaria)
 *
 * En Gastos aparecen, como un gasto más, el IVA + IRPF de cada período y el FONASA de cada mes, con la fecha de
 * vencimiento del calendario de DGI / BPS (la que se ve en Impuestos, corregible ahí). NO se copian: se leen de
 * Impuestos cada vez, así que nada se duplica. Marcarlo pagado en Gastos lo marca pagado en Impuestos y al revés.
 *   - Importe: lo que escribió en «IVA a pagar» + IRPF. Si el IVA todavía está vacío, el IVA calculado, con la
 *     etiqueta «estimado» (al marcarlo pagado, el estimado queda como IVA a pagar).
 *   - Un estimado vencido NO se arrastra al mes en curso como «vencido» (solo lo que ella escribió o FONASA).
 * Entran en A pagar / Pagado / Pendiente, en la vista anual (categoría «Impuestos y tasas») y en el Excel.
 */
var IMP_GST_CAT='Impuestos y tasas';

function impGstItems(y){
  var out=[];
  [y-1,y,y+1].forEach(function(a){
    impPeriodos(a).forEach(function(p){
      var f=impFilaPeriodo(a,p.i,false)||null;
      var iva=f?honNum(f.iva):null, irpf=f?(honNum(f.irpf)||0):0;
      var est=iva===null&&p.sugerido>0;
      var imp=Math.round(((iva!==null?iva:(est?p.sugerido:0))+irpf)*100)/100;
      if(!(imp>0))return;
      var venc=(f&&f.venc)||p.venc||'';
      var nom=(irpf?'IVA + IRPF':'IVA')+' · '+p.label+' '+a;
      out.push({id:'imp~per~'+a+'~'+p.i,tipo:'imp',ref:{k:'per',y:a,pi:p.i,sug:p.sugerido},est:est,noArrastre:est,org:'DGI',
        g:{id:'',concepto:nom,cat:IMP_GST_CAT,proveedor:'DGI'},vence:venc,importe:imp,pagado:!!(f&&f.pagado),fechaPago:(f&&f.fechaPago)||'',det:''});
    });
    for(var m=0;m<12;m++){
      var c=fonCalculo(a,m); if(!(c.aPagar>0))continue;
      out.push({id:'imp~fon~'+a+'~'+m,tipo:'imp',ref:{k:'fon',y:a,m:m},est:false,org:'BPS',
        g:{id:'',concepto:'FONASA · '+MONTHS[m]+' '+a,cat:IMP_GST_CAT,proveedor:'BPS'},vence:c.venc,importe:c.aPagar,pagado:c.pagado,fechaPago:c.fechaPago,det:''});
    }
  });
  return out;
}
// Desde Gastos: pagado / pendiente (queda igual en Impuestos).
function impGstToggle(id){
  var p=id.split('~'), y=+p[2], i=+p[3];
  if(p[1]==='fon'){ fonTogglePago(y,i,true); return; }
  var per=impPeriodos(y).find(function(x){ return x.i===i; }), f=impFilaPeriodo(y,i,true);
  if(!f.pagado&&honNum(f.iva)===null&&per&&per.sugerido>0)f.iva=per.sugerido;   // el estimado queda como lo pagado
  f.pagado=!f.pagado; if(f.pagado&&!f.fechaPago)f.fechaPago=finHoy(); if(!f.pagado)f.fechaPago='';
  FinStore.save();
}
function impGstIrA(){ if(typeof setFinSub==='function')setFinSub('imp'); }

// El renglón en la tabla mensual de Gastos (mismas columnas que un gasto).
function impGstFilaHTML(f){
  var t=f.id.replace(/'/g,'');
  var pill=f.pagado
    ?'<span class="pill st-done clk" onclick="gstTogglePago(\'imp\',\''+t+'\')" title="Tocá para marcarlo como pendiente (también en Impuestos)">Pagado</span>'+(f.fechaPago?'<span class="gst-pago">el '+fDate(f.fechaPago)+'</span>':'')
    :(f.vence&&f.vence<finHoy()
      ?'<span class="pill st-venc clk" onclick="gstTogglePago(\'imp\',\''+t+'\')" title="Venció y no está pagado. Tocá para marcarlo como pagado (también en Impuestos)">Vencido</span>'
      :'<span class="pill st-pend clk" onclick="gstTogglePago(\'imp\',\''+t+'\')" title="Tocá para marcarlo como pagado (también en Impuestos)">Pendiente</span>');
  return '<tr class="gst-imp">'
    +'<td style="white-space:nowrap" title="Vencimiento del calendario de '+f.org+' (se corrige en Impuestos)"><span class="gst-fecha">'+(f.vence?fDate(f.vence):'—')+'</span></td>'
    +'<td><div class="name-cell"><span class="gst-ico">🏛</span><b class="gst-nom">'+finEsc(f.g.concepto)+'</b>'
      +'<span class="gst-impchip" title="Viene de Impuestos: no hace falta cargarlo">impuesto · '+f.org+'</span>'
      +(f.est?'<span class="gst-est" title="Todavía no escribiste el IVA a pagar: es el IVA que calculó la página">estimado</span>':'')
      +(f.arrastre?'<span class="gst-venc" title="Venció en un mes anterior y sigue sin pagar">vencido</span>':'')
      +(!f.venceAca&&f.pagoAca?'<span class="gst-otro" title="Vence en otro mes, pero se pagó en este">pagado este mes</span>':'')+'</div></td>'
    +'<td><span class="muted-cell">'+IMP_GST_CAT+'</span></td>'
    +'<td class="num"><b>'+money(f.importe)+'</b></td>'
    +'<td class="num gst-iva"><span class="muted-cell">—</span></td>'
    +'<td>'+pill+'</td>'
    +'<td><div class="row-act"><button class="btn-ghost" title="Ver en Impuestos" onclick="impGstIrA()">↗</button></div></td></tr>';
}
