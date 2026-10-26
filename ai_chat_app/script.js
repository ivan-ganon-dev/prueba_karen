// =========================================================
// CONFIGURACIÓN DE LA API (Configurar aquí en el código)
// =========================================================
// 1. Elige el proveedor que prefieras usar: 'gemini' o 'openai'
const API_PROVIDER = 'gemini';

// 2. Pega aquí tu API Key de Google AI Studio (Gemini) o de OpenAI
const API_KEY = '';

// =========================================================
// Referencias a elementos del DOM
// =========================================================
const chatWidget = document.getElementById('chat-widget');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');

// PISTA DOM: Verifica que el ID buscado aquí coincida exactamente
// con el atributo "id" del input de texto definido en index.html.
const userInput = document.getElementById('mensaje-usuario');

// =========================================================
// Abrir / Cerrar la ventana del chat al dar clic en el logo
// =========================================================
chatToggleBtn.addEventListener('click', () => {
  chatWidget.classList.toggle('hidden');
});

closeChatBtn.addEventListener('click', () => {
  chatWidget.classList.add('hidden');
});

// =========================================================
// Función auxiliar para mostrar mensajes en la pantalla
// =========================================================
function appendMessage(text, sender = 'bot', isError = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');

  if (sender === 'user') {
    messageDiv.classList.add('user-message');
  } else {
    messageDiv.classList.add('bot-message');
  }

  if (isError) {
    messageDiv.classList.add('error-message');
  }

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message-content');
  contentDiv.textContent = text;

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  // Desplazar automáticamente hacia el último mensaje
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return contentDiv;
}

// =========================================================
// Llamada a la API de Google Gemini (AI Studio)
// =========================================================
async function callGeminiAPI(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Eres el asistente virtual amable y conciso de Ganon. Responde al usuario: ${prompt}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  console.log('Respuesta JSON de Gemini:', data);

  if (!response.ok) {
    const errorMsg = data?.error?.message || 'Error al consultar la API de Gemini.';
    throw new Error(errorMsg);
  }

  // PISTA LÓGICA JSON (Gemini): Revisa en la consola del navegador la estructura
  // de "data". Ten en cuenta que "candidates" y "parts" son arreglos (Arrays),
  // por lo que necesitas acceder a su primer elemento antes de leer sus propiedades.
  return data.candidates.content.parts.text;
}

// =========================================================
// Llamada a la API de OpenAI (ChatGPT)
// =========================================================
async function callOpenAIAPI(prompt, apiKey) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres el asistente virtual amable y conciso de Ganon.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await response.json();
  console.log('Respuesta JSON de OpenAI:', data);

  if (!response.ok) {
    const errorMsg = data?.error?.message || 'Error al consultar la API de OpenAI.';
    throw new Error(errorMsg);
  }

  // PISTA LÓGICA JSON (OpenAI): Revisa en la consola del navegador la estructura
  // de "data". Ten en cuenta que "choices" es un arreglo (Array), por lo que
  // debes acceder a su primer elemento antes de entrar a "message.content".
  return data.choices.message.content;
}

// =========================================================
// Manejo del envío del formulario
// =========================================================
chatForm.addEventListener('submit', async (event) => {
  // PISTA EVENTOS: Por defecto, al enviar un formulario (<form>), el navegador
  // recarga toda la página. Falta una línea aquí para evitar ese comportamiento.

  const messageText = userInput.value.trim();

  if (!messageText) return;

  if (!API_KEY || API_KEY.trim() === '') {
    appendMessage(
      'Falta configurar la API_KEY dentro del archivo script.js antes de enviar mensajes.',
      'bot',
      true
    );
    return;
  }

  // 1. Mostrar el mensaje del usuario y limpiar el input
  appendMessage(messageText, 'user');
  userInput.value = '';

  // 2. Mostrar indicador temporal de carga
  sendBtn.disabled = true;
  const loadingMessage = appendMessage('Pensando...', 'bot');

  try {
    let replyText = '';

    if (API_PROVIDER === 'gemini') {
      replyText = await callGeminiAPI(messageText, API_KEY.trim());
    } else if (API_PROVIDER === 'openai') {
      replyText = await callOpenAIAPI(messageText, API_KEY.trim());
    } else {
      throw new Error('Proveedor no válido en API_PROVIDER. Usa "gemini" u "openai".');
    }

    // 3. Reemplazar el texto de carga con la respuesta real del modelo
    loadingMessage.textContent = replyText;
  } catch (error) {
    console.error('Error en el chat:', error);
    loadingMessage.parentElement.classList.add('error-message');
    loadingMessage.textContent = `Ocurrió un error: ${error.message}`;
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
});
