import type { Metadata } from "next";
import Link from "next/link";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import FeatureTabs from "@/components/software/FeatureTabs";

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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FeatureTabs />
        <div className="mt-12 border border-brand-border bg-brand-panel p-8 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Developer API</h3>
            <p className="mt-2 max-w-xl text-sm leading-7">
              Integrate TECH AIM ARMS with your existing systems via REST API and WebSocket feeds.
            </p>
          </div>
          <Link href="/developers" className="mt-6 inline-block border border-brand-accent px-6 py-3 font-heading text-sm font-semibold text-brand-accent md:mt-0">
            View API Documentation
          </Link>
        </div>
      </section>
      <ConversionStrip title="Request a software demonstration" />
    </main>
  );
}
