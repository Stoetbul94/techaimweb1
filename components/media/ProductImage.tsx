"use client";

import OptimizedImage, { type OptimizedImageProps } from "@/components/media/OptimizedImage";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes, productDisplayAspect } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  asset: ImageAsset;
  variant?: "card" | "detail" | "hero";
  className?: string;
  priority?: boolean;
} & Pick<OptimizedImageProps, "hoverZoom" | "glowOnHover">;

const sizeByVariant = {
  card: imageSizes.productCard,
  detail: imageSizes.productDetail,
  hero: imageSizes.productDetail,
} as const;

export default function ProductImage({
  asset,
  variant = "card",
  className,
  priority = false,
  hoverZoom = true,
  glowOnHover = false,
}: ProductImageProps) {
  return (
    <OptimizedImage
      asset={asset}
      sizes={sizeByVariant[variant]}
      priority={priority}
      fill
      fixedAspect={productDisplayAspect}
      hoverZoom={hoverZoom}
      glowOnHover={glowOnHover}
      fadeIn
      className={cn("border-b border-brand-border", className)}
      imageClassName="object-contain object-center"
    />
  );
}
