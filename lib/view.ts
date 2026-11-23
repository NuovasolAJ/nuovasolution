import { headers } from "next/headers";
import { integrationMode } from "@/lib/contracts/mode";
import { DISPLAY_DEFAULT, VIEW_DEFAULT, type PreviewSwitches } from "@/lib/view-query";

export { switchQuery, type DisplayFace, type Palette, type PreviewSwitches } from "@/lib/view-query";

/**
 * The preview switches of the owner's verdict of 06.11.2026, resolved once per request on the server. The middleware
 * (middleware.ts) reads them from the search parameters (`?view=public`, `?display=fraunces`), remembers them in cookies so they
 * hold across the site's links, and hands the result to the request as headers; every page and the layout read those headers
 * here. On a live build nothing can be switched and nothing is read (the pages stay static): the view is "public", the display
 * face is Inter. The palette switch left on 13.11.2026: the owner chose D, which is now the one accent in globals.css.
 */
/* the display face's default is the one line DISPLAY_DEFAULT in lib/view-query.ts (the owner, 16.11. 14:00: Inter everywhere) */
export function resolveSwitches(): PreviewSwitches {
  const live = integrationMode() === "live";
  if (live) return { view: VIEW_DEFAULT, display: DISPLAY_DEFAULT, live };
  const h = headers();
  const d = h.get("x-nuova-display");
  // 23.11. (the owner's brief, clarification 16:18): there is no public/gate view any more — every build shows the finished product
  return {
    view: VIEW_DEFAULT,
    display: d === "fraunces" ? "fraunces" : d === "inter" ? "inter" : DISPLAY_DEFAULT,
    live,
  };
}
