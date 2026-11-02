import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/content/home-story";

/**
 * One listing of the example portfolio as a card (story C and E, the hero's object layer, the product sequence). Two shapes:
 * the upright card with the picture on top (`compact` for the smaller type), and the `row`, picture left and the facts right,
 * where the card must stay low (the hero's object layer, the phone). The picture is a licensed sample photo, never a real
 * listing (docs/website_redesign/MEDIA_SOURCES_1010.md); the card says so.
 */
export function ListingCard({ listing, locale, photoLabel, className, compact = false, row = false, eyebrow, note }: { listing: Listing; locale: Locale; photoLabel: string; className?: string; compact?: boolean; row?: boolean; eyebrow?: string; note?: string }) {
  return (
    <article className={cn("listing-card min-w-0 overflow-hidden rounded-lg border border-ink-100 bg-white", row && "listing-card-row", className)} data-listing={listing.ref}>
      {eyebrow && <p className="listing-eyebrow">{eyebrow}</p>}
      <div className={cn(row && "listing-row")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={listing.photo} alt={listing.photoAlt[locale]} width={800} height={533} loading="eager" decoding="async" className={cn("w-full bg-[#ece9e2] object-cover", row ? "listing-row-photo" : compact ? "aspect-[16/9]" : "aspect-[3/2]")} />
        <div className={cn("min-w-0", row ? "p-3 md:p-4" : compact ? "p-3" : "p-4")}>
          <p className={cn("font-semibold leading-snug text-ink-950", compact || row ? "text-[0.9375rem]" : "text-[1.0625rem]")}>{listing.title[locale]}</p>
          <p className={cn("tnum mt-1 whitespace-nowrap font-semibold text-ink-950", compact || row ? "text-[1rem]" : "text-[1.25rem]")} data-listing-price>{listing.price}</p>
          <p className="mt-1 t-body-s text-text-secondary">{listing.place[locale]}</p>
          <p className="mt-0.5 t-body-s text-text-secondary">{listing.facts[locale]}</p>
          <p className="mt-1.5 text-[0.875rem] leading-snug text-text-muted">{listing.photoKind[locale]} · {photoLabel}</p>
          {note && <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-text-accent">{note}</p>}
        </div>
      </div>
    </article>
  );
}
