// Build-time helper: pixel size of a JPEG or PNG in /public, for Open Graph image dimensions.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function imageSize(publicPath: string): [number, number] | null {
  let b: Buffer;
  try { b = readFileSync(join(process.cwd(), "public", publicPath)); } catch { return null; }
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];   // PNG IHDR
  for (let i = 2; i + 9 < b.length;) {                                                      // JPEG: find a SOF marker
    if (b[i] !== 0xff) return null;
    const marker = b[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}
