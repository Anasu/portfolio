/**
 * CONSOLE — Renderiza la barra de input de comandos y conecta quake terminal.
 * La lógica de comandos vive en commands.js.
 */

import { Quake } from './quake.js';
import { processCommand, logToPanel } from './commands.js';
import { t } from '../i18n.js';

export function renderConsole() {
  const consoleBar = document.querySelector('.console-bar');
  if (!consoleBar) return;

  // Crear prompt + input
  const prompt = document.createElement('span');
  prompt.className = 'cp';
  prompt.textContent = t('console_prompt');

  const input = document.createElement('input');
  input.id = 'cin';
  input.placeholder = t('console_placeholder');
  input.spellcheck = 'false';
  input.autocomplete = 'off';
  input.type = 'text';

  consoleBar.appendChild(prompt);
  consoleBar.appendChild(input);

  // Botón de abrir bottom sheet (^)
  const openBtn = document.createElement('button');
  openBtn.type = 'button';
  openBtn.className = 'quake-toggle-btn';
  openBtn.title = t('quake_toggle_title');
  openBtn.textContent = '^';
  openBtn.addEventListener('click', e => {
    e.stopPropagation();
    Quake.toggle();
    input.focus();
  });
  consoleBar.appendChild(openBtn);

  // Botón de reset para la altura del quake terminal
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'quake-reset';
  resetBtn.title = t('quake_reset_title');
  resetBtn.textContent = '↕';
  resetBtn.addEventListener('click', () => {
    Quake.resetHeight();
    input.focus();
  });
  consoleBar.appendChild(resetBtn);

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
