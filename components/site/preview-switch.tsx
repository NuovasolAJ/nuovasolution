"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { switchQuery, type PreviewSwitches } from "@/lib/view-query";
import { cn } from "@/lib/utils";

/**
 * The preview's switches (the owner's verdict of 06.11.2026): the view (target state / public), the palette (A · B · C) and the
 * headline face (Inter / Fraunces) as plain links that set the page's search parameters; the middleware remembers them in cookies
 * (so they hold on every link of the site) and the server reads them (lib/view.ts). Rendered only on preview builds, never on a
 * live build. The notice line itself is the preview band's (Copy §14).
 */
const WORDS = {
  es: { view: "Vista", target: "Objetivo", pub: "Público", palette: "Paleta", display: "Titulares", inter: "Inter", fraunces: "Fraunces", hint: "Solo en la vista previa" },
  en: { view: "View", target: "Target", pub: "Public", palette: "Palette", display: "Headlines", inter: "Inter", fraunces: "Fraunces", hint: "Preview only" },
};

export function PreviewSwitch({ locale, switches }: { locale: Locale; switches: PreviewSwitches }) {
  const w = WORDS[locale];
  const pathname = usePathname();
  // every link names its value outright (the middleware turns it into the cookie), so a choice can also be undone
  const link = (patch: Parameters<typeof switchQuery>[1]) => {
    const n = { ...switches, ...patch };
    return `${pathname}?view=${n.view}&palette=${n.palette}&display=${n.display}`;
  };
  const Opt = ({ on, href, label, name }: { on: boolean; href: string; label: string; name: string }) => (
    <a href={href} className={cn("pv-opt", on && "is-on")} aria-current={on ? "true" : undefined} data-preview-switch={name}>{label}</a>
  );

  // H2 (09.11.): on a narrow window the row folds behind one small button, so the first screen is the page's own
  const [open, setOpen] = useState(false);
  return (
    <div className="pv" data-preview-switches data-view={switches.view} data-palette={switches.palette} data-display={switches.display} data-pv-open={open ? "true" : "false"}>
      <button type="button" className="pv-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)} data-pv-toggle>{w.hint} {open ? "−" : "+"}</button>
      <div className="container-default pv-row">
        <span className="pv-hint">{w.hint}</span>
        <span className="pv-group" role="group" aria-label={w.view}>
          <span className="pv-name">{w.view}</span>
          <Opt on={switches.view === "target"} href={link({ view: "target" })} label={w.target} name="view-target" />
          <Opt on={switches.view === "public"} href={link({ view: "public" })} label={w.pub} name="view-public" />
        </span>
        <span className="pv-group" role="group" aria-label={w.palette}>
          <span className="pv-name">{w.palette}</span>
          <Opt on={switches.palette === "a"} href={link({ palette: "a" })} label="A" name="palette-a" />
          <Opt on={switches.palette === "b"} href={link({ palette: "b" })} label="B" name="palette-b" />
          <Opt on={switches.palette === "c"} href={link({ palette: "c" })} label="C" name="palette-c" />
          <Opt on={switches.palette === "d"} href={link({ palette: "d" })} label="D" name="palette-d" />
          <Opt on={switches.palette === "e"} href={link({ palette: "e" })} label="E" name="palette-e" />
        </span>
        <span className="pv-group" role="group" aria-label={w.display}>
          <span className="pv-name">{w.display}</span>
          <Opt on={switches.display === "inter"} href={link({ display: "inter" })} label={w.inter} name="display-inter" />
          <Opt on={switches.display === "fraunces"} href={link({ display: "fraunces" })} label={w.fraunces} name="display-fraunces" />
        </span>
      </div>
    </div>
  );
}
