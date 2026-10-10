import type { Locale } from "@/lib/i18n/config";
import type { ReportChannel, WeeklyReport } from "@/lib/contracts/reports";
import { appWords } from "@/lib/content/app-words";
import { LabelChip } from "@/components/ui/status";
import { cn } from "@/lib/utils";

/**
 * The weekly report as the agency reads it in its login (master order 2026-10-10 §8): the period, the data
 * basis, the counts, the trend against the previous week, the open actions. A figure the backend did not send
 * is shown as "not measured", never as zero. A trial or a smaller package sees only the counts its functions
 * can produce (the scope rule), so no report ever suggests a function the agency does not have.
 */
const SCOPE: Record<string, (keyof WeeklyReport["counts"])[]> = {
  essential: ["received", "answered", "viewings_requested", "viewings_confirmed", "valuations_requested", "tasks_closed", "tasks_open"],
  growth: ["received", "answered", "viewings_requested", "viewings_confirmed", "valuations_requested", "tasks_closed", "tasks_open", "proposals_sent"],
  scale: ["received", "answered", "viewings_requested", "viewings_confirmed", "valuations_requested", "tasks_closed", "tasks_open", "proposals_sent"],
};
const CHANNEL_SCOPE: Record<string, ReportChannel[]> = {
  essential: ["whatsapp", "email", "webform"],
  growth: ["whatsapp", "email", "webform"],
  scale: ["whatsapp", "email", "webform", "phone"],
};

export function fmtDate(locale: Locale, iso: string | null, withTime = false): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { dateStyle: "medium", ...(withTime ? { timeStyle: "short" } : {}), timeZone: "Europe/Madrid" }).format(new Date(iso));
}

export function visibleCounts(report: WeeklyReport): (keyof WeeklyReport["counts"])[] {
  return (SCOPE[report.plan.code] ?? SCOPE.essential).filter((k) => k !== "by_channel");
}
export function visibleChannels(report: WeeklyReport): ReportChannel[] {
  const allowed = CHANNEL_SCOPE[report.plan.code] ?? CHANNEL_SCOPE.essential;
  return report.basis.channels.filter((c) => allowed.includes(c));
}

export function WeeklyReportView({ locale, report }: { locale: Locale; report: WeeklyReport }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.report;
  const counts = visibleCounts(report);
  const channels = visibleChannels(report);
  const n = (v: number | null) => (v === null ? null : v.toLocaleString(locale === "es" ? "es-ES" : "en-GB"));

  return (
    <div className="space-y-8" data-weekly-report data-report-plan={report.plan.code}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.period)}</p><p className="mt-1 t-body-m font-medium text-text-primary" data-report-period>{fmtDate(locale, report.period.from)} – {fmtDate(locale, report.period.to)}</p><p className="t-caption text-text-muted">{report.period.timezone}</p></div>
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.generated)}</p><p className="mt-1 t-body-m font-medium text-text-primary">{fmtDate(locale, report.generated_at, true) || l(w.notMeasured)}</p></div>
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.basis)}</p><p className="mt-1 t-body-s text-text-primary">{l(w.basisLine).replace("{channels}", channels.map((c) => l(w.channels[c])).join(", "))}</p></div>
      </div>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4" data-report-counts>
        {counts.map((k) => {
          const v = report.counts[k] as number | null;
          return (
            <div key={k} className={cn("stage p-5", v === null && "opacity-80")} data-report-count={k} data-report-value={v ?? "null"}>
              <dt className="t-caption text-text-muted">{l(w.counts[k as keyof typeof w.counts])}</dt>
              <dd className="mt-1 tnum text-[2rem] font-semibold leading-none tracking-[-0.02em] text-text-primary">{v === null ? <span className="text-[1rem] font-medium text-text-muted">{l(w.notMeasured)}</span> : n(v)}</dd>
            </div>
          );
        })}
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="rep-channels" className="stage p-6">
          <h2 id="rep-channels" className="t-heading-s text-text-primary">{l(w.byChannel)}</h2>
          <ul className="mt-3 divide-y divide-line-hairline border-y border-line-hairline">
            {channels.map((c) => (
              <li key={c} className="flex items-baseline justify-between gap-3 py-2.5 t-body-s"><span className="text-text-secondary">{l(w.channels[c])}</span><span className="tnum font-semibold text-text-primary">{report.counts.by_channel[c] === undefined ? l(w.notMeasured) : n(report.counts.by_channel[c] ?? null)}</span></li>
            ))}
          </ul>
          {report.previous && (
            <p className="mt-4 t-body-s text-text-secondary" data-report-trend>
              <span className="font-medium text-text-primary">{l(w.trend)}:</span> {l(w.trendLine).replace("{received}", String(report.counts.received)).replace("{prevReceived}", String(report.previous.received)).replace("{answered}", String(report.counts.answered)).replace("{prevAnswered}", String(report.previous.answered))}
            </p>
          )}
        </section>
        <section aria-labelledby="rep-open" className="stage p-6">
          <h2 id="rep-open" className="t-heading-s text-text-primary">{l(w.openTitle)}</h2>
          {report.open_actions.length ? (
            <ul className="mt-3 space-y-3" data-report-open>
              {report.open_actions.map((o, i) => (
                <li key={i} className="flex items-start gap-3 t-body-s"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" /><span><span className="font-medium text-text-primary">{o.who}</span> · <span className="text-text-secondary">{o.what}</span>{o.since && <span className="block t-caption text-text-muted">{l(w.since)} {fmtDate(locale, o.since, true)}</span>}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 t-body-s text-text-secondary">{l(w.openEmpty)}</p>
          )}
        </section>
      </div>

      <p className="flex flex-wrap items-center gap-3 t-caption text-text-muted">
        {report.stub && <LabelChip tone="attention">{l(w.stub)}</LabelChip>}
        <span>{report.plan.trial ? l(w.trialScope) : l(w.scope)}</span>
      </p>
    </div>
  );
}
