// Vercel "Ignored Build Step" (vercel.json): exit 0 skips the build, exit 1 lets it run.
// While .staging-hold exists, the staging preview project (NUOVA_INTEGRATION_MODE=staging) does not build:
// the new home page is decided on the design preview first (audit order R10b, 2026-10-03).
const hold = require("fs").existsSync(".staging-hold");
const e = process.env;
const staging = e.NUOVA_INTEGRATION_MODE === "staging" || /staging-preview/.test((e.VERCEL_URL || "") + (e.VERCEL_BRANCH_URL || ""));
console.log(`staging hold: ${hold}; staging project: ${staging}`);
process.exit(hold && staging ? 0 : 1);
