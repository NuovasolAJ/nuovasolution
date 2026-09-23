import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import type { CapabilityStatus } from "@/lib/content/statuses";
import { LabelChip, StatusChip, StatusGlyph } from "@/components/ui/status";

/**
 * Product views for the marketing pages. Rule: only what actually exists is depicted, with
 * synthetic data, and every view carries the status of what it shows.
 *
 * - ConversationView: a WhatsApp text enquiry answered and carried forward (AI Sales Agent,
 *   in use today).
 * - ReadinessView: the onboarding readiness list exactly as the onboarding page renders it
 *   (this site, staging), with the real gate labels.
 * - AssistantView: the Daily assistant client (system repo build/daily_goals/web), built,
 *   final acceptance pending.
 * No CRM screen is depicted: the team's CRM view is in development.
 */

export function ConversationView({ locale, className }: { locale: Locale; className?: string }) {
  const v = getDictionary(locale).home.views.conversation;
  return (
    <div className={cn("mx-auto w-full max-w-[380px]", className)} data-view="conversation">
      <div className="card overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 border-b border-line-hairline bg-surface-sunken px-4 py-3">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-sage-200 text-sage-700"><StatusGlyph glyph="link" size={14} /></span>
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{v.agency}</p>
            <p className="t-caption text-text-muted">{v.channel}</p>
          </div>
          <LabelChip className="ml-auto">{v.synthetic}</LabelChip>
        </div>
        <ol className="space-y-3 p-4">
          {v.turns.map((t, i) => (
            <li key={i} className={cn("flex", t.role === "customer" ? "justify-start" : "justify-end")}>
              <div className={cn("max-w-[86%] rounded-lg px-3.5 py-2.5", t.role === "customer" ? "rounded-bl-sm bg-surface-sunken" : "rounded-br-sm bg-sage-100")}>
                <p className="t-body-s text-text-primary">{t.text}</p>
                <p className="mt-1 t-caption tnum text-text-muted">{t.time}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{v.footer}</p>
      </div>
    </div>
  );
}

export function ReadinessView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const r = d.onboarding.setup.readiness;
  const gates = d.onboarding.gates as Record<string, string>;
  const v = d.home.views.readiness;
  const rows: { key: string; status: "READY" | "BLOCKED" | "OPTIONAL" }[] = [
    { key: "agency_tenant", status: "READY" },
    { key: "owner_admin", status: "READY" },
    { key: "business_hours", status: "READY" },
    { key: "white_label_legal", status: "BLOCKED" },
    { key: "ai_disclosure", status: "READY" },
    { key: "google_sheets", status: "OPTIONAL" },
  ];
  return (
    <div className={cn("mx-auto w-full max-w-[440px]", className)} data-view="readiness">
      <div className="card rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="t-heading-s text-text-primary">{r.heading}</p>
          <LabelChip>{v.label}</LabelChip>
        </div>
        <p className="mt-2 t-body-s text-text-primary">{d.onboarding.notActivatable}</p>
        <p className="mt-4 t-caption text-text-muted">{r.mandatory}</p>
        <ul className="mt-1 hairline-list border-y border-line-hairline">
          {rows.filter((g) => g.status !== "OPTIONAL").map((g) => (
            <li key={g.key} className="flex items-center justify-between gap-3 py-2.5">
              <span className="t-body-s text-text-primary">{gates[g.key]}</span>
              <span className={cn("inline-flex shrink-0 items-center gap-1.5 t-caption", g.status === "READY" ? "text-signal-positive" : "text-text-primary")}>
                <StatusGlyph glyph={g.status === "READY" ? "check" : "arrow-right"} size={14} />
                {(r.states as Record<string, string>)[g.status]}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 t-caption text-text-muted">{r.optional}</p>
        <ul className="mt-1 hairline-list border-y border-line-hairline">
          {rows.filter((g) => g.status === "OPTIONAL").map((g) => (
            <li key={g.key} className="flex items-center justify-between gap-3 py-2.5">
              <span className="t-body-s text-text-primary">{gates[g.key]}</span>
              <span className="inline-flex shrink-0 items-center gap-1.5 t-caption text-text-muted"><StatusGlyph glyph="rule" size={14} />{r.states.OPTIONAL}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AssistantView({ locale, className }: { locale: Locale; className?: string }) {
  const v = getDictionary(locale).home.views.assistant;
  return (
    <div className={cn("mx-auto w-full max-w-[420px]", className)} data-view="assistant">
      <div className="card overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 border-b border-line-hairline px-4 py-3">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-sky-200 t-caption font-semibold text-sky-700">N</span>
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{v.title}</p>
            <p className="t-caption text-text-muted">{v.subtitle}</p>
          </div>
          <StatusChip status="final_acceptance" locale={locale} className="ml-auto" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex justify-end">
            <p className="max-w-[80%] rounded-lg rounded-br-sm bg-ink-950 px-3.5 py-2.5 t-body-s text-ivory">{v.question}</p>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[92%] rounded-lg rounded-bl-sm border border-line-hairline bg-surface-raised px-3.5 py-3">
              <p className="t-body-s text-text-primary">{v.intro}</p>
              <ol className="mt-2 space-y-2">
                {v.items.map((it, i) => (
                  <li key={i} className="flex gap-2 t-body-s text-text-secondary">
                    <span className="t-caption tnum text-text-muted pt-0.5">{i + 1}.</span>
                    <span><span className="text-text-primary">{it.name}</span> {it.why}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{v.footer}</p>
      </div>
    </div>
  );
}

/** The customer record as Nuova keeps it: one person, the qualification and the priority (both in use today). */
export function RecordView({ locale, className }: { locale: Locale; className?: string }) {
  const h = getDictionary(locale).home.hero.cards;
  return (
    <div className={cn("mx-auto w-full max-w-[420px]", className)} data-view="record">
      <div className="card rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="t-eyebrow text-text-muted">{h.record.label}</span>
          <LabelChip>{h.synthetic}</LabelChip>
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
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-pill bg-apricot-100 px-2.5 py-1 t-caption text-text-primary">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-pill bg-signal-attention" />
          {h.record.priority}
        </p>
      </div>
    </div>
  );
}

/** The view for one capability page, chosen by slug. Never an empty frame. */
export function ProductView({ slug, locale, name, lead, bothHalves, status }: { slug: string; locale: Locale; name: string; lead: string; bothHalves?: { certified: string; pending: string }; status: CapabilityStatus }) {
  switch (slug) {
    case "ai-sales-agent":
      return <ConversationView locale={locale} />;
    case "lead-intelligence":
    case "crm":
      return <RecordView locale={locale} />;
    case "daily-assistant":
      return <AssistantView locale={locale} />;
    default:
      return <StatusCard locale={locale} status={status} title={name} certified={bothHalves?.certified} pending={bothHalves?.pending ?? lead} />;
  }
}

/** For capabilities that are not offered yet: the honest state in words, never an empty frame. */
export function StatusCard({ title, certified, pending, locale, status, className }: { title: string; certified?: string; pending?: string; locale: Locale; status: CapabilityStatus; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[440px]", className)} data-view="status">
      <div className="card rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="t-heading-s text-text-primary">{title}</p>
          <StatusChip status={status} locale={locale} />
        </div>
        {certified && (
          <p className="mt-4 flex items-start gap-2 t-body-s text-text-secondary"><StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />{certified}</p>
        )}
        {pending && (
          <p className="mt-3 flex items-start gap-2 t-body-s text-text-secondary"><StatusGlyph glyph="clock" size={14} className="mt-1 shrink-0 text-signal-attention" />{pending}</p>
        )}
      </div>
    </div>
  );
}
