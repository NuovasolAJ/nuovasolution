import "server-only";
import { environmentProblem, integrationMode } from "./mode";

/**
 * The website's own server boundary to the backend (export v2 §0: the BFF runs
 * on the website's server; the browser never talks to Supabase).
 *
 * Rules enforced here, not by convention:
 * - Every call first passes environmentProblem(): a target that is not the pinned,
 *   owner-approved one for this build refuses before any byte leaves the server.
 * - A session token from a cookie is NEVER trusted as an identity. It is verified
 *   against the identity server (GET /auth/v1/user) and only the returned user id
 *   is used, as p_verified_subject / p_actor_subject.
 * - Tenant and role are never taken from the browser. They come from
 *   session_actor_for(p_verified_subject) on the server.
 * - Service-role RPCs run only here. The key is read from the server environment
 *   and never logged, returned or placed in a response.
 * - Backend error bodies are never passed through to the browser.
 */

export class BackendRefusal extends Error {
  constructor(public code: string, public status = 503) {
    super(code);
  }
}

function base(): string {
  return (process.env.SUPABASE_URL ?? "").replace(/\/$/, "");
}

function assertTargetOk() {
  if (integrationMode() === "stub") throw new BackendRefusal("stub_mode", 500);
  const problem = environmentProblem();
  if (problem) throw new BackendRefusal("environment_misconfigured", 503);
}

function serviceHeaders(): Headers {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new BackendRefusal("environment_misconfigured", 503);
  const h = new Headers({ "Content-Type": "application/json", apikey: key });
  // Legacy JWT-format keys also need the bearer header; new secret keys must not carry it.
  if (key.startsWith("eyJ")) h.set("Authorization", `Bearer ${key}`);
  return h;
}

/** Service-role RPC. Server only. Returns parsed JSON or throws BackendRefusal. */
export async function serviceRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  assertTargetOk();
  if (!/^[a-z_][a-z0-9_]*$/.test(fn)) throw new BackendRefusal("invalid_input", 400);
  let res: Response;
  try {
    res = await fetch(`${base()}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: serviceHeaders(),
      body: JSON.stringify(args),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    throw new BackendRefusal("server_error", 502);
  }
  if (res.status === 401 || res.status === 403) throw new BackendRefusal("server_error", 502);
  if (!res.ok) throw new BackendRefusal(res.status === 400 || res.status === 404 ? "invalid_input" : "server_error", res.status === 400 ? 400 : 502);
  return (await res.json()) as T;
}

/** Verify a session token with the identity server. Returns the user id or null. */
export async function verifySession(token: string | undefined): Promise<{ id: string; email: string | null } | null> {
  if (!token || token === "stub") return null;
  assertTargetOk();
  let res: Response;
  try {
    res = await fetch(`${base()}/auth/v1/user`, {
      headers: { apikey: process.env.SUPABASE_ANON_KEY ?? "", Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new BackendRefusal("server_error", 502);
  }
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new BackendRefusal("server_error", 502);
  const u = (await res.json().catch(() => null)) as { id?: string; email?: string } | null;
  if (!u?.id || !/^[0-9a-f-]{36}$/i.test(u.id)) return null;
  return { id: u.id, email: u.email ?? null };
}

export interface Actor {
  subject: string;
  clientId: string;
  role: string | null;
}

/**
 * Resolve the verified actor. Throws BackendRefusal("no_session", 401) when the
 * token does not verify, and ("unresolved_membership", 403) when the identity
 * has no tenant membership yet (the backend's own answer for a fresh identity
 * before the first-admin bootstrap).
 */
export async function resolveActor(token: string | undefined): Promise<Actor> {
  const user = await verifySession(token);
  if (!user) throw new BackendRefusal("no_session", 401);
  const a = await serviceRpc<Record<string, unknown>>("session_actor_for", { p_verified_subject: user.id });
  if (a?.authorized !== true) {
    throw new BackendRefusal(a?.reason === "unresolved_membership" ? "unresolved_membership" : "forbidden", 403);
  }
  const clientId = typeof a.client_id === "string" ? a.client_id : typeof a.tenant_id === "string" ? a.tenant_id : null;
  if (!clientId) throw new BackendRefusal("forbidden", 403);
  return { subject: user.id, clientId, role: typeof a.role === "string" ? a.role : null };
}
