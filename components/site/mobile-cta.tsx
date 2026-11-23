"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * The phone's fixed bar with the one global action (the owner's A3 of 07.11.2026; Copy stage 1 §0: "Prueba Essential gratis", the plan
 * named on purpose). The owner's brief of 20.11. (p. 4): the bar hides where the matching local button is already on screen and
 * where it would cover content — so it appears only once the hero's own actions have scrolled away, and hides while ANY plan or
 * request button (`[data-pilot-cta]`) is on screen, inside the plans section (every card has its own button), inside the request form
 * and while the close's buttons are on screen. Hidden on windows from 1024 px (CSS). The link carries data-hero-cta="trial".
 */
export function MobileCta({ href, label }: { href: string; label: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-hero-words]");
    if (!hero) return;
    const ctas = Array.from(document.querySelectorAll("[data-pilot-cta], [data-plans], [data-pilot-card]"));
    const visible = new Set<Element>();
    let heroOut = false;
    const apply = () => setShown(heroOut && visible.size === 0);
    const a = new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting && e.boundingClientRect.bottom < 0; apply(); }, { threshold: 0 });
    a.observe(hero);
    const b = new IntersectionObserver((entries) => { for (const e of entries) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); } apply(); }, { threshold: 0, rootMargin: "0px 0px -72px 0px" });
    for (const c of ctas) b.observe(c);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);
  return (
    <div className="mcta" data-mobile-cta={shown ? "shown" : "hidden"} aria-hidden={!shown}>
      <a href={href} className="mcta-main lift" data-hero-cta="trial" tabIndex={shown ? 0 : -1}>{label}<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></a>
    </div>
  );
}
