import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { videoSlot } from "@/lib/media-manifest";

/**
 * A prepared media place (audit Z14, R28). It always shows a real poster: a rendered product
 * frame of the view the film will show, in the film's own aspect ratio (16:9 on desktop, 4:5 on
 * phones), so there is never an empty box and never a dead play button. Once the manifest entry
 * turns "ready", the same place renders the film with that poster, without layout shift.
 * Files: /public/media/<slug>/<slug>-{16x9,4x5}-v<N>-poster-<locale>.jpg and the film
 * /public/media/<slug>/<slug>-{16x9,4x5}-v<N>.{webm,mp4}.
 */
export function MediaSlot({ id, locale, caption, className }: { id: string; locale: Locale; caption: string; className?: string }) {
  const slot = videoSlot(id);
  if (!slot) return null;
  const base = `/media/${slot.slug}/${slot.slug}`;
  const v = `v${slot.version}`;
  const poster = (aspect: "16x9" | "4x5") => `${base}-${aspect}-${v}-poster-${locale}.jpg`;

  if (slot.status === "ready") {
    return (
      <figure className={cn("w-full", className)}>
        <video className="w-full rounded-xl border border-line-hairline bg-surface-sunken aspect-[4/5] md:aspect-[16/9]" controls preload="none" playsInline poster={poster("16x9")}>
          <source src={`${base}-16x9-${v}.webm`} type="video/webm" />
          <source src={`${base}-16x9-${v}.mp4`} type="video/mp4" />
          <track kind="captions" srcLang="en" src={`${base}-captions-en-${v}.vtt`} label="English" />
          <track kind="captions" srcLang="es" src={`${base}-captions-es-${v}.vtt`} label="Español" />
        </video>
        <figcaption className="mt-3 t-caption text-text-muted">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={cn("w-full", className)} data-media-slot={slot.id}>
      <picture>
        <source media="(min-width: 768px)" srcSet={poster("16x9")} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster("4x5")} alt={caption} className="w-full rounded-xl border border-line-hairline bg-surface-sunken aspect-[4/5] md:aspect-[16/9] object-cover" loading="lazy" />
      </picture>
      <figcaption className="mt-3 t-caption text-text-muted">{caption}</figcaption>
    </figure>
  );
}
