// ================= BÓVEDA CIFRADA DE CLIENTES (v8.8-vault) =================
// Cifra toda la ficha del cliente salvo nombre y tipo. La llave se deriva de un
// PIN de 6 dígitos (nunca se guarda) mediante PBKDF2 + AES-GCM (Web Crypto).
// El texto legible solo existe en memoria mientras está desbloqueado.
let vaultDEK = null, _vaultDEKraw = null, vaultPlain = {}, vaultUnlocked = false;
let _vaultLockTimer = null, _vaultWatchOn = false;
const VAULT_ITER = 310000;
const VAULT_SENS = ['rut','bps','ci','fechaNac','passBPS','passGubUy','codGubUy','telefono','correo','direccion','facturacion','cjppu','passCjppu','rupe','fosmetal','otros'];
const _VLT_INP = 'width:100%;box-sizing:border-box;padding:10px 12px;margin-bottom:9px;border:1px solid #cbd3db;border-radius:7px;font-size:15px;font-family:inherit;';
const _VLT_BTN = 'padding:9px 16px;border:none;border-radius:7px;background:#102030;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;';
const _VLT_BTN_O = 'padding:9px 16px;border:1px solid #cbd3db;border-radius:7px;background:#fff;color:#333;font-size:13px;cursor:pointer;font-family:inherit;';

function vaultActive() { return !!(typeof state !== 'undefined' && state && state.vault && state.vault.enabled); }

// ---- helpers base64 / texto ----
function _ab2b64(buf){ let s=''; const b=new Uint8Array(buf); for(let i=0;i<b.length;i++) s+=String.fromCharCode(b[i]); return btoa(s); }
function _b642ab(b64){ const s=atob(b64); const b=new Uint8Array(s.length); for(let i=0;i<s.length;i++) b[i]=s.charCodeAt(i); return b.buffer; }
function _str2ab(str){ return new TextEncoder().encode(str); }
function _ab2str(buf){ return new TextDecoder().decode(buf); }

// ---- cripto ----
async function _vaultDeriveKey(pass, saltB64){
  const base = await crypto.subtle.importKey('raw', _str2ab(pass), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name:'PBKDF2', salt:new Uint8Array(_b642ab(saltB64)), iterations:VAULT_ITER, hash:'SHA-256' },
    base, { name:'AES-GCM', length:256 }, false, ['encrypt','decrypt']);
}
async function _vaultEnc(key, plainStr){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, key, _str2ab(plainStr));
  return { iv:_ab2b64(iv.buffer), ct:_ab2b64(ct) };
}
async function _vaultDec(key, ivB64, ctB64){
  const pt = await crypto.subtle.decrypt({ name:'AES-GCM', iv:new Uint8Array(_b642ab(ivB64)) }, key, _b642ab(ctB64));
  return _ab2str(pt);
}
async function _vaultImportDEK(rawB64){
  return crypto.subtle.importKey('raw', _b642ab(rawB64), { name:'AES-GCM', length:256 }, false, ['encrypt','decrypt']);
}
function _vaultGenRecovery(){
  const abc='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin O/0 ni I/1
  const bytes=crypto.getRandomValues(new Uint8Array(20));
  let s=''; for(let i=0;i<20;i++){ s+=abc[bytes[i]%abc.length]; if((i+1)%5===0 && i<19) s+='-'; }
  return s;
}
function _vaultLegacyPlain(c){ const o={}; VAULT_SENS.forEach(f=>{ o[f] = (c[f]!==undefined && c[f]!==null) ? c[f] : ''; }); return o; }

// ---- vista combinada (canónico + descifrado en memoria) ----
function cView(c){
  if(!vaultActive()) return c;
  if(vaultUnlocked) return Object.assign({}, c, vaultPlain[c.id] || _vaultLegacyPlain(c));
  return { id:c.id, nombre:c.nombre, tipo:c.tipo, archived:c.archived, _archivedAt:c._archivedAt, _created:c._created, _locked:true };
}

async function _vaultLoadAll(){
  vaultPlain = {};
  const list = state.clientes || [];
  for(const c of list){
    if(c._enc){ try{ vaultPlain[c.id] = JSON.parse(await _vaultDec(vaultDEK, c._iv, c._enc)); }catch(e){ vaultPlain[c.id] = {}; } }
    else vaultPlain[c.id] = _vaultLegacyPlain(c);
  }
}

// ---- ciclo de vida ----
async function vaultCreate(pin){
  const dekRaw = crypto.getRandomValues(new Uint8Array(32));
  const dekRawB64 = _ab2b64(dekRaw.buffer);
  const salt = _ab2b64(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const salt2 = _ab2b64(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const rec = _vaultGenRecovery();
  const kPin = await _vaultDeriveKey(pin, salt);
  const kRec = await _vaultDeriveKey(rec.replace(/-/g,''), salt2);
  const wrapPin = await _vaultEnc(kPin, dekRawB64);
  const wrapRec = await _vaultEnc(kRec, dekRawB64);
  vaultDEK = await _vaultImportDEK(dekRawB64);
  _vaultDEKraw = dekRawB64;
  const verifier = await _vaultEnc(vaultDEK, 'WM_VAULT_OK');
  state.vault = { enabled:true, iter:VAULT_ITER, salt, salt2, wrapPin, wrapRec, verifier, createdAt:Date.now() };
  vaultUnlocked = true;
  vaultPlain = {};
  (state.clientes||[]).forEach(c => { vaultPlain[c.id] = _vaultLegacyPlain(c); });
  try { logAudit('vault','clientes','Configuró la bóveda de clientes', null, null); } catch(e){}
  saveState();
  _vaultStartActivityWatch(); _resetVaultTimer();
  return rec;
}
async function vaultUnlock(pin){
  if(!state.vault) return false;
  try{
    const k = await _vaultDeriveKey(pin, state.vault.salt);
    const raw = await _vaultDec(k, state.vault.wrapPin.iv, state.vault.wrapPin.ct);
    vaultDEK = await _vaultImportDEK(raw);
    const chk = await _vaultDec(vaultDEK, state.vault.verifier.iv, state.vault.verifier.ct);
    if(chk !== 'WM_VAULT_OK'){ vaultDEK=null; return false; }
    _vaultDEKraw = raw;
    await _vaultLoadAll();
    vaultUnlocked = true;
    _vaultStartActivityWatch(); _resetVaultTimer();
    return true;
  }catch(e){ vaultDEK=null; _vaultDEKraw=null; return false; }
}
async function vaultUnlockRecovery(code){
  if(!state.vault) return false;
  try{
    const k = await _vaultDeriveKey(code, state.vault.salt2);
    const raw = await _vaultDec(k, state.vault.wrapRec.iv, state.vault.wrapRec.ct);
    vaultDEK = await _vaultImportDEK(raw);
    const chk = await _vaultDec(vaultDEK, state.vault.verifier.iv, state.vault.verifier.ct);
    if(chk !== 'WM_VAULT_OK'){ vaultDEK=null; return false; }
    _vaultDEKraw = raw;
    await _vaultLoadAll();
    vaultUnlocked = true;
    _vaultStartActivityWatch(); _resetVaultTimer();
    return true;
  }catch(e){ vaultDEK=null; _vaultDEKraw=null; return false; }
}
function vaultLock(){ vaultDEK=null; _vaultDEKraw=null; vaultPlain={}; vaultUnlocked=false; if(_vaultLockTimer) clearTimeout(_vaultLockTimer); }

// ---- auto-bloqueo por inactividad (15 min) ----
function _resetVaultTimer(){
  if(_vaultLockTimer) clearTimeout(_vaultLockTimer);
  _vaultLockTimer = setTimeout(function(){
    if(vaultUnlocked){ vaultLock(); try{ renderContent(); }catch(e){} try{ toast('🔒 Bóveda bloqueada por inactividad'); }catch(e){} }
  }, 15*60*1000);
}
function _vaultStartActivityWatch(){
  if(_vaultWatchOn) return; _vaultWatchOn=true;
  ['mousemove','keydown','click','touchstart'].forEach(function(ev){
    document.addEventListener(ev, function(){ if(vaultUnlocked) _resetVaultTimer(); }, { passive:true });
  });
}

// ---- migración (cifrar todo) y prueba en seco ----
async function vaultDryRun(){
  if(!vaultActive()||!vaultUnlocked){ toast('🔒 Desbloqueá primero'); return; }
  const list=(state.clientes||[]).slice(0,5);
  let ok=0, bad=0;
  for(const c of list){
    const sens = vaultPlain[c.id] || _vaultLegacyPlain(c);
    try{ const e=await _vaultEnc(vaultDEK, JSON.stringify(sens)); const back=await _vaultDec(vaultDEK, e.iv, e.ct);
      if(back===JSON.stringify(sens)) ok++; else bad++; }catch(e){ bad++; }
  }
  alert('Prueba en seco (no se escribió nada):\n\n'+ok+' de '+(ok+bad)+' fichas cifraron y descifraron correctamente.'+
        (bad ? '\n\n⚠ '+bad+' fallaron — NO cifres todo, avisá.' : '\n\n✓ Todo bien. Podés cifrar todo cuando quieras.'));
}
async function vaultMigrateAll(){
  if(!vaultActive()||!vaultUnlocked){ toast('🔒 Desbloqueá primero'); return; }
  const list = state.clientes || [];
  const pending = list.filter(c=>!c._enc);
  if(!pending.length){ toast('Todo ya está cifrado ✓'); return; }
  if(!confirm('Vas a cifrar '+pending.length+' clientes.\n\n¿Confirmás que NADIE MÁS está en línea y que tenés respaldo (el Excel exportado sirve)?\n\nLas fichas que fallen quedan intactas sin cifrar.')) return;
  let done=0, fail=0;
  for(const c of list){
    if(c._enc) continue;
    const sens=_vaultLegacyPlain(c);
    let enc=null, ok=false;
    try{ enc=await _vaultEnc(vaultDEK, JSON.stringify(sens)); ok=(await _vaultDec(vaultDEK, enc.iv, enc.ct))===JSON.stringify(sens); }catch(e){ ok=false; }
    if(!ok){ fail++; continue; }         // deja el cliente en texto plano si no verifica
    c._iv=enc.iv; c._enc=enc.ct;
    VAULT_SENS.forEach(f=>{ delete c[f]; });
    vaultPlain[c.id]=sens; done++;
  }
  try { logAudit('vault','clientes','Cifró '+done+' fichas de clientes', null, null); } catch(e){}
  saveState();
  renderContent();
  if(fail) alert('Se cifraron '+done+' clientes.\n\n⚠ '+fail+' no verificaron y quedaron SIN cifrar (intactos). Avisá antes de seguir.');
  else alert('✓ Listo: '+done+' clientes cifrados y verificados.');
}

// ---- modal genérico ----
function _vaultModal(inner, opts){
  opts=opts||{};
  const ov=document.createElement('div');
  ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(10,16,24,.55);display:flex;align-items:center;justify-content:center;padding:16px;';
  const card=document.createElement('div');
  card.style.cssText='background:var(--c-card,#fff);color:var(--c-text,#0a0a0a);max-width:440px;width:100%;border-radius:10px;padding:22px;box-shadow:0 12px 40px rgba(0,0,0,.3);font-family:inherit;';
  card.innerHTML=inner; ov.appendChild(card); document.body.appendChild(ov);
  function close(){ try{ document.body.removeChild(ov); }catch(e){} }
  if(!opts.noBackdropClose) ov.addEventListener('click',function(e){ if(e.target===ov) close(); });
  return { ov, card, close };
}

// ---- flujos de UI ----
function vaultOpenSetup(){
  const m=_vaultModal(
    '<h3 style="margin:0 0 6px;font-size:17px;">🔒 Configurar bóveda de clientes</h3>'+
    '<p style="font-size:12.5px;color:#555;margin:0 0 14px;line-height:1.5;">Elegí un PIN de 6 dígitos. Se pedirá una vez por sesión para ver la información. <b>Nadie más lo sabe: si se pierde, solo el código de recuperación abre la bóveda.</b></p>'+
    '<input id="vlt-pin1" inputmode="numeric" maxlength="6" placeholder="PIN (6 dígitos)" style="'+_VLT_INP+'">'+
    '<input id="vlt-pin2" inputmode="numeric" maxlength="6" placeholder="Repetir PIN" style="'+_VLT_INP+'">'+
    '<div id="vlt-err" style="color:#c0392b;font-size:12.5px;min-height:16px;margin:2px 0 10px;"></div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;"><button id="vlt-cancel" style="'+_VLT_BTN_O+'">Cancelar</button><button id="vlt-ok" style="'+_VLT_BTN+'">Crear bóveda</button></div>',
    {noBackdropClose:true});
  m.card.querySelector('#vlt-cancel').onclick=m.close;
  m.card.querySelector('#vlt-ok').onclick=async function(){
    const p1=m.card.querySelector('#vlt-pin1').value.trim(), p2=m.card.querySelector('#vlt-pin2').value.trim(), err=m.card.querySelector('#vlt-err');
    if(!/^\d{6}$/.test(p1)){ err.textContent='El PIN debe ser exactamente 6 dígitos.'; return; }
    if(p1!==p2){ err.textContent='Los PIN no coinciden.'; return; }
    err.textContent='Creando…';
    try{ const rec=await vaultCreate(p1); m.close(); vaultShowRecovery(rec); }
    catch(e){ err.textContent='Error: '+(e.message||e); }
  };
}
function vaultShowRecovery(rec){
  const m=_vaultModal(
    '<h3 style="margin:0 0 6px;font-size:17px;">🔑 Código de recuperación</h3>'+
    '<p style="font-size:12.5px;color:#555;margin:0 0 12px;line-height:1.5;">Guardalo YA en un lugar seguro (papel o gestor de contraseñas). Es la <b>única</b> forma de abrir la bóveda si se olvidan el PIN. No se vuelve a mostrar.</p>'+
    '<div style="font-family:monospace;font-size:18px;letter-spacing:2px;text-align:center;background:#f4f5f7;border:1px dashed #aaa;border-radius:8px;padding:14px;margin-bottom:10px;user-select:all;">'+rec+'</div>'+
    '<button id="vlt-copy" style="'+_VLT_BTN_O+';width:100%;margin-bottom:10px;">📋 Copiar</button>'+
    '<label style="display:flex;gap:8px;align-items:flex-start;font-size:12.5px;color:#333;margin-bottom:12px;cursor:pointer;"><input type="checkbox" id="vlt-saved" style="margin-top:2px;"> Ya lo guardé en un lugar seguro.</label>'+
    '<button id="vlt-done" disabled style="'+_VLT_BTN+';width:100%;opacity:.5;">Listo</button>',
    {noBackdropClose:true});
  m.card.querySelector('#vlt-copy').onclick=function(){ try{ navigator.clipboard.writeText(rec); toast('📋 Copiado'); }catch(e){} };
  const chk=m.card.querySelector('#vlt-saved'), done=m.card.querySelector('#vlt-done');
  chk.onchange=function(){ done.disabled=!chk.checked; done.style.opacity=chk.checked?'1':'.5'; };
  done.onclick=function(){ m.close(); renderContent(); toast('✓ Bóveda creada. Probá el cifrado y luego cifrá todo.'); };
}
function vaultOpenUnlock(){
  const m=_vaultModal(
    '<h3 style="margin:0 0 6px;font-size:17px;">🔒 Bóveda bloqueada</h3>'+
    '<p style="font-size:12.5px;color:#555;margin:0 0 12px;">Ingresá el PIN de 6 dígitos para ver la información de los clientes.</p>'+
    '<input id="vlt-pin" inputmode="numeric" maxlength="6" placeholder="PIN" style="'+_VLT_INP+'">'+
    '<div id="vlt-err" style="color:#c0392b;font-size:12.5px;min-height:16px;margin:2px 0 10px;"></div>'+
    '<div style="display:flex;gap:8px;justify-content:space-between;align-items:center;"><a id="vlt-rec" style="font-size:12px;color:#2f6db0;cursor:pointer;">Usar código de recuperación</a><button id="vlt-ok" style="'+_VLT_BTN+'">Desbloquear</button></div>',
    {noBackdropClose:true});
  const pin=m.card.querySelector('#vlt-pin'); pin.focus();
  const err=m.card.querySelector('#vlt-err');
  async function go(){
    const v=pin.value.trim();
    if(!/^\d{6}$/.test(v)){ err.textContent='6 dígitos.'; return; }
    err.textContent='Verificando…';
    const ok=await vaultUnlock(v);
    if(ok){ m.close(); renderContent(); toast('🔓 Desbloqueada'); }
    else { err.textContent='✕ PIN incorrecto.'; pin.value=''; pin.focus(); }
  }
  m.card.querySelector('#vlt-ok').onclick=go;
  pin.addEventListener('keydown',function(e){ if(e.key==='Enter') go(); });
  m.card.querySelector('#vlt-rec').onclick=function(){ m.close(); vaultOpenRecovery(); };
}
function vaultOpenRecovery(){
  const m=_vaultModal(
    '<h3 style="margin:0 0 6px;font-size:17px;">🔑 Código de recuperación</h3>'+
    '<p style="font-size:12.5px;color:#555;margin:0 0 12px;">Ingresá el código de recuperación (con o sin guiones).</p>'+
    '<input id="vlt-code" placeholder="XXXXX-XXXXX-XXXXX-XXXXX" style="'+_VLT_INP+';font-family:monospace;">'+
    '<div id="vlt-err" style="color:#c0392b;font-size:12.5px;min-height:16px;margin:2px 0 10px;"></div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;"><button id="vlt-ok" style="'+_VLT_BTN+'">Desbloquear</button></div>',
    {noBackdropClose:true});
  const inp=m.card.querySelector('#vlt-code'); inp.focus();
  const err=m.card.querySelector('#vlt-err');
  m.card.querySelector('#vlt-ok').onclick=async function(){
    const code=inp.value.trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
    if(code.length<16){ err.textContent='Código incompleto.'; return; }
    err.textContent='Verificando…';
    const ok=await vaultUnlockRecovery(code);
    if(ok){ m.close(); renderContent(); toast('🔓 Desbloqueada con código de recuperación'); }
    else { err.textContent='✕ Código incorrecto.'; }
  };
}
function vaultOpenChangePin(){
  if(!vaultActive()||!vaultUnlocked){ toast('🔒 Desbloqueá primero'); return; }
  const m=_vaultModal(
    '<h3 style="margin:0 0 10px;font-size:17px;">Cambiar PIN</h3>'+
    '<input id="vp1" inputmode="numeric" maxlength="6" placeholder="Nuevo PIN (6 dígitos)" style="'+_VLT_INP+'">'+
    '<input id="vp2" inputmode="numeric" maxlength="6" placeholder="Repetir" style="'+_VLT_INP+'">'+
    '<div id="vpe" style="color:#c0392b;font-size:12.5px;min-height:16px;margin:2px 0 10px;"></div>'+
    '<div style="display:flex;gap:8px;justify-content:flex-end;"><button id="vpc" style="'+_VLT_BTN_O+'">Cancelar</button><button id="vpo" style="'+_VLT_BTN+'">Guardar</button></div>',
    {noBackdropClose:true});
  m.card.querySelector('#vpc').onclick=m.close;
  m.card.querySelector('#vpo').onclick=async function(){
    const a=m.card.querySelector('#vp1').value.trim(), b=m.card.querySelector('#vp2').value.trim(), e=m.card.querySelector('#vpe');
    if(!/^\d{6}$/.test(a)){ e.textContent='6 dígitos.'; return; }
    if(a!==b){ e.textContent='No coinciden.'; return; }
    e.textContent='Guardando…';
    try{ const k=await _vaultDeriveKey(a, state.vault.salt); state.vault.wrapPin=await _vaultEnc(k, _vaultDEKraw); saveState(); m.close(); toast('✓ PIN cambiado'); }
    catch(err){ e.textContent='Error: '+(err.message||err); }
  };
}

// ---- pantalla bloqueada + barra ----
function renderVaultLockedHTML(){
  const search=(userPrefs.clientsSearch||'').toLowerCase();
  let list=clientesAlfabetico().filter(c=>!c.archived);
  if(search) list=list.filter(c=>(c.nombre||'').toLowerCase().includes(search));
  const rows=list.map(c=>'<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid var(--c-border,#eee);">'+
    '<div style="width:30px;height:30px;border-radius:50%;background:var(--c-accent,#a8b0b8);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">'+initials(c.nombre)+'</div>'+
    '<div style="flex:1;min-width:0;font-size:13px;font-weight:600;color:var(--c-text,#111);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+(c.nombre||'—')+'</div>'+tipoBadge(c.tipo)+'</div>').join('');
  return '<div class="section-header"><div><div class="section-title">👥 Información de Clientes</div>'+
    '<div style="font-size:12px;color:var(--c-text-muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;">🔒 Bóveda bloqueada · '+list.length+' clientes</div></div></div>'+
    '<div style="background:var(--c-card,#fff);border:1px solid var(--c-border,#e5e5e5);border-radius:10px;padding:22px;text-align:center;margin-bottom:16px;">'+
      '<div style="font-size:34px;margin-bottom:6px;">🔒</div>'+
      '<div style="font-size:15px;font-weight:700;margin-bottom:4px;">La información de los clientes está cifrada</div>'+
      '<div style="font-size:12.5px;color:#666;margin-bottom:14px;">Poné el PIN para ver RUT, contraseñas, contacto y todo lo demás.</div>'+
      '<button class="btn btn-gold" onclick="vaultOpenUnlock()">🔓 Desbloquear con PIN</button></div>'+
    '<input id="clientes-search-input" placeholder="Buscar por nombre…" value="'+(userPrefs.clientsSearch||'')+'" style="width:100%;max-width:480px;box-sizing:border-box;padding:8px 12px;border:1px solid var(--c-border);border-radius:4px;font-family:inherit;font-size:13px;background:var(--c-card);margin-bottom:12px;">'+
    '<div style="background:var(--c-card,#fff);border:1px solid var(--c-border,#e5e5e5);border-radius:8px;overflow:hidden;">'+(rows||'<div style="padding:16px;text-align:center;color:#888;font-size:13px;">Sin resultados.</div>')+'</div>';
}
function vaultToolbarHTML(){
  if(!vaultActive()) return '<button class="btn btn-outline" onclick="vaultOpenSetup()" title="Proteger la info con un PIN">🔒 Configurar bóveda</button>';
  let h='';
  const pending=(state.clientes||[]).filter(c=>!c._enc).length;
  if(pending>0) h+='<button class="btn btn-outline" style="border-color:#c9a227;color:#8a6d00;" onclick="vaultMigrateAll()" title="Cifrar los clientes que faltan">⚠ Cifrar todos ('+pending+')</button>';
  h+='<button class="btn btn-outline" onclick="vaultOpenChangePin()" title="Cambiar el PIN">🔑 PIN</button>';
  h+='<button class="btn btn-outline" onclick="vaultLock();renderContent();" title="Bloquear ahora">🔒 Bloquear</button>';
  return h;
}
// ================= FIN BÓVEDA =================
