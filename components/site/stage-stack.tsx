import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilitiesByStage, stageOrder, type Capability } from "@/lib/content/capabilities";
import { statusPresentation } from "@/lib/content/statuses";
import { cn } from "@/lib/utils";
import { StatusChip, StatusGlyph } from "@/components/ui/status";
import { AssistantView, ConversationView, RecordView, StatusCard } from "./product-views";

const field: Record<string, string> = {
  answer: "field-sage",
  understand: "field-sand",
  advance: "field-sky",
  handover: "field-apricot",
  attract: "field-lavender",
};

/** Reading order for the cards: what runs today first, what is being built last. */
const cardOrder = ["answer", "understand", "handover", "advance", "attract"] as const;

function StageView({ stage, locale }: { stage: string; locale: Locale }) {
  const byStage = capabilitiesByStage();
  const items = byStage[stage as keyof typeof byStage] ?? [];
  const first = items[0] as Capability | undefined;
  switch (stage) {
    case "answer":
      return <ConversationView locale={locale} />;
    case "understand":
      return <RecordView locale={locale} />;
    case "handover":
      return <AssistantView locale={locale} />;
    case "advance": {
      const pm = items.find((c) => c.slug === "property-matching") ?? first;
      return pm ? <StatusCard locale={locale} status="in_implementation" title={pm.name[locale]} pending={pm.lead[locale]} /> : null;
    }
    default: {
      const sg = items.find((c) => c.slug === "lead-acquisition") ?? first;
      return sg ? <StatusCard locale={locale} status="certified_gate_pending" title={sg.name[locale]} certified={sg.bothHalves?.certified[locale]} pending={sg.bothHalves?.pending[locale]} /> : null;
    }
  }
}

/**
 * The five stages as stacked cards (PRODUCT_TEXTS_C3_v1 §1.1 names, §2 H4/H5 texts). Each card
 * sticks below the header while the next one scrolls over it (position: sticky only; nothing
 * hijacks the scroll, and under reduced motion the cards simply follow each other). Every card:
 * a short title, one line, the capabilities it contains with their status, details on demand,
 * and a product view or the honest state in words.
 */
export function StageStack({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const s = d.home.stack;
  const byStage = capabilitiesByStage();
  const cards = s.cards as Record<string, { title: string; line: string; qualifier?: string }>;
  const stageName = d.nav.stages as Record<string, string>;

  return (
    <ol className="space-y-6" data-stage-stack>
      {cardOrder.map((stage, i) => {
        const items = byStage[stage];
        if (!items.length) return null;
        const c = cards[stage];
        return (
          <li key={stage} className="stack-card" style={{ ["--stack-offset" as string]: `${i * 10}px` }}>
            <article className="card overflow-hidden rounded-xl" aria-labelledby={`stack-${stage}`}>
              <div className="grid xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="p-6 md:p-8 xl:p-10">
                  <p className="t-eyebrow text-text-muted">
                    <span className="tnum">0{i + 1}</span> · {stageName[stage]}
                  </p>
                  <h3 id={`stack-${stage}`} className="mt-3 t-heading-l text-text-primary">{c.title}</h3>
                  <p className="mt-3 t-body-m text-text-secondary measure-body">{c.line}</p>
                  {c.qualifier && <p className="mt-2 t-caption text-text-muted">{c.qualifier}</p>}
                  {stage === "answer" && (
                    <ol className="mt-5 flex flex-wrap gap-2" aria-label={s.h2}>
                      {s.steps.map((st, j) => (
                        <li key={st} className="inline-flex items-center gap-2 rounded-pill bg-surface-sunken px-3 py-1.5 t-caption text-text-primary">
                          <span className="tnum text-text-muted">{j + 1}</span>
                          {st}
                        </li>
                      ))}
                    </ol>
                  )}
                  <ul className="mt-6 space-y-2">
                    {items.map((cap) => (
                      <li key={cap.slug} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <Link href={localePath(locale, `/platform/${cap.slug}`)} className="inline-flex min-h-[32px] items-center gap-1.5 t-body-s font-medium text-text-primary underline-offset-4 hover:underline">
                          {cap.name[locale]}
                          <StatusGlyph glyph="arrow-right" size={12} className="text-text-muted" />
                        </Link>
                        <StatusChip status={cap.status} locale={locale} />
                      </li>
                    ))}
                  </ul>
                  <details className="group mt-6 rounded-lg border border-line-hairline bg-surface-canvas">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 t-body-s text-text-primary">
                      {s.details}
                      <span aria-hidden="true" className="text-text-muted transition-transform duration-control group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-line-hairline px-4 py-3">
                      {stage === "answer" && <p className="py-2 t-body-s text-text-secondary">{s.stepsDetail}</p>}
                      {items.map((cap) => (
                        <div key={cap.slug} className="py-2">
                          <p className="t-caption text-text-muted">{cap.name[locale]}</p>
                          <ul className="mt-1 space-y-1.5">
                            {cap.points.map((pt, j) => {
                              const sp = statusPresentation(pt.status, locale);
                              return (
                                <li key={j} className="flex items-start gap-2 t-body-s">
                                  <StatusGlyph glyph={sp.glyph} size={14} className={cn("mt-1 shrink-0", sp.tone === "positive" ? "text-signal-positive" : sp.tone === "attention" ? "text-signal-attention" : "text-text-muted")} />
                                  <span className={sp.publiclyAvailable ? "text-text-primary" : "text-text-secondary"}>
                                    {pt.text[locale]} <span className="t-caption text-text-muted">· {sp.short}</span>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
                <div className={cn("flex items-center p-6 md:p-8 xl:p-10", field[stage])}>
                  <StageView stage={stage} locale={locale} />
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
