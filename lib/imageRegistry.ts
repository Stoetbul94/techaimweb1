/**
 * Central image registry — paths, dimensions, blur placeholders.
 * Run `npm run optimize:images` after adding PNGs to refresh WebP + manifest.
 * Naming: public/images/README.md
 */

import manifest from "@/lib/generated/image-manifest.json";

export type ImageAsset = {
  /** Primary path (WebP when optimized) */
  src: string;
  png: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
};

type ManifestEntry = {
  png: string;
  webp: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const m = manifest as Record<string, ManifestEntry>;

function entry(key: string, alt: string): ImageAsset {
  const data = m[key];
  if (!data) {
    throw new Error(`Missing image manifest entry: ${key}. Run npm run optimize:images`);
  }
  return {
    src: data.webp,
    png: data.png,
    webp: data.webp,
    width: data.width,
    height: data.height,
    alt,
    blurDataURL: data.blurDataURL,
  };
}

export const images = {
  brand: {} as const,
  marketing: {} as const,
  backgrounds: {
    /** CSS-only layers; optional raster assets go in /images/backgrounds/ */
    heroGrid: null,
  },
  products: {
    ta10Classic: {
      perspective: entry("products/ta10-classic/ta10-classic-perspective", "TA10 Classic electronic target — perspective view"),
    },
    ta10Pro: {
      front: entry("products/ta10-pro/ta10-pro-front", "TA10 Pro electronic target — front view"),
      hero: entry("products/ta10-pro/ta10-pro-front", "TA10 Pro precision electronic target system"),
    },
    ta50: {
      dashboardTablet: entry(
        "products/ta50/ta50-dashboard-tablet",
        "Match 50 system — range dashboard on tablet",
      ),
    },
    ta10x: {} as const,
    ta100: {} as const,
    accessories: {} as const,
  },
  software: {
    dashboardRaw: entry("software/software-dashboard-raw", "TechAim range control software dashboard"),
    dashboardTabletBlackTarget: entry(
      "software/software-dashboard-tablet-black-target",
      "TechAim software — tablet dashboard with target view",
    ),
    dashboardTabletBlueTarget: entry(
      "software/software-dashboard-tablet-blue-target",
      "TechAim software — tablet dashboard blue target overlay",
    ),
  },
  systems: {
    plcArchitecture: entry("systems/system-plc-architecture", "TechAim PLC and network architecture diagram"),
  },
} as const;

/** Maps site product slugs to hero/card image assets (TA10 → Match 10, TA50 → Match 50) */
export const productSlugImageMap: Partial<Record<string, ImageAsset>> = {
  "match-10": images.products.ta10Pro.front,
  "match-50": images.products.ta50.dashboardTablet,
};

/** Secondary images on product detail pages (hardware + tablet software UI) */
export const productSlugGalleryMap: Partial<Record<string, ImageAsset[]>> = {
  "match-10": [
    images.products.ta10Classic.perspective,
    images.software.dashboardTabletBlackTarget,
    images.software.dashboardTabletBlueTarget,
  ],
};

export function getProductImage(slug: string): ImageAsset | undefined {
  return productSlugImageMap[slug];
}

export function getProductGallery(slug: string): ImageAsset[] {
  return productSlugGalleryMap[slug] ?? [];
}
