import type { Metadata } from "next";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { providerDisplayNames } from "@/lib/contracts/types";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow } from "@/components/ui/type";
import { ButtonLink } from "@/components/ui/button";
import { StatusGlyph } from "@/components/ui/status";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).callback.h1, robots: { index: false, follow: false } };
}

/** Error reasons that have their own wording (PRODUCT_TEXTS_C2_v1 §2.2). Everything else is "unknown". */
const REASONS = ["user_cancelled", "access_denied", "state_expired", "state_mismatch", "state_invalid", "wrong_account", "provider_error"] as const;
type Reason = (typeof REASONS)[number];

/**
 * Shared OAuth return route (export v2 §D, AF-01).
 *
 * The query string is a HINT, never proof. Anyone can type status=success into a
 * URL, so this page never renders "connected" from the query (review WR-09). A
 * connection is shown as connected only on the onboarding page, from the server's
 * own status read. Today no external provider is connectable at all (CRM catalog:
 * coming_soon, fenced), so a "success" hint renders the honest unknown outcome.
 *
 * Reads only provider, status and reason. Never a token. Unknown provider names are
 * never echoed back: only catalogued display names render.
 */
export default function ConnectCallback({ params, searchParams }: { params: { locale: string }; searchParams: Record<string, string | undefined> }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale).callback;
  const provider = providerDisplayNames[searchParams.provider ?? ""] ?? d.providerFallback;
  const raw = searchParams.reason === "state_replay" ? "state_invalid" : searchParams.reason;
  const reason: Reason | "unknown" =
    searchParams.status === "error" && raw && (REASONS as readonly string[]).includes(raw) ? (raw as Reason) : "unknown";

  const neutral = reason === "user_cancelled" || reason === "state_expired";
  const glyph = neutral ? "rule" : "triangle";
  const tone = neutral ? "text-text-secondary" : reason === "unknown" ? "text-signal-attention" : "text-signal-critical";
  const text = d[reason].replaceAll("{provider}", provider);

  return (
    <Section rhythm="opening" labelledBy="cb-h1">
      <div className="container-narrow !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{provider}</Eyebrow>
        <Display size="l" as="h1" id="cb-h1">{d.h1}</Display>
        <p role="status" data-callback-reason={reason} className={`mt-6 flex items-start gap-3 t-body-l ${tone}`}>
          <StatusGlyph glyph={glyph} className="mt-1.5 shrink-0" />
          {text}
        </p>
        <div className="mt-10">
          <ButtonLink href={localePath(locale, "/onboarding")} variant="secondary">{d.back}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
