import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { platformTasksFor } from "@/lib/content/platform-map";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "./language-switcher";
import { HeaderShell } from "./header-shell";
import { StatusGlyph } from "@/components/ui/status";
import { entryAction } from "@/lib/claims";
import { resolveSwitches } from "@/lib/view";

/**
 * Identical on every page. Left: logo. Centre: Platform (menu), Packages, Trial, Contact. Right: language, Log in,
 * Start free.
 *
 * The Platform menu (owner 2026-10-16: "Plataforma: reines Chaos, keine Struktur"): the four tasks as four words plus
 * the overview. No explanatory lines in the menu; the platform page explains each task with its entries.
 */
export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = (path: string) => localePath(locale, path);
  // Copy 1105 v3 §16 H-7: "Prueba" in the target state, "Acceso" while the trial is off
  const view = resolveSwitches().view;
  const entry = entryAction(locale, view);
  // Copy 1107 D-12: the menu names only the tasks that have an entry in this view (no empty "Captar" in public)
  const tasks = platformTasksFor(locale, view);

  const nav = [
    { href: p("/packages"), label: d.nav.packages },
    { href: p("/trial"), label: entry.nav },
    { href: p("/contact"), label: d.nav.contact },
  ];

  const item = "group flex min-h-[48px] items-center justify-between gap-4 rounded-md px-3 t-heading-s text-text-primary transition-colors duration-micro hover:bg-surface-sunken";
  const platformMenu = (
    <div className="grid gap-1" data-platform-tasks>
      {tasks.map((task) => (
        <Link key={task.key} href={p(task.href)} className={item} data-platform-task={task.key}>
          {task.short}
          <StatusGlyph glyph="arrow-right" size={14} className="text-text-muted opacity-0 transition-opacity duration-micro group-hover:opacity-100" />
        </Link>
      ))}
      <div className="mt-2 border-t border-line-hairline pt-2">
        <Link href={p("/platform")} className="flex min-h-[44px] items-center rounded-md px-3 t-body-s text-text-secondary hover:bg-surface-sunken hover:text-text-primary">{d.nav.overview}</Link>
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
      // The owner's review of 02.11. with API's claims lines: public registration is not released, so the header's one general button
      // leads to the demonstration, not to a sign-up ("Probar gratis" is not a main action).
      primary={{ href: p("/contact"), label: d.common.seeDemo }} /* Copy 1108 H-1: the header's black button is the demo request */
      account={{ href: p("/app"), label: d.nav.account }}
      logout={{ label: d.nav.logout, busy: d.nav.loggingOut }}
      home={localePath(locale)}
      labels={{ menu: d.nav.menu, close: d.nav.close }}
    />
  );
}
