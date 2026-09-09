import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilitiesByStage, stageOrder } from "@/lib/content/capabilities";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderShell } from "./header-shell";
import { StatusChip } from "@/components/ui/status";

/**
 * Identical on every page. Fixed, solid after 8 px of scroll (HeaderShell).
 * Left: logo. Centre: Platform (mega), Packages, Trial, Contact. Right: language, Log in, Start free.
 */
export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const byStage = capabilitiesByStage();

  const nav = [
    { href: localePath(locale, "/packages"), label: d.nav.packages },
    { href: localePath(locale, "/trial"), label: d.nav.trial },
    { href: localePath(locale, "/contact"), label: d.nav.contact },
  ];

  const stageLabel: Record<string, string> = {
    attract: d.nav.stages.attract,
    answer: d.nav.stages.answer,
    understand: d.nav.stages.understand,
    advance: d.nav.stages.advance,
    handover: d.nav.stages.handover,
  };

  const platformMenu = (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div>
        <Link href={localePath(locale, "/platform")} className="group block border-b border-line-hairline pb-5">
          <span className="t-heading-s text-text-primary group-hover:text-champagne-400 transition-colors duration-micro">{d.nav.overview}</span>
          <span className="mt-1 block t-body-s text-text-muted">{d.nav.overviewLine}</span>
        </Link>
      </div>
      <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {stageOrder.map((stage) => {
          const items = byStage[stage];
          if (!items.length) return null;
          return (
            <li key={stage}>
              <p className="t-eyebrow text-text-muted mb-3">{stageLabel[stage]}</p>
              <ul className="hairline-list">
                {items.map((c) => (
                  <li key={c.slug}>
                    <Link href={localePath(locale, `/platform/${c.slug}`)} className="group flex items-start justify-between gap-4 py-3">
                      <span>
                        <span className="block t-body-m text-text-primary group-hover:text-champagne-400 transition-colors duration-micro">{c.name[locale]}</span>
                        <span className="block t-caption text-text-muted">{c.navLine[locale]}</span>
                      </span>
                      <StatusChip status={c.status} locale={locale} className="mt-0.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <HeaderShell
      logo={
        <Link href={localePath(locale)} aria-label="NuovaSolution" className="inline-flex items-center">
          <Logo />
        </Link>
      }
      platformLabel={d.nav.platform}
      platformMenu={platformMenu}
      nav={nav}
      utilities={<LanguageSwitcher locale={locale} labels={{ en: d.common.english, es: d.common.spanish, group: d.common.language }} />}
      login={{ href: localePath(locale, "/login"), label: d.nav.login }}
      primary={{ href: localePath(locale, "/signup"), label: d.nav.startFree }}
      labels={{ menu: d.nav.menu, close: d.nav.close }}
    />
  );
}
