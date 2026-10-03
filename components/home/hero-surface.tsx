import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { DepthScene } from "@/components/ui/depth-scene";
import { DotPattern } from "@/components/ui/dot-pattern";
import { SeqReplay } from "./seq-replay";

/**
 * The hero's product scene (owner direction 2026-10-03): three layers that can be told apart, and a story
 * that the picture tells in the order it happens: customer enquiry → fitting reply → customer record →
 * the next action for the team.
 *
 * 1. Background: a warm ground with an arch, the doorway the scene stands in. Larger than the product,
 *    quieter than everything else; it moves least when the page scrolls.
 * 2. Product (the centre): the agency's window. The reply forms in the conversation, the customer record
 *    is filled next to it.
 * 3. Foreground: the two things that cross the window's edge, and only those. On the left the customer's
 *    message arrives from outside (who writes); on the right the task comes forward out of the window
 *    (what a person does next). Their movement is the story, not decoration, and on scroll they travel a
 *    little further than the window (components/ui/depth-scene.tsx).
 *
 * Everything is in document order (enquiry, reply, record, task), so a screen reader and a phone read
 * the same story. No hot lead alert here: it appears only where an example shows why a lead qualifies
 * (owner 2026-10-03; COPY_HERO_1003 §3). The conversation is shown in Spanish on both language versions,
 * because Spanish is the language the product replies in today (label 2).
 *
 * Structure after Hero Section 1 by Meschac Irung (tailark), https://21st.dev/@meschacirung/components/hero-section-1
 * (MIT): the product picture in a thin outer frame with the window inside it. Adapted: a live surface instead
 * of a screenshot, our warm ground with the Magic UI dot pattern as a hint, no logo cloud, and a CSS
 * sequence (globals.css, "hero sequence") instead of a motion library, so the first picture needs no
 * script. Without JavaScript and with reduced motion the finished picture simply stands.
 * All people and data are synthetic and labelled.
 */
const delay = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--seq-delay" as string]: `${ms}ms`, ...extra });

function StepLabel({ n, children, className, style }: { n: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p className={cn("flex items-center gap-2 t-caption font-medium text-text-secondary", className)} style={style}>
      <span aria-hidden="true" className="tnum inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-ink-950 text-[0.6875rem] font-medium leading-none text-ivory">{n}</span>
      {children}
    </p>
  );
}

export function HeroSurface({ locale, className }: { locale: Locale; className?: string }) {
  const d = getDictionary(locale);
  const c = d.home.hero.cards;
  const v = d.home.views.conversation;
  const t = d.home.v3.hero;
  // The conversation as the product writes it today: in Spanish, on both language versions.
  const es = getDictionary("es").home.hero.cards;
  const initials = c.record.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <DepthScene className={cn("hero-scene", className)}>
      <div data-hero-surface className="contents">
        {/* Layer 1: the background. */}
        <div data-depth-layer="back" aria-hidden="true" className="hero-scene-back">
          <div className="hero-scene-arch" />
          <DotPattern />
        </div>

        <figure aria-label={t.surfaceLabel} className="relative z-[1] mx-auto max-w-[600px]" data-seq="run">
          {/* Layer 2: the agency's window. */}
          <div className="v3-frame">
            <div className="v3-window">
              <div className="flex items-center gap-3 rounded-t-[inherit] border-b border-line-hairline px-4 py-3 md:px-5">
                <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-sand-200 t-caption font-medium text-text-primary">{v.agency.slice(0, 1)}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate t-body-s font-medium leading-tight text-text-primary">{v.agency}</p>
                  <p className="truncate t-caption text-text-muted">{d.home.views.board.title}</p>
                </div>
                <span className="shrink-0 rounded-pill bg-surface-sunken px-2.5 py-1 t-caption text-text-muted">{v.synthetic}</span>
              </div>

              <div className="grid md:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
                {/* The conversation: the enquiry (foreground) and the reply (in the window). */}
                <div className="space-y-2.5 p-4 md:p-5">
                  {/* Layer 3, left: the customer's message crosses the window's left edge. */}
                  <div data-depth-layer="front" className="relative z-[2] -ml-8 mr-6 md:-ml-10 md:mr-4 xl:-ml-[68px] xl:mr-7" data-hero-enquiry>
                    <div className="seq-item hero-front-card p-3.5 md:p-4" data-seq-kind="arrive" style={delay(150)}>
                      <StepLabel n={1}>
                        <span className="inline-flex items-center gap-1.5">
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-pill bg-[color:var(--channel-whatsapp,#2f8f5b)]" />
                          {t.labels.enquiry}
                        </span>
                      </StepLabel>
                      <p lang="es" className="mt-2 text-[0.9375rem] leading-[1.5] text-text-primary">{es.enquiry.text}</p>
                      <p className="mt-1.5 t-caption tnum text-text-muted">{c.enquiry.from} · {c.enquiry.time}</p>
                    </div>
                  </div>

                  <StepLabel n={2} className="seq-item pt-1.5" style={delay(900)}>{t.labels.reply}</StepLabel>
                  <div className="relative flex justify-end">
                    {/* The reply forming: three dots where it will stand, gone when it is there. */}
                    <span className="seq-typing typing absolute right-0 top-0 items-center gap-1 rounded-lg rounded-br-sm bg-[color:var(--accent-wash,#fbf4e3)] px-3.5 py-3 text-text-accent" style={delay(900, { ["--seq-typing-for" as string]: "1400ms" })} aria-hidden="true">
                      <i>●</i><i>●</i><i>●</i>
                    </span>
                    <div className="seq-item rounded-lg rounded-br-sm bg-[color:var(--accent-wash,#fbf4e3)] px-3.5 py-2.5" style={delay(2250)} data-hero-reply>
                      <p className="mb-1 t-caption font-medium text-text-accent">{v.assistant}</p>
                      <p lang="es" className="text-[0.875rem] leading-[1.5] text-text-primary">{es.answer.text}</p>
                      <p className="mt-1 t-caption tnum text-text-muted">{c.answer.time}</p>
                    </div>
                  </div>
                </div>

                {/* What the agency has afterwards: the record (in the window) and the task (foreground). */}
                <div className="space-y-2.5 rounded-b-[inherit] border-t border-line-hairline bg-[color:var(--ivory)] p-4 md:rounded-bl-none md:border-l md:border-t-0 md:p-5">
                  <StepLabel n={3} className="seq-item" style={delay(3050)}>{t.labels.crm}</StepLabel>
                  <div className="seq-item rounded-lg border border-[color:var(--line-contour)] bg-surface-raised p-3.5" style={delay(3150)} data-hero-crm>
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-surface-sunken t-caption font-medium text-text-secondary">{initials}</span>
                      <p className="min-w-0 flex-1 t-body-s font-medium leading-tight text-text-primary">{c.record.name}</p>
                    </div>
                    <ul className="mt-2.5 space-y-1 border-t border-line-hairline pt-2.5">
                      {c.record.lines.slice(0, 2).map((l, i) => (
                        <li key={l} className="seq-item t-caption text-text-secondary" style={delay(3350 + i * 160)}>{l}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Layer 3, right: the task comes forward over the window's right edge. */}
                  <div data-depth-layer="front" className="relative z-[2] -mr-8 ml-6 pt-1 md:-mr-10 md:ml-2 xl:-mr-[60px] xl:ml-3" data-hero-task>
                    <div className="seq-item hero-front-card p-3.5 md:p-4" data-seq-kind="forward" style={delay(4100)}>
                      <StepLabel n={4}>{t.labels.next}</StepLabel>
                      <p className="mt-2 t-body-s font-medium leading-snug text-text-primary">{c.task.title}</p>
                      <p className="mt-1 t-caption text-text-muted">{c.task.reason}</p>
                      <p className="mt-3 flex items-center justify-between gap-3 border-t border-line-hairline pt-2.5">
                        <span className="t-caption text-text-secondary">{c.task.state}</span>
                        <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-ink-950 px-3 py-1 t-caption font-medium text-ivory">{c.task.action}<ArrowRight size={12} strokeWidth={2.25} /></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </figure>
        {/* In the scene's bottom band, under the window; never over it. */}
        <div className="absolute bottom-2 left-3 z-[3] md:bottom-3 md:left-10 xl:left-12">
          <SeqReplay label={t.replay} />
        </div>
      </div>
    </DepthScene>
  );
}
