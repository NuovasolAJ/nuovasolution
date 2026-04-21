/* ============================================================
   NuovaSolution — Interactive Demo Simulation
   ============================================================ */

const DEMO_REPLIES = {
  en: {
    villa: `Thank you for reaching out! I'd be happy to help you find a villa in Marbella. Based on your budget of €600,000, we have several excellent options in the Golden Mile and Nueva Andalucía area. Could I ask a few quick questions — are you looking to buy for personal use or as an investment? And do you have a preferred timeline for viewing? I'd love to arrange something this week.`,
    apartment: `Thanks for your message! We have several great apartments in Málaga within your budget. A few popular areas are the historic centre, El Palo, and Pedregalejo — each with a different character. Could you tell me more about your priorities — beach access, city centre, or a quiet residential feel? I can arrange viewings at your convenience.`,
    land: `Great to hear from you. We do have development land available along the Costa del Sol, and demand in this segment has been strong. The right plot depends on your project size and planning requirements. Could you give me a rough idea of the build scope you have in mind? I can then shortlist the most suitable options for you.`
  },
  es: {
    villa: `¡Gracias por contactarnos! Estaré encantado de ayudarte a encontrar una villa en Marbella. Con un presupuesto de 600.000€, tenemos varias opciones excelentes en la Milla de Oro y Nueva Andalucía. ¿Podría hacerte algunas preguntas rápidas? ¿Buscas para uso personal o como inversión? ¿Y tienes alguna preferencia de fecha para visitar? Me encantaría organizar algo esta semana.`,
    apartment: `¡Gracias por tu mensaje! Tenemos varios apartamentos estupendos en Málaga dentro de tu presupuesto. Algunas zonas populares son el centro histórico, El Palo y Pedregalejo. ¿Podrías contarme más sobre tus prioridades — acceso a la playa, centro de la ciudad o zona residencial tranquila? Puedo organizar visitas cuando te venga bien.`,
    land: `Me alegra saber de ti. Disponemos de terrenos para desarrollo en la Costa del Sol, y la demanda en este segmento ha sido fuerte. El terreno adecuado depende de las dimensiones y requisitos de tu proyecto. ¿Podrías darme una idea aproximada del alcance de la construcción que tienes en mente? Así puedo seleccionar las opciones más adecuadas para ti.`
  }
};

const DEMO_TAGS = {
  villa:     { en: ['Villa', 'Marbella', '€600k+', 'Buying', 'EN'], es: ['Villa', 'Marbella', '€600k+', 'Compra', 'EN'] },
  apartment: { en: ['Apartment', 'Málaga', '€250k', 'Buying', 'EN'], es: ['Apartamento', 'Málaga', '€250k', 'Compra', 'EN'] },
  land:      { en: ['Land', 'Costa del Sol', 'Development', 'Investor', 'EN'], es: ['Terreno', 'Costa del Sol', 'Desarrollo', 'Inversor', 'EN'] },
};

function detectPreset(text) {
  const lower = text.toLowerCase();
  if (lower.includes('villa') || lower.includes('marbella') || lower.includes('600')) return 'villa';
  if (lower.includes('apartment') || lower.includes('apartamento') || lower.includes('málaga') || lower.includes('malaga') || lower.includes('250')) return 'apartment';
  if (lower.includes('land') || lower.includes('terreno') || lower.includes('development') || lower.includes('desarrollo')) return 'land';
  return 'villa'; // default
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runDemo() {
  const lang = window.NuovaI18n ? window.NuovaI18n.getCurrentLang() : 'en';
  const t = (key) => window.NuovaI18n ? window.NuovaI18n.t(key) : key;

  const textarea    = document.getElementById('demoTextarea');
  const runBtn      = document.getElementById('demoRunBtn');
  const output      = document.getElementById('demoOutput');
  const statusBar   = document.getElementById('demoStatusBar');
  const statusText  = document.getElementById('demoStatusText');
  const spinner     = document.getElementById('demoSpinner');
  const typingEl    = document.getElementById('demoTyping');
  const replyText   = document.getElementById('demoReplyText'); // the bubble itself
  const leadCard    = document.getElementById('demoLeadCard');
  const leadTags    = document.getElementById('demoLeadTags');
  const alertCard   = document.getElementById('demoAlertCard');
  const alertText   = document.getElementById('demoAlertText');
  const alertSub    = document.getElementById('demoAlertSub');

  if (!textarea || !output) return;

  const inquiry = textarea.value.trim();
  if (!inquiry) {
    textarea.focus();
    textarea.style.borderColor = 'var(--terracotta)';
    setTimeout(() => textarea.style.borderColor = '', 1500);
    return;
  }

  // Reset output state
  output.classList.remove('visible');
  if (replyText) replyText.classList.remove('visible');
  leadCard.classList.remove('visible');
  alertCard.classList.remove('visible');
  typingEl.style.display = 'none';

  // Disable button
  runBtn.disabled = true;
  runBtn.style.opacity = '0.5';

  const preset = detectPreset(inquiry);
  const replyContent = DEMO_REPLIES[lang]?.[preset] || DEMO_REPLIES['en'][preset];
  const tags = DEMO_TAGS[preset]?.[lang] || DEMO_TAGS[preset]['en'];

  // Show output area
  output.classList.add('visible');
  statusBar.style.display = 'flex';
  spinner.classList.add('active');

  // Step 1: Analyzing
  statusText.textContent = t('demo.status.analyzing');
  await sleep(900);

  // Step 2: Show typing indicator
  statusText.textContent = t('demo.status.replying');
  typingEl.style.display = 'flex';
  await sleep(1400);

  // Step 3: Show reply
  typingEl.style.display = 'none';
  if (replyText) {
    replyText.textContent = replyContent;
    replyText.classList.add('visible');
  }
  await sleep(800);

  // Step 4: Lead scoring
  statusText.textContent = t('demo.status.scoring');
  await sleep(700);

  // Build lead tags
  leadTags.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'demo-tag';
    span.textContent = tag;
    leadTags.appendChild(span);
  });

  leadCard.classList.add('visible');
  await sleep(800);

  // Step 5: Alert
  statusText.textContent = t('demo.status.alerting');
  await sleep(600);

  alertText.textContent = t('demo.alert.text');
  alertSub.textContent  = t('demo.alert.sub');
  alertCard.classList.add('visible');

  spinner.classList.remove('active');
  statusText.textContent = '';
  statusBar.style.display = 'none';

  // Re-enable button
  runBtn.disabled = false;
  runBtn.style.opacity = '1';
}

function initDemo() {
  const presets = document.querySelectorAll('.demo-preset');
  const textarea = document.getElementById('demoTextarea');
  const runBtn = document.getElementById('demoRunBtn');

  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      presets.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (textarea) textarea.value = btn.textContent.trim();
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', runDemo);
  }

  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        runDemo();
      }
    });
  }
}

function resetDemo() {
  const output    = document.getElementById('demoOutput');
  const replyText = document.getElementById('demoReplyText');
  const leadCard  = document.getElementById('demoLeadCard');
  const alertCard = document.getElementById('demoAlertCard');
  if (output)    output.classList.remove('visible');
  if (replyText) replyText.classList.remove('visible');
  if (leadCard)  leadCard.classList.remove('visible');
  if (alertCard) alertCard.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', initDemo);

window.NuovaDemo = { reset: resetDemo };
