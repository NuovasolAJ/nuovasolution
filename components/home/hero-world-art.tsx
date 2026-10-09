/**
 * The Mediterranean world of the hero (owner direction 2026-10-05), drawn for this site: no photograph
 * and no foreign asset. Four depths, each its own layer so they can move apart on scroll:
 *
 *   far    the sky's last light, two mountain ridges, the coast lights and the sea
 *   mid    two calm pieces of architecture on their terraces: a long house with a colonnade, a villa with an arch, a cypress, a palm
 *   (the product panel stands here)
 *   front  an olive tree and an agave on the left, a stepped terrace wall with a pot and the foot of an arch on the right
 *
 * Everything is decoration: aria-hidden, no text, no pointer events. The colours are the hero's own
 * (anthracite, a dusk warmth at the horizon, lit windows in the one warm accent).
 */
const WALL_LIT = "#cfc5b1";
const WALL_SHADE = "#9c937f";
const WALL_DIM = "#b3a994";
const ROOF = "#7d5540";
const GLOW = "#f2c57f";
const TREE = "#101412";
const NEAR = "#0b0b0a";

function Window({ x, y, w = 7, h = 11 }: { x: number; y: number; w?: number; h?: number }) {
  return <path d={`M${x} ${y + h} V${y + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V${y + h} Z`} fill={GLOW} opacity="0.92" />;
}

/** Far layer: stretched to the full width (silhouettes take a horizontal stretch without harm). */
export function FarArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 240" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient id="hw-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#343944" />
          <stop offset="1" stopColor="#232730" />
        </linearGradient>
        <radialGradient id="hw-shine" cx="0.5" cy="0" r="0.5" gradientTransform="matrix(1 0 0 2 0 0)">
          <stop offset="0" stopColor="#dfa068" stopOpacity="0.5" />
          <stop offset="1" stopColor="#dfa068" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* the hazy back ridge, then the nearer one */}
      <path d="M0 180V118C70 104 120 96 190 112C250 126 300 80 380 70C450 62 500 100 560 108C640 118 690 60 780 44C860 30 910 84 980 92C1060 102 1110 66 1180 74C1260 84 1320 120 1380 112C1410 108 1430 112 1440 116V180Z" fill="#555a68" />
      <path d="M0 180V150C90 138 150 150 230 140C330 128 380 150 470 156C560 162 620 132 720 128C820 124 880 150 960 152C1060 154 1120 136 1200 140C1290 144 1350 160 1440 150V180Z" fill="#3a3e48" />
      {/* the sea, with the last light lying on it */}
      <rect x="0" y="180" width="1440" height="60" fill="url(#hw-sea)" />
      <rect x="700" y="180" width="440" height="60" fill="url(#hw-shine)" />
      <g stroke="#c9905f" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round">
        <path d="M820 192h70M880 201h96M790 210h54M930 214h80M860 224h120" />
      </g>
      {/* lights along the coast */}
      <g fill={GLOW} opacity="0.8">
        {[[96, 172], [121, 175], [168, 171], [305, 169], [338, 173], [520, 176], [548, 174], [1112, 171], [1150, 174], [1178, 172], [1296, 176], [1340, 173]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />
        ))}
      </g>
    </svg>
  );
}

/**
 * Mid layer, left: one calm piece of architecture, a long white terrace house on the slope, a colonnade of
 * three large arches, a single cypress. Few forms, large, so the depth reads at a glance (owner 2026-10-06 §1).
 */
export function MidLeftArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 460 330" focusable="false">
      <path d="M0 330V150C80 134 170 150 250 190C320 226 400 282 460 330Z" fill="#262a30" />
      <ellipse cx="300" cy="150" rx="9" ry="42" fill={TREE} />
      {/* the terrace house: a long low volume, a higher volume behind, a colonnade in front */}
      <rect x="40" y="118" width="190" height="78" fill={WALL_LIT} />
      <rect x="110" y="78" width="100" height="40" fill={WALL_DIM} />
      <path d="M106 78h108v-6H106z" fill={ROOF} />
      <path d="M36 118h198v-6H36z" fill={ROOF} />
      <rect x="230" y="138" width="40" height="58" fill={WALL_SHADE} />
      {[56, 104, 152].map((x) => (
        <path key={x} d={`M${x} 196V158a18 18 0 0 1 36 0V196Z`} fill="#2b2622" />
      ))}
      <Window x={128} y={90} w={9} h={14} />
      <Window x={178} y={90} w={9} h={14} />
      {/* the terrace edge in front of the house */}
      <path d="M0 214h282v8H0z" fill={WALL_SHADE} />
      <path d="M0 330V236C70 222 150 228 230 258C300 284 380 306 460 330Z" fill="#1f2226" />
    </svg>
  );
}

/**
 * Mid layer, right: a modern white villa with one wide arch and a palm, on its own terrace.
 */
export function MidRightArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 460 330" focusable="false">
      <path d="M460 330V140C380 124 290 140 210 184C140 222 60 282 0 330Z" fill="#262a30" />
      <ellipse cx="166" cy="178" rx="8" ry="36" fill={TREE} />
      {/* the villa: two stacked volumes */}
      <rect x="250" y="82" width="120" height="44" fill={WALL_DIM} />
      <path d="M246 82h128v-6H246z" fill={ROOF} />
      <rect x="214" y="126" width="206" height="74" fill={WALL_LIT} />
      <rect x="390" y="126" width="30" height="74" fill={WALL_SHADE} />
      <path d="M268 200V150a30 30 0 0 1 60 0V200Z" fill="#2b2622" />
      <path d="M278 200V156a20 20 0 0 1 40 0V200Z" fill={GLOW} opacity="0.5" />
      <Window x={352} y={146} w={10} h={16} />
      <Window x={270} y={94} w={9} h={14} />
      <Window x={320} y={94} w={9} h={14} />
      {/* the palm beside the villa */}
      <g stroke={TREE} strokeLinecap="round" fill="none">
        <path d="M196 214C198 184 194 158 200 132" strokeWidth="5" />
        <path d="M200 132C186 118 170 116 156 124M200 132C190 112 176 102 162 102M200 132C200 112 208 98 222 92M200 132C214 120 230 118 244 126M200 132C212 130 226 136 234 148M200 132C186 132 174 140 168 152" strokeWidth="3.4" />
      </g>
      <path d="M214 214h246v8H214z" fill={WALL_SHADE} />
      <path d="M460 330V236C380 226 300 236 230 268C170 294 100 314 0 330Z" fill="#1f2226" />
    </svg>
  );
}

/** Front layer, left: the ground rising to the corner, an olive tree, an agave where the ground meets the panel. */
export function FrontLeftArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 520 300" focusable="false">
      {/* the olive tree */}
      <path d="M96 190C100 160 90 138 106 116C114 104 112 90 116 74l11 3c-2 16 2 26-6 40c-10 20-4 42-6 73Z" fill={NEAR} />
      <path d="M112 120C128 108 140 106 156 96l4 7c-16 8-26 12-40 26Z" fill={NEAR} />
      <g fill="#0e100f">
        <ellipse cx="92" cy="62" rx="50" ry="27" />
        <ellipse cx="146" cy="50" rx="42" ry="24" />
        <ellipse cx="128" cy="82" rx="52" ry="22" />
        <ellipse cx="58" cy="86" rx="36" ry="18" />
        <ellipse cx="178" cy="80" rx="32" ry="16" />
        <ellipse cx="112" cy="36" rx="34" ry="17" />
      </g>
      {/* single leaves at the canopy's edge, so the outline is a tree and not a cloud */}
      <g fill="#0e100f">
        {[[30, 70, -30], [42, 104, 20], [86, 18, -40], [140, 20, 30], [186, 44, 20], [212, 78, -10], [198, 100, 30], [150, 108, 10], [24, 92, 10], [60, 40, -50], [168, 28, 50]].map(([x, y, r]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="9" ry="3" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
      {/* the ground */}
      <path d="M0 300V168C70 158 150 176 230 206C310 236 400 262 520 280V300Z" fill={NEAR} />
      <path d="M0 168C70 158 150 176 230 206C310 236 400 262 520 280" fill="none" stroke="#e0c893" strokeOpacity="0.14" strokeWidth="1.2" />
      {/* the agave */}
      <g fill="#0d0f0e">
        <path d="M388 262Q372 222 352 204Q380 222 398 258Z" />
        <path d="M394 260Q392 214 380 186Q402 216 406 258Z" />
        <path d="M402 258Q412 212 418 184Q424 220 414 260Z" />
        <path d="M408 262Q432 224 452 208Q436 236 420 266Z" />
        <path d="M412 266Q446 246 468 240Q444 258 420 272Z" />
        <path d="M384 266Q356 244 334 236Q360 254 380 272Z" />
      </g>
    </svg>
  );
}

/** Front layer, right: a stepped terrace wall, a pot with a yucca, and the foot of an arch at the edge. */
export function FrontRightArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 520 300" focusable="false">
      {/* the arch at the edge, with a lamp */}
      <path d="M452 176V70C452 26 486 4 520 0V176Z" fill={NEAR} />
      {/* the yucca in its pot */}
      <g fill="#0d0f0e">
        <path d="M372 150Q352 110 328 96Q360 116 378 148Z" />
        <path d="M376 148Q372 98 358 74Q384 104 386 146Z" />
        <path d="M382 146Q392 96 400 70Q404 110 392 148Z" />
        <path d="M388 150Q414 114 436 102Q416 126 398 154Z" />
        <path d="M368 154Q340 138 320 134Q346 146 366 160Z" />
      </g>
      <path d="M358 150h48l-6 28h-36z" fill="#2c1e18" />
      <path d="M354 146h56v7h-56z" fill="#3b2920" />
      {/* the wall, stepping down towards the panel */}
      <path d="M320 176H520V300H0V282L80 270V246H160V214H240V190H320Z" fill={NEAR} />
      <g fill="#1b1a17">
        <path d="M314 170H520v8H314zM234 184h90v8h-90zM154 208h90v8h-90zM74 240h90v8H74z" />
      </g>
      <path d="M314 170H520M234 184h80M154 208h80M74 240h80" fill="none" stroke="#e0c893" strokeOpacity="0.16" strokeWidth="1" />
    </svg>
  );
}

/** A few stars, high in the sky only. */
export function Stars({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMin slice" focusable="false">
      <g fill="#f8f6f1">
        {[[84, 60, 1.1, 0.5], [210, 132, 0.9, 0.35], [330, 44, 1.2, 0.55], [468, 96, 0.8, 0.3], [612, 30, 1, 0.45], [742, 118, 0.8, 0.3], [868, 52, 1.2, 0.5], [1010, 26, 0.9, 0.4], [1124, 108, 1, 0.35], [1236, 58, 1.2, 0.55], [1352, 138, 0.8, 0.3], [1404, 38, 1, 0.45], [150, 210, 0.8, 0.25], [1300, 220, 0.8, 0.25]].map(([x, y, r, o]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={o} />
        ))}
      </g>
    </svg>
  );
}
