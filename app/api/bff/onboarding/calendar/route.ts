import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { parseCalendar, readProfile, readStubProfile, saveStubProfile, writeCalendar } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/onboarding/calendar { appointment_types[{type,minutes}], no_calendar_fallback }
 * -> tenant-api onboarding.set `calendar_policy` as the complete section (manage_users, checked by
 * the edge function). Booking policy, qualification requirements and hours keep their stored values. There is no booking-mode field: modes A/B/C/D are not defined
 * (handoff §6, BOOKING_MODE_DEFINITION_MISSING).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`ob-calendar:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const body = await readJson(req);
  if (!body) return fail("invalid_input", 400);
  const v = parseCalendar(body);
  if ("invalid" in v) return envelope({ ok: false, code: "invalid_input", message: "invalid_input", details: { field: v.invalid } }, 400);

  if (isStub()) {
    const p = readStubProfile();
    p.calendar = { ...p.calendar, ...v };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    await writeCalendar(token, v);
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: await readProfile(token) } });
  } catch (e) {
    return refusal(e);
  }
}
