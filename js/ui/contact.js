/* CONTACT — Módulo de contacto: ícono escritorio + ventana terminal de correo */
import { CONFIG } from '../data/config.js';
import { Window } from './window.js';
import { makeEl } from './utils.js';

// ─── Sonido beep retro (base64 WAV, ~0.3s) ──────────────────────────
const SEND_SOUND_BEEP = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

// ─── Estado ──────────────────────────────────────────────────────────
let contactIconEl = null;   // ícono fijo en escritorio (desktop)
let emailWindowEl = null;   // referencia a la ventana de correo abierta
let isEmailSending = false; // bandera de envío activo

// ─── Utilidades internas ─────────────────────────────────────────────

/** Crea un input retro estilo terminal */
function makeRetroInput(id, label, opts = {}) {
  const wrapper = makeEl('div', '', { class: 'cfld' });

  const lbl = makeEl('label', label + ': ', { for: id, class: 'clbl' });
  if (opts.required) lbl.appendChild(makeEl('span', '*', { class: 'req' }));
  wrapper.appendChild(lbl);

  const input = makeEl('input', '', {
    type: opts.type || 'text',
    id: id,
    name: opts.name || id,
    placeholder: opts.placeholder || '',
    readonly: opts.readonly || false,
    disabled: opts.disabled || false,
    required: opts.required || false,
    autocomplete: opts.autocomplete || 'off',
    spellcheck: 'false',
    class: 'rinput' + (opts.readonly ? ' rro' : ''),
  });

  if (opts.value) input.value = opts.value;
  wrapper.appendChild(input);
  return wrapper;
}

/** Crea un textarea retro estilo terminal */
function makeRetroTextarea(id, label, opts = {}) {
  const wrapper = makeEl('div', '', { class: 'cfld' });

  const lbl = makeEl('label', label + ': ', { for: id, class: 'clbl' });
  if (opts.required) lbl.appendChild(makeEl('span', '*', { class: 'req' }));
  wrapper.appendChild(lbl);

  const ta = makeEl('textarea', '', {
    id: id,
    name: opts.name || id,
    placeholder: opts.placeholder || '',
    rows: opts.rows || 6,
    required: opts.required || false,
    spellcheck: 'false',
    class: 'rta',
  });

  wrapper.appendChild(ta);
  return wrapper;
}

/** Renderiza el contenido del formulario de correo */
function renderEmailForm(container) {
  // Limpiar contenedor
  container.innerHTML = '';

  // Header estilo terminal
  const header = makeEl('div', '', { class: 'em-header' });
  header.appendChild(makeEl('div', '', { class: 'em-title-bar' }));
  header.appendChild(makeEl('span', '╔══ MAIL TERMINAL v1.0 ═══════════════════════╗', { class: 'em-banner' }));
  container.appendChild(header);

  // Formulario
  const form = makeEl('form', '', { class: 'email-form', id: 'email-form' });

  // TO (readonly)
  form.appendChild(makeRetroInput('to', 'TO', {
    value: CONFIG.contact.email,
    readonly: true,
    name: '_replyto',
  }));

  // FROM
  form.appendChild(makeRetroInput('from', 'FROM', {
    required: true,
    type: 'email',
    placeholder: 'tu@email.com',
  }));

  // CC
  form.appendChild(makeRetroInput('cc', 'CC', {
    type: 'email',
    placeholder: 'copia@destino.com (opcional)',
  }));

  // BCC
  form.appendChild(makeRetroInput('bcc', 'BCC', {
    type: 'email',
    placeholder: 'copia oculta (opcional)',
  }));

  // Asunto
  form.appendChild(makeRetroInput('subject', 'ASUNTO', {
    required: true,
    placeholder: 'Tema del mensaje...',
    name: 'subject',
  }));

  // Mensaje
  form.appendChild(makeRetroTextarea('body', 'MENSAJE', {
    required: true,
    rows: 6,
    placeholder: 'Escribe tu mensaje aquí...',
    name: 'message',
  }));

  // Botón de envío
  const btnRow = makeEl('div', '', { class: 'btn-row' });
  const submitBtn = makeEl('button', '[ ENVIAR MENSAJE ]', {
    type: 'submit',
    class: 'send-btn',
    id: 'email-submit-btn',
  });
  btnRow.appendChild(submitBtn);
  form.appendChild(btnRow);

  // Contenedor de estado
  const statusDiv = makeEl('div', '', { class: 'em-status' });
  form.appendChild(statusDiv);

  container.appendChild(form);

  // ─── Event Listener del formulario ───────────────────────────────
  form.addEventListener('submit', handleFormSubmit.bind(null, container));
}

/** Maneja el envío del formulario vía Formspree */
async function handleFormSubmit(container, e) {
  e.preventDefault();
  if (isEmailSending) return;

  const form = document.getElementById('email-form');
  if (!form) return;

  isEmailSending = true;
  const statusDiv = container.querySelector('.em-status');
  const submitBtn = document.getElementById('email-submit-btn');

  // Estado de carga
  submitBtn.textContent = '[ ENVIANDO... ]';
  submitBtn.disabled = true;
  submitBtn.classList.add('sending');

  if (statusDiv) {
    statusDiv.innerHTML = '';
    statusDiv.appendChild(makeEl('div', '⟳ Transmitiendo datos al servidor...', { class: 'em-status-sending' }));
  }

  try {
    // Preparar datos para Formspree
    const formData = new FormData(form);

    // Asegurar que el campo FROM se mapee correctamente
    // Formspree usa 'email' como campo estándar, pero usamos 'from'
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (key === '_replyto') {
        data['_replyto'] = value; // TO → respuesta a
      } else if (key === 'from') {
        data['email'] = value; // FROM → email del remitente (requerido por Formspree)
      } else if (key === 'subject') {
        data['subject'] = CONFIG.formspree.subjectPrefix + ' ' + value;
      } else if (key === 'message') {
        data['message'] = value;
      } else {
        data[key] = value;
      }
    }

    // Enviar a Formspree
    const response = await fetch(CONFIG.formspree.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Éxito → reproducir sonido y mostrar mensaje
      playSendSound();
      showSuccessState(container);
    } else {
      throw new Error('Formspree error: ' + response.status);
    }
  } catch (err) {
    console.error('[CONTACT] Error al enviar:', err);
    if (statusDiv) {
      statusDiv.innerHTML = '';
      statusDiv.appendChild(makeEl('div', '[ERR] Fallo en la transmisión. Intenta de nuevo.', { class: 'em-status-err' }));
    }
  } finally {
    isEmailSending = false;
    if (submitBtn) {
      submitBtn.textContent = '[ ENVIAR MENSAJE ]';
      submitBtn.disabled = false;
      submitBtn.classList.remove('sending');
    }
  }
}

/** Reproduce un sonido beep retro */
function playSendSound() {
  try {
    // Opción A: Beep base64 (siempre funciona)
    const audio = new Audio(SEND_SOUND_BEEP);
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // Opción B: Sonido MP3 si el archivo existe en assets/
    const fallbackAudio = new Audio('assets/send-sound.mp3');
    fallbackAudio.volume = 0.4;
    fallbackAudio.play().catch(() => {
      // Si no existe el archivo, no hace nada (el beep base64 ya sonó)
    });
  } catch (e) {
    // Silenciar errores de audio en browsers que lo bloquean
  }
}

/** Muestra el estado de éxito con arte ASCII retro */
function showSuccessState(container) {
  container.innerHTML = '';

  // Contenedor centrado
  const successWrap = makeEl('div', '', { class: 'em-success' });

  // Arte ASCII de sobre/enviado
  const asciiArt = makeEl('pre', '', { class: 'ascii-art' });
  asciiArt.textContent =
    '   ╔══════════════════════╗\n' +
    '   ║                      ║\n' +
    '   ║    ★ MENSAJE ★       ║\n' +
    '   ║    ENVIADO ✓         ║\n' +
    '   ║                      ║\n' +
    '   ╚══════════════════════╝';
  successWrap.appendChild(asciiArt);

  // Línea decorativa
  const decoLine = makeEl('div', '', { class: 'success-line' });
  successWrap.appendChild(decoLine);

  // Texto de éxito
  const successText = makeEl('p', 'Correo enviado exitosamente.', { class: 'success-msg' });
  successWrap.appendChild(successText);

  // Subtexto retro
  const subText = makeEl('p', 'Tu mensaje ha sido transmitido al servidor.\nResponderé a la brevedad, detective.', { class: 'sub-text' });
  successWrap.appendChild(subText);

  // Botón para enviar otro
  const resetBtn = makeEl('button', '[ ENVIAR OTRO ]', {
    type: 'button',
    class: 'reset-btn',
    id: 'email-reset-btn',
  });
  resetBtn.addEventListener('click', () => {
    renderEmailForm(container);
  });
  successWrap.appendChild(resetBtn);

  container.appendChild(successWrap);
}

// ─── Renderizado del ícono de contacto ──────────────────────────────

/** Crea el ícono de carpeta "Contacto" */
function createContactFolder() {
  const folder = makeEl('div', '', {
    class: 'folder contact-folder',
    'data-id': 'contact',
    tabindex: '0',
    role: 'listitem',
    'aria-label': 'Contacto — Enviar correo electrónico',
  });

  // Icono 📧
  folder.appendChild(makeEl('span', '\u{1F4E7}', { class: 'ico' }));
  // Label
  folder.appendChild(makeEl('span', 'Contacto', { class: 'lbl' }));
  // Categoría
  folder.appendChild(makeEl('span', 'email', { class: 'cat' }));

  // Event listener
  folder.addEventListener('click', (ev) => {
    ev.stopPropagation();
    document.querySelectorAll('.folder').forEach(x => {
      x.classList.remove('sel');
      const ico = x.querySelector('.ico');
      if (ico && ico.textContent === '\u{1F4C1}') ico.textContent = '\u{1F4C2}';
    });
    folder.classList.add('sel');
    openEmailWindow(folder);
  });

  return folder;
}

/** Abre la ventana de correo (terminal de email) */
function openEmailWindow(folderEl) {
  const container = document.getElementById('windows-container');

  // Si ya existe y está minimizada, restaurar
  if (emailWindowEl) {
    if (emailWindowEl.classList.contains('minimized')) {
      emailWindowEl.classList.remove('minimized');
    }
    emailWindowEl.style.display = 'flex';
    emailWindowEl.style.zIndex = Window.nextZ();
    return;
  }

  // Si ya existe abierta, traer al frente
  const existing = container.querySelector('.win[data-id="contact"]');
  if (existing) {
    existing.style.display = 'flex';
    existing.style.zIndex = Window.nextZ();
    return;
  }

  // Crear ventana
  emailWindowEl = document.createElement('div');
  emailWindowEl.className = 'win active';
  emailWindowEl.style.zIndex = Window.nextZ();
  emailWindowEl.dataset.id = 'contact';
  emailWindowEl.setAttribute('role', 'dialog');
  emailWindowEl.setAttribute('aria-modal', 'true');
  emailWindowEl.setAttribute('aria-label', 'Terminal de correo electrónico');

  // Posición centrada (similar a ventanas de expedientes)
  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    emailWindowEl.style.left = '50%';
    emailWindowEl.style.top = '50%';
    emailWindowEl.style.transform = 'translate(-50%, -50%)';
    emailWindowEl.style.maxWidth = '95vw';
  } else {
    const baseLeft = Math.max(40, window.innerWidth * 0.1);
    const baseTop = 40;

    // Offset basado en ventanas abiertas
    const openCount = container.querySelectorAll('.win:not([data-id="contact"])').length;
    emailWindowEl.style.left = (baseLeft + openCount * 12) + 'px';
    emailWindowEl.style.top = (baseTop + openCount * 12) + 'px';

    if (folderEl) {
      const rect = folderEl.getBoundingClientRect();
      emailWindowEl.style.top = Math.max(baseTop, rect.bottom + 24) + 'px';
      emailWindowEl.style.left = Math.max(baseLeft, rect.left - 300) + 'px';
    }

    emailWindowEl.style.transform = 'none';
  }

  emailWindowEl.dataset.lastLeft = emailWindowEl.style.left;
  emailWindowEl.dataset.lastTop = emailWindowEl.style.top;

  // ─── Barra de título ─────────────────────────────────────────────
  const titleBar = makeEl('div', '', { class: 'wtb' });
  const titleInner = makeEl('span', '', { class: 'wti' });
  titleInner.appendChild(makeEl('span', '\u{1F4E7}'));
  titleInner.appendChild(document.createTextNode(' MAIL TERMINAL v1.0'));
  titleBar.appendChild(titleInner);

  const winBtns = makeEl('div', '', { class: 'wb' });

  // Minimizar
  const minBtn = makeEl('button', '\u2796', { 'aria-label': 'Minimizar ventana' });
  winBtns.appendChild(minBtn);

  // Cerrar
  const closeBtn = makeEl('button', '\u00D7', { class: 'cl', 'aria-label': 'Cerrar ventana' });
  winBtns.appendChild(closeBtn);

  titleBar.appendChild(winBtns);

  // ─── Contenido (formulario) ──────────────────────────────────────
  const content = makeEl('div', '', { class: 'wct email-content' });
  renderEmailForm(content);

  // Armar ventana
  emailWindowEl.appendChild(titleBar);
  emailWindowEl.appendChild(content);
  container.appendChild(emailWindowEl);

  // ─── Drag (reutilizar lógica de Window) ──────────────────────────
  let dragging = false, offsetXDrag, offsetYDrag;
  const winRef = emailWindowEl;
  const titleBarRef = titleBar;

  function startDrag(clientX, clientY) {
    dragging = true;
    offsetXDrag = clientX - winRef.offsetLeft;
    offsetYDrag = clientY - winRef.offsetTop;
    titleBarRef.classList.add('dg');
    winRef.style.zIndex = Window.nextZ();
    winRef.dataset.lastLeft = winRef.style.left;
    winRef.dataset.lastTop = winRef.style.top;
  }

  function moveDrag(clientX, clientY) {
    if (dragging) {
      winRef.style.left = (clientX - offsetXDrag) + 'px';
      winRef.style.top = (clientY - offsetYDrag) + 'px';
      winRef.style.transform = 'none';
      winRef.dataset.lastLeft = winRef.style.left;
      winRef.dataset.lastTop = winRef.style.top;
    }
  }

  function endDrag() {
    dragging = false;
    titleBarRef.classList.remove('dg');
  }

  titleBar.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
  document.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
  document.addEventListener('mouseup', endDrag);

  titleBar.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  }, { passive: true });
  document.addEventListener('touchmove', e => {
    if (dragging && e.touches[0]) {
      e.preventDefault();
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
  document.addEventListener('touchend', endDrag);

  // ─── Minimizar / Restaurar ───────────────────────────────────────
  minBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    winRef.classList.add('minimized');
    winRef.style.zIndex = 600;
    Window._repositionMinimized();
  });

  winRef.addEventListener('click', (e) => {
    if (!winRef.classList.contains('minimized')) return;
    e.stopPropagation();
    winRef.classList.remove('minimized');
    winRef.style.display = 'flex';
    winRef.style.zIndex = Window.nextZ();
    if (winRef.dataset.lastLeft) winRef.style.left = winRef.dataset.lastLeft;
    if (winRef.dataset.lastTop) winRef.style.top = winRef.dataset.lastTop;
    if (window.innerWidth <= 900) {
      winRef.style.left = '50%';
      winRef.style.top = '50%';
      winRef.style.transform = 'translate(-50%, -50%)';
    }
  });

  // ─── Cerrar ──────────────────────────────────────────────────────
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (folderEl) {
      folderEl.classList.remove('sel');
      folderEl.querySelector('.ico').textContent = '\u{1F4E7}';
    }
    emailWindowEl.remove();
    emailWindowEl = null;
  });

  // Traer al frente al hacer click
  winRef.addEventListener('mousedown', () => { winRef.style.zIndex = Window.nextZ(); });
}

// ─── Exportación pública ─────────────────────────────────────────────

export const Contact = {
  /** Renderiza el ícono de contacto en el escritorio */
  renderIcon() {
    const isMobile = window.innerWidth <= 900;

    if (!isMobile) {
      // Desktop: ícono fijo en esquina inferior izquierda
      contactIconEl = createContactFolder();
      contactIconEl.style.position = 'fixed';
      contactIconEl.style.bottom = '40px';
      contactIconEl.style.left = '16px';
      contactIconEl.style.zIndex = '350';
      document.getElementById('desktop').appendChild(contactIconEl);
    } else {
      // Mobile: agregar al final del grid (flujo normal)
      const grid = document.getElementById('grid');
      if (grid) {
        const folder = createContactFolder();
        grid.appendChild(folder);
      }
    }
  },

  /** Abre la ventana de correo desde el comando 'contact' */
  openFromCommand() {
    // Si ya hay una ventana abierta, restaurarla
    if (emailWindowEl) {
      if (emailWindowEl.classList.contains('minimized')) {
        emailWindowEl.classList.remove('minimized');
      }
      emailWindowEl.style.display = 'flex';
      emailWindowEl.style.zIndex = Window.nextZ();
      return;
    }

    // Si el ícono fijo existe, simular click en él
    if (contactIconEl) {
      contactIconEl.click();
      return;
    }

    // Fallback: abrir directamente sin folderEl
    openEmailWindow(null);
  },

  /** Destruye el ícono de contacto (para cleanup) */
  destroy() {
    if (contactIconEl && contactIconEl.parentNode) {
      contactIconEl.remove();
    }
    contactIconEl = null;
  },
};
