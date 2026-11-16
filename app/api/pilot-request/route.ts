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

const INTERESTS = new Set(["pilot", "model3d", "other"]);
const clean = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Body;
  try { b = (await req.json()) as Body; } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  if (clean(b.web, 10)) return NextResponse.json({ ok: true, delivery: "simulated" }); // the honeypot: answer as if sent, send nothing
  const agency = clean(b.agency, 120), name = clean(b.name, 120), email = clean(b.email, 160), phone = clean(b.phone, 40), message = clean(b.message, 2000);
  const interest = INTERESTS.has(String(b.interest)) ? String(b.interest) : "pilot";
  const locale = b.locale === "en" ? "en" : "es";
  const missing = [!agency && "agency", !name && "name", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && "email", b.consent !== true && "consent"].filter(Boolean) as string[];
  if (missing.length) return NextResponse.json({ ok: false, error: "missing", fields: missing }, { status: 422 });

  const url = process.env.NUOVA_PILOT_INTAKE_URL;
  const token = process.env.NUOVA_PILOT_INTAKE_TOKEN;
  if (!url || !token) return NextResponse.json({ ok: true, delivery: "simulated" }, { headers: { "cache-control": "no-store" } });

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ kind: "pilot_request", agency, name, email, phone, interest, message, locale, source: "website", at: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!r.ok) return NextResponse.json({ ok: false, error: "intake_failed" }, { status: 502 });
    return NextResponse.json({ ok: true, delivery: "sent" }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "intake_unreachable" }, { status: 502 });
  }
}
