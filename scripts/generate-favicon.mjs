/**
 * Generates favicon PNGs from public/branding/icon.svg
 * Run: node scripts/generate-favicon.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const svgPath = path.join(ROOT, "public", "branding", "icon.svg");

if (!fs.existsSync(svgPath)) {
  console.error("Missing public/branding/icon.svg");
  process.exit(1);
}

const svg = fs.readFileSync(svgPath);

async function writeIcon(outPath, size) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(outPath);
}

await writeIcon(path.join(ROOT, "app", "icon.png"), 32);
await writeIcon(path.join(ROOT, "app", "apple-icon.png"), 180);
await writeIcon(path.join(ROOT, "public", "favicon-32x32.png"), 32);
await writeIcon(path.join(ROOT, "public", "icon-192.png"), 192);
await writeIcon(path.join(ROOT, "public", "icon-512.png"), 512);

console.log("Favicon assets generated.");
