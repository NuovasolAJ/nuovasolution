import type { Locale } from "@/lib/i18n/config";
import { strengths, type StrengthCard } from "@/lib/content/strengths";
import { live, type ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";

/**
 * "Todo lo que hace por tu agencia" (the owner's point 16 of 17.11., released 19.11. evening; Copy v2 §B + §C): ONE new section from the
 * existing card parts — the growth block (three cards), the line of the daily assistant, the four strength cards, and the day story in
 * form A (the compact line on the phone from the stations' short parts, the stations from 640 px). The owner's brief of 20.11. (23.11.):
 * the finished product, every card as written — no gate, no marks, no partial states. Stage 2 of the brief condenses the seven cards
 * into agency tasks with one proof and one action each (after the owner's feedback on the two phone paths).
 */
function Card({ c, locale }: { c: StrengthCard; locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  return (
    <li className="ch-card st-card" data-strength={c.key} data-strength-state="live">
      <span className="st-chip" data-strength-chip="live">{l(c.chip)}</span>
      <h3 className="ch-name">{l(c.title)}</h3>
      <p className="ch-line m-hide">{l(c.line)}</p>
      <p className="m-only ch-core">{l(c.phone)}</p>
      <ul className="ch-examples st-examples">{c.examples.map((x) => <li key={x.es}>{l(x)}</li>)}</ul>
      <p className="ch-mark">{l(strengths.mark)}</p>
    </li>
  );
}

export function Strengths({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = strengths;
  const growth = w.growth.filter((c) => live(c.keys, view));
  const cards = w.cards.filter((c) => live(c.keys, view));
  const stations = w.day.stations.filter((s) => live(s.keys, view));
  return (
    <section id="strengths" aria-labelledby="st-h" className="st" data-strengths>
      <div className="container-default">
        <Rise className="st-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent" data-strengths-eyebrow>{l(w.eyebrow)}</p>
          <h2 id="st-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <Rise as="ul" className="st-row st-row-growth" delay={0.06}>
          {growth.map((c) => <Card key={c.key} c={c} locale={locale} />)}
        </Rise>
        <p className="st-after" data-strengths-gd="live">{l(w.afterGrowth)}</p>
        <Rise as="ul" className="st-row st-row-cards" delay={0.06}>
          {cards.map((c) => <Card key={c.key} c={c} locale={locale} />)}
        </Rise>
        {/* §C the day story inside the section — the owner's form A (19.11.): on the phone Copy's compact line D-c, from 640 px the stations D-1 … D-6 */}
        <Rise className="st-day" delay={0.06} data-strength-day data-strength-day-form="A">
          <p className="st-day-title">{l(w.day.title)}</p>
          <p className="st-day-line">{l(w.day.line)}</p>
          <p className="st-day-compact m-only tnum" data-day-compact>{stations.map((s) => l(s.short)).join(" · ")}</p>
          <ol className="st-day-run m-hide">
            {stations.map((s) => (
              <li key={s.time} className="st-day-step" data-day-step={s.time} data-day-step-live="true">
                <span className="st-day-time tnum">{s.time}</span>
                <span className="st-day-text">{l(s.text)}</span>
              </li>
            ))}
          </ol>
          <p className="ch-mark st-day-mark">{l(w.day.mark)}</p>
        </Rise>
      </div>
    </section>
  );
}
