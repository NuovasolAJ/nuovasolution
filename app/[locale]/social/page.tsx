import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { loadSocial } from "@/lib/contracts/social-page";
import { ConnectScreen, SocialShell } from "@/components/site/social-views";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).social.connect.h1, robots: { index: false, follow: false } };
}

/** Screen A (SOCIAL_UI_SPEC_v1 §2). Authenticated; rendered from what the server read for the signed-in user. */
export default async function SocialConnectPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  const { state, problem } = await loadSocial(locale, "connect", searchParams.case);
  return (
    <SocialShell locale={locale} screen="connect" state={state} problem={problem}>
      {state && <ConnectScreen locale={locale} state={state} />}
    </SocialShell>
  );
}
