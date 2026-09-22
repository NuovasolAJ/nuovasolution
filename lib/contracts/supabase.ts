import "server-only";
import { publishableKey, supabaseUrl } from "./env";
import { environmentProblem, integrationMode } from "./mode";

/**
 * The website's server boundary to the backend (WEBSITE_HANDOFF_v2 §0, binding).
 *
 * The browser never talks to Supabase. This server holds the user's session in an httpOnly
 * cookie and uses exactly one key, the PUBLISHABLE key:
 *   1. GoTrue: sign-up, password login, session verification, set password, logout.
 *   2. The two JWT-bound edge functions `tenant-api` and `branding-assets`: every user action is
 *      forwarded with the user's own access token (`Authorization: Bearer <user JWT>`). The edge
 *      function verifies the token, derives tenant and role from that user's membership and
 *      ignores any client_id in a body. This server sends none.
 *
 * No secret key is used for any user action (v2 §0.2: "a secret key is not user authorization").
 * The website runtime has no secret key at all.
 */

export class BackendRefusal extends Error {
  constructor(public code: string, public status = 503, public field?: string) {
    super(code);
  }
}

function assertTargetOk() {
  if (integrationMode() === "stub") throw new BackendRefusal("stub_mode", 500);
  if (environmentProblem()) throw new BackendRefusal("environment_misconfigured", 503);
}

function gotrueHeaders(bearer?: string): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json", apikey: publishableKey() ?? "" };
  if (bearer) h.Authorization = `Bearer ${bearer}`;
  return h;
}

async function call(url: string, init: RequestInit, ms = 12_000): Promise<Response> {
  try {
    return await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(ms) });
  } catch {
    throw new BackendRefusal("server_error", 502);
  }
}

// ---------------- GoTrue ----------------

export interface VerifiedUser {
  id: string;
  email: string | null;
  emailConfirmed: boolean;
  agencyName: string | null;
}

/** Verify a session token with the identity server. Returns the user or null. */
export async function verifySession(token: string | undefined): Promise<VerifiedUser | null> {
  if (!token || token === "stub") return null;
  assertTargetOk();
  const res = await call(`${supabaseUrl()}/auth/v1/user`, { headers: gotrueHeaders(token) }, 8_000);
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new BackendRefusal("server_error", 502);
  const u = (await res.json().catch(() => null)) as { id?: string; email?: string; email_confirmed_at?: string | null; user_metadata?: { agency_name?: unknown } } | null;
  if (!u?.id || !/^[0-9a-f-]{36}$/i.test(u.id)) return null;
  const agency = u.user_metadata?.agency_name;
  return { id: u.id, email: u.email ?? null, emailConfirmed: Boolean(u.email_confirmed_at), agencyName: typeof agency === "string" ? agency.slice(0, 120) : null };
}

export async function passwordGrant(email: string, password: string): Promise<{ access_token: string; expires_in: number }> {
  assertTargetOk();
  const res = await call(`${supabaseUrl()}/auth/v1/token?grant_type=password`, { method: "POST", headers: gotrueHeaders(), body: JSON.stringify({ email, password }) }, 10_000);
  if (res.status === 400) {
    const j = (await res.json().catch(() => ({}))) as { error_code?: string; error?: string };
    throw new BackendRefusal(j.error_code === "email_not_confirmed" || j.error === "email_not_confirmed" ? "email_not_confirmed" : "invalid_grant", 400);
  }
  if (res.status === 429) throw new BackendRefusal("rate_limited", 429);
  if (!res.ok) throw new BackendRefusal("server_error", 502);
  const d = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!d.access_token) throw new BackendRefusal("server_error", 502);
  return { access_token: d.access_token, expires_in: d.expires_in ?? 3600 };
}

/**
 * GoTrue sign-up (v2 §2 registration path, step 1). Staging requires e-mail confirmation, so no
 * session is returned here; the confirmation link brings the user back with a session fragment.
 * GoTrue answers a repeated address the same way as a new one, so nothing here reveals whether
 * an account exists.
 */
export async function signUp(email: string, password: string, meta: { full_name: string; agency_name: string; language: string }, redirectTo: string | null): Promise<void> {
  assertTargetOk();
  const q = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : "";
  const res = await call(`${supabaseUrl()}/auth/v1/signup${q}`, { method: "POST", headers: gotrueHeaders(), body: JSON.stringify({ email, password, data: meta }) }, 10_000);
  if (res.status === 429) throw new BackendRefusal("rate_limited", 429);
  if (res.status === 422 || res.status === 400) {
    const j = (await res.json().catch(() => ({}))) as { error_code?: string };
    const code = j.error_code === "weak_password" ? "weak_password" : j.error_code === "signup_disabled" ? "not_available" : j.error_code === "email_address_invalid" ? "invalid_email" : "invalid_input";
    throw new BackendRefusal(code, 400);
  }
  if (!res.ok) throw new BackendRefusal("server_error", 502);
}

/** Set the password of the identity behind a (verified) invite or recovery token. */
export async function setPassword(token: string, password: string): Promise<void> {
  assertTargetOk();
  const res = await call(`${supabaseUrl()}/auth/v1/user`, { method: "PUT", headers: gotrueHeaders(token), body: JSON.stringify({ password }) }, 10_000);
  if (res.status === 401 || res.status === 403) throw new BackendRefusal("link_expired", 401);
  if (res.status === 422 || res.status === 400) throw new BackendRefusal("weak_password", 400);
  if (!res.ok) throw new BackendRefusal("server_error", 502);
}

export async function gotrueLogout(token: string): Promise<void> {
  if (environmentProblem()) return;
  await fetch(`${supabaseUrl()}/auth/v1/logout`, { method: "POST", headers: gotrueHeaders(token), cache: "no-store", signal: AbortSignal.timeout(8_000) }).catch(() => undefined);
}

// ---------------- JWT-bound edge functions (v2 §2, §3) ----------------

/** Edge error codes → the site's stable display codes. Anything unlisted: 4xx → invalid_input, 5xx → server_error. */
const EDGE_CODES: Record<string, string> = {
  missing_session: "no_session",
  invalid_session: "no_session",
  NO_SUBJECT: "no_session",
  AUTH_USER_NOT_FOUND: "no_session",
  UNRESOLVED_MEMBERSHIP: "unresolved_membership",
  UNRESOLVED_EMPLOYEE_MAPPING: "unresolved_membership",
  FORBIDDEN_MANAGE_ONBOARDING: "forbidden",
  FORBIDDEN_MANAGE_CRM: "forbidden",
  FORBIDDEN_MANAGE_BRANDING: "forbidden",
  FORBIDDEN_ADMIN_ONLY: "forbidden",
  EMAIL_NOT_CONFIRMED: "email_not_confirmed",
  MEMBERSHIP_NOT_ACTIVE: "membership_not_active",
  INVALID_AGENCY_NAME: "invalid_agency_name",
  INVALID_LANGUAGE: "invalid_input",
  INVALID_TIMEZONE: "invalid_input",
  INVALID_WIZARD_ACTION: "invalid_wizard_action",
  INVALID_WIZARD_STEP: "invalid_wizard_action",
  UNSUPPORTED_FILE_TYPE: "unsupported_file_type",
  FILE_TOO_LARGE: "file_too_large",
  CONTENT_TYPE_MISMATCH: "file_rejected",
  SIZE_MISMATCH: "file_rejected",
  INVALID_DIMENSIONS: "invalid_dimensions",
  INVALID_ASSET_KIND: "invalid_asset_kind",
  CROSS_TENANT_ASSET: "cross_tenant_asset",
  UPLOAD_NOT_ISSUED: "cross_tenant_asset",
  UPLOAD_NOT_FOUND: "upload_not_found",
  UPLOAD_NOT_PENDING: "upload_not_found",
  UPLOAD_EXPIRED: "upload_expired",
  INVALID_SIGNATURE_MAP: "invalid_input",
  INVALID_ROLE_MAP: "invalid_input",
  INVALID_VALUE: "invalid_input",
  TRIAL_NOT_FOUND: "not_available",
};

export type Json = Record<string, unknown>;

async function edge<T = Json>(slug: "tenant-api" | "branding-assets", token: string | undefined, body: Json): Promise<T> {
  assertTargetOk(); // a misconfigured target is reported as such before anything else
  if (!token || token === "stub") throw new BackendRefusal("no_session", 401);
  const res = await call(`${supabaseUrl()}/functions/v1/${slug}`, { method: "POST", headers: gotrueHeaders(token), body: JSON.stringify(body) }, 20_000);
  const j = (await res.json().catch(() => null)) as (Json & { error?: string }) | null;
  if (res.ok) return j as T;
  const raw = typeof j?.error === "string" ? j.error : "";
  const code = EDGE_CODES[raw] ?? (res.status === 401 ? "no_session" : res.status >= 500 ? "server_error" : "invalid_input");
  throw new BackendRefusal(code, res.status >= 500 ? 502 : res.status);
}

/** tenant-api (v2 §2). The tenant is the token's; no client_id is ever sent. */
export function tenantApi<T = Json>(token: string | undefined, op: string, args: Json = {}): Promise<T> {
  const { client_id: _c, ...rest } = args;
  return edge<T>("tenant-api", token, { ...rest, op });
}

/** branding-assets (v2 §3). */
export function brandingApi<T = Json>(token: string | undefined, op: string, args: Json = {}): Promise<T> {
  const { client_id: _c, ...rest } = args;
  return edge<T>("branding-assets", token, { ...rest, op });
}

export interface SessionActor {
  authorized: boolean;
  role: "agent" | "team_lead" | "office_manager" | "agency_admin" | null;
  manageUsers: boolean;
  isAdmin: boolean;
  next: "register" | "onboarding";
  email: string | null;
  emailConfirmed: boolean;
}

/** tenant-api `session`: who the token is, reduced to what the UI needs. No tenant id leaves this function. */
export async function sessionActor(token: string | undefined): Promise<SessionActor> {
  const s = await tenantApi<Json>(token, "session");
  const role = typeof s.role === "string" && ["agent", "team_lead", "office_manager", "agency_admin"].includes(s.role) ? (s.role as SessionActor["role"]) : null;
  return {
    authorized: s.authorized === true,
    role,
    manageUsers: s.manage_users === true,
    isAdmin: s.is_admin === true,
    next: s.next === "onboarding" ? "onboarding" : "register",
    email: typeof s.email === "string" ? s.email : null,
    emailConfirmed: s.email_confirmed === true,
  };
}
