/** Canonical site origin for sitemap, robots, and structured data */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techaim.co.za";
  return url.replace(/\/$/, "");
}
