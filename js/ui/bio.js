/**
 * BIO — Ventana de biografía profesional.
 * Usa Window.create() para la estructura base, luego inyecta contenido.
 */

import { CONFIG } from '../data/config.js';
import { Window } from './window.js';
import { t } from '../i18n.js';

export const Bio = {
  /** Abre la ventana de biografía */
  open() {
    const stackTags = CONFIG.user.stack.map(t => `<span class="ftag">${t}</span>`).join('');

    const content = `
      <h2>👤 ${CONFIG.user.name}</h2>
      <div class="meta">
        <span>${CONFIG.user.role}</span>
        <span>E-MANTTO · FLUJO · PUENTE · NEXUS</span>
      </div>
      <p class="brief">${CONFIG.user.bio}</p>

      <h4>🔗 Links</h4>
      <div style="display:flex;gap:16px;margin:12px 0;flex-wrap:wrap">
        <a href="${CONFIG.contact.linkedin}" target="_blank" rel="noopener" class="ftag">${t('bio_linkedin')}</a>
        <a href="${CONFIG.contact.github}" target="_blank" rel="noopener" class="ftag">${t('bio_github')}</a>
        <a href="#" id="btn-download-cv" class="ftag tag-solved">${t('bio_cv')}</a>
      </div>

      <h4>📋 Summary</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">With experience in aviation, fintech, edtech and 3D animation, I have led the transformation of fragmented digital products into coherent ecosystems. My approach combines rigorous field research with scalable system architecture.</p>

      <h4>🛠 Stack</h4>
      <div style="margin:8px 0">${stackTags}</div>

      <h4>📬 Direct contact</h4>
      <p style="color:var(--txt);line-height:1.7;margin:8px 0">For inquiries, collaborations or proposals: <a href="mailto:${CONFIG.contact.email}">${t('user_contact_email')}</a></p>
    `;

    const win = Window.create('bio — professional profile', '\u{1F464}', content);

    // Event listener para descargar CV
    setTimeout(() => {
      const btn = document.getElementById('btn-download-cv');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('[SYS] To download your CV, visit linkedin.com/in/anasu or send an email to anazconte@gmail.com');
        });
      }
    }, 50);
  },
};
