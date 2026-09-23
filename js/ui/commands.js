/**
 * COMMANDS — Dispatcher de comandos de consola.
 * Cada comando mapea a una función que maneja su propia lógica.
 */

import { EXP_LIST } from '../data/exp.js';
import { Window } from './window.js';
import { Contact } from './contact.js';
import { Bio } from './bio.js';
import { Quake } from './quake.js';
import { TERMINAL_JOKES, ERROR_MESSAGES } from './jokes.js';
import { t } from '../i18n.js';

/** Escribe un mensaje en el panel lateral (registro) */
export function logToPanel(msg) {
  const plog = document.querySelector('.plog');
  if (plog) {
    const line = document.createElement('div');
    line.textContent = msg;
    line.style.padding = '1px 0';
    plog.appendChild(line);
    plog.scrollTop = plog.scrollHeight;
  }
}

/** Limpia el registro del panel */
export function clearPanel() {
  const plog = document.querySelector('.plog');
  if (plog) plog.innerHTML = '';
}

/** Encuentra un expediente por múltiples criterios (id, nombre, slug) */
export function findExp(query) {
  query = query.toLowerCase().trim();
  let exp = EXP_LIST.find(e => e.id === query);
  if (exp) return exp;

  const norm = q => q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\-]+/g, '');
  const nq = norm(query);
  for (const e of EXP_LIST) {
    if (norm(e.titulo.toLowerCase()) === nq || norm(e.titulo.toLowerCase()).includes(nq) || nq.includes(norm(e.titulo.toLowerCase()))) return e;
  }
  return null;
}

/** Muestra la lista de expedientes disponibles */
function cmdLs() {
  EXP_LIST.forEach(x => {
    const slug = x.titulo.toLowerCase().replace(/[\s\-]+/g, '-');
    logToPanel('[LS] ' + x.ico + ' ' + x.titulo.padEnd(12) + '[' + x.id + '|' + slug + ']');
  });
  EXP_LIST.forEach(x => {
    const slug = x.titulo.toLowerCase().replace(/[\s\-]+/g, '-');
    Quake.log('  ' + x.ico + ' ' + x.titulo.padEnd(12) + '[' + x.id + '|' + slug + ']', 'qt-out');
  });
}

/** Muestra ayuda */
function cmdHelp() {
  const helpText = [
    t('cmd_help_title'),
    '',
    t('cmd_nav'),
    t('cmd_help_cmd'),
    t('cmd_ls_cmd'),
    '',
    t('cmd_open_exp'),
    t('cmd_open_id'),
    t('cmd_open_name'),
    '',
    t('cmd_profile'),
    t('cmd_about'),
    t('cmd_contact'),
    '',
    t('cmd_utils'),
    t('cmd_clear'),
    t('cmd_date_cmd'),
    t('cmd_whoami'),
    '',
    '  ═════════════════════════════════',
    '',
    '  🥚 Easter eggs — try these:',
    '    sudo, apt-get install   → Linux commands',
    '    dnf update, npm start   → Fedora, Node, Yarn...',
    '    docker run, cargo build → Docker, Rust...',
    '    select -all, render     → Maya? Nah.',
    '    exit, reboot            → Want to leave? Heh.',
    '',
    '  ═════════════════════════════════'
  ];

  helpText.forEach(line => logToPanel(line));
  Quake.log(t('cmd_help_title'), 'qt-sys');
  helpText.slice(1).forEach(line => {
    if (line === '') Quake.log('');
    else Quake.log(line, 'qt-out');
  });
}

/** Abre un expediente */
function cmdOpen(target) {
  const exp = findExp(target);
  if (exp) {
    Window.open(exp);
    logToPanel('[OPEN] Opening: ' + exp.titulo + ' (' + exp.id + ')');
    Quake.log('[OPEN] Opening: ' + exp.titulo + ' (' + exp.id + ')', 'qt-gold');
  } else {
    const errMsg = '[ERR] File not found: "' + target + '". Type "ls" to see available files.';
    logToPanel(errMsg);
    Quake.log(errMsg, 'qt-err');
  }
}

/** Muestra fecha y hora */
function cmdDate() {
  const locale = t('lang_es') === 'ES' ? 'es-CL' : 'en-US';
  const dateStr = new Date().toLocaleString(locale);
  logToPanel('[DATE] ' + dateStr);
  Quake.log('[DATE] ' + dateStr, 'qt-sys');
}

/** Muestra info del usuario */
function cmdWhoami() {
  const msg = '[WHOAMI] investigator@panel — UX/UI Detective, clearance level Ω';
  logToPanel(msg);
  Quake.log(msg, 'qt-gold');
}

/** Resetea la altura del quake terminal */
function cmdReset() {
  Quake.resetHeight();
}

/** Busca comandos parciales en los jokes */
function tryPartialMatch(cmd) {
  for (const key of Object.keys(TERMINAL_JOKES)) {
    if (key.startsWith(cmd) || cmd.startsWith(key.substring(0, 3))) {
      const msg = '[SYS] Did you mean: "' + key + '"? → ' + TERMINAL_JOKES[key];
      logToPanel(msg);
      Quake.log(msg, 'qt-sys');
      return true;
    }
  }
  return false;
}

/** Elige un mensaje de error aleatorio */
function randomError(cmd) {
  const idx = Math.floor(Math.random() * ERROR_MESSAGES.length);
  return ERROR_MESSAGES[idx].replace('%s', cmd);
}

/** Maneja un comando completo (sin "open") */
function handleCommand(cmd) {
  // Comandos mapeados
  if (cmd === 'help' || cmd === 'ayuda') { cmdHelp(); return; }
  if (cmd === 'ls' || cmd === 'dir') { cmdLs(); return; }
  if (cmd === 'about' || cmd === 'bio' || cmd === 'cv') { Bio.open(); return; }
  if (cmd === 'clear' || cmd === 'cls') { clearPanel(); logToPanel(t('msg_clear_ok')); Quake.log(t('msg_clear_ok'), 'qt-sys'); return; }
  if (cmd === 'contact' || cmd === 'email') { Contact.openFromCommand(); Quake.log(t('msg_mail_quake'), 'qt-sys'); logToPanel(t('msg_mail_open')); return; }
  if (cmd === 'date') { cmdDate(); return; }
  if (cmd === 'whoami') { cmdWhoami(); return; }
  if (cmd === 'reset') { cmdReset(); return; }

  // Jokes directos
  if (TERMINAL_JOKES[cmd]) {
    const joke = TERMINAL_JOKES[cmd];
    logToPanel(joke);
    joke.split('\n').forEach(line => {
      if (line.includes('[ALERT]')) Quake.log(line, 'qt-err');
      else if (line.includes('[SYS]') || line.includes('[GIT]') || line.includes('[NET]') || line.includes('[FS]')) Quake.log(line, 'qt-sys');
      else if (line.includes('[WHOAMI]')) Quake.log(line, 'qt-gold');
      else Quake.log(line, 'qt-out');
    });
    return;
  }

  // Parciales
  if (tryPartialMatch(cmd)) return;

  // Error genérico
  logToPanel(randomError(cmd));
  Quake.log(randomError(cmd), 'qt-err');
}

/**
 * Processa un input completo del usuario.
 * Si empieza con "open", delega a cmdOpen, sino a handleCommand.
 */
export function processCommand(raw) {
  const cmd = raw.toLowerCase();
  if (cmd.startsWith('open ')) {
    cmdOpen(cmd.substring(5).trim());
  } else {
    handleCommand(cmd);
  }
}
