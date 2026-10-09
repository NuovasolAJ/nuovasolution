"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Box, Check, ListChecks, Megaphone, MessageCircle, Pause, Phone, Play, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { CompareSlider } from "@/components/ui/compare-slider";
import type { SceneKey, SceneKind } from "@/lib/content/home-scenes";
import { FloorPlan, IsoModel, TerracePhoto } from "./scene-art";

/**
 * The five product demonstrations (owner follow-up order 2026-10-06 §5), chosen in the same page context:
 * one selector, and for each scene a benefit headline, one sentence, the steps beside one large stage.
 *
 * Mechanics kept from the first demonstration: every step can be chosen by hand, previous, next and
 * play/pause, 7 s per step when playing, and the automatic run stops for good at the first choice by hand,
 * including the choice of another scene. It runs only where motion is welcome and while the stage is on
 * screen. Each scene keeps its own small state (the task taken, the post approved, the floor chosen); it is
 * reset when the scene is left, so no state can contradict another scene's.
 *
 * Building blocks: the selector does what Expandable Tabs (preetsuthar17) does for the eye, with every label
 * written out (owner's condition); Animated List (Magic UI) for enquiries arriving; Animated Beam (Magic UI)
 * for the one connection channel → record; our own compare slider for plan and model.
 * Every stage says what kind of picture it is: a real product path, or a design prototype.
 */
const STEP_MS = 7000;
const ICONS: Record<SceneKey, typeof MessageCircle> = { reply: MessageCircle, match: Search, team: ListChecks, social: Megaphone, model: Box };

export interface SceneView {
  key: SceneKey;
  tab: string;
  title: string;
  line: string;
  kind: SceneKind;
  state: string;
  steps: { title: string; line: string }[];
}

export interface SceneWords {
  kindReal: string;
  kindPrototype: string;
  illustrative: string;
  controls: { prev: string; next: string; pause: string; play: string; step: string; of: string; scenes: string };
  short: string;
  full: string;
  fullHide: string;
  fullTitle: string;
  assistant: string;
  record: { heading: string; updated: string; from: string };
  entry: { label: string; whatsapp: string; phone: string };
  phone: { incoming: string; caller: string; noted: string; wish: readonly string[]; state: string };
  task: { title: string; reason: string; state: string; take: string; taken: string; complete: string; done: string; again: string };
  match: { wish: string; from: string; criteria: readonly string[]; cards: readonly { ref: string; title: string; meta: string }[]; reply: string; channel: string; photo: string };
  team: { morning: string; arrived: string; items: readonly { who: string; what: string; when: string; reason: string }[]; priority: string; why: string; take: string; taken: string; complete: string; done: string; open: string; again: string; whatsappNote: string };
  social: { listing: string; listingMeta: string; draft: string; caption: string; approve: string; approved: string; comment: string; commenter: string; reply: string; replyMeta: string; record: string; recordLines: readonly string[] };
  model: { plan: string; model: string; compare: string; floors: readonly string[]; furniture: string; on: string; off: string; rooms: readonly string[]; note: string; sent: string };
}

export interface ProductScenesProps {
  scenes: SceneView[];
  words: SceneWords;
  story: { name: string; time: string; fields: readonly { k: string; v: string }[] };
  /** The conversation as the product writes it: Spanish on both language versions. */
  chat: { enquiry: string; reply: string; notice: string };
}

type Local = { entry: "whatsapp" | "phone"; full: boolean; task: "open" | "taken" | "done"; approved: boolean; floor: 0 | 1; furniture: boolean };
const LOCAL0: Local = { entry: "whatsapp", full: false, task: "open", approved: false, floor: 0, furniture: true };

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay }} className={className}>{children}</m.div>;
}

function Bubble({ children, out = false, meta, label, labelClass }: { children: ReactNode; out?: boolean; meta?: string; label?: string; labelClass?: string }) {
  return (
    <div className={cn("demo-bubble", out ? "hero-bubble-out" : "hero-bubble-in")}>
      {label && <p className={cn("mb-1.5 text-[0.875rem] font-semibold", labelClass ?? "text-[#1d6b42]")}>{label}</p>}
      <div lang="es">{children}</div>
      {meta && <p className="hero-bubble-meta">{meta}</p>}
    </div>
  );
}

function ChatHead({ name, channel }: { name: string; channel: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
      <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink-100 text-[0.9375rem] font-medium text-ink-700">{initials}</span>
      <div className="min-w-0">
        <p className="truncate text-[1.0625rem] font-semibold leading-tight text-ink-950">{name}</p>
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-ink-600"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[#25a55f]" />{channel}</p>
      </div>
    </div>
  );
}

function Mark({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "positive" | "accent" }) {
  return <span className={cn("inline-flex items-center gap-1.5 text-[0.8125rem] font-medium", tone === "positive" && "text-signal-positive", tone === "accent" && "text-text-accent", tone === "muted" && "text-text-muted")}>{children}</span>;
}

function Field({ k, v, mark }: { k: string; v: string; mark?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
      <dt className="w-28 shrink-0 t-body-s text-text-muted">{k}</dt>
      <dd className="min-w-0 flex-1 text-[1.0625rem] font-medium text-ink-950">{v}</dd>
      {mark && <Mark tone="positive"><Check size={13} strokeWidth={2.5} aria-hidden="true" />{mark}</Mark>}
    </div>
  );
}

function TaskBlock({ title, reason, state, words, onState, recap }: { title: string; reason: string; state: Local["task"]; words: SceneWords["task"]; onState: (s: Local["task"]) => void; recap?: ReactNode }) {
  return (
    <div data-demo-task={state}>
      <div className="border-l-[3px] border-champagne-400 pl-5">
        <p className="text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950">{title}</p>
        <p className="mt-2 t-body-m text-text-secondary">{reason}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3" aria-live="polite">
        {state === "open" && (<><button type="button" onClick={() => onState("taken")} className="demo-action" data-demo-take>{words.take}<ArrowRight size={16} aria-hidden="true" /></button><span className="t-body-s text-text-secondary">{words.state}</span></>)}
        {state === "taken" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{words.taken}</Mark><button type="button" onClick={() => onState("done")} className="demo-action" data-demo-complete>{words.complete}</button></>)}
        {state === "done" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{words.done}</Mark><button type="button" onClick={() => onState("open")} className="inline-flex min-h-[44px] items-center gap-2 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-demo-again><RotateCcw size={14} aria-hidden="true" />{words.again}</button></>)}
      </div>
      {recap}
    </div>
  );
}

/** The one connection channel → record, drawn once the record stands. */
function ChannelToRecord({ channel, children }: { channel: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const from = useRef<HTMLDivElement>(null);
  const to = useRef<HTMLSpanElement>(null);
  return (
    <div ref={box} className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-6 md:gap-10">
      <div ref={from} className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-ink-200 bg-white text-ink-950" aria-label={channel} role="img"><MessageCircle size={20} aria-hidden="true" /></div>
      <div className="relative min-w-0">
        {/* the beam ends at the record's heading, not in the middle of its lines */}
        <span ref={to} aria-hidden="true" className="absolute left-0 top-7 h-px w-px" />
        {children}
      </div>
      <AnimatedBeam containerRef={box} fromRef={from} toRef={to} curvature={0} delay={0.3} />
    </div>
  );
}

export function ProductScenes({ scenes, words, story, chat }: ProductScenesProps) {
  const [sceneKey, setSceneKey] = useState<SceneKey>(scenes[0].key);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const [local, setLocal] = useState<Local>(LOCAL0);
  const root = useRef<HTMLDivElement>(null);
  const stageId = useId();
  const fullId = useId();
  const scene = scenes.find((s) => s.key === sceneKey) ?? scenes[0];
  const total = scene.steps.length;
  const W = words;
  const set = (patch: Partial<Local>) => { setAuto(false); setLocal((l) => ({ ...l, ...patch })); };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    setAuto(mq.matches);
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !local.full;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % total), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, step, total]);

  const go = (n: number) => { setAuto(false); setStep(((n % total) + total) % total); };
  const choose = (k: SceneKey) => { if (k === sceneKey) return; setAuto(false); setSceneKey(k); setStep(0); setLocal(LOCAL0); };
  const kindLine = scene.kind === "real" ? W.kindReal : W.kindPrototype;
  const phone = scene.key === "reply" && local.entry === "phone";

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div ref={root} data-product-scenes data-scene={scene.key} data-step={step + 1} data-auto={running ? "on" : "off"}>
          {/* The selector: five scenes, every label written out. */}
          <div role="tablist" aria-label={W.controls.scenes} className="scene-tabs" data-scene-tabs>
            {scenes.map((s) => {
              const Icon = ICONS[s.key];
              const active = s.key === scene.key;
              return (
                <button key={s.key} type="button" role="tab" aria-selected={active} aria-controls={stageId} onClick={() => choose(s.key)} className={cn("scene-tab", active && "scene-tab-active")} data-scene-tab={s.key}>
                  <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                  <span>{s.tab}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 max-w-[760px] xl:mt-10">
            <h3 className="t-heading-l text-text-primary">{scene.title}</h3>
            <p className="mt-2 t-body-m text-text-secondary">{scene.line}</p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:grid-rows-[auto_1fr] xl:gap-x-14 xl:gap-y-5">
            {/* The steps */}
            <div className="xl:col-start-1 xl:row-start-1">
              {scene.key === "reply" && (
                <div className="mb-5 flex flex-wrap items-center gap-2" data-demo-entry={local.entry}>
                  <span className="t-caption text-text-muted">{W.entry.label}</span>
                  <button type="button" aria-pressed={local.entry === "whatsapp"} onClick={() => { set({ entry: "whatsapp" }); setStep(0); }} className={cn("entry-pill", local.entry === "whatsapp" && "entry-pill-active")}><MessageCircle size={14} aria-hidden="true" />{W.entry.whatsapp}</button>
                  <button type="button" aria-pressed={local.entry === "phone"} onClick={() => { set({ entry: "phone" }); setStep(0); }} className={cn("entry-pill", local.entry === "phone" && "entry-pill-active")}><Phone size={14} aria-hidden="true" />{W.entry.phone}</button>
                </div>
              )}
              <ol className="border-t border-line-strong" data-demo-steps>
                {scene.steps.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={s.title} className="relative border-b border-line-strong">
                      <button type="button" onClick={() => go(i)} aria-current={active ? "step" : undefined} aria-controls={stageId} className={cn("group flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-control xl:py-5", active ? "text-text-primary" : "text-text-muted hover:text-text-primary")}>
                        <span className={cn("tnum w-6 shrink-0 text-[0.8125rem] font-medium", active ? "text-text-accent" : "text-text-muted")}>0{i + 1}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block t-heading-s">{s.title}</span>
                          {active && <span className="mt-1.5 block t-body-s text-text-secondary">{s.line}</span>}
                        </span>
                      </button>
                      {active && (
                        <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-line-strong">
                          <span key={`${scene.key}-${step}-${running}`} className={cn("block h-full origin-left bg-ink-950", running ? "demo-progress" : "scale-x-100")} style={{ ["--demo-ms" as string]: `${STEP_MS}ms` }} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* The stage */}
            <div className="xl:col-start-2 xl:row-span-2 xl:row-start-1">
              <div id={stageId} role="tabpanel" className="demo-stage" data-demo-stage>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div key={`${scene.key}-${step}-${local.entry}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                    {/* A: answer and record */}
                    {scene.key === "reply" && (step === 0 || step === 1) && !phone && (
                      <div data-demo-view={step === 0 ? "enquiry" : "reply"}>
                        <ChatHead name={story.name} channel="WhatsApp" />
                        <div className="space-y-4 pt-5">
                          <Bubble meta={`${story.name} · ${story.time}`}>{chat.enquiry}</Bubble>
                          {step === 1 && (
                            <Rise delay={0.25} className="flex flex-col items-end gap-2">
                              <div id={fullId} data-demo-reply={local.full ? "full" : "short"}>
                                <Bubble out label={W.assistant} meta={story.time}>
                                  {local.full && <p className="mb-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" data-demo-notice>{chat.notice}</p>}
                                  <p>{chat.reply}</p>
                                </Bubble>
                              </div>
                              <p className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-right t-caption text-text-muted">
                                {!local.full && <span>{W.short}</span>}
                                <button type="button" onClick={() => set({ full: !local.full })} aria-expanded={local.full} aria-controls={fullId} className="min-h-[44px] font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-demo-full>{local.full ? W.fullHide : W.full}</button>
                              </p>
                              {local.full && <p className="t-caption text-text-muted">{W.fullTitle}</p>}
                            </Rise>
                          )}
                        </div>
                      </div>
                    )}
                    {scene.key === "reply" && (step === 0 || step === 1) && phone && (
                      <div data-demo-view={step === 0 ? "call" : "noted"}>
                        <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
                          <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-ivory"><Phone size={18} /></span>
                          <div><p className="text-[1.0625rem] font-semibold leading-tight text-ink-950">{W.phone.incoming}</p><p className="text-[0.8125rem] text-ink-600">{W.phone.caller}</p></div>
                        </div>
                        <div className="pt-5">
                          {step === 0 ? (
                            <div className="flex items-end gap-1.5" aria-hidden="true">{[14, 26, 18, 32, 22, 12, 28, 16, 24, 10].map((h, i) => <span key={i} className="w-1.5 rounded-pill bg-ink-300" style={{ height: h }} />)}</div>
                          ) : (
                            <div><p className="t-caption font-medium text-text-muted">{W.phone.noted}</p><ul className="mt-2 divide-y divide-ink-100 border-y border-ink-100">{W.phone.wish.map((w, i) => <Rise key={w} delay={0.15 + i * 0.15}><li className="py-3 text-[1.0625rem] font-medium text-ink-950">{w}</li></Rise>)}</ul></div>
                          )}
                          <p className="state-line mt-6" data-state="preparing">{W.phone.state}</p>
                        </div>
                      </div>
                    )}
                    {scene.key === "reply" && step === 2 && (
                      <div data-demo-view="record">
                        <ChannelToRecord channel={phone ? W.entry.phone : "WhatsApp"}>
                          <p className="t-caption font-medium text-text-muted">{W.record.heading}</p>
                          <p className="mt-1 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950">{story.name}</p>
                          <p className="mt-1.5 t-body-s text-text-secondary">{W.record.from}</p>
                          <dl className="mt-5 divide-y divide-ink-100 border-y border-ink-100">
                            {story.fields.map((f, i) => (
                              <Rise key={f.k} delay={0.15 + i * 0.12}><Field k={f.k} v={phone && f.k === story.fields[3].k ? W.entry.phone : f.v} mark={i < 3 ? W.record.updated : undefined} /></Rise>
                            ))}
                          </dl>
                        </ChannelToRecord>
                      </div>
                    )}
                    {scene.key === "reply" && step === 3 && (
                      <div data-demo-view="next">
                        <p className="t-caption font-medium text-text-muted">{scene.steps[3].title}</p>
                        <div className="mt-3">
                          <TaskBlock title={W.task.title} reason={W.task.reason} state={local.task} words={W.task} onState={(s) => set({ task: s })} recap={
                            <ol className="mt-9 divide-y divide-ink-100 border-y border-ink-100" data-demo-recap>
                              {scene.steps.map((s, i) => {
                                const settled = i < 3 || local.task === "done";
                                return (
                                  <li key={s.title} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-3 t-body-s">
                                    <span aria-hidden="true" className={cn("inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill", settled ? "bg-signal-positive text-ivory" : "border border-line-interactive text-transparent")}><Check size={12} strokeWidth={3} /></span>
                                    <span className={cn("min-w-0 flex-1", settled ? "text-text-primary" : "text-text-secondary")}>{s.title}</span>
                                    <span className="basis-full pl-8 t-caption tnum text-text-muted md:basis-auto md:pl-0">{i < 3 ? story.time : local.task === "open" ? W.task.state : local.task === "taken" ? W.task.taken : W.task.done}</span>
                                  </li>
                                );
                              })}
                            </ol>
                          } />
                        </div>
                      </div>
                    )}

                    {/* B: find */}
                    {scene.key === "match" && step === 0 && (
                      <div data-demo-view="wish">
                        <ChatHead name={W.match.from.split(" · ")[0]} channel="WhatsApp" />
                        <div className="space-y-5 pt-5">
                          <Bubble meta={W.match.from}>{W.match.wish}</Bubble>
                          <AnimatedList className="flex-row flex-wrap" delay={500} startDelay={700}>
                            {W.match.criteria.map((c) => <span key={c} className="inline-flex rounded-pill border border-ink-200 bg-white px-3 py-1.5 text-[0.9375rem] font-medium text-ink-950">{c}</span>)}
                          </AnimatedList>
                        </div>
                      </div>
                    )}
                    {scene.key === "match" && step === 1 && (
                      <div data-demo-view="cards" className="grid gap-4 md:grid-cols-2">
                        {W.match.cards.map((c, i) => (
                          <Rise key={c.ref} delay={0.15 + i * 0.2}>
                            <article className="overflow-hidden rounded-lg border border-ink-100 bg-white">
                              <TerracePhoto variant={i as 0 | 1} className="aspect-[16/10] w-full" />
                              <div className="p-4"><p className="tnum t-caption text-text-muted">{c.ref} · {W.match.photo}</p><p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{c.title}</p><p className="mt-1 t-body-s text-text-secondary">{c.meta}</p></div>
                            </article>
                          </Rise>
                        ))}
                      </div>
                    )}
                    {scene.key === "match" && step === 2 && (
                      <div data-demo-view="proposal">
                        <ChatHead name={W.match.from.split(" · ")[0]} channel="WhatsApp" />
                        <div className="space-y-3 pt-5">
                          <div className="flex justify-end"><Bubble out label={W.assistant}>{W.match.reply}</Bubble></div>
                          <div className="ml-auto grid max-w-[84%] grid-cols-2 gap-3">
                            {W.match.cards.map((c, i) => (
                              <Rise key={c.ref} delay={0.3 + i * 0.15}><div className="overflow-hidden rounded-lg border border-ink-100 bg-white"><TerracePhoto variant={i as 0 | 1} className="aspect-[16/9] w-full" /><p className="p-2.5 text-[0.8125rem] font-medium text-ink-950">{c.ref} · {c.title}</p></div></Rise>
                            ))}
                          </div>
                          <p className="text-right t-caption text-text-muted">{W.match.channel}</p>
                        </div>
                      </div>
                    )}

                    {/* C: coordinate */}
                    {scene.key === "team" && (step === 0 || step === 1) && (
                      <div data-demo-view={step === 0 ? "list" : "priority"}>
                        <p className="t-caption font-medium text-text-muted">{W.team.morning}</p>
                        <p className="mt-1 text-[1.25rem] font-semibold leading-tight text-ink-950">{W.team.arrived}</p>
                        {step === 0 ? (
                          <AnimatedList className="mt-5" delay={900}>
                            {W.team.items.map((it) => <div key={it.who} className="rounded-lg border border-ink-100 bg-white p-4"><p className="text-[1rem] font-semibold text-ink-950">{it.who}</p><p className="mt-0.5 t-body-s text-text-secondary">{it.what}</p><p className="mt-1 t-caption tnum text-text-muted">{it.when}</p></div>)}
                          </AnimatedList>
                        ) : (
                          <ol className="mt-5 space-y-3">
                            {W.team.items.map((it, i) => (
                              <Rise key={it.who} delay={0.1 + i * 0.15}>
                                <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-lg border border-ink-100 bg-white p-4">
                                  <span className="tnum inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 text-[0.9375rem] font-semibold text-ivory" aria-label={`${W.team.priority} ${i + 1}`}>{i + 1}</span>
                                  <div><p className="text-[1rem] font-semibold text-ink-950">{it.who}</p><p className="mt-0.5 t-body-s text-text-secondary">{it.what}</p><p className="mt-1.5 inline-flex items-center gap-1.5 t-caption font-medium text-text-accent"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-champagne-400" />{W.team.why}: {it.reason}</p></div>
                                </li>
                              </Rise>
                            ))}
                          </ol>
                        )}
                        <p className="state-line mt-6" data-state="preparing">{W.team.whatsappNote}</p>
                      </div>
                    )}
                    {scene.key === "team" && (step === 2 || step === 3) && (
                      <div data-demo-view={step === 2 ? "take" : "done"}>
                        <p className="t-caption font-medium text-text-muted">{W.team.priority} 1 · {W.team.items[0].who}</p>
                        <div className="mt-3">
                          <TaskBlock title={W.task.title} reason={`${W.team.why}: ${W.team.items[0].reason}`} state={step === 3 && local.task === "open" ? "taken" : local.task} words={{ ...W.task, take: W.team.take, taken: W.team.taken, complete: W.team.complete, done: W.team.done, again: W.team.again, state: W.team.open }} onState={(s) => set({ task: s })} />
                        </div>
                        <ul className="mt-8 space-y-2" aria-label={W.team.morning}>
                          {W.team.items.slice(1).map((it) => <li key={it.who} className="flex items-baseline justify-between gap-4 rounded-lg border border-ink-100 bg-white px-4 py-3 t-body-s"><span className="font-medium text-ink-950">{it.who}</span><span className="text-text-muted">{W.team.open}</span></li>)}
                        </ul>
                      </div>
                    )}

                    {/* D: attract */}
                    {scene.key === "social" && step === 0 && (
                      <div data-demo-view="listing" className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
                        <TerracePhoto variant={0} className="aspect-[4/3] w-full rounded-lg" />
                        <div><p className="tnum t-caption text-text-muted">{W.match.photo}</p><p className="mt-1 text-[1.375rem] font-semibold leading-snug text-ink-950">{W.social.listing}</p><p className="mt-1 t-body-m text-text-secondary">{W.social.listingMeta}</p></div>
                      </div>
                    )}
                    {scene.key === "social" && step === 1 && (
                      <div data-demo-view="post" data-demo-approved={local.approved}>
                        <p className="t-caption font-medium text-text-muted">{W.social.draft}</p>
                        <div className="mt-3 overflow-hidden rounded-lg border border-ink-100 bg-white">
                          <TerracePhoto variant={0} className="aspect-[16/9] w-full" />
                          <p lang="es" className="p-4 text-[1.0625rem] leading-[1.5] text-ink-950">{W.social.caption}</p>
                        </div>
                        <div className="mt-5 flex items-center gap-4" aria-live="polite">
                          {local.approved ? <Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{W.social.approved}</Mark> : <button type="button" onClick={() => set({ approved: true })} className="demo-action" data-demo-approve>{W.social.approve}<Check size={16} aria-hidden="true" /></button>}
                        </div>
                      </div>
                    )}
                    {scene.key === "social" && step === 2 && (
                      <div data-demo-view="comment" className="space-y-4">
                        <Bubble meta={W.social.commenter}>{W.social.comment}</Bubble>
                        <Rise delay={0.3} className="flex flex-col items-end gap-1.5"><Bubble out label={W.assistant}>{W.social.reply}</Bubble><p className="t-caption text-text-muted">{W.social.replyMeta}</p></Rise>
                      </div>
                    )}
                    {scene.key === "social" && step === 3 && (
                      <div data-demo-view="social-record">
                        <ChannelToRecord channel="Instagram">
                          <p className="t-caption font-medium text-text-muted">{W.record.heading}</p>
                          <p className="mt-1 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950">{W.social.record}</p>
                          <ul className="mt-5 divide-y divide-ink-100 border-y border-ink-100">{W.social.recordLines.map((l, i) => <Rise key={l} delay={0.15 + i * 0.12}><li className="py-3 text-[1.0625rem] font-medium text-ink-950">{l}</li></Rise>)}</ul>
                        </ChannelToRecord>
                      </div>
                    )}

                    {/* E: present */}
                    {scene.key === "model" && step === 0 && (
                      <div data-demo-view="plan"><p className="t-caption font-medium text-text-muted">{W.model.plan}</p><FloorPlan rooms={W.model.rooms} className="mt-3 w-full rounded-lg border border-ink-100" /><p className="mt-3 inline-flex items-center gap-1.5 t-body-s font-medium text-signal-positive"><Check size={14} strokeWidth={2.5} aria-hidden="true" />{W.model.sent}</p></div>
                    )}
                    {scene.key === "model" && step === 1 && (
                      <div data-demo-view="compare">
                        <CompareSlider label={W.model.compare} beforeLabel={W.model.plan} afterLabel={W.model.model} before={<FloorPlan rooms={W.model.rooms} className="w-full" />} after={<IsoModel floor={0} furniture className="w-full" />} className="border border-ink-100" initial={55} />
                        <p className="mt-3 t-caption text-text-muted">{W.model.note}</p>
                      </div>
                    )}
                    {scene.key === "model" && step === 2 && (
                      <div data-demo-view="viewer" data-demo-floor={local.floor} data-demo-furniture={local.furniture}>
                        <IsoModel floor={local.floor} furniture={local.furniture} className="w-full rounded-lg border border-ink-100" />
                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <div className="flex items-center gap-2" role="group" aria-label={W.model.floors.join(" / ")}>{W.model.floors.map((f, i) => <button key={f} type="button" aria-pressed={local.floor === i} onClick={() => set({ floor: i as 0 | 1 })} className={cn("entry-pill", local.floor === i && "entry-pill-active")} data-demo-floor-button={i}>{f}</button>)}</div>
                          <div className="flex items-center gap-2"><span className="t-caption text-text-muted">{W.model.furniture}</span><button type="button" aria-pressed={local.furniture} onClick={() => set({ furniture: !local.furniture })} className={cn("entry-pill", local.furniture && "entry-pill-active")} data-demo-furniture-button>{local.furniture ? W.model.on : W.model.off}</button></div>
                        </div>
                        <p className="mt-3 t-caption text-text-muted">{W.model.note}</p>
                      </div>
                    )}
                  </m.div>
                </AnimatePresence>
              </div>
              <p className="state-line mt-4" data-state={scene.kind === "real" ? "available" : "preparing"} data-demo-kind={scene.kind}>{kindLine}</p>
              <p className="mt-2 t-caption text-text-muted" data-demo-state>{scene.state}</p>
            </div>

            {/* The controls */}
            <div className="flex items-center gap-2 self-start xl:col-start-1 xl:row-start-2" data-demo-controls>
              <button type="button" onClick={() => go(step - 1)} aria-label={W.controls.prev} className="demo-control"><ArrowLeft size={18} aria-hidden="true" /></button>
              <button type="button" onClick={() => go(step + 1)} aria-label={W.controls.next} className="demo-control"><ArrowRight size={18} aria-hidden="true" /></button>
              <button type="button" onClick={() => setAuto((a) => !a)} aria-label={auto ? W.controls.pause : W.controls.play} aria-pressed={auto} className="demo-control" data-demo-toggle>{auto ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>
              <p className="ml-2 t-caption tnum text-text-muted" aria-live="polite">{W.controls.step} {step + 1} {W.controls.of} {total}</p>
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
