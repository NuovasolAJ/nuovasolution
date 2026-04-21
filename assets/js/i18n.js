/* ============================================================
   NuovaSolution — Bilingual (EN / ES) System
   ============================================================ */

const translations = {
  en: {
    /* Nav */
    'nav.why':        'Why It Matters',
    'nav.demo':       'See Demo',
    'nav.how':        'How It Works',
    'nav.benefits':   'Benefits',
    'nav.cta':        'Book a Demo',

    /* Hero */
    'hero.label':     'AI Automation for Real Estate',
    'hero.headline':  'Your agency is losing leads right now.',
    'hero.sub':       'NuovaSolution ensures every inquiry gets an instant, intelligent response — so you stop losing deals to faster competitors.',
    'hero.cta1':      'Book a Demo',
    'hero.cta2':      'See How It Works',
    'hero.trust1':    'Instant replies',
    'hero.trust2':    'Auto lead scoring',
    'hero.trust3':    'Multilingual',
    'hero.sub.short': 'Stop losing leads to faster competitors.',
    'hero.sys1':      'Every lead captured',
    'hero.sys2':      'replied instantly',
    'hero.sys3':      'qualified',
    'hero.sys4':      'only serious clients reach you',

    /* Pain */
    'pain.label':     'The Hidden Cost',
    'pain.headline':  'What happens when you don\'t reply fast enough.',
    'pain.sub':       'In a competitive market, response time is the difference between winning and losing a client.',
    'pain.step1.time':  'Inquiry received',
    'pain.step1.label': 'A buyer contacts your agency',
    'pain.step2.time':  '5 minutes',
    'pain.step2.label': 'No reply yet. Lead is still waiting.',
    'pain.step3.time':  '30 minutes',
    'pain.step3.label': 'Frustration sets in. They start searching again.',
    'pain.step4.time':  '2 hours',
    'pain.step4.label': 'They contact a competitor who replies faster.',
    'pain.step5.time':  'Deal lost',
    'pain.step5.label': 'Lead is gone. You never knew.',
    'pain.stat':        '78%',
    'pain.stat.label':  'of buyers choose the first agency that responds seriously.',

    /* Speed */
    'speed.label':      'Response Time = Revenue',
    'speed.headline':   'The fastest serious agency usually wins.',
    'speed.sub':        'Speed is not about being pushy. It\'s about being present when it matters most.',
    'speed.before.tag': 'Without NuovaSolution',
    'speed.before.h':   'Manual inbox management',
    'speed.before.1':   'Inquiry arrives — sits unread',
    'speed.before.2':   'Agent notices — hours later',
    'speed.before.3':   'Manual reply drafted and sent',
    'speed.before.4':   'No lead scoring — all leads look the same',
    'speed.before.result': '⚠ Lead may have moved on by now',
    'speed.after.tag':  'With NuovaSolution',
    'speed.after.h':    'Intelligent, instant response',
    'speed.after.1':    'Inquiry arrives — system detects it immediately',
    'speed.after.2':    'Instant, personalized reply is sent',
    'speed.after.3':    'Lead is scored and classified automatically',
    'speed.after.4':    'Agent alerted if lead is high-value',
    'speed.after.result': '✓ Lead is engaged before competitors react',

    /* Demo */
    'demo.label':       'Live Demo',
    'demo.headline':    'See it happen in real time.',
    'demo.sub':         'Submit a sample inquiry and watch NuovaSolution respond, qualify, and alert.',
    'demo.panel.title': 'NuovaSolution — Live Demo',
    'demo.input.label': 'Sample inquiry',
    'demo.preset1':     'Villa in Marbella, €600k',
    'demo.preset2':     'Apartment in Málaga, €250k',
    'demo.preset3':     'Land for development, Costa del Sol',
    'demo.input.placeholder': 'Type an inquiry or choose a preset above...',
    'demo.run':         'See It In Action →',
    'demo.status.analyzing': 'Analyzing inquiry...',
    'demo.status.replying':  'Generating reply...',
    'demo.status.scoring':   'Scoring lead...',
    'demo.status.alerting':  'Sending agent alert...',
    'demo.reply.label':      'NuovaSolution Reply',
    'demo.lead.title':       'Lead Profile',
    'demo.score.label':      'Lead Score',
    'demo.alert.text':       'HOT LEAD — Agent notification sent',
    'demo.alert.sub':        'Marbella · Villa · €600k+ · Viewing requested',

    /* How */
    'how.label':        'Simple Process',
    'how.headline':     'How it works.',
    'how.sub':          'Five steps. No complexity. Just results.',
    'how.step1.title':  'Inquiry arrives',
    'how.step1.desc':   'A lead comes in via your website, email, or WhatsApp.',
    'how.step2.title':  'Instant reply',
    'how.step2.desc':   'The system replies immediately in the right language.',
    'how.step3.title':  'Lead classified',
    'how.step3.desc':   'Inquiry is analyzed: budget, location, urgency, intent.',
    'how.step4.title':  'Smart alert',
    'how.step4.desc':   'High-value leads trigger an immediate agent notification.',
    'how.step5.title':  'Team focuses',
    'how.step5.desc':   'Your team concentrates on serious buyers — not inbox chaos.',

    /* Benefits */
    'benefits.label':   'What You Gain',
    'benefits.headline':'Built for agencies that want to win.',
    'benefits.sub':     'Every feature is designed around one outcome: more opportunities captured.',
    'ben1.title': 'Instant Replies',
    'ben1.desc':  '24/7 automatic responses mean no lead ever waits — even at midnight.',
    'ben2.title': 'Lead Qualification',
    'ben2.desc':  'Every inquiry is automatically analyzed: budget, location, readiness to buy.',
    'ben3.title': 'Multilingual',
    'ben3.desc':  'Responds in English, Spanish, and other languages used by your clients.',
    'ben4.title': 'Hot Lead Alerts',
    'ben4.desc':  'Agents are notified the moment a high-value opportunity comes in.',
    'ben5.title': 'Less Inbox Work',
    'ben5.desc':  'Your team stops managing repetitive first responses. Focus on real conversations.',
    'ben6.title': 'More Closed Deals',
    'ben6.desc':  'Faster response + better qualification = more deals that actually close.',

    /* Channels */
    'channels.label':   'Your Channels',
    'channels.headline':'Fits your existing workflow.',
    'channels.sub':     'NuovaSolution works with the channels your agency already uses — no migration required.',
    'channel1.name':    'Website Form',
    'channel1.desc':    'Instant auto-reply',
    'channel2.name':    'Email',
    'channel2.desc':    'Intelligent inbox',
    'channel3.name':    'WhatsApp',
    'channel3.desc':    'Conversational response',
    'channels.note':    'Works with how you already communicate. No rebuilding your workflow.',
    'channels.crm':     'Always synced with your CRM',

    /* Hot Lead */
    'hotlead.label':    'Agent Alerts',
    'hotlead.headline': 'Know instantly when a serious buyer shows up.',
    'hotlead.sub':      'Not all leads are equal. NuovaSolution identifies the high-value ones and notifies your team before they go elsewhere.',
    'hotlead.p1':       'Buyer details, budget, and location — all in the alert',
    'hotlead.p2':       'Sent to agent via WhatsApp notification',
    'hotlead.p3':       'No lead ever slips past your team again',
    'notif.label':      'NuovaSolution',
    'notif.sender':     '🔥 HOT LEAD — Act now',
    'notif.body':       'Villa buyer · Marbella · €650k budget · Viewing requested · EN',

    /* System Trust */
    'trust.label':      'Always On',
    'trust.headline':   'Built to never miss a serious lead.',
    'trust.sub':        'Every inquiry is captured, understood, prioritized, and followed up automatically. No missed messages. No delays. No manual chaos.',
    'trust.c1.title':   'Replies instantly',
    'trust.c1.text':    'Every lead gets an immediate response, day or night.',
    'trust.c2.title':   'Understands intent',
    'trust.c2.text':    'Buyer, seller, long-term, short-term — classified automatically.',
    'trust.c3.title':   'Works with your process',
    'trust.c3.text':    'Fits into your current inbox, CRM, and team workflow.',
    'trust.c4.title':   'Keeps following up',
    'trust.c4.text':    'If the lead goes quiet, the system continues automatically.',

    /* CTA */
    'cta.label':        'Get Started',
    'cta.headline':     'Ready to stop losing leads?',
    'cta.sub':          'Join agencies that respond faster, qualify better, and close more deals.',
    'cta.primary':      'Book a Demo',
    'cta.whatsapp':     'Chat on WhatsApp',

    /* Footer */
    'footer.tagline':   'AI automation for real estate agencies.',
    'footer.privacy':   'Privacy',
    'footer.contact':   'Contact',
    'footer.copy':      '© 2025 NuovaSolution. All rights reserved.',

    /* Chatbot */
    'chat.greeting':    'Hi! I\'m the NuovaSolution assistant. How can I help you today?',
    'chat.q1':          'How does NuovaSolution work?',
    'chat.q2':          'What agencies is this for?',
    'chat.q3':          'How do I get started?',
    'chat.q4':          'What channels does it support?',
    'chat.a1':          'NuovaSolution connects to your incoming leads — from your website, email, or WhatsApp — and automatically replies, qualifies, and scores each inquiry. High-value leads trigger an immediate agent alert.',
    'chat.a2':          'It\'s built for real estate agencies in Spain — especially those handling inbound inquiries from buyers and sellers in Andalusia, Costa del Sol, and international markets.',
    'chat.a3':          'The easiest way is to book a demo. We\'ll show you exactly how it works for your agency in about 20 minutes.',
    'chat.a4':          'Currently it supports website forms, email inboxes, and WhatsApp — the main channels used by agencies in Spain.',
    'chat.input.placeholder': 'Ask a question...',

    /* UI affordances */
    'ui.swipe':         'Swipe to follow the timeline →',
    'ui.swipe.compare': '← Without / With →',
    'pain.flow.summary': 'Every lead → instantly answered → qualified → only serious clients reach you',
  },

  es: {
    /* Nav */
    'nav.why':        'Por Qué Importa',
    'nav.demo':       'Ver Demo',
    'nav.how':        'Cómo Funciona',
    'nav.benefits':   'Ventajas',
    'nav.cta':        'Reservar Demo',

    /* Hero */
    'hero.label':     'Automatización IA para Inmobiliarias',
    'hero.headline':  'Tu agencia está perdiendo clientes en este momento.',
    'hero.sub':       'NuovaSolution garantiza que cada consulta reciba una respuesta inmediata e inteligente — para que dejes de perder clientes ante competidores más rápidos.',
    'hero.cta1':      'Reservar Demo',
    'hero.cta2':      'Cómo Funciona',
    'hero.trust1':    'Respuestas instantáneas',
    'hero.trust2':    'Puntuación automática',
    'hero.trust3':    'Multilingüe',
    'hero.sub.short': 'Deja de perder leads ante competidores más rápidos.',
    'hero.sys1':      'Cada lead se captura',
    'hero.sys2':      'se responde al instante',
    'hero.sys3':      'se clasifica',
    'hero.sys4':      'solo te llegan clientes serios',

    /* Pain */
    'pain.label':     'El Coste Oculto',
    'pain.headline':  'Lo que ocurre cuando no respondes lo suficientemente rápido.',
    'pain.sub':       'En un mercado competitivo, el tiempo de respuesta marca la diferencia entre ganar o perder un cliente.',
    'pain.step1.time':  'Consulta recibida',
    'pain.step1.label': 'Un comprador contacta con tu agencia',
    'pain.step2.time':  '5 minutos',
    'pain.step2.label': 'Sin respuesta. El cliente sigue esperando.',
    'pain.step3.time':  '30 minutos',
    'pain.step3.label': 'La frustración aumenta. Empieza a buscar de nuevo.',
    'pain.step4.time':  '2 horas',
    'pain.step4.label': 'Contacta con un competidor que responde más rápido.',
    'pain.step5.time':  'Oportunidad perdida',
    'pain.step5.label': 'El cliente se fue. Nunca lo supiste.',
    'pain.stat':        '78%',
    'pain.stat.label':  'de los compradores eligen la primera agencia que responde en serio.',

    /* Speed */
    'speed.label':      'Tiempo = Ingresos',
    'speed.headline':   'La agencia más rápida generalmente gana al cliente.',
    'speed.sub':        'No se trata de ser insistente. Se trata de estar presente en el momento que importa.',
    'speed.before.tag': 'Sin NuovaSolution',
    'speed.before.h':   'Gestión manual del buzón',
    'speed.before.1':   'La consulta llega — permanece sin leer',
    'speed.before.2':   'El agente la ve — horas después',
    'speed.before.3':   'Respuesta manual redactada y enviada',
    'speed.before.4':   'Sin puntuación — todos los leads parecen iguales',
    'speed.before.result': '⚠ El cliente puede haberse marchado ya',
    'speed.after.tag':  'Con NuovaSolution',
    'speed.after.h':    'Respuesta inteligente e instantánea',
    'speed.after.1':    'La consulta llega — el sistema la detecta al instante',
    'speed.after.2':    'Se envía una respuesta instantánea y personalizada',
    'speed.after.3':    'El lead se puntúa y clasifica automáticamente',
    'speed.after.4':    'El agente recibe alerta si el lead es de alto valor',
    'speed.after.result': '✓ El lead está comprometido antes de que los competidores reaccionen',

    /* Demo */
    'demo.label':       'Demo en Vivo',
    'demo.headline':    'Míralo ocurrir en tiempo real.',
    'demo.sub':         'Envía una consulta de muestra y observa cómo NuovaSolution responde, califica y alerta.',
    'demo.panel.title': 'NuovaSolution — Demo en Vivo',
    'demo.input.label': 'Consulta de muestra',
    'demo.preset1':     'Villa en Marbella, €600k',
    'demo.preset2':     'Apartamento en Málaga, €250k',
    'demo.preset3':     'Terreno para desarrollo, Costa del Sol',
    'demo.input.placeholder': 'Escribe una consulta o elige una opción arriba...',
    'demo.run':         'Ver en Acción →',
    'demo.status.analyzing': 'Analizando consulta...',
    'demo.status.replying':  'Generando respuesta...',
    'demo.status.scoring':   'Puntuando lead...',
    'demo.status.alerting':  'Enviando alerta al agente...',
    'demo.reply.label':      'Respuesta NuovaSolution',
    'demo.lead.title':       'Perfil del Lead',
    'demo.score.label':      'Puntuación',
    'demo.alert.text':       'LEAD PRIORITARIO — Notificación enviada al agente',
    'demo.alert.sub':        'Marbella · Villa · €600k+ · Visita solicitada',

    /* How */
    'how.label':        'Proceso Simple',
    'how.headline':     'Cómo funciona.',
    'how.sub':          'Cinco pasos. Sin complejidad. Solo resultados.',
    'how.step1.title':  'Llega la consulta',
    'how.step1.desc':   'Un lead llega por tu web, email o WhatsApp.',
    'how.step2.title':  'Respuesta inmediata',
    'how.step2.desc':   'El sistema responde al instante en el idioma correcto.',
    'how.step3.title':  'Lead clasificado',
    'how.step3.desc':   'La consulta se analiza: presupuesto, ubicación, urgencia, intención.',
    'how.step4.title':  'Alerta inteligente',
    'how.step4.desc':   'Los leads de alto valor generan una notificación inmediata al agente.',
    'how.step5.title':  'El equipo se enfoca',
    'how.step5.desc':   'Tu equipo se concentra en compradores serios — no en gestionar el buzón.',

    /* Benefits */
    'benefits.label':   'Lo Que Ganas',
    'benefits.headline':'Diseñado para agencias que quieren ganar.',
    'benefits.sub':     'Cada función está diseñada para un resultado: capturar más oportunidades.',
    'ben1.title': 'Respuestas Instantáneas',
    'ben1.desc':  'Respuestas automáticas 24/7 — ningún lead espera, ni a medianoche.',
    'ben2.title': 'Calificación de Leads',
    'ben2.desc':  'Cada consulta se analiza automáticamente: presupuesto, ubicación, disposición de compra.',
    'ben3.title': 'Multilingüe',
    'ben3.desc':  'Responde en español, inglés y otros idiomas que usan tus clientes.',
    'ben4.title': 'Alertas de Leads Prioritarios',
    'ben4.desc':  'Los agentes son notificados al instante cuando llega una oportunidad de alto valor.',
    'ben5.title': 'Menos Trabajo de Buzón',
    'ben5.desc':  'Tu equipo deja de gestionar primeras respuestas repetitivas. Foco en conversaciones reales.',
    'ben6.title': 'Más Operaciones Cerradas',
    'ben6.desc':  'Respuesta más rápida + mejor calificación = más operaciones que realmente se cierran.',

    /* Channels */
    'channels.label':   'Tus Canales',
    'channels.headline':'Se adapta a tu forma de trabajar.',
    'channels.sub':     'NuovaSolution funciona con los canales que tu agencia ya usa — sin migraciones.',
    'channel1.name':    'Formulario Web',
    'channel1.desc':    'Respuesta automática inmediata',
    'channel2.name':    'Email',
    'channel2.desc':    'Buzón inteligente',
    'channel3.name':    'WhatsApp',
    'channel3.desc':    'Respuesta conversacional',
    'channels.note':    'Funciona con tu forma actual de comunicarte. Sin reconstruir tu flujo de trabajo.',
    'channels.crm':     'Siempre sincronizado con tu CRM',

    /* Hot Lead */
    'hotlead.label':    'Alertas al Agente',
    'hotlead.headline': 'Sabe al instante cuando aparece un comprador serio.',
    'hotlead.sub':      'No todos los leads son iguales. NuovaSolution identifica los de alto valor y notifica a tu equipo antes de que vayan a otro lugar.',
    'hotlead.p1':       'Detalles del comprador, presupuesto y ubicación — todo en la alerta',
    'hotlead.p2':       'Enviado al agente vía notificación WhatsApp',
    'hotlead.p3':       'Ningún lead se escapa nunca más a tu equipo',
    'notif.label':      'NuovaSolution',
    'notif.sender':     '🔥 LEAD PRIORITARIO — Actúa ahora',
    'notif.body':       'Comprador villa · Marbella · Presupuesto €650k · Visita solicitada · EN',

    /* System Trust */
    'trust.label':      'Siempre Activo',
    'trust.headline':   'Diseñado para no perder nunca un cliente serio.',
    'trust.sub':        'Cada consulta se captura, comprende, prioriza y gestiona automáticamente. Sin mensajes perdidos. Sin retrasos. Sin caos manual.',
    'trust.c1.title':   'Responde al instante',
    'trust.c1.text':    'Cada lead recibe una respuesta inmediata, de día o de noche.',
    'trust.c2.title':   'Entiende la intención',
    'trust.c2.text':    'Comprador, vendedor, largo plazo, corto plazo — clasificado automáticamente.',
    'trust.c3.title':   'Se adapta a tu proceso',
    'trust.c3.text':    'Se integra en tu buzón actual, CRM y flujo de trabajo del equipo.',
    'trust.c4.title':   'Continúa el seguimiento',
    'trust.c4.text':    'Si el lead queda en silencio, el sistema continúa automáticamente.',

    /* CTA */
    'cta.label':        'Empieza Ahora',
    'cta.headline':     '¿Listo para dejar de perder clientes?',
    'cta.sub':          'Únete a las agencias que responden más rápido, califican mejor y cierran más operaciones.',
    'cta.primary':      'Reservar Demo',
    'cta.whatsapp':     'Hablar por WhatsApp',

    /* Footer */
    'footer.tagline':   'Automatización IA para inmobiliarias.',
    'footer.privacy':   'Privacidad',
    'footer.contact':   'Contacto',
    'footer.copy':      '© 2025 NuovaSolution. Todos los derechos reservados.',

    /* Chatbot */
    'chat.greeting':    '¡Hola! Soy el asistente de NuovaSolution. ¿Cómo puedo ayudarte hoy?',
    'chat.q1':          '¿Cómo funciona NuovaSolution?',
    'chat.q2':          '¿Para qué tipo de agencias es esto?',
    'chat.q3':          '¿Cómo puedo empezar?',
    'chat.q4':          '¿Qué canales soporta?',
    'chat.a1':          'NuovaSolution se conecta a tus leads entrantes — desde tu web, email o WhatsApp — y automáticamente responde, califica y puntúa cada consulta. Los leads de alto valor generan una alerta inmediata al agente.',
    'chat.a2':          'Está diseñado para agencias inmobiliarias en España — especialmente las que gestionan consultas entrantes de compradores y vendedores en Andalucía, Costa del Sol y mercados internacionales.',
    'chat.a3':          'La forma más fácil es reservar una demo. Te mostraremos exactamente cómo funciona para tu agencia en unos 20 minutos.',
    'chat.a4':          'Actualmente soporta formularios web, buzones de email y WhatsApp — los canales principales que usan las agencias en España.',
    'chat.input.placeholder': 'Haz una pregunta...',

    /* UI affordances */
    'ui.swipe':         'Desliza para ver la línea de tiempo →',
    'ui.swipe.compare': '← Sin sistema / Con sistema →',
    'pain.flow.summary': 'Cada lead → respuesta inmediata → clasificado → solo llegan clientes serios',
  }
};

let currentLang = 'en';

function setLang(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = translations[lang][key];
    if (text !== undefined) el.placeholder = text;
  });

  // Update active lang button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Notify demo and chatbot of language change
  if (window.NuovaDemo) window.NuovaDemo.reset();
  if (window.NuovaChat) window.NuovaChat.reset(lang);
}

function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

// Init language switchers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Set initial state
  setLang(currentLang);
});

window.NuovaI18n = { setLang, t, getCurrentLang: () => currentLang };
