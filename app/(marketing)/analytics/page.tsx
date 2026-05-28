import ConversionStrip from "@/components/layout/ConversionStrip";
import { buildStaticPageMetadata } from "@/lib/seo-config";
import PageHero from "@/components/layout/PageHero";
import AnalyticsDemo from "@/components/analytics/AnalyticsDemo";

export const metadata = buildStaticPageMetadata("/analytics");

export default function AnalyticsPage() {
  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Performance analytics"
        title="Turn every shot into actionable performance data"
        description="Advanced analytics engine delivering heat maps, grouping analysis, trend tracking and competition statistics in real time."
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <AnalyticsDemo />
      </section>
      <ConversionStrip title="See analytics in action at your range" />
    </main>
  );
}
