/**
 * CONFIG — Configuración global centralizada del portafolio.
 * Modificar aquí los datos estáticos sin tocar lógica de UI.
 */

export const CONFIG = Object.freeze({
  // Marca del sistema
  brand: {
    name: 'SISTEMA',
    version: '2.7b',
    title: 'Panel del Investigador — Portafolio',
    tagline: 'DETECTIVE // CLEARANCE: NIVEL-\u03A9',
  },

  // Usuario / perfil profesional
  user: {
    name: 'Anasú',
    role: 'Diseñador UX/UI · Director Técnico',
    roles: ['Diseñador UX/UI', 'Director Técnico'],
    bio: 'Diseñador de experiencias digitales con enfoque en accesibilidad, estrategia de producto y dirección técnica. Especializado en design systems, inclusión digital y optimización de flujos complejos.',
    stack: ['Figma', 'Design Tokens', 'Storybook', 'WCAG / Accesibilidad', 'Material Design', 'Product Strategy', 'AI / MCP'],
  },

  // Vías de contacto
  contact: {
    email: 'hola@anasu.dev',
    linkedin: 'https://linkedin.com/in/anasu',
    github: 'https://github.com/anasu',
  },

  // Sistema
  system: {
    clearance: '\u03A9',
    clearanceLabel: 'NIVEL-\u03A9',
    clearanceLevel: 'LEVEL-\u03A9',
    biosVersion: '4.2',
    ramSize: 65536,
    encryption: 'AES-256',
    timezone: 'America/Santiago',
    locale: 'es-AR',
  },

  // URLs
  urls: {
    canonical: 'https://anasu.github.io/portfolio/',
    manifest: 'manifest.json',
    favicon: 'favicon.svg',
  },

  // Consola
  console: {
    prompt: 'investigador@panel:~$ ',
    placeholder: '_ comando...',
    maxLines: 50,
  },

  // Expedientes — valores por defecto para render
  expedientes: {
    defaultStatus: 'abierto',
    solvedLabel: 'RESUELTOS',
    openLabel: 'ABIERTO',
    filesTitle: 'ARCHIVOS DEL SISTEMA',
    deliverablesTitle: 'ENTREGABLES',
    impactTitle: 'RESUMEN DE IMPACTO',
    challengeTitle: 'EL DESAFÍO',
    strategyTitle: 'ESTRATEGIA Y ACCIÓN',
  },

  // Terminal jokes — respuestas a comandos curiosos
  terminalJokes: Object.freeze({
    'sudo': '[SYS] No tienes privilegios de superusuario aquí, detective. Esto es un portafolio, no un servidor root.',
    'sudo rm -rf /': '[ALERT] Comando prohibido detectado. El sistema de archivos está protegido por el nivel de clearance Ω. Nice try.',
    'rm -rf /': '[ALERT] Eliminar todo? Ni lo intentes. Los expedientes están respaldados en triple copia con cifrado AES-256.',
    'ls -la': '[LS -la] total 4\ndrwx------   4 investigador staff  128  [acceso denegado — nivel Ω requerido]\n-rw-------   1 investigador staff 8192  clasificado\n...',
    'rm': '[SYS] No se permiten operaciones destructivas. Este es un entorno de solo lectura para visualización.',
    'cat /etc/passwd': '[SYS] Acceso denegado. El archivo passwd está encriptado con clave cuántica. Solo el administrador del sistema (yo) puede leerlo.',
    'ifconfig': '[NET] eth0: inet 10.Ω.0.42 — enlace seguro nivel Ω activo. SSID: "CLASSIFIED"',
    'ping': '[NET] ping: host no especificado. Prueba: ping google.com (pero aquí solo hay expedientes).',
    'kill': '[SYS] kill -9? Aquí nadie se mata, solo se resuelven problemas. 🕵️',
    'apt-get install': '[SYS] No hay repositorios apt en este sistema. Solo design tokens y componentes reutilizables.',
    'git commit': '[GIT] Ya hiciste un commit hace poco: "mover breadcrumb arriba a la izquierda como barra de navegación". Todo limpio.',
    'git push': '[GIT] Push exitoso. Los cambios están en Forgejo y GitHub. No olvides el mensaje del commit, detective.',
    'chmod 777': '[SYS] Permiso denegado. Aquí nadie tiene chmod 777. La seguridad es nivel Ω.',
    'make me a sandwich': '[SYS] "Make me a sandwich" — error 418: I\'m a teapot. El detective está de humor irónico hoy.',
    'hello': '[USR] Hola, detective. Escribe "help" para ver los comandos disponibles.',
    'hi': '[USR] Hey. ¿Buscas algún expediente en particular? Prueba: ls',
    'whoami': '[WHOAMI] Usuario: investigador@panel\nNivel de clearance: Ω\nRol: Detective UX/UI\nEstado: ONLINE',
    'pwd': '[FS] /home/investigador/expedientes — directorio actual de trabajo.',
    'exit': '[SYS] No puedes salir. Este portafolio es un bucle infinito de excelencia en diseño. 🔄',
    'quit': '[SYS] Quit? Ni hablar. Aún quedan expedientes por explorar.',
    'reboot': '[SYS] Reiniciando... > BIOS v4.2... OK\n> SISTEMA LISTO\nYa estás de vuelta. Todo funciona igual de bien.',
    'sudo make me a sandwich': '[ALERT] Comando compuesto detectado. No puedes usar sudo para hacer sándwiches en este sistema.',
  }),

  // Errores genéricos de consola (se eligen al azar)
  errorMessages: [
    '[ERR] Comando desconocido: "%s". Escribe "help" para ver los comandos disponibles.',
    '[ERR] "%s" no es reconocido. El detective necesita más información. Prueba: help',
    '[SYS] No reconozco ese comando. Parece código clasificado... o simplemente un error. Escribe "help".',
  ],

  // Boot messages — el último se genera dinámicamente
  bootMessages: [
    (cfg) => `> BIOS v${cfg.system.biosVersion}... OK`,
    (cfg) => `> RAM: ${cfg.system.ramSize}K... OK`,
    (cfg) => `> CRYPT: ${cfg.system.encryption}`,
    (cfg) => `> CLEARANCE: ${cfg.system.clearanceLabel}`,
  ],

  // SEO metadata — se genera dinámicamente desde los expedientes
  seo: {
    ogTitle: 'Panel del Investigador — Portafolio',
    ogDescription: 'Portafolio profesional de diseño UX/UI, dirección técnica y estrategia de producto.',
    ogType: 'website',
    ogLocale: 'es_CL',
    themeColor: '#7036E7',
  },

  // Ventanas
  windows: {
    mobileBreakpoint: 900,
    stackOffset: 12,
    minimizedWidth: 200,
    minimizedHeight: 32,
    minimizedGap: 4,
    zStart: 1000,
    zMax: 9000,
  },

  // Quake terminal
  quake: {
    minHeight: 80,
  },
});
