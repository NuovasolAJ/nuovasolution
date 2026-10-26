import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { LabelChip, StatusGlyph } from "@/components/ui/status";
import { REFERENCE as SITE_REFERENCE, enquiries, people, storyWords } from "@/lib/content/home-story";

/**
 * Product views for the marketing pages (LAUNCH_COPY_v1 §4 and COPY_DELTAS_0929: one person, Laura Serrano, one property,
 * EST-204, one wish, Thursday morning; the owner's consolidated closing order of 26.10. §6: every module page shows work
 * that is done, in the proven present tense). Rule: only what actually exists is depicted, every view says that it is an
 * illustrative example ("Ejemplo ilustrativo", the customer-facing mark agreed to replace the internal "datos sintéticos"),
 * and no status chip, gate sentence or internal formula appears on a sales surface (audit R27).
 *
 * - ConversationView (AI Sales Agent): Laura's message and the reply that goes out, with the notice it must carry (kept in
 *   full, set as a quiet line so it does not take over the demonstration), and what the reply noted on the record.
 * - RecordGrowView (Lead Intelligence): one record, and how the second message adds to what the first one left.
 * - RecordHistoryView (CRM): one record with what is saved and the history behind it, in order.
 * - TasksView (Daily Tasks): the team's task list, Laura's task taken by Elena.
 * - BoardView, RecordView, DailyShot, ReadinessView: the earlier views, still used by other surfaces.
 * No qualification score and no cross-channel merge is shown: neither exists in production (LEAD_TRUTH_INPUT_v1 §1, §3).
 */

const T = {
  noted: { es: "Anotado en la ficha", en: "Noted on the record" },
  firstMessage: { es: "Domingo · WhatsApp · el primer mensaje", en: "Sunday · WhatsApp · the first message" },
  secondMessage: { es: "Martes · WhatsApp · el segundo mensaje, en la misma ficha", en: "Tuesday · WhatsApp · the second message, on the same record" },
  added: { es: "añadido el martes", en: "added on Tuesday" },
  growFoot: { es: "Quien abre la ficha el martes ve las dos cosas sin preguntar a nadie: lo que pidió el domingo y lo que añadió hoy.", en: "Whoever opens the record on Tuesday sees both without asking anyone: what she asked for on Sunday and what she added today." },
  history: { es: "Historial", en: "History" },
  historyRows: {
    es: [
      { at: "martes 11:20", what: "WhatsApp de Laura: pregunta por el piso con terraza de Estepona, presupuesto hasta 320.000 €" },
      { at: "martes 11:21", what: "Respuesta de Nuova, en español; la ficha se actualiza: busca, presupuesto, idioma" },
      { at: "martes 11:21", what: "Aviso por email a Elena: consulta importante (inmueble, zona y presupuesto)" },
      { at: "martes 11:23", what: "WhatsApp de Laura: vivienda habitual; quiere verlo la semana que viene" },
      { at: "martes 11:24", what: "Respuesta de Nuova: lo anota; una persona de la agencia le escribe con día y hora" },
    ],
    en: [
      { at: "Tuesday 11:20", what: "WhatsApp from Laura: asks about the flat with a terrace in Estepona, budget up to €320,000" },
      { at: "Tuesday 11:21", what: "Reply from Nuova, in Spanish; the record is updated: looking for, budget, language" },
      { at: "Tuesday 11:21", what: "E-mail alert to Elena: important enquiry (property, area and budget named)" },
      { at: "Tuesday 11:23", what: "WhatsApp from Laura: a main home; she wants to see it next week" },
      { at: "Tuesday 11:24", what: "Reply from Nuova: noted; a person from the agency writes to her with a day and time" },
    ],
  },
  historyFoot: { es: "Ejemplo ilustrativo. Cada mensaje, cada respuesta y cada aviso quedan en la ficha, en orden; no hay que reconstruir nada.", en: "Illustrative example. Every message, every reply and every alert stays on the record, in order; nothing has to be reconstructed." },
  recordLabel: { es: "Ficha de cliente", en: "Customer record" },
  who: { es: "Laura Serrano · compradora · escribe en español", en: "Laura Serrano · buyer · writes in Spanish" },
};

export function ConversationView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const v = d.home.views.conversation;
  // The same conversation as the home page story (lib/content/home-story.ts): Laura's second message and the reply that notes it.
  const laura = enquiries[0];
  const time = laura.time[locale];
  const noted = laura.recorded.slice(2);
  return (
    <div className={cn("mx-auto w-full max-w-[440px]", className)} data-view="conversation">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line-hairline bg-surface-sunken px-4 py-3">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-pill bg-sage-200 text-sage-700"><StatusGlyph glyph="link" size={14} /></span>
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{v.agency}</p>
            <p className="t-caption text-text-muted">{v.channel} · {laura.language[locale]}</p>
          </div>
          <LabelChip className="ml-auto">{v.synthetic}</LabelChip>
        </div>
        <ol className="space-y-3 p-4">
          <li className="flex justify-start">
            <div className="max-w-[88%] rounded-lg rounded-bl-sm bg-surface-sunken px-3.5 py-2.5">
              <p lang={laura.lang} className="t-body-s text-text-primary">{laura.text}</p>
              <p className="mt-1 t-caption tnum text-text-muted">{time}</p>
            </div>
          </li>
          <li className="flex justify-end">
            <div className="max-w-[88%] rounded-lg rounded-br-sm bg-sage-100 px-3.5 py-2.5">
              <p className="mb-1 t-caption text-sage-700">{v.assistant}</p>
              {/* the required notice, complete, as a quiet line: the demonstration is the reply, not the notice (closing order 26.10. §6) */}
              <p lang={laura.lang} className="mb-1.5 border-b border-sage-200 pb-1.5 text-[0.75rem] leading-[1.4] text-text-muted" data-disclosure={laura.lang}>{laura.notice}</p>
              <p lang={laura.lang} className="t-body-s text-text-primary">{laura.reply}</p>
              <p className="mt-1 t-caption tnum text-text-muted">{time}</p>
            </div>
          </li>
        </ol>
        {/* what the reply noted on the record: the concrete, helpful part of the work */}
        <dl className="border-t border-line-hairline px-4 py-3" data-conversation-noted>
          <p className="t-caption font-medium text-text-muted">{T.noted[locale]}</p>
          {noted.map((r) => (
            <div key={r.k[locale]} className="mt-1 flex gap-2 t-caption">
              <dt className="shrink-0 text-text-muted">{r.k[locale]}:</dt>
              <dd className="text-text-primary">{r.v[locale]}</dd>
            </div>
          ))}
        </dl>
        {/* D-104: the sample-translation mark stands in the caption, with the example label, not inside the sales card. */}
        {laura.noticeIsSample && <p className="border-t border-line-hairline px-4 pt-3 t-caption text-text-muted">{storyWords.common.noticeSample[locale]}</p>}
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

function RecordHead({ locale, label }: { locale: Locale; label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line-hairline px-4 py-3">
      <div className="min-w-0">
        <p className="t-eyebrow text-text-muted">{T.recordLabel[locale]}</p>
        <p className="mt-1 t-body-s font-medium text-text-primary">{T.who[locale]}</p>
      </div>
      <LabelChip className="ml-auto">{label}</LabelChip>
    </div>
  );
}

/**
 * Lead Intelligence (closing order 26.10. §6): how a further message adds to what is already on the record. The first message
 * (Sunday) left what she looks for and her budget; the second (Tuesday) adds the use and the timing, marked as added. The same
 * record as the home page's hero and story B (lib/content/home-story.ts, Laura's `recorded` rows).
 */
export function RecordGrowView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const rows = enquiries[0].recorded;
  const first = rows.slice(0, 2);
  const second = rows.slice(2);
  const Rows = ({ list, added }: { list: typeof rows; added?: boolean }) => (
    <dl className="divide-y divide-line-hairline">
      {list.map((r) => (
        <div key={r.k[locale]} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 py-2" data-record-row={added ? "added" : "kept"}>
          <dt className="t-caption text-text-muted">{r.k[locale]}</dt>
          <dd className="t-body-s text-text-primary">{r.v[locale]}{added && <span className="ml-2 inline-flex rounded-pill bg-[color:var(--accent-wash)] px-2 py-0.5 text-[0.6875rem] font-medium text-[color:var(--accent-ink)]">{T.added[locale]}</span>}</dd>
        </div>
      ))}
    </dl>
  );
  return (
    <div className={cn("mx-auto w-full max-w-[460px]", className)} data-view="record-grow">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <RecordHead locale={locale} label={d.home.views.conversation.synthetic} />
        <div className="px-4 pb-1 pt-3">
          <p className="t-caption font-medium text-text-muted">{T.firstMessage[locale]}</p>
          <Rows list={first} />
        </div>
        <div className="border-t border-line-hairline bg-[color:rgba(246,239,226,0.45)] px-4 pb-1 pt-3" data-record-second>
          <p className="t-caption font-medium text-text-muted">{T.secondMessage[locale]}</p>
          <Rows list={second} added />
        </div>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{T.growFoot[locale]}</p>
      </div>
    </div>
  );
}

/** CRM (closing order 26.10. §6): one record with what is saved and the history behind it, in order. */
export function RecordHistoryView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const rows = enquiries[0].recorded;
  const history = T.historyRows[locale];
  return (
    <div className={cn("mx-auto w-full max-w-[480px]", className)} data-view="record-history">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <RecordHead locale={locale} label={d.home.views.conversation.synthetic} />
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3">
          {rows.map((r) => (
            <div key={r.k[locale]} className="min-w-0">
              <dt className="t-caption text-text-muted">{r.k[locale]}</dt>
              <dd className="t-body-s text-text-primary">{r.v[locale]}</dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-line-hairline px-4 py-3" data-record-history>
          <p className="t-caption font-medium text-text-muted">{T.history[locale]}</p>
          <ol className="mt-2 space-y-2">
            {history.map((h, i) => (
              <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 t-caption">
                <span className="tnum whitespace-nowrap text-text-muted">{h.at}</span>
                <span className="text-text-primary">{h.what}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{T.historyFoot[locale]}</p>
      </div>
    </div>
  );
}

/**
 * The team's task list as the daily page's product view (R24 picture 11 (3): the page is about tasks, so the picture shows tasks, not
 * leads): the home page's morning list (lib/content/home-story.ts), Laura's task taken by Elena, the others open, each with its owner
 * state and its next step. The same names and the same clock as the story.
 */
export function TasksView({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const W = storyWords.task;
  const items = W.items[locale];
  const es = locale === "es";
  return (
    <div className={cn("mx-auto w-full max-w-[460px]", className)} data-view="tasks">
      <div className="overflow-hidden rounded-xl border border-line-hairline bg-surface-raised shadow-card">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line-hairline px-4 py-3">
          <div className="min-w-0">
            <p className="t-body-s font-medium text-text-primary">{W.listTitle[locale]}</p>
            <p className="t-caption text-text-muted">{W.listSubtitle[locale]}</p>
          </div>
          <LabelChip className="ml-auto">{d.home.views.conversation.synthetic}</LabelChip>
        </div>
        <ol className="hairline-list">
          {items.map((it, i) => {
            const taken = i === 0;
            return (
              <li key={it.who} className={cn("grid grid-cols-[auto_minmax(0,1fr)] gap-3 px-4 py-3", taken && "bg-[color:rgba(246,239,226,0.55)]")} data-task-row={taken ? "taken" : "open"}>
                <span className="tnum inline-flex h-7 w-7 items-center justify-center rounded-pill bg-ink-950 text-[0.8125rem] font-semibold text-ivory" aria-hidden="true">{i + 1}</span>
                <span className="min-w-0">
                  <span className="block t-body-s font-medium text-text-primary">{it.who}</span>
                  <span className="block t-caption text-text-secondary">{it.what}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 t-caption">
                    <span className={cn("inline-flex items-center gap-1.5 font-medium", taken ? "text-signal-positive" : "text-text-muted")}>
                      <StatusGlyph glyph={taken ? "check" : "clock"} size={13} />
                      {taken ? W.taken[locale] : W.open[locale]}
                    </span>
                    <span className="text-text-muted">{W.nextStep[locale]}: {it.next}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        {/* COPY_SYNC_1026 Y-1: Daily's sentence (API's Q-4 answer); nothing about the morning brief */}
        <p className="border-t border-line-hairline px-4 py-3 t-caption text-text-muted">{es ? `Ejemplo ilustrativo. Elena ha tomado la tarea de ${people.buyer.short}: sigue en su lista con su historial, ya no aparece en la de sus compañeros y solo ella puede cerrarla.` : `Illustrative example. Elena has taken ${people.buyer.short}'s task: it stays in her list with its history, no longer appears in her colleagues' lists, and only she can close it.`}</p>
      </div>
    </div>
  );
}

type Shot = "tasks" | "task-action" | "task-done" | "task-card";

/**
 * A capture of the real staff task surface, unedited (daily_media/MANIFEST.md). The list states
 * are 16:9 from 768 px and 4:5 below, so no interface text is cut off; "task-card" is one card
 * on its own. Every capture keeps the example label and its caption (COPY_DELTAS_0929 §5.2).
 */
/**
 * The reference inside Daily's recordings and stills (clip v3 and the captures of 2026-09-28). The site's
 * example reference is EST-204 (owner 2026-10-06); while the two differ, no recording is shown, so no two
 * references contradict each other on one page. Daily is asked for a cut and stills with EST-204.
 */
export const DAILY_MEDIA_REFERENCE: string = "REF-DEMO-204";

export function DailyShot({ locale, shot = "task-action", className }: { locale: Locale; shot?: Shot; className?: string }) {
  const v = getDictionary(locale).home.views.daily;
  // While Daily's recordings carry another reference than the site, the page shows the board of records instead:
  // no internal note about clips or cuts reaches a customer view (final order 2026-10-12 §9).
  if (DAILY_MEDIA_REFERENCE !== SITE_REFERENCE) return <BoardView locale={locale} className={className} compact />;
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
      return <RecordGrowView locale={locale} />;
    case "crm":
      return <RecordHistoryView locale={locale} />;
    case "daily-assistant":
      return <TasksView locale={locale} />;
    default:
      return <RecordView locale={locale} />;
  }
}
