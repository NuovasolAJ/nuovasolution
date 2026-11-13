import { headers } from "next/headers";
import { integrationMode } from "@/lib/contracts/mode";
import type { PreviewSwitches } from "@/lib/view-query";

export { switchQuery, type DisplayFace, type Palette, type PreviewSwitches } from "@/lib/view-query";

/**
 * The preview switches of the owner's verdict of 06.11.2026, resolved once per request on the server. The middleware
 * (middleware.ts) reads them from the search parameters (`?view=public`, `?display=fraunces`), remembers them in cookies so they
 * hold across the site's links, and hands the result to the request as headers; every page and the layout read those headers
 * here. On a live build nothing can be switched and nothing is read (the pages stay static): the view is "public", the display
 * face is Inter. The palette switch left on 13.11.2026: the owner chose D, which is now the one accent in globals.css.
 */
export function resolveSwitches(): PreviewSwitches {
  const live = integrationMode() === "live";
  if (live) return { view: "public", display: "inter", live };
  const h = headers();
  const v = h.get("x-nuova-view");
  const d = h.get("x-nuova-display");
  return {
    view: v === "public" ? "public" : "target",
    display: d === "fraunces" ? "fraunces" : "inter",
    live,
  };
}
