# Reto Práctico: Asistente Virtual Ganon (`ai_chat_app`)

¡Bienvenida al reto! Este proyecto es una aplicación web sencilla de chat con Inteligencia Artificial construida únicamente con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías externas).

---

## Objetivo

1. **Configurar tu API Key desde el código (`script.js`):**
   Al inicio de `script.js` encontrarás las constantes `API_PROVIDER` (`'gemini'` u `'openai'`) y `API_KEY`. Coloca ahí tu clave del proveedor que prefieras usar:
   - **Google Gemini (Gratis):** [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - **OpenAI (ChatGPT):** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

2. **Encontrar y corregir los 5 errores básicos:**
   El proyecto tiene toda la estructura lista, pero **contiene 5 errores básicos** repartidos entre `styles.css` y `script.js` que impiden que el chat funcione correctamente. Utiliza las herramientas de desarrollo del navegador (**F12 / Inspector / Consola**) y tu lógica para resolverlos.

---

## Cómo ejecutar el proyecto

1. No necesitas instalar nada con Node.js ni usar la terminal.
2. Abre el archivo `index.html` directamente haciendo doble clic sobre él en tu navegador (Chrome, Edge, Firefox, etc.) o usando la extensión **Live Server** en VS Code.

---

## Comportamiento esperado cuando todo esté corregido

1. El botón **"Enviar"** debe poder presionarse con el cursor del ratón.
2. Al enviar un mensaje (haciendo clic en **Enviar** o presionando `Enter`), la página **no debe recargarse**.
3. El texto escrito por el usuario debe leerse sin errores en consola y agregarse como una burbuja azul a la derecha.
4. La aplicación debe consultar la API configurada en `script.js`, extraer correctamente el texto del objeto JSON devuelto y mostrar la respuesta del agente en pantalla.
5. Cuando haya varios mensajes en la conversación, el contenedor del chat debe permitir hacer **scroll vertical** para leer todo el historial.

> **Tip:** Abre la consola del navegador (`F12` -> pestañas **Console** y **Elements**) y revisa los comentarios marcados con `PISTA` dentro de `styles.css` y `script.js`.
