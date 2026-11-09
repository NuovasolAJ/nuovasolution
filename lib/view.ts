import { headers } from "next/headers";
import { integrationMode } from "@/lib/contracts/mode";
import type { Palette, PreviewSwitches } from "@/lib/view-query";

export { switchQuery, type DisplayFace, type Palette, type PreviewSwitches } from "@/lib/view-query";

/**
 * The preview switches of the owner's verdict of 06.11.2026, resolved once per request on the server. The middleware
 * (middleware.ts) reads them from the search parameters (`?view=public`, `?palette=b`, `?display=fraunces`), remembers them in
 * cookies so they hold across the site's links, and hands the result to the request as headers; every page and the layout read
 * those headers here. On a live build nothing can be switched and nothing is read (the pages stay static): the view is "public",
 * the palette is the one the owner chose (`LIVE_PALETTE`), the display face is Inter.
 */
/** The palette of the public build until the owner's line names one (the recommendation A). */
export const LIVE_PALETTE: Palette = "a";

export function resolveSwitches(): PreviewSwitches {
  const live = integrationMode() === "live";
  if (live) return { view: "public", palette: LIVE_PALETTE, display: "inter", live };
  const h = headers();
  const v = h.get("x-nuova-view");
  const p = h.get("x-nuova-palette");
  const d = h.get("x-nuova-display");
  return {
    view: v === "public" ? "public" : "target",
    palette: p === "b" || p === "c" || p === "d" || p === "e" ? p : "a",
    display: d === "fraunces" ? "fraunces" : "inter",
    live,
  };
}
