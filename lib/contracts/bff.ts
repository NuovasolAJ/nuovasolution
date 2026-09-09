import "server-only";
import { NextResponse } from "next/server";
import { apiBase, integrationMode, STUB_HEADER } from "./mode";
import type { Envelope } from "./types";

/** Helpers shared by every BFF route. Uniform envelope, no internals leaked. */

export function envelope<T>(body: Omit<Envelope<T>, "request_id"> & { request_id?: string }, status = 200, stub = false) {
  const res = NextResponse.json({ request_id: crypto.randomUUID(), ...body, ...(stub ? { stub: true } : {}) }, { status });
  if (stub) res.headers.set(STUB_HEADER, "1");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export function fail(code: string, status: number, message = code) {
  return envelope({ ok: false, code, message }, status);
}

export function isStub() {
  return integrationMode() === "stub";
}

/** Proxy a call to the BFF target in staging mode. Never used in stub mode. */
export async function proxy(path: string, init: RequestInit & { bearer?: string } = {}) {
  const { bearer, ...rest } = init;
  const headers = new Headers(rest.headers);
  headers.set("Content-Type", "application/json");
  headers.set("apikey", process.env.SUPABASE_ANON_KEY ?? "");
  if (bearer) headers.set("Authorization", `Bearer ${bearer}`);
  const res = await fetch(`${apiBase()}${path}`, { ...rest, headers, cache: "no-store" });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { status: res.status, json };
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

export function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}
