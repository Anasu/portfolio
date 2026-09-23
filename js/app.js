/* APP — Punto de entrada principal del Panel del Investigador */
import { Boot } from './ui/boot.js';
import { initKeyboard } from './ui/keyboard.js';
import { renderPanel } from './ui/panel.js';
import { renderTaskbar } from './ui/taskbar.js';
import { renderConsole } from './ui/console.js';
import { initI18n, setLang, getLang } from './i18n.js';

/** Actualiza metadatos HTML según el idioma activo */
function updateMetaTags(lang) {
  const html = document.getElementById('html-lang');
  if (html) html.lang = lang === 'es' ? 'es' : 'en';

  // Title del documento
  document.title = lang === 'es'
    ? "Panel del Investigador — Portafolio"
    : "Investigator's Panel — Portfolio";

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'es'
      ? 'Portafolio profesional de diseño UX/UI, dirección técnica y estrategia de producto. Expedientes de E-MANTTO, FLUJO, PUENTE y NEXUS.'
      : 'Professional UX/UI design, technical direction and product strategy portfolio. Case files from E-MANTTO, FLUJO, PUENTE and NEXUS.';
  }

  // OG title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.content = lang === 'es'
      ? 'Panel del Investigador — Portafolio'
      : "Investigator's Panel — Portfolio";
  }

  // OG description
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.content = lang === 'es'
      ? 'Portafolio profesional de diseño UX/UI, dirección técnica y estrategia de producto.'
      : 'Professional UX/UI design, technical direction and product strategy portfolio.';
  }

  // OG locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.content = lang === 'es' ? 'es_CL' : 'en_US';
  }
}

async function main() {
  // 1. Inicializar i18n antes que cualquier UI
  await initI18n();
  updateMetaTags(getLang());

  renderTaskbar();
  renderPanel();
  renderConsole();
  initKeyboard();
  new Boot().go();
}

document.addEventListener('DOMContentLoaded', main);

// Escuchar cambios de idioma para actualizar metadatos y UI
window.addEventListener('i18n:changed', (e) => {
  updateMetaTags(e.detail.lang);
});
