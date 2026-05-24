import type { ProductSpec } from "@/lib/products";

interface SpecTableProps {
  specs: ProductSpec[];
  title?: string;
}

export default function SpecTable({ specs, title = "Specifications" }: SpecTableProps) {
  return (
    <div>
      <h3 className="font-heading text-xl font-bold text-brand-text-primary">{title}</h3>
      <div className="mt-4 divide-y divide-brand-border border border-brand-border">
        {specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-2 px-4 py-3 text-sm md:grid-cols-[1fr_2fr]">
            <span className="text-brand-text-body">{spec.label}</span>
            <span className="text-brand-text-primary">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
