import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n/config";
import { publicIndexingAllowed } from "@/lib/contracts/mode";

/**
 * Crawling follows the owner's production release (audit Z21). Without it every deployment,
 * preview or not, disallows everything and advertises no sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (!publicIndexingAllowed()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/onboarding", "/es/onboarding", "/en/connect/", "/es/connect/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
