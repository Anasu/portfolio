/* PANEL — Panel lateral con estadísticas y registro */
import { EXP } from '../data/exp.js';

/** @returns {HTMLElement} */
function makeEl(tag, text, attrs) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/** @returns {HTMLElement} */
function labelDiv(text) {
  const d = makeEl('div', '', { class: 'pl' });
  d.textContent = text;
  return d;
}

export function renderPanel() {
  const panel = document.getElementById('panel');
  const fragment = document.createDocumentFragment();

  // Sección SISTEMA
  const sysSection = makeEl('div', '', { class: 'ps' });
  sysSection.appendChild(makeEl('h3', 'SISTEMA', {
    style: 'font-family:var(--serif);font-size:1rem;letter-spacing:3px;color:var(--green);margin-bottom:6px'
  }));
  sysSection.appendChild(makeEl('div', '', { class: 'ul', style: 'width:40px;height:2px;background:linear-gradient(90deg,var(--green),transparent);margin-bottom:8px' }));
  fragment.appendChild(sysSection);

  // Sección ESTADO
  const stateSection = makeEl('div', '', { class: 'ps' });
  stateSection.appendChild(labelDiv('ESTADO'));
  stateSection.appendChild(makeEl('div', '\u25CF ONLINE', { class: 'pv green' }));
  fragment.appendChild(stateSection);

  // Sección EXPEDIENTES
  const expSection = makeEl('div', '', { class: 'ps' });
  expSection.appendChild(labelDiv('EXPEDIENTES'));
  expSection.appendChild(makeEl('div', String(EXP.length), {
    class: 'pv num',
    style: 'font-size:3.5rem;text-align:center;font-family:var(--serif);font-weight:700;color:var(--green);text-shadow:0 0 15px rgba(112,54,231,.25)'
  }));
  fragment.appendChild(expSection);

  // Sección ESTADÍSTICA
  const statSection = makeEl('div', '', { class: 'ps' });
  statSection.appendChild(labelDiv('ESTADÍSTICA'));

  const statBox = makeEl('div', '', { style: 'margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:1rem' });
  const solvedCount = EXP.filter(x => x.st === 'solved').length;
  const classifiedCount = Math.floor(EXP.length / 2);

  statBox.appendChild(statRow('RESUELTOS', String(solvedCount), 'var(--green)'));
  statBox.appendChild(statRow('CLASIFICADOS', String(classifiedCount), 'var(--green)'));

  const uptimeRow = statRow('UPTIME', '0s', 'var(--green)');
  uptimeRow.lastChild.id = 'uptime';
  statBox.appendChild(uptimeRow);

  statSection.appendChild(statBox);
  fragment.appendChild(statSection);

  // Sección REGISTRO
  const logSection = makeEl('div', '', { class: 'ps' });
  logSection.appendChild(labelDiv('REGISTRO'));

  const plog = makeEl('div', '', { class: 'plog' });
  const logEntries = [
    '[SYS] boot_complete',
    '[NET] secure_host',
    '[AUTH] clearance=LEVEL-\u03A9',
    '[FS] /expedientes mounted',
    '[DB] pool ok',
    '[MON] ONLINE',
    '[USR] ' + new Date().toLocaleTimeString() + ' session'
  ];
  logEntries.forEach(msg => {
    plog.appendChild(makeEl('div', msg, { style: 'padding:1px 0' }));
  });
  logSection.appendChild(plog);
  fragment.appendChild(logSection);

  panel.appendChild(fragment);

  // Uptime counter
  let secs = 0;
  setInterval(() => {
    secs++;
    const elUptime = document.getElementById('uptime');
    if (elUptime) {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      elUptime.textContent = m + 'm' + ((s < 10) ? '0' : '') + s;
    }
  }, 1000);
}
