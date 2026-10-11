/**
 * ACCESSIBLE — Genera y gestiona el overlay de vista rápida.
 * Estilo ventana del sistema con titlebar, minimizar y cerrar.
 * Contenido resumido para lectura en ~3 minutos.
 */

import { EXP_LIST } from '../data/exp.js';
import { CONFIG } from '../data/config.js';
import { t } from '../i18n.js';

/** Escapa HTML para prevenir XSS */
function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Genera el HTML del perfil profesional (resumido) */
function buildProfileHTML() {
  const user = CONFIG.user;
  return `
    <section id="profile" aria-label="Perfil profesional">
      <h1>Ana Zúñiga Conte</h1>
      <p class="profile-role">${esc(user.role)}</p>
      <p>${esc(user.bio).substring(0, 200)}…</p>
      <div class="profile-tags">
        ${user.stack.slice(0, 6).map(s => `<span class="tag">${esc(s)}</span>`).join('')}
      </div>
      <nav aria-label="Redes profesionales" class="profile-links">
        <a href="${esc(CONFIG.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a href="${esc(CONFIG.contact.github)}" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="mailto:${esc(CONFIG.contact.email)}">${esc(CONFIG.contact.email)}</a>
      </nav>
    </section>
  `;
}

/** Genera el HTML del índice de proyectos (resumido) */
function buildProjectsHTML() {
  let html = '<section id="projects-index" aria-label="Índice de proyectos"><h2>Proyectos</h2>';

  EXP_LIST.forEach(exp => {
    const anchorId = `exp${exp.id.replace('exp', '')}`;
    const canonicalUrl = `https://anasu.github.io/portfolio/#${anchorId}`;

    // Resumen ultra corto: solo lo esencial
    const detShort = exp.det.length > 180 ? exp.det.substring(0, 180) + '…' : exp.det;

    html += `
      <article id="${anchorId}" class="project-card">
        <h3>${esc(exp.ico)} ${esc(exp.titulo)}</h3>
        <p class="card-meta">${esc(exp.cat)} · ${exp.ano}</p>
        <p>${esc(detShort)}</p>
        ${exp.impacto && exp.impacto.length ? `
          <div class="card-kpis">
            ${exp.impacto.slice(0, 3).map(k => `<span class="kpi-badge"><strong>${esc(k.val)}</strong> ${esc(k.lab)}</span>`).join('')}
          </div>
        ` : ''}
        <p class="card-tech">${esc(exp.tech)}</p>
        <a href="${canonicalUrl}" target="_parent">Ver expediente completo →</a>
      </article>
    `;
  });

  html += '</section>';
  return html;
}

/** Genera el HTML de contacto directo */
function buildContactHTML() {
  return `
    <section id="contact-direct" aria-label="Contacto directo">
      <h2>Contacto</h2>
      <ul>
        <li><a href="mailto:${esc(CONFIG.contact.email)}">📧 ${esc(CONFIG.contact.email)}</a></li>
        <li><a href="${esc(CONFIG.contact.linkedin)}" target="_blank" rel="noopener">💼 LinkedIn</a></li>
        <li><a href="${esc(CONFIG.contact.github)}" target="_blank" rel="noopener">🐙 GitHub</a></li>
      </ul>
    </section>
  `;
}

/** Inicializa el contenido accesible — se ejecuta al inicio */
export function initAccessibleContent() {
  const container = document.getElementById('accessible-content');
  if (!container) return;

  // Construir todo el HTML desde los datos
  const fullHTML = buildProfileHTML() + buildProjectsHTML() + buildContactHTML();
  container.innerHTML = fullHTML;

  // Remover hidden para que CSS pueda controlar visibilidad
  container.removeAttribute('hidden');

  // Guardar referencias a elementos de la ventana
  container._closeBtn = null;
  container._minBtn = null;
}

/** Abre el overlay de vista rápida como una ventana */
export function openAccessibleView() {
  const container = document.getElementById('accessible-content');
  if (!container) return;

  // Asegurar que el contenido está generado
  if (!container.innerHTML.trim()) {
    initAccessibleContent();
  }

  container.classList.add('visible');
  container.removeAttribute('hidden');

  // Crear botón de cerrar si no existe
  if (!container._closeBtn) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'qv-close-btn';
    closeBtn.setAttribute('aria-label', t('qv_close') || 'Cerrar vista rápida');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAccessibleView();
    });
    container._closeBtn = closeBtn;
  }

  // Crear botón de minimizar si no existe
  if (!container._minBtn) {
    const minBtn = document.createElement('button');
    minBtn.className = 'qv-min-btn';
    minBtn.setAttribute('aria-label', t('win_minimize') || 'Minimizar ventana');
    minBtn.textContent = '─';
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      minimizeAccessibleView();
    });
    container._minBtn = minBtn;
  }

  // Insertar botones si no están en el DOM
  if (!container.contains(container._closeBtn)) {
    container.appendChild(container._closeBtn);
  }
  if (!container.contains(container._minBtn)) {
    container.insertBefore(container._minBtn, container.firstChild);
  }

  // Scroll al perfil
  setTimeout(() => {
    const profile = document.getElementById('profile');
    if (profile) profile.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/** Minimiza la vista rápida */
export function minimizeAccessibleView() {
  const container = document.getElementById('accessible-content');
  if (!container) return;
  container.classList.add('minimized');
}

/** Cierra el overlay de vista rápida */
export function closeAccessibleView() {
  const container = document.getElementById('accessible-content');
  if (!container) return;

  container.classList.remove('visible');
  container.classList.remove('minimized');
  container.setAttribute('hidden', '');
}

/** Alterna la vista rápida */
export function toggleAccessibleView() {
  const container = document.getElementById('accessible-content');
  if (!container) return;
  const isVisible = container.classList.contains('visible');
  if (isVisible) {
    closeAccessibleView();
  } else {
    openAccessibleView();
  }
}
