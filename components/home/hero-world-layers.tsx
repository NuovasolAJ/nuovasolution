/**
 * The layers of the hero world (master order 2026-10-10 §1; the owner's binding closing order of 27.10. §2, §3). The
 * product panel is the main motif; the villa backdrop of 26.10. is withdrawn (not released by the owner, not to be recoloured
 * or extended). What remains is calm and architectural:
 *
 *   1 sky        the coast at dusk (licensed stock, docs/website_redesign/MEDIA_SOURCES_1010.md), toned to the hero's
 *                anthracite, with one soft light low over the sea and a few stars: a calm ground with a subtle light
 *   2 structure  a discreet spatial structure in thin lines: the horizon, a floor in perspective (the lines of a terrace's
 *                stone joints converging toward the horizon) and the suggestion of a near column at each side; nothing
 *                figurative, no buildings, no windows
 *   3 panel      the product (hero-world.tsx): large, close, lightly leaning, the main motif
 *   4 results    the customer record and the priority alert, lifted from the panel (hero-world.tsx, .hero-record-lift)
 *
 * The floor is the page's canvas colour: the terrace's light pool under the panel is the hero's lower ground, so the hero
 * does not end on an edge; the story continues on the same colour. Everything here is decoration: aria-hidden, no text.
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

/**
 * The spatial structure behind and under the panel: the horizon as one thin lit line, the floor's joints converging to it,
 * and a slim vertical at each side (the edge of a near column or a door frame) that frames the panel without a figure. The
 * strokes are the warm rim tone of the house palette at low opacity; they fade toward the horizon.
 */
export function Structure({ className }: { className?: string }) {
  const vx = 720; // the vanishing point on the horizon
  const hy = 150; // the horizon's y in this box (620 px tall on the page: the horizon just above the panel's head)
  const along = [-320, -120, 80, 280, 480, 640, 800, 960, 1160, 1360, 1560, 1760];
  const across = [200, 240, 292, 356, 436, 530];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 620" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-joint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0c893" stopOpacity="0" />
          <stop offset="0.3" stopColor="#e0c893" stopOpacity="0.38" />
          <stop offset="0.62" stopColor="#c9a96e" stopOpacity="0.22" />
          <stop offset="1" stopColor="#1a1917" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="hw-horizon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e0c893" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e0c893" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e0c893" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hw-column" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0c893" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e0c893" stopOpacity="0.4" />
          <stop offset="1" stopColor="#1a1917" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* the horizon */}
      <path d={`M0 ${hy}H1440`} stroke="url(#hw-horizon)" strokeWidth="1.2" />
      {/* the floor in perspective */}
      <g stroke="url(#hw-joint)" strokeWidth="1" fill="none">
        {along.map((x) => <path key={x} d={`M${x} 620L${vx + (x - vx) * 0.08} ${hy}`} />)}
        {across.map((y) => <path key={y} d={`M0 ${y}H1440`} />)}
      </g>
      {/* a slim vertical at each side: the near edge of a column, framing the panel */}
      <g stroke="url(#hw-column)" strokeWidth="1.4" className="hw-side">
        <path d="M96 40V620" /><path d="M118 70V620" />
        <path d="M1344 40V620" /><path d="M1322 70V620" />
      </g>
    </svg>
  );
}

/** A few faint stars high in the sky: a hint of the hour, nothing more. */
export function Stars({ className, ...rest }: { className?: string } & Record<`data-${string}`, string>) {
  const pts: [number, number, number][] = [[80, 40, 1], [210, 90, 0.8], [330, 30, 1.2], [470, 70, 0.7], [620, 24, 1], [760, 58, 0.8], [900, 36, 1.1], [1040, 80, 0.7], [1180, 28, 1], [1300, 64, 0.9], [1400, 44, 0.7], [540, 120, 0.6], [980, 130, 0.6], [1250, 140, 0.7], [150, 150, 0.6]];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMin slice" focusable="false" {...rest}>
      {pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#f8f6f1" opacity={0.35 + (i % 3) * 0.15} />)}
    </svg>
  );
}
