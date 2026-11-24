"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ElementType, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown, Inbox, Mail, Mic, PanelsTopLeft, Phone, PhoneOff, RotateCcw, Send, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { demoChannels, demoWords, endPhase, recordStart, type DemoChannel, type DemoChannelKey } from "@/lib/content/home-demo";
import { brief1120 } from "@/lib/content/brief-1120";
import { type ClaimView, live } from "@/lib/claims";
import { Mark } from "@/components/ui/mark";
import { WhatsAppMark } from "@/components/ui/whatsapp-mark";

/**
 * The demonstration under the hero (the owner's order of 03.11.2026, points 2 and 3): four channels, each on a surface that
 * looks like its channel, and beside each the customer record filling field by field.
 *
 * How it runs: the root carries the phase as a number (`--phase`) and as an attribute; every item knows the phase it belongs
 * to (`--at`), and one CSS rule (globals.css ".demo .d-at") derives its visibility from the two, so the markup is complete from
 * the first paint. JavaScript only advances the phase on a few timers once the surface is in view. Without JavaScript and with
 * reduced motion the finished picture stands at once (CSS), and the replay control is hidden.
 *
 * The owner's brief of 20.11. (p. 3–4) with Copy's screens 1-B / 1-C (11cf7a2): WhatsApp first; the whole conversation W-1 … W-4
 * (Spanish on both pages, the EN translation small under each bubble); the finished task with its head, state, fields and the
 * reminder line; the caption that tells an answered enquiry from personal attention; the one link out of path 1 into the plans.
 * Entered mid-section (the surface's top already above the window) or through "Ver cómo queda la tarea" (`[data-demo-end]`), the
 * demonstration shows its END STATE at once instead of starting its run; the full run and the replay stay optional. The channel
 * picker is one flat, compact bar (2 × 2 on the phone, CSS). The rotation of 13.11. (a finished run moves to the next channel until
 * the first click) stays. The internal gate view (`?view=public`) still hides WhatsApp while the agency's own number is not registered
 * and marks a switched-off channel; the customer pages show the finished product.
 */
// H3 (09.11.): the real WhatsApp mark on its tab; the other channels keep their line icons
const ICON: Record<DemoChannelKey, ElementType> = { whatsapp: WhatsAppMark, email: Mail, webform: PanelsTopLeft, phone: Phone };
const REDUCE = "(prefers-reduced-motion: reduce)";
/** The pause between a finished run and the next channel (the visitor reads the record first). */
const PAUSE = 4200;
const at = (n: number, extra?: CSSProperties): CSSProperties => ({ ["--at" as string]: n, ...extra });

/** An item of the sequence: appears in its phase; `fresh` flashes the moment it has just arrived. */
function Item({ n, phase, className, children, as: Tag = "div", ...rest }: { n: number; phase: number; className?: string; children: ReactNode; as?: "div" | "p" | "li" | "span" } & Record<string, unknown>) {
  return (
    <Tag className={cn("d-at", className, phase === n && "is-fresh")} style={at(n)} data-at={n} {...rest}>
      {children}
    </Tag>
  );
}


export function HeroDemo({ locale, view = "target" }: { locale: Locale; view?: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const W = demoWords;
  const B = brief1120.demo;
  // the owner's brief of 20.11. (23.11.): the finished product — all four channels, WhatsApp first, no marks (the gate is gone)
  const channels = demoChannels.filter((c) => live(c.claim, view));
  const [channel, setChannel] = useState<DemoChannelKey>(channels[0]?.key ?? "whatsapp");
  const [phase, setPhase] = useState(0);
  // the auto-run (13.11.): on until the first click or key, never while out of view, never with reduced motion
  const [auto, setAuto] = useState(true);
  const [seen, setSeen] = useState(false);
  const [runNo, setRunNo] = useState(0);
  const [entered, setEntered] = useState<"run" | "end" | null>(null);
  const inView = useRef(false);
  const scriptRef = useRef<DemoChannel | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const id = useId();
  const script = (channels.find((c) => c.key === channel) ?? channels[0]) as DemoChannel;
  scriptRef.current = script;
  const end = endPhase(script);
  const done = phase >= end;

  const clear = () => { for (const t of timers.current) window.clearTimeout(t); timers.current = []; };

  /** Runs the chosen channel's sequence from its first phase; with reduced motion the end state is set at once. */
  const run = useCallback((c: DemoChannel) => {
    clear();
    setRunNo((n) => n + 1);
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(c)); return; }
    setPhase(0);
    let t = 0;
    c.timings.forEach((ms, i) => {
      if (i === 0) return;
      t += ms;
      timers.current.push(window.setTimeout(() => setPhase(i), t));
    });
  }, []);

  /** The end state at once (the brief p. 4: entered mid-section, the demonstration shows its result; "Ver cómo queda la tarea"). */
  const showEnd = useCallback((c: DemoChannel) => { clear(); setPhase(endPhase(c)); setAuto(false); started.current = true; setEntered("end"); }, []);

  // The first run starts when the surface is in view; `seen` follows the surface in and out of view for the rotation.
  // Entered with its top already above the window (a jump or a fast scroll into the middle of the section), the end state stands at once.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(script)); started.current = true; setAuto(false); setEntered("end"); return; }
    if (window.location.hash === "#demo") { showEnd(script); inView.current = true; setSeen(true); }
    const io = new IntersectionObserver((entries) => {
      inView.current = entries.some((e) => e.isIntersecting);
      setSeen(inView.current);
      // E2 (the owner, 24.11.: no empty areas): a reader who scrolls past while the run is still playing finds the FINISHED
      // picture, not a half-filled record — the run jumps to its end the moment the surface leaves the window upwards
      if (started.current && !inView.current && el.getBoundingClientRect().top < 0) { clear(); setPhase(endPhase(scriptRef.current ?? script)); return; }
      if (started.current || !inView.current) return;
      started.current = true;
      if (el.getBoundingClientRect().top < -80) { showEnd(script); return; }
      setEntered("run");
      run(script);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** The person took over: the rotation ends for good (the Reviewer's condition: a click stops). */
  const stopAuto = () => setAuto(false);

  // The owner's R-12 decision (24.11.): the demonstration plays ONCE and the finished task stays; no rotation to the next channel,
  // no restart — another run only on the person's click (a channel tab or "Repetir demo"). `auto` still records whether the
  // person took over, for the data attribute and the first run.
  void PAUSE;

  // The demonstration's own run links ([data-demo-run]) run it again; the task links ([data-demo-end]) open the finished task (WhatsApp) at once.
  useEffect(() => {
    const runs = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-demo-run]"));
    const ends = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-demo-end]"));
    const onRun = () => { started.current = true; inView.current = true; setAuto(false); run(script); };
    const onEnd = () => { const c = channels.find((x) => x.key === "whatsapp") ?? channels[0]; setChannel(c.key); inView.current = true; showEnd(c); };
    for (const c of runs) c.addEventListener("click", onRun);
    for (const c of ends) c.addEventListener("click", onEnd);
    return () => { for (const c of runs) c.removeEventListener("click", onRun); for (const c of ends) c.removeEventListener("click", onEnd); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, script, showEnd]);

  useEffect(() => clear, []);

  const choose = (key: DemoChannelKey) => {
    stopAuto();
    if (key === channel) return;
    const c = channels.find((x) => x.key === key) as DemoChannel;
    setChannel(key);
    started.current = true;
    inView.current = true;
    run(c);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = channels.map((c) => c.key);
    const i = keys.indexOf(channel);
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % keys.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    if (next === null) return;
    e.preventDefault();
    choose(keys[next]);
    tabsRef.current?.querySelector<HTMLButtonElement>(`[data-demo-tab="${keys[next]}"]`)?.focus();
  };

  const panelId = `${id}-panel`;
  const lit = phase >= recordStart(script);
  const isTask = script.key === "whatsapp";

  return (
    <div
      ref={rootRef}
      id="demo"
      className="demo"
      data-demo
      data-demo-brief="1120"
      data-demo-kind={script.kind}
      data-demo-channel={channel}
      data-demo-phase={phase}
      data-demo-done={done ? "true" : "false"}
      data-demo-auto={auto ? "true" : "false"}
      data-demo-run={runNo}
      data-demo-view={view}
      data-demo-entered={entered ?? "not-yet"}
      style={{ ["--phase" as string]: phase, ["--end" as string]: end }}
      aria-label={l(W.surfaceLabel)}
      role="group"
    >
      {/* The bar: the channel choice with its invitation, the replay. */}
      <div className="demo-bar">
        <div className="demo-bar-top">
          <p id={`${id}-pick`} className="demo-pick-label" data-demo-invite><span className="demo-invite">{channels.length > 1 ? l(B.invite) : l(W.surfaceLabel)}</span></p>
          {/* on the phone the replay is the icon alone (the word stays as its label; REFERENZEN §6, phone) */}
          <button type="button" className="demo-replay" data-demo-replay aria-label={l(W.replay)} onClick={() => { stopAuto(); started.current = true; inView.current = true; setEntered("run"); run(script); }}>
            <RotateCcw size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className="demo-replay-word">{l(W.replay)}</span>
          </button>
        </div>
        {channels.length > 1 && <div ref={tabsRef} role="tablist" aria-labelledby={`${id}-pick`} className="demo-tabs" data-demo-tabs data-demo-tabs-count={channels.length} onKeyDown={onTabKey}>
          {channels.map((c) => {
            const Icon = ICON[c.key];
            const on = c.key === channel;
            return (
              <button key={c.key} type="button" role="tab" id={`${id}-tab-${c.key}`} aria-selected={on} aria-controls={panelId} tabIndex={on ? 0 : -1} onClick={() => choose(c.key)} className={cn("demo-tab", on && "demo-tab-on")} data-demo-tab={c.key}>
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                <span>{l(B.tabs[c.key])}</span>
              </button>
            );
          })}
        </div>}
      </div>

      <div role="tabpanel" id={panelId} aria-labelledby={`${id}-tab-${channel}`} className="demo-body" data-demo-view={channel}>
        {/* 1 The enquiry on its channel's surface */}
        <div className="demo-surface" data-hero-chat data-surface={script.kind}>
          {script.kind === "chat" && script.chat && <ChatSurface c={script} phase={phase} locale={locale} />}
          {script.kind === "mail" && script.mail && <MailSurface c={script} phase={phase} locale={locale} />}
          {script.kind === "form" && script.form && <FormSurface c={script} phase={phase} locale={locale} />}
          {script.kind === "call" && script.call && <CallSurface c={script} phase={phase} locale={locale} />}
        </div>

        {/* The link from the conversation to the record: lights up when the record starts to fill */}
        <div className="demo-link" aria-hidden="true">
          <span className={cn("demo-link-mark", lit && "is-lit")} data-demo-link={lit ? "lit" : "quiet"}><Check size={14} strokeWidth={2.6} /></span>{/* the owner, 24.11.: no arrows — the link between the chat and the record is a check once the record is lit */}
          <span className="demo-link-line" />
          <span className="demo-link-word">{l(W.toRecord)}</span>
        </div>

        {/* 2 and 3 The record / the task (screen 1-C): it stands from the start (C1 of 07.11.: no half-empty surface) and fills field by field;
            then the state, the priority with its reason, the task with its reminder line */}
        <div className="demo-record" data-hero-record="" data-record-live={phase >= recordStart(script) ? "true" : "false"} data-demo-task={isTask ? "true" : undefined}>
          <div className="demo-record-head">
            <p className="demo-key">{script.record.taskHead ? l(script.record.taskHead) : script.record.title ? l(script.record.title) : l(W.record)}</p>
            <p className="demo-record-updated tnum">{l(script.record.updated)}</p>
          </div>
          {isTask && (
            <Item n={script.record.next.at} phase={phase} className="demo-next demo-task" data-hero-next="" data-demo-task-title="">
              <span className="demo-key">{l(B.taskLabel)}</span>
              <span className="demo-next-value">{l(script.record.next.v)}</span>
              <span className="demo-next-sub">{l(script.record.next.sub)}</span>
            </Item>
          )}
          <div className="demo-outcome">
            <div className="demo-outcome-row" data-hero-recorded="" data-at={script.record.state.at}>
              <span className="demo-key">{l(W.state)}</span>
              <Item as="span" n={script.record.state.at} phase={phase} className="demo-value demo-state"><span aria-hidden="true" className="demo-state-dot" />{l(script.record.state.v)}</Item>
            </div>
          </div>
          <dl className="demo-fields">
            {/* C1 (07.11.): the field names stand from the start; the values arrive one by one */}
            {script.record.fields.map((f, i) => (
              <div key={i} className="demo-field" data-hero-result={i + 1} data-at={f.at}>
                <dt className="demo-key">{l(f.k)}</dt>
                <dd className="demo-value"><Item as="span" n={f.at} phase={phase} className="demo-value-in">{l(f.v)}</Item></dd>
              </div>
            ))}
            <div className="demo-field" data-hero-priority="" data-at={script.record.priority.at}>
              <dt className="demo-key">{l(W.priority)}</dt>
              <dd className="demo-value"><Item as="span" n={script.record.priority.at} phase={phase} className="demo-value-in"><span className="demo-priority">{l(script.record.priority.v)}</span> · {l(script.record.priority.why)}</Item></dd>
            </div>
          </dl>
          {!isTask && (
            <div className="demo-outcome">
              <Item n={script.record.next.at} phase={phase} className="demo-next" data-hero-next="">
                <span className="demo-key">{l(W.next)}</span>
                <span className="demo-next-value">{l(script.record.next.v)}</span>
                <span className="demo-next-sub">{l(script.record.next.sub)}</span>
              </Item>
            </div>
          )}
          {script.record.note && <Item as="p" n={script.record.next.at} phase={phase} className="demo-task-note" data-demo-task-note="">{l(script.record.note)}</Item>}
        </div>
      </div>

      {isTask && (
        <Item as="p" n={script.record.next.at} phase={phase} className="demo-caption" data-demo-caption="">
          <a href={`${localePath(locale)}#plans`} className="demo-caption-link" data-demo-to-plans>{l(B.toPlans)}</a>
        </Item>
      )}
      <p className="demo-foot" data-hero-state>
        <span className="demo-foot-mark">{l(brief1120.hero.scene.mark)}</span>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------- */
/* The surfaces                                                                                                            */
/* ---------------------------------------------------------------------------------------------------------------------- */
type S = { c: DemoChannel; phase: number; locale: Locale };

/** A bubble's text: Spanish on both pages (Copy batch 1 §1.1), the EN translation small under it on the EN page. */
function BubbleText({ text, locale }: { text: Record<Locale, string>; locale: Locale }) {
  return (
    <>
      <p lang="es">{text.es}</p>
      {locale !== "es" && <p className="demo-msg-translation" data-demo-translation><span className="demo-msg-translation-label">{brief1120.hero.translation[locale]}:</span> {text.en}</p>}
    </>
  );
}

/** WhatsApp: a chat with the contact's header, the exchanges W-1 … W-4 with their times, typing dots before each reply. */
function ChatSurface({ c, phase, locale }: S) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const ch = c.chat!;
  const turns = ch.turns ?? [
    { who: "customer" as const, text: ch.message, time: ch.time, at: 0 },
    { who: "assistant" as const, text: ch.reply, time: ch.replyTime, at: ch.replyAt, typingAt: ch.typingAt },
  ];
  return (
    <div className="demo-chat" data-chat data-chat-turns={turns.length}>
      <div className="demo-chat-head">
        <span aria-hidden="true" className="demo-avatar" data-channel="whatsapp">{c.who.charAt(0)}</span>
        <div className="min-w-0">
          <p className="demo-chat-name">{c.who} <span className="demo-chat-role">· {l(c.role)}</span></p>
          <p className="demo-chat-meta"><span className="demo-online" aria-hidden="true" />{l(ch.status)}</p>
        </div>
        <Phone size={16} strokeWidth={2} aria-hidden="true" className="demo-chat-tool" />
      </div>
      <div className="demo-thread">
        {turns.map((t, i) => (
          t.who === "customer" ? (
            <Item key={i} n={t.at} phase={phase} className="demo-msg demo-msg-in" data-hero-enquiry={i === 0 ? "" : undefined} data-demo-turn={i + 1}>
              <BubbleText text={t.text} locale={locale} />
              <span className="demo-msg-time tnum">{t.time}</span>
            </Item>
          ) : (
            <div key={i} className="demo-reply-slot">
              {t.typingAt !== undefined && <span className="d-typing demo-msg demo-msg-out demo-typing" style={at(t.typingAt)} data-at={t.typingAt} aria-hidden="true"><i /><i /><i /></span>}
              <Item n={t.at} phase={phase} className="demo-msg demo-msg-out demo-reply" data-hero-reply="" data-demo-turn={i + 1}>
                <p className="demo-msg-label">{l(demoWords.assistant)}</p>
                <BubbleText text={t.text} locale={locale} />
                <span className="demo-msg-time tnum">{t.time}</span>
              </Item>
            </div>
          )
        ))}
      </div>
      <div className="demo-chat-input" aria-hidden="true"><span className="demo-chat-input-box" /><Mic size={16} strokeWidth={2} /></div>
    </div>
  );
}

/** E-mail: a mailbox with its list, the open message with sender, subject and time, then the reply in the thread. */
function MailSurface({ c, phase, locale }: S) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const m = c.mail!;
  return (
    <div className="demo-mail" data-mail>
      <div className="demo-mail-list" aria-hidden="true">
        <p className="demo-mail-folder"><Inbox size={14} strokeWidth={2} />{l(m.folder)}</p>
        {m.inbox.map((row) => (
          <div key={row.from} className={cn("demo-mail-row", row.selected && "is-selected", row.unread && "is-unread")}>
            <span className="demo-mail-row-from">{row.from}</span>
            <span className="demo-mail-row-subject">{l(row.subject)}</span>
            <span className="demo-mail-row-time tnum">{row.time}</span>
          </div>
        ))}
      </div>
      <div className="demo-mail-read">
        <Item n={0} phase={phase} className="demo-mail-msg" data-hero-enquiry="">
          <p className="demo-mail-subject">{l(m.subject)}<Star size={14} strokeWidth={2} aria-hidden="true" className="demo-mail-star" /></p>
          <div className="demo-mail-from">
            <span aria-hidden="true" className="demo-avatar demo-avatar-mail">{m.from.charAt(0)}</span>
            <div className="min-w-0">
              <p className="demo-mail-from-name">{m.from} <span className="demo-mail-addr">&lt;{l(m.fromLine)}&gt;</span></p>
              <p className="demo-chat-meta">{l(m.to)} · {l(m.time)}</p>
            </div>
          </div>
          <p className="demo-mail-body">{l(m.body)}</p>
        </Item>
        <span className="d-typing demo-mail-typing" style={at(m.replyAt - 1)} data-at={m.replyAt - 1} aria-hidden="true"><i /><i /><i /></span>
        <Item n={m.replyAt} phase={phase} className="demo-mail-msg demo-mail-reply demo-reply" data-hero-reply="">
          <div className="demo-mail-from">
            <span aria-hidden="true" className="demo-avatar demo-avatar-agency"><Mark size={20} /></span>
            <div className="min-w-0">
              <p className="demo-mail-from-name demo-msg-label">{l(demoWords.assistant)}</p>
              <p className="demo-chat-meta">{l(m.replyTime)}</p>
            </div>
          </div>
          <p className="demo-mail-body">{l(m.reply)}</p>
        </Item>
      </div>
    </div>
  );
}

/** The web form: real fields that fill in one after another, then the send button is pressed and the form reports "sent". */
function FormSurface({ c, phase, locale }: S) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const f = c.form!;
  const sent = phase >= f.sentAt;
  return (
    <div className="demo-form" data-form data-form-sent={sent ? "true" : "false"}>
      <div className="demo-form-head">
        <span aria-hidden="true" className="demo-browser-dots"><i /><i /><i /></span>
        <p className="demo-form-title">{l(f.title)}</p>
      </div>
      <div className="demo-form-fields" aria-hidden="true">
        {f.fields.map((fd, i) => (
          <div key={i} className={cn("demo-form-field", fd.kind === "textarea" && "is-wide")} data-form-field={i + 1}>
            <span className="demo-form-label">{l(fd.label)}</span>
            <span className={cn("demo-form-input", phase >= fd.at && "is-filled", phase === fd.at && "is-typing", fd.kind === "textarea" && "is-area")}>
              <Item n={fd.at} phase={phase} as="span" className="demo-form-value">{l(fd.value)}</Item>
              {fd.kind === "select" && <ChevronDown size={14} strokeWidth={2} className="demo-form-chev" />}
            </span>
          </div>
        ))}
      </div>
      <div className="demo-form-foot">
        <span className={cn("demo-form-submit", phase >= f.submitAt && "is-pressed", sent && "is-sent")} aria-hidden="true">
          {sent ? <Check size={15} strokeWidth={2.6} /> : <Send size={15} strokeWidth={2} />}
          {sent ? l(f.sent) : l(f.submit)}
        </span>
        {/* the enquiry as text for assistive technology */}
        <p className="sr-only" data-hero-enquiry="">{f.fields.map((fd) => `${l(fd.label)}: ${l(fd.value)}`).join(". ")}</p>
        <Item n={f.sentAt} phase={phase} as="p" className="demo-form-sent-line">{l(f.sent)}</Item>
      </div>
      {/* Copy 1117 §1.2: the reply by e-mail after "Enviado", in the e-mail tab's style with the same label */}
      <Item n={f.replyAt} phase={phase} className="demo-mail-msg demo-mail-reply demo-reply demo-form-reply" data-hero-reply="">
        <div className="demo-mail-from">
          <span aria-hidden="true" className="demo-avatar demo-avatar-agency"><Mark size={20} /></span>
          <div className="min-w-0">
            <p className="demo-mail-from-name demo-msg-label">{l(demoWords.assistant)}</p>
            <p className="demo-chat-meta">{l(f.replyHead)}</p>
          </div>
        </div>
        <p className="demo-mail-body">{l(f.reply)}</p>
      </Item>
    </div>
  );
}

/** The phone: a call view with the caller, a running duration, a waveform while the line is open and the live transcript. */
function CallSurface({ c, phase, locale }: S) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const k = c.call!;
  const live = phase >= k.answeredAt && phase < k.endedAt;
  const ended = phase >= k.endedAt;
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (ended) { setSec(k.seconds); return; }
    if (!live) { setSec(0); return; }
    const t0 = Date.now();
    const iv = window.setInterval(() => setSec(Math.min(k.seconds, Math.floor((Date.now() - t0) / 1000))), 250);
    return () => window.clearInterval(iv);
  }, [live, ended, k.seconds]);
  const mmss = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  return (
    <div className="demo-call" data-call data-call-state={ended ? "ended" : live ? "live" : "ringing"}>
      <div className="demo-call-head">
        <span aria-hidden="true" className="demo-avatar demo-avatar-call">{c.who.charAt(0)}</span>
        <p className="demo-call-name">{c.who} <span className="demo-chat-role">· {l(c.role)}</span></p>
        <p className="demo-call-state tnum" data-call-duration={sec}>
          {ended ? `${l(k.ended)} · ${mmss}` : live ? mmss : l(k.incoming)}
        </p>
        <span className={cn("demo-wave", live && "is-live")} aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ["--n" as string]: i }} />)}</span>
        <span className={cn("demo-call-button", ended && "is-ended")} aria-hidden="true">{ended ? <PhoneOff size={16} strokeWidth={2.2} /> : <Phone size={16} strokeWidth={2.2} />}</span>
      </div>
      <ol className="demo-transcript">
        {k.transcript.map((t, i) => (
          <Item key={i} n={t.at} phase={phase} as="li" className={cn("demo-line", t.speaker === "assistant" ? "demo-line-assistant demo-reply" : "demo-line-customer")} data-hero-enquiry={i === 0 ? "" : undefined} data-hero-reply={t.speaker === "assistant" ? "" : undefined}>
            <span className="demo-line-who">{t.speaker === "assistant" ? l(k.assistantLabel) : c.who}</span>
            <span>{l(t.text)}</span>
          </Item>
        ))}
      </ol>
    </div>
  );
}
