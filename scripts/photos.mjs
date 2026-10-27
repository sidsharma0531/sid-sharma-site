// Shrinks every photo in public/photos for the web: at most 1600px wide,
// WebP at quality 80, and no metadata (GPS location, camera, dates). Run it after adding photos:
//
//   npm run photos
//
// Each photo is replaced by a .webp with the same name, so IMG_4876.jpg becomes IMG_4876.webp.
// Content can keep the old name, since the site also looks for the .webp. Photos already done
// are skipped, so running it again is safe. On a Mac, iPhone .heic photos work too.

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const FOLDERS = ["public/photos"];
const MAX_WIDTH = 1600;
const QUALITY = 80;
const TYPES = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tif", ".tiff", ".heic", ".heif"];

let done = 0;
let skipped = 0;
let problems = 0;
let before = 0;
let after = 0;

for (const folder of FOLDERS) {
  const names = await fs.readdir(folder).catch(() => null);
  if (!names) continue; // that folder doesn't exist yet
  // Output name (lowercased) to the photo it came from, to catch two photos with one name.
  const made = new Map();

  for (const name of names.sort()) {
    const ext = path.extname(name).toLowerCase();
    if (name.startsWith(".") || !TYPES.includes(ext)) continue;
    const input = path.join(folder, name);
    const outName = ext === ".webp" ? name : `${name.slice(0, -ext.length)}.webp`;
    const key = outName.toLowerCase();

    if (made.has(key)) {
      // Either the .webp this run just wrote, or a second photo with the same name.
      if (ext !== ".webp") {
        console.warn(`! ${input}: skipped, since ${outName} was just made from ${made.get(key)}. Rename one of them.`);
        problems++;
      }
      continue;
    }

    try {
      if (ext === ".webp" && (await alreadyDone(input))) {
        skipped++;
        continue;
      }
      const size = (await fs.stat(input)).size;
      const output = path.join(folder, outName);
      const info = await shrink(input, ext, output);
      if (output !== input) await fs.rm(input);
      made.set(key, name);
      done++;
      before += size;
      after += info.size;
      console.log(`${input} → ${outName}  ${kb(size)} → ${kb(info.size)}, ${info.width}px wide`);
    } catch (error) {
      problems++;
      console.error(`! ${input}: ${error.message}`);
    }
  }
}

if (done) console.log(`\nShrank ${done} photo${done === 1 ? "" : "s"}: ${mb(before)} → ${mb(after)}.`);
if (skipped) console.log(`${skipped} already done.`);
if (!done && !skipped && !problems) console.log("No photos found.");
if (problems) process.exitCode = 1;

// A .webp this script made: narrow enough, with no metadata left.
async function alreadyDone(file) {
  const { width, exif, xmp, iptc, icc } = await sharp(file).metadata();
  return width <= MAX_WIDTH && !exif && !xmp && !iptc && !icc;
}

// Writes the smaller WebP to a temp file, then swaps it in. Sharp keeps no metadata unless asked,
// so GPS, camera, and dates are dropped; the camera's rotation is applied to the pixels first so
// nothing ends up sideways. Colors are converted to standard sRGB.
async function shrink(input, ext, output) {
  const source = ext === ".heic" || ext === ".heif" ? heicToJpeg(input) : input;
  const temp = `${output}.tmp`;
  try {
    const { pages = 1 } = await sharp(source).metadata();
    const animated = pages > 1; // animated GIF or WebP: keep every frame
    let image = sharp(source, { animated });
    if (!animated) image = image.autoOrient();
    const info = await image
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(temp);
    await fs.rename(temp, output);
    return info;
  } finally {
    await fs.rm(temp, { force: true });
    if (source !== input) await fs.rm(source, { force: true });
  }
}

// Sharp's prebuilt binaries can't read iPhone HEIC, so on a Mac the built-in sips turns it into a
// full-quality JPEG first. Elsewhere sharp tries, and its error explains if it can't.
function heicToJpeg(input) {
  if (process.platform !== "darwin") return input;
  const jpeg = path.join(os.tmpdir(), `photos-${process.pid}-${path.basename(input)}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "best", input, "--out", jpeg], { stdio: "ignore" });
  return jpeg;
}

function kb(bytes) {
  return `${Math.round(bytes / 1024).toLocaleString("en-US")} KB`;
}

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
