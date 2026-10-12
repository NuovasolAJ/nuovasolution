import type { Locale } from "@/lib/i18n/config";
import type { WeeklyReport } from "@/lib/contracts/reports";
import { appWords } from "@/lib/content/app-words";
import { MailShell } from "./mail-shell";
import { fmtDate, visibleChannels, visibleCounts } from "./weekly-report";

/**
 * The Monday email (final order 2026-10-12 §8), in the shared shell (components/app/mail-shell.tsx) with Copy's
 * wording (WEEKLY_REPORT_MAIL_v1.md): the subject by what the report carries, one line per present field, the
 * comparison only on enough data, the zero week written out, "not measured" named once, the trial scope once, one
 * button. A field that is absent produces no line.
 */
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

export function WeeklyEmail({ locale, report, reportUrl, agencyName, logoUrl, personName }: { locale: Locale; report: WeeklyReport; reportUrl: string; agencyName: string | null; logoUrl: string; personName?: string | null }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.email;
  const r = appWords.report;
  const c = report.counts;
  const keys = visibleCounts(report);
  const channels = visibleChannels(report).map((ch) => l(r.channels[ch]));
  const has = (k: keyof typeof c) => (c[k] as number | null) !== null;
  const zero = has("received") && has("answered") && c.received === 0 && c.answered === 0;

  const subject = zero ? l(w.subjectZero) : has("answered") ? fill(l(w.subjectAnswered), { answered: c.answered }) : has("received") ? fill(l(w.subjectReceived), { received: c.received }) : l(w.subjectNone);
  const agency = agencyName ?? (locale === "es" ? "tu agencia" : "your agency");
  const name = personName ?? "";

  const lines: string[] = [];
  if (!zero) {
    if (has("received") && has("answered")) lines.push(fill(l(w.lineReceived), { received: c.received, answered: c.answered }));
    const byCh = visibleChannels(report).filter((ch) => c.by_channel[ch] !== undefined).map((ch) => `${l(r.channels[ch])} ${c.by_channel[ch]}`);
    if (byCh.length) lines.push(fill(l(w.lineChannels), { list: byCh.join(", ") }));
    if (has("viewings_requested")) lines.push(fill(l(w.lineViewings), { viewings: c.viewings_requested! }));
    if (keys.includes("valuations_requested") && has("valuations_requested")) lines.push(fill(l(w.lineValuations), { valuations: c.valuations_requested! }));
    if (has("tasks_closed")) lines.push(fill(l(w.lineTasks), { tasks: c.tasks_closed! }));
    if (keys.includes("proposals_sent") && has("proposals_sent")) lines.push(fill(l(w.lineProposals), { proposals: c.proposals_sent! }));
    if (report.previous && has("received")) lines.push(c.received >= 5 ? fill(l(w.linePrevious), { prev: report.previous.received }) : fill(l(w.linePreviousThin), { prev: report.previous.received }));
    if (report.open_actions.length) lines.push(fill(l(w.lineOpen), { open: report.open_actions.length }));
  }
  const figures = zero ? [] : keys.filter((k) => has(k)).slice(0, 4).map((k) => ({ label: l(r.counts[k as keyof typeof r.counts]), value: String(c[k]) }));
  const missing = keys.filter((k) => !has(k)).map((k) => l(r.counts[k as keyof typeof r.counts]));

  return (
    <div data-weekly-email data-email-subject-text={subject}>
      <MailShell
        logoUrl={logoUrl}
        logoAlt={w.logoAlt}
        eyebrow={`${l(w.eyebrowMail)} · ${agency}`}
        subject={subject}
        greeting={fill(l(w.greeting), { name }).replace(" ,", ",")}
        summary={zero ? <p style={{ margin: 0 }}>{fill(l(w.zeroOpening), { channels: channels.join(", ") })}</p> : <><p style={{ margin: 0 }}>{fill(l(w.opening), { agency, from: fmtDate(locale, report.period.from), to: fmtDate(locale, report.period.to) })}</p><p style={{ margin: "6px 0 0", color: "#635f58", fontSize: 14 }}>{fill(l(w.basis), { channels: channels.join(", ") })}</p></>}
        figures={figures}
        context={lines.length ? <>{lines.map((t) => <p key={t} style={{ margin: "0 0 4px" }}>{t}</p>)}</> : undefined}
        nextAction={zero ? <p style={{ margin: 0 }}>{l(w.zeroNext)}</p> : missing.length ? <p style={{ margin: 0, color: "#635f58", fontSize: 14 }}>{fill(l(w.notMeasured), { list: missing.join(", ") })}</p> : undefined}
        button={{ href: reportUrl, label: l(w.button), under: l(w.underButton) }}
        footer={<>{report.plan.trial ? `${l(w.trial)} ` : ""}{l(w.close)} {l(w.footer)}</>}
      />
      <p data-email-subject className="sr-only">{subject}</p>
    </div>
  );
}
