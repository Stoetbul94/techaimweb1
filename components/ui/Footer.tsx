import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { contactEmail, whatsappLink } from "@/lib/contact";
import { products } from "@/lib/products";

const company = [
  { href: "/about", label: "About" },
  { href: "/analytics", label: "Analytics" },
  { href: "/developers", label: "Developers / API" },
  { href: "/news", label: "News / ISSF" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-brand-crimson bg-brand-elevated">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-xl font-bold text-brand-text-primary lg:text-2xl">
              TECH<span className="text-brand-crimson"> AIM</span> ARMS
            </Link>
            <p className="mt-4 text-sm text-brand-text-primary">
              Precision Measurement and Performance Analytics Platform for Shooting Sports
            </p>
            <p className="mt-3 text-sm text-brand-text-muted">Engineered for competition-grade accuracy</p>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-brand-text-primary">Products</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="transition hover:text-brand-crimson">
                  {product.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-brand-text-primary">Company</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              {company.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-brand-crimson">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-brand-text-primary">Contact</h3>
            <Link
              href={whatsappLink("Hi, I'm interested in TECH AIM ARMS")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-brand-crimson px-5 py-3 font-heading text-sm font-semibold text-brand-text-primary"
            >
              <MessageCircle size={17} />
              WhatsApp
            </Link>
            <p className="mt-5 text-sm">{contactEmail}</p>
            <p className="mt-2 text-sm">South Africa</p>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-border pt-6 text-sm text-brand-text-muted/90 md:flex md:items-center md:justify-between">
          <p>Copyright 2026 TECH AIM ARMS. All rights reserved.</p>
          <p className="mt-3 text-brand-crimson md:mt-0">ISSF Approved Electronic Scoring</p>
        </div>
      </div>
    </footer>
  );
}
