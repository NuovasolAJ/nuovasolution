"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Clock, Eye, Trophy } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Locale } from "@/lib/i18n/config";
import { exampleReport } from "@/lib/content/example-report";
import { claim, claimWords } from "@/lib/claims";
import { CountUp } from "@/components/ui/count-up";
import { useSeen } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * The charts of the public example report (the owner's order of 05.11.2026, F3), drawn with Recharts: the weekly trend as
 * two lines, the channels as a donut, the funnel from enquiry to agreed viewing as four steps, the hour of arrival as columns,
 * then the table of open cases. Every chart animates once when it comes into view; with reduced motion it stands drawn. The
 * colours are the page's tokens (the brand blue, the neutral greys), as hex because SVG attributes take no CSS variables.
 */
const C = { brand: "#1f4fd8", brandInk: "#173ca6", brandLine: "#c9d6fb", ink200: "#dedee2", ink300: "#c7c7cc", ink500: "#75757c", ink600: "#5b5b61", ink950: "#0e0e0f", whatsapp: "#1fa463" };
const CH_COLORS = [C.whatsapp, C.brand, "#7a9bf0", C.ink300, C.ink200];

function Panel({ title, note, children, className, data }: { title: string; note?: string; children: React.ReactNode; className?: string; data?: string }) {
  return (
    <section className={cn("xr-panel", className)} data-xr-panel={data}>
      <header className="xr-panel-head"><h2 className="xr-panel-title">{title}</h2>{note && <span className="xr-panel-note">{note}</span>}</header>
      {children}
    </section>
  );
}

const tipStyle = { borderRadius: 12, border: `1px solid ${C.ink200}`, boxShadow: "0 10px 30px -12px rgba(12,12,14,0.3)", fontSize: 14, padding: "8px 12px" };

export function ExampleReportCharts({ locale }: { locale: Locale }) {
  const w = exampleReport[locale];
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const trend = useSeen(0.3);
  const chan = useSeen(0.3);
  const funnel = useSeen(0.3);
  const hours = useSeen(0.3);
  const anim = (seen: boolean) => Boolean(mounted && seen && !reduce);
  const soonMark = (k: Parameters<typeof claim>[0]) => (claim(k) === "included" ? null : <span className="xr-soon">{claimWords[claim(k)][locale].toLowerCase()}</span>);
  const insightIcons = [Trophy, Clock, Eye];
  const chTotal = w.channels.rows.reduce((a, r) => a + (r.v ?? 0), 0);
  const fmax = w.funnel.steps[0].v;
  const rise = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

  return (
    <div className="xr" data-example-charts>
      {/* the figures of the week */}
      <dl className="xr-figures" data-example-figures>
        {w.figures.map((f, i) => (
          <m.div key={f.title} className="xr-figure" {...rise(i)}>
            <dt>{f.title}</dt>
            <dd className="xr-figure-value tnum"><CountUp value={Number(f.value)} locale={locale} delay={150 + i * 120} /></dd>
            <dd className="xr-figure-line">{f.line}</dd>
          </m.div>
        ))}
      </dl>

      {/* the insights */}
      <ul className="xr-insights" data-example-insights>
        {w.insights.map((it, i) => {
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
      <p className="xr-insights-state" data-example-insights-state>{w.insightsState}</p>

      <div className="xr-grid">
        {/* the trend: two lines over four weeks */}
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

        {/* the channels: a donut of the 25 received */}
        <Panel title={w.channels.title} note={w.channels.note} data="channels">
          <div ref={chan.ref} className="xr-chart xr-chart-donut">
            <div className="xr-donut" role="img" aria-label={`${w.channels.title}: ${w.channels.rows.map((r) => `${r.name} ${r.v}`).join(", ")}`}>
              {mounted && (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={w.channels.rows.filter((r) => (r.v ?? 0) > 0)} dataKey="v" nameKey="name" cx="50%" cy="50%" innerRadius={64} outerRadius={100} paddingAngle={2} stroke="#fff" strokeWidth={2} isAnimationActive={anim(chan.seen)} animationDuration={1000} animationEasing="ease-out">
                      {w.channels.rows.filter((r) => (r.v ?? 0) > 0).map((r, i) => <Cell key={r.name} fill={CH_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={tipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="xr-donut-centre" aria-hidden="true"><span className="xr-donut-total tnum">{chTotal}</span><span className="xr-donut-word">{w.figures[0].title.split(" ")[0]}</span></div>
            </div>
            <ul className="xr-channel-list">
              {w.channels.rows.map((r, i) => (
                <li key={r.name} className={cn("xr-channel", r.v === null && "is-soon")} data-example-channel={r.name.toLowerCase().replace(/\s+/g, "-")} data-example-channel-value={r.v ?? "soon"}>
                  <i style={{ background: r.v === null ? "transparent" : CH_COLORS[i], border: r.v === null ? `1px dashed ${C.ink300}` : undefined }} aria-hidden="true" />
                  <span className="xr-channel-name">{r.name}</span>
                  {r.v === null ? <span className="xr-channel-soon">{claimWords[claim(r.claim)][locale].toLowerCase()}</span> : (
                    <>
                      <span className="xr-channel-v tnum">{r.v}</span>
                      <span className="xr-channel-pct tnum">{chTotal ? Math.round((r.v / chTotal) * 100) : 0} %</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <p className="xr-note">{w.channels.basis}</p>
        </Panel>

        {/* the funnel: four steps, each as wide as its share of the enquiries */}
        <Panel title={w.funnel.title} note={w.funnel.note} data="funnel">
          <div ref={funnel.ref}>
          <ol className="xr-funnel" role="img" aria-label={`${w.funnel.title}: ${w.funnel.steps.map((s) => `${s.name} ${s.v}`).join(" → ")}`}>
            {w.funnel.steps.map((s, i) => {
              const width = Math.max(18, (s.v / fmax) * 100);
              return (
                <li key={s.name} className="xr-funnel-step" data-example-funnel-step={i + 1}>
                  <span className="xr-funnel-words"><span className="xr-funnel-name">{s.name}</span><span className="xr-funnel-d">{s.d}</span></span>
                  <span className="xr-funnel-track">
                    <m.span className="xr-funnel-bar" style={{ width: `${width}%`, background: i === 0 ? C.ink300 : i === 1 ? C.brandLine : i === 2 ? "#7a9bf0" : C.brand, transformOrigin: "left" }} initial={reduce ? false : { scaleX: 0 }} animate={funnel.seen || reduce ? { scaleX: 1 } : { scaleX: 0 }} transition={{ delay: 0.1 + i * 0.16, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                    <span className="xr-funnel-v tnum" style={{ color: i >= 2 ? "#fff" : C.ink950 }}>{s.v}</span>
                  </span>
                  {i > 0 && <span className="xr-funnel-rate tnum">{Math.round((s.v / w.funnel.steps[i - 1].v) * 100)} %</span>}
                </li>
              );
            })}
          </ol>
          </div>
        </Panel>

        {/* the hour of arrival */}
        <Panel title={w.hours.title} note={w.hours.note} data="hours">
          <div ref={hours.ref} className="xr-chart xr-chart-hours" role="img" aria-label={`${w.hours.title}: ${w.hours.peak}`}>
            {mounted && (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={w.hours.rows} margin={{ top: 12, right: 8, bottom: 0, left: -24 }} barCategoryGap="22%">
                  <CartesianGrid vertical={false} stroke={C.ink200} />
                  <XAxis dataKey="h" tickLine={false} axisLine={{ stroke: C.ink200 }} tick={{ fontSize: 13, fill: C.ink600 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 13, fill: C.ink600 }} allowDecimals={false} />
                  <Tooltip contentStyle={tipStyle} cursor={{ fill: "rgba(31,79,216,0.06)" }} />
                  <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive={anim(hours.seen)} animationDuration={900} animationEasing="ease-out">
                    {w.hours.rows.map((r) => <Cell key={r.h} fill={r.h === "11" || r.h === "12" ? C.brand : C.ink300} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <p className="xr-note"><strong className="text-text-primary">{w.hours.peak}</strong> · {w.insights[1].d}</p>
        </Panel>
      </div>

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
                  <td>{o.channel}</td>
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
