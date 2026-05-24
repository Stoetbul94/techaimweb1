"use client";

import { cn } from "@/lib/utils";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface StickySectionNavProps {
  items: SectionNavItem[];
  activeId?: string;
  className?: string;
}

export default function StickySectionNav({ items, activeId, className }: StickySectionNavProps) {
  return (
    <nav className={cn("sticky top-24 hidden lg:block", className)} aria-label="Page sections">
      <ul className="space-y-1 border-l border-brand-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-2 pl-4 font-body text-xs uppercase tracking-[0.08em] transition",
                activeId === item.id
                  ? "border-brand-crimson text-brand-crimson"
                  : "border-transparent text-brand-text-body hover:border-brand-border hover:text-brand-text-primary",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
