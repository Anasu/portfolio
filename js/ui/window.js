/* WINDOW — Ventanas modales arrastrables */
import { EXP } from '../data/exp.js';
import { makeEl } from './utils.js';

/** @returns {HTMLElement} */
function metaLabel(label, value) {
  const part = makeEl('span', '', {});
  part.appendChild(document.createTextNode(label + ': '));
  part.appendChild(document.createTextNode(value));
  return part;
}

export const Window = {
  _zc: 100,

  /** Incrementa z-index con límite de seguridad */
  nextZ() {
    this._zc = (this._zc % 9000) + 1000;
    return this._zc;
  },

  open(exp, folderEl) {
    const existing = document.querySelector('.win[data-id="' + exp.id + '"]');
    if (existing) { existing.style.display = 'flex'; return; }

    const container = document.getElementById('windows-container');
    const fragment = document.createDocumentFragment();

    // === Barra de título ===
    const titleBar = makeEl('div', '', { class: 'wtb' });
    const titleInner = makeEl('span', '', { class: 'wti' });
    titleInner.appendChild(makeEl('span', '\u{1F4DC}'));
    titleInner.appendChild(document.createTextNode(' ' + exp.titulo));
    titleBar.appendChild(titleInner);

    const winBtns = makeEl('div', '', { class: 'wb' });
    const closeBtn = makeEl('button', '\u00D7', { class: 'cl', 'aria-label': 'Cerrar ventana' });
    winBtns.appendChild(closeBtn);
    titleBar.appendChild(winBtns);
    fragment.appendChild(titleBar);

    // === Contenido ===
    const content = makeEl('div', '', { class: 'wct' });

    // Título H2
    const h2 = makeEl('h2', exp.titulo, {
      style: 'font-family:var(--serif);color:var(--gold);font-size:2rem;margin-bottom:8px;text-shadow:0 0 10px rgba(201,168,76,.2)'
    });
    content.appendChild(h2);

    // Meta info
    const meta = makeEl('div', '', { class: 'meta' });
    const tagClass = exp.st === 'solved' ? 'ftag ok' : 'ftag op';
    const tagLabel = exp.st === 'solved' ? 'RESUELTOS' : 'ABIERTO';

    meta.appendChild(metaLabel('CATEGORÍA', exp.cat));
    meta.appendChild(metaLabel('AÑO', exp.ano));
    meta.appendChild(metaLabel('NIVEL', exp.niv));

    const statusTag = makeEl('span', tagLabel, { class: tagClass });
    meta.appendChild(statusTag);

    exp.tech.split(',').forEach(t => {
      meta.appendChild(makeEl('span', t.trim(), { class: 'ftag' }));
    });
    content.appendChild(meta);

    // Brief
    const brief = makeEl('p', exp.det, { class: 'brief' });
    content.appendChild(brief);

    // Impacto
    if (exp.impacto && exp.impacto.length) {
      content.appendChild(makeEl('h4', 'RESUMEN DE IMPACTO', {
        style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase'
      }));
      const grid = makeEl('div', '', { class: 'impact-grid' });
      exp.impacto.forEach(k => {
        const item = makeEl('div', '', { class: 'kpi-item' });
        item.appendChild(makeEl('div', k.val, { class: 'kpi-val' }));
        item.appendChild(makeEl('div', k.lab, { class: 'kpi-lab' }));
        item.appendChild(makeEl('div', k.desc, { class: 'kpi-desc' }));
        grid.appendChild(item);
      });
      content.appendChild(grid);
    }

    // Desafío
    if (exp.desafio) {
      content.appendChild(makeEl('h4', 'EL DESAFÍO', {
        style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase'
      }));
      content.appendChild(makeEl('p', exp.desafio, { class: 'section-text' }));
    }

    // Estrategia
    if (exp.estrategia && exp.estrategia.length) {
      content.appendChild(makeEl('h4', 'ESTRATEGIA Y ACCIÓN', {
        style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase'
      }));
      exp.estrategia.forEach(s => {
        const item = makeEl('div', '', { class: 'strategy-item' });
        item.appendChild(makeEl('div', s.tit, { class: 'strategy-title' }));
        item.appendChild(makeEl('div', s.txt, { class: 'strategy-text' }));
        content.appendChild(item);
      });
    }

    // Archivos
    content.appendChild(makeEl('h4', 'ARCHIVOS DEL SISTEMA', {
      style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase'
    }));
    const filesDiv = makeEl('div', '', { class: 'files' });
    exp.arc.forEach(f => {
      const row = makeEl('div', '', { class: 'frow' });
      row.appendChild(document.createTextNode('\u{1F4C4} ' + f));
      filesDiv.appendChild(row);
    });
    content.appendChild(filesDiv);

    // Entregables dummy
    content.appendChild(makeEl('h4', 'ENTREGABLES', {
      style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase'
    }));
    const imgRow = makeEl('div', '', { class: 'img-row' });
    for (let i = 0; i < 4; i++) {
      imgRow.appendChild(makeEl('div', 'IMG_' + (i + 1), { class: 'img-ph' }));
    }
    content.appendChild(imgRow);

    fragment.appendChild(content);

    // === Crear ventana DOM ===
    const win = document.createElement('div');
    win.className = 'win active';
    win.style.zIndex = this.nextZ();
    win.dataset.id = exp.id;
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-modal', 'true');
    win.setAttribute('aria-label', 'Expediente: ' + exp.titulo);

    const winLeft = Math.max(40, window.innerWidth * 0.1);
    let winTop = 40;
    if (folderEl) {
      const rect = folderEl.getBoundingClientRect();
      winTop = Math.max(40, rect.bottom + 24);
    }
    win.style.left = winLeft + 'px';
    win.style.top = winTop + 'px';

    container.appendChild(win);
    while (fragment.firstChild) win.appendChild(fragment.firstChild);

    // === Drag con cleanup ===
    let dragging = false, offsetX, offsetY;
    let handlers = null;

    titleBar.addEventListener('mousedown', e => {
      dragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      titleBar.classList.add('dg');
      win.style.zIndex = this.nextZ();
    });

    handlers = {
      mousemove: e => {
        if (dragging) {
          win.style.left = (e.clientX - offsetX) + 'px';
          win.style.top = (e.clientY - offsetY) + 'px';
        }
      },
      mouseup: () => {
        dragging = false;
        titleBar.classList.remove('dg');
      }
    };
    document.addEventListener('mousemove', handlers.mousemove);
    document.addEventListener('mouseup', handlers.mouseup);

    win.addEventListener('mousedown', () => { win.style.zIndex = this.nextZ(); });

    closeBtn.addEventListener('click', () => {
      if (handlers) {
        document.removeEventListener('mousemove', handlers.mousemove);
        document.removeEventListener('mouseup', handlers.mouseup);
      }
      win.remove();
    });
  }
};
