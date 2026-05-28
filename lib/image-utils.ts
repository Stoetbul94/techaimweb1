import type { ImageAsset } from "@/lib/imageRegistry";

/** Fixed frame for product cards, heroes, and hardware galleries */
export const productDisplayAspect = "aspect-[4/3]";

/** Responsive `sizes` presets for next/image */
export const imageSizes = {
  full: "100vw",
  hero: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px",
  productCard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  productDetail: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px",
  software: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px",
  architecture: "(max-width: 768px) 100vw, 1200px",
  half: "(max-width: 768px) 100vw, 50vw",
} as const;

export function getAssetSrc(asset: ImageAsset, preferWebp = true): string {
  if (preferWebp && asset.webp) return asset.webp;
  return asset.src;
}

export function aspectRatioPadding(asset: ImageAsset): string {
  return `${(asset.height / asset.width) * 100}%`;
}
