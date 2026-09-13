/**
 * QUAKE — Terminal estilo Quake (overlay inferior).
 * Maneja resize, toggle, y logging de líneas.
 */

const MAX_LINES = 50;

export const Quake = {
  el: null,
  body: null,
  handle: null,
  input: null,
  open: false,

  /** Inicializa referencias al DOM */
  init() {
    this.el = document.getElementById('quake-terminal');
    this.body = document.getElementById('qt-body');
    this.handle = document.getElementById('qt-resize-handle');
    const toggle = document.getElementById('quake-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  },

  /** Abre el quake terminal */
  openTerminal() {
    if (this.open) return;
    this.el.classList.remove('hidden');
    this.open = true;
    if (this.input) this.input.focus();
  },

  /** Cierra el quake terminal */
  closeTerminal() {
    if (!this.open) return;
    this.el.classList.add('hidden');
    this.open = false;
  },

  /** Alterna visibilidad del quake terminal */
  toggle() {
    this.open ? this.closeTerminal() : this.openTerminal();
  },

  /** Agrega una línea al cuerpo del quake */
  log(text, cls) {
    if (!this.open && !text.startsWith('[USR]')) return;
    if (text.startsWith('[USR]') && !this.open) this.openTerminal();

    const line = document.createElement('div');
    line.className = 'qt-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    this.body.appendChild(line);

    // Mantener máximo de líneas
    while (this.body.children.length > MAX_LINES) {
      this.body.removeChild(this.body.firstChild);
    }
    this.body.scrollTop = this.body.scrollHeight;
  },

  /** Configura resize del quake terminal */
  initResize() {
    if (!this.handle) return;

    let isResizing = false;

    function startResize(e) {
      e.preventDefault();
      isResizing = true;
      this.handle.classList.add('dragging');
      document.body.style.cursor = 'n-resize';
      document.body.style.userSelect = 'none';
    }

    function doResize(clientY) {
      if (!isResizing) return;
      const wrapperRect = this.el.parentElement.getBoundingClientRect();
      let newHeight = wrapperRect.bottom - clientY;
      const minH = 80;
      const maxH = Math.min(50 * window.innerHeight / 100, window.innerHeight - 28);
      newHeight = Math.max(minH, Math.min(maxH, newHeight));
      this.el.style.height = newHeight + 'px';
    }

    function stopResize() {
      if (!isResizing) return;
      isResizing = false;
      this.handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    // Mouse events
    this.handle.addEventListener('mousedown', startResize.bind(this));
    window.addEventListener('mousemove', e => doResize.call(this, e.clientY));
    window.addEventListener('mouseup', stopResize.bind(this));

    // Touch events
    this.handle.addEventListener('touchstart', startResize.bind(this), { passive: false });
    window.addEventListener('touchmove', e => {
      if (isResizing && e.touches[0]) doResize.call(this, e.touches[0].clientY);
    }, { passive: false });
    window.addEventListener('touchend', stopResize.bind(this));

    // Click afuera cierra quake
    document.addEventListener('click', e => {
      if (!this.open) return;
      const isInsideQuake = this.el.contains(e.target);
      const isInsideInput = this.input && this.input.contains(e.target);
      const toggle = document.getElementById('quake-toggle');
      const isToggleBtn = toggle && toggle.contains(e.target);
      if (!isInsideQuake && !isInsideInput && !isToggleBtn) {
        this.closeTerminal();
      }
    });
  },

  /** Vincula el input de la consola para abrir quake al focus */
  bindInput(inputEl) {
    this.input = inputEl;
    inputEl.addEventListener('focus', () => this.openTerminal());
  },
};
