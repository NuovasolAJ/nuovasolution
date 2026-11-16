const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const strip=s=>s.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&#x27;/g,"'").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const build=await (await fetch(`${B}/api/build`)).json(); console.log("build",build.commit.slice(0,7),build.deployment);
const T={};
for (const r of ["/es","/en","/es/packages","/en/packages","/es/contact","/en/contact","/es/faq","/en/faq","/es/platform/ai-sales-agent","/es/platform/lead-intelligence","/es/platform/crm","/en/platform/ai-sales-agent","/en/platform/lead-intelligence","/en/platform/crm"]) {
  for (const v of ["public","target"]) {
    const res=await fetch(`${B}${r}?view=${v}`,{redirect:"manual"});
    if(res.status!==200){T[`${r}|${v}`]="REDIR "+res.status;continue;}
    T[`${r}|${v}`]=strip(await res.text());
  }
}
const count=(k,re)=>((T[k]||"").match(re)||[]).length;
const show=(k,re,n=2)=>{const qs=[];let m;re.lastIndex=0;const t=T[k]||"";while((m=re.exec(t))&&qs.length<n)qs.push(t.slice(Math.max(0,m.index-80),m.index+m[0].length+80).trim());return qs;};
console.log("--- PK-0 ---");
for (const k of ["/es|target","/es|public","/es/packages|target","/es/packages|public","/en|target","/en/packages|target"]) {
  console.log(k, "pueden:",count(k,/pueden empezar|can start/gi), "empiezan:",count(k,/planes empiezan|paquetes empiezan|plan starts|packages start/gi), JSON.stringify(show(k,/[^.]{0,20}(pueden empezar|planes empiezan|can start|plan starts)[^.]{0,70}\./gi,1)));
}
console.log("--- jueves / K2 / 3D ---");
for (const k of ["/es|target","/es|public","/en|target"]) {
  console.log(k,"jueves:",count(k,/jueves|Thursday/g),"K2 aviso:",count(k,/Ninguna consulta se queda sin aviso|No enquiry goes unflagged/g),"alt K2:",count(k,/Nada se queda sin atender|Nothing is left unattended/g),"avisamos listo:",count(k,/Te avisamos cuando esté listo|We'll let you know when it's ready|We will let you know when it is ready/gi));
  console.log("    jueves quotes:",JSON.stringify(show(k,/[^.]{0,70}(jueves|Thursday)[^.]{0,50}\./gi,4)));
}
console.log("--- public WhatsApp on platform ---");
for (const k of Object.keys(T).filter(x=>x.includes("/platform/")&&x.endsWith("|public"))) console.log(k, count(k,/WhatsApp/g));
console.log("--- forbidden set, public ---");
for (const k of Object.keys(T).filter(x=>x.endsWith("|public"))) {
  const bad=[];
  if(count(k,/Solicitar una demo|Request a demo/g))bad.push("demo");
  if(count(k,/Prueba gratis|Try it free|14 días de Essential/g))bad.push("selfstart");
  if(count(k,/Recomendado|Recommended/g))bad.push("recomendado");
  if(count(k,/no calcula una puntuación|computes no score/g))bad.push("noscore");
  if(count(k,/número de tu agencia|agency's own number/gi))bad.push("ownNumber");
  if(count(k,/Instagram/g))bad.push("instagram");
  if(bad.length)console.log(k,bad.join(","));
}
