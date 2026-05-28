import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export type SitemapRouteConfig = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

/** Static marketing routes (excludes /systems and /technology — those 301 elsewhere) */
const staticRoutes: SitemapRouteConfig[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/software", changeFrequency: "monthly", priority: 0.85 },
  { path: "/analytics", changeFrequency: "monthly", priority: 0.85 },
  { path: "/downloads", changeFrequency: "monthly", priority: 0.75 },
  { path: "/developers", changeFrequency: "monthly", priority: 0.75 },
  { path: "/support", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

const productRoutes: SitemapRouteConfig[] = products.map((p) => ({
  path: `/products/${p.slug}`,
  changeFrequency: "monthly" as const,
  priority: 0.85,
}));

export function getSitemapRouteConfigs(): SitemapRouteConfig[] {
  return [...staticRoutes, ...productRoutes];
}

export function getPublicPaths(): string[] {
  return getSitemapRouteConfigs().map((r) => r.path);
}
