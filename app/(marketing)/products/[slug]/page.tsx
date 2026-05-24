import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConversionStrip from "@/components/layout/ConversionStrip";
import StickySectionNav from "@/components/layout/StickySectionNav";
import CompatibilityMatrix from "@/components/products/CompatibilityMatrix";
import FeatureGrid from "@/components/products/FeatureGrid";
import ProductCard from "@/components/products/ProductCard";
import SpecTable from "@/components/products/SpecTable";
import TechnicalDrawing from "@/components/products/TechnicalDrawing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct, getRelatedProducts, products } from "@/lib/products";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "features", label: "Features" },
  { id: "drawings", label: "Drawings" },
  { id: "compatibility", label: "Compatibility" },
  { id: "installation", label: "Installation" },
  { id: "faq", label: "FAQ" },
];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.headline,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <main className="bg-brand-bg pt-20">
      <section className="border-b border-brand-border bg-[radial-gradient(circle_at_80%_20%,rgba(168,0,56,0.08),transparent_32%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={product.status === "available" ? "default" : "outline"}>
              {product.status === "available" ? "Available" : "Coming Soon"}
            </Badge>
            <Badge variant="outline">{product.tagline}</Badge>
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold text-brand-text-primary md:text-6xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-xl text-brand-text-primary">{product.headline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta">
              <Link href={`/contact?intent=quote&product=${product.slug}`}>Request Quotation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/downloads?product=${product.slug}`}>Download Datasheet</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact?intent=demo">Book Demonstration</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[200px_1fr] lg:px-8">
        <StickySectionNav items={sections} />
        <div className="space-y-20">
          <section id="overview">
            <h2 className="font-heading text-2xl font-bold text-brand-text-primary">Overview</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8">{product.overview}</p>
          </section>
          <section id="specifications">
            <SpecTable specs={product.specs} />
          </section>
          <section id="features">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-text-primary">Features</h2>
            <FeatureGrid features={product.features} />
          </section>
          <section id="drawings">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-text-primary">Technical Drawings</h2>
            <TechnicalDrawing />
          </section>
          <section id="compatibility">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-text-primary">Compatibility</h2>
            <CompatibilityMatrix items={product.compatibility} />
          </section>
          <section id="installation">
            <h2 className="font-heading text-2xl font-bold text-brand-text-primary">Installation</h2>
            <ul className="mt-4 space-y-3">
              {product.installation.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-crimson" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="faq">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-text-primary">FAQ</h2>
            <Accordion type="single" collapsible>
              {product.faq.map((item, i) => (
                <AccordionItem key={item.question} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
          {related.length > 0 && (
            <section>
              <h2 className="mb-6 font-heading text-2xl font-bold text-brand-text-primary">Related Products</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <ConversionStrip />
    </main>
  );
}
