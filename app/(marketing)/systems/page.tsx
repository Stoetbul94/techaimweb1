import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import ProductImage from "@/components/media/ProductImage";
import { images } from "@/lib/imageRegistry";
import type { ImageAsset } from "@/lib/imageRegistry";

export const metadata: Metadata = buildPageMetadata({
  title: "Electronic Scoring Systems",
  description: "TechAim Match 10, Match 50 and future systems for competitive shooting.",
  path: "/systems",
  noIndex: true,
});

const currentProducts: {
  name: string;
  tag: string;
  body: string;
  image?: ImageAsset;
  specs: [string, string][];
}[] = [
  {
    name: "TechAim Match 10",
    tag: "10m Electronic Target System",
    body: "For pistol and 10m rifle disciplines",
    image: images.products.ta10Pro.front,
    specs: [
      ["Distance", "10m"],
      ["Discipline", "Air pistol and air rifle"],
      ["ISSF Status", "Not currently ISSF approved"],
      ["Communication", "Bluetooth + Ethernet"],
    ],
  },
  {
    name: "TechAim Match 50",
    tag: "50m Electronic Target System",
    body: "For 50m rifle disciplines",
    image: images.products.ta50.front,
    specs: [
      ["Distance", "50m"],
      ["Discipline", "Small-bore rifle"],
      ["ISSF Status", "Not currently ISSF approved"],
      ["Communication", "Ethernet + control hub"],
    ],
  },
];

const futureProducts = [
  ["TechAim LR", "Long Range"],
  ["TechAim Hunter", "Field Sport"],
  ["TechAim Elite", "Elite Competition"],
  ["TechAim X", "Next Generation"],
];

export default function SystemsPage() {
  return (
    <main className="bg-brand-bg pt-20">
      <section className="grid min-h-[50vh] place-items-center border-b border-brand-border bg-[radial-gradient(circle_at_80%_20%,rgba(0,200,255,0.09),transparent_32%)] px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.22em] text-brand-crimson">Product range</p>
          <h1 className="mt-5 font-heading text-5xl font-bold text-brand-text-primary md:text-7xl">
            Precision Scoring Systems
          </h1>
          <p className="mt-6 text-lg leading-8">
            Electronic target platforms for ISSF-aligned ranges, clubs, and federations across Africa.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl font-bold text-brand-text-primary">Available Now</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {currentProducts.map((product) => (
            <article key={product.name} className="border-t border-brand-crimson bg-brand-panel p-6">
              {product.image ? (
                <ProductImage asset={product.image} variant="card" glowOnHover />
              ) : (
                <div
                  className="aspect-video border border-dashed border-brand-crimson bg-brand-panel grid place-items-center text-sm"
                  aria-label={`${product.name} image placeholder`}
                >
                  Product Image Coming Soon
                </div>
              )}
              <span className="mt-6 inline-block bg-brand-signal px-3 py-1 text-xs font-medium text-brand-text-primary">
                {product.tag}
              </span>
              <h3 className="mt-4 font-heading text-3xl font-bold text-brand-text-primary">{product.name}</h3>
              <p className="mt-2">{product.body}</p>
              <div className="mt-6 divide-y divide-brand-border border border-brand-border">
                {product.specs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 px-4 py-3 text-sm">
                    <span>{label}</span>
                    <span className="text-brand-text-primary">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="border border-brand-crimson px-5 py-3 text-center font-heading text-sm font-semibold text-brand-crimson">
                  View Specs
                </Link>
                <Link href="/contact" className="bg-brand-signal px-5 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary">
                  Request Quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-heading text-4xl font-bold text-brand-text-primary">Coming Soon</h2>
          <span className="bg-brand-signal px-3 py-1 text-xs font-semibold text-brand-text-primary">In Development</span>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {futureProducts.map(([name, discipline]) => (
            <article key={name} className="border border-brand-border bg-brand-panel p-6 opacity-70">
              <h3 className="font-heading text-2xl font-bold text-brand-text-primary">{name}</h3>
              <p className="mt-3">{discipline}</p>
              <Link href="/contact" className="mt-6 inline-block border border-brand-crimson px-4 py-2 text-sm text-brand-crimson">
                Notify Me
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
