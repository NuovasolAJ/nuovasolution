"use client";

import { useEffect, useRef } from "react";

/**
 * The brand moment (the owner's point 2 of 06.11.2026): the NuovaSolution logo stands alone over the picture for about 2.5 s,
 * large, with the header's own logo hidden; then it travels and shrinks into the header's logo at the top left while the hero's
 * words rise. A scroll after the first breath starts the travel at once; without any scroll it starts by itself. With reduced
 * motion nothing of this runs (CSS hides the element, the attribute is never set).
 *
 * The travel is a Web Animation on the image: translate and scale from its centre to the centre of the header's logo (the same
 * artwork, public/images/logo-tight.png), measured at the moment the travel starts, so it lands exactly. The element is fixed to
 * the window, so the measurement holds while the page scrolls. `html[data-brand-moment]` is set by the hero's inline script
 * before the first paint (globals.css hides the header's logo while it is set) and removed here when the logo has landed.
 */
const HOLD_MS = 2500;
const FIRST_BREATH_MS = 700;
const TRAVEL_MS = 950;

export function BrandMoment() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    const img = el?.querySelector("img");
    const hero = el?.closest<HTMLElement>("[data-hero]");
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { html.removeAttribute("data-brand-moment"); el.setAttribute("data-brand-state", "done"); return; }
    html.setAttribute("data-brand-moment", "on");
    el.setAttribute("data-brand-state", "hold");
    const t0 = performance.now();
    let done = false;
    let travelling = false;

    const finish = () => {
      if (done) return;
      done = true;
      html.removeAttribute("data-brand-moment");
      el.setAttribute("data-brand-state", "done");
    };
    const travel = () => {
      if (travelling) return;
      travelling = true;
      el.setAttribute("data-brand-state", "travel");
      // the words rise now, whether the travel came from the clock or from a scroll
      hero?.style.setProperty("--brand-moment", "0ms");
      const target = document.querySelector<HTMLElement>("header [data-site-logo]");
      const a = img.getBoundingClientRect();
      const b = target?.getBoundingClientRect();
      if (!b || b.width < 8 || a.width < 8) {
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: "ease-out", fill: "forwards" }).onfinish = finish;
        return;
      }
      const s = b.width / a.width;
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      el.dataset.brandTravel = `${Math.round(dx)},${Math.round(dy)},${s.toFixed(3)}`;
      const anim = img.animate(
        [{ transform: "translate(0px, 0px) scale(1)" }, { transform: `translate(${dx}px, ${dy}px) scale(${s})` }],
        { duration: TRAVEL_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      );
      anim.onfinish = finish;
      anim.oncancel = finish;
    };
    const hold = window.setTimeout(travel, HOLD_MS);
    const onScroll = () => { if (performance.now() - t0 > FIRST_BREATH_MS) travel(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    // the header's logo must come back whatever happens (a hidden tab, a missing frame)
    const safety = window.setTimeout(finish, HOLD_MS + TRAVEL_MS + 2500);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(safety);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      finish();
    };
  }, []);

  return (
    <div ref={ref} className="hf-brand" aria-hidden="true" data-hero-brand data-brand-state="hold">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-tight.png" alt="" width={1600} height={320} decoding="async" fetchPriority="high" />
    </div>
  );
}
