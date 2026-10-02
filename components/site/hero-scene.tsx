import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { DepthScene } from "@/components/ui/depth-scene";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

/**
 * The hero's scene in three layers that can be told apart in the still picture (owner order
 * 2026-10-01 §2), each with its own size, overlap and shadow, and on scroll a small differential
 * movement (components/ui/depth-scene.tsx):
 *
 * 1. ground: a calm warm arch, its hairline echo and a low horizon band, larger than the product
 *    surface and leading the eye to it;
 * 2. product: one large, legible surface of the proven flow, the enquiry on WhatsApp, the reply that
 *    goes out under the agency's name, and the record of what the customer asked for;
 * 3. foreground: a few details that stand out over the frame's edges, what happened next: the
 *    answered time, the record, and the task that is handed to the team. Each is placed where the
 *    frame has no text under it: the chips over the top edge and the left edge at the divider, the
 *    task card over the frame's bottom padding only, below the record.
 *
 * Readable without motion, without JavaScript and by a screen reader in document order. The phone
 * keeps the three layers with half the travel; nothing of layer 3 covers text of layer 2. All data is
 * synthetic and labelled; no availability is confirmed (external finding 13). The whole story is
 * told here once in miniature and in full in the flow section below.
 */
export function HeroScene({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const c = d.home.hero.cards;
  const v = d.home.views.conversation;
  const steps = d.home.flow.steps;
  const answeredAt = c.answer.time.replace(/^[^0-9]*/, "");
  return (
    <Reveal mode="opacity" delay={80} className={cn("relative", className)}>
      {/* Padding: the room the foreground details need beyond the frame (top chip, bottom card). */}
      <DepthScene className="mx-auto max-w-[640px] px-2 pb-6 pt-10 md:px-8 md:pt-16 xl:px-6 xl:pb-24" data-hero-scene>
        {/* Layer 1: the ground. */}
        <div data-depth-layer="back" aria-hidden="true" className="hero-ground">
          <div className="hero-ground-horizon" />
          <div className="hero-ground-arch" />
          <div className="hero-ground-echo" />
        </div>

        {/* Layer 2: the product surface. */}
        <div className="relative z-[1] mx-auto max-w-[520px]" data-hero-product>
          <div className="stage overflow-hidden rounded-xl">
            <div className="flex items-center gap-3 border-b border-line-hairline bg-surface-sunken px-4 py-3 md:px-5">
              <span aria-hidden="true" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-sand-200 text-text-primary"><StatusGlyph glyph="link" size={15} /></span>
              <div className="min-w-0 md:pr-28">
                <p className="truncate t-body-s font-medium text-text-primary">{v.agency}</p>
                <p className="truncate t-caption text-text-muted">{c.enquiry.channel}</p>
              </div>
            </div>
            <ol className="space-y-3 px-4 pb-4 pt-5 md:px-5">
              <li className="flex justify-start">
                <div className="max-w-[86%] rounded-lg rounded-bl-sm bg-surface-sunken px-3.5 py-2.5">
                  <p className="t-body-s text-text-primary">{c.enquiry.text}</p>
                  <p className="mt-1 t-caption tnum text-text-muted">{c.enquiry.from} · {c.enquiry.time}</p>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="max-w-[86%] rounded-lg rounded-br-sm bg-sand-100 px-3.5 py-2.5">
                  <p className="mb-1 t-caption font-medium text-text-accent">{v.assistant}</p>
                  <p className="t-body-s text-text-primary">{c.answer.text}</p>
                  <p className="mt-1 t-caption tnum text-text-muted">{c.answer.time}</p>
                </div>
              </li>
            </ol>
            {/* What the surface recorded from the conversation: the record, inside the same frame. The bottom
                padding is the room under which the task card may lie; no line of text is ever under it. */}
            <div className="border-t border-line-hairline px-4 pb-12 pt-4 md:px-5 xl:pb-[76px]" data-hero-record>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="t-eyebrow text-text-muted">{c.record.label}</p>
                <LabelChip>{v.synthetic}</LabelChip>
              </div>
              <p className="mt-2 t-body-s font-medium text-text-primary">{c.record.name}</p>
              <ul className="mt-1 space-y-0.5">
                {c.record.lines.slice(0, 2).map((l) => (
                  <li key={l} className="t-caption text-text-secondary">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Layer 3: the foreground details, over the frame's edges. Positioned against the scene, whose
            padding is fixed per breakpoint, so each lands on an edge or on padding of the frame. */}
        <p data-depth-layer="front" className="rise float-chip absolute right-2 top-3 z-[2] md:right-6 md:top-[50px] xl:right-4" style={{ ["--rise-delay" as string]: "260ms" }} data-hero-chip="answered">
          <StatusGlyph glyph="check" size={12} className="text-signal-positive" />
          {steps[0]} · {answeredAt}
        </p>
        {/* From 1024 px only (the wrapper hides it; the chip's own display rule would not): centred on the divider
            between the conversation and the record, over the frame's left edge. */}
        <div data-depth-layer="front" className="absolute left-0 z-[2] hidden xl:block xl:bottom-[279px]" data-hero-chip="recorded">
          <p className="rise float-chip" style={{ ["--rise-delay" as string]: "360ms" }}>
            <StatusGlyph glyph="check" size={12} className="text-signal-positive" />
            {steps[1]} · {c.record.name}
          </p>
        </div>
        <div data-depth-layer="front" className="rise float-card relative z-[2] -mt-6 ml-auto mr-1 w-[min(320px,86%)] p-4 md:mr-4 md:p-5 xl:absolute xl:bottom-8 xl:right-0 xl:mt-0 xl:w-[320px]" style={{ ["--rise-delay" as string]: "460ms" }} data-hero-task>
          <p className="flex items-center gap-2 t-caption text-text-muted">
            <span aria-hidden="true" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-sand-200 text-text-primary"><StatusGlyph glyph="arrow-right" size={10} /></span>
            {steps[2]} · {c.task.label}
          </p>
          <p className="mt-2 t-body-s font-medium text-text-primary">{c.task.title}</p>
          <p className="mt-1 t-caption text-text-muted">{c.task.state}</p>
        </div>
      </DepthScene>
    </Reveal>
  );
}
