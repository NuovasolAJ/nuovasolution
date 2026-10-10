import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCrmCatalog, getCrmSelection, getOnboardingBundle, type OnboardingBundle, type RegistrationBundle } from "@/lib/contracts/server";
import { loginHref, requireSession } from "@/lib/contracts/app-page";
import { integrationMode } from "@/lib/contracts/mode";
import { BackendRefusal } from "@/lib/contracts/supabase";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { StatusGlyph } from "@/components/ui/status";
import { OnboardingAreas } from "@/components/site/onboarding-areas";
import { RegisterForm } from "@/components/site/auth-forms";
import type { CrmCatalogEntry, CrmSelection } from "@/lib/contracts/types";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.onboarding.h1, robots: { index: false, follow: false } };
}

/** Authenticated surface. Rendered only from what the server read back for the verified actor. */
export default async function OnboardingPage({ params, searchParams }: { params: { locale: string }; searchParams: { case?: string } }) {
  const locale = params.locale as Locale;
  requireSession(locale, "/onboarding");
  const d = getDictionary(locale);
  const caseParam = searchParams.case ? Number(searchParams.case) : undefined;

  let bundle: OnboardingBundle | RegistrationBundle | null = null;
  let problem: string | null = null;
  try {
    bundle = await getOnboardingBundle(Number.isFinite(caseParam) ? caseParam : undefined);
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(loginHref(locale, "/onboarding", { state: "expired" }));
    problem = code;
  }

  let crm: { catalog: CrmCatalogEntry[]; selection: CrmSelection } | undefined;
  if (bundle?.kind === "member") {
    try {
      const [catalog, selection] = await Promise.all([getCrmCatalog(), getCrmSelection()]);
      crm = { catalog: catalog.data, selection };
    } catch {
      crm = undefined; // the CRM step still renders its status; the choice appears when the catalog can be read
    }
  }
  // The pre-connection notice is a DRAFT: test surfaces only (stub and staging builds).
  const noticeAllowed = integrationMode() !== "live";

  return (
    <>
    <EnvironmentRibbon locale={locale} scope="form" />
    <Section rhythm="opening" labelledBy="ob-h1" className="!pb-8">
      <div className="container-default">
        <div className="xl:max-w-[62%]">
          <Eyebrow className="mb-4">{d.onboarding.eyebrow}</Eyebrow>
          <Display size="l" as="h1" id="ob-h1">{d.onboarding.h1}</Display>
          <Lead className="mt-4">{d.onboarding.lead}</Lead>
        </div>
      </div>
    </Section>
    {/* The five areas on the shared sand ground (layer 1), each a white stage (layer 2). */}
    <div className="band band-sand band-shoulders">
      <div className="container-default pb-24 pt-8 md:pt-10">
        {bundle?.kind === "register" ? (
          <div className="stage p-6 md:p-8 xl:max-w-[62%]" data-onboarding-register>
            <h2 className="t-heading-l text-text-primary">{d.onboarding.register.heading}</h2>
            <p className="mt-2 t-body-s text-text-secondary measure-body">{d.onboarding.register.lead}</p>
            <div className="mt-8">
              <RegisterForm locale={locale} agencyNameHint={bundle.agencyNameHint} />
            </div>
          </div>
        ) : bundle ? (
          <OnboardingAreas locale={locale} state={bundle.state} trial={bundle.trial} readiness={bundle.readiness} stub={bundle.stub} crm={crm} noticeAllowed={noticeAllowed} profile={bundle.profile} role={bundle.role} />
        ) : (
          <p role="alert" data-onboarding-problem={problem ?? ""} className="stage flex items-start gap-2 p-5 t-body-m text-text-secondary">
            <StatusGlyph glyph="triangle" className="mt-1 shrink-0 text-signal-attention" />
            {(d.common.errors as Record<string, string>)[problem ?? "generic"] ?? d.common.errors.generic}
          </p>
        )}
      </div>
    </div>
    </>
  );
}
