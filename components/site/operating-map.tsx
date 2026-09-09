"use client";

import { useEffect, useRef } from "react";

/**
 * H-05. Capability areas on one plane, joined by hairlines, with one champagne
 * hairline marking the path a single enquiry takes. Draws once on entry.
 * Below 1024 px it is replaced by a vertical sequence with a spine. It never
 * shows automation tooling, node names or infrastructure.
 */
export function OperatingMap({ nodes, label }: { nodes: string[]; label: string }) {
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

  // Seven nodes on a 640 × 480 plane. Positions chosen for an architectural, asymmetric reading order.
  const pts = [
    [48, 72],
    [280, 72],
    [560, 120],
    [560, 260],
    [320, 260],
    [96, 340],
    [400, 420],
  ];
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");

  return (
    <>
      <svg viewBox="0 0 640 480" role="img" aria-label={label} className="hidden xl:block w-full h-auto text-text-primary">
        {/* plane hairlines */}
        <g stroke="var(--border-hairline)" strokeWidth="1">
          <line x1="0" y1="72" x2="640" y2="72" />
          <line x1="0" y1="260" x2="640" y2="260" />
          <line x1="0" y1="420" x2="640" y2="420" />
          <line x1="560" y1="0" x2="560" y2="480" />
          <line x1="320" y1="0" x2="320" y2="480" />
        </g>
        <path ref={ref} d={path} fill="none" stroke="var(--champagne-400)" strokeWidth="1.25" strokeLinejoin="round" style={{ transition: "stroke-dashoffset 520ms cubic-bezier(.22,1,.36,1)" }} />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="3" fill="var(--champagne-400)" />
            <text x={p[0] + (i === 2 || i === 3 ? -12 : 12)} y={p[1] - 10} textAnchor={i === 2 || i === 3 ? "end" : "start"} fill="currentColor" fontSize="15" fontWeight="600" letterSpacing="-0.005em">
              {nodes[i]}
            </text>
          </g>
        ))}
      </svg>
      <ol className="xl:hidden relative ml-3 border-l border-champagne-400 pl-6">
        {nodes.map((n, i) => (
          <li key={i} className="relative py-4 t-heading-s text-text-primary">
            <span aria-hidden="true" className="absolute -left-[29px] top-6 h-1.5 w-1.5 rounded-pill bg-champagne-400" />
            {n}
          </li>
        ))}
      </ol>
      <ol className="sr-only">
        {nodes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ol>
    </>
  );
}
