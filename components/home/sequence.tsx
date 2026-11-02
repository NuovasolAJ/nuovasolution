"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { startLabel } from "@/lib/content/plans";
import { heroWords, listings, people, storyWords } from "@/lib/content/home-story";
import { sequenceSteps, sequenceWords, type Actor, type SequenceStep } from "@/lib/content/home-sequence";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { ListingCard } from "./listing-card";

/**
 * The central product sequence (the owner's order of 30.10., point 2): the heart of the page, not a small box. One enquiry
 * runs through six steps on one spine: enquiry → reply → record → the listing that fits → the alert and the task for the
 * right person → the confirmed next step. Every step shows who acts with one of three marks (Nuova automatically, a person at
 * the agency, the customer), one explaining line, one benefit for the agency and its state.
 *
 * The animation explains the step, nothing else: when a step enters the window its artefacts settle in, in order, with time
 * to read (the reader's scroll sets the pace; nothing auto-advances). Everything is in the document from the first paint at a
 * quiet 45 %; without JavaScript and with reduced motion every artefact stands at full strength at once.
 */
const l = <T,>(locale: Locale, x: Record<Locale, T>) => x[locale];
const d = (ms: number) => ({ ["--sq-delay" as string]: `${ms}ms` });

export function ActorMark({ actor, size = "md", className }: { actor: Actor; size?: "sm" | "md" | "lg"; className?: string }) {
  const letter = actor === "agency" ? people.colleague.name[0] : people.buyer.name[0];
  return (
    <span aria-hidden="true" className={cn("actor-mark", `actor-mark-${size}`, className)} data-actor={actor}>
      {actor === "nuova" ? <Sparkles size={size === "lg" ? 15 : size === "md" ? 12 : 10} strokeWidth={2.4} /> : letter}
    </span>
  );
}

function ActorPill({ actor, locale }: { actor: Actor; locale: Locale }) {
  return (
    <span className="actor-pill" data-step-actor={actor}>
      <ActorMark actor={actor} size="sm" />
      {l(locale, sequenceWords.actorShort[actor])}
    </span>
  );
}

export function ActorLegend({ locale, className }: { locale: Locale; className?: string }) {
  const actors: Actor[] = ["nuova", "agency", "customer"];
  return (
    <div className={cn("actor-legend", className)} data-actor-legend role="list" aria-label={l(locale, sequenceWords.legendTitle)}>
      {actors.map((a) => (
        <span key={a} role="listitem" className="actor-legend-item" data-actor={a}>
          <ActorMark actor={a} size="md" />
          <span>{l(locale, sequenceWords.actors[a])}</span>
        </span>
      ))}
    </div>
  );
}

/** A step comes into view once and stays "in": its artefacts settle in order. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Bubble({ children, out = false, label, meta, lang, className, delay = 0, kind }: { children: ReactNode; out?: boolean; label?: string; meta?: string; lang?: string; className?: string; delay?: number; kind?: "pop" }) {
  return (
    <div className={cn("sq-item demo-bubble", out ? "hero-bubble-out" : "hero-bubble-in", className)} style={d(delay)} data-sq-kind={kind}>
      {label && <p className="mb-1.5 text-[0.875rem] font-semibold text-[#1d6b42]">{label}</p>}
      <div lang={lang} className="text-[1rem] leading-[1.5] text-ink-950">{children}</div>
      {meta && <p className="hero-bubble-meta">{meta}</p>}
    </div>
  );
}

function Step({ step, n, locale, children }: { step: SequenceStep; n: number; locale: Locale; children: ReactNode }) {
  const ref = useInView<HTMLLIElement>();
  const primary = step.actors[step.actors.length - 1];
  return (
    <li ref={ref} className="sq-step" data-seq-step={n} data-step-key={step.key} data-step-actors={step.actors.join(",")} aria-labelledby={`sq-${step.key}-h`}>
      <div className="sq-spine" aria-hidden="true">
        <span className="sq-dot tnum" data-actor={primary}>{n}</span>
        <span className="sq-line" />
      </div>
      <div className="sq-text">
        <p className="sq-time tnum">{l(locale, step.time)}</p>
        <div className="sq-actors">{step.actors.map((a) => <ActorPill key={a} actor={a} locale={locale} />)}</div>
        <h3 id={`sq-${step.key}-h`} className="sq-title">{l(locale, step.title)}</h3>
        <p className="sq-line-text">{l(locale, step.line)}</p>
        <p className="sq-benefit" data-step-benefit><span className="sq-benefit-label">{l(locale, sequenceWords.benefitLabel)}</span>{l(locale, step.benefit)}</p>
        <p className="state-line sq-state" data-state={step.stateKind} data-step-state>{l(locale, sequenceWords.stateLabel)}: {l(locale, step.state)}</p>
      </div>
      <div className="sq-art" data-step-art>{children}</div>
    </li>
  );
}

export function SequenceSection({ locale }: { locale: Locale }) {
  const W = sequenceWords;
  const H = heroWords;
  const S = storyWords;
  const es = locale === "es";
  const p = (path: string) => localePath(locale, path);
  const [s1, s2, s3, s4, s5, s6] = sequenceSteps;
  const fields = l(locale, H.record.fields);
  const taskItem = l(locale, S.task.items)[0];

  return (
    <section id="sequence" aria-labelledby="sequence-h" className="sequence scroll-mt-[var(--header-h)] bg-[color:var(--surface-canvas)]" data-sequence>
      <div className="container-default">
        <div className="sq-head">
          <div className="max-w-[760px]">
            <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(locale, W.eyebrow)}</p>
            <h2 id="sequence-h" className="mt-4 t-display-l text-text-primary">{l(locale, W.h2)}</h2>
            <p className="mt-5 t-body-l text-text-secondary">{l(locale, W.lead)}</p>
          </div>
          <div className="sq-legend-col">
            <p className="text-[0.875rem] font-medium text-text-muted">{l(locale, W.legendTitle)}</p>
            <ActorLegend locale={locale} className="mt-2" />
            <p className="mt-3 text-[0.875rem] text-text-muted">{l(locale, W.example)}</p>
          </div>
        </div>

        <ol className="sq-list mt-10 xl:mt-14" data-seq-steps>
          {/* 1 the enquiry: Laura writes */}
          <Step step={s1} n={1} locale={locale}>
            <p className="sq-art-label"><MessageCircle size={14} aria-hidden="true" />{l(locale, W.enquiryWho)}</p>
            <Bubble meta={l(locale, H.heroTime)} lang={es ? "es" : "en"} delay={150} className="max-w-full md:max-w-[88%]">{es ? H.heroEnquiry : H.heroEnquiryTranslated.en}</Bubble>
          </Step>

          {/* 2 the reply, after a moment's typing */}
          <Step step={s2} n={2} locale={locale}>
            <div className="relative flex flex-col items-end">
              <span className="sq-typing typing hero-bubble hero-bubble-out items-center gap-1" style={{ ...d(200), ["--seq-typing-for" as string]: "1300ms" }} aria-hidden="true"><i>●</i><i>●</i><i>●</i></span>
              <Bubble out label={l(locale, S.common.assistant)} meta={l(locale, H.heroReplyTime)} lang={es ? "es" : "en"} delay={1500} kind="pop" className="max-w-full md:max-w-[92%]">{es ? H.heroReply : H.heroReplyTranslated.en}</Bubble>
            </div>
            <p className="sq-item sq-note" style={d(2100)}>{l(locale, W.replyNote)}</p>
          </Step>

          {/* 3 the record, field by field */}
          <Step step={s3} n={3} locale={locale}>
            <div className="sq-item hero-record hero-record-lift sq-record" style={d(150)} data-sq-kind="pop" data-sequence-record>
              <div className="hero-record-head">
                <p className="hero-result-key">{l(locale, H.record.title)}</p>
                <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{l(locale, H.record.who)}</p>
                <p className="tnum text-[0.875rem] leading-snug text-ink-600">{l(locale, H.record.updated)}</p>
              </div>
              <dl className="hero-record-fields">
                {fields.map((f, i) => (
                  <div key={f.k} className="sq-item hero-result" style={d(700 + i * 380)}>
                    <dt className="hero-result-key">{f.k}</dt>
                    <dd className="hero-result-value">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="sq-item hero-record-alert" style={d(2000)} data-sq-kind="pop">
                <span aria-hidden="true" className="hero-result-mark"><Mail size={11} strokeWidth={2.4} /></span>
                <span className="min-w-0">
                  <span className="hero-result-key block">{l(locale, H.record.priority)}</span>
                  <span className="block text-[1rem] font-semibold leading-snug text-ink-950">{l(locale, H.record.alert)}</span>
                  <span className="block text-[0.875rem] leading-snug text-ink-700">{l(locale, H.record.alertWhy)}</span>
                </span>
              </div>
            </div>
          </Step>

          {/* 4 the listings that fit, the proposal */}
          <Step step={s4} n={4} locale={locale}>
            <p className="sq-art-label">{l(locale, W.wants)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {l(locale, S.match.criteria).map((c, i) => <span key={c} className="sq-item inline-flex rounded-pill border border-ink-200 bg-white px-3 py-1.5 text-[0.9375rem] font-medium text-ink-950" style={d(100 + i * 160)}>{c}</span>)}
            </div>
            <p className="sq-art-label mt-5">{l(locale, W.fits)}</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2" data-sequence-listings>
              {[listings.est204, listings.est231].map((li, i) => (
                <div key={li.ref} className="sq-item" style={d(1000 + i * 260)} data-sq-kind="pop"><ListingCard listing={li} locale={locale} photoLabel={l(locale, S.common.photo)} compact note={l(locale, S.match.yours)} /></div>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-end gap-1.5">
              <Bubble out label={l(locale, S.common.assistant)} lang={es ? "es" : "en"} delay={1700} className="max-w-full md:max-w-[92%]">{es ? S.match.proposal : S.match.proposalTranslated.en}</Bubble>
              <p className="sq-item text-[0.875rem] text-text-muted" style={d(1900)}>{l(locale, W.proposalMeta)}</p>
            </div>
          </Step>

          {/* 5 the alert and the task for the right person */}
          <Step step={s5} n={5} locale={locale}>
            <div className="sq-item hero-next" style={d(150)} data-sequence-alert>
              <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-[0.875rem]"><span className="inline-flex items-center gap-1.5 font-medium text-[color:var(--accent-ink)]"><Mail size={13} aria-hidden="true" />{l(locale, W.alertMeta)}</span></p>
              <p className="mt-1.5 text-[1rem] font-semibold leading-snug text-ink-950">{l(locale, S.task.alert.subject)}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-text-secondary">{l(locale, S.task.alert.why)}</p>
            </div>
            <p className="sq-art-label mt-5">{l(locale, W.listMeta)}</p>
            <div className="sq-item mt-2 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-lg border border-ink-950 bg-white p-4" style={d(900)} data-sq-kind="pop" data-sequence-task>
              <span className="tnum inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 text-[0.9375rem] font-semibold text-ivory" aria-hidden="true">1</span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1rem] font-semibold text-ink-950">{taskItem.who}<span className="inline-flex items-center gap-1 rounded-pill bg-[color:var(--accent-wash)] px-2 py-0.5 text-[0.875rem] font-medium text-[color:var(--accent-ink)]"><Sparkles size={11} aria-hidden="true" />{l(locale, S.task.important)}</span></p>
                <p className="mt-0.5 text-[0.9375rem] leading-snug text-text-secondary">{taskItem.what}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-text-secondary"><span className="font-medium text-text-accent">{l(locale, W.taskWhy)}:</span> {l(locale, W.taskWhyValue)}</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-text-primary"><span className="font-medium">{l(locale, W.taskNext)}:</span> {l(locale, W.taskNextValue)}</p>
                <p className="sq-item mt-3 flex items-center gap-2 border-t border-ink-100 pt-3 text-[0.9375rem] font-medium text-signal-positive" style={d(1800)}><ActorMark actor="agency" size="sm" /><Check size={16} strokeWidth={2.5} aria-hidden="true" />{l(locale, W.taskTaken)}</p>
              </div>
            </div>
            <a href="#story-d" className="sq-item mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" style={d(2200)} data-sequence-try>{l(locale, W.tryDemo)}<ArrowDown size={15} aria-hidden="true" /></a>
          </Step>

          {/* 6 the confirmed next step: Elena proposes, Laura accepts, the record carries it */}
          <Step step={s6} n={6} locale={locale}>
            <div className="flex flex-col items-end">
              <Bubble out label={`${people.colleague.name} · ${es ? "tu agencia" : "your agency"}`} meta={l(locale, W.elenaMeta)} lang={es ? "es" : "en"} delay={150} className="max-w-full md:max-w-[92%]">{es ? S.task.chatConfirm : S.task.chatConfirmTranslated.en}</Bubble>
            </div>
            <Bubble meta={l(locale, W.lauraMeta)} lang={es ? "es" : "en"} delay={1300} kind="pop" className="mt-3 max-w-[80%]">{es ? W.lauraAcceptsOriginal : W.lauraAccepts.en}</Bubble>
            <div className="sq-item mt-4 rounded-lg border border-ink-100 bg-white p-4" style={d(2200)} data-sq-kind="pop" data-sequence-booked>
              <p className="flex items-start gap-2 text-[1rem] font-semibold leading-snug text-ink-950"><span aria-hidden="true" className="hero-result-mark mt-0.5"><Check size={12} strokeWidth={3} /></span>{l(locale, W.booked)}</p>
              <p className="mt-2 flex items-center gap-2 pl-7 text-[0.9375rem] text-text-secondary"><ActorMark actor="agency" size="sm" />{l(locale, W.done)}</p>
            </div>
          </Step>
        </ol>

        <div className="sq-close">
          <p className="max-w-[640px] t-body-l text-text-primary">{l(locale, W.closing)}</p>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
            <span className="text-[0.9375rem] font-medium text-text-secondary">{l(locale, H.trialLine)}</span>
            <a href="#story" className="inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(locale, H.ctaStory)}<ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
