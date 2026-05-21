'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/language-context';
import { analyzeInput, EXAMPLE_LEADS, type DemoResult, type Temperature } from './demo-engine';

const EASE = [0.22, 1, 0.36, 1] as const;
const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;
const BG = 'linear-gradient(160deg, #0B0E12 0%, #07090C 55%, #0B0E12 100%)';

const CHANNELS = [
  { id: 'WhatsApp',        label: 'WhatsApp',           labelES: 'WhatsApp',             sub: null,                                         subES: null,                                           icon: '💬' },
  { id: 'Email & Portals', label: 'Email & Portals',    labelES: 'Email y Portales',      sub: 'Idealista · Fotocasa · Kyero · ThinkSpain',  subES: 'Idealista · Fotocasa · Kyero · ThinkSpain',   icon: '✉' },
  { id: 'Web Forms',       label: 'Web Forms',          labelES: 'Formularios Web',       sub: 'Contact & website forms',                    subES: 'Formularios de contacto web',                 icon: '📋' },
];

const T_RESPONSE    = 750;
const T_TAG_INTERVAL = 160;

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const TEMP_CFG: Record<Temperature, { color: string; glow: string; label: string; labelES: string }> = {
  hot:  { color: '#FF4848', glow: 'rgba(255,72,72,0.45)',   label: 'HOT LEAD',  labelES: 'LEAD URGENTE' },
  warm: { color: '#F59E0B', glow: 'rgba(245,158,11,0.38)',  label: 'WARM LEAD', labelES: 'LEAD ACTIVO' },
  cold: { color: '#60A5FA', glow: 'rgba(96,165,250,0.28)',  label: 'COLD LEAD', labelES: 'LEAD FRIO' },
};

function getUI(lang: string) {
  if (lang === 'es') return {
    pageLabel:      'Demo en Vivo',
    headlineA:      'Observa cómo la IA',
    headlineB:      'califica',
    headlineC:      'tu consulta.',
    subheadline:    'Pega cualquier consulta inmobiliaria en cualquier idioma. Observa cómo NuovaSolution entiende, califica y responde como lo haría un buen agente.',
    tagline:        'El canal no importa.',
    channelNote:    'Selecciona una fuente de consulta:',
    tryExample:     'Prueba un ejemplo real:',
    placeholder:    'Pega aquí un mensaje de WhatsApp, email o formulario...',
    minChars:       'Mín. 10 caracteres',
    analyze:        'Analizar lead',
    analyzing:      'Analizando...',
    runAgain:       'Repetir',
    insightsLabel:  'Información detectada',
    scoreLabel:     'Puntuación del lead',
    hotAlert:       'LEAD URGENTE — Agente notificado',
    tryAnother:     'Probar otro lead',
    readyLabel:     '¿Listo para su agencia?',
    stopLosing:     'Deje de perder leads.',
    stopLosingBody: 'Reserve una demo y le mostramos el sistema completo en vivo, adaptado a su agencia en la Costa del Sol.',
    bookDemo:       'Reservar demo',
    whatsappUs:     'WhatsApp',
    analysisLabel:  'Análisis IA',
    reading:        'Leyendo consulta...',
    sent:           'Enviado',
    newInquiry:     'Nueva consulta',
    budgetDetected: 'Presupuesto detectado',
    viewingReq:     'Visita solicitada',
    replyReady:     'Respuesta lista',
    formTitle:      'Formulario de contacto',
    formSubmitted:  'Enviado',
    formReply:      'Respuesta automática',
    replyFrom:      'Re: Nueva consulta',
    portalInquiry:  'Consulta de portal',
    emailTagline:   'Cada consulta. Automática. En segundos.',
  };
  return {
    pageLabel:      'Live Demo',
    headlineA:      'Watch the AI',
    headlineB:      'qualify',
    headlineC:      'your lead.',
    subheadline:    'Paste any real estate inquiry in any language. Watch NuovaSolution understand, qualify, and respond the way a great agent would.',
    tagline:        'It does not matter where the lead comes from.',
    channelNote:    'Select a lead source:',
    tryExample:     'Try a real example:',
    placeholder:    'Paste a WhatsApp message, email inquiry, or web form lead here...',
    minChars:       'Min. 10 characters',
    analyze:        'Analyze Lead',
    analyzing:      'Analyzing...',
    runAgain:       'Run Again',
    insightsLabel:  'Insights Detected',
    scoreLabel:     'Lead Score',
    hotAlert:       'HOT LEAD — Agent Alerted',
    tryAnother:     'Try another lead',
    readyLabel:     'Ready for your agency?',
    stopLosing:     'Stop losing leads.',
    stopLosingBody: 'Book a demo and we will show you the full system running live, tailored to your agency on the Costa del Sol.',
    bookDemo:       'Book a Demo',
    whatsappUs:     'WhatsApp Us',
    analysisLabel:  'AI Analysis',
    reading:        'Reading inquiry...',
    sent:           'Sent',
    newInquiry:     'New inquiry',
    budgetDetected: 'Budget detected',
    viewingReq:     'Viewing requested',
    replyReady:     'Reply ready',
    formTitle:      'Contact Form Submission',
    formSubmitted:  'Submitted',
    formReply:      'Automated Reply',
    replyFrom:      'Re: New Inquiry',
    portalInquiry:  'Portal inquiry',
    emailTagline:   'Every inquiry. Automatic. In seconds.',
  };
}

function buildTags(result: DemoResult, lang: string) {
  const tags: { icon: string; label: string }[] = [];
  tags.push({ icon: result.languageFlag, label: result.languageLabel });
  if (result.extracted.name)     tags.push({ icon: '👤', label: result.extracted.name });
  if (result.extracted.location) tags.push({ icon: '📍', label: result.extracted.location });
  if (result.extracted.budget)   tags.push({ icon: '💰', label: result.extracted.budget });
  const prop = [result.extracted.bedrooms, result.extracted.propertyType].filter(Boolean).join(' · ');
  if (prop) tags.push({ icon: '🏠', label: prop });
  if (result.extracted.timeline) tags.push({ icon: '⏳', label: result.extracted.timeline });
  if (result.extracted.viewingRequested) tags.push({
    icon: '👁',
    label: lang === 'es' ? 'Visita solicitada' : 'Viewing requested',
  });
  if (result.extracted.urgency) tags.push({
    icon: '⚡',
    label: lang === 'es' ? 'Urgente' : 'Urgent',
  });
  return tags;
}

// Animated typing dots (WhatsApp style)
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3.5">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.75, 1, 0.75] }}
          transition={{ duration: 1.1, delay: i * 0.2, repeat: Infinity }}
          className="w-2 h-2 rounded-full"
          style={{ background: w(0.5) }}
        />
      ))}
    </div>
  );
}

// Typewriter with stable onDone callback via ref
function Typewriter({
  text, speed = 13, onDone,
}: {
  text: string; speed?: number; onDone?: () => void;
}) {
  const [typed, setTyped] = useState('');
  const [done, setDone]   = useState(false);
  const cbRef = useRef(onDone);
  cbRef.current = onDone;

  useEffect(() => {
    setTyped('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i <= text.length) {
        setTyped(text.slice(0, i));
      } else {
        setDone(true);
        clearInterval(id);
        cbRef.current?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className="whitespace-pre-line">
      {typed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-[1em] ml-0.5 align-middle rounded-full"
          style={{ background: g(0.75) }}
        />
      )}
    </span>
  );
}

// WhatsApp channel view
function WhatsAppView({
  message, result, phase, onTypingDone, ui,
}: {
  message: string;
  result: DemoResult;
  phase: Phase;
  onTypingDone: () => void;
  ui: ReturnType<typeof getUI>;
}) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(37,211,102,0.18)` }}>
      {/* Header bar */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(7,94,84,0.9)', borderBottom: '1px solid rgba(37,211,102,0.12)' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: g(0.18), color: g(1), border: `1px solid ${g(0.25)}` }}
        >
          N
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: w(0.95) }}>NuovaSolution</p>
          <motion.p
            className="text-xs"
            animate={{ color: phase >= 2 ? '#25D366' : 'rgba(255,255,255,0.45)' }}
            transition={{ duration: 0.4 }}
          >
            {phase >= 2 ? ui.sent : 'online'}
          </motion.p>
        </div>
        <span className="text-xs" style={{ color: w(0.3) }}>{timeStr}</span>
      </div>

      {/* Chat area */}
      <div
        className="p-4 space-y-3 min-h-[160px]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 100%)',
        }}
      >
        {/* Client message — right aligned */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex justify-end"
        >
          <div
            className="max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
            style={{
              background: 'rgba(37,211,102,0.12)',
              border: '1px solid rgba(37,211,102,0.2)',
              color: w(0.9),
            }}
          >
            {message}
            <div className="flex justify-end mt-1">
              <span className="text-xs" style={{ color: w(0.3) }}>{timeStr}</span>
            </div>
          </div>
        </motion.div>

        {/* Typing indicator — left aligned */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div
                className="rounded-2xl rounded-tl-sm"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: `1px solid ${w(0.09)}`,
                }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent reply — left aligned */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-start"
          >
            <div
              className="max-w-[88%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${w(0.1)}`,
                color: w(0.9),
              }}
            >
              <Typewriter text={result.aiResponse} speed={11} onDone={onTypingDone} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Email & Portals channel view
function EmailView({
  message, source, result, phase, onTypingDone, ui,
}: {
  message: string;
  source: string;
  result: DemoResult;
  phase: Phase;
  onTypingDone: () => void;
  ui: ReturnType<typeof getUI>;
}) {
  const portalFromMsg = /idealista/i.test(message) ? 'Idealista'
    : /fotocasa/i.test(message) ? 'Fotocasa'
    : /kyero/i.test(message) ? 'Kyero'
    : /thinkspain/i.test(message) ? 'ThinkSpain'
    : null;
  const portal = portalFromMsg ?? (source === 'Email & Portals' ? 'Portal' : 'Email');

  const subject = result.extracted.location
    ? `${result.leadTypeLabel} · ${result.extracted.location}`
    : result.leadTypeLabel;

  const emailTags: { label: string; hot?: boolean }[] = [{ label: ui.newInquiry }];
  if (result.extracted.budget)          emailTags.push({ label: ui.budgetDetected });
  if (result.extracted.viewingRequested) emailTags.push({ label: ui.viewingReq });
  if (phase >= 2)                        emailTags.push({ label: ui.replyReady, hot: true });

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-3">
      {/* Incoming message card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${w(0.08)}` }}>
        {/* Email header */}
        <div
          className="px-5 pt-4 pb-3"
          style={{ borderBottom: `1px solid ${w(0.06)}`, background: 'rgba(255,255,255,0.025)' }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-semibold"
                style={{
                  background: 'rgba(99,102,241,0.14)',
                  color: 'rgba(165,180,252,0.85)',
                  border: '1px solid rgba(99,102,241,0.22)',
                }}
              >
                {portal.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: w(0.75) }}>
                  {portal !== 'Email' ? `${portal}` : ui.portalInquiry}
                </p>
                <p className="text-xs" style={{ color: w(0.3) }}>
                  {portal !== 'Email' && portal !== 'Portal' ? `inquiry@${portal.toLowerCase()}.com` : 'lead@email.com'}
                </p>
              </div>
            </div>
            <span className="text-xs shrink-0 mt-0.5" style={{ color: w(0.25) }}>{timeStr}</span>
          </div>

          <p className="text-sm font-semibold mb-3" style={{ color: w(0.88) }}>{subject}</p>

          {/* Email tags */}
          <div className="flex flex-wrap gap-1.5">
            {emailTags.map(tag => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: tag.hot ? 'rgba(37,211,102,0.1)' : g(0.06),
                  color:      tag.hot ? '#25D366' : g(0.65),
                  border:     `1px solid ${tag.hot ? 'rgba(37,211,102,0.2)' : g(0.1)}`,
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Email body */}
        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed" style={{ color: w(0.7) }}>{message}</p>
        </div>
      </div>

      {/* Scanning indicator */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: g(0.65) }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: w(0.3) }}>{ui.reading}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply card */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${g(0.18)}` }}
        >
          {/* Reply header */}
          <div
            className="flex items-center gap-2.5 px-5 py-3"
            style={{ borderBottom: `1px solid ${w(0.06)}`, background: 'rgba(214,180,122,0.03)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: g(0.14), color: g(1), border: `1px solid ${g(0.2)}` }}
            >
              L
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: g(0.9) }}>Laura — NuovaSolution</p>
              <p className="text-xs" style={{ color: w(0.28) }}>{ui.replyFrom}</p>
            </div>
          </div>

          {/* Reply body */}
          <div className="px-5 py-4">
            <p className="text-sm leading-relaxed" style={{ color: w(0.88) }}>
              <Typewriter text={result.aiResponse} speed={15} onDone={onTypingDone} />
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Web Forms channel view
function WebFormView({
  message, result, phase, onTypingDone, ui,
}: {
  message: string;
  result: DemoResult;
  phase: Phase;
  onTypingDone: () => void;
  ui: ReturnType<typeof getUI>;
}) {
  const { name, budget, location } = result.extracted;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-3">
      {/* Form card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${w(0.08)}` }}>
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: `1px solid ${w(0.06)}`, background: 'rgba(255,255,255,0.025)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: w(0.4) }}>📋</span>
            <p className="text-xs font-medium" style={{ color: w(0.65) }}>{ui.formTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: w(0.25) }}>{timeStr}</span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: 'rgba(37,211,102,0.1)',
                color: '#25D366',
                border: '1px solid rgba(37,211,102,0.2)',
              }}
            >
              ✓ {ui.formSubmitted}
            </span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          {name && (
            <div>
              <p className="text-xs mb-1.5" style={{ color: w(0.3) }}>Name</p>
              <div
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${w(0.06)}`, color: w(0.82) }}
              >
                {name}
              </div>
            </div>
          )}
          {location && (
            <div>
              <p className="text-xs mb-1.5" style={{ color: w(0.3) }}>Location interest</p>
              <div
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${w(0.06)}`, color: w(0.82) }}
              >
                {location}
              </div>
            </div>
          )}
          {budget && (
            <div>
              <p className="text-xs mb-1.5" style={{ color: w(0.3) }}>Budget</p>
              <div
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${w(0.06)}`, color: w(0.82) }}
              >
                {budget}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs mb-1.5" style={{ color: w(0.3) }}>Message</p>
            <div
              className="px-3 py-2 rounded-lg text-sm leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${w(0.06)}`, color: w(0.7) }}
            >
              {message}
            </div>
          </div>
        </div>
      </div>

      {/* Scanning indicator */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: g(0.65) }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: w(0.3) }}>{ui.reading}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply card */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${g(0.18)}` }}
        >
          <div
            className="flex items-center gap-2.5 px-5 py-3"
            style={{ borderBottom: `1px solid ${w(0.06)}`, background: 'rgba(214,180,122,0.03)' }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: g(0.14), color: g(1) }}
            >
              L
            </div>
            <p className="text-xs font-medium" style={{ color: g(0.85) }}>
              Laura — NuovaSolution · {ui.formReply}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm leading-relaxed" style={{ color: w(0.88) }}>
              <Typewriter text={result.aiResponse} speed={14} onDone={onTypingDone} />
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Score ring with RAF animation
function ScoreRing({ score, temperature, lang }: { score: number; temperature: Temperature; lang: string }) {
  const [display, setDisplay] = useState(0);
  const tc   = TEMP_CFG[temperature];
  const R    = 52;
  const circ = 2 * Math.PI * R;

  useEffect(() => {
    const dur   = 1900;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const badge = lang === 'es' ? tc.labelES : tc.label;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: EASE }}
      className="flex flex-col items-center"
    >
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={R} fill="none" stroke={w(0.06)} strokeWidth="7" />
          <circle
            cx="64" cy="64" r={R} fill="none"
            stroke={tc.color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - display / 100)}
            style={{ filter: `drop-shadow(0 0 8px ${tc.color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display text-6xl font-bold leading-none"
            style={{ color: tc.color, textShadow: `0 0 32px ${tc.glow}` }}
          >
            {display}
          </span>
          <span className="text-xs mt-1.5" style={{ color: w(0.3) }}>/100</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
        className="mt-4 px-5 py-2 rounded-full text-xs font-bold tracking-widest"
        style={{
          background: `${tc.color}18`,
          color: tc.color,
          border: `1px solid ${tc.color}40`,
        }}
      >
        {badge}
      </motion.div>
    </motion.div>
  );
}

// Main component
export default function LiveDemoClient() {
  const { lang } = useTranslation();
  const ui = getUI(lang);

  const [message,     setMessage]     = useState('');
  const [source,      setSource]      = useState('WhatsApp');
  const [phase,       setPhase]       = useState<Phase>(0);
  const [result,      setResult]      = useState<DemoResult | null>(null);
  const [visibleTags, setVisibleTags] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resultRef  = useRef<DemoResult | null>(null);

  const isRunning = phase > 0 && phase < 5;
  const canRun    = message.trim().length >= 10 && !isRunning;
  const tags      = result ? buildTags(result, lang) : [];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    resultRef.current = null;
    setPhase(0);
    setResult(null);
    setVisibleTags(0);
  }, [clearTimers]);

  // Called by Typewriter when it finishes — triggers insights, score, done
  const handleTypingDone = useCallback(() => {
    const r   = resultRef.current;
    const tgs = r ? buildTags(r, lang) : [];
    const n   = tgs.length;

    schedule(() => setPhase(3), 300);
    for (let i = 0; i < n; i++) {
      schedule(() => setVisibleTags(i + 1), 350 + i * T_TAG_INTERVAL);
    }
    const allTagsMs = 350 + n * T_TAG_INTERVAL;
    schedule(() => setPhase(4), allTagsMs + 500);
    schedule(() => setPhase(5), allTagsMs + 1700);
  }, [lang, schedule]);

  const runDemo = useCallback(() => {
    if (!canRun) return;
    clearTimers();
    const computed = analyzeInput(message, source);
    resultRef.current = computed;
    setResult(computed);
    setVisibleTags(0);
    setPhase(1);
    schedule(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    schedule(() => setPhase(2), T_RESPONSE);
  }, [message, source, canRun, clearTimers, schedule]);

  const loadExample = useCallback((ex: typeof EXAMPLE_LEADS[0]) => {
    reset();
    setMessage(ex.message);
    setSource(ex.source);
  }, [reset]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 text-center overflow-hidden">
        <div
          className="aurora-blob w-[700px] h-[440px] -top-44 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(214,180,122,0.07) 0%, transparent 70%)' }}
        />
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {ui.pageLabel}
        </motion.p>
        <motion.h1
          className="font-display font-bold leading-tight mb-4 max-w-2xl mx-auto"
          style={{ color: w(0.96), fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.07, ease: EASE }}
        >
          {ui.headlineA}{' '}
          <span style={{ color: g(1) }}>{ui.headlineB}</span>{' '}
          {ui.headlineC}
        </motion.h1>
        <motion.p
          className="text-base max-w-lg mx-auto"
          style={{ color: w(0.44) }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          {ui.subheadline}
        </motion.p>
      </section>

      {/* Input area */}
      <section className="px-6 pb-8 max-w-2xl mx-auto">

        {/* Channel selector */}
        <motion.div
          className="mb-7"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          <p className="text-sm font-medium text-center mb-5" style={{ color: g(0.55) }}>
            {ui.tagline}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {CHANNELS.map(ch => {
              const active = source === ch.id;
              const label  = lang === 'es' ? ch.labelES : ch.label;
              const sub    = lang === 'es' ? ch.subES   : ch.sub;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSource(ch.id)}
                  className="rounded-xl border transition-all duration-200 px-3 py-3.5 text-center"
                  style={{
                    background: active ? g(0.07)                    : 'rgba(255,255,255,0.025)',
                    border:     active ? `1px solid ${g(0.28)}`     : `1px solid ${w(0.06)}`,
                    boxShadow:  active ? `0 0 20px ${g(0.06)}`      : 'none',
                  }}
                >
                  <span className="text-xl block mb-1.5">{ch.icon}</span>
                  <span className="text-xs font-semibold block leading-snug" style={{ color: active ? g(1) : w(0.55) }}>
                    {label}
                  </span>
                  {sub && (
                    <span
                      className="text-xs block leading-snug mt-1"
                      style={{ color: active ? g(0.42) : w(0.2), fontSize: '0.65rem' }}
                    >
                      {sub}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Example chips */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
        >
          <p className="text-xs mb-3" style={{ color: w(0.24) }}>{ui.tryExample}</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_LEADS.map(ex => {
              const active = message === ex.message;
              return (
                <button
                  key={ex.label}
                  onClick={() => loadExample(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    background: active ? g(0.1)              : 'rgba(255,255,255,0.03)',
                    border:     active ? `1px solid ${g(0.3)}` : `1px solid ${w(0.07)}`,
                    color:      active ? g(1)                : w(0.4),
                  }}
                >
                  {ex.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Textarea card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${w(0.07)}`,
            backdropFilter: 'blur(16px)',
          }}
        >
          <textarea
            value={message}
            onChange={e => {
              setMessage(e.target.value);
              if (phase > 0 && phase < 5) reset();
            }}
            placeholder={ui.placeholder}
            rows={4}
            className="w-full resize-none rounded-xl p-4 text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${w(0.06)}`,
              color: w(0.9),
              caretColor: g(1),
              lineHeight: '1.65',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = g(0.35);
              e.currentTarget.style.boxShadow  = `0 0 0 3px ${g(0.05)}`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = w(0.06);
              e.currentTarget.style.boxShadow  = 'none';
            }}
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs" style={{ color: w(0.2) }}>
              {message.trim().length === 0 ? ui.minChars : `${message.trim().length} chars`}
            </span>
            <button
              onClick={runDemo}
              disabled={!canRun}
              className="btn btn-gold btn-sm flex items-center gap-2"
              style={{ opacity: canRun ? 1 : 0.35, cursor: canRun ? 'pointer' : 'not-allowed' }}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-3.5 h-3.5 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: '#1A1A1A' }}
                  />
                  {ui.analyzing}
                </>
              ) : phase === 5 ? ui.runAgain : ui.analyze}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {phase >= 1 && result && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="px-6 pb-24 max-w-2xl mx-auto"
          >
            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: w(0.06) }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: g(0.45) }}>
                {ui.analysisLabel}
              </span>
              <div className="flex-1 h-px" style={{ background: w(0.06) }} />
            </div>

            {/* Channel-specific conversation display (FIRST — response before score) */}
            <div className="mb-10">
              {source === 'WhatsApp' && (
                <WhatsAppView
                  message={message}
                  result={result}
                  phase={phase}
                  onTypingDone={handleTypingDone}
                  ui={ui}
                />
              )}
              {source === 'Email & Portals' && (
                <EmailView
                  message={message}
                  source={source}
                  result={result}
                  phase={phase}
                  onTypingDone={handleTypingDone}
                  ui={ui}
                />
              )}
              {source === 'Web Forms' && (
                <WebFormView
                  message={message}
                  result={result}
                  phase={phase}
                  onTypingDone={handleTypingDone}
                  ui={ui}
                />
              )}
            </div>

            {/* Insights */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mb-10"
              >
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: g(0.45) }}>
                  {ui.insightsLabel}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {tags.slice(0, visibleTags).map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.82, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: 'rgba(255,255,255,0.055)',
                        border: `1px solid ${w(0.09)}`,
                        color: w(0.88),
                      }}
                    >
                      <span className="text-base leading-none">{tag.icon}</span>
                      <span>{tag.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Score */}
            {phase >= 4 && (
              <div className="mb-10 flex flex-col items-center">
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: g(0.45) }}>
                  {ui.scoreLabel}
                </p>
                <ScoreRing score={result.score} temperature={result.temperature} lang={lang} />
              </div>
            )}

            {/* Hot alert */}
            {phase >= 5 && result.temperature === 'hot' && result.alertSnippet && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mb-10 rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.10), rgba(220,38,38,0.04))',
                  border: '1px solid rgba(220,38,38,0.28)',
                  boxShadow: '0 0 40px rgba(220,38,38,0.08)',
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.span
                    animate={{ scale: [1, 1.14, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-2xl shrink-0"
                  >
                    🔥
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ color: '#FF5555' }}>
                      {lang === 'es' ? 'LEAD URGENTE — Agente notificado' : ui.hotAlert}
                    </p>
                    <p className="text-sm truncate" style={{ color: w(0.48) }}>
                      {result.alertSnippet}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(37,211,102,0.12)',
                      color: '#25D366',
                      border: '1px solid rgba(37,211,102,0.22)',
                    }}
                  >
                    WhatsApp ✓
                  </span>
                </div>
              </motion.div>
            )}

            {/* Done state */}
            {phase === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pt-2">
                  <p className="text-sm text-center sm:text-left" style={{ color: w(0.28) }}>
                    {ui.emailTagline}
                  </p>
                  <button onClick={reset} className="btn btn-ghost btn-sm shrink-0">
                    {ui.tryAnother}
                  </button>
                </div>

                <div
                  className="rounded-2xl p-8 md:p-10 text-center"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${g(0.12)}` }}
                >
                  <p className="section-label mb-3">{ui.readyLabel}</p>
                  <h2
                    className="font-display font-bold mb-4"
                    style={{ color: w(0.96), fontSize: 'clamp(1.7rem, 4vw, 2.6rem)' }}
                  >
                    {ui.stopLosing}
                  </h2>
                  <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: w(0.38) }}>
                    {ui.stopLosingBody}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/#contact" className="btn btn-gold btn-md">{ui.bookDemo}</a>
                    <a
                      href="https://wa.me/34600000000"
                      className="btn btn-ghost btn-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ui.whatsappUs}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
