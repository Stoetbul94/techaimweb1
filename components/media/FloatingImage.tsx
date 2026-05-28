"use client";

import { motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/media/OptimizedImage";
import type { ImageAsset } from "@/lib/imageRegistry";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

type FloatingImageProps = {
  asset: ImageAsset;
  className?: string;
  priority?: boolean;
  parallax?: number;
};

export default function FloatingImage({
  asset,
  className,
  priority = false,
  parallax = 8,
}: FloatingImageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", className)}
      animate={reduceMotion ? undefined : { y: [0, -parallax, 0] }}
      transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <OptimizedImage
        asset={asset}
        sizes={imageSizes.hero}
        priority={priority}
        hoverZoom
        glowOnHover
        fadeIn
        className="shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        imageClassName="object-contain"
      />
    </motion.div>
  );
}
