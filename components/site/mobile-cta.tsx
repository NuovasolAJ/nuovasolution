"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * The phone's fixed bar with the one main action (the owner's A3 of 07.11.2026): it appears once the hero's own action has scrolled
 * away and hides again while the close's buttons are on screen, so the main action is always reachable without ever standing twice
 * on one screen. Hidden on windows from 1024 px (CSS). The link carries data-hero-cta="demo" so the demonstration's run listener
 * treats it like the hero's button. The label is the hero's main label (Copy; T-1 when the wording changes).
 */
export function MobileCta({ href, label }: { href: string; label: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-hero-words]");
    if (!hero) return;
    // 16.11. (the owner's point 2): the bar never stands under an equal button — it hides while any pilot button is on screen
    const ctas = Array.from(document.querySelectorAll("[data-pilot-cta]"));
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
      <a href={href} className="mcta-main lift" data-hero-cta="demo" tabIndex={shown ? 0 : -1}>{label}<ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></a>
    </div>
  );
}
