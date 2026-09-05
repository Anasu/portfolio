/* TASKBAR — Barra superior con reloj en tiempo real */
import { makeEl } from './utils.js';

export function renderTaskbar() {
  const taskbar = document.getElementById('taskbar-top');
  const fragment = document.createDocumentFragment();

  const brand = makeEl('span', '\u2318 SISTEMA v2.7b', { class: 'tbar-brand' });
  const left = makeEl('span', 'DETECTIVE // CLEARANCE: NIVEL-\u03A9', { class: 'tbar-left' });
  const clock = makeEl('span', '', { id: 'clock', class: 'tbar-right' });

  function updateClock() {
    const now = new Date();
    const pad = v => String(v).padStart(2, '0');
    clock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + ' ' + now.toLocaleDateString('es-AR');
  }
  updateClock();
  setInterval(updateClock, 1000);

  fragment.appendChild(brand);
  fragment.appendChild(left);
  fragment.appendChild(clock);
  taskbar.appendChild(fragment);
}
