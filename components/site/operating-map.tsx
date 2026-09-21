"use client";

import { useEffect, useRef } from "react";

/**
 * H-05. Capability areas on one plane, joined by hairlines, with one champagne
 * hairline marking the path a single enquiry takes. Draws once on entry.
 * Below 1024 px it is replaced by a vertical sequence with a spine. It never
 * shows automation tooling, node names or infrastructure.
 *
 * Nodes from `nextFrom` on are being built (WEBSITE_CLAIM_REGISTER_v1 WCR-018):
 * they render outlined, the path to them is dashed, and the legend says so in
 * words, so the distinction never rests on shape alone.
 */
export function OperatingMap({ nodes, label, nextFrom, legend }: { nodes: readonly string[]; label: string; nextFrom?: number; legend?: string }) {
  const ref = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          el.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Positions on a 640 × 480 plane, for an architectural, asymmetric reading order. Only as many as there are nodes.
  const allPts = [
    [48, 72],
    [280, 72],
    [560, 120],
    [560, 260],
    [320, 260],
    [96, 340],
    [400, 420],
  ];
  const pts = allPts.slice(0, Math.min(nodes.length, allPts.length));
  const split = nextFrom !== undefined && nextFrom > 0 && nextFrom < pts.length ? nextFrom : pts.length;
  const solid = pts.slice(0, split);
  const path = solid.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const nextPath = split < pts.length ? pts.slice(split - 1).map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ") : null;
  const isNext = (i: number) => i >= split;

  return (
    <>
      <svg viewBox="0 0 640 480" role="img" aria-label={legend ? `${label}. ${legend}` : label} className="hidden xl:block w-full h-auto text-text-primary">
        {/* plane hairlines */}
        <g stroke="var(--border-hairline)" strokeWidth="1">
          <line x1="0" y1="72" x2="640" y2="72" />
          <line x1="0" y1="260" x2="640" y2="260" />
          <line x1="0" y1="420" x2="640" y2="420" />
          <line x1="560" y1="0" x2="560" y2="480" />
          <line x1="320" y1="0" x2="320" y2="480" />
        </g>
        <path ref={ref} d={path} fill="none" stroke="var(--champagne-400)" strokeWidth="1.25" strokeLinejoin="round" style={{ transition: "stroke-dashoffset 520ms cubic-bezier(.22,1,.36,1)" }} />
        {nextPath && <path d={nextPath} fill="none" stroke="var(--champagne-400)" strokeOpacity="0.6" strokeWidth="1.25" strokeDasharray="4 6" strokeLinejoin="round" />}
        {pts.map((p, i) => (
          <g key={i}>
            {isNext(i) ? (
              <circle cx={p[0]} cy={p[1]} r="3.5" fill="var(--surface-canvas, transparent)" stroke="var(--champagne-400)" strokeWidth="1.25" />
            ) : (
              <circle cx={p[0]} cy={p[1]} r="3" fill="var(--champagne-400)" />
            )}
            <text
              x={p[0] + (i === 2 || i === 3 ? -12 : 12)}
              y={p[1] - 10}
              textAnchor={i === 2 || i === 3 ? "end" : "start"}
              fill="currentColor"
              fillOpacity={isNext(i) ? 0.7 : 1}
              fontSize="15"
              fontWeight={isNext(i) ? 500 : 600}
              letterSpacing="-0.005em"
            >
              {nodes[i]}
            </text>
          </g>
        ))}
      </svg>
      <ol className="xl:hidden relative ml-3 border-l border-champagne-400 pl-6">
        {nodes.map((n, i) => (
          <li key={i} className={isNext(i) ? "relative py-4 t-heading-s text-text-secondary" : "relative py-4 t-heading-s text-text-primary"}>
            <span
              aria-hidden="true"
              className={isNext(i) ? "absolute -left-[30px] top-6 h-2 w-2 rounded-pill border border-champagne-400 bg-transparent" : "absolute -left-[29px] top-6 h-1.5 w-1.5 rounded-pill bg-champagne-400"}
            />
            {n}
          </li>
        ))}
      </ol>
      {legend && <p className="mt-4 t-caption text-text-muted">{legend}</p>}
      <ol className="sr-only">
        {nodes.map((n, i) => (
          <li key={n}>{n}{isNext(i) ? " *" : ""}</li>
        ))}
      </ol>
    </>
  );
}
