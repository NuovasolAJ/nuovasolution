import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { homeWords } from "@/lib/content/home-sections";
import { ButtonLink } from "@/components/ui/button";
import { CompareSlider } from "@/components/ui/compare-slider";
import { Reveal } from "@/components/ui/reveal";
import { FloorPlan } from "./scene-art";

/**
 * The 3D section (master order 2026-10-10 §7): plan → furnishing → render → rotatable view, with the living
 * room the 3D lane delivered on 2026-10-05 as the quality reference (raw model and furnished model from the
 * same camera, the clay stage, the offline render, the viewer, an 8 second camera ride). Nothing here claims an
 * automatic pipeline or an exact reconstruction; the note says what the pictures are. New pictures and films
 * from the 3D lane replace these files in public/media/3d/.
 */
const F = {
  before: "/media/3d/living-before-1200.webp",
  render: "/media/3d/living-render-1600.webp",
  render800: "/media/3d/living-render-800.webp",
  clay: "/media/3d/living-clay-1200.webp",
  viewer: "/media/3d/living-viewer-1200.webp",
  ride: "/media/3d/living-camera-ride.mp4",
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

  return (
    <section id="model-3d" aria-labelledby="model3d-h" className="scroll-mt-[var(--header-h)] pb-[var(--section-default)] pt-[var(--section-compact)]">
      <div className="container-default">
        <Reveal className="max-w-[760px]">
          <p className="t-eyebrow text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="model3d-h" className="mt-4 t-display-l text-text-primary">{l(w.h2)}</h2>
          <p className="mt-5 t-body-l text-text-secondary">{l(w.lead)}</p>
        </Reveal>

        {/* The four stages, as one row of pictures with their words. */}
        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-model3d-steps>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="flex flex-col overflow-hidden rounded-lg border border-line-contour bg-surface-raised">
              <div className="aspect-[3/2] w-full bg-[#f7f5ef]">
                {i === 0 && <FloorPlan rooms={rooms} className="h-full w-full" />}
                {i === 1 && <Img src={F.clay} alt={l(w.clay)} w={1200} h={800} className="h-full w-full object-cover" />}
                {i === 2 && <Img src={F.render800} alt={l(w.render)} w={800} h={533} className="h-full w-full object-cover" />}
                {i === 3 && <Img src={F.viewer} alt={l(w.viewer)} w={1200} h={703} className="h-full w-full object-cover" />}
              </div>
              <div className="p-4">
                <p className="flex items-baseline gap-2 t-heading-s text-text-primary"><span className="tnum t-caption text-text-accent">0{i + 1}</span>{s.title}</p>
                <p className="mt-1 t-body-s text-text-secondary">{s.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Before and after from the same camera */}
          <Reveal>
            <CompareSlider
              label={l(w.compareLabel)}
              beforeLabel={l(w.before)}
              afterLabel={l(w.after)}
              before={<Img src={F.before} alt={l(w.before)} w={1200} h={800} className="w-full" />}
              after={<Img src={F.render} alt={l(w.render)} w={1600} h={1067} className="w-full" />}
              className="border border-line-contour"
              initial={50}
            />
            <p className="mt-3 t-caption text-text-muted">{l(w.compareLabel)}</p>
          </Reveal>
          {/* The camera ride */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-lg border border-line-contour bg-[#f3f1ec]" data-model3d-film>
              <video controls muted playsInline preload="none" poster={F.render800} className="aspect-[16/9] w-full" aria-label={l(w.film)}>
                <source src={F.ride} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 t-caption text-text-muted">{l(w.film)}</p>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-hairline pt-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[62ch] t-body-s text-text-secondary">{l(w.viewerLine)} {l(w.demoNote)}</p>
          <ButtonLink href={localePath(locale, "/contact")} variant="secondary" className="shrink-0">{l(w.cta)}<ArrowRight size={16} aria-hidden="true" /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
