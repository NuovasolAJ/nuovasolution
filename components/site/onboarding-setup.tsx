"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { DAYS, type Day, type OnboardingProfile, type Readiness } from "@/lib/contracts/types-onboarding";
import { Button } from "@/components/ui/button";
import { LabelChip, StatusGlyph } from "@/components/ui/status";

const inputCls = "mt-2 h-12 w-full rounded-md border border-line-strong bg-surface-raised px-4 t-body-m text-text-primary disabled:opacity-60";
const labelCls = "block t-body-s font-medium text-text-primary";
const TIMEZONES = ["Europe/Madrid", "Atlantic/Canary", "Europe/London", "Europe/Lisbon", "Europe/Berlin", "Europe/Paris", "Europe/Amsterdam"];
const LANGS = ["es", "en", "de", "fr", "it", "nl", "pt"] as const;
const TYPES = ["viewing", "valuation", "call"] as const;
const MINUTES = [15, 30, 45, 60, 90];
const MANAGERS = ["office_manager", "agency_admin"];

type Env = { ok: boolean; code: string; stub?: true; details?: { profile?: OnboardingProfile; field?: string; object_path?: string; signed_upload_url?: string | null } };
export type Msg = { tone: "ok" | "error"; text: string } | null;

async function post(url: string, body: unknown): Promise<Env> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return (await res.json().catch(() => ({ ok: false, code: "generic" }))) as Env;
  } catch {
    return { ok: false, code: "connection" };
  }
}

/**
 * The agency's own setup, section by section (the sections are laid out in five areas by
 * onboarding-areas.tsx). Every section saves through its BFF route and then shows the profile the
 * server read back (never the form values echoed). Role limits are shown up front; the server
 * enforces them regardless.
 */
export type SaveFn = (url: string, body: unknown) => Promise<Msg>;

export function useSetupSave(locale: Locale, initial: OnboardingProfile, role: string) {
  const dict = getDictionary(locale);
  const s = dict.onboarding.setup;
  const router = useRouter();
  const [profile, setProfile] = useState(initial);
  // v2 §2: every onboarding.set section and branding write needs manage_users (office_manager, agency_admin).
  const canManage = MANAGERS.includes(role);
  const errorText = (r: Env) => {
    if (r.code === "invalid_input" && r.details?.field) return s.invalidField.replace("{field}", r.details.field);
    return (dict.common.errors as Record<string, string>)[r.code] ?? dict.common.errors.generic;
  };
  const save: SaveFn = async (url, body) => {
    const r = await post(url, body);
    if (!r.ok || !r.details?.profile) return { tone: "error", text: errorText(r) };
    setProfile(r.details.profile);
    router.refresh(); // wizard steps and readiness re-read from the server
    return { tone: "ok", text: s.saved };
  };
  return { profile, setProfile, save, errorText, canManage };
}

export function Panel({ id, title, lead, note, children }: { id: string; title: string; lead?: string; note?: string | null; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-[calc(var(--header-h)+88px)] border-t border-line-hairline pt-6 xl:scroll-mt-[calc(var(--header-h)+24px)]" data-setup-section={id}>
      <h4 className="t-heading-m text-text-primary">{title}</h4>
      {lead && <p className="mt-2 t-body-s text-text-secondary measure-body">{lead}</p>}
      {note && <p className="mt-2 t-caption text-text-muted" data-role-note>{note}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Result({ msg }: { msg: Msg }) {
  if (!msg) return null;
  return (
    <p role={msg.tone === "error" ? "alert" : "status"} className={cn("mt-3 t-body-s", msg.tone === "error" ? "text-signal-critical" : "text-signal-positive")} data-setup-msg={msg.tone}>
      {msg.text}
    </p>
  );
}

function useSubmit(save: SaveFn) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  async function run(url: string, body: unknown) {
    setBusy(true);
    setMsg(null);
    setMsg(await save(url, body));
    setBusy(false);
  }
  return { busy, msg, run };
}

// ---------------- business ----------------

function splitHours(v: string | undefined): { open: boolean; from: string; to: string } {
  if (!v || v === "closed") return { open: false, from: "09:00", to: "18:00" };
  const [from, to] = v.split("-");
  return { open: true, from, to };
}

/** Name, time zone and languages. Saves with the stored hours untouched (one route carries both). */
export function BusinessSection({ locale, profile, disabled, save }: { locale: Locale; profile: OnboardingProfile; disabled: boolean; save: SaveFn }) {
  const dict = getDictionary(locale);
  const s = dict.onboarding.setup;
  const b = s.business;
  const id = useId();
  const { busy, msg, run } = useSubmit(save);
  const [langs, setLangs] = useState<string[]>(profile.business.languages.length ? profile.business.languages : ["es"]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    run("/api/bff/onboarding/business", { timezone: f.get("timezone"), languages: langs, default_language: f.get("default_language"), business_hours: storedHours(profile) });
  }

  return (
    <Panel id="setup-business" title={b.heading} note={disabled ? s.managersOnly : null}>
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <p className="t-body-s text-text-secondary">
          <span className="text-text-muted">{b.name}: </span>
          <span className="text-text-primary" data-business-name>{profile.business.name ?? "—"}</span>
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor={`${id}-tz`} className={labelCls}>{b.timezone}</label>
            <select id={`${id}-tz`} name="timezone" defaultValue={profile.business.timezone ?? "Europe/Madrid"} disabled={disabled} className={inputCls}>
              {TIMEZONES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-dl`} className={labelCls}>{b.defaultLanguage}</label>
            <select id={`${id}-dl`} name="default_language" defaultValue={profile.business.default_language} disabled={disabled} className={inputCls}>
              {langs.map((l) => <option key={l} value={l}>{b.languageNames[l as keyof typeof b.languageNames]}</option>)}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className={labelCls}>{b.languages}</legend>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {LANGS.map((l) => (
              <label key={l} className="inline-flex min-h-[44px] items-center gap-2 t-body-s text-text-primary">
                <input type="checkbox" className="h-4 w-4" disabled={disabled} checked={langs.includes(l)} onChange={(e) => setLangs((cur) => (e.target.checked ? [...cur, l] : cur.filter((x) => x !== l)))} data-lang={l} />
                {b.languageNames[l]}
              </label>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="sm" busy={busy} disabled={busy || disabled}>{s.save}</Button>
        <Result msg={msg} />
      </form>
    </Panel>
  );
}

/** The stored hours, in the runtime format, or a working week when nothing is stored yet. */
function storedHours(profile: OnboardingProfile): Record<Day, string> {
  const has = Object.keys(profile.business.business_hours).length > 0;
  const out = {} as Record<Day, string>;
  for (const d of DAYS) out[d] = has ? (profile.business.business_hours[d] ?? "closed") : ["sat", "sun"].includes(d) ? "closed" : "09:00-18:00";
  return out;
}

/** Opening hours on their own (owner order 2026-10-01 §7: team and working hours). Stored, and the help says what they steer (D-64). */
export function HoursSection({ locale, profile, disabled, save }: { locale: Locale; profile: OnboardingProfile; disabled: boolean; save: SaveFn }) {
  const dict = getDictionary(locale);
  const s = dict.onboarding.setup;
  const b = s.business;
  const id = useId();
  const { busy, msg, run } = useSubmit(save);
  const [hours, setHours] = useState<Record<Day, { open: boolean; from: string; to: string }>>(() => {
    const stored = storedHours(profile);
    const out = {} as Record<Day, { open: boolean; from: string; to: string }>;
    for (const d of DAYS) out[d] = splitHours(stored[d]);
    return out;
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const business_hours: Partial<Record<Day, string>> = {};
    for (const d of DAYS) business_hours[d] = hours[d].open ? `${hours[d].from}-${hours[d].to}` : "closed";
    run("/api/bff/onboarding/business", {
      timezone: profile.business.timezone ?? "Europe/Madrid",
      languages: profile.business.languages.length ? profile.business.languages : ["es"],
      default_language: profile.business.default_language,
      business_hours,
    });
  }

  return (
    <Panel id="setup-hours" title={b.hoursHeading} lead={b.hoursHelp} note={disabled ? s.managersOnly : null}>
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <fieldset>
          <legend className="sr-only">{b.hours}</legend>
          <div className="hairline-list border-y border-line-hairline">
            {DAYS.map((d) => (
              <div key={d} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 py-2 md:grid-cols-[8rem_7rem_1fr]" data-day={d}>
                <span className="t-body-s text-text-primary">{b.days[d]}</span>
                <label className="inline-flex min-h-[44px] items-center gap-2 t-body-s text-text-secondary">
                  <input type="checkbox" className="h-4 w-4" disabled={disabled} checked={hours[d].open} onChange={(e) => setHours((h) => ({ ...h, [d]: { ...h[d], open: e.target.checked } }))} />
                  {hours[d].open ? b.open : b.closed}
                </label>
                {hours[d].open && (
                  <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                    <label className="sr-only" htmlFor={`${id}-${d}-f`}>{b.from}</label>
                    <input id={`${id}-${d}-f`} type="time" step={900} value={hours[d].from} disabled={disabled} onChange={(e) => setHours((h) => ({ ...h, [d]: { ...h[d], from: e.target.value } }))} className="h-11 rounded-md border border-line-strong bg-surface-raised px-2 t-body-s tnum" />
                    <span aria-hidden className="text-text-muted">–</span>
                    <label className="sr-only" htmlFor={`${id}-${d}-t`}>{b.to}</label>
                    <input id={`${id}-${d}-t`} type="time" step={900} value={hours[d].to} disabled={disabled} onChange={(e) => setHours((h) => ({ ...h, [d]: { ...h[d], to: e.target.value } }))} className="h-11 rounded-md border border-line-strong bg-surface-raised px-2 t-body-s tnum" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>
        <Button type="submit" size="sm" busy={busy} disabled={busy || disabled}>{s.save}</Button>
        <Result msg={msg} />
      </form>
    </Panel>
  );
}

// ---------------- legal ----------------

export function LegalSection({ locale, profile, readiness, disabled, save }: { locale: Locale; profile: OnboardingProfile; readiness: Readiness | null; disabled: boolean; save: SaveFn }) {
  const s = getDictionary(locale).onboarding.setup;
  const l = s.legal;
  const id = useId();
  const { busy, msg, run } = useSubmit(save);
  const p = profile.legal;
  // Field-level gaps when readable (stub); otherwise only the readiness gate says whether it is complete.
  const gate = readiness?.gates.find((g) => g.gate_key === "white_label_legal")?.status;
  const missing = profile.legal_missing ? profile.legal_missing.map((m) => l.fields[m as keyof typeof l.fields]).filter(Boolean) : null;
  const complete = missing ? missing.length === 0 : gate === "READY";
  // Help lines COPY_DELTAS_1001 D-69 (address) and D-70 (the two links): what each is used for, where the person types it.
  const fields: { name: string; label: string; value: string | null; type?: string; auto?: string; wide?: boolean; help?: string }[] = [
    { name: "legal_name", label: l.legalName, value: p.legal_name, auto: "organization", wide: true },
    { name: "tax_id", label: l.taxId, value: p.tax_id },
    { name: "address_line", label: l.addressLine, value: p.address.line, auto: "street-address", wide: true, help: l.addressHelp },
    { name: "address_postal_code", label: l.postalCode, value: p.address.postal_code, auto: "postal-code" },
    { name: "address_city", label: l.city, value: p.address.city, auto: "address-level2" },
    { name: "address_region", label: l.region, value: p.address.region, auto: "address-level1" },
    { name: "privacy_url", label: l.privacyUrl, value: p.privacy_url, type: "url", wide: true, help: l.linksHelp },
    { name: "terms_url", label: l.termsUrl, value: p.terms_url, type: "url", wide: true },
    { name: "imprint_url", label: l.imprintUrl, value: p.imprint_url, type: "url", wide: true },
  ];
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    run("/api/bff/onboarding/legal", Object.fromEntries(fields.map((x) => [x.name, String(f.get(x.name) ?? "").trim()])));
  }
  return (
    <Panel id="setup-legal" title={l.heading} lead={l.lead} note={disabled ? s.managersOnly : null}>
      {(missing || gate) && (
        <p className={cn("mb-5 flex items-start gap-2 t-body-s", complete ? "text-signal-positive" : "text-text-secondary")} data-legal-missing={missing ? profile.legal_missing?.join(",") : undefined} data-legal-gate={gate}>
          <StatusGlyph glyph={complete ? "check" : "arrow-right"} size={14} className="mt-1 shrink-0" />
          {complete ? l.complete : missing ? l.missing.replace("{list}", missing.join(", ")) : getDictionary(locale).onboarding.gateDetail.white_label_legal}
        </p>
      )}
      {!p.readable && !p.legal_name && <p className="mb-5 t-caption text-text-muted" data-legal-not-readable>{l.notReadable}</p>}
      <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
        {fields.map((x) => (
          <div key={x.name} className={cn(x.wide && "md:col-span-2")}>
            <label htmlFor={`${id}-${x.name}`} className={labelCls}>{x.label}</label>
            <input id={`${id}-${x.name}`} name={x.name} type={x.type ?? "text"} inputMode={x.type === "url" ? "url" : undefined} autoComplete={x.auto} defaultValue={x.value ?? ""} placeholder={x.type === "url" ? "https://" : undefined} disabled={disabled} aria-describedby={x.help ? `${id}-${x.name}-help` : undefined} className={inputCls} />
            {x.help && <p id={`${id}-${x.name}-help`} className="mt-2 t-caption text-text-muted">{x.help}</p>}
          </div>
        ))}
        <div className="md:col-span-2">
          <Button type="submit" size="sm" busy={busy} disabled={busy || disabled}>{s.save}</Button>
          <Result msg={msg} />
        </div>
      </form>
    </Panel>
  );
}

// ---------------- branding (branding-assets, WEBSITE_HANDOFF_v2 §3) ----------------

const TYPES_ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
type LogoKind = "logo" | "logo_dark";

export function BrandingSection({ locale, profile, disabled, stub, setProfile, errorText }: { locale: Locale; profile: OnboardingProfile; disabled: boolean; stub: boolean; setProfile: (p: OnboardingProfile) => void; errorText: (r: Env) => string }) {
  const dict = getDictionary(locale);
  const s = dict.onboarding.setup;
  const b = s.branding;
  const ob = dict.onboarding.branding;
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<Msg>(null);
  const br = profile.branding;
  const name = br.display_name ?? profile.business.name ?? "";

  async function after(r: Env, okText: string | null) {
    if (!r.ok || !r.details?.profile) return setMsg({ tone: "error", text: errorText(r) });
    setProfile(r.details.profile);
    if (okText) setMsg({ tone: "ok", text: okText });
    router.refresh();
  }
  async function upload(kind: LogoKind, file: File, input: HTMLInputElement) {
    setMsg(null);
    if (!TYPES_ACCEPTED.includes(file.type)) return setMsg({ tone: "error", text: dict.common.errors.unsupported_file_type });
    if (file.size > 5 * 1024 * 1024) return setMsg({ tone: "error", text: dict.common.errors.file_too_large });
    setBusy(`upload:${kind}`);
    try {
      const init = await post("/api/bff/branding/upload-init", { kind, filename: file.name, content_type: file.type, size_bytes: file.size });
      if (!init.ok || !init.details?.object_path) return setMsg({ tone: "error", text: errorText(init) });
      if (init.details.signed_upload_url) {
        // Straight to storage with the declared type; the server then checks the stored bytes on commit.
        const put = await fetch(init.details.signed_upload_url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
        if (!put.ok) return setMsg({ tone: "error", text: dict.common.errors.upload_not_found });
      }
      await after(await post("/api/bff/branding/commit", { kind, object_path: init.details.object_path }), b.saved);
    } catch {
      setMsg({ tone: "error", text: dict.common.errors.generic });
    } finally {
      setBusy(null);
      input.value = "";
    }
  }
  async function simple(key: string, url: string, body: unknown) {
    setBusy(key);
    setMsg(null);
    try {
      await after(await post(url, body), null);
    } catch {
      setMsg({ tone: "error", text: dict.common.errors.generic });
    } finally {
      setBusy(null);
    }
  }

  // What an email in dark mode shows: the dark variant if there is one, the logo on a light chip if the
  // agency says it needs a light background, otherwise the logo as is (and the help text warns about it).
  const darkSrc = br.logo_dark ?? (br.logo_present ? br.logo : null);
  const darkChip = !br.logo_dark && br.needs_light_background;
  const preview = (dark: boolean) => {
    const src = dark ? darkSrc : br.logo_present ? br.logo : null;
    return (
      <figure className="min-w-0">
        <div className={cn("flex h-28 items-center justify-center overflow-hidden rounded-md border px-4", dark ? "border-[#2A2F38] bg-[#1C1F24]" : "border-line-hairline bg-white")} data-preview={dark ? "dark" : "light"}>
          {src ? (
            <span className={cn("inline-flex max-w-full items-center justify-center", dark && darkChip && "rounded-sm bg-white px-3 py-2")} data-light-chip={dark && darkChip ? "yes" : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element -- the agency's own stored asset, shown untouched at up to email size */}
              <img src={src} alt={name} className="block h-auto max-h-16 w-auto max-w-[min(180px,100%)] object-contain" data-logo-img={dark && br.logo_dark ? "dark" : "default"} />
            </span>
          ) : (
            <span className={cn("t-heading-s", dark ? "text-[#F4F1EA]" : "text-[#1F2A44]")} data-text-fallback>{name}</span>
          )}
        </div>
        <figcaption className="mt-2 t-caption text-text-muted">{dark ? b.previewDark : b.previewLight}</figcaption>
      </figure>
    );
  };
  const off = disabled || busy !== null;
  const fileButton = (kind: LogoKind, label: string) => (
    <>
      <input id={`setup-file-${kind}`} type="file" accept={TYPES_ACCEPTED.join(",")} className="sr-only" disabled={off} onChange={(e) => e.target.files?.[0] && upload(kind, e.target.files[0], e.target)} data-logo-input={kind} />
      <label htmlFor={`setup-file-${kind}`} className={cn("inline-flex min-h-[44px] cursor-pointer items-center rounded-pill border border-line-strong bg-surface-raised px-5 t-body-s text-text-primary hover:border-line-interactive", off && "pointer-events-none opacity-60")}>
        {busy === `upload:${kind}` ? ob.uploading : label}
      </label>
    </>
  );

  return (
    <Panel id="setup-branding" title={ob.heading} lead={b.lead} note={disabled ? s.managersOnly : null}>
      <div className="grid gap-4 sm:grid-cols-2">
        {preview(false)}
        {preview(true)}
      </div>
      <p className="mt-3 t-caption text-text-muted">{br.logo_present ? b.darkHelp : b.textFallback}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {fileButton("logo", br.logo_present ? b.replace : b.choose)}
        {br.logo_present && <Button type="button" size="sm" variant="tertiary" busy={busy === "remove:logo"} disabled={off} onClick={() => simple("remove:logo", "/api/bff/branding/remove", { kind: "logo" })}>{ob.remove}</Button>}
      </div>
      {br.logo_present && (
        <div className="mt-6 space-y-4 border-t border-line-hairline pt-5">
          <div>
            <p className="t-body-s text-text-primary">{b.darkLogo}</p>
            <p className="mt-1 t-caption text-text-muted">{b.darkLogoHelp}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {fileButton("logo_dark", b.chooseDark)}
              {br.logo_dark && <Button type="button" size="sm" variant="tertiary" busy={busy === "remove:logo_dark"} disabled={off} onClick={() => simple("remove:logo_dark", "/api/bff/branding/remove", { kind: "logo_dark" })}>{ob.remove}</Button>}
            </div>
          </div>
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 t-body-s text-text-primary">
            <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" checked={br.needs_light_background} disabled={off} onChange={(e) => simple("contrast", "/api/bff/branding/contrast", { needs_light_background: e.target.checked })} data-needs-light />
            <span>{b.needsLight}<span className="block t-caption text-text-muted">{b.needsLightHelp}</span></span>
          </label>
        </div>
      )}
      <ul className="mt-4 space-y-1 t-caption text-text-muted">
        <li>{ob.constraints} {b.logoHelp}</li>
        <li>{b.untouched}</li>
        <li>{b.public}</li>
        {stub && <li><LabelChip tone="attention">{dict.common.stubData}</LabelChip> {b.stubNote}</li>}
      </ul>
      <Result msg={msg} />
    </Panel>
  );
}

// ---------------- calendar and hand-off ----------------

export function CalendarSection({ locale, profile, disabled, save }: { locale: Locale; profile: OnboardingProfile; disabled: boolean; save: SaveFn }) {
  const s = getDictionary(locale).onboarding.setup;
  const c = s.calendar;
  const { busy, msg, run } = useSubmit(save);
  const [types, setTypes] = useState<Record<string, number | null>>(() => Object.fromEntries(TYPES.map((t) => [t, profile.calendar.appointment_types.find((a) => a.type === t)?.minutes ?? null])));
  const [fb, setFb] = useState(profile.calendar.no_calendar_fallback);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const appointment_types = TYPES.filter((t) => types[t] !== null).map((t) => ({ type: t, minutes: types[t] as number }));
    run("/api/bff/onboarding/calendar", { appointment_types, no_calendar_fallback: { ...fb, create_callback: true } });
  }
  return (
    <Panel id="setup-calendar" title={c.heading} note={disabled ? s.managersOnly : null}>
      <p className="mb-5 flex items-start gap-2 t-body-s text-text-secondary" data-calendar-connected={profile.calendar.connected ? "yes" : "no"}>
        <StatusGlyph glyph={profile.calendar.connected ? "check" : "rule"} size={14} className="mt-1 shrink-0" />
        {profile.calendar.connected ? c.connected : c.notConnected}
      </p>
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <fieldset>
          <legend className={labelCls}>{c.types}</legend>
          <div className="mt-2 hairline-list border-y border-line-hairline">
            {TYPES.map((t) => (
              <div key={t} className="flex flex-wrap items-center justify-between gap-3 py-2" data-appointment={t}>
                <label className="inline-flex min-h-[44px] items-center gap-2 t-body-s text-text-primary">
                  <input type="checkbox" className="h-4 w-4" disabled={disabled} checked={types[t] !== null} onChange={(e) => setTypes((cur) => ({ ...cur, [t]: e.target.checked ? 30 : null }))} />
                  {c.typeNames[t]}
                </label>
                {types[t] !== null && (
                  <select aria-label={`${c.typeNames[t]}: ${c.minutes.replace("{n} ", "")}`} value={types[t] as number} disabled={disabled} onChange={(e) => setTypes((cur) => ({ ...cur, [t]: Number(e.target.value) }))} className="h-11 rounded-md border border-line-strong bg-surface-raised px-2 t-body-s">
                    {MINUTES.map((m) => <option key={m} value={m}>{c.minutes.replace("{n}", String(m))}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={labelCls}>{c.fallback}</legend>
          <div className="mt-2 space-y-1">
            <label className="flex min-h-[44px] items-center gap-2 t-body-s text-text-primary">
              <input type="checkbox" className="h-4 w-4" disabled={disabled} checked={fb.capture_preferred_time} onChange={(e) => setFb((f) => ({ ...f, capture_preferred_time: e.target.checked }))} />
              {c.capture}
            </label>
            <label className="flex min-h-[44px] items-start gap-2 t-body-s text-text-primary">
              <input type="checkbox" className="mt-1 h-4 w-4" checked disabled readOnly />
              <span>{c.callback} <span className="block t-caption text-text-muted">{c.callbackFixed}</span></span>
            </label>
            <label className="flex min-h-[44px] items-center gap-2 t-body-s text-text-primary">
              <input type="checkbox" className="h-4 w-4" disabled={disabled} checked={fb.inform_customer} onChange={(e) => setFb((f) => ({ ...f, inform_customer: e.target.checked }))} />
              {c.inform}
            </label>
          </div>
        </fieldset>
        <Button type="submit" size="sm" busy={busy} disabled={busy || disabled}>{s.save}</Button>
        <Result msg={msg} />
      </form>
    </Panel>
  );
}

// ---------------- readiness (tenant_activation_readiness) ----------------

export function ReadinessSection({ locale, readiness }: { locale: Locale; readiness: Readiness | null }) {
  const d = getDictionary(locale).onboarding;
  const r = d.setup.readiness;
  if (!readiness) return <Panel id="setup-readiness" title={r.heading}><p role="status" className="t-body-s text-text-secondary">{d.readyError}</p></Panel>;
  // Redaction boundary: only keys with a label render. Two voice gates share one label.
  const label = (k: string) => (d.gates as Record<string, string>)[k] ?? null;
  const detail = (k: string) => (d.gateDetail as Record<string, string>)[k] ?? null;
  const seen = new Set<string>();
  const rows = readiness.gates.filter((g) => {
    const l = label(g.gate_key);
    if (!l || seen.has(l)) return false;
    seen.add(l);
    return true;
  });
  const mandatory = rows.filter((g) => g.mandatory);
  const optional = rows.filter((g) => !g.mandatory);
  const waitingOnUs = mandatory.some((g) => g.status === "BLOCKED" && (g.gate_key === "ai_disclosure" || g.classification === "PROVIDER_ACTION"));
  const stateText = (st: string) => (r.states as Record<string, string>)[st] ?? r.states.UNSUPPORTED_GATE;
  const list = (gs: typeof rows) => (
    <ul className="mt-2 hairline-list border-y border-line-hairline">
      {gs.map((g) => (
        <li key={g.gate_key} className="py-3" data-gate={g.gate_key} data-gate-status={g.status}>
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <span className="t-body-s text-text-primary">{label(g.gate_key)}</span>
            <span className={cn("inline-flex items-center gap-1.5 t-caption", g.status === "READY" ? "text-signal-positive" : g.status === "BLOCKED" && g.mandatory ? "text-text-primary" : "text-text-muted")}>
              <StatusGlyph glyph={g.status === "READY" ? "check" : g.status === "BLOCKED" ? "arrow-right" : "rule"} size={14} />
              {stateText(g.status)}
            </span>
          </div>
          {/* The plan gate says what the trial carries (COPY_DELTAS_1001 D-67); the legal gate lists what it needs. */}
          {detail(g.gate_key) && (g.gate_key === "plan_entitlements" || g.status === "BLOCKED") && <p className="mt-1 t-caption text-text-muted">{detail(g.gate_key)}</p>}
        </li>
      ))}
    </ul>
  );
  return (
    <Panel id="setup-readiness" title={r.heading}>
      <p className={cn("t-heading-s", readiness.activatable ? "text-signal-positive" : "text-text-primary")} data-activatable={readiness.activatable ? "yes" : "no"}>
        {readiness.activatable ? d.activatable : d.notActivatable}
      </p>
      {waitingOnUs && <p className="mt-1 t-body-s text-text-secondary">{d.readyWaitingOnUs}</p>}
      {mandatory.some((g) => g.gate_key === "ai_disclosure" && g.status === "BLOCKED") && <p className="mt-1 t-caption text-text-muted">{d.aiDisclosurePending}</p>}
      <p className="mt-5 t-caption text-text-muted">{r.mandatory}</p>
      {list(mandatory)}
      {optional.length > 0 && (
        <>
          <p className="mt-5 t-caption text-text-muted">{r.optional}</p>
          {list(optional)}
        </>
      )}
    </Panel>
  );
}
