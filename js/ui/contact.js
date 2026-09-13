/**
 * CONTACT — Módulo de contacto: ícono escritorio + ventana terminal de correo.
 * Usa Window.create() para abrir la ventana (sin duplicar lógica de drag/minimizar).
 */

import { CONFIG } from '../data/config.js';
import { Window } from './window.js';
import { Quake } from './quake.js';

// ─── Sonido beep retro (base64 WAV, ~0.3s) ──────────────────────────
const SEND_SOUND_BEEP = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

// ─── Estado ──────────────────────────────────────────────────────────
let contactIconEl = null;   // ícono fijo en escritorio (desktop)
let isEmailSending = false; // bandera de envío activo

// ─── Utilidades internas ─────────────────────────────────────────────

/** Crea un input retro estilo terminal */
function makeRetroInput(id, label, opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cfld';

  const lbl = document.createElement('label');
  lbl.setAttribute('for', id);
  lbl.className = 'clbl';
  lbl.textContent = label + ': ';
  if (opts.required) {
    const req = document.createElement('span');
    req.className = 'req';
    lbl.appendChild(req);
  }
  wrapper.appendChild(lbl);

  const input = document.createElement('input');
  input.type = opts.type || 'text';
  input.id = id;
  input.name = opts.name || id;
  input.placeholder = opts.placeholder || '';
  if (opts.readonly) input.readOnly = true;
  if (opts.disabled) input.disabled = true;
  if (opts.required) input.required = true;
  input.autocomplete = opts.autocomplete || 'off';
  input.spellcheck = 'false';
  input.className = 'rinput' + (opts.readonly ? ' rro' : '');

  if (opts.value) input.value = opts.value;
  wrapper.appendChild(input);
  return wrapper;
}

/** Crea un textarea retro estilo terminal */
function makeRetroTextarea(id, label, opts = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cfld';

  const lbl = document.createElement('label');
  lbl.setAttribute('for', id);
  lbl.className = 'clbl';
  lbl.textContent = label + ': ';
  if (opts.required) {
    const req = document.createElement('span');
    req.className = 'req';
    lbl.appendChild(req);
  }
  wrapper.appendChild(lbl);

  const ta = document.createElement('textarea');
  ta.id = id;
  ta.name = opts.name || id;
  ta.placeholder = opts.placeholder || '';
  ta.rows = opts.rows || 6;
  if (opts.required) ta.required = true;
  ta.spellcheck = 'false';
  ta.className = 'rta';

  wrapper.appendChild(ta);
  return wrapper;
}

/** Reproduce un sonido beep retro */
function playSendSound() {
  try {
    const audio = new Audio(SEND_SOUND_BEEP);
    audio.volume = 0.3;
    audio.play().catch(() => {});
    const fallbackAudio = new Audio('assets/send-sound.mp3');
    fallbackAudio.volume = 0.4;
    fallbackAudio.play().catch(() => {});
  } catch (e) { /* silenciar errores de audio */ }
}

/** Muestra el estado de éxito con arte ASCII retro */
function showSuccessState(container) {
  container.innerHTML = '';

  const successWrap = document.createElement('div');
  successWrap.className = 'em-success';

  const asciiArt = document.createElement('pre');
  asciiArt.className = 'ascii-art';
  asciiArt.textContent =
    '████████████████████████████████\n' +
    '████░░░░░░░░░░░░░░░░░░░░░░░░████\n' +
    '██░░██░░░░░░░░░░░░░░░░░░░░██░░██\n' +
    '██░░░░██░░░░░░░░░░░░░░██░░░░██\n' +
    '██░░░░░░██░░░░░░░░░░██░░░░░░██\n' +
    '██░░░░░░░░██░░░░░░██░░░░░░░░██\n' +
    '██░░░░░░██░░██░░██░░██░░░░░░██\n' +
    '██░░░░██░░░░░░████░░░░░░██░░██\n' +
    '██░░██░░░░░░░░░░░░░░░░░░░░██░░██\n' +
    '████░░░░░░░░░░░░░░░░░░░░░░░░████\n' +
    '████████████████████████████████';
  successWrap.appendChild(asciiArt);

  const decoLine = document.createElement('div');
  decoLine.className = 'success-line';
  successWrap.appendChild(decoLine);

  const successText = document.createElement('p');
  successText.className = 'success-msg';
  successText.textContent = 'Correo enviado exitosamente.';
  successWrap.appendChild(successText);

  const subText = document.createElement('p');
  subText.className = 'sub-text';
  subText.textContent = 'Tu mensaje ha sido transmitido al servidor.\nResponderé a la brevedad, detective.';
  successWrap.appendChild(subText);

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'reset-btn';
  resetBtn.id = 'email-reset-btn';
  resetBtn.textContent = '[ ENVIAR OTRO ]';
  resetBtn.addEventListener('click', () => renderEmailForm(container));
  successWrap.appendChild(resetBtn);

  container.appendChild(successWrap);
}

/** Renderiza el contenido del formulario de correo */
function renderEmailForm(container) {
  container.innerHTML = '';

  // Header estilo terminal
  const header = document.createElement('div');
  header.className = 'em-header';
  header.appendChild(document.createElement('div')).className = 'em-title-bar';
  const banner = document.createElement('span');
  banner.className = 'em-banner';
  banner.textContent = 'Sistema de correo privilegiado de detectives';
  header.appendChild(banner);
  container.appendChild(header);

  // Formulario
  const form = document.createElement('form');
  form.className = 'email-form';
  form.id = 'email-form';

  form.appendChild(makeRetroInput('from', 'DE', { required: true, type: 'email', placeholder: 'tu@email.com', name: 'from' }));
  form.appendChild(makeRetroInput('to', 'PARA', { value: CONFIG.contact.email, readonly: true, name: '_replyto' }));
  form.appendChild(makeRetroInput('cc', 'CC', { type: 'email', placeholder: 'copia@destino.com (opcional)', name: 'cc' }));
  form.appendChild(makeRetroInput('bcc', 'CCO', { type: 'email', placeholder: 'copia oculta (opcional)', name: 'bcc' }));
  form.appendChild(makeRetroInput('subject', 'ASUNTO', { required: true, placeholder: 'Tema del mensaje...', name: 'subject' }));
  form.appendChild(makeRetroTextarea('body', 'MENSAJE', { required: true, rows: 6, placeholder: 'Escribe tu mensaje aquí...', name: 'message' }));

  // Botón de envío
  const btnRow = document.createElement('div');
  btnRow.className = 'btn-row';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'send-btn';
  submitBtn.id = 'email-submit-btn';
  submitBtn.textContent = '[ ENVIAR MENSAJE ]';
  btnRow.appendChild(submitBtn);
  form.appendChild(btnRow);

  // Contenedor de estado
  const statusDiv = document.createElement('div');
  statusDiv.className = 'em-status';
  form.appendChild(statusDiv);

  container.appendChild(form);

  // Event listener del formulario
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

  submitBtn.textContent = '[ ENVIANDO... ]';
  submitBtn.disabled = true;
  submitBtn.classList.add('sending');

  if (statusDiv) {
    statusDiv.innerHTML = '';
    const barEl = document.createElement('div');
    barEl.className = 'em-status-sending';
    statusDiv.appendChild(barEl);

    const frames = [
      '███▓░░░░░░░░░', '████▓░░░░░░░░', '█████▓░░░░░░░', '██████▓░░░░░░',
      '███████▓░░░░░', '████████▓░░░░', '█████████▓░░░', '██████████▓░░',
      '███████████▓░', '████████████▓', '█████████████'
    ];
    let frameIdx = 0;
    const loadingInterval = setInterval(() => {
      frameIdx = (frameIdx + 1) % frames.length;
      barEl.textContent = '[ ENVIANDO ] ' + frames[frameIdx];
    }, 200);

    statusDiv.dataset.loadingInterval = String(loadingInterval);
  }

  try {
    const formData = new FormData(form);
    const data = {};
    let fromValue = '';

    for (const [key, value] of formData.entries()) {
      if (key === '_replyto') data['_replyto'] = value;
      else if (key === 'from') fromValue = value;
      else if (key === 'subject') data['subject'] = CONFIG.formspree.subjectPrefix + ' ' + value;
      else if (key === 'message') data['message'] = value;
      else if (key === 'cc' && value.trim()) data['cc'] = value;
      else if (key === 'bcc' && value.trim()) data['bcc'] = value;
      else data[key] = value;
    }

    if (fromValue) data['email'] = fromValue;

    const response = await fetch(CONFIG.formspree.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (statusDiv && statusDiv.dataset.loadingInterval) {
      clearInterval(parseInt(statusDiv.dataset.loadingInterval));
      delete statusDiv.dataset.loadingInterval;
    }

    if (response.ok) {
      playSendSound();
      showSuccessState(container);
    } else {
      throw new Error('Formspree error: ' + response.status);
    }
  } catch (err) {
    console.error('[CONTACT] Error al enviar:', err);
    if (statusDiv && statusDiv.dataset.loadingInterval) {
      clearInterval(parseInt(statusDiv.dataset.loadingInterval));
      delete statusDiv.dataset.loadingInterval;
    }
    if (statusDiv) {
      statusDiv.innerHTML = '';
      const errEl = document.createElement('div');
      errEl.className = 'em-status-err';
      errEl.textContent = '[ERR] Fallo en la transmisión. Intenta de nuevo.';
      statusDiv.appendChild(errEl);
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

/** Crea el ícono de carpeta "Contacto" */
function createContactFolder() {
  const folder = document.createElement('div');
  folder.className = 'folder contact-folder';
  folder.dataset.id = 'contact';
  folder.tabIndex = 0;
  folder.setAttribute('role', 'listitem');
  folder.setAttribute('aria-label', 'Contacto — Enviar correo electrónico');

  const ico = document.createElement('span');
  ico.className = 'ico';
  ico.textContent = '\u{1F4E7}'; // 📧
  folder.appendChild(ico);

  const lbl = document.createElement('span');
  lbl.className = 'lbl';
  lbl.textContent = 'Contacto';
  folder.appendChild(lbl);

  const cat = document.createElement('span');
  cat.className = 'cat';
  cat.textContent = 'email';
  folder.appendChild(cat);

  folder.addEventListener('click', (ev) => {
    ev.stopPropagation();
    document.querySelectorAll('.folder').forEach(x => {
      x.classList.remove('sel');
      const i = x.querySelector('.ico');
      if (i && i.textContent === '\u{1F4C1}') i.textContent = '\u{1F4C2}';
    });
    folder.classList.add('sel');
    openEmailWindow(folder);
  });

  return folder;
}

/** Abre la ventana de correo usando Window.create() */
function openEmailWindow(folderEl) {
  const existing = document.querySelector('.win[data-id="contact"]');
  if (existing) {
    if (existing.classList.contains('minimized')) existing.classList.remove('minimized');
    existing.style.display = 'flex';
    existing.style.zIndex = Window.nextZ();
    return;
  }

  // Crear contenido del formulario
  const contentEl = document.createElement('div');
  contentEl.className = 'wct email-content';
  renderEmailForm(contentEl);

  // Usar Window.create() para la estructura base
  const win = Window.create('MAIL TERMINAL v1.0', '\u{1F4E7}', '', { id: 'contact' });
  win.querySelector('.wct').appendChild(contentEl);

  // Minimizar
  const minBtn = win.querySelector('.wb .wb button:first-child');
  if (minBtn) {
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.classList.add('minimized');
      Window._repositionMinimized();
    });
  }

  // Click en minimizada → restaurar
  win.addEventListener('click', (e) => {
    if (!win.classList.contains('minimized')) return;
    e.stopPropagation();
    win.classList.remove('minimized');
    win.style.display = 'flex';
    win.style.zIndex = Window.nextZ();
    if (win.dataset.lastLeft && !win.dataset.lastLeft.includes('%')) {
      win.style.left = win.dataset.lastLeft;
      win.style.top = win.dataset.lastTop;
      win.style.transform = 'none';
    } else {
      win.style.left = '50%';
      win.style.top = '50%';
      win.style.transform = 'translate(-50%, -50%)';
    }
  });

  // Cerrar
  const closeBtn = win.querySelector('.wb .cl');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (folderEl) {
        folderEl.classList.remove('sel');
        folderEl.querySelector('.ico').textContent = '\u{1F4E7}';
      }
      win.remove();
    });
  }

  Quake.log('[MAIL] Terminal de correo abierta.', 'qt-sys');
}

// ─── Exportación pública ─────────────────────────────────────────────

export const Contact = {
  renderIcon() {
    const isMobile = window.innerWidth <= 900;

    if (!isMobile) {
      contactIconEl = createContactFolder();
      contactIconEl.style.position = 'absolute';
      contactIconEl.style.bottom = '24px';
      contactIconEl.style.right = '24px';
      contactIconEl.style.left = 'auto';
      contactIconEl.style.zIndex = '350';
      const mainCol = document.querySelector('.main-column');
      if (mainCol) mainCol.appendChild(contactIconEl);
    } else {
      const mainCol = document.querySelector('.main-column');
      if (mainCol) {
        const folder = createContactFolder();
        mainCol.appendChild(folder);
      }
    }
  },

  openFromCommand() {
    const existing = document.querySelector('.win[data-id="contact"]');
    if (existing) {
      if (existing.classList.contains('minimized')) existing.classList.remove('minimized');
      existing.style.display = 'flex';
      existing.style.zIndex = Window.nextZ();
      return;
    }

    if (contactIconEl) {
      contactIconEl.click();
      return;
    }

    openEmailWindow(null);
  },

  destroy() {
    if (contactIconEl && contactIconEl.parentNode) {
      contactIconEl.remove();
    }
    contactIconEl = null;
  },
};
