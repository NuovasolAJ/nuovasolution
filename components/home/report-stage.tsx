"use client";

import { ArrowRight, Clock, Eye, Trophy } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";
import { claim, claimWords } from "@/lib/claims";
import { CountUp } from "@/components/ui/count-up";
import { Rise, useSeen } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The report (the owner's orders of 03.11. point 5 and 05.11. point 8; Copy 1102 v2 §4): the report itself as the agency
 * reads it (Copy 1105 v3 §6): the week's trend as a chart that draws when it comes into view, the channels in production
 * (WhatsApp 14, e-mail 11 of the 25 received) and the others only as "Próximamente" with no figure invented, three insight lines
 * computed from the figures with their definitions (in the agency's report "Próximamente"), the figures with their definitions,
 * "No medido" as text and never as 0. Labelled "Datos de ejemplo". The look follows the weekly report of the agency login and
 * /example-report.
 */
export function ReportStage({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const w = home1103.report;
  const reduce = useReducedMotion();
  const { ref, seen } = useSeen(0.3);
  const weeks = l(w.weeks);
  const max = Math.max(...w.series.map((s) => s.received));
  const metrics = l(w.metrics);
  const channels = l(w.channels);
  const chMax = Math.max(...channels.map((c) => c.v ?? 0));
  const insights = l(w.insights);
  const insightIcons = [Trophy, Clock, Eye];
  const grow = (i: number) => (reduce ? {} : { initial: { scaleY: 0 }, animate: seen ? { scaleY: 1 } : { scaleY: 0 }, transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });
  const soonWord = (k: Parameters<typeof claim>[0]) => (claim(k) === "included" ? null : <span className="rep-soon" data-report-soon={k}>{claimWords[claim(k)][locale].toLowerCase()}</span>);

  return (
    <section id="report" aria-labelledby="rep-h" className="rep" data-report>
      <div className="container-default">
        <Rise className="rep-head">
          <p className="t-eyebrow t-eyebrow-l text-text-accent">{l(w.eyebrow)}</p>
          <h2 id="rep-h" className="t-display-m mt-3 text-text-primary">{l(w.h2)}</h2>
          <p className="mt-4 t-body-l text-text-secondary max-w-[48ch]">{l(w.lead)}</p>
        </Rise>

        <Rise className="rep-sheet" delay={0.1} y={24}>
          <div ref={ref} className="rep-paper" data-report-sheet>
            <div className="rep-paper-head">
              <p className="rep-paper-title tnum">{l(w.header)}</p>
              <span className="rep-example" data-report-example>{l(w.example)}</span>
            </div>

            {/* the insights: what the information brings (05.11., point 8) */}
            <ul className="rep-insights" data-report-insights>
              {insights.map((it, i) => {
                const Icon = insightIcons[i];
                return (
                  <m.li key={it.k} className="rep-insight" data-report-insight={i + 1} {...(reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }, transition: { delay: 0.1 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })}>
                    <span className="rep-insight-icon" aria-hidden="true"><Icon size={16} strokeWidth={2} /></span>
                    <span className="rep-insight-k">{it.k}</span>
                    <span className="rep-insight-v tnum">{it.v}</span>
                    <span className="rep-insight-d">{it.d}</span>
                  </m.li>
                );
              })}
            </ul>
            <p className="rep-insights-state" data-report-insights-state>{l(w.insightsState)}</p>

            <div className="rep-grid">
              {/* the trend */}
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

              {/* the figures of the week, each with its definition */}
              <dl className="rep-metrics" data-report-metrics>
                {metrics.map((mt, i) => {
                  const num = /^\d+$/.test(mt.v);
                  return (
                    <div key={mt.k} className={cn("rep-metric", !num && "rep-metric-unmeasured")} data-report-metric={i + 1}>
                      <dt>{mt.k}</dt>
                      <dd className="rep-metric-value tnum">{num ? <CountUp value={Number(mt.v)} locale={locale} delay={200 + i * 120} /> : mt.v}</dd>
                      <dd className="rep-metric-def">{mt.d}</dd>
                    </div>
                  );
                })}
              </dl>

              {/* by channel: every channel, the ones not live marked quietly */}
              <div className="rep-channels" data-report-chart="channels">
                <p className="rep-chart-title">{l(w.channelsTitle)}</p>
                <p className="rep-note">{l(w.channelsNote)}</p>
                <ul>
                  {channels.map((c, i) => {
                    const live = claim(c.claim) === "included" && c.v !== null;
                    return (
                      <li key={c.name} className={cn("rep-channel", !live && "is-soon")} data-report-channel={c.name.toLowerCase().replace(/\s+/g, "-")} data-channel-state={claim(c.claim)}>
                        <span className="rep-channel-name">{c.name}</span>
                        {live ? (
                          <>
                            <span className="rep-channel-track"><m.span className="rep-channel-fill" data-channel={c.name.toLowerCase()} style={{ width: `${Math.max(1, ((c.v ?? 0) / chMax) * 100)}%`, transformOrigin: "left" }} {...(reduce ? {} : { initial: { scaleX: 0 }, animate: seen ? { scaleX: 1 } : { scaleX: 0 }, transition: { delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })} /></span>
                            <span className="rep-channel-value tnum">{c.v}</span>
                          </>
                        ) : (
                          <span className="rep-channel-soon">{soonWord(c.claim)}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* still open, what to do now */}
              <div className="rep-open" data-report-open>
                <p className="rep-chart-title">{l(w.openTitle)}</p>
                <ul>{l(w.open).map((o) => <li key={o}><span className="rep-dot" aria-hidden="true" />{o}</li>)}</ul>
                <p className="rep-chart-title mt-5">{l(w.nextTitle)}</p>
                <ol>{l(w.next).map((n, i) => <li key={n}><span className="rep-no tnum" aria-hidden="true">{i + 1}</span>{n}</li>)}</ol>
              </div>
            </div>
          </div>
          <div className="rep-foot">
            <p className="state-line" data-state="available">{l(w.state)}</p>
            <a href={localePath(locale, "/example-report")} className="rep-link" data-report-link>{l(w.link)}<ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
