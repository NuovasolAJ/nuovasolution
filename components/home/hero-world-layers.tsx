/**
 * The layers of the hero world (master order 2026-10-10 §1; R19 closing order 2026-10-19 §3; the owner's consolidated
 * closing order of 26.10. §1, §2: four visible layers that belong to NuovaSolution, as one spatial scene, no waves and no
 * mountain bands, no straight edge and no fog between the hero and the story). Read from the back:
 *
 *   1 sky          one photograph of a coast at dusk (licensed stock, docs/website_redesign/MEDIA_SOURCES_1010.md),
 *                  toned to the hero's anthracite, with one warm glow where the last light stands over the sea
 *   2 architecture a hillside of restrained Mediterranean villas: whitewashed walls in the warm light of the terrace,
 *                  flat roofs, a set-back upper floor with a roof terrace and a pergola, a cantilevered floor with a
 *                  louvred screen, cypresses, lit openings and the pool between the houses; a far row of houses on
 *                  the other shore, dark in the haze (ArchitectureFar). Drawn in the house tokens, not photographed
 *   3 panel        the product (hero-world.tsx)
 *   4 terrace      the stone terrace the panel stands on: the page's canvas, with its pavement joints in perspective
 *                  and a low parapet at each side. The villas stand in the same light, so the dark of the hero is the
 *                  sky above the roofs and the transition to the story is the villas' skyline and the lit walls, not a
 *                  band: the walls' feet dissolve into the floor (globals.css), and the floor is the next chapter's ground
 *
 * Everything here is decoration: aria-hidden, no text, no pointer events. The two architecture layers and the terrace
 * are inline SVG so the phone can drop the side volumes (class hw-side) and keep a composition of its own.
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

/** The far row: houses on the far shore behind the water, dark in the haze, the softest forms, and the glint of the sea. */
export function ArchitectureFar({ className }: { className?: string }) {
  // [x, width, height of the block, lit?]: low cubes along the far shore, read as a village at dusk
  const far: [number, number, number, boolean][] = [
    [0, 90, 16, false], [96, 70, 22, true], [172, 110, 14, false], [290, 60, 26, false], [356, 120, 18, true], [484, 80, 12, false],
    [580, 140, 18, false], [728, 70, 28, true], [804, 120, 16, false], [930, 90, 22, false], [1026, 150, 14, true], [1184, 80, 20, false],
    [1270, 110, 16, false], [1386, 54, 24, true],
  ];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <linearGradient id="hw-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3f4c" />
          <stop offset="1" stopColor="#2a2e38" />
        </linearGradient>
        <linearGradient id="hw-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6478" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2b3040" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* the far hill the village stands on */}
      <path d="M0 220V156C140 150 260 140 420 142C600 144 700 154 880 148C1060 142 1200 132 1440 142V220Z" fill="#2f333d" />
      <g fill="url(#hw-far)">
        {far.map(([x, w, h], i) => <rect key={i} x={x} y={156 - h * 0.7 + (i % 3) * 2} width={w} height={h * 0.7 + 40} />)}
      </g>
      {/* the last light along the roofs, and a few lit windows far away */}
      <g stroke="#9aa3b6" strokeOpacity="0.2" strokeWidth="1">
        {far.map(([x, w, h], i) => <path key={i} d={`M${x} ${156 - h * 0.7 + (i % 3) * 2}H${x + w}`} />)}
      </g>
      <g fill="#f1e3c4" fillOpacity="0.3">
        {far.filter((f) => f[3]).map(([x, , h], i) => <rect key={i} x={x + 18} y={162 - h * 0.7 + 4} width="5" height="3" />)}
      </g>
      {/* the water between the far shore and the villas */}
      <path d="M0 182H1440V220H0Z" fill="url(#hw-sea)" />
      <path d="M160 194H420M520 200H700M860 196H1120M1200 202H1340" stroke="#8d97aa" strokeOpacity="0.26" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * The villas (the layer the panel stands against). Three groups: the villa at the left with its roof terrace and
 * pergola, the low houses behind the panel with the pool in front of them (only their roof lines and the cypresses
 * between them show above the panel), the villa at the right with its cantilevered upper floor and the louvred screen.
 * Whitewashed walls in the terrace's warm light: the front face lighter, the side face a step darker, a thin shadow line
 * along every roof, lit openings warm. The feet of every volume dissolve into the terrace's light (a mask in globals.css).
 */
export function Architecture({ className }: { className?: string }) {
  const rim = "#8a7f6e";
  const frame = "#7a6d5c";
  const Cypress = ({ x, y, h }: { x: number; y: number; h: number }) => <path d={`M${x} ${y}C${x - h * 0.12} ${y - h * 0.35} ${x - h * 0.1} ${y - h * 0.8} ${x} ${y - h}C${x + h * 0.1} ${y - h * 0.8} ${x + h * 0.12} ${y - h * 0.35} ${x} ${y}Z`} fill="#2a3530" />;
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <linearGradient id="hw-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfc5b2" />
          <stop offset="1" stopColor="#ebe5d8" />
        </linearGradient>
        <linearGradient id="hw-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3a893" />
          <stop offset="1" stopColor="#d6cdbd" />
        </linearGradient>
        <linearGradient id="hw-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d9a3" />
          <stop offset="1" stopColor="#e9c98a" />
        </linearGradient>
      </defs>

      {/* the low houses behind the panel: stepped roofs, the pool's edge in front of them */}
      <g>
        <rect x="430" y="204" width="200" height="156" fill="url(#hw-front)" />
        <rect x="610" y="176" width="150" height="184" fill="url(#hw-side)" />
        <rect x="760" y="196" width="130" height="164" fill="url(#hw-front)" />
        <rect x="890" y="214" width="150" height="146" fill="url(#hw-side)" />
        <g stroke={rim} strokeOpacity="0.55" strokeWidth="1.2">
          <path d="M430 204H630" /><path d="M610 176H760" /><path d="M760 196H890" /><path d="M890 214H1040" />
        </g>
        <g fill="url(#hw-glow)">
          <rect x="648" y="192" width="40" height="12" /><rect x="792" y="212" width="26" height="10" /><rect x="928" y="230" width="48" height="10" />
        </g>
        <Cypress x={412} y={360} h={190} /><Cypress x={642} y={176} h={96} /><Cypress x={776} y={196} h={76} /><Cypress x={1052} y={360} h={210} /><Cypress x={1068} y={360} h={160} />
        {/* the pool between the houses and the terrace: its light coping, the dark water, a glint on it */}
        <rect x="462" y="296" width="556" height="64" fill="#e6dfd0" />
        <rect x="470" y="302" width="540" height="58" fill="#2b3d45" />
        <path d="M520 318H700M760 330H940" stroke="#a8c4cc" strokeOpacity="0.4" strokeWidth="1" />
      </g>

      {/* the villa at the left: the lower volume, the set-back upper floor, the roof terrace with its rail, the pergola */}
      <g className="hw-side">
        <rect x="-40" y="150" width="340" height="210" fill="url(#hw-front)" />
        <rect x="300" y="150" width="34" height="210" fill="url(#hw-side)" />
        <rect x="0" y="92" width="236" height="60" fill="url(#hw-side)" />
        <rect x="236" y="92" width="26" height="60" fill="url(#hw-front)" />
        <g stroke={rim} strokeOpacity="0.6" strokeWidth="1.4"><path d="M-40 150H334" /><path d="M0 92H262" /></g>
        {/* the rail of the roof terrace */}
        <g stroke={rim} strokeOpacity="0.5" strokeWidth="1.2"><path d="M8 82H228" />{[20, 60, 100, 140, 180, 220].map((x) => <path key={x} d={`M${x} 82V92`} />)}</g>
        {/* the pergola on the lower roof, right of the upper floor */}
        <g stroke="#6b5d4c" strokeWidth="3"><path d="M268 118H348" /><path d="M276 118V150M312 118V150M346 118V150" /></g>
        {/* lit openings: the long window of the upper floor, the glazed wall below the pergola */}
        <rect x="60" y="112" width="120" height="16" fill="url(#hw-glow)" />
        <rect x="150" y="178" width="110" height="64" fill="url(#hw-glow)" />
        <rect x="150" y="178" width="110" height="64" fill="none" stroke={frame} strokeOpacity="0.5" />
        <path d="M205 178V242" stroke={frame} strokeWidth="2" />
        <Cypress x={350} y={360} h={220} /><Cypress x={372} y={360} h={170} />
      </g>

      {/* the villa at the right: the cantilevered upper floor with a louvred screen over the glazed lower floor */}
      <g className="hw-side">
        <rect x="1140" y="186" width="340" height="174" fill="url(#hw-front)" />
        <rect x="1108" y="186" width="32" height="174" fill="url(#hw-side)" />
        <rect x="1080" y="118" width="400" height="68" fill="url(#hw-side)" />
        <rect x="1060" y="118" width="20" height="68" fill="url(#hw-front)" />
        <g stroke={rim} strokeOpacity="0.6" strokeWidth="1.4"><path d="M1060 118H1480" /><path d="M1108 186H1140" /></g>
        {/* the louvres of the upper floor */}
        <g stroke="#9a8f7c" strokeWidth="2">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${1116 + i * 24} 128V178`} />)}</g>
        <rect x="1110" y="140" width="330" height="8" fill="url(#hw-glow)" />
        {/* the glazed lower floor, lit from inside, and its slim columns */}
        <rect x="1180" y="214" width="220" height="80" fill="url(#hw-glow)" />
        <rect x="1180" y="214" width="220" height="80" fill="none" stroke={frame} strokeOpacity="0.5" />
        <g stroke={frame} strokeWidth="3"><path d="M1254 214V294M1328 214V294" /></g>
        {/* the thin slab the upper floor rests on */}
        <path d="M1080 186H1480" stroke="#a89d89" strokeWidth="3" />
        <Cypress x={1096} y={360} h={120} />
      </g>
    </svg>
  );
}

/**
 * The terrace (foreground): the stone floor the panel stands on, in the page's canvas, its joints converging toward the
 * villas, a low parapet at each side. The joints fade out toward the far side, so the floor dissolves into the light
 * under the villas rather than meeting them on an edge; the parapets dissolve toward the viewer, so nothing ends on the
 * hero's lower edge.
 */
export function Terrace({ className }: { className?: string }) {
  const joint = "#1a1917";
  const across = [30, 70, 118, 172, 232];
  const along = [-200, -40, 120, 280, 440, 600, 760, 920, 1080, 1240, 1400, 1560];
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 240" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfaf7" stopOpacity="0" />
          <stop offset="0.42" stopColor="#fbfaf7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fbfaf7" />
        </linearGradient>
        <linearGradient id="hw-joints" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={joint} stopOpacity="0" />
          <stop offset="0.35" stopColor={joint} stopOpacity="0.05" />
          <stop offset="1" stopColor={joint} stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id="hw-parapet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebe6da" />
          <stop offset="0.55" stopColor="#f3efe6" />
          <stop offset="1" stopColor="#fbfaf7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height="240" fill="url(#hw-floor)" />
      <g stroke="url(#hw-joints)" strokeWidth="1.2" fill="none">
        {across.map((y) => <path key={y} d={`M0 ${y}H1440`} />)}
        {along.map((x) => <path key={x} d={`M${x} 240L${720 + (x - 720) * 0.42} 0`} />)}
      </g>
      {/* the parapets: a low wall at each side, its top catching the light, converging with the floor */}
      <g className="hw-side">
        <path d="M0 96L150 118V240H0Z" fill="url(#hw-parapet)" />
        <path d="M0 96L150 118" stroke="#d9d2c3" strokeWidth="2" />
        <path d="M0 94L150 116" stroke="#fffdf8" strokeWidth="1.5" />
        <path d="M1440 96L1290 118V240H1440Z" fill="url(#hw-parapet)" />
        <path d="M1440 96L1290 118" stroke="#d9d2c3" strokeWidth="2" />
        <path d="M1440 94L1290 116" stroke="#fffdf8" strokeWidth="1.5" />
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
