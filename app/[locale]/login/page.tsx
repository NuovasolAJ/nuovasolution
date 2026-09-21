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

export default function LoginPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const stub = integrationMode() === "stub";
  return (
    <Section surface="ivory" rhythm="opening" labelledBy="li-h1">
        <EnvironmentRibbon locale={locale} scope="form" />
      <div className="container-narrow !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{d.login.eyebrow}</Eyebrow>
        <Display size="l" as="h1" id="li-h1">{d.login.h1}</Display>
        <Lead className="mt-4">{d.login.lead}</Lead>
        {stub && (
          <p className="mt-6 flex items-start gap-3 border border-line-strong bg-surface-raised p-4 t-body-s text-text-secondary">
            <LabelChip tone="attention">{d.common.stubData}</LabelChip>
            <span>{d.login.stubNotice}</span>
          </p>
        )}
        <div className="mt-10">
          <LoginForm locale={locale} />
        </div>
      </div>
    </Section>
  );
}
