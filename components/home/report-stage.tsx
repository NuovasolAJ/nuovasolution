"use client";

import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { live, type ClaimView } from "@/lib/claims";
import { pxFor } from "@/lib/content/proximamente";
import { CountUp } from "@/components/ui/count-up";
import { Rise, useSeen } from "@/components/ui/motion";
import { CompareBlock } from "@/components/report/compare-block";
import { cn } from "@/lib/utils";

/**
 * The report (the owner's orders of 03.11. point 5, 05.11. point 8 and 06.11. point 15; Copy 1105 v3 §6 and §19): the report itself as
 * the agency reads it. The figures with their definitions (R-3, R-4) and what is open stand on every view (`reportInLogin`); the
 * trend, the channels (10 · 6 · 3 · 2 · 4 in the target state, the channels that run in public, always 25) and the three insights
 * hang on `reportTrend`. The switch "Sin / Con NuovaSolution" is its own block under the figures (components/report/compare-block.tsx).
 * "No medido" as text and never as 0; labelled "Datos de ejemplo"; no status word.
 */
export function ReportStage({ locale, view }: { locale: Locale; view: ClaimView }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.report;
  const reduce = useReducedMotion();
  const { ref, seen } = useSeen(0.08); // 09.11. H6: on the phone the sheet is taller than the screen, so 30 % was never reached and the insights and bars stayed hidden
  const weeks = l(w.weeks);
  const max = Math.max(...w.series.map((s) => s.received));
  const metrics = l(w.metrics);
  const trend = live("reportTrend", view);
  const channels = w.channels(locale, view);
  const chMax = Math.max(1, ...channels.map((c) => c.v));
  const cards = w.cards(locale, view); // Copy 1113 §4: the three insight cards, per view
  const grow = (i: number) => (reduce ? {} : { initial: { scaleY: 0 }, animate: seen ? { scaleY: 1 } : { scaleY: 0 }, transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

  return (
    <section id="report" aria-labelledby="rep-h" className="rep" data-report data-report-view={view} data-report-trend={trend ? "true" : "false"}>
      <div className="container-default">
        <Rise className="rep-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="rep-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-4 t-body-l text-text-secondary max-w-[48ch] m-hide">{l(w.lead)}</p>
          <p className="m-only sec-core" data-phone-core="report">{l(home1103.phoneCore.report.core)}</p>
          <p className="m-only sec-proof">{l(home1103.phoneCore.report.proof)}</p>
        </Rise>

        <Rise className="rep-sheet" delay={0.1} y={24}>
          <div ref={ref} className="rep-paper" data-report-sheet>
            <div className="rep-paper-head">
              <p className="rep-paper-title tnum">{l(w.header)}</p>
              <span className="rep-example" data-report-example>{l(w.example)}</span>
            </div>

            {/* Copy 1113 §4: three insight cards — figure, insight, next step (both views, each view its own cards) */}
            <ul className="rep-cards" data-report-cards={cards.length}>
              {cards.map((c, i) => (
                <m.li key={c.figure} className="rep-card" data-report-card={i + 1} {...(reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }, transition: { delay: 0.1 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })}>
                  <p className="rep-card-figure tnum">{c.figure}</p>
                  <p className="rep-card-insight">{c.insight}</p>
                  <p className="rep-card-next"><span className="rep-card-next-k">{l(w.cardsNext)}</span>{c.next}</p>
                  {c.note && <p className="rep-card-note">{c.note}</p>}
                </m.li>
              ))}
            </ul>

            <div className={cn("rep-grid", !trend && "rep-grid-basic")}>
              {/* the trend (reportTrend) */}
              {trend && (
                <figure className="rep-chart" data-report-chart="weeks">
                  <figcaption><span className="rep-chart-title">{l(w.chartTitle)}</span></figcaption>
                  <div className="rep-bars" role="img" aria-label={`${l(w.chartTitle)}: ${w.series.map((s, i) => `${weeks[i]} ${s.received}/${s.answered}`).join(", ")}`}>
                    {w.series.map((s, i) => (
                      <div key={i} className="rep-bar-group">
                        <div className="rep-bar-pair" style={{ ["--h1" as string]: `${Math.round((s.received / max) * 168)}px`, ["--h2" as string]: `${Math.round((s.answered / max) * 168)}px` }}>
                          <m.span className="rep-bar rep-bar-received" {...grow(i)} />
                          <m.span className="rep-bar rep-bar-answered" {...grow(i + 0.5)} />
                        </div>
                        <span className="rep-bar-values tnum">{s.received} · {s.answered}</span>
                        <span className="rep-bar-label">{weeks[i]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="rep-legend"><span><i className="rep-swatch rep-swatch-received" />{l(w.received)}</span><span><i className="rep-swatch rep-swatch-answered" />{l(w.answered)}</span></p>
                  <p className="rep-note">{l(w.chartNote)}</p>
                </figure>
              )}

              {/* the figures of the week, each with its definition (every view) */}
              <dl className="rep-metrics" data-report-metrics>
                {metrics.map((mt, i) => {
                  const num = /^\d+$/.test(mt.v);
                  return (
                    <div key={mt.k} className={cn("rep-metric", !num && "rep-metric-unmeasured")} data-report-metric={i + 1} data-report-metric-value={mt.v}>
                      <dt>{mt.k}</dt>
                      <dd className="rep-metric-value tnum">{num ? <CountUp value={Number(mt.v)} locale={locale} delay={120 + i * 90} /> : mt.v}</dd>
                      <dd className="rep-metric-def">{mt.d}</dd>
                    </div>
                  );
                })}
              </dl>

              {/* the owner, 20.11. 09:05 (1) + Copy 1120 §4.2: with the trend off, the report says so instead of leaving a gap */}
              {!trend && <p className="rep-note rep-note-soon" data-report-trend-soon>{pxFor(["reportTrend"], () => true, locale)}</p>}
              {/* by channel (reportTrend): the view's set, every one with its figure, always 25 */}
              {trend && channels.length > 1 && (
                <div className="rep-channels" data-report-chart="channels">
                  <p className="rep-chart-title">{l(w.channelsTitle)}</p>
                  <p className="rep-note">{l(w.channelsNote)}</p>
                  <ul>
                    {channels.map((c, i) => (
                      <li key={c.name} className="rep-channel" data-report-channel={c.name.toLowerCase().replace(/\s+/g, "-")} data-report-channel-value={c.v}>
                        <span className="rep-channel-name">{c.name}</span>
                        <span className="rep-channel-track"><m.span className="rep-channel-fill" data-channel={c.name.toLowerCase()} style={{ width: `${Math.max(2, (c.v / chMax) * 100)}%`, transformOrigin: "left" }} {...(reduce ? {} : { initial: { scaleX: 0 }, animate: seen ? { scaleX: 1 } : { scaleX: 0 }, transition: { delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })} /></span>
                        <span className="rep-channel-value tnum">{c.v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* still open, what to do now (every view) */}
              <div className="rep-open" data-report-open>
                <p className="rep-chart-title">{l(w.openTitle)}</p>
                <ul>{l(w.open).map((o) => <li key={o}><span className="rep-dot" aria-hidden="true" />{o}</li>)}</ul>
                <p className="rep-chart-title mt-5">{l(w.nextTitle)}</p>
                <ol>{l(w.next).map((nx, i) => <li key={nx}><span className="rep-no tnum" aria-hidden="true">{i + 1}</span>{nx}</li>)}</ol>
              </div>
            </div>

            {/* the same week with and without NuovaSolution (point 15, §19) */}
            <CompareBlock locale={locale} view={view} id="rep-cmp" />
          </div>
          <div className="rep-foot">
            <p className="rep-foot-note">{l(w.example)}</p>
            <a href={localePath(locale, "/example-report")} className="rep-link" data-report-link>{l(w.link)}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
