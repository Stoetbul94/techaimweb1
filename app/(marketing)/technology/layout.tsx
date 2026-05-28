import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Precision Technology",
  description: "ISSF-compliant electronic scoring technology explained.",
  path: "/technology",
  noIndex: true,
});

export default function TechnologyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
