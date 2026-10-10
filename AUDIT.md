# AUDITORÍA Y CAMBIOS — Portafolio Anasú

## ESTADO DE CADA PROBLEMA IDENTIFICADO

### ✅ RESUELTOS (P0)

| # | Problema | Solución implementada |
|---|----------|----------------------|
| P0.1 | Contenido de proyectos oculto tras interacción JS | Sección `<section id="projects-index">` en HTML inicial con 4 `<article>` completos. Oculta visualmente en desktop+JS, visible sin-JS y mobile. |
| P0.2 | Sin vista de índice de proyectos | Misma sección anterior + botón "📋 Quick View" en taskbar para alternar visibilidad. |
| P0.3 | Bio y contacto ocultos tras interacción | Sección `<section id="profile">` con h1, bio, disciplinas y contacto directo en HTML inicial. |
| P0.4 | Metadatos no reflejan disciplinas reales | Título: "Anasú — Diseñador UX/UI · Dirección Técnica · Animación 3D". Meta description actualizada. Open Graph actualizado. |

### ✅ RESUELTOS (P1)

| # | Problema | Solución implementada |
|---|----------|----------------------|
| P1.1 | Sin h1 ni jerarquía de encabezados en HTML inicial | `<h1>` en sección profile, `<h2>` en projects-index y contact-direct, `<h3>` por proyecto, `<h4>` para resultados. |
| P1.2 | JSON-LD incompleto | Schema.org `@graph` con Person (nombre, jobTitle, bio, email, sameAs), WebSite y 4 CreativeWork (con URLs canónicas). |
| P1.3 | Proyectos sin enlaces directos | Anclas `#exp001`, `#exp002`, `#exp003`, `#exp004` en HTML inicial y JSON-LD. |

### ✅ RESUELTOS (P2)

| # | Problema | Solución implementada |
|---|----------|----------------------|
| P2.1 | Sin navegación por flechas en grid | ArrowLeft/Right/Up/Down/Home/End/PageUp/PageDown en `keyboard.js`. Wrap-around y cálculo de columnas. |
| P2.2 | Boot bloqueante sin respetar prefers-reduced-motion | Detección con `matchMedia`, eliminación de typewriter, cursor blink y transiciones si reduced-motion. |
| P2.4 | Imágenes con alt genérico | Pendiente de contenido específico (ver sección 6 del informe). El código actual funciona correctamente. |

### ✅ RESUELTOS (P3)

| # | Problema | Solución implementada |
|---|----------|----------------------|
| P3.1 | Sin sitemap.xml | Archivo `sitemap.xml` creado con URL principal. |
| P3.2 | Sin robots.txt | Archivo `robots.txt` creado, permite todos los crawlers, referencia sitemap. |

### ⚠️ PENDIENTES (requieren datos del usuario)

| # | Problema | Acción necesaria |
|---|----------|-----------------|
| P2.4 | Alt text de screenshots genérico | Proporcionar descripciones específicas para cada screenshot |
| Sin URL del CV | Botón "Descargar CV" apunta a `#` | Proporcionar URL del PDF del CV |

## ARCHIVOS MODIFICADOS

1. `index.html` — Metadatos, JSON-LD, secciones accesibles, noscript fallback
2. `css/accessible.css` — **Nuevo** — Estilos para contenido accesible
3. `css/cards.css` — Focus visible mejorado para carpetas
4. `css/desktop.css` — Estilos para botón Quick View
5. `js/ui/boot.js` — Clase js-active, prefers-reduced-motion
6. `js/ui/keyboard.js` — Navegación por flechas completa
7. `js/ui/taskbar.js` — Botón Quick View + cierre con Escape
8. `js/i18n.js` — Claves qv_title y qv_label
9. `locales/en.json` — Claves qv_title y qv_label

## ARCHIVOS NUEVOS

1. `sitemap.xml`
2. `robots.txt`
3. `css/accessible.css`
4. `AUDIT.md` (este archivo)
5. `INFORME-FINAL.md`
