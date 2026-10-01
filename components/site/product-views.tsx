import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

/**
 * Product views for the marketing pages (LAUNCH_COPY_v1 §4 and COPY_DELTAS_0929: one person,
 * Laura Serrano, one property, REF-DEMO-204, one wish, Thursday morning). Rule: only what
 * actually exists is depicted, every view says that its data is synthetic, and no status chip,
 * gate sentence or internal formula appears on a sales surface (audit R27).
 *
 * - ConversationView: the WhatsApp enquiry and the reply that goes out, with the notice it must
 *   carry (ES: the owner-approved v1.0-es text, quoted; EN: a marked sample translation). The
 *   reply confirms no availability: there is no inventory source behind the example.
 * - BoardView: a week of enquiries as records, each with what was asked for and what comes next.
 * - RecordView: one customer record. No qualification and no priority: neither exists in
 *   production (LEAD_TRUTH_INPUT_v1 §1).
 * - DailyShot: a capture of the real staff task surface (backend handoff 2026-09-29, daily_media).
 * - ReadinessView: the readiness list exactly as the onboarding page renders it, with the real gate labels.
 */

export function ConversationView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const v = d.home.views.conversation;
  const c = d.home.hero.cards;
  return (
    <div className={cn("mx-auto w-full max-w-[420px]", className)} data-view="conversation">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line-hairline bg-surface-sunken px-4 py-3">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-sage-200 text-sage-700"><StatusGlyph glyph="link" size={14} /></span>
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{v.agency}</p>
            <p className="t-caption text-text-muted">{v.channel}</p>
          </div>
          <LabelChip className="ml-auto">{v.synthetic}</LabelChip>
        </div>
        <ol className="space-y-3 p-4">
          <li className="flex justify-start">
            <div className="max-w-[88%] rounded-lg rounded-bl-sm bg-surface-sunken px-3.5 py-2.5">
              <p className="t-body-s text-text-primary">{c.enquiry.text}</p>
              <p className="mt-1 t-caption tnum text-text-muted">{v.time}</p>
            </div>
          </li>
          <li className="flex justify-end">
            <div className="max-w-[88%] rounded-lg rounded-br-sm bg-sage-100 px-3.5 py-2.5">
              <p className="mb-1 t-caption text-sage-700">{v.assistant}</p>
              <p className="mb-2 border-b border-sage-200 pb-2 t-body-s text-text-primary" data-disclosure={locale}>
                {c.answer.disclosure}
                {c.answer.disclosureMark && <span className="mt-1 block t-caption text-text-muted">{c.answer.disclosureMark}</span>}
              </p>
              <p className="t-body-s text-text-primary">{c.answer.text}</p>
              <p className="mt-1 t-caption tnum text-text-muted">{v.time}</p>
            </div>
          </li>
        </ol>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{v.footer}</p>
      </div>
    </div>
  );
}

/** A week of enquiries as records: who, what they asked for, what comes next. */
export function BoardView({ locale, className, compact = false }: { locale: Locale; className?: string; compact?: boolean }) {
  const d = getDictionary(locale);
  const b = d.home.views.board;
  return (
    <div className={cn("mx-auto w-full", compact ? "max-w-[440px]" : "max-w-[600px]", className)} data-view="board">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line-hairline px-4 py-3">
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{b.title}</p>
            <p className="t-caption text-text-muted">{b.subtitle}</p>
          </div>
          <LabelChip className="ml-auto">{d.home.views.conversation.synthetic}</LabelChip>
        </div>
        <ol className="hairline-list">
          {b.rows.map((r, i) => (
            <li key={r.name} className={cn("px-4 py-3", i === 0 && "bg-[color:rgba(246,239,226,0.55)]")}>
              <p className="t-body-s font-medium text-text-primary">{r.name}</p>
              <p className="mt-0.5 t-caption text-text-secondary">
                <span className="text-text-muted">{b.columns.asked}: </span>
                {r.asked}
              </p>
              {!compact && (
                <p className="t-caption text-text-secondary">
                  <span className="text-text-muted">{b.columns.next}: </span>
                  {r.next}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{b.footer}</p>
      </div>
    </div>
  );
}

/** One customer record: who it is, what they asked for, what comes next. */
export function RecordView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const r = d.home.hero.cards.record;
  return (
    <div className={cn("mx-auto w-full max-w-[380px]", className)} data-view="record">
      <div className="rounded-xl border border-line-hairline bg-surface-raised p-5 shadow-overlay">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="t-eyebrow text-text-muted">{r.label}</span>
          <LabelChip>{d.home.views.conversation.synthetic}</LabelChip>
        </div>
        <p className="mt-3 t-heading-s text-text-primary">{r.name}</p>
        <ul className="mt-2 space-y-1">
          {r.lines.map((l) => (
            <li key={l} className="t-body-s text-text-secondary">{l}</li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-2 border-t border-line-hairline pt-4 t-body-s font-medium text-text-primary">
          <StatusGlyph glyph="arrow-right" size={14} className="shrink-0 text-text-accent" />
          {r.next}
        </p>
      </div>
    </div>
  );
}

type Shot = "tasks" | "task-action" | "task-done" | "task-card";

/**
 * A capture of the real staff task surface, unedited (daily_media/MANIFEST.md). The list states
 * are 16:9 from 768 px and 4:5 below, so no interface text is cut off; "task-card" is one card
 * on its own. Every capture keeps the synthetic-data label and its caption (COPY_DELTAS_0929 §5.2).
 */
export function DailyShot({ locale, shot = "task-action", className }: { locale: Locale; shot?: Shot; className?: string }) {
  const v = getDictionary(locale).home.views.daily;
  const caption = (v.stills as Record<string, string>)[shot];
  const base = `/media/daily/daily-${shot}-${locale}`;
  const card = shot === "task-card";
  return (
    <figure className={cn("mx-auto w-full", className)} data-view="daily" data-shot={shot}>
      <div className="relative">
        {card ? (
          <picture>
            <source media="(max-width: 767px)" srcSet={`${base}-mobile.png`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}-desktop.png`} width={1616} height={316} alt={caption} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl border border-line-hairline bg-[#f5f6f8]" />
          </picture>
        ) : (
          <picture>
            <source media="(max-width: 767px)" srcSet={`${base}-mobile.png`} width={840} height={1052} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}-desktop.png`} width={1756} height={988} alt={caption} loading="lazy" decoding="async" className="block h-auto w-full rounded-xl border border-line-hairline bg-[#f5f6f8]" />
          </picture>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 t-caption text-text-muted">
        <LabelChip>{v.synthetic}</LabelChip>
        {caption}
      </figcaption>
    </figure>
  );
}

export function ReadinessView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const r = d.onboarding.setup.readiness;
  const gates = d.onboarding.gates as Record<string, string>;
  const v = d.home.views.readiness;
  // The disclosure notice is ours to activate with the agency, not a box the agency ticks (COPY_DELTAS_0929 D-19).
  // No opening hours row: they are stored and steer nothing in production (COPY_DELTAS_0930 D-51).
  const rows: { key: string; status: "READY" | "BLOCKED" | "WITH_YOU" }[] = [
    { key: "agency_tenant", status: "READY" },
    { key: "owner_admin", status: "READY" },
    { key: "white_label_legal", status: "BLOCKED" },
    { key: "ai_disclosure", status: "WITH_YOU" },
  ];
  const label = (s: string) => (s === "WITH_YOU" ? v.withYou : (r.states as Record<string, string>)[s]);
  return (
    <div className={cn("mx-auto w-full max-w-[440px]", className)} data-view="readiness">
      <div className="rounded-xl border border-line-hairline bg-surface-raised p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="t-heading-s text-text-primary">{r.heading}</p>
          <LabelChip>{v.label}</LabelChip>
        </div>
        <p className="mt-4 t-caption text-text-muted">{r.mandatory}</p>
        <ul className="mt-1 hairline-list border-y border-line-hairline">
          {rows.map((g) => (
            <li key={g.key} className="flex items-center justify-between gap-3 py-2.5">
              <span className="t-body-s text-text-primary">{gates[g.key]}</span>
              <span className={cn("inline-flex shrink-0 items-center gap-1.5 text-right t-caption", g.status === "READY" ? "text-signal-positive" : g.status === "WITH_YOU" ? "text-text-secondary" : "text-text-primary")}>
                <StatusGlyph glyph={g.status === "READY" ? "check" : g.status === "WITH_YOU" ? "rule" : "arrow-right"} size={14} />
                {label(g.status)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The view for one published capability page, chosen by slug. Never an empty frame. */
export function ProductView({ slug, locale }: { slug: string; locale: Locale }) {
  switch (slug) {
    case "ai-sales-agent":
      return <ConversationView locale={locale} />;
    case "lead-intelligence":
      return <RecordView locale={locale} />;
    case "crm":
      return <BoardView locale={locale} />;
    case "daily-assistant":
      return <DailyShot locale={locale} shot="task-action" />;
    default:
      return <RecordView locale={locale} />;
  }
}
