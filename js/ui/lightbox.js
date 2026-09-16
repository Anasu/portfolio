/**
 * LIGHTBOX — Visor de imágenes estilo retro Windows 95.
 *
 * Uso: Lightbox.open(images, startIndex)
 *   images: array de strings (URLs o paths relativos)
 *   startIndex: índice inicial (default 0)
 */

import { makeDraggable } from './drag.js';

export const Lightbox = {
  _overlay: null,
  _win: null,
  _img: null,
  _counter: null,
  _indicator: null,
  _images: [],
  _index: 0,
  _minimized: false,
  _keyHandler: null,

  /** Abre el lightbox con un array de imágenes */
  open(images, startIndex = 0) {
    this._images = images;
    this._index = Math.max(0, Math.min(startIndex, images.length - 1));
    this._minimized = false;

    if (!this._overlay) this._build();

    // Mostrar overlay y ventana
    const container = document.getElementById('windows-container');
    if (!this._overlay.parentNode) {
      container.appendChild(this._overlay);
    }
    this._overlay.classList.add('lb-active');
    this._win.classList.remove('lb-minimized');

    // Reset posición centrada en mobile
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
      this._win.style.left = '50%';
      this._win.style.top = '50%';
      this._win.style.transform = 'translate(-50%, -50%)';
    }

    document.body.style.overflow = 'hidden';
    this._update();
  },

  /** Cierra el lightbox */
  close() {
    if (this._overlay && this._overlay.parentNode) {
      this._overlay.remove();
    }
    if (this._indicator && this._indicator.parentNode) {
      this._indicator.remove();
    }
    this._overlay = null;
    this._win = null;
    this._img = null;
    this._counter = null;
    this._indicator = null;
    this._images = [];
    this._index = 0;
    this._minimized = false;

    // Remover listener de teclado
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }

    document.body.style.overflow = '';
  },

  /** Minimiza/restaura el lightbox */
  toggleMinimize() {
    this._minimized = !this._minimized;
    if (this._minimized) {
      // Ocultar overlay, mostrar indicador
      this._overlay.classList.remove('lb-active');
      if (!this._indicator) {
        this._indicator = document.createElement('div');
        this._indicator.className = 'lb-minimized-indicator';
        this._indicator.textContent = 'VISOR E-MANTTO';
        this._indicator.addEventListener('click', () => this.toggleMinimize());
        document.body.appendChild(this._indicator);
      } else {
        this._indicator.style.display = 'flex';
      }
    } else {
      // Restaurar overlay, ocultar indicador
      this._overlay.classList.add('lb-active');
      if (this._indicator) {
        this._indicator.style.display = 'none';
      }
    }
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

    // Botón minimizar
    const minBtn = document.createElement('button');
    minBtn.className = 'lb-btn lb-min';
    minBtn.textContent = '_';
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMinimize();
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
    this._keyHandler = onKey;
    document.addEventListener('keydown', onKey);

    // Guardar referencias
    this._overlay = overlay;
    this._win = win;
    this._img = img;
    this._counter = counter;
  },

  _update() {
    if (!this._img || !this._counter) return;

    const img = this._img;
    const src = this._images[this._index];

    // Actualizar contador inmediatamente
    this._counter.textContent = `${this._index + 1} / ${this._images.length}`;

    // Cambiar imagen con fade suave
    if (img.src !== src) {
      img.style.opacity = '0';

      const onDone = () => {
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
        img.style.opacity = '1';
      };

      img.addEventListener('load', onDone);
      img.addEventListener('error', onDone);
      img.src = src;

      // Fallback: si la imagen ya está en caché (complete), fade inmediato
      if (img.complete) {
        img.style.opacity = '1';
      }
    } else {
      // Misma imagen — asegurar visibilidad
      img.style.opacity = '1';
    }
  }
};
