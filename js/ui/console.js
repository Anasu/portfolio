/* CONSOLE — Barra de comandos estilo terminal + Quake overlay */
import { EXP_LIST } from '../data/exp.js';
import { Window } from './window.js';
import { makeEl } from './utils.js';

export function renderConsole() {
  const consoleBar = document.querySelector('.console-bar');
  const fragment = createFragment();

  const prompt = makeEl('span', 'investigador@panel:~$ ', { class: 'cp' });
  const input = makeEl('input', '', {
    id: 'cin',
    placeholder: '_ comando...',
    spellcheck: 'false',
    autocomplete: 'off',
    type: 'text'
  });

  fragment.appendChild(prompt);
  fragment.appendChild(input);
  consoleBar.appendChild(fragment);

  // Referencias al quake terminal
  const quakeEl = document.getElementById('quake-terminal');
  const qtBody = document.getElementById('qt-body');
  const qtToggle = document.getElementById('quake-toggle');
  const qtResizeHandle = document.getElementById('qt-resize-handle');

  /** Resize — arrastrar handle para cambiar altura */
  let isResizing = false;

  function startResize(e) {
    e.preventDefault();
    isResizing = true;
    qtResizeHandle.classList.add('dragging');
    document.body.style.cursor = 'n-resize';
    document.body.style.userSelect = 'none';
  }

  function doResize(clientY) {
    if (!isResizing) return;
    const wrapperRect = consoleBar.parentElement.getBoundingClientRect();
    // Distancia desde el bottom del wrapper hasta el cursor
    let newHeight = wrapperRect.bottom - clientY;
    // Clamp entre 80px y 50vh
    const minH = 80;
    const maxH = Math.min(50 * window.innerHeight / 100, window.innerHeight - 28);
    newHeight = Math.max(minH, Math.min(maxH, newHeight));
    quakeEl.style.height = newHeight + 'px';
  }

  function stopResize() {
    if (!isResizing) return;
    isResizing = false;
    qtResizeHandle.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  // Mouse events para resize
  if (qtResizeHandle) {
    qtResizeHandle.addEventListener('mousedown', startResize);
    window.addEventListener('mousemove', e => doResize(e.clientY));
    window.addEventListener('mouseup', stopResize);
  }

  // Touch events para resize en móvil
  if (qtResizeHandle) {
    qtResizeHandle.addEventListener('touchstart', startResize, { passive: false });
    window.addEventListener('touchmove', e => {
      if (isResizing && e.touches[0]) doResize(e.touches[0].clientY);
    }, { passive: false });
    window.addEventListener('touchend', stopResize);
  }

  // Cerrar quake al hacer click afuera
  document.addEventListener('click', e => {
    if (!quakeOpen) return;
    const isInsideQuake = quakeEl.contains(e.target);
    const isInsideInput = input.contains(e.target);
    const isToggleBtn = qtToggle && qtToggle.contains(e.target);
    if (!isInsideQuake && !isInsideInput && !isToggleBtn) {
      closeQuake();
    }
  });

  /** Estado del quake terminal */
  let quakeOpen = false;
  const MAX_LINES = 50; // máximo de líneas históricas en el quake

  function updateToggleIcon() {
    if (qtToggle) qtToggle.textContent = quakeOpen ? 'v' : '^';
  }

  function openQuake() {
    if (quakeOpen) return;
    quakeEl.classList.remove('hidden');
    quakeOpen = true;
    updateToggleIcon();
    input.focus();
  }

  function closeQuake() {
    if (!quakeOpen) return;
    quakeEl.classList.add('hidden');
    quakeOpen = false;
    updateToggleIcon();
  }

  function toggleQuake() {
    quakeOpen ? closeQuake() : openQuake();
  }

  /** Agrega una línea al quake terminal */
  function qtLog(text, cls) {
    if (!quakeOpen && !text.startsWith('[USR]')) return;
    // Si se abre por un comando de usuario, abrir el quake
    if (text.startsWith('[USR]') && !quakeOpen) openQuake();

    const line = makeEl('div', text, { class: 'qt-line ' + (cls || 'qt-out') });
    qtBody.appendChild(line);

    // Mantener máximo de líneas
    while (qtBody.children.length > MAX_LINES) {
      qtBody.removeChild(qtBody.firstChild);
    }
    qtBody.scrollTop = qtBody.scrollHeight;
  }

  /** Escribe un mensaje en el panel lateral (registro) */
  const logToPanel = (msg, cls) => {
    const plog = document.querySelector('.plog');
    if (plog) {
      const line = makeEl('div', msg, { style: 'padding:1px 0' });
      if (cls) line.classList.add(cls);
      plog.appendChild(line);
      plog.scrollTop = plog.scrollHeight;
    }
  };

  /** Limpia el registro del panel */
  const clearPanel = () => {
    const plog = document.querySelector('.plog');
    if (plog) plog.innerHTML = '';
  };

  /** Encuentra un expediente por múltiples criterios (id, nombre, slug) */
  function findExp(query) {
    query = query.toLowerCase().trim();
    // Match by exact id
    let exp = EXP_LIST.find(e => e.id === query);
    if (exp) return exp;
    // Match by normalized name (strip accents, spaces, hyphens)
    const norm = q => q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\-]+/g, '');
    for (const e of EXP_LIST) {
      if (norm(e.titulo.toLowerCase()) === norm(query)) return e;
    }
    // Partial match on normalized name
    const nq = norm(query);
    for (const e of EXP_LIST) {
      if (norm(e.titulo.toLowerCase()).includes(nq) || nq.includes(norm(e.titulo.toLowerCase()))) return e;
    }
    return null;
  }

  /** Abre la ventana de biografía profesional */
  function openBio() {
    const bioContent = `
      <h2>👤 Anasú</h2>
      <div class="meta">
        <span>Diseñador UX/UI · Director Técnico</span>
        <span>E-MANTTO · FLUJO · PUENTE · NEXUS</span>
      </div>
      <p class="brief">Diseñador de experiencias digitales con enfoque en accesibilidad, estrategia de producto y dirección técnica. Especializado en design systems, inclusión digital y optimización de flujos complejos.</p>

      <h4>🔗 Enlaces</h4>
      <div style="display:flex;gap:16px;margin:12px 0;flex-wrap:wrap">
        <a href="https://linkedin.com/in/anasu" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;border:1px solid var(--accent-dark);padding:6px 14px;font-family:var(--mono);font-size:.9rem;letter-spacing:1px">LinkedIn ↗</a>
        <a href="https://github.com/anasu" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;border:1px solid var(--accent-dark);padding:6px 14px;font-family:var(--mono);font-size:.9rem;letter-spacing:1px">GitHub ↗</a>
        <a href="#" id="btn-download-cv" style="color:var(--gold);text-decoration:none;border:1px solid var(--gold);padding:6px 14px;font-family:var(--mono);font-size:.9rem;letter-spacing:1px">Descargar CV (PDF) ↓</a>
      </div>

      <h4>📋 Resumen</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">Con experiencia en aeronáutica, fintech, edtech y animación 3D, he liderado la transformación de productos digitales fragmentados en ecosistemas coherentes. Mi enfoque combina investigación de campo rigurosa con arquitectura de sistemas escalables.</p>

      <h4>🛠 Stack</h4>
      <div style="margin:8px 0">
        <span class="ftag ok">Figma</span>
        <span class="ftag ok">Design Tokens</span>
        <span class="ftag ok">Storybook</span>
        <span class="ftag ok">WCAG / Accesibilidad</span>
        <span class="ftag ok">Material Design</span>
        <span class="ftag ok">Product Strategy</span>
        <span class="ftag ok">AI / MCP</span>
      </div>

      <h4>📬 Contacto directo</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">Para consultas, colaboraciones o propuestas: <a href="mailto:hola@anasu.dev" style="color:var(--accent)">hola@anasu.dev</a></p>
    `;

    const win = new Window({ titulo: 'bio — perfil profesional', ico: '\u{1F464}' });
    win.render(bioContent);
    document.getElementById('btn-download-cv')?.addEventListener('click', (e) => {
      e.preventDefault();
      logToPanel('[SYS] Para descargar tu CV, accede a linkedin.com/in/anasu o envía un email a hola@anasu.dev');
    });
  }

  /** Muestra información de contacto */
  function showContact() {
    const contactContent = `
      <h2>📬 Contacto</h2>
      <div class="meta">
        <span>Vías de contacto directo</span>
      </div>
      <div style="margin:16px 0;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;gap:12px;padding:8px;background:#0e2030;border:1px solid var(--brd)">
          <span style="font-size:1.2rem">📧</span>
          <div>
            <div style="color:var(--gold);font-size:.85rem;letter-spacing:1px">EMAIL</div>
            <a href="mailto:hola@anasu.dev" style="color:var(--accent);text-decoration:none;font-family:var(--mono)">hola@anasu.dev</a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px;background:#0e2030;border:1px solid var(--brd)">
          <span style="font-size:1.2rem">💼</span>
          <div>
            <div style="color:var(--gold);font-size:.85rem;letter-spacing:1px">LINKEDIN</div>
            <a href="https://linkedin.com/in/anasu" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-family:var(--mono)">linkedin.com/in/anasu ↗</a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px;background:#0e2030;border:1px solid var(--brd)">
          <span style="font-size:1.2rem">🐙</span>
          <div>
            <div style="color:var(--gold);font-size:.85rem;letter-spacing:1px">GITHUB</div>
            <a href="https://github.com/anasu" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-family:var(--mono)">github.com/anasu ↗</a>
          </div>
        </div>
      </div>
    `;

    const win = new Window({ titulo: 'contacto', ico: '\u{1F4E4}' });
    win.render(contactContent);
  }

  /** Muestra la lista de comandos disponibles */
  function showHelp() {
    const helpText = [
      '[CMD] ═══ COMANDOS DISPONIBLES ═══',
      '',
      '  Navegación:',
      '    help / ayuda          → Muestra esta lista de comandos',
      '    ls / dir              → Lista los expedientes disponibles',
      '',
      '  Expedientes:',
      '    open [id]             → Abre un expediente por ID (ej: open exp001)',
      '    open [nombre]         → Abre un expediente por nombre (ej: open e-mantto, open flujo)',
      '',
      '  Perfil y contacto:',
      '    about / bio / cv      → Abre tu perfil profesional con enlaces',
      '    contact / email       → Muestra vías de contacto directo',
      '',
      '  Utilidades:',
      '    clear / cls           → Limpia el registro del panel lateral',
      '    date                  → Fecha y hora actual del sistema',
      '    whoami                → Información del usuario actual',
      '',
      '  ════════════════════════════════',
      '',
      '  🥚 Easter eggs — probá estos:',
      '    sudo, apt-get install   → Comandos de Linux',
      '    dnf update, npm start   → Fedora, Node, Yarn...',
      '    docker run, cargo build → Docker, Rust...',
      '    select -all, render     → ¿Maya? Nah.',
      '    exit, reboot            → ¿Querés salir? Jaja.',
      '',
      '  ════════════════════════════════'
    ];
    helpText.forEach(line => logToPanel(line));
    // También mostrar en quake terminal
    qtLog('[CMD] ═══ COMANDOS DISPONIBLES ═══', 'qt-sys');
    helpText.slice(1).forEach(line => {
      if (line === '') qtLog('');
      else qtLog(line, 'qt-out');
    });
  }

  /** Respuestas personalizadas para comandos de terminal comunes */
  const terminalJokes = {
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
    'quit': '[SYS] Quit? Ni hablar. Aún quedan 4 expedientes por explorar.',
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
  };

  // Toggle quake terminal con el botón ^
  if (qtToggle) qtToggle.addEventListener('click', toggleQuake);

  // Abrir quake al hacer focus en el input
  input.addEventListener('focus', () => {
    openQuake();
  });

  // Cerrar quake con Escape
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (quakeOpen) closeQuake();
      else input.blur();
      return;
    }
    if (e.key !== 'Enter') return;

    const raw = input.value.trim();
    const cmd = raw.toLowerCase();
    input.value = '';
    if (!cmd) return;

    // Log the command typed in quake terminal
    qtLog('$ ' + raw, 'qt-cmd');

    // Also log to panel
    logToPanel('[USR] ' + raw);

    switch (cmd) {
      case 'help':
      case 'ayuda':
        showHelp();
        break;

      case 'about':
      case 'bio':
      case 'cv':
        openBio();
        break;

      case 'clear':
      case 'cls':
        clearPanel();
        logToPanel('[SYS] Registro purgado con éxito.');
        qtLog('[SYS] Registro purgado con éxito.', 'qt-sys');
        break;

      case 'contact':
      case 'email':
        showContact();
        break;

      case 'ls':
      case 'dir':
        EXP_LIST.forEach(x => {
          const slug = x.titulo.toLowerCase().replace(/[\s\-]+/g, '-');
          logToPanel('[LS] ' + x.ico + ' ' + x.titulo.padEnd(12) + '[' + x.id + '|' + slug + ']');
        });
        // Also show in quake
        EXP_LIST.forEach(x => {
          const slug = x.titulo.toLowerCase().replace(/[\s\-]+/g, '-');
          qtLog('  ' + x.ico + ' ' + x.titulo.padEnd(12) + '[' + x.id + '|' + slug + ']', 'qt-out');
        });
        break;

      case 'date':
        const dateStr = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        logToPanel('[DATE] ' + dateStr);
        qtLog('[DATE] ' + dateStr, 'qt-sys');
        break;

      case 'whoami':
        const whoamiMsg = '[WHOAMI] investigador@panel — Detective UX/UI, nivel clearance Ω';
        logToPanel(whoamiMsg);
        qtLog(whoamiMsg, 'qt-gold');
        break;

      default:
        // Check if it starts with "open"
        if (cmd.startsWith('open ')) {
          const target = cmd.substring(5).trim();
          const exp = findExp(target);
          if (exp) {
            Window.open(exp);
            const openMsg = '[OPEN] Abriendo: ' + exp.titulo + ' (' + exp.id + ')';
            logToPanel(openMsg);
            qtLog(openMsg, 'qt-gold');
          } else {
            const errMsg = '[ERR] Expediente no encontrado: "' + target + '". Escribe "ls" para ver los disponibles.';
            logToPanel(errMsg);
            qtLog(errMsg, 'qt-err');
          }
        }
        // Check terminal jokes
        else if (terminalJokes[cmd]) {
          const joke = terminalJokes[cmd];
          logToPanel(joke);
          // Split multi-line responses for quake
          joke.split('\n').forEach(line => {
            if (line.includes('[ALERT]')) qtLog(line, 'qt-err');
            else if (line.includes('[SYS]') || line.includes('[GIT]') || line.includes('[NET]') || line.includes('[FS]')) qtLog(line, 'qt-sys');
            else if (line.includes('[WHOAMI]')) qtLog(line, 'qt-gold');
            else qtLog(line, 'qt-out');
          });
        }
        // Partial match for terminal commands
        else {
          let matched = false;
          for (const key of Object.keys(terminalJokes)) {
            if (key.startsWith(cmd) || cmd.startsWith(key.substring(0, 3))) {
              const msg = '[SYS] ¿Quisiste decir: "' + key + '"? → ' + terminalJokes[key];
              logToPanel(msg);
              qtLog(msg, 'qt-sys');
              matched = true;
              break;
            }
          }
          if (!matched) {
            const responses = [
              '[ERR] Comando desconocido: "' + cmd + '". Escribe "help" para ver los comandos disponibles.',
              '[ERR] "' + cmd + '" no es reconocido. El detective necesita más información. Prueba: help',
              '[SYS] No reconozco ese comando. Parece código clasificado... o simplemente un error. Escribe "help".'
            ];
            const err = responses[Math.floor(Math.random() * responses.length)];
            logToPanel(err);
            qtLog(err, 'qt-err');
          }
        }
        break;
    }

    // Mantener foco en el input después de ejecutar
    input.focus();
  });
}

function createFragment() {
  return document.createDocumentFragment();
}
