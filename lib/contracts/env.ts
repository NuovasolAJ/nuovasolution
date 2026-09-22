import "server-only";

/**
 * Backend configuration, read on the server only. Names follow WEBSITE_HANDOFF_v2 §0.
 *
 * | name                            | key type                          | used by                                   |
 * |---------------------------------|-----------------------------------|-------------------------------------------|
 * | NEXT_PUBLIC_SUPABASE_URL        | project base URL (not a secret)   | server; its origin is in the CSP for the  |
 * |                                 |                                   | direct signed branding upload             |
 * | NEXT_PUBLIC_SUPABASE_ANON_KEY   | PUBLISHABLE key `sb_publishable_` | server only: GoTrue and the `apikey`      |
 * |                                 |                                   | header towards tenant-api/branding-assets |
 *
 * There is NO secret key in the website. Every user action is authorized by the user's own
 * access token, forwarded to the JWT-bound edge functions (v2 §0). A configured
 * SUPABASE_SERVICE_ROLE_KEY is refused at runtime, so one cannot creep back in unnoticed.
 *
 * The browser never calls Supabase: neither variable is referenced from client code, so despite
 * the contract's NEXT_PUBLIC_ prefix neither is inlined into a bundle (checked per build).
 * The earlier server-only names SUPABASE_URL / SUPABASE_ANON_KEY are read as a fallback.
 * A legacy JWT key (`eyJ…`) is refused.
 */

/**
 * Runtime read by computed name. Next.js replaces literal `process.env.NEXT_PUBLIC_*` expressions at
 * BUILD time, in server code too; a computed lookup keeps these values runtime configuration.
 */
function runtimeEnv(name: string): string {
  const env: Record<string, string | undefined> = process.env;
  return env[name] ?? "";
}

export function supabaseUrl(): string | null {
  const v = runtimeEnv(["NEXT_PUBLIC", "SUPABASE_URL"].join("_")) || process.env.SUPABASE_URL || "";
  return v ? v.replace(/\/$/, "") : null;
}

export function publishableKey(): string | null {
  const v = runtimeEnv(["NEXT_PUBLIC", "SUPABASE_ANON_KEY"].join("_")) || process.env.SUPABASE_ANON_KEY || "";
  return v || null;
}

/** Null when the key configuration is valid; otherwise a stable code. Never logs a value. */
export function keyTypeProblem(): string | null {
  const pub = publishableKey();
  if (!pub) return "publishable_key_missing";
  if (!pub.startsWith("sb_publishable_")) return "publishable_key_wrong_type";
  if (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY) return "secret_key_not_allowed";
  return null;
}
