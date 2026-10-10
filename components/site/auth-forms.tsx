"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button, ButtonLink } from "@/components/ui/button";
import { LabelChip } from "@/components/ui/status";

const inputCls = "mt-2 h-12 w-full rounded-md border border-line-strong bg-surface-raised px-4 t-body-m text-text-primary placeholder:text-text-muted";
const labelCls = "block t-body-s font-medium text-text-primary";

type Env = { ok: boolean; code: string; stub?: true; details?: { next?: string; session?: boolean } };

/**
 * The browser gives a request this long. After it the form says so and frees the button, so a
 * slow or broken connection never leaves a button blocked for good (owner finding 2026-10-01).
 */
const REQUEST_TIMEOUT_MS = 20000;

/** Never throws: a timeout and an unreachable server come back as codes the dictionaries know. */
async function post(url: string, body: unknown): Promise<Env> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: ctl.signal });
    return (await res.json()) as Env;
  } catch {
    return { ok: false, code: ctl.signal.aborted ? "timeout" : "connection" };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * One running state for every form that leaves the page on success: `busy` from the first submit
 * until the next page has replaced this one. A second click or Enter while it runs sends nothing
 * (the button is disabled, and the ref catches the moment before React has re-rendered). Only a
 * failure frees the button again, with the message next to it.
 */
function useRunning() {
  const [busy, setBusy] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const inFlight = useRef(false);
  const leavingRef = useRef(false);
  function start(): boolean {
    if (inFlight.current || leavingRef.current) return false;
    inFlight.current = true;
    setBusy(true);
    return true;
  }
  function leave(href: string) {
    leavingRef.current = true;
    setLeaving(true);
    // A full navigation: the new session cookie is read by the server on the next page, and this
    // page, with its busy button, stays exactly as it is until the browser has replaced it.
    window.location.assign(href);
  }
  function settle() {
    if (leavingRef.current) return;
    inFlight.current = false;
    setBusy(false);
  }
  return { busy, leaving, start, leave, settle };
}

/** Draft of the sign-up form (never the password), so switching the site language keeps what was typed. */
const DRAFT_KEY = "nuova_signup_draft";
type Draft = { name?: string; agency_name?: string; email?: string; language?: string };
function readDraft(): Draft {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "{}") as Draft;
  } catch {
    return {};
  }
}
function writeDraft(d: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* storage unavailable: nothing to keep */
  }
}
function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* nothing to clear */
  }
}

export function SignupForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.signup;
  const id = useId();
  const run = useRunning();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stub, setStub] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(readDraft());
  }, []);

  function keep(form: HTMLFormElement) {
    const f = new FormData(form);
    writeDraft({ name: String(f.get("name") ?? ""), agency_name: String(f.get("agency_name") ?? ""), email: String(f.get("email") ?? ""), language: String(f.get("language") ?? "") });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (run.busy) return;
    const f = new FormData(e.currentTarget);
    const values = {
      name: String(f.get("name") ?? "").trim(),
      agency_name: String(f.get("agency_name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      password: String(f.get("password") ?? ""),
      language: (String(f.get("language") ?? locale) === "es" ? "es" : "en") as "en" | "es",
    };
    const fe: Record<string, string> = {};
    if (!values.name) fe.name = d.errors.required;
    if (!values.agency_name) fe.agency_name = d.errors.required;
    if (!values.email) fe.email = d.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) fe.email = d.errors.invalidEmail;
    if (values.password.length < 10) fe.password = d.errors.shortPassword;
    setFieldErrors(fe);
    if (Object.keys(fe).length) {
      // Keyboard and screen reader users land on the first field that needs them.
      const first = ["name", "agency_name", "email", "password"].find((k) => fe[k]);
      if (first) (e.currentTarget.elements.namedItem(first) as HTMLInputElement | null)?.focus();
      return;
    }

    if (!run.start()) return;
    setError(null);
    try {
      const r = await post("/api/bff/signup", values);
      if (r.ok) {
        if (r.stub) setStub(true);
        clearDraft();
        // Staging/live: e-mail confirmation first; the link brings the user back signed in.
        if (r.details?.next === "confirm") {
          setSent(values.email);
          return;
        }
        run.leave(localePath(locale, r.details?.session ? "/onboarding" : "/login"));
        return;
      }
      const rate = (d.rateErrors as Record<string, string>)[r.code];
      setError(rate ?? (d.errors as Record<string, string>)[r.code] ?? (dict.common.errors as Record<string, string>)[r.code] ?? d.errors.server_error);
    } finally {
      run.settle();
    }
  }

  if (sent) {
    return (
      <div role="status" data-signup-sent>
        <h2 className="t-heading-m text-text-primary">{d.checkEmail.h}</h2>
        <p className="mt-2 t-body-m text-text-primary">{d.checkEmail.body.replace("{email}", sent)}</p>
        <p className="mt-3 t-body-s text-text-secondary">{d.checkEmail.otherDevice}</p>
        <p className="mt-2 t-body-s text-text-secondary">{d.checkEmail.noMail}</p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <ButtonLink href={localePath(locale, "/login?confirmed=1")} variant="secondary">{d.goToLogin}</ButtonLink>
          <ResendButton locale={locale} email={sent} />
        </div>
        <button type="button" onClick={() => setSent(null)} className="mt-4 min-h-[44px] t-body-s text-text-accent underline underline-offset-4">{d.checkEmail.wrongAddress}</button>
      </div>
    );
  }

  const fields = [
    { name: "name", label: d.fields.name, type: "text", auto: "name", value: draft?.name },
    { name: "agency_name", label: d.fields.agency, type: "text", auto: "organization", value: draft?.agency_name },
    { name: "email", label: d.fields.email, type: "email", auto: "email", placeholder: d.fields.emailPlaceholder, value: draft?.email },
    { name: "password", label: d.fields.password, type: "password", auto: "new-password", value: undefined, help: d.passwordHelp },
  ];

  return (
    <form onSubmit={onSubmit} onChange={(e) => keep(e.currentTarget)} noValidate className="space-y-6" data-signup-form aria-busy={run.busy || undefined}>
      {fields.map((fld) => (
        <div key={fld.name}>
          <label htmlFor={`${id}-${fld.name}`} className={labelCls}>{fld.label}</label>
          <input
            key={`${fld.name}-${draft ? "d" : "n"}`}
            id={`${id}-${fld.name}`}
            name={fld.name}
            type={fld.type}
            autoComplete={fld.auto}
            placeholder={fld.placeholder}
            defaultValue={fld.value ?? ""}
            className={inputCls}
            aria-invalid={Boolean(fieldErrors[fld.name])}
            aria-describedby={fieldErrors[fld.name] ? `${id}-${fld.name}-err` : "help" in fld && fld.help ? `${id}-${fld.name}-help` : undefined}
          />
          {"help" in fld && fld.help && !fieldErrors[fld.name] && <p id={`${id}-${fld.name}-help`} className="mt-2 t-caption text-text-muted">{fld.help}</p>}
          {fieldErrors[fld.name] && <p id={`${id}-${fld.name}-err`} className="mt-2 t-caption text-signal-critical">{fieldErrors[fld.name]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor={`${id}-language`} className={labelCls}>{d.fields.language}</label>
        <select key={`language-${draft ? "d" : "n"}`} id={`${id}-language`} name="language" defaultValue={draft?.language === "en" || draft?.language === "es" ? draft.language : locale} aria-describedby={`${id}-language-help`} className={inputCls}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <p id={`${id}-language-help`} className="mt-2 t-caption text-text-muted">{d.languageHelp}</p>
      </div>
      {error && <p role="alert" className="rounded-md bg-apricot-100 px-4 py-3 t-body-s text-text-primary">{error}</p>}
      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" full busy={run.busy} disabled={run.busy}>{run.busy ? d.submitting : d.submit}</Button>
        <p className="t-caption text-text-muted">
          {d.privacy.replace(/Read the privacy notice\.|Lee el aviso de privacidad\./, "")}{" "}
          <Link href={localePath(locale, "/legal/privacy")} className="text-text-accent underline underline-offset-4">{locale === "es" ? "Aviso de privacidad" : "Privacy notice"}</Link>
        </p>
      </div>
      {stub && <p className="t-caption text-text-muted"><LabelChip tone="attention">{dict.common.env.stub.label}</LabelChip> {d.stubNotice}</p>}
      <p className="t-body-s text-text-secondary">
        {d.haveAccount} <Link href={localePath(locale, "/login")} className="text-text-accent underline underline-offset-4">{d.loginLink}</Link>
      </p>
      <p role="status" aria-live="polite" className="sr-only" data-form-status>{run.busy ? d.submitting : ""}</p>
    </form>
  );
}

/** Sends the confirmation e-mail again. The same answer whether or not the address is known. */
function ResendButton({ locale, email }: { locale: Locale; email: string }) {
  const d = getDictionary(locale).login;
  const [state, setState] = useState<"idle" | "busy" | "sent" | "failed">("idle");
  async function resend() {
    if (state === "busy") return;
    setState("busy");
    const r = await post("/api/bff/auth/resend", { email, language: locale });
    setState(r.ok ? "sent" : "failed");
  }
  return (
    <div className="flex flex-col gap-2">
      <Button type="button" variant="tertiary" onClick={() => void resend()} busy={state === "busy"} disabled={state === "busy" || state === "sent"} data-resend>
        {d.resend}
      </Button>
      {state === "sent" && <p role="status" className="t-caption text-signal-positive">{d.resent.replace("{email}", email)}</p>}
      {state === "failed" && <p role="alert" className="t-caption text-signal-critical">{d.resendFailed}</p>}
    </div>
  );
}

/**
 * Registration step for a confirmed user without an agency (tenant-api `register`, v2 §2).
 * The agency name is prefilled from what was entered at sign-up; the server decides everything else.
 */
export function RegisterForm({ locale, agencyNameHint }: { locale: Locale; agencyNameHint: string | null }) {
  const dict = getDictionary(locale);
  const d = dict.onboarding.register;
  const id = useId();
  const run = useRunning();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (run.busy) return;
    const f = new FormData(e.currentTarget);
    const agency_name = String(f.get("agency_name") ?? "").trim();
    if (!agency_name) return setError(dict.common.errors.invalid_agency_name);
    if (!run.start()) return;
    setError(null);
    try {
      const r = await post("/api/bff/register", { agency_name, language: f.get("language"), timezone: f.get("timezone") });
      if (r.ok) {
        run.leave(localePath(locale, "/onboarding"));
        return;
      }
      // AUTH_COPY_v1 §4.1: a backend failure leaves nothing behind, and the text says so.
      setError(r.code === "server_error" ? d.backendError : (dict.common.errors as Record<string, string>)[r.code] ?? dict.common.errors.generic);
    } finally {
      run.settle();
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" data-register aria-busy={run.busy || undefined}>
      <div>
        <label htmlFor={`${id}-name`} className={labelCls}>{d.agencyName}</label>
        <input id={`${id}-name`} name="agency_name" type="text" autoComplete="organization" defaultValue={agencyNameHint ?? ""} maxLength={120} aria-describedby={`${id}-name-help`} className={inputCls} />
        <p id={`${id}-name-help`} className="mt-2 t-caption text-text-muted">{d.agencyNameHelp}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-lang`} className={labelCls}>{d.language}</label>
          <select id={`${id}-lang`} name="language" defaultValue={locale === "en" ? "en" : "es"} aria-describedby={`${id}-lang-help`} className={inputCls}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <p id={`${id}-lang-help`} className="mt-2 t-caption text-text-muted">{d.languageHelp}</p>
        </div>
        <div>
          <label htmlFor={`${id}-tz`} className={labelCls}>{d.timezone}</label>
          <select id={`${id}-tz`} name="timezone" defaultValue="Europe/Madrid" className={inputCls}>
            <option value="Europe/Madrid">Europe/Madrid</option>
            <option value="Atlantic/Canary">Atlantic/Canary</option>
          </select>
        </div>
      </div>
      {error && <p role="alert" className="t-body-s text-signal-critical">{error}</p>}
      <Button type="submit" size="lg" busy={run.busy} disabled={run.busy}>{run.busy ? d.submitting : d.submit}</Button>
      <p role="status" aria-live="polite" className="sr-only" data-form-status>{run.busy ? d.submitting : ""}</p>
    </form>
  );
}

/** Set the password behind a verified invite or recovery link (token stays in an httpOnly cookie). */
export function SetPasswordForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.welcome;
  const id = useId();
  const run = useRunning();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (run.busy) return;
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password") ?? "");
    if (password.length < 10) return setError(dict.common.errors.weak_password);
    if (password !== String(f.get("confirm") ?? "")) return setError(d.mismatch);
    if (!run.start()) return;
    setError(null);
    try {
      const r = await post("/api/bff/auth/set-password", { password });
      if (r.ok) {
        run.leave(localePath(locale, "/onboarding"));
        return;
      }
      setError((dict.common.errors as Record<string, string>)[r.code] ?? dict.common.errors.generic);
    } finally {
      run.settle();
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" data-set-password aria-busy={run.busy || undefined}>
      <div>
        <label htmlFor={`${id}-pw`} className={labelCls}>{d.password}</label>
        <input id={`${id}-pw`} name="password" type="password" autoComplete="new-password" aria-describedby={`${id}-help`} className={inputCls} />
        <p id={`${id}-help`} className="mt-2 t-caption text-text-muted">{d.help}</p>
      </div>
      <div>
        <label htmlFor={`${id}-confirm`} className={labelCls}>{d.confirm}</label>
        <input id={`${id}-confirm`} name="confirm" type="password" autoComplete="new-password" className={inputCls} />
      </div>
      {error && <p role="alert" className="t-body-s text-signal-critical">{error}</p>}
      <Button type="submit" size="lg" full busy={run.busy} disabled={run.busy}>{run.busy ? d.submitting : d.submit}</Button>
      <p role="status" aria-live="polite" className="sr-only" data-form-status>{run.busy ? d.submitting : ""}</p>
    </form>
  );
}

/**
 * Log in. `confirmed` is set when the person arrives from the confirmation e-mail (or from the
 * sign-up page): a confirmed account without an agency continues to the registration step after
 * this login. An unconfirmed account gets the confirmation e-mail again from here.
 *
 * Running state (owner finding 2026-10-01): from the first submit the button is disabled, says
 * "Logging you in…" with a quiet ring and stays that way until the next page has replaced this one.
 * A second click or Enter sends nothing. Only a failure (wrong login, a timeout, an unreachable
 * server) frees the button, with its sentence above it, so a retry is always possible.
 */
export function LoginForm({ locale, confirmed = false, next }: { locale: Locale; confirmed?: boolean; next?: string }) {
  const dict = getDictionary(locale);
  const d = dict.login;
  const id = useId();
  const run = useRunning();
  const [error, setError] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [forgot, setForgot] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (run.busy) return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (!email || !password) {
      setError(d.errors.required);
      return;
    }
    if (!run.start()) return;
    setError(null);
    setUnconfirmedEmail(null);
    try {
      const r = await post("/api/bff/auth/login", { email, password });
      if (r.ok) {
        // Back to the surface that sent the person here (the page validated it), otherwise the agency home.
        run.leave(next && /^\/(en|es)(\/|\?|$)/.test(next) ? next : localePath(locale, "/app"));
        return;
      }
      if (r.code === "email_not_confirmed") setUnconfirmedEmail(email);
      const rate = (dict.signup.rateErrors as Record<string, string>)[r.code];
      setError(rate ?? (d.errors as Record<string, string>)[r.code] ?? (dict.common.errors as Record<string, string>)[r.code] ?? d.errors.server_error);
    } finally {
      run.settle();
    }
  }

  const running = run.busy ? (run.leaving ? d.redirecting : d.submitting) : "";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" data-login-form aria-busy={run.busy || undefined} data-login-state={run.leaving ? "leaving" : run.busy ? "busy" : "idle"}>
      {confirmed && (
        <p role="status" className="rounded-md bg-sage-100 px-4 py-3 t-body-s text-text-primary" data-confirmed-hint>{d.confirmedHint}</p>
      )}
      <div>
        <label htmlFor={`${id}-email`} className={labelCls}>{d.fields.email}</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={inputCls} />
      </div>
      <div>
        <label htmlFor={`${id}-password`} className={labelCls}>{d.fields.password}</label>
        <input id={`${id}-password`} name="password" type="password" autoComplete="current-password" className={inputCls} />
      </div>
      {error && <p role="alert" className="rounded-md bg-apricot-100 px-4 py-3 t-body-s text-text-primary">{error}</p>}
      {unconfirmedEmail && <ResendButton locale={locale} email={unconfirmedEmail} />}
      <Button type="submit" size="lg" full busy={run.busy} disabled={run.busy}>{run.busy ? d.submitting : d.submit}</Button>
      <div className="space-y-3">
        <button type="button" onClick={() => setForgot(true)} className="min-h-[44px] t-body-s text-text-accent underline underline-offset-4">{d.forgot}</button>
        {forgot && <p role="status" className="t-body-s text-text-secondary">{d.forgotUnavailable}</p>}
        <p className="t-body-s text-text-secondary">
          {d.noAccount} <Link href={localePath(locale, "/signup")} className="text-text-accent underline underline-offset-4">{d.createLink}</Link>
        </p>
      </div>
      {/* The running state for screen readers: announced when it changes, silent otherwise. */}
      <p role="status" aria-live="polite" className="sr-only" data-form-status>{running}</p>
    </form>
  );
}
