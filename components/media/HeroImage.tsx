"use client";

import OptimizedImage from "@/components/media/OptimizedImage";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type HeroImageProps = {
  asset: ImageAsset;
  className?: string;
  priority?: boolean;
};

export default function HeroImage({ asset, className, priority = true }: HeroImageProps) {
  return (
    <OptimizedImage
      asset={asset}
      sizes={imageSizes.hero}
      priority={priority}
      fadeIn
      hoverZoom={false}
      glowOnHover
      className={cn("border border-brand-border bg-brand-elevated/40", className)}
      imageClassName="object-contain object-center p-4 md:p-8"
    />
  );
}
