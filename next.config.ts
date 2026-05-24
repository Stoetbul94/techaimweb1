import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
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
