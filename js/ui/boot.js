/* BOOT — Secuencia de arranque estilo terminal CRT */
import { CONFIG } from '../data/config.js';
import { EXP_LIST } from '../data/exp.js';
import { Window } from './window.js';
import { Contact } from './contact.js';
import { makeEl } from './utils.js';
import { t } from '../i18n.js';

export class Boot {
  async go() {
    const bootText = document.getElementById('boot-text');
    const bootBar = document.getElementById('boot-bar');

    // Detectar prefers-reduced-motion
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = motionPref.matches;

    // Construir mensajes de boot usando i18n
    const messages = [
      t('boot_bios')(CONFIG.system.biosVersion),
      t('boot_ram')(String(CONFIG.system.ramSize)),
      t('boot_crypt'),
      t('boot_clearance'),
      `> ARCHIVOS: ${EXP_LIST.length} expedientes`,
      '> UI: escritorio listo...'
    ];

    const charDelay = reducedMotion ? 0 : (3 + Math.random() * 5);
    const lineDelay = reducedMotion ? 0 : (30 + Math.random() * 40);

    for (let i = 0; i < messages.length; i++) {
      const line = document.createElement('div');
      bootText.appendChild(line);
      if (!reducedMotion) {
        for (let j = 0; j < messages[i].length; j++) {
          line.textContent = messages[i].substring(0, j + 1);
          await this.wait(charDelay);
        }
      } else {
        line.textContent = messages[i];
      }
      if (bootBar) bootBar.style.width = ((i + 1) / messages.length * 95) + '%';
      bootText.scrollTop = bootText.scrollHeight;
      await this.wait(lineDelay);
    }

    // "SISTEMA LISTO" con cursor parpadeante (sin efecto si reduced-motion)
    const doneLine = document.createElement('div');
    doneLine.textContent = '> ' + t('boot_ready');
    if (!reducedMotion) {
      doneLine.appendChild(makeEl('span', '', { class: 'cur' }));
    }
    bootText.appendChild(doneLine);

    if (bootBar) bootBar.style.width = '100%';

    const delayBeforeHide = reducedMotion ? 100 : 200;
    await this.wait(delayBeforeHide);

    const bootEl = document.getElementById('boot-screen');
    bootEl.style.transition = reducedMotion ? 'none' : 'opacity .3s';
    setTimeout(() => { bootEl.style.opacity = '0' }, 50);

    const self = this;
    const onTransEnd = (ev) => {
      if (ev.propertyName === 'opacity') {
        window.removeEventListener('transitionend', onTransEnd);
        bootEl.style.display = 'none';
        document.getElementById('desktop').classList.remove('hidden');
        self.renderFolders();
        Contact.renderIcon();
      }
    };

    if (reducedMotion) {
      // Sin transición — mostrar inmediatamente
      bootEl.style.display = 'none';
      document.getElementById('desktop').classList.remove('hidden');
      self.renderFolders();
      Contact.renderIcon();
    } else {
      window.addEventListener('transitionend', onTransEnd, false);
    }
  }

  wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  renderFolders() {
    const grid = document.getElementById('grid');
    const fragment = document.createDocumentFragment();

    EXP_LIST.forEach(exp => {
      const category = exp.cat.split('·')[0].trim();
      const folder = makeEl('div', '', { class: 'folder', 'data-id': exp.id, tabindex: '0', role: 'listitem', 'aria-label': exp.titulo + ' — ' + category });

      // Icono de carpeta
      folder.appendChild(makeEl('span', '📁', { class: 'ico' }));
      // Nombre
      folder.appendChild(makeEl('span', exp.titulo, { class: 'lbl' }));
      // Categoría
      folder.appendChild(makeEl('span', category, { class: 'cat' }));

      folder.addEventListener('click', ev => {
        ev.stopPropagation();
        document.querySelectorAll('.folder').forEach(x => {
          x.classList.remove('sel');
          // Solo resetear iconos de carpetas de expedientes (no Contacto 📧)
          const ico = x.querySelector('.ico');
          if (ico && x.dataset.id !== 'contact') {
            ico.textContent = '\u{1F4C1}'; // 📁 cerrado
          }
        });
        folder.classList.add('sel');
        folder.querySelector('.ico').textContent = '\u{1F4C2}'; // 📂 abierto
        Window.open(exp, folder);
      });

      fragment.appendChild(folder);
    });

    // Barra de navegación / breadcrumbs arriba a la izquierda
    const bc = document.getElementById('breadcrumb');
    const prompt = makeEl('span', '', { class: 'bc-prompt' });
    prompt.textContent = t('bc_prompt');
    bc.appendChild(prompt);
    bc.appendChild(document.createTextNode(t('bc_hint')));

    grid.appendChild(fragment);
  }
}
