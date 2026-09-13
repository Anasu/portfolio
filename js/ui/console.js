/**
 * CONSOLE — Renderiza la barra de input de comandos y conecta quake terminal.
 * La lógica de comandos vive en commands.js.
 */

import { Quake } from './quake.js';
import { processCommand, logToPanel } from './commands.js';

export function renderConsole() {
  const consoleBar = document.querySelector('.console-bar');
  if (!consoleBar) return;

  // Crear prompt + input
  const prompt = document.createElement('span');
  prompt.className = 'cp';
  prompt.textContent = 'investigador@panel:~$ ';

  const input = document.createElement('input');
  input.id = 'cin';
  input.placeholder = '_ comando...';
  input.spellcheck = 'false';
  input.autocomplete = 'off';
  input.type = 'text';

  consoleBar.appendChild(prompt);
  consoleBar.appendChild(input);

  // Inicializar quake terminal
  Quake.init();
  Quake.initResize();
  Quake.bindInput(input);

  // Procesar comando al presionar Enter
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      Quake.closeTerminal();
      input.blur();
      return;
    }
    if (e.key !== 'Enter') return;

    const raw = input.value.trim();
    input.value = '';
    if (!raw) return;

    // Log del comando en quake
    Quake.log('$ ' + raw, 'qt-cmd');
    logToPanel('[USR] ' + raw);

    // Procesar comando
    processCommand(raw);

    // Mantener foco
    input.focus();
  });
}
