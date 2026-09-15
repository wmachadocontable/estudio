

/* ============================================================
   MÓDULO HONORARIOS (pesos uruguayos) — integrado a W. Machado
   - IVA 22% solo cuando la celda tiene N° de factura
   - Pestaña visible/editable únicamente por el usuario "Wendy"
   ============================================================ */
(function(){
  if (window.__HON_LOADED__) return; window.__HON_LOADED__ = true;

  const HON_SEED = {"clients":[{"name":"Sergio Ayala ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-19","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-19","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Sebastian Bordenave ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-19","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-13","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-21","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-21","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"Miguel Yavarone ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-14","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-23","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-17","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-21","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Luis Rondeau ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-21","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-20","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-19","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Yoana Vieito ($ 2.200)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Daiana Machado ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-01-03","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-06","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-07","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-07","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-04","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Alexandra Dutra ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-18","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-20","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-23","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Fernando","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Wendy","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Bolis","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Victoria Cordero VICA ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-03","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-11","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-17","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-21","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Soledad Martinez ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-03","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-04","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-08","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-05","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Lucia Techeira ($ 2.500)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Rosangela Meneses ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-06","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-07","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-09","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-08","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Marcelo Roman ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-24","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-24","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-21","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Florencia de Leon ($ 2.500)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-05-13","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Alejandro Gomez - Chiche ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"SD Cilvia Lavadie ($ 1.100)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"SD Diego Gonzalez ($ 1.500 canje por cartas)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"SD Soledad Martinez ($ 1.200)","months":[{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-02-03","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-03-04","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-04-08","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-05-05","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"SD Freddy Pereira ($ 1.200)","months":[{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-02-25","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-03-11","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"SD Ruben Nuñez ($ 1.500)","months":[{"sinIva":1500.0,"factura":"","recibo":"","fecha":"2026-02-11","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"2026-03-17","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"2026-04-13","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"2026-05-13","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":1500.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"SD Noelia Bejerez ($ 1.200)","months":[{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-01-30","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-02-26","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-03-30","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"2026-04-30","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":1200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Nahir Hernandez ($ 800)","months":[{"sinIva":800.0,"factura":"","recibo":"","fecha":"2026-02-21","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"2026-03-26","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"2026-03-26","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"2026-05-19","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}},{"sinIva":800.0,"factura":"","recibo":"","fecha":"","medio":"Abitab","extra":{}}]},{"name":"Cesar do Canto ($ 1.000)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":1000.0,"factura":"","recibo":"","fecha":"2026-04-14","medio":"Efectivo","extra":{}},{"sinIva":1000.0,"factura":"","recibo":"","fecha":"2026-04-14","medio":"Efectivo","extra":{}},{"sinIva":1000.0,"factura":"","recibo":"","fecha":"2026-05-20","medio":"Efectivo","extra":{}},{"sinIva":1000.0,"factura":"","recibo":"","fecha":"2026-05-20","medio":"Efectivo","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Metalurgica Freddy Pereira ($ 10.000)","months":[{"sinIva":10000.0,"factura":"215","recibo":"","fecha":"2026-02-25","medio":"Scotiabank","extra":{}},{"sinIva":12200.0,"factura":"231","recibo":"","fecha":"2026-03-11","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"244","recibo":"","fecha":"2026-04-16","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Andres Pereira ($ 7.000)","months":[{"sinIva":7000.0,"factura":"","recibo":"","fecha":"2026-02-09","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"2026-03-09","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"2026-04-10","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"2026-05-12","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Lucas Dos Santos ($ 4.200)","months":[{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":4200.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"El Rastro ($ 7.400)","months":[{"sinIva":7400.0,"factura":"","recibo":"","fecha":"2026-03-11","medio":"Scotiabank","extra":{}},{"sinIva":2100.0,"factura":"","recibo":"","fecha":"2026-03-11","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7400.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Yury free shop - Lumien Ltda","months":[{"sinIva":20956.42,"factura":"214","recibo":"","fecha":"2026-02-18","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"230","recibo":"","fecha":"2026-03-20","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"243","recibo":"","fecha":"2026-04-15","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"2026-05-27","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20956.42,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Javier Machado ($ 7.800)","months":[{"sinIva":7800.0,"factura":"","recibo":"","fecha":"2026-02-12","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"2026-04-15","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"2026-05-22","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Lucas Vandes - VANDFOR ($ 20.000)","months":[{"sinIva":20000.0,"factura":"","recibo":"","fecha":"2026-01-30","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"2026-03-02","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"2026-04-30","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"2026-05-08","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":20000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Residencial Buenos Tiempos ($ 8.900)","months":[{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-02-07","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-03-10","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-04-11","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-05-12","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Residencial Galauru SAS ($ 8.900)","months":[{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-02-09","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-03-09","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-04-15","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"2026-05-08","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":8900.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"MedWork ($ 2.500)","months":[{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-14","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Paulinho ($ 2.100)","months":[{"sinIva":2100.0,"factura":"","recibo":"","fecha":"2026-02-18","medio":"Scotiabank","extra":{}},{"sinIva":2100.0,"factura":"","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":2100.0,"factura":"","recibo":"","fecha":"2026-04-21","medio":"Scotiabank","extra":{}},{"sinIva":2100.0,"factura":"","recibo":"","fecha":"2026-05-19","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Claudia Marquez ($ 2.100)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":6000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Marcia Machado ($ 2.500)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-02-09","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"2026-04-09","medio":"Efectivo","extra":{}},{"sinIva":2600.0,"factura":"","recibo":"","fecha":"2026-05-09","medio":"Efectivo","extra":{}},{"sinIva":2400.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}},{"sinIva":2500.0,"factura":"","recibo":"","fecha":"","medio":"Efectivo","extra":{}}]},{"name":"Claudio Vandes ($ 53.000)","months":[{"sinIva":53000.0,"factura":"","recibo":"","fecha":"2026-03-17","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":53000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"Claudio y Hugo ($ 15.000)","months":[{"sinIva":15000.0,"factura":"","recibo":"","fecha":"2026-02-13","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"2026-03-10","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"2026-04-14","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"2026-05-12","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":15000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"Drones del Pampa SAS ($ 7.000)","months":[{"sinIva":7000.0,"factura":"213","recibo":"","fecha":"2026-02-13","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"229","recibo":"","fecha":"2026-03-10","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"242","recibo":"","fecha":"2026-04-14","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"2026-05-12","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":7000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"Gualberto Segui ($ 21.944)","months":[{"sinIva":21944.0,"factura":"205","recibo":"","fecha":"2026-01-22","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"218","recibo":"","fecha":"2026-02-26","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"234","recibo":"","fecha":"2026-03-26","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"247","recibo":"","fecha":"2026-04-16","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"2026-05-19","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":21944.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}}]},{"name":"Monica Perez ($ 4.000 + IVA)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":3934.0,"factura":"","recibo":"","fecha":"2026-05-04","medio":"BBVA","extra":{}},{"sinIva":4000.0,"factura":"","recibo":"","fecha":"","medio":"BBVA","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Richard Machado ($ 4.000)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Filjo SRL ($ 10.000)","months":[{"sinIva":10000.0,"factura":"216","recibo":"","fecha":"2026-03-16","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"232","recibo":"","fecha":"2026-03-20","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"245","recibo":"","fecha":"2026-05-01","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"2026-05-23","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":10000.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Fabio de la Rosa ($ 7.800)","months":[{"sinIva":7800.0,"factura":"217","recibo":"","fecha":"2026-02-12","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"233","recibo":"","fecha":"2026-03-09","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"246","recibo":"","fecha":"2026-04-13","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"2026-05-12","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}},{"sinIva":7800.0,"factura":"","recibo":"","fecha":"","medio":"Scotiabank","extra":{}}]},{"name":"Gino Duarte Construcciones ($ 11.000)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":11000.0,"factura":"248","recibo":"","fecha":"2026-04-10","medio":"Scotiabank","extra":{}},{"sinIva":11000.0,"factura":"","recibo":"","fecha":"2026-05-09","medio":"Scotiabank","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]},{"name":"Mauricio Rodriguez ($ 11.000)","months":[{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}},{"sinIva":null,"factura":"","recibo":"","fecha":"","medio":"","extra":{}}]}]};
  const HON_METHODS = ['Scotiabank','BBVA','Abitab','Efectivo'];
  const HON_TAB_ID = 'tab_1780081397523';
  const HON_OWNER = 'Wendy';

  function honDefaults(){ return { taxRate:0.22, methods: HON_METHODS.slice(), extraCols:[], colors:{} }; }

  // ---------- helpers ----------
  function honMoney(n, withSign){
    if (n===null || n===undefined || n==='' || isNaN(Number(n))) return '';
    let v = Math.round(Number(n)*100)/100;
    const hasFrac = Math.abs(v - Math.trunc(v)) > 0.005;
    let s = (hasFrac ? v.toFixed(2) : Math.round(v).toString());
    let parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (withSign===false?'':'$ ') + parts[0] + (parts[1]?(','+parts[1]):'');
  }
  function honEsc(s){ return (typeof bbEscape==='function') ? bbEscape(s) : String(s==null?'':s); }
  function honToast(m){ if(typeof toast==='function') toast(m); }
  function honSave(){ if(typeof saveState==='function') saveState(); }
  function honTaxRate(hd){ return (typeof hd.taxRate==='number')?hd.taxRate:0.22; }

  // IVA SOLO si la celda tiene N° de factura
  function honHasIva(cell){ return !!(cell && cell.factura && String(cell.factura).trim()!==''); }
  function honIvaNum(sin, rate, hasFac){ if(sin===null||sin===undefined||sin===''||isNaN(Number(sin))) return 0; return hasFac ? Math.round(Number(sin)*rate*100)/100 : 0; }
  function honIva(cell, hd){ return honIvaNum(cell?cell.sinIva:null, honTaxRate(hd), honHasIva(cell)); }
  function honTotal(cell, hd){ const sin=cell?cell.sinIva:null; if(sin===null||sin===undefined||sin===''||isNaN(Number(sin))) return 0; return Math.round((Number(sin)+honIva(cell,hd))*100)/100; }

  function honYear(tab){ return parseInt(tab.tabYear || (state.branding&&state.branding.year) || new Date().getFullYear(),10); }

  function honStatus(cell, monthIdx, year){
    const sin = cell ? cell.sinIva : null;
    if (sin===null || sin===undefined || sin==='' || Number(sin)===0) return 'na';
    if (cell && cell.fecha) return 'paid';
    const monthEnd = new Date(year, monthIdx+1, 0, 23, 59, 59);
    if (new Date() > monthEnd) return 'late';
    return 'pending';
  }
  const HON_ST = {
    paid:    {label:'Pagado',    cls:'hon-pill hon-paid'},
    pending: {label:'Pendiente', cls:'hon-pill hon-pending'},
    late:    {label:'Atrasado',  cls:'hon-pill hon-late'},
    na:      {label:'—',         cls:'hon-na'}
  };

  // ---------- reparación SEGURA (NO siembra, NO guarda nunca) ----------
  // IMPORTANTE: esta función jamás crea la pestaña ni llama a saveState.
  // La pestaña Honorarios vive como dato en el estado (se importa una vez).
  // Acá solo reparamos sub-campos faltantes en memoria, y SIEMPRE devolvemos
  // false para no disparar ningún guardado automático al abrir la página.
  window.ensureHonorarios = function(){
    if (!state || !state.tabs) return false;
    var tab = state.tabs.find(function(t){return t.id===HON_TAB_ID;});
    if (!tab) tab = state.tabs.find(function(t){return t.type==='honorarios';});
    if (!tab || tab.type!=='honorarios' || !tab.honData) return false; // no existe → no hacemos nada
    var hd = tab.honData;
    if (typeof hd.taxRate!=='number') hd.taxRate=0.22;
    if (!Array.isArray(hd.methods)) hd.methods = HON_METHODS.slice();
    if (!Array.isArray(hd.extraCols)) hd.extraCols=[];
    if (!hd.colors || typeof hd.colors!=='object') hd.colors={};
    (hd.clients||[]).forEach(function(c){
      if (!c.id) c.id='hc_'+Math.random().toString(36).slice(2,9);
      if (!Array.isArray(c.months)) c.months=[];
      while(c.months.length<12) c.months.push({sinIva:null,factura:'',recibo:'',fecha:'',medio:'',extra:{}});
      c.months.forEach(function(m){ if(!m.extra) m.extra={}; if(m.sinIva==='') m.sinIva=null; });
    });
    // ── Permisos: el acceso a Honorarios lo gobierna el módulo (solo Wendy).
    //    Si la pestaña quedó "protegida con contraseña" (eso la mostraba a todos y
    //    a la vez bloqueaba el ingreso de Wendy), lo neutralizamos y la dejamos como
    //    privada de Wendy. Solo en memoria; NO se guarda nada en la base.
    if (tab.privacy === 'private_password' || tab.passwordHash) {
      tab.privacy = 'private_user';
      tab.privateOwners = [HON_OWNER];
      try { delete tab.passwordHash; } catch(e){}
    }
    return false; // <- NUNCA forzamos guardado
  };

  // ---------- acceso estricto: SOLO Wendy ----------
  function honIsHonTab(t){ return !!t && (t.type==='honorarios' || t.id===HON_TAB_ID); }
  function honCurName(){ try{ var me=(typeof currentUser==='function')?currentUser():null; return (me&&me.name)?String(me.name):''; }catch(e){ return ''; } }
  function honIsOwner(){ return honCurName().trim().toLowerCase() === HON_OWNER.toLowerCase(); }
  if (typeof userCanSeeTab==='function'){ const _s=userCanSeeTab; userCanSeeTab=function(t){ if(honIsHonTab(t)) return honIsOwner(); return _s(t); }; }
  if (typeof userCanEnterTab==='function'){ const _e=userCanEnterTab; userCanEnterTab=function(t){ if(honIsHonTab(t)) return honIsOwner(); return _e(t); }; }

  // ---------- per-user view prefs ----------
  function honView(tabId){ return (userPrefs.honView && userPrefs.honView[tabId]) || 'month'; }
  function setHonView(tabId,v){ if(!userPrefs.honView) userPrefs.honView={}; userPrefs.honView[tabId]=v; if(typeof saveUserPrefs==='function') saveUserPrefs(); renderContent(); }
  function honMonth(tabId){ const m=(userPrefs.honMonth&&userPrefs.honMonth[tabId]); return (m===undefined)? (new Date()).getMonth() : m; }
  function setHonMonth(tabId,m){ if(!userPrefs.honMonth) userPrefs.honMonth={}; userPrefs.honMonth[tabId]=m; if(typeof saveUserPrefs==='function') saveUserPrefs();
    const tab=state.tabs.find(t=>t.id===tabId); const mc=document.getElementById('main-content');
    if(tab&&mc){ mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honScrollToSelected(tab); } }
  function honSel(tabId){ return (userPrefs.honSel&&userPrefs.honSel[tabId])||null; }
  function setHonSel(tabId,cid){ if(!userPrefs.honSel) userPrefs.honSel={}; userPrefs.honSel[tabId]=cid; if(typeof saveUserPrefs==='function') saveUserPrefs(); }
  function honScrollToSelected(tab){ const cid=honSel(tab.id); if(!cid) return; const el=document.querySelector('.hon-row[data-cid="'+cid+'"]'); if(el){ el.scrollIntoView({block:'center',behavior:'smooth'}); } }

  // ---------- RENDER ----------
  // ---------- búsqueda y archivado ----------
  function honSearch(tabId){ return (userPrefs.honSearch && userPrefs.honSearch[tabId]) || ''; }
  function setHonSearchVal(tabId,v){ if(!userPrefs.honSearch) userPrefs.honSearch={}; userPrefs.honSearch[tabId]=v; }
  function honShowArch(tabId){ return !!(userPrefs.honShowArch && userPrefs.honShowArch[tabId]); }
  function setHonShowArch(tabId,v){ if(!userPrefs.honShowArch) userPrefs.honShowArch={}; userPrefs.honShowArch[tabId]=v; if(typeof saveUserPrefs==='function') saveUserPrefs();
    const tab=state.tabs.find(t=>t.id===tabId); const mc=document.getElementById('main-content');
    if(tab&&mc){ mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); } }
  function honMatchesSearch(c,q){ if(!q) return true; return String(c.name||'').toLowerCase().indexOf(String(q).toLowerCase())>=0; }
  // ¿archivado a la altura de (year, monthIdx)? Oculto desde el mes de corte en adelante.
  function honArchivedAt(c, year, m){
    if(!c.archivedFrom) return false;
    var p=String(c.archivedFrom).split('-'); if(p.length<2) return false;
    var AY=parseInt(p[0],10), AM=parseInt(p[1],10)-1;
    return (year>AY) || (year===AY && m>=AM);
  }
  function honArchLabel(c){ if(!c.archivedFrom) return ''; var p=String(c.archivedFrom).split('-'); return (p.length<2)?'' : (MONTHS_SHORT[Math.max(0,parseInt(p[1],10)-1)]+'/'+p[0]); }
  window.honArchiveClient=function(tabId,cid){
    var tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    var c=tab.honData.clients.find(x=>x.id===cid); if(!c)return;
    var year=honYear(tab); var mi=honMonth(tabId);
    var msg='Archivar a "'+c.name+'" desde '+MONTHS[mi]+' '+year+'.\n\nNo aparecerá en la lista mensual de '+MONTHS[mi]+' en adelante. Los meses anteriores lo siguen mostrando, y podés desarchivarlo cuando quieras.\n\n¿Confirmás?';
    if(!confirm(msg)) return;
    c.archivedFrom = year+'-'+String(mi+1).padStart(2,'0');
    honSave(); try{closeModal('modal-hon');}catch(e){}
    var mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('📦 Cliente archivado desde '+MONTHS_SHORT[mi]+'/'+year);
  };
  window.honUnarchiveClient=function(tabId,cid){
    var tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    var c=tab.honData.clients.find(x=>x.id===cid); if(!c)return;
    delete c.archivedFrom;
    honSave(); try{closeModal('modal-hon');}catch(e){}
    var mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Cliente desarchivado');
  };
  window.honToggleArch=function(tabId,checked){ setHonShowArch(tabId, !!checked); };

  window.renderHonorarios = function(tab){
    const hd = tab.honData; const year = honYear(tab); const view = honView(tab.id);
    const baseY = parseInt((state.branding&&state.branding.year))||new Date().getFullYear();
    const yearOpts=[]; for(let y=baseY-3;y<=baseY+10;y++) yearOpts.push(y);
    const colorStyle = (hd.colors&&hd.colors.accent)?(' style="--ho-accent:'+honEsc(hd.colors.accent)+';"'):'';
    let h = '<div class="hon-wrap"'+colorStyle+'>';
    h += '<div class="section-header">';
    h +=   '<div class="section-title editable-title" data-edit="tab.name" data-tab-id="'+tab.id+'">'+honEsc(tab.name)+' <span>'+year+'</span></div>';
    h +=   '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">';
    h +=     '<select class="hon-yearsel" onchange="setTabYear(\''+tab.id+'\', this.value)" title="Año">'+yearOpts.map(y=>'<option value="'+y+'"'+(String(y)===String(year)?' selected':'')+'>'+y+'</option>').join('')+'</select>';
    h +=     '<div class="hon-viewsw" title="Modo de visualización">';
    h +=       '<button class="hon-vopt'+(view==='month'?' active':'')+'" onclick="window.honSetView(\''+tab.id+'\',\'month\')">📅 Mensual</button>';
    h +=       '<button class="hon-vopt'+(view==='year'?' active':'')+'" onclick="window.honSetView(\''+tab.id+'\',\'year\')">📆 Anual</button>';
    h +=     '</div>';
    h +=     '<div class="legend"><div class="legend-item"><div class="legend-dot" style="background:var(--c-green)"></div> Pagado</div>'+
             '<div class="legend-item"><div class="legend-dot" style="background:var(--c-pending)"></div> Pendiente</div>'+
             '<div class="legend-item"><div class="legend-dot" style="background:var(--c-red)"></div> Atrasado</div></div>';
    h +=     '<button class="btn btn-gold" onclick="window.honAddClient(\''+tab.id+'\')">+ Cliente</button>';
    h +=     '<button class="btn btn-outline btn-sm" onclick="window.honAddCol(\''+tab.id+'\')">+ Columna</button>';
    h +=     '<button class="btn btn-outline btn-sm" onclick="window.honColors(\''+tab.id+'\')">🎨 Colores</button>';
    if (typeof tabPrivacyButton==='function'){ h += tabPrivacyButton(tab); }
    h +=   '</div></div>';
    h += (view==='month') ? renderHonMonth(tab, hd, year) : renderHonYear(tab, hd, year);
    h += honModalMarkup();
    h += '</div>';
    return h;
  };

  function honStatsBar(rows, hd, year){
    let fact=0, cobr=0, atr=0, np=0, natr=0, npend=0;
    rows.forEach(r=>{
      const st = honStatus(r.cell, r.m, year); if (st==='na') return;
      const tot = honTotal(r.cell, hd); fact += tot;
      if (st==='paid'){ cobr+=tot; np++; } else if (st==='late'){ atr+=tot; natr++; } else { npend++; }
    });
    const pct = fact>0 ? Math.round(cobr/fact*100):0;
    return '<div class="stats-bar">'+
      '<div class="stat-card"><div class="stat-num">'+honMoney(fact)+'</div><div class="stat-label">Total a cobrar</div></div>'+
      '<div class="stat-card green"><div class="stat-num">'+honMoney(cobr)+'</div><div class="stat-label">Cobrado · '+np+'</div></div>'+
      '<div class="stat-card red"><div class="stat-num">'+honMoney(atr)+'</div><div class="stat-label">Atrasado · '+natr+'</div></div>'+
      '<div class="stat-card"><div class="stat-num">'+pct+'%</div><div class="stat-label">Cobrado · '+npend+' pend.</div></div>'+
      '</div>';
  }

  function renderHonMonth(tab, hd, year){
    const mi = honMonth(tab.id); const selId = honSel(tab.id);
    const q = honSearch(tab.id); const showArch = honShowArch(tab.id);
    let h='<div class="hon-toolbar">';
    h += '<div class="hon-searchwrap"><span class="hon-search-ico">🔎</span><input type="text" id="hon-search" class="hon-search" placeholder="Buscar cliente…" value="'+honEsc(q)+'" autocomplete="off"><span class="hon-search-clear" id="hon-search-clear" title="Limpiar">×</span></div>';
    h += '<label class="hon-archtoggle"><input type="checkbox" '+(showArch?'checked':'')+' onchange="window.honToggleArch(\''+tab.id+'\',this.checked)"> Ver archivados</label>';
    h += '</div>';
    h += '<div class="month-filter">';
    h += MONTHS_SHORT.map((m,i)=>'<button class="month-btn'+(i===mi?' active':'')+'" onclick="window.honSetMonth(\''+tab.id+'\','+i+')">'+m+'</button>').join('');
    h += '</div>';
    // filtrar por archivado (para totales y filas). La búsqueda se aplica visualmente luego.
    const visible = hd.clients.filter(c=>{ const arch=honArchivedAt(c,year,mi); return showArch ? true : !arch; });
    const rowsData = visible.filter(c=>!honArchivedAt(c,year,mi)).map(c=>({client:c, m:mi, cell:c.months[mi]}));
    h += honStatsBar(rowsData, hd, year);
    h += '<div class="table-wrap"><table class="hon-table"><thead><tr>';
    h += '<th>Empresa</th><th>Honorarios</th><th>IVA 22%</th><th>Total</th><th>N° Factura</th><th>Recibo</th><th>Fecha pago</th><th>Medio</th><th>Estado</th>';
    hd.extraCols.forEach(col=>{ h += '<th><span>'+honEsc(col.name)+'</span><span class="col-x" onclick="window.honDelCol(\''+tab.id+'\',\''+col.id+'\')">×</span></th>'; });
    h += '</tr></thead><tbody>';
    let tSin=0,tIva=0,tTot=0;
    visible.forEach((c)=>{
      const archHere = honArchivedAt(c,year,mi);
      const cell=c.months[mi]; const st=honStatus(cell,mi,year);
      const hasIva=honHasIva(cell); const sin=cell.sinIva; const iva=honIva(cell,hd); const tot=honTotal(cell,hd);
      if(!archHere && st!=='na'){ tSin+=Number(sin); tIva+=iva; tTot+=tot; }
      const sel = (selId===c.id)?' hon-selected':'';
      const stObj=HON_ST[st];
      const ed='onclick="window.honEdit(\''+tab.id+'\',\''+c.id+'\','+mi+')"';
      const archBadge = c.archivedFrom?(' <span class="hon-arch-badge" title="Archivado desde '+honArchLabel(c)+'">📦</span>'):'';
      h += '<tr class="hon-row'+sel+(archHere?' hon-archived':'')+'" data-cid="'+c.id+'" data-name="'+honEsc(String(c.name||'').toLowerCase())+'">';
      h +=   '<td class="hon-name" onclick="window.honOpenClient(\''+tab.id+'\',\''+c.id+'\')" ondblclick="event.stopPropagation();window.honRenameClient(\''+tab.id+'\',\''+c.id+'\')" title="Clic: editar nombre e importes · Doble clic: renombrar">'+honEsc(c.name)+archBadge+'<span class="hon-edit-name" onclick="event.stopPropagation();window.honRenameClient(\''+tab.id+'\',\''+c.id+'\')" title="Renombrar">✎</span><span class="row-x" onclick="event.stopPropagation();window.honDelClient(\''+tab.id+'\',\''+c.id+'\')">×</span></td>';
      if(archHere){
        h += '<td class="hon-num"></td><td class="hon-num hon-muted"></td><td class="hon-num"></td><td></td><td></td><td></td><td></td><td><span class="hon-pill hon-archpill" onclick="window.honUnarchiveClient(\''+tab.id+'\',\''+c.id+'\')" title="Clic para desarchivar">📦 Archivado</span></td>';
        hd.extraCols.forEach(()=>{ h+='<td></td>'; });
      } else {
        h +=   '<td class="hon-num" '+ed+'>'+(st==='na'?'<span class="hon-na">—</span>':honMoney(sin))+'</td>';
        h +=   '<td class="hon-num hon-muted" '+ed+'>'+(st==='na'?'':(hasIva?honMoney(iva):'<span class="hon-na" title="Sin factura: no corresponde IVA">—</span>'))+'</td>';
        h +=   '<td class="hon-num hon-total" '+ed+'>'+(st==='na'?'':'<strong>'+honMoney(tot)+'</strong>')+'</td>';
        h +=   '<td '+ed+'>'+(cell.factura?honEsc(cell.factura):'<span class="hon-add">+ N°</span>')+'</td>';
        h +=   '<td '+ed+'>'+(cell.recibo?('<span class="hon-recibo">🧾 '+honEsc(cell.recibo)+'</span>'):'<span class="hon-add">+ recibo</span>')+'</td>';
        h +=   '<td '+ed+'>'+(cell.fecha?honFmtDate(cell.fecha):'<span class="hon-add">+ fecha</span>')+'</td>';
        h +=   '<td '+ed+'>'+(cell.medio?('<span class="hon-medio">'+honEsc(cell.medio)+'</span>'):'<span class="hon-add">—</span>')+'</td>';
        h +=   '<td '+ed+'><span class="'+stObj.cls+'">'+stObj.label+'</span></td>';
        hd.extraCols.forEach(col=>{ const v=cell.extra?cell.extra[col.id]:''; h+='<td '+ed+'>'+(v?honEsc(v):'<span class="hon-add">+</span>')+'</td>'; });
      }
      h += '</tr>';
    });
    h += '<tr class="hon-noresults" style="display:none;"><td colspan="'+(9+hd.extraCols.length)+'" style="text-align:center;color:var(--c-text-muted);padding:18px;">Sin resultados para la búsqueda.</td></tr>';
    h += '</tbody><tfoot><tr class="hon-foot"><td>TOTAL · '+MONTHS[mi]+'</td><td>'+honMoney(tSin)+'</td><td>'+honMoney(tIva)+'</td><td>'+honMoney(tTot)+'</td><td colspan="'+(5+hd.extraCols.length)+'"></td></tr></tfoot></table></div>';
    h += '<p class="hon-hint">💡 El IVA 22% se calcula únicamente cuando la fila tiene N° de factura. Sin factura, el importe queda tal cual. El estado pasa a <strong>Atrasado</strong> solo si el mes terminó sin fecha de pago. Para archivar un cliente, abrilo (clic en el nombre) y usá <strong>📦 Archivar</strong>.</p>';
    return h;
  }

  function renderHonYear(tab, hd, year){
    const q = honSearch(tab.id);
    let h='<div class="hon-toolbar">';
    h += '<div class="hon-searchwrap"><span class="hon-search-ico">🔎</span><input type="text" id="hon-search" class="hon-search" placeholder="Buscar cliente…" value="'+honEsc(q)+'" autocomplete="off"><span class="hon-search-clear" id="hon-search-clear" title="Limpiar">×</span></div>';
    h += '</div>';
    const all=[]; hd.clients.forEach(c=>c.months.forEach((cell,m)=>{ if(!honArchivedAt(c,year,m)) all.push({client:c,m,cell}); }));
    h += honStatsBar(all, hd, year);
    h += '<div class="table-wrap"><table class="hon-table hon-year"><thead><tr><th>Empresa</th>';
    MONTHS_SHORT.forEach(m=> h+='<th>'+m+'</th>'); h += '<th class="hon-yearcol">Total año</th></tr></thead><tbody>';
    const monthTotals=new Array(12).fill(0); let grand=0;
    hd.clients.forEach(c=>{
      let cyear=0;
      const archBadge = c.archivedFrom?(' <span class="hon-arch-badge" title="Archivado desde '+honArchLabel(c)+'">📦</span>'):'';
      h += '<tr class="hon-row" data-cid="'+c.id+'" data-name="'+honEsc(String(c.name||'').toLowerCase())+'">';
      h += '<td class="hon-name" onclick="window.honOpenClient(\''+tab.id+'\',\''+c.id+'\')" ondblclick="event.stopPropagation();window.honRenameClient(\''+tab.id+'\',\''+c.id+'\')" title="Clic: editar · Doble clic: renombrar">'+honEsc(c.name)+archBadge+'<span class="hon-edit-name" onclick="event.stopPropagation();window.honRenameClient(\''+tab.id+'\',\''+c.id+'\')" title="Renombrar">✎</span><span class="row-x" onclick="event.stopPropagation();window.honDelClient(\''+tab.id+'\',\''+c.id+'\')">×</span></td>';
      c.months.forEach((cell,m)=>{
        if(honArchivedAt(c,year,m)){ h += '<td class="hon-yc arch" title="'+MONTHS[m]+' · archivado">·</td>'; return; }
        const st=honStatus(cell,m,year); const tot=honTotal(cell,hd);
        if(st!=='na'){ cyear+=tot; monthTotals[m]+=tot; }
        const cls = st==='paid'?'hon-yc paid':(st==='late'?'hon-yc late':(st==='pending'?'hon-yc pending':'hon-yc na'));
        h += '<td class="'+cls+'" onclick="window.honEdit(\''+tab.id+'\',\''+c.id+'\','+m+')" title="'+MONTHS[m]+' · '+HON_ST[st].label+(honHasIva(cell)?' · c/IVA':'')+'">'+(st==='na'?'·':honMoney(tot,false))+'</td>';
      });
      grand+=cyear;
      h += '<td class="hon-yearcol"><strong>'+honMoney(cyear)+'</strong></td></tr>';
    });
    h += '<tr class="hon-noresults" style="display:none;"><td colspan="14" style="text-align:center;color:var(--c-text-muted);padding:18px;">Sin resultados para la búsqueda.</td></tr>';
    h += '</tbody><tfoot><tr class="hon-foot"><td>TOTAL</td>';
    monthTotals.forEach(t=> h+='<td>'+(t?honMoney(t,false):'·')+'</td>');
    h += '<td class="hon-yearcol">'+honMoney(grand)+'</td></tr></tfoot></table></div>';
    h += '<p class="hon-hint">💡 Vista anual: cada celda muestra el total del mes (con IVA solo si hay factura). Los clientes archivados (📦) muestran los meses previos al archivo; desde el corte aparecen como ·. Clic en una celda para editar; clic en la empresa para ver su detalle.</p>';
    return h;
  }

  function honFmtDate(iso){ if(!iso) return ''; const p=String(iso).split('-'); if(p.length!==3) return honEsc(iso); return p[2]+'/'+p[1]+'/'+p[0].slice(2); }

  // ---------- MODAL ----------
  function honModalMarkup(){
    return '<div class="modal-overlay" id="modal-hon"><div class="modal">'+
      '<button class="modal-close" onclick="closeModal(\'modal-hon\')">×</button>'+
      '<h3 id="hon-m-title">Editar</h3><div class="modal-sub" id="hon-m-sub"></div>'+
      '<div id="hon-m-body"></div>'+
      '<div class="hon-m-actions">'+
        '<button class="btn btn-gold" onclick="window.honSaveModal()">Guardar</button>'+
        '<button class="btn btn-outline" onclick="closeModal(\'modal-hon\')">Cancelar</button>'+
      '</div></div></div>';
  }
  let HON_EDIT=null;
  window.honEdit=function(tabId,cid,mi){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    const c=tab.honData.clients.find(x=>x.id===cid); if(!c)return;
    setHonSel(tabId,cid); HON_EDIT={tabId,cid,mi};
    const hd=tab.honData; const cell=c.months[mi];
    document.getElementById('hon-m-title').textContent=c.name;
    document.getElementById('hon-m-sub').textContent=MONTHS[mi]+' '+honYear(tab)+' · pesos uruguayos';
    const act=document.querySelector('#modal-hon .hon-m-actions');
    act.style.display=''; act.innerHTML='<button class="btn btn-gold" onclick="window.honSaveModal()">Guardar</button><button class="btn btn-outline" onclick="closeModal(\'modal-hon\')">Cancelar</button>';
    const methods=hd.methods||HON_METHODS;
    let b='';
    b+='<div class="form-group"><label>Honorarios sin IVA ($)</label><input type="number" step="0.01" id="hon-f-sin" value="'+(cell.sinIva!=null?cell.sinIva:'')+'" placeholder="vacío = no aplica este mes"></div>';
    b+='<div class="form-row"><div class="form-group"><label>N° Factura <span class="hon-lbl-note">(activa el IVA)</span></label><input type="text" id="hon-f-fac" value="'+honEsc(cell.factura)+'" placeholder="sin N° → sin IVA"></div>';
    b+='<div class="form-group"><label>Fecha de pago</label><input type="date" id="hon-f-fecha" value="'+honEsc(cell.fecha)+'"></div></div>';
    b+='<div class="hon-calc" id="hon-f-calc"></div>';
    b+='<div class="form-group hon-recibo-toggle"><label class="hon-chk"><input type="checkbox" id="hon-f-hasrec" '+(cell.recibo?'checked':'')+' onchange="window.honToggleRecibo()"> Tiene recibo</label></div>';
    b+='<div class="form-group" id="hon-f-recwrap" style="'+(cell.recibo?'':'display:none;')+'"><label>N° / detalle de recibo</label><input type="text" id="hon-f-rec" value="'+honEsc(cell.recibo)+'"></div>';
    b+='<div class="form-group"><label>Medio de pago</label><select id="hon-f-medio"><option value="">— sin definir —</option>'+methods.map(m=>'<option value="'+honEsc(m)+'"'+(cell.medio===m?' selected':'')+'>'+honEsc(m)+'</option>').join('')+'</select></div>';
    (hd.extraCols||[]).forEach(col=>{ const v=cell.extra?cell.extra[col.id]:''; b+='<div class="form-group"><label>'+honEsc(col.name)+'</label><input type="text" data-extra="'+col.id+'" value="'+honEsc(v||'')+'"></div>'; });
    document.getElementById('hon-m-body').innerHTML=b;
    document.getElementById('modal-hon').classList.add('open');
    const si=document.getElementById('hon-f-sin'); const fi=document.getElementById('hon-f-fac');
    honUpdCalc(); si.addEventListener('input',honUpdCalc); fi.addEventListener('input',honUpdCalc); si.focus();
  };
  function honUpdCalc(){
    if(!HON_EDIT) return; const tab=state.tabs.find(t=>t.id===HON_EDIT.tabId); if(!tab)return;
    const hd=tab.honData; const v=parseFloat(document.getElementById('hon-f-sin').value);
    const fac=(document.getElementById('hon-f-fac').value||'').trim();
    const el=document.getElementById('hon-f-calc'); if(!el)return;
    if(isNaN(v)){ el.innerHTML='<span class="hon-na">Sin honorarios este mes (N/A)</span>'; return; }
    if(!fac){ el.innerHTML='<span class="hon-na">Sin factura → no se calcula IVA.</span> &nbsp; Total: <strong>'+honMoney(v)+'</strong>'; return; }
    const iva=Math.round(v*honTaxRate(hd)*100)/100;
    el.innerHTML='IVA 22%: <strong>'+honMoney(iva)+'</strong> &nbsp;·&nbsp; Total: <strong>'+honMoney(v+iva)+'</strong>';
  }
  window.honToggleRecibo=function(){ const w=document.getElementById('hon-f-recwrap'); const c=document.getElementById('hon-f-hasrec'); w.style.display=c.checked?'':'none'; if(c.checked){ const i=document.getElementById('hon-f-rec'); if(i) i.focus(); } };
  window.honSaveModal=function(){
    if(!HON_EDIT) return; const tab=state.tabs.find(t=>t.id===HON_EDIT.tabId); if(!tab)return;
    const c=tab.honData.clients.find(x=>x.id===HON_EDIT.cid); if(!c)return;
    const cell=c.months[HON_EDIT.mi];
    const sv=document.getElementById('hon-f-sin').value;
    cell.sinIva = (sv===''||isNaN(parseFloat(sv)))?null:Math.round(parseFloat(sv)*100)/100;
    cell.factura=document.getElementById('hon-f-fac').value.trim();
    cell.fecha=document.getElementById('hon-f-fecha').value;
    cell.medio=document.getElementById('hon-f-medio').value;
    cell.recibo = document.getElementById('hon-f-hasrec').checked ? document.getElementById('hon-f-rec').value.trim() : '';
    if(!cell.extra) cell.extra={};
    document.querySelectorAll('#hon-m-body [data-extra]').forEach(inp=>{ cell.extra[inp.getAttribute('data-extra')]=inp.value.trim(); });
    honSave(); closeModal('modal-hon');
    const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honScrollToSelected(tab); honToast('✓ Guardado');
  };

  var HON_CEDIT=null;
  window.honRenameClient=function(tabId,cid){
    var tab=state.tabs.find(function(t){return t.id===tabId;}); if(!tab)return;
    var c=tab.honData.clients.find(function(x){return x.id===cid;}); if(!c)return;
    var nn=prompt('Nuevo nombre de la empresa / cliente:', c.name);
    if(nn===null) return; nn=String(nn).trim(); if(!nn) return;
    c.name=nn; honSave();
    var mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honScrollToSelected(tab); honToast('\u2713 Nombre actualizado');
  };
  window.honOpenClient=function(tabId,cid){
    var tab=state.tabs.find(function(t){return t.id===tabId;}); if(!tab)return;
    var c=tab.honData.clients.find(function(x){return x.id===cid;}); if(!c)return;
    var year=honYear(tab); setHonSel(tabId,cid); HON_CEDIT={tabId:tabId,cid:cid};
    document.getElementById('hon-m-title').textContent='Editar: '+c.name;
    document.getElementById('hon-m-sub').textContent='Nombre, honorarios y factura \u00b7 '+year+' \u00b7 pesos uruguayos';
    var b='<div class="form-group"><label>Nombre de la empresa / cliente</label><input type="text" id="hon-ec-name" value="'+honEsc(c.name)+'"></div>';
    b+='<div class="table-wrap" style="margin:0 0 4px;"><table class="hon-table hon-editor"><thead><tr><th>Mes</th><th>Honorarios s/IVA</th><th>N\u00b0 Factura</th><th>IVA</th><th>Total</th><th>Estado</th><th></th></tr></thead><tbody>';
    for(var m=0;m<12;m++){ var cell=c.months[m];
      b+='<tr><td style="text-align:left;font-weight:700;">'+MONTHS_SHORT[m]+'</td>'+
         '<td><input type="number" step="0.01" class="hon-ec-in" id="hon-ec-sin-'+m+'" value="'+(cell.sinIva!=null?cell.sinIva:'')+'" oninput="window.honEcCalc('+m+')" placeholder="\u2014"></td>'+
         '<td><input type="text" class="hon-ec-in hon-ec-fac" id="hon-ec-fac-'+m+'" value="'+honEsc(cell.factura)+'" oninput="window.honEcCalc('+m+')" placeholder="s/factura"></td>'+
         '<td class="hon-num hon-muted" id="hon-ec-iva-'+m+'"></td>'+
         '<td class="hon-num" id="hon-ec-tot-'+m+'"></td>'+
         '<td id="hon-ec-st-'+m+'"></td>'+
         '<td><button class="btn btn-outline btn-sm" title="Fecha de pago, medio, recibo\u2026" onclick="window.honSaveClientEditor(true,'+m+')">\u22ef</button></td></tr>';
    }
    b+='</tbody><tfoot><tr class="hon-foot"><td>Total a\u00f1o</td><td></td><td></td><td></td><td class="hon-num" id="hon-ec-year"></td><td colspan="2"></td></tr></tfoot></table></div>';
    b+='<p class="hon-hint">El IVA 22% se agrega solo si carg\u00e1s un N\u00b0 de factura. Sin factura, el importe queda tal cual (Total = honorarios). Us\u00e1 \u22ef para fecha de pago, medio y recibo.</p>';
    document.getElementById('hon-m-body').innerHTML=b;
    var act=document.querySelector('#modal-hon .hon-m-actions'); act.style.display='';
    var archBtn = c.archivedFrom
      ? '<button class="btn btn-outline btn-sm" onclick="window.honUnarchiveClient(\''+tabId+'\',\''+cid+'\')" title="Volver a mostrarlo">📦 Desarchivar</button>'
      : '<button class="btn btn-outline btn-sm" onclick="window.honArchiveClient(\''+tabId+'\',\''+cid+'\')" title="Dejar de mostrarlo desde el mes actual">📦 Archivar</button>';
    act.innerHTML='<button class="btn btn-gold" onclick="window.honSaveClientEditor(false,-1)">Guardar cambios</button>'+archBtn+'<button class="btn btn-outline" onclick="closeModal(\'modal-hon\')">Cancelar</button>';
    if(c.archivedFrom){ document.getElementById('hon-m-sub').textContent='Archivado desde '+honArchLabel(c)+' · '+year+' · pesos uruguayos'; }
    document.getElementById('modal-hon').classList.add('open');
    for(var k=0;k<12;k++) window.honEcCalc(k);
    var ni=document.getElementById('hon-ec-name'); if(ni) ni.focus();
  };
  window.honEcCalc=function(m){
    if(!HON_CEDIT) return; var tab=state.tabs.find(function(t){return t.id===HON_CEDIT.tabId;}); if(!tab)return;
    var hd=tab.honData; var c=tab.honData.clients.find(function(x){return x.id===HON_CEDIT.cid;}); if(!c)return;
    var year=honYear(tab); var rate=honTaxRate(hd);
    var svEl=document.getElementById('hon-ec-sin-'+m); var fcEl=document.getElementById('hon-ec-fac-'+m); if(!svEl||!fcEl) return;
    var sv=svEl.value; var fac=(fcEl.value||'').trim();
    var sin=(sv===''||isNaN(parseFloat(sv)))?null:parseFloat(sv);
    var iva=(sin!=null&&fac)?Math.round(sin*rate*100)/100:0;
    var tot=(sin!=null)?Math.round((sin+iva)*100)/100:0;
    var ivaEl=document.getElementById('hon-ec-iva-'+m); var totEl=document.getElementById('hon-ec-tot-'+m); var stEl=document.getElementById('hon-ec-st-'+m);
    if(ivaEl) ivaEl.innerHTML=(sin==null)?'':(fac?honMoney(iva):'<span class="hon-na" title="Sin factura: no corresponde IVA">\u2014</span>');
    if(totEl) totEl.innerHTML=(sin==null)?'<span class="hon-na">\u2014</span>':'<strong>'+honMoney(tot)+'</strong>';
    var cell=c.months[m];
    var st=(sin==null||sin===0)?'na':(cell.fecha?'paid':((new Date()>new Date(year,m+1,0,23,59,59))?'late':'pending'));
    if(stEl) stEl.innerHTML='<span class="'+HON_ST[st].cls+'">'+HON_ST[st].label+'</span>';
    var yt=0; for(var i=0;i<12;i++){ var s2e=document.getElementById('hon-ec-sin-'+i); var f2e=document.getElementById('hon-ec-fac-'+i); if(!s2e)continue; var s2=(s2e.value===''||isNaN(parseFloat(s2e.value)))?null:parseFloat(s2e.value); if(s2==null)continue; var f2=(f2e.value||'').trim(); var iv2=f2?Math.round(s2*rate*100)/100:0; yt+=Math.round((s2+iv2)*100)/100; }
    var ye=document.getElementById('hon-ec-year'); if(ye) ye.innerHTML='<strong>'+honMoney(yt)+'</strong>';
  };
  window.honSaveClientEditor=function(openCell, m){
    if(!HON_CEDIT) return; var tab=state.tabs.find(function(t){return t.id===HON_CEDIT.tabId;}); if(!tab)return;
    var c=tab.honData.clients.find(function(x){return x.id===HON_CEDIT.cid;}); if(!c)return;
    var ni=document.getElementById('hon-ec-name'); if(ni){ var nm=ni.value.trim(); if(nm) c.name=nm; }
    for(var i=0;i<12;i++){ var sv=document.getElementById('hon-ec-sin-'+i); var fc=document.getElementById('hon-ec-fac-'+i); if(!sv)continue;
      c.months[i].sinIva=(sv.value===''||isNaN(parseFloat(sv.value)))?null:Math.round(parseFloat(sv.value)*100)/100;
      c.months[i].factura=(fc.value||'').trim();
    }
    honSave();
    if(openCell){ closeModal('modal-hon'); window.honEdit(HON_CEDIT.tabId, HON_CEDIT.cid, m); return; }
    closeModal('modal-hon'); var mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honScrollToSelected(tab); honToast('\u2713 Cambios guardados');
  };
  window.honAddClient=function(tabId){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    const name=prompt('Nombre del nuevo cliente / empresa:',''); if(!name||!name.trim())return;
    const feeStr=prompt('Honorario mensual sin IVA (en $, opcional). Se aplicará a los 12 meses:','');
    const fee = feeStr && !isNaN(parseFloat(feeStr.replace(',','.'))) ? Math.round(parseFloat(feeStr.replace(',','.'))*100)/100 : null;
    const months=[]; for(let i=0;i<12;i++) months.push({sinIva:fee, factura:'', recibo:'', fecha:'', medio:'', extra:{}});
    tab.honData.clients.push({id:'hc_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6), name:name.trim(), color:'', months});
    honSave(); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Cliente agregado');
  };
  window.honDelClient=function(tabId,cid){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    const c=tab.honData.clients.find(x=>x.id===cid); if(!c)return;
    if(!confirm('¿Eliminar a "'+c.name+'" y todos sus datos del año?'))return;
    tab.honData.clients=tab.honData.clients.filter(x=>x.id!==cid);
    honSave(); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Cliente eliminado');
  };
  window.honAddCol=function(tabId){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    const name=prompt('Nombre de la nueva columna (ej: Observaciones, Vencimiento):',''); if(!name||!name.trim())return;
    tab.honData.extraCols.push({id:'xc_'+Date.now().toString(36)+Math.random().toString(36).slice(2,4), name:name.trim()});
    honSave(); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Columna agregada');
  };
  window.honDelCol=function(tabId,colId){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return;
    const col=tab.honData.extraCols.find(x=>x.id===colId); if(!col)return;
    if(!confirm('¿Eliminar la columna "'+col.name+'"?'))return;
    tab.honData.extraCols=tab.honData.extraCols.filter(x=>x.id!==colId);
    tab.honData.clients.forEach(c=>c.months.forEach(m=>{ if(m.extra) delete m.extra[colId]; }));
    honSave(); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Columna eliminada');
  };
  window.honColors=function(tabId){
    const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return; const hd=tab.honData;
    document.getElementById('hon-m-title').textContent='🎨 Colores de esta pestaña';
    document.getElementById('hon-m-sub').textContent='Color de acento (totales, encabezados). No afecta al resto de la página.';
    const cur=(hd.colors&&hd.colors.accent)||(getComputedStyle(document.documentElement).getPropertyValue('--c-accent').trim())||'#b8c1cc';
    const presets=['#b8c1cc','#1a4a7a','#2e7d52','#8e44ad','#c0392b','#d4860a','#16a085','#34495e'];
    let b='<div class="form-group"><label>Color de acento</label><input type="color" id="hon-c-accent" value="'+cur+'" style="width:70px;height:40px;padding:2px;cursor:pointer;"></div>';
    b+='<div class="hon-swatches">'+presets.map(p=>'<button class="hon-sw" style="background:'+p+'" onclick="document.getElementById(\'hon-c-accent\').value=\''+p+'\'"></button>').join('')+'</div>';
    document.getElementById('hon-m-body').innerHTML=b;
    const act=document.querySelector('#modal-hon .hon-m-actions'); act.style.display='';
    act.innerHTML='<button class="btn btn-gold" onclick="window.honSaveColors(\''+tabId+'\')">Aplicar</button><button class="btn btn-outline" onclick="window.honResetColors(\''+tabId+'\')">Restablecer</button><button class="btn btn-outline" onclick="closeModal(\'modal-hon\')">Cancelar</button>';
    document.getElementById('modal-hon').classList.add('open');
  };
  window.honSaveColors=function(tabId){ const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return; if(!tab.honData.colors) tab.honData.colors={}; tab.honData.colors.accent=document.getElementById('hon-c-accent').value; honSave(); closeModal('modal-hon'); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Colores aplicados'); };
  window.honResetColors=function(tabId){ const tab=state.tabs.find(t=>t.id===tabId); if(!tab)return; if(tab.honData.colors) tab.honData.colors.accent=''; honSave(); closeModal('modal-hon'); const mc=document.getElementById('main-content'); mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab); honToast('✓ Restablecido'); };

  window.honSetView=setHonView; window.honSetMonth=setHonMonth;
  window.attachHonorariosHandlers=function(tab){
    if(typeof attachInlineEditHandlers==='function'){ try{attachInlineEditHandlers();}catch(e){} }
    honScrollToSelected(tab);
    var inp=document.getElementById('hon-search');
    if(inp){
      var apply=function(){
        var q=(inp.value||'').toLowerCase().trim();
        setHonSearchVal(tab.id, inp.value||'');
        var rows=document.querySelectorAll('.hon-table .hon-row'); var shown=0;
        rows.forEach(function(r){ var name=r.getAttribute('data-name')||''; var match=!q||name.indexOf(q)>=0; r.style.display=match?'':'none'; if(match) shown++; });
        var nr=document.querySelector('.hon-noresults'); if(nr) nr.style.display=(shown===0&&q)?'':'none';
        var clr=document.getElementById('hon-search-clear'); if(clr) clr.style.display=q?'':'none';
      };
      inp.addEventListener('input', apply);
      var clr=document.getElementById('hon-search-clear');
      if(clr) clr.addEventListener('click', function(){ inp.value=''; apply(); inp.focus(); });
      apply();
    }
  };

  // ---------- PATCH renderContent + ensureNewStructures ----------
  if (typeof renderContent==='function'){
    const _orig=renderContent;
    renderContent=function(){
      const tab=state.tabs.find(t=>t.id===userPrefs.activeTabId);
      if(tab && tab.type==='honorarios'){
        if(typeof userCanSeeTab==='function' && !userCanSeeTab(tab)) return _orig();
        if(typeof userCanEnterTab==='function' && !userCanEnterTab(tab)) return _orig();
        document.body.classList.toggle('tab-locked', !!tab.locked);
        const mc=document.getElementById('main-content');
        mc.innerHTML=renderHonorarios(tab); attachHonorariosHandlers(tab);
        return;
      }
      return _orig();
    };
  }
  if (typeof ensureNewStructures==='function'){
    const _e=ensureNewStructures;
    ensureNewStructures=function(){ let c=false; try{c=_e();}catch(e){} try{ if(window.ensureHonorarios()) c=true; }catch(e){} return c; };
  }

  // ============================================================
  //  SISTEMA DE RESPALDOS (interno, dentro de la propia base)
  //  - Copia automática diaria al usar la app (nodo wm_backups, NO toca los datos en uso)
  //  - Botón "Backup ahora" (guarda copia + descarga archivo)
  //  - Restaurar desde una fecha (solo admin, con confirmación)
  // ============================================================
  var HON_BK_REF = 'wm_backups';
  var HON_BK_MAX = 30;
  function honBkDB(){ try{ return (typeof firebaseDB!=='undefined' && firebaseDB) ? firebaseDB : null; }catch(e){ return null; } }
  function honBkUser(){ try{ var me=(typeof currentUser==='function')?currentUser():null; return (me&&me.name)||'?'; }catch(e){ return '?'; } }
  function honBkIsAdmin(){ try{ var me=(typeof currentUser==='function')?currentUser():null; return !!(me&&me.role==='admin'); }catch(e){ return false; } }
  function honBkStateOk(){ return !!(state && Array.isArray(state.tabs) && state.tabs.length>=3 && state.branding); }
  function honBkTodayKey(){ var d=new Date(); return 'd_'+d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function honBkFmt(ms){ try{ var d=new Date(ms); return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear()+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }catch(e){ return ''; } }
  function honBkDownload(text, fname){
    try{ var blob=new Blob([text],{type:'application/json'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=fname; document.body.appendChild(a); a.click(); setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(a.href); },100); }catch(e){ console.warn('bk download',e); }
  }
  function honBkWrite(key, reason, cb){
    var db=honBkDB(); if(!db || !honBkStateOk()){ if(cb) cb(false); return; }
    var payload={ at: Date.now(), by: honBkUser(), reason: reason||'auto', tabs: state.tabs.length, year: (state.branding&&state.branding.year)||'', data: state };
    try{
      db.ref(HON_BK_REF+'/'+key).set(payload).then(function(){ honBkPrune(); if(cb) cb(true); }).catch(function(e){ console.warn('bk write',e); if(cb) cb(false); });
    }catch(e){ console.warn('bk write',e); if(cb) cb(false); }
  }
  function honBkPrune(){
    var db=honBkDB(); if(!db) return;
    try{ db.ref(HON_BK_REF).once('value').then(function(snap){
      var val=snap.val()||{}; var keys=Object.keys(val);
      if(keys.length<=HON_BK_MAX) return;
      keys.sort(function(a,b){ return (val[a].at||0)-(val[b].at||0); }); // viejos primero
      var toDel=keys.slice(0, keys.length-HON_BK_MAX);
      toDel.forEach(function(k){ db.ref(HON_BK_REF+'/'+k).remove(); });
    }); }catch(e){ console.warn('bk prune',e); }
  }
  // Copia automática: una por día (idempotente por la clave de fecha)
  function honAutoBackup(){
    var db=honBkDB(); if(!db || !honBkStateOk()) return;
    var key=honBkTodayKey();
    try{ db.ref(HON_BK_REF+'/'+key).once('value').then(function(snap){
      if(snap.exists()) return; // ya hay copia de hoy
      honBkWrite(key, 'auto');
    }); }catch(e){ console.warn('autobackup',e); }
  }
  // Backup manual: guarda copia con marca de tiempo + descarga archivo
  window.honManualBackup=function(){
    var ok=honBkStateOk();
    var fname='estudio_machado_backup_'+new Date().toISOString().slice(0,10)+'_'+Date.now().toString().slice(-5)+'.json';
    if(ok) honBkDownload(JSON.stringify(state,null,2), fname);
    honBkWrite('m_'+Date.now(), 'manual', function(okSave){
      honToast(okSave?('💾 Backup guardado'+(ok?' y descargado':'')):'⚠ No se pudo guardar en la nube (se descargó el archivo)');
    });
  };
  // Restaurar desde una copia (solo admin)
  function honBkModalEnsure(){
    if(document.getElementById('modal-honbk')) return;
    var d=document.createElement('div'); d.className='modal-overlay'; d.id='modal-honbk';
    d.innerHTML='<div class="modal"><button class="modal-close" onclick="closeModal(\'modal-honbk\')">×</button>'+
      '<h3>🛟 Respaldos</h3><div class="modal-sub">Copias guardadas de toda la página. Para restaurar, elegí una fecha. Se reemplazan los datos actuales por los de esa copia (todos los usuarios la verán).</div>'+
      '<div style="margin:10px 0;display:flex;gap:10px;flex-wrap:wrap;"><button class="btn btn-gold" onclick="window.honManualBackup()">💾 Backup ahora</button></div>'+
      '<div id="hon-bk-list">Cargando copias…</div></div>';
    document.body.appendChild(d);
  }
  window.honOpenRestore=function(){
    if(!honBkIsAdmin()){ honToast('Solo un administrador puede restaurar'); return; }
    honBkModalEnsure();
    document.getElementById('modal-honbk').classList.add('open');
    var listEl=document.getElementById('hon-bk-list'); listEl.innerHTML='Cargando copias…';
    var db=honBkDB(); if(!db){ listEl.innerHTML='<p class="hon-na">No hay conexión con la base.</p>'; return; }
    db.ref(HON_BK_REF).once('value').then(function(snap){
      var val=snap.val()||{}; var keys=Object.keys(val);
      if(!keys.length){ listEl.innerHTML='<p class="hon-na">Todavía no hay copias guardadas. Se crean solas al usar la app, o tocá "Backup ahora".</p>'; return; }
      keys.sort(function(a,b){ return (val[b].at||0)-(val[a].at||0); }); // recientes primero
      var rows=keys.map(function(k){ var e=val[k]||{}; var tipo=(e.reason==='manual')?'manual':'auto';
        return '<tr><td style="text-align:left;">'+honBkFmt(e.at)+'</td><td>'+honEsc(e.by||'?')+'</td><td><span class="hon-medio">'+tipo+'</span></td><td>'+(e.tabs||'?')+' pest.</td><td><button class="btn btn-outline btn-sm" onclick="window.honDoRestore(\''+k+'\')">↩ Restaurar</button></td></tr>';
      }).join('');
      listEl.innerHTML='<div class="table-wrap" style="max-height:340px;overflow:auto;"><table class="hon-table"><thead><tr><th>Fecha</th><th>Por</th><th>Tipo</th><th>Contenido</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
    }).catch(function(e){ listEl.innerHTML='<p class="hon-na">Error al leer las copias.</p>'; });
  };
  window.honDoRestore=function(key){
    if(!honBkIsAdmin()){ honToast('Solo un administrador puede restaurar'); return; }
    var db=honBkDB(); if(!db) return;
    db.ref(HON_BK_REF+'/'+key).once('value').then(function(snap){
      var e=snap.val(); if(!e || !e.data){ honToast('Esa copia está vacía'); return; }
      if(!confirm('¿Restaurar la copia del '+honBkFmt(e.at)+'?\n\nSe reemplazan los datos actuales de TODA la página por los de esa fecha. Todos los usuarios la verán. Esta acción se puede deshacer restaurando otra copia.')) return;
      try{
        var _restored = Object.assign({}, e.data, { _rev: (typeof lastSeenRev!=='undefined' ? lastSeenRev : 0) + 1000 });
        db.ref('wm_app_v2').set(JSON.stringify(_restored)).then(function(){
          honToast('✓ Restaurado. La página se va a recargar.');
          setTimeout(function(){ location.reload(); }, 900);
        }).catch(function(){ honToast('⚠ No se pudo restaurar'); });
      }catch(err){ honToast('⚠ Error al restaurar'); }
    });
  };
  // Inyectar botones en Personalizar → Datos (solo admin llega a ese modal)
  function honBkInjectButtons(){
    try{
      var exp=document.querySelector('#modal-customize button[onclick*="exportData"]');
      if(!exp || document.getElementById('hon-bk-injected')) return;
      var cont=exp.parentNode;
      var b1=document.createElement('button'); b1.className='btn btn-outline'; b1.id='hon-bk-injected'; b1.textContent='🛟 Respaldos'; b1.setAttribute('onclick','window.honOpenRestore()');
      var b2=document.createElement('button'); b2.className='btn btn-outline'; b2.textContent='💾 Backup ahora'; b2.setAttribute('onclick','window.honManualBackup()');
      cont.appendChild(b1); cont.appendChild(b2);
    }catch(e){ console.warn('bk inject',e); }
  }


  try { window.ensureHonorarios(); } catch(e){ console.warn('hon repair',e); }
  try { if(typeof renderTabs==='function') renderTabs(); } catch(e){}
  try { if(typeof renderContent==='function') renderContent(); } catch(e){}

  // Respaldos: inyectar botones y disparar copia automática diaria (tras sincronizar)
  try { honBkInjectButtons(); } catch(e){}
  setTimeout(function(){ try{ honBkInjectButtons(); honAutoBackup(); }catch(e){} }, 7000);
  setTimeout(function(){ try{ honAutoBackup(); }catch(e){} }, 25000);
})();

