import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path including leading slash, or "" for homepage */
  path: string;
  /** Path under public/ or absolute URL */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  noIndex?: boolean;
};

const DEFAULT_OG_IMAGE = "/og-default.png";
const DEFAULT_OG_WIDTH = 512;
const DEFAULT_OG_HEIGHT = 512;

function resolveImageUrl(image: string): string {
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return image.startsWith("/") ? image : `/${image}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageWidth = DEFAULT_OG_WIDTH,
  imageHeight = DEFAULT_OG_HEIGHT,
  imageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const fullTitle = title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`;
  const ogImage = resolveImageUrl(image);
  const alt = imageAlt ?? `${title} — ${BRAND_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: BRAND_NAME,
      title: fullTitle,
      description,
      url: canonicalPath,
      images: [
        {
          url: ogImage,
          width: imageWidth,
          height: imageHeight,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
