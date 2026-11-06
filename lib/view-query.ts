import type { ClaimView } from "@/lib/claims";

/**
 * The preview switches' types and the query helper, without any server import (the client component
 * components/site/preview-switch.tsx uses them; the resolution from the request lives in lib/view.ts).
 */
export type Palette = "a" | "b" | "c";
export type DisplayFace = "inter" | "fraunces";
export type PreviewSwitches = { view: ClaimView; palette: Palette; display: DisplayFace; live: boolean };

/** The query string that keeps the current switches on a link (empty when everything is at its default). */
export function switchQuery(s: PreviewSwitches, patch: Partial<Pick<PreviewSwitches, "view" | "palette" | "display">> = {}): string {
  const n = { ...s, ...patch };
  const q = new URLSearchParams();
  if (n.view === "public") q.set("view", "public");
  if (n.palette !== "a") q.set("palette", n.palette);
  if (n.display !== "inter") q.set("display", n.display);
  const str = q.toString();
  return str ? `?${str}` : "";
}
