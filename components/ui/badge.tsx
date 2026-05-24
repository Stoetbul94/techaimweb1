import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-brand-crimson/15 text-brand-crimson",
        signal: "bg-brand-signal text-brand-text-primary",
        outline: "border border-brand-border text-brand-text-body",
        telemetry: "bg-brand-telemetry/15 text-brand-telemetry",
        success: "bg-brand-success/15 text-brand-success",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
