import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, className, children }: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-brand-border bg-[radial-gradient(circle_at_80%_20%,rgba(168,0,56,0.09),transparent_32%)] pt-20",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="font-body text-[11px] uppercase tracking-[0.22em] text-brand-crimson">{eyebrow}</p>
        )}
        <h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.02] text-brand-text-primary">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-8">{description}</p>}
        {children}
      </div>
    </section>
  );
}
