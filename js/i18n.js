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

  // Boot messages
  boot_bios: (v) => `> BIOS v${v}... OK`,
  boot_ram: (k) => `> RAM: ${k}K... OK`,
  boot_crypt: '> CRYPT: AES-256',
  boot_clearance: '> CLEARANCE: NIVEL-Ω',

  // Contacto folder name
  contact_folder_name: 'Contacto',
  contact_folder_cat: 'email',

  // User bio
  user_contact_email: 'anazconte@gmail.com',

  // Expediente translations (ES = original)
  exp001_cat: 'Design System · Aeronáutica',
  exp001_niv: 'CONFIDENCIAL',
  exp001_det: 'Design system integral para el área de mantenimiento aeronáutico. Centralización de componentes y optimización de flujos de alta densidad operativa.',
  exp001_tech: 'Figma | Design Tokens | AI (MCP) | Gobernanza UX | Storybook',
  exp001_impacto_0_lab: 'TTM', exp001_impacto_0_val: '7 → 1 mes', exp001_impacto_0_desc: '+IA en fase 2',
  exp001_impacto_1_lab: 'Adopción', exp001_impacto_1_val: '+90%', exp001_impacto_1_desc: 'reutilización en células activas',
  exp001_impacto_2_lab: 'CSAT', exp001_impacto_2_val: '>4.5 / 5', exp001_impacto_2_desc: 'satisfacción equipo producto',
  exp001_impacto_3_lab: 'Escala', exp001_impacto_3_val: '~10 prod.', exp001_impacto_3_desc: 'ecosistema unificado',
  exp001_desafio: 'El área de mantenimiento operaba con ~10 productos digitales fragmentados, cada uno resolviendo pantallas complejas (filtros, dashboards, formularios) de forma aislada. Esto generaba graves inconsistencias de flujo y UI, elevando el riesgo de error humano en operaciones críticas de seguridad aérea.',
  exp001_estrategia_0_tit: 'Diseño para la Densidad', exp001_estrategia_0_txt: 'Traduje la identidad visual a contextos industriales sumamente densos, resguardando accesibilidad y consistencia.',
  exp001_estrategia_1_tit: 'Estandarización Sin Fricción', exp001_estrategia_1_txt: 'Guías de patrones UI/UX (dashboards/filtros avanzados) + plantillas con componentes intercambiables. Síntesis de soluciones existentes para minimizar resistencia al cambio.',
  exp001_estrategia_2_tit: 'Eficiencia con IA', exp001_estrategia_2_txt: 'Modelo MCP + arneses de IA para automatizar tareas operativas diarias del equipo de diseño.',

  exp002_cat: 'Fintech · Inclusión Financiera',
  exp002_niv: 'CONFIDENCIAL',
  exp002_det: 'Rediseño de arquitectura, accesibilidad y convergencia nativa para una app de inclusión financiera de uso masivo. Transición tecnológica y unificación de criterios de diseño multiplataforma para eliminar fricciones operativas.',
  exp002_tech: 'Sketch to Figma | iOS | Android | WCAG | Handoff',
  exp002_impacto_0_lab: 'Migración', exp002_impacto_0_val: '→ 1 año', exp002_impacto_0_desc: 'transición integral completa de la app',
  exp002_impacto_1_lab: 'Handoff', exp002_impacto_1_val: '→ 0 ambig.', exp002_impacto_1_desc: 'fuente única de verdad diseño/dev/QA',
  exp002_impacto_2_lab: 'Accesibilidad', exp002_impacto_2_val: '→ WCAG', exp002_impacto_2_desc: 'optimización universal de contraste y tacto',
  exp002_impacto_3_lab: 'Convergencia', exp002_impacto_3_val: '→ 2 SO', exp002_impacto_3_desc: 'eliminación de inconsistencias iOS/Android',
  exp002_desafio: 'La plataforma operaba sobre una tecnología híbrida con una arquitectura descentralizada, documentación contradictoria y flujos críticos sin registrar. Adicionalmente, existía una grave falta de consistencia entre Android e iOS (sesgo excesivo hacia Material Design) y pantallas clave sin adaptar para accesibilidad.',
  exp002_estrategia_0_tit: 'Arqueología de Flujos', exp002_estrategia_0_txt: 'Mapeé y documenté centralizadamente las pantallas y caminos alternativos (happy paths y unhappy paths) para comprender las decisiones de negocio previas antes de rediseñar.',
  exp002_estrategia_1_tit: 'Accesibilidad Aplicada', exp002_estrategia_1_txt: 'Modifiqué la interfaz para cumplir estándares WCAG, optimizando contrastes de color, ampliando áreas táctiles a un mínimo de 40px y adaptando la navegación crítica al alcance del pulgar en dispositivos móviles grandes.',
  exp002_estrategia_2_tit: 'Diferenciación Multiplataforma', exp002_estrategia_2_txt: 'Creé librerías específicas para iOS (utilizando tipografía San Francisco, iconos nativos, títulos centrados y bordes redondeados adaptados) de forma sincronizada con Android para garantizar una experiencia nativa real en ambos sistemas operativos.',
  exp002_estrategia_3_tit: 'Estandarización Crítica', exp002_estrategia_3_txt: 'Diseñé componentes de apoyo y normalicé patrones de flujo de alta fricción (pantallas de carga, comprobantes y recibos de transferencia).',

  exp003_cat: 'EdTech · Inclusión Digital',
  exp003_niv: 'CONFIDENCIAL',
  exp003_det: 'Plataforma escolar omnicanal (App Móvil para apoderados + Dashboard Web para colegios) diseñada para mitigar brechas tecnológicas, límites de conectividad y barreras culturales en entornos vulnerables.',
  exp003_tech: 'B2B/B2C | Inclusive Design | Material Design 2 | Product Strategy | Offline UX',
  exp003_impacto_0_lab: 'Omnicanalidad', exp003_impacto_0_val: '→ 0% dep.', exp003_impacto_0_desc: 'contingencia SMS/Push sin datos móviles',
  exp003_impacto_1_lab: 'Accesible', exp003_impacto_1_val: '→ Base', exp003_impacto_1_desc: 'contrastes optimizados + zonas táctiles aumentadas',
  exp003_impacto_2_lab: 'Eficiencia B2B', exp003_impacto_2_val: '→ 13"', exp003_impacto_2_desc: 'dashboard web ultracoracto para portátiles',
  exp003_impacto_3_lab: 'Adopción', exp003_impacto_3_val: '→ 0 curva', exp003_impacto_3_desc: 'apalancada en modelos mentales de apps diarias',
  exp003_desafio: 'La investigación en escuelas de Quilicura reveló una severa brecha de comunicación entre apoderados (locales y migrantes) y el colegio. Las familias enfrentaban barreras como conectividad intermitente (sin datos móviles activos), dispositivos antiguos de gama baja, baja alfabetización digital y dificultades visuales.',
  exp003_estrategia_0_tit: 'Alineación con Modelos Mentales', exp003_estrategia_0_txt: 'Mapeé en terreno las aplicaciones de uso cotidiano de las familias y aproveché esos patrones UX conocidos (utilizando la base de Material Design 2) para eliminar la resistencia y facilitar el aprendizaje autónomo.',
  exp003_estrategia_1_tit: 'Diseño Inclusivo Extremo', exp003_estrategia_1_txt: 'Estructuré una jerarquía visual ultra-clara, aumentando los contrastes de color y escalando las dimensiones de botones e inputs para contrarrestar fatiga visual y baja resolución de terminales.',
  exp003_estrategia_2_tit: 'SMS Fallback (Tecnología/Negocio)', exp003_estrategia_2_txt: 'Negocié con el equipo técnico y de negocio el despliegue automático de alertas SMS como canal secundario de comunicación para asegurar la recepción del mensaje cuando los apoderados no dispusieran de conexión a internet para notificaciones Push.',
  exp003_estrategia_3_tit: 'Dashboard Administrativo Eficiente', exp003_estrategia_3_txt: 'Diseñé la interfaz del personal escolar optimizándola específicamente para Google Chrome en pantallas portátiles de 13 pulgadas, implementando tablas limpias con acciones inmediatas por fila para no sobrecargar de información a los administrativos.',

  exp004_cat: 'Dirección Técnica · Animación 3D',
  exp004_niv: 'PÚBLICO (CNTV)',
  exp004_det: 'Dirección técnica, optimización de pipelines de renderizado y reestructuración sistémica de assets 3D para una serie de animación nacional financiada con fondos públicos (CNTV).',
  exp004_tech: '3D Pipelines | Render Optimization | Technical Direction | Systemic Design | Budget Auditing',
  exp004_impacto_0_lab: 'Render', exp004_impacto_0_val: '→ 4 meses', exp004_impacto_0_desc: 'reducción costos de tiempo de render',
  exp004_impacto_1_lab: 'Layout', exp004_impacto_1_val: '<50%', exp004_impacto_1_desc: 'reducción tiempo de layout',
  exp004_impacto_2_lab: 'Auditoría', exp004_impacto_2_val: '→ 100%', exp004_impacto_2_desc: 'aprobación y cero observaciones CNTV',
  exp004_impacto_3_lab: 'Producto', exp004_impacto_3_val: '→ Shift', exp004_impacto_3_desc: 'traslado de animación a diseño software',
  exp004_desafio: 'La producción de la primera temporada de la serie 3D operaba bajo un flujo altamente ineficiente: los fondos tomaban varios minutos en renderizarse para un promedio de 150 planos por episodio. La iluminación se configuraba de manera ad-hoc por escena, generando inconsistencias, problemas de cámara, riesgo de retrasos críticos en las entregas de compromisos estatales y un gasto de recursos técnicos desproporcionado.',
  exp004_estrategia_0_tit: 'Optimización de Layouts y Cámara', exp004_estrategia_0_txt: 'Diseñé un sistema de fondos predeterminados listos para postproducción. Implementé una cámara riggeada con tiros preestablecidos exclusivos para la interacción de personajes con el fondo, estandarizando una focal de 60 mm para los planos generales.',
  exp004_estrategia_1_tit: 'Modularización de Iluminación', exp004_estrategia_1_txt: 'Reemplacé la iluminación universal por un sistema dedicado por personaje, importando sets lumínicos preconfigurados según la posición de la cámara. En la temporada 2, simplifiqué radicalmente la renderización mediante técnicas de colores planos y oclusión ambiental (estilo Pocoyó), sacrificando elementos secundarios para blindar la consistencia visual y los plazos de entrega.',
  exp004_estrategia_2_tit: 'Depuración Sistémica de Rigs', exp004_estrategia_2_txt: 'Reconstruí rigs defectuosos de personajes clave para desbloquear su potencial técnico. Rediseñé el tallo del personaje Filomena para otorgarle máxima amplitud de movimiento (permitiéndole protagonizar un capítulo completo) e integré sistemas FK/IK en las extremidades de Rocío para resolver las complejas interacciones con la tecnología del entorno.',
  exp004_estrategia_3_tit: 'Trazabilidad Financiera y Auditoría', exp004_estrategia_3_txt: 'Supervisé la administración de recursos y el control de insumos en el equipo. Diseñé un pipeline de reportes minuciosos por capítulo, escena y fotograma para auditar cada render, asegurando la trazabilidad absoluta del presupuesto ante las exigencias estatales.',
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

  // Boot messages
  boot_bios: (v) => `> BIOS v${v}... OK`,
  boot_ram: (k) => `> RAM: ${k}K... OK`,
  boot_crypt: '> CRYPT: AES-256',
  boot_clearance: '> CLEARANCE: LEVEL-Ω',

  // Contacto folder name
  contact_folder_name: 'Contact',
  contact_folder_cat: 'email',

  // User bio
  user_contact_email: 'anazconte@gmail.com',

  // Expediente translations (EN)
  exp001_cat: 'Design System · Aviation',
  exp001_niv: 'CONFIDENTIAL',
  exp001_det: 'Comprehensive design system for the aviation maintenance area. Centralization of components and optimization of high-density operational workflows.',
  exp001_tech: 'Figma | Design Tokens | AI (MCP) | UX Governance | Storybook',
  exp001_impacto_0_lab: 'TTM', exp001_impacto_0_val: '7 → 1 month', exp001_impacto_0_desc: '+AI in phase 2',
  exp001_impacto_1_lab: 'Adoption', exp001_impacto_1_val: '+90%', exp001_impacto_1_desc: 'reuse in active cells',
  exp001_impacto_2_lab: 'CSAT', exp001_impacto_2_val: '>4.5 / 5', exp001_impacto_2_desc: 'product team satisfaction',
  exp001_impacto_3_lab: 'Scale', exp001_impacto_3_val: '~10 prod.', exp001_impacto_3_desc: 'unified ecosystem',
  exp001_desafio: 'The maintenance area operated with ~10 fragmented digital products, each solving complex screens (filters, dashboards, forms) in isolation. This generated serious workflow and UI inconsistencies, increasing the risk of human error in critical air safety operations.',
  exp001_estrategia_0_tit: 'Design for Density', exp001_estrategia_0_txt: 'I translated the visual identity into extremely dense industrial contexts, safeguarding accessibility and consistency.',
  exp001_estrategia_1_tit: 'Frictionless Standardization', exp001_estrategia_1_txt: 'UI/UX pattern guides (advanced dashboards/filters) + templates with interchangeable components. Synthesis of existing solutions to minimize resistance to change.',
  exp001_estrategia_2_tit: 'Efficiency with AI', exp001_estrategia_2_txt: 'MCP model + AI harnesses to automate the design team\'s daily operational tasks.',

  exp002_cat: 'Fintech · Financial Inclusion',
  exp002_niv: 'CONFIDENTIAL',
  exp002_det: 'Architecture redesign, accessibility and native convergence for a mass-use financial inclusion app. Technological transition and unification of multi-platform design criteria to eliminate operational frictions.',
  exp002_tech: 'Sketch to Figma | iOS | Android | WCAG | Handoff',
  exp002_impacto_0_lab: 'Migration', exp002_impacto_0_val: '→ 1 year', exp002_impacto_0_desc: 'complete integral transition of the app',
  exp002_impacto_1_lab: 'Handoff', exp002_impacto_1_val: '→ 0 ambig.', exp002_impacto_1_desc: 'single source of truth design/dev/QA',
  exp002_impacto_2_lab: 'Accessibility', exp002_impacto_2_val: '→ WCAG', exp002_impacto_2_desc: 'universal contrast and touch optimization',
  exp002_impacto_3_lab: 'Convergence', exp002_impacto_3_val: '→ 2 OS', exp002_impacto_3_desc: 'elimination of iOS/Android inconsistencies',
  exp002_desafio: 'The platform operated on a hybrid technology with a decentralized architecture, contradictory documentation and critical flows unrecorded. Additionally, there was a serious lack of consistency between Android and iOS (excessive bias toward Material Design) and key screens not adapted for accessibility.',
  exp002_estrategia_0_tit: 'Flow Archaeology', exp002_estrategia_0_txt: 'I mapped and centrally documented screens and alternative paths (happy paths and unhappy paths) to understand previous business decisions before redesigning.',
  exp002_estrategia_1_tit: 'Applied Accessibility', exp002_estrategia_1_txt: 'I modified the interface to meet WCAG standards, optimizing color contrasts, enlarging touch areas to a minimum of 40px and adapting critical navigation to thumb reach on large mobile devices.',
  exp002_estrategia_2_tit: 'Multi-platform Differentiation', exp002_estrategia_2_txt: 'I created specific libraries for iOS (using San Francisco typography, native icons, centered titles and adapted rounded borders) synchronized with Android to guarantee a truly native experience on both operating systems.',
  exp002_estrategia_3_tit: 'Critical Standardization', exp002_estrategia_3_txt: 'I designed support components and normalized high-friction flow patterns (loading screens, receipts and transfer confirmations).',

  exp003_cat: 'EdTech · Digital Inclusion',
  exp003_niv: 'CONFIDENTIAL',
  exp003_det: 'Omnichannel school platform (Mobile App for parents + Web Dashboard for schools) designed to mitigate technology gaps, connectivity limits and cultural barriers in vulnerable settings.',
  exp003_tech: 'B2B/B2C | Inclusive Design | Material Design 2 | Product Strategy | Offline UX',
  exp003_impacto_0_lab: 'Omnichannel', exp003_impacto_0_val: '→ 0% dep.', exp003_impacto_0_desc: 'SMS/Push contingency without mobile data',
  exp003_impacto_1_lab: 'Accessible', exp003_impacto_1_val: '→ Base', exp003_impacto_1_desc: 'optimized contrasts + enlarged touch zones',
  exp003_impacto_2_lab: 'B2B Efficiency', exp003_impacto_2_val: '→ 13"', exp003_impacto_2_desc: 'ultracompact web dashboard for laptops',
  exp003_impacto_3_lab: 'Adoption', exp003_impacto_3_val: '→ 0 curve', exp003_impacto_3_desc: 'leveraging daily app mental models',
  exp003_desafio: 'Research in Quilicura schools revealed a severe communication gap between parents (local and migrant) and the school. Families faced barriers such as intermittent connectivity (no active mobile data), low-end older devices, low digital literacy and visual difficulties.',
  exp003_estrategia_0_tit: 'Alignment with Mental Models', exp003_estrategia_0_txt: 'I mapped in the field the everyday apps used by families and leveraged those known UX patterns (using the Material Design 2 base) to eliminate resistance and facilitate autonomous learning.',
  exp003_estrategia_1_tit: 'Extreme Inclusive Design', exp003_estrategia_1_txt: 'I structured an ultra-clear visual hierarchy, increasing color contrasts and scaling button and input dimensions to counteract visual fatigue and low terminal resolution.',
  exp003_estrategia_2_tit: 'SMS Fallback (Tech/Business)', exp003_estrategia_2_txt: 'I negotiated with the technical and business team the automatic deployment of SMS alerts as a secondary communication channel to ensure message receipt when parents didn\'t have internet access for Push notifications.',
  exp003_estrategia_3_tit: 'Efficient Administrative Dashboard', exp003_estrategia_3_txt: 'I designed the school staff interface specifically optimized for Google Chrome on 13-inch laptop screens, implementing clean tables with immediate per-row actions to avoid overwhelming administrators with information.',

  exp004_cat: 'Technical Direction · 3D Animation',
  exp004_niv: 'PUBLIC (CNTV)',
  exp004_det: 'Technical direction, render pipeline optimization and systemic restructuring of 3D assets for a national animation series funded with public funds (CNTV).',
  exp004_tech: '3D Pipelines | Render Optimization | Technical Direction | Systemic Design | Budget Auditing',
  exp004_impacto_0_lab: 'Render', exp004_impacto_0_val: '→ 4 months', exp004_impacto_0_desc: 'render time cost reduction',
  exp004_impacto_1_lab: 'Layout', exp004_impacto_1_val: '<50%', exp004_impacto_1_desc: 'layout time reduction',
  exp004_impacto_2_lab: 'Audit', exp004_impacto_2_val: '→ 100%', exp004_impacto_2_desc: 'approval and zero CNTV observations',
  exp004_impacto_3_lab: 'Product', exp004_impacto_3_val: '→ Shift', exp004_impacto_3_desc: 'animation shift to software design',
  exp004_desafio: 'The production of the first season of the 3D series operated under a highly inefficient workflow: backgrounds took several minutes to render for an average of 150 shots per episode. Lighting was configured ad-hoc per scene, generating inconsistencies, camera issues, risk of critical delays in state commitment deliveries and disproportionate technical resource expenditure.',
  exp004_estrategia_0_tit: 'Layout and Camera Optimization', exp004_estrategia_0_txt: 'I designed a system of predetermined backgrounds ready for post-production. I implemented a rigged camera with preset angles exclusive for character-background interaction, standardizing a 60mm focal length for general shots.',
  exp004_estrategia_1_tit: 'Lighting Modularization', exp004_estrategia_1_txt: 'I replaced universal lighting with a character-dedicated system, importing preconfigured light sets according to camera position. In season 2, I radically simplified rendering through flat colors and ambient occlusion techniques (Pocoyó style), sacrificing secondary elements to safeguard visual consistency and delivery deadlines.',
  exp004_estrategia_2_tit: 'Systemic Rig Depuration', exp004_estrategia_2_txt: 'I rebuilt defective rigs of key characters to unlock their technical potential. I redesigned Filomena\'s spine to give it maximum movement range (allowing her to star in a complete chapter) and integrated FK/IK systems in Rocío\'s limbs to resolve complex interactions with the environment technology.',
  exp004_estrategia_3_tit: 'Financial Traceability and Auditing', exp004_estrategia_3_txt: 'I supervised resource management and input control within the team. I designed a detailed reporting pipeline by chapter, scene and frame to audit every render, ensuring absolute budget traceability before state requirements.',
};

/**
 * Inicializa el motor i18n.
 * Carga el idioma guardado o usa el default.
 */
export async function initI18n() {
  const saved = localStorage.getItem('portfolio-lang');
  currentLang = (saved === 'en' || saved === 'es') ? saved : DEFAULT_LANG;

  // Solo cargar JSON para EN — ES usa fallback embebido
  if (currentLang === 'en') {
    try {
      const resp = await fetch(`locales/en.json`);
      if (resp.ok) {
        dictionary = await resp.json();
        console.log('[I18N] Loaded en from locales/');
      } else {
        dictionary = FALLBACK_EN;
        console.log('[I18N] Using embedded EN fallback');
      }
    } catch {
      dictionary = FALLBACK_EN;
      console.log('[I18N] Using embedded EN fallback (no fetch)');
    }
  } else {
    dictionary = FALLBACK_ES;
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

  // Solo cargar JSON para EN (ES usa fallback embebido — no existe es.json)
  if (lang === 'en') {
    try {
      const resp = await fetch(`locales/en.json`);
      if (resp.ok) {
        dictionary = await resp.json();
        console.log('[I18N] Loaded en from locales/');
      } else {
        dictionary = FALLBACK_EN;
        console.log('[I18N] Using embedded EN fallback');
      }
    } catch (e) {
      dictionary = FALLBACK_EN;
      console.log('[I18N] Using embedded EN fallback (no fetch)');
    }
  } else {
    dictionary = FALLBACK_ES;
  }

  // Notificar a la UI
  window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: currentLang } }));
}

/** Idioma actual */
export function getLang() {
  return currentLang;
}
