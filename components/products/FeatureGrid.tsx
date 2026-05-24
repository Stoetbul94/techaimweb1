import type { ProductFeature } from "@/lib/products";
import { CheckCircle2 } from "lucide-react";

interface FeatureGridProps {
  features: ProductFeature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title} className="border border-brand-border bg-brand-surface/40 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-crimson" />
            <div>
              <h4 className="font-heading font-semibold text-brand-text-primary">{feature.title}</h4>
              <p className="mt-2 text-sm leading-7">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
