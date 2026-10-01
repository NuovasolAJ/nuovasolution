/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// ---- Integration mode: fixed at build time (see lib/contracts/mode.ts) ----
// stub (default) | staging (sandbox, one pinned staging target) | live (production).
// A live build is refused unless the owner's explicit release variable is set.
const MODES = ["stub", "staging", "live"];
const buildMode = process.env.NUOVA_INTEGRATION_MODE || "stub";
if (!MODES.includes(buildMode)) {
  throw new Error(`NUOVA_INTEGRATION_MODE must be one of ${MODES.join(", ")}; got "${buildMode}".`);
}
if (buildMode === "live" && process.env.NUOVA_LIVE_RELEASE !== "OWNER_RELEASED_PRODUCTION") {
  throw new Error(
    "Refusing a live build: NUOVA_LIVE_RELEASE is not set to the owner's release value. " +
      "Production is an explicit owner release, never a default.",
  );
}

// Backend storage origin. The browser talks to this site's BFF routes for everything, with one
// exception: a branding upload goes straight to a signed storage URL minted by the BFF (5 MB does
// not fit through a serverless function), and the stored logo is shown from its public URL.
// Listed only in sandbox/live builds, only as an https *.supabase.co origin.
function storageOrigin() {
  if (buildMode === "stub") return "";
  try {
    const u = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "");
    return u.protocol === "https:" && u.hostname.endsWith(".supabase.co") ? u.origin : "";
  } catch {
    return "";
  }
}
const storage = storageOrigin();

// Content Security Policy. Self plus the external services the site may use:
// Vercel Analytics (cookieless page views), the optional scheduling embed and, outside stub
// builds, the storage origin above.
// 'unsafe-inline' for scripts stays (review WR-20, accepted P2): a nonce would force every page
// into dynamic rendering. The only inline script is the one-line js-class marker in the layout.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://va.vercel-scripts.com https://app.cal.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${storage ? ` ${storage}` : ""}`,
  "font-src 'self' data:",
  `connect-src 'self' https://vitals.vercel-insights.com https://app.cal.com https://cal.com${storage ? ` ${storage}` : ""}`,
  "frame-src https://app.cal.com https://cal.com",
  "media-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Indexing is an owner release, never a default (audit Z21): every deployment without the live
// release value answers with X-Robots-Tag: noindex, in addition to the meta tag and robots.txt.
// noindex is not access control; it only keeps review links out of search results.
const indexingReleased = buildMode === "live" && process.env.NUOVA_LIVE_RELEASE === "OWNER_RELEASED_PRODUCTION";

const securityHeaders = [
  ...(indexingReleased ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Review WR-27: no includeSubDomains/preload until the owner decides it for every subdomain
  // (flows.* and others are not served by this site); preload is hard to undo.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Inlined at build into server and client code. Not a secret: it only says which
  // environment this build is, so the visible ribbon always matches the server.
  env: { NUOVA_BUILD_MODE: buildMode },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/media/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    // Locale routing without middleware (the Vercel runtime loaded Next 14's edge middleware as a
    // CommonJS function and failed, 2026-09-28). The root and the known unprefixed page paths are
    // redirected once; Accept-Language decides only between the two supported locales: Spanish
    // when the header starts with es, English otherwise. Files, API routes, Next internals, media
    // and the poster frames are never touched.
    // No lookaheads anywhere: Vercel's routing layer rejects them and answers NOT_FOUND for every path.
    const prefersEs = [{ type: "header", key: "accept-language", value: "es.*" }];
    const pages = "/:page(packages|trial|contact|signup|login|welcome|platform|onboarding|social|faq)";
    const nested = "/:section(platform|legal|social)/:slug";
    return [
      // Legacy routes from the previous site. All permanent.
      { source: "/legal-notice", destination: "/en/legal/notice", permanent: true },
      { source: "/privacy-policy", destination: "/en/legal/privacy", permanent: true },
      { source: "/aviso-legal", destination: "/es/legal/notice", permanent: true },
      { source: "/politica-privacidad", destination: "/es/legal/privacy", permanent: true },
      { source: "/live-demo", destination: "/en", permanent: true },
      { source: "/v2", destination: "/en", permanent: true },
      // Locale prefix.
      { source: "/", has: prefersEs, destination: "/es", permanent: false },
      { source: "/", destination: "/en", permanent: false },
      { source: pages, has: prefersEs, destination: "/es/:page", permanent: false },
      { source: pages, destination: "/en/:page", permanent: false },
      { source: nested, has: prefersEs, destination: "/es/:section/:slug", permanent: false },
      { source: nested, destination: "/en/:section/:slug", permanent: false },
    ];
  },
};

module.exports = nextConfig;
