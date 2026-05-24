import type { Metadata } from "next";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import SupportHub from "@/components/support/SupportHub";

export const metadata: Metadata = {
  title: "Support",
  description: "Knowledge base, troubleshooting guides, firmware downloads, support tickets and system status.",
};

export default function SupportPage() {
  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        description="Search our knowledge base, download firmware, submit a support ticket or book remote assistance."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SupportHub />
      </section>
      <ConversionStrip />
    </main>
  );
}
