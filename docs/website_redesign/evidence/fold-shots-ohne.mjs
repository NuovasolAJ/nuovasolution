// First-screen screenshots WITHOUT the preview strips (both removed from the DOM after the choreography): the released page's first screen
import { chromium } from "playwright";
const [base = "http://localhost:3180", out = "."] = process.argv.slice(2);
const browser = await chromium.launch();
for (const [w, h, locale] of [[390, 844, "es"], [390, 844, "en"], [1366, 768, "es"], [1366, 768, "en"], [375, 667, "en"], [375, 667, "es"]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  await page.evaluate(() => { document.querySelectorAll("[data-env], [data-preview-switches]").forEach((e) => e.remove()); window.scrollTo(0, 0); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/ohne-streifen-${w}x${h}-${locale}.png` });
  await ctx.close();
}
await browser.close();
