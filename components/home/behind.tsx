import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { Rise } from "@/components/ui/motion";

/**
 * "Quién está detrás" (the owner's D1 of 07.11.; Copy 1108 §3): the same text in both views, every sentence true today. No client
 * logos, testimonials, counts or results. The holder's name comes from the environment (NUOVA_E14_NAME, like the legal pages) and is
 * never committed; without it the brand sentence is left out — no visible placeholder (Copy). The owner's answer of 09.11.: the pilot
 * places are "limitadas", no number.
 */
export function Behind({ locale }: { locale: Locale }) {
  const w = home1103.behind;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const name = process.env.NUOVA_E14_NAME?.trim() || null;
  return (
    <section id="behind" aria-labelledby="behind-h" className="behind" data-behind data-behind-name={name ? "set" : "unset"}>
      <div className="container-default behind-grid">
        <Rise className="behind-words">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="behind-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-5 t-body-l text-text-secondary">{name ? l(w.brand).replace("{name}", name) : l(w.brandNoName)}</p>
          <p className="mt-3 t-body-m text-text-secondary m-hide">{l(w.pilot)}</p>
        </Rise>
        <Rise className="behind-facts" delay={0.1}>
          <ul className="behind-lines">
            {w.lines.map((line, i) => (
              <li key={i} className="behind-line" data-behind-line={i + 1}><span className="behind-check" aria-hidden="true"><Check size={14} strokeWidth={2.6} /></span>{l(line)}</li>
            ))}
          </ul>
          <Link href={localePath(locale, "/contact")} className="behind-cta lift" data-behind-cta>{l(w.cta)}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></Link>
        </Rise>
      </div>
    </section>
  );
}
