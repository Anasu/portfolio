/**
 * BIO — Ventana de biografía profesional.
 * Usa Window.create() para la estructura base, luego inyecta contenido.
 */

import { CONFIG } from '../data/config.js';
import { Window } from './window.js';

export const Bio = {
  /** Abre la ventana de biografía */
  open() {
    const stackTags = CONFIG.user.stack.map(t => `<span class="ftag ok">${t}</span>`).join('');

    const content = `
      <h2>👤 ${CONFIG.user.name}</h2>
      <div class="meta">
        <span>${CONFIG.user.role}</span>
        <span>E-MANTTO · FLUJO · PUENTE · NEXUS</span>
      </div>
      <p class="brief">${CONFIG.user.bio}</p>

      <h4>🔗 Enlaces</h4>
      <div style="display:flex;gap:16px;margin:12px 0;flex-wrap:wrap">
        <a href="${CONFIG.contact.linkedin}" target="_blank" rel="noopener" class="ftag bio-link">${'LinkedIn ↗'}</a>
        <a href="${CONFIG.contact.github}" target="_blank" rel="noopener" class="ftag bio-link">${'GitHub ↗'}</a>
        <a href="#" id="btn-download-cv" class="ftag tag-solved bio-link">${'Descargar CV (PDF) ↓'}</a>
      </div>

      <h4>📋 Resumen</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">Con experiencia en aeronáutica, fintech, edtech y animación 3D, he liderado la transformación de productos digitales fragmentados en ecosistemas coherentes. Mi enfoque combina investigación de campo rigurosa con arquitectura de sistemas escalables.</p>

      <h4>🛠 Stack</h4>
      <div style="margin:8px 0">${stackTags}</div>

      <h4>📬 Contacto directo</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">Para consultas, colaboraciones o propuestas: <a href="mailto:${CONFIG.contact.email}" class="bio-link">${CONFIG.contact.email}</a></p>
    `;

    const win = Window.create('bio — perfil profesional', '\u{1F464}', content);

    // Event listener para descargar CV
    setTimeout(() => {
      const btn = document.getElementById('btn-download-cv');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('[SYS] Para descargar tu CV, accede a linkedin.com/in/anasu o envía un email a anazconte@gmail.com');
        });
      }
    }, 50);
  },
};
