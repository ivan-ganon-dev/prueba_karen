# Guía de Solución para el Evaluador (`ai_chat_app`)

> **Importante:** Este archivo está fuera de la carpeta `ai_chat_app/` para que puedas compartir únicamente la carpeta `ai_chat_app` con la candidata sin entregarle las respuestas.

---

## Paso 0: Configuración de la API en el código (`script.js`)
En las primeras líneas de `ai_chat_app/script.js` (líneas 5 a 8), la candidata debe elegir el proveedor (`'gemini'` u `'openai'`) y pegar su API Key directamente en el código:

```javascript
const API_PROVIDER = 'gemini'; // o 'openai'
const API_KEY = 'AIzaSy...';   // Su API Key real
```

---

## Resumen de los 5 errores y cómo solucionarlos

### 1. El botón "Enviar" no responde al clic (Error de CSS)
- **Archivo:** `ai_chat_app/styles.css` (alrededor de la línea 226)
- **Síntoma:** Al abrir el widget del chat haciendo clic en el logotipo inferior izquierdo e intentar hacer clic en el botón **Enviar**, no ocurre nada.
- **Causa:** La clase `.send-btn` tiene la propiedad `pointer-events: none;`.
- **Solución:** Eliminar la línea `pointer-events: none;` (o cambiarla a `pointer-events: auto;`).

```css
/* Antes */
.send-btn {
  /* ... */
  pointer-events: none;
}

/* Después */
.send-btn {
  /* ... */
  /* pointer-events eliminado */
}
```

---

### 2. La página se recarga al enviar el formulario (Error de Eventos en JS)
- **Archivo:** `ai_chat_app/script.js` (alrededor de la línea 137)
- **Síntoma:** Al presionar `Enter` en la caja de texto o hacer clic en **Enviar**, la página se recarga, el chat se cierra y se borra la conversación.
- **Causa:** En el evento `submit` de `chatForm`, falta detener el comportamiento por defecto del navegador.
- **Solución:** Agregar `event.preventDefault();` al inicio del listener.

```javascript
/* Antes */
chatForm.addEventListener('submit', async (event) => {
  // PISTA EVENTOS...
  const messageText = userInput.value.trim();

/* Después */
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const messageText = userInput.value.trim();
```

---

### 3. Error en consola: `Cannot read properties of null (reading 'value')` (Error de DOM en JS)
- **Archivo:** `ai_chat_app/script.js` (línea 22) vs `ai_chat_app/index.html` (línea 41)
- **Síntoma:** Al intentar enviar un mensaje, la consola muestra `Uncaught (in promise) TypeError: Cannot read properties of null (reading 'value')`.
- **Causa:** En `index.html` el `<input>` tiene el atributo `id="user-input"`, pero en `script.js` se está buscando como `document.getElementById('mensaje-usuario')`.
- **Solución:** Cambiar el selector en `script.js` a `'user-input'` (o cambiar el `id` en el HTML para que ambos coincidan).

```javascript
/* Antes */
const userInput = document.getElementById('mensaje-usuario');

/* Después */
const userInput = document.getElementById('user-input');
```

---

### 4. Error al extraer el texto de la respuesta JSON de la API (Error de lógica en JS)
- **Archivo:** `ai_chat_app/script.js` (línea 94 para Gemini / línea 133 para OpenAI)
- **Síntoma:** La petición a la API responde con éxito (`200 OK`) y se imprime el JSON en consola (`console.log`), pero la burbuja del chat muestra un error: `Cannot read properties of undefined (reading 'parts')` (en Gemini) o `Cannot read properties of undefined (reading 'content')` (en OpenAI).
- **Causa:** Tanto `candidates` y `parts` (en Gemini) como `choices` (en OpenAI) son **arreglos (`Array`)**, y el código intenta acceder a sus propiedades como si fueran objetos directos sin usar el índice `[0]`.
- **Solución (según la API que ella haya configurado en `API_PROVIDER`):**

**Si usa Google Gemini (línea 94):**
```javascript
/* Antes */
return data.candidates.content.parts.text;

/* Después */
return data.candidates[0].content.parts[0].text;
```

**Si usa OpenAI / ChatGPT (línea 133):**
```javascript
/* Antes */
return data.choices.message.content;

/* Después */
return data.choices[0].message.content;
```

---

### 5. El área de mensajes no permite hacer scroll cuando hay varios mensajes (Error de CSS)
- **Archivo:** `ai_chat_app/styles.css` (alrededor de la línea 152)
- **Síntoma:** Cuando se envían varios mensajes y la conversación supera la altura del widget, los mensajes nuevos quedan ocultos abajo y no se puede desplazar hacia abajo con la rueda del ratón.
- **Causa:** La clase `.chat-messages` tiene `overflow-y: hidden;`.
- **Solución:** Cambiar `overflow-y: hidden;` por `overflow-y: auto;`.

```css
/* Antes */
.chat-messages {
  /* ... */
  overflow-y: hidden;
}

/* Después */
.chat-messages {
  /* ... */
  overflow-y: auto;
}
```
