import ConversionStrip from "@/components/layout/ConversionStrip";
import { buildStaticPageMetadata } from "@/lib/seo-config";
import HowItWorks from "@/components/sections/HowItWorks";
import Hero from "@/components/sections/Hero";
import FeaturedMatch50Video from "@/components/sections/FeaturedMatch50Video";
import ProductOverview from "@/components/sections/ProductOverview";
import WhyTechAimArms from "@/components/sections/WhyTechAimArms";
import AnalyticsShowcase from "@/components/sections/AnalyticsShowcase";

export const metadata = buildStaticPageMetadata("");

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyTechAimArms />
      <ProductOverview />
      <FeaturedMatch50Video />
      <AnalyticsShowcase />
      <ConversionStrip />
    </main>
  );
}
