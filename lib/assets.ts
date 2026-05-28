/**
 * Static asset registry — 3D models + image registry re-exports.
 * Prefer typed `ImageAsset` entries from `@/lib/imageRegistry` in UI code.
 * Naming: public/images/README.md
 */

export const models = {
  heroRifle: "/models/hero-rifle.glb",
  heroCartridge: "/models/hero-22lr-cartridge.glb",
} as const;

/** Static video paths under public/video/ */
export const videos = {
  match50Promo: "/video/match-50-promo.mp4",
} as const;

export {
  images,
  getProductImage,
  getProductGallery,
  productSlugImageMap,
  productSlugGalleryMap,
  type ImageAsset,
} from "@/lib/imageRegistry";
