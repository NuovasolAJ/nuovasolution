import { createHash, createHmac, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
const INTAKE = "https://167-235-150-163.sslip.io/webhook/website-qa", T = "stg_pm_avail_probe";
const S = readFileSync(`C:/Users/Usuario/.nuova-secrets/stg_webqa_hmac_${T}.txt`, "utf8").trim();
const sign = (b) => { const ts = Math.floor(Date.now()/1000).toString(), n = randomUUID(), sha = createHash("sha256").update(b).digest("hex");
  return { "X-Nuova-Tenant": T, "X-Nuova-Timestamp": ts, "X-Nuova-Nonce": n, "X-Nuova-Signature": createHmac("sha256", S).update(`${ts}|${n}|${sha}`).digest("hex") }; };
const sid = randomUUID().replace(/-/g,"").slice(0,24), mid = randomUUID();
const body = Buffer.from(JSON.stringify({ question: "Which languages can you answer enquiries in?", session_id: sid, message_id: mid, locale: "en" }));
const post = await fetch(INTAKE, { method: "POST", headers: { "Content-Type": "application/json", ...sign(body) }, body });
const canonical = `conversation_id=${encodeURIComponent(`web::${sid}`)}&message_id=${encodeURIComponent(mid)}`;
const out = { accepted: post.status, polls: [] };
for (let i = 0; i < 80; i++) {
  const r = await fetch(`${INTAKE}/result?${canonical}`, { headers: sign(Buffer.from(canonical)) });
  const t = await r.text(); let j = null; try { j = JSON.parse(t); } catch {}
  const state = j?.state ?? j?.status ?? null;
  out.polls.push({ s: i * 3, status: r.status, state });
  if (r.status !== 200 || (state && state !== "pending")) { out.final = { status: r.status, state, body: typeof j === "object" ? j : t.slice(0,300) }; break; }
  await new Promise((z) => setTimeout(z, 3000));
}
out.waited_seconds = out.polls.length * 3;
writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.log(JSON.stringify({ accepted: out.accepted, waited: out.waited_seconds, final: out.final?.state ?? "pending" }));
