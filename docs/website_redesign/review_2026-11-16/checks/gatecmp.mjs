// Register (what API says is in production) vs publicGate (what the public view shows as live).
// Every key where the gate says "live" while the register does NOT say "included" is a place where
// the public view presents as working something that is not recorded as in production.
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync("C:/Users/Usuario/Desktop/Nuovasolution/lib/claims.ts", "utf8");

// the register ends with "} as const satisfies ...", the gate with "};" - so end at the first line
// that starts with "}" either way, or the two blocks run into one another (that bit me once)
const block = (startRe) => {
  const i = src.search(startRe);
  if (i < 0) throw new Error("block not found: " + startRe);
  const m = /^\}/m.exec(src.slice(i));
  if (!m) throw new Error("block end not found: " + startRe);
  return src.slice(i, i + m.index);
};
const parse = (text) => {
  const out = {};
  // key: "value"  — ignore comments after the comma
  for (const m of text.matchAll(/^\s{2}([A-Za-z0-9_]+)\s*:\s*"([a-z]+)"/gm)) out[m[1]] = m[2];
  return out;
};
const claims = parse(block(/export const claims\s*=/));
const gate = parse(block(/export const publicGate\s*:/));

const keys = Object.keys(gate);
const rows = keys.map((k) => ({ key: k, register: claims[k] ?? "(not in register)", gate: gate[k] }));
const gateSoon = rows.filter((r) => r.gate === "soon");
const liveButNotProduction = rows.filter((r) => r.gate === "live" && r.register !== "included");
const soonButProduction = rows.filter((r) => r.gate === "soon" && r.register === "included");

const result = {
  measuredAt: new Date().toISOString().slice(0, 16),
  file: "lib/claims.ts (working tree)",
  counts: { keys: keys.length, gateSoon: gateSoon.length, gateLive: keys.length - gateSoon.length },
  gateSoonKeys: gateSoon.map((r) => `${r.key} (register: ${r.register})`),
  liveButNotProduction: liveButNotProduction.map((r) => `${r.key} (register: ${r.register})`),
  soonButProduction: soonButProduction.map((r) => r.key),
  registerStates: Object.fromEntries(rows.map((r) => [r.key, [r.register, r.gate]])),
};
writeFileSync("gatecmp.json", JSON.stringify(result, null, 1));
console.log("keys:", result.counts.keys, "| gate soon:", result.counts.gateSoon, "| gate live:", result.counts.gateLive);
console.log("\ngate SOON:");
for (const s of result.gateSoonKeys) console.log("  " + s);
console.log("\ngate LIVE but register NOT 'included'  <-- public shows as working, not recorded as in production:");
for (const s of result.liveButNotProduction) console.log("  " + s);
console.log("\ngate SOON but register 'included' (marked though it works):");
for (const s of result.soonButProduction) console.log("  " + (s || "none"));
