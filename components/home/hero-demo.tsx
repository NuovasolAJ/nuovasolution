"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Mail, MessageCircle, PanelsTopLeft, Phone, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { demoChannels, demoWords, endPhase, type DemoChannel, type DemoChannelKey } from "@/lib/content/home-demo";

/**
 * The hero's demonstration (the owner's review of 02.11.2026, §3 "ein Gespräch, drei sichtbare Folgen", §8): the enquiry arrives on a
 * realistic messenger surface, Nuova types once and answers, the customer record fills beside it, and the team sees state, priority
 * and the next step. The end state stays; "Repetir demo" runs it again.
 *
 * How it runs: the root carries the phase as a number (`--phase`) and as an attribute; every item knows the phase it belongs to
 * (`--at`), and one CSS rule (globals.css ".demo") derives its visibility from the two, so the markup is complete from the first
 * paint. JavaScript only advances the phase on a few timers once the surface is in view. Without JavaScript and with reduced motion
 * the finished picture stands at once (CSS), and the replay control is hidden.
 *
 * The channel selector is a native tablist (icon and name, a filled active state, arrow keys, no automatic change). Choosing a
 * channel runs that channel's sequence.
 */
const ICON: Record<DemoChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };
const REDUCE = "(prefers-reduced-motion: reduce)";

const at = (n: number, extra?: CSSProperties): CSSProperties => ({ ["--at" as string]: n, ...extra });

/** An item of the sequence: appears in its phase; `fresh` flashes the moment it has just arrived. */
function Item({ n, phase, className, children, as: Tag = "div", ...rest }: { n: number; phase: number; className?: string; children: ReactNode; as?: "div" | "p" | "li" } & Record<string, unknown>) {
  return (
    <Tag className={cn("d-at", className, phase === n && "is-fresh")} style={at(n)} data-at={n} {...rest}>
      {children}
    </Tag>
  );
}

export function HeroDemo({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const W = demoWords;
  const [channel, setChannel] = useState<DemoChannelKey>("whatsapp");
  const [phase, setPhase] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const id = useId();
  const script = demoChannels.find((c) => c.key === channel) as DemoChannel;
  const end = endPhase(script);
  const done = phase >= end;

  const clear = () => { for (const t of timers.current) window.clearTimeout(t); timers.current = []; };

  /** Runs the chosen channel's sequence from its first phase; with reduced motion the end state is set at once. */
  const run = useCallback((c: DemoChannel) => {
    clear();
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(c)); return; }
    setPhase(0);
    let t = 0;
    c.timings.forEach((ms, i) => {
      if (i === 0) return;
      t += ms;
      timers.current.push(window.setTimeout(() => setPhase(i), t));
    });
  }, []);

  // The first run starts when the surface is in view (on a phone it stands below the words).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia(REDUCE).matches) { setPhase(endPhase(script)); started.current = true; return; }
    const io = new IntersectionObserver((entries) => {
      if (started.current || !entries.some((e) => e.isIntersecting)) return;
      started.current = true;
      run(script);
      io.disconnect();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Ver la demo" (the hero's main action) runs the demonstration again and lets the anchor bring it into view.
  useEffect(() => {
    const cta = document.querySelector<HTMLAnchorElement>("[data-hero-cta=\"demo\"]");
    if (!cta) return;
    const onClick = () => { started.current = true; run(script); };
    cta.addEventListener("click", onClick);
    return () => cta.removeEventListener("click", onClick);
  }, [run, script]);

  useEffect(() => clear, []);

  const choose = (key: DemoChannelKey) => {
    if (key === channel) return;
    const c = demoChannels.find((x) => x.key === key) as DemoChannel;
    setChannel(key);
    started.current = true;
    run(c);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = demoChannels.map((c) => c.key);
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

  const es = locale === "es";
  const langName = (code: "es" | "de") => W.langs[code][locale];
  const msgText = (m: { text: string; lang: "es" | "de"; translation?: { es: string; en: string } }) => (m.lang === locale || !m.translation ? m.text : l(m.translation));
  const chat = !script.surfaceTitle;
  const panelId = `${id}-panel`;

  return (
    <div
      ref={rootRef}
      id="demo"
      className="demo"
      data-demo
      data-demo-channel={channel}
      data-demo-phase={phase}
      data-demo-done={done ? "true" : "false"}
      style={{ ["--phase" as string]: phase, ["--end" as string]: end }}
      aria-label={l(W.surfaceLabel)}
      role="group"
    >
      {/* The bar: the channel choice with its hint, the replay. */}
      <div className="demo-bar">
        <div className="demo-bar-top">
          <p id={`${id}-pick`} className="demo-pick-label">{l(W.pick)}</p>
          <button type="button" className="demo-replay" data-demo-replay onClick={() => { started.current = true; run(script); }}>
            <RotateCcw size={14} strokeWidth={2.2} aria-hidden="true" />
            {l(W.replay)}
          </button>
        </div>
        <div ref={tabsRef} role="tablist" aria-labelledby={`${id}-pick`} className="demo-tabs" data-demo-tabs onKeyDown={onTabKey}>
          {demoChannels.map((c) => {
            const Icon = ICON[c.key];
            const on = c.key === channel;
            return (
              <button key={c.key} type="button" role="tab" id={`${id}-tab-${c.key}`} aria-selected={on} aria-controls={panelId} tabIndex={on ? 0 : -1} onClick={() => choose(c.key)} className={cn("demo-tab", on && "demo-tab-on")} data-demo-tab={c.key} data-demo-mark={c.mark ? "prototype" : undefined}>
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
                <span>{l(c.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" id={panelId} aria-labelledby={`${id}-tab-${channel}`} className="demo-body" data-demo-view={channel}>
        {/* 1 The enquiry: a messenger surface (or the form / the call), the customer's words */}
        <div className={cn("demo-chat", !chat && "demo-chat-plain")} data-hero-chat>
          <div className="demo-chat-head">
            {chat ? (
              <span aria-hidden="true" className="demo-avatar" data-channel={channel}>{script.who.charAt(0)}</span>
            ) : (
              <span aria-hidden="true" className="demo-avatar demo-avatar-plain" data-channel={channel}>{(() => { const I = ICON[channel]; return <I size={16} strokeWidth={2} />; })()}</span>
            )}
            <div className="min-w-0">
              <p className="demo-chat-name">{script.surfaceTitle ? l(script.surfaceTitle) : script.who}</p>
              {/* a prototype channel says so here, on its own surface (claims lines 02.11.: the web form and the phone are prototypes) */}
              <p className="demo-chat-meta">{script.mark && <span className="demo-chat-mark" data-demo-prototype>{l(script.mark)} · </span>}{script.surfaceTitle ? `${script.who} · ${l(script.role)} · ${l(script.meta)}` : `${l(script.role)} · ${l(script.meta)}`}</p>
            </div>
          </div>

          <div className="demo-thread">
            {script.inbound.map((m, i) => (
              <Item key={i} n={m.at} phase={phase} className="demo-msg demo-msg-in" data-hero-enquiry={i === 0 ? "" : undefined}>
                <p lang={m.lang === locale ? undefined : m.lang === "de" ? "de" : m.lang}>{msgText(m)}</p>
                {m.lang !== locale && (
                  <p className="demo-msg-meta">{l(W.translationOf)} · {l(W.writtenIn).replace("{lang}", langName(m.lang))}</p>
                )}
              </Item>
            ))}

            {script.reply && (
              <div className="demo-reply-slot">
                {script.typingAt !== undefined && (
                  <span className="d-typing demo-msg demo-msg-out demo-typing" style={at(script.typingAt)} data-at={script.typingAt} aria-hidden="true">
                    <i /><i /><i />
                  </span>
                )}
                <Item n={script.reply.at} phase={phase} className="demo-msg demo-msg-out demo-reply" data-hero-reply="">
                  <p className="demo-msg-label">{l(W.assistant)}</p>
                  <p>{msgText(script.reply)}</p>
                  <p className="demo-msg-meta">{l(script.reply.meta)}</p>
                </Item>
              </div>
            )}

            {script.held && (
              <Item n={script.held.at} phase={phase} className="demo-note" data-hero-reply="" data-hero-held="">
                <p className="demo-note-title">{l(script.held.title)}</p>
                <p>{l(script.held.line)}</p>
              </Item>
            )}
            {script.call && (
              <Item n={script.call.at} phase={phase} className="demo-note" data-hero-reply="" data-hero-call="">
                <p className="demo-note-title">{l(script.call.title)}</p>
                <p>{l(script.call.line)}</p>
              </Item>
            )}
          </div>
        </div>

        {/* The link from the conversation to the record: lights up when the record starts to fill */}
        <div className="demo-link" aria-hidden="true">
          <span className={cn("demo-link-mark", phase >= script.record.fields[0].at && "is-lit")} data-demo-link={phase >= script.record.fields[0].at ? "lit" : "quiet"}><ArrowRight size={14} strokeWidth={2.4} /></span>
          <span className="demo-link-line" />
          <span className="demo-link-word">{l(W.toRecord)}</span>
        </div>

        {/* 2 and 3 The record: what was noted, grouped; then the state, the priority with its reason, the next step */}
        {/* the record exists only once the reply is there: until then the column stays empty */}
        <Item n={script.record.fields[0].at} phase={phase} className="demo-record" data-hero-record="">
          <div className="demo-record-head">
            <p className="demo-key">{l(W.record)}</p>
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
            <Item n={script.record.state.at} phase={phase} className="demo-outcome-row" data-hero-result={6} data-hero-recorded="">
              <span className="demo-key">{l(W.state)}</span>
              <span className="demo-value demo-state"><span aria-hidden="true" className="demo-state-dot" />{l(script.record.state.v)}</span>
            </Item>
            <Item n={script.record.priority.at} phase={phase} className="demo-outcome-row" data-hero-result={7} data-hero-priority="">
              <span className="demo-key">{l(W.priority)}</span>
              <span className="demo-value"><span className="demo-priority">{l(script.record.priority.v)}</span> · {l(script.record.priority.why)}</span>
            </Item>
            <Item n={script.record.next.at} phase={phase} className="demo-next" data-hero-result={8} data-hero-next="">
              <span className="demo-key">{l(W.next)}</span>
              <span className="demo-next-value">{l(script.record.next.v)}</span>
              <span className="demo-next-sub">{l(script.record.next.sub)}</span>
            </Item>
          </div>
        </Item>
      </div>

      <p className="demo-foot" data-hero-state>
        <span className="demo-foot-mark">{l(W.fictional)}</span>
        <span>{es ? W.assistantNote.es : W.assistantNote.en}</span>
      </p>
    </div>
  );
}
