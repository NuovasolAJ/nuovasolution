const B="https://nuovasolution-design-preview-2ufwjoyhr-nuovasolajs-projects.vercel.app";
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
const build=await (await fetch(`${B}/api/build`)).json();
console.log("build:",JSON.stringify(build));
for (const r of ["/es/trial","/en/trial","/es/signup"]) {
  for (const v of ["public","target"]) {
    const res=await fetch(`${B}${r}?view=${v}`,{redirect:"manual"});
    let line=`${r} ${v} status=${res.status} loc=${res.headers.get("location")||"-"}`;
    if(res.status===200){const t=strip(await res.text());
      line+=` | h1ish="${t.slice(0,90)}" | demo=${/Solicitar una demo|Request a demo/.test(t)} selfstart=${/Prueba gratis durante 14 d|Try it free for 14 days/.test(t)} len=${t.length}`;}
    console.log(line);
  }
}
// 3D "Opcional" in packages, public
for (const r of ["/es/packages","/en/packages"]) {
  const t=strip(await (await fetch(`${B}${r}?view=public`)).text());
  const qs=[];const re=/[^.]{0,90}(Opcional|Optional)[^.]{0,90}\./g;let m;
  while((m=re.exec(t))&&qs.length<4)qs.push(m[0].trim());
  const d3=[];const re2=/[^.]{0,80}(Modelos 3D|3D models|Visualizaci[oó]n 3D)[^.]{0,90}\./g;let m2;
  while((m2=re2.exec(t))&&d3.length<4)d3.push(m2[0].trim());
  console.log("PKG",r,"public OPCIONAL:",JSON.stringify(qs),"3D:",JSON.stringify(d3));
}
