import type { Metadata } from "next";
import Link from "next/link";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import ArchitectureDiagram from "@/components/media/ArchitectureDiagram";
import BackgroundLayers from "@/components/media/BackgroundLayers";
import FeatureTabs from "@/components/software/FeatureTabs";
import { images } from "@/lib/imageRegistry";

export const metadata: Metadata = {
  title: "Software Platform",
  description: "Range control software with live scoring, athlete management, competition management and cloud synchronisation.",
};

export default function SoftwarePage() {
  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Software product"
        title="Range Control & Analytics Software"
        description="A complete software platform designed for match officials, coaches, athletes and spectators. Not an accessory — a core product."
      />
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <BackgroundLayers variant="section" />
        <FeatureTabs />
        <div className="relative mt-16">
          <h3 className="font-heading text-2xl font-bold text-brand-text-primary">Range network architecture</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-text-body">
            PLC-backed lane control, Ethernet target links, and centralized scoring — designed for club and federation deployments.
          </p>
          <ArchitectureDiagram
            className="mt-8"
            asset={images.systems.plcArchitecture}
            caption="TechAim PLC and network topology"
          />
        </div>
        <div className="mt-12 border border-brand-border bg-brand-panel p-8 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-brand-text-primary">Developer API</h3>
            <p className="mt-2 max-w-xl text-sm leading-7">
              Integrate TECH AIM with your existing systems via REST API and WebSocket feeds.
            </p>
          </div>
          <Link href="/developers" className="mt-6 inline-block border border-brand-crimson px-6 py-3 font-heading text-sm font-semibold text-brand-crimson md:mt-0">
            View API Documentation
          </Link>
        </div>
      </section>
      <ConversionStrip title="Request a software demonstration" />
    </main>
  );
}
