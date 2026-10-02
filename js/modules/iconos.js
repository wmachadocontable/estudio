/*
 * ÍCONOS (oct. 2026): «De colores» (los emojis de siempre) o «Sobrios» (íconos de línea finos, de un
 * solo color, que acompañan al azul y plata del estudio). Se elige en ⋯ → Personalizar
 * (state.branding.iconos = 'colores' | 'sobrios'). Vale para las tres.
 *
 * Cómo funciona «Sobrios»: después de que se dibuja la página, se cambian los emojis que aparecen
 * en la barra de pestañas, el contenido y las notificaciones por un ícono de línea (los que no
 * están en la lista se ven en gris). NO se toca lo que se escribe (notas, campos, títulos que se
 * pueden editar), ni el clima del saludo. Los datos guardados no cambian: al volver a «De colores»
 * se redibuja todo como antes.
 * Dibujos: trazos simples al estilo de los íconos Lucide (licencia ISC), hechos a mano acá.
 */
const ICO_SVG = (d) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
const ICONOS_LINEA = {
  casa:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  pin:       '<path d="M12 17v5"/><path d="M9 3h6l-1 6 3 4H7l3-4z"/>',
  edificio:  '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  portapapeles:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h6M9 18h3"/>',
  maletin:   '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M3 13h18"/>',
  personas:  '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.5 3.3-5.5 6.5-5.5s5.9 2 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>',
  pesos:     '<path d="M12 2v20"/><path d="M17 6.5c-1-1.2-2.8-2-5-2-2.8 0-4.5 1.4-4.5 3.4 0 4.6 9.5 2.6 9.5 7.3 0 2-1.9 3.6-5 3.6-2.3 0-4.2-.9-5-2.3"/>',
  engranaje: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  recibo:    '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  banco:     '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/>',
  enviar:    '<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  avion:     '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  lupa:      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  tilde:     '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  reloj:     '<path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/>',
  alarma:    '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M5 3 2 6M19 3l3 3"/>',
  calendario:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  nota:      '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  grafico:   '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7"/><rect x="10.5" y="6" width="3" height="12"/><rect x="16" y="13" width="3" height="5"/>',
  campana:   '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  mensaje:   '<path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.1A8 8 0 1 1 21 12z"/>',
  carpeta:   '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  candado:   '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  abierto:   '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  ojo:       '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  paleta:    '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-1.2-1-1.4-1-2.5 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  enlace:    '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  alerta:    '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  idea:      '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  fabrica:   '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  repetir:   '<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="m7 22-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>',
  bajar:     '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  impresora: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><rect x="6" y="14" width="12" height="7"/>',
  lapiz:     '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m14 6 4 4"/>',
  usuario:   '<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6"/>',
  llave:     '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M14 9l2 2"/>',
  estrella:  '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  basura:    '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  sobre:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  globo:     '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'
};
// Emoji → ícono de línea.
const EMOJI_A_ICONO = {
  '🏠':'casa','📌':'pin','🏢':'edificio','📋':'portapapeles','💼':'maletin','👥':'personas','💲':'pesos','💰':'pesos','💵':'pesos',
  '⚙':'engranaje','🧾':'recibo','🏛':'banco','📤':'enviar','✈':'avion','🔎':'lupa','🔍':'lupa','✅':'tilde','⏳':'reloj','⌛':'reloj',
  '⏰':'alarma','📅':'calendario','📆':'calendario','📝':'nota','🗒':'nota','📄':'nota','📊':'grafico','📈':'grafico','🔔':'campana',
  '💬':'mensaje','💭':'mensaje','📁':'carpeta','📂':'carpeta','🔒':'candado','🔐':'candado','🔓':'abierto','👁':'ojo','🎨':'paleta',
  '🔗':'enlace','⚠':'alerta','💡':'idea','🏭':'fabrica','🔁':'repetir','⬇':'bajar','🖨':'impresora','✏':'lapiz','✎':'lapiz',
  '👤':'usuario','🔧':'engranaje','🛠':'engranaje','🔑':'llave','⭐':'estrella','★':'estrella','🗑':'basura','📧':'sobre','✉':'sobre','🌐':'globo','🏦':'banco','📦':'carpeta'
};
const ICONOS_OPCIONES = [
  { id: 'colores', label: 'De colores', desc: 'Los emojis de siempre.' },
  { id: 'sobrios', label: 'Sobrios',    desc: 'Íconos de línea finos, de un solo color.' }
];
function iconosEstilo() { const v = state && state.branding && state.branding.iconos; return v === 'sobrios' ? 'sobrios' : 'colores'; }

const ICO_EMOJI_RE = /(\p{Extended_Pictographic}(?:️|︎)?(?:‍\p{Extended_Pictographic}(?:️|︎)?)*)/gu;
const ICO_NO_TOCAR = '[contenteditable],input,textarea,select,option,script,style,[data-edit],.sticky-content,.saludo-ico, .saludo-ico2,.panel-icon,.header-panel-presence,.ico-l,.ico-gris,.no-iconos';

function iconoDeEmoji(e) {
  const base = e.replace(/[️︎]/g, '');
  const k = EMOJI_A_ICONO[base];
  return k ? '<span class="ico-l" data-e="' + base + '">' + ICO_SVG(ICONOS_LINEA[k]) + '</span>' : '<span class="ico-gris">' + e + '</span>';
}
function iconosAplicarEn(raiz) {
  if (!raiz || iconosEstilo() !== 'sobrios') return;
  const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.nodeValue || !ICO_EMOJI_RE.test(n.nodeValue)) { ICO_EMOJI_RE.lastIndex = 0; return NodeFilter.FILTER_REJECT; }
      ICO_EMOJI_RE.lastIndex = 0;
      const p = n.parentElement;
      return (p && !p.closest(ICO_NO_TOCAR)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodos = []; while (w.nextNode()) nodos.push(w.currentNode);
  nodos.forEach(n => {
    const html = n.nodeValue.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(ICO_EMOJI_RE, iconoDeEmoji);
    const t = document.createElement('template'); t.innerHTML = html;
    n.parentNode.replaceChild(t.content, n);
  });
}
let _icoPendiente = false;
function iconosAplicar() {
  if (iconosEstilo() !== 'sobrios' || _icoPendiente) return;
  _icoPendiente = true;
  requestAnimationFrame(() => {
    _icoPendiente = false;
    ['nav-tabs', 'main-content', 'notif-panel', 'header-panels'].forEach(id => iconosAplicarEn(document.getElementById(id)));
    document.querySelectorAll('.modal-overlay.open .modal h3, .header-menu-dropdown').forEach(iconosAplicarEn);
  });
}
// Cada vez que algo se redibuja, se vuelven a cambiar los emojis (solo en modo «Sobrios»).
(function () {
  const obs = new MutationObserver(() => iconosAplicar());
  const mirar = () => ['nav-tabs', 'main-content', 'notif-panel', 'header-panels'].forEach(id => {
    const el = document.getElementById(id); if (el) obs.observe(el, { childList: true, subtree: true });
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mirar); else mirar();
  document.addEventListener('click', () => setTimeout(iconosAplicar, 0), true);
})();
function setIconos(v) {
  if (!state.branding) state.branding = {};
  state.branding.iconos = v;
  saveState();
  document.body.classList.toggle('iconos-sobrios', v === 'sobrios');
  // Volver a dibujar todo desde los datos (así vuelven los emojis si se eligió «De colores»).
  renderTabs(); renderContent();
  if (typeof pintarAparienciaCustom === 'function') pintarAparienciaCustom();
  iconosAplicar();
}

// apariencia.js carga antes que este archivo: se vuelve a aplicar ahora que existen los íconos.
if (typeof aplicarApariencia === 'function') aplicarApariencia();
