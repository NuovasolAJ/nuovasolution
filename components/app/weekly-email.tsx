import type { Locale } from "@/lib/i18n/config";
import type { WeeklyReport } from "@/lib/contracts/reports";
import { appWords } from "@/lib/content/app-words";
import { MailShell, type MailTile } from "./mail-shell";
import { fmtDate, visibleChannels, visibleCounts } from "./weekly-report";

/**
 * The Monday email (final order 2026-10-12 §8; R20 W4: a new layout), in the shared shell (components/app/mail-shell.tsx,
 * MAIL_SHELL_v3) with Copy's wording (WEEKLY_REPORT_MAIL_v1.md; COPY_1019 §3.3: the button goes to the report in the
 * login). The week at a glance first: up to three tiles (enquiries answered of received · viewings asked for, with
 * how many the team agreed · things waiting for a person). Then the detail as label + value rows (by channel, the
 * valuations, the tasks closed, the proposals, last week), the open actions as a list with the customer's name, the
 * "not measured" sentence once, the trial scope once, one button. A field that is absent produces no line and no
 * tile; a zero week has its own three lines and no tiles; a comparison appears only on enough data.
 */
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

export function WeeklyEmail({ locale, report, reportUrl, agencyName, logoUrl, personName }: { locale: Locale; report: WeeklyReport; reportUrl: string; agencyName: string | null; logoUrl: string; personName?: string | null }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = appWords.email;
  const r = appWords.report;
  const c = report.counts;
  const keys = visibleCounts(report);
  const channels = visibleChannels(report).map((ch) => l(r.channels[ch]));
  const has = (k: keyof typeof c) => (c[k] as number | null) !== null && c[k] !== undefined;
  const zero = has("received") && has("answered") && c.received === 0 && c.answered === 0;
  const es = locale === "es";

  const subject = zero ? l(w.subjectZero) : has("answered") ? fill(l(w.subjectAnswered), { answered: c.answered }) : has("received") ? fill(l(w.subjectReceived), { received: c.received }) : l(w.subjectNone);
  const agency = agencyName ?? (es ? "tu agencia" : "your agency");
  const name = personName ?? "";

  // The week at a glance: three tiles, each only when its field is present.
  const tiles: MailTile[] = [];
  if (!zero) {
    if (has("answered") && has("received")) tiles.push({ value: String(c.answered), label: es ? "Consultas atendidas" : "Enquiries answered", note: es ? `de ${c.received} recibidas` : `of ${c.received} received` });
    else if (has("received")) tiles.push({ value: String(c.received), label: es ? "Consultas recibidas" : "Enquiries received" });
    if (has("viewings_requested")) tiles.push({ value: String(c.viewings_requested), label: es ? "Visitas pedidas" : "Viewings asked for", note: keys.includes("viewings_confirmed") && has("viewings_confirmed") ? (es ? `${c.viewings_confirmed} acordadas por el equipo` : `${c.viewings_confirmed} agreed by the team`) : undefined });
    if (has("tasks_open")) tiles.push({ value: String(c.tasks_open), label: es ? "Esperan a una persona" : "Waiting for a person", note: report.open_actions.length ? (es ? "ver abajo quién y qué" : "who and what, below") : undefined });
  }

  // The detail: label + value rows for what the tiles do not carry.
  const figures: { label: string; value: string }[] = [];
  if (!zero) {
    const byCh = visibleChannels(report).filter((ch) => c.by_channel[ch] !== undefined).map((ch) => `${l(r.channels[ch])} ${c.by_channel[ch]}`);
    if (byCh.length) figures.push({ label: es ? "Por canal" : "By channel", value: byCh.join(" · ") });
    if (keys.includes("valuations_requested") && has("valuations_requested")) figures.push({ label: l(r.counts.valuations_requested), value: String(c.valuations_requested) });
    if (has("tasks_closed")) figures.push({ label: l(r.counts.tasks_closed), value: String(c.tasks_closed) });
    if (keys.includes("proposals_sent") && has("proposals_sent")) figures.push({ label: l(r.counts.proposals_sent), value: String(c.proposals_sent) });
    if (report.previous && has("received")) figures.push({ label: es ? "La semana pasada" : "Last week", value: c.received >= 5 ? String(report.previous.received) : `${report.previous.received} · ${es ? "pocas para una tendencia" : "too few for a trend"}` });
  }
  const missing = keys.filter((k) => !has(k)).map((k) => l(r.counts[k as keyof typeof r.counts]));

  const openActions = report.open_actions.length
    ? { title: es ? "Sigue abierto" : "Still open", items: report.open_actions.map((o) => ({ who: o.who, what: o.what, since: o.since ? `${es ? "desde el" : "since"} ${fmtDate(locale, o.since)}` : undefined })) }
    : undefined;

  return (
    <div data-weekly-email data-email-subject-text={subject}>
      <MailShell
        logoUrl={logoUrl}
        logoAlt={w.logoAlt}
        eyebrow={`${l(w.eyebrowMail)} · ${agency}`}
        subject={subject}
        greeting={fill(l(w.greeting), { name }).replace(" ,", ",")}
        summary={zero ? <p style={{ margin: 0 }}>{fill(l(w.zeroOpening), { channels: channels.join(", ") })}</p> : <><p style={{ margin: 0 }}>{fill(l(w.opening), { agency, from: fmtDate(locale, report.period.from), to: fmtDate(locale, report.period.to) })}</p><p style={{ margin: "6px 0 0", color: "#635f58", fontSize: 14 }}>{fill(l(w.basis), { channels: channels.join(", ") })}</p></>}
        tiles={tiles}
        figures={figures}
        openActions={openActions}
        context={missing.length ? <p style={{ margin: 0 }}>{fill(l(w.notMeasured), { list: missing.join(", ") })}</p> : undefined}
        nextAction={zero ? <p style={{ margin: 0 }}>{l(w.zeroNext)}</p> : undefined}
        button={{ href: reportUrl, label: l(w.button), under: l(w.underButton) }}
        footer={<>{report.plan.trial ? `${l(w.trial)} ` : ""}{l(w.close)} {l(w.footer)}</>}
      />
      <p data-email-subject className="sr-only">{subject}</p>
    </div>
  );
}
