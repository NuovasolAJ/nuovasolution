import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/onboarding", "/es/onboarding", "/en/connect/", "/es/connect/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
