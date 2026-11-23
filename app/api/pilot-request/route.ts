import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * The pilot request's BFF route (the owner's correction order of 16.11.2026, point 1). The browser posts the form here; the route
 * validates and hands the request on to the intake API/Hosting name in the environment (`NUOVA_PILOT_INTAKE_URL`, with
 * `NUOVA_PILOT_INTAKE_TOKEN` as a bearer token — both Vercel environment values, never in the repository). Until that intake exists
 * the route answers `delivery: "simulated"`: nothing is stored, nothing is sent, nothing is logged (no personal data in any log).
 * The website runtime holds no secret key for anything else. A honeypot field (`web`) silently drops bots.
 */
type Body = { agency?: string; name?: string; email?: string; phone?: string; interest?: string; message?: string; consent?: boolean; locale?: string; web?: string };

// the owner's brief of 20.11. + Copy batch 1 §3.4: one request form with the plan's interest (trial = Essential, demo = Growth, enterprise = the conversation); the older values stay accepted
const INTERESTS = new Set(["trial", "demo", "talk", "contract", "model3d", "other", "pilot"]);
const clean = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Body;
  try { b = (await req.json()) as Body; } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  if (clean(b.web, 10)) return NextResponse.json({ ok: true, delivery: "simulated" }); // the honeypot: answer as if sent, send nothing
  const agency = clean(b.agency, 120), name = clean(b.name, 120), email = clean(b.email, 160), phone = clean(b.phone, 40), message = clean(b.message, 2000);
  const interest = INTERESTS.has(String(b.interest)) ? String(b.interest) : "other";
  const locale = b.locale === "en" ? "en" : "es";
  // 16.11. 14:00 (the owner's point 4): required are the agency, the name and e-mail OR phone; an e-mail, when given, must look like one
  const missing = [!agency && "agency", !name && "name", !email && !phone && "reach", email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && "email"].filter(Boolean) as string[];
  if (missing.length) return NextResponse.json({ ok: false, error: "missing", fields: missing }, { status: 422 });

  const url = process.env.NUOVA_PILOT_INTAKE_URL;
  const token = process.env.NUOVA_PILOT_INTAKE_TOKEN;
  // API 5c87597 F-b: "simulated" only on a preview; a production build without an intake answers an error instead of a false "Gracias"
  if (!url || !token) {
    if (process.env.VERCEL_ENV === "production") return NextResponse.json({ ok: false, error: "intake_unconfigured" }, { status: 503, headers: { "cache-control": "no-store" } });
    return NextResponse.json({ ok: true, delivery: "simulated" }, { headers: { "cache-control": "no-store" } });
  }

  try {
    // API 5c87597 F-e: the intake requires `consent` (the form's privacy notice was shown and the request sent) and takes `web` (the honeypot, empty here)
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ kind: "pilot_request", agency, name, email, phone, interest, message, locale, consent: b.consent === true, web: clean(b.web, 10), source: "website", at: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!r.ok) return NextResponse.json({ ok: false, error: "intake_failed" }, { status: 502 });
    return NextResponse.json({ ok: true, delivery: "sent" }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "intake_unreachable" }, { status: 502 });
  }
}
