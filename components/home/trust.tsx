import Link from "next/link";
import { Check, Database, Link2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { startLabel } from "@/lib/content/plans";
import { homeWords } from "@/lib/content/home-sections";
import { faqGroups } from "@/lib/content/faq";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

/**
 * Trust and conversion (master order 2026-10-10 §9): after the story, the real way in. The steps in their real
 * order, the two ways to hold the leads (the included CRM or the agency's own), what we do when connecting the
 * channels, and the questions people ask before starting, answered with Copy's own FAQ rows. No testimonials,
 * no logos, no figures. The button comes after the understanding, not before it.
 */
export function TrustSection({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeWords.trust;
  const p = (path: string) => localePath(locale, path);
  const items = faqGroups.flatMap((g) => g.items).filter((it) => w.questions.includes(it.kb));
  const ordered = w.questions.map((kb) => items.find((it) => it.kb === kb)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section id="start" aria-labelledby="trust-h" className="scroll-mt-[var(--header-h)] border-t border-line-hairline pb-[var(--section-default)] pt-[var(--section-default)]">
      <div className="container-default">
        <Reveal className="max-w-[760px]">
          <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="trust-h" className="mt-4 t-display-l text-text-primary">{l(w.h2)}</h2>
          <p className="mt-5 t-body-l text-text-secondary">{l(w.lead)}</p>
        </Reveal>

        <div className="mt-10 grid gap-10 xl:grid-cols-12 xl:gap-14">
          {/* The steps */}
          <Reveal className="xl:col-span-7">
            <p className="t-caption font-medium text-text-muted">{l(w.stepsTitle)}</p>
            <ol className="mt-3 divide-y divide-line-hairline border-y border-line-hairline" data-start-steps>
              {l(w.steps).map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4">
                  <span className="tnum pt-0.5 t-caption text-text-accent">0{i + 1}</span>
                  <span><span className="block t-heading-s text-text-primary">{s.title}</span><span className="mt-1 block t-body-s text-text-secondary">{s.line}</span></span>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-3 md:grid-cols-2" data-crm-ways>
              <div className="rounded-lg border border-line-contour bg-surface-raised p-5">
                <p className="flex items-center gap-2 t-heading-s text-text-primary"><Database size={18} className="text-text-accent" aria-hidden="true" />{l(w.crmBuiltIn.title)}</p>
                <p className="mt-2 t-body-s text-text-secondary">{l(w.crmBuiltIn.line)}</p>
              </div>
              <div className="rounded-lg border border-line-contour bg-surface-raised p-5">
                <p className="flex items-center gap-2 t-heading-s text-text-primary"><Link2 size={18} className="text-text-accent" aria-hidden="true" />{l(w.crmExternal.title)}</p>
                <p className="mt-2 t-body-s text-text-secondary">{l(w.crmExternal.line)}</p>
              </div>
            </div>
          </Reveal>

          {/* What we do */}
          <Reveal delay={100} className="xl:col-span-5">
            <div className="rounded-[20px] bg-[color:var(--sand-100)] p-6 md:p-7">
              <p className="t-heading-s text-text-primary">{l(w.supportTitle)}</p>
              <ul className="mt-4 space-y-3" data-support-list>
                {l(w.support).map((s) => (
                  <li key={s} className="flex items-start gap-3 t-body-s text-text-primary"><span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-signal-positive text-ivory"><Check size={12} strokeWidth={3} /></span>{s}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3">
                <ButtonLink href={p("/signup")} size="lg">{startLabel(locale)}</ButtonLink>
                <p className="t-caption text-text-secondary">{l(w.ctaLine)}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The questions before starting: Copy's rows */}
        <Reveal className="mt-12 max-w-[800px]">
          <p className="t-heading-m text-text-primary">{l(w.questionsTitle)}</p>
          <Accordion className="mt-4" items={ordered.map((it) => ({ id: it.kb.replace(/[^a-z0-9]/gi, "-").toLowerCase(), question: l(it.q), answer: l(it.a) }))} />
          <p className="mt-4 t-body-s"><Link href={p("/faq")} className="font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">{l(w.allQuestions)}</Link></p>
        </Reveal>
      </div>
    </section>
  );
}
