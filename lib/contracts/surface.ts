/**
 * Build-time surface switches that both server and client components may read. Everything here
 * is inlined at build (NUOVA_BUILD_MODE by next.config.js, NEXT_PUBLIC_* by Next), so the
 * server-rendered HTML and the hydrated client always agree. No secret, no server-only import.
 */

/**
 * Where the question box may appear (audit R25, W5). "demo": shown with a visible Demo label,
 * in review previews. "public": the released assistant. "hidden": no launcher, no section.
 * Default: demo outside a live build; hidden in a live build until the owner sets
 * NEXT_PUBLIC_QA_SURFACE=public after WEBSITE_QA_STAGING = PASS and an approved web
 * disclosure text.
 */
export type QaSurface = "demo" | "public" | "hidden";
export function qaSurface(): QaSurface {
  const v = process.env.NEXT_PUBLIC_QA_SURFACE;
  if (v === "demo" || v === "public" || v === "hidden") return v;
  return process.env.NUOVA_BUILD_MODE === "live" ? "hidden" : "demo";
}
