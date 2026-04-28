#!/usr/bin/env node
// Quick transparency checker for section/problem illustrations.
// Usage:
//   node scripts/check-transparency.mjs                  # checks default globs
//   node scripts/check-transparency.mjs path/to/img.png  # checks specific files
//
// Reports per image:
//   - has alpha channel?
//   - % of fully transparent pixels
//   - % of corner pixels that are transparent (background check)
//   - PASS / FAIL verdict

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import zlib from "node:zlib";

const ROOT = process.cwd();
const DEFAULT_DIR = "src/assets";
const DEFAULT_PATTERNS = [/^section-.*\.png$/i, /^problem-.*\.png$/i];

// Minimal PNG decoder (RGBA only, no interlace) — sufficient for our generated assets.
function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) {
    throw new Error("Not a PNG");
  }
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); pos += 4;
    const type = buf.slice(pos, pos + 4).toString("ascii"); pos += 4;
    const data = buf.slice(pos, pos + len); pos += len;
    pos += 4; // crc
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
      interlace = data.readUInt8(12);
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") break;
  }
  if (interlace !== 0) throw new Error("Interlaced PNGs not supported");
  if (bitDepth !== 8) throw new Error(`Unsupported bit depth: ${bitDepth}`);
  // colorType: 6 = RGBA, 2 = RGB, 4 = GA, 0 = G, 3 = palette
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`Unsupported color type: ${colorType}`);

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * channels;
  const out = Buffer.alloc(stride * height);
  let prev = Buffer.alloc(stride);
  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const row = raw.slice(rp, rp + stride); rp += stride;
    const dst = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? dst[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let recon;
      switch (filter) {
        case 0: recon = row[x]; break;
        case 1: recon = (row[x] + a) & 0xff; break;
        case 2: recon = (row[x] + b) & 0xff; break;
        case 3: recon = (row[x] + ((a + b) >> 1)) & 0xff; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          recon = (row[x] + pr) & 0xff; break;
        }
        default: throw new Error(`Unknown filter ${filter}`);
      }
      dst[x] = recon;
    }
    dst.copy(out, y * stride);
    prev = dst;
  }
  return { width, height, channels, colorType, pixels: out };
}

function analyze(filePath) {
  const buf = readFileSync(filePath);
  const { width, height, channels, colorType, pixels } = decodePng(buf);
  const hasAlpha = channels === 4 || channels === 2;
  let transparent = 0, opaque = 0;
  const total = width * height;
  if (hasAlpha) {
    for (let i = channels - 1; i < pixels.length; i += channels) {
      if (pixels[i] === 0) transparent++;
      else if (pixels[i] === 255) opaque++;
    }
  }
  // Corner sampling — 8x8 patches at each corner.
  const cornerSize = 8;
  let cornerTotal = 0, cornerTransparent = 0;
  if (hasAlpha) {
    const corners = [[0, 0], [width - cornerSize, 0], [0, height - cornerSize], [width - cornerSize, height - cornerSize]];
    for (const [cx, cy] of corners) {
      for (let dy = 0; dy < cornerSize; dy++) {
        for (let dx = 0; dx < cornerSize; dx++) {
          const idx = ((cy + dy) * width + (cx + dx)) * channels + (channels - 1);
          cornerTotal++;
          if (pixels[idx] === 0) cornerTransparent++;
        }
      }
    }
  }
  return {
    width, height, colorType, hasAlpha,
    transparentPct: hasAlpha ? (transparent / total) * 100 : 0,
    opaquePct: hasAlpha ? (opaque / total) * 100 : 100,
    cornerTransparentPct: hasAlpha ? (cornerTransparent / cornerTotal) * 100 : 0,
  };
}

function collectFiles(args) {
  if (args.length) return args.map((a) => resolve(a));
  const dir = resolve(ROOT, DEFAULT_DIR);
  return readdirSync(dir)
    .filter((f) => DEFAULT_PATTERNS.some((re) => re.test(f)))
    .map((f) => join(dir, f));
}

const files = collectFiles(process.argv.slice(2));
if (!files.length) {
  console.log("No matching files found.");
  process.exit(0);
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("File", 44), pad("Size", 12), pad("Alpha", 7), pad("Transp%", 9), pad("Corners%", 10), "Verdict");
console.log("-".repeat(100));

let failures = 0;
for (const f of files) {
  const rel = relative(ROOT, f);
  try {
    const r = analyze(f);
    // Verdict: must have alpha + corners ≥ 95% transparent + overall transparent ≥ 10%.
    const ok = r.hasAlpha && r.cornerTransparentPct >= 95 && r.transparentPct >= 10;
    if (!ok) failures++;
    console.log(
      pad(rel, 44),
      pad(`${r.width}x${r.height}`, 12),
      pad(r.hasAlpha ? "yes" : "NO", 7),
      pad(r.transparentPct.toFixed(1), 9),
      pad(r.cornerTransparentPct.toFixed(1), 10),
      ok ? "✅ PASS" : "❌ FAIL"
    );
  } catch (e) {
    failures++;
    console.log(pad(rel, 44), "ERROR:", e.message);
  }
}

console.log("-".repeat(100));
if (failures) {
  console.log(`${failures} file(s) failed transparency check.`);
  process.exit(1);
} else {
  console.log("All illustrations have transparent backgrounds. ✨");
}
