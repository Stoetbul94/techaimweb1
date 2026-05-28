"use client";

import OptimizedImage from "@/components/media/OptimizedImage";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type ArchitectureDiagramProps = {
  asset: ImageAsset;
  className?: string;
  caption?: string;
};

export default function ArchitectureDiagram({ asset, className, caption }: ArchitectureDiagramProps) {
  return (
    <figure className={cn("space-y-3", className)}>
      <OptimizedImage
        asset={asset}
        sizes={imageSizes.architecture}
        hoverZoom={false}
        fadeIn
        className="border border-brand-border bg-brand-panel"
        imageClassName="object-contain p-2 md:p-4"
      />
      {caption ? <figcaption className="text-center font-mono text-xs text-brand-text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
