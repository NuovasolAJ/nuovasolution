/* ============================================================
   NuovaSolution — Floating Assistant Widget
   ============================================================ */

const CHAT_QA = {
  en: {
    greeting: 'chat.greeting',
    questions: ['chat.q1', 'chat.q2', 'chat.q3', 'chat.q4'],
    answers: {
      'chat.q1': 'chat.a1',
      'chat.q2': 'chat.a2',
      'chat.q3': 'chat.a3',
      'chat.q4': 'chat.a4',
    }
  }
};

let chatInitialized = false;
let chatOpen = false;

function t(key) {
  return window.NuovaI18n ? window.NuovaI18n.t(key) : key;
}

function addBotMessage(text) {
  const messages = document.getElementById('chatMessages');
  const suggestions = document.getElementById('chatSuggestions');
  if (!messages) return;

  // Hide suggestions while bot is "typing"
  if (suggestions) suggestions.style.display = 'none';

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-bubble chat-bubble--bot';
  typing.innerHTML = `<span style="opacity:0.5;font-size:var(--text-xs)">···</span>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typing.textContent = text;
    messages.scrollTop = messages.scrollHeight;
    // Show suggestions again after reply
    if (suggestions) suggestions.style.display = 'flex';
  }, 700);
}

function addUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  if (!messages) return;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble chat-bubble--user';
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function buildSuggestions() {
  const container = document.getElementById('chatSuggestions');
  if (!container) return;
  container.innerHTML = '';

  const questions = ['chat.q1', 'chat.q2', 'chat.q3', 'chat.q4'];
  questions.forEach(qKey => {
    const btn = document.createElement('button');
    btn.className = 'chat-suggestion';
    btn.textContent = t(qKey);
    btn.addEventListener('click', () => {
      addUserMessage(t(qKey));
      setTimeout(() => {
        const answerKey = 'chat.a' + qKey.slice(-1);
        addBotMessage(t(answerKey));
      }, 200);
    });
    container.appendChild(btn);
  });
}

function initChat() {
  if (chatInitialized) return;
  chatInitialized = true;

  const messages = document.getElementById('chatMessages');
  if (!messages) return;

  // Clear and add greeting
  messages.innerHTML = '';
  const greeting = document.createElement('div');
  greeting.className = 'chat-bubble chat-bubble--bot';
  greeting.textContent = t('chat.greeting');
  messages.appendChild(greeting);

  buildSuggestions();

  // Send button
  const sendBtn  = document.getElementById('chatSend');
  const inputEl  = document.getElementById('chatInput');

  function sendUserInput() {
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    addUserMessage(text);
    // Simple keyword matching
    const lower = text.toLowerCase();
    let answerKey = 'chat.a1';
    if (lower.includes('work') || lower.includes('funciona') || lower.includes('how')) answerKey = 'chat.a1';
    else if (lower.includes('agenc') || lower.includes('who') || lower.includes('para qué')) answerKey = 'chat.a2';
    else if (lower.includes('start') || lower.includes('empe') || lower.includes('get start')) answerKey = 'chat.a3';
    else if (lower.includes('channel') || lower.includes('canal') || lower.includes('whatsapp') || lower.includes('email')) answerKey = 'chat.a4';
    setTimeout(() => addBotMessage(t(answerKey)), 200);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendUserInput);
  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendUserInput();
      }
    });
  }
}

function openChat() {
  const panel = document.getElementById('chatPanel');
  if (!panel) return;
  chatOpen = true;
  panel.classList.add('open');
  if (!chatInitialized) initChat();
  // Focus input
  setTimeout(() => {
    const input = document.getElementById('chatInput');
    if (input) input.focus();
  }, 300);
}

function closeChat() {
  const panel = document.getElementById('chatPanel');
  if (!panel) return;
  chatOpen = false;
  panel.classList.remove('open');
}

function resetChat(lang) {
  chatInitialized = false;
  const messages = document.getElementById('chatMessages');
  if (messages) messages.innerHTML = '';
  if (chatOpen) initChat();
  else buildSuggestions();
}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('chatTrigger');
  const closeBtn = document.getElementById('chatClose');

  if (trigger) trigger.addEventListener('click', () => chatOpen ? closeChat() : openChat());
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  // Close on outside click
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('chatPanel');
    const trigger = document.getElementById('chatTrigger');
    if (chatOpen && panel && trigger && !panel.contains(e.target) && !trigger.contains(e.target)) {
      closeChat();
    }
  });
});

window.NuovaChat = { reset: resetChat, open: openChat, close: closeChat };
