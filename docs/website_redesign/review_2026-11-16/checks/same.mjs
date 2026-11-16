import { writeFileSync } from "node:fs";
const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const strip=s=>s.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const get=async(p,v)=>{let path=p;for(let i=0;i<3;i++){const r=await fetch(`${B}${path}?view=${v}`,{redirect:"manual"});
  if(r.status>=300&&r.status<400){path=(r.headers.get("location")||"").replace(/\?.*$/,"");continue;}
  return {status:r.status,text:r.status===200?strip(await r.text()):"",path};}return{status:310,text:"",path};};
const build=await (await fetch(`${B}/api/build`)).json();
console.log("build",build.commit.slice(0,7),build.deployment);
const routes=["/es","/en","/es/packages","/es/platform","/es/platform/ai-sales-agent","/es/platform/lead-intelligence","/es/platform/crm","/es/platform/daily-assistant","/es/faq","/es/contact","/es/example-report"];
const out={};
for (const r of routes) {
  const t=await get(r,"target"), p=await get(r,"public");
  if(t.status!==200){out[r]={note:"target "+t.status};continue;}
  if(p.status!==200){out[r]={note:"public "+p.status+" -> "+p.path, targetLen:t.text.length};continue;}
  // sentences present in target but not in public
  const sent=s=>s.split(/(?<=[.!?·])\s+/).map(x=>x.trim()).filter(x=>x.length>18);
  const ps=new Set(sent(p.text));
  const missing=sent(t.text).filter(x=>!ps.has(x));
  out[r]={targetLen:t.text.length, publicLen:p.text.length, ratio:Math.round(p.text.length/t.text.length*100)+"%",
    missingCount:missing.length, missingSample:missing.slice(0,6)};
}
writeFileSync("same.json",JSON.stringify({build,out},null,1));
for (const [r,o] of Object.entries(out)) console.log(r, o.note||`${o.publicLen}/${o.targetLen} = ${o.ratio}, fehlende Sätze: ${o.missingCount}`);
console.log("\n--- Beispiele fehlender Sätze ---");
for (const [r,o] of Object.entries(out)) if(o.missingSample&&o.missingSample.length) {console.log("##",r); for(const m of o.missingSample.slice(0,4)) console.log("   -",m.slice(0,130));}
