"use client";

import { FloatingImage, GlowImage, ProductImage } from "@/components/media";
import { getProductGallery, getProductImage } from "@/lib/imageRegistry";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type ProductDetailMediaProps = {
  slug: string;
  className?: string;
};

function isTabletSoftwareAsset(asset: ImageAsset): boolean {
  return asset.src.includes("/software/") && asset.src.includes("tablet");
}

export default function ProductDetailMedia({ slug, className }: ProductDetailMediaProps) {
  const hero = getProductImage(slug);
  const gallery = getProductGallery(slug);

  if (!hero && gallery.length === 0) return null;

  const hardwareGallery = gallery.filter((a) => !isTabletSoftwareAsset(a));
  const tabletGallery = gallery.filter(isTabletSoftwareAsset);

  return (
    <div className={cn("mt-10 space-y-10", className)}>
      {hero ? (
        <div className="max-w-3xl">
          {slug === "match-10" ? (
            <FloatingImage asset={hero} priority />
          ) : (
            <ProductImage asset={hero} variant="detail" priority glowOnHover />
          )}
        </div>
      ) : null}

      {hardwareGallery.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-brand-text-primary">Additional views</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {hardwareGallery.map((asset) => (
              <ProductImage key={asset.src} asset={asset} variant="detail" glowOnHover />
            ))}
          </div>
        </div>
      ) : null}

      {tabletGallery.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-semibold text-brand-text-primary">Software on tablet</h3>
          <p className="max-w-2xl text-sm leading-7 text-brand-text-body">
            Range control and scoring as shown on competition tablets.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {tabletGallery.map((asset) => (
              <GlowImage key={asset.src} asset={asset} sizes={imageSizes.half} telemetryGlow />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
