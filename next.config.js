/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// Content Security Policy. Self plus the two external services the site may use:
// Vercel Analytics (cookieless page views) and the optional scheduling embed.
// No backend host is listed here: the browser only ever talks to this site's own BFF routes.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://va.vercel-scripts.com https://app.cal.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://app.cal.com https://cal.com",
  "frame-src https://app.cal.com https://cal.com",
  "media-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    // Legacy routes from the previous site. All permanent.
    return [
      { source: "/legal-notice", destination: "/en/legal/notice", permanent: true },
      { source: "/privacy-policy", destination: "/en/legal/privacy", permanent: true },
      { source: "/aviso-legal", destination: "/es/legal/notice", permanent: true },
      { source: "/politica-privacidad", destination: "/es/legal/privacy", permanent: true },
      { source: "/live-demo", destination: "/en", permanent: true },
      { source: "/v2", destination: "/en", permanent: true },
    ];
  },
};

module.exports = nextConfig;
