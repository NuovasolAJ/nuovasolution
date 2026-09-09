import { cookies } from "next/headers";
import { envelope, isStub } from "@/lib/contracts/bff";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** POST /api/bff/auth/logout. Revokes the session server-side in staging, clears cookies in both modes. */
export async function POST() {
  const jar = cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!isStub() && token && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    await fetch(`${process.env.SUPABASE_URL.replace(/\/$/, "")}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).catch(() => undefined);
  }
  jar.delete(SESSION_COOKIE);
  jar.delete(STUB_CASE_COOKIE);
  jar.delete("nuova_refresh");
  return envelope({ ok: true, code: "ok", message: "signed_out" }, 200, isStub());
}
