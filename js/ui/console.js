/* CONSOLE — Barra de comandos estilo terminal */
import { EXP } from '../data/exp.js';
import { Window } from './window.js';

/** @returns {HTMLElement} */
function makeEl(tag, text, attrs) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

export function renderConsole() {
  const consoleBar = document.querySelector('.console-bar');
  const fragment = document.createDocumentFragment();

  const prompt = makeEl('span', 'investigador@panel:~$ ', { class: 'cp' });
  const input = makeEl('input', '', {
    id: 'cin',
    placeholder: '_ comando...',
    spellcheck: 'false',
    autocomplete: 'off',
    type: 'text'
  });

  fragment.appendChild(prompt);
  fragment.appendChild(input);
  consoleBar.appendChild(fragment);

  /** Escribe un mensaje en el panel lateral (registro) */
  const logToPanel = (msg) => {
    const plog = document.querySelector('.plog');
    if (plog) {
      plog.appendChild(makeEl('div', msg, { style: 'padding:1px 0' }));
      plog.scrollTop = plog.scrollHeight;
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;

    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    switch (cmd) {
      case 'help':
        logToPanel('[CMD] help → help | ls | open [id] | date | whoami');
        break;
      case 'ls':
        EXP.forEach(x => logToPanel('[LS] ' + x.ico + ' ' + x.titulo + ' [' + x.id + ']'));
        break;
      case 'open':
        logToPanel('[ERR] uso: open [id] — ej: open exp001');
        break;
      default:
        if (cmd.startsWith('open ')) {
          const id = cmd.split(' ')[1];
          const exp = EXP.find(e => e.id === id);
          if (exp) {
            Window.open(exp);
            logToPanel('[OPEN] ' + exp.titulo);
          } else {
            logToPanel('[ERR] expediente no encontrado: ' + id);
          }
        } else if (cmd === 'date') {
          logToPanel('[DATE] ' + new Date().toString());
        } else if (cmd === 'whoami') {
          logToPanel('[WHOAMI] detective');
        } else {
          logToPanel('[ERR] comando desconocido: ' + cmd);
        }
        break;
    }
  });
}
