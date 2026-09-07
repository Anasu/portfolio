/* CONSOLE — Barra de comandos estilo terminal */
import { EXP } from '../data/exp.js';
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
    let exp = EXP.find(e => e.id === query);
    if (exp) return exp;
    // Match by normalized name (strip accents, spaces, hyphens)
    const norm = q => q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\-]+/g, '');
    for (const e of EXP) {
      if (norm(e.titulo.toLowerCase()) === norm(query)) return e;
    }
    // Partial match on normalized name
    const nq = norm(query);
    for (const e of EXP) {
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
        <a href="https://linkedin.com/in/anasu" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none;border:1px solid var(--green-dark);padding:6px 14px;font-family:var(--mono);font-size:.9rem;letter-spacing:1px">LinkedIn ↗</a>
        <a href="https://github.com/anasu" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none;border:1px solid var(--green-dark);padding:6px 14px;font-family:var(--mono);font-size:.9rem;letter-spacing:1px">GitHub ↗</a>
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
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">Para consultas, colaboraciones o propuestas: <a href="mailto:hola@anasu.dev" style="color:var(--green)">hola@anasu.dev</a></p>
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
            <a href="mailto:hola@anasu.dev" style="color:var(--green);text-decoration:none;font-family:var(--mono)">hola@anasu.dev</a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px;background:#0e2030;border:1px solid var(--brd)">
          <span style="font-size:1.2rem">💼</span>
          <div>
            <div style="color:var(--gold);font-size:.85rem;letter-spacing:1px">LINKEDIN</div>
            <a href="https://linkedin.com/in/anasu" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none;font-family:var(--mono)">linkedin.com/in/anasu ↗</a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;padding:8px;background:#0e2030;border:1px solid var(--brd)">
          <span style="font-size:1.2rem">🐙</span>
          <div>
            <div style="color:var(--gold);font-size:.85rem;letter-spacing:1px">GITHUB</div>
            <a href="https://github.com/anasu" target="_blank" rel="noopener" style="color:var(--green);text-decoration:none;font-family:var(--mono)">github.com/anasu ↗</a>
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
      '  ════════════════════════════════'
    ];
    helpText.forEach(line => logToPanel(line));
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
  };

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;

    const raw = input.value.trim();
    const cmd = raw.toLowerCase();
    input.value = '';
    if (!cmd) return;

    // Log the command typed
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
        break;

      case 'contact':
      case 'email':
        showContact();
        break;

      case 'ls':
      case 'dir':
        EXP.forEach(x => {
          const slug = x.titulo.toLowerCase().replace(/[\s\-]+/g, '-');
          logToPanel('[LS] ' + x.ico + ' ' + x.titulo.padEnd(12) + '[' + x.id + '|' + slug + ']');
        });
        break;

      case 'date':
        logToPanel('[DATE] ' + new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' }));
        break;

      case 'whoami':
        logToPanel('[WHOAMI] investigador@panel — Detective UX/UI, nivel clearance Ω');
        break;

      default:
        // Check if it starts with "open"
        if (cmd.startsWith('open ')) {
          const target = cmd.substring(5).trim();
          const exp = findExp(target);
          if (exp) {
            Window.open(exp);
            logToPanel('[OPEN] Abriendo: ' + exp.titulo + ' (' + exp.id + ')');
          } else {
            logToPanel('[ERR] Expediente no encontrado: "' + target + '". Escribe "ls" para ver los disponibles.');
          }
        }
        // Check terminal jokes
        else if (terminalJokes[cmd]) {
          logToPanel(terminalJokes[cmd]);
        }
        // Partial match for terminal commands
        else {
          let matched = false;
          for (const key of Object.keys(terminalJokes)) {
            if (key.startsWith(cmd) || cmd.startsWith(key.substring(0, 3))) {
              logToPanel('[SYS] ¿Quisiste decir: "' + key + '"? → ' + terminalJokes[key]);
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
            logToPanel(responses[Math.floor(Math.random() * responses.length)]);
          }
        }
        break;
    }
  });
}

function createFragment() {
  return document.createDocumentFragment();
}
