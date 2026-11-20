import type { Locale } from "@/lib/i18n/config";
import { strengths, type DayStation, type StrengthCard } from "@/lib/content/strengths";
import { live, type ClaimKey, type ClaimView } from "@/lib/claims";
import { Rise } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * "Todo lo que hace por tu agencia" (the owner's point 16 of 17.11., released 19.11. evening; Copy v2 §B + §C and the delta 1120): ONE
 * new section from the existing card parts — the growth block (three cards), the line of the daily assistant, the four strength cards,
 * and the day story. Every card hangs on its keys (the public gate): all on → the card as written; the two partial states of Copy 1120
 * §2.3 (G-1p, G-3p) → their own chip, sentence, phone line and example count; otherwise (P-1) the chip starts with "Próximamente", the
 * title, the sentence and the phone line stay, the three examples are hidden. Form A for the day story: the compact line on the phone
 * from the live stations' short parts, the stations from 640 px with "Próximamente" after an off station's time (only the live ones
 * once more than two are off). Nothing else on the page changes (the owner's protective rule).
 */
function Card({ c, locale, view }: { c: StrengthCard; locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const on = (k: ClaimKey) => live([k], view);
  const all = c.keys.every(on);
  const part = !all && c.partial?.when(on) ? c.partial : undefined;
  const state = all ? "live" : part ? "partial" : "soon";
  const chip = all ? l(c.chip) : part ? l(part.chip) : `${l(strengths.soon)} · ${l(c.chip)}`;
  const line = part ? part.line(on, locale) : l(c.line);
  const phone = part ? l(part.phone) : l(c.phone);
  const examples = all ? c.examples : part ? c.examples.slice(0, part.examples) : [];
  return (
    <li className="ch-card st-card" data-strength={c.key} data-strength-state={state}>
      <span className={cn("st-chip", state !== "live" && "st-chip-soon")} data-strength-chip={state}>{chip}</span>
      <h3 className="ch-name">{l(c.title)}</h3>
      <p className="ch-line m-hide">{line}</p>
      <p className="m-only ch-core">{phone}</p>
      {examples.length > 0 && (
        <>
          <ul className="ch-examples st-examples">{examples.map((x) => <li key={x.es}>{l(x)}</li>)}</ul>
          <p className="ch-mark">{l(strengths.mark)}</p>
        </>
      )}
    </li>
  );
}

export function Strengths({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = strengths;
  const on = (k: ClaimKey) => live([k], view);
  const isLive = (s: DayStation) => s.keys.every(on);
  const liveStations = w.day.stations.filter(isLive);
  // Copy 1120 §2.4: an off station stays with "Próximamente" after its time; once more than two are off, only the live ones are shown
  const shown = w.day.stations.length - liveStations.length > 2 ? liveStations : w.day.stations;
  const stationText = (s: DayStation) => (isLive(s) ? l(s.text) : s.partial?.when(on) ? l(s.partial.text) : l(s.text));
  // Copy 1120 PROXIMAMENTE §2 E-P: once one card is "Próximamente" or partial, the eyebrow says "hace y hará"
  const anySoon = [...w.growth, ...w.cards].some((c) => !c.keys.every(on));
  return (
    <section id="strengths" aria-labelledby="st-h" className="st" data-strengths data-strengths-soon={anySoon ? "true" : "false"}>
      <div className="container-default">
        <Rise className="st-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent" data-strengths-eyebrow>{l(anySoon ? w.eyebrowSoon : w.eyebrow)}</p>
          <h2 id="st-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
        </Rise>
        <Rise as="ul" className="st-row st-row-growth" delay={0.06}>
          {w.growth.map((c) => <Card key={c.key} c={c} locale={locale} view={view} />)}
        </Rise>
        <p className="st-after">{l(w.afterGrowth)}</p>
        <Rise as="ul" className="st-row st-row-cards" delay={0.06}>
          {w.cards.map((c) => <Card key={c.key} c={c} locale={locale} view={view} />)}
        </Rise>
        {/* §C the day story inside the section — the owner's form A (19.11.): on the phone Copy's compact line D-c from the live stations,
            from 640 px the stations D-1 … D-6 in their order (the stations are not in the phone's document, D-c not in the desktop's) */}
        <Rise className="st-day" delay={0.06} data-strength-day data-strength-day-form="A">
          <p className="st-day-title">{l(w.day.title)}</p>
          <p className="st-day-line">{l(w.day.line)}</p>
          <p className="st-day-compact m-only tnum" data-day-compact>{liveStations.map((s) => l(s.short)).join(" · ")}</p>
          <ol className="st-day-run m-hide">
            {shown.map((s) => (
              <li key={s.time} className="st-day-step" data-day-step={s.time} data-day-step-live={isLive(s) ? "true" : "false"}>
                <span className="st-day-time tnum">{s.time}{!isLive(s) && <span className="st-day-soon"> · {l(w.soon)}</span>}</span>
                <span className="st-day-text">{stationText(s)}</span>
              </li>
            ))}
          </ol>
          <p className="ch-mark st-day-mark">{l(w.day.mark)}</p>
        </Rise>
      </div>
    </section>
  );
}
