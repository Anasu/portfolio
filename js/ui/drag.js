/**
 * DRAG — Utilidad reutilizable para hacer elementos arrastrables.
 *
 * Crea drag con mouse + touch y retorna una función cleanup para remover listeners.
 */

/**
 * Hace que `element` sea arrastrable al agarrar `handle`.
 * @param {HTMLElement} element - El elemento a mover
 * @param {HTMLElement} handle  - El handle de arrastre (típicamente titlebar)
 * @param {Function} [onDragEnd] - Callback opcional al soltar
 * @returns {Function} Función cleanup para remover listeners
 */
export function makeDraggable(element, handle, onDragEnd) {
  let dragging = false;
  let offsetX, offsetY;

  function start(clientX, clientY) {
    dragging = true;
    offsetX = clientX - element.offsetLeft;
    offsetY = clientY - element.offsetTop;
    handle.classList.add('dg');
    element.classList.add('dragging');
  }

  function move(clientX, clientY) {
    if (!dragging) return;
    element.style.left = (clientX - offsetX) + 'px';
    element.style.top = (clientY - offsetY) + 'px';
    element.style.transform = 'none';
    element.dataset.lastLeft = element.style.left;
    element.dataset.lastTop = element.style.top;
  }

  function end() {
    dragging = false;
    handle.classList.remove('dg');
    element.classList.remove('dragging');
    if (onDragEnd) onDragEnd();
  }

  // Mouse events
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    start(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', e => move(e.clientX, e.clientY));
  document.addEventListener('mouseup', end);

  // Touch events
  handle.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    start(touch.clientX, touch.clientY);
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (dragging && e.touches[0]) {
      move(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  document.addEventListener('touchend', end);

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
  };
}
