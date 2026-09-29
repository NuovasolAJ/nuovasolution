import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

/**
 * The hero's scene, in three layers (owner direction 2026-09-29):
 * 1. ground: one sand arch with a hairline echo;
 * 2. product: the WhatsApp enquiry and the reply that goes out, as one surface;
 * 3. foreground: two small overlapping details that say what happened next, the record with
 *    its priority and the task for the team. They rise into place once; readable without
 *    motion, without JS and by a screen reader in document order.
 * The whole story is told in miniature here and once, in full, in the flow section below.
 * All data is synthetic and labelled; no availability is confirmed (external finding 13).
 */
export function HeroScene({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const c = d.home.hero.cards;
  const v = d.home.views.conversation;
  const steps = d.home.flow.steps;
  return (
    <Reveal mode="opacity" delay={80} className={cn("relative", className)}>
      <div className="relative mx-auto max-w-[560px] px-3 pb-24 pt-10 md:px-10 md:pb-24 md:pt-14" data-hero-scene>
        <div className="hero-arch" aria-hidden="true" />

        <div className="relative z-[1] mx-auto max-w-[400px]">
          <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-overlay">
            <div className="flex items-center gap-3 border-b border-line-hairline bg-surface-sunken px-4 py-3">
              <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-sage-200 text-sage-700"><StatusGlyph glyph="link" size={14} /></span>
              <div className="min-w-0">
                <p className="t-body-s font-medium text-text-primary">{v.agency}</p>
                <p className="t-caption text-text-muted">{c.enquiry.channel}</p>
              </div>
              <LabelChip className="ml-auto">{v.synthetic}</LabelChip>
            </div>
            <ol className="space-y-3 p-4">
              <li className="flex justify-start">
                <div className="max-w-[88%] rounded-lg rounded-bl-sm bg-surface-sunken px-3.5 py-2.5">
                  <p className="t-body-s text-text-primary">{c.enquiry.text}</p>
                  <p className="mt-1 t-caption tnum text-text-muted">{c.enquiry.from} · {c.enquiry.time}</p>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="max-w-[88%] rounded-lg rounded-br-sm bg-sage-100 px-3.5 py-2.5">
                  <p className="mb-1 t-caption text-sage-700">{v.assistant}</p>
                  <p className="t-body-s text-text-primary">{c.answer.text}</p>
                  <p className="mt-1 t-caption tnum text-text-muted">{c.answer.time}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Foreground details: what happened to the enquiry. */}
        <p className="rise float-chip absolute right-1 top-4 z-[2] md:right-2 md:top-8" style={{ ["--rise-delay" as string]: "260ms" }}>
          <StatusGlyph glyph="check" size={12} className="text-signal-positive" />
          {steps[1]} · {c.record.name}
        </p>
        <div className="rise absolute bottom-2 left-1 z-[2] w-[min(300px,86%)] rounded-lg border border-line-hairline bg-surface-raised p-4 shadow-overlay md:bottom-4 md:left-0" style={{ ["--rise-delay" as string]: "420ms" }}>
          <p className="flex items-center gap-2 t-caption text-text-muted">
            <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-pill bg-sky-200 text-sky-700"><StatusGlyph glyph="check" size={10} /></span>
            {c.task.label}
          </p>
          <p className="mt-2 t-body-s font-medium text-text-primary">{c.task.title}</p>
          <p className="mt-1 t-caption text-text-muted">{c.task.state}</p>
        </div>
      </div>
    </Reveal>
  );
}
