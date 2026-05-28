import type { Metadata } from "next";
import { Suspense } from "react";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import DownloadsPortal from "@/components/downloads/DownloadsPortal";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Technical documentation, datasheets, firmware, software and CAD drawings for TECH AIM systems.",
};

export default function DownloadsPage() {
  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Documentation"
        title="Downloads & Resources"
        description="Searchable documentation portal for datasheets, installation guides, firmware, software and compliance documents."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={<p>Loading documents...</p>}>
          <DownloadsPortal />
        </Suspense>
      </section>
      <ConversionStrip title="Need technical assistance?" description="Contact our engineering team for installation support and custom documentation." />
    </main>
  );
}
