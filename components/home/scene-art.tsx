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

/** The dimensioned plan: five rooms, the terrace, a few measurements. */
export function FloorPlan({ rooms, className }: { rooms: readonly string[]; className?: string }) {
  const [living, kitchen, bedroom, bath, terrace] = rooms;
  return (
    <svg aria-hidden="true" viewBox="0 0 320 240" className={className} focusable="false">
      <rect width="320" height="240" fill="#f7f5ef" />
      <g fill="#fff" stroke="#1a1917" strokeWidth="2.5">
        <rect x="24" y="24" width="150" height="110" />
        <rect x="174" y="24" width="102" height="60" />
        <rect x="174" y="84" width="102" height="50" />
        <rect x="24" y="134" width="130" height="70" />
        <rect x="154" y="134" width="122" height="70" />
      </g>
      <g stroke="#1a1917" strokeWidth="2.5" strokeDasharray="6 5"><path d="M24 204H276" /></g>
      <rect x="24" y="204" width="252" height="18" fill="#efe9db" stroke="#1a1917" strokeWidth="2.5" />
      {/* doors */}
      <g fill="none" stroke="#1a1917" strokeWidth="1.6"><path d="M174 60a20 20 0 0 1 -20 -20" /><path d="M120 134a20 20 0 0 0 20 20" /><path d="M200 134a20 20 0 0 1 20 20" /></g>
      <g fontFamily="ui-sans-serif, system-ui" fontSize="11" fill="#1a1917" fontWeight="600">
        <text x="32" y="44">{living}</text><text x="182" y="44">{kitchen}</text><text x="182" y="104">{bath}</text><text x="32" y="154">{bedroom}</text><text x="162" y="154">{bedroom} 2</text><text x="32" y="217">{terrace}</text>
      </g>
      <g fontFamily="ui-sans-serif, system-ui" fontSize="10" fill="#5d5952">
        <text x="78" y="126">5,20 m</text><text x="200" y="126">3,40 m</text><text x="60" y="196">4,30 m</text><text x="190" y="196">4,10 m</text>
      </g>
      <g stroke="#5d5952" strokeWidth="1"><path d="M24 12H174M24 8v8M174 8v8" /></g>
      <text x="80" y="10" fontFamily="ui-sans-serif, system-ui" fontSize="10" fill="#5d5952">5,20 m</text>
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
