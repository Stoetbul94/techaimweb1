import type { Metadata } from "next";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "TECH AIM ARMS — precision measurement and performance analytics platform engineered for competitive shooting sports.",
};

export default function AboutPage() {
  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Engineering excellence"
        title="Precision measurement, engineered for sport"
        description="TECH AIM ARMS develops electronic target systems and intelligent analytics platforms for competitive shooting environments worldwide."
      />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-lg leading-9">
          <p>
            We are not a target manufacturer first — we are a precision measurement and performance analytics
            platform. Every system we build is designed to transform raw shot data into actionable performance
            insights for athletes, coaches and range operators.
          </p>
          <p>
            Our engineering philosophy draws from the same standards that define precision industries worldwide.
            Competition-grade accuracy, reliable operation and modern software integration are at the core of
            everything we deliver.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            { label: "ISSF Approved", desc: "Official competition certification" },
            { label: "Sub-ms Detection", desc: "Instant shot registration" },
            { label: "Full API Access", desc: "Developer-first integration" },
          ].map((item) => (
            <div key={item.label} className="border border-brand-border bg-brand-panel p-6 text-center">
              <p className="font-heading text-lg font-bold text-brand-accent">{item.label}</p>
              <p className="mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <ConversionStrip />
    </main>
  );
}
