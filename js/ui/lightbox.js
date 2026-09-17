/**
 * LIGHTBOX — Visor de imágenes que usa Window.create().
 *
 * Misma ventana, mismos botones, mismo minimize.
 * Sin backdrop, sin overlay, sin reinventar nada.
 *
 * Uso: Lightbox.open(images, startIndex)
 */

import { Window } from './window.js';

export const Lightbox = {
  _win: null,
  _images: [],
  _index: 0,

  /** Abre el visor como una ventana normal del escritorio */
  open(images, startIndex = 0) {
    this._images = images;
    this._index = Math.max(0, Math.min(startIndex, images.length - 1));

    // Si ya está abierta → restaurar y actualizar imagen
    const existing = document.querySelector('.win[data-id="lightbox"]');
    if (existing) {
      if (existing.classList.contains('minimized')) {
        existing.classList.remove('minimized');
        existing.style.display = 'flex';
      }
      existing.style.zIndex = Window.nextZ();
      this._updateImage(existing);
      return;
    }

    // Crear ventana con Window.create() — título + content vacíos
    const win = Window.create('VISOR DE IMÁGENES', '🖼️', '', { id: 'lightbox' });

    // Guardar referencia
    this._win = win;

    // Contenido de la imagen (dentro del wct)
    const wct = win.querySelector('.wct');
    if (!wct) return;

    // Barra de navegación con flechas
    const nav = document.createElement('div');
    nav.className = 'lb-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lb-arrow lb-prev';
    prevBtn.textContent = '◀';
    prevBtn.title = 'Anterior';
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this._prev(win); });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lb-arrow lb-next';
    nextBtn.textContent = '▶';
    nextBtn.title = 'Siguiente';
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this._next(win); });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    wct.appendChild(nav);

    // Contenedor de imagen
    const imgWrap = document.createElement('div');
    imgWrap.className = 'lb-imgwrap';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'lb-imgcontainer';

    const img = document.createElement('img');
    img.className = 'lb-img';
    img.alt = 'E-MANTTO screenshot';
    img.style.opacity = '0';

    // Cargar imagen inmediatamente (sin delay)
    const onLoad = () => { img.style.opacity = '1'; };
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onLoad);
    img.src = this._images[this._index];
    if (img.complete) img.style.opacity = '1';

    // Prevenir drag en la imagen
    img.addEventListener('mousedown', (e) => { e.stopPropagation(); });

    imgContainer.appendChild(img);
    imgWrap.appendChild(imgContainer);
    wct.appendChild(imgWrap);

    // Contador debajo de la imagen
    const counter = document.createElement('div');
    counter.className = 'lb-counter';
    counter.textContent = `1 / ${this._images.length}`;
    wct.appendChild(counter);

    // Footer con instrucciones
    const footer = document.createElement('div');
    footer.className = 'lb-footer';
    footer.innerHTML = '<span>◀ ▶ para navegar · Click fuera para cerrar</span>';
    wct.appendChild(footer);

    // Teclado: Escape cierra, ← → navega
    const onKey = (e) => {
      if (!win.parentNode) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      if (e.key === 'Escape') {
        win.querySelector('.cl').click();
      } else if (e.key === 'ArrowLeft') {
        this._prev(win);
      } else if (e.key === 'ArrowRight') {
        this._next(win);
      }
    };
    document.addEventListener('keydown', onKey);

    // Guardar handler para cleanup
    win.dataset.lbKeyHandler = 'true';
    win._lbKeyHandler = onKey;

    // Sobrescribir botón de cerrar para limpiar listeners
    const closeBtn = win.querySelector('.cl');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.removeEventListener('keydown', onKey);
      });
    }
  },

  _prev(win) {
    if (!this._images.length || !win) return;
    this._index = (this._index - 1 + this._images.length) % this._images.length;
    this._updateImage(win);
  },

  _next(win) {
    if (!this._images.length || !win) return;
    this._index = (this._index + 1) % this._images.length;
    this._updateImage(win);
  },

  _updateImage(win) {
    if (!win) return;
    const img = win.querySelector('.lb-img');
    const counter = win.querySelector('.lb-counter');
    if (!img || !counter) return;

    // Contador inmediato
    counter.textContent = `${this._index + 1} / ${this._images.length}`;

    // Cambiar imagen solo si es diferente
    const src = this._images[this._index];
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

      if (img.complete) {
        img.style.opacity = '1';
      }
    } else {
      img.style.opacity = '1';
    }
  }
};
