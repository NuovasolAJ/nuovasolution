"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle, PanelsTopLeft, Phone, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { DepthScene } from "@/components/ui/depth-scene";
import { Reveal } from "@/components/ui/reveal";
import { chapters, channels, enquiries, listings, people, storyWords, type ChannelKey, type Listing } from "@/lib/content/home-story";

/**
 * The main story of the home page (master order 2026-10-10 §3): six chapters, A to F, that read in the normal
 * scroll. No tab has to be clicked to follow it; the channel choice in B and the task in D are extras.
 *
 * Each chapter is a scene in three depths: a soft field behind (back), the product surface (the page's own
 * plane), one floating detail in front (front). components/ui/depth-scene.tsx measures, globals.css moves.
 *
 * Building blocks: Animated List (Magic UI, MIT) for things arriving; the channel selector is a native tablist
 * with arrow keys; everything else is our own markup on the house tokens.
 */
const ICON: Record<ChannelKey, typeof MessageCircle> = { whatsapp: MessageCircle, email: Mail, webform: PanelsTopLeft, phone: Phone };

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay }} className={className}>{children}</m.div>;
}

function Mark({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "positive" | "accent" }) {
  return <span className={cn("inline-flex items-center gap-1.5 text-[0.8125rem] font-medium", tone === "positive" && "text-signal-positive", tone === "accent" && "text-text-accent", tone === "muted" && "text-text-muted")}>{children}</span>;
}

function Bubble({ children, out = false, meta, label, lang }: { children: ReactNode; out?: boolean; meta?: string; label?: string; lang?: string }) {
  return (
    <div className={cn("demo-bubble", out ? "hero-bubble-out" : "hero-bubble-in")}>
      {label && <p className="mb-1.5 text-[0.875rem] font-semibold text-[#1d6b42]">{label}</p>}
      <div lang={lang}>{children}</div>
      {meta && <p className="hero-bubble-meta">{meta}</p>}
    </div>
  );
}

function ChannelIcon({ channel, on = false, size = 12 }: { channel: ChannelKey; on?: boolean; size?: number }) {
  const Icon = ICON[channel];
  return <span aria-hidden="true" className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill", on ? "bg-[color:var(--channel-whatsapp)] text-white" : "bg-ink-100 text-ink-700")}><Icon size={size} strokeWidth={2.2} /></span>;
}

function ListingCard({ listing, locale, photoLabel, className, compact = false, note }: { listing: Listing; locale: Locale; photoLabel: string; className?: string; compact?: boolean; note?: string }) {
  return (
    <article className={cn("overflow-hidden rounded-lg border border-ink-100 bg-white", className)} data-listing={listing.ref}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={listing.photo} alt={listing.photoAlt[locale]} width={800} height={533} loading="lazy" decoding="async" className={cn("w-full object-cover", compact ? "aspect-[16/9]" : "aspect-[3/2]")} />
      <div className={compact ? "p-3" : "p-4"}>
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption text-text-muted"><span className="tnum">{listing.ref}</span><span>{photoLabel}</span></p>
        <p className={cn("mt-1 font-semibold leading-snug text-ink-950", compact ? "text-[0.9375rem]" : "text-[1.0625rem]")}>{listing.title[locale]}</p>
        <p className="mt-0.5 t-body-s text-text-secondary">{listing.place[locale]} · {listing.facts[locale]}</p>
        <p className="mt-1.5 tnum text-[0.9375rem] font-medium text-ink-950">{listing.price}</p>
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
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2.5">
            <dt className="w-28 shrink-0 t-body-s text-text-muted">{r.k}</dt>
            <dd className="min-w-0 flex-1 text-[1rem] font-medium text-ink-950">{r.v}</dd>
          </div>
        </Rise>
      ))}
    </dl>
  );
}

/** One scene: the stage with its three depths. */
function Stage({ children, back, front, label }: { children: ReactNode; back?: "sand" | "sage" | "sky" | "stone"; front?: ReactNode; label?: string }) {
  return (
    <DepthScene className="story-scene">
      <div data-depth-layer="back" className={cn("story-field", back && `story-field-${back}`)} aria-hidden="true" />
      <div className="story-stage" data-story-stage>{children}</div>
      {front && <div data-depth-layer="front" className="story-front">{front}</div>}
      {label && <p className="story-label">{label}</p>}
    </DepthScene>
  );
}

function Chapter({ id, letter, eyebrow, title, line, children }: { id: string; letter: string; eyebrow: string; title: string; line: string; children: ReactNode }) {
  return (
    <article id={id} className="story-chapter" data-chapter={id} aria-labelledby={`${id}-h`}>
      <Reveal className="story-text">
        <p className="story-letter" aria-hidden="true">{letter}</p>
        <p className="t-eyebrow text-text-accent">{eyebrow}</p>
        <h3 id={`${id}-h`} className="mt-3 t-display-m text-text-primary">{title}</h3>
        <p className="mt-4 t-body-m text-text-secondary">{line}</p>
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
  const [task, setTask] = useState<"open" | "taken" | "done">("open");
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const noticeId = useId();
  const e = enquiries.find((x) => x.channel === channel) ?? enquiries[0];
  const laura = enquiries[0];
  const [ch1, ch2, ch3, ch4, ch5, ch6] = chapters;
  const taskItems = l(W.task.items);
  const numbers = l(W.result.numbers);

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
        <div className="story" data-story data-story-channel={channel} data-story-task={task}>
          {/* A */}
          <Chapter id="story-a" letter={ch1.letter} eyebrow={l(ch1.eyebrow)} title={l(ch1.title)} line={l(ch1.line)}>
            <Stage back="sand" label={l(W.common.example)} front={<span className="float-chip"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[color:var(--signal-attention)]" />{l(W.situation.desk)}</span>}>
              <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-7" data-stage="situation">
                <div className="overflow-hidden rounded-lg border border-ink-100 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={listings.est118.photo} alt={l(listings.est118.photoAlt)} width={800} height={533} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
                  <div className="p-4">
                    <p className="flex items-center gap-2 t-caption font-medium text-text-secondary"><span aria-hidden="true" className="h-2 w-2 rounded-pill bg-[color:var(--signal-attention)]" />{l(W.situation.viewing)} · {l(W.situation.now)}</p>
                    <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{listings.est118.ref} · {l(listings.est118.title)}</p>
                    <p className="mt-0.5 t-body-s text-text-secondary">{l(listings.est118.place)} · {l(W.situation.viewingWho)}</p>
                  </div>
                </div>
                <div>
                  <p className="t-caption font-medium text-text-muted">{l(W.situation.arriving)}</p>
                  <AnimatedList className="mt-3" delay={700} startDelay={400}>
                    {enquiries.map((q) => (
                      <div key={q.channel} className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3.5 py-3" data-arrival={q.channel}>
                        <ChannelIcon channel={q.channel} on={q.channel === "whatsapp"} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.9375rem] font-semibold text-ink-950">{q.who} <span className="font-normal text-text-muted">· {l(q.role)}</span></p>
                          <p className="t-caption tnum text-text-muted">{l(channels.find((c) => c.key === q.channel)!.name)} · {l(q.time)} · {l(q.language)}</p>
                        </div>
                        <Mark tone="positive"><Check size={14} strokeWidth={2.5} aria-hidden="true" /><span className="hidden sm:inline">{l(W.situation.answered)}</span></Mark>
                      </div>
                    ))}
                  </AnimatedList>
                  <p className="mt-4 t-body-s text-text-secondary">{l(W.situation.after)}</p>
                </div>
              </div>
            </Stage>
          </Chapter>

          {/* B */}
          <Chapter id="story-b" letter={ch2.letter} eyebrow={l(ch2.eyebrow)} title={l(ch2.title)} line={l(ch2.line)}>
            <Stage back="sage" label={l(W.reply.languages)} front={<span className="float-chip"><span className="text-text-muted">{l(W.common.replyLanguage)}:</span> {l(e.language)}</span>}>
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
                <div id={panelId} role="tabpanel" className="mt-6">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.div key={channel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8" data-channel-view={channel}>
                      <div>
                        {/* who and when */}
                        <div className="flex items-center gap-3 border-b border-ink-100 pb-4">
                          <ChannelIcon channel={channel} on={channel === "whatsapp"} size={14} />
                          <div className="min-w-0">
                            <p className="truncate text-[1.0625rem] font-semibold leading-tight text-ink-950">{e.who}</p>
                            <p className="t-caption text-text-muted">{l(e.role)} · {l(e.time)} · {l(W.common.language)}: {l(e.language)}</p>
                          </div>
                        </div>

                        {channel === "whatsapp" && (
                          <div className="space-y-4 pt-5">
                            <Bubble meta={`${e.who} · ${l(e.time)}`} lang={e.lang}>{e.text}</Bubble>
                            <Rise delay={0.25} className="flex flex-col items-end gap-2">
                              <Bubble out label={l(W.common.assistant)} meta={l(e.time)} lang={e.lang}>
                                {notice && <p className="mb-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" data-story-notice>{e.notice}</p>}
                                <p>{e.reply}</p>
                              </Bubble>
                            </Rise>
                          </div>
                        )}

                        {(channel === "email" || channel === "webform") && (
                          <div className="space-y-4 pt-5">
                            <div className="rounded-lg border border-ink-100 bg-white p-4" data-story-incoming>
                              <p className="t-caption font-medium text-text-muted">{channel === "email" ? l(W.reply.incoming) : l(W.reply.formTitle)}</p>
                              {channel === "webform" ? (
                                <dl className="mt-2 grid gap-1.5 text-[0.9375rem]">
                                  <div className="flex gap-3"><dt className="w-20 shrink-0 text-text-muted">{locale === "es" ? "Nombre" : "Name"}</dt><dd className="font-medium text-ink-950">{e.who}</dd></div>
                                  <div className="flex gap-3"><dt className="w-20 shrink-0 text-text-muted">{locale === "es" ? "Mensaje" : "Message"}</dt><dd lang={e.lang} className="text-ink-950">{e.text}</dd></div>
                                </dl>
                              ) : (
                                <p lang={e.lang} className="mt-2 text-[1rem] leading-[1.55] text-ink-950">{e.text}</p>
                              )}
                            </div>
                            <Rise delay={0.25}>
                              <div className="rounded-lg border border-[#b9dcc0] bg-[#eef8f0] p-4" data-story-reply>
                                <p className="flex flex-wrap items-baseline justify-between gap-x-3 t-caption"><span className="font-semibold text-[#1d6b42]">{l(W.common.assistant)}</span><span className="text-text-muted">{channel === "email" ? l(W.reply.replied) : l(W.reply.formReply)}</span></p>
                                {channel === "email" && <p className="mt-2 t-caption text-text-muted"><span className="font-medium text-text-secondary">{l(W.reply.emailSubject)}:</span> {W.reply.emailSubjectKeller}</p>}
                                {notice && <p className="mt-2 border-b border-[#b9dcc0] pb-2 text-[0.9375rem] leading-[1.5] text-ink-800" lang={e.lang} data-story-notice>{e.notice}</p>}
                                <p lang={e.lang} className="mt-2 text-[1rem] leading-[1.55] text-ink-950">{e.reply}</p>
                              </div>
                            </Rise>
                          </div>
                        )}

                        {channel === "phone" && (
                          <div className="space-y-4 pt-5">
                            <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-4" data-story-incoming>
                              <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-ivory"><Phone size={18} /></span>
                              <div><p className="text-[1rem] font-semibold leading-tight text-ink-950">{l(W.reply.callIncoming)}</p><p className="t-caption text-text-muted">{l(W.reply.callAnswered)}</p></div>
                              <div className="ml-auto flex items-end gap-1" aria-hidden="true">{[10, 18, 12, 22, 14, 8, 20, 11].map((h, i) => <span key={i} className="w-1 rounded-pill bg-ink-300" style={{ height: h }} />)}</div>
                            </div>
                            <blockquote className="border-l-2 border-ink-200 pl-4 text-[1rem] leading-[1.55] text-ink-900" lang={e.lang}><p className="t-caption font-medium text-text-muted">{l(W.reply.incomingPhone)}</p><p className="mt-1">{e.text}</p></blockquote>
                            <Rise delay={0.25}>
                              <div className="rounded-lg border border-ink-100 bg-white p-4" data-story-reply>
                                <p className="t-caption font-medium text-text-muted">{l(W.reply.repliedPhone)}</p>
                                <p className="mt-1.5 text-[1rem] leading-[1.55] text-ink-950">{e.reply}</p>
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

                      <div className="rounded-lg bg-[#f6f4ee] p-4 md:p-5" data-story-noted>
                        <p className="t-caption font-medium text-text-muted">{l(W.reply.noted)}</p>
                        <p className="mt-1 text-[1.125rem] font-semibold leading-tight text-ink-950">{e.who}</p>
                        <div className="mt-3"><Fields rows={e.recorded.map((r) => ({ k: l(r.k), v: l(r.v) }))} /></div>
                        <p className="mt-3 flex items-start gap-2 t-body-s text-text-secondary"><ArrowRight size={14} className="mt-1 shrink-0 text-text-accent" aria-hidden="true" />{l(e.next)}</p>
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </Stage>
          </Chapter>

          {/* C */}
          <Chapter id="story-c" letter={ch3.letter} eyebrow={l(ch3.eyebrow)} title={l(ch3.title)} line={l(ch3.line)}>
            <Stage back="sky" label={l(W.match.rights)} front={<span className="float-chip">{laura.who} · {listings.est204.ref}</span>}>
              <div data-stage="match">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="t-caption font-medium text-text-muted">{l(W.match.wants)}</p>
                  <AnimatedList className="flex-row flex-wrap gap-2" delay={350} startDelay={300}>
                    {l(W.match.criteria).map((c) => <span key={c} className="inline-flex rounded-pill border border-ink-200 bg-white px-3 py-1.5 text-[0.9375rem] font-medium text-ink-950">{c}</span>)}
                  </AnimatedList>
                </div>
                <p className="mt-6 t-caption font-medium text-text-muted">{l(W.match.fits)}</p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {[listings.est204, listings.est231].map((li, i) => <Rise key={li.ref} delay={1.2 + i * 0.2}><ListingCard listing={li} locale={locale} photoLabel={l(W.common.photo)} note={l(W.match.yours)} /></Rise>)}
                </div>
                <Rise delay={1.8} className="mt-5 flex flex-col items-end gap-1.5">
                  <Bubble out label={l(W.common.assistant)} lang="en">{W.match.proposal}</Bubble>
                  <p className="t-caption text-text-muted">{l(W.match.sent)}</p>
                </Rise>
              </div>
            </Stage>
          </Chapter>

          {/* D */}
          <Chapter id="story-d" letter={ch4.letter} eyebrow={l(ch4.eyebrow)} title={l(ch4.title)} line={l(ch4.line)}>
            <Stage back="stone" label={l(W.task.othersSee)} front={<span className="float-chip"><span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-pill bg-ink-950 text-[0.6875rem] font-semibold text-ivory">E</span>{people.colleague.name}</span>}>
              <div data-stage="task">
                <p className="t-caption font-medium text-text-muted">{l(W.task.morning)}</p>
                <ol className="mt-3 space-y-3">
                  {taskItems.map((it, i) => {
                    const first = i === 0;
                    return (
                      <li key={it.who} className={cn("grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-lg border bg-white p-4", first ? "border-ink-950" : "border-ink-100")} data-task-item={i + 1} data-task-state={first ? task : "open"}>
                        <span className="tnum inline-flex h-8 w-8 items-center justify-center rounded-pill bg-ink-950 text-[0.9375rem] font-semibold text-ivory" aria-label={`${l(W.task.priority)} ${i + 1}`}>{i + 1}</span>
                        <div className="min-w-0">
                          <p className="text-[1rem] font-semibold text-ink-950">{it.who}</p>
                          <p className="mt-0.5 t-body-s text-text-secondary">{it.what}</p>
                          <p className="mt-1.5 t-caption text-text-secondary"><span className="font-medium text-text-accent">{l(W.task.why)}:</span> {it.why}</p>
                          {first ? (
                            <div className="mt-3 border-t border-ink-100 pt-3" aria-live="polite">
                              <p className="t-body-s text-text-primary"><span className="font-medium">{l(W.task.nextStep)}:</span> {it.next}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
                                {task === "open" && (<><button type="button" onClick={() => setTask("taken")} className="demo-action" data-task-take>{l(W.task.take)}<ArrowRight size={16} aria-hidden="true" /></button><span className="t-body-s text-text-secondary">{l(W.task.open)}</span></>)}
                                {task === "taken" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{l(W.task.taken)}</Mark><button type="button" onClick={() => setTask("done")} className="demo-action" data-task-complete>{l(W.task.complete)}</button></>)}
                                {task === "done" && (<><Mark tone="positive"><Check size={18} strokeWidth={2.5} aria-hidden="true" />{l(W.task.done)}</Mark><button type="button" onClick={() => setTask("open")} className="inline-flex min-h-[44px] items-center gap-2 t-body-s font-medium text-text-primary underline decoration-line-strong underline-offset-4 hover:decoration-ink-950" data-task-again><RotateCcw size={14} aria-hidden="true" />{l(W.task.again)}</button></>)}
                              </div>
                              {task !== "open" && (
                                <Rise delay={0.15} className="mt-4 flex flex-col items-end gap-1.5">
                                  <Bubble out label={people.colleague.name} meta={locale === "es" ? "miércoles 08:58" : "Wednesday 08:58"} lang="en">{W.task.chatConfirm}</Bubble>
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
              </div>
            </Stage>
          </Chapter>

          {/* E */}
          <Chapter id="story-e" letter={ch5.letter} eyebrow={l(ch5.eyebrow)} title={l(ch5.title)} line={l(ch5.line)}>
            <Stage back="sand" label={l(W.followup.footer)} front={<span className="float-chip"><Mail size={14} aria-hidden="true" />{laura.who}</span>}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8" data-stage="followup">
                <div>
                  <p className="t-caption font-medium text-text-muted">{l(W.followup.trigger)}</p>
                  <div className="mt-3"><ListingCard listing={listings.est240} locale={locale} photoLabel={l(W.common.photo)} note={l(W.followup.matches)} /></div>
                  <p className="mt-5 t-caption font-medium text-text-muted">{l(W.followup.conditions)}</p>
                  <AnimatedList className="mt-2 gap-2" delay={500} startDelay={600}>
                    {l(W.followup.conditionList).map((c) => <p key={c} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-signal-positive text-ivory"><Check size={12} strokeWidth={3} /></span>{c}</p>)}
                  </AnimatedList>
                </div>
                <Rise delay={2.2}>
                  <div className="overflow-hidden rounded-lg border border-ink-100 bg-white" data-story-email>
                    <div className="border-b border-ink-100 px-5 py-3">
                      <p className="t-caption text-text-muted">{l(W.followup.email)} · {l(W.followup.from)}</p>
                      <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950" lang="en">{W.followup.subject}</p>
                    </div>
                    <div className="px-5 py-4">
                      <p lang="en" className="text-[1rem] leading-[1.55] text-ink-950">{W.followup.body}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {[listings.est240, listings.est231].map((li) => <ListingCard key={li.ref} listing={li} locale={locale} photoLabel={l(W.common.photo)} compact />)}
                      </div>
                      <p className="mt-4"><span className="demo-action" aria-hidden="true">{W.followup.cta}<ArrowRight size={16} /></span></p>
                      <p className="mt-4 border-t border-ink-100 pt-3 t-caption text-text-muted">{l(W.followup.footer)}</p>
                    </div>
                  </div>
                </Rise>
              </div>
            </Stage>
          </Chapter>

          {/* F */}
          <Chapter id="story-f" letter={ch6.letter} eyebrow={l(ch6.eyebrow)} title={l(ch6.title)} line={l(ch6.line)}>
            <Stage back="sage" label={l(W.result.illustrative)} front={<span className="float-chip">{l(W.result.period)}</span>}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8" data-stage="result">
                <div>
                  <p className="t-caption font-medium text-text-muted">{l(W.result.weekly)}</p>
                  <p className="mt-1 t-caption text-text-muted">{l(W.result.basis)}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {numbers.map((n, i) => (
                      <Rise key={n.k} delay={0.1 + i * 0.08}>
                        <div className="rounded-lg border border-ink-100 bg-white p-4" data-result-number={i}>
                          <dt className="t-caption text-text-muted">{n.k}</dt>
                          <dd className="mt-1 tnum text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-950">{n.v}</dd>
                          <dd className="mt-1.5 t-caption text-text-secondary">{n.d}</dd>
                        </div>
                      </Rise>
                    ))}
                  </dl>
                  <p className="mt-5 t-caption font-medium text-text-muted">{l(W.result.openTitle)}</p>
                  <ul className="mt-2 space-y-1.5">{l(W.result.open).map((o) => <li key={o} className="flex items-start gap-2 t-body-s text-text-primary"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-[color:var(--signal-attention)]" />{o}</li>)}</ul>
                </div>
                <div className="rounded-lg bg-[#f6f4ee] p-4 md:p-5" data-story-weekly-email>
                  <p className="t-caption font-medium text-text-muted">{l(W.result.emailTitle)}</p>
                  <p className="mt-1 text-[1.0625rem] font-semibold leading-snug text-ink-950">{l(W.result.weekly)}</p>
                  <p className="mt-1 t-body-s text-text-secondary">{l(W.result.emailLine)}</p>
                  <ul className="mt-3 divide-y divide-ink-100 border-y border-ink-100">{numbers.slice(0, 4).map((n) => <li key={n.k} className="flex items-baseline justify-between gap-3 py-2 t-body-s"><span className="text-text-secondary">{n.k}</span><span className="tnum font-semibold text-ink-950">{n.v}</span></li>)}</ul>
                  <p className="mt-4"><Link href={localePath(locale, "/app/reports")} className="demo-action" data-story-report-link>{l(W.result.button)}<ArrowRight size={16} aria-hidden="true" /></Link></p>
                  <p className="mt-3 t-caption text-text-muted">{l(W.result.inLogin)}</p>
                </div>
              </div>
            </Stage>
          </Chapter>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
