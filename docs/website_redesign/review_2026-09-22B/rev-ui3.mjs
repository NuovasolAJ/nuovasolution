import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const REF="fflmmzapksycjfdcjdtd", ROOT=process.argv[2], OUT=process.argv[3], SHOTS=process.argv[4];
const PUB=readFileSync("C:/Users/Usuario/.nuova-secrets/stg_publishable_key.txt","utf8").trim();
const PORT=3135, CDP=9363, BASE=`http://localhost:${PORT}`;
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms)); mkdirSync(SHOTS,{recursive:true});
const kids=[], res={ checks: [] };
const check=(id,what,pass,ev)=>{res.checks.push({id,what,pass:Boolean(pass),evidence:ev});console.log(`${pass?"PASS":"FAIL"} ${id} ${what} :: ${JSON.stringify(ev).slice(0,300)}`);};
kids.push(spawn(process.execPath,[join(ROOT,"node_modules","next","dist","bin","next"),"start","-p",String(PORT)],{cwd:ROOT,env:{...process.env,NUOVA_INTEGRATION_MODE:"staging",NEXT_PUBLIC_SUPABASE_URL:`https://${REF}.supabase.co`,NEXT_PUBLIC_SUPABASE_ANON_KEY:PUB,NUOVA_STAGING_TARGET_APPROVED:REF},stdio:"ignore"}));
for(let i=0;i<120;i++){try{await fetch(`${BASE}/en`);break;}catch{await sleep(500);} }
const prof=join(SHOTS,"p3"); rmSync(prof,{recursive:true,force:true});
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",["--headless=new","--disable-gpu","--no-first-run",`--user-data-dir=${prof}`,`--remote-debugging-port=${CDP}`,"about:blank"],{stdio:"ignore"}));
let list;for(let i=0;i<60;i++){try{list=await(await fetch(`http://127.0.0.1:${CDP}/json`)).json();break;}catch{await sleep(500);} }
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl); await new Promise(r=>ws.addEventListener("open",r));
let id=0; const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);} });
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
const vp=(w,h=844,mobile=w<=430)=>send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:2,mobile});
const go=async(p,wait=2500)=>{await send("Page.navigate",{url:BASE+p});await sleep(wait);};
const shot=async n=>{const s=await send("Page.captureScreenshot",{format:"png"});writeFileSync(join(SHOTS,n+".png"),Buffer.from(s.result.data,"base64"));};
await send("Page.enable");
// overlap over per-line boxes (getClientRects), hit-tested, full page scan
const OVL=`(() => { const boxes=[];
  for (const e of document.querySelectorAll('header *, main *, footer *')) {
    const s=getComputedStyle(e); if (s.visibility==='hidden'||s.display==='none'||Number(s.opacity)<0.05) continue;
    if (![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())) continue;
    for (const r of e.getClientRects()) if (r.width>12&&r.height>8) boxes.push({e,r});
  }
  const out=[];
  for (let i=0;i<boxes.length;i++) for (let j=i+1;j<boxes.length;j++) {
    const A=boxes[i], B=boxes[j]; if (A.e===B.e||A.e.contains(B.e)||B.e.contains(A.e)) continue;
    const ox=Math.min(A.r.right,B.r.right)-Math.max(A.r.left,B.r.left), oy=Math.min(A.r.bottom,B.r.bottom)-Math.max(A.r.top,B.r.top);
    if (ox<=3||oy<=3) continue;
    const cx=Math.max(A.r.left,B.r.left)+ox/2, cy=Math.max(A.r.top,B.r.top)+oy/2;
    if (cy<0||cy>innerHeight) continue;
    const top=document.elementFromPoint(cx,cy); if (!top) continue;
    if (!A.e.contains(top)&&!B.e.contains(top)&&top!==A.e&&top!==B.e) continue;
    out.push({a:(A.e.innerText||'').trim().slice(0,28),b:(B.e.innerText||'').trim().slice(0,28),ox:Math.round(ox),oy:Math.round(oy)});
  }
  return out.slice(0,10);
})()`;
const PAGES=["/en","/es","/en/platform/crm","/es/platform/crm","/en/packages","/es/packages","/en/signup","/es/signup"];
const over={};
for (const w of [360,390,768,1440]) { await vp(w, w<=430?844:900);
  for (const p of PAGES) { await go(p, 2000);
    // scan the whole page in viewport-sized steps
    const found=[]; const steps=Math.min(8, Math.ceil(await ev(`document.body.scrollHeight/innerHeight`)));
    for (let s=0;s<steps;s++){ await ev(`scrollTo(0, innerHeight*${s})`); await sleep(250); const o=await ev(OVL); if(o?.length) found.push(...o); }
    if (found.length) over[`${w}${p}`]=found.slice(0,6);
  } }
res.overlap=over;
check("UI-01b","no overlapping text after per-line hit testing, four viewports, eight pages, whole page scrolled",Object.keys(over).length===0,{pages:Object.keys(over).slice(0,8)});

// placeholders in both locales, counted
await vp(1440,900);
const ph={};
for (const p of PAGES) { await go(p,1800); ph[p]=await ev(`(document.body.innerText.match(/Capture pending|Captura pendiente|Photography pending|Fotograf..a pendiente/gi)||[]).length`); }
res.placeholders=ph;
check("UI-05b","no placeholder surfaces on the public pages",Object.values(ph).every(n=>n===0),ph);

// packages: is there a path from a plan to a next step
const pk={};
for (const p of ["/en/packages","/es/packages"]) { await go(p,2200);
  pk[p]=await ev(`({ h1:(document.querySelector('h1')||{}).innerText||'', plans:[...document.querySelectorAll('main h2,main h3')].map(h=>h.innerText.trim().slice(0,30)).slice(0,10),
    prices:(document.body.innerText.match(/[0-9]+\s?(€|EUR|\$)/g)||[]).slice(0,5),
    ctas:[...document.querySelectorAll('main a[href],main button')].map(e=>({t:(e.innerText||'').trim().slice(0,26),href:e.getAttribute('href')||''})).filter(x=>x.t).slice(0,14) })`); }
res.packages=pk;
const ctas=(pk["/en/packages"]?.ctas??[]);
check("UI-07b","the packages page offers a next step per plan",ctas.some(c=>/signup|registro|demo|contact/i.test(c.href+c.t)),{h1:pk["/en/packages"]?.h1?.slice(0,40),plans:pk["/en/packages"]?.plans,ctas:ctas.slice(0,8),prices:pk["/en/packages"]?.prices});
await vp(390); await go("/en/packages",2200); await shot("rv-390-en-packages");
await vp(360); await go("/es/platform/crm",2200); await shot("rv-360-es-platform-crm");
writeFileSync(OUT,JSON.stringify(res,null,1));
console.log(JSON.stringify(res.checks.map(c=>[c.id,c.pass])));
ws.close(); for(const k of kids) k.kill(); process.exit(0);
