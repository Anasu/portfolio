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
    email: 'anazconte@gmail.com',
    linkedin: 'https://linkedin.com/in/anasu',
    github: 'https://github.com/anasu',
  },

  // Formulario de correo (Formspree)
  formspree: {
    // Reemplaza con tu endpoint real de Formspree:
    // 1. Ir a https://formspree.io y crear cuenta gratis
    // 2. Crear un nuevo formulario → obtener endpoint tipo:
    //    https://formspree.io/f/xNqLaZkV
    // 3. Pegarlo abajo en `endpoint`
    endpoint: 'https://formspree.io/f/moeqypdz',
    fromName: 'Portafolio — Contacto Web',
    subjectPrefix: '[Portfolio Contact]',
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

    // --- DNF (Fedora/RHEL) ---
    'dnf update': '[SYS] Este no es Fedora, detective. Aquí las actualizaciones son de portfolio, no del kernel. Pero buena intención.',
    'dnf install': '[SYS] dnf install? Acá no hay paquetes RPM — solo componentes de diseño y design tokens. Try `open exp001` instead.',

    // --- NPM / Node ---
    'npm start': '[SYS] npm start? Aquí el proyecto ya está corriendo, detective. No necesitas package.json para explorar los expedientes.',
    'npm install': '[SYS] No hay node_modules aquí — solo expedientes clasificados. Los dependencies son: creatividad + curiosidad.',
    'npm run': '[SYS] npm run? El único script disponible es `open [expediente]`. Pero puedes probar: npm run detective',

    // --- Yarn ---
    'yarn install': '[SYS] Yarn? Acá no hilamos paquetes, hilamos experiencias. Los expedientes están listos para abrir.',
    'yarn start': '[SYS] Ya estás dentro del proyecto, detective. No hace falta yarn start — solo escribe `ls` y explora.',

    // --- Pip (Python) ---
    'pip install': '[SYS] pip install? Esto no es un entorno Python. Acá las librerías son Figma, Storybook y design tokens.',
    'pip install requests': '[SYS] No necesitas requests para navegar — solo `open [nombre]`. Aunque los datos sí se piden con curiosidad.',

    // --- Cargo (Rust) ---
    'cargo build': '[SYS] cargo build? Acá no compilamos en Rust, construimos en UX. Pero el diseño está optimizado como código nativo.',
    'cargo run': '[SYS] El proyecto ya está corriendo. No hace falta cargo run — solo `open exp001` para empezar.',

    // --- Make ---
    'make': '[SYS] make? Acá no hay Makefile — solo expedientes. Pero si hiciera falta, el target sería: make experience-awesome',
    'make all': '[SYS] make all ya se ejecutó al cargar el sistema. Todos los expedientes están compilados y listos.',

    // --- Docker ---
    'docker run': '[SYS] docker run? No hay contenedores aquí — solo ventanas de expedientes corriendo nativamente. 100% host performance.',
    'docker ps': '[SYS] docker ps? Las únicas containers running son las ventanas del panel. Usa `ls` para listarlas.',

    // --- Composer (PHP) ---
    'composer install': '[SYS] composer install? Acá no gestionamos dependencies PHP — solo design systems y flujos de trabajo.',

    // --- Bundle (Ruby) ---
    'bundle install': '[SYS] bundle install? No hay Gemfile en este proyecto. Los gems son: creatividad, estrategia y pixel-perfect.',

    // --- Maya / MEL ---
    'select -all': '[MAYA] Nice try, detective. Esto no es Maya — no hay viewport para seleccionar todo. Pero sí puedes ver todos los expedientes con `ls`.',
    'selectAll': '[MAYA] selectAll? Acá no hay escena 3D, solo expedientes 2D. Prueba: `ls` para listar todo el contenido.',
    'polySphere': '[MAYA] polySphere? Esto no es Maya, detective. No creamos esferas aquí — creamos interfaces. Pero buen intento con el modeling.',
    'polyCube': '[MAYA] polyCube? Ni modo de crear primitivas 3D en un portafolio web. Acá las cajas son cards de expedientes.',
    'polyCylinder': '[MAYA] polyCylinder? Acá no hay cilindros — solo datos, diseño y estrategia. El viewport es este panel, detective.',
    'move': '[MAYA] move? Los objetos no se mueven con el comando MEL aquí. Pero los expedientes sí fluyen entre secciones.',
    'rotate': '[MAYA] rotate? Acá no rotamos viewports — rotamos perspectivas de producto. Eso se hace en la estrategia, no en MEL.',
    'scale': '[MAYA] scale? No escalamos polígonos, escalamos experiencias. Pero puedes ampliar expedientes con `open [id]`.',
    'setKeyframe': '[MAYA] setKeyframe? Esto no es Maya — no hay línea de tiempo ni animación MEL. Los flujos son estáticos pero potentes.',
    'keyframe': '[MAYA] keyframe? Acá no keyteamos propiedades — keyteamos decisiones de diseño. Eso queda en los expedientes.',
    'playbackOptions': '[MAYA] playbackOptions? No hay reproducción 3D aquí. Pero los expedientes tienen su propio ritmo de storytelling.',
    'render': '[MAYA] render? Acá no renderizamos escenas Maya — renderizamos interfaces directamente en el browser. Sin Arnold, sin mental ray.',
    'renderSceneButton': '[MAYA] renderSceneButton? No hay botón de render en este panel. Solo botones de expedientes y un detective curioso.',
    'file -new': '[MAYA] file -new? Acá no creamos escenas nuevas — creamos experiencias. Pero puedes explorar otros expedientes con `open [id]`.',
    'file -open': '[MAYA] file -open? Esto no es Maya, detective. Para abrir contenido usa: `open [nombre o id del expediente]`.',
    'hotkey': '[MAYA] hotkey? Acá los shortcuts son: `open`, `ls`, `help`. No hay Ctrl+Q para query — pero sí Ctrl+` para la consola, detective.',
    'delete': '[MAYA] delete? Esto no es Maya viewport. Acá no borramos polyMeshes — solo se eliminan los mal diseño. Y eso no existe aquí.',
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
    themeColor: '#c9a84c',
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
