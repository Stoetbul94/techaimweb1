import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getSitemapRouteConfigs } from "@/lib/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return getSitemapRouteConfigs().map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
