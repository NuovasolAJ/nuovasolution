import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n/config";
import { integrationMode, publicIndexingAllowed } from "@/lib/contracts/mode";

/**
 * Crawling follows the owner's production release (audit Z21). Without it every deployment,
 * preview or not, disallows everything and advertises no sitemap.
 *
 * One exception, asked for by the owner on 2026-10-05: the DESIGN preview (stub build, demonstration
 * data only) may be opened by an assistant on a person's request, so the owner can show the page to
 * ChatGPT and the like. These are the agents that fetch one page because a user pasted its address;
 * they are not search crawlers. Search and training crawlers stay shut out by the `*` group, and every
 * page keeps `noindex, nofollow` in its header and its meta tag, so nothing is listed anywhere.
 * The staging preview and every other deployment are unchanged.
 */
const READER_AGENTS = ["ChatGPT-User", "Claude-User", "Perplexity-User"];

function isDesignPreview(): boolean {
  const host = `${process.env.VERCEL_URL ?? ""} ${process.env.VERCEL_BRANCH_URL ?? ""}`;
  return integrationMode() === "stub" && host.includes("nuovasolution-design-preview");
}

export default function robots(): MetadataRoute.Robots {
  if (!publicIndexingAllowed()) {
    const closed = { userAgent: "*", disallow: "/" };
    return { rules: isDesignPreview() ? [{ userAgent: READER_AGENTS, allow: "/", disallow: "/api/" }, closed] : [closed] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/onboarding", "/es/onboarding", "/en/connect/", "/es/connect/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
