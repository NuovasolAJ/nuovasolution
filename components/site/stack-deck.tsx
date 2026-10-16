"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A sequence of cards that, on a desktop viewport, stack while the page scrolls (owner order
 * 2026-09-30): each card sticks below the header, a few pixels lower than the one before, and the
 * next card slides over it; the covered card steps back a little. Scrolling stays the browser's own
 * (position: sticky, globals.css "The deck"); this component only computes where each card sticks
 * and how far it is covered.
 *
 * - A card taller than the window sticks only when its end has come into view, so it is always
 *   read to the end before the next one covers it.
 * - From 1024 px wide and 700 px high, without reduced motion. Otherwise, and without JavaScript,
 *   the cards follow each other: the same content without movement.
 * - Children must be the items, each rendered with `data-deck-item`.
 */
const MEDIA = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const STEP = 14; // px each further card sticks lower, so the edges of the cards below stay visible
const GAP = 24; // px between the header and the first card, and above the window's bottom edge
const MIN_ROOM = 520; // px of window height a card needs under the header before the deck is worth switching on

export function StackDeck({ children, className, as: Tag = "ol" }: { children: ReactNode; className?: string; as?: "ol" | "div" }) {
  const ref = useRef<HTMLOListElement & HTMLDivElement>(null);

  useEffect(() => {
    const deck = ref.current;
    if (!deck) return;
    const mq = window.matchMedia(MEDIA);
    let frame = 0;
    let items: HTMLElement[] = [];

    const header = () => document.querySelector("header")?.getBoundingClientRect().height ?? 72;

    function layout() {
      items = Array.from(deck!.querySelectorAll<HTMLElement>(":scope > [data-deck-item]"));
      if (!mq.matches) {
        deck!.dataset.deck = "off";
        items.forEach((el) => {
          el.style.removeProperty("--deck-top");
          el.style.removeProperty("--deck-covered");
          el.removeAttribute("inert");
        });
        return;
      }
      const vh = window.innerHeight;
      const base = header() + GAP;
      // Too little room between the header and the window's bottom edge for a card to be read while it sticks:
      // then the whole sequence stacks normally (owner order 2026-10-01 §4), nothing is cut off.
      if (vh - base - GAP < MIN_ROOM) {
        deck!.dataset.deck = "off";
        items.forEach((el) => {
          el.style.removeProperty("--deck-top");
          el.style.removeProperty("--deck-covered");
          el.removeAttribute("inert");
        });
        return;
      }
      deck!.dataset.deck = "on";
      items.forEach((el, i) => {
        // A card taller than the room sticks only once its bottom edge is in view, so it is always read to its
        // end before the next card covers it; its top then rests above the window, already read.
        const h = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? el.offsetHeight;
        const top = Math.min(base + i * STEP, vh - h - GAP);
        el.style.setProperty("--deck-top", `${Math.round(top)}px`);
      });
      measure();
    }

    // How far each card is covered by the next one: 0 while the next is below it, 1 once the next
    // card has reached its own resting place. A card that is fully covered is made inert, so nothing
    // under the card in front can take a click or the keyboard focus.
    function measure() {
      frame = 0;
      if (deck!.dataset.deck !== "on") return;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        const next = items[i + 1];
        if (!next) {
          el.style.setProperty("--deck-covered", "0");
          el.removeAttribute("inert");
          continue;
        }
        const card = el.getBoundingClientRect();
        const nextTop = next.getBoundingClientRect().top;
        const nextRest = parseFloat(next.style.getPropertyValue("--deck-top")) || 0;
        const travel = Math.max(1, card.bottom - nextRest);
        const covered = Math.min(1, Math.max(0, (card.bottom - nextTop) / travel));
        el.style.setProperty("--deck-covered", covered.toFixed(3));
        if (covered >= 0.985) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const onResize = () => layout();

    // A link into a card (#story-b from the menu or the platform page): a covered card still stands in the window,
    // stuck under the ones above it, so the browser's own jump would not move. The deck scrolls to the card's place in
    // the flow instead (offsetTop ignores the sticky shift), which uncovers it.
    // offsetTop of a stuck item already carries its sticky shift (Chromium), so a card's place in the flow is the deck's
    // own offset plus the heights of the cards before it.
    const flowTop = (item: HTMLElement) => {
      let t = 0; let n: HTMLElement | null = deck!; while (n) { t += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
      for (const it of items) { if (it === item) break; t += it.offsetHeight; }
      return t;
    };
    const jumpTo = (hash: string) => {
      if (deck!.dataset.deck !== "on" || !hash || hash.length < 2) return false;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      const item = target?.closest<HTMLElement>("[data-deck-item]");
      if (!item || !deck!.contains(item)) return false;
      window.scrollTo({ top: Math.max(0, flowTop(item) - header() - GAP), behavior: "auto" });
      return true;
    };
    const onHash = () => { jumpTo(location.hash); };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || url.origin !== location.origin) return;
      if (jumpTo(url.hash)) { e.preventDefault(); history.replaceState(null, "", url.hash); }
    };

    layout();
    if (location.hash) requestAnimationFrame(onHash);
    // Pictures inside the cards change their height when they arrive.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => layout()) : null;
    Array.from(deck.children).forEach((c) => ro?.observe(c));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    mq.addEventListener?.("change", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
      mq.removeEventListener?.("change", onResize);
    };
  }, []);

  return (
    <Tag ref={ref} data-deck="off" className={cn(className)}>
      {children}
    </Tag>
  );
}
