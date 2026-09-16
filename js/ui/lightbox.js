/**
 * LIGHTBOX — Visor de imágenes estilo retro Windows 95.
 *
 * Uso: Lightbox.open(images, startIndex)
 *   images: array de strings (URLs o paths relativos)
 *   startIndex: índice inicial (default 0)
 */

import { makeDraggable } from './drag.js';

export const Lightbox = {
  _el: null,
  _images: [],
  _index: 0,

  /** Abre el lightbox con un array de imágenes */
  open(images, startIndex = 0) {
    this._images = images;
    this._index = Math.max(0, Math.min(startIndex, images.length - 1));
    if (!this._el) this._build();
    this._show();
    this._update();
    document.body.style.overflow = 'hidden';
  },

  /** Cierra el lightbox */
  close() {
    if (this._el) this._el.remove();
    this._el = null;
    this._images = [];
    document.body.style.overflow = '';
  },

  _prev() {
    if (this._images.length <= 1) return;
    this._index = (this._index - 1 + this._images.length) % this._images.length;
    this._update();
  },

  _next() {
    if (this._images.length <= 1) return;
    this._index = (this._index + 1) % this._images.length;
    this._update();
  },

  _show() {
    document.getElementById('windows-container').appendChild(this._el);
    this._el.classList.add('lb-active');
  },

  _build() {
    const container = document.getElementById('windows-container');

    // Overlay principal
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    // Ventana retro Windows 95
    const win = document.createElement('div');
    win.className = 'lb-win';
    win.style.pointerEvents = 'auto';

    // Titlebar
    const titleBar = document.createElement('div');
    titleBar.className = 'lb-wtb';

    const titleLeft = document.createElement('span');
    titleLeft.className = 'lb-wti';
    titleLeft.textContent = '🖼️ VISOR DE IMÁGENES — E-MANTTO';

    const btns = document.createElement('div');
    btns.className = 'lb-wb';

    // Botón minimizar (decorativo)
    const minBtn = document.createElement('button');
    minBtn.className = 'lb-btn lb-min';
    minBtn.textContent = '_';
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      win.classList.toggle('lb-minimized');
    });

    // Botón cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lb-btn lb-cl';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    btns.appendChild(minBtn);
    btns.appendChild(closeBtn);
    titleBar.appendChild(titleLeft);
    titleBar.appendChild(btns);

    // Controles de navegación
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

    // Contenedor de imagen
    const imgWrap = document.createElement('div');
    imgWrap.className = 'lb-imgwrap';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'lb-imgcontainer';

    const img = document.createElement('img');
    img.className = 'lb-img';
    img.alt = 'E-MANTTO screenshot';

    // Contador
    const counter = document.createElement('div');
    counter.className = 'lb-counter';

    // Footer info
    const footer = document.createElement('div');
    footer.className = 'lb-footer';
    footer.innerHTML = '<span>Click en flechas para navegar · Click fuera para cerrar</span>';

    // Ensamblar ventana
    win.appendChild(titleBar);
    win.appendChild(nav);
    imgContainer.appendChild(img);
    imgWrap.appendChild(imgContainer);
    win.appendChild(imgWrap);
    win.appendChild(counter);
    win.appendChild(footer);

    overlay.appendChild(win);
    container.appendChild(overlay);

    // Drag (solo titlebar)
    makeDraggable(win, titleBar);

    // Click en overlay fuera de la ventana → cerrar
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    // Teclado: Escape cierra, ← → navega
    const onKey = (e) => {
      if (!overlay.parentNode) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this._prev();
      if (e.key === 'ArrowRight') this._next();
    };
    document.addEventListener('keydown', onKey);

    // Guardar referencia al overlay para cleanup
    this._overlay = overlay;
    this._win = win;
    this._img = img;
    this._counter = counter;
  },

  _update() {
    if (!this._img || !this._counter) return;

    // Actualizar imagen con efecto fade
    const img = this._img;
    img.style.opacity = '0';

    setTimeout(() => {
      img.src = this._images[this._index];
      img.onload = () => {
        img.style.opacity = '1';
      };
      // Fallback por si la imagen ya está en caché
      if (img.complete) {
        img.style.opacity = '1';
      }
    }, 100);

    this._counter.textContent = `${this._index + 1} / ${this._images.length}`;
  }
};
