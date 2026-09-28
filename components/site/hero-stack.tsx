import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

/**
 * The hero's visual statement: one enquiry, answered and understood, as three layered
 * cards with depth. All data is synthetic and labelled. Each card depicts a capability
 * that is in use today (AI Sales Agent on WhatsApp; a qualified, prioritised lead record).
 * The cards are plain content: readable without motion, without JS and by a screen reader.
 */
export function HeroStack({ locale, className }: { locale: Locale; className?: string }) {
  const h = getDictionary(locale).home.hero.cards;
  return (
    <Reveal mode="opacity" delay={80} className={cn("relative", className)}>
      <div className="field-sky relative overflow-hidden rounded-xl p-5 pb-8 md:p-8 md:pb-10" data-hero-stack>
        <LabelChip className="relative z-[4] mb-4">{h.synthetic}</LabelChip>

        <ol className="relative space-y-4 md:space-y-0">
          {/* 1 · the enquiry */}
          <li className="rise relative z-[1] md:mr-[22%]" style={{ ["--rise-delay" as string]: "0ms" }}>
            <div className="card p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 t-caption text-text-muted">
                  <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-pill bg-sage-200 text-sage-700"><StatusGlyph glyph="link" size={12} /></span>
                  {h.enquiry.channel}
                </span>
                <span className="t-caption tnum text-text-muted">{h.enquiry.time}</span>
              </div>
              <p className="mt-3 t-body-m text-text-primary">{h.enquiry.text}</p>
              <p className="mt-2 t-caption text-text-muted">{h.enquiry.from}</p>
            </div>
          </li>

          {/* 2 · the answer */}
          <li className="rise relative z-[2] md:-mt-3 md:ml-[18%]" style={{ ["--rise-delay" as string]: "140ms" }}>
            <div className="card border-sage-200 bg-[color:var(--sage-100)] p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 t-caption text-sage-700">
                  <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-pill bg-ink-950 text-ivory"><StatusGlyph glyph="check" size={12} /></span>
                  {h.answer.label}
                </span>
                <span className="t-caption tnum text-text-muted">{h.answer.time}</span>
              </div>
              {/* The notice the reply carries: ES the approved v1.0-es text, quoted; EN a marked sample translation (LAUNCH_COPY_v1 §4.2). */}
              <p className="mt-3 t-body-s text-text-primary" data-disclosure={locale}>{h.answer.disclosure}</p>
              {h.answer.disclosureMark && <p className="mt-1 t-caption text-text-muted">{h.answer.disclosureMark}</p>}
              <p className="mt-3 t-body-m text-text-primary">{h.answer.text}</p>
              <p className="mt-2 t-caption text-sage-700">{h.answer.disclosureNote}</p>
            </div>
          </li>

          {/* 3 · the record */}
          <li className="rise relative z-[3] md:-mt-2 md:mr-[10%]" style={{ ["--rise-delay" as string]: "280ms" }}>
            <div className="card p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="t-eyebrow text-text-muted">{h.record.label}</span>
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-apricot-100 px-2.5 py-1 t-caption text-text-primary">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-signal-attention" />
                  {h.record.priority}
                </span>
              </div>
              <p className="mt-3 t-heading-s text-text-primary">{h.record.name}</p>
              <p className="mt-1 t-body-s text-text-secondary">{h.record.summary}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line-hairline pt-4">
                <div>
                  <dt className="t-caption text-text-muted">{h.record.qualificationLabel}</dt>
                  <dd className="mt-0.5 t-body-s text-text-primary">{h.record.qualification}</dd>
                </div>
                <div>
                  <dt className="t-caption text-text-muted">{h.record.nextLabel}</dt>
                  <dd className="mt-0.5 t-body-s text-text-primary">{h.record.next}</dd>
                </div>
              </dl>
            </div>
          </li>
        </ol>
      </div>
    </Reveal>
  );
}
