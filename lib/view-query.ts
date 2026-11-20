import type { ClaimView } from "@/lib/claims";

/**
 * The preview switches' types and the query helper, without any server import (the client component
 * components/site/preview-switch.tsx uses them; the resolution from the request lives in lib/view.ts).
 */
/** 17.11.: the owner chose FARBE = B — black/grey with the muted green as the one status accent; it is the base in globals.css, there is no switch. */
export type Palette = "b";
export type DisplayFace = "inter" | "fraunces";
export type PreviewSwitches = { view: ClaimView; display: DisplayFace; live: boolean };
/** THE one line of the display face (the owner, 16.11. 14:00: Inter everywhere). "fraunces" puts Fraunces back on H1/H2 everywhere; `?display=` compares on the same build. */
export const DISPLAY_DEFAULT: DisplayFace = "inter";
/** THE one line of the view's default (the owner, 20.11.: what is not live today carries a visible mark — the gate view is what the
 *  fixed link shows without a parameter; `?view=target` still shows the finished product). */
export const VIEW_DEFAULT: ClaimView = "public";

/** The query string that keeps the current switches on a link (empty when everything is at its default). */
export function switchQuery(s: PreviewSwitches, patch: Partial<Pick<PreviewSwitches, "view" | "display">> = {}): string {
  const n = { ...s, ...patch };
  const q = new URLSearchParams();
  if (n.view !== VIEW_DEFAULT) q.set("view", n.view);
  if (n.display !== DISPLAY_DEFAULT) q.set("display", n.display);
  const str = q.toString();
  return str ? `?${str}` : "";
}
