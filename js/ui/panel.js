/**
 * PANEL — Panel lateral con estadísticas, registro y selector de idioma.
 * Sin inline styles — todo en CSS.
 */

import { EXP_LIST } from '../data/exp.js';
import { t, setLang, getLang } from '../i18n.js';

let uptimeSecs = 0;

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

/** Crea el selector de idioma */
function createLangSelector() {
  const section = document.createElement('div');
  section.className = 'ps';
  section.id = 'lang-selector-section';

  const label = document.createElement('div');
  label.className = 'pl';
  label.textContent = t('lang_selector_label');
  section.appendChild(label);

  const btnGroup = document.createElement('div');
  btnGroup.setAttribute('style', 'display:flex;gap:6px;margin-top:8px');

  const esBtn = document.createElement('button');
  esBtn.className = 'lang-btn';
  esBtn.dataset.lang = 'es';
  esBtn.textContent = t('lang_es');
  esBtn.setAttribute('aria-label', 'Switch to Spanish');
  if (getLang() === 'es') esBtn.classList.add('active');
  esBtn.addEventListener('click', () => setLang('es'));

  const enBtn = document.createElement('button');
  enBtn.className = 'lang-btn';
  enBtn.dataset.lang = 'en';
  enBtn.textContent = t('lang_en');
  enBtn.setAttribute('aria-label', 'Switch to English');
  if (getLang() === 'en') enBtn.classList.add('active');
  enBtn.addEventListener('click', () => setLang('en'));

  btnGroup.appendChild(esBtn);
  btnGroup.appendChild(enBtn);
  section.appendChild(btnGroup);

  return section;
}

/** Actualiza el estado activo del selector de idioma */
function updateLangButtons() {
  const esBtn = document.querySelector('.lang-btn[data-lang="es"]');
  const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
  const lang = getLang();
  if (esBtn) esBtn.classList.toggle('active', lang === 'es');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');
}

/** Renderiza el panel lateral */
export function renderPanel() {
  const panel = document.getElementById('panel');
  const fragment = document.createDocumentFragment();

  // Sección SISTEMA
  const sysSection = document.createElement('div');
  sysSection.className = 'ps';

  const sysH3 = document.createElement('h3');
  sysH3.textContent = t('panel_sys');
  sysH3.setAttribute('style', 'font-family:var(--mono);font-size:1rem;letter-spacing:3px;color:var(--accent);margin-bottom:6px');
  sysSection.appendChild(sysH3);

  const ulBar = document.createElement('div');
  ulBar.className = 'ul';
  sysSection.appendChild(ulBar);

  fragment.appendChild(sysSection);

  // Sección IDIOMA (selector)
  const langSection = createLangSelector();
  fragment.appendChild(langSection);

  // Sección ESTADO
  const stateSection = document.createElement('div');
  stateSection.className = 'ps';

  const stateLabel = document.createElement('div');
  stateLabel.className = 'pl';
  stateLabel.textContent = t('panel_status');
  stateSection.appendChild(stateLabel);

  const stateVal = document.createElement('div');
  stateVal.className = 'pv status-ok';
  stateVal.textContent = t('panel_online');
  stateSection.appendChild(stateVal);

  fragment.appendChild(stateSection);

  // Sección EXPEDIENTES
  const expSection = document.createElement('div');
  expSection.className = 'ps';

  const expLabel = document.createElement('div');
  expLabel.className = 'pl';
  expLabel.textContent = t('panel_files');
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
  statLabel.textContent = t('panel_stats');
  statSection.appendChild(statLabel);

  const statBox = document.createElement('div');
  statBox.setAttribute('style', 'margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:1rem');

  const solvedCount = EXP_LIST.filter(x => x.st === 'solved').length;
  const classifiedCount = Math.floor(EXP_LIST.length / 2);

  statBox.appendChild(statRow(t('panel_solved'), String(solvedCount), '#fde68a'));
  statBox.appendChild(statRow(t('panel_classified'), String(classifiedCount), 'rgba(253,230,138,.7)'));

  const uptimeRow = statRow(t('panel_uptime'), '0s', '#fde68a');
  uptimeRow.lastChild.id = 'uptime';
  statBox.appendChild(uptimeRow);

  statSection.appendChild(statBox);
  fragment.appendChild(statSection);

  // Sección REGISTRO
  const logSection = document.createElement('div');
  logSection.className = 'ps';

  const logLabel = document.createElement('div');
  logLabel.className = 'pl';
  logLabel.textContent = t('panel_log');
  logSection.appendChild(logLabel);

  const plog = document.createElement('div');
  plog.className = 'plog';

  const logEntries = [
    t('log_boot'),
    t('log_net'),
    t('log_auth'),
    t('log_fs'),
    t('log_db'),
    t('log_mon'),
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
  setInterval(() => {
    uptimeSecs++;
    const elUptime = document.getElementById('uptime');
    if (elUptime) {
      const m = Math.floor(uptimeSecs / 60);
      const s = uptimeSecs % 60;
      elUptime.textContent = m + 'm' + ((s < 10) ? '0' : '') + s;
    }
  }, 1000);
}

// ── Escuchar cambios de idioma para actualizar UI en tiempo real ──
window.addEventListener('i18n:changed', () => {
  updateLangButtons();
});
