# 🖥️ System Portfolio | Console UI & Case Files 

> **Live Demo:** [anasu.github.io/portfolio](https://anasu.github.io/portfolio/)

> **Role:** Senior Product / UX Designer & Technical Director 

---

## 🎯 Why is this portfolio designed this way? 

This portfolio is not a corporate template nor a static gallery of screens. It was designed from scratch applying **product thinking** to solve two key needs: 

1. **Express my mindset and work style:** My background integrates the design of complex systems (UX/UI, Design Systems) with Technical Direction and 3D Art. The concept of a **retro-futuristic command / console interface** reflects my systemic, methodical approach oriented toward digital infrastructure. 

2. **Ultra-fast access to relevant data:** Understanding that recruiters and hiring managers have limited time (initial evaluation in < 60 seconds), the architecture prioritizes **scannability**, showing impact metrics, clear tags and system files immediately. 

---

## 📐 Architecture & UX Principles 

### Layered UX Design

- **Level 1 (Scanner):** Impact summary, quantitative data (+90% adoption, TTM 7→1 month) and technology tags visible at a glance.
- **Level 2 (Reader):** Complete breakdown of challenges, strategy, trade-offs and architecture decisions for in-depth evaluations.

### Multi-sector Coexistence

Demonstrates the convergence between 3D pipeline management and complex software design (Fintech, EdTech, Aviation).

### Hierarchy & Immersion

Use of monospace typography (`Fira Code`), thematic palette in terminal/phosphor tone and interactive inspection modals.

---

## 📁 Included Case Files 

| File | Sector | Key Impact |
|------|--------|------------|
| **`E-MANTTO`** \| Aviation Design System | Aviation · AI | TTM reduction from 7 to 1 month (+AI/MCP). +90% adoption in active cells. |
| **`FLUJO`** \| Mass Fintech App | Fintech · Inclusion | Complete migration to native (iOS/Android) and Figma. WCAG standards, unambiguous handoff. |
| **`PUENTE`** \| EdTech & Inclusion Platform | EdTech · Resilience | Resilient design with SMS contingency (0% mobile data dependency). |
| **`NEXUS`** \| Technical Direction & 3D Pipeline | 3D Animation · CNTV | Render optimization equivalent to 4 months savings. 100% audit approval. |

---

## 🛠️ Tech Stack & Specifications 

### Core
- **HTML5** + **CSS3 Variables** + **Vanilla JavaScript (ES Modules)** — chosen to guarantee native compatibility with GitHub Pages without requiring builds or server-side processing.
- **Fira Code** (monospace) — single font family for visual consistency.

### Code Architecture

```
css/                          # 8 modular files per component
├── variables.css             # :root tokens, resets, retro scrollbar
├── boot.css                  # CRT boot screen
├── desktop.css               # Main layout, taskbar, grid, panel
├── cards.css                 # Grid folders (normal/hover/selected)
├── windows.css               # Windows, titlebar, drag, minimize
├── email.css                 # Complete contact form
├── console.css               # Quake terminal, command bar
└── responsive.css            # All @media queries centralized

js/ui/                        # 13 independent ES modules
├── utils.js                  # DOM helpers (makeEl)
├── drag.js                   # Reusable makeDraggable() (mouse + touch)
├── quake.js                  # Toggle, resize and logging of quake terminal
├── commands.js               # Command dispatcher → separate functions
├── bio.js                    # Generic biography window
├── jokes.js                  # Pure data for terminal responses
├── console.js                # Input rendering + dispatcher connection
├── contact.js                # Email form with Formspree submission
├── window.js                 # Modal window creation and management
├── boot.js                   # CRT boot sequence
├── panel.js                  # Sidebar panel (stats, uptime, log)
├── taskbar.js                # Top bar with real-time clock
└── keyboard.js               # Keyboard navigation (Enter/Escape)

js/data/                      # Centralized static data
├── config.js                 # Global configuration (freeze)
└── exp.js                    # Case files + JSDoc typing
```

### Interaction
- **Interactive Quake Console** (`↑↓` resize, `^` toggle, commands with easter eggs).
- **Draggable Windows** with minimize, stack and restore position.
- **Dynamic file system** with breadcrumbs.

### Performance & Accessibility
- Scanlines and CRT effects optimized via native CSS with no render impact.
- Zero `!important` (except 3 legitimate cases: drag block, mobile toggle).
- No inline styles — all presentation declared in CSS.
- ARIA attributes, semantic roles, complete keyboard navigation.

---

## 🖱️ Interaction Guide 

### Desktop
| Action | How |
|--------|-----|
| Open file | Click or Enter on a folder |
| Close window | × button in titlebar |
| Minimize | ➖ button in titlebar |
| Move window | Drag from the title bar |

### Console (`Enter` to execute)
| Command | Description |
|---------|-------------|
| `help` | Lists all commands |
| `ls` / `dir` | Lists available files |
| `open [id]` | Opens file by ID (e.g.: `open exp001`) |
| `open [name]` | Opens by name (e.g.: `open e-mantto`) |
| `bio` / `about` / `cv` | Opens professional profile |
| `contact` / `email` | Opens email terminal |
| `clear` / `cls` | Clears sidebar log |
| `date` | Current date and time |
| `whoami` | User info |

### Easter Eggs 🥚
The console hides several easter eggs. Some commands you can try:
```
sudo
apt-get install
docker run
polySphere
exit
```
But there are more — feel free to explore and find the ones not listed here :)

---

## 📊 Project in Numbers 

| Number | Value |
|--------|-------|
| CSS Files | 8 modular (~25 KB total) |
| JS Modules | 13 ES Modules (~65 KB total) |
| Lines of Code | ~1,400 (excluding data) |
| `!important` | 3 (all legitimate) |
| Inline styles | ~3 (only dynamic values) |
| External Dependencies | 0 (Fira Code via CDN) |
| Load Time | < 1s on standard connection |

---

## 📄 License 

MIT — Open source for inspiration and reference.
