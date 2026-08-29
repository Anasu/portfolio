# El Panel del Investigador

Portafolio personal con estética **Cyber-Noir / Terminal Retro** inspirado en sistemas operativos de los 90s y novelas de misterio.

## 🖥️ Concepto

El sitio simula un **Sistema Operativo de Investigación**. Cada proyecto es un "Expediente" que se abre con doble-click como una ventana de Windows 95.

## ✨ Características

- **Boot Sequence** animada estilo terminal CRT
- **Grid de expedientes** con selección estilo Win95 (hover azul)
- **Ventanas modales** arrastrables para cada proyecto
- **Panel lateral** con estadísticas y registro de acceso
- **Consola** con comandos (`help`, `ls`, `open [id]`, `date`, `whoami`)
- **Efectos CRT** (scanlines + viñeta)
- **Responsive** (funciona en móvil)

## 📦 Estructura

```
├── index.html      # HTML principal
├── css/
│   └── style.css   # Estilos (66 líneas)
├── js/
│   └── app.js      # Lógica completa (94 líneas)
├── .gitignore
└── README.md
```

## 🚀 Uso local

```bash
# Opción 1: Python
python3 -m http.server 8080

# Opción 2: Node
node server.js

# Opción 3: VS Code Live Server
```

Luego abrir `http://localhost:8080`

## 📋 Comandos de consola

| Comando    | Descripción              |
|------------|--------------------------|
| `help`     | Muestra ayuda            |
| `ls`       | Lista expedientes        |
| `open [id]`| Abre un expediente       |
| `date`     | Muestra fecha/hora       |
| `whoami`   | Muestra usuario actual   |

## 🎨 Tecnologías

- **HTML5** + **CSS3** + **Vanilla JS** (sin dependencias)
- **Fira Code** (monospace) + **Cinzel** (serif) + **Playfair Display** (display)
- Google Fonts (CDN)

## 📄 Licencia

MIT
