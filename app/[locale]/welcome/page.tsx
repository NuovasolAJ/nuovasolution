import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasInvite } from "@/lib/contracts/server";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/type";
import { SetPasswordForm } from "@/components/site/auth-forms";
import { EnvironmentRibbon } from "@/components/site/environment-ribbon";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).welcome.h1, robots: { index: false, follow: false } };
}

/**
 * Landing for invite and recovery links. The form appears only when the server holds a verified
 * link token (httpOnly cookie set by /api/bff/auth/invite); otherwise the page says what to do.
 */
export default function WelcomePage({ params, searchParams }: { params: { locale: string }; searchParams: { state?: string } }) {
  const locale = params.locale as Locale;
  const d = getDictionary(locale);
  const w = d.welcome;
  const expired = searchParams.state === "expired";
  const ready = !expired && hasInvite();
  return (
    <>
    <EnvironmentRibbon locale={locale} scope="form" />
    <Section rhythm="opening" labelledBy="wl-h1">
      <div className="container-narrow !mx-0 xl:!mx-auto">
        <Eyebrow className="mb-4">{w.eyebrow}</Eyebrow>
        <Display size="l" as="h1" id="wl-h1">{expired ? w.expiredH1 : w.h1}</Display>
        {ready ? (
          <>
            <Lead className="mt-4">{w.lead}</Lead>
            <div className="mt-10">
              <SetPasswordForm locale={locale} />
            </div>
          </>
        ) : (
          <div className="mt-6 space-y-4" data-welcome-state={expired ? "expired" : "no_link"}>
            <p className="t-body-m text-text-secondary">{expired ? w.expiredBody : w.noLink}</p>
            {expired && <p className="t-body-m text-text-secondary">{w.expiredConfirmed}</p>}
            <Link href={localePath(locale, expired ? "/login?confirmed=1" : "/login")} className="inline-flex min-h-[44px] items-center t-body-m text-text-accent underline underline-offset-4">{w.loginInstead}</Link>
          </div>
        )}
      </div>
    </Section>
    </>
  );
}
