"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { home1103 } from "@/lib/content/home-1103";

/**
 * The pain line under the hero (the master prompt §6.1; Copy 1113 §1 S-1 with its mark S-1m; REFERENZEN §6 P-5: its own band). The
 * figure counts up from 0 to 9 once the band is in view (Copy: "counting up to 9 is fine"); with reduced motion it stands at once.
 * The figures are the example report's (9 = 2 + 2 + 5 of 25) and stay the same everywhere on the page. The demonstration under it
 * is the answer, so the line needs no promise of its own.
 */
export function PainBand({ locale }: { locale: Locale }) {
  const w = home1103.hero.pain;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(reduce ? 9 : 0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) { setN(9); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = () => { const p = Math.min(1, (performance.now() - t0) / 900); setN(Math.round(9 * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [reduce]);
  return (
    <section ref={ref} id="pain" aria-label={`${l(w.before)}${l(w.figure)}${l(w.after)}`} className="pain" data-pain data-pain-count={n}>
      <div className="container-default pain-inner">
        <p className="pain-line">
          <span>{l(w.before)}</span>
          <strong className="pain-figure tnum" aria-hidden="true">{l(w.figure).replace(/^9/, String(n))}</strong>
          <span className="sr-only">{l(w.figure)}</span>
          <span>{l(w.after)}</span>
        </p>
        <p className="pain-mark">{l(w.mark)}</p>
      </div>
    </section>
  );
}
