"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Bell, Check, ChevronRight, Clock, Instagram, Mail, MessageCircle, Mic, Phone, PanelsTopLeft, Send, ShieldCheck, Tag, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { home1103, statusWords, type Status } from "@/lib/content/home-1103";
import { claim, claimWords, type ClaimKey } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The ten scenes as product surfaces (Copy 1105 v3 §5; the owner's orders of 03.11. point 4 and 05.11. points 5–7): at the left
 * the scenes with one line and their state, a progress mark 01–10 and the active card lifted; at the right one sticky stage that
 * swaps the product surface of the scene in view with a soft rise. The stage is clickable: it advances to the next scene (and the
 * keyboard does the same). "Inmuebles que encajan" shows the licensed sample photographs of the media register with "Proponer a
 * Laura · Próximamente"; "El día de tu equipo" opens a small Daily view after the team's app (staff-v13) with the voice bar when
 "Tomar" (marked "Demo", a real button) is pressed. On a phone every scene stands with its own surface in a linear stack. Every state word
 * comes from lib/claims.ts.
 */
type Key = (typeof home1103.functions.items)[number]["key"];

export function Functions({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.functions;
  const keys = w.items.map((i) => i.key);
  const [active, setActive] = useState<Key>("priority");
  const reduce = useReducedMotion();
  const refs = useRef<Record<string, HTMLLIElement | null>>({});
  const idx = keys.indexOf(active);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.fn as Key);
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (k: Key) => { setActive(k); refs.current[k]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); };
  const next = () => go(keys[(idx + 1) % keys.length]);
  const no = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="functions" aria-labelledby="fn-h" className="fn" data-functions data-fn-active={active} data-fn-index={idx + 1}>
      <div className="container-default">
        <Rise className="fn-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="fn-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="fn-hint t-body-s text-text-muted">{l(w.hint)}</p>
        </Rise>
        <div className="fn-grid">
          <ol className="fn-list">
            {w.items.map((it, i) => (
              <li key={it.key} ref={(el) => { refs.current[it.key] = el; }} data-fn={it.key} className={cn("fn-item", active === it.key && "is-active")}>
                <button type="button" className="fn-item-button" onClick={() => go(it.key)} aria-pressed={active === it.key} data-fn-button={it.key}>
                  <span className="fn-item-no tnum">{no(i)}</span>
                  <span className="fn-item-words">
                    <span className="fn-item-title">{l(it.title)}</span>
                    <span className="fn-item-line">{l(it.line)}</span>
                    <span className="fn-item-state">
                      <StatusPill status={claim(it.claim)} locale={locale} />
                      {it.soon && claim(it.soon.claim) !== "included" && <span className="fn-item-note" data-fn-soon={it.soon.claim}>{l(it.soon)} · {claimWords[claim(it.soon.claim)][locale].toLowerCase()}</span>}
                    </span>
                  </span>
                </button>
                <div className="fn-item-surface" data-fn-surface-inline={it.key}><Surface k={it.key} locale={locale} /></div>
              </li>
            ))}
          </ol>
          <div className="fn-stage" data-fn-stage>
            {/* the progress of the scenes (05.11., point 5): 01–10, the active one filled */}
            <ol className="fn-progress" aria-label={l(w.progress)} data-fn-progress>
              {keys.map((k, i) => (
                <li key={k}><button type="button" className={cn("fn-progress-dot", i === idx && "is-on", i < idx && "is-past")} onClick={() => go(k)} aria-label={`${l(w.progress)} ${i + 1}`} aria-current={i === idx ? "step" : undefined}><span className="tnum">{no(i)}</span></button></li>
              ))}
            </ol>
            {/* the stage: a click anywhere on it advances (mouse convenience); the real control is the "Siguiente escena" button, so the surfaces may carry their own buttons (Reviewer: "Tomar" as a real button) */}
            <div className="fn-stage-inner" onClick={next} data-fn-stage-button>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={active} initial={reduce ? false : { opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.99 }} transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }} className="fn-stage-surface" data-fn-surface={active}>
                  <Surface k={active} locale={locale} />
                </m.div>
              </AnimatePresence>
              <button type="button" className="fn-stage-next" onClick={(e) => { e.stopPropagation(); next(); }} data-fn-stage-next>{l(w.next)}<ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" /></button>
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

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={320} height={200} loading="lazy" decoding="async" className={className} />;
}

function SoonLine({ k, locale, children }: { k: ClaimKey; locale: Locale; children: ReactNode }) {
  const s = claim(k);
  return <span className={cn("ps-soon", s === "included" && "is-included")} data-claim={k} data-state={s}>{children} · {claimWords[s][locale].toLowerCase()}</span>;
}

function useStagger() {
  const reduce = useReducedMotion();
  return (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });
}

function Surface({ k, locale }: { k: Key; locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const u = home1103.functions.ui;
  const stagger = useStagger();

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
        <m.p className="ps-foot" {...stagger(4)}><Bell size={14} strokeWidth={2} aria-hidden="true" /><SoonLine k="alert" locale={locale}>{l(p.alert)}</SoonLine></m.p>
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
        <m.p className="ps-assistant" {...stagger(7)}>{l(p.priority)}</m.p>
        <p className="ps-foot">{l(p.next)}</p>
      </div>
    );
  }
  if (k === "origin") {
    const p = u.origin;
    return (
      <div className="ps" data-ps="origin">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">CRM</span></div>
        <ul className="ps-rows">
          {l(p.rows).map((r, i) => {
            const Icon = CH_ICON[r.origin] ?? Mail;
            return (
              <m.li key={r.who} className="ps-row ps-row-inbox" {...stagger(i)}>
                <span className="ps-row-main"><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.what}</span></span>
                <span className="ps-tags"><span className="ps-tag" data-origin><Icon size={11} strokeWidth={2.2} aria-hidden="true" />{r.origin}</span></span>
              </m.li>
            );
          })}
          {l(p.soonRows).map((o, i) => (
            <m.li key={o} className="ps-row ps-row-inbox is-quiet" {...stagger(3 + i)}>
              <span className="ps-row-main"><span className="ps-row-sub">{o}</span></span>
              <span className="ps-tags"><span className="ps-tag ps-tag-origin" data-origin-soon>{claimWords[claim("adsLeads")][locale]}</span></span>
            </m.li>
          ))}
        </ul>
        <p className="ps-foot"><SoonLine k="adsLeads" locale={locale}>{locale === "es" ? "Portales y anuncios" : "Portals and ads"}</SoonLine></p>
      </div>
    );
  }
  if (k === "language") {
    const p = u.language;
    return (
      <div className="ps" data-ps="language">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">CRM</span></div>
        <dl className="ps-fields">
          {l(p.fields).map(([kk, v], i) => (
            <m.div key={kk} className={cn("ps-field", /reconocido|recognised/.test(v) && "is-lit")} {...stagger(i)}><dt>{kk}</dt><dd>{v}</dd></m.div>
          ))}
        </dl>
        <p className="ps-sub">{l(p.history)}</p>
        <ul className="ps-events">
          {l(p.events).map((e, i) => (
            <m.li key={i} {...stagger(5 + i)}><span className="tnum">{e.t}</span><span className="ps-chip"><Mail size={12} strokeWidth={2} aria-hidden="true" />{e.ch}</span><span>{e.what}</span></m.li>
          ))}
        </ul>
        <p className="ps-foot"><SoonLine k="otherLanguages" locale={locale}>{locale === "es" ? "Respuestas en otros idiomas" : "Replies in other languages"}</SoonLine></p>
      </div>
    );
  }
  if (k === "inbox") {
    const p = u.inbox;
    return (
      <div className="ps" data-ps="inbox">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">Gmail</span></div>
        <ul className="ps-rows">
          {l(p.rows).map((r, i) => (
            <m.li key={r.from} className="ps-row ps-row-inbox" {...stagger(i)}>
              <span className="ps-row-main"><span className="ps-row-who">{r.from}</span><span className="ps-row-sub">{r.subject}</span></span>
              <span className="ps-tags"><span className="ps-tag"><Tag size={11} strokeWidth={2.2} aria-hidden="true" />{r.label}</span></span>
            </m.li>
          ))}
        </ul>
        <p className="ps-foot">{l(p.note)}</p>
      </div>
    );
  }
  if (k === "matching") {
    const p = u.matching;
    return (
      <div className="ps" data-ps="matching">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">{l(p.photoNote)}</span></div>
        <p className="ps-because">{l(p.because)}</p>
        <ul className="ps-listings">
          {l(p.rows).map((r, i) => (
            <m.li key={r.ref} className="ps-listing" {...stagger(i)}>
              <Photo src={r.photo} alt={r.alt} className="ps-listing-photo" />
              <span className="ps-listing-main"><span className="ps-row-who">{r.t}</span><span className="ps-row-sub">{r.ref} · {r.place}</span><span className="ps-fit"><Check size={12} strokeWidth={3} aria-hidden="true" />{r.fit}</span></span>
              <span className="ps-price tnum">{r.price}</span>
            </m.li>
          ))}
        </ul>
        <m.p className="ps-action-row" {...stagger(3)}><span className="ps-action ps-action-inline"><Send size={14} strokeWidth={2} aria-hidden="true" />{l(p.action)}</span><span className="ps-soon" data-claim="matching">{claimWords[claim("matching")][locale]}</span></m.p>
      </div>
    );
  }
  if (k === "followup") {
    const p = u.followup;
    return (
      <div className="ps" data-ps="followup">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span></div>
        <m.div className="ps-listing ps-listing-new" {...stagger(0)}>
          <Photo src={p.photo} alt={locale === "es" ? "Salón de un piso reformado · foto de muestra" : "Living room of a renovated flat · sample photo"} className="ps-listing-photo" />
          <span className="ps-listing-main"><span className="ps-row-who">{l(p.listing)}</span><span className="ps-fit"><Check size={12} strokeWidth={3} aria-hidden="true" />{l(p.fits)}</span></span>
        </m.div>
        <m.p className="ps-permission" {...stagger(1)}><ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />{l(p.permission)}</m.p>
        <m.p className="ps-action" {...stagger(2)}><Mail size={14} strokeWidth={2} aria-hidden="true" />{l(p.action)}</m.p>
        <p className="ps-foot">{l(p.noPermission)}</p>
      </div>
    );
  }
  if (k === "social") {
    const p = u.social;
    return (
      <div className="ps" data-ps="social">
        <div className="ps-head"><span className="ps-title"><Instagram size={14} strokeWidth={2} aria-hidden="true" className="inline -mt-0.5 mr-1.5" />{l(p.title)}</span><span className="ps-meta">{l(p.state)}</span></div>
        <m.div className="ps-post" {...stagger(0)}>
          <Photo src={p.photo} alt={locale === "es" ? "Villa con piscina · foto de muestra" : "Villa with pool · sample photo"} className="ps-post-photo" />
          <p className="ps-post-caption">{l(p.caption)}</p>
        </m.div>
        <m.div className="ps-post-actions" {...stagger(1)}>
          <span className="ps-action ps-action-inline"><Check size={14} strokeWidth={2.4} aria-hidden="true" />{l(p.approve)}</span>
          <span className="ps-action-quiet">{l(p.edit)}</span>
        </m.div>
        <p className="ps-foot">{l(p.rule)} <SoonLine k="instagram" locale={locale}>Instagram</SoonLine></p>
      </div>
    );
  }
  return <TeamSurface locale={locale} />;
}

/** The team's day with the small Daily view (after staff-v13): "Tomar" (marked "Demo") opens the list with the voice bar. */
function TeamSurface({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const p = home1103.functions.ui.team;
  const stagger = useStagger();
  const [open, setOpen] = useState(false);
  const [taken, setTaken] = useState<number | null>(null);
  const rows = l(p.rows);
  const isTaken = (s: string) => s.startsWith("Tomada") || s.startsWith("Taken");
  return (
    <div className="ps" data-ps="team" data-daily={open ? "open" : "closed"}>
      <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">{rows.length}</span></div>
      {!open ? (
        <>
          <m.p className="ps-assistant" {...stagger(0)}>{l(p.assistant)}</m.p>
          <ul className="ps-rows">
            {rows.map((r, i) => (
              <m.li key={r.who} className="ps-task" {...stagger(1 + i)}>
                <span className="ps-task-main"><span className="ps-task-kind">{r.kind}</span><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.why}</span><span className="ps-task-step">{r.step}</span></span>
                {isTaken(r.state) ? <span className="ps-take is-taken">{r.state}</span> : <button type="button" className="ps-take" onClick={(e) => { e.stopPropagation(); setTaken(i); setOpen(true); }} data-ps-take={i}>{l(p.take)}<span className="ps-take-demo">{l(p.demo)}</span></button>}
              </m.li>
            ))}
          </ul>
        </>
      ) : (
        <div className="daily" onClick={(e) => e.stopPropagation()} data-daily-view>
          <div className="daily-top"><span className="daily-app">{l(p.daily.app)} · {l(p.demo)}</span><span className="daily-title">{l(p.daily.title)}</span><button type="button" className="daily-close" aria-label={l(p.daily.close)} onClick={(e) => { e.stopPropagation(); setOpen(false); }}><X size={16} strokeWidth={2.2} /></button></div>
          <p className="daily-section">{l(p.daily.sections)[0]}</p>
          <div className="daily-card is-urgent">
            <p className="daily-card-title">{rows[0].kind}: {rows[0].who}</p>
            <p className="daily-card-line">{rows[0].why} · {rows[0].step}</p>
            <span className={cn("daily-chip", taken === 0 && "is-taken")}>{taken === 0 ? l(p.taken) : rows[0].state}</span>
          </div>
          <p className="daily-section">{l(p.daily.sections)[1]}</p>
          {rows.slice(1).map((r, i) => (
            <div key={r.who} className="daily-card">
              <p className="daily-card-title">{r.kind}: {r.who}</p>
              <p className="daily-card-line">{r.why} · {r.step}</p>
              <span className={cn("daily-chip", (taken === i + 1 || isTaken(r.state)) && "is-taken")}>{taken === i + 1 ? l(p.taken) : r.state}</span>
            </div>
          ))}
          <div className="daily-voice" data-daily-voice>
            <span className="daily-mic" aria-hidden="true"><Mic size={16} strokeWidth={2.2} /></span>
            <span className="daily-question">«{l(p.daily.question)}»</span>
            <span className="daily-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </div>
          <p className="daily-answer">{l(p.daily.answer)}</p>
          <p className="ps-foot">{l(p.daily.note)} <SoonLine k="taskList" locale={locale}>{locale === "es" ? "Lista y asistente" : "List and assistant"}</SoonLine></p>
        </div>
      )}
    </div>
  );
}
