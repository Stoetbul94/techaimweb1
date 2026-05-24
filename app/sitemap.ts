import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const staticRoutes = [
  "",
  "/products",
  "/software",
  "/analytics",
  "/downloads",
  "/developers",
  "/support",
  "/about",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techaim.co.za";
  const routes = [...staticRoutes, ...products.map((p) => `/products/${p.slug}`)];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products/") ? 0.85 : 0.8,
  }));
}
