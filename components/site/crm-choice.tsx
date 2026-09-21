"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CrmCatalogEntry, CrmSelection } from "@/lib/contracts/types";
import { Button } from "@/components/ui/button";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

type Msg = { tone: "ok" | "error"; text: string } | null;

/**
 * Step 7, "Where your leads are kept". Rendered only from the backend catalog
 * (crm_provider_catalog). Strings: PRODUCT_TEXTS_C2_v1 §1.2.
 * - The radio group offers exactly the providers the catalog marks selectable.
 *   The built-in CRM is the explicit "no external CRM" choice.
 * - coming_soon providers are never offered as connectable. Naming one only records
 *   interest; the built-in CRM stays of record and nothing is synced.
 * - Nothing is called saved until the server confirms; the page then re-reads the
 *   backend state. What cannot be read back is said so, not guessed.
 */
export function CrmChoice({ locale, catalog, selection }: { locale: Locale; catalog: CrmCatalogEntry[]; selection: CrmSelection }) {
  const dict = getDictionary(locale);
  const d = dict.onboarding.crm;
  const errors = dict.common.errors as Record<string, string>;
  const router = useRouter();
  const groupId = useId();

  const selectable = catalog.filter((c) => c.selectable);
  const comingSoon = catalog.filter((c) => c.availability === "coming_soon");
  const unavailable = catalog.filter((c) => c.availability === "unavailable");
  const initial = selection.selected ?? selectable.find((c) => c.is_default)?.provider ?? "nuovasolution";

  const [choice, setChoice] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<Msg>(null);
  const [otherOpen, setOtherOpen] = useState(false);

  const nameOf = (p: string) => catalog.find((c) => c.provider === p)?.display_name ?? p;

  async function post(provider: string, intent: "select" | "interest") {
    setBusy(`${intent}:${provider}`);
    setMsg(null);
    try {
      const res = await fetch("/api/bff/crm/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, intent }),
      });
      const json = (await res.json().catch(() => ({ ok: false, code: "generic" }))) as { ok: boolean; code: string };
      if (!json.ok) {
        setMsg({ tone: "error", text: errors[json.code] ?? errors.generic });
        return;
      }
      if (intent === "interest") setMsg({ tone: "ok", text: d.interestSaved.replace("{provider}", nameOf(provider)) });
      else setMsg({ tone: "ok", text: provider === "google_sheets" ? `${d.saved} ${d.sheetsNext}` : d.saved });
      router.refresh();
    } catch {
      setMsg({ tone: "error", text: errors.generic });
    } finally {
      setBusy(null);
    }
  }

  const optionText = (p: string): { title: string; body: string; extra?: string; tag?: string } =>
    p === "nuovasolution"
      ? { title: d.nativeTitle, body: d.nativeBody, extra: d.nativeLimits, tag: d.nativeTag }
      : p === "google_sheets"
        ? { title: d.sheetsTitle, body: d.sheetsBody }
        : { title: nameOf(p), body: "" };

  return (
    <div className="mt-4 border-t border-line-hairline pt-5" data-crm-choice>
      <p className="t-heading-s text-text-primary" id={`${groupId}-h`}>{d.heading}</p>
      <p className="mt-2 t-body-s text-text-secondary measure-body">{d.lead}</p>

      {selection.of_record === "nuovasolution" && (
        <p className="mt-4 flex items-center gap-2 t-body-s text-text-primary" data-crm-of-record="nuovasolution">
          <StatusGlyph glyph="check" size={14} className="text-signal-positive" />
          {d.done}
          {selection.selected === "google_sheets" && <span className="text-text-secondary"> · {d.sheetsTitle}</span>}
        </p>
      )}
      {selection.selection_not_readable && <p className="mt-1 t-caption text-text-muted">{d.notReadable}</p>}
      {selection.interest && <p className="mt-1 t-caption text-text-secondary">{d.interestSaved.replace("{provider}", nameOf(selection.interest))}</p>}

      <fieldset className="mt-5" aria-labelledby={`${groupId}-h`}>
        <legend className="t-caption text-text-muted">{d.chooseLabel}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {selectable.map((c) => {
            const o = optionText(c.provider);
            return (
              <label
                key={c.provider}
                className={cn(
                  "flex min-h-[56px] cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 transition-colors duration-micro",
                  choice === c.provider ? "border-line-interactive bg-surface-raised" : "border-line-hairline hover:border-line-strong",
                )}
              >
                <input type="radio" name={`${groupId}-crm`} value={c.provider} checked={choice === c.provider} onChange={() => setChoice(c.provider)} className="mt-1 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 t-body-m text-text-primary">
                    {o.title}
                    {o.tag && <LabelChip>{o.tag}</LabelChip>}
                  </span>
                  {o.body && <span className="mt-1 block t-body-s text-text-secondary">{o.body}</span>}
                  {o.extra && <span className="mt-1 block t-caption text-text-muted">{o.extra}</span>}
                </span>
              </label>
            );
          })}
        </div>
        <div className="mt-4">
          <Button type="button" size="sm" busy={busy === `select:${choice}`} disabled={busy !== null} onClick={() => post(choice, "select")}>
            {d.save}
          </Button>
        </div>
      </fieldset>

      {comingSoon.length > 0 && (
        <div className="mt-6">
          <p className="t-body-s text-text-primary">{d.externalGroup}</p>
          <ul className="mt-2 hairline-list border-y border-line-hairline">
            {comingSoon.map((c) => (
              <li key={c.provider} className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 t-body-m text-text-primary">
                    {c.display_name} <LabelChip tone="attention">{d.externalSoon}</LabelChip>
                  </span>
                  <span className="mt-1 block t-body-s text-text-muted">{d.externalBody.replaceAll("{provider}", c.display_name)}</span>
                </span>
                <Button type="button" size="sm" variant="secondary" disabled={busy !== null} busy={busy === `interest:${c.provider}`} onClick={() => post(c.provider, "interest")}>
                  {d.registerInterest.replace("{provider}", c.display_name)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {unavailable.length > 0 && (
        <p className="mt-4 t-body-s text-text-muted">
          {d.unavailable}: {unavailable.map((c) => c.display_name).join(", ")}.
        </p>
      )}

      <div className="mt-4">
        <button type="button" aria-expanded={otherOpen} onClick={() => setOtherOpen((v) => !v)} className="inline-flex min-h-[44px] items-center t-body-s text-text-secondary underline underline-offset-4 hover:text-text-primary">
          {d.other}
        </button>
        {otherOpen && <p className="mt-1 t-body-s text-text-muted">{d.otherBody}</p>}
      </div>

      {msg && (
        <p role={msg.tone === "error" ? "alert" : "status"} className={cn("mt-4 t-body-s", msg.tone === "error" ? "text-signal-critical" : "text-signal-positive")} data-crm-msg={msg.tone}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
