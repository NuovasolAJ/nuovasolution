import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { publishedCapability } from "@/lib/content/capabilities";
import { cn } from "@/lib/utils";
import { StatusGlyph } from "@/components/ui/status";
import { ProductClip } from "@/components/ui/product-clip";
import { BoardView, ConversationView, DailyShot, RecordView } from "./product-views";
import { FlowRail } from "./flow-rail";

/**
 * The one story of the site, told once (owner order 2026-09-29 B, COPY_DELTAS_0929 §2.2): an
 * enquiry is answered, it becomes a record, a viewing request is handed over as a task, and one
 * of the agency's people finishes it. Four stages, each a white stage (layer 2) on the shared
 * sand band (layer 1), each with its own layout so the page does not repeat text-left,
 * picture-right: the reply beside its notes · the records with one record laid over their
 * corner · the task card across the full width · the real clip of the staff app on top, its text
 * below. Small foreground details (layer 3) mark what changed at each step. Setting an agency
 * up is not a step of this story and has its own section.
 */
function CapLinks({ slugs, locale }: { slugs: string[]; locale: Locale }) {
  const caps = slugs.map(publishedCapability).filter((x): x is NonNullable<typeof x> => Boolean(x));
  if (!caps.length) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
      {caps.map((cap) => (
        <li key={cap.slug}>
          <Link href={localePath(locale, `/platform/${cap.slug}`)} className="inline-flex min-h-[44px] items-center gap-1.5 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950">
            {cap.name[locale]}
            <StatusGlyph glyph="arrow-right" size={12} className="text-text-muted" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function StepLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="t-eyebrow text-text-muted">
      <span className="tnum text-text-accent">{n}</span> · {children}
    </p>
  );
}

const STAGE = "scroll-mt-[calc(var(--header-h)+24px)]";

export function FlowStory({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const f = d.home.flow;
  const c = f.cards;
  const daily = d.home.views.daily;
  const rail = [
    { id: "step-answer", n: "01", label: f.steps[0] },
    { id: "step-record", n: "02", label: f.steps[1] },
    { id: "step-handover", n: "03", label: f.steps[2] },
    { id: "step-done", n: "04", label: f.steps[3] },
  ];

  return (
    <div className="grid gap-10 xl:grid-cols-[180px_minmax(0,1fr)] xl:gap-12" data-flow-story>
      <div className="hidden xl:block">
        <div className="sticky top-[calc(var(--header-h)+32px)]">
          <FlowRail items={rail} label={f.h2} />
        </div>
      </div>

      <ol className="space-y-8 md:space-y-10">
        {/* 01 Answered: the reply beside what it must and must not do */}
        <li id="step-answer" className={STAGE}>
          <article className="stage overflow-hidden" aria-labelledby="step-answer-h">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-10">
                <StepLabel n="01">{c.answer.step}</StepLabel>
                <h3 id="step-answer-h" className="mt-3 t-display-m text-text-primary">{c.answer.title}</h3>
                <p className="mt-4 t-body-l text-text-secondary">{c.answer.line}</p>
                <p className="mt-6 flex items-start gap-3 rounded-lg bg-surface-sunken p-4 t-body-s text-text-secondary">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-sage-100 text-sage-700"><StatusGlyph glyph="check" size={12} /></span>
                  {f.stepsDetail}
                </p>
                <CapLinks slugs={["ai-sales-agent"]} locale={locale} />
              </div>
              <div className="field-sage relative flex items-center px-4 pb-8 pt-14 md:px-10 md:pb-14">
                <ConversationView locale={locale} />
                <p className="rise float-chip absolute left-4 top-4 md:left-6 md:top-5">
                  <StatusGlyph glyph="check" size={12} className="text-signal-positive" />
                  {f.steps[0]} · {d.home.views.conversation.time}
                </p>
              </div>
            </div>
          </article>
        </li>

        {/* 02 Recorded: a week of records, with one record laid over their corner */}
        <li id="step-record" className={STAGE}>
          <article className="stage overflow-hidden" aria-labelledby="step-record-h">
            <div className="p-6 md:p-10 lg:grid lg:grid-cols-2 lg:items-end lg:gap-12">
              <div>
                <StepLabel n="02">{c.understand.step}</StepLabel>
                <h3 id="step-record-h" className="mt-3 t-display-m text-text-primary">{c.understand.title}</h3>
              </div>
              <p className="mt-4 t-body-l text-text-secondary lg:mt-0">{c.understand.line}</p>
            </div>
            <div className="field-sand px-4 pb-10 pt-8 md:px-10 md:pb-16 md:pt-12">
              <div className="relative mx-auto max-w-[860px]">
                <BoardView locale={locale} className="lg:ml-0" />
                <div className="rise relative mt-4 lg:absolute lg:right-0 lg:top-20 lg:mt-0 lg:w-[340px]" style={{ ["--rise-delay" as string]: "180ms" }}>
                  <RecordView locale={locale} />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 md:px-10 md:pb-8"><CapLinks slugs={["lead-intelligence", "crm"]} locale={locale} /></div>
          </article>
        </li>

        {/* 03 Handed over: the task card, real, across the full width */}
        <li id="step-handover" className={STAGE}>
          <article className="stage overflow-hidden" aria-labelledby="step-handover-h">
            <div className="p-6 md:p-10 lg:grid lg:grid-cols-2 lg:items-end lg:gap-12">
              <div>
                <StepLabel n="03">{c.handover.step}</StepLabel>
                <h3 id="step-handover-h" className="mt-3 t-display-m text-text-primary">{c.handover.title}</h3>
              </div>
              <p className="mt-4 t-body-l text-text-secondary lg:mt-0">{c.handover.line}</p>
            </div>
            <div className="field-sky px-4 py-8 md:px-10 md:py-10">
              <DailyShot locale={locale} shot="task-card" className="max-w-[920px]" />
            </div>
          </article>
        </li>

        {/* 04 Done: the real staff app, recorded; the clip on top, what it proves below */}
        <li id="step-done" className={STAGE}>
          {/* Reading order: the step and its sentence first, then the clip. From 1024 px the clip is shown on top. */}
          <article className="stage flex flex-col overflow-hidden" aria-labelledby="step-done-h">
            <div className="p-6 md:p-10 lg:grid lg:grid-cols-2 lg:gap-12">
              <div>
                <StepLabel n="04">{c.done.step}</StepLabel>
                <h3 id="step-done-h" className="mt-3 t-display-m text-text-primary">{c.done.title}</h3>
              </div>
              <div className="mt-4 lg:mt-0">
                <p className="t-body-l text-text-secondary">{c.done.line}</p>
                <p className="mt-3 t-body-s text-text-muted">{daily.clipLead}</p>
                <CapLinks slugs={["daily-assistant"]} locale={locale} />
              </div>
            </div>
            <div className="field-sky p-4 md:p-8 lg:order-first">
              <div className="mx-auto max-w-[920px]">
                <ProductClip base="/media/daily/daily-claim-flow" locale={locale} playLabel={daily.playLabel} meta={daily.clipMeta} alt={daily.clipAlt} posterLabel={daily.posterLabel} cues={daily.cues} errorLabel={daily.clipError} />
                <p className="mt-3 t-caption text-text-muted">{daily.note}</p>
              </div>
            </div>
          </article>
        </li>
      </ol>
    </div>
  );
}

/** The same story as three compact surfaces in a row (platform overview). */
export function FlowRow({ locale }: { locale: Locale }) {
  const c = getDictionary(locale).home.flow.cards;
  const items = [
    { key: "answer", field: "field-sage", text: c.answer, view: <ConversationView locale={locale} /> },
    { key: "understand", field: "field-sand", text: c.understand, view: <BoardView locale={locale} compact /> },
    { key: "done", field: "field-sky", text: c.done, view: <DailyShot locale={locale} shot="task-action" /> },
  ];
  return (
    <ol className="grid gap-5 lg:grid-cols-3" data-flow-row>
      {items.map((it, i) => (
        <li key={it.key} className={cn("rounded-xl p-5 md:p-6", it.field)}>
          <p className="t-eyebrow text-text-muted"><span className="tnum">0{i + 1}</span> · {it.text.step}</p>
          <p className="mt-2 t-heading-s text-text-primary">{it.text.title}</p>
          <div className="mt-5">{it.view}</div>
        </li>
      ))}
    </ol>
  );
}
