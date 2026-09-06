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

  /** Detecta si estamos en mobile */
  _isMobile() {
    return window.innerWidth <= 900;
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
      // En mobile, restaurar posición centrada
      if (this._isMobile()) {
        existing.style.left = '50%';
        existing.style.top = '50%';
        existing.style.transform = 'translate(-50%, -50%)';
      }
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

    // Posición: apilada 12px abajo + 12px derecha de la anterior (desktop)
    // En mobile, centrar la ventana
    const isMobile = this._isMobile();

    let winLeft, winTop;
    if (isMobile) {
      winLeft = 50;
      winTop = 50;
      win.style.left = winLeft + '%';
      win.style.top = winTop + '%';
      win.style.transform = 'translate(-50%, -50%)';
      win.style.maxWidth = '95vw';
    } else {
      const baseLeft = Math.max(40, window.innerWidth * 0.1);
      const baseTop = 40;
      const offsetX = (this._openCount - 1) * 12;
      const offsetY = (this._openCount - 1) * 12;

      // Si hay folderEl, usa su posición como base para el top
      winLeft = baseLeft + offsetX;
      winTop = baseTop + offsetY;
      if (folderEl) {
        const rect = folderEl.getBoundingClientRect();
        winTop = Math.max(baseTop + offsetY, rect.bottom + 24);
        winLeft = Math.max(baseLeft + offsetX, rect.left - 300);
      }

      win.style.left = winLeft + 'px';
      win.style.top = winTop + 'px';
      win.style.transform = 'none';
    }

    // Guardamos la última posición visible para restaurar
    if (isMobile) {
      win.dataset.lastLeft = '50%';
      win.dataset.lastTop = '50%';
    } else {
      win.dataset.lastLeft = winLeft + 'px';
      win.dataset.lastTop = winTop + 'px';
    }

    container.appendChild(win);
    while (fragment.firstChild) win.appendChild(fragment.firstChild);

    // === Drag con cleanup (mouse + touch) ===
    let dragging = false, offsetXDrag, offsetYDrag, clickStartX, clickStartY;
    let handlers = null;
    let touchHandlers = null;

    function startDrag(clientX, clientY) {
      dragging = true;
      clickStartX = clientX;
      clickStartY = clientY;
      offsetXDrag = clientX - win.offsetLeft;
      offsetYDrag = clientY - win.offsetTop;
      titleBar.classList.add('dg');
      win.style.zIndex = this.nextZ();
      // Guardar posición actual como última visible
      win.dataset.lastLeft = win.style.left;
      win.dataset.lastTop = win.style.top;
    }

    function moveDrag(clientX, clientY) {
      if (dragging) {
        win.style.left = (clientX - offsetXDrag) + 'px';
        win.style.top = (clientY - offsetYDrag) + 'px';
        win.style.transform = 'none';
        win.dataset.lastLeft = win.style.left;
        win.dataset.lastTop = win.style.top;
      }
    }

    function endDrag() {
      dragging = false;
      titleBar.classList.remove('dg');
    }

    // Mouse events
    titleBar.addEventListener('mousedown', e => {
      startDrag(e.clientX, e.clientY);
    });

    handlers = {
      mousemove: e => moveDrag(e.clientX, e.clientY),
      mouseup: endDrag
    };
    document.addEventListener('mousemove', handlers.mousemove);
    document.addEventListener('mouseup', handlers.mouseup);

    // Touch events for mobile
    titleBar.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    touchHandlers = {
      touchmove: e => {
        if (dragging) {
          e.preventDefault();
          const touch = e.touches[0];
          moveDrag(touch.clientX, touch.clientY);
        }
      },
      touchend: endDrag
    };
    document.addEventListener('touchmove', touchHandlers.touchmove, { passive: false });
    document.addEventListener('touchend', touchHandlers.touchend);

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
        // En mobile, restaurar centrado
        if (Window._isMobile()) {
          win.style.left = '50%';
          win.style.top = '50%';
          win.style.transform = 'translate(-50%, -50%)';
        }
      }
    });

    // === Cerrar ===
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (handlers) {
        document.removeEventListener('mousemove', handlers.mousemove);
        document.removeEventListener('mouseup', handlers.mouseup);
      }
      if (touchHandlers) {
        document.removeEventListener('touchmove', touchHandlers.touchmove);
        document.removeEventListener('touchend', touchHandlers.touchend);
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

/** Reposiciona dinámicamente las ventanas minimizadas */
Window._repositionMinimized = function () {
  const minimized = Array.from(document.querySelectorAll('.win.minimized'));
  const count = minimized.length;
  if (count === 0) return;

  const isMobile = window.innerWidth <= 900;
  const winWidth = 200;
  const gap = 4;
  const rowHeight = 32;
  const margin = 4;

  // Calcular cuántas caben por fila
  const colsPerRow = isMobile
    ? Math.floor((window.innerWidth - margin * 2) / (winWidth + gap))
    : Math.floor((window.innerWidth - margin * 2) / (winWidth + gap));

  const cols = Math.max(colsPerRow, 1);

  minimized.forEach((win, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    if (isMobile) {
      // Mobile: abajo a la izquierda, izquierda a derecha
      // Si no caben, segunda fila de abajo hacia arriba
      const x = margin + col * (winWidth + gap);
      const y = window.innerHeight - margin - rowHeight - row * (rowHeight + gap);
      win.style.left = x + 'px';
      win.style.top = y + 'px';
      win.style.bottom = 'auto';
      win.style.transform = 'none';
    } else {
      // Desktop: abajo a la derecha, izquierda a derecha
      // 32px por encima de la console-bar para no taparla
      // Si no caben, segunda fila de abajo hacia arriba
      const x = window.innerWidth - margin - (cols - col) * (winWidth + gap);
      const y = window.innerHeight - margin - rowHeight - row * (rowHeight + gap) - 32;
      win.style.left = x + 'px';
      win.style.top = y + 'px';
      win.style.bottom = 'auto';
      win.style.transform = 'none';
    }
  });
};

// Reposicionar al redimensionar la ventana
window.addEventListener('resize', () => {
  Window._repositionMinimized();
  // Recentrar ventanas abiertas al cambiar entre mobile/desktop
  const wins = document.querySelectorAll('.win:not(.minimized):not([data-id=""])');
  wins.forEach(win => {
    if (!win.dataset.id) return;
    const isMobile = window.innerWidth <= 900;
    if (isMobile && win.style.transform === 'none') {
      win.style.left = '50%';
      win.style.top = '50%';
      win.style.transform = 'translate(-50%, -50%)';
    } else if (!isMobile && win.style.transform && win.style.transform.includes('translate')) {
      // Recuperar última posición guardada
      if (win.dataset.lastLeft) win.style.left = win.dataset.lastLeft;
      if (win.dataset.lastTop) win.style.top = win.dataset.lastTop;
      win.style.transform = 'none';
    }
  });
});
