import { NextResponse, type NextRequest } from "next/server";

/**
 * Two things for the preview deployments, nothing on a live build (the build mode is inlined by next.config.js):
 *
 * 1 The preview's protection (the owner's line VORSCHAU-SCHUTZ = JA, 06.11.2026; the Reviewer's six properties in
 *   REVIEWER_TO_REDESIGN_1106_VORSCHAU_SCHUTZ_v1.md §2). Once `PREVIEW_ACCESS_CODE` is set in the project's environment (Vercel,
 *   Preview), every path of a preview deployment is behind it: the pages, the API routes incl. /api/build, the media, the icons,
 *   the sitemap (only Next's hashed build files under /_next/ stay open; they carry no page). Two ways in, both setting the same
 *   cookie (the SHA-256 of the secret, never the secret):
 *     the owner: the access code typed once into the small gate page on the phone, or `?acceso=<code>` on any link;
 *     the Reviewer's probes: the header `x-vercel-protection-bypass: <secret>` (`PREVIEW_BYPASS_SECRET`) on every request, or the
 *     same secret once as `?x-vercel-protection-bypass=<secret>`; `x-vercel-set-bypass-cookie: true` (or the query form) sets the
 *     cookie so every subresource that follows is open.
 *   With the cookie or the header present the first response is the real page: no interstitial, no redirect, no banner. The
 *   secrets never stand in the browser or the repository (they live in C:\Users\Usuario\.nuova-secrets\ and in Vercel's env).
 *   `noindex` stays on top (the layout's robots meta and X-Robots-Tag; the gate page carries it too).
 *
 * 2 The preview switches (lib/view.ts): `?view=`, `?palette=` and `?display=` are remembered in cookies and handed to the request
 *   as headers, so a choice holds across the site's links and the layout (the header's "Prueba" / "Acceso") follows it too. Both
 *   views stay separately reachable behind the protection.
 */
const LIVE = process.env.NUOVA_BUILD_MODE === "live";
const GATE_COOKIE = "nuova-acceso";
const BYPASS_HEADER = "x-vercel-protection-bypass";
const SET_COOKIE_HEADER = "x-vercel-set-bypass-cookie";
const SWITCHES = [
  { param: "view", cookie: "nuova-view", header: "x-nuova-view", allowed: ["target", "public"] },
  { param: "palette", cookie: "nuova-palette", header: "x-nuova-palette", allowed: ["a", "b", "c"] },
  { param: "display", cookie: "nuova-display", header: "x-nuova-display", allowed: ["inter", "fraunces"] },
] as const;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function gatePage(locale: string, wrong: boolean): NextResponse {
  const es = locale !== "en";
  const words = es
    ? { title: "Vista previa de NuovaSolution", lead: "Esta vista previa no es pública. Introduce el código de acceso.", label: "Código de acceso", button: "Entrar", wrong: "El código no es correcto." }
    : { title: "NuovaSolution preview", lead: "This preview is not public. Enter the access code.", label: "Access code", button: "Enter", wrong: "The code is not correct." };
  const html = `<!doctype html><html lang="${es ? "es" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${words.title}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f5f7;color:#0e0e0f;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}form{width:min(420px,calc(100vw - 32px));padding:28px;border-radius:20px;background:#fff;border:1px solid rgba(14,14,15,.09);box-shadow:0 22px 52px -26px rgba(26,25,23,.28)}h1{margin:0 0 6px;font-size:1.25rem;font-weight:600}p{margin:0 0 18px;color:#45454a;font-size:.9375rem;line-height:1.5}label{display:block;font-size:.8125rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#5b5b61;margin-bottom:6px}input{width:100%;box-sizing:border-box;min-height:48px;padding:10px 14px;border-radius:12px;border:1px solid #c7c7cc;font:inherit;font-size:1.0625rem}button{margin-top:14px;width:100%;min-height:48px;border:0;border-radius:999px;background:#0e0e0f;color:#fff;font:inherit;font-size:1rem;font-weight:600}.err{margin:10px 0 0;color:#b4302a;font-size:.875rem}</style></head>
<body><form method="get"><h1>${words.title}</h1><p>${words.lead}</p><label for="acceso">${words.label}</label><input id="acceso" name="acceso" type="password" autocomplete="one-time-code" autofocus required>${wrong ? `<p class="err">${words.wrong}</p>` : ""}<button type="submit">${words.button}</button></form></body></html>`;
  return new NextResponse(html, { status: 401, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
}

export async function middleware(req: NextRequest) {
  if (LIVE) return NextResponse.next();
  const url = req.nextUrl;
  const locale = url.pathname.startsWith("/en") ? "en" : "es";
  const code = process.env.PREVIEW_ACCESS_CODE;
  const bypass = process.env.PREVIEW_BYPASS_SECRET;
  const isPage = !/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !url.pathname.startsWith("/api/");
  let setGate: string | null = null;

  // 1 the gate
  if (code) {
    const want = await sha256(code);
    const wantBypass = bypass ? await sha256(bypass) : null;
    const cookie = req.cookies.get(GATE_COOKIE)?.value;
    const has = cookie === want || (wantBypass !== null && cookie === wantBypass);
    if (!has) {
      const givenBypass = req.headers.get(BYPASS_HEADER) ?? url.searchParams.get(BYPASS_HEADER);
      const givenCode = url.searchParams.get("acceso");
      if (bypass && givenBypass === bypass) {
        if (req.headers.get(SET_COOKIE_HEADER) === "true" || url.searchParams.has(BYPASS_HEADER)) setGate = wantBypass;
      } else if (givenCode === code) {
        setGate = want;
      } else if (!isPage) {
        return new NextResponse("Unauthorized", { status: 401, headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
      } else {
        return gatePage(locale, givenCode !== null || givenBypass !== null);
      }
    }
  }

  // 2 the switches: from the search parameters, else from the cookies; written back as cookies and handed on as headers
  const reqHeaders = new Headers(req.headers);
  const cookiesToSet: { name: string; value: string }[] = [];
  let clean = false;
  for (const s of SWITCHES) {
    const fromParam = url.searchParams.get(s.param);
    const fromCookie = req.cookies.get(s.cookie)?.value;
    const value = fromParam && (s.allowed as readonly string[]).includes(fromParam) ? fromParam : fromCookie && (s.allowed as readonly string[]).includes(fromCookie) ? fromCookie : s.allowed[0];
    reqHeaders.set(s.header, value);
    if (fromParam !== null) cookiesToSet.push({ name: s.cookie, value });
  }
  // the secrets never stay in the address bar: the clean address is loaded once the cookie is set
  for (const p of ["acceso", BYPASS_HEADER]) if (url.searchParams.has(p)) { url.searchParams.delete(p); clean = true; }

  const res = clean && isPage ? NextResponse.redirect(url, 303) : NextResponse.next({ request: { headers: reqHeaders } });
  const cookieOpts = { path: "/", sameSite: "lax" as const, httpOnly: true, secure: url.protocol === "https:", maxAge: 60 * 60 * 24 * 30 };
  if (setGate) res.cookies.set(GATE_COOKIE, setGate, cookieOpts);
  for (const c of cookiesToSet) res.cookies.set(c.name, c.value, cookieOpts);
  return res;
}

export const config = {
  // everything but Next's own hashed build files: the pages, the API routes, the media, the icons, the sitemap
  matcher: ["/((?!_next/static|_next/image).*)"],
};
