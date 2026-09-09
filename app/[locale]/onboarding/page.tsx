import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getOnboardingState, getTrialState, hasSession } from "@/lib/contracts/server";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { OnboardingWizard } from "@/components/site/onboarding-wizard";
import type { TrialState } from "@/lib/contracts/types";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.onboarding.h1, robots: { index: false, follow: false } };
}

/** Authenticated surface. Rendered only from the readiness contract. */
export default async function OnboardingPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  if (!hasSession()) redirect(localePath(locale, "/login"));
  const d = getDictionary(locale);
  const caseParam = searchParams.case ? Number(searchParams.case) : undefined;
  const { data: state, stub } = await getOnboardingState(Number.isFinite(caseParam) ? caseParam : undefined);
  let trial: TrialState | null = null;
  try {
    trial = (await getTrialState()).data;
  } catch {
    trial = null;
  }

  return (
    <Section rhythm="opening" labelledBy="ob-h1">
      <div className="container-default">
        <div className="xl:max-w-[62%]">
          <Eyebrow className="mb-4">{d.onboarding.eyebrow}</Eyebrow>
          <Display size="l" id="ob-h1">{d.onboarding.h1}</Display>
          <Lead className="mt-4">{d.onboarding.lead}</Lead>
        </div>
        <div className="mt-12">
          <OnboardingWizard locale={locale} state={state} trial={trial} stub={stub} />
        </div>
      </div>
    </Section>
  );
}
