import { ArrowDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { heroWords } from "@/lib/content/home-story";
import { ButtonLink } from "@/components/ui/button";
import { HeroDemo } from "./hero-demo";

/**
 * The hero (the owner's review of 02.11.2026, §3; work package 1): a calm light ground, dark type, the house green as the accent,
 * WhatsApp green only for the channel. The words at the left (about 40 % from 1024 px): for whom, what Nuova does, the benefit; one
 * main action ("Ver la demo") and one quiet second action (contact; the platform is reached by invitation today). The product
 * demonstration at the right (about 60 %): one conversation and three visible consequences (hero-demo.tsx).
 *
 * No background photograph, no leaning surface, no layers (the owner's decision of 02.11.: the four-layer concept is withdrawn). On a
 * phone: headline, benefit line, main action, then the compact demonstration, in that order. At 1366 × 768 the benefit, the main
 * action, the enquiry and the record's first lines stand on the first screen (measured in the master check, "ap1-hero-demo").
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const w = heroWords;
  const p = (path: string) => localePath(locale, path);
  const l = <T,>(x: Record<Locale, T>) => x[locale];

  return (
    <section aria-labelledby="hero-h1" data-hero="light" className="hero">
      <div className="container-default hero-grid">
        <div className="hero-words" data-hero-words>
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{d.home.hero.eyebrow}</p>
          <h1 id="hero-h1" className="hero-h1 text-text-primary">{l(w.h1)}</h1>
          <p className="hero-lead text-text-secondary" data-hero-lead>{l(w.lead)}</p>
          <div className="hero-ctas">
            <a href="#demo" className="hero-cta-main" data-hero-cta="demo">
              {l(w.ctaDemo)}
              <ArrowDown size={18} strokeWidth={2} aria-hidden="true" className="hero-cta-arrow" />
            </a>
            <ButtonLink href={p("/contact")} size="lg" variant="secondary" className="hero-cta-second">{l(w.ctaContact)}</ButtonLink>
          </div>
          <p className="hero-access" data-hero-access>{l(w.accessLine)}</p>
        </div>
        <HeroDemo locale={locale} />
      </div>
    </section>
  );
}
