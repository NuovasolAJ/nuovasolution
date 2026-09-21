import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { integrationMode } from "@/lib/contracts/mode";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, Caption } from "@/components/ui/type";
import { SignupForm } from "@/components/site/auth-forms";
import { LabelChip } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.signup.h1, description: d.signup.lead, robots: { index: false, follow: true } };
}

export default function SignupPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const stub = integrationMode() === "stub";
  return (
    <Section surface="ivory" rhythm="opening" labelledBy="su-h1">
        <EnvironmentRibbon locale={locale} scope="form" />
      <div className="container-narrow !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{d.signup.eyebrow}</Eyebrow>
        <Display size="l" as="h1" id="su-h1">{d.signup.h1}</Display>
        <Lead className="mt-4">{d.signup.lead}</Lead>
        <Caption className="mt-3">{d.common.noPayment} {d.common.noSalesCall}</Caption>
        {stub && (
          <p className="mt-6 flex items-start gap-3 border border-line-strong bg-surface-raised p-4 t-body-s text-text-secondary">
            <LabelChip tone="attention">{d.common.stubData}</LabelChip>
            <span>{d.signup.stubNotice}</span>
          </p>
        )}
        <div className="mt-10">
          <SignupForm locale={locale} />
        </div>
      </div>
    </Section>
  );
}
