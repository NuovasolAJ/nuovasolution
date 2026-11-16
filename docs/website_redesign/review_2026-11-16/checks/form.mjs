const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const post=async(body,label)=>{
  const r=await fetch(`${B}/api/pilot-request`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  let t; try{t=await r.json();}catch{t=await r.text();}
  console.log(label,"->",r.status,JSON.stringify(t));
};
console.log("build",(await (await fetch(`${B}/api/build`)).json()).commit.slice(0,7));
// 1 neither email nor phone: refused BEFORE any delivery branch (route.ts:25-26)
await post({agency:"Prueba RV6",name:"Prueba RV6"},"agency+name only          ");
// 2 one field missing
await post({name:"Prueba RV6",phone:"+34600000000"},"name+phone, no agency     ");
// 3 bad email
await post({agency:"Prueba RV6",name:"Prueba RV6",email:"kein-at-zeichen"},"bad email                 ");
// 4 happy path WITH the honeypot set: route.ts:20 answers before anything can be sent
await post({agency:"Prueba RV6",name:"Prueba RV6",phone:"+34600000000",web:"honeypot"},"agency+name+phone+honeypot");
