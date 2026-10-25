/**
 * Small drawings inside the demonstrations, so no photograph has to be shown: an illustrative "photo" of a
 * terrace flat (sky, sea, railing) for property cards and posts, a dimensioned floor plan, and the same flat
 * as a simple isometric model with and without furniture. All decorative (aria-hidden); the words beside
 * them say what they stand for, and every stage is labelled "Ejemplo ilustrativo".
 */
export function TerracePhoto({ variant = 0, className }: { variant?: 0 | 1; className?: string }) {
  const sky = variant === 0 ? ["#dfe9ef", "#f3eee2"] : ["#e8e3d6", "#f6efe2"];
  return (
    <svg aria-hidden="true" viewBox="0 0 320 200" className={className} focusable="false">
      <defs>
        <linearGradient id={`tp-sky-${variant}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sky[0]} /><stop offset="1" stopColor={sky[1]} /></linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#tp-sky-${variant})`} />
      <rect x="0" y="112" width="320" height="30" fill="#bfd0d8" />
      <rect x="0" y="142" width="320" height="58" fill="#e9e3d6" />
      {variant === 1 && <path d="M0 118C60 104 120 108 180 100C240 92 280 98 320 104V142H0Z" fill="#d6cdb9" />}
      <g stroke="#8f887b" strokeWidth="2">
        <path d="M0 150H320" />
        {[20, 60, 100, 140, 180, 220, 260, 300].map((x) => <path key={x} d={`M${x} 150V200`} />)}
      </g>
      <rect x="226" y="120" width="64" height="30" rx="4" fill="#cfc5b1" />
      <rect x="236" y="104" width="44" height="16" rx="3" fill="#b9ae98" />
      <ellipse cx="54" cy="128" rx="22" ry="12" fill="#5f6b4e" />
      <rect x="50" y="128" width="8" height="22" fill="#4a4237" />
    </svg>
  );
}

/**
 * The ground floor of the 3D lane's demonstration house, drawn to scale from its own specification
 * (nuova-3d deliverables/demo-two-storey/build/demo_spec.json, 2026-10-24: walls, openings, door swings, zones and the stair
 * in millimetres). It is the plan the model of step 02 and the turn of step 04 are built from, so plan and model show the
 * same house (R24, audit picture 05 (3), (4)). Room names in the page's language; no label stands on a door swing.
 * Decorative (aria-hidden); the words beside it say what it is.
 */
const PLAN_WALLS: [number, number, number, number][] = [
  [0, 0, 1500, 200], [3500, 0, 6800, 200], [7800, 0, 10000, 200], [0, 7800, 1500, 8000], [4000, 7800, 10000, 8000], [0, 200, 200, 1200], [0, 3400, 200, 7800],
  [9800, 200, 10000, 6200], [9800, 7200, 10000, 7800], [5900, 200, 6000, 800], [5900, 1700, 6000, 5300], [5900, 6300, 6000, 7800], [8700, 200, 8800, 4950],
  [6000, 2900, 8700, 3000], [6000, 4850, 7000, 4950], [7800, 4850, 8700, 4950], [200, 4400, 1000, 4500], [4500, 4400, 5900, 4500], [8800, 1100, 9800, 1200],
];
/** windows and the glazed terrace door: [x0, y0, x1, y1] */
const PLAN_GLAZING: [number, number, number, number][] = [[0, 1200, 200, 3400], [1500, 0, 3500, 200], [1500, 7800, 4000, 8000], [6800, 0, 7800, 200]];
/** door swings: hinge, direction along the wall, direction into the room, leaf width */
const PLAN_DOORS: { h: [number, number]; a: [number, number]; i: [number, number]; w: number }[] = [
  { h: [9800, 6200], a: [0, 1], i: [-1, 0], w: 1000 },
  { h: [6000, 800], a: [0, 1], i: [1, 0], w: 900 },
  { h: [7800, 4850], a: [-1, 0], i: [0, -1], w: 800 },
];
const PLAN_ROOMS: { key: string; x: number; y: number; dims?: string; es: string; en: string }[] = [
  { key: "living", x: 3050, y: 2200, dims: "5,70 × 4,20 m", es: "Salón", en: "Living room" },
  { key: "kitchen", x: 3050, y: 6200, es: "Cocina / Comedor", en: "Kitchen / Dining" },
  { key: "utility", x: 7350, y: 2350, es: "Lavadero", en: "Utility room" },
  { key: "wc", x: 7350, y: 3700, es: "Aseo", en: "WC" },
  { key: "hall", x: 7300, y: 6450, es: "Recibidor", en: "Hall" },
  { key: "terrace", x: -1900, y: 2450, dims: "3,80 × 3,60 m", es: "Terraza", en: "Terrace" },
];
export function DemoPlan({ locale, className }: { locale: "es" | "en"; className?: string }) {
  const font = "ui-sans-serif, system-ui, sans-serif";
  const doorPath = ({ h, a, i, w }: (typeof PLAN_DOORS)[number]) => {
    const p1 = [h[0] + a[0] * w, h[1] + a[1] * w];
    const p2 = [h[0] + i[0] * w, h[1] + i[1] * w];
    const sweep = a[0] * i[1] - a[1] * i[0] > 0 ? 1 : 0;
    return `M${p1[0]} ${p1[1]}A${w} ${w} 0 0 ${sweep} ${p2[0]} ${p2[1]}L${h[0]} ${h[1]}`;
  };
  return (
    <svg aria-hidden="true" viewBox="-4300 -1000 14900 9500" className={className} focusable="false" data-demo-plan>
      <rect x="-4300" y="-1000" width="14900" height="9500" fill="#f7f5ef" />
      {/* the floor slab and the terrace deck */}
      <rect x="0" y="0" width="10000" height="8000" fill="#fff" />
      <rect x="-3800" y="700" width="3800" height="3600" fill="#efe9db" stroke="#8f887b" strokeWidth="30" strokeDasharray="160 120" />
      {/* the stair: treads from the hall up to the landing */}
      <g stroke="#8f887b" strokeWidth="30">
        {Array.from({ length: 15 }, (_, k) => 4950 - 250 * (k + 1)).map((y) => <path key={y} d={`M8800 ${y}H9800`} />)}
      </g>
      <path d="M9300 4700V1500M9140 1700L9300 1500L9460 1700" fill="none" stroke="#5d5952" strokeWidth="40" />
      {/* the walls */}
      <g fill="#1a1917">
        {PLAN_WALLS.map(([x0, y0, x1, y1]) => <rect key={`${x0}-${y0}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} />)}
      </g>
      {/* windows and the glazed door to the terrace */}
      <g fill="#dfe9ef" stroke="#1a1917" strokeWidth="40">
        {PLAN_GLAZING.map(([x0, y0, x1, y1]) => <rect key={`${x0}-${y0}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} />)}
      </g>
      <g stroke="#1a1917" strokeWidth="30">
        {PLAN_GLAZING.map(([x0, y0, x1, y1]) => (x1 - x0 > y1 - y0 ? <path key={`${x0}-${y0}`} d={`M${x0} ${(y0 + y1) / 2}H${x1}`} /> : <path key={`${x0}-${y0}`} d={`M${(x0 + x1) / 2} ${y0}V${y1}`} />))}
      </g>
      {/* door swings */}
      <g fill="none" stroke="#1a1917" strokeWidth="40">
        {PLAN_DOORS.map((d, k) => <path key={k} d={doorPath(d)} />)}
      </g>
      {/* room names and two inner measurements */}
      <g fontFamily={font} fontSize="430" fontWeight="600" fill="#1a1917" textAnchor="middle">
        {PLAN_ROOMS.map((r) => <text key={r.key} x={r.x} y={r.y}>{r[locale]}</text>)}
      </g>
      <g fontFamily={font} fontSize="340" fill="#5d5952" textAnchor="middle">
        {PLAN_ROOMS.filter((r) => r.dims).map((r) => <text key={r.key} x={r.x} y={r.y + 480}>{r.dims}</text>)}
        <text x="9300" y="3300" transform="rotate(-90 9300 3300)">{locale === "es" ? "Escalera" : "Stair"}</text>
      </g>
      {/* the outer dimensions */}
      <g stroke="#5d5952" strokeWidth="30">
        <path d="M0 -500H10000M0 -620V-380M10000 -620V-380" />
        <path d="M10450 0V8000M10330 0H10570M10330 8000H10570" />
      </g>
      <g fontFamily={font} fontSize="360" fill="#5d5952" textAnchor="middle">
        <text x="5000" y="-640">10,00 m</text>
        <text x="10600" y="4000" transform="rotate(-90 10600 4000)" dy="-120">8,00 m</text>
      </g>
    </svg>
  );
}

/** The same flat as a simple isometric model: walls without a roof, the terrace in front, furniture optional. */
export function IsoModel({ floor = 0, furniture = true, className }: { floor?: 0 | 1; furniture?: boolean; className?: string }) {
  const wall = "#f1ede3", wallShade = "#d9d2c3", floorC = "#efe6d3", edge = "#8f887b";
  // isometric helpers: x axis to the right-down, y axis to the left-down
  const px = (x: number, y: number, z = 0) => [160 + (x - y) * 0.866 * 11, 120 + (x + y) * 0.5 * 11 - z * 11];
  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  const box = (x0: number, y0: number, w: number, d: number, h: number, top: string, left: string, right: string, key: string) => (
    <g key={key}>
      <polygon points={poly([px(x0, y0, h), px(x0 + w, y0, h), px(x0 + w, y0 + d, h), px(x0, y0 + d, h)])} fill={top} stroke={edge} strokeWidth="0.6" />
      <polygon points={poly([px(x0, y0 + d, h), px(x0 + w, y0 + d, h), px(x0 + w, y0 + d, 0), px(x0, y0 + d, 0)])} fill={left} stroke={edge} strokeWidth="0.6" />
      <polygon points={poly([px(x0 + w, y0, h), px(x0 + w, y0 + d, h), px(x0 + w, y0 + d, 0), px(x0 + w, y0, 0)])} fill={right} stroke={edge} strokeWidth="0.6" />
    </g>
  );
  const upper = floor === 1;
  return (
    <svg aria-hidden="true" viewBox="0 0 320 240" className={className} focusable="false">
      <rect width="320" height="240" fill="#f7f5ef" />
      {/* floor slab */}
      <polygon points={poly([px(0, 0), px(14, 0), px(14, 12), px(0, 12)])} fill={floorC} stroke={edge} strokeWidth="0.8" />
      {/* terrace in front */}
      <polygon points={poly([px(0, 12), px(14, 12), px(14, 14), px(0, 14)])} fill="#e4dcc8" stroke={edge} strokeWidth="0.8" />
      {/* walls: outer, 3 units high, as thin boxes */}
      {box(0, 0, 14, 0.3, 3, wall, wallShade, wallShade, "back")}
      {box(0, 0, 0.3, 12, 3, wall, wallShade, wall, "left")}
      {box(13.7, 0, 0.3, 12, 3, wall, wallShade, wallShade, "right")}
      {/* inner walls (lower, so one sees in) */}
      {box(8, 0, 0.25, 7, 2.2, wall, wallShade, wall, "inner1")}
      {box(0, 7, 8.2, 0.25, 2.2, wall, wallShade, wallShade, "inner2")}
      {box(8, 4, 6, 0.25, 2.2, wall, wallShade, wallShade, "inner3")}
      {upper && box(8, 7, 0.25, 5, 2.2, wall, wallShade, wall, "inner4")}
      {/* furniture */}
      {furniture && (
        <g>
          {box(1, 1.5, 3.2, 1.4, 0.8, "#c9b89a", "#a99b81", "#b8a98c", "sofa")}
          {box(1.6, 4, 1.6, 1, 0.5, "#8a6d4e", "#6f573e", "#7c6245", "table")}
          {box(9, 1, 4, 0.8, 0.9, "#d9d2c3", "#bfb6a6", "#cdc4b3", "kitchen")}
          {box(1.5, 8.2, 2.2, 3, 0.6, "#cfc5b1", "#b3a994", "#c2b8a4", "bed")}
          {box(9.2, 8.4, 2, 2.6, 0.6, "#cfc5b1", "#b3a994", "#c2b8a4", "bed2")}
          {box(2, 12.3, 2.4, 1.2, 0.5, "#9fa98d", "#7f8870", "#8f9980", "lounger")}
          {!upper && <ellipse cx={px(12, 13)[0]} cy={px(12, 13)[1] - 6} rx="7" ry="4.5" fill="#5f6b4e" />}
        </g>
      )}
      {/* stair for the upper floor */}
      {upper && box(12, 8, 1.6, 3, 1.4, "#d6cdb9", "#b8ae98", "#c7bda8", "stair")}
    </svg>
  );
}
