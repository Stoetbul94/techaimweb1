import ConversionStrip from "@/components/layout/ConversionStrip";
import { buildStaticPageMetadata } from "@/lib/seo-config";
import PageHero from "@/components/layout/PageHero";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/products";

export const metadata = buildStaticPageMetadata("/products");

export default function ProductsPage() {
  const available = products.filter((p) => p.status === "available");
  const upcoming = products.filter((p) => p.status === "coming-soon");

  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Hardware platform"
        title="Precision Electronic Target Systems"
        description="Competition-grade shot detection engineered for modern shooting sports. Every system integrates seamlessly with the TECH AIM analytics platform."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-brand-text-primary">Available Now</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {available.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <h2 className="font-heading text-3xl font-bold text-brand-text-primary">In Development</h2>
          <span className="bg-brand-crimson px-3 py-1 text-xs font-semibold text-brand-text-primary">Coming Soon</span>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <ConversionStrip title="Need help choosing a system?" />
    </main>
  );
}
