import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { homeV4 } from "@/lib/content/home-v4";
import { faqGroups } from "@/lib/content/faq";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * Moments 3 to 8 of the home page (CONTENT_MODEL_1016, DESIGN.md): line grids, no cards in cards, no entry animation.
 * Every figure and person is invented; the page says so once (HomeDemoLine) with the link to /hoy.
 */
const l = (locale: Locale) => <T,>(x: Record<Locale, T>) => x[locale];

function MomentHead({ eyebrow, title, id, line }: { eyebrow: string; title: string; id: string; line?: string }) {
  return (
    <div className="max-w-[720px]">
      <p className="t-eyebrow text-text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-4 t-display-l text-text-primary">{title}</h2>
      {line && <p className="mt-5 t-body-l text-text-secondary">{line}</p>}
    </div>
  );
}

/** Moment 3: the same enquiry, slow and instant, side by side. */
export function CompareMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.compare;
  const Col = ({ title, rows, tone }: { title: string; rows: typeof w.rowsWithout | typeof w.rowsWith; tone: "without" | "with" }) => (
    <div className="moment-col" data-compare={tone}>
      <p className={cn("t-heading-s", tone === "with" ? "text-text-primary" : "text-text-muted")}>{title}</p>
      <ol className="mt-5 divide-y divide-line-hairline border-y border-line-hairline">
        {rows.map((r, i) => {
          const lost = "lost" in r && r.lost;
          const won = "won" in r && r.won;
          return (
            <li key={i} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-4">
              <span className="tnum t-body-s text-text-muted">{r.t}</span>
              <span className={cn("t-body-m", lost ? "text-text-muted" : "text-text-primary", won && "font-medium")}>{t(r.text)}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
  return (
    <section id="compare" aria-labelledby="compare-h" className="moment scroll-mt-[var(--header-h)]">
      <div className="container-default">
        <MomentHead eyebrow={t(w.eyebrow)} title={t(w.title)} id="compare-h" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Col title={t(w.without)} rows={w.rowsWithout} tone="without" />
          <Col title={t(w.with)} rows={w.rowsWith} tone="with" />
        </div>
      </div>
    </section>
  );
}

/** Moment 4: what Nuova does every day, four rows on one line grid, each with one product excerpt. */
export function WhatMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.what;
  const x = w.excerpts;
  const excerpt: Record<string, React.ReactNode> = {
    answer: (
      <div className="excerpt" data-excerpt="answer">
        <p className="excerpt-meta"><MessageCircle size={12} strokeWidth={2.2} aria-hidden="true" />{t(x.answer.meta)}</p>
        <p className="hero-bubble hero-bubble-in excerpt-bubble">{t(x.answer.in)}</p>
        <p className="hero-bubble hero-bubble-out excerpt-bubble ml-auto">{t(x.answer.out)}</p>
      </div>
    ),
    keep: (
      <div className="excerpt" data-excerpt="keep">
        <p className="excerpt-name">{x.keep.name}</p>
        <dl className="excerpt-record">
          {x.keep.rows.map((r) => (
            <div key={t(r.k)}><dt>{t(r.k)}</dt><dd>{t(r.v)}</dd></div>
          ))}
        </dl>
      </div>
    ),
    alert: (
      <div className="excerpt hero-next" data-excerpt="alert">
        <p className="excerpt-meta"><span aria-hidden="true" className="hero4-dot" />{t(x.alert.title)}</p>
        <p className="mt-1 t-body-s text-text-primary">{t(x.alert.line)}</p>
        <span aria-hidden="true" className="excerpt-action">{t(x.alert.action)}<ArrowRight size={13} strokeWidth={2.25} /></span>
      </div>
    ),
    report: (
      <div className="excerpt" data-excerpt="report">
        <p className="excerpt-meta">{t(x.report.title)}</p>
        <dl className="excerpt-figures">
          {x.report.figures.map((f) => (
            <div key={f.n + t(f.k)}><dd className="tnum">{f.n}</dd><dt>{t(f.k)}</dt></div>
          ))}
        </dl>
      </div>
    ),
  };
  return (
    <section id="what" aria-labelledby="what-h" className="moment scroll-mt-[var(--header-h)]">
      <div className="container-default">
        <MomentHead eyebrow={t(w.eyebrow)} title={t(w.title)} id="what-h" />
        <ol className="mt-10 border-t border-line-hairline" data-what-rows>
          {w.rows.map((r, i) => (
            <li key={r.key} className="grid gap-6 border-b border-line-hairline py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-10 lg:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)]">
              <span className="tnum t-caption text-text-accent">0{i + 1}</span>
              <div>
                <h3 className="t-display-m text-text-primary">{t(r.title)}</h3>
                <p className="mt-3 max-w-[40ch] t-body-m text-text-secondary">{t(r.line)}</p>
              </div>
              <div className="min-w-0">{excerpt[r.key]}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Moment 5: the team in the morning. The interactive version (take, done) lives on /platform. */
export function MorningMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.morning;
  return (
    <section id="morning" aria-labelledby="morning-h" className="moment scroll-mt-[var(--header-h)]">
      <div className="container-default grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <MomentHead eyebrow={t(w.eyebrow)} title={t(w.title)} id="morning-h" line={t(w.line)} />
          <p className="mt-6"><Link href={localePath(locale, "/platform#story-d")} className="inline-flex items-center gap-2 t-body-m font-medium text-text-primary underline decoration-line-strong underline-offset-4">{t(w.tryIt)}<ArrowRight size={16} aria-hidden="true" /></Link></p>
        </div>
        <div className="lg:col-span-7">
          <div className="stage-plain" data-morning>
            <p className="t-heading-m text-text-primary">{t(w.greeting)}</p>
            <p className="mt-1 t-caption text-text-muted">{t(w.when)}</p>
            <ol className="mt-5 divide-y divide-line-hairline border-y border-line-hairline">
              {w.items.map((it, i) => (
                <li key={it.who} className={cn("grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center", i === 0 && "morning-first")} data-morning-item={i === 0 ? "hot" : "open"}>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 t-body-m font-medium text-text-primary">{it.who}{it.hot && <span className="hero4-dot" aria-hidden="true" />}</p>
                    <p className="mt-0.5 t-body-m text-text-primary">{t(it.what)}</p>
                    <p className="mt-0.5 t-body-s text-text-muted">{t(it.why)}</p>
                  </div>
                  {i === 0 && <span aria-hidden="true" className="excerpt-action">{t(w.take)}<ArrowRight size={13} strokeWidth={2.25} /></span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Moment 6: how you start. */
export function StartMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.start;
  return (
    <section id="start" aria-labelledby="start-h" className="moment scroll-mt-[var(--header-h)]">
      <div className="container-default grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <MomentHead eyebrow={t(w.eyebrow)} title={t(w.title)} id="start-h" />
        </div>
        <div className="lg:col-span-7">
          <ol className="divide-y divide-line-hairline border-y border-line-hairline" data-start-steps>
            {w.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 py-5">
                <span className="tnum t-caption text-text-accent">0{i + 1}</span>
                <span className="t-heading-m text-text-primary">{t(s)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[60ch] t-body-m text-text-secondary">{t(w.crm)}</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
            <ButtonLink href={localePath(locale, "/signup")} size="lg">{t(homeV4.hero.cta)}</ButtonLink>
            <p className="t-body-s text-text-secondary">{t(w.trial)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Moment 8: three of Copy's questions and the closing sentence. */
export function QuestionsMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.questions;
  const items = faqGroups.flatMap((g) => g.items);
  const ordered = w.kb.map((kb) => items.find((it) => it.kb === kb)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <section id="questions" aria-labelledby="questions-h" className="moment scroll-mt-[var(--header-h)]">
      <div className="container-default grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="questions-h" className="t-display-m text-text-primary">{t(w.title)}</h2>
          <p className="mt-4"><Link href={localePath(locale, "/faq")} className="inline-flex items-center gap-2 t-body-m font-medium text-text-primary underline decoration-line-strong underline-offset-4">{t(w.all)}<ArrowRight size={16} aria-hidden="true" /></Link></p>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={ordered.map((it) => ({ id: it.kb.replace(/[^a-z0-9]/gi, "-").toLowerCase(), question: t(it.q), answer: t(it.a) }))} />
        </div>
      </div>
    </section>
  );
}

export function ClosingMoment({ locale }: { locale: Locale }) {
  const t = l(locale);
  const w = homeV4.closing;
  return (
    <section aria-labelledby="closing-h" className="moment moment-closing">
      <div className="container-default text-center">
        <h2 id="closing-h" className="mx-auto max-w-[22ch] t-display-l text-text-primary">{t(w.title)}</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
          <ButtonLink href={localePath(locale, "/signup")} size="lg">{t(w.cta)}</ButtonLink>
          <ButtonLink href={localePath(locale, "/contact")} size="lg" variant="secondary">{t(w.second)}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

/** The page's one demonstration line, with the link to the product truth. */
export function HomeDemoLine({ locale }: { locale: Locale }) {
  const t = l(locale);
  return (
    <p className="container-default t-caption text-text-muted" data-home-demo>
      {t(homeV4.demo)} <Link href={localePath(locale, "/hoy")} className="underline decoration-line-strong underline-offset-4 hover:text-text-primary">{t(homeV4.today)}</Link>
    </p>
  );
}
