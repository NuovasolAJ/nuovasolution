import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { homeWords } from "@/lib/content/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CompareSlider } from "@/components/ui/compare-slider";
import { MediaVideo } from "@/components/ui/media-video";
import { DemoPlan } from "./scene-art";

/**
 * The 3D section (master order 2026-10-10 §7; R19 closing order 2026-10-19 §10; R24 of 24.10.: the 3D lane's website
 * assets built in; the owner's consolidated closing order of 26.10. §4: one large house view with depth, the flow kept
 * small and quick, the empty/furnished handle kept, the short living-room clip back). Everything shows the one
 * demonstration house of the 3D lane (nuova-3d, run run-20261024-132933-house, handoff deliverables/website-assets/
 * handoff_2026-10-23) and, for the living-room ride, the 3D lane's earlier living-room study (handoff 2026-10-02):
 *
 *   main  the whole house turning, recorded from the real viewer: both floors one full turn, then the ground floor, 20 s,
 *         cut from the recording at its own 25 fps (no retiming, no acceleration); the poster is its first frame
 *   01    the ground floor drawn to scale from the house's own specification (scene-art.tsx DemoPlan)
 *   02    the whole house without a roof, both floors, as the viewer shows it (the opening frame of the recording)
 *   03    the living room empty and furnished from the same camera (two offline renders), on a compare handle
 *   04    the delivery: a short camera ride through the furnished living room (8 s)
 *
 * Every picture carries the 3D lane's mandatory mark (a fictional demonstration house, a visualisation, recorded from
 * the real viewer); nothing is a real home and no photorealism is promised (handoff README). The recording still shows
 * the viewer's room names and controls: a clean marketing take without them is ordered from the 3D lane
 * (WEBSITE_TO_3D_1026_ASSET_ORDER.md) and replaces the files under the same names. No viewer link is offered: none is
 * hosted yet. The files live in public/media/3d/.
 */
const media = (locale: Locale) => ({
  house: `/media/3d/house-both-floors-${locale}-1600.webp`,
  empty: "/media/3d/living-empty-1200.webp",
  furnished: "/media/3d/living-furnished-1200.webp",
  turn: `/media/3d/house-turn-${locale}.mp4`,
  turnPoster: `/media/3d/house-turn-poster-${locale}.webp`,
  ride: "/media/3d/living-camera-ride.mp4",
  ridePoster: "/media/3d/living-ride-poster.webp",
});

function Img({ src, alt, w, h, className }: { src: string; alt: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className={className} />;
}

export function Model3dSection({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeWords.model3d;
  const steps = l(w.steps);
  const F = media(locale);
  const captions = [l(w.planCaption), l(w.modelCaption), l(w.pairCaption), l(w.rideCaption)];

  return (
    <section id="model-3d" aria-labelledby="model3d-h" className="scroll-mt-[var(--header-h)] pb-[var(--section-default)] pt-[var(--section-compact)]">
      <div className="container-default">
        <Reveal className="max-w-[760px]">
          <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="model3d-h" className="mt-4 t-display-l text-text-primary">{l(w.h2)}</h2>
          <p className="mt-5 t-body-l text-text-secondary">{l(w.lead)}</p>
        </Reveal>

        {/* The main view: the whole house, large, turning; the words beside it on a wide window, under it on a narrow one. */}
        <Reveal mode="opacity" delay={60} className="mt-10">
          <figure className="model3d-main" data-model3d-main>
            <div className="model3d-main-media" data-model3d-film data-model3d-turn-slot="delivered">
              <MediaVideo src={F.turn} poster={F.turnPoster} label={l(w.film)} className="h-full w-full object-cover" />
            </div>
            <figcaption className="model3d-main-words">
              <p className="t-heading-m text-text-primary">{l(w.mainTitle)}</p>
              <p className="mt-2 t-body-s text-text-secondary">{l(w.mainLine)}</p>
              <p className="mt-3 t-caption text-text-muted" data-model3d-caption="main">{l(w.turnCaption)}</p>
            </figcaption>
          </figure>
        </Reveal>

        {/* The flow: plan → model → empty/furnished → delivery, four small steps of the same house. */}
        <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-model3d-steps>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="flex flex-col overflow-hidden rounded-lg border border-line-contour bg-surface-raised">
              <div className="relative aspect-[3/2] w-full bg-[#f7f5ef]" data-model3d-step={i + 1}>
                {i === 0 && <DemoPlan locale={locale} className="h-full w-full" />}
                {i === 1 && <Img src={F.house} alt={l(w.modelAlt)} w={1600} h={900} className="h-full w-full object-cover" />}
                {i === 2 && (
                  <div className="h-full w-full" data-model3d-pair-slot="delivered">
                    <CompareSlider
                      label={l(w.pairLabel)}
                      beforeLabel={l(w.empty)}
                      afterLabel={l(w.furnished)}
                      className="h-full w-full rounded-none"
                      before={<Img src={F.empty} alt={l(w.pairAlt)} w={1200} h={800} className="h-full w-full object-cover" />}
                      after={<Img src={F.furnished} alt="" w={1200} h={800} className="h-full w-full object-cover" />}
                    />
                  </div>
                )}
                {i === 3 && (
                  <div className="h-full w-full bg-[#eef0f2]" data-model3d-ride-slot="delivered">
                    <MediaVideo src={F.ride} poster={F.ridePoster} label={l(w.rideFilm)} className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="flex items-baseline gap-2 t-heading-s text-text-primary"><span className="tnum t-caption text-text-accent">0{i + 1}</span>{s.title}</p>
                <p className="mt-1 t-body-s text-text-secondary">{s.line}</p>
                <p className="mt-2 t-caption text-text-muted" data-model3d-caption={i + 1}>{captions[i]}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-hairline pt-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[62ch] t-body-s text-text-secondary">{l(w.viewerLine)} {l(w.demoNote)}</p>
          <ButtonLink href={localePath(locale, "/contact")} variant="secondary" className="shrink-0">{l(w.cta)}<ArrowRight size={16} aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
