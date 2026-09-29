import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { loadSocial } from "@/lib/contracts/social-page";
import { PostScreen, SocialShell } from "@/components/site/social-views";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).social.post.h1, robots: { index: false, follow: false } };
}

/** Screen B (SOCIAL_UI_SPEC_v1 §2): listings with their publication readiness, and the posts. */
export default async function SocialPostPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  const { state, problem } = await loadSocial(locale, "post", searchParams.case);
  return (
    <SocialShell locale={locale} screen="post" state={state} problem={problem}>
      {state && <PostScreen locale={locale} state={state} />}
    </SocialShell>
  );
}
