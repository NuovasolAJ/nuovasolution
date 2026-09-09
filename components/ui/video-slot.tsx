import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { videoSlot } from "@/lib/media-manifest";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ButtonLink } from "./button";
import { localePath } from "@/lib/i18n/config";

/**
 * A video slot renders either the real film (poster first, never autoplay)
 * or a designed pending frame with a real fallback action. Never a dead play
 * button. Never an implied live capability.
 */
export function VideoSlot({
  id,
  locale,
  caption,
  fallbackHref,
  fallbackLabel,
  fallbackText,
  className,
}: {
  id: string;
  locale: Locale;
  caption?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  fallbackText?: string;
  className?: string;
}) {
  const slot = videoSlot(id);
  const d = getDictionary(locale);
  if (!slot) return null;

  const mobileAspect = slot.aspectMobile === "1:1" ? "aspect-square" : "aspect-[4/5]";

  if (slot.status === "pending") {
    return (
      <figure className={cn("w-full", className)}>
        <div
          role="img"
          aria-label={d.common.pending.film}
          className={cn("relative w-full overflow-hidden border border-line-strong bg-surface-raised", mobileAspect, "lg:aspect-[16/9]")}
        >
          <div className="pending-field absolute inset-0" />
          <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-4 p-6 text-center md:p-8">
            <p className="t-caption text-text-muted">
              {slot.id} · {slot.duration[0]} to {slot.duration[1]} s · {d.common.pending.film}
            </p>
            <p className="t-body-m text-text-secondary max-w-[44ch]">{fallbackText ?? d.common.pending.filmFallback}</p>
            <ButtonLink href={fallbackHref ?? localePath(locale, "/contact")} variant="secondary" size="sm">
              {fallbackLabel ?? d.common.talkToUs}
            </ButtonLink>
          </div>
        </div>
        {caption && <figcaption className="mt-4 t-caption text-text-muted">{caption}</figcaption>}
      </figure>
    );
  }

  const base = `/media/${slot.slug}/${slot.slug}`;
  const v = `v${slot.version}`;
  return (
    <figure className={cn("w-full", className)}>
      <video
        className={cn("w-full border border-line-strong bg-ink-1000", mobileAspect, "lg:aspect-[16/9]")}
        controls
        preload="none"
        playsInline
        poster={`${base}-16x9-${v}-poster.jpg`}
      >
        <source src={`${base}-16x9-${v}.webm`} type="video/webm" />
        <source src={`${base}-16x9-${v}.mp4`} type="video/mp4" />
        <track kind="captions" srcLang="en" src={`${base}-captions-en-${v}.vtt`} label="English" />
        <track kind="captions" srcLang="es" src={`${base}-captions-es-${v}.vtt`} label="Español" />
      </video>
      {caption && <figcaption className="mt-4 t-caption text-text-muted">{caption}</figcaption>}
    </figure>
  );
}
