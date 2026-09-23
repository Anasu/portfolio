/**
 * EXPEDIENTES — Datos estáticos del portafolio profesional.
 *
 * Para agregar un nuevo expediente, copia el bloque de plantilla al final
 * del objeto `EXP` y completa las propiedades. No hay que tocar ningún otro archivo.
 */

// ─── Tipado JSDoc para validación en IDE ────────────────────────────────

/** @typedef {{ lab: string; val: string; desc: string }} ImpactoKPI */
/** @typedef {{ tit: string; txt: string }} EstrategiaPaso */
/** @typedef {string} RutaImagen */

/**
 * @typedef {Object} Expediente
 * @property {string} id           — Identificador único (ej: 'exp001')
 * @property {string} titulo       — Nombre del proyecto
 * @property {string} cat          — Categoría con subcategoría separada por '·' (ej: 'Design System · Aeronáutica')
 * @property {string} ano          — Año del proyecto
 * @property {string} ico          — Emoji/icono representativo
 * @property {string} niv          — Nivel de clasificación
 * @property {string} det          — Descripción breve del proyecto
 * @property {string} tech         — Tecnologías usadas, separadas por coma
 * @property {string} [fch]        — Fecha opcional (formato MM/YYYY)
 * @property {'solved'|'abierto'} st — Estado: resuelto o abierto
 * @property {string[]} arc        — Lista de archivos del sistema (paths)
 * @property {RutaImagen[]} [imgs] — Screenshots/imágenes del proyecto, opcionales
 * @property {ImpactoKPI[]} [impacto] — KPIs de impacto, opcionales
 * @property {string} [desafio]    — Descripción del desafío, opcional
 * @property {EstrategiaPaso[]} [estrategia] — Pasos de estrategia, opcionales
 */

/**
 * Objeto de expedientes indexado por ID.
 * @type {Record<string, Expediente>}
 */
export const EXP = {

  // ═══════════════════════════════════════════════════════════
  // PLANTILLA: Copiar este bloque para agregar un nuevo expediente
  // Cambiar el nombre de la key (ej: exp005) y el campo id.
  // ═══════════════════════════════════════════════════════════
  /*
  expXXX: {
    id: 'expXXX',
    titulo: 'NOMBRE DEL PROYECTO',
    cat: 'Categoría · Subcategoría',
    ano: '2025',
    ico: '📦',
    niv: 'CONFIDENCIAL',
    det: 'Descripción breve del proyecto y su propósito.',
    tech: 'Tech1, Tech2, Tech3',
    fch: 'MM/YYYY',
    st: 'solved',
    arc: ['/ruta/archivo.pdf'],
    impacto: [
      { lab: 'KPI', val: '+50%', desc: 'Descripción del resultado' }
    ],
    desafio: 'Descripción del desafío que se enfrentó.',
    estrategia: [
      { tit: 'Fase 1', txt: 'Acción realizada en esta fase.' }
    ]
  },
  */

  // ────────────────────────────────────────────────────────────
  exp001: {
    id: 'exp001',
    titulo: 'E-MANTTO',
    cat: 'Design System · Aviation',
    ano: '2024',
    ico: '\u2708\uFE0F',
    niv: 'CONFIDENTIAL',
    det: 'Comprehensive design system for the aviation maintenance area. Centralization of components and optimization of high-density operational workflows.',
    tech: 'Figma | Design Tokens | AI (MCP) | UX Governance | Storybook',
    fch: '03/2024',
    st: 'solved',
    arc: ['/ds/tokens.json', '/ds/components-library.fig', '/ds/patterns-guidelines.pdf', '/ds/ai-mcp-prompts.json'],
    imgs: [
      'assets/emantto/screenshot-01.png',
      'assets/emantto/screenshot-02.png',
      'assets/emantto/screenshot-03.png',
      'assets/emantto/screenshot-04.png'
    ],
    impacto: [
      { lab: 'TTM', val: '7 → 1 month', desc: '+AI in phase 2' },
      { lab: 'Adoption', val: '+90%', desc: 'reuse in active cells' },
      { lab: 'CSAT', val: '>4.5 / 5', desc: 'product team satisfaction' },
      { lab: 'Scale', val: '~10 prod.', desc: 'unified ecosystem' }
    ],
    desafio: 'The maintenance area operated with ~10 fragmented digital products, each solving complex screens (filters, dashboards, forms) in isolation. This generated serious workflow and UI inconsistencies, increasing the risk of human error in critical air safety operations.',
    estrategia: [
      { tit: 'Design for Density', txt: 'I translated the visual identity into extremely dense industrial contexts, safeguarding accessibility and consistency.' },
      { tit: 'Frictionless Standardization', txt: 'UI/UX pattern guides (advanced dashboards/filters) + templates with interchangeable components. Synthesis of existing solutions to minimize resistance to change.' },
      { tit: 'Efficiency with AI', txt: 'MCP model + AI harnesses to automate the design team\'s daily operational tasks.' }
    ]
  },

  exp002: {
    id: 'exp002',
    titulo: 'FLUJO',
    cat: 'Fintech · Financial Inclusion',
    ano: '2021',
    ico: '\u{1F4B1}',
    niv: 'CONFIDENTIAL',
    det: 'Architecture redesign, accessibility and native convergence for a mass-use financial inclusion app. Technological transition and unification of multi-platform design criteria to eliminate operational frictions.',
    tech: 'Sketch to Figma | iOS | Android | WCAG | Handoff',
    fch: '2021',
    st: 'solved',
    arc: ['/fintech/ios-design-system.fig', '/fintech/android-design-system.fig', '/fintech/flow-map-and-paths.pdf', '/fintech/wcag-compliance-specs.json'],
    imgs: [
      'assets/flujo/flujo-01.png',
      'assets/flujo/flujo-02.png',
      'assets/flujo/flujo-03.png',
      'assets/flujo/flujo-04.png'
    ],
    impacto: [
      { lab: 'Migration', val: '→ 1 year', desc: 'complete integral transition of the app' },
      { lab: 'Handoff', val: '→ 0 ambig.', desc: 'single source of truth design/dev/QA' },
      { lab: 'Accessibility', val: '→ WCAG', desc: 'universal contrast and touch optimization' },
      { lab: 'Convergence', val: '→ 2 OS', desc: 'elimination of iOS/Android inconsistencies' }
    ],
    desafio: 'The platform operated on a hybrid technology with a decentralized architecture, contradictory documentation and critical flows unrecorded. Additionally, there was a serious lack of consistency between Android and iOS (excessive bias toward Material Design) and key screens not adapted for accessibility.',
    estrategia: [
      { tit: 'Flow Archaeology', txt: 'I mapped and centrally documented screens and alternative paths (happy paths and unhappy paths) to understand previous business decisions before redesigning.' },
      { tit: 'Applied Accessibility', txt: 'I modified the interface to meet WCAG standards, optimizing color contrasts, enlarging touch areas to a minimum of 40px and adapting critical navigation to thumb reach on large mobile devices.' },
      { tit: 'Multi-platform Differentiation', txt: 'I created specific libraries for iOS (using San Francisco typography, native icons, centered titles and adapted rounded borders) synchronized with Android to guarantee a truly native experience on both operating systems.' },
      { tit: 'Critical Standardization', txt: 'I designed support components and normalized high-friction flow patterns (loading screens, receipts and transfer confirmations).' }
    ]
  },

  exp003: {
    id: 'exp003',
    titulo: 'PUENTE',
    cat: 'EdTech · Digital Inclusion',
    ano: '2024',
    ico: '\u{1F393}\uFE0F',
    niv: 'CONFIDENTIAL',
    det: 'Omnichannel school platform (Mobile App for parents + Web Dashboard for schools) designed to mitigate technology gaps, connectivity limits and cultural barriers in vulnerable settings.',
    tech: 'B2B/B2C | Inclusive Design | Material Design 2 | Product Strategy | Offline UX',
    fch: '05/2024',
    st: 'solved',
    arc: ['/edtech/parent-app-wireframes.fig', '/edtech/school-dashboard-desktop.fig', '/edtech/fallback-sms-flow.pdf', '/edtech/accessibility-quilicura-specs.json'],
    imgs: [
      'assets/puente/01 - Inicio.png',
      'assets/puente/03 - Educacion - Preguntas.png',
      'assets/puente/04 - Educacion - Preguntas – 2.png',
      'assets/puente/05 - Inicio Menú.png',
      'assets/puente/Myre.png'
    ],
    impacto: [
      { lab: 'Omnichannel', val: '→ 0% dep.', desc: 'SMS/Push contingency without mobile data' },
      { lab: 'Accessible', val: '→ Base', desc: 'optimized contrasts + enlarged touch zones' },
      { lab: 'B2B Efficiency', val: '→ 13"', desc: 'ultracompact web dashboard for laptops' },
      { lab: 'Adoption', val: '→ 0 curve', desc: 'leveraging daily app mental models' }
    ],
    desafio: 'Research in Quilicura schools revealed a severe communication gap between parents (local and migrant) and the school. Families faced barriers such as intermittent connectivity (no active mobile data), low-end older devices, low digital literacy and visual difficulties.',
    estrategia: [
      { tit: 'Alignment with Mental Models', txt: 'I mapped in the field the everyday apps used by families and leveraged those known UX patterns (using the Material Design 2 base) to eliminate resistance and facilitate autonomous learning.' },
      { tit: 'Extreme Inclusive Design', txt: 'I structured an ultra-clear visual hierarchy, increasing color contrasts and scaling button and input dimensions to counteract visual fatigue and low terminal resolution.' },
      { tit: 'SMS Fallback (Tech/Business)', txt: 'I negotiated with the technical and business team the automatic deployment of SMS alerts as a secondary communication channel to ensure message receipt when parents didn\'t have internet access for Push notifications.' },
      { tit: 'Efficient Administrative Dashboard', txt: 'I designed the school staff interface specifically optimized for Google Chrome on 13-inch laptop screens, implementing clean tables with immediate per-row actions to avoid overwhelming administrators with information.' }
    ]
  },

  exp004: {
    id: 'exp004',
    titulo: 'NEXUS',
    cat: 'Technical Direction · 3D Animation',
    ano: '2017',
    ico: '\u{1F4A1}',
    niv: 'PUBLIC (CNTV)',
    det: 'Technical direction, render pipeline optimization and systemic restructuring of 3D assets for a national animation series funded with public funds (CNTV).',
    tech: '3D Pipelines | Render Optimization | Technical Direction | Systemic Design | Budget Auditing',
    fch: '2017',
    st: 'solved',
    arc: ['/nexus/render-pipeline-specs.json', '/nexus/camera-rig-presets.ma', '/nexus/character-rigs-fk-ik.fbx', '/nexus/cntv-audit-report.pdf'],
    impacto: [
      { lab: 'Render', val: '→ 4 months', desc: 'render time cost reduction' },
      { lab: 'Layout', val: '<50%', desc: 'layout time reduction' },
      { lab: 'Audit', val: '→ 100%', desc: 'approval and zero CNTV observations' },
      { lab: 'Product', val: '→ Shift', desc: 'animation shift to software design' }
    ],
    desafio: 'The production of the first season of the 3D series operated under a highly inefficient workflow: backgrounds took several minutes to render for an average of 150 shots per episode. Lighting was configured ad-hoc per scene, generating inconsistencies, camera issues, risk of critical delays in state commitment deliveries and disproportionate technical resource expenditure.',
    estrategia: [
      { tit: 'Layout and Camera Optimization', txt: 'I designed a system of predetermined backgrounds ready for post-production. I implemented a rigged camera with preset angles exclusive for character-background interaction, standardizing a 60mm focal length for general shots.' },
      { tit: 'Lighting Modularization', txt: 'I replaced universal lighting with a character-dedicated system, importing preconfigured light sets according to camera position. In season 2, I radically simplified rendering through flat colors and ambient occlusion techniques (Pocoyó style), sacrificing secondary elements to safeguard visual consistency and delivery deadlines.' },
      { tit: 'Systemic Rig Depuration', txt: 'I rebuilt defective rigs of key characters to unlock their technical potential. I redesigned Filomena\'s spine to give it maximum movement range (allowing her to star in a complete chapter) and integrated FK/IK systems in Rocío\'s limbs to resolve complex interactions with the environment technology.' },
      { tit: 'Financial Traceability and Auditing', txt: 'I supervised resource management and input control within the team. I designed a detailed reporting pipeline by chapter, scene and frame to audit every render, ensuring absolute budget traceability before state requirements.' }
    ]
  }

};

/**
 * Array ordenado de expedientes (para iteración consistente).
 * Las keys están en orden de definición en el objeto literal.
 */
export const EXP_LIST = Object.values(EXP);
