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

// Phase timings (ms from run click)
const T_TAGS_START = 1000;
const T_TAG_INTERVAL = 190;
const T_SCORE = 2500;
const T_RESPONSE = 2900;
const T_DONE = 5500;

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const TEMP_CFG: Record<Temperature, { color: string; glow: string; label: string }> = {
  hot:  { color: '#FF4848', glow: 'rgba(255,72,72,0.45)',   label: '🔥 HOT LEAD' },
  warm: { color: '#F59E0B', glow: 'rgba(245,158,11,0.38)',  label: '⚡ WARM LEAD' },
  cold: { color: '#60A5FA', glow: 'rgba(96,165,250,0.28)',  label: '❄️ COLD LEAD' },
};

// ─────────────────────────────────────────────────────────
//  Insight tag builder
// ─────────────────────────────────────────────────────────

function buildTags(result: DemoResult) {
  const tags: { icon: string; label: string }[] = [];
  tags.push({ icon: result.languageFlag, label: result.languageLabel });
  if (result.extracted.location) tags.push({ icon: '📍', label: result.extracted.location });
  if (result.extracted.budget) tags.push({ icon: '💰', label: result.extracted.budget });
  const prop = [result.extracted.bedrooms, result.extracted.propertyType].filter(Boolean).join(' ');
  if (prop) tags.push({ icon: '🏠', label: prop });
  if (result.extracted.timeline) tags.push({ icon: '⏳', label: result.extracted.timeline });
  if (result.extracted.viewingRequested) tags.push({ icon: '👁', label: 'Viewing requested' });
  if (result.extracted.urgency) tags.push({ icon: '⚡', label: 'Urgent' });
  return tags;
}

// ─────────────────────────────────────────────────────────
//  Score ring
// ─────────────────────────────────────────────────────────

function ScoreRing({ score, temperature }: { score: number; temperature: Temperature }) {
  const [display, setDisplay] = useState(0);
  const tc = TEMP_CFG[temperature];
  const R = 52;
  const circ = 2 * Math.PI * R;

  useEffect(() => {
    const dur = 1900;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const dashOffset = circ * (1 - display / 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: EASE }}
      className="flex flex-col items-center"
    >
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Track */}
          <circle cx="64" cy="64" r={R} fill="none" stroke={w(0.06)} strokeWidth="7" />
          {/* Progress */}
          <circle
            cx="64" cy="64" r={R}
            fill="none"
            stroke={tc.color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dashOffset}
            style={{ filter: `drop-shadow(0 0 8px ${tc.color})` }}
          />
        </svg>
        {/* Center */}
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
        className="mt-4 px-5 py-2 rounded-full text-xs font-bold"
        style={{
          background: `${tc.color}18`,
          color: tc.color,
          border: `1px solid ${tc.color}40`,
          letterSpacing: '0.10em',
        }}
      >
        {tc.label}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  AI response bubble
// ─────────────────────────────────────────────────────────

function AIBubble({ response }: { response: string }) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTyped('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i <= response.length) {
        setTyped(response.slice(0, i));
      } else {
        setDone(true);
        clearInterval(id);
      }
    }, 14);
    return () => clearInterval(id);
  }, [response]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {/* Sender row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: g(0.14), color: g(1), border: `1px solid ${g(0.22)}` }}
        >
          NS
        </div>
        <div>
          <p className="text-xs font-medium" style={{ color: w(0.7) }}>NuovaSolution Agent</p>
          <p className="text-xs" style={{ color: done ? '#25D366' : w(0.3) }}>
            {done ? '✓ Sent' : 'Typing…'}
          </p>
        </div>
      </div>

      {/* Message bubble */}
      <div
        className="rounded-2xl rounded-tl-none p-5 text-sm leading-relaxed"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${w(0.08)}`,
          color: w(0.9),
          minHeight: 72,
        }}
      >
        {typed}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-4 ml-0.5 align-middle rounded-full"
            style={{ background: g(0.8) }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────────────────

export default function LiveDemoClient() {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('WhatsApp');
  const [phase, setPhase] = useState<Phase>(0);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [visibleTags, setVisibleTags] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isRunning = phase > 0 && phase < 5;
  const canRun = message.trim().length >= 10 && !isRunning;
  const tags = result ? buildTags(result) : [];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setPhase(0);
    setResult(null);
    setVisibleTags(0);
  }, [clearTimers]);

  const runDemo = useCallback(() => {
    if (!canRun) return;
    clearTimers();

    const computed = analyzeInput(message, source);
    const computedTags = buildTags(computed);

    setResult(computed);
    setVisibleTags(0);
    setPhase(1);

    schedule(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);

    // Tags
    schedule(() => {
      setPhase(2);
      computedTags.forEach((_, i) => {
        schedule(() => setVisibleTags(i + 1), i * T_TAG_INTERVAL);
      });
    }, T_TAGS_START);

    schedule(() => setPhase(3), T_SCORE);
    schedule(() => setPhase(4), T_RESPONSE);
    schedule(() => setPhase(5), T_DONE);
  }, [message, source, canRun, clearTimers, schedule]);

  const loadExample = useCallback((ex: typeof EXAMPLE_LEADS[0]) => {
    reset();
    setMessage(ex.message);
    setSource(ex.source);
  }, [reset]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <div style={{ background: 'linear-gradient(160deg, #0A1118 0%, #060A10 55%, #0A1118 100%)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-10 px-6 text-center overflow-hidden">
        <div
          className="aurora-blob w-[700px] h-[440px] -top-44 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(214,180,122,0.055) 0%, transparent 70%)' }}
        />

        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Live Demo
        </motion.p>

        <motion.h1
          className="font-display font-bold leading-tight mb-4 max-w-2xl mx-auto"
          style={{ color: w(0.96), fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.07, ease: EASE }}
        >
          Watch the AI{' '}
          <span style={{ color: g(1) }}>understand</span>{' '}
          your lead.
        </motion.h1>

        <motion.p
          className="text-base max-w-md mx-auto"
          style={{ color: w(0.48) }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          Paste any real estate inquiry — in any language. See how NuovaSolution qualifies, scores, and responds in seconds.
        </motion.p>
      </section>

      {/* ── Input ── */}
      <section className="px-6 pb-8 max-w-2xl mx-auto">

        {/* Example presets */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        >
          <p className="text-xs mb-3" style={{ color: w(0.28) }}>Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_LEADS.map(ex => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  background: message === ex.message ? g(0.1) : 'rgba(255,255,255,0.03)',
                  border: message === ex.message ? `1px solid ${g(0.3)}` : `1px solid ${w(0.07)}`,
                  color: message === ex.message ? g(1) : w(0.45),
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${w(0.07)}`, backdropFilter: 'blur(16px)' }}
        >
          {/* Source tabs */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs" style={{ color: w(0.35) }}>Channel:</span>
            {SOURCES.map(s => (
              <button
                key={s}
                onClick={() => setSource(s)}
                className="text-xs px-2.5 py-1 rounded-full border transition-all duration-150"
                style={{
                  background: source === s ? g(0.1) : 'transparent',
                  border: source === s ? `1px solid ${g(0.3)}` : `1px solid ${w(0.06)}`,
                  color: source === s ? g(1) : w(0.38),
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={e => { setMessage(e.target.value); if (phase > 0 && phase < 5) reset(); }}
            placeholder="Paste a WhatsApp message, email inquiry, or portal lead here…"
            rows={4}
            className="w-full resize-none rounded-xl p-4 text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${w(0.06)}`,
              color: w(0.9),
              caretColor: g(1),
              lineHeight: '1.65',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = g(0.35); e.currentTarget.style.boxShadow = `0 0 0 3px ${g(0.05)}`; }}
            onBlur={e => { e.currentTarget.style.borderColor = w(0.06); e.currentTarget.style.boxShadow = 'none'; }}
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs" style={{ color: w(0.2) }}>
              {message.trim().length === 0 ? 'Minimum 10 characters' : `${message.trim().length} chars`}
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
                  Analyzing…
                </>
              ) : phase === 5 ? 'Run Again →' : 'Analyze Lead →'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Results ── */}
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
              <div className="flex-1 h-px" style={{ background: w(0.07) }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: w(0.22) }}>AI Analysis</span>
              <div className="flex-1 h-px" style={{ background: w(0.07) }} />
            </div>

            {/* Scanning state */}
            <AnimatePresence>
              {phase === 1 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center py-10"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.2, delay: i * 0.22, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: g(0.85) }}
                      />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: w(0.38) }}>Reading inquiry…</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Insight tags ── */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mb-10"
              >
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: w(0.25) }}>
                  Insights Detected
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {tags.slice(0, visibleTags).map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${w(0.1)}`,
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

            {/* ── Score ── */}
            {phase >= 3 && (
              <div className="mb-10 flex flex-col items-center">
                <p className="text-xs tracking-widest uppercase mb-6" style={{ color: w(0.25) }}>
                  Lead Score
                </p>
                <ScoreRing score={result.score} temperature={result.temperature} />
              </div>
            )}

            {/* ── AI Response ── */}
            {phase >= 4 && (
              <div className="mb-10">
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: w(0.25) }}>
                  AI Response
                </p>
                <AIBubble response={result.aiResponse} />
              </div>
            )}

            {/* ── Hot lead alert ── */}
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
                      HOT LEAD — Agent Alerted
                    </p>
                    <p className="text-sm truncate" style={{ color: w(0.55) }}>
                      {result.alertSnippet}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366', border: '1px solid rgba(37,211,102,0.22)' }}
                  >
                    WhatsApp ✓
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── Done ── */}
            {phase === 5 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pt-2">
                  <p className="text-sm text-center sm:text-left" style={{ color: w(0.32) }}>
                    Every inquiry. Automatic. In seconds.
                  </p>
                  <button onClick={reset} className="btn btn-ghost btn-sm shrink-0">
                    Try another lead
                  </button>
                </div>

                {/* Final CTA */}
                <div
                  className="rounded-2xl p-8 md:p-10 text-center"
                  style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${g(0.12)}` }}
                >
                  <p className="section-label mb-3">Ready for your agency?</p>
                  <h2
                    className="font-display font-bold mb-4"
                    style={{ color: w(0.96), fontSize: 'clamp(1.7rem, 4vw, 2.6rem)' }}
                  >
                    Stop losing leads.
                  </h2>
                  <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: w(0.42) }}>
                    Book a demo and we'll show you the full system running live — tailored to your agency on the Costa del Sol.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/#contact" className="btn btn-gold btn-md">Book a Demo</a>
                    <a
                      href="https://wa.me/34600000000"
                      className="btn btn-ghost btn-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Us
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
