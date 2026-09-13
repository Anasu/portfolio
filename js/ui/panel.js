/**
 * PANEL — Panel lateral con estadísticas y registro.
 * Sin inline styles — todo en CSS.
 */

import { EXP_LIST } from '../data/exp.js';

export function renderPanel() {
  const panel = document.getElementById('panel');
  const fragment = document.createDocumentFragment();

  // Sección SISTEMA
  const sysSection = document.createElement('div');
  sysSection.className = 'ps';

  const sysH3 = document.createElement('h3');
  sysH3.textContent = 'SISTEMA';
  sysH3.setAttribute('style', 'font-family:var(--mono);font-size:1rem;letter-spacing:3px;color:var(--accent);margin-bottom:6px');
  sysSection.appendChild(sysH3);

  const ulBar = document.createElement('div');
  ulBar.className = 'ul';
  sysSection.appendChild(ulBar);

  fragment.appendChild(sysSection);

  // Sección ESTADO
  const stateSection = document.createElement('div');
  stateSection.className = 'ps';

  const stateLabel = document.createElement('div');
  stateLabel.className = 'pl';
  stateLabel.textContent = 'ESTADO';
  stateSection.appendChild(stateLabel);

  const stateVal = document.createElement('div');
  stateVal.className = 'pv status-ok';
  stateVal.textContent = '\u25CF ONLINE';
  stateSection.appendChild(stateVal);

  fragment.appendChild(stateSection);

  // Sección EXPEDIENTES
  const expSection = document.createElement('div');
  expSection.className = 'ps';

  const expLabel = document.createElement('div');
  expLabel.className = 'pl';
  expLabel.textContent = 'EXPEDIENTES';
  expSection.appendChild(expLabel);

  const expVal = document.createElement('div');
  expVal.className = 'pv num';
  expVal.textContent = String(EXP_LIST.length);
  expSection.appendChild(expVal);

  fragment.appendChild(expSection);

  // Sección ESTADÍSTICA
  const statSection = document.createElement('div');
  statSection.className = 'ps';

  const statLabel = document.createElement('div');
  statLabel.className = 'pl';
  statLabel.textContent = 'ESTADÍSTICA';
  statSection.appendChild(statLabel);

  const statBox = document.createElement('div');
  statBox.setAttribute('style', 'margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:1rem');

  const solvedCount = EXP_LIST.filter(x => x.st === 'solved').length;
  const classifiedCount = Math.floor(EXP_LIST.length / 2);

  statBox.appendChild(statRow('RESUELTOS', String(solvedCount), '#fde68a'));
  statBox.appendChild(statRow('CLASIFICADOS', String(classifiedCount), 'rgba(253,230,138,.7)'));

  const uptimeRow = statRow('UPTIME', '0s', '#fde68a');
  uptimeRow.lastChild.id = 'uptime';
  statBox.appendChild(uptimeRow);

  statSection.appendChild(statBox);
  fragment.appendChild(statSection);

  // Sección REGISTRO
  const logSection = document.createElement('div');
  logSection.className = 'ps';

  const logLabel = document.createElement('div');
  logLabel.className = 'pl';
  logLabel.textContent = 'REGISTRO';
  logSection.appendChild(logLabel);

  const plog = document.createElement('div');
  plog.className = 'plog';

  const logEntries = [
    '[SYS] boot_complete',
    '[NET] secure_host',
    '[AUTH] clearance=LEVEL-\u03A9',
    '[FS] /expedientes mounted',
    '[DB] pool ok',
    '[MON] ONLINE',
    '[USR] ' + new Date().toLocaleTimeString()
  ];

  logEntries.forEach(msg => {
    const line = document.createElement('div');
    line.textContent = msg;
    line.style.padding = '1px 0';
    plog.appendChild(line);
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

/** Crea una fila de estadística con label a la izq y valor a la der */
function statRow(label, value, valueColor) {
  const row = document.createElement('div');
  row.setAttribute('style', 'display:flex;justify-content:space-between');
  row.appendChild(document.createTextNode(label));

  const valSpan = document.createElement('span');
  if (valueColor) valSpan.style.color = valueColor;
  valSpan.textContent = value;
  row.appendChild(valSpan);
  return row;
}
