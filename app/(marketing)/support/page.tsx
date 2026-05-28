import ConversionStrip from "@/components/layout/ConversionStrip";
import { buildStaticPageMetadata } from "@/lib/seo-config";
import PageHero from "@/components/layout/PageHero";
import SupportHub from "@/components/support/SupportHub";

export const metadata = buildStaticPageMetadata("/support");

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
