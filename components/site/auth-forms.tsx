"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { LabelChip } from "@/components/ui/status";

const inputCls = "mt-2 h-12 w-full rounded-sm border border-line-interactive bg-surface-raised px-4 t-body-m text-text-primary placeholder:text-text-muted";
const labelCls = "block t-body-s text-text-primary";

type Env = { ok: boolean; code: string; stub?: true; details?: { next?: string; session?: boolean } };

async function post(url: string, body: unknown): Promise<Env> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return (await res.json()) as Env;
}

export function SignupForm({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).signup;
  const router = useRouter();
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [stub, setStub] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    if (Object.keys(fe).length) return;

    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/bff/signup", values);
      if (r.ok) {
        if (r.stub) setStub(true);
        // Staging/live: e-mail confirmation first; the link brings the user back signed in.
        if (r.details?.next === "confirm") {
          setSent(values.email);
          return;
        }
        router.push(localePath(locale, r.details?.session ? "/onboarding" : "/login"));
        return;
      }
      const msg = (d.errors as Record<string, string>)[r.code] ?? (getDictionary(locale).common.errors as Record<string, string>)[r.code] ?? d.errors.server_error;
      setError(msg);
    } catch {
      setError(d.errors.server_error);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <p role="status" className="border border-line-strong bg-surface-raised p-5 t-body-m text-text-secondary" data-signup-sent>
        {d.checkEmail.replace("{email}", sent)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {[
        { name: "name", label: d.fields.name, type: "text", auto: "name" },
        { name: "agency_name", label: d.fields.agency, type: "text", auto: "organization" },
        { name: "email", label: d.fields.email, type: "email", auto: "email", placeholder: d.fields.emailPlaceholder },
        { name: "password", label: d.fields.password, type: "password", auto: "new-password" },
      ].map((fld) => (
        <div key={fld.name}>
          <label htmlFor={`${id}-${fld.name}`} className={labelCls}>{fld.label}</label>
          <input id={`${id}-${fld.name}`} name={fld.name} type={fld.type} autoComplete={fld.auto} placeholder={fld.placeholder} className={inputCls} aria-invalid={Boolean(fieldErrors[fld.name])} aria-describedby={fieldErrors[fld.name] ? `${id}-${fld.name}-err` : undefined} />
          {fieldErrors[fld.name] && <p id={`${id}-${fld.name}-err`} className="mt-2 t-caption text-signal-critical">{fieldErrors[fld.name]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor={`${id}-language`} className={labelCls}>{d.fields.language}</label>
        <select id={`${id}-language`} name="language" defaultValue={locale} className={inputCls}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      {error && <p role="alert" className="t-body-s text-signal-critical">{error}</p>}
      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" full busy={busy} disabled={busy}>{busy ? d.submitting : d.submit}</Button>
        <p className="t-caption text-text-muted">
          {d.privacy.replace(/Read the privacy notice\.|Lee el aviso de privacidad\./, "")}{" "}
          <Link href={localePath(locale, "/legal/privacy")} className="text-text-accent underline underline-offset-4">{locale === "es" ? "Aviso de privacidad" : "Privacy notice"}</Link>
        </p>
      </div>
      {stub && <p className="t-caption text-text-muted"><LabelChip tone="attention">{getDictionary(locale).common.env.stub.label}</LabelChip> {d.stubNotice}</p>}
      <p className="t-body-s text-text-secondary">
        {d.haveAccount} <Link href={localePath(locale, "/login")} className="text-text-accent underline underline-offset-4">{d.loginLink}</Link>
      </p>
    </form>
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const agency_name = String(f.get("agency_name") ?? "").trim();
    if (!agency_name) return setError(dict.common.errors.invalid_agency_name);
    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/bff/register", { agency_name, language: f.get("language"), timezone: f.get("timezone") });
      if (r.ok) {
        window.location.assign(localePath(locale, "/onboarding"));
        return;
      }
      setError((dict.common.errors as Record<string, string>)[r.code] ?? dict.common.errors.generic);
    } catch {
      setError(dict.common.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" data-register>
      <div>
        <label htmlFor={`${id}-name`} className={labelCls}>{d.agencyName}</label>
        <input id={`${id}-name`} name="agency_name" type="text" autoComplete="organization" defaultValue={agencyNameHint ?? ""} maxLength={120} className={inputCls} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-lang`} className={labelCls}>{d.language}</label>
          <select id={`${id}-lang`} name="language" defaultValue={locale === "en" ? "en" : "es"} className={inputCls}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
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
      <Button type="submit" size="lg" busy={busy} disabled={busy}>{busy ? d.submitting : d.submit}</Button>
    </form>
  );
}

/** Set the password behind a verified invite or recovery link (token stays in an httpOnly cookie). */
export function SetPasswordForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.welcome;
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password") ?? "");
    if (password.length < 10) return setError(dict.common.errors.weak_password);
    if (password !== String(f.get("confirm") ?? "")) return setError(d.mismatch);
    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/bff/auth/set-password", { password });
      if (r.ok) {
        window.location.assign(localePath(locale, "/onboarding"));
        return;
      }
      setError((dict.common.errors as Record<string, string>)[r.code] ?? dict.common.errors.generic);
    } catch {
      setError(dict.common.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" data-set-password>
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
      <Button type="submit" size="lg" full busy={busy} disabled={busy}>{busy ? d.submitting : d.submit}</Button>
    </form>
  );
}

export function LoginForm({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).login;
  const router = useRouter();
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgot, setForgot] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (!email || !password) {
      setError(d.errors.required);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/bff/auth/login", { email, password });
      if (r.ok) {
        router.push(localePath(locale, "/onboarding"));
        return;
      }
      setError((d.errors as Record<string, string>)[r.code] ?? (getDictionary(locale).common.errors as Record<string, string>)[r.code] ?? d.errors.server_error);
    } catch {
      setError(d.errors.server_error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-email`} className={labelCls}>{d.fields.email}</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={inputCls} />
      </div>
      <div>
        <label htmlFor={`${id}-password`} className={labelCls}>{d.fields.password}</label>
        <input id={`${id}-password`} name="password" type="password" autoComplete="current-password" className={inputCls} />
      </div>
      {error && <p role="alert" className="t-body-s text-signal-critical">{error}</p>}
      <Button type="submit" size="lg" full busy={busy} disabled={busy}>{busy ? d.submitting : d.submit}</Button>
      <div className="space-y-3">
        <button type="button" onClick={() => setForgot(true)} className="t-body-s text-text-accent underline underline-offset-4">{d.forgot}</button>
        {forgot && <p role="status" className="t-body-s text-text-secondary">{d.forgotUnavailable}</p>}
        <p className="t-body-s text-text-secondary">
          {d.noAccount} <Link href={localePath(locale, "/signup")} className="text-text-accent underline underline-offset-4">{d.createLink}</Link>
        </p>
      </div>
    </form>
  );
}
