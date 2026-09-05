/* APP — Punto de entrada principal del Panel del Investigador */
import { Boot } from './ui/boot.js';
import { Window } from './ui/window.js';
import { renderPanel } from './ui/panel.js';
import { renderTaskbar } from './ui/taskbar.js';
import { renderConsole } from './ui/console.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskbar();
  renderPanel();
  renderConsole();
  new Boot().go();
});
