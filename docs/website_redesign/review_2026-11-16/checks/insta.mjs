const B="https://nuovasolution-design-preview-2ufwjoyhr-nuovasolajs-projects.vercel.app";
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
const out={};
for (const r of ["/es/packages","/en/packages","/es","/en","/es/platform","/en/platform"]) {
  for (const v of ["public","target"]) {
    const t=strip(await (await fetch(`${B}${r}?view=${v}`)).text());
    const qs=[]; const re=/[^.]{0,110}Instagram[^.]{0,110}\./g; let m;
    while((m=re.exec(t))&&qs.length<5) qs.push(m[0].trim());
    if(qs.length) out[`${r} ${v}`]=qs;
  }
}
console.log(JSON.stringify(out,null,1));
