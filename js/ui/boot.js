/* BOOT — Secuencia de arranque estilo terminal CRT */
import { CONFIG } from '../data/config.js';
import { EXP_LIST } from '../data/exp.js';
import { Window } from './window.js';
import { Contact } from './contact.js';
import { makeEl } from './utils.js';

export class Boot {
  async go() {
    const bootText = document.getElementById('boot-text');
    const bootBar = document.getElementById('boot-bar');
    const messages = [
      ...CONFIG.bootMessages.map(fn => fn(CONFIG)),
      `> ARCHIVOS: ${EXP_LIST.length} expedientes`,
      '> UI: escritorio listo...'
    ];

    for (let i = 0; i < messages.length; i++) {
      const line = document.createElement('div');
      bootText.appendChild(line);
      for (let j = 0; j < messages[i].length; j++) {
        line.textContent = messages[i].substring(0, j + 1);
        await this.wait(3 + Math.random() * 5);
      }
      if (bootBar) bootBar.style.width = ((i + 1) / messages.length * 95) + '%';
      bootText.scrollTop = bootText.scrollHeight;
      await this.wait(30 + Math.random() * 40);
    }

    // "SISTEMA LISTO" con cursor parpadeante (2 nodos, sin innerHTML)
    const doneLine = document.createElement('div');
    doneLine.textContent = '> SISTEMA LISTO';
    doneLine.appendChild(makeEl('span', '', { class: 'cur' }));
    bootText.appendChild(doneLine);
    await this.wait(200);

    if (bootBar) bootBar.style.width = '100%';

    const bootEl = document.getElementById('boot-screen');
    bootEl.style.transition = 'opacity .3s';
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
    window.addEventListener('transitionend', onTransEnd, false);
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
          x.querySelector('.ico').textContent = '\u{1F4C1}'; // 📁 cerrado
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
    prompt.textContent = '> C:\\EXPEDIENTES> ';
    bc.appendChild(prompt);
    bc.appendChild(document.createTextNode('selecciona una carpeta para abrir expediente'));

    grid.appendChild(fragment);
  }
}
