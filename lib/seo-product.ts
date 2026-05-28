import { BRAND_NAME } from "@/lib/brand";
import { getProductImage } from "@/lib/imageRegistry";
import type { Product } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export function buildProductMetadata(product: Product) {
  const path = `/products/${product.slug}`;
  const imageAsset = getProductImage(product.slug);

  return buildPageMetadata({
    title: product.name,
    description: product.headline,
    path,
    image: imageAsset?.src ?? "/icon-512.png",
    imageWidth: imageAsset?.width ?? 512,
    imageHeight: imageAsset?.height ?? 512,
    imageAlt: imageAsset?.alt ?? `${product.name} — ${BRAND_NAME}`,
  });
}

export function buildProductJsonLd(product: Product) {
  const imageAsset = getProductImage(product.slug);
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.headline,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    category: product.tagline,
    url: `${siteUrl}/products/${product.slug}`,
    ...(imageAsset
      ? {
          image: `${siteUrl}${imageAsset.src}`,
        }
      : {}),
  };
}
