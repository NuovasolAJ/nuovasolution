import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { integrationMode } from "@/lib/contracts/mode";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { LoginForm } from "@/components/site/auth-forms";
import { LabelChip } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.login.h1, description: d.login.lead, robots: { index: false, follow: true } };
}

/**
 * Log in. `?confirmed=1` is where the sign-up confirmation link returns (and where the sign-up
 * page sends people who confirm on another device): the page then says that a confirmed account
 * continues to the agency step after logging in. The session fragment, when present, is handled
 * by AuthFragment in the layout before this form is needed.
 */
export default function LoginPage({ params, searchParams }: { params: { locale: string }; searchParams: { confirmed?: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const stub = integrationMode() === "stub";
  const confirmed = searchParams.confirmed === "1";
  return (
    <>
    <EnvironmentRibbon locale={locale} scope="form" />
    <Section rhythm="opening" labelledBy="li-h1" className="overflow-hidden">
      <div className="container-narrow relative !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{d.login.eyebrow}</Eyebrow>
        <Display size="l" as="h1" id="li-h1">{d.login.h1}</Display>
        <Lead className="mt-4">{d.login.lead}</Lead>
        {stub && (
          <p className="mt-6 flex items-start gap-3 rounded-lg border border-line-hairline bg-surface-raised p-4 t-body-s text-text-secondary">
            <LabelChip tone="attention">{d.common.stubData}</LabelChip>
            <span>{d.login.stubNotice}</span>
          </p>
        )}
        <div className="card mt-10 rounded-xl p-6 md:p-8">
          <LoginForm locale={locale} confirmed={confirmed} />
        </div>
      </div>
    </Section>
    </>
  );
}
