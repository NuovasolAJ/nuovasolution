import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { imageSlots } from "@/lib/media-manifest";
import { getDictionary } from "@/lib/i18n/dictionaries";

const aspectCls = {
  "3:4": "aspect-[3/4]",
  "4:5": "aspect-[4/5]",
  "16:10": "aspect-[16/10]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-[16/9]",
};

/**
 * A photograph slot. Until a licensed image exists, a labelled frame at the
 * final aspect ratio. Photography is decorative here: alt="" when real.
 */
export function ImageSlot({ id, locale, className, aspectOverride }: { id: string; locale: Locale; className?: string; aspectOverride?: keyof typeof aspectCls }) {
  const slot = imageSlots[id];
  const d = getDictionary(locale);
  if (!slot) return null;
  const aspect = aspectOverride ?? slot.aspect;
  return (
    <div
      role="img"
      aria-label={d.common.pending.photo}
      className={cn("relative w-full overflow-hidden border border-line-strong bg-surface-raised", aspectCls[aspect], className)}
    >
      <div className="pending-field absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 z-[1] p-4">
        <p className="t-caption text-text-muted">
          {slot.id} · {d.common.pending.photo} {slot.subject[locale]}
        </p>
      </div>
    </div>
  );
}
