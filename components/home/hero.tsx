import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { HeroBenefits, HeroFilm, HeroScrollHint } from "./hero-film";
import { HeroDemo } from "./hero-demo";

/**
 * The hero (the owner's order of 03.11.2026, point 1; research 1103 R1 FIND, S6 Lev, S7 STILL/FORM): the 7-second film of the
 * furnished living room (C01) runs dimmed in a loop behind one strong sentence and the one main action; three benefits appear
 * while it runs; the demonstration follows directly underneath as a floating product card that rises into the film's lower
 * edge (the transition from the brand moment to the message → record). The header stands transparent over the film with the
 * logo in white and turns into the light bar on scroll (header-shell.tsx).
 *
 * The words at the left (Copy 1102 v2 §1.1): for whom, the headline, the benefit, "Ver la demo" as the main action, "Pedir
 * acceso" as the quiet second action, access by invitation. No trial promise (claims lines 02.11.).
 */
const FILM = "/media/3d/living-camera-ride.mp4";
const POSTER = "/media/3d/living-ride-poster.webp";

export function Hero({ locale }: { locale: Locale }) {
  const w = home1103.hero;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const p = (path: string) => localePath(locale, path);
  // the poster is the first picture of the page: preloaded so the largest paint does not wait for it
  preload(POSTER, { as: "image" });

  return (
    <>
      <section aria-labelledby="hero-h1" data-hero="film" className="hf">
        <HeroFilm src={FILM} poster={POSTER} label={l(w.film)} pause={l(w.pause)} play={l(w.play)} />
        {/* the brand moment (05.11., point 2): the logo alone over the film for a breath, then the words rise (CSS; none with reduced motion) */}
        <div className="hf-brand" aria-hidden="true" data-hero-brand>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-tight.png" alt="" width={1600} height={320} decoding="async" fetchPriority="high" />
        </div>
        <div className="container-default hf-content">
          <div className="hf-words" data-hero-words>
            <p className="hf-eyebrow t-eyebrow t-eyebrow-l">{l(w.eyebrow)}</p>
            <h1 id="hero-h1" className="hf-h1">
              {l(w.h1).split(" ").map((word, i) => (
                <span key={i}><span className="hf-word" style={{ ["--w" as string]: i }}><span>{word}</span></span>{" "}</span>
              ))}
            </h1>
            <p className="hf-lead" data-hero-lead>{l(w.lead)}</p>
            <div className="hf-ctas">
              <a href="#demo" className="hf-cta-main" data-hero-cta="demo">{l(w.ctaDemo)}<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></a>
              <a href={p("/contact")} className="hf-cta-second" data-hero-cta="contact">{l(w.ctaContact)}</a>
            </div>
            <p className="hf-access" data-hero-access>{l(w.access)}</p>
          </div>
          <HeroBenefits benefits={l(w.benefits)} />
          <HeroScrollHint label={l(w.scroll)} />
        </div>
      </section>
      {/* The product card rises into the film's lower edge: the transition from the house to the message and the record. */}
      <div className="container-default hero-demo-wrap" data-hero-demo-wrap>
        <HeroDemo locale={locale} />
      </div>
    </>
  );
}
