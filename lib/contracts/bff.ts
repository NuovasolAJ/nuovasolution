import "server-only";
import { NextResponse } from "next/server";
import { integrationMode, MODE_HEADER, STUB_HEADER, stubSurfacesAllowed } from "./mode";
import { BackendRefusal } from "./supabase";
import type { Envelope } from "./types";

/** Helpers shared by every BFF route. Uniform envelope, no internals leaked. */

export function envelope<T>(body: Omit<Envelope<T>, "request_id"> & { request_id?: string }, status = 200, stub = false) {
  const res = NextResponse.json({ request_id: crypto.randomUUID(), ...body, ...(stub ? { stub: true } : {}) }, { status });
  if (stub) res.headers.set(STUB_HEADER, "1");
  res.headers.set(MODE_HEADER, integrationMode());
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export function fail(code: string, status: number, message = code) {
  return envelope({ ok: false, code, message }, status);
}

export function isStub() {
  return integrationMode() === "stub";
}

/** A stub account surface in a public production deployment: refuse, never fake (review WR-06). */
export function stubRefused(): boolean {
  return isStub() && !stubSurfacesAllowed();
}

/**
 * Resolve a post-login destination safely (review WR-05). Only same-origin paths
 * under a locale prefix are accepted; backslash, tab and protocol-relative tricks
 * are normalised by the URL parser first and then rejected on origin.
 */
export function safeNextPath(next: string | null, origin: string, fallback: string): string {
  if (!next) return fallback;
  try {
    const u = new URL(next, origin);
    if (u.origin !== origin) return fallback;
    if (!/^\/(en|es)(\/|$)/.test(u.pathname)) return fallback;
    return `${u.pathname}${u.search}`;
  } catch {
    return fallback;
  }
}

/**
 * The surface exists and is wired as far as a written contract reaches, but
 * the backend contract for this call has not been delivered yet
 * (governance/WEBSITE_HANDOFF_v1.md). Honest, never a fake success.
 */
export function awaitingContract(contract: string) {
  return envelope({ ok: false, code: "awaiting_contract", message: "awaiting_contract", details: { contract } }, 501);
}

/** Map a thrown backend refusal to the uniform envelope. Anything else is a server_error. */
export function refusal(e: unknown) {
  if (e instanceof BackendRefusal) return fail(e.code, e.status);
  return fail("server_error", 500);
}

const buckets = new Map<string, { n: number; reset: number }>();
/**
 * In-memory rate limit per key. Honest limitation: serverless instances do not
 * share memory, so this is a first line of defence, not the only one. The
 * backend applies its own limits.
 */
export function rateLimited(key: string, max = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  b.n += 1;
  return b.n > max;
}

/**
 * Rate-limit key (review WR-23). Only headers the platform sets itself are trusted:
 * a client-supplied X-Forwarded-For first entry is spoofable and would let one caller
 * rotate through buckets. Off-platform (local) every caller shares one bucket.
 */
export function clientKey(req: Request): string {
  return req.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

/** Parse a JSON body of bounded size. Returns null when absent, oversized or malformed. */
export async function readJson<T = Record<string, unknown>>(req: Request, maxBytes = 16_384): Promise<T | null> {
  const text = await req.text().catch(() => "");
  if (!text || text.length > maxBytes) return null;
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as T) : null;
  } catch {
    return null;
  }
}

/** Same-origin check for state-changing BFF calls (defence in depth next to SameSite cookies). */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from older browsers and server-side calls
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}
