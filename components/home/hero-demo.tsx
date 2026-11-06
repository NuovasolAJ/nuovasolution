"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Inbox, Mail, MessageCircle, Mic, PanelsTopLeft, Phone, PhoneOff, RotateCcw, Send, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { demoChannels, demoWords, endPhase, recordStart, runLength, type DemoChannel, type DemoChannelKey } from "@/lib/content/home-demo";
import { shows, type ClaimView } from "@/lib/claims";

/**
 * The demonstration under the hero (the owner's order of 03.11.2026, points 2 and 3): four channels, each on a surface that
 * looks like its channel, and beside each the customer record filling field by field.
 *
 * How it runs: the root carries the phase as a number (`--phase`) and as an attribute; every item knows the phase it belongs
 * to (`--at`), and one CSS rule (globals.css ".demo .d-at") derives its visibility from the two, so the markup is complete from
 * the first paint. JavaScript only advances the phase on a few timers once the surface is in view. Without JavaScript and with
 * reduced motion the finished picture stands at once (CSS), and the replay control is hidden.
 *
 * The channel selector is a native tablist (icon and full name, a filled active state, arrow keys). The owner's point 4 of
 * 06.11.: the tabs are visibly clickable (larger, a clear hover, Copy's invitation above them) and change on their own after each
 * run with a progress bar on the active tab, until the first click or key press stops the rotation. The public view shows only the
 * channels that are included (lib/claims.ts); no mark and no status word stands on any surface (points 5 and "coming soon").
 */
const ICON: Record<DemoChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };
const REDUCE = "(prefers-reduced-motion: reduce)";
const at = (n: number, extra?: CSSProperties): CSSProperties => ({ ["--at" as string]: n, ...extra });

/** An item of the sequence: appears in its phase; `fresh` flashes the moment it has just arrived. */
function Item({ n, phase, className, children, as: Tag = "div", ...rest }: { n: number; phase: number; className?: string; children: ReactNode; as?: "div" | "p" | "li" | "span" } & Record<string, unknown>) {
  return (
    <Tag className={cn("d-at", className, phase === n && "is-fresh")} style={at(n)} data-at={n} {...rest}>
      {children}
    </Tag>
  );
}

const PAUSE_AFTER_RUN = 2600;

export function HeroDemo({ locale, view = "target" }: { locale: Locale; view?: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const W = demoWords;
  const channels = demoChannels.filter((c) => shows(c.claim, view));
  const [channel, setChannel] = useState<DemoChannelKey>("whatsapp");
  const [phase, setPhase] = useState(0);
  // the rotation: on until the first click or key on the tabs (or the replay); `turn` restarts the bar on every run
  const [auto, setAuto] = useState(true);
  const [turn, setTurn] = useState(0);
  const manual = useRef(false);
  const inView = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const id = useId();
  const script = (channels.find((c) => c.key === channel) ?? channels[0]) as DemoChannel;
  const end = endPhase(script);
  const done = phase >= end;

  const clear = () => { for (const t of timers.current) window.clearTimeout(t); timers.current = []; };

  /**
   * Runs the chosen channel's sequence from its first phase; with reduced motion the end state is set at once (and nothing rotates).
   * While the rotation is on, the next channel follows a pause after the run (the bar on the active tab shows that time).
   */
  const run = useCallback((c: DemoChannel) => {
    clear();
    setTurn((n) => n + 1);
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(c)); setAuto(false); return; }
    setPhase(0);
    let t = 0;
    c.timings.forEach((ms, i) => {
      if (i === 0) return;
      t += ms;
      timers.current.push(window.setTimeout(() => setPhase(i), t));
    });
    timers.current.push(window.setTimeout(() => {
      if (manual.current || !inView.current) return;
      const keys = channels.map((x) => x.key);
      const nextKey = keys[(keys.indexOf(c.key) + 1) % keys.length];
      const nc = channels.find((x) => x.key === nextKey) as DemoChannel;
      setChannel(nextKey);
      run(nc);
    }, t + PAUSE_AFTER_RUN));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels.map((c) => c.key).join()]);

  // The first run starts when the surface is in view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(script)); started.current = true; setAuto(false); return; }
    const io = new IntersectionObserver((entries) => {
      inView.current = entries.some((e) => e.isIntersecting);
      if (started.current || !inView.current) return;
      started.current = true;
      run(script);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Ver la demo" (the hero's main action and the header's button) runs the demonstration again.
  useEffect(() => {
    const ctas = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-hero-cta=\"demo\"], [data-demo-run]"));
    const onClick = () => { started.current = true; inView.current = true; run(script); };
    for (const c of ctas) c.addEventListener("click", onClick);
    return () => { for (const c of ctas) c.removeEventListener("click", onClick); };
  }, [run, script]);

  useEffect(() => clear, []);

  /** A person's choice stops the rotation for good (owner point 4). */
  const stopAuto = () => { manual.current = true; setAuto(false); };
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

  return (
    <div
      ref={rootRef}
      id="demo"
      className="demo"
      data-demo
      data-demo-kind={script.kind}
      data-demo-channel={channel}
      data-demo-phase={phase}
      data-demo-done={done ? "true" : "false"}
      data-demo-auto={auto && started.current ? "true" : "false"}
      data-demo-view={view}
      style={{ ["--phase" as string]: phase, ["--end" as string]: end, ["--run" as string]: `${runLength(script) + PAUSE_AFTER_RUN}ms` }}
      aria-label={l(W.surfaceLabel)}
      role="group"
    >
      {/* The bar: the channel choice with its hint, the replay. */}
      <div className="demo-bar">
        <div className="demo-bar-top">
          <p id={`${id}-pick`} className="demo-pick-label" data-demo-invite>{channels.length > 1 ? <><span className="demo-pick-word">{l(W.pick)}</span><span className="demo-invite">{l(W.invite)}</span></> : <span className="demo-invite">{l(W.surfaceLabel)}</span>}</p>
          <button type="button" className="demo-replay" data-demo-replay onClick={() => { stopAuto(); started.current = true; inView.current = true; run(script); }}>
            <RotateCcw size={14} strokeWidth={2.2} aria-hidden="true" />
            {l(W.replay)}
          </button>
        </div>
        {channels.length > 1 && <div ref={tabsRef} role="tablist" aria-labelledby={`${id}-pick`} className="demo-tabs" data-demo-tabs onKeyDown={onTabKey}>
          {channels.map((c) => {
            const Icon = ICON[c.key];
            const on = c.key === channel;
            return (
              <button key={c.key} type="button" role="tab" id={`${id}-tab-${c.key}`} aria-selected={on} aria-controls={panelId} tabIndex={on ? 0 : -1} onClick={() => choose(c.key)} className={cn("demo-tab", on && "demo-tab-on")} data-demo-tab={c.key} title={auto ? l(W.autoLabel) : undefined}>
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                <span>{l(c.name)}</span>
                {/* the time to the next channel while the rotation is on: a thin bar at the tab's foot (CSS animation over --run; restarted per run) */}
                {on && auto && started.current && <span key={turn} className="demo-tab-bar" aria-hidden="true" data-demo-tab-bar />}
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
          <span className={cn("demo-link-mark", lit && "is-lit")} data-demo-link={lit ? "lit" : "quiet"}><ArrowRight size={14} strokeWidth={2.4} /></span>
          <span className="demo-link-line" />
          <span className="demo-link-word">{l(W.toRecord)}</span>
        </div>

        {/* 2 and 3 The record: what was noted, field by field; then the state, the priority with its reason, the next step */}
        <Item n={recordStart(script)} phase={phase} className="demo-record" data-hero-record="">
          <div className="demo-record-head">
            <p className="demo-key">{script.record.title ? l(script.record.title) : l(W.record)}</p>
            <p className="demo-record-updated tnum">{l(script.record.updated)}</p>
          </div>
          <dl className="demo-fields">
            {script.record.fields.map((f, i) => (
              <Item key={i} n={f.at} phase={phase} className="demo-field" data-hero-result={i + 1}>
                <dt className="demo-key">{l(f.k)}</dt>
                <dd className="demo-value">{l(f.v)}</dd>
              </Item>
            ))}
          </dl>
          <div className="demo-outcome">
            <Item n={script.record.state.at} phase={phase} className="demo-outcome-row" data-hero-recorded="">
              <span className="demo-key">{l(W.state)}</span>
              <span className="demo-value demo-state"><span aria-hidden="true" className="demo-state-dot" />{l(script.record.state.v)}</span>
            </Item>
            <Item n={script.record.priority.at} phase={phase} className="demo-outcome-row" data-hero-priority="">
              <span className="demo-key">{l(W.priority)}</span>
              <span className="demo-value"><span className="demo-priority">{l(script.record.priority.v)}</span> · {l(script.record.priority.why)}</span>
            </Item>
            <Item n={script.record.next.at} phase={phase} className="demo-next" data-hero-next="">
              <span className="demo-key">{l(W.next)}</span>
              <span className="demo-next-value">{l(script.record.next.v)}</span>
              <span className="demo-next-sub">{l(script.record.next.sub)}</span>
            </Item>
          </div>
        </Item>
      </div>

      <p className="demo-foot" data-hero-state>
        <span className="demo-foot-mark">{l(W.fictional)}</span>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------- */
/* The surfaces                                                                                                            */
/* ---------------------------------------------------------------------------------------------------------------------- */
type S = { c: DemoChannel; phase: number; locale: Locale };

/** WhatsApp: a chat with the contact's header, one message with its time, typing dots once, the reply with its time and one tick. */
function ChatSurface({ c, phase, locale }: S) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const ch = c.chat!;
  return (
    <div className="demo-chat" data-chat>
      <div className="demo-chat-head">
        <span aria-hidden="true" className="demo-avatar" data-channel="whatsapp">{c.who.charAt(0)}</span>
        <div className="min-w-0">
          <p className="demo-chat-name">{c.who} <span className="demo-chat-role">· {l(c.role)}</span></p>
          <p className="demo-chat-meta"><span className="demo-online" aria-hidden="true" />{l(ch.status)}</p>
        </div>
        <Phone size={16} strokeWidth={2} aria-hidden="true" className="demo-chat-tool" />
      </div>
      <div className="demo-thread">
        <Item n={0} phase={phase} className="demo-msg demo-msg-in" data-hero-enquiry="">
          <p>{l(ch.message)}</p>
          <span className="demo-msg-time tnum">{ch.time}</span>
        </Item>
        <div className="demo-reply-slot">
          <span className="d-typing demo-msg demo-msg-out demo-typing" style={at(ch.typingAt)} data-at={ch.typingAt} aria-hidden="true"><i /><i /><i /></span>
          <Item n={ch.replyAt} phase={phase} className="demo-msg demo-msg-out demo-reply" data-hero-reply="">
            <p className="demo-msg-label">{l(demoWords.assistant)}</p>
            <p>{l(ch.reply)}</p>
            <span className="demo-msg-time tnum">{ch.replyTime}</span>
          </Item>
        </div>
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
            <span aria-hidden="true" className="demo-avatar demo-avatar-agency">N</span>
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
        <Item n={f.sentAt} phase={phase} as="p" className="demo-form-sent-line" data-hero-reply="">{l(f.sent)}</Item>
      </div>
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
