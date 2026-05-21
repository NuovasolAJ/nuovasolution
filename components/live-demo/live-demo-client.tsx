'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeInput, EXAMPLE_LEADS, type DemoResult, type Temperature } from './demo-engine';

// ─────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;
const g = (a: number) => `rgba(214,180,122,${a})`;
const w = (a: number) => `rgba(255,255,255,${a})`;

const SOURCES = ['WhatsApp', 'Email', 'Idealista', 'Fotocasa', 'Web Form'];

const PIPELINE_STEPS = [
  { id: 1, label: 'Message Received', icon: '📥' },
  { id: 2, label: 'Language Detection', icon: '🌐' },
  { id: 3, label: 'Lead Classification', icon: '🏷️' },
  { id: 4, label: 'Information Extraction', icon: '🔍' },
  { id: 5, label: 'Lead Qualification', icon: '✅' },
  { id: 6, label: 'Lead Scoring', icon: '📊' },
  { id: 7, label: 'CRM Sync', icon: '🗄️' },
  { id: 8, label: 'Hot Lead Detection', icon: '🔥' },
  { id: 9, label: 'AI Response', icon: '💬' },
];

// Step completion timings in ms from run-click
const STEP_TIMINGS = [300, 900, 1700, 2800, 3900, 5000, 6400, 7100, 8200];

const TEMP_COLORS: Record<Temperature, { text: string; glow: string; bg: string; badge: string }> = {
  hot: {
    text: '#FF4444',
    glow: 'rgba(220,38,38,0.4)',
    bg: 'rgba(220,38,38,0.08)',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  warm: {
    text: '#F59E0B',
    glow: 'rgba(217,119,6,0.35)',
    bg: 'rgba(217,119,6,0.07)',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  cold: {
    text: '#3B82F6',
    glow: 'rgba(37,99,235,0.30)',
    bg: 'rgba(37,99,235,0.06)',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
};

// ─────────────────────────────────────────────────────────
//  Step result snippets
// ─────────────────────────────────────────────────────────

function getStepSnippet(stepId: number, result: DemoResult, charCount: number): string {
  switch (stepId) {
    case 1: return `${charCount} chars · ${result.extracted.urgency ? 'Urgency detected' : 'Standard inquiry'}`;
    case 2: return `${result.languageFlag} ${result.languageLabel} · ${result.languageConfidence}% confidence`;
    case 3: return `${result.leadTypeLabel} · ${result.extracted.propertyType ?? 'Residential'}`;
    case 4: {
      const parts: string[] = [];
      if (result.extracted.budget) parts.push(result.extracted.budget);
      if (result.extracted.location) parts.push(result.extracted.location);
      if (result.extracted.bedrooms) parts.push(result.extracted.bedrooms);
      return parts.length ? parts.join(' · ') : 'No structured data extracted';
    }
    case 5: {
      const pos = result.factors.filter(f => f.positive).length;
      return `${pos} of ${result.factors.length} signals matched`;
    }
    case 6: return `Score: ${result.score}/100 · ${result.temperature.charAt(0).toUpperCase() + result.temperature.slice(1)} lead`;
    case 7: return `${result.crmFields.length} fields synced`;
    case 8: return result.temperature === 'hot' ? 'HOT LEAD — alert triggered' : 'No alert threshold reached';
    case 9: return 'Response generated · Ready to send';
    default: return '';
  }
}

// ─────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────

function PipelineStep({
  step,
  status,
  snippet,
}: {
  step: (typeof PIPELINE_STEPS)[0];
  status: 'pending' | 'active' | 'complete';
  snippet: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: status === 'pending' ? 0.35 : 1, x: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex items-start gap-4"
    >
      {/* Node */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm relative"
          style={{
            background:
              status === 'complete'
                ? 'rgba(34,197,94,0.15)'
                : status === 'active'
                ? 'rgba(214,180,122,0.12)'
                : 'rgba(255,255,255,0.04)',
            border:
              status === 'complete'
                ? '1px solid rgba(34,197,94,0.4)'
                : status === 'active'
                ? `1px solid ${g(0.5)}`
                : '1px solid rgba(255,255,255,0.08)',
            boxShadow:
              status === 'active' ? `0 0 12px ${g(0.25)}` : 'none',
          }}
        >
          {status === 'complete' ? (
            <svg className="w-4 h-4" style={{ color: 'rgba(34,197,94,0.9)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : status === 'active' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 rounded-full border-t-2"
              style={{ borderColor: g(0.9), borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
            />
          ) : (
            <span className="text-xs" style={{ color: w(0.25) }}>{step.id}</span>
          )}
        </div>
        {step.id < PIPELINE_STEPS.length && (
          <div
            className="w-px flex-1 mt-1"
            style={{
              minHeight: 20,
              background:
                status === 'complete'
                  ? 'rgba(34,197,94,0.25)'
                  : 'rgba(255,255,255,0.06)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-sm font-medium"
            style={{
              color:
                status === 'complete' ? w(0.9) : status === 'active' ? g(1) : w(0.3),
            }}
          >
            {step.label}
          </span>
          {status === 'active' && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-xs"
              style={{ color: g(0.7) }}
            >
              processing…
            </motion.span>
          )}
        </div>
        <AnimatePresence>
          {status === 'complete' && snippet && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-xs mt-0.5 truncate"
              style={{ color: g(0.75) }}
            >
              {snippet}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ScoreDisplay({ score, temperature }: { score: number; temperature: Temperature }) {
  const [display, setDisplay] = useState(0);
  const tc = TEMP_COLORS[temperature];

  useEffect(() => {
    const duration = 2200;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const pct = (display / 100) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-2xl p-6 h-full"
      style={{
        background: 'rgba(22,34,50,0.7)',
        border: `1px solid ${w(0.08)}`,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 40px ${tc.glow}`,
      }}
    >
      <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: g(1) }}>
        Lead Score
      </p>

      {/* Big number */}
      <div className="flex items-end gap-3 mb-5">
        <motion.span
          className="font-display text-7xl font-bold leading-none"
          style={{ color: tc.text, textShadow: `0 0 30px ${tc.glow}` }}
        >
          {display}
        </motion.span>
        <span className="text-2xl mb-2" style={{ color: w(0.3) }}>/100</span>
      </div>

      {/* Bar */}
      <div className="h-2 rounded-full mb-4 overflow-hidden" style={{ background: w(0.06) }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(90deg, ${tc.text}aa, ${tc.text})`,
            boxShadow: `0 0 10px ${tc.glow}`,
          }}
        />
      </div>

      {/* Temperature badge */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${tc.badge}`}
        >
          {temperature === 'hot' ? '🔥' : temperature === 'warm' ? '🌡️' : '❄️'}
          {temperature.toUpperCase()} LEAD
        </span>
      </div>

      {/* Score range labels */}
      <div className="flex justify-between text-xs" style={{ color: w(0.25) }}>
        <span>Cold 0–44</span>
        <span>Warm 45–74</span>
        <span>Hot 75+</span>
      </div>
    </motion.div>
  );
}

function CRMCard({ fields }: { fields: { label: string; value: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      className="rounded-2xl p-6 h-full"
      style={{
        background: 'rgba(22,34,50,0.7)',
        border: `1px solid ${w(0.08)}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: g(1) }}>
          CRM Record
        </p>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: 'rgba(34,197,94,0.9)', border: '1px solid rgba(34,197,94,0.2)' }}>
          Synced
        </span>
      </div>

      <div className="space-y-2.5">
        {fields.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07, ease: EASE }}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-xs shrink-0" style={{ color: w(0.4) }}>{field.label}</span>
            <span
              className="text-xs font-medium text-right truncate max-w-[160px]"
              style={{ color: w(0.85) }}
            >
              {field.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AIResponseCard({ response }: { response: string }) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= response.length) {
        setTyped(response.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 18);
    return () => clearInterval(id);
  }, [response]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="rounded-2xl p-6 h-full"
      style={{
        background: 'rgba(22,34,50,0.7)',
        border: `1px solid ${w(0.08)}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: g(1) }}>
          AI Response
        </p>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: g(0.1), color: g(0.9), border: `1px solid ${g(0.2)}` }}>
          Ready to send
        </span>
      </div>

      {/* Message bubble */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed relative"
        style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${w(0.06)}`, color: w(0.88) }}
      >
        {typed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-4 ml-0.5 align-middle rounded-full"
          style={{ background: g(0.8) }}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(34,197,94,0.8)' }} />
        <span className="text-xs" style={{ color: w(0.4) }}>NuovaSolution Message Agent</span>
      </div>
    </motion.div>
  );
}

function HotLeadAlert({ snippet, location }: { snippet: string; location?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-2xl p-6 col-span-full"
      style={{
        background: 'linear-gradient(135deg, rgba(220,38,38,0.10) 0%, rgba(220,38,38,0.04) 100%)',
        border: '1px solid rgba(220,38,38,0.25)',
        boxShadow: '0 0 40px rgba(220,38,38,0.12)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl"
          style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}
        >
          🔥
        </motion.div>

        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold tracking-wide" style={{ color: '#FF4444' }}>
              HOT LEAD DETECTED
            </span>
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#FF4444', display: 'inline-block' }}
            />
          </div>
          <p className="text-sm" style={{ color: w(0.7) }}>{snippet}</p>
        </div>

        {/* Alert channels */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}
          >
            <span>WhatsApp</span>
            <span className="font-bold">Sent</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(214,180,122,0.1)', border: `1px solid ${g(0.2)}`, color: g(0.9) }}
          >
            <span>Agent</span>
            <span className="font-bold">Alerted</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QualificationFactors({ factors }: { factors: { label: string; positive: boolean }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(22,34,50,0.7)',
        border: `1px solid ${w(0.08)}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: g(1) }}>
        Qualification Signals
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {factors.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, ease: EASE }}
            className="flex items-center gap-2.5 text-xs"
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: f.positive ? 'rgba(34,197,94,0.85)' : 'rgba(239,68,68,0.6)' }}
            />
            <span style={{ color: f.positive ? w(0.75) : w(0.4) }}>{f.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  Main client component
// ─────────────────────────────────────────────────────────

export default function LiveDemoClient() {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('WhatsApp');
  const [stage, setStage] = useState(0);       // 0=idle, 1-9=pipeline step complete
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  const canRun = message.trim().length >= 10 && !isRunning;

  const runDemo = useCallback(() => {
    if (!canRun) return;
    const computed = analyzeInput(message, source);
    setResult(computed);
    setCharCount(message.trim().length);
    setIsRunning(true);
    setStage(0);
    setShowResults(false);

    // Scroll to pipeline
    setTimeout(() => {
      pipelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Fire each step
    STEP_TIMINGS.forEach((ms, i) => {
      setTimeout(() => {
        setStage(i + 1);
        if (i + 1 === 9) {
          // All done
          setTimeout(() => {
            setShowResults(true);
            setIsRunning(false);
          }, 600);
        }
      }, ms);
    });
  }, [message, source, canRun]);

  const reset = () => {
    setStage(0);
    setIsRunning(false);
    setResult(null);
    setShowResults(false);
  };

  const loadExample = (ex: typeof EXAMPLE_LEADS[0]) => {
    reset();
    setMessage(ex.message);
    setSource(ex.source);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0D1620 0%, #0A1018 60%, #0D1620 100%)' }}>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Ambient blobs */}
        <div className="aurora-blob w-[500px] h-[400px] -top-20 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(214,180,122,0.06) 0%, transparent 70%)' }} />
        <div className="aurora-blob w-[300px] h-[300px] top-40 right-[10%]"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.04) 0%, transparent 70%)' }} />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="section-label mb-5"
        >
          Live Demo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5 max-w-3xl mx-auto"
          style={{ color: w(0.96) }}
        >
          Watch the system{' '}
          <span style={{ color: g(1) }}>think.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="text-lg max-w-xl mx-auto"
          style={{ color: w(0.55) }}
        >
          Paste any real estate inquiry — in any language — and see exactly how NuovaSolution qualifies, scores, and responds in real time.
        </motion.p>
      </section>

      {/* ── Input Section ── */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">

        {/* Example lead presets */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mb-6"
        >
          <p className="text-xs font-medium mb-3" style={{ color: w(0.35) }}>Try an example lead:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_LEADS.map((ex) => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: message === ex.message ? g(0.12) : 'rgba(255,255,255,0.04)',
                  border: message === ex.message ? `1px solid ${g(0.35)}` : `1px solid ${w(0.08)}`,
                  color: message === ex.message ? g(1) : w(0.5),
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main input card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(22,34,50,0.8)',
            border: `1px solid ${w(0.08)}`,
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Source selector */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs" style={{ color: w(0.4) }}>Channel:</span>
            {SOURCES.map((s) => (
              <button
                key={s}
                onClick={() => setSource(s)}
                className="text-xs px-3 py-1 rounded-full border transition-all duration-150"
                style={{
                  background: source === s ? g(0.12) : 'transparent',
                  border: source === s ? `1px solid ${g(0.35)}` : `1px solid ${w(0.06)}`,
                  color: source === s ? g(1) : w(0.45),
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => { setMessage(e.target.value); if (stage > 0) reset(); }}
            placeholder="Paste a WhatsApp message, email inquiry, or portal lead here…"
            rows={5}
            className="w-full resize-none rounded-xl p-4 text-sm outline-none transition-all duration-200 placeholder:text-sm"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${w(0.07)}`,
              color: w(0.9),
              caretColor: g(1),
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = g(0.35); e.currentTarget.style.boxShadow = `0 0 0 3px ${g(0.06)}`; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = w(0.07); e.currentTarget.style.boxShadow = 'none'; }}
          />

          <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
            <span className="text-xs" style={{ color: w(0.25) }}>
              {message.length > 0 ? `${message.trim().length} characters` : 'Enter at least 10 characters'}
            </span>

            <button
              onClick={runDemo}
              disabled={!canRun}
              className="btn btn-gold btn-md flex items-center gap-2 transition-all duration-200"
              style={{
                opacity: canRun ? 1 : 0.4,
                cursor: canRun ? 'pointer' : 'not-allowed',
              }}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: '#1A1A1A' }}
                  />
                  Processing…
                </>
              ) : (
                <>
                  Run Live Demo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Pipeline ── */}
      <AnimatePresence>
        {stage > 0 && result && (
          <motion.section
            ref={pipelineRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="px-6 pb-16 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Left: Pipeline steps */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(16,26,40,0.8)',
                  border: `1px solid ${w(0.07)}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: g(0.8) }}>
                  AI Pipeline
                </p>
                <div>
                  {PIPELINE_STEPS.map((step, idx) => {
                    const stepNum = idx + 1;
                    const status =
                      stage > stepNum ? 'complete'
                      : stage === stepNum ? 'active'
                      : 'pending';
                    const snippet = status === 'complete' ? getStepSnippet(step.id, result, charCount) : '';
                    return (
                      <PipelineStep
                        key={step.id}
                        step={step}
                        status={status}
                        snippet={snippet}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Right: Live extracted data (appears progressively) */}
              <div className="space-y-4">
                {/* Language + Classification card */}
                {stage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(22,34,50,0.7)', border: `1px solid ${w(0.07)}` }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: g(0.75) }}>Detection</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs mb-1" style={{ color: w(0.35) }}>Language</p>
                        <p className="text-sm font-medium" style={{ color: w(0.9) }}>
                          {result.languageFlag} {result.languageLabel}
                          <span className="ml-1.5 text-xs" style={{ color: g(0.8) }}>{result.languageConfidence}%</span>
                        </p>
                      </div>
                      {stage >= 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                          <p className="text-xs mb-1" style={{ color: w(0.35) }}>Lead Type</p>
                          <p className="text-sm font-medium" style={{ color: w(0.9) }}>{result.leadTypeLabel}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Extracted data card */}
                {stage >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(22,34,50,0.7)', border: `1px solid ${w(0.07)}` }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: g(0.75) }}>Extracted Data</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {[
                        { label: 'Budget', value: result.extracted.budget },
                        { label: 'Location', value: result.extracted.location },
                        { label: 'Property', value: result.extracted.propertyType },
                        { label: 'Bedrooms', value: result.extracted.bedrooms },
                        { label: 'Timeline', value: result.extracted.timeline },
                        { label: 'Viewing', value: result.extracted.viewingRequested ? 'Requested' : undefined },
                      ].filter(f => f.value).map((f, i) => (
                        <motion.div key={f.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                          <p className="text-xs" style={{ color: w(0.35) }}>{f.label}</p>
                          <p className="text-sm font-medium" style={{ color: w(0.85) }}>{f.value}</p>
                        </motion.div>
                      ))}
                      {![result.extracted.budget, result.extracted.location, result.extracted.propertyType, result.extracted.bedrooms, result.extracted.timeline].some(Boolean) && (
                        <p className="text-xs col-span-2" style={{ color: w(0.35) }}>No structured data detected</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Score preview (before full display) */}
                {stage >= 5 && stage < 7 && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(22,34,50,0.7)', border: `1px solid ${w(0.07)}` }}
                  >
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: g(0.75) }}>Qualification</p>
                    <div className="grid grid-cols-2 gap-2">
                      {result.factors.map((f, i) => (
                        <div key={f.label} className="flex items-center gap-1.5 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: f.positive ? 'rgba(34,197,94,0.85)' : 'rgba(239,68,68,0.5)' }} />
                          <span style={{ color: f.positive ? w(0.7) : w(0.35) }}>{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Full Results ── */}
      <AnimatePresence>
        {showResults && result && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="px-6 pb-24 max-w-4xl mx-auto"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: g(0.8) }}>
              Results
            </p>

            {/* Hot lead alert — full width, shown first */}
            {result.temperature === 'hot' && result.alertSnippet && (
              <div className="mb-6">
                <HotLeadAlert snippet={result.alertSnippet} location={result.extracted.location} />
              </div>
            )}

            {/* Score + CRM + Response grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <ScoreDisplay score={result.score} temperature={result.temperature} />
              <CRMCard fields={result.crmFields} />
              <AIResponseCard response={result.aiResponse} />
            </div>

            {/* Qualification factors */}
            <QualificationFactors factors={result.factors} />

            {/* Run again */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 text-center"
            >
              <p className="text-sm" style={{ color: w(0.4) }}>
                This is how NuovaSolution processes every inquiry — automatically, in seconds.
              </p>
              <button onClick={reset} className="btn btn-ghost btn-sm shrink-0">
                Try another lead
              </button>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, ease: EASE }}
              className="mt-16 text-center rounded-2xl p-10"
              style={{
                background: 'rgba(22,34,50,0.6)',
                border: `1px solid ${g(0.15)}`,
              }}
            >
              <p className="section-label mb-3">Ready to see this inside your agency?</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: w(0.96) }}>
                Stop losing leads. Start today.
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: w(0.5) }}>
                Book a demo and we'll show you the full system running live — tailored to your agency.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/#contact" className="btn btn-gold btn-lg">
                  Book a Demo
                </a>
                <a
                  href="https://wa.me/34600000000"
                  className="btn btn-ghost btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
