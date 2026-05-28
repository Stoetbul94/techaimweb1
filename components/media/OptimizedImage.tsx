"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/lib/imageRegistry";
import { getAssetSrc } from "@/lib/image-utils";

export type OptimizedImageProps = {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  hoverZoom?: boolean;
  fadeIn?: boolean;
  glowOnHover?: boolean;
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "placeholder" | "blurDataURL">;

export default function OptimizedImage({
  asset,
  sizes,
  priority = false,
  className,
  imageClassName,
  fill = false,
  hoverZoom = true,
  fadeIn = true,
  glowOnHover = false,
  ...props
}: OptimizedImageProps) {
  const reduceMotion = useReducedMotion();
  const src = getAssetSrc(asset);

  const image = (
    <Image
      src={src}
      alt={asset.alt}
      width={fill ? undefined : asset.width}
      height={fill ? undefined : asset.height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={asset.blurDataURL}
      className={cn(
        "object-contain transition-transform duration-700 ease-out",
        hoverZoom && !reduceMotion && "group-hover:scale-[1.03]",
        imageClassName,
      )}
      {...props}
    />
  );

  const wrapper = (
    <div
      className={cn(
        "group relative overflow-hidden bg-brand-panel",
        glowOnHover && "transition-shadow duration-500 hover:shadow-[0_0_48px_rgba(168,0,56,0.18)]",
        className,
      )}
      style={fill ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      {fill ? <div className="relative h-full w-full">{image}</div> : image}
    </div>
  );

  if (!fadeIn || reduceMotion) return wrapper;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {wrapper}
    </motion.div>
  );
}
