/**
 * JOKES — Respuestas de terminal (datos puros, sin lógica).
 * Importar desde config si ya existe, o usar este fallback.
 */

export const TERMINAL_JOKES = {
  'sudo': '[SYS] You don\'t have superuser privileges here, detective. This is a portfolio, not a root server.',
  'sudo rm -rf /': '[ALERT] Forbidden command detected. The file system is protected by Ω clearance level. Nice try.',
  'rm -rf /': '[ALERT] Delete everything? Don\'t even try. The files are backed up in triplicate with AES-256 encryption.',
  'ls -la': '[LS -la] total 4\ndrwx------   4 investigator staff  128  [access denied — Ω level required]\n-rw-------   1 investigator staff 8192  classified\n...',
  'rm': '[SYS] Destructive operations are not allowed. This is a read-only environment for viewing.',
  'cat /etc/passwd': '[SYS] Access denied. The passwd file is encrypted with a quantum key. Only the system administrator (me) can read it.',
  'ifconfig': '[NET] eth0: inet 10.Ω.0.42 — secure Ω level link active. SSID: "CLASSIFIED"',
  'ping': '[NET] ping: host not specified. Try: ping google.com (but here there are only files).',
  'kill': '[SYS] kill -9? Nobody dies here, we only solve problems. 🕵️',
  'apt-get install': '[SYS] There are no apt repositories in this system. Only design tokens and reusable components.',
  'git commit': '[GIT] You committed something recently: "move breadcrumb up to the left as navigation bar". All clean.',
  'git push': '[GIT] Push successful. Changes are on Forgejo and GitHub. Don\'t forget the commit message, detective.',
  'chmod 777': '[SYS] Permission denied. Nobody has chmod 777 here. Security is Ω level.',
  'make me a sandwich': '[SYS] "Make me a sandwich" — error 418: I\'m a teapot. The detective is in an ironic mood today.',
  'hello': '[USR] Hello, detective. Type "help" to see available commands.',
  'hi': '[USR] Hey. Looking for a specific file? Try: ls',
  'whoami': '[WHOAMI] User: investigator@panel\nClearance level: Ω\nRole: UX/UI Detective\nStatus: ONLINE',
  'pwd': '[FS] /home/investigator/files — current working directory.',
  'exit': '[SYS] You can\'t leave. This portfolio is an infinite loop of design excellence. 🔄',
  'quit': '[SYS] Quit? No way. There are still files to explore.',
  'reboot': '[SYS] Rebooting... > BIOS v4.2... OK\n> SYSTEM READY\nYou\'re back. Everything works just as well.',
  'sudo make me a sandwich': '[ALERT] Compound command detected. You can\'t use sudo to make sandwiches in this system.',

  // --- DNF (Fedora/RHEL) ---
  'dnf update': '[SYS] This isn\'t Fedora, detective. Updates here are for portfolios, not the kernel. But good intention.',
  'dnf install': '[SYS] dnf install? There are no RPM packages here — only design components and design tokens. Try `open exp001` instead.',

  // --- NPM / Node ---
  'npm start': '[SYS] npm start? The project is already running here, detective. You don\'t need package.json to explore the files.',
  'npm install': '[SYS] No node_modules here — only classified files. Dependencies are: creativity + curiosity.',
  'npm run': '[SYS] npm run? The only available script is `open [file]`. But you can try: npm run detective',

  // --- Yarn ---
  'yarn install': '[SYS] Yarn? We don\'t bundle packages here, we weave experiences. Files are ready to open.',
  'yarn start': '[SYS] You\'re already in the project, detective. No need for yarn start — just type `ls` and explore.',

  // --- Pip (Python) ---
  'pip install': '[SYS] pip install? This isn\'t a Python environment. Libraries here are Figma, Storybook and design tokens.',
  'pip install requests': '[SYS] You don\'t need requests to navigate — just `open [name]`. Although data is indeed requested with curiosity.',

  // --- Cargo (Rust) ---
  'cargo build': '[SYS] cargo build? We don\'t compile in Rust here, we build in UX. But the design is optimized like native code.',
  'cargo run': '[SYS] The project is already running. No need for cargo run — just `open exp001` to start.',

  // --- Make ---
  'make': '[SYS] make? There\'s no Makefile here — only files. But if needed, the target would be: make experience-awesome',
  'make all': '[SYS] make all already executed on system load. All files are compiled and ready.',

  // --- Docker ---
  'docker run': '[SYS] docker run? No containers here — only file windows running natively. 100% host performance.',
  'docker ps': '[SYS] docker ps? The only containers running are the panel windows. Use `ls` to list them.',

  // --- Composer (PHP) ---
  'composer install': '[SYS] composer install? We don\'t manage PHP dependencies here — only design systems and workflows.',

  // --- Bundle (Ruby) ---
  'bundle install': '[SYS] bundle install? There\'s no Gemfile in this project. The gems are: creativity, strategy and pixel-perfect.',

  // --- Maya / MEL ---
  'select -all': '[MAYA] Nice try, detective. This isn\'t Maya — there\'s no viewport to select all. But you can see all files with `ls`.',
  'selectAll': '[MAYA] selectAll? There\'s no 3D scene here, only 2D files. Try: `ls` to list all content.',
  'polySphere': '[MAYA] polySphere? This isn\'t Maya, detective. We don\'t create spheres here — we create interfaces. But good attempt at modeling.',
  'polyCube': '[MAYA] polyCube? No way to create 3D primitives in a web portfolio. Here the boxes are file cards.',
  'polyCylinder': '[MAYA] polyCylinder? There are no cylinders here — only data, design and strategy. The viewport is this panel, detective.',
  'move': '[MAYA] move? Objects don\'t move with MEL commands here. But files do flow between sections.',
  'rotate': '[MAYA] rotate? We don\'t rotate viewports here — we rotate product perspectives. That\'s done in strategy, not in MEL.',
  'scale': '[MAYA] scale? We don\'t scale polygons, we scale experiences. But you can enlarge files with `open [id]`.',
  'setKeyframe': '[MAYA] setKeyframe? This isn\'t Maya — there\'s no timeline or MEL animation. Flows are static but powerful.',
  'keyframe': '[MAYA] keyframe? We don\'t keyframe properties here — we keyframe design decisions. That stays in the files.',
  'playbackOptions': '[MAYA] playbackOptions? No 3D playback here. But files have their own storytelling rhythm.',
  'render': '[MAYA] render? We don\'t render Maya scenes here — we render interfaces directly in the browser. No Arnold, no mental ray.',
  'renderSceneButton': '[MAYA] renderSceneButton? There\'s no render button in this panel. Only file buttons and a curious detective.',
  'file -new': '[MAYA] file -new? We don\'t create new scenes here — we create experiences. But you can explore other files with `open [id]`.',
  'file -open': '[MAYA] file -open? This isn\'t Maya, detective. To open content use: `open [name or id of file]`.',
  'hotkey': '[MAYA] hotkey? Shortcuts here are: `open`, `ls`, `help`. No Ctrl+Q for query — but there is Ctrl+` for the console, detective.',
  'delete': '[MAYA] delete? This isn\'t Maya viewport. We don\'t delete polyMeshes here — only bad design gets deleted. And that doesn\'t exist here.',
};

/** Mensajes de error genéricos (se eligen al azar) */
export const ERROR_MESSAGES = [
  '[ERR] Unknown command: "%s". Type "help" to see available commands.',
  '[ERR] "%s" is not recognized. The detective needs more info. Try: help',
  '[SYS] I don\'t recognize that command. It looks like classified code... or just an error. Type "help".',
];
