/* UTILS — Helpers DOM compartidos por todos los módulos UI */

/**
 * Crea un elemento DOM con textContent y atributos opcionales.
 * Equivalente a document.createElement() + textContent + setAttribute.
 * @param {string} tag - Nombre de la etiqueta HTML
 * @param {string} [text] - Texto a insertar (omite para no textContent)
 * @param {Record<string, string>} [attrs] - Atributos a establecer
 * @returns {HTMLElement}
 */
export function makeEl(tag, text, attrs) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/**
 * Crea una fila de estadística con label a la izq y valor a la der.
 * @param {string} label
 * @param {string} value
 * @param {string} [valueColor]
 * @returns {HTMLElement}
 */
export function statRow(label, value, valueColor = '') {
  const row = makeEl('div', '', { style: 'display:flex;justify-content:space-between' });
  row.appendChild(document.createTextNode(label));
  const valSpan = document.createElement('span');
  if (valueColor) valSpan.style.color = valueColor;
  valSpan.textContent = value;
  row.appendChild(valSpan);
  return row;
}
