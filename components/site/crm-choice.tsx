"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { CrmCatalogEntry, CrmSelection } from "@/lib/contracts/types";
import { providerDisplayNames } from "@/lib/contracts/types";
import { CONNECT_NOTICE_VERSION, connectNoticeSheets as N } from "@/lib/content/connect-notice";
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
export function CrmChoice({ locale, catalog, selection, noticeAllowed }: { locale: Locale; catalog: CrmCatalogEntry[]; selection: CrmSelection; noticeAllowed: boolean }) {
  const dict = getDictionary(locale);
  const d = dict.onboarding.crm;
  const errors = dict.common.errors as Record<string, string>;
  const router = useRouter();
  const groupId = useId();
  const [acked, setAcked] = useState(false);
  const [ackLogged, setAckLogged] = useState(false);

  const selectable = catalog.filter((c) => c.selectable);
  const comingSoon = catalog.filter((c) => c.availability === "coming_soon");
  const unavailable = catalog.filter((c) => c.availability === "unavailable");
  const initial = selection.selected ?? selectable.find((c) => c.is_default)?.provider ?? "nuovasolution";
  // The Sheets copy is an add-on to the built-in CRM (crm_config.sheets_projection); no contracted call
  // switches it off yet, so choosing "No external CRM" while it is on cannot be saved as if it did.
  const sheetsOn = selection.selected === "google_sheets";
  const current = sheetsOn ? "google_sheets" : selection.explicitly_chosen ? "nuovasolution" : null;

  const [choice, setChoice] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<Msg>(null);
  const [otherOpen, setOtherOpen] = useState(false);

  const nameOf = (p: string) => catalog.find((c) => c.provider === p)?.display_name ?? p;

  async function post(provider: string, intent: "select" | "interest") {
    setBusy(`${intent}:${provider}`);
    setMsg(null);
    try {
      if (intent === "select" && provider === "google_sheets") {
        // Only after the notice was shown and acknowledged here; the server refuses the choice without it.
        if (!acked) return;
        const ack = await fetch("/api/bff/consent/connect-notice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "google_sheets", notice_version: CONNECT_NOTICE_VERSION }),
        });
        const aj = (await ack.json().catch(() => ({ ok: false, code: "generic" }))) as { ok: boolean; code: string };
        if (!aj.ok) {
          setMsg({ tone: "error", text: errors[aj.code] ?? errors.generic });
          return;
        }
        setAckLogged(true);
      }
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
        <p className="mt-4 flex items-start gap-2 t-body-s text-text-primary" data-crm-of-record="nuovasolution">
          <StatusGlyph glyph="check" size={14} className="mt-1 shrink-0 text-signal-positive" />
          <span>{d.done}</span>
        </p>
      )}
      {selection.selected === "google_sheets" && (
        <p className="mt-2 flex flex-wrap items-center gap-2 t-body-s text-text-secondary" data-sheets-state={selection.sheets_connected ? "connected" : "chosen_not_connected"}>
          <span>{providerDisplayNames.google_sheets}</span>
          <LabelChip tone={selection.sheets_connected ? "neutral" : "attention"}>{selection.sheets_connected ? d.sheetsConnected : d.sheetsChosen}</LabelChip>
          {!selection.sheets_connected && <span className="basis-full t-caption text-text-muted">{d.sheetsNext}</span>}
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
        {choice === "google_sheets" && !sheetsOn && (
          <ConnectNotice locale={locale} allowed={noticeAllowed} acked={acked} onAck={setAcked} logged={ackLogged} />
        )}
        {sheetsOn && choice === "nuovasolution" && <p className="mt-4 t-body-s text-text-muted" data-sheets-off-unavailable>{d.sheetsOffUnavailable}</p>}
        <div className="mt-4">
          <Button
            type="button"
            size="sm"
            busy={busy === `select:${choice}`}
            disabled={busy !== null || choice === current || (choice === "google_sheets" && (!noticeAllowed || !acked)) || (sheetsOn && choice === "nuovasolution")}
            onClick={() => post(choice, "select")}
          >
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

/**
 * Pre-connection notice (CONNECT_NOTICE_DRAFT_v1 §A). Short layer above the button, detail layer one
 * click away on the same screen. Rows with an open slot say "awaiting legal review" instead of text.
 * Test surfaces only: in a live build the notice is not approved, so Sheets cannot be chosen there.
 */
function ConnectNotice({ locale, allowed, acked, onAck, logged }: { locale: Locale; allowed: boolean; acked: boolean; onAck: (v: boolean) => void; logged: boolean }) {
  const id = useId();
  if (!allowed) return <p className="mt-4 t-body-s text-text-muted" data-connect-notice="withheld">{N.pendingText[locale]}</p>;
  return (
    <div className="mt-4 border border-line-strong bg-surface-raised p-4" data-connect-notice={CONNECT_NOTICE_VERSION}>
      <LabelChip tone="attention">{N.draftMark[locale]}</LabelChip>
      <p className="mt-3 t-heading-s text-text-primary">{N.heading[locale]}</p>
      {N.short.map((p) => (
        <p key={p.en} className="mt-2 t-body-s text-text-secondary measure-body">{p[locale]}</p>
      ))}
      <details className="mt-3">
        <summary className="inline-flex min-h-[44px] cursor-pointer items-center t-body-s text-text-accent underline underline-offset-4">{N.more[locale]}</summary>
        <dl className="mt-2 hairline-list border-y border-line-hairline">
          {N.rows.map((r) => (
            <div key={r.heading.en} className="grid gap-1 py-3 md:grid-cols-[12rem_1fr] md:gap-4">
              <dt className="t-body-s text-text-primary">{r.heading[locale]}</dt>
              <dd className={cn("t-body-s", r.pending ? "text-text-muted" : "text-text-secondary")} data-pending={r.pending ? "legal_review" : undefined}>
                {r.pending ? N.pendingText[locale] : r.text?.[locale]}
              </dd>
            </div>
          ))}
        </dl>
      </details>
      <label htmlFor={`${id}-ack`} className="mt-4 flex min-h-[44px] cursor-pointer items-start gap-3 t-body-s text-text-primary">
        <input id={`${id}-ack`} type="checkbox" checked={acked} onChange={(e) => onAck(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" data-connect-ack />
        <span>{N.ack[locale]}</span>
      </label>
      {logged && <p role="status" className="mt-2 t-caption text-text-muted">{N.logged[locale]}</p>}
    </div>
  );
}
