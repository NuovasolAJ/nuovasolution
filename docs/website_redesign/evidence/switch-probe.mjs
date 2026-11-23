// R-7/R-9 probe: fill the request form by real key input, switch the language with the visible switcher, and read what survives:
// URL (interes, plan), live form (interest select, submit label, subject) and the typed fields. Both directions. Usage: node switch-probe.mjs <base>
import { chromium } from "playwright";
const base = process.argv[2];
const browser = await chromium.launch();
const typed = { agency: "Agencia Prueba R9", name: "Prueba Nombre", email: "r9@example.invalid", phone: "600000000" };
const ways = [["trial", "essential"], ["demo", "growth"], ["talk", "enterprise"]];
const out = [];
for (const [from, to] of [["es", "en"], ["en", "es"]]) {
  for (const [way, plan] of ways) {
    // a fresh tab per run: sessionStorage is per tab, so nothing of the previous run leaks in
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(`${base}/${from}/contact?interes=${way}&plan=${plan}`, { waitUntil: "networkidle" });
    for (const [k, v] of Object.entries(typed)) { const el = page.locator(`[data-prq='${k}']`); await el.tap(); await page.keyboard.type(v); }
    await page.locator("[data-prq='message']").tap(); await page.keyboard.press("End"); await page.keyboard.type(" · nota R9");
    const before = await page.evaluate(() => ({ interest: document.querySelector("[data-prq='interest']").value, message: document.querySelector("[data-prq='message']").value }));
    // at 390 the switcher sits in the menu sheet: open the menu first (the burger), then tap the visible language link
    await page.locator("header button[aria-label][aria-expanded]").first().tap(); // the burger (the desktop menu button has no aria-label)
    await page.waitForTimeout(400);
    const link = page.locator(`[data-mobile-sheet] [data-language-switcher] a[hreflang='${to}']`).first();
    const href = await link.getAttribute("href");
    await link.tap();
    await page.waitForURL((u) => u.pathname.startsWith(`/${to}/`), { timeout: 15000 });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => {
      const g = (k) => document.querySelector(`[data-prq='${k}']`)?.value ?? null;
      return { url: location.pathname + location.search, interest: g("interest"), agency: g("agency"), name: g("name"), email: g("email"), phone: g("phone"), message: g("message"), submit: document.querySelector("[data-request-submit]")?.textContent?.trim(), card: document.querySelector("[data-request-card]")?.getAttribute("data-request-card") };
    });
    const u = new URL(after.url, base);
    out.push({ dir: `${from}→${to}`, way, plan, href, urlWay: u.searchParams.get("interes"), urlPlan: u.searchParams.get("plan"), before, after,
      pass: u.searchParams.get("interes") === way && u.searchParams.get("plan") === plan && after.interest === way && after.agency === typed.agency && after.name === typed.name && after.email === typed.email && after.phone === typed.phone && (after.message || "").includes("nota R9") && !(after.message || "").includes(before.message.replace(" · nota R9", "")) }); // the note stays, the old language's whole subject must not
    await ctx.close();
  }
}
// RV6's edge case: Essential's form, nothing typed in the message, then the Growth way and the Enterprise way — the message must be THEIR subject
for (const [from] of [["es"], ["en"]]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${base}/${from}/contact?interes=trial&plan=essential`, { waitUntil: "networkidle" });
  for (const [k, v] of Object.entries(typed)) { const el = page.locator(`[data-prq='${k}']`); await el.tap(); await page.keyboard.type(v); }
  const essentialSubject = await page.evaluate(() => document.querySelector("[data-prq='message']").value);
  for (const [way, plan] of [["demo", "growth"], ["talk", "enterprise"]]) {
    await page.goto(`${base}/${from}/contact?interes=${way}&plan=${plan}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const a = await page.evaluate(() => ({ interest: document.querySelector("[data-prq='interest']").value, message: document.querySelector("[data-prq='message']").value, agency: document.querySelector("[data-prq='agency']").value }));
    out.push({ dir: `${from} edge`, way, plan, after: a, pass: a.interest === way && a.agency === typed.agency && !!a.message && a.message !== essentialSubject && !a.message.includes(essentialSubject) });
  }
  await ctx.close();
}
console.log(JSON.stringify({ at: new Date().toISOString(), pass: `${out.filter((x) => x.pass).length}/${out.length}`, runs: out }, null, 1));
await browser.close();
