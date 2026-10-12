import type { Locale } from "@/lib/i18n/config";
import type { ReportChannel, WeeklyReport } from "@/lib/contracts/reports";
import { appWords } from "@/lib/content/app-words";
import { LabelChip } from "@/components/ui/status";
import { cn } from "@/lib/utils";

/**
 * The weekly report as the agency reads it in its login (master order 2026-10-10 §8; final order 2026-10-12 §8).
 * Three questions first, each with one figure and its meaning: what Nuova handled, which chances came up, what to
 * do next. Then the details: by channel, the trend (only on enough data), the open actions, the period and the data
 * basis. A figure the backend did not send is "not measured", never zero. A trial or a smaller package sees only the
 * counts its functions can produce. Demonstration data is labelled above the figures, never after them.
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
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

export function WeeklyReportView({ locale, report }: { locale: Locale; report: WeeklyReport }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.report;
  const counts = visibleCounts(report);
  const channels = visibleChannels(report);
  const c = report.counts;
  const n = (v: number | null) => (v === null ? l(w.notMeasured) : v.toLocaleString(locale === "es" ? "es-ES" : "en-GB"));
  const openCount = c.tasks_open ?? report.open_actions.length;
  const missing = counts.filter((k) => (c[k] as number | null) === null).map((k) => l(w.counts[k as keyof typeof w.counts]));
  const thin = report.previous !== null && c.received < 5;

  const three = [
    { key: "handled", title: l(w.handled.title), value: n(c.answered), line: fill(l(w.handled.line), { answered: n(c.answered), received: n(c.received) }) },
    { key: "chances", title: l(w.chances.title), value: n(c.viewings_requested), line: fill(l(w.chances.line), { viewings: n(c.viewings_requested), confirmed: n(c.viewings_confirmed), valuations: n(c.valuations_requested) }) },
    { key: "next", title: l(w.next.title), value: String(openCount), line: fill(l(w.next.line), { open: openCount }) },
  ];

  return (
    <div className="space-y-8" data-weekly-report data-report-plan={report.plan.code}>
      {/* The demonstration label stands ABOVE the figures (Reviewer F-R16-1). */}
      {report.stub && <p data-report-demo><LabelChip tone="attention">{l(w.demo)}</LabelChip></p>}

      <dl className="grid gap-4 md:grid-cols-3" data-report-meaning>
        {three.map((t, i) => (
          <div key={t.key} className={cn("stage p-6", i === 0 && "border-ink-950")} data-report-key={t.key}>
            <dt className="t-caption font-medium text-text-secondary">{t.title}</dt>
            <dd className="mt-2 tnum text-[2.5rem] font-semibold leading-none tracking-[-0.02em] text-text-primary">{t.value}</dd>
            <dd className="mt-2 t-body-s text-text-secondary">{t.line}</dd>
          </div>
        ))}
      </dl>

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

      <h2 className="t-heading-m text-text-primary">{l(w.detailsTitle)}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.period)}</p><p className="mt-1 t-body-m font-medium text-text-primary" data-report-period>{fmtDate(locale, report.period.from)} – {fmtDate(locale, report.period.to)}</p><p className="t-caption text-text-muted">{report.period.timezone}</p></div>
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.generated)}</p><p className="mt-1 t-body-m font-medium text-text-primary">{fmtDate(locale, report.generated_at, true) || l(w.notMeasured)}</p></div>
        <div className="stage p-5"><p className="t-caption text-text-muted">{l(w.basis)}</p><p className="mt-1 t-body-s text-text-primary">{fill(l(w.basisLine), { channels: channels.map((ch) => l(w.channels[ch])).join(", ") })}</p></div>
      </div>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4" data-report-counts>
        {counts.map((k) => {
          const v = c[k] as number | null;
          return (
            <div key={k} className={cn("stage p-5", v === null && "opacity-80")} data-report-count={k} data-report-value={v ?? "null"}>
              <dt className="t-caption text-text-muted">{l(w.counts[k as keyof typeof w.counts])}</dt>
              <dd className="mt-1 tnum text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-text-primary">{v === null ? <span className="text-[1rem] font-medium text-text-muted">{l(w.notMeasured)}</span> : n(v)}</dd>
            </div>
          );
        })}
      </dl>

      <section aria-labelledby="rep-channels" className="stage p-6">
        <h2 id="rep-channels" className="t-heading-s text-text-primary">{l(w.byChannel)}</h2>
        <ul className="mt-3 divide-y divide-line-hairline border-y border-line-hairline">
          {channels.map((ch) => (
            <li key={ch} className="flex items-baseline justify-between gap-3 py-2.5 t-body-s"><span className="text-text-secondary">{l(w.channels[ch])}</span><span className="tnum font-semibold text-text-primary">{c.by_channel[ch] === undefined ? l(w.notMeasured) : n(c.by_channel[ch] ?? null)}</span></li>
          ))}
        </ul>
        {report.previous && (
          <p className="mt-4 t-body-s text-text-secondary" data-report-trend={thin ? "thin" : "full"}>
            <span className="font-medium text-text-primary">{l(w.trend)}:</span> {thin ? fill(l(w.trendThin), { prevReceived: report.previous.received }) : fill(l(w.trendLine), { received: c.received, prevReceived: report.previous.received, answered: c.answered, prevAnswered: report.previous.answered })}
          </p>
        )}
      </section>

      {missing.length > 0 && <p className="t-caption text-text-muted" data-report-missing>{fill(l(w.notMeasuredLine), { list: missing.join(", ") })}</p>}
      <p className="t-caption text-text-muted">{report.plan.trial ? l(w.trialScope) : l(w.scope)}</p>
    </div>
  );
}
