/**
 * Compress Match 50 promo for web + GitHub (<100MB).
 * Source: public/Video/match-50-promo.mp4 (or match-50-promo.source.mp4)
 * Output: public/video/match-50-promo.mp4
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const ROOT = process.cwd();
const candidates = [
  path.join(ROOT, "public", "Video", "match-50-promo.mp4"),
  path.join(ROOT, "public", "video", "match-50-promo.source.mp4"),
  path.join(ROOT, "public", "Video", "match-50-promo.source.mp4"),
];
const input = candidates.find((p) => fs.existsSync(p));
if (!input) {
  console.error("No source video found. Place match-50-promo.mp4 in public/Video/");
  process.exit(1);
}

const outDir = path.join(ROOT, "public", "video");
fs.mkdirSync(outDir, { recursive: true });
const output = path.join(outDir, "match-50-promo.mp4");
const temp = path.join(outDir, "match-50-promo.tmp.mp4");

console.log(`Input:  ${input} (${(fs.statSync(input).size / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Output: ${output}`);
console.log("Compressing (this may take several minutes)...");

const ffmpeg = ffmpegInstaller.path;
const args = [
  "-i",
  input,
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "30",
  "-vf",
  "scale=min(1280\\,iw):min(720\\,ih):force_original_aspect_ratio=decrease",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-movflags",
  "+faststart",
  "-y",
  temp,
];

try {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
} catch {
  console.error("ffmpeg failed");
  process.exit(1);
}

const sizeMb = fs.statSync(temp).size / 1024 / 1024;
console.log(`Compressed size: ${sizeMb.toFixed(1)} MB`);

if (sizeMb > 95) {
  console.warn("Still over 95MB — re-run with -crf 32 or lower resolution in the script.");
}

fs.renameSync(temp, output);
console.log("Done.");
