/**
 * Compresses PNGs under public/images and writes WebP siblings.
 * Run: npm run optimize:images
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const MANIFEST_PATH = path.join(process.cwd(), "lib", "generated", "image-manifest.json");

const SKIP_DIRS = new Set(["node_modules", ".git"]);

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (entry.isFile() && /\.png$/i.test(entry.name)) files.push(full);
  }
  return files;
}

function toPublicPath(absPath) {
  const rel = path.relative(path.join(process.cwd(), "public"), absPath).replace(/\\/g, "/");
  return `/${rel}`;
}

async function optimizePng(filePath) {
  const webpPath = filePath.replace(/\.png$/i, ".webp");
  const input = sharp(filePath);
  const meta = await input.metadata();

  const tmpPath = `${filePath}.opt.png`;
  await input.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(tmpPath);
  await fs.rename(tmpPath, filePath);

  await sharp(filePath)
    .webp({ quality: 82, effort: 4, alphaQuality: 90 })
    .toFile(webpPath);

  const tiny = await sharp(filePath)
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();

  const blurDataURL = `data:image/webp;base64,${tiny.toString("base64")}`;

  return {
    png: toPublicPath(filePath),
    webp: toPublicPath(webpPath),
    width: meta.width ?? 1200,
    height: meta.height ?? 800,
    blurDataURL,
  };
}

async function main() {
  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  const pngFiles = await walk(ROOT);
  const manifest = {};

  for (const file of pngFiles) {
    const key = toPublicPath(file).replace(/^\/images\//, "").replace(/\.png$/i, "");
    console.log("Optimizing:", key);
    manifest[key] = await optimizePng(file);
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Done. ${pngFiles.length} images. Manifest: lib/generated/image-manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
