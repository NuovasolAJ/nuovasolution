"use client";

import { useEffect, useState } from "react";

/**
 * The rail beside the flow story: the steps of the story, with the one on screen marked. It is
 * navigation (anchors that work without JS); the marking is the only behaviour added here.
 */
export function FlowRail({ items, label }: { items: { id: string; n: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="flow-rail">
      <ol>
        {items.map((i) => (
          <li key={i.id + i.n}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "step" : undefined} className="t-body-s">
              <span className="tnum t-caption">{i.n}</span>
              <span className="font-medium">{i.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
