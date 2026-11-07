import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const B=readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt","utf8").trim();
const BASE="https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const H={"x-vercel-protection-bypass":B};
// WebP dimensions from the container header (VP8/VP8L/VP8X), independent of any browser
function webp(buf){ if(buf.toString("ascii",0,4)!=="RIFF"||buf.toString("ascii",8,12)!=="WEBP") return null;
  let o=12; while(o+8<=buf.length){ const tag=buf.toString("ascii",o,o+4), size=buf.readUInt32LE(o+4), d=o+8;
    if(tag==="VP8X") return {w:(buf.readUIntLE(d+4,3)&0xffffff)+1,h:(buf.readUIntLE(d+7,3)&0xffffff)+1,kind:"VP8X"};
    if(tag==="VP8 ") return {w:buf.readUInt16LE(d+6)&0x3fff,h:buf.readUInt16LE(d+8)&0x3fff,kind:"VP8"};
    if(tag==="VP8L"){ const b=buf.readUInt32LE(d+1); return {w:(b&0x3fff)+1,h:((b>>14)&0x3fff)+1,kind:"VP8L"}; }
    o=d+size+(size%2); }
  return null; }
// MP4: moov/mvhd duration + first tkhd dimensions
function mp4(buf){ const out={};
  const find=(name,from=0,to=buf.length)=>{ let o=from; while(o+8<=to){ const sz=buf.readUInt32BE(o); const t=buf.toString("ascii",o+4,o+8);
      if(t===name) return {o,sz}; if(sz<8) break; o+=sz; } return null; };
  const moov=find("moov"); if(!moov) return null;
  const mvhd=find("mvhd",moov.o+8,moov.o+moov.sz);
  if(mvhd){ const v=buf[mvhd.o+8]; const ts=v===1?Number(buf.readBigUInt64BE(mvhd.o+20)):buf.readUInt32BE(mvhd.o+20);
    const du=v===1?Number(buf.readBigUInt64BE(mvhd.o+28)):buf.readUInt32BE(mvhd.o+24); out.seconds=Math.round((du/ts)*100)/100; }
  const tkhd=find("tkhd",moov.o+8,moov.o+moov.sz);
  if(tkhd){ const v=buf[tkhd.o+8]; const base=tkhd.o+(v===1?104:92); out.w=buf.readUInt32BE(base)>>16; out.h=buf.readUInt32BE(base+4)>>16; }
  const stts=find("stts",moov.o+8,moov.o+moov.sz);
  return out; }
const files=["hero-a-2560.webp","hero-a-1920.webp","hero-a-1280.webp","hero-a-poster-960.webp",
  "house-ground-loop.mp4","house-ground-loop.webm","house-ground-loop-poster-1600.webp",
  "house-delivery.mp4","house-delivery.webm","house-delivery-poster-1600.webp",
  "living-empty-1200.webp","living-furnished-1200.webp",
  "living-camera-ride.mp4","living-ride-poster.webp","house-ground-near-1600.webp"];
const rows=[];
for(const f of files){ const r=await fetch(`${BASE}/media/3d/${f}`,{headers:H});
  if(r.status!==200){ rows.push({file:f,status:r.status}); continue; }
  const b=Buffer.from(await r.arrayBuffer());
  rows.push({file:f,status:200,bytes:b.length,sha256:createHash("sha256").update(b).digest("hex"),
    dim: f.endsWith(".webp")?webp(b):(f.endsWith(".mp4")?mp4(b):null)});
}
writeFileSync("media-facts.json",JSON.stringify(rows,null,1));
for(const r of rows) console.log((r.file+"                                   ").slice(0,38)+(r.status===200?`${String(r.bytes).padStart(9)}  ${r.sha256.slice(0,16)}  ${JSON.stringify(r.dim)}`:`status ${r.status}`));
