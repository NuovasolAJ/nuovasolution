"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The product demonstration under the hero (owner order 2026-10-05 §4, §5, §10): ONE consistent case in
 * four large views, enquiry → fitting reply → updated customer record → clear next step. The same person,
 * property, day and language in every view.
 *
 * The visible purpose is that of Animated Feature Carousel by minhxthanh,
 * https://21st.dev/@minhxthanh/components/animated-feature-carousel: a list of steps beside one large stage
 * that changes with the step. That component's source is not public (21st serves it with an API key only)
 * and it states no licence, so nothing of it is copied; this is our own implementation of the same purpose
 * with the owner's conditions: every step can be chosen by hand, the automatic run leaves 7 seconds of
 * reading time per step and stops for good at the first interaction, and it does not run at all with
 * reduced motion or while the section is out of view.
 *
 * AI labelling (§5): the reply shows "Nuova · Asistente de IA" and the product's answer. The view is marked
 * as shortened; the full message, with the approved notice word for word, opens in place.
 * The last view is a small real interaction: taking the task and marking it done, as the staff list does.
 */
const STEP_MS = 7000;

export interface ProductDemoProps {
  labels: {
    steps: readonly { title: string; line: string }[];
    kind: string;
    short: string;
    full: string;
    fullHide: string;
    fullTitle: string;
    controls: { prev: string; next: string; pause: string; play: string; step: string; of: string };
    record: { updated: string; from: string; heading: string };
    task: { take: string; taken: string; complete: string; done: string; again: string; state: string; title: string; reason: string };
    assistant: string;
  };
  story: { name: string; time: string; fields: readonly { k: string; v: string }[] };
  /** The conversation as the product writes it: Spanish on both language versions. */
  chat: { enquiry: string; reply: string; notice: string };
}

function ChatHead({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
      <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink-100 text-[0.9375rem] font-medium text-ink-700">{initials}</span>
      <div className="min-w-0">
        <p className="truncate text-[1.0625rem] font-semibold leading-tight text-ink-950">{name}</p>
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-ink-500">
          <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[#25a55f]" />
          WhatsApp
        </p>
      </div>
    </div>
  );
}

export function ProductDemo({ labels, story, chat }: ProductDemoProps) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const [full, setFull] = useState(false);
  const [task, setTask] = useState<"open" | "taken" | "done">("open");
  const root = useRef<HTMLDivElement>(null);
  const fullId = useId();
  const stageId = useId();
  const total = labels.steps.length;

  // The automatic run starts only where motion is welcome, and only while the stage is on screen.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    setAuto(mq.matches);
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !full;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % total), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, step, total]);

  // Any choice by hand ends the automatic run; the play button brings it back.
  const go = (n: number) => {
    setAuto(false);
    setStep(((n % total) + total) % total);
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div ref={root} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:grid-rows-[auto_1fr] xl:gap-x-14 xl:gap-y-5" data-product-demo data-step={step + 1} data-auto={running ? "on" : "off"}>
          {/* The steps: each one can be chosen; the active one says its sentence. */}
          <div className="xl:col-start-1 xl:row-start-1">
            <ol className="border-t border-line-strong" data-demo-steps>
              {labels.steps.map((s, i) => {
                const active = i === step;
                return (
                  <li key={s.title} className="relative border-b border-line-strong">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={active ? "step" : undefined}
                      aria-controls={stageId}
                      className={cn("group flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-control xl:py-5", active ? "text-text-primary" : "text-text-muted hover:text-text-primary")}
                    >
                      <span className={cn("tnum w-6 shrink-0 text-[0.8125rem] font-medium", active ? "text-text-accent" : "text-text-muted")}>0{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block t-heading-s">{s.title}</span>
                        {active && <span className="mt-1.5 block t-body-s text-text-secondary">{s.line}</span>}
                      </span>
                    </button>
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-line-strong">
                        <span key={`${step}-${running}`} className={cn("block h-full origin-left bg-ink-950", running ? "demo-progress" : "scale-x-100")} style={{ ["--demo-ms" as string]: `${STEP_MS}ms` }} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

          </div>

          {/* The stage: one large view per step. */}
          <div className="xl:col-start-2 xl:row-span-2 xl:row-start-1">
            <div id={stageId} className="demo-stage" data-demo-stage>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                  {(step === 0 || step === 1) && (
                    <div data-demo-view={step === 0 ? "enquiry" : "reply"}>
                      <ChatHead name={story.name} />
                      <div className="space-y-4 pt-5">
                        <div className="demo-bubble hero-bubble-in">
                          <p lang="es">{chat.enquiry}</p>
                          <p className="hero-bubble-meta">{story.name} · {story.time}</p>
                        </div>
                        {step === 1 && (
                          <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="flex flex-col items-end gap-2">
                            <div className="demo-bubble hero-bubble-out" id={fullId} data-demo-reply={full ? "full" : "short"}>
                              <p className="mb-1.5 text-[0.875rem] font-semibold text-[#1d6b42]">{labels.assistant}</p>
                              {full && <p lang="es" className="mb-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" data-demo-notice>{chat.notice}</p>}
                              <p lang="es">{chat.reply}</p>
                              <p className="hero-bubble-meta">{story.time}</p>
                            </div>
                            <p className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-right t-caption text-text-muted">
                              {!full && <span>{labels.short}</span>}
                              <button type="button" onClick={() => { setAuto(false); setFull((f) => !f); }} aria-expanded={full} aria-controls={fullId} className="min-h-[44px] font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-demo-full>
                                {full ? labels.fullHide : labels.full}
                              </button>
                            </p>
                            {full && <p className="t-caption text-text-muted">{labels.fullTitle}</p>}
                          </m.div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div data-demo-view="record">
                      <p className="t-caption font-medium text-text-muted">{labels.record.heading}</p>
                      <p className="mt-1 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950">{story.name}</p>
                      <p className="mt-1.5 t-body-s text-text-secondary">{labels.record.from}</p>
                      <dl className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
                        {story.fields.map((f, i) => (
                          <m.div key={f.k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.15 + i * 0.12 }} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5">
                            <dt className="w-28 shrink-0 t-body-s text-text-muted">{f.k}</dt>
                            <dd className="min-w-0 flex-1 text-[1.0625rem] font-medium text-ink-950">{f.v}</dd>
                            {i < 3 && (
                              <span className="inline-flex shrink-0 items-center gap-1.5 t-caption font-medium text-signal-positive">
                                <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                                {labels.record.updated}
                              </span>
                            )}
                          </m.div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {step === 3 && (
                    <div data-demo-view="next" data-demo-task={task}>
                      <p className="t-caption font-medium text-text-muted">{labels.steps[3].title}</p>
                      <div className="mt-3 border-l-[3px] border-champagne-400 pl-5">
                        <p className="text-[1.5rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950">{labels.task.title}</p>
                        <p className="mt-2 t-body-m text-text-secondary">{labels.task.reason}</p>
                      </div>
                      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3" aria-live="polite">
                        {task === "open" && (
                          <>
                            <button type="button" onClick={() => { setAuto(false); setTask("taken"); }} className="demo-action" data-demo-take>{labels.task.take}<ArrowRight size={16} aria-hidden="true" /></button>
                            <span className="t-body-s text-text-secondary">{labels.task.state}</span>
                          </>
                        )}
                        {task === "taken" && (
                          <>
                            <span className="inline-flex items-center gap-2 t-body-m font-medium text-signal-positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{labels.task.taken}</span>
                            <button type="button" onClick={() => setTask("done")} className="demo-action" data-demo-complete>{labels.task.complete}</button>
                          </>
                        )}
                        {task === "done" && (
                          <>
                            <span className="inline-flex items-center gap-2 t-body-m font-medium text-signal-positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{labels.task.done}</span>
                            <button type="button" onClick={() => setTask("open")} className="inline-flex min-h-[44px] items-center gap-2 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950"><RotateCcw size={14} aria-hidden="true" />{labels.task.again}</button>
                          </>
                        )}
                      </div>
                      {/* What has happened by now, in the order it happened: the whole case on four lines. */}
                      <ol className="mt-9 divide-y divide-ink-100 border-y border-ink-100" data-demo-recap>
                        {labels.steps.map((s, i) => {
                          const settled = i < 3 || task === "done";
                          return (
                            <li key={s.title} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-3 t-body-s">
                              <span aria-hidden="true" className={cn("inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill", settled ? "bg-signal-positive text-ivory" : "border border-line-interactive text-transparent")}><Check size={12} strokeWidth={3} /></span>
                              <span className={cn("min-w-0 flex-1", settled ? "text-text-primary" : "text-text-secondary")}>{s.title}</span>
                              <span className="basis-full pl-8 t-caption tnum text-text-muted md:basis-auto md:pl-0">{i < 3 ? story.time : task === "open" ? labels.task.state : task === "taken" ? labels.task.taken : labels.task.done}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
            <p className="state-line mt-4" data-state="available" data-demo-kind="real">{labels.kind}</p>
          </div>

          {/* The controls: under the stage on a phone, under the steps from 1024 px. */}
          <div className="flex items-center gap-2 self-start xl:col-start-1 xl:row-start-2" data-demo-controls>
            <button type="button" onClick={() => go(step - 1)} aria-label={labels.controls.prev} className="demo-control"><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => go(step + 1)} aria-label={labels.controls.next} className="demo-control"><ArrowRight size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => setAuto((a) => !a)} aria-label={auto ? labels.controls.pause : labels.controls.play} aria-pressed={auto} className="demo-control" data-demo-toggle>
              {auto ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
            <p className="ml-2 t-caption tnum text-text-muted" aria-live="polite">{labels.controls.step} {step + 1} {labels.controls.of} {total}</p>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
