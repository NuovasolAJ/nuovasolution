import Link from "next/link";
import { ArrowRight, Database, Handshake, MessageSquareText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { entryAction, live, type ClaimView } from "@/lib/claims";
import { Accordion } from "@/components/ui/accordion";
import { Rise } from "@/components/ui/motion";
import { Behind } from "./behind";

/**
 * The way in, trust, the short FAQ and the close (Copy 1105 v3 §20 and §13 N-1; the owner's point 14 of 06.11.): in the target
 * state "14 días gratis, en 3 pasos" with its line, the small line and the trial as the action; in public, while the trial is off,
 * "Cómo empezar" with the request in two steps (three with `mailboxConnection`) and "Acceso por invitación.". The three trust lines
 * (line 1 per N-1's keys), the questions of §20 (one left out when its key is off), the close whose line follows
 * `mailboxConnection`. No testimonials, no logos, no figures (CLAUDE.md: only real proof). No status word.
 */
export function TrustFaqClose({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const e = home1103.entry;
  const t = home1103.trust;
  const f = home1103.faq;
  const c = home1103.close;
  const p = (path: string) => localePath(locale, path);
  const entry = entryAction(locale, view);
  const trial = entry.kind === "trial";
  const icons = [Handshake, Database, MessageSquareText];
  const steps = trial ? l(e.steps) : [...l(e.stepsPublic), ...(live("mailboxConnection", view) ? [l(e.steps)[2]] : [])];
  const lines = [l(t.line1(view)), ...l(t.lines)];
  const faqItems = f.items(locale, view);

  return (
    <>
      <section id="start" aria-labelledby="trust-h" className="trust" data-trust data-trust-view={view}>
        <div className="container-default">
          <div className="trust-grid">
            <Rise className="trust-words">
              <h2 id="trust-h" className="t-display-m text-text-primary">{l(t.h2)}</h2>
            </Rise>
            <div className="trust-right">
              {/* the way in (§20) */}
              <div className="entry" data-entry={entry.kind}>
                <p className="entry-title">{trial ? l(e.title) : l(e.titlePublic)}</p>
                <ol className="trust-steps" data-trust-steps>
                  {steps.map((s, i) => (
                    <Rise as="li" key={s.b} delay={i * 0.1} className="trust-step" data-trust-step={i + 1}>
                      <span className="trust-step-no tnum" aria-hidden="true">{i + 1}</span>
                      <span><strong>{s.b}</strong>{s.t ? ` ${s.t}` : ""}</span>
                    </Rise>
                  ))}
                </ol>
                <p className="entry-line" data-entry-line>{trial ? l(e.line) : entry.line}</p>
                {trial && <p className="entry-small">{l(e.small)}</p>}
                <p className="trust-entry">
                  <Link href={p(entry.href)} className="trust-entry-cta" data-trust-cta={entry.kind}>{entry.label}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></Link>
                </p>
              </div>
              <ol className="trust-lines">
                {lines.map((line, i) => {
                  const Icon = icons[i];
                  return (
                    <Rise as="li" key={line} delay={i * 0.1} className="trust-line" data-trust-line={i + 1}>
                      <span className="trust-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.9} /></span>
                      <span>{line}</span>
                    </Rise>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Copy 1108 §3: "Quién está detrás" between the way in and the questions */}
      <Behind locale={locale} />

      <section id="faq" aria-labelledby="faq-h" className="faqs" data-faq>
        <div className="container-default">
          <div className="faqs-grid">
            <Rise className="faqs-words">
              <h2 id="faq-h" className="t-display-m text-text-primary">{l(f.h2)}</h2>
              <p className="mt-4"><Link href={p("/faq")} className="faqs-all">{l(f.all)}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></Link></p>
            </Rise>
            <Rise className="faqs-list" delay={0.08}>
              <Accordion items={faqItems.map((it, i) => ({ id: `home-faq-${i + 1}`, question: it.q, answer: it.a }))} />
            </Rise>
          </div>
        </div>
      </section>

      <section aria-labelledby="close-h" className="closing" data-closing>
        <div className="container-default">
          <Rise className="closing-panel" y={24}>
            <h2 id="close-h" className="closing-h2">{l(c.h2)}</h2>
            <p className="closing-line">{l(c.line(view))}</p>
            <div className="closing-ctas">
              {/* Copy 1108 H-1: the close's main action is the demo request */}
              <Link href={p("/contact")} className="closing-cta-main lift" data-closing-main="contact">{l(c.ctaDemo)}</Link>
              <a href={p(entry.href)} className="closing-cta-second" data-closing-second={entry.kind}>{entry.label}</a>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
