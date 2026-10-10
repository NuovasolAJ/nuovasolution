import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { entryHref, platformTasks, stateWords } from "@/lib/content/platform-map";
import { proofStatesShown } from "@/lib/content/edition";
import { cn } from "@/lib/utils";
import { startLabel } from "@/lib/content/plans";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderShell } from "./header-shell";
import { StatusGlyph } from "@/components/ui/status";

/**
 * Identical on every page. Left: logo. Centre: Platform (menu), Packages, Trial, Contact.
 * Right: language, Log in, Start free.
 *
 * The Platform menu shows the platform in four tasks (owner follow-up order 2026-10-06 §4), each entry
 * with one benefit line and its state word; nothing unproven is offered as available.
 */
export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const proofStates = proofStatesShown();

  const nav = [
    { href: localePath(locale, "/packages"), label: d.nav.packages },
    { href: localePath(locale, "/trial"), label: d.nav.trial },
    { href: localePath(locale, "/contact"), label: d.nav.contact },
  ];

  // The platform in four tasks (owner follow-up order 2026-10-06 §4): every entry with its benefit line and its
  // honest state; a link only where a page exists today. The source is lib/content/platform-map.ts.
  const platformMenu = (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,220px)_minmax(0,1fr)] xl:gap-8">
      <Link href={localePath(locale, "/platform")} className="group flex flex-col justify-between rounded-lg bg-surface-sunken p-5 transition-colors duration-control hover:bg-[color:var(--sand-100)]">
        <span>
          <span className="block t-heading-s text-text-primary">{d.nav.menuTitle}</span>
          <span className="mt-1 block t-body-s text-text-secondary">{d.nav.overviewLine}</span>
        </span>
        <span className="mt-6 inline-flex items-center gap-2 t-body-s text-text-primary">
          {d.nav.allCapabilities}
          <StatusGlyph glyph="arrow-right" size={14} className="transition-transform duration-micro group-hover:translate-x-0.5" />
        </span>
      </Link>
      <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2 2xl:grid-cols-4" data-platform-tasks>
        {platformTasks.map((task) => (
          <div key={task.key} className="min-w-0" data-platform-task={task.key}>
            <p className="t-eyebrow text-text-primary">{task.title[locale]}</p>
            <p className="mt-1.5 t-caption text-text-muted">{task.line[locale]}</p>
            <ul className="mt-3 space-y-1">
              {task.entries.map((e) => {
                const href = entryHref(e);
                return (
                  <li key={e.key} data-platform-entry={e.key} data-proof={e.state}>
                    <Link href={href.startsWith("/") && !href.startsWith("/#") ? localePath(locale, href) : `${localePath(locale)}${href.slice(1)}`} className="group/entry -mx-2 flex min-h-[44px] flex-col justify-center gap-0.5 rounded-md px-2 py-1.5 transition-colors duration-micro hover:bg-surface-sunken">
                      <span className="flex items-center gap-1.5 t-body-s font-medium leading-snug text-text-primary">{e.name[locale]}<StatusGlyph glyph="arrow-right" size={12} className="text-text-muted opacity-0 transition-opacity duration-micro group-hover/entry:opacity-100" /></span>
                      <span className="block t-caption leading-snug text-text-muted">{e.line[locale]}</span>
                      {proofStates && <span className={cn("state-line mt-0.5 text-[0.6875rem]", e.state !== "available" && "text-text-muted")} data-state={e.state === "available" ? "available" : e.state === "request" ? "request" : "preparing"}>{stateWords[e.state][locale]}</span>}
                    </Link>
                  </li>
                );
              })}
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
      primary={{ href: localePath(locale, "/signup"), label: startLabel(locale) }}
      account={{ href: localePath(locale, "/app"), label: d.nav.account }}
      logout={{ label: d.nav.logout, busy: d.nav.loggingOut }}
      home={localePath(locale)}
      labels={{ menu: d.nav.menu, close: d.nav.close }}
    />
  );
}
