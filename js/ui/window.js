/* WINDOW — Ventanas modales arrastrables con minimizar/apilar */
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
  _openCount: 0,

  /** Incrementa z-index con límite de seguridad */
  nextZ() {
    this._zc = (this._zc % 9000) + 1000;
    return this._zc;
  },

  /** Abre una ventana con desplazamiento acumulativo (12px abajo + 12px derecha) */
  open(exp, folderEl) {
    // Si ya existe y está minimizada, restaurarla
    const existing = document.querySelector('.win[data-id="' + exp.id + '"]');
    if (existing) {
      if (existing.classList.contains('minimized')) {
        existing.classList.remove('minimized');
      }
      existing.style.display = 'flex';
      existing.style.zIndex = this.nextZ();
      return;
    }

    const container = document.getElementById('windows-container');
    const fragment = document.createDocumentFragment();
    this._openCount++;

    // === Barra de título ===
    const titleBar = makeEl('div', '', { class: 'wtb' });
    const titleInner = makeEl('span', '', { class: 'wti' });
    titleInner.appendChild(makeEl('span', '\u{1F4DC}'));
    titleInner.appendChild(document.createTextNode(' ' + exp.titulo));
    titleBar.appendChild(titleInner);

    const winBtns = makeEl('div', '', { class: 'wb' });

    // Botón minimizar (➖)
    const minBtn = makeEl('button', '\u2796', {
      'aria-label': 'Minimizar ventana'
    });
    winBtns.appendChild(minBtn);

    // Botón cerrar (×)
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

    // Posición: apilada 12px abajo + 12px derecha de la anterior
    const baseLeft = Math.max(40, window.innerWidth * 0.1);
    const baseTop = 40;
    const offsetX = (this._openCount - 1) * 12;
    const offsetY = (this._openCount - 1) * 12;

    // Si hay folderEl, usa su posición como base para el top
    let winLeft = baseLeft + offsetX;
    let winTop = baseTop + offsetY;
    if (folderEl) {
      const rect = folderEl.getBoundingClientRect();
      winTop = Math.max(baseTop + offsetY, rect.bottom + 24);
      winLeft = Math.max(baseLeft + offsetX, rect.left - 300);
    }

    win.style.left = winLeft + 'px';
    win.style.top = winTop + 'px';

    // Guardamos la última posición visible para restaurar
    win.dataset.lastLeft = winLeft + 'px';
    win.dataset.lastTop = winTop + 'px';

    container.appendChild(win);
    while (fragment.firstChild) win.appendChild(fragment.firstChild);

    // === Drag con cleanup ===
    let dragging = false, offsetXDrag, offsetYDrag, clickStartX, clickStartY;
    let handlers = null;

    titleBar.addEventListener('mousedown', e => {
      dragging = true;
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      offsetXDrag = e.clientX - win.offsetLeft;
      offsetYDrag = e.clientY - win.offsetTop;
      titleBar.classList.add('dg');
      win.style.zIndex = this.nextZ();
      // Guardar posición actual como última visible
      win.dataset.lastLeft = win.style.left;
      win.dataset.lastTop = win.style.top;
    });

    handlers = {
      mousemove: e => {
        if (dragging) {
          win.style.left = (e.clientX - offsetXDrag) + 'px';
          win.style.top = (e.clientY - offsetYDrag) + 'px';
          win.dataset.lastLeft = win.style.left;
          win.dataset.lastTop = win.style.top;
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

    // === Minimizar ===
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.classList.add('minimized');
      win.style.zIndex = 600;
      Window._repositionMinimized();
    });

    // Click en ventana minimizada → restaurar
    win.addEventListener('mousedown', (e) => {
      if (win.classList.contains('minimized')) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });

    win.addEventListener('click', (e) => {
      if (win.classList.contains('minimized')) {
        e.stopPropagation();
        win.classList.remove('minimized');
        win.style.display = 'flex';
        win.style.zIndex = Window.nextZ();
        // Restaurar última posición
        if (win.dataset.lastLeft) win.style.left = win.dataset.lastLeft;
        if (win.dataset.lastTop) win.style.top = win.dataset.lastTop;
      }
    });

    // === Cerrar ===
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (handlers) {
        document.removeEventListener('mousemove', handlers.mousemove);
        document.removeEventListener('mouseup', handlers.mouseup);
      }
      // Deseleccionar carpeta al cerrar ventana
      if (folderEl) {
        folderEl.classList.remove('sel');
        folderEl.querySelector('.ico').textContent = '\u{1F4C1}'; // 📁
      }
      win.remove();
    });
  }
};

/** Reposiciona dinámicamente todas las ventanas minimizadas en fila horizontal */
Window._repositionMinimized = function () {
  const minimized = document.querySelectorAll('.win.minimized');
  const count = minimized.length;
  if (count === 0) return;
  const spacing = 204; // 200px + 4px gap
  const totalWidth = count * spacing;
  const startX = Math.max(4, (window.innerWidth - totalWidth) / 2);
  minimized.forEach((w, i) => {
    w.style.left = (startX + i * spacing) + 'px';
  });
};

// Reposicionar al redimensionar la ventana
window.addEventListener('resize', () => {
  Window._repositionMinimized();
});
  }
};
