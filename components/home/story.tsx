"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { ArrowRight, Check, Languages, Mail, MessageCircle, PanelsTopLeft, Phone, RotateCcw, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { DepthScene } from "@/components/ui/depth-scene";
import { Reveal } from "@/components/ui/reveal";
import { ThreeAnswers } from "./three-answers";
import { chapters, channels, enquiries, listings, people, storyWords, type Chapter as ChapterData, type ChannelKey, type Enquiry, type Listing } from "@/lib/content/home-story";

/**
 * The main story of the home page (master order 2026-10-10 §3; final order 2026-10-12 §4, §5; R19 closing order
 * 2026-10-19 §5, §6, §9): six chapters that read in the normal scroll, each with one benefit headline, the three
 * answers (what came in, what Nuova did, the result), one dominant visual proof and its state line. The sides
 * alternate and the stages differ (a situation board, a channel tablist, two listing cards, the alert and the
 * morning list, an email, the week's three figures). The chapters follow each other plainly: no sticky deck (R19 §5:
 * the deck stays only where it helps reading, and here it did not).
 *
 * Nothing waits for a scroll trigger: every stage is in the document from the first paint; a short settle (opacity
 * 0.5 → 1) marks what has just arrived. Explicit controls (a tab, "Tomar", the demo button of the email, "Reproducir
 * otra vez") change state; with reduced motion the end states stand at once.
 *
 * Building blocks: Animated List (Magic UI, MIT) for things arriving; the channel selector is a native tablist with
 * arrow keys; everything else is our own markup on the house tokens.
 */
const ICON: Record<ChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };
const LANG_NAME: Record<Enquiry["lang"], Record<Locale, string>> = { en: { es: "inglés", en: "English" }, de: { es: "alemán", en: "German" }, es: { es: "español", en: "Spanish" } };

/** A short settle for something that has just arrived: readable from the first frame, never hidden. */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <m.div initial={{ opacity: 0.5, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay }} className={className}>{children}</m.div>;
}

function Mark({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "positive" | "accent" }) {
  return <span className={cn("inline-flex items-center gap-1.5 text-[0.8125rem] font-medium", tone === "positive" && "text-signal-positive", tone === "accent" && "text-text-accent", tone === "muted" && "text-text-muted")}>{children}</span>;
}

function Bubble({ children, out = false, meta, label, lang, className }: { children: ReactNode; out?: boolean; meta?: string; label?: string; lang?: string; className?: string }) {
  return (
    <div className={cn("demo-bubble", out ? "hero-bubble-out" : "hero-bubble-in", className)}>
      {label && <p className="mb-1.5 text-[0.875rem] font-semibold text-[#1d6b42]">{label}</p>}
      <div lang={lang}>{children}</div>
      {meta && <p className="hero-bubble-meta">{meta}</p>}
    </div>
  );
}

function ChannelIcon({ channel, on = false, size = 12 }: { channel: ChannelKey; on?: boolean; size?: number }) {
  const Icon = ICON[channel];
  return <span aria-hidden="true" className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill", on ? "bg-[color:var(--channel-whatsapp-ink)] text-white" : "bg-ink-100 text-ink-700")}><Icon size={size} strokeWidth={2.2} /></span>;
}

/**
 * A message in the customer's language, shown translated into the page's language by default, the original one
 * tap away (final order §5). When the message already is in the page's language there is nothing to switch.
 */
function Translated({ locale, lang, original, translated, className, as: Tag = "p" }: { locale: Locale; lang: Enquiry["lang"]; original: string; translated: string; className?: string; as?: "p" | "span" }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const W = storyWords.common;
  const same = lang === locale;
  const text = same || showOriginal ? original : translated;
  const langName = LANG_NAME[lang][locale];
  return (
    <>
      <Tag lang={showOriginal || same ? lang : locale} className={className}>{text}</Tag>
      {!same && (
        <button type="button" onClick={() => setShowOriginal((v) => !v)} aria-pressed={showOriginal} className="mt-1.5 inline-flex min-h-[32px] items-center gap-1.5 rounded-pill px-2 text-[0.75rem] font-medium text-text-secondary underline decoration-line-strong underline-offset-4 hover:text-text-primary" data-translation-toggle={showOriginal ? "original" : "translated"}>
          <Languages size={12} aria-hidden="true" />
          {(showOriginal ? W.showTranslation[locale] : W.showOriginal[locale]).replace("{lang}", langName)}
        </button>
      )}
    </>
  );
}

function ListingCard({ listing, locale, photoLabel, className, compact = false, note }: { listing: Listing; locale: Locale; photoLabel: string; className?: string; compact?: boolean; note?: string }) {
  return (
    <article className={cn("min-w-0 overflow-hidden rounded-lg border border-ink-100 bg-white", className)} data-listing={listing.ref}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={listing.photo} alt={listing.photoAlt[locale]} width={800} height={533} loading="eager" decoding="async" className={cn("w-full bg-[#ece9e2] object-cover", compact ? "aspect-[16/9]" : "aspect-[3/2]")} />
      <div className={compact ? "p-3" : "p-4"}>
        <p className={cn("font-semibold leading-snug text-ink-950", compact ? "text-[0.9375rem]" : "text-[1.0625rem]")}>{listing.title[locale]}</p>
        <p className={cn("tnum mt-1 whitespace-nowrap font-semibold text-ink-950", compact ? "text-[1rem]" : "text-[1.25rem]")} data-listing-price>{listing.price}</p>
        <p className="mt-1 t-body-s text-text-secondary">{listing.place[locale]}</p>
        <p className="mt-0.5 t-body-s text-text-secondary">{listing.facts[locale]}</p>
        <p className="mt-1.5 t-caption text-text-muted">{listing.photoKind[locale]} · {photoLabel}</p>
        {note && <p className="mt-1.5 t-caption text-text-accent">{note}</p>}
      </div>
    </article>
  );
}

function Fields({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <dl className="divide-y divide-ink-100 border-y border-ink-100">
      {rows.map((r, i) => (
        <Rise key={r.k} delay={0.1 + i * 0.1}>
          <div className="grid gap-y-0.5 py-2.5">
            <dt className="t-caption text-text-muted">{r.k}</dt>
            <dd className="min-w-0 text-[1rem] font-medium leading-snug text-ink-950">{r.v}</dd>
          </div>
        </Rise>
      ))}
    </dl>
  );
}

/** One scene: the stage with its three depths. */
function Stage({ children, back, front }: { children: ReactNode; back?: "sand" | "sage" | "sky" | "stone"; front?: ReactNode }) {
  return (
    <DepthScene className="story-scene">
      <div data-depth-layer="back" className={cn("story-field", back && `story-field-${back}`)} aria-hidden="true" />
      <div className="story-stage" data-story-stage>{children}</div>
      {front && <div data-depth-layer="front" className="story-front">{front}</div>}
    </DepthScene>
  );
}

function Chapter({ id, locale, data, flip = false, wide = false, children }: { id: string; locale: Locale; data: ChapterData; flip?: boolean; wide?: boolean; children: ReactNode }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  return (
    <article id={id} className={cn("story-chapter", flip && "story-chapter-flip", wide && "story-chapter-wide")} data-chapter={id} aria-labelledby={`${id}-h`}>
      <Reveal className="story-text">
        <p className="t-eyebrow text-text-accent">{l(data.eyebrow)}</p>
        <h3 id={`${id}-h`} className="mt-3 t-display-m text-text-primary">{l(data.title)}</h3>
        <p className="mt-4 t-body-m text-text-secondary">{l(data.line)}</p>
        <ThreeAnswers locale={locale} inbound={l(data.inbound)} did={l(data.did)} result={l(data.result)} className="mt-5" />
        <p className="state-line mt-5" data-state="preparing" data-chapter-state>{storyWords.common.stateLabel[locale]}: {l(data.state)}</p>
      </Reveal>
      <Reveal mode="opacity" delay={120} className="story-stage-col">{children}</Reveal>
    </article>
  );
}

export function Story({ locale }: { locale: Locale }) {
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const W = storyWords;
  const [channel, setChannel] = useState<ChannelKey>("whatsapp");
  const [notice, setNotice] = useState(false);
  const [task, setTask] = useState<"open" | "taken" | "confirmed" | "done">("open");
  const [requested, setRequested] = useState(false);
  const [replayA, setReplayA] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const noticeId = useId();
  const e = enquiries.find((x) => x.channel === channel) ?? enquiries[0];
  const laura = enquiries[0];
  const [ch1, ch2, ch3, ch4, ch5, ch6] = chapters;
  const taskItems = l(W.task.items);
  const langOf = (q: Enquiry) => LANG_NAME[q.lang][locale];
  const arrivalMark = (q: Enquiry) => (q.held ? l(W.situation.drafted) : q.channel === "phone" ? l(W.situation.noted) : l(W.situation.answered));

  function onTabKey(ev: KeyboardEvent<HTMLDivElement>) {
    const keys = channels.map((c) => c.key);
    const i = keys.indexOf(channel);
    let n = i;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") n = (i + 1) % keys.length;
    else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") n = (i - 1 + keys.length) % keys.length;
    else if (ev.key === "Home") n = 0;
    else if (ev.key === "End") n = keys.length - 1;
    else return;
    ev.preventDefault();
    setChannel(keys[n]);
    setNotice(false);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[n]?.focus();
  }

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="story" data-story data-story-channel={channel} data-story-task={task} data-story-requested={requested ? "sent" : "none"}>
          {/* 1 The situation: the viewing on the left, the arrivals on the right */}
          <Chapter id="story-a" locale={locale} data={ch1}>
            <Stage back="sand" front={<span className="float-chip"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[color:var(--signal-attention)]" />{l(W.situation.desk)}</span>}>
              <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-7" data-stage="situation">
                <div className="min-w-0 overflow-hidden rounded-lg border border-ink-100 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={listings.est118.photo} alt={l(listings.est118.photoAlt)} width={800} height={533} loading="eager" decoding="async" className="aspect-[3/2] w-full bg-[#ece9e2] object-cover" />
                  <div className="p-4">
                    <p className="flex items-center gap-2 t-caption font-medium text-text-secondary"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[color:var(--signal-attention)]" />{l(W.situation.viewing)} · {l(W.situation.now)}</p>
                    <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{l(listings.est118.title)}</p>
                    <p className="mt-0.5 t-body-s text-text-secondary">{l(listings.est118.place)} · {l(W.situation.viewingWho)}</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="t-caption font-medium text-text-muted">{l(W.situation.arriving)}</p>
                    <button type="button" onClick={() => setReplayA((n) => n + 1)} className="inline-flex min-h-[32px] items-center gap-1.5 rounded-pill px-2 t-caption font-medium text-text-secondary hover:text-text-primary" data-story-replay="arrivals"><RotateCcw size={12} aria-hidden="true" />{l(W.common.replay)}</button>
                  </div>
                  <AnimatedList className="mt-3" delay={700} startDelay={400} replayKey={replayA}>
                    {enquiries.map((q) => (
                      <div key={q.channel} className="flex min-w-0 items-center gap-3 rounded-lg border border-ink-100 bg-white px-3.5 py-3" data-arrival={q.channel}>
                        <ChannelIcon channel={q.channel} on={q.channel === "whatsapp"} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.9375rem] font-semibold leading-snug text-ink-950">{q.who} <span className="font-normal text-text-muted">· {l(q.role)}</span></p>
                          <p className="t-caption tnum text-text-muted">{l(channels.find((c) => c.key === q.channel)!.name)} · {q.channel === "whatsapp" ? (locale === "es" ? "martes 11:20" : "Tuesday 11:20") : l(q.time)} · {langOf(q)}</p>
                        </div>
                        <Mark tone={q.held ? "accent" : "positive"}><Check size={14} strokeWidth={2.5} aria-hidden="true" /><span className="hidden sm:inline">{arrivalMark(q)}</span></Mark>
                      </div>
                    ))}
                  </AnimatedList>
                  <p className="mt-4 t-body-s text-text-secondary">{l(W.situation.after)}</p>
                </div>
              </div>
            </Stage>
          </Chapter>

          {/* 2 The reply: one channel at a time, the message and the concrete answer (or the held draft), the record updated */}
          <Chapter id="story-b" locale={locale} data={ch2} flip>
            <Stage back="sage" front={<span className="float-chip"><span className="text-text-muted">{l(W.common.language)}:</span> {langOf(e)}</span>}>
              <div data-stage="reply">
                <div ref={tabsRef} role="tablist" aria-label={l(W.reply.pick)} className="scene-tabs" onKeyDown={onTabKey} data-channel-tabs>
                  {channels.map((c) => {
                    const Icon = ICON[c.key];
                    const on = c.key === channel;
                    return (
                      <button key={c.key} type="button" role="tab" aria-selected={on} aria-controls={panelId} tabIndex={on ? 0 : -1} onClick={() => { setChannel(c.key); setNotice(false); }} className={cn("scene-tab", on && "scene-tab-active")} data-channel-tab={c.key}>
                        <Icon size={16} strokeWidth={2} aria-hidden="true" />{l(c.name)}
                      </button>
                    );
                  })}
                </div>
                <div id={panelId} role="tabpanel" className="relative mt-6">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.div key={channel} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, position: "absolute", inset: 0, transition: { duration: 0 } }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8" data-channel-view={channel}>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
                          <ChannelIcon channel={channel} on={channel === "whatsapp"} size={14} />
                          <div className="min-w-0">
                            <p className="text-[1.0625rem] font-semibold leading-tight text-ink-950">{e.who}</p>
                            <p className="t-caption text-text-muted">{l(e.role)} · {l(e.time)}{channel === "phone" ? ` · ${people.caller.phone}` : ""}</p>
                          </div>
                        </div>

                        {channel === "whatsapp" && (
                          <div className="space-y-4 pt-5">
                            {/* the hero already showed Laura's question and the answer with the flat's data; here the conversation goes on */}
                            <p className="t-caption text-text-muted" data-story-short>{l(W.reply.earlier)}</p>
                            <Bubble meta={l(e.time)} className="max-w-full md:max-w-[88%]"><Translated locale={locale} lang={e.lang} original={e.text} translated={l(e.translation.text)} /></Bubble>
                            <Rise delay={0.2} className="flex flex-col items-end gap-1">
                              <Bubble out label={l(W.common.assistant)} meta={l(e.time)} className="max-w-full">
                                {notice && <p className="mb-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" lang={e.lang} data-story-notice>{e.notice}</p>}
                                <Translated locale={locale} lang={e.lang} original={e.reply} translated={l(e.translation.reply)} />
                              </Bubble>
                            </Rise>
                          </div>
                        )}

                        {(channel === "email" || channel === "webform") && (
                          <div className="space-y-4 pt-5">
                            <div className="rounded-lg border border-ink-100 bg-white p-4" data-story-incoming>
                              <p className="t-caption font-medium text-text-muted">{channel === "email" ? l(W.reply.incoming) : l(W.reply.formTitle)}</p>
                              <Translated locale={locale} lang={e.lang} original={e.text} translated={l(e.translation.text)} className="mt-2 text-[1rem] leading-[1.55] text-ink-950" />
                            </div>
                            <Rise delay={0.25}>
                              {e.held ? (
                                // The held reply (R19 §2, §7): a draft, labelled as a draft, with the reason. Nothing was sent.
                                <div className="rounded-lg border border-dashed border-ink-300 bg-[#fbfaf7] p-4" data-story-reply data-story-held>
                                  <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption"><span className="font-semibold text-ink-950">{l(W.reply.heldTitle)}</span><span className="text-text-muted">{l(W.common.assistant)}</span></p>
                                  <p className="mt-2 t-caption text-text-muted"><span className="font-medium text-text-secondary">{l(W.reply.emailSubject)}:</span> <Translated locale={locale} lang="de" original={W.reply.emailSubjectKeller} translated={l(W.reply.emailSubjectKellerTranslated)} as="span" /></p>
                                  {notice && <p className="mt-2 border-b border-ink-100 pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" lang={e.lang} data-story-notice>{e.notice}</p>}
                                  <Translated locale={locale} lang={e.lang} original={e.reply} translated={l(e.translation.reply)} className="mt-2 text-[1rem] leading-[1.55] text-ink-900" />
                                  <p className="mt-3 border-t border-ink-100 pt-2 t-caption text-text-secondary">{l(W.reply.heldLine)}</p>
                                </div>
                              ) : (
                                <div className="rounded-lg border border-[#b9dcc0] bg-[#eef8f0] p-4" data-story-reply>
                                  <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption"><span className="font-semibold text-[#1d6b42]">{l(W.common.assistant)}</span><span className="text-text-muted">{l(W.reply.formReply)}</span></p>
                                  {notice && <p className="mt-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" lang={e.lang} data-story-notice>{e.notice}</p>}
                                  <Translated locale={locale} lang={e.lang} original={e.reply} translated={l(e.translation.reply)} className="mt-2 text-[1rem] leading-[1.55] text-ink-950" />
                                </div>
                              )}
                            </Rise>
                          </div>
                        )}

                        {channel === "phone" && (
                          <div className="space-y-4 pt-5">
                            <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-4" data-story-incoming>
                              <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-ivory"><Phone size={18} /></span>
                              <div className="min-w-0"><p className="text-[1rem] font-semibold leading-tight text-ink-950">{l(W.reply.callIncoming)}</p><p className="t-caption text-text-muted">{l(W.reply.callAnswered)}</p></div>
                              <div className="ml-auto flex items-end gap-1" aria-hidden="true">{[10, 18, 12, 22, 14, 8, 20, 11].map((h, i) => <span key={i} className="w-1 rounded-pill bg-ink-300" style={{ height: h }} />)}</div>
                            </div>
                            <blockquote className="border-l-2 border-ink-200 pl-4 text-[1rem] leading-[1.55] text-ink-900"><p className="t-caption font-medium text-text-muted">{l(W.reply.incomingPhone)}</p><Translated locale={locale} lang={e.lang} original={e.text} translated={l(e.translation.text)} className="mt-1" /></blockquote>
                            <Rise delay={0.25}>
                              <div className="rounded-lg border border-ink-100 bg-white p-4" data-story-reply>
                                <p className="t-caption font-medium text-text-muted">{l(W.reply.repliedPhone)}</p>
                                <Translated locale={locale} lang={e.lang} original={e.reply} translated={l(e.translation.reply)} className="mt-1.5 text-[1rem] leading-[1.55] text-ink-950" />
                                {notice && <p className="mt-2 border-t border-ink-100 pt-2 text-[0.9375rem] leading-[1.5] text-ink-800" data-story-notice>{e.notice}</p>}
                              </div>
                            </Rise>
                            <p className="t-caption text-text-muted">{l(W.reply.phoneCaveat)}</p>
                          </div>
                        )}

                        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 t-caption text-text-muted">
                          <button type="button" onClick={() => setNotice((v) => !v)} aria-expanded={notice} aria-controls={noticeId} className="min-h-[44px] font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-story-notice-toggle>{notice ? l(W.common.hideNotice) : l(W.common.showNotice)}</button>
                          <span id={noticeId}>{notice ? (e.noticeIsSample ? l(W.common.noticeSample) : l(W.common.noticeTitle)) : null}</span>
                        </p>
                      </div>

                      <div className="min-w-0 rounded-lg bg-[#f6f4ee] p-4 md:p-5" data-story-noted>
                        <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption"><span className="font-medium text-text-muted">{l(W.reply.noted)}</span>{channel === "whatsapp" && <span className="tnum text-text-muted">{l(W.reply.notedAt)}</span>}</p>
                        <p className="mt-1 text-[1.125rem] font-semibold leading-tight text-ink-950">{e.who}</p>
                        <div className="mt-3"><Fields rows={e.recorded.map((r) => ({ k: l(r.k), v: l(r.v) }))} /></div>
                        <p className="mt-3 flex items-start gap-2 t-body-s text-text-secondary"><ArrowRight size={14} className="mt-1 shrink-0 text-text-accent" aria-hidden="true" />{l(e.next)}</p>
                        {channel === "whatsapp" && <p className="mt-3 border-t border-ink-100 pt-3 t-caption text-text-muted" data-story-continuity>{l(W.reply.continuity)}</p>}
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>
                <p className="mt-4 t-caption text-text-muted">{l(W.reply.languages)}</p>
              </div>
            </Stage>
          </Chapter>

          {/* 3 The property that fits: criteria → two listings → the proposal */}
          <Chapter id="story-c" locale={locale} data={ch3}>
            <Stage back="sky" front={<span className="float-chip">{laura.who}</span>}>
              <div data-stage="match">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="t-caption font-medium text-text-muted">{l(W.match.wants)}</p>
                  <AnimatedList className="flex-row flex-wrap gap-2" delay={350} startDelay={300} keepOrder>
                    {l(W.match.criteria).map((c) => <span key={c} className="inline-flex rounded-pill border border-ink-200 bg-white px-3 py-1.5 text-[0.9375rem] font-medium text-ink-950">{c}</span>)}
                  </AnimatedList>
                </div>
                <p className="mt-6 t-caption font-medium text-text-muted">{l(W.match.fits)}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {[listings.est204, listings.est231].map((li, i) => <Rise key={li.ref} delay={1.2 + i * 0.2}><ListingCard listing={li} locale={locale} photoLabel={l(W.common.photo)} note={l(W.match.yours)} /></Rise>)}
                </div>
                <Rise delay={1.8} className="mt-5 flex flex-col items-end gap-1.5">
                  <Bubble out label={l(W.common.assistant)} className="max-w-full md:max-w-[88%]"><Translated locale={locale} lang="es" original={W.match.proposal} translated={l(W.match.proposalTranslated)} /></Bubble>
                  <p className="t-caption text-text-muted">{l(W.match.sent)}</p>
                </Rise>
                <p className="mt-4 t-caption text-text-muted">{l(W.match.rights)}</p>
              </div>
            </Stage>
          </Chapter>

          {/* 4 The alert at once, then the morning: the one that matters with its reason, take, propose, done */}
          <Chapter id="story-d" locale={locale} data={ch4} flip>
            <Stage back="stone" front={<span className="float-chip"><span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-pill bg-ink-950 text-[0.6875rem] font-semibold text-ivory">E</span>{people.colleague.name}</span>}>
              <div data-stage="task">
                {/* The alert by email, with its reason (proven end to end: the hot-lead mail to the right person) */}
                <div className="hero-next" data-hot-lead-alert>
                  <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption"><span className="inline-flex items-center gap-1.5 font-medium text-[color:var(--accent-ink)]"><Mail size={12} aria-hidden="true" />{l(W.task.alert.label)}</span><span className="text-text-muted">{l(W.task.alert.to)}</span></p>
                  <p className="mt-1.5 text-[1rem] font-semibold leading-snug text-ink-950">{l(W.task.alert.subject)}</p>
                  <p className="mt-1 t-body-s text-text-secondary">{l(W.task.alert.why)}</p>
                  <p className="mt-2 t-caption font-medium text-text-primary underline decoration-line-strong underline-offset-4">{l(W.task.alert.open)}</p>
                </div>

                <p className="mt-6 t-caption font-medium text-text-muted">{l(W.task.morning)}</p>
                <div className="mt-2 flex items-start gap-3 rounded-lg bg-[#f6f4ee] p-4" data-morning-greeting>
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-ivory"><Sparkles size={14} /></span>
                  <div className="min-w-0"><p className="text-[1.0625rem] font-semibold leading-snug text-ink-950">{l(W.task.greeting)}</p><p className="mt-0.5 t-body-s text-text-secondary">{l(W.task.greetingLine)}</p></div>
                </div>
                <ol className="mt-3 space-y-3">
                  {taskItems.map((it, i) => {
                    const first = i === 0;
                    return (
                      <li key={it.who} className={cn("grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-lg border bg-white p-4", first ? "border-ink-950" : "border-ink-100")} data-task-item={i + 1} data-task-state={first ? task : "open"}>
                        <span className="tnum inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 text-[0.9375rem] font-semibold text-ivory" aria-hidden="true">{i + 1}</span>
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[1rem] font-semibold text-ink-950">{it.who}{first && <span className="inline-flex items-center gap-1 rounded-pill bg-[color:var(--accent-wash)] px-2 py-0.5 text-[0.75rem] font-medium text-[color:var(--accent-ink)]" data-hot-lead><Sparkles size={11} aria-hidden="true" />{l(W.task.important)}</span>}</p>
                          <p className="mt-0.5 t-body-s text-text-secondary">{it.what}</p>
                          <p className="mt-1.5 t-caption text-text-secondary"><span className="font-medium text-text-accent">{l(W.task.why)}:</span> {it.why}</p>
                          {first ? (
                            <div className="mt-3 border-t border-ink-100 pt-3" aria-live="polite">
                              <p className="t-body-s text-text-primary"><span className="font-medium">{l(W.task.nextStep)}:</span> {it.next}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
                                {task === "open" && (<><button type="button" onClick={() => setTask("taken")} className="demo-action" data-task-take>{l(W.task.take)}<ArrowRight size={16} aria-hidden="true" /></button><span className="t-body-s text-text-secondary">{l(W.task.open)}</span></>)}
                                {task === "taken" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{l(W.task.taken)}</Mark><button type="button" onClick={() => setTask("confirmed")} className="demo-action" data-task-confirm>{l(W.task.confirm)}<ArrowRight size={16} aria-hidden="true" /></button></>)}
                                {task === "confirmed" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{l(W.task.confirmed)}</Mark><button type="button" onClick={() => setTask("done")} className="demo-action" data-task-complete>{l(W.task.complete)}</button></>)}
                                {task === "done" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{l(W.task.done)}</Mark><button type="button" onClick={() => setTask("open")} className="inline-flex min-h-[44px] items-center gap-2 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-task-again><RotateCcw size={14} aria-hidden="true" />{l(W.task.again)}</button></>)}
                              </div>
                              {(task === "confirmed" || task === "done") && (
                                <Rise delay={0.15} className="mt-4 flex flex-col items-end gap-1.5">
                                  <Bubble out label={people.colleague.name} meta={locale === "es" ? "miércoles 08:58" : "Wednesday 08:58"} className="max-w-full"><Translated locale={locale} lang="es" original={W.task.chatConfirm} translated={l(W.task.chatConfirmTranslated)} /></Bubble>
                                </Rise>
                              )}
                              {task === "done" && <Rise delay={0.1}><p className="mt-3 rounded-md bg-sage-100 px-3 py-2 t-body-s text-text-primary" data-task-done-line>{l(W.task.doneLine)}</p></Rise>}
                            </div>
                          ) : (
                            <p className="mt-1.5 t-caption text-text-muted"><span className="font-medium">{l(W.task.nextStep)}:</span> {it.next}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-4 t-caption text-text-muted">{l(W.task.othersSee)}</p>
              </div>
            </Stage>
          </Chapter>

          {/* 5 The follow-up: the new listing, the three conditions, the email with its one demo action */}
          <Chapter id="story-e" locale={locale} data={ch5}>
            <Stage back="sand" front={<span className="float-chip"><Mail size={14} aria-hidden="true" />{laura.who}</span>}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8" data-stage="followup">
                <div className="min-w-0">
                  <p className="t-caption font-medium text-text-muted">{l(W.followup.trigger)}</p>
                  <div className="mt-3"><ListingCard listing={listings.est240} locale={locale} photoLabel={l(W.common.photo)} note={l(W.followup.matches)} /></div>
                  <p className="mt-5 t-caption font-medium text-text-muted">{l(W.followup.conditions)}</p>
                  <AnimatedList className="mt-2 gap-2" delay={500} startDelay={600} keepOrder>
                    {l(W.followup.conditionList).map((c) => <p key={c} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-signal-positive text-ivory"><Check size={12} strokeWidth={3} /></span>{c}</p>)}
                  </AnimatedList>
                </div>
                <Rise delay={1.4} className="min-w-0">
                  <div className="overflow-hidden rounded-lg border border-ink-100 bg-white" data-story-email>
                    <div className="border-b border-ink-100 px-5 py-3">
                      <p className="t-caption text-text-muted">{l(W.followup.email)} · {l(W.followup.from)}</p>
                      <Translated locale={locale} lang="es" original={W.followup.subject} translated={l(W.followup.subjectTranslated)} className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950" />
                    </div>
                    <div className="px-5 py-4">
                      <Translated locale={locale} lang="es" original={W.followup.body} translated={l(W.followup.bodyTranslated)} className="text-[1rem] leading-[1.55] text-ink-950" />
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {[listings.est240, listings.est231].map((li) => <ListingCard key={li.ref} listing={li} locale={locale} photoLabel={l(W.common.photo)} compact />)}
                      </div>
                      {/* The email's one action, as a demo: it shows the request landing with the team, never a booked appointment. */}
                      <div className="mt-4" aria-live="polite">
                        {requested ? (
                          <div data-story-request-sent>
                            <Mark tone="positive"><Check size={16} strokeWidth={2.5} aria-hidden="true" />{l(W.followup.requested)}</Mark>
                            <p className="mt-1.5 t-caption text-text-secondary">{l(W.followup.requestedLine)}</p>
                            <button type="button" onClick={() => setRequested(false)} className="mt-2 inline-flex min-h-[32px] items-center gap-1.5 t-caption font-medium text-text-primary underline decoration-line-strong underline-offset-4" data-story-request-reset><RotateCcw size={12} aria-hidden="true" />{l(W.task.again)}</button>
                          </div>
                        ) : (
                          <>
                            <button type="button" onClick={() => setRequested(true)} className="demo-action" data-story-request>{l(W.followup.cta)}<ArrowRight size={16} aria-hidden="true" /></button>
                            <p className="mt-1.5 t-caption text-text-muted">{l(W.followup.ctaDemo)}</p>
                          </>
                        )}
                      </div>
                      <p className="mt-4 border-t border-ink-100 pt-3 t-caption text-text-muted">{l(W.followup.footer)}</p>
                    </div>
                  </div>
                </Rise>
              </div>
            </Stage>
          </Chapter>

          {/* 6 The week: three figures with their meaning, what is open, Monday's email */}
          <Chapter id="story-f" locale={locale} data={ch6} flip>
            <Stage back="sage" front={<span className="float-chip">{l(W.result.period)}</span>}>
              <div data-stage="result">
                <p className="inline-flex items-center gap-2 rounded-pill bg-[color:var(--accent-wash)] px-3 py-1 t-caption font-medium text-[color:var(--accent-ink)]" data-result-demo>{l(W.result.demo)}</p>
                <p className="mt-3 t-caption text-text-muted">{l(W.result.weekly)} · {l(W.result.basis)}</p>
                <dl className="mt-4 grid gap-3 md:grid-cols-3">
                  {[W.result.handled, W.result.chances, W.result.next].map((k, i) => (
                    <Rise key={l(k.title)} delay={0.1 + i * 0.12}>
                      <div className="h-full min-w-0 rounded-lg border border-ink-100 bg-white p-4" data-result-number={i}>
                        <dt className="t-caption font-medium text-text-secondary">{l(k.title)}</dt>
                        <dd className="mt-1 tnum text-[2rem] font-semibold leading-none tracking-[-0.02em] text-ink-950">{k.value}</dd>
                        <dd className="mt-1.5 t-caption text-text-secondary">{l(k.line)}</dd>
                      </div>
                    </Rise>
                  ))}
                </dl>
                <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="min-w-0">
                    <p className="t-caption font-medium text-text-muted">{l(W.result.openTitle)}</p>
                    <ul className="mt-2 space-y-1.5">{l(W.result.open).map((o) => <li key={o} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" />{o}</li>)}</ul>
                  </div>
                  <div className="min-w-0 rounded-lg bg-[#f6f4ee] p-4" data-story-weekly-email>
                    <p className="t-caption font-medium text-text-muted">{l(W.result.emailTitle)}</p>
                    <p className="mt-1 t-body-s text-text-secondary">{l(W.result.emailLine)}</p>
                    <p className="mt-3"><Link href={localePath(locale, "/app/reports")} className="demo-action" data-story-report-link>{l(W.result.button)}<ArrowRight size={16} aria-hidden="true" /></Link></p>
                    <p className="mt-2 t-caption text-text-muted">{l(W.result.inLogin)}</p>
                  </div>
                </div>
              </div>
            </Stage>
          </Chapter>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export { SocialFlow as SocialStrip } from "./social-flow";
