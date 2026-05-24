import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col border-t-2 border-brand-crimson bg-brand-panel">
      <div
        className="aspect-video grid place-items-center border-b border-brand-border bg-brand-panel text-sm text-brand-text-body"
        aria-label={`${product.name} image placeholder`}
      >
        Product Image
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <Badge variant={product.status === "available" ? "default" : "outline"}>
            {product.status === "available" ? "Available" : "Coming Soon"}
          </Badge>
          {product.distance && <Badge variant="outline">{product.distance}</Badge>}
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-brand-text-primary">{product.name}</h3>
        <p className="mt-1 text-sm text-brand-crimson">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-7">{product.useCase}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.disciplines.map((d) => (
            <span key={d} className="text-xs uppercase tracking-wide text-brand-text-body/70">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-6 divide-y divide-brand-border border border-brand-border">
          {product.specs.slice(0, 3).map((spec) => (
            <div key={spec.label} className="grid grid-cols-2 px-4 py-2 text-sm">
              <span>{spec.label}</span>
              <span className="text-brand-text-primary">{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
          {product.status === "available" ? (
            <Button asChild variant="cta" size="sm" className="flex-1">
              <Link href={`/contact?intent=quote&product=${product.slug}`}>Request Quote</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary" size="sm" className="flex-1">
              <Link href="/contact?intent=notify">Notify Me</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
