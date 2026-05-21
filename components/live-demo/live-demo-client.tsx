'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/language-context';
import {
  analyzeInput, getRecommendedAction, generateFollowUp,
  EXAMPLE_LEADS, type DemoResult, type Temperature,
} from './demo-engine';

const EASE = [0.22, 1, 0.36, 1] as const;
const g  = (a: number) => `rgba(210,172,98,${a})`;   // warmer gold
const w  = (a: number) => `rgba(255,255,255,${a})`;
const BG = 'linear-gradient(160deg, #09090C 0%, #060608 55%, #09090C 100%)';

const CHANNELS = [
  { id: 'WhatsApp',        label: 'WhatsApp',        labelES: 'WhatsApp',           sub: null,                                        subES: null,                                  icon: '💬' },
  { id: 'Email & Portals', label: 'Email & Portals', labelES: 'Email y Portales',   sub: 'Idealista · Fotocasa · Kyero · ThinkSpain', subES: 'Idealista · Fotocasa · Kyero',        icon: '✉' },
  { id: 'Web Forms',       label: 'Web Forms',       labelES: 'Formularios Web',    sub: 'Contact & website forms',                   subES: 'Formularios de contacto web',         icon: '📋' },
];

const T_RESPONSE     = 750;
const T_ROW_INTERVAL = 150;

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const TEMP_CFG: Record<Temperature, { color: string; glow: string; label: string; labelES: string }> = {
  hot:  { color: '#F05050', glow: 'rgba(240,80,80,0.4)',    label: 'HOT LEAD',  labelES: 'LEAD URGENTE' },
  warm: { color: '#D4941A', glow: 'rgba(212,148,26,0.35)',  label: 'WARM LEAD', labelES: 'LEAD ACTIVO'  },
  cold: { color: '#6B9EC8', glow: 'rgba(107,158,200,0.28)', label: 'COLD LEAD', labelES: 'LEAD FRÍO'    },
};

const FOLLOW_UP_EXAMPLES: Record<string, string[]> = {
  en: ['March', 'Near the beach', '€500k budget'],
  es: ['Marzo', 'Cerca de la playa', 'Presupuesto €500k'],
};

// ─── UI copy ──────────────────────────────────────────────────────────────────

function getUI(lang: string) {
  if (lang === 'es') return {
    pageLabel:        'Demo en Vivo',
    headlineA:        'Observa cómo la IA',
    headlineB:        'califica',
    headlineC:        'tu consulta.',
    subheadline:      'Pega cualquier consulta inmobiliaria en cualquier idioma. Observa cómo NuovaSolution entiende, califica y responde como lo haría un buen agente.',
    tagline:          'El canal no importa.',
    channelNote:      'Selecciona una fuente de consulta:',
    tryExample:       'Prueba un ejemplo real:',
    placeholder:      'Pega aquí un mensaje de WhatsApp, email o formulario...',
    minChars:         'Mín. 10 caracteres',
    analyze:          'Analizar lead',
    analyzing:        'Analizando...',
    runAgain:         'Repetir',
    insightsLabel:    'Inteligencia del lead',
    scoreLabel:       'Puntuación del lead',
    hotAlert:         'LEAD URGENTE — Agente notificado',
    tryAnother:       'Probar otro lead',
    readyLabel:       '¿Listo para su agencia?',
    stopLosing:       'Deje de perder leads.',
    stopLosingBody:   'Reserve una demo y le mostramos el sistema completo en vivo, adaptado a su agencia en la Costa del Sol.',
    bookDemo:         'Reservar demo',
    whatsappUs:       'WhatsApp',
    analysisLabel:    'Análisis IA',
    reading:          'Leyendo consulta...',
    sent:             'Enviado',
    newInquiry:       'Nueva consulta',
    budgetDetected:   'Presupuesto detectado',
    viewingReq:       'Visita solicitada',
    replyReady:       'Respuesta lista',
    formTitle:        'Formulario de contacto',
    formSubmitted:    'Enviado',
    formReply:        'Respuesta automática',
    replyFrom:        'Re: Nueva consulta',
    portalInquiry:    'Consulta de portal',
    emailTagline:     'Cada consulta. Automática. En segundos.',
    // Insights grid labels
    fieldLanguage:    'Idioma',
    fieldLeadType:    'Tipo de lead',
    fieldName:        'Nombre',
    fieldBudget:      'Presupuesto',
    fieldLocation:    'Ubicación',
    fieldTimeline:    'Plazo',
    fieldViewing:     'Visita',
    fieldUrgency:     'Urgencia',
    requested:        'Solicitada',
    high:             'Alta',
    // CRM card
    crmUpdated:       'CRM actualizado',
    crmNow:           'Ahora mismo',
    fieldPriority:    'Prioridad',
    fieldScore:       'Puntuación',
    // Recommended action
    recommendedTitle: 'Acción recomendada',
    actNow:           'Actuar ahora',
    actSoon:          'Pronto',
    actFollowUp:      'Seguimiento',
    // WhatsApp follow-up
    followUpLabel:    'Continuar la conversación',
    followUpSend:     'Enviar',
    followUpHint:     'El cliente responde...',
  };

  return {
    pageLabel:        'Live Demo',
    headlineA:        'Watch the AI',
    headlineB:        'qualify',
    headlineC:        'your lead.',
    subheadline:      'Paste any real estate inquiry in any language. Watch NuovaSolution understand, qualify, and respond the way a great agent would.',
    tagline:          'It does not matter where the lead comes from.',
    channelNote:      'Select a lead source:',
    tryExample:       'Try a real example:',
    placeholder:      'Paste a WhatsApp message, email inquiry, or web form lead here...',
    minChars:         'Min. 10 characters',
    analyze:          'Analyze Lead',
    analyzing:        'Analyzing...',
    runAgain:         'Run Again',
    insightsLabel:    'Lead Intelligence',
    scoreLabel:       'Lead Score',
    hotAlert:         'HOT LEAD — Agent Alerted',
    tryAnother:       'Try another lead',
    readyLabel:       'Ready for your agency?',
    stopLosing:       'Stop losing leads.',
    stopLosingBody:   'Book a demo and we will show you the full system running live, tailored to your agency on the Costa del Sol.',
    bookDemo:         'Book a Demo',
    whatsappUs:       'WhatsApp Us',
    analysisLabel:    'AI Analysis',
    reading:          'Reading inquiry...',
    sent:             'Sent',
    newInquiry:       'New inquiry',
    budgetDetected:   'Budget detected',
    viewingReq:       'Viewing requested',
    replyReady:       'Reply ready',
    formTitle:        'Contact Form Submission',
    formSubmitted:    'Submitted',
    formReply:        'Automated Reply',
    replyFrom:        'Re: New Inquiry',
    portalInquiry:    'Portal inquiry',
    emailTagline:     'Every inquiry. Automatic. In seconds.',
    // Insights grid labels
    fieldLanguage:    'Language',
    fieldLeadType:    'Lead Type',
    fieldName:        'Name',
    fieldBudget:      'Budget',
    fieldLocation:    'Location',
    fieldTimeline:    'Timeline',
    fieldViewing:     'Viewing',
    fieldUrgency:     'Urgency',
    requested:        'Requested',
    high:             'High',
    // CRM card
    crmUpdated:       'CRM Updated',
    crmNow:           'Just now',
    fieldPriority:    'Priority',
    fieldScore:       'Score',
    // Recommended action
    recommendedTitle: 'Recommended Action',
    actNow:           'Act now',
    actSoon:          'Soon',
    actFollowUp:      'Follow-up',
    // WhatsApp follow-up
    followUpLabel:    'Continue the conversation',
    followUpSend:     'Send',
    followUpHint:     'Client replies...',
  };
}

// ─── Insights rows ─────────────────────────────────────────────────────────────

function buildInsightRows(result: DemoResult, ui: ReturnType<typeof getUI>, lang: string) {
  const rows: { label: string; value: string }[] = [];
  rows.push({ label: ui.fieldLanguage, value: `${result.languageFlag} ${result.languageLabel}` });
  rows.push({ label: ui.fieldLeadType, value: result.leadTypeLabel });
  if (result.extracted.name)             rows.push({ label: ui.fieldName,     value: result.extracted.name });
  if (result.extracted.budget)           rows.push({ label: ui.fieldBudget,   value: result.extracted.budget });
  if (result.extracted.location)         rows.push({ label: ui.fieldLocation, value: result.extracted.location });
  if (result.extracted.timeline)         rows.push({ label: ui.fieldTimeline, value: result.extracted.timeline });
  if (result.extracted.viewingRequested) rows.push({ label: ui.fieldViewing,  value: ui.requested });
  if (result.extracted.urgency)          rows.push({ label: ui.fieldUrgency,  value: ui.high });
  return rows;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3.5">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.75, 1, 0.75] }}
          transition={{ duration: 1.1, delay: i * 0.2, repeat: Infinity }}
          className="w-2 h-2 rounded-full"
          style={{ background: w(0.45) }}
        />
      ))}
    </div>
  );
}

function Typewriter({ text, speed = 13, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [typed, setTyped] = useState('');
  const [done,  setDone]  = useState(false);
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
          style={{ background: g(0.7) }}
        />
      )}
    </span>
  );
}

function InsightsGrid({ rows, visibleCount }: { rows: { label: string; value: string }[]; visibleCount: number }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${w(0.07)}`, background: 'rgba(255,255,255,0.015)' }}
    >
      {rows.slice(0, visibleCount).map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex items-center justify-between px-5 py-3"
          style={{
            borderBottom: i < visibleCount - 1 && i < rows.length - 1
              ? `1px solid ${w(0.045)}`
              : 'none',
            background: i % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'transparent',
          }}
        >
          <span className="text-xs" style={{ color: w(0.32) }}>{row.label}</span>
          <span className="text-sm font-medium" style={{ color: w(0.84) }}>{row.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function CrmUpdateCard({
  result, lang, ui,
}: {
  result: DemoResult;
  lang: string;
  ui: ReturnType<typeof getUI>;
}) {
  const tc = TEMP_CFG[result.temperature];
  const priorityLabel = lang === 'es' ? tc.labelES : tc.label;
  const scoreFmt = `${result.score}/100`;

  const rows = [
    { label: ui.fieldLeadType, value: result.leadClassLabel },
    result.extracted.name     ? { label: ui.fieldName,     value: result.extracted.name }     : null,
    result.extracted.location ? { label: ui.fieldLocation, value: result.extracted.location } : null,
    result.extracted.budget   ? { label: ui.fieldBudget,   value: result.extracted.budget }   : null,
    result.extracted.timeline ? { label: ui.fieldTimeline, value: result.extracted.timeline } : null,
    { label: ui.fieldPriority, value: priorityLabel },
    { label: ui.fieldScore,    value: scoreFmt },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${w(0.065)}` }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${w(0.045)}`, background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#22C55E' }}
          />
          <span className="text-xs font-medium" style={{ color: g(0.75) }}>{ui.crmUpdated}</span>
        </div>
        <span className="text-xs" style={{ color: w(0.22) }}>{ui.crmNow}</span>
      </div>
      <div className="px-5 py-4 space-y-2.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: w(0.3) }}>{row.label}</span>
            <span
              className="text-xs font-semibold"
              style={{ color: row.label === ui.fieldPriority ? tc.color : w(0.78) }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RecommendedActionCard({
  action, lang, ui,
}: {
  action: { title: string; body: string; urgency: 'immediate' | 'soon' | 'low' };
  lang: string;
  ui: ReturnType<typeof getUI>;
}) {
  const urgencyColor  = action.urgency === 'immediate' ? '#F05050' : action.urgency === 'soon' ? '#D4941A' : w(0.38);
  const urgencyLabel  = action.urgency === 'immediate' ? ui.actNow : action.urgency === 'soon' ? ui.actSoon : ui.actFollowUp;
  const urgencyIcon   = action.urgency === 'immediate' ? '⚡' : action.urgency === 'soon' ? '📋' : '🔄';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded-xl p-4"
      style={{ background: 'rgba(255,255,255,0.018)', border: `1px solid ${w(0.065)}` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${urgencyColor}18`, border: `1px solid ${urgencyColor}28` }}
        >
          <span className="text-sm">{urgencyIcon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <p className="text-sm font-semibold" style={{ color: w(0.9) }}>{action.title}</p>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${urgencyColor}18`, color: urgencyColor }}
            >
              {urgencyLabel}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: w(0.42) }}>{action.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── WhatsApp channel view ─────────────────────────────────────────────────────

function WhatsAppView({
  message, result, phase, onTypingDone, ui, lang,
  followUpMsg, followUpResp, followUpPhase,
  onFollowUpChange, onFollowUpSend,
}: {
  message: string;
  result: DemoResult;
  phase: Phase;
  onTypingDone: () => void;
  ui: ReturnType<typeof getUI>;
  lang: string;
  followUpMsg: string;
  followUpResp: string | null;
  followUpPhase: 0 | 1 | 2;
  onFollowUpChange: (v: string) => void;
  onFollowUpSend: (msg: string) => void;
}) {
  const timeStr   = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const examples  = FOLLOW_UP_EXAMPLES[lang] ?? FOLLOW_UP_EXAMPLES.en;
  const showInput = phase === 5 && followUpPhase === 0;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(37,211,102,0.15)' }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: 'rgba(7,94,84,0.88)', borderBottom: '1px solid rgba(37,211,102,0.1)' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: g(0.16), color: g(1), border: `1px solid ${g(0.22)}` }}
        >
          N
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: w(0.95) }}>NuovaSolution</p>
          <motion.p
            className="text-xs"
            animate={{ color: phase >= 2 ? '#25D366' : 'rgba(255,255,255,0.4)' }}
            transition={{ duration: 0.4 }}
          >
            {phase >= 2 ? ui.sent : 'online'}
          </motion.p>
        </div>
        <span className="text-xs" style={{ color: w(0.28) }}>{timeStr}</span>
      </div>

      {/* Chat area */}
      <div
        className="p-4 space-y-3 min-h-[160px]"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.06) 100%)' }}
      >
        {/* Client message — right */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex justify-end"
        >
          <div
            className="max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
            style={{
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.18)',
              color: w(0.9),
            }}
          >
            {message}
            <div className="flex justify-end mt-1">
              <span className="text-xs" style={{ color: w(0.28) }}>{timeStr}</span>
            </div>
          </div>
        </motion.div>

        {/* Typing indicator */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div
                className="rounded-2xl rounded-tl-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${w(0.08)}` }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent reply — left */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-start"
          >
            <div
              className="max-w-[88%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${w(0.09)}`, color: w(0.9) }}
            >
              <Typewriter text={result.aiResponse} speed={11} onDone={onTypingDone} />
            </div>
          </motion.div>
        )}

        {/* Follow-up: user message */}
        {followUpMsg && followUpPhase >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex justify-end"
          >
            <div
              className="max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
              style={{
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.18)',
                color: w(0.9),
              }}
            >
              {followUpMsg}
            </div>
          </motion.div>
        )}

        {/* Follow-up: typing */}
        <AnimatePresence>
          {followUpPhase === 1 && (
            <motion.div
              key="fup-typing"
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div
                className="rounded-2xl rounded-tl-sm"
                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${w(0.08)}` }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up: agent reply */}
        {followUpPhase === 2 && followUpResp && (
          <motion.div
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-start"
          >
            <div
              className="max-w-[88%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${w(0.09)}`, color: w(0.9) }}
            >
              <Typewriter text={followUpResp} speed={11} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Follow-up input bar — only when phase 5 and not yet sent */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            key="fup-input"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}
            style={{ borderTop: `1px solid ${w(0.07)}` }}
          >
            <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
              {examples.map(ex => (
                <button
                  key={ex}
                  onClick={() => onFollowUpSend(ex)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{
                    background: 'rgba(37,211,102,0.07)',
                    border: '1px solid rgba(37,211,102,0.18)',
                    color: 'rgba(37,211,102,0.8)',
                  }}
                >
                  {ex}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 pb-3">
              <input
                type="text"
                value={followUpMsg}
                onChange={e => onFollowUpChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && followUpMsg.trim() && onFollowUpSend(followUpMsg)}
                placeholder={ui.followUpHint}
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${w(0.08)}`,
                  color: w(0.85),
                  caretColor: g(1),
                }}
              />
              <button
                onClick={() => followUpMsg.trim() && onFollowUpSend(followUpMsg)}
                disabled={!followUpMsg.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity"
                style={{
                  background: 'rgba(37,211,102,0.2)',
                  border: '1px solid rgba(37,211,102,0.28)',
                  opacity: followUpMsg.trim() ? 1 : 0.4,
                }}
              >
                <span className="text-sm">↑</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Email & Portals channel view ──────────────────────────────────────────────

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
    : /fotocasa/i.test(message)  ? 'Fotocasa'
    : /kyero/i.test(message)     ? 'Kyero'
    : /thinkspain/i.test(message) ? 'ThinkSpain'
    : null;
  const portal = portalFromMsg ?? (source === 'Email & Portals' ? 'Portal' : 'Email');

  const subject = result.extracted.location
    ? `${result.leadClassLabel} · ${result.extracted.location}`
    : result.leadClassLabel;

  const emailTags: { label: string; accent?: boolean }[] = [
    { label: result.leadClassLabel, accent: true },
    { label: ui.newInquiry },
  ];
  if (result.extracted.budget)          emailTags.push({ label: ui.budgetDetected });
  if (result.extracted.viewingRequested) emailTags.push({ label: ui.viewingReq });
  if (phase >= 2)                        emailTags.push({ label: ui.replyReady });

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-3">
      {/* Incoming message */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${w(0.075)}` }}>
        <div
          className="px-5 pt-4 pb-3"
          style={{ borderBottom: `1px solid ${w(0.055)}`, background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-semibold"
                style={{
                  background: 'rgba(99,102,241,0.12)',
                  color: 'rgba(165,180,252,0.8)',
                  border: '1px solid rgba(99,102,241,0.2)',
                }}
              >
                {portal.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: w(0.72) }}>
                  {portal !== 'Email' ? portal : ui.portalInquiry}
                </p>
                <p className="text-xs" style={{ color: w(0.28) }}>
                  {portal !== 'Email' && portal !== 'Portal'
                    ? `inquiry@${portal.toLowerCase()}.com`
                    : 'lead@email.com'}
                </p>
              </div>
            </div>
            <span className="text-xs shrink-0 mt-0.5" style={{ color: w(0.22) }}>{timeStr}</span>
          </div>

          <p className="text-sm font-semibold mb-3" style={{ color: w(0.88) }}>{subject}</p>

          <div className="flex flex-wrap gap-1.5">
            {emailTags.map(tag => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: tag.accent ? g(0.1)            : 'rgba(255,255,255,0.04)',
                  color:      tag.accent ? g(0.9)            : w(0.45),
                  border:     tag.accent ? `1px solid ${g(0.2)}` : `1px solid ${w(0.07)}`,
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed" style={{ color: w(0.68) }}>{message}</p>
        </div>
      </div>

      {/* Scanning indicator */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: g(0.6) }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: w(0.28) }}>{ui.reading}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply card */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${g(0.16)}` }}
        >
          <div
            className="flex items-center gap-2.5 px-5 py-3"
            style={{ borderBottom: `1px solid ${w(0.055)}`, background: 'rgba(210,172,98,0.03)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: g(0.12), color: g(1), border: `1px solid ${g(0.18)}` }}
            >
              L
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: g(0.88) }}>Laura — NuovaSolution</p>
              <p className="text-xs" style={{ color: w(0.26) }}>{ui.replyFrom}</p>
            </div>
          </div>
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

// ─── Web Forms channel view ────────────────────────────────────────────────────

function WebFormView({
  message, result, phase, onTypingDone, ui,
}: {
  message: string;
  result: DemoResult;
  phase: Phase;
  onTypingDone: () => void;
  ui: ReturnType<typeof getUI>;
}) {
  const { name, budget, location, timeline } = result.extracted;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formFields: { label: string; value: string; faded?: boolean }[] = [];
  if (name)     formFields.push({ label: ui.fieldName,     value: name });
  if (location) formFields.push({ label: ui.fieldLocation, value: location });
  if (budget)   formFields.push({ label: ui.fieldBudget,   value: budget });
  if (timeline) formFields.push({ label: ui.fieldTimeline, value: timeline });
  formFields.push({ label: 'Message', value: message, faded: true });

  return (
    <div className="space-y-3">
      {/* Form card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${w(0.075)}` }}>
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: `1px solid ${w(0.055)}`, background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: w(0.38) }}>📋</span>
            <p className="text-xs font-medium" style={{ color: w(0.62) }}>{ui.formTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: w(0.22) }}>{timeStr}</span>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: 'rgba(37,211,102,0.09)',
                color: '#22C55E',
                border: '1px solid rgba(37,211,102,0.18)',
              }}
            >
              ✓ {ui.formSubmitted}
            </span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          {formFields.map((f, i) => (
            <div key={i}>
              <p className="text-xs mb-1.5" style={{ color: w(0.28) }}>{f.label}</p>
              <div
                className="px-3 py-2 rounded-lg text-sm leading-relaxed"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: `1px solid ${w(0.055)}`,
                  color: f.faded ? w(0.65) : w(0.82),
                }}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scanning indicator */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-1"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: g(0.6) }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: w(0.28) }}>{ui.reading}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply card */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${g(0.16)}` }}
        >
          <div
            className="flex items-center gap-2.5 px-5 py-3"
            style={{ borderBottom: `1px solid ${w(0.055)}`, background: 'rgba(210,172,98,0.03)' }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: g(0.12), color: g(1) }}
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

// ─── Score ring ────────────────────────────────────────────────────────────────

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
          <circle cx="64" cy="64" r={R} fill="none" stroke={w(0.055)} strokeWidth="7" />
          <circle
            cx="64" cy="64" r={R} fill="none"
            stroke={tc.color} strokeWidth="7" strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - display / 100)}
            style={{ filter: `drop-shadow(0 0 7px ${tc.color}88)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display text-6xl font-bold leading-none"
            style={{ color: tc.color, textShadow: `0 0 28px ${tc.glow}` }}
          >
            {display}
          </span>
          <span className="text-xs mt-1.5" style={{ color: w(0.28) }}>/100</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
        className="mt-4 px-5 py-2 rounded-full text-xs font-bold tracking-widest"
        style={{
          background: `${tc.color}15`,
          color: tc.color,
          border: `1px solid ${tc.color}35`,
        }}
      >
        {badge}
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function LiveDemoClient() {
  const { lang } = useTranslation();
  const ui = getUI(lang);

  const [message,       setMessage]       = useState('');
  const [source,        setSource]        = useState('WhatsApp');
  const [phase,         setPhase]         = useState<Phase>(0);
  const [result,        setResult]        = useState<DemoResult | null>(null);
  const [visibleRows,   setVisibleRows]   = useState(0);
  const [showCRM,       setShowCRM]       = useState(false);
  const [showAction,    setShowAction]    = useState(false);
  const [followUpMsg,   setFollowUpMsg]   = useState('');
  const [followUpResp,  setFollowUpResp]  = useState<string | null>(null);
  const [followUpPhase, setFollowUpPhase] = useState<0 | 1 | 2>(0);

  const resultsRef = useRef<HTMLDivElement>(null);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resultRef  = useRef<DemoResult | null>(null);

  const isRunning = phase > 0 && phase < 5;
  const canRun    = message.trim().length >= 10 && !isRunning;
  const insightRows = result ? buildInsightRows(result, ui, lang) : [];

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
    setVisibleRows(0);
    setShowCRM(false);
    setShowAction(false);
    setFollowUpMsg('');
    setFollowUpResp(null);
    setFollowUpPhase(0);
  }, [clearTimers]);

  const handleTypingDone = useCallback(() => {
    const r   = resultRef.current;
    const rows = r ? buildInsightRows(r, ui, lang) : [];
    const n   = rows.length;

    schedule(() => setPhase(3), 300);
    for (let i = 0; i < n; i++) {
      schedule(() => setVisibleRows(i + 1), 350 + i * T_ROW_INTERVAL);
    }
    const allRowsMs = 350 + n * T_ROW_INTERVAL;
    schedule(() => setPhase(4), allRowsMs + 500);
    schedule(() => setShowCRM(true),    allRowsMs + 1000);
    schedule(() => setShowAction(true), allRowsMs + 1550);
    schedule(() => setPhase(5),         allRowsMs + 2600);
  }, [lang, ui, schedule]);

  const runDemo = useCallback(() => {
    if (!canRun) return;
    reset();
    const computed = analyzeInput(message, source);
    resultRef.current = computed;
    setResult(computed);
    setVisibleRows(0);
    setPhase(1);
    schedule(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    schedule(() => setPhase(2), T_RESPONSE);
  }, [message, source, canRun, reset, schedule]);

  const handleFollowUpSend = useCallback((msg: string) => {
    if (!msg.trim() || !resultRef.current || followUpPhase !== 0) return;
    setFollowUpMsg(msg);
    setFollowUpPhase(1);
    const id = setTimeout(() => {
      setFollowUpResp(generateFollowUp(msg, resultRef.current!));
      setFollowUpPhase(2);
    }, 700 + Math.random() * 250);
    timersRef.current.push(id);
  }, [followUpPhase]);

  const loadExample = useCallback((ex: typeof EXAMPLE_LEADS[0]) => {
    reset();
    setMessage(ex.message);
    setSource(ex.source);
  }, [reset]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const recAction = result
    ? getRecommendedAction(result, lang === 'es' ? 'es' : 'en')
    : null;

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 text-center overflow-hidden">
        <div
          className="aurora-blob w-[700px] h-[440px] -top-44 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(210,172,98,0.065) 0%, transparent 70%)' }}
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
          style={{ color: w(0.4) }}
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
          <p className="text-sm font-medium text-center mb-5" style={{ color: g(0.5) }}>
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
                    background: active ? g(0.07)                : 'rgba(255,255,255,0.02)',
                    border:     active ? `1px solid ${g(0.26)}` : `1px solid ${w(0.058)}`,
                    boxShadow:  active ? `0 0 18px ${g(0.05)}`  : 'none',
                  }}
                >
                  <span className="text-xl block mb-1.5">{ch.icon}</span>
                  <span className="text-xs font-semibold block leading-snug" style={{ color: active ? g(1) : w(0.52) }}>
                    {label}
                  </span>
                  {sub && (
                    <span
                      className="text-xs block leading-snug mt-1"
                      style={{ color: active ? g(0.4) : w(0.18), fontSize: '0.62rem' }}
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
          <p className="text-xs mb-3" style={{ color: w(0.22) }}>{ui.tryExample}</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_LEADS.map(ex => {
              const active      = message === ex.message;
              const chipLabel   = lang === 'es' ? ex.labelES : ex.label;
              return (
                <button
                  key={ex.label}
                  onClick={() => loadExample(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 hover:-translate-y-0.5"
                  style={{
                    background: active ? g(0.1)              : 'rgba(255,255,255,0.025)',
                    border:     active ? `1px solid ${g(0.28)}` : `1px solid ${w(0.065)}`,
                    color:      active ? g(1)                : w(0.38),
                  }}
                >
                  {chipLabel}
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
            background: 'rgba(255,255,255,0.025)',
            border: `1px solid ${w(0.065)}`,
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
              background: 'rgba(255,255,255,0.025)',
              border: `1px solid ${w(0.058)}`,
              color: w(0.9),
              caretColor: g(1),
              lineHeight: '1.65',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = g(0.32);
              e.currentTarget.style.boxShadow   = `0 0 0 3px ${g(0.045)}`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = w(0.058);
              e.currentTarget.style.boxShadow   = 'none';
            }}
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs" style={{ color: w(0.18) }}>
              {message.trim().length === 0 ? ui.minChars : `${message.trim().length} chars`}
            </span>
            <button
              onClick={runDemo}
              disabled={!canRun}
              className="btn btn-gold btn-sm flex items-center gap-2"
              style={{ opacity: canRun ? 1 : 0.32, cursor: canRun ? 'pointer' : 'not-allowed' }}
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
              <div className="flex-1 h-px" style={{ background: w(0.055) }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: g(0.42) }}>
                {ui.analysisLabel}
              </span>
              <div className="flex-1 h-px" style={{ background: w(0.055) }} />
            </div>

            {/* Channel-specific conversation (response FIRST, before score) */}
            <div className="mb-8">
              {source === 'WhatsApp' && (
                <WhatsAppView
                  message={message}
                  result={result}
                  phase={phase}
                  onTypingDone={handleTypingDone}
                  ui={ui}
                  lang={lang}
                  followUpMsg={followUpMsg}
                  followUpResp={followUpResp}
                  followUpPhase={followUpPhase}
                  onFollowUpChange={setFollowUpMsg}
                  onFollowUpSend={handleFollowUpSend}
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

            {/* Insights grid */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mb-7"
              >
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: g(0.42) }}>
                  {ui.insightsLabel}
                </p>
                <InsightsGrid rows={insightRows} visibleCount={visibleRows} />
              </motion.div>
            )}

            {/* Score */}
            {phase >= 4 && (
              <div className="mb-7 flex flex-col items-center">
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: g(0.42) }}>
                  {ui.scoreLabel}
                </p>
                <ScoreRing score={result.score} temperature={result.temperature} lang={lang} />
              </div>
            )}

            {/* CRM update card */}
            {showCRM && (
              <div className="mb-5">
                <CrmUpdateCard result={result} lang={lang} ui={ui} />
              </div>
            )}

            {/* Recommended action */}
            {showAction && recAction && (
              <div className="mb-7">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: g(0.42) }}>
                  {ui.recommendedTitle}
                </p>
                <RecommendedActionCard action={recAction} lang={lang} ui={ui} />
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
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.09), rgba(220,38,38,0.03))',
                  border: '1px solid rgba(220,38,38,0.24)',
                  boxShadow: '0 0 36px rgba(220,38,38,0.06)',
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
                    <p className="text-sm font-bold mb-0.5" style={{ color: '#F05050' }}>
                      {lang === 'es' ? 'LEAD URGENTE — Agente notificado' : ui.hotAlert}
                    </p>
                    <p className="text-sm truncate" style={{ color: w(0.42) }}>
                      {result.alertSnippet}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(37,211,102,0.1)',
                      color: '#22C55E',
                      border: '1px solid rgba(37,211,102,0.2)',
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
                  <p className="text-sm text-center sm:text-left" style={{ color: w(0.24) }}>
                    {ui.emailTagline}
                  </p>
                  <button onClick={reset} className="btn btn-ghost btn-sm shrink-0">
                    {ui.tryAnother}
                  </button>
                </div>

                <div
                  className="rounded-2xl p-8 md:p-10 text-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${g(0.1)}` }}
                >
                  <p className="section-label mb-3">{ui.readyLabel}</p>
                  <h2
                    className="font-display font-bold mb-4"
                    style={{ color: w(0.96), fontSize: 'clamp(1.7rem, 4vw, 2.6rem)' }}
                  >
                    {ui.stopLosing}
                  </h2>
                  <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: w(0.35) }}>
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
