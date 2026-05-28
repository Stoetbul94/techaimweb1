import Link from "next/link";
import { whatsappLink } from "@/lib/contact";

interface ConversionStripProps {
  title?: string;
  description?: string;
}

export default function ConversionStrip({
  title = "Ready to transform your range?",
  description = "Book a demonstration, request a quotation, or speak directly with our engineering team.",
}: ConversionStripProps) {
  return (
    <section className="border-t border-brand-border bg-brand-elevated py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border border-brand-border bg-brand-panel p-8 md:p-12">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-crimson">Get started</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-brand-text-primary md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact?intent=demo"
              className="bg-brand-crimson px-8 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary"
            >
              Book Demonstration
            </Link>
            <Link
              href="/contact?intent=quote"
              className="bg-brand-crimson px-8 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary"
            >
              Request Quotation
            </Link>
            <Link
              href="/contact?intent=engineering"
              className="border border-white px-8 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary transition hover:bg-white hover:text-black"
            >
              Contact Engineering
            </Link>
            <Link
              href={whatsappLink("Hi, I'm interested in TECH AIM systems")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brand-crimson px-8 py-3 text-center font-heading text-sm font-semibold text-brand-crimson"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
