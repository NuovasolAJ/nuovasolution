/**
 * The layers of the hero world (master order 2026-10-10 §1): a Costa del Sol dusk behind, calm ridges in the
 * middle, the product in front. No arches, no village, no drawn architecture.
 *
 *   far    one photograph of a coast at dusk (licensed stock, see docs/website_redesign/MEDIA_SOURCES_1010.md),
 *          toned down to the hero's anthracite and faded into the sky at the top and into the ground at the bottom
 *   mid    two soft ridges, drawn, in the hero's own dark tones; they sit where the sea meets the land
 *   front  nothing drawn: the two floating product cards are the foreground (hero-world.tsx)
 *
 * Everything here is decoration: aria-hidden, no text, no pointer events.
 */
export function DuskPhoto({ className }: { className?: string }) {
  return (
    <picture className={className}>
      <source media="(max-width: 639px)" srcSet="/media/world/hero-dusk-800.webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/world/hero-dusk-1400.webp" alt="" width={1400} height={933} fetchPriority="high" decoding="async" aria-hidden="true" className="h-full w-full object-cover object-[50%_62%]" />
    </picture>
  );
}

/** Mid layer: stretched to the full width (silhouettes take a horizontal stretch without harm). */
export function Ridges({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 220" preserveAspectRatio="none" focusable="false">
      <path d="M0 220V112C120 108 200 92 320 96C440 100 520 118 660 112C800 106 880 86 1020 88C1160 90 1260 108 1440 100V220Z" fill="#1f2228" />
      <path d="M0 220V156C140 152 220 140 360 144C500 148 600 164 760 158C920 152 1000 136 1160 140C1320 144 1380 154 1440 152V220Z" fill="#171a1e" />
    </svg>
  );
}

/** A few faint stars high in the sky: a hint of the hour, nothing more. */
export function Stars({ className }: { className?: string }) {
  const pts: [number, number, number][] = [[80, 40, 1], [210, 90, 0.8], [330, 30, 1.2], [470, 70, 0.7], [620, 24, 1], [760, 58, 0.8], [900, 36, 1.1], [1040, 80, 0.7], [1180, 28, 1], [1300, 64, 0.9], [1400, 44, 0.7], [540, 120, 0.6], [980, 130, 0.6], [1250, 140, 0.7], [150, 150, 0.6]];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMin slice" focusable="false">
      {pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#f8f6f1" opacity={0.35 + (i % 3) * 0.15} />)}
    </svg>
  );
}
