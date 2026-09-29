import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { loadSocial } from "@/lib/contracts/social-page";
import { InboxScreen, SocialShell } from "@/components/site/social-views";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).social.inbox.h1, robots: { index: false, follow: false } };
}

/** Screen C (SOCIAL_UI_SPEC_v1 §2): comments and messages that arrived. There is no field for a first message. */
export default async function SocialInboxPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string; tab?: string } }) {
  const locale = params.locale as Locale;
  const { state, problem } = await loadSocial(locale, "inbox", searchParams.case);
  return (
    <SocialShell locale={locale} screen="inbox" state={state} problem={problem}>
      {state && <InboxScreen locale={locale} state={state} tab={searchParams.tab === "messages" ? "messages" : "comments"} />}
    </SocialShell>
  );
}
