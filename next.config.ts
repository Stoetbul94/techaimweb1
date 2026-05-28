import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
  },
  async redirects() {
    return [
      { source: "/systems", destination: "/products", permanent: true },
      { source: "/systems/:path*", destination: "/products/:path*", permanent: true },
      { source: "/technology", destination: "/analytics", permanent: true },
    ];
  },
};

export default nextConfig;
