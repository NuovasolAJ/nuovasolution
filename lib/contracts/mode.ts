/**
 * Integration mode. Server only.
 *
 * "stub": every contract call is answered locally by a labelled stub. No
 *         request leaves the server. This is the default.
 * "staging": the BFF proxies to NUOVA_API_BASE. Requires all three of:
 *   NUOVA_INTEGRATION_MODE=staging, NUOVA_API_BASE set, and
 *   NUOVA_STAGING_ACK=I_HAVE_WEBSITE_HANDOFF_V1 as an explicit acknowledgement
 *   that the owner has delivered governance/WEBSITE_HANDOFF_v1.md and the
 *   independent review has passed. Production targets are never permitted.
 */
export type IntegrationMode = "stub" | "staging";

export function integrationMode(): IntegrationMode {
  const mode = process.env.NUOVA_INTEGRATION_MODE;
  const base = process.env.NUOVA_API_BASE;
  const ack = process.env.NUOVA_STAGING_ACK;
  if (mode === "staging" && base && ack === "I_HAVE_WEBSITE_HANDOFF_V1") return "staging";
  return "stub";
}

export function apiBase(): string {
  const base = process.env.NUOVA_API_BASE ?? "";
  return base.replace(/\/$/, "");
}

export const STUB_HEADER = "x-nuova-stub";
