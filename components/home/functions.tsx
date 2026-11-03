"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Bell, Check, Clock, Mail, MessageCircle, Phone, PanelsTopLeft, Send, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103, statusWords, type Status } from "@/lib/content/home-1103";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The core functions as product surfaces (the owner's order of 03.11.2026, point 4; research 1103 R5 Attio, S1 Linear,
 * Aceternity's sticky scroll reveal): at the left the six functions, each with one line and its state; at the right one sticky
 * stage that shows the product surface of the function in view. On a phone every function stands with its own surface in a
 * linear stack (report §8: no scroll trap on mobile). Every surface shows the one story (Laura, Elena, the example agency);
 * the states follow the claims lines (the alert, the task list, matching and follow-ups are in preparation).
 */
type Key = (typeof home1103.functions.items)[number]["key"];

export function Functions({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.functions;
  const [active, setActive] = useState<Key>("priority");
  const reduce = useReducedMotion();
  const refs = useRef<Record<string, HTMLLIElement | null>>({});

  // the function nearest the middle of the window is the active one (desktop only: the stage is sticky from 1024 px)
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.fn as Key);
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="functions" aria-labelledby="fn-h" className="fn" data-functions data-fn-active={active}>
      <div className="container-default">
        <Rise className="fn-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="fn-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <div className="fn-grid">
          <ol className="fn-list">
            {w.items.map((it, i) => (
              <li key={it.key} ref={(el) => { refs.current[it.key] = el; }} data-fn={it.key} className={cn("fn-item", active === it.key && "is-active")}>
                <button type="button" className="fn-item-button" onClick={() => { setActive(it.key); refs.current[it.key]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); }} aria-pressed={active === it.key} data-fn-button={it.key}>
                  <span className="fn-item-no tnum">0{i + 1}</span>
                  <span className="fn-item-words">
                    <span className="fn-item-title">{l(it.title)}</span>
                    <span className="fn-item-line">{l(it.line)}</span>
                    <span className="fn-item-state"><StatusPill status={it.status} locale={locale} />{it.statusLine && <span className="fn-item-note">{l(it.statusLine)}</span>}</span>
                  </span>
                </button>
                {/* on a phone the surface stands with its function */}
                <div className="fn-item-surface" data-fn-surface-inline={it.key}><Surface k={it.key} locale={locale} /></div>
              </li>
            ))}
          </ol>
          <div className="fn-stage" data-fn-stage>
            <div className="fn-stage-inner">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={active} initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.99 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="fn-stage-surface" data-fn-surface={active}>
                  <Surface k={active} locale={locale} />
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatusPill({ status, locale, className }: { status: Status; locale: Locale; className?: string }) {
  return (
    <span className={cn("status-pill", className)} data-status={status}>
      {status === "included" && <Check size={12} strokeWidth={3} aria-hidden="true" />}
      {statusWords[status][locale]}
    </span>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------- */
/* The product surfaces                                                                                                    */
/* ---------------------------------------------------------------------------------------------------------------------- */
const CH_ICON: Record<string, typeof Mail> = { WhatsApp: MessageCircle, Email: Mail, "E-mail": Mail, "Formulario web": PanelsTopLeft, "Web form": PanelsTopLeft, Teléfono: Phone, Phone: Phone };

function Surface({ k, locale }: { k: Key; locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const u = home1103.functions.ui;
  const reduce = useReducedMotion();
  const stagger = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

  if (k === "priority") {
    const p = u.priority;
    return (
      <div className="ps" data-ps="priority">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">3</span></div>
        <ul className="ps-rows">
          {l(p.rows).map((r, i) => (
            <m.li key={r.who} className="ps-row" {...stagger(i)}>
              <span className="ps-avatar" aria-hidden="true">{r.who.charAt(0)}</span>
              <span className="ps-row-main"><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.channel}</span></span>
              <span className="ps-row-prio"><span className="demo-priority" data-prio={r.p}>{r.p}</span><span className="ps-row-why">{r.why}</span></span>
            </m.li>
          ))}
        </ul>
        <m.p className="ps-foot ps-foot-prep" {...stagger(5)}><Bell size={14} strokeWidth={2} aria-hidden="true" />{l(p.alert)}</m.p>
      </div>
    );
  }
  if (k === "reply") {
    const p = u.reply;
    return (
      <div className="ps" data-ps="reply">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta"><Clock size={13} strokeWidth={2} aria-hidden="true" />24 h</span></div>
        <ul className="ps-rows">
          {l(p.rows).map((r, i) => {
            const Icon = CH_ICON[r.ch] ?? Mail;
            return (
              <m.li key={r.t} className="ps-row ps-row-reply" {...stagger(i)}>
                <span className="ps-time tnum">{r.t}</span>
                <span className="ps-row-main"><span className="ps-row-who"><Icon size={14} strokeWidth={2} aria-hidden="true" className={cn(r.ch === "WhatsApp" && "text-[color:var(--channel-whatsapp)]")} />{r.who}</span><span className="ps-row-sub">{r.what}</span></span>
                <span className="ps-done"><Check size={12} strokeWidth={3} aria-hidden="true" />{r.s}</span>
              </m.li>
            );
          })}
        </ul>
        <p className="ps-foot">{l(p.foot)}</p>
      </div>
    );
  }
  if (k === "record") {
    const p = u.record;
    return (
      <div className="ps" data-ps="record">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">CRM</span></div>
        <dl className="ps-fields">
          {l(p.fields).map(([kk, v], i) => (
            <m.div key={kk} className="ps-field" {...stagger(i)}><dt>{kk}</dt><dd>{v}</dd></m.div>
          ))}
        </dl>
        <p className="ps-sub">{l(p.history)}</p>
        <ul className="ps-events">
          {l(p.events).map((e, i) => (
            <m.li key={e.t} {...stagger(6 + i)}><span className="tnum">{e.t}</span><span className="ps-chip"><MessageCircle size={12} strokeWidth={2} aria-hidden="true" className="text-[color:var(--channel-whatsapp)]" />{e.ch}</span><span>{e.what}</span></m.li>
          ))}
        </ul>
      </div>
    );
  }
  if (k === "matching") {
    const p = u.matching;
    return (
      <div className="ps" data-ps="matching">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span></div>
        <p className="ps-because">{l(p.because)}</p>
        <ul className="ps-listings">
          {l(p.rows).map((r, i) => (
            <m.li key={r.ref} className="ps-listing" {...stagger(i)}>
              <span className="ps-listing-art" aria-hidden="true" data-art={i} />
              <span className="ps-listing-main"><span className="ps-row-who">{r.t}</span><span className="ps-row-sub">{r.ref} · {r.place}</span><span className="ps-fit"><Check size={12} strokeWidth={3} aria-hidden="true" />{r.fit}</span></span>
              <span className="ps-price tnum">{r.price}</span>
            </m.li>
          ))}
        </ul>
        <m.p className="ps-action" {...stagger(3)}><Send size={14} strokeWidth={2} aria-hidden="true" />{l(p.action)}</m.p>
      </div>
    );
  }
  if (k === "followup") {
    const p = u.followup;
    return (
      <div className="ps" data-ps="followup">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span></div>
        <m.div className="ps-listing ps-listing-new" {...stagger(0)}>
          <span className="ps-listing-art" aria-hidden="true" data-art={2} />
          <span className="ps-listing-main"><span className="ps-row-who">{l(p.listing)}</span><span className="ps-fit"><Check size={12} strokeWidth={3} aria-hidden="true" />{l(p.fits)}</span></span>
        </m.div>
        <m.p className="ps-permission" {...stagger(1)}><ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />{l(p.permission)}</m.p>
        <m.p className="ps-action" {...stagger(2)}><Mail size={14} strokeWidth={2} aria-hidden="true" />{l(p.action)}</m.p>
        <p className="ps-foot">{l(p.noPermission)}</p>
      </div>
    );
  }
  const p = u.team;
  return (
    <div className="ps" data-ps="team">
      <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">3</span></div>
      <m.p className="ps-assistant" {...stagger(0)}>{l(p.assistant)}</m.p>
      <ul className="ps-rows">
        {l(p.rows).map((r, i) => (
          <m.li key={r.who} className="ps-task" {...stagger(1 + i)}>
            <span className="ps-task-main"><span className="ps-task-kind">{r.kind}</span><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.why}</span><span className="ps-task-step">{r.step}</span></span>
            <span className={cn("ps-take", r.state.startsWith("Tomada") || r.state.startsWith("Taken") ? "is-taken" : "")}>{r.state.startsWith("Tomada") || r.state.startsWith("Taken") ? r.state : l(p.take)}</span>
          </m.li>
        ))}
      </ul>
    </div>
  );
}
