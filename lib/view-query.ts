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
/** THE one line of the view's default. The owner's brief of 20.11. (afternoon): the customer pages carry finished statements — no
 *  "Próximamente"; publication waits for the complete product — so the fixed link shows the finished product; `?view=public` is the
 *  internal gate view that keeps the open points visible (the owner's 09:05 gate stays as that internal view). */
export const VIEW_DEFAULT: ClaimView = "target";

/** The query string that keeps the current switches on a link (empty when everything is at its default). */
export function switchQuery(s: PreviewSwitches, patch: Partial<Pick<PreviewSwitches, "view" | "display">> = {}): string {
  const n = { ...s, ...patch };
  const q = new URLSearchParams();
  if (n.view !== VIEW_DEFAULT) q.set("view", n.view);
  if (n.display !== DISPLAY_DEFAULT) q.set("display", n.display);
  const str = q.toString();
  return str ? `?${str}` : "";
}
