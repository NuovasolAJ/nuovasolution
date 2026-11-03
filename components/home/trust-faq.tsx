import Link from "next/link";
import { ArrowRight, Database, Handshake, MessageSquareText } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { Accordion } from "@/components/ui/accordion";
import { Rise } from "@/components/ui/motion";

/**
 * Trust (Copy 1102 v2 §6.2), the short FAQ (§6.3) and the close (§6.4): three lines with one icon each, seven questions in an
 * accordion, then the two actions of the whole page once more. No testimonials, no logos, no figures (CLAUDE.md: only real proof).
 */
export function TrustFaqClose({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const t = home1103.trust;
  const f = home1103.faq;
  const c = home1103.close;
  const p = (path: string) => localePath(locale, path);
  const icons = [Handshake, Database, MessageSquareText];

  return (
    <>
      <section id="start" aria-labelledby="trust-h" className="trust" data-trust>
        <div className="container-default">
          <div className="trust-grid">
            <Rise className="trust-words">
              <h2 id="trust-h" className="t-display-m text-text-primary">{l(t.h2)}</h2>
            </Rise>
            <ol className="trust-lines">
              {l(t.lines).map((line, i) => {
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
      </section>

      <section id="faq" aria-labelledby="faq-h" className="faqs" data-faq>
        <div className="container-default">
          <div className="faqs-grid">
            <Rise className="faqs-words">
              <h2 id="faq-h" className="t-display-m text-text-primary">{l(f.h2)}</h2>
              <p className="mt-4"><Link href={p("/faq")} className="faqs-all">{l(f.all)}<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" /></Link></p>
            </Rise>
            <Rise className="faqs-list" delay={0.08}>
              <Accordion items={l(f.items).map((it, i) => ({ id: `home-faq-${i + 1}`, question: it.q, answer: it.a }))} />
            </Rise>
          </div>
        </div>
      </section>

      <section aria-labelledby="close-h" className="closing" data-closing>
        <div className="container-default">
          <Rise className="closing-panel" y={24}>
            <h2 id="close-h" className="closing-h2">{l(c.h2)}</h2>
            <p className="closing-line">{l(c.line)}</p>
            <div className="closing-ctas">
              <a href="#demo" className="closing-cta-main" data-demo-run>{l(c.ctaDemo)}</a>
              <a href={p("/contact")} className="closing-cta-second">{l(c.ctaContact)}</a>
            </div>
          </Rise>
        </div>
      </section>
    </>
  );
}
