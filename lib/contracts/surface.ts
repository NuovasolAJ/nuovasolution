/**
 * Build-time surface switches that both server and client components may read. Everything here
 * is inlined at build (NUOVA_BUILD_MODE by next.config.js, NEXT_PUBLIC_* by Next), so the
 * server-rendered HTML and the hydrated client always agree. No secret, no server-only import.
 */

/**
 * Where the question box may appear (audit R25, owner order 2026-09-29 D).
 * "demo":   the design preview (stub build). A visible Demo label; every question gets the honest
 *           "cannot confirm from here" state, because nothing is connected.
 * "public": the wired assistant, no demo label. Set with NEXT_PUBLIC_QA_SURFACE=public on a
 *           deployment whose server has the assistant target (QA_INTAKE_URL, QA_TENANT_ID,
 *           QA_TENANT_HMAC_SECRET).
 * "hidden": no launcher, no section.
 * Defaults: stub build → demo. Staging and live builds → hidden, so a real environment never
 * shows an unconnected demo answer; the owner or the implementer switches it on per deployment.
 */
export type QaSurface = "demo" | "public" | "hidden";
export function qaSurface(): QaSurface {
  const v = process.env.NEXT_PUBLIC_QA_SURFACE;
  const mode = process.env.NUOVA_BUILD_MODE;
  const real = mode === "staging" || mode === "live";
  if (v === "public" || v === "hidden") return v;
  if (v === "demo") return real ? "hidden" : "demo";
  return real ? "hidden" : "demo";
}
