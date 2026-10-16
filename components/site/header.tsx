import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { platformTasks } from "@/lib/content/platform-map";
import { todayWords } from "@/lib/content/today";
import { startLabel } from "@/lib/content/plans";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderShell } from "./header-shell";
import { StatusGlyph } from "@/components/ui/status";

/**
 * Identical on every page. Left: logo. Centre: Platform (menu), Packages, Trial, Contact. Right: language, Log in,
 * Start free.
 *
 * The Platform menu (DESIGN.md, owner 2026-10-16 "Plataforma: reines Chaos"): four tasks, one word each, plus the
 * overview and the page of product truth. No explanatory lines in the menu; the pages explain.
 */
export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);

  const nav = [
    { href: p("/packages"), label: d.nav.packages },
    { href: p("/trial"), label: d.nav.trial },
    { href: p("/contact"), label: d.nav.contact },
  ];

  const item = "group flex min-h-[48px] items-center justify-between gap-4 rounded-md px-3 t-heading-s text-text-primary transition-colors duration-micro hover:bg-surface-sunken";
  const platformMenu = (
    <div className="grid gap-1" data-platform-tasks>
      {platformTasks.map((task) => (
        <Link key={task.key} href={p(task.href)} className={item} data-platform-task={task.key}>
          {task.short[locale]}
          <StatusGlyph glyph="arrow-right" size={14} className="text-text-muted opacity-0 transition-opacity duration-micro group-hover:opacity-100" />
        </Link>
      ))}
      <div className="mt-2 border-t border-line-hairline pt-2">
        <Link href={p("/platform")} className="flex min-h-[44px] items-center rounded-md px-3 t-body-s text-text-secondary hover:bg-surface-sunken hover:text-text-primary">{d.nav.overview}</Link>
        <Link href={p("/hoy")} className="flex min-h-[44px] items-center rounded-md px-3 t-body-s text-text-secondary hover:bg-surface-sunken hover:text-text-primary">{todayWords.h1[locale]}</Link>
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
      login={{ href: p("/login"), label: d.nav.login }}
      primary={{ href: p("/signup"), label: startLabel(locale) }}
      account={{ href: p("/app"), label: d.nav.account }}
      logout={{ label: d.nav.logout, busy: d.nav.loggingOut }}
      home={localePath(locale)}
      labels={{ menu: d.nav.menu, close: d.nav.close }}
    />
  );
}
