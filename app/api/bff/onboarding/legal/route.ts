import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { parseLegal, readProfile, readStubProfile, saveStubProfile, writeLegal } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/onboarding/legal { legal_name, tax_id, address_*, privacy_url, imprint_url?, terms_url }
 * -> tenant-api onboarding.set `legal_identity` and `legal_links` with the user's own token
 * (manage_users, checked by the edge function). Input is validated here first, because the edge
 * function reports the backend's tax-id and URL refusals only as a generic backend_error
 * (asked of API as WEB-API-2). The answer carries the legal values as the setters returned them;
 * there is no later read of them yet (WEB-API-1).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`ob-legal:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const body = await readJson(req);
  if (!body) return fail("invalid_input", 400);
  const v = parseLegal(body);
  if ("invalid" in v) return envelope({ ok: false, code: "invalid_input", message: "invalid_input", details: { field: v.invalid } }, 400);

  if (isStub()) {
    const p = readStubProfile();
    p.legal = {
      readable: true,
      legal_name: v.legal_name,
      tax_id: v.tax_id,
      address: { line: v.address_line, city: v.address_city, postal_code: v.address_postal_code, region: v.address_region, country: "ES" },
      privacy_url: v.privacy_url,
      imprint_url: v.imprint_url,
      terms_url: v.terms_url,
    };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    const legal = await writeLegal(token, v);
    const profile = await readProfile(token);
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: { ...profile, legal } } });
  } catch (e) {
    return refusal(e);
  }
}
