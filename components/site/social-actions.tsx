"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";

/**
 * The write side of the four social screens (SOCIAL_ACTIONS_CONTRACT_v1 §1, SOCIAL_UI_ACTION_WIRING_PATCH_v1 §3).
 * Every control here posts one action name to /api/bff/social/action; the server resolves the tenant from
 * the session and the provider identifiers from its own read of the state. The browser never holds a token,
 * an ops secret or a third party's provider id, and never decides a permission: a control is switched on
 * when the read state suggests it, and every refusal comes back as a reason shown next to the control.
 *
 * `off`: the reason code why the control is switched off (from the activation rules in the server view),
 * or null when it may be used. The sentence for each code is in the dictionary (social.actions).
 */
export type OffReason = "noRelease" | "notConfigured" | "needsConnection" | "limitReached" | "stub" | null;
export type SocialActionName = "begin_connect" | "account_check" | "draft" | "approve" | "publish" | "verify_publish" | "poll_comments" | "poll_dms" | "reply_public" | "reply_private" | "dm_reply" | "disconnect";

type Env = { ok: boolean; code: string; stub?: true; details?: Record<string, unknown> };

async function act(body: Record<string, unknown>): Promise<Env> {
  try {
    const res = await fetch("/api/bff/social/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return (await res.json().catch(() => ({ ok: false, code: "server_error" }))) as Env;
  } catch {
    return { ok: false, code: "connection" };
  }
}

function useActions(locale: Locale) {
  const dict = getDictionary(locale);
  const a = dict.social.actions;
  const reasons = a.reasons as Record<string, string>;
  const common = dict.common.errors as Record<string, string>;
  /** The sentence for an answer that is not a success: a refusal with its reason, or a problem on our side. */
  function explain(r: Env): string {
    if (r.code === "ops_auth_failed" || r.code === "server_error" || r.code === "connection" || r.code === "timeout") return a.serverProblem;
    if (reasons[r.code]) return a.refused.replace("{reason}", reasons[r.code]);
    if (common[r.code]) return common[r.code];
    return a.refused.replace("{reason}", r.code.replace(/_/g, " "));
  }
  return { a, explain };
}

function OffNote({ reason, locale }: { reason: Exclude<OffReason, null>; locale: Locale }) {
  const { a } = useActions(locale);
  return <p className="t-caption text-text-muted" data-social-off={reason}>{a[reason]}</p>;
}

/** One action button with its own result line. */
export function SocialAction({
  locale,
  action,
  label,
  off,
  post,
  variant = "primary",
  okText,
  className,
  children,
}: {
  locale: Locale;
  action: SocialActionName;
  label: string;
  off: OffReason;
  post?: string;
  variant?: "primary" | "secondary";
  /** What a success says; the page is read again afterwards. */
  okText?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { a, explain } = useActions(locale);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  async function run() {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    const r = await act({ action, post });
    setBusy(false);
    if (r.ok) {
      setMsg({ tone: "ok", text: okText ?? a.done });
      router.refresh();
      return;
    }
    // A publish whose outcome is unknown is never repeated: the sentence says to check the status (contract §3).
    setMsg({ tone: "error", text: action === "publish" && (r.code === "connection" || r.code === "timeout") ? a.unclear : explain(r) });
  }
  return (
    <div className={cn("flex flex-col gap-2", className)} data-social-action={action}>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" variant={variant} disabled={busy || off !== null} busy={busy} onClick={() => void run()} data-social-inert={off !== null ? off : undefined}>
          {busy ? a.running : label}
        </Button>
        {children}
      </div>
      {off && <OffNote reason={off} locale={locale} />}
      {msg && <p role={msg.tone === "error" ? "alert" : "status"} className={cn("t-caption", msg.tone === "error" ? "text-signal-critical" : "text-signal-positive")} data-social-result={msg.tone}>{msg.text}</p>}
    </div>
  );
}

/**
 * Connect Instagram (screen A): opens the provider's authorisation link in a new tab and reads the
 * state every 3 seconds, for at most 5 minutes, until a connected account appears; then the page is
 * refreshed. The tab is opened from the click itself, so a pop-up blocker lets it through.
 */
export function ConnectAction({ locale, label, off, checkLabel }: { locale: Locale; label: string; off: OffReason; checkLabel: string }) {
  const { a, explain } = useActions(locale);
  const router = useRouter();
  const [busy, setBusy] = useState<"connect" | "check" | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error" | "wait"; text: string } | null>(null);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  async function connect() {
    if (busy) return;
    setBusy("connect");
    setMsg(null);
    // The window is opened before the request answers (same user gesture), then pointed at the link.
    const win = window.open("", "_blank", "noopener");
    const r = await act({ action: "begin_connect" });
    const url = typeof r.details?.authorize_url === "string" && /^https:\/\//.test(r.details.authorize_url) ? r.details.authorize_url : null;
    if (!r.ok || !url) {
      win?.close();
      setBusy(null);
      setMsg({ tone: "error", text: explain(r) });
      return;
    }
    if (win) win.location.href = url;
    else {
      setBusy(null);
      setMsg({ tone: "error", text: a.popupBlocked });
      return;
    }
    setMsg({ tone: "wait", text: a.connectOpened });
    const started = Date.now();
    timer.current = window.setInterval(async () => {
      try {
        const res = await fetch("/api/bff/social/state?screen=connect", { cache: "no-store" });
        const j = (await res.json()) as { ok: boolean; details?: { connection?: { status: string }[] } };
        if (j.ok && j.details?.connection?.some((c) => c.status === "connected")) {
          if (timer.current) window.clearInterval(timer.current);
          setBusy(null);
          setMsg({ tone: "ok", text: a.done });
          router.refresh();
          return;
        }
      } catch {
        /* a failed poll is tried again on the next tick */
      }
      if (Date.now() - started > 5 * 60 * 1000) {
        if (timer.current) window.clearInterval(timer.current);
        setBusy(null);
        setMsg({ tone: "error", text: a.connectWaited });
      }
    }, 3000);
  }
  async function check() {
    if (busy) return;
    setBusy("check");
    setMsg(null);
    const r = await act({ action: "account_check" });
    setBusy(null);
    if (!r.ok) return setMsg({ tone: "error", text: explain(r) });
    const name = typeof r.details?.account_name === "string" ? r.details.account_name : "—";
    const type = typeof r.details?.account_type === "string" ? r.details.account_type : "—";
    setMsg({ tone: "ok", text: a.accountChecked.replace("{name}", name).replace("{type}", type) });
  }
  return (
    <div className="flex flex-col gap-2" data-social-action="begin_connect">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" disabled={busy !== null || off !== null} busy={busy === "connect"} onClick={() => void connect()} data-social-inert={off !== null ? off : undefined}>
          {busy === "connect" ? a.running : label}
        </Button>
        <Button type="button" size="sm" variant="secondary" disabled={busy !== null || off !== null} busy={busy === "check"} onClick={() => void check()} data-social-inert={off !== null ? off : undefined}>
          {checkLabel}
        </Button>
      </div>
      {off && <OffNote reason={off} locale={locale} />}
      {msg && <p role={msg.tone === "error" ? "alert" : "status"} className={cn("t-caption", msg.tone === "error" ? "text-signal-critical" : msg.tone === "ok" ? "text-signal-positive" : "text-text-secondary")} data-social-result={msg.tone}>{msg.text}</p>}
    </div>
  );
}

/**
 * Screen B, the middle of the customer path (SOCIAL_UI_ACTION_WIRING_PATCH_v1 §2b; Social 2026-10-09 gaps 2 and 3):
 * "Create the text" drafts a post for one listing (the key is the listing's key of the read state; the server
 * turns it into the property id), shows the caption that came back, and "Approve" queues it with the draft's
 * own id. Nothing is published here: a queued post is published from the posts list, with the release.
 */
export function DraftApprove({ locale, listing, off, labels }: { locale: Locale; listing: string; off: OffReason; labels: { draft: string; approve: string; drafted: string; approved: string; testMarker: string; noImage: string; language: string } }) {
  const { a, explain } = useActions(locale);
  const router = useRouter();
  const [busy, setBusy] = useState<"draft" | "approve" | null>(null);
  const [draft, setDraft] = useState<{ id: string | null; caption: string; test: boolean; media: number } | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [done, setDone] = useState(false);
  async function makeDraft() {
    if (busy) return;
    setBusy("draft");
    setMsg(null);
    const r = await act({ action: "draft", listing, language: locale });
    setBusy(null);
    if (!r.ok) return setMsg({ tone: "error", text: explain(r) });
    const d = r.details ?? {};
    setDraft({ id: typeof d.variant_id === "string" ? d.variant_id : null, caption: typeof d.caption === "string" ? d.caption : "", test: d.test_marker === true, media: typeof d.media_attached === "number" ? d.media_attached : 0 });
    setMsg({ tone: "ok", text: labels.drafted });
  }
  async function approve() {
    if (busy || !draft?.id) return;
    setBusy("approve");
    setMsg(null);
    const r = await act({ action: "approve", draft: draft.id });
    setBusy(null);
    if (!r.ok) return setMsg({ tone: "error", text: explain(r) });
    setDone(true);
    setMsg({ tone: "ok", text: labels.approved });
    router.refresh();
  }
  return (
    <div className="flex flex-col gap-3" data-social-draft={done ? "queued" : draft ? "drafted" : "none"}>
      <div className="flex flex-wrap items-center gap-3">
        {!draft && <Button type="button" size="sm" variant="secondary" disabled={busy !== null || off !== null} busy={busy === "draft"} onClick={() => void makeDraft()} data-social-inert={off ?? undefined} data-social-action="draft">{busy === "draft" ? a.running : labels.draft}</Button>}
        {draft && !done && <Button type="button" size="sm" disabled={busy !== null || off !== null || !draft.id} busy={busy === "approve"} onClick={() => void approve()} data-social-inert={off ?? undefined} data-social-action="approve">{busy === "approve" ? a.running : labels.approve}</Button>}
      </div>
      {draft && (
        <div className="rounded-lg border border-line-hairline bg-surface-raised p-4" data-social-caption>
          <p className="t-caption text-text-muted">{labels.language}: {locale === "es" ? "Español" : "English"}{draft.media === 0 ? ` · ${labels.noImage}` : ""}</p>
          <p className="mt-1 whitespace-pre-line t-body-s text-text-primary">{draft.caption}</p>
          {draft.test && <p className="mt-2 t-caption text-signal-attention">{labels.testMarker}</p>}
        </div>
      )}
      {off && <OffNote reason={off} locale={locale} />}
      {msg && <p role={msg.tone === "error" ? "alert" : "status"} className={cn("t-caption", msg.tone === "error" ? "text-signal-critical" : "text-signal-positive")} data-social-result={msg.tone}>{msg.text}</p>}
    </div>
  );
}

/** A reply to a comment (public, or one private reply) or to a message. The target is the entry's key; the server resolves it. */
export function ReplyBox({ locale, signal, kind, off, labels }: { locale: Locale; signal: string; kind: "comment" | "message"; off: OffReason; labels: { field: string; publicLabel: string; privateLabel: string; messageLabel: string } }) {
  const { a, explain } = useActions(locale);
  const router = useRouter();
  const id = useId();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState<SocialActionName | null>(null);
  const [msg, setMsg] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [sent, setSent] = useState(false);
  async function send(action: "reply_public" | "reply_private" | "dm_reply") {
    if (busy || !text.trim()) return;
    setBusy(action);
    setMsg(null);
    const r = await act({ action, signal, message: text.trim() });
    setBusy(null);
    if (r.ok) {
      setSent(true); // after a sent answer the field stays disabled (contract §1)
      setMsg({ tone: "ok", text: a.sent });
      router.refresh();
      return;
    }
    setMsg({ tone: "error", text: explain(r) });
  }
  const disabled = off !== null || sent || busy !== null;
  return (
    <div data-social-reply={signal}>
      <label htmlFor={id} className="t-caption text-text-muted">{labels.field}</label>
      <textarea id={id} rows={2} maxLength={1000} value={text} onChange={(e) => setText(e.target.value)} disabled={disabled} className="mt-1 block w-full resize-none rounded-md border border-line-strong bg-surface-raised px-3.5 py-2.5 t-body-s text-text-primary disabled:bg-surface-sunken disabled:opacity-70" />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {kind === "comment" ? (
          <>
            <Button type="button" size="sm" disabled={disabled || !text.trim()} busy={busy === "reply_public"} onClick={() => void send("reply_public")} data-social-inert={off ?? undefined}>{labels.publicLabel}</Button>
            <Button type="button" size="sm" variant="secondary" disabled={disabled || !text.trim()} busy={busy === "reply_private"} onClick={() => void send("reply_private")} data-social-inert={off ?? undefined}>{labels.privateLabel}</Button>
          </>
        ) : (
          <Button type="button" size="sm" disabled={disabled || !text.trim()} busy={busy === "dm_reply"} onClick={() => void send("dm_reply")} data-social-inert={off ?? undefined}>{labels.messageLabel}</Button>
        )}
      </div>
      {off && <div className="mt-2"><OffNote reason={off} locale={locale} /></div>}
      {msg && <p role={msg.tone === "error" ? "alert" : "status"} className={cn("mt-2 t-caption", msg.tone === "error" ? "text-signal-critical" : "text-signal-positive")} data-social-result={msg.tone}>{msg.text}</p>}
    </div>
  );
}
