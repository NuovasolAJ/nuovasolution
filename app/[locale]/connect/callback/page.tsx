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

/**
 * Shared OAuth return route (export v2 §D, AF-01). Reads only provider, status,
 * correlation and reason. Never a token. Fail-safe: anything that is not
 * status=success renders as error; reason=user_cancelled renders neutrally.
 */
export default function ConnectCallback({ params, searchParams }: { params: { locale: string }; searchParams: Record<string, string | undefined> }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale).callback;
  const provider = providerDisplayNames[searchParams.provider ?? ""] ?? (locale === "es" ? "el proveedor" : "the provider");
  const status = searchParams.status === "success" ? "success" : "error";
  const reason = searchParams.reason;

  let glyph: "check" | "clock" | "rule" | "triangle" = "triangle";
  let text = d.error;
  let tone = "text-signal-critical";
  if (status === "success") {
    glyph = "check";
    text = d.success;
    tone = "text-signal-positive";
  } else if (reason === "user_cancelled") {
    glyph = "rule";
    text = d.cancelled;
    tone = "text-text-secondary";
  } else if (reason === "externally_pending") {
    glyph = "clock";
    text = d.pending;
    tone = "text-signal-attention";
  }

  return (
    <Section rhythm="opening" labelledBy="cb-h1">
      <div className="container-narrow !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{provider}</Eyebrow>
        <Display size="l" id="cb-h1">{d.h1}</Display>
        <p role="status" className={`mt-6 flex items-start gap-3 t-body-l ${tone}`}>
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
