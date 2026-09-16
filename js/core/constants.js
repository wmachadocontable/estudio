// ============ CONSTANTES SESIÓN 4 (deben estar al inicio para que ensureNewStructures las use) ============
const ROLES = ['admin', 'editor', 'viewer', 'maintenance'];
const ROLE_LABELS = { admin:'Administrador', editor:'Editor', viewer:'Solo lectura', maintenance:'Mantenimiento' };
const ROLE_ICONS  = { admin:'👑', editor:'✎', viewer:'👁', maintenance:'🔧' };
const AVATAR_COLORS = ['#16a085','#1a4a7a','#2e7d52','#c0392b','#8e44ad','#d4860a','#34495e','#27ae60','#e67e22','#2980b9','#8e9b00','#c0392b'];

// ============ CONSTANTES SESIÓN 5 ============
const TRASH_RETENTION_DAYS = 30;

// ============ CONSTANTES SESIÓN 6 ============
const AUDIT_MAX_ENTRIES = 2000;

// ============ CONSTANTES SESIÓN 7 ============
const CHAT_ATTACHMENT_MAX_BYTES = 500 * 1024;  // 500 KB por adjunto
const CHAT_TYPING_TIMEOUT_MS = 6000;            // typing se considera vencido tras 6s

// ============ DEFAULTS ============
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
