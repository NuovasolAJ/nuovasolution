// Picture evidence as an archive with hashes (audit order 2026-09-30, implementer, PARALLEL). The large picture
// sets stay out of Git; this script packs them into one tar.gz, writes the SHA-256 of every picture and of the
// archive into a manifest that IS committed, so anyone holding the archive can prove it is the one reported.
// Usage: node scripts/design/evidence-archive.mjs <dir> [<dir> …]   (env ARCHIVE = output path, MANIFEST = manifest path)
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const dirs = process.argv.slice(2);
if (!dirs.length) { console.log("usage: node scripts/design/evidence-archive.mjs <dir> [<dir> …]"); process.exit(1); }
const ARCHIVE = process.env.ARCHIVE ?? join(ROOT, "evidence-pictures.tar.gz");
const MANIFEST = process.env.MANIFEST ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-30", "PICTURE_ARCHIVE.sha256.txt");
const sha = (buf) => createHash("sha256").update(buf).digest("hex");

const files = [];
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(png|jpe?g|gif|webp)$/i.test(n)) files.push(p);
  }
};
for (const d of dirs) walk(join(ROOT, d));
files.sort();

const lines = files.map((f) => `${sha(readFileSync(f))}  ${relative(ROOT, f).replace(/\\/g, "/")}`);
const rel = files.map((f) => relative(ROOT, f).replace(/\\/g, "/"));
const listFile = join(ROOT, ".archive-list.txt");
writeFileSync(listFile, rel.join("\n") + "\n");
const t = spawnSync("tar", ["--force-local", "-czf", ARCHIVE.replace(/\\/g, "/"), "-C", ROOT.replace(/\\/g, "/"), "-T", ".archive-list.txt"], { cwd: ROOT, stdio: "inherit" });
spawnSync(process.execPath, ["-e", `require("fs").unlinkSync(${JSON.stringify(listFile)})`]);
if (t.status !== 0) { console.log("tar failed"); process.exit(1); }
const archiveHash = sha(readFileSync(ARCHIVE));
const size = statSync(ARCHIVE).size;
const header = [
  `# Picture evidence, ${new Date().toISOString()}`,
  `# archive ${relative(ROOT, ARCHIVE).replace(/\\/g, "/")}  ${size} bytes  sha256 ${archiveHash}`,
  `# ${files.length} pictures from: ${dirs.join(", ")}`,
  `# check a picture on disk: sha256sum -c ${relative(ROOT, MANIFEST).replace(/\\/g, "/")} (lines below)`,
  "",
];
writeFileSync(MANIFEST, header.join("\n") + lines.join("\n") + "\n");
console.log(`${files.length} pictures · archive ${size} bytes · sha256 ${archiveHash} -> ${MANIFEST}`);
