const B="https://nuovasolution-design-preview-2ufwjoyhr-nuovasolajs-projects.vercel.app";
const strip=h=>h.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
for (const r of ["/es/platform/daily-assistant","/en/platform/daily-assistant","/es/platform"]) {
 for (const v of ["public","target"]) {
  const res=await fetch(`${B}${r}?view=${v}`,{redirect:"manual"});
  if(res.status!==200){console.log(r,v,res.status,res.headers.get("location")||"");continue;}
  const t=strip(await res.text());
  const tests={instagram:/Instagram/.test(t),ownNumber:/n[uú]mero de tu agencia|your agency's own number|agency's number/.test(t),
    phoneAssist:/Asistente telef[oó]nico|Phone assistant/.test(t),channelPhone:/formulario web, tel[eé]fono|web form, phone/.test(t),
    threeD:/Visualizaci[oó]n 3D|3D visualisation|modelo 3D|3D model/.test(t),webform:/Formularios web|Web forms/.test(t),
    ads:/portales y anuncios|portals and ads/.test(t)};
  console.log(r,v,res.status,"len",t.length,JSON.stringify(tests));
 }
}
