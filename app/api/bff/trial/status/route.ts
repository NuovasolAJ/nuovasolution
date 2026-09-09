import { cookies } from "next/headers";
import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { trialStub } from "@/lib/contracts/stubs";
import { SESSION_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** GET /api/bff/trial/status. The server is the single source of truth for days_left and trial_end. */
export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: trialStub }, 200, true);
  const { status, json } = await proxy("/trial/status", { bearer: token });
  if (status === 401) return fail("no_session", 401);
  if (!json) return fail("server_error", 502);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
