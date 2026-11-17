import type { ClaimView } from "@/lib/claims";

/**
 * The preview switches' types and the query helper, without any server import (the client component
 * components/site/preview-switch.tsx uses them; the resolution from the request lives in lib/view.ts).
 */
/** 16.11. evening: A = the blue of 13.11. (D), B = without blue — black/grey with the one status accent. The owner answers FARBE = A or B on two phone pictures; until then A stands. */
export type Palette = "a" | "b";
export type DisplayFace = "inter" | "fraunces";
export type PreviewSwitches = { view: ClaimView; display: DisplayFace; palette: Palette; live: boolean };
/** THE one line of the display face (the owner, 16.11. 14:00: Inter everywhere). "fraunces" puts Fraunces back on H1/H2 everywhere; `?display=` compares on the same build. */
export const DISPLAY_DEFAULT: DisplayFace = "inter";

/** The query string that keeps the current switches on a link (empty when everything is at its default). */
export function switchQuery(s: PreviewSwitches, patch: Partial<Pick<PreviewSwitches, "view" | "display" | "palette">> = {}): string {
  const n = { ...s, ...patch };
  const q = new URLSearchParams();
  if (n.view === "public") q.set("view", "public");
  if (n.display !== DISPLAY_DEFAULT) q.set("display", n.display);
  if (n.palette === "b") q.set("palette", "b");
  const str = q.toString();
  return str ? `?${str}` : "";
}
