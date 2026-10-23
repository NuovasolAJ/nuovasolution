import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { homeWords } from "@/lib/content/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { FloorPlan } from "./scene-art";

/**
 * The 3D section (master order 2026-10-10 §7; R19 closing order 2026-10-19 §10): a separate service, explained as
 * the order names it: plan → model → the same room empty and furnished → the real turn. The living room the 3D lane
 * delivered on 2026-10-05 is the quality reference (the clay stage, the offline render, an 8 second camera ride).
 *
 * Two of the four steps wait for material (3D_ASSETS_REQUEST_1017.md): the empty / furnished pair from the same
 * camera (A-2) and the full turn or the working viewer (A-1). Until then those two slots show what exists and say
 * what is missing: no design revision as a furniture comparison, no still picture under "rotatable view", no CSS
 * rotation of a flat image. The files land in public/media/3d/ and replace these under the same names.
 */
const F = {
  render: "/media/3d/living-render-1600.webp",
  clay: "/media/3d/living-clay-1200.webp",
  ride: "/media/3d/living-camera-ride.mp4",
  ridePoster: "/media/3d/living-ride-poster.webp",
};

function Img({ src, alt, w, h, className, eager = false }: { src: string; alt: string; w: number; h: number; className?: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />;
}

export function Model3dSection({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = homeWords.model3d;
  const steps = l(w.steps);
  const rooms = locale === "es" ? ["Salón", "Cocina", "Dormitorio", "Baño", "Terraza"] : ["Living room", "Kitchen", "Bedroom", "Bathroom", "Terrace"];
  const pending = locale === "es" ? "Pendiente del equipo 3D" : "Pending from the 3D team";

  return (
    <section id="model-3d" aria-labelledby="model3d-h" className="scroll-mt-[var(--header-h)] pb-[var(--section-default)] pt-[var(--section-compact)]">
      <div className="container-default">
        <Reveal className="max-w-[760px]">
          <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="model3d-h" className="mt-4 t-display-l text-text-primary">{l(w.h2)}</h2>
          <p className="mt-5 t-body-l text-text-secondary">{l(w.lead)}</p>
        </Reveal>

        {/* The four steps, as one row of pictures with their words; the two waiting steps say so on the picture. */}
        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-model3d-steps>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="flex flex-col overflow-hidden rounded-lg border border-line-contour bg-surface-raised">
              <div className="relative aspect-[3/2] w-full bg-[#f7f5ef]" data-model3d-step={i + 1} data-model3d-pending={i >= 2 ? "yes" : undefined}>
                {i === 0 && <FloorPlan rooms={rooms} className="h-full w-full" />}
                {i === 1 && <Img src={F.clay} alt={l(w.clay)} w={1200} h={800} className="h-full w-full object-cover" />}
                {i === 2 && (
                  <div className="h-full w-full" data-model3d-pair-slot="waiting">
                    <Img src={F.render} alt={l(w.render)} w={1600} h={1067} className="h-full w-full object-cover" />
                  </div>
                )}
                {i === 3 && (
                  <div className="h-full w-full bg-[#f3f1ec]" data-model3d-film data-model3d-turn-slot="waiting">
                    {/* the poster is the ride's own frame at 4 s (public/media/3d/living-ride-poster.webp), so the render of step 03 is not
                        shown twice and the video still starts at 0:00 (owner 23.10., picture 06) */}
                    <video controls muted playsInline preload="metadata" poster={F.ridePoster} className="h-full w-full object-cover" aria-label={l(w.film)}>
                      <source src={F.ride} type="video/mp4" />
                    </video>
                  </div>
                )}
                {i >= 2 && <span className="pointer-events-none absolute left-3 top-3 inline-flex rounded-pill bg-ink-950 px-2.5 py-1 text-[0.75rem] font-medium text-ivory">{pending}</span>}
              </div>
              <div className="p-4">
                <p className="flex items-baseline gap-2 t-heading-s text-text-primary"><span className="tnum t-caption text-text-accent">0{i + 1}</span>{s.title}</p>
                <p className="mt-1 t-body-s text-text-secondary">{s.line}</p>
                {i === 2 && <p className="mt-2 t-caption text-text-muted" data-model3d-compare-note>{l(w.pairPending)}</p>}
                {i === 3 && <p className="mt-2 t-caption text-text-muted" data-model3d-turn-note>{l(w.turnPending)}</p>}
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
