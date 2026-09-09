# 📧 Contacto — Guía de Configuración

## Resumen

Se ha integrado un módulo completo de contacto con estética retro terminal de los 90s. Incluye:

- **Ícono 📧 "Contacto"** en el escritorio (fixed bottom-left en desktop, al final del grid en mobile)
- **Ventana Modal** — Terminal de correo con campos TO, FROM, CC, BCC, Asunto y Mensaje
- **Envío real** vía [Formspree](https://formspree.io) (servicio gratuito para sitios estáticos)
- **Feedback auditivo** — beep retro al enviar + arte ASCII de éxito

---

## Paso 1: Crear cuenta en Formspree

1. Ir a **[https://formspree.io](https://formspree.io)**
2. Click en **"Sign Up Free"** → registrarse con email
3. Una vez dentro del dashboard, click en **"New Form"** (botón verde)
4. Ponerle nombre: `Portfolio Contact`
5. Formspree te dará un **endpoint** que se ve así:

   ```
   https://formspree.io/f/xNqLaZkV
   ```

6. Copia ese endpoint (la parte `/f/xxxxx`)

> **Plan gratuito:** 50 mensajes/mes, más que suficiente para un portafolio.

---

## Paso 2: Configurar el endpoint

Edita el archivo `js/data/config.js` y reemplaza la línea:

```js
endpoint: 'https://formspree.io/f/TU_ENDPOINT_AQUI',
```

por tu endpoint real, ej:

```js
endpoint: 'https://formspree.io/f/xNqLaZkV',
```

---

## Paso 3 (Opcional): Agregar sonido MP3 retro

El código ya incluye un beep base64 que funciona sin archivos adicionales. Para un sonido más auténtico de los 90s:

1. Consigue o graba un sonido `.mp3` de "correo enviado" estilo Windows 95/98
2. Guárdalo como `assets/send-sound.mp3` en la raíz del proyecto
3. El código ya lo carga automáticamente como fallback

> Si no agregas el archivo, solo sonará el beep base64 (que funciona siempre).

---

## Paso 4: Verificar que funciona

Abre el portafolio en el navegador y prueba:

1. **Click en el ícono 📧** → debe abrir la ventana "MAIL TERMINAL v1.0"
2. **Escribe `contact`** en la consola → mismo resultado
3. Llena los campos editables (FROM, ASUNTO, MENSAJE) y envía
4. Deberías ver el arte ASCII de éxito y escuchar el beep

---

## Estructura de archivos modificados/creados

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `js/ui/contact.js` | **CREADO** | Módulo completo: ícono, ventana, formulario, envío, sonido |
| `js/data/config.js` | **MODIFICADO** | Sección `formspree` añadida con endpoint placeholder |
| `js/ui/boot.js` | **MODIFICADO** | Importa y llama a `Contact.renderIcon()` tras el boot |
| `js/ui/console.js` | **MODIFICADO** | Comando `contact` ahora abre la terminal de correo |
| `css/style.css` | **MODIFICADO** | Estilos retro para inputs, textarea, botón, estado de éxito |
| `assets/` | **CREADO DIR** | Directorio para el sonido opcional `send-sound.mp3` |

---

## Comportamiento responsive

| Dispositivo | Ícono Contacto | Ventana |
|-------------|---------------|---------|
| **Desktop** (>900px) | Fixed bottom-left (40px from bottom, 16px from left) | Posición apilada con offset |
| **Mobile** (≤900px) | Al final del grid (flujo normal, sin solapamiento) | Centrada en pantalla (95vw) |

---

## Campos del formulario

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| **TO** | Text (readonly) | No | Prellenado con `anazconte@gmail.com` |
| **FROM** | Email | Sí | Tu email de respuesta |
| **CC** | Email | No | Copia visible |
| **BCC** | Email | No | Copia oculta |
| **ASUNTO** | Text | Sí | Se le agrega prefijo `[Portfolio Contact]` |
| **MENSAJE** | Textarea | Sí | 6 filas, redimensionable |
