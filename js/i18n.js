/**
 * I18N — Motor de internacionalización ES / EN.
 * Carga el diccionario según lang guardado en localStorage.
 * Todas las cadenas del portafolio pasan por t() aquí.
 */

const DEFAULT_LANG = 'es';

let currentLang = DEFAULT_LANG;
let dictionary = {};

/** Diccionarios embebidos (se cargan al iniciar) */
const FALLBACK_ES = {
  // Panel lateral
  panel_sys: 'SISTEMA',
  panel_status: 'ESTADO',
  panel_online: '● ONLINE',
  panel_files: 'EXPEDIENTES',
  panel_stats: 'ESTADÍSTICA',
  panel_solved: 'RESUELTOS',
  panel_classified: 'CLASIFICADOS',
  panel_uptime: 'UPTIME',
  panel_log: 'REGISTRO',

  // Taskbar
  tb_brand: '⌘ SISTEMA v2.7b',
  tb_clearance: 'DETECTIVE // CLEARANCE: NIVEL-Ω',

  // Breadcrumb
  bc_prompt: '> C:\\EXPEDIENTES> ',
  bc_hint: 'selecciona una carpeta para abrir expediente',

  // Consola
  console_prompt: 'investigador@panel:~$ ',
  console_placeholder: '_ comando...',
  quake_toggle_title: 'Abrir terminal (toggle)',
  quake_reset_title: 'Restaurar tamaño de terminal (reset)',

  // Panel log entries
  log_boot: '[SYS] boot_complete',
  log_net: '[NET] secure_host',
  log_auth: '[AUTH] clearance=LEVEL-Ω',
  log_fs: '[FS] /expedientes mounted',
  log_db: '[DB] pool ok',
  log_mon: '[MON] ONLINE',

  // Ventanas — labels genéricos
  win_minimize: 'Minimizar ventana',
  win_close: 'Cerrar ventana',
  win_cat_label: 'CATEGORÍA',
  win_year_label: 'AÑO',
  win_level_label: 'NIVEL',
  win_solved_tag: 'RESUELTOS ✓',
  win_open_tag: 'ABIERTO →',
  win_files_title: 'ARCHIVOS DEL SISTEMA',
  win_impact_title: 'RESUMEN DE IMPACTO',
  win_challenge_title: 'EL DESAFÍO',
  win_strategy_title: 'ESTRATEGIA Y ACCIÓN',
  win_evidence_title: 'EVIDENCIAS',

  // Contacto — formulario
  contact_email_label: 'DE',
  contact_to_label: 'PARA',
  contact_cc_label: 'CC',
  contact_bcc_label: 'CCO',
  contact_subject_label: 'ASUNTO',
  contact_message_label: 'MENSAJE',
  contact_send_btn: '[ ENVIAR MENSAJE ]',
  contact_sending_btn: '[ ENVIANDO... ]',
  contact_reset_btn: '[ ENVIAR OTRO ]',
  contact_header: 'Sistema de correo privilegiado de detectives',
  contact_success: 'Correo enviado exitosamente.',
  contact_success_sub: 'Tu mensaje ha sido transmitido al servidor.\nResponderé a la brevedad, detective.',
  contact_err: '[ERR] Fallo en la transmisión. Intenta de nuevo.',
  contact_sending_bar: '[ ENVIANDO ]',

  // CV / Bio
  bio_linkedin: 'LinkedIn ↗',
  bio_github: 'GitHub ↗',
  bio_cv: 'Descargar CV (PDF) ↓',

  // Comandos — help text
  cmd_help_title: '[CMD] ═══ COMANDOS DISPONIBLES ═══',
  cmd_nav: '  Navegación:',
  cmd_help_cmd: '    help / ayuda          → Muestra esta lista de comandos',
  cmd_ls_cmd: '    ls / dir              → Lista los expedientes disponibles',
  cmd_open_exp: '  Expedientes:',
  cmd_open_id: '    open [id]             → Abre un expediente por ID (ej: open exp001)',
  cmd_open_name: '    open [nombre]         → Abre un expediente por nombre (ej: open e-mantto, open flujo)',
  cmd_profile: '  Perfil y contacto:',
  cmd_about: '    about / bio / cv      → Abre tu perfil profesional con enlaces',
  cmd_contact: '    contact / email       → Muestra vías de contacto directo',
  cmd_utils: '  Utilidades:',
  cmd_clear: '    clear / cls           → Limpia el registro del panel lateral',
  cmd_date_cmd: '    date                  → Fecha y hora actual del sistema',
  cmd_whoami: '    whoami                → Información del usuario actual',

  // Mensajes de consola
  msg_clear_ok: '[SYS] Registro purgado con éxito.',
  msg_mail_open: '[MAIL] Terminal de correo abierta.',
  msg_mail_quake: '[MAIL] Abriendo terminal de correo electrónico...',
  msg_terminal_reset: '[SYS] Terminal restaurada.',
  msg_qt_cmd: '$ ',
  msg_usr_log: '[USR] ',

  // Error messages
  err_unknown_cmd: '[ERR] Comando desconocido: "%s". Escribe "help" para ver los comandos disponibles.',
  err_not_recognized: '[ERR] "%s" no es reconocido. El detective necesita más información. Prueba: help',
  err_unrecognized: '[SYS] No reconozco ese comando. Parece código clasificado... o simplemente un error. Escribe "help".',

  // Expediente not found
  exp_not_found: 'Expediente no encontrado: "%s". Escribe "ls" para ver los disponibles.',

  // Meta / SEO
  meta_title: 'Panel del Investigador — Portafolio',
  meta_desc: 'Portafolio profesional de diseño UX/UI, dirección técnica y estrategia de producto. Expedientes de E-MANTTO, FLUJO, PUENTE y NEXUS.',
  og_title: 'Panel del Investigador — Portafolio',
  og_desc: 'Portafolio profesional de diseño UX/UI, dirección técnica y estrategia de producto.',

  // Language selector
  lang_selector_label: 'IDIOMA',
  lang_es: 'ES',
  lang_en: 'EN',
};

const FALLBACK_EN = {
  // Panel sidebar
  panel_sys: 'SYSTEM',
  panel_status: 'STATUS',
  panel_online: '● ONLINE',
  panel_files: 'FILES',
  panel_stats: 'STATISTICS',
  panel_solved: 'SOLVED',
  panel_classified: 'CLASSIFIED',
  panel_uptime: 'UPTIME',
  panel_log: 'LOG',

  // Taskbar
  tb_brand: '⌘ SYSTEM v2.7b',
  tb_clearance: 'DETECTIVE // CLEARANCE: LEVEL-Ω',

  // Breadcrumb
  bc_prompt: '> C:\\FILES\\>',
  bc_hint: 'select a folder to open file',

  // Console
  console_prompt: 'investigator@panel:~$ ',
  console_placeholder: '_ command...',
  quake_toggle_title: 'Open terminal (toggle)',
  quake_reset_title: 'Reset terminal size (reset)',

  // Panel log entries
  log_boot: '[SYS] boot_complete',
  log_net: '[NET] secure_host',
  log_auth: '[AUTH] clearance=LEVEL-Ω',
  log_fs: '[FS] /files mounted',
  log_db: '[DB] pool ok',
  log_mon: '[MON] ONLINE',

  // Windows — generic labels
  win_minimize: 'Minimize window',
  win_close: 'Close window',
  win_cat_label: 'CATEGORY',
  win_year_label: 'YEAR',
  win_level_label: 'LEVEL',
  win_solved_tag: 'SOLVED ✓',
  win_open_tag: 'OPEN →',
  win_files_title: 'SYSTEM FILES',
  win_impact_title: 'IMPACT SUMMARY',
  win_challenge_title: 'THE CHALLENGE',
  win_strategy_title: 'STRATEGY AND ACTION',
  win_evidence_title: 'EVIDENCE',

  // Contact — form
  contact_email_label: 'FROM',
  contact_to_label: 'TO',
  contact_cc_label: 'CC',
  contact_bcc_label: 'BCC',
  contact_subject_label: 'SUBJECT',
  contact_message_label: 'MESSAGE',
  contact_send_btn: '[ SEND MESSAGE ]',
  contact_sending_btn: '[ SENDING... ]',
  contact_reset_btn: '[ SEND ANOTHER ]',
  contact_header: 'Privileged detective mail system',
  contact_success: 'Email sent successfully.',
  contact_success_sub: 'Your message has been transmitted to the server.\nI\'ll reply as soon as possible, detective.',
  contact_err: '[ERR] Transmission failed. Try again.',
  contact_sending_bar: '[ SENDING ]',

  // CV / Bio
  bio_linkedin: 'LinkedIn ↗',
  bio_github: 'GitHub ↗',
  bio_cv: 'Download CV (PDF) ↓',

  // Commands — help text
  cmd_help_title: '[CMD] ═══ AVAILABLE COMMANDS ═══',
  cmd_nav: '  Navigation:',
  cmd_help_cmd: '    help                  → Shows this command list',
  cmd_ls_cmd: '    ls / dir              → Lists available files',
  cmd_open_exp: '  Files:',
  cmd_open_id: '    open [id]             → Opens a file by ID (e.g.: open exp001)',
  cmd_open_name: '    open [name]           → Opens a file by name (e.g.: open e-mantto, open flujo)',
  cmd_profile: '  Profile and contact:',
  cmd_about: '    about / bio / cv      → Opens your professional profile with links',
  cmd_contact: '    contact / email       → Shows direct contact methods',
  cmd_utils: '  Utilities:',
  cmd_clear: '    clear / cls           → Clears the sidebar log',
  cmd_date_cmd: '    date                  → Current system date and time',
  cmd_whoami: '    whoami                → Current user information',

  // Console messages
  msg_clear_ok: '[SYS] Log purged successfully.',
  msg_mail_open: '[MAIL] Mail terminal opened.',
  msg_mail_quake: '[MAIL] Opening email terminal...',
  msg_terminal_reset: '[SYS] Terminal restored.',
  msg_qt_cmd: '$ ',
  msg_usr_log: '[USR] ',

  // Error messages
  err_unknown_cmd: '[ERR] Unknown command: "%s". Type "help" to see available commands.',
  err_not_recognized: '[ERR] "%s" is not recognized. The detective needs more info. Try: help',
  err_unrecognized: '[SYS] I don\'t recognize that command. It looks like classified code... or just an error. Type "help".',

  // File not found
  exp_not_found: 'File not found: "%s". Type "ls" to see available files.',

  // Meta / SEO
  meta_title: 'Investigator\'s Panel — Portfolio',
  meta_desc: 'Professional UX/UI design, technical direction and product strategy portfolio. Case files from E-MANTTO, FLUJO, PUENTE and NEXUS.',
  og_title: 'Investigator\'s Panel — Portfolio',
  og_desc: 'Professional UX/UI design, technical direction and product strategy portfolio.',

  // Language selector
  lang_selector_label: 'LANG',
  lang_es: 'ES',
  lang_en: 'EN',
};

/**
 * Inicializa el motor i18n.
 * Carga el idioma guardado o usa el default.
 */
export async function initI18n() {
  const saved = localStorage.getItem('portfolio-lang');
  currentLang = (saved === 'en' || saved === 'es') ? saved : DEFAULT_LANG;

  // Cargar diccionario desde JSON remoto si existe, sino usar fallback embebido
  try {
    const resp = await fetch(`locales/${currentLang}.json`);
    if (resp.ok) {
      dictionary = await resp.json();
      console.log(`[I18N] Loaded ${currentLang} from locales/`);
    } else {
      dictionary = currentLang === 'en' ? FALLBACK_EN : FALLBACK_ES;
      console.log(`[I18N] Using embedded ${currentLang} fallback`);
    }
  } catch {
    dictionary = currentLang === 'en' ? FALLBACK_EN : FALLBACK_ES;
    console.log(`[I18N] Using embedded ${currentLang} fallback (no fetch)`);
  }
}

/**
 * Traduce una clave.
 * @param {string} key — Clave del diccionario (ej: 'panel_sys')
 * @returns {string} Texto traducido
 */
export function t(key) {
  return dictionary[key] || FALLBACK_ES[key] || FALLBACK_EN[key] || key;
}

/**
 * Cambia el idioma activo y notifica a los componentes.
 * Dispara un evento 'i18n:changed' para que la UI se actualice.
 * @param {string} lang — 'es' o 'en'
 */
export async function setLang(lang) {
  if (lang !== 'es' && lang !== 'en') return;
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);

  try {
    const resp = await fetch(`locales/${lang}.json`);
    if (resp.ok) {
      dictionary = await resp.json();
    } else {
      dictionary = lang === 'en' ? FALLBACK_EN : FALLBACK_ES;
    }
  } catch {
    dictionary = lang === 'en' ? FALLBACK_EN : FALLBACK_ES;
  }

  // Notificar a la UI
  window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: currentLang } }));
}

/** Idioma actual */
export function getLang() {
  return currentLang;
}
