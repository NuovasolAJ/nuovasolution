import { preload } from "react-dom";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { entryAction, type ClaimView } from "@/lib/claims";
import { HeroBenefits, HeroImage, HeroScrollHint } from "./hero-image";
import { HeroDemo } from "./hero-demo";

/**
 * The hero (the owner's orders of 03.11. point 1, 05.11. point 2 + "HERO = A", 06.11. points 2 and 3 + FRAGE D; Copy 1105 v3 §2 and
 * §16): the 3D lane's render of the furnished living room (hero_A of handoff_2026-11-06, with the public-domain wall painting)
 * dimmed behind one strong sentence and the one main action; the brand moment with the logo on load, which then travels into the
 * header's logo; the three chips of §16 (H-1 … H-3, per view) appearing one after another; the demonstration follows directly
 * underneath as a floating product card that rises into the picture's lower edge. The header stands transparent over the picture
 * only while the picture's top edge is under it (header-shell.tsx). The still picture stays until the 3D lane delivers the calm
 * hero video (FRAGE D = JA).
 *
 * The words at the left: for whom, the headline, the benefit line (H-4), "Ver la demo" as the main action; the second action and the
 * line under it follow the view (H-5/H-6, lib/claims.ts): the trial in the target state, "Pedir acceso" with "Acceso por invitación."
 * on the public view.
 */
const PICTURE = "/media/3d/hero-a-1920.webp";
/* The brand moment of 06.11. is withdrawn (the owner's master prompt of 07.11., B1/B4/G1): the headline, the lead and the actions stand
   from the first frame and are in place within 0.8 s; the header's logo stands from the first pixel. */

export function Hero({ locale, view }: { locale: Locale; view: ClaimView }) {
  const w = home1103.hero;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const p = (path: string) => localePath(locale, path);
  const entry = entryAction(locale, view);
  // the picture is the first paint of the page: preloaded so the largest paint does not wait for it
  preload(PICTURE, { as: "image" });

  return (
    <>
      <section aria-labelledby="hero-h1" data-hero="film" className="hf">
        <HeroImage alt={l(w.image)} mark={l(w.imageMark)} credit={l(w.artCredit)} />
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
              <a href={p(entry.href)} className="hf-cta-second" data-hero-cta={entry.kind === "trial" ? "trial" : "contact"}>{entry.label}</a>
            </div>
            <p className="hf-access" data-hero-access={entry.kind}>{entry.line}</p>
          </div>
          <HeroBenefits benefits={w.chips(view).map((c) => c[locale])} />
          <HeroScrollHint label={l(w.scroll)} />
        </div>
      </section>
      {/* The product card rises into the picture's lower edge: the transition from the house to the message and the record. */}
      <div className="container-default hero-demo-wrap" data-hero-demo-wrap>
        <HeroDemo locale={locale} view={view} />
      </div>
    </>
  );
}
