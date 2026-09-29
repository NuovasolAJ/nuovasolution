import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { SocialListing, SocialPost, SocialScreen, SocialSignal, SocialState } from "@/lib/contracts/social";
import { Button, ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Display, Eyebrow, Heading, Lead } from "@/components/ui/type";
import { LabelChip, StatusGlyph, type Glyph } from "@/components/ui/status";

/**
 * The four social screens (SOCIAL_UI_SPEC_v1 §2), read side. Everything here renders what the
 * server read for the signed-in user. The screens decide no permission: a control whose action
 * is not switched on is shown disabled, next to the sentence that says why.
 */

const PATHS: Record<SocialScreen, string> = { connect: "/social", post: "/social/post", inbox: "/social/inbox", settings: "/social/settings" };

function when(locale: Locale, iso: string | null, withTime = true): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", { dateStyle: "medium", ...(withTime ? { timeStyle: "short" } : {}), timeZone: "Europe/Madrid" }).format(new Date(iso));
}

function Note({ glyph, tone = "neutral", children, className }: { glyph: Glyph; tone?: "neutral" | "attention" | "positive"; children: ReactNode; className?: string }) {
  const c = tone === "attention" ? "text-signal-attention" : tone === "positive" ? "text-signal-positive" : "text-text-muted";
  return (
    <p className={cn("flex items-start gap-2 t-body-s text-text-secondary", className)}>
      <StatusGlyph glyph={glyph} className={cn("mt-1 shrink-0", c)} />
      <span>{children}</span>
    </p>
  );
}

export function SocialShell({ locale, screen, state, problem, children }: { locale: Locale; screen: SocialScreen; state: SocialState | null; problem: string | null; children: ReactNode }) {
  const d = getDictionary(locale);
  const s = d.social;
  const head = s[screen];
  return (
    <>
      <Section rhythm="opening" labelledBy="social-h1" className="!pb-10">
        <div className="container-default">
          <div className="xl:max-w-[62%]">
            <Eyebrow className="mb-4">{s.eyebrow}</Eyebrow>
            <Display size="l" as="h1" id="social-h1">{head.h1}</Display>
            <Lead className="mt-4">{head.lead}</Lead>
          </div>
          <nav aria-label={s.navLabel} className="mt-10 -mx-1 flex gap-1 overflow-x-auto pb-1" data-social-nav>
            {(Object.keys(PATHS) as SocialScreen[]).map((k) => (
              <Link
                key={k}
                href={localePath(locale, PATHS[k])}
                aria-current={k === screen ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 items-center rounded-pill px-4 t-body-s transition-colors duration-micro",
                  k === screen ? "bg-ink-950 text-ivory" : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary",
                )}
              >
                {s.tabs[k]}
              </Link>
            ))}
          </nav>
        </div>
      </Section>
      <div className="band band-sand band-shoulders" data-social-screen={screen} data-social-source={state ? (state.stub ? "stub" : "backend") : "none"}>
        <div className="container-default pb-24 pt-10 md:pt-14">
          {state ? (
            <>
              {children}
              <div className="mt-10 flex flex-col gap-3 border-t border-line-hairline pt-6 md:flex-row md:items-center md:justify-between">
                <Note glyph="rule">{s.readOnly}</Note>
                <p className="flex shrink-0 items-center gap-3 t-caption text-text-muted">
                  <span data-social-asof>{s.asOf}: {when(locale, state.as_of)}</span>
                  <a href={localePath(locale, PATHS[screen])} className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-text-primary">{s.refresh}</a>
                </p>
              </div>
            </>
          ) : (
            <div role="alert" data-social-problem={problem ?? ""} className="stage p-6 md:p-8">
              <Note glyph="triangle" tone="attention" className="t-body-m">
                {(d.common.errors as Record<string, string>)[problem ?? ""] ?? s.problem}
              </Note>
              <div className="mt-6">
                <ButtonLink href={localePath(locale, PATHS[screen])} variant="secondary" size="sm">{s.refresh}</ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** A control whose action is not switched on in this step: visible, disabled, never a fake. */
function Inert({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Button type="button" size="sm" variant={variant} disabled data-social-inert>
      {children}
    </Button>
  );
}

// ---------------- Screen A: connect ----------------

export function ConnectScreen({ locale, state }: { locale: Locale; state: SocialState }) {
  const s = getDictionary(locale).social;
  const c = s.connect;
  const live = state.connection.filter((x) => x.status === "connected");
  const past = state.connection.filter((x) => x.status !== "connected");
  const gate = !state.entitlement.tenant_active ? "inactive" : state.entitlement.publish === "enabled" ? null : "unavailable";
  const view = live.length ? "connected" : gate ? gate : "disconnected";
  return (
    <div className="grid gap-6 xl:grid-cols-12" data-connect-state={view}>
      <div className="stage p-6 md:p-8 xl:col-span-7">
        {live.length > 0 ? (
          <ul className="space-y-6">
            {live.map((x, i) => (
              <li key={i}>
                <div className="flex flex-wrap items-center gap-3">
                  <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-pill field-sand text-text-primary"><StatusGlyph glyph="link" size={18} /></span>
                  <div className="min-w-0">
                    <p className="t-heading-m text-text-primary break-words">{x.display_name ?? c.account}</p>
                    <p className="t-caption text-text-muted capitalize">{x.platform}</p>
                  </div>
                  <span className="float-chip ml-auto !shadow-none"><StatusGlyph glyph="check" className="text-signal-positive" />{c.connected}</span>
                </div>
                <dl className="mt-6 grid gap-4 border-t border-line-hairline pt-5 md:grid-cols-2">
                  <div><dt className="t-caption text-text-muted">{c.since}</dt><dd className="mt-1 t-body-m text-text-primary">{when(locale, x.connected_at)}</dd></div>
                  <div><dt className="t-caption text-text-muted">{c.platform}</dt><dd className="mt-1 t-body-m text-text-primary capitalize">{x.platform}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <Heading size="m" as="h2">{gate ? c[gate] : c.none}</Heading>
            <div className="mt-6"><Inert>{c.action}</Inert></div>
          </div>
        )}
        {live.length > 0 && (
          <div className="mt-8">
            <ButtonLink href={localePath(locale, PATHS.settings)} variant="secondary" size="sm">{c.manage}</ButtonLink>
          </div>
        )}
      </div>
      <aside aria-labelledby="social-uses" className="xl:col-span-5 xl:pl-4" data-connect-uses>
        <Heading size="s" as="h2" id="social-uses">{c.usesH}</Heading>
        <ul className="mt-4 space-y-3">
          {c.uses.map((u) => (
            <li key={u} className="flex items-start gap-2 t-body-s text-text-secondary">
              <StatusGlyph glyph="check" className="mt-1 shrink-0 text-text-muted" />
              <span>{u}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line-hairline pt-4 t-body-s text-text-primary">{c.never}</p>
      </aside>
      {past.length > 0 && (
        <div className="xl:col-span-12">
          <ul className="grid gap-3 md:grid-cols-2">
            {past.map((x, i) => (
              <li key={i} className="card-quiet p-5">
                <p className="t-body-m text-text-primary break-words">{x.display_name ?? c.account}</p>
                <p className="mt-1 t-caption text-text-muted">{c.disconnected}{x.disconnected_at ? ` · ${c.until} ${when(locale, x.disconnected_at, false)}` : ""}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------- Screen B: post ----------------

function ListingRow({ locale, l }: { locale: Locale; l: SocialListing }) {
  const p = getDictionary(locale).social.post;
  const price = l.price === null ? null : new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(l.price);
  return (
    <li className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6" data-listing-ready={l.ready ? "yes" : "no"}>
      <div className="min-w-0">
        <p className="t-heading-s text-text-primary break-words">{l.title}</p>
        <p className="mt-1 t-body-s text-text-secondary">{[l.location, price].filter(Boolean).join(" · ")}</p>
        {l.ready ? (
          <Note glyph="check" tone="positive" className="mt-3">{p.ready}</Note>
        ) : (
          <div className="mt-3" data-listing-blocked>
            <Note glyph="lock" tone="attention">{p.blocked}</Note>
            <ul className="mt-1 space-y-1 pl-6 t-body-s text-text-primary">
              {(l.reasons.length ? l.reasons : (["other"] as const)).map((r) => (
                <li key={r}>{p.reasons[r].replace("{hours}", String(l.max_age_hours ?? 168))}</li>
              ))}
            </ul>
          </div>
        )}
        {l.last_seen_at && <p className="mt-2 t-caption text-text-muted">{p.dataFrom} {when(locale, l.last_seen_at)}</p>}
      </div>
      <div><Inert variant="secondary">{p.choose}</Inert></div>
    </li>
  );
}

function PostRow({ locale, x }: { locale: Locale; x: SocialPost }) {
  const p = getDictionary(locale).social.post;
  const glyph: Glyph = x.state === "published" ? "check" : x.state === "queued" ? "clock" : x.state === "delivery_unknown" ? "triangle" : x.state === "blocked" ? "lock" : "rule";
  const tone = x.state === "published" ? "positive" : x.state === "delivery_unknown" || x.state === "blocked" ? "attention" : "neutral";
  return (
    <li className="p-5 md:p-6" data-post-state={x.state}>
      <div className="flex flex-wrap items-center gap-3">
        <Note glyph={glyph} tone={tone} className="t-body-m !text-text-primary">{p.states[x.state]}</Note>
        {x.is_mock && <LabelChip tone="attention">{p.mock}</LabelChip>}
      </div>
      <div className="mt-2 space-y-1 pl-6 t-body-s text-text-secondary">
        {x.published_at && <p>{when(locale, x.published_at)}</p>}
        {!x.published_at && x.scheduled_for && <p>{p.scheduled} {when(locale, x.scheduled_for)}</p>}
        {x.cta_withheld && <p>{p.ctaWithheld}</p>}
      </div>
      {(x.permalink || x.state === "delivery_unknown") && (
        <div className="mt-4 pl-6">
          {x.permalink && <ButtonLink href={x.permalink} external variant="secondary" size="sm">{p.open}</ButtonLink>}
          {/* After an unclear outcome the only action is the status check; publishing again is never offered. */}
          {x.state === "delivery_unknown" && <Inert variant="secondary">{p.checkStatus}</Inert>}
        </div>
      )}
    </li>
  );
}

export function PostScreen({ locale, state }: { locale: Locale; state: SocialState }) {
  const p = getDictionary(locale).social.post;
  return (
    <div className="space-y-10">
      <ol className="grid gap-2 md:grid-cols-4" data-post-steps>
        {p.steps.map((label, i) => (
          <li key={label} aria-current={i === 0 ? "step" : undefined} className={cn("flex items-center gap-3 rounded-pill px-4 py-2.5 t-body-s", i === 0 ? "bg-surface-raised text-text-primary shadow-card" : "text-text-muted")}>
            <span className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill t-caption", i === 0 ? "bg-ink-950 text-ivory" : "border border-line-strong")}>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="grid gap-6 xl:grid-cols-12">
        <section aria-labelledby="social-listings" className="xl:col-span-7">
          <Heading size="m" as="h2" id="social-listings">{p.listingsH}</Heading>
          {state.listings.length ? (
            <ul className="stage mt-4 divide-y divide-line-hairline overflow-hidden">
              {state.listings.map((l) => <ListingRow key={l.key} locale={locale} l={l} />)}
            </ul>
          ) : (
            <div className="stage mt-4 p-6" data-empty="listings"><Note glyph="rule">{p.listingsEmpty}</Note></div>
          )}
        </section>
        <section aria-labelledby="social-posts" className="xl:col-span-5">
          <Heading size="m" as="h2" id="social-posts">{p.postsH}</Heading>
          {state.posts.length ? (
            <ul className="stage mt-4 divide-y divide-line-hairline overflow-hidden">
              {state.posts.map((x) => <PostRow key={x.key} locale={locale} x={x} />)}
            </ul>
          ) : (
            <div className="stage mt-4 p-6" data-empty="posts"><Note glyph="rule">{p.postsEmpty}</Note></div>
          )}
        </section>
      </div>
    </div>
  );
}

// ---------------- Screen C: inbox ----------------

function SignalRow({ locale, x }: { locale: Locale; x: SocialSignal }) {
  const b = getDictionary(locale).social.inbox;
  const intents = b.intents as Record<string, string>;
  const intent = x.intent ? intents[x.intent] ?? intents.other : null;
  const status = x.reply ? "answered" : x.window_expired ? "dm_window" : "answerable";
  const fieldId = `reply-${x.key}`;
  return (
    <li className="p-5 md:p-6" data-signal-state={status}>
      <p className="t-body-m text-text-primary break-words">{x.text}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 t-caption text-text-muted">
        <span>{when(locale, x.created_at)}</span>
        {intent && <LabelChip>{b.intentLabel}: {intent}</LabelChip>}
        {x.became_lead && <LabelChip><StatusGlyph glyph="check" size={12} className="mr-1 text-signal-positive" />{b.lead_}</LabelChip>}
      </div>
      {x.reply ? (
        <div className="mt-4 rounded-lg bg-surface-sunken px-4 py-3">
          <Note glyph="check" tone="positive">{b.answered}</Note>
          <p className="mt-1 pl-6 t-caption text-text-muted">
            {b.answeredKinds[x.reply.kind]}{x.reply.at ? ` · ${when(locale, x.reply.at)}` : ""}{x.reply.ref ? ` · ${b.reference} ${x.reply.ref}` : ""}
          </p>
          {x.kind === "comment" && x.reply.kind === "private" && <p className="mt-1 pl-6 t-caption text-text-muted">{b.privateUsed}</p>}
        </div>
      ) : x.window_expired ? (
        <Note glyph="clock" tone="attention" className="mt-4">{b.windowExpired}</Note>
      ) : (
        <div className="mt-4">
          <label htmlFor={fieldId} className="t-caption text-text-muted">{b.replyLabel}</label>
          <textarea id={fieldId} rows={2} disabled className="mt-1 block w-full resize-none rounded-md border border-line-strong bg-surface-sunken px-3.5 py-2.5 t-body-s text-text-primary disabled:opacity-70" />
          <div className="mt-3 flex flex-wrap gap-2">
            {x.kind === "comment" ? (
              <>
                <Inert>{b.replyPublic}</Inert>
                <Inert variant="secondary">{b.replyPrivate}</Inert>
              </>
            ) : (
              <Inert>{b.replyMessage}</Inert>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export function InboxScreen({ locale, state, tab }: { locale: Locale; state: SocialState; tab: "comments" | "messages" }) {
  const b = getDictionary(locale).social.inbox;
  const rows = state.inbox.filter((x) => (tab === "messages" ? x.kind === "message" : x.kind === "comment"));
  const count = (k: SocialSignal["kind"]) => state.inbox.filter((x) => x.kind === k).length;
  const tabs: ["comments" | "messages", string, number][] = [["comments", b.comments, count("comment")], ["messages", b.messages, count("message")]];
  return (
    <div className="xl:max-w-[78%]" data-inbox-tab={tab}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-pill bg-surface-raised p-1 shadow-card">
          {tabs.map(([k, label, n]) => (
            <Link
              key={k}
              href={`${localePath(locale, PATHS.inbox)}${k === "messages" ? "?tab=messages" : ""}`}
              aria-current={k === tab ? "page" : undefined}
              className={cn("inline-flex min-h-[44px] items-center gap-2 rounded-pill px-4 t-body-s", k === tab ? "bg-ink-950 text-ivory" : "text-text-secondary hover:text-text-primary")}
            >
              {label}
              <span className={cn("t-caption", k === tab ? "text-ivory/70" : "text-text-muted")}>{n}</span>
            </Link>
          ))}
        </div>
        <Inert variant="secondary">{b.fetch}</Inert>
      </div>
      {rows.length ? (
        <ul className="stage mt-5 divide-y divide-line-hairline overflow-hidden">
          {rows.map((x) => <SignalRow key={x.key} locale={locale} x={x} />)}
        </ul>
      ) : (
        <div className="stage mt-5 p-6 md:p-8" data-empty={tab}>
          <Note glyph="rule" className="t-body-m">{tab === "messages" ? b.emptyMessages : b.emptyComments}</Note>
        </div>
      )}
      {state.webhook && (
        <p className="mt-4 t-caption text-text-muted" data-webhook-health>
          {b.received}: {state.webhook.events}{state.webhook.last_received_at ? `, ${b.lastReceived} ${when(locale, state.webhook.last_received_at)}` : ""}
        </p>
      )}
    </div>
  );
}

// ---------------- Screen D: connection and data ----------------

export function SettingsScreen({ locale, state }: { locale: Locale; state: SocialState }) {
  const s = getDictionary(locale).social;
  const live = state.connection.filter((x) => x.status === "connected");
  return (
    <div className="grid gap-6 xl:grid-cols-2" data-settings-connected={live.length ? "yes" : "no"}>
      <section aria-labelledby="social-disconnect" className="stage p-6 md:p-8">
        <Heading size="m" as="h2" id="social-disconnect">{s.settings.connectionH}</Heading>
        {live.length ? (
          <>
            <ul className="mt-4 space-y-2">
              {live.map((x, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 t-body-m text-text-primary">
                  <StatusGlyph glyph="check" className="text-signal-positive" />
                  <span className="break-words">{x.display_name ?? s.connect.account}</span>
                  <span className="t-caption text-text-muted">{s.connect.since} {when(locale, x.connected_at, false)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 t-body-s text-text-secondary measure-body">{s.settings.disconnectBody}</p>
            <div className="mt-5"><Inert variant="secondary">{s.settings.disconnect}</Inert></div>
          </>
        ) : (
          <>
            <Note glyph="rule" className="mt-4 t-body-m">{s.connect.none}</Note>
            <div className="mt-5"><ButtonLink href={localePath(locale, PATHS.connect)} variant="secondary" size="sm">{s.tabs.connect}</ButtonLink></div>
          </>
        )}
      </section>
      <section aria-labelledby="social-delete" className="stage p-6 md:p-8">
        <Heading size="m" as="h2" id="social-delete">{s.settings.deleteH}</Heading>
        <p className="mt-4 t-body-s text-text-secondary measure-body">{s.settings.deleteBody}</p>
        <div className="mt-5"><ButtonLink href={localePath(locale, "/legal/data-deletion")} variant="secondary" size="sm">{s.settings.deleteLink}</ButtonLink></div>
      </section>
    </div>
  );
}
