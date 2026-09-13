/**
 * WINDOW — Ventanas modales arrastrables con minimizar/apilar.
 *
 * Exp: Window.open(exp, folderEl) → abre expediente con layout completo
 * Gen: Window.create(titulo, ico, contentHtml, opts) → ventana genérica
 */

import { makeDraggable } from './drag.js';

/** @returns {HTMLElement} */
function metaLabel(label, value) {
  const part = document.createElement('span');
  part.appendChild(document.createTextNode(label + ': '));
  part.appendChild(document.createTextNode(value));
  return part;
}

export const Window = {
  _zc: 100,
  _openCount: 0,

  nextZ() {
    this._zc = (this._zc % 9000) + 1000;
    return this._zc;
  },

  _isMobile() {
    return window.innerWidth <= 900;
  },

  /**
   * Crea una ventana genérica con titlebar + content.
   * @param {string} titulo - Texto de la barra de título
   * @param {string} ico    - Emoji/icono
   * @param {string} html   - HTML del contenido (opcional)
   * @param {object} opts   - Opciones: { id, zIndex }
   * @returns {HTMLElement} La ventana DOM
   */
  create(titulo, ico, html = '', opts = {}) {
    const container = document.getElementById('windows-container');
    const win = document.createElement('div');
    win.className = 'win active';
    win.style.zIndex = this.nextZ();

    if (opts.id) win.dataset.id = opts.id;
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-modal', 'true');

    // Titlebar
    const titleBar = document.createElement('div');
    titleBar.className = 'wtb';
    const titleInner = document.createElement('span');
    titleInner.className = 'wti';
    titleInner.appendChild(document.createTextNode(ico + ' ' + titulo));
    titleBar.appendChild(titleInner);

    // Botones
    const winBtns = document.createElement('div');
    winBtns.className = 'wb';

    const minBtn = document.createElement('button');
    minBtn.textContent = '\u2796';
    minBtn.setAttribute('aria-label', 'Minimizar ventana');
    winBtns.appendChild(minBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cl';
    closeBtn.textContent = '\u00D7';
    closeBtn.setAttribute('aria-label', 'Cerrar ventana');
    winBtns.appendChild(closeBtn);

    titleBar.appendChild(winBtns);

    // Content
    const content = document.createElement('div');
    content.className = 'wct';
    if (html) {
      content.innerHTML = html;
    }

    win.appendChild(titleBar);
    win.appendChild(content);
    container.appendChild(win);

    // Drag
    makeDraggable(win, titleBar);
    win.addEventListener('mousedown', () => { win.style.zIndex = this.nextZ(); });

    // Minimizar
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.classList.add('minimized');
      win.style.zIndex = 600;
      Window._repositionMinimized();
    });

    // Click en minimizada → restaurar
    win.addEventListener('click', (e) => {
      if (!win.classList.contains('minimized')) return;
      e.stopPropagation();
      win.classList.remove('minimized');
      win.style.display = 'flex';
      win.style.zIndex = Window.nextZ();
      if (Window._isMobile()) {
        win.style.left = '50%';
        win.style.top = '50%';
        win.style.transform = 'translate(-50%, -50%)';
      } else if (win.dataset.lastLeft) {
        win.style.left = win.dataset.lastLeft;
        win.style.top = win.dataset.lastTop;
        win.style.transform = 'none';
      }
    });

    // Cerrar
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.remove();
    });

    return win;
  },

  /** Abre ventana de expediente */
  open(exp, folderEl) {
    const existing = document.querySelector('.win[data-id="' + exp.id + '"]');
    if (existing) {
      if (existing.classList.contains('minimized')) existing.classList.remove('minimized');
      existing.style.display = 'flex';
      existing.style.zIndex = this.nextZ();
      if (this._isMobile()) {
        existing.style.left = '50%';
        existing.style.top = '50%';
        existing.style.transform = 'translate(-50%, -50%)';
      }
      return;
    }

    this._openCount++;
    const fragment = document.createDocumentFragment();

    // === Titlebar ===
    const titleBar = document.createElement('div');
    titleBar.className = 'wtb';
    const titleInner = document.createElement('span');
    titleInner.className = 'wti';
    titleInner.appendChild(document.createTextNode('\u{1F4DC} ' + exp.titulo));
    titleBar.appendChild(titleInner);

    const winBtns = document.createElement('div');
    winBtns.className = 'wb';

    const minBtn = document.createElement('button');
    minBtn.textContent = '\u2796';
    minBtn.setAttribute('aria-label', 'Minimizar ventana');
    winBtns.appendChild(minBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cl';
    closeBtn.textContent = '\u00D7';
    closeBtn.setAttribute('aria-label', 'Cerrar ventana');
    winBtns.appendChild(closeBtn);

    titleBar.appendChild(winBtns);
    fragment.appendChild(titleBar);

    // === Content ===
    const content = document.createElement('div');
    content.className = 'wct';

    // Título H2
    const h2 = document.createElement('h2');
    h2.textContent = exp.titulo;
    content.appendChild(h2);

    // Meta info
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.appendChild(metaLabel('CATEGORÍA', exp.cat));
    meta.appendChild(metaLabel('AÑO', exp.ano));
    meta.appendChild(metaLabel('NIVEL', exp.niv));

    const statusClass = exp.st === 'solved' ? 'tag-solved' : 'tag-open';
    const tagLabel = exp.st === 'solved' ? 'RESUELTOS ✓' : 'ABIERTO →';
    const statusTag = document.createElement('span');
    statusTag.className = 'ftag ' + statusClass;
    statusTag.textContent = tagLabel;
    meta.appendChild(statusTag);

    exp.tech.split(',').forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'ftag';
      tag.textContent = t.trim();
      meta.appendChild(tag);
    });
    content.appendChild(meta);

    // Brief
    const brief = document.createElement('p');
    brief.className = 'brief';
    brief.textContent = exp.det;
    content.appendChild(brief);

    // Impacto
    if (exp.impacto && exp.impacto.length) {
      const impactH4 = document.createElement('h4');
      impactH4.textContent = 'RESUMEN DE IMPACTO';
      content.appendChild(impactH4);

      const grid = document.createElement('div');
      grid.className = 'impact-grid';
      exp.impacto.forEach(k => {
        const item = document.createElement('div');
        item.className = 'kpi-item';
        const val = document.createElement('div');
        val.className = 'kpi-val';
        val.textContent = k.val;
        item.appendChild(val);
        const lab = document.createElement('div');
        lab.className = 'kpi-lab';
        lab.textContent = k.lab;
        item.appendChild(lab);
        const desc = document.createElement('div');
        desc.className = 'kpi-desc';
        desc.textContent = k.desc;
        item.appendChild(desc);
        grid.appendChild(item);
      });
      content.appendChild(grid);
    }

    // Desafío
    if (exp.desafio) {
      const desafioH4 = document.createElement('h4');
      desafioH4.textContent = 'EL DESAFÍO';
      content.appendChild(desafioH4);
      const desafioP = document.createElement('p');
      desafioP.className = 'section-text';
      desafioP.textContent = exp.desafio;
      content.appendChild(desafioP);
    }

    // Estrategia
    if (exp.estrategia && exp.estrategia.length) {
      const estratH4 = document.createElement('h4');
      estratH4.textContent = 'ESTRATEGIA Y ACCIÓN';
      content.appendChild(estratH4);
      exp.estrategia.forEach(s => {
        const item = document.createElement('div');
        item.className = 'strategy-item';
        const titEl = document.createElement('div');
        titEl.className = 'strategy-title';
        titEl.textContent = s.tit;
        item.appendChild(titEl);
        const txtEl = document.createElement('div');
        txtEl.className = 'strategy-text';
        txtEl.textContent = s.txt;
        item.appendChild(txtEl);
        content.appendChild(item);
      });
    }

    // Archivos
    const filesH4 = document.createElement('h4');
    filesH4.textContent = 'ARCHIVOS DEL SISTEMA';
    content.appendChild(filesH4);
    const filesDiv = document.createElement('div');
    filesDiv.className = 'files';
    exp.arc.forEach(f => {
      const row = document.createElement('div');
      row.className = 'frow';
      row.textContent = '\u{1F4C4} ' + f;
      filesDiv.appendChild(row);
    });
    content.appendChild(filesDiv);

    // Entregables dummy
    const delivH4 = document.createElement('h4');
    delivH4.textContent = 'ENTREGABLES';
    content.appendChild(delivH4);
    const imgRow = document.createElement('div');
    imgRow.className = 'img-row';
    for (let i = 0; i < 4; i++) {
      const ph = document.createElement('div');
      ph.className = 'img-ph';
      ph.textContent = 'IMG_' + (i + 1);
      imgRow.appendChild(ph);
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

    // Posición
    const isMobile = this._isMobile();
    if (isMobile) {
      win.style.left = '50%';
      win.style.top = '50%';
      win.style.transform = 'translate(-50%, -50%)';
      win.style.maxWidth = '95vw';
      win.dataset.lastLeft = '50%';
      win.dataset.lastTop = '50%';
    } else {
      const baseLeft = Math.max(40, window.innerWidth * 0.1);
      const baseTop = 40;
      const offsetX = (this._openCount - 1) * 12;
      const offsetY = (this._openCount - 1) * 12;

      let winLeft, winTop;
      if (folderEl) {
        const rect = folderEl.getBoundingClientRect();
        winLeft = Math.max(baseLeft + offsetX, rect.left - 300);
        winTop = Math.max(baseTop + offsetY, rect.bottom + 24);
      } else {
        winLeft = baseLeft + offsetX;
        winTop = baseTop + offsetY;
      }

      win.style.left = winLeft + 'px';
      win.style.top = winTop + 'px';
      win.style.transform = 'none';
      win.dataset.lastLeft = winLeft + 'px';
      win.dataset.lastTop = winTop + 'px';
    }

    document.getElementById('windows-container').appendChild(win);
    while (fragment.firstChild) win.appendChild(fragment.firstChild);

    // === Drag ===
    makeDraggable(win, titleBar);
    win.addEventListener('mousedown', () => { win.style.zIndex = this.nextZ(); });

    // === Minimizar ===
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.classList.add('minimized');
      win.style.zIndex = 600;
      Window._repositionMinimized();
    });

    // Click en minimizada → restaurar
    win.addEventListener('mousedown', (e) => {
      if (win.classList.contains('minimized')) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });

    win.addEventListener('click', (e) => {
      if (!win.classList.contains('minimized')) return;
      e.stopPropagation();
      win.classList.remove('minimized');
      win.style.display = 'flex';
      win.style.zIndex = Window.nextZ();
      if (Window._isMobile()) {
        win.style.left = '50%';
        win.style.top = '50%';
        win.style.transform = 'translate(-50%, -50%)';
      } else if (win.dataset.lastLeft) {
        win.style.left = win.dataset.lastLeft;
        win.style.top = win.dataset.lastTop;
        win.style.transform = 'none';
      }
    });

    // === Cerrar ===
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (folderEl) {
        folderEl.classList.remove('sel');
        folderEl.querySelector('.ico').textContent = '\u{1F4C1}';
      }
      win.remove();
    });
  },

  /** Reposiciona dinámicamente las ventanas minimizadas */
  _repositionMinimized() {
    const minimized = Array.from(document.querySelectorAll('.win.minimized'));
    const count = minimized.length;
    if (count === 0) return;

    const isMobile = window.innerWidth <= 900;
    const winWidth = 200;
    const gap = 4;
    const rowHeight = 32;
    const margin = 4;
    const colsPerRow = Math.floor((window.innerWidth - margin * 2) / (winWidth + gap));
    const cols = Math.max(colsPerRow, 1);

    minimized.forEach((win, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      if (isMobile) {
        const x = margin + col * (winWidth + gap);
        const y = window.innerHeight - margin - rowHeight - row * (rowHeight + gap);
        win.style.left = x + 'px';
        win.style.top = y + 'px';
      } else {
        const x = window.innerWidth - margin - (cols - col) * (winWidth + gap);
        const y = window.innerHeight - margin - rowHeight - row * (rowHeight + gap) - 32;
        win.style.left = x + 'px';
        win.style.top = y + 'px';
      }
      win.style.bottom = 'auto';
      win.style.transform = 'none';
    });
  },
};

// Reposicionar al redimensionar la ventana
window.addEventListener('resize', () => {
  Window._repositionMinimized();
  const wins = document.querySelectorAll('.win:not(.minimized):not([data-id=""])');
  wins.forEach(win => {
    if (!win.dataset.id) return;
    const isMobile = window.innerWidth <= 900;
    if (isMobile && win.style.transform === 'none') {
      win.style.left = '50%';
      win.style.top = '50%';
      win.style.transform = 'translate(-50%, -50%)';
    } else if (!isMobile && win.style.transform && win.style.transform.includes('translate')) {
      if (win.dataset.lastLeft) win.style.left = win.dataset.lastLeft;
      if (win.dataset.lastTop) win.style.top = win.dataset.lastTop;
      win.style.transform = 'none';
    }
  });
});
