/* TASKBAR — Barra superior con reloj, clearance y selector de idioma (mobile) */
import { makeEl } from './utils.js';
import { t, getLang } from '../i18n.js';

let langBtns = [];

/** Crea botones de idioma para la taskbar (visible en mobile) */
function createLangButtons() {
  const container = document.createElement('div');
  container.className = 'tbar-lang';

  const esBtn = makeEl('button', t('lang_es'), { class: 'tbar-lang-btn', 'data-lang': 'es' });
  const enBtn = makeEl('button', t('lang_en'), { class: 'tbar-lang-btn', 'data-lang': 'en' });

  esBtn.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('i18n:set', { detail: 'es' }));
  });
  enBtn.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('i18n:set', { detail: 'en' }));
  });

  container.appendChild(esBtn);
  container.appendChild(enBtn);
  langBtns = [esBtn, enBtn];

  return container;
}

/** Actualiza estado activo de los botones en la taskbar */
function updateLangButtons() {
  const lang = getLang();
  langBtns.forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

export function renderTaskbar() {
  const taskbar = document.getElementById('taskbar-top');
  const fragment = document.createDocumentFragment();

  const brand = makeEl('span', '\u2318 SISTEMA v2.7b', { class: 'tbar-brand' });
  const left = makeEl('span', 'DETECTIVE // CLEARANCE: NIVEL-\u03A9', { class: 'tbar-left' });

  // Contenedor derecho: separador + idioma + reloj
  const rightGroup = document.createElement('div');
  rightGroup.style.display = 'flex';
  rightGroup.style.alignItems = 'center';
  rightGroup.style.gap = '8px';

  const langContainer = createLangButtons();
  rightGroup.appendChild(langContainer);

  const clock = makeEl('span', '', { id: 'clock', class: 'tbar-right' });

  function updateClock() {
    const now = new Date();
    const pad = v => String(v).padStart(2, '0');
    const locale = getLang() === 'en' ? 'en-US' : 'es-AR';
    clock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + ' ' + now.toLocaleDateString(locale);
  }
  updateClock();
  setInterval(updateClock, 1000);

  rightGroup.appendChild(clock);

  fragment.appendChild(brand);
  fragment.appendChild(left);
  fragment.appendChild(rightGroup);
  taskbar.appendChild(fragment);

  // Escuchar cambios de idioma
  window.addEventListener('i18n:changed', updateLangButtons);
}

// Actualizar también al recibir evento custom desde i18n
window.addEventListener('i18n:set', (e) => {
  window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: e.detail } }));
});
