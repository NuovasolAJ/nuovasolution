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
    if (values.password.length < 8) fe.password = d.errors.shortPassword;
    setFieldErrors(fe);
    if (Object.keys(fe).length) return;

    setBusy(true);
    setError(null);
    try {
      const r = await post("/api/bff/signup", values);
      if (r.ok) {
        if (r.stub) setStub(true);
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
