/**
 * LIGHTBOX — Visor de imágenes estilo retro Windows 95.
 * Se comporta como cualquier otra ventana del escritorio.
 *
 * Uso: Lightbox.open(images, startIndex)
 */

import { makeDraggable } from './drag.js';
import { Window } from './window.js';

export const Lightbox = {
  _win: null,         // elemento DOM de la ventana
  _overlay: null,     // fondo oscuro (display:none al minimizar/cerrar)
  _img: null,
  _counter: null,
  _images: [],
  _index: 0,
  _minimized: false,

  /** Abre el visor */
  open(images, startIndex = 0) {
    this._images = images;
    this._index = Math.max(0, Math.min(startIndex, images.length - 1));

    if (this._win && this._win.parentNode) {
      // Ya existe — restaurar y actualizar imagen
      this._minimized = false;
      this._win.classList.remove('minimized');
      this._win.style.display = 'flex';
      this._win.style.zIndex = Window.nextZ();
      this._overlay.style.display = 'flex';
      this._updateImage();
      return;
    }

    this._build();
  },

  /** Cierra el visor */
  close() {
    if (this._win && this._win.parentNode) this._win.remove();
    if (this._overlay && this._overlay.parentNode) this._overlay.remove();
    this._win = null;
    this._overlay = null;
    this._img = null;
    this._counter = null;
    this._images = [];
    document.body.style.overflow = '';

    // Remover listeners
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
    }
  },

  _prev() {
    if (this._images.length <= 1 || !this._win) return;
    this._index = (this._index - 1 + this._images.length) % this._images.length;
    this._updateImage();
  },

  _next() {
    if (this._images.length <= 1 || !this._win) return;
    this._index = (this._index + 1) % this._images.length;
    this._updateImage();
  },

  _build() {
    const container = document.getElementById('windows-container');

    // ── Fondo oscuro ──
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay lb-active';
    overlay.style.pointerEvents = 'none';

    // ── Ventana retro (igual que Window.create) ──
    const win = document.createElement('div');
    win.className = 'win lb-win active';
    win.style.zIndex = Window.nextZ();
    win.style.width = 'min(90vw, 860px)';
    win.style.maxWidth = '90vw';
    win.style.pointerEvents = 'auto';

    // ── Titlebar ──
    const titleBar = document.createElement('div');
    titleBar.className = 'wtb lb-wtb';
    titleBar.style.cursor = 'grab';

    const titleLeft = document.createElement('span');
    titleLeft.className = 'wti';
    titleLeft.textContent = '🖼️ VISOR — E-MANTTO';

    // Botones de ventana (minimizar + cerrar)
    const winBtns = document.createElement('div');
    winBtns.className = 'wb';

    const minBtn = document.createElement('button');
    minBtn.textContent = '\u2796'; // −
    minBtn.setAttribute('aria-label', 'Minimizar visor');
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._minimized = true;
      win.classList.add('lb-minimized');
      overlay.style.display = 'none';
      // Posicionar siempre abajo a la izquierda, visible
      win.style.position = 'fixed';
      win.style.bottom = '12px';
      win.style.left = '12px';
      win.style.top = 'auto';
      win.style.right = 'auto';
      win.style.transform = 'none';
      win.style.zIndex = '9997';
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cl';
    closeBtn.textContent = '\u00D7'; // ×
    closeBtn.setAttribute('aria-label', 'Cerrar visor');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    winBtns.appendChild(minBtn);
    winBtns.appendChild(closeBtn);

    titleBar.appendChild(titleLeft);
    titleBar.appendChild(winBtns);

    // ── Barra de navegación (flechas) ──
    const nav = document.createElement('div');
    nav.className = 'lb-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lb-arrow lb-prev';
    prevBtn.textContent = '◀';
    prevBtn.title = 'Anterior';
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this._prev(); });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lb-arrow lb-next';
    nextBtn.textContent = '▶';
    nextBtn.title = 'Siguiente';
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this._next(); });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    // ── Contenedor de imagen ──
    const imgWrap = document.createElement('div');
    imgWrap.className = 'lb-imgwrap';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'lb-imgcontainer';

    const img = document.createElement('img');
    img.className = 'lb-img';
    img.alt = 'E-MANTTO screenshot';
    img.style.opacity = '0';

    // Cargar imagen inicial inmediatamente (sin delay)
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    img.addEventListener('error', () => { img.style.opacity = '1'; });
    img.src = this._images[this._index];
    if (img.complete) img.style.opacity = '1';

    // ── Contador ──
    const counter = document.createElement('div');
    counter.className = 'lb-counter';
    counter.textContent = `1 / ${this._images.length}`;

    // ── Footer ──
    const footer = document.createElement('div');
    footer.className = 'lb-footer';
    footer.innerHTML = '<span>Click en flechas para navegar · Click fuera para cerrar</span>';

    // ── Ensamblar ventana ──
    win.appendChild(titleBar);
    win.appendChild(nav);
    imgContainer.appendChild(img);
    imgWrap.appendChild(imgContainer);
    win.appendChild(imgWrap);
    win.appendChild(counter);
    win.appendChild(footer);

    overlay.appendChild(win);
    container.appendChild(overlay);

    // ── Drag (solo titlebar, bloquear en botones/imagénes) ──
    makeDraggable(win, titleBar);

    // Prevenir drag al hacer click en flechas o imagen
    nav.addEventListener('mousedown', (e) => { e.stopPropagation(); });
    img.addEventListener('mousedown', (e) => { e.stopPropagation(); });

    // ── Click fuera de la ventana → cerrar ──
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    // ── Click en ventana minimizada → restaurar ──
    win.addEventListener('click', (e) => {
      if (!this._minimized) return;
      e.stopPropagation();
      this._minimized = false;
      win.classList.remove('lb-minimized');
      win.style.position = 'absolute';
      win.style.bottom = 'auto';
      win.style.left = 'auto';
      win.style.top = 'auto';
      win.style.right = 'auto';
      win.style.transform = 'none';
      win.style.display = 'flex';
      win.style.zIndex = Window.nextZ();
      overlay.style.display = 'flex';
    });

    // ── Teclado: Escape cierra, ← → navega ──
    const onKey = (e) => {
      if (!win.parentNode) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this._prev();
      if (e.key === 'ArrowRight') this._next();
    };
    this._keyHandler = onKey;
    document.addEventListener('keydown', onKey);

    // Guardar referencias
    this._win = win;
    this._overlay = overlay;
    this._img = img;
    this._counter = counter;
  },

  _updateImage() {
    if (!this._img || !this._counter) return;

    const src = this._images[this._index];

    // Contador inmediato
    this._counter.textContent = `${this._index + 1} / ${this._images.length}`;

    // Solo cambiar si es diferente
    if (this._img.src !== src) {
      this._img.style.opacity = '0';

      const onDone = () => {
        this._img.removeEventListener('load', onDone);
        this._img.removeEventListener('error', onDone);
        this._img.style.opacity = '1';
      };

      this._img.addEventListener('load', onDone);
      this._img.addEventListener('error', onDone);
      this._img.src = src;

      if (this._img.complete) {
        this._img.style.opacity = '1';
      }
    } else {
      this._img.style.opacity = '1';
    }
  }
};
