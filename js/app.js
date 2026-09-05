/* EL PANEL DEL INVESTIGADOR */
const EXP = [
  {id:'exp001',titulo:'E-MANTTO',cat:'Design System · Aeronáutica',ano:'2024',ico:'\u{2708}\u{FE0F}',niv:'CONFIDENCIAL',det:'Design system integral para el área de mantenimiento aeronáutico. Centralización de componentes y optimización de flujos de alta densidad operativa.',tech:'Figma, Design Tokens, AI (MCP), Gobernanza UX, Storybook',fch:'03/2024',st:'solved',arc:['/ds/tokens.json','/ds/components-library.fig','/ds/patterns-guidelines.pdf','/ds/ai-mcp-prompts.json'],impacto:[{lab:'TTM',val:'7→1 mes',desc:'+IA en fase 2'},{lab:'Adopción',val:'+90%',desc:'reutilización en células activas'},{lab:'CSAT',val:'>4.5/5',desc:'satisfacción equipo producto'},{lab:'Escala',val:'~10 prod.',desc:'ecosistema unificado'}],desafio:'El área de mantenimiento operaba con ~10 productos digitales fragmentados, cada uno resolviendo pantallas complejas (filtros, dashboards, formularios) de forma aislada. Esto generaba graves inconsistencias de flujo y UI, elevando el riesgo de error humano en operaciones críticas de seguridad aérea.',estrategia:[{tit:'Diseño para la Densidad',txt:'Traduje la identidad visual a contextos industriales sumamente densos, resguardando accesibilidad y consistencia.'},{tit:'Estandarización Sin Fricción',txt:'Guías de patrones UI/UX (dashboards/filtros avanzados) + plantillas con componentes intercambiables. Síntesis de soluciones existentes para minimizar resistencia al cambio.'},{tit:'Eficiencia con IA',txt:'Modelo MCP + arneses de IA para automatizar tareas operativas diarias del equipo de diseño.'}]},
  {id:'exp002',titulo:'FLUJO',cat:'Fintech · Inclusión Financiera',ano:'2021',ico:'\u{1F4B1}',niv:'CONFIDENCIAL',det:'Rediseño de arquitectura, accesibilidad y convergencia nativa para una app de inclusión financiera de uso masivo. Transición tecnológica y unificación de criterios de diseño multiplataforma para eliminar fricciones operativas.',tech:'Sketch to Figma | iOS | Android | WCAG | Handoff',fch:'2021',st:'solved',arc:['/fintech/ios-design-system.fig','/fintech/android-design-system.fig','/fintech/flow-map-and-paths.pdf','/fintech/wcag-compliance-specs.json'],impacto:[{lab:'Migración',val:'1 año',desc:'transición integral completa de la app'},{lab:'Handoff',val:'0 ambig.',desc:'fuente única de verdad diseño/dev/QA'},{lab:'Accesibilidad',val:'WCAG',desc:'optimización universal de contraste y tacto'},{lab:'Convergencia',val:'2 SO',desc:'eliminación de inconsistencias iOS/Android'}],desafio:'La plataforma operaba sobre una tecnología híbrida con una arquitectura descentralizada, documentación contradictoria y flujos críticos sin registrar. Adicionalmente, existía una grave falta de consistencia entre Android e iOS (sesgo excesivo hacia Material Design) y pantallas clave sin adaptar para accesibilidad.',estrategia:[{tit:'Arqueología de Flujos',txt:'Mapeé y documenté centralizadamente las pantallas y caminos alternativos (happy paths y unhappy paths) para comprender las decisiones de negocio previas antes de rediseñar.'},{tit:'Accesibilidad Aplicada',txt:'Modifiqué la interfaz para cumplir estándares WCAG, optimizando contrastes de color, ampliando áreas táctiles a un mínimo de 40px y adaptando la navegación crítica al alcance del pulgar en dispositivos móviles grandes.'},{tit:'Diferenciación Multiplataforma',txt:'Creé librerías específicas para iOS (utilizando tipografía San Francisco, iconos nativos, títulos centrados y bordes redondeados adaptados) de forma sincronizada con Android para garantizar una experiencia nativa real en ambos sistemas operativos.'},{tit:'Estandarización Crítica',txt:'Diseñé componentes de apoyo y normalicé patrones de flujo de alta fricción (pantallas de carga, comprobantes y recibos de transferencia).'}]},
  {id:'exp003',titulo:'PUENTE',cat:'EdTech · Inclusión Digital',ano:'2024',ico:'\u{1F393}\u{FE0F}',niv:'CONFIDENCIAL',det:'Plataforma escolar omnicanal (App Móvil para apoderados + Dashboard Web para colegios) diseñada para mitigar brechas tecnológicas, límites de conectividad y barreras culturales en entornos vulnerables.',tech:'B2B/B2C | Inclusive Design | Material Design 2 | Product Strategy | Offline UX',fch:'05/2024',st:'solved',arc:['/edtech/parent-app-wireframes.fig','/edtech/school-dashboard-desktop.fig','/edtech/fallback-sms-flow.pdf','/edtech/accessibility-quilicura-specs.json'],impacto:[{lab:'Omnicanalidad',val:'0% dep.',desc:'contingencia SMS/Push sin datos móviles'},{lab:'Accesible',val:'Base',desc:'contrastes optimizados + zonas táctiles aumentadas'},{lab:'Eficiencia B2B',val:'13"',desc:'dashboard web ultracoracto para portátiles'},{lab:'Adopción',val:'0 curva',desc:'apalancada en modelos mentales de apps diarias'}],desafio:'La investigación en escuelas de Quilicura reveló una severa brecha de comunicación entre apoderados (locales y migrantes) y el colegio. Las familias enfrentaban barreras como conectividad intermitente (sin datos móviles activos), dispositivos antiguos de gama baja, baja alfabetización digital y dificultades visuales.',estrategia:[{tit:'Alineación con Modelos Mentales',txt:'Mapeé en terreno las aplicaciones de uso cotidiano de las familias y aproveché esos patrones UX conocidos (utilizando la base de Material Design 2) para eliminar la resistencia y facilitar el aprendizaje autónomo.'},{tit:'Diseño Inclusivo Extremo',txt:'Estructuré una jerarquía visual ultra-clara, aumentando los contrastes de color y escalando las dimensiones de botones e inputs para contrarrestar fatiga visual y baja resolución de terminales.'},{tit:'SMS Fallback (Tecnología/Negocio)',txt:'Negocié con el equipo técnico y de negocio el despliegue automático de alertas SMS como canal secundario de comunicación para asegurar la recepción del mensaje cuando los apoderados no dispusieran de conexión a internet para notificaciones Push.'},{tit:'Dashboard Administrativo Eficiente',txt:'Diseñé la interfaz del personal escolar optimizándola específicamente para Google Chrome en pantallas portátiles de 13 pulgadas, implementando tablas limpias con acciones inmediatas por fila para no sobrecargar de información a los administrativos.'}]},
  {id:'exp004',titulo:'NEXUS',cat:'Dirección Técnica · Animación 3D',ano:'2017',ico:'\u{1F4A1}',niv:'PÚBLICO (CNTV)',det:'Dirección técnica, optimización de pipelines de renderizado y reestructuración sistémica de assets 3D para una serie de animación nacional financiada con fondos públicos (CNTV).',tech:'3D Pipelines | Render Optimization | Technical Direction | Systemic Design | Budget Auditing',fch:'2017',st:'solved',arc:['/nexus/render-pipeline-specs.json','/nexus/camera-rig-presets.ma','/nexus/character-rigs-fk-ik.fbx','/nexus/cntv-audit-report.pdf'],impacto:[{lab:'Render',val:'4 meses',desc:'reducción costos de tiempo de render'},{lab:'Layout',val:'<50%',desc:'reducción tiempo de layout'},{lab:'Auditoría',val:'100%',desc:'aprobación y cero observaciones CNTV'},{lab:'Producto',val:'Shift',desc:'traslado de animación a diseño software'}],desafio:'La producción de la primera temporada de la serie 3D operaba bajo un flujo altamente ineficiente: los fondos tomaban varios minutos en renderizarse para un promedio de 150 planos por episodio. La iluminación se configuraba de manera ad-hoc por escena, generando inconsistencias, problemas de cámara, riesgo de retrasos críticos en las entregas de compromisos estatales y un gasto de recursos técnicos desproporcionado.',estrategia:[{tit:'Optimización de Layouts y Cámara',txt:'Diseñé un sistema de fondos predeterminados listos para postproducción. Implementé una cámara riggeada con tiros preestablecidos exclusivos para la interacción de personajes con el fondo, estandarizando una focal de 60 mm para los planos generales.'},{tit:'Modularización de Iluminación',txt:'Reemplacé la iluminación universal por un sistema dedicado por personaje, importando sets lumínicos preconfigurados según la posición de la cámara. En la temporada 2, simplifiqué radicalmente la renderización mediante técnicas de colores planos y oclusión ambiental (estilo Pocoyó), sacrificando elementos secundarios para blindar la consistencia visual y los plazos de entrega.'},{tit:'Depuración Sistémica de Rigs',txt:'Reconstruí rigs defectuosos de personajes clave para desbloquear su potencial técnico. Rediseñé el tallo del personaje Filomena para otorgarle máxima amplitud de movimiento (permitiéndole protagonizar un capítulo completo) e integré sistemas FK/IK en las extremidades de Rocío para resolver las complejas interacciones con la tecnología del entorno.'},{tit:'Trazabilidad Financiera y Auditoría',txt:'Supervisé la administración de recursos y el control de insumos en el equipo. Diseñé un pipeline de reportes minuciosos por capítulo, escena y fotograma para auditar cada render, asegurando la trazabilidad absoluta del presupuesto ante las exigencias estatales.'}]}
];
let _zc = 100;

/* Helpers de DOM seguro (sin innerHTML) */
function el(tag, text, attrs) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/* BOOT */
class Boot {
  async go() {
    const L = document.getElementById('boot-text'),
      B = document.getElementById('boot-bar');
    const msgs = [
      '> BIOS v4.2... OK',
      '> RAM: 65536K... OK',
      '> CRYPT: AES-256',
      '> CLEARANCE: NIVEL-\u03A9',
      '> ARCHIVOS: 4 expedientes',
      '> UI: escritorio listo...'
    ];
    for (let i = 0; i < msgs.length; i++) {
      const line = document.createElement('div');
      L.appendChild(line);
      for (let j = 0; j < msgs[i].length; j++) {
        line.textContent = msgs[i].substring(0, j + 1);
        await this.wait(3 + Math.random() * 5);
      }
      if (B) B.style.width = ((i + 1) / msgs.length * 95) + '%';
      L.scrollTop = L.scrollHeight;
      await this.wait(30 + Math.random() * 40);
    }
    // "SISTEMA LISTO" con cursor parpadeante (solo 2 nodos, sin innerHTML)
    const doneLine = document.createElement('div');
    doneLine.textContent = '> SISTEMA LISTO';
    const cursor = el('span', '', { class: 'cur' });
    doneLine.appendChild(cursor);
    L.appendChild(doneLine);
    await this.wait(200);
    if (B) B.style.width = '100%';

    const bootEl = document.getElementById('boot-screen');
    bootEl.style.transition = 'opacity .3s';
    setTimeout(() => { bootEl.style.opacity = '0' }, 50);
    const self = this;
    const onTransEnd = (ev) => {
      if (ev.propertyName === 'opacity') {
        window.removeEventListener('transitionend', onTransEnd);
        bootEl.style.display = 'none';
        document.getElementById('desktop').classList.remove('hidden');
        self.renderFolders();
      }
    };
    window.addEventListener('transitionend', onTransEnd, false);
  }
  wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  renderFolders() {
    const grid = document.getElementById('grid');
    const frag = document.createDocumentFragment();
    EXP.forEach(e => {
      const cat = e.cat.split('·')[0].trim();
      const folder = el('div', '', { class: 'folder', 'data-id': e.id });
      folder.style.borderColor = 'var(--green-dim, #8a5cf0)';
      // icono
      folder.appendChild(el('span', e.ico, { class: 'ico' }));
      // label principal
      folder.appendChild(el('span', e.titulo, { class: 'lbl' }));
      // categoria
      folder.appendChild(el('span', cat, { class: 'cat' }));
      // label "ABIERTO" (oculto, se muestra con .sel)
      const lblAb = el('span', '\u25CB ABierto', { class: 'lbl-ab' });
      lblAb.style.display = 'none';
      folder.appendChild(lblAb);

      folder.addEventListener('click', ev => {
        ev.stopPropagation();
        document.querySelectorAll('.folder').forEach(x => x.classList.remove('sel'));
        folder.classList.add('sel');
        Window.open(e, folder);
      });
      frag.appendChild(folder);
    });
    grid.appendChild(frag);
  }
}

/* WINDOW */
class Window {
  static open(exp, folderEl) {
    let w = document.querySelector('.win[data-id="' + exp.id + '"]');
    if (w) { w.style.display = 'flex'; return; }

    // Construir ventana con DocumentFragment (0 innerHTML)
    const frag = document.createDocumentFragment();

    // --- Barra de título (wtb) ---
    const wtb = el('div', '', { class: 'wtb' });
    const wti = el('span', '', { class: 'wti' });
    wti.appendChild(el('span', '\u{1F4DC}'));
    wti.appendChild(document.createTextNode(exp.titulo));
    wtb.appendChild(wti);
    const wb = el('div', '', { class: 'wb' });
    const closeBtn = el('button', '\u00D7', { class: 'cl' });
    wb.appendChild(closeBtn);
    wtb.appendChild(wb);
    frag.appendChild(wtb);

    // --- Contenido ---
    const wct = el('div', '', { class: 'wct' });

    // título H2
    wct.appendChild(el('h2', exp.titulo, { style: 'font-family:var(--serif);color:var(--gold);font-size:2rem;margin-bottom:8px;text-shadow:0 0 10px rgba(201,168,76,.2)' }));

    // meta line (CATEGORÍA / AÑO / NIVEL / TAG + tech tags)
    const meta = el('div', '', { class: 'meta' });
    const tagClass = exp.st === 'solved' ? 'ftag ok' : 'ftag op';
    const tagLabel = exp.st === 'solved' ? 'RESUELTOS' : 'ABIERTO';

    // Helper para crear span de meta
    function metaLabel(label, value) {
      const part = el('span', '', { style: 'margin-right:12px' });
      part.appendChild(document.createTextNode(label + ': '));
      part.appendChild(document.createTextNode(value));
      return part;
    }
    meta.appendChild(metaLabel('CATEGORÍA', exp.cat));
    meta.appendChild(metaLabel('AÑO', exp.ano));
    meta.appendChild(metaLabel('NIVEL', exp.niv));

    const statusTag = el('span', tagLabel, { class: tagClass });
    meta.appendChild(statusTag);

    // tech tags
    exp.tech.split(',').forEach(t => {
      const span = el('span', t.trim(), { class: 'ftag' });
      meta.appendChild(span);
    });
    wct.appendChild(meta);

    // brief
    wct.appendChild(el('p', exp.det, { class: 'brief' }));

    // --- Sección Impacto ---
    if (exp.impacto && exp.impacto.length) {
      wct.appendChild(el('h4', 'RESUMEN DE IMPACTO', { style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase' }));
      const impactGrid = el('div', '', { class: 'impact-grid' });
      exp.impacto.forEach(k => {
        const item = el('div', '', { class: 'kpi-item' });
        item.appendChild(el('div', k.val, { class: 'kpi-val' }));
        item.appendChild(el('div', k.lab, { class: 'kpi-lab' }));
        item.appendChild(el('div', k.desc, { class: 'kpi-desc' }));
        impactGrid.appendChild(item);
      });
      wct.appendChild(impactGrid);
    }

    // --- Sección Desafío ---
    if (exp.desafio) {
      wct.appendChild(el('h4', 'EL DESAFÍO', { style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase' }));
      wct.appendChild(el('p', exp.desafio, { class: 'section-text' }));
    }

    // --- Sección Estrategia ---
    if (exp.estrategia && exp.estrategia.length) {
      wct.appendChild(el('h4', 'ESTRATEGIA Y ACCIÓN', { style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase' }));
      exp.estrategia.forEach(s => {
        const item = el('div', '', { class: 'strategy-item' });
        item.appendChild(el('div', s.tit, { class: 'strategy-title' }));
        item.appendChild(el('div', s.txt, { class: 'strategy-text' }));
        wct.appendChild(item);
      });
    }

    // --- Archivos del sistema ---
    wct.appendChild(el('h4', 'ARCHIVOS DEL SISTEMA', { style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase' }));
    const filesDiv = el('div', '', { class: 'files' });
    exp.arc.forEach(f => {
      const row = el('div', '', { class: 'frow' });
      row.appendChild(document.createTextNode('\u{1F4C4} ' + f));
      filesDiv.appendChild(row);
    });
    wct.appendChild(filesDiv);

    // --- Entregables (imgs dummy) ---
    wct.appendChild(el('h4', 'ENTREGABLES', { style: 'font-family:var(--serif);color:var(--gold);font-size:1rem;letter-spacing:2px;margin:20px 0 8px;text-transform:uppercase' }));
    const imgRow = el('div', '', { class: 'img-row' });
    for (let i = 0; i < 4; i++) {
      imgRow.appendChild(el('div', 'IMG_' + (i + 1), { class: 'img-ph' }));
    }
    wct.appendChild(imgRow);

    frag.appendChild(wct);

    // --- Crear ventana ---
    w = document.createElement('div');
    w.className = 'win active';
    w.style.zIndex = ++_zc;
    w.dataset.id = exp.id;

    const winLeft = Math.max(40, window.innerWidth * 0.1);
    let winTop = 40;
    if (folderEl) {
      const r = folderEl.getBoundingClientRect();
      winTop = Math.max(40, r.bottom + 24);
    }
    w.style.left = winLeft + 'px';
    w.style.top = winTop + 'px';

    // Insertar DOM
    document.getElementById('windows-container').appendChild(w);
    // Mover hijos del fragment al window
    while (frag.firstChild) w.appendChild(frag.firstChild);

    // --- Drag con cleanup al cerrar ---
    let dragging = false, dragX, dragY;
    let dragHandlers = null; // referencia para cleanup

    wtb.addEventListener('mousedown', e => {
      dragging = true;
      dragX = e.clientX - w.offsetLeft;
      dragY = e.clientY - w.offsetTop;
      wtb.classList.add('dg');
      w.style.zIndex = ++_zc;
    });

    dragHandlers = {
      mousemove: e => { if (dragging) { w.style.left = (e.clientX - dragX) + 'px'; w.style.top = (e.clientY - dragY) + 'px'; } },
      mouseup: () => { dragging = false; wtb.classList.remove('dg'); }
    };
    document.addEventListener('mousemove', dragHandlers.mousemove);
    document.addEventListener('mouseup', dragHandlers.mouseup);

    w.addEventListener('mousedown', () => { w.style.zIndex = ++_zc; });
    closeBtn.addEventListener('click', () => {
      // Limpiar listeners para evitar leaks
      if (dragHandlers) {
        document.removeEventListener('mousemove', dragHandlers.mousemove);
        document.removeEventListener('mouseup', dragHandlers.mouseup);
      }
      w.remove();
    });
  }
}

/* PANEL */
function renderPanel() {
  const panel = document.getElementById('panel');
  const frag = document.createDocumentFragment();

  // Sección SISTEMA
  const psSys = el('div', '', { class: 'ps' });
  psSys.appendChild(el('h3', 'SISTEMA', { style: 'font-family:var(--serif);font-size:1rem;letter-spacing:3px;color:var(--green);margin-bottom:6px' }));
  psSys.appendChild(el('div', '', { class: 'ul', style: 'width:40px;height:2px;background:linear-gradient(90deg,var(--green),transparent);margin-bottom:8px' }));
  frag.appendChild(psSys);

  // Sección ESTADO
  const psState = el('div', '', { class: 'ps' });
  const estadoLabel = el('div', '', { class: 'pl', style: 'font-size:1rem;color:var(--dim);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px' });
  estadoLabel.textContent = 'ESTADO';
  psState.appendChild(estadoLabel);
  psState.appendChild(el('div', '\u25CF ONLINE', { class: 'pv green' }));
  frag.appendChild(psState);

  // Sección EXPEDIENTES
  const psExp = el('div', '', { class: 'ps' });
  const expLabel = el('div', '', { class: 'pl', style: 'font-size:1rem;color:var(--dim);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px' });
  expLabel.textContent = 'EXPEDIENTES';
  psExp.appendChild(expLabel);
  psExp.appendChild(el('div', String(EXP.length), { class: 'pv num', style: 'font-size:3.5rem;text-align:center;font-family:var(--serif);font-weight:700;color:var(--green);text-shadow:0 0 15px rgba(112,54,231,.25)' }));
  frag.appendChild(psExp);

  // Sección ESTADÍSTICA
  const psStat = el('div', '', { class: 'ps' });
  const statLabel = el('div', '', { class: 'pl', style: 'font-size:1rem;color:var(--dim);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px' });
  statLabel.textContent = 'ESTADÍSTICA';
  psStat.appendChild(statLabel);
  const statBox = el('div', '', { style: 'margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:1rem' });
  const solvedCount = EXP.filter(x => x.st === 'solved').length;
  const classifiedCount = Math.floor(EXP.length / 2);
  const purple = 'var(--green)';
  const dimColor = 'var(--dim)';

  function statRow(label, value) {
    const row = el('div', '', { style: 'display:flex;justify-content:space-between' });
    row.appendChild(document.createTextNode(label));
    const valSpan = document.createElement('span');
    valSpan.style.color = purple;
    valSpan.textContent = value;
    row.appendChild(valSpan);
    return row;
  }
  statBox.appendChild(statRow('RESUELTOS', String(solvedCount)));
  statBox.appendChild(statRow('CLASIFICADOS', String(classifiedCount)));
  const uptimeRow = statRow('UPTIME', '0s');
  uptimeRow.lastChild.id = 'uptime';
  statBox.appendChild(uptimeRow);
  psStat.appendChild(statBox);
  frag.appendChild(psStat);

  // Sección REGISTRO
  const psLog = el('div', '', { class: 'ps' });
  const logLabel = el('div', '', { class: 'pl', style: 'font-size:1rem;color:var(--dim);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px' });
  logLabel.textContent = 'REGISTRO';
  psLog.appendChild(logLabel);
  const plog = el('div', '', { class: 'plog', style: 'font-size:1rem;color:#3a4a5a;line-height:1.6;min-height:120px' });
  const logs = [
    '[SYS] boot_complete',
    '[NET] secure_host',
    '[AUTH] clearance=LEVEL-\u03A9',
    '[FS] /expedientes mounted',
    '[DB] pool ok',
    '[MON] ONLINE',
    '[USR] ' + new Date().toLocaleTimeString() + ' session'
  ];
  logs.forEach(msg => {
    plog.appendChild(el('div', msg, { style: 'padding:1px 0' }));
  });
  psLog.appendChild(plog);
  frag.appendChild(psLog);

  panel.appendChild(frag);

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

/* TASKBAR */
function renderTaskbar() {
  const tb = document.getElementById('taskbar-top');
  const frag = document.createDocumentFragment();

  const brand = el('span', '\u2318 SISTEMA v2.7b', { class: 'tbar-brand', style: 'color:#fff;font-family:var(--serif);font-size:1rem;letter-spacing:3px' });
  const left = el('span', 'DETECTIVE // CLEARANCE: NIVEL-\u03A9', { class: 'tbar-left', style: 'display:flex;align-items:center;gap:12px;font-size:1rem;color:#ccc;letter-spacing:1px' });
  const clock = el('span', '', { id: 'clock', class: 'tbar-right', style: 'display:flex;align-items:center;gap:12px;font-size:1rem;color:#ccc;letter-spacing:1px' });

  function updateClock() {
    const n = new Date();
    const p = v => String(v).padStart(2, '0');
    clock.textContent = p(n.getHours()) + ':' + p(n.getMinutes()) + ':' + p(n.getSeconds()) + ' ' + n.toLocaleDateString('es-AR');
  }
  updateClock();
  setInterval(updateClock, 1000);

  frag.appendChild(brand);
  frag.appendChild(left);
  frag.appendChild(clock);
  tb.appendChild(frag);
}

/* CONSOLE */
function renderConsole() {
  const c = document.querySelector('.console-bar');
  const frag = document.createDocumentFragment();

  const prompt = el('span', 'investigador@panel:~$ ', { class: 'cp', style: 'color:var(--green-dark);margin-right:8px;font-size:1rem;white-space:nowrap' });
  const input = el('input', '', { id: 'cin', placeholder: '_ comando...', spellcheck: 'false', autocomplete: 'off' });

  frag.appendChild(prompt);
  frag.appendChild(input);
  c.appendChild(frag);

  const logToPanel = (msg) => {
    // Append log entry to the panel's plog div
    const plog = document.querySelector('.plog');
    if (plog) {
      const entry = el('div', msg, { style: 'padding:1px 0' });
      plog.appendChild(entry);
      plog.scrollTop = plog.scrollHeight;
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      if (!cmd) return;

      if (cmd === 'help') {
        logToPanel('[CMD] help → help | ls | open [id] | date | whoami');
      } else if (cmd === 'ls') {
        EXP.forEach(x => logToPanel('[LS] ' + x.ico + ' ' + x.titulo + ' [' + x.id + ']'));
      } else if (cmd.startsWith('open ')) {
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
    }
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  renderTaskbar();
  renderPanel();
  renderConsole();
  new Boot().go();
});
