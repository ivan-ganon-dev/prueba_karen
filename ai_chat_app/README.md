# Reto Práctico: Asistente Virtual Ganon (`ai_chat_app`)

¡Bienvenida al reto! Este proyecto es una aplicación web sencilla de chat con Inteligencia Artificial construida únicamente con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías externas).

Sigue esta guía paso a paso.

---

## Paso 1: Clonar el repositorio por SSH

El repositorio debe clonarse usando **SSH** (no HTTPS).

1. Verifica que tu llave SSH esté registrada en tu cuenta de GitHub:
   ```bash
   ssh -T git@github.com
   ```
   Debe responder: `Hi <tu-usuario>! You've successfully authenticated...`
2. Clona el repositorio:
   ```bash
   git clone git@github.com:ivan-ganon-dev/prueba_karen.git
   ```
3. Entra a la carpeta del proyecto y ábrela en tu editor:
   ```bash
   cd prueba_karen/ai_chat_app
   code .
   ```

---

## Paso 2: Configurar tu API Key

Al inicio de `script.js` encontrarás las constantes `API_PROVIDER` (`'gemini'` u `'openai'`) y `API_KEY`. Coloca ahí la clave del proveedor que prefieras usar:

- **Google Gemini (Gratis):** [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- **OpenAI (ChatGPT):** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

```javascript
const API_PROVIDER = 'gemini'; // o 'openai'
const API_KEY = 'TU_API_KEY';
```

---

## Paso 3: Ejecutar el proyecto

1. No necesitas instalar nada con Node.js.
2. Abre el archivo `index.html` directamente en tu navegador (Chrome, Edge, Firefox, etc.) o usa la extensión **Live Server** en VS Code.
3. Haz clic en el logotipo de la esquina inferior izquierda para abrir el chat.

---

## Paso 4: Encontrar y corregir los 4 errores

El proyecto tiene toda la estructura lista, pero **contiene 4 errores básicos** repartidos entre `styles.css` y `script.js` que impiden que el chat funcione correctamente. Utiliza las herramientas de desarrollo del navegador (**F12 / Inspector / Consola**) y tu lógica para resolverlos.

> **Tip:** Revisa las pestañas **Console** y **Elements** del navegador y los comentarios marcados con `PISTA` dentro de `styles.css` y `script.js`.

### Comportamiento esperado cuando todo esté corregido

1. Al enviar un mensaje (haciendo clic en **Enviar** o presionando `Enter`), la página **no debe recargarse**.
2. El texto escrito por el usuario debe leerse sin errores en consola y agregarse como una burbuja azul a la derecha.
3. La aplicación debe consultar la API configurada en `script.js`, extraer correctamente el texto del objeto JSON devuelto y mostrar la respuesta del agente en pantalla.
4. Cuando haya varios mensajes en la conversación, el contenedor del chat debe permitir hacer **scroll vertical** para leer todo el historial.
