/**
 * The depth of the hero (the owner's order of 30.10., point 1: a spatial product depiction with recognisable layers; the
 * property picture as the depth). One photograph of a home, far back and toned to the hero's dusk: the living room of the
 * example listing EST-204 (licensed stock, Pexels 12715501, docs/website_redesign/MEDIA_SOURCES_1010.md), the same picture
 * the object card in front of it carries, so the depth and the object are one thing. Everything here is decoration:
 * aria-hidden, no text. The toning (globals.css, .hero-depth-*) keeps the words and the navigation on a calm dark ground
 * at the top and dissolves the picture into the page's canvas at the bottom, so the hero ends on no edge.
 */
export function DepthPhoto({ className }: { className?: string }) {
  return (
    <picture className={className}>
      <source media="(max-width: 639px)" srcSet="/media/world/hero-room-900.webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/world/hero-room-1800.webp" alt="" width={1800} height={1201} fetchPriority="high" decoding="async" aria-hidden="true" className="h-full w-full object-cover object-[50%_58%]" />
    </picture>
  );
}
