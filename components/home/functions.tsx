"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Bell, Check, ChevronRight, Clock, Instagram, Mail, MessageCircle, Mic, Phone, PanelsTopLeft, Globe, Send, ShieldCheck, Tag, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, withChannels, type ClaimView } from "@/lib/claims";
import { cn } from "@/lib/utils";

/**
 * The scenes as a pinned stage (the owner's points 7, 8 and 9 of 06.11.2026; Copy 1105 v3 §18 for the chapters, the order and the
 * words): on the wide window the whole block sticks to the screen while the page scrolls through one segment of 90 vh per scene,
 * so every scene stands at least about a second at a normal scrolling speed; the surface on the stage changes with a soft crossfade
 * that never blocks (no "wait": a fast scroll runs through without a jump), and a click on a segment of the rail, on a scene's
 * name or on the stage jumps (an instant scroll inside the pinned block: on screen only the stage and the words change). The
 * scenes stand in three chapters, Atiende · Organiza · Crece; the progress is one connected rail of segments grouped by chapter.
 * On a narrow window every chapter is a heading and every scene stands with its own surface in a linear stack. Every scene hangs
 * on its keys (lib/claims.ts): the public view shows only what is included; a chapter with no scene left is hidden. No status word.
 */
type Item = (typeof home1103.functions.items)[number];
type Key = Item["key"];
export type SceneKey = Key;
const SEG = 0.9; // window heights per scene (the owner's guide: 70–100 vh)
const FIRST_FIVE: Key[] = ["reply", "record", "priority", "origin", "report"];

const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;

export function Functions({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.functions;
  const all = w.items.filter((it) => live(it.keys, view));
  // C3 (07.11.): at most five scenes stand open — one of Atiende, two of Organiza, two of Crece — the rest unfold on one click
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? all : all.filter((it) => FIRST_FIVE.includes(it.key));
  const folded = all.length - items.length;
  const chapters = w.chapters.filter((c) => items.some((it) => it.chapter === c.key));
  const keys = items.map((i) => i.key);
  const n = items.length;
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const active = items[idx];
  const chapter = chapters.find((c) => c.key === active.chapter) ?? chapters[0];
  const no = (i: number) => String(i + 1).padStart(2, "0");
  const line = (it: Item) => withChannels(l(it.line(view)), locale, view);

  // the scene from the scroll position: the pin holds from the track's top, each scene owns one segment
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      const y = headerHeight() - el.getBoundingClientRect().top;
      const seg = window.innerHeight * SEG;
      setIdx(Math.min(n - 1, Math.max(0, Math.floor(y / seg))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, [n]);

  /** Jumps to a scene: scrolls the window to the scene's segment (the pin shows it at once). */
  const go = (i: number) => {
    const el = track.current;
    const t = Math.min(n - 1, Math.max(0, i));
    setIdx(t);
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) { document.querySelector<HTMLElement>(`[data-fn="${keys[t]}"]`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); return; }
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight();
    window.scrollTo({ top: top + t * window.innerHeight * SEG + 2, behavior: "auto" });
  };
  const next = () => go((idx + 1) % n);

  return (
    <section id="functions" aria-labelledby="fn-h" className="fn" data-functions data-fn-active={active.key} data-fn-index={idx + 1} data-fn-count={n} data-fn-chapter={chapter.key} data-fn-view={view}>
      <div ref={track} className="fn-track" style={{ ["--n" as string]: n }} data-fn-track>
        <div className="fn-pin" data-fn-pin>
          <div className="container-default fn-pin-grid">
            <div className="fn-side">
              <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
              <h2 id="fn-h" className="fn-h2 text-text-primary">{l(w.h2)}</h2>

              {/* the rail (point 9): one connected bar of n segments in the chapter groups; the past segments filled */}
              <nav className="fn-rail" aria-label={l(w.progress)} data-fn-progress>
                {chapters.map((ch) => {
                  const its = items.filter((it) => it.chapter === ch.key);
                  return (
                    <div key={ch.key} className={cn("fn-rail-chapter", ch.key === chapter.key && "is-on")} style={{ flexGrow: its.length }} data-fn-chapter-group={ch.key}>
                      <button type="button" className="fn-rail-name" onClick={() => go(keys.indexOf(its[0].key))} aria-current={ch.key === chapter.key ? "true" : undefined}>{l(ch.name)}</button>
                      <span className="fn-rail-segments">
                        {its.map((it) => {
                          const i = keys.indexOf(it.key);
                          return <button key={it.key} type="button" className={cn("fn-rail-seg", i <= idx && "is-past", i === idx && "is-on")} onClick={() => go(i)} aria-label={`${l(w.progress)} ${i + 1}: ${l(it.title)}`} aria-current={i === idx ? "step" : undefined} data-fn-seg={it.key} />;
                        })}
                      </span>
                    </div>
                  );
                })}
              </nav>
              <p className="fn-counter tnum" aria-hidden="true" data-fn-counter><span className="fn-counter-now">{no(idx)}</span> / {no(n - 1)}</p>

              {/* the chapter line and the active scene's words: a crossfade that never blocks */}
              <div className="fn-copy" data-fn-copy>
                <AnimatePresence mode="sync" initial={false}>
                  <m.div key={active.key} className="fn-copy-pane" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }} data-fn-copy-pane={active.key}>
                    <p className="fn-chapter-line">{l(chapter.line(view))}</p>
                    <h3 className="fn-title">{l(active.title)}</h3>
                    <p className="fn-line">{line(active)}</p>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* the chapter's scenes by name, the active one marked; a click jumps */}
              <ol className="fn-mini" data-fn-mini>
                {items.filter((it) => it.chapter === chapter.key).map((it) => {
                  const i = keys.indexOf(it.key);
                  return (
                    <li key={it.key}><button type="button" className={cn("fn-mini-item", i === idx && "is-on")} onClick={() => go(i)} aria-current={i === idx ? "step" : undefined} data-fn-button={it.key}><span className="fn-mini-no tnum">{no(i)}</span><span>{l(it.title)}</span></button></li>
                  );
                })}
              </ol>
              {folded > 0 && (
                <button type="button" className="fn-fold" onClick={() => setExpanded(true)} data-fn-fold={folded}>
                  {l(w.fold).replace("{n}", String(folded))}<ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* the stage: a click anywhere on it advances (a convenience); the real control is the "Siguiente escena" button */}
            <div className="fn-stage" data-fn-stage>
              <div className="fn-stage-inner" onClick={next} data-fn-stage-button>
                <AnimatePresence mode="sync" initial={false}>
                  <m.div key={active.key} className="fn-stage-surface" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.22 } }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} data-fn-surface={active.key}>
                    <Surface k={active.key} locale={locale} view={view} />
                  </m.div>
                </AnimatePresence>
                <button type="button" className="fn-stage-next" onClick={(e) => { e.stopPropagation(); next(); }} data-fn-stage-next>{l(w.next)}<ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the narrow window: chapters as headings, every scene with its surface */}
      <div className="container-default fn-linear" data-fn-linear>
        <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
        <h2 className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        {w.chapters.filter((c) => all.some((it) => it.chapter === c.key)).map((ch) => (
          <div key={ch.key} className="fn-chapter" data-fn-chapter-block={ch.key}>
            <p className="fn-chapter-name">{l(ch.name)}</p>
            <p className="fn-chapter-line">{l(ch.line(view))}</p>
            <ol className="fn-list">
              {/* every scene is in the document (a reader without JavaScript sees all of them); the folded ones hide until the fold opens */}
              {all.filter((it) => it.chapter === ch.key).map((it) => {
                const i = keys.indexOf(it.key);
                const foldedAway = i < 0;
                return (
                  <li key={it.key} data-fn={it.key} className={cn("fn-item", foldedAway && "is-folded")} aria-hidden={foldedAway || undefined}>
                    <div className="fn-item-words">
                      <span className="fn-item-no tnum">{no(foldedAway ? all.indexOf(it) : i)}</span>
                      <h3 className="fn-item-title">{l(it.title)}</h3>
                      <p className="fn-item-line">{line(it)}</p>
                    </div>
                    <div className="fn-item-surface" data-fn-surface-inline={it.key}><Surface k={it.key} locale={locale} view={view} /></div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
        {folded > 0 && (
          <button type="button" className="fn-fold fn-fold-linear" onClick={() => setExpanded(true)} data-fn-fold-linear={folded}>
            {l(w.fold).replace("{n}", String(folded))}<ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------- */
/* The product surfaces                                                                                                    */
/* ---------------------------------------------------------------------------------------------------------------------- */
const CH_ICON: Record<string, typeof Mail> = { WhatsApp: MessageCircle, Email: Mail, "E-mail": Mail, "Formulario web": PanelsTopLeft, "Web form": PanelsTopLeft, Teléfono: Phone, Phone: Phone, Portal: Globe, Anuncio: Globe, Ad: Globe };

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={320} height={200} loading="lazy" decoding="async" className={className} />;
}

function useStagger() {
  const reduce = useReducedMotion();
  return (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });
}

export function Surface({ k, locale, view }: { k: Key; locale: Locale; view: ClaimView }) {
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
              <span className="ps-row-main"><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.channel.replace("⟦sofia⟧", p.sofia(locale, view))}</span></span>
              <span className="ps-row-prio"><span className="demo-priority" data-prio={r.p}>{r.p}</span><span className="ps-row-why">{r.why}</span></span>
            </m.li>
          ))}
        </ul>
        {live("alert", view) && <m.p className="ps-foot ps-foot-lit" {...stagger(4)} data-ps-alert><Bell size={14} strokeWidth={2} aria-hidden="true" />{l(p.alert)}</m.p>}
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
          {l(p.fields).map(([kk, vv], i) => (
            <m.div key={kk} className="ps-field" {...stagger(i)}><dt>{kk}</dt><dd>{vv}</dd></m.div>
          ))}
        </dl>
        <m.p className="ps-assistant" {...stagger(7)}>{l(p.priority)}</m.p>
        <p className="ps-foot">{l(p.next)}</p>
      </div>
    );
  }
  if (k === "origin") {
    const p = u.origin;
    const rows = [...l(p.rows), ...(live("adsLeads", view) ? l(p.adsRows) : [])];
    return (
      <div className="ps" data-ps="origin">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">CRM</span></div>
        <ul className="ps-rows">
          {rows.map((r, i) => {
            const Icon = CH_ICON[r.origin] ?? Mail;
            return (
              <m.li key={r.who} className="ps-row ps-row-inbox" {...stagger(i)}>
                <span className="ps-row-main"><span className="ps-row-who">{r.who}</span><span className="ps-row-sub">{r.what}</span></span>
                <span className="ps-tags"><span className="ps-tag" data-origin><Icon size={11} strokeWidth={2.2} aria-hidden="true" />{r.origin}</span></span>
              </m.li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (k === "language") {
    const p = u.language;
    return (
      <div className="ps" data-ps="language">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">CRM</span></div>
        <dl className="ps-fields">
          {l(p.fields).map(([kk, vv], i) => (
            <m.div key={kk} className={cn("ps-field", /reconocido|recognised/.test(vv) && "is-lit")} {...stagger(i)}><dt>{kk}</dt><dd>{vv}</dd></m.div>
          ))}
        </dl>
        <p className="ps-sub">{l(p.history)}</p>
        <ul className="ps-events">
          {l(p.events).map((e, i) => (
            <m.li key={i} {...stagger(5 + i)}><span className="tnum">{e.t}</span><span className="ps-chip"><Mail size={12} strokeWidth={2} aria-hidden="true" />{e.ch}</span><span>{e.what}</span></m.li>
          ))}
        </ul>
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
        <m.p className="ps-action-row" {...stagger(3)}><span className="ps-action ps-action-inline"><Send size={14} strokeWidth={2} aria-hidden="true" />{l(p.action)}</span></m.p>
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
        <p className="ps-foot">{l(p.rule)}</p>
      </div>
    );
  }
  if (k === "report") {
    const p = u.reportScene;
    return (
      <div className="ps" data-ps="report">
        <div className="ps-head"><span className="ps-title">{l(p.title)}</span><span className="ps-meta">{l(home1103.report.example)}</span></div>
        <dl className="ps-figures">
          {l(p.figures).map(([kk, vv], i) => (
            <m.div key={kk} className="ps-figure" {...stagger(i)}><dt>{kk}</dt><dd className="tnum">{vv}</dd></m.div>
          ))}
        </dl>
        <m.p className="ps-assistant" {...stagger(3)}><strong>{l(p.nextTitle)}:</strong> {l(p.next)}</m.p>
        <p className="ps-foot"><a href={localePath(locale, "/example-report")} className="ps-link" onClick={(e) => e.stopPropagation()} data-ps-report-link>{l(p.link)}<ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" /></a></p>
      </div>
    );
  }
  return <TeamSurface locale={locale} view={view} />;
}

/** The team's day with the small Daily view (after staff-v13): "Tomar" (marked "Demo") opens the list; the voice bar only while `dailyVoice` is live (§18 S-6). */
function TeamSurface({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const p = home1103.functions.ui.team;
  const stagger = useStagger();
  const [open, setOpen] = useState(false);
  const [taken, setTaken] = useState<number | null>(null);
  const rows = l(p.rows);
  const voice = live("dailyVoice", view);
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
          {voice && (
            <>
              <div className="daily-voice" data-daily-voice>
                <span className="daily-mic" aria-hidden="true"><Mic size={16} strokeWidth={2.2} /></span>
                <span className="daily-question">«{l(p.daily.question)}»</span>
                <span className="daily-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
              </div>
              <p className="daily-answer">{l(p.daily.answer)}</p>
            </>
          )}
          <p className="ps-foot">{l(p.daily.note)}</p>
        </div>
      )}
    </div>
  );
}
