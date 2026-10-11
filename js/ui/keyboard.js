/* KEYBOARD — Navegación por teclado (tabindex, Enter, Escape) */
import { Window } from './window.js';

/**
 * Configura la navegación por teclado global.
 * No cambia comportamiento visual — solo agrega interacción keyboard.
 */
export function initKeyboard() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  /** Obtiene todas las carpetas del grid */
  function getFolders() {
    return Array.from(grid.querySelectorAll('.folder'));
  }

  /** Enfoca una carpeta por índice con wrap-around */
  function focusFolder(index) {
    const folders = getFolders();
    if (!folders.length) return;
    index = ((index % folders.length) + folders.length) % folders.length;
    folders[index].focus();
  }

  // === Carpetas: Enter/Space para abrir, flechas para navegar ===
  grid.addEventListener('keydown', e => {
    const folder = /** @type {HTMLElement} */ (document.activeElement);
    if (!folder || !folder.classList.contains('folder')) return;

    const folders = getFolders();
    const currentIndex = folders.indexOf(folder);

    // Enter / Space → abrir
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      folder.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      return;
    }

    // Calcular columnas para navegación vertical
    const colWidth = folder.offsetWidth + 24; // padding + gap
    const cols = Math.max(1, Math.floor(grid.clientWidth / colWidth));

    let targetIndex = currentIndex;
    switch (e.key) {
      case 'ArrowRight': targetIndex = currentIndex + 1; e.preventDefault(); break;
      case 'ArrowLeft': targetIndex = currentIndex - 1; e.preventDefault(); break;
      case 'ArrowDown': targetIndex = currentIndex + cols; e.preventDefault(); break;
      case 'ArrowUp': targetIndex = currentIndex - cols; e.preventDefault(); break;
      case 'Home': targetIndex = 0; e.preventDefault(); break;
      case 'End': targetIndex = folders.length - 1; e.preventDefault(); break;
      case 'PageDown': targetIndex = currentIndex + cols * 2; e.preventDefault(); break;
      case 'PageUp': targetIndex = currentIndex - cols * 2; e.preventDefault(); break;
      default: return;
    }

    if (targetIndex !== currentIndex) {
      focusFolder(targetIndex);
    }
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
