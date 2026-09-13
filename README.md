# 🖥️ System Portfolio | Console UI & Case Files 

> **Live Demo:** [anasu.github.io/portfolio](https://anasu.github.io/portfolio/) 
> **Repo (Forgejo):** [forge.sh.hl.delmal.cl/anasu/portafolio](https://forge.sh.hl.delmal.cl/anasu/portafolio)
> **Repo (GitHub):** [github.com/Anasu/portfolio](https://github.com/Anasu/portfolio)

> **Rol:** Senior Product / UX Designer & Technical Director 

---

## 🎯 ¿Por qué este portafolio está diseñado así? 

Este portafolio no es una plantilla corporativa ni una galería estática de pantallas. Fue diseñado desde cero aplicando **pensamiento de producto** para resolver dos necesidades clave: 

1. **Expresar mi mentalidad y estilo de trabajo:** Mi background integra el diseño de sistemas complejos (UX/UI, Design Systems) con la Dirección Técnica y Arte 3D. El concepto de **interfaz de comando / consola retro-futurista** refleja mi enfoque sistémico, metódico y orientado a la infraestructura digital. 

2. **Acceso ultrarrápido a la data relevante:** Entendiendo que los recruiters y hiring managers disponen de tiempo limitado (evaluación inicial en < 60 segundos), la arquitectura prioriza la **escaneabilidad**, mostrando métricas de impacto, etiquetas claras y archivos del sistema de forma inmediata. 

---

## 📐 Principios de Arquitectura & UX del Portafolio 

### Diseño en Capas (Layered UX)

- **Nivel 1 (Scanner):** Resumen de impacto, datos cuantitativos (+90% adopción, TTM 7→1 mes) y tags tecnológicos visibles de un vistazo.
- **Nivel 2 (Reader):** Desglose completo de desafíos, estrategia, trade-offs y decisiones de arquitectura para evaluaciones en profundidad.

### Coexistencia Multisectorial

Demuestra la convergencia entre la gestión de pipelines 3D y el diseño de software complejo (Fintech, EdTech, Aeronáutica).

### Jerarquía e Inmersión

Uso de tipografía monoespaciada (`Fira Code`), paleta temática en tono terminal/fósforo y modales de inspección interactivos.

---

## 📁 Expedientes Incluidos (Casos de Estudio) 

| Expediente | Sector | Impacto Clave |
|------------|--------|---------------|
| **`E-MANTTO`** \| Design System Aeronáutico | Aeronáutica · IA | Reducción de TTM de 7 a 1 mes (+IA/MCP). +90% adopción en células activas. |
| **`FLUJO`** \| App Fintech Masiva | Fintech · Inclusión | Migración completa a nativo (iOS/Android) y Figma. Estándares WCAG, handoff sin ambigüedad. |
| **`PUENTE`** \| Plataforma EdTech e Inclusión | EdTech · Resiliencia | Diseño resiliente con contingencia SMS (0% dependencia de datos móviles). |
| **`NEXUS`** \| Dirección Técnica & Pipeline 3D | Animación 3D · CNTV | Optimización de render equivalente a 4 meses de ahorro. 100% aprobación en auditoría. |

---

## 🛠️ Stack & Especificaciones Técnicas 

### Core
- **HTML5** + **CSS3 Variables** + **Vanilla JavaScript (ES Modules)** — sin frameworks pesados para garantizar velocidad de carga.
- **Fira Code** (monospace) — single font family para consistencia visual.

### Arquitectura del Código

```
css/                          # 8 archivos modulares por componente
├── variables.css             # :root tokens, resets, scrollbar retro
├── boot.css                  # Pantalla de arranque CRT
├── desktop.css               # Layout principal, taskbar, grid, panel
├── cards.css                 # Carpetas del grid (normal/hover/selected)
├── windows.css               # Ventanas, titlebar, drag, minimizado
├── email.css                 # Formulario de contacto completo
├── console.css               # Quake terminal, barra de comandos
└── responsive.css            # Todas las @media queries centralizadas

js/ui/                        # 13 módulos ES independientes
├── utils.js                  # Helpers DOM (makeEl)
├── drag.js                   # makeDraggable() reutilizable (mouse + touch)
├── quake.js                  # Toggle, resize y logging del quake terminal
├── commands.js               # Dispatcher de comandos → funciones separadas
├── bio.js                    # Ventana de biografía genérica
├── jokes.js                  # Datos puros de respuestas de terminal
├── console.js                # Render de input + conexión a dispatcher
├── contact.js                # Formulario email con envío Formspree
├── window.js                 # Creación y gestión de ventanas modales
├── boot.js                   # Secuencia de arranque CRT
├── panel.js                  # Panel lateral (stats, uptime, log)
├── taskbar.js                # Barra superior con reloj en tiempo real
└── keyboard.js               # Navegación por teclado (Enter/Escape)

js/data/                      # Datos estáticos centralizados
├── config.js                 # Configuración global (freeze)
└── exp.js                    # Expedientes + tipado JSDoc
```

### Interacción
- **Consola Quake** interactiva (`↑↓` resize, `^` toggle, comandos con easter eggs).
- **Ventanas arrastrables** con minimizar, apilar y restaurar posición.
- **Sistema de archivos** dinámico con breadcrumbs.

### Performance & Accesibilidad
- Scanlines y efectos CRT optimizados mediante CSS nativo sin impacto en render.
- Zero `!important` (excepto 3 casos legítimos: drag block, mobile toggle).
- Sin inline styles — toda la presentación declarada en CSS.
- Atributos ARIA, roles semánticos, navegación por teclado completa.

---

## 🖱️ Guía de Interacción 

### Escritorio
| Acción | Cómo |
|--------|------|
| Abrir expediente | Click o Enter en una carpeta |
| Cerrar ventana | Botón × (×) en titlebar |
| Minimizar | Botón ➖ en titlebar |
| Mover ventana | Arrastrar desde la barra de título |

### Consola (`Enter` para ejecutar)
| Comando | Descripción |
|---------|-------------|
| `help` / `ayuda` | Lista todos los comandos |
| `ls` / `dir` | Lista expedientes disponibles |
| `open [id]` | Abre expediente por ID (ej: `open exp001`) |
| `open [nombre]` | Abre por nombre (ej: `open e-mantto`) |
| `bio` / `about` / `cv` | Abre perfil profesional |
| `contact` / `email` | Abre terminal de correo |
| `clear` / `cls` | Limpia el registro lateral |
| `date` | Fecha y hora actual |
| `whoami` | Info del usuario |

### Easter Eggs 🥚
```
sudo            → Acceso denegado (obviamente)
apt-get install → No hay repositorios aquí
docker run      → 100% host performance
polySphere      → Nice try, this isn't Maya
exit            → No puedes salir. Es un bucle infinito de excelencia. 🔄
```

---

## 🚀 Desarrollo Local 

### Opción 1 — Node.js (recomendado)
```bash
node server.js          # → http://localhost:3000
```

### Opción 2 — Python
```bash
python3 -m http.server 8080   # → http://localhost:8080
```

### Opción 3 — VS Code Live Server
Abre `index.html` con "Live Server" desde el panel de extensiones.

---

## 📊 Métricas del Proyecto 

| Metrica | Valor |
|---------|-------|
| Archivos CSS | 8 modulares (~25 KB total) |
| Módulos JS | 13 ES Modules (~65 KB total) |
| Líneas de código | ~1,400 (sin contar datos) |
| `!important` | 3 (todos legítimos) |
| Inline styles | ~3 (solo valores dinámicos) |
| Dependencias externas | 0 (Fira Code via CDN) |
| Tiempo de carga | < 1s en conexión estándar |

---

## 📄 Licencia 

MIT — Código abierto para inspiración y referencia.
