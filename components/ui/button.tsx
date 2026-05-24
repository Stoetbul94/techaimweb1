import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-heading text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-accent px-8 py-3 text-[#050505] hover:bg-brand-accent/90",
        outline: "border border-brand-accent px-8 py-3 text-brand-accent hover:bg-brand-accent hover:text-[#050505]",
        ghost: "text-brand-text hover:text-white",
        cta: "bg-brand-cta px-8 py-3 text-white hover:bg-brand-cta/90",
        secondary: "border border-white px-8 py-3 text-white hover:bg-white hover:text-black",
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
