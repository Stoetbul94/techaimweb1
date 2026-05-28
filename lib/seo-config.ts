/** Static page SEO copy — used with buildPageMetadata from lib/seo.ts */

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export type StaticSeoEntry = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
};

const PRODUCT_OG = "/images/products/ta10-pro/ta10-pro-front.webp";

export const staticSeoPages: StaticSeoEntry[] = [
  {
    path: "",
    title: "Precision Measurement & Performance Analytics",
    description:
      "Competition-grade electronic target systems, range software, and real-time shooting analytics for clubs, federations, and competitive athletes.",
    ogImage: PRODUCT_OG,
    ogImageWidth: 1024,
    ogImageHeight: 1536,
  },
  {
    path: "/products",
    title: "Electronic Target Systems",
    description:
      "Explore TechAim Match 10 and Match 50 electronic scoring systems for 10m and 50m rifle disciplines, with ISSF-aligned training workflows.",
    ogImage: PRODUCT_OG,
    ogImageWidth: 1024,
    ogImageHeight: 1536,
  },
  {
    path: "/software",
    title: "Range Control Software",
    description:
      "Live scoring, athlete management, competition workflows, and cloud sync for modern shooting ranges and match officials.",
  },
  {
    path: "/analytics",
    title: "Performance Analytics & Live Scoring",
    description:
      "Shot heatmaps, grouping analysis, trend tracking, and competition statistics — turn every shot into actionable performance data.",
  },
  {
    path: "/downloads",
    title: "Downloads & Documentation",
    description:
      "Datasheets, firmware, software installers, and technical documentation for TechAim electronic target systems.",
  },
  {
    path: "/developers",
    title: "Developer API",
    description:
      "REST API, WebSocket feeds, and webhooks to integrate TechAim scoring and range data with your systems.",
  },
  {
    path: "/support",
    title: "Support & Knowledge Base",
    description:
      "Technical support, FAQs, firmware updates, and resources for TechAim range operators and club administrators.",
  },
  {
    path: "/about",
    title: "About TechAim",
    description:
      "TechAim develops electronic target systems and intelligent analytics platforms for competitive shooting environments worldwide.",
  },
  {
    path: "/news",
    title: "News & Industry Updates",
    description:
      "ISSF-aligned scoring news, range modernization insights, and updates from the TechAim electronic target platform.",
  },
  {
    path: "/contact",
    title: "Contact & Demonstrations",
    description:
      "Book a demonstration, request a quotation, or speak with the TechAim engineering team about your range project.",
  },
];

export function getStaticSeo(path: string): StaticSeoEntry | undefined {
  const normalized = path === "/" ? "" : path;
  return staticSeoPages.find((p) => p.path === normalized);
}

export function buildStaticPageMetadata(path: string): Metadata {
  const entry = getStaticSeo(path);
  if (!entry) {
    throw new Error(`Missing SEO config for path: ${path}`);
  }
  return buildPageMetadata({
    title: entry.title,
    description: entry.description,
    path: entry.path,
    image: entry.ogImage,
    imageWidth: entry.ogImageWidth,
    imageHeight: entry.ogImageHeight,
  });
}
