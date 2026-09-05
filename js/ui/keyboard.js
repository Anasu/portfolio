/* KEYBOARD — Navegación por teclado (tabindex, Enter, Escape) */
import { Window } from './window.js';

/**
 * Configura la navegación por teclado global.
 * No cambia comportamiento visual — solo agrega interacción keyboard.
 */
export function initKeyboard() {
  // === Carpetas: tabindex + Enter/Space para abrir ===
  document.getElementById('grid').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    const folder = /** @type {HTMLElement} */ (document.activeElement);
    if (!folder || !folder.classList.contains('folder')) return;

    e.preventDefault();

    // Disparar el mismo evento click que el mouse
    folder.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // === Ventanas: Escape para cerrar ===
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;

    // Buscar la ventana con mayor z-index (la activa)
    const wins = Array.from(document.querySelectorAll('.win'));
    if (!wins.length) return;

    // La ventana activa es la que tiene display:flex
    const activeWin = wins.find(w => w.style.display !== 'none');
    if (!activeWin) return;

    e.preventDefault();

    // Simular click en botón de cerrar
    const closeBtn = activeWin.querySelector('.cl');
    if (closeBtn) closeBtn.click();
  });

  // === Console: focus automático al hacer click en la barra ===
  const consoleBar = document.querySelector('.console-bar');
  if (consoleBar) {
    consoleBar.addEventListener('click', () => {
      const input = document.getElementById('cin');
      if (input) input.focus();
    });
  }

  // === Tabindex en elementos interactivos ===
  // El desktop body actúa como contenedor principal
  const desktop = document.getElementById('desktop');
  if (desktop) {
    desktop.setAttribute('role', 'main');
  }
}
