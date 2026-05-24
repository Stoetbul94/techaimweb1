import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-heading text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-crimson px-8 py-3 text-brand-text-primary hover:bg-brand-crimson/90",
        outline:
          "border border-brand-crimson px-8 py-3 text-brand-crimson hover:bg-brand-crimson hover:text-brand-text-primary",
        ghost: "text-brand-text-body hover:text-brand-text-primary",
        cta: "bg-brand-crimson px-8 py-3 text-brand-text-primary hover:bg-brand-crimson/90",
        secondary:
          "border border-brand-text-primary px-8 py-3 text-brand-text-primary hover:bg-brand-text-primary hover:text-brand-bg",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-5 py-2.5 text-xs",
        lg: "px-10 py-4 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
