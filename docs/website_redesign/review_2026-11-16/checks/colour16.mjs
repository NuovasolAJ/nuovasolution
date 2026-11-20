// Palette B on the new section: no blue, no brown, no gold. Measured on painted elements'
// computed colours (text, background, border), preview furniture excluded.
const BASE = process.argv[2];
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");

const PROBE = `(()=>{
  const toHsl = (r,g,b) => { r/=255;g/=255;b/=255;
    const mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2; let h=0,s=0;
    if(mx!==mn){const d=mx-mn; s=l>0.5?d/(2-mx-mn):d/(mx+mn);
      h = mx===r ? ((g-b)/d+(g<b?6:0)) : mx===g ? ((b-r)/d+2) : ((r-g)/d+4); h*=60;}
    return [h, s*100, l*100]; };
  const parse = c => { const m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([0-9.]+))?\\)/.exec(c||"");
    if(!m) return null; const a=m[4]===undefined?1:parseFloat(m[4]); if(a<0.06) return null;
    return [+m[1],+m[2],+m[3]]; };
  const sec = document.querySelector("[data-strengths]");
  if(!sec) return {noSection:true};
  const hits={blue:[],brown:[],gold:[]};
  let checked=0;
  for (const e of sec.querySelectorAll("*")) {
    const r=e.getBoundingClientRect(); if(r.width<1||r.height<1) continue;
    const cs=getComputedStyle(e);
    for (const prop of ["color","backgroundColor","borderTopColor","borderBottomColor"]) {
      const rgb=parse(cs[prop]); if(!rgb) continue; checked++;
      const [h,s,l]=toHsl(rgb[0],rgb[1],rgb[2]);
      if (l>85 || s<15) continue;              // paper/ivory and near-greys are allowed
      const tag=e.tagName+"."+(e.className||"").toString().split(" ")[0];
      if (h>=190&&h<=260) hits.blue.push({tag,prop,css:cs[prop],h:Math.round(h),s:Math.round(s),l:Math.round(l)});
      else if (h>=15&&h<=45&&l>=15&&l<=55) hits.brown.push({tag,prop,css:cs[prop],h:Math.round(h),s:Math.round(s),l:Math.round(l)});
      else if (h>=35&&h<=55&&s>=25) hits.gold.push({tag,prop,css:cs[prop],h:Math.round(h),s:Math.round(s),l:Math.round(l)});
    }
  }
  const brandVar = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
  return { checked, blue:hits.blue.length, brown:hits.brown.length, gold:hits.gold.length,
    samples:{blue:hits.blue.slice(0,3),brown:hits.brown.slice(0,3),gold:hits.gold.slice(0,3)}, brandVar };})()`;

for (const [w, h] of [[390, 844], [1440, 900]]) {
  for (const view of ["target", "public"]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
    await send("Page.navigate", { url: `${BASE}/es?view=${view}` }); await sleep(5200);
    await ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;s++;if(s>300)break;}return 1})()`);
    const o = await ev(PROBE);
    console.log(`${view}-${w}: checked ${o.checked} colours | blue ${o.blue} | brown ${o.brown} | gold ${o.gold} | --brand ${o.brandVar}`);
    for (const k of ["blue", "brown", "gold"]) if (o.samples[k].length) console.log(`   ${k}:`, JSON.stringify(o.samples[k]));
  }
}
process.exit(0);
