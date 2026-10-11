/**
 * ACCESSIBLE — Genera y gestiona el overlay de vista rápida.
 * El contenido se construye desde exp.js al inicio, se inyecta
 * en #accessible-content (oculto) y se muestra solo cuando
 * el usuario activa Quick View.
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

/** Genera el HTML del perfil profesional */
function buildProfileHTML() {
  const user = CONFIG.user;
  return `
    <section id="profile" aria-label="Perfil profesional">
      <h1>Anasú — Diseñador UX/UI y Director Técnico</h1>
      <p>${esc(user.bio)}</p>
      <p>Con experiencia en aviación, fintech, edtech y animación 3D, he liderado la transformación de productos digitales fragmentados en ecosistemas coherentes.</p>
      <ul>
        <li><strong>Diseño UX/UI</strong> — Design Systems, accesibilidad WCAG, Material Design, diseño inclusivo</li>
        <li><strong>Dirección Técnica</strong> — Pipelines de producción 3D, optimización de render, arquitectura de producto</li>
        <li><strong>Estrategia de Producto</strong> — Investigación de campo, inclusión digital, offline UX</li>
      </ul>
      <p>Contacto: <a href="mailto:${esc(CONFIG.contact.email)}">${esc(CONFIG.contact.email)}</a></p>
      <nav aria-label="Redes profesionales">
        <ul>
          <li><a href="${esc(CONFIG.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="${esc(CONFIG.contact.github)}" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </nav>
    </section>
  `;
}

/** Genera el HTML del índice de proyectos */
function buildProjectsHTML() {
  let html = '<section id="projects-index" aria-label="Índice de proyectos"><h2>Proyectos Destacados</h2>';

  EXP_LIST.forEach(exp => {
    const catParts = exp.cat.split('·').map(s => s.trim());
    const anchorId = `exp${exp.id.replace('exp', '')}`;
    const canonicalUrl = `https://anasu.github.io/portfolio/#${anchorId}`;

    html += `
      <article id="${anchorId}" class="project-card">
        <h3>${esc(exp.titulo)} — ${esc(exp.cat)} (${exp.ano})</h3>
        <p>${esc(exp.det)}</p>
        ${exp.desafio ? `<p><strong>Desafío:</strong> ${esc(exp.desafio)}</p>` : ''}
        ${exp.estrategia && exp.estrategia.length ? `<p><strong>Contribución:</strong> ${esc(exp.estrategia.map(s => s.tit + ': ' + s.txt).join(' '))}</p>` : ''}
        <p><strong>Herramientas:</strong> ${esc(exp.tech)}</p>
        ${exp.impacto && exp.impacto.length ? `
          <h4>Resultados</h4>
          <ul>
            ${exp.impacto.map(k => `<li>${esc(k.lab)}: ${esc(k.val)}${k.desc ? ' — ' + esc(k.desc) : ''}</li>`).join('')}
          </ul>
        ` : ''}
        <p><a href="${canonicalUrl}" target="_parent">Ver expediente completo →</a></p>
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
      <p>Para consultas, colaboraciones o propuestas:</p>
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

  // Guardar referencia al botón de cerrar (se crea en toggle)
  container._closeBtn = null;
}

/** Abre el overlay de vista rápida */
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
    const btn = document.createElement('button');
    btn.className = 'ac-close-btn';
    btn.setAttribute('aria-label', t('qv_close') || 'Cerrar vista rápida');
    btn.textContent = '✕';
    btn.addEventListener('click', closeAccessibleView);
    container._closeBtn = btn;
  }

  // Insertar botón de cerrar si no está en el DOM
  if (!container.contains(container._closeBtn)) {
    container.appendChild(container._closeBtn);
  }

  // Scroll al perfil
  setTimeout(() => {
    const profile = document.getElementById('profile');
    if (profile) profile.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/** Cierra el overlay de vista rápida */
export function closeAccessibleView() {
  const container = document.getElementById('accessible-content');
  if (!container) return;

  container.classList.remove('visible');
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
