import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { capabilitiesByStage, stageOrder } from "@/lib/content/capabilities";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderShell } from "./header-shell";
import { StatusGlyph } from "@/components/ui/status";

/**
 * Identical on every page. Left: logo. Centre: Platform (menu), Packages, Trial, Contact.
 * Right: language, Log in, Start free.
 *
 * The Platform menu lists the published capabilities under their stage with one plain line of
 * what each does. No status chip, no audit or gate sentence (owner finding; audit R27). Stages
 * without a published capability do not appear.
 */
export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const byStage = capabilitiesByStage();

  const nav = [
    { href: localePath(locale, "/packages"), label: d.nav.packages },
    { href: localePath(locale, "/trial"), label: d.nav.trial },
    { href: localePath(locale, "/contact"), label: d.nav.contact },
  ];

  const stageLabel = d.nav.stages as Record<string, string>;
  const stages = stageOrder.filter((s) => byStage[s].length > 0);

  const platformMenu = (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,240px)_minmax(0,1fr)] xl:gap-8">
      <Link href={localePath(locale, "/platform")} className="group field-sand flex flex-col justify-between rounded-lg p-5 transition-shadow duration-control hover:shadow-card">
        <span>
          <span className="block t-heading-s text-text-primary">{d.nav.menuTitle}</span>
          <span className="mt-1 block t-body-s text-text-secondary">{d.nav.overviewLine}</span>
        </span>
        <span className="mt-6 inline-flex items-center gap-2 t-body-s text-text-primary">
          {d.nav.allCapabilities}
          <StatusGlyph glyph="arrow-right" size={14} className="transition-transform duration-micro group-hover:translate-x-0.5" />
        </span>
      </Link>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage} className="min-w-0">
            <p className="t-eyebrow text-text-muted">{stageLabel[stage]}</p>
            <ul className="mt-3 space-y-1">
              {byStage[stage].map((c) => (
                <li key={c.slug}>
                  <Link href={localePath(locale, `/platform/${c.slug}`)} className="group -mx-2 flex min-h-[44px] flex-col justify-center gap-0.5 rounded-md px-2 py-2 transition-colors duration-micro hover:bg-surface-sunken">
                    <span className="block t-body-s font-medium text-text-primary">{c.name[locale]}</span>
                    <span className="block t-caption text-text-muted">{c.navLine[locale]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
