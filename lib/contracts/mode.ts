/**
 * Integration mode. ONE source of truth for the whole site.
 *
 * "stub"    Every contract call is answered locally by a labelled stub. No
 *           request leaves the server. The default.
 * "staging" Sandbox. The server talks to ONE pinned staging target. The
 *           browser never does.
 * "live"    Production. Cannot be built without an explicit owner release
 *           variable (next.config.js refuses the build), and cannot run
 *           without the same variable at runtime.
 *
 * The mode is fixed at BUILD time (next.config.js inlines NUOVA_BUILD_MODE), so
 * a page prerendered as "stub" can never be served by a server that talks to
 * staging, and the visible environment ribbon always matches what the server
 * actually does. Runtime configuration only supplies targets and secrets, and
 * every target is checked again at runtime (environmentProblem) before any
 * request leaves the server. A misconfigured target fails closed: it never
 * silently falls back to a stub, because a silent stub would show a tester a
 * success that did not happen.
 *
 * This is not an authorisation mechanism. Authorisation is the verified session
 * plus the backend's own membership checks (lib/contracts/supabase.ts).
 */
export type IntegrationMode = "stub" | "staging" | "live";

/**
 * The only staging Supabase project this site may ever talk to. A project
 * reference is an identifier, not a secret; pinning it in code means a
 * production URL placed in a staging build is refused rather than used.
 */
export const STAGING_SUPABASE_REFS: readonly string[] = ["fflmmzapksycjfdcjdtd"];

/** Hosts that must never be a target in a non-live build. Production n8n and the retired cloud instance. */
const NEVER_IN_SANDBOX: readonly string[] = ["flows.nuovasolution.com", "antoniojesus.app.n8n.cloud", "app.n8n.cloud"];

/** Exact value the owner sets to release production. Checked at build and at runtime. */
export const LIVE_RELEASE_TOKEN = "OWNER_RELEASED_PRODUCTION";

export function integrationMode(): IntegrationMode {
  const m = process.env.NUOVA_BUILD_MODE;
  return m === "staging" || m === "live" ? m : "stub";
}

export function isStubMode(): boolean {
  return integrationMode() === "stub";
}

/**
 * Stub account surfaces (fake sign-in, fake signup, fixture picker) exist for local
 * review and explicit test deployments only. In a public production deployment
 * they fail closed, so a deploy that forgets its variables can never expose a
 * fabricated account flow (review WR-06). VERCEL_ENV is set by the platform.
 */
export function stubSurfacesAllowed(): boolean {
  return isStubMode() && process.env.VERCEL_ENV !== "production";
}

function hostOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

function isLoopback(url: string): boolean {
  const h = hostOf(url);
  return h !== null && (h.startsWith("127.0.0.1") || h.startsWith("localhost"));
}

/**
 * Runtime check of the configured targets against the build mode. Returns null
 * when the environment is coherent, otherwise a stable code. Never throws.
 * Callers in staging or live mode must refuse to proceed on a non-null result.
 */
export function environmentProblem(): string | null {
  const mode = integrationMode();
  if (mode === "stub") return null;

  const supa = hostOf(process.env.SUPABASE_URL);
  if (!supa) return "supabase_url_missing";
  if (!process.env.SUPABASE_ANON_KEY) return "publishable_key_missing";

  if (mode === "staging") {
    const ref = supa.split(".")[0];
    if (!STAGING_SUPABASE_REFS.includes(ref)) return "staging_target_not_pinned";
    // The owner's per-target approval (MASTER_GOVERNANCE §14.5): must name this exact project.
    if (process.env.NUOVA_STAGING_TARGET_APPROVED !== ref) return "staging_target_not_approved";
    const qa = process.env.QA_INTAKE_URL;
    if (qa) {
      const h = hostOf(qa);
      if (!h || NEVER_IN_SANDBOX.includes(h)) return "qa_target_not_sandbox";
      if (!qa.startsWith("https://") && !isLoopback(qa)) return "qa_target_insecure";
    }
    return null;
  }

  // live
  if (process.env.NUOVA_LIVE_RELEASE !== LIVE_RELEASE_TOKEN) return "live_not_released";
  if (STAGING_SUPABASE_REFS.includes(supa.split(".")[0])) return "live_points_at_staging";
  const qa = process.env.QA_INTAKE_URL;
  if (qa && !qa.startsWith("https://")) return "qa_target_insecure";
  return null;
}

/**
 * The Q&A intake target is configured separately from the backend mode. Outside a
 * live build it may never be a production or retired host, whatever the mode, and
 * it must be https unless it is a loopback tunnel for a local sandbox run.
 */
export function qaTargetProblem(url: string): string | null {
  const h = hostOf(url);
  if (!h) return "qa_target_invalid";
  if (integrationMode() !== "live" && NEVER_IN_SANDBOX.includes(h)) return "qa_target_not_sandbox";
  if (!url.startsWith("https://") && !(integrationMode() !== "live" && isLoopback(url))) return "qa_target_insecure";
  if (integrationMode() !== "stub") return environmentProblem();
  return null;
}

export const STUB_HEADER = "x-nuova-stub";
export const MODE_HEADER = "x-nuova-mode";
