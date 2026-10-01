/**
 * Build-time surface switches that both server and client components may read. Everything here
 * is inlined at build (NUOVA_BUILD_MODE by next.config.js, NEXT_PUBLIC_* by Next), so the
 * server-rendered HTML and the hydrated client always agree. No secret, no server-only import.
 */

/**
 * Where the question box may appear (audit R25; owner order and audit R2.4, 2026-09-30).
 * The box is OFF by default on every build: the static FAQ replaces it until Hosting reports
 * WEBQA_MODEL_ROUTE, the Reviewer's browser end to end has passed and the backend answers from
 * faq-kb-v1.2. It comes back only when a deployment switches it on explicitly:
 * "public": the wired assistant, no demo label (NEXT_PUBLIC_QA_SURFACE=public on a deployment whose
 *           server has the assistant target QA_INTAKE_URL, QA_TENANT_ID, QA_TENANT_HMAC_SECRET).
 * "demo":   a stub build only, labelled Demo; used by the local Q&A test suites.
 * "hidden": no launcher, no section (the default).
 */
export type QaSurface = "demo" | "public" | "hidden";
export function qaSurface(): QaSurface {
  const v = process.env.NEXT_PUBLIC_QA_SURFACE;
  const mode = process.env.NUOVA_BUILD_MODE;
  const real = mode === "staging" || mode === "live";
  if (v === "public") return "public";
  if (v === "demo" && !real) return "demo";
  return "hidden";
}
