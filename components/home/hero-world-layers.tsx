/**
 * The layers of the hero world (master order 2026-10-10 §1; R19 closing order 2026-10-19 §3): a Costa del Sol dusk
 * behind, a far range, a near headland with a tree line, the product, and a dark near ground in front. The land is
 * drawn as one connected landscape in four depths, not as four flat bands: every ridge has its own lit rim (the last
 * light from the horizon falls on the top edge of each form) and the sea glints between the far range and the
 * headland. No arches, no village, no drawn architecture.
 *
 *   sky      one photograph of a coast at dusk (licensed stock, docs/website_redesign/MEDIA_SOURCES_1010.md), toned
 *            down to the hero's anthracite and faded into the sky at the top and into the ground at the bottom
 *   far      the far range behind the water, the softest and lightest form
 *   mid      the headland with trees, the form the panel stands against
 *   front    the near ground in front of the panel's foot, with low scrub along its top
 *   stars    a few faint points, the slowest layer of all
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

/** The far range: a soft, lighter form behind the water, lit along its top. */
export function RidgesFar({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 220" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5062" />
          <stop offset="0.22" stopColor="#363b48" />
          <stop offset="1" stopColor="#262a33" />
        </linearGradient>
        <linearGradient id="hw-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6478" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2b3040" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 220V128C70 122 130 100 210 96C300 92 350 112 430 108C520 104 570 72 660 70C750 68 790 98 870 102C960 106 1010 84 1090 80C1180 76 1230 100 1310 104C1370 107 1410 118 1440 120V220Z" fill="url(#hw-far)" />
      {/* the water between the far range and the headland: a thin glint under the range's foot */}
      <path d="M0 150H1440V220H0Z" fill="url(#hw-sea)" />
      <path d="M160 160H420M520 166H700M860 162H1120M1200 168H1340" stroke="#8d97aa" strokeOpacity="0.28" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * The headland (mid): the ridge the panel stands against, with a tree line along its crest and a lit rim. It is the
 * one form with a recognisable shape of its own: a rise on the left, the saddle in the middle, the wooded shoulder
 * on the right.
 */
export function Ridges({ className }: { className?: string }) {
  // the tree line: small irregular crowns along the crest, drawn as one path on top of the ridge
  const crest = "M0 220V118C60 114 110 98 170 96C230 94 260 110 330 112C410 114 450 100 520 102C600 104 640 122 720 118C800 114 840 92 920 90C1000 88 1040 106 1110 104C1190 102 1230 86 1300 88C1370 90 1410 104 1440 106V220Z";
  const trees = [
    [40, 118, 7], [62, 114, 9], [84, 110, 6], [120, 100, 8], [146, 97, 10], [178, 95, 7], [204, 98, 9], [236, 104, 6], [268, 109, 8],
    [500, 103, 6], [526, 101, 9], [556, 102, 7], [588, 104, 8], [616, 110, 6],
    [862, 94, 8], [892, 91, 10], [922, 90, 7], [948, 90, 9], [978, 92, 8], [1008, 96, 6], [1036, 101, 8],
    [1250, 92, 7], [1280, 89, 9], [1310, 88, 7], [1340, 90, 8], [1372, 94, 6],
  ];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 220" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e323b" />
          <stop offset="0.18" stopColor="#22252c" />
          <stop offset="1" stopColor="#171a1e" />
        </linearGradient>
        <linearGradient id="hw-mid-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2229" />
          <stop offset="1" stopColor="#15171b" />
        </linearGradient>
      </defs>
      {/* the trees stand on the crest; preserveAspectRatio="none" stretches them a little, which silhouettes take without harm */}
      {/* slim crowns rooted in the crest (cypress-like), not round stones standing on it */}
      <g fill="#20232a">
        {trees.map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y - r * 0.5} rx={r * 0.42} ry={r * 1.5} />)}
      </g>
      <path d={crest} fill="url(#hw-mid)" />
      {/* the lit rim along the crest */}
      <path d="M0 118C60 114 110 98 170 96C230 94 260 110 330 112C410 114 450 100 520 102C600 104 640 122 720 118C800 114 840 92 920 90C1000 88 1040 106 1110 104C1190 102 1230 86 1300 88C1370 90 1410 104 1440 106" fill="none" stroke="#6a7286" strokeOpacity="0.35" strokeWidth="1.5" />
      {/* the nearer shoulder of the headland */}
      <path d="M0 220V162C120 158 200 146 340 150C480 154 580 170 740 164C900 158 980 142 1140 146C1300 150 1380 160 1440 158V220Z" fill="url(#hw-mid-2)" />
    </svg>
  );
}

/** The foreground: the near ground in front of the panel's foot, with low scrub along its top, the darkest form. */
export function Foreground({ className }: { className?: string }) {
  const scrub = [[60, 50, 14], [120, 44, 18], [210, 36, 12], [300, 34, 16], [420, 42, 12], [560, 56, 18], [660, 52, 12], [780, 44, 16], [920, 28, 14], [1010, 24, 18], [1130, 30, 12], [1260, 40, 16], [1380, 46, 12]];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 140" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1c20" />
          <stop offset="0.35" stopColor="#131416" />
          <stop offset="1" stopColor="#0f1012" />
        </linearGradient>
      </defs>
      <g fill="#15171a">
        {scrub.map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.55} />)}
      </g>
      <path d="M0 140V54C120 48 220 30 360 34C500 38 560 58 700 52C840 46 920 22 1080 26C1240 30 1340 48 1440 44V140Z" fill="url(#hw-front)" />
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
