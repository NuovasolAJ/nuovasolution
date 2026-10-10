import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { integrationMode } from "@/lib/contracts/mode";
import { hasSession } from "@/lib/contracts/server";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { LoginForm } from "@/components/site/auth-forms";
import { LabelChip } from "@/components/ui/status";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  return { title: d.login.h1, description: d.login.lead, robots: { index: false, follow: true } };
}

/** Only a same-origin locale path may be a destination (review WR-05); anything else falls back to the agency home. */
function safeNext(next: string | undefined, locale: Locale): string {
  const fallback = localePath(locale, "/app");
  if (!next) return fallback;
  return /^\/(en|es)(\/[A-Za-z0-9\-_/]*)?(\?[A-Za-z0-9=&%\-_.]*)?$/.test(next) && !next.startsWith("//") ? next : fallback;
}

/**
 * Log in. `?confirmed=1` is where the sign-up confirmation link returns; `?next=` is the surface that sent the
 * person here (AUTHENTICATED_SURFACE_SYSTEM §5.4): after the login they return there, not to the wizard. A
 * visitor who already has a session is sent on at once. `?state=expired` says that the previous session ended.
 */
export default function LoginPage({ params, searchParams }: { params: { locale: string }; searchParams: { confirmed?: string; next?: string; state?: string } }) {
  const locale = params.locale as Locale;
  const next = safeNext(searchParams.next, locale);
  if (hasSession() && searchParams.state !== "expired") redirect(next);
  const d = getDictionary(locale);
  const stub = integrationMode() === "stub";
  const confirmed = searchParams.confirmed === "1";
  return (
    <>
    <EnvironmentRibbon locale={locale} scope="form" />
    <Section rhythm="opening" labelledBy="li-h1" className="overflow-hidden !pb-[var(--section-compact)]">
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
      </div>
    </Section>
    {/* The form is the one white stage of the page, on the sand ground (accepted direction, 2026-09-30). */}
    <div className="band band-sand band-shoulders">
      <div className="container-narrow relative !mx-0 pb-[var(--section-default)] pt-[var(--section-compact)] xl:!mx-auto">
        <div className="stage p-6 md:p-8">
          {searchParams.state === "expired" && <p role="status" className="mb-6 rounded-md bg-apricot-100 px-4 py-3 t-body-s text-text-primary" data-session-expired>{d.common.errors.no_session}</p>}
          <LoginForm locale={locale} confirmed={confirmed} next={next} />
        </div>
      </div>
    </div>
    </>
  );
}
