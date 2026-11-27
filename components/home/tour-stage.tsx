"use client";

import { useEffect, useRef } from "react";

/**
 * The "Luxus-Rundgang" stage (the owner's order of 27.11.2026, docs/website_redesign/RUNDGANG_1127_OWNER_ORDER_AND_PLAN_v1.md):
 * one fixed, full-window layer BEHIND the page carries the house; the eight sections scroll over it exactly as before, so the
 * architecture adds no scroll distance and pins nothing. Each section belongs to a scene; over the last part of a section the stage
 * crossfades to the next scene (opacity), and within a scene the picture moves a little (transform: scale) — both directions, driven
 * by the native scroll, still the moment the scroll stops. Transform and opacity only, written straight to the elements from one
 * passive scroll listener + requestAnimationFrame (no React state per frame).
 *
 * Prototype stage: licensed stills (Pexels License, FOTOS_LIZENZ_1124_v1.md) stand in for the one fictional villa's film. The later
 * film (a video scrubbed by currentTime, or a frame sequence per section) replaces the stills behind the same sections.
 *
 * Fallbacks (the owner's rules): the first scene is the first paint (eager, small poster first through srcset); scenes 2–8 load when
 * their section comes within two windows; with reduced motion, Save-Data or a slow connection the stills stand and only switch; a
 * picture that fails to load is skipped (the previous scene stays). The stage never takes a pointer event; navigation, jump links,
 * the keyboard and the phone bar are independent of it.
 */
export type TourScene = { key: string; base: string; alt: string; widths?: number[] };

const SCENES: TourScene[] = [
  { key: "s1", base: "/media/photos/hero-c", alt: "", widths: [960, 1280, 1920, 2560] },
  { key: "s2", base: "/media/tour/s2-stairs", alt: "" },
  { key: "s3", base: "/media/tour/s3-landing", alt: "" },
  { key: "s4", base: "/media/tour/s4-sitting", alt: "" },
  { key: "s5", base: "/media/tour/s5-study", alt: "" },
  { key: "s6", base: "/media/tour/s6-gallery", alt: "" },
  { key: "s7", base: "/media/tour/s7-balcony", alt: "" },
  { key: "s8", base: "/media/tour/s8-pool", alt: "" },
];

/** Which section shows which scene (the owner's table: B1 living room · B2 stairs → landing · B3+B4 sitting room · B5 study · B6 gallery · B7 balcony · B8 pool). */
const MAP: [string, string][] = [
  [".hf", "s1"],
  ["#pain", "s2"],
  [".flow", "s3"],
  ["#functions", "s4"],
  ["#strengths", "s4"],
  ["#report", "s5"],
  ["#model-3d", "s6"],
  ["#plans", "s7"],
  ["#start", "s7"],
  ["#faq", "s7"],
  [".closing", "s8"],
];

const srcset = (s: TourScene) => (s.widths ?? [960, 1280, 1920]).map((w) => `${s.base}-${w}.webp ${w}w`).join(", ");
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function TourStage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const imgs = layers.map((l) => l.querySelector("img") as HTMLImageElement);
    const sceneIndex = new Map(SCENES.map((s, i) => [s.key, i]));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const stills = reduce || !!nav.connection?.saveData || /(^|\b)(2g|3g)\b/.test(nav.connection?.effectiveType ?? "");
    el.setAttribute("data-stage-mode", stills ? "stills" : "film");
    const failed = new Set<number>();
    imgs.forEach((img, i) => { img.addEventListener("error", () => { failed.add(i); layers[i].setAttribute("data-failed", ""); }); });
    const loaded = new Set<number>([0]);
    const load = (i: number) => {
      if (loaded.has(i) || !imgs[i]) return;
      loaded.add(i);
      imgs[i].srcset = srcset(SCENES[i]);
      imgs[i].src = `${SCENES[i].base}-1280.webp`;
    };
    // spans: consecutive sections of the same scene merge into one range [top, bottom] in document coordinates
    type Span = { scene: number; top: number; bottom: number };
    let spans: Span[] = [];
    const measure = () => {
      const y = window.scrollY;
      const raw: Span[] = [];
      for (const [sel, key] of MAP) {
        const s = document.querySelector(sel);
        if (!s) continue;
        const r = s.getBoundingClientRect();
        const scene = sceneIndex.get(key)!;
        const last = raw[raw.length - 1];
        if (last && last.scene === scene) last.bottom = r.bottom + y;
        else raw.push({ scene, top: r.top + y, bottom: r.bottom + y });
      }
      spans = raw.filter((sp) => !failed.has(sp.scene));
      el.setAttribute("data-stage-spans", String(spans.length));
    };
    let shown = new Set<number>();
    const paint = () => {
      if (!spans.length) return;
      const y = window.scrollY;
      const h = window.innerHeight;
      // the focal line sits in the upper third of the window (under the header, where the reader's eye is after a scroll), so a short
      // section like the pain band holds its own scene while it is read
      const focal = y + h * 0.34;
      let i = spans.findIndex((sp) => focal < sp.bottom);
      if (i < 0) i = spans.length - 1;
      const cur = spans[i];
      const next = spans[i + 1];
      // the crossfade zone: the last part of the current span, at most 70 % of a window, at most half the span
      const zone = next ? Math.min(h * 0.7, (cur.bottom - cur.top) * 0.5) : 0;
      let t = next ? (focal - (next.top - zone)) / zone : 0;
      t = Math.max(0, Math.min(1, t));
      if (stills) t = t < 0.5 ? 0 : 1;
      const progress = Math.max(0, Math.min(1, (focal - cur.top) / Math.max(1, cur.bottom - cur.top)));
      // load what is near: the current, the next and the one after
      load(cur.scene); if (next) load(next.scene); if (spans[i + 2]) load(spans[i + 2].scene);
      const want = new Set<number>([cur.scene]);
      if (next && t > 0) want.add(next.scene);
      shown.forEach((k) => { if (!want.has(k)) { layers[k].style.opacity = "0"; layers[k].style.visibility = "hidden"; } });
      shown = want;
      const curLayer = layers[cur.scene];
      curLayer.style.visibility = "visible";
      curLayer.style.opacity = "1";
      if (!stills) imgs[cur.scene].style.transform = `scale(${(1.06 - 0.06 * easeOut(progress)).toFixed(4)})`;
      if (next) {
        const nl = layers[next.scene];
        nl.style.visibility = t > 0 ? "visible" : "hidden";
        nl.style.opacity = String(easeOut(t));
        if (!stills) imgs[next.scene].style.transform = "scale(1.06)";
      }
      el.setAttribute("data-stage-scene", SCENES[cur.scene].key);
      el.setAttribute("data-stage-t", t.toFixed(2));
    };
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); };
    const onResize = () => { measure(); paint(); };
    measure(); paint();
    // the sections' heights settle after fonts and images: measure again a few times, and whenever the document grows
    const t1 = setTimeout(onResize, 600); const t2 = setTimeout(onResize, 2000);
    const ro = new ResizeObserver(onResize); ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t1); clearTimeout(t2); ro.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={root} className="tour" data-tour-stage aria-hidden="true">
      {SCENES.map((s, i) => (
        <div key={s.key} className="tour-scene" data-scene={s.key} style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tour-img"
            alt=""
            decoding="async"
            sizes="100vw"
            {...(i === 0 ? { src: `${s.base}-1280.webp`, srcSet: srcset(s), fetchPriority: "high" as const } : {})}
          />
          <div className="tour-veil" />
        </div>
      ))}
    </div>
  );
}
