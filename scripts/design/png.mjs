// Minimal PNG decoder for the screenshots CDP returns (8 bit, RGB or RGBA, non interlaced).
// Only used by scroll-record.mjs; no dependency.
import { inflateSync } from "node:zlib";

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

export const PNG = {
  decode(buf) {
    if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("not a png");
    let pos = 8, width = 0, height = 0, colorType = 6, depth = 8;
    const idat = [];
    while (pos < buf.length) {
      const len = buf.readUInt32BE(pos);
      const type = buf.toString("ascii", pos + 4, pos + 8);
      const data = buf.subarray(pos + 8, pos + 8 + len);
      if (type === "IHDR") {
        width = data.readUInt32BE(0); height = data.readUInt32BE(4); depth = data[8]; colorType = data[9];
        if (depth !== 8 || data[12] !== 0) throw new Error("unsupported png");
      } else if (type === "IDAT") idat.push(data);
      else if (type === "IEND") break;
      pos += 12 + len;
    }
    const ch = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : 1;
    const raw = inflateSync(Buffer.concat(idat));
    const stride = width * ch;
    const out = new Uint8Array(width * height * 4);
    let prev = new Uint8Array(stride);
    for (let y = 0; y < height; y++) {
      const f = raw[y * (stride + 1)];
      const line = Uint8Array.prototype.slice.call(raw, y * (stride + 1) + 1, (y + 1) * (stride + 1));
      for (let i = 0; i < stride; i++) {
        const a = i >= ch ? line[i - ch] : 0, b = prev[i], c = i >= ch ? prev[i - ch] : 0;
        if (f === 1) line[i] = (line[i] + a) & 255;
        else if (f === 2) line[i] = (line[i] + b) & 255;
        else if (f === 3) line[i] = (line[i] + ((a + b) >> 1)) & 255;
        else if (f === 4) line[i] = (line[i] + paeth(a, b, c)) & 255;
      }
      for (let x = 0; x < width; x++) {
        const o = (y * width + x) * 4, s = x * ch;
        if (ch >= 3) { out[o] = line[s]; out[o + 1] = line[s + 1]; out[o + 2] = line[s + 2]; out[o + 3] = ch === 4 ? line[s + 3] : 255; }
        else { out[o] = out[o + 1] = out[o + 2] = line[s]; out[o + 3] = ch === 2 ? line[s + 1] : 255; }
      }
      prev = line;
    }
    return { width, height, data: out };
  },
};
