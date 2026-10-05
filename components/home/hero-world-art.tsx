/**
 * The Mediterranean world of the hero (owner direction 2026-10-05), drawn for this site: no photograph
 * and no foreign asset. Four depths, each its own layer so they can move apart on scroll:
 *
 *   far    the sky's last light, two mountain ridges, the coast lights and the sea
 *   mid    two hillsides with a white village, a bell tower, an arcade, cypresses and a palm
 *   (the product panel stands here)
 *   front  an olive tree and an agave on the left, a stepped terrace wall with a pot and an arch on the right
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
          <stop offset="0" stopColor="#2b2f37" />
          <stop offset="1" stopColor="#1c1e22" />
        </linearGradient>
        <radialGradient id="hw-shine" cx="0.5" cy="0" r="0.5" gradientTransform="matrix(1 0 0 2 0 0)">
          <stop offset="0" stopColor="#dfa068" stopOpacity="0.5" />
          <stop offset="1" stopColor="#dfa068" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* the hazy back ridge, then the nearer one */}
      <path d="M0 180V118C70 104 120 96 190 112C250 126 300 80 380 70C450 62 500 100 560 108C640 118 690 60 780 44C860 30 910 84 980 92C1060 102 1110 66 1180 74C1260 84 1320 120 1380 112C1410 108 1430 112 1440 116V180Z" fill="#464a57" />
      <path d="M0 180V150C90 138 150 150 230 140C330 128 380 150 470 156C560 162 620 132 720 128C820 124 880 150 960 152C1060 154 1120 136 1200 140C1290 144 1350 160 1440 150V180Z" fill="#31343d" />
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

/** Mid layer, left hillside: the village steps down towards the centre. */
export function MidLeftArt({ className }: { className?: string }) {
  const hill = "M0 330V120C60 104 120 112 170 140C230 172 290 196 350 236C400 268 440 300 460 330Z";
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 460 330" focusable="false">
      <path d={hill} fill="#222428" />
      {/* cypresses behind the houses */}
      <ellipse cx="98" cy="86" rx="7" ry="31" fill={TREE} />
      <ellipse cx="212" cy="146" rx="6" ry="26" fill={TREE} />
      <ellipse cx="318" cy="204" rx="6" ry="24" fill={TREE} />
      {/* the bell tower */}
      <rect x="116" y="60" width="22" height="78" fill={WALL_LIT} />
      <path d="M113 60h28l-14-20z" fill={ROOF} />
      <Window x={123} y={68} w={8} h={13} />
      {/* houses, lit faces and shaded faces */}
      <rect x="22" y="94" width="60" height="52" fill={WALL_LIT} />
      <rect x="82" y="112" width="34" height="40" fill={WALL_SHADE} />
      <path d="M18 94h68v-5H18z" fill={ROOF} />
      <Window x={34} y={108} />
      <Window x={58} y={108} />
      <rect x="138" y="130" width="62" height="44" fill={WALL_DIM} />
      <rect x="200" y="150" width="30" height="36" fill={WALL_SHADE} />
      <Window x={150} y={142} />
      <Window x={176} y={142} />
      <rect x="226" y="184" width="58" height="40" fill={WALL_LIT} />
      <path d="M222 184h66v-5h-66z" fill={ROOF} />
      <Window x={240} y={196} />
      <rect x="284" y="216" width="50" height="36" fill={WALL_SHADE} />
      <Window x={300} y={226} w={6} h={10} />
      <rect x="338" y="246" width="44" height="30" fill={WALL_DIM} />
      {/* the slope in front of the house feet */}
      <path d="M0 330V160C60 150 120 158 170 182C230 212 290 232 350 268C400 296 440 318 460 330Z" fill="#1a1c1f" />
    </svg>
  );
}

/** Mid layer, right hillside: a house with an arcade, smaller houses below it, a palm. */
export function MidRightArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 460 330" focusable="false">
      <path d="M460 330V104C400 92 340 110 290 140C230 176 170 204 110 244C60 278 20 306 0 330Z" fill="#222428" />
      <ellipse cx="424" cy="66" rx="7" ry="33" fill={TREE} />
      <ellipse cx="284" cy="118" rx="6" ry="27" fill={TREE} />
      {/* the palm */}
      <g stroke={TREE} strokeLinecap="round" fill="none">
        <path d="M232 168C234 144 230 122 236 100" strokeWidth="4" />
        <path d="M236 100C222 86 206 84 192 92M236 100C226 80 212 70 198 70M236 100C236 80 244 66 258 60M236 100C250 88 266 86 280 94M236 100C248 98 262 104 270 116M236 100C222 100 210 108 204 120" strokeWidth="3" />
      </g>
      {/* the house with the arcade */}
      <rect x="330" y="52" width="72" height="36" fill={WALL_LIT} />
      <path d="M326 52h80v-5h-80z" fill={ROOF} />
      <Window x={344} y={62} />
      <Window x={376} y={62} />
      <rect x="300" y="86" width="124" height="62" fill={WALL_DIM} />
      {[312, 350, 388].map((x) => (
        <path key={x} d={`M${x} 148V112a12 12 0 0 1 24 0V148Z`} fill="#2b2622" />
      ))}
      <path d="M350 148V118a12 12 0 0 1 24 0V148Z" fill={GLOW} opacity="0.55" />
      {/* smaller houses down the slope */}
      <rect x="236" y="140" width="56" height="40" fill={WALL_SHADE} />
      <Window x={250} y={152} />
      <rect x="178" y="176" width="52" height="36" fill={WALL_LIT} />
      <path d="M174 176h60v-5h-60z" fill={ROOF} />
      <Window x={196} y={187} />
      <rect x="124" y="208" width="48" height="34" fill={WALL_DIM} />
      <rect x="76" y="238" width="44" height="30" fill={WALL_SHADE} />
      <Window x={90} y={247} w={6} h={10} />
      <path d="M460 330V150C400 140 340 156 290 184C230 216 170 240 110 276C60 302 20 320 0 330Z" fill="#1a1c1f" />
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
      <circle cx="470" cy="104" r="16" fill={GLOW} opacity="0.12" />
      <circle cx="470" cy="104" r="4" fill={GLOW} />
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
