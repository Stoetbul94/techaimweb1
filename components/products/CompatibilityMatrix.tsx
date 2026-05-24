import type { ProductSpec } from "@/lib/products";

interface CompatibilityMatrixProps {
  items: ProductSpec[];
}

export default function CompatibilityMatrix({ items }: CompatibilityMatrixProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="border border-brand-border bg-brand-panel p-4">
          <p className="text-xs uppercase tracking-wide text-brand-accent">{item.label}</p>
          <p className="mt-2 font-mono text-sm text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
