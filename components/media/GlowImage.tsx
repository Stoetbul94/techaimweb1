"use client";

import OptimizedImage from "@/components/media/OptimizedImage";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type GlowImageProps = {
  asset: ImageAsset;
  sizes?: string;
  className?: string;
  telemetryGlow?: boolean;
};

export default function GlowImage({
  asset,
  sizes = imageSizes.half,
  className,
  telemetryGlow = false,
}: GlowImageProps) {
  return (
    <div
      className={cn(
        "group relative",
        telemetryGlow
          ? "hover:shadow-[0_0_56px_rgba(59,130,246,0.22)]"
          : "hover:shadow-[0_0_56px_rgba(168,0,56,0.2)]",
        "transition-shadow duration-500",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
        style={{
          background: telemetryGlow
            ? "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(168,0,56,0.14), transparent 70%)",
        }}
      />
      <OptimizedImage asset={asset} sizes={sizes} hoverZoom glowOnHover fadeIn />
    </div>
  );
}
