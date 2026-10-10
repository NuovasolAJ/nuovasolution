import type { Locale } from "@/lib/i18n/config";
import type { WeeklyReport } from "@/lib/contracts/reports";
import { appWords } from "@/lib/content/app-words";
import { fmtDate, visibleCounts } from "./weekly-report";

/**
 * The Monday email (master order 2026-10-10 §8): the essentials in a few figures and one button to the full
 * report. Rendered here as the template preview inside the login; the same markup, inlined, is what Hosting
 * sends once the report contract exists (docs/website_redesign/REPORTS_CONTRACT_REQUEST_1010.md §3).
 * Table-free, inline-safe styles only, so an email client renders it the same way.
 */
export function WeeklyEmail({ locale, report, reportUrl, agencyName }: { locale: Locale; report: WeeklyReport; reportUrl: string; agencyName: string | null }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.email;
  const r = appWords.report;
  const keys = visibleCounts(report).slice(0, 6);
  const subject = l(w.subject).replace("{received}", String(report.counts.received));
  return (
    <div data-weekly-email style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif", color: "#1a1917", background: "#fbfaf7", padding: "24px" }}>
      <p style={{ margin: 0, fontSize: 12, color: "#635f58" }}>{l(r.eyebrow)} · {agencyName ?? ""}</p>
      <p style={{ margin: "6px 0 0", fontSize: 20, fontWeight: 600, lineHeight: 1.3 }} data-email-subject>{subject}</p>
      <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.5 }}>{l(w.greeting)}</p>
      <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.5 }}>{l(w.intro)} {fmtDate(locale, report.period.from)} – {fmtDate(locale, report.period.to)}.</p>
      <div style={{ margin: "18px 0 0", border: "1px solid #e4e1da", borderRadius: 12, background: "#fff" }}>
        {keys.map((k, i) => {
          const v = report.counts[k] as number | null;
          return (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 16px", borderTop: i === 0 ? "none" : "1px solid #ece9e2", fontSize: 15 }}>
              <span style={{ color: "#4a4742" }}>{l(r.counts[k as keyof typeof r.counts])}</span>
              <strong style={{ fontVariantNumeric: "tabular-nums" }}>{v === null ? l(r.notMeasured) : v}</strong>
            </div>
          );
        })}
      </div>
      {report.open_actions.length > 0 && <p style={{ margin: "14px 0 0", fontSize: 14, lineHeight: 1.5, color: "#4a4742" }}>{l(w.openLine).replace("{open}", report.open_actions.map((o) => o.who).join(", "))}</p>}
      <p style={{ margin: "22px 0 0" }}>
        <a href={reportUrl} style={{ display: "inline-block", background: "#1a1917", color: "#f8f6f1", textDecoration: "none", padding: "12px 22px", borderRadius: 999, fontSize: 15, fontWeight: 500 }} data-email-button>{l(w.button)}</a>
      </p>
      <p style={{ margin: "24px 0 0", fontSize: 12, lineHeight: 1.5, color: "#635f58" }}>{l(w.footer)}</p>
    </div>
  );
}
