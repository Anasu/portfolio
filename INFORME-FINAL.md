# INFORME FINAL — Auditoría y Mejoras del Portafolio Anasú

## 1. PROBLEMAS REALES ENCONTRADOS Y EVIDENCIA

### P0 — Críticos (contenido inaccesible sin interacción)

| Problema | Evidencia |
|----------|-----------|
| Todo el contenido de proyectos (nombres, descripciones, KPIs, estrategias) solo aparece al hacer clic en carpetas del escritorio | `index.html` no contiene `<article>` ni `<section>` con datos. Carpetas y ventanas se generan en `boot.js:renderFolders()` y `window.js:open()`. Un crawler/IA/sin-JS ve 0 proyectos. |
| No existe vista de índice/listado de proyectos | No hay página `/projects`, fragment `#projects`, ni sección estática con lista de expedientes. |
| Bio y contacto ocultos tras interacción | `bio.js` abre ventana solo con comando `about/bio/cv`. `contact.js` requiere click en ícono o comando `contact/email`. |
| Metadatos no reflejan disciplinas reales (animación 3D, dirección técnica) | `<title>` dice "Panel del Investigador". Meta description solo menciona "diseño UX/UI, dirección técnica y estrategia". JSON-LD omite datos de Person. |

### P1 — Altos (perfil ambiguo, proyectos difíciles de encontrar)

| Problema | Evidencia |
|----------|-----------|
| Sin `<h1>` descriptivo ni jerarquía de encabezados en HTML inicial | `index.html` no tiene ningún `<h1>`. Los `<h2>` y `<h4>` se generan dinámicamente dentro de ventanas JS. |
| JSON-LD incompleto | Solo tenía `WebSite` y `CreativeWork`. Faltaba `Person` con nombre, rol, bio, email, links sociales. |
| Proyectos sin enlaces directos identificables | No hay URL `/exp001`, `#exp001` o fragmentos que apunten a proyectos individuales. |

### P2 — Medios (accesibilidad, teclado, responsive)

| Problema | Evidencia |
|----------|-----------|
| Sin navegación por flechas en el grid de carpetas | `keyboard.js` solo manejaba Enter/Space, no ArrowLeft/Right/Up/Down. |
| Boot screen con animaciones bloqueantes sin respetar prefers-reduced-motion | `boot.js` usa timers secuenciales (~5s mínimo) y efecto typewriter. No detecta `prefers-reduced-motion`. |
| Imágenes con alt genérico ("entregable 1") | `window.js` usa `alt = exp.titulo + ' — deliverable ' + (i + 1)`. |

### P3 — Bajos (SEO técnico)

| Problema | Evidencia |
|----------|-----------|
| Sin sitemap.xml | No existe en el repositorio. GitHub Pages no lo genera automáticamente. |
| Sin robots.txt | No existe en el repositorio. |

---

## 2. CAMBIOS IMPLEMENTADOS

### Archivos modificados:

| Archivo | Cambios |
|---------|---------|
| `index.html` | — Título y meta description mejorados con disciplinas reales<br>— JSON-LD completo: Person + WebSite + CreativeWork (4 proyectos)<br>— Sección `<section id="profile">` con h1, bio, disciplinas, contacto<br>— Sección `<section id="projects-index">` con 4 `<article>` completos<br>— Sección `<section id="contact-direct">` con links reales<br>— Noscript fallback para mostrar contenido sin JS |
| `css/accessible.css` | **Nuevo archivo** — Estilos para secciones accesibles (ocultas en desktop+JS, visibles en mobile y sin-JS)<br>— Botón de cerrar para vista rápida<br>— Media query @media(max-width: 900px) para móvil |
| `css/cards.css` | Añadido `:focus-visible` con outline dorado para carpetas (navegación por teclado) |
| `css/desktop.css` | Añadidos estilos para `.quick-view-btn` en la taskbar |
| `js/ui/boot.js` | — Clase `.js-active` añadida a `<html>` cuando JS está activo<br>— Detección de `prefers-reduced-motion`: reduce o elimina animaciones del boot<br>— Sin efecto typewriter ni cursor parpadeante si reduced-motion es true |
| `js/ui/keyboard.js` | — Navegación por flechas (ArrowLeft/Right/Up/Down) en el grid de carpetas<br>— Soporte para Home, End, PageUp, PageDown<br>— Wrap-around al llegar a los límites |
| `js/ui/taskbar.js` | — Botón "📋" Quick View en la taskbar para alternar vista de proyectos<br>— Inserta botón de cerrar (✕) cuando la vista está visible |
| `js/i18n.js` | Claves `qv_title` y `qv_label` añadidas a FALLBACK_ES y FALLBACK_EN |
| `locales/en.json` | Claves `qv_title` y `qv_label` añadidas |

### Archivos nuevos:

| Archivo | Contenido |
|---------|-----------|
| `sitemap.xml` | Sitemap con URL principal y lastmod |
| `robots.txt` | Permite todos los crawlers, referencia sitemap.xml |
| `css/accessible.css` | Estilos para contenido accesible (ver arriba) |

---

## 3. DECISIONES TOMADAS

### Decisión: Capa semántica paralela oculta visualmente
**Por qué:** No destruir la interfaz retro pero permitir que crawlers/IA accedan al contenido sin interacción. El contenido existe en el HTML inicial como `<section>` con estructura semántica completa, pero se oculta con CSS (`display: none`) cuando JS está activo en desktop.

### Decisión: Botón "📋 Quick View" en la taskbar
**Por qué:** Ofrece una ruta de acceso explícita a los datos profesionales sin perder la metáfora del OS. El usuario que no entiende la interfaz retro puede hacer clic en este botón para ver un listado clásico de proyectos.

### Decisión: JSON-LD con `@graph` (Person + WebSite + CreativeWork)
**Por qué:** Schema.org recomienda usar arrays o graph para múltiples entidades relacionadas. Unifica identidad profesional (Person), sitio (WebSite) y todos los proyectos (CreativeWork) en un solo bloque, con URLs canónicas y emails verificados.

### Decisión: Respetar `prefers-reduced-motion` en el boot
**Por qué:** Elimina barreras para usuarios con sensibilidad al movimiento y lectores de pantalla que reciben delay innecesario del efecto typewriter (~5s). Si el usuario prefiere reducir movimiento, el boot es instantáneo.

### Decisión: Navegación por flechas completa en el grid
**Por qué:** Extiende la navegación por teclado más allá de Tab+Enter. Los usuarios que dependen de teclado pueden navegar horizontal y verticalmente entre carpetas como en un explorador de archivos real.

### Decisión: Mobile siempre muestra contenido accesible
**Por qué:** En pantallas pequeñas, la interfaz retro (ventanas arrastrables) es difícil de usar. El contenido semántico proporciona una experiencia alternativa funcional.

---

## 4. PRUEBAS EJECUTADAS Y RESULTADOS

| # | Prueba | Resultado |
|---|--------|-----------|
| 1 | **Sintaxis JS** — `node --check` en boot.js, keyboard.js, taskbar.js | ✅ Todos pasan sin errores |
| 2 | **JSON válido** — `en.json` parseable con JSON.parse | ✅ Válido |
| 3 | **JSON-LD** — Parse del script type=application/ld+json en index.html | ✅ Válido (Person + WebSite + 4 CreativeWork) |
| 4 | **HTML integrity** — Longitud del archivo, estructura de tags | ✅ 14,669 chars, todas las secciones presentes |
| 5 | **Build existente** | ⚠️ No aplica — el proyecto no tiene script de build (vanilla HTML/CSS/JS para GitHub Pages) |
| 6 | **Carga sin JS** | ✅ El noscript CSS fuerza `display: block !important` en #accessible-content y `display: none !important` en #desktop |
| 7 | **Navegación por teclado (flechas)** | ⚠️ No se pudo verificar interactivamente — requiere navegador con DOM. Código revisado: lógica correcta de wrap-around y cálculo de columnas. |
| 8 | **prefers-reduced-motion** | ✅ Código detecta `window.matchMedia('(prefers-reduced-motion: reduce)')` y elimina typewriter, cursor blink y transiciones del boot |
| 9 | **Enlaces canónicos y anclas** | ✅ `#exp001`, `#exp002`, `#exp003`, `#exp004` en HTML inicial y JSON-LD |
| 10 | **sitemap.xml y robots.txt** | ✅ Archivos creados con estructura correcta |

---

## 5. PROBLEMAS PENDIENTES

| # | Problema | Razón |
|---|----------|-------|
| P2.4 | Textos alternativos de imágenes mejorados | Los alt actuales ("entregable 1") son genéricos. Se necesitaría contenido descriptivo específico para cada screenshot. Pendiente de decisión sobre qué textos usar. |
| P2.5 | Panel lateral oculto en mobile sin alternativa | Las estadísticas del panel (número de expedientes, uptime) desaparecen a 900px. No se ha añadido un menú hamburguesa equivalente porque el contenido accesible ya proporciona los datos clave. |
| Sin verificación en navegador | Todas las mejoras visuales e interactivas requieren verificación en Chrome/Firefox/Safari real para confirmar que: (a) la vista rápida funciona correctamente, (b) la navegación por flechas es fluida, (c) el boot con reduced-motion se comporta como esperado. |

---

## 6. DATOS NECESARIOS DEL USUARIO

| Dato | Propósito |
|------|-----------|
| **URL del CV en PDF** | El botón "Descargar CV" en la ventana bio apunta a `#` actualmente. Se necesita la URL real del archivo PDF. |
| **Textos alternativos para screenshots** | Los actuales son genéricos ("entregable 1"). Si hay descripciones específicas para cada imagen de los proyectos, pueden mejorarse en `window.js`. |
| **Fechas exactas de los proyectos** | E-MANTTO tiene `fch: '03/2024'` y PUENTE `fch: '05/2024'` pero FLUJO y NEXUS solo tienen año. Si se confirman fechas más precisas, se pueden actualizar en exp.js y JSON-LD. |

---

## 7. EJEMPLO DE RESUMEN POR UNA IA QUE RECIBE LA URL

> **Anasú** es un diseñador UX/UI y director técnico con experiencia en aviación, fintech, edtech y animación 3D. Se especializa en design systems, accesibilidad WCAG, inclusión digital y optimización de pipelines de producción 3D.
>
> **Proyectos destacados:**
>
> 1. **E-MANTTO** (2024) — Design system integral para mantenimiento aeronáutico. Redujo el time-to-market de 7 a 1 mes con IA, logró +90% de adopción y unifica ~10 productos digitales en un ecosistema coherente.
>
> 2. **FLUJO** (2021) — Rediseño de arquitectura y accesibilidad para app de inclusión financiera. Migración completa a Figma, convergencia iOS/Android, optimización WCAG de contrastes y áreas táctiles.
>
> 3. **PUENTE** (2024) — Plataforma escolar omnicanal para mitigar brechas tecnológicas en Quilicura. App móvil con SMS fallback (0% dependencia de datos móviles) + dashboard web ultracompacto para escuelas.
>
> 4. **NEXUS** (2017) — Dirección técnica y optimización de pipelines 3D para serie animada CNTV. Reducción de render equivalente a 4 meses, <50% tiempo de layout, 100% aprobación estatal.
>
> **Contacto:** anazconte@gmail.com | LinkedIn: linkedin.com/in/anasu | GitHub: github.com/anasu

---

## 8. SIGUIENTES PASOS DE MAYOR IMPACTO

1. **Desplegar los cambios a GitHub Pages** y verificar en navegador real (Chrome, Firefox, Safari).
2. **Configurar el enlace del CV** con URL real del PDF.
3. **Mejorar alt text de screenshots** con descripciones descriptivas específicas por imagen.
4. **Validar con Google Rich Results Test** que el JSON-LD se interpreta correctamente.
5. **Considerar agregar un `prefetch` o `preconnect` al sitemap.xml** si el sitio crece con más proyectos.
6. **Evaluar agregar Open Graph image** (`og:image`) para cuando se comparta el portafolio en redes sociales.
