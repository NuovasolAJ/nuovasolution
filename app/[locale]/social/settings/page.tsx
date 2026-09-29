import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { loadSocial } from "@/lib/contracts/social-page";
import { SettingsScreen, SocialShell } from "@/components/site/social-views";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).social.settings.h1, robots: { index: false, follow: false } };
}

/** Screen D (SOCIAL_UI_SPEC_v1 §2): the connection, and how stored data is deleted. */
export default async function SocialSettingsPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  const { state, problem } = await loadSocial(locale, "settings", searchParams.case);
  return (
    <SocialShell locale={locale} screen="settings" state={state} problem={problem}>
      {state && <SettingsScreen locale={locale} state={state} />}
    </SocialShell>
  );
}
