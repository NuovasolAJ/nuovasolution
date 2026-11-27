import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import type { ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { CompareBlock } from "@/components/report/compare-block";

/**
 * The report on the home page (the owner's E2 order of 24.11., point 5): ONLY the figure, its meaning and the next step — Copy 1113 §4's
 * three insight cards (K-1 … K-3). The chart, the channel list, the week's figures, what is open and the block "Sin / Con NuovaSolution"
 * live on the report page (/example-report), where the one action leads. Nothing animates by itself; the cards rise once into view.
 * "Datos de ejemplo" stands on the sheet; the figures are the example agency's (fictional).
 */
export function ReportStage({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.report;
  const cards = w.cards(locale, view);
  return (
    <section id="report" aria-labelledby="rep-h" className="rep rep-e2" data-report data-report-view={view} data-report-cards={cards.length}>
      <div className="container-default">
        <Rise className="rep-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="rep-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-3 t-body-l text-text-secondary max-w-[40ch]">{l(home1103.phoneCore.report.core)}</p>
        </Rise>
        <Rise className="rep-sheet" delay={0.08} y={20}>
          <div className="rep-paper" data-report-sheet>
            <div className="rep-paper-head">
              <p className="rep-paper-title tnum">{l(w.header)}</p>
              <span className="rep-example" data-report-example>{l(w.example)}</span>
            </div>
            <ul className="rep-cards" data-report-cards={cards.length}>
              {cards.map((c, i) => (
                <li key={c.figure} className="rep-card" data-report-card={i + 1}>
                  <p className="rep-card-figure tnum">{c.figure}</p>
                  <p className="rep-card-insight">{c.insight}</p>
                  <p className="rep-card-next"><span className="rep-card-next-k">{l(w.cardsNext)}</span>{c.next}</p>
                  {c.note && <p className="rep-card-note">{c.note}</p>}
                </li>
              ))}
            </ul>
            {/* the owner, 27.11. ("where did that statistic go?"): the same week told twice — without and with NuovaSolution — stands on the
                home sheet again under the three cards (the figures of the example report, Copy §19; no €, no %; gated by its own claims) */}
            <CompareBlock locale={locale} view={view} id="rep-cmp" />
          </div>
          <div className="rep-foot">
            <p className="rep-foot-note">{l(w.example)}</p>
            <a href={localePath(locale, "/example-report")} className="rep-link rep-link-e2" data-report-link>{l(w.link)}</a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
