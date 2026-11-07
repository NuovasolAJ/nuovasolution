"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Clock, Eye, Trophy } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Locale } from "@/lib/i18n/config";
import { exampleChannels, exampleInsights, exampleReport, sofiaChannel } from "@/lib/content/example-report";
import { live, type ClaimView } from "@/lib/claims";
import { CountUp } from "@/components/ui/count-up";
import { useSeen } from "@/components/ui/motion";
import { CompareBlock } from "@/components/report/compare-block";
import { cn } from "@/lib/utils";

/**
 * The charts of the public example report (the owner's order of 05.11.2026, F3; the verdict of 06.11.; Copy 1105 v3 §19), drawn with
 * Recharts: the weekly trend as two lines, the channels as a donut of the 25 received, the funnel from enquiry to agreed viewing
 * as four steps with every rate on the 25 received, the hour of arrival as columns with the example agency's hours, then the
 * table of open cases. The trend, the channels, the insights, the hours and the rates belong to the extended report (`reportTrend`):
 * on the public view they are not drawn. Every chart animates once when it comes into view; with reduced motion it stands drawn.
 * The colours are read from the page's tokens at mount (SVG attributes take no CSS variables), so the three palettes carry into
 * the charts. The block "Sin / Con NuovaSolution" follows the figures.
 */
type Colors = { brand: string; brandInk: string; brandLine: string; brandWash: string; ink200: string; ink300: string; ink500: string; ink600: string; ink950: string; whatsapp: string };
const FALLBACK: Colors = { brand: "#7a5520", brandInk: "#5e400f", brandLine: "#e4d5b8", brandWash: "#f6f0e4", ink200: "#dedee2", ink300: "#c7c7cc", ink500: "#75757c", ink600: "#5b5b61", ink950: "#0e0e0f", whatsapp: "#2f8f5b" };

function usePalette(): Colors {
  const [c, setC] = useState<Colors>(FALLBACK);
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const v = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
    setC({ brand: v("--brand", FALLBACK.brand), brandInk: v("--brand-ink", FALLBACK.brandInk), brandLine: v("--brand-line", FALLBACK.brandLine), brandWash: v("--brand-wash", FALLBACK.brandWash), ink200: v("--ink-200", FALLBACK.ink200), ink300: v("--ink-300", FALLBACK.ink300), ink500: v("--ink-500", FALLBACK.ink500), ink600: v("--ink-600", FALLBACK.ink600), ink950: v("--ink-950", FALLBACK.ink950), whatsapp: v("--channel-whatsapp", FALLBACK.whatsapp) });
  }, []);
  return c;
}

function Panel({ title, note, children, className, data }: { title: string; note?: string; children: React.ReactNode; className?: string; data?: string }) {
  return (
    <section className={cn("xr-panel", className)} data-xr-panel={data}>
      <header className="xr-panel-head"><h2 className="xr-panel-title">{title}</h2>{note && <span className="xr-panel-note">{note}</span>}</header>
      {children}
    </section>
  );
}

export function ExampleReportCharts({ locale, view }: { locale: Locale; view: ClaimView }) {
  const w = exampleReport[locale];
  const C = usePalette();
  const CH_COLORS = [C.whatsapp, C.brand, C.brandLine, C.ink300, C.ink500];
  const tipStyle = { borderRadius: 12, border: `1px solid ${C.ink200}`, boxShadow: "0 10px 30px -12px rgba(12,12,14,0.3)", fontSize: 14, padding: "8px 12px" };
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const trend = useSeen(0.3);
  const chan = useSeen(0.3);
  const funnel = useSeen(0.3);
  const hours = useSeen(0.3);
  const anim = (seen: boolean) => Boolean(mounted && seen && !reduce);
  const extended = live("reportTrend", view);
  const insightIcons = [Trophy, Clock, Eye];
  const channels = exampleChannels(locale, view);
  const insights = exampleInsights(locale, view);
  const chTotal = channels.reduce((a, r) => a + r.v, 0);
  const fmax = w.funnel.steps[0].v;
  const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

  return (
    <div className="xr" data-example-charts data-example-view={view} data-example-trend={extended ? "true" : "false"}>
      {/* the figures of the week (every view) */}
      <dl className="xr-figures" data-example-figures>
        {w.figures.map((f, i) => (
          <m.div key={f.title} className="xr-figure" {...rise(i)} data-example-figure-value={f.value}>
            <dt>{f.title}</dt>
            <dd className="xr-figure-value tnum"><CountUp value={Number(f.value)} locale={locale} delay={150 + i * 120} /></dd>
            <dd className="xr-figure-line">{f.line}</dd>
          </m.div>
        ))}
      </dl>

      {/* the insights (reportTrend) */}
      {extended && (
        <ul className="xr-insights" data-example-insights>
          {insights.map((it, i) => {
            const Icon = insightIcons[i];
            return (
              <m.li key={it.k} className="xr-insight" {...rise(i)}>
                <span className="xr-insight-icon" aria-hidden="true"><Icon size={16} strokeWidth={2} /></span>
                <span className="xr-insight-k">{it.k}</span>
                <span className="xr-insight-v tnum">{it.v}</span>
                <span className="xr-insight-d">{it.d}</span>
              </m.li>
            );
          })}
        </ul>
      )}

      <div className="xr-grid">
        {/* the trend: two lines over four weeks (reportTrend) */}
        {extended && (
          <Panel title={w.trend.title} note={w.trend.note} className="xr-panel-wide" data="trend">
            <div ref={trend.ref} className="xr-chart xr-chart-trend" role="img" aria-label={w.trend.alt}>
              {mounted && (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={w.weeks} margin={{ top: 18, right: 18, bottom: 4, left: 0 }}>
                    <CartesianGrid vertical={false} stroke={C.ink200} strokeDasharray="0" />
                    <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: C.ink200 }} tick={{ fontSize: 13, fill: C.ink600 }} dy={6} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 13, fill: C.ink600 }} domain={[0, 30]} ticks={[0, 10, 20, 30]} label={{ value: w.trend.axisY, angle: -90, position: "insideLeft", offset: 22, fontSize: 12, fill: C.ink600 }} />
                    <Tooltip contentStyle={tipStyle} cursor={{ stroke: C.ink300 }} />
                    <Line type="monotone" dataKey="received" name={w.trend.received} stroke={C.ink500} strokeWidth={2.5} dot={{ r: 4, fill: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} isAnimationActive={anim(trend.seen)} animationDuration={1100} animationEasing="ease-out" />
                    <Line type="monotone" dataKey="answered" name={w.trend.answered} stroke={C.brand} strokeWidth={3} dot={{ r: 4, fill: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} isAnimationActive={anim(trend.seen)} animationDuration={1100} animationBegin={200} animationEasing="ease-out" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <p className="xr-legend"><span><i style={{ background: C.ink500 }} />{w.trend.received}</span><span><i style={{ background: C.brand }} />{w.trend.answered}</span></p>
            <p className="xr-note">{w.trend.note}</p>
          </Panel>
        )}

        {/* the channels: a donut of the 25 received (reportTrend; at least two channels) */}
        {extended && channels.length > 1 && (
          <Panel title={w.channels.title} note={w.channels.note} data="channels">
            <div ref={chan.ref} className="xr-chart xr-chart-donut">
              <div className="xr-donut" role="img" aria-label={`${w.channels.title}: ${channels.map((r) => `${r.name} ${r.v}`).join(", ")}`}>
                {mounted && (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={channels} dataKey="v" nameKey="name" cx="50%" cy="50%" innerRadius={64} outerRadius={100} paddingAngle={2} stroke="#fff" strokeWidth={2} isAnimationActive={anim(chan.seen)} animationDuration={1000} animationEasing="ease-out">
                        {channels.map((r, i) => <Cell key={r.name} fill={CH_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={tipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="xr-donut-centre" aria-hidden="true"><span className="xr-donut-total tnum">{chTotal}</span><span className="xr-donut-word">{w.figures[0].title.split(" ")[0]}</span></div>
              </div>
              <ul className="xr-channel-list">
                {channels.map((r, i) => (
                  <li key={r.name} className="xr-channel" data-example-channel={r.name.toLowerCase().replace(/\s+/g, "-")} data-example-channel-value={r.v}>
                    <i style={{ background: CH_COLORS[i] }} aria-hidden="true" />
                    <span className="xr-channel-name">{r.name}</span>
                    <span className="xr-channel-v tnum">{r.v}</span>
                    <span className="xr-channel-pct tnum">{chTotal ? Math.round((r.v / chTotal) * 100) : 0} %</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="xr-note">{w.channels.basis}</p>
          </Panel>
        )}

        {/* the funnel: four steps, each as wide as its share of the enquiries; the rates on the 25 received (reportTrend) */}
        <Panel title={w.funnel.title} note={w.funnel.note} data="funnel" className={cn(!extended && "xr-panel-wide")}>
          <div ref={funnel.ref}>
          {/* the picture role sits on a wrapper so the list keeps its list semantics for the items (axe "listitem", a5f1d21) */}
          <div role="img" aria-label={`${w.funnel.title}: ${w.funnel.steps.map((s) => `${s.name} ${s.v}`).join(" → ")}`}>
          <ol className="xr-funnel" aria-hidden="true">
            {w.funnel.steps.map((s, i) => {
              const width = Math.max(18, (s.v / fmax) * 100);
              return (
                <li key={s.name} className="xr-funnel-step" data-example-funnel-step={i + 1} data-example-funnel-value={s.v}>
                  <span className="xr-funnel-words"><span className="xr-funnel-name">{s.name}</span><span className="xr-funnel-d">{s.d}</span></span>
                  <span className="xr-funnel-track">
                    <m.span className="xr-funnel-bar" style={{ width: `${width}%`, background: i === 0 ? C.ink300 : i === 1 ? C.brandLine : i === 2 ? C.brandInk : C.brand, transformOrigin: "left" }} initial={reduce ? false : { scaleX: 0 }} animate={funnel.seen || reduce ? { scaleX: 1 } : { scaleX: 0 }} transition={{ delay: 0.1 + i * 0.16, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                    <span className="xr-funnel-v tnum" style={{ color: i >= 2 ? "#fff" : C.ink950 }}>{s.v}</span>
                  </span>
                  {extended && i > 0 && <span className="xr-funnel-rate tnum" data-example-funnel-rate={Math.round((s.v / fmax) * 100)}>{Math.round((s.v / fmax) * 100)} %</span>}
                </li>
              );
            })}
          </ol>
          </div>
          {extended && <p className="xr-note">{w.funnel.ratesNote}</p>}
          </div>
        </Panel>

        {/* the hour of arrival (reportTrend) */}
        {extended && (
          <Panel title={w.hours.title} note={w.hours.note} data="hours">
            <div ref={hours.ref} className="xr-chart xr-chart-hours" role="img" aria-label={`${w.hours.title}: ${w.hours.peak}`}>
              {mounted && (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={w.hours.rows} margin={{ top: 12, right: 8, bottom: 0, left: -24 }} barCategoryGap="22%">
                    <CartesianGrid vertical={false} stroke={C.ink200} />
                    <XAxis dataKey="h" tickLine={false} axisLine={{ stroke: C.ink200 }} tick={{ fontSize: 13, fill: C.ink600 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 13, fill: C.ink600 }} allowDecimals={false} />
                    <Tooltip contentStyle={tipStyle} cursor={{ fill: C.brandWash }} />
                    <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive={anim(hours.seen)} animationDuration={900} animationEasing="ease-out">
                      {w.hours.rows.map((r) => <Cell key={r.h} fill={r.h === "11" || r.h === "12" ? C.brand : C.ink300} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <p className="xr-note"><strong className="text-text-primary">{w.hours.peak}</strong> · {insights[1].d}</p>
            <p className="xr-note" data-example-office-hours>{w.hours.office}</p>
          </Panel>
        )}
      </div>

      {/* the same week with and without NuovaSolution (§19) */}
      <CompareBlock locale={locale} view={view} id="xr-cmp" />

      {/* the open cases */}
      <Panel title={w.openTitle} className="xr-panel-wide" data="open">
        <div className="xr-table-wrap">
          <table className="xr-table" data-example-open>
            <thead><tr><th>{w.openHead.who}</th><th>{w.openHead.what}</th><th>{w.openHead.channel}</th><th>{w.openHead.prio}</th><th>{w.openHead.next}</th><th>{w.openHead.state}</th></tr></thead>
            <tbody>
              {w.open.map((o) => (
                <tr key={o.who}>
                  <td className="xr-td-who">{o.who}</td>
                  <td>{o.what}</td>
                  <td>{o.channel.replace("⟦sofia⟧", sofiaChannel(locale, view))}</td>
                  <td><span className="demo-priority" data-prio={o.prio}>{o.prio}</span></td>
                  <td>{o.next}</td>
                  <td><span className="xr-state">{o.state}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
