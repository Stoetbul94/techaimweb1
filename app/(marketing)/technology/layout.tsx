import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precision Technology",
  description: "ISSF-compliant electronic scoring technology explained.",
};

export default function TechnologyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
