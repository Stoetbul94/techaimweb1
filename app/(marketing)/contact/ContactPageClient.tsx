"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CalendarDays, Mail, MapPin, MessageCircle } from "lucide-react";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import { submitContactForm } from "@/app/actions/contact";
import { contactEmail, whatsappLink } from "@/lib/contact";

const interests = ["Match 10", "Match 50", "Future Systems", "Range Consultation", "Software Demo", "API Access"];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent") ?? "";
  const product = searchParams.get("product") ?? "";
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    formData.set("intent", intent);
    if (product) formData.set("product", product);
    const result = await submitContactForm(formData);
    setStatus(result.success ? "success" : "error");
  }

  const intentLabel =
    intent === "demo" ? "Book a Demonstration" : intent === "quote" ? "Request a Quotation" : intent === "engineering" ? "Contact Engineering" : "Get In Touch";

  return (
    <>
      <PageHero eyebrow="Contact" title={intentLabel} description="Book a demo, request a quotation or speak with our engineering team." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form action={handleSubmit} className="border border-brand-border bg-brand-panel p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-brand-text-primary">
                Full Name
                <input className="mt-2 w-full border border-brand-border bg-brand-bg px-4 py-3 text-brand-text-primary outline-none focus:border-brand-crimson" name="name" required />
              </label>
              <label className="text-sm text-brand-text-primary">
                Company / Club / Range
                <input className="mt-2 w-full border border-brand-border bg-brand-bg px-4 py-3 text-brand-text-primary outline-none focus:border-brand-crimson" name="company" />
              </label>
              <label className="text-sm text-brand-text-primary">
                Email
                <input type="email" className="mt-2 w-full border border-brand-border bg-brand-bg px-4 py-3 text-brand-text-primary outline-none focus:border-brand-crimson" name="email" required />
              </label>
              <label className="text-sm text-brand-text-primary">
                Phone
                <input className="mt-2 w-full border border-brand-border bg-brand-bg px-4 py-3 text-brand-text-primary outline-none focus:border-brand-crimson" name="phone" />
              </label>
              <label className="text-sm text-brand-text-primary md:col-span-2">
                Message
                <textarea className="mt-2 min-h-32 w-full border border-brand-border bg-brand-bg px-4 py-3 text-brand-text-primary outline-none focus:border-brand-crimson" name="message" required />
              </label>
            </div>
            <fieldset className="mt-6">
              <legend className="text-sm text-brand-text-primary">I&apos;m interested in:</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center gap-3 text-sm">
                    <input type="checkbox" name="interest" value={interest} className="h-4 w-4 accent-brand-crimson" />
                    {interest}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="mt-8 bg-brand-crimson px-8 py-3 font-heading text-sm font-semibold text-brand-text-primary">
              Send Message
            </button>
            {status === "success" && <p className="mt-4 text-sm text-brand-success">Message sent. We will respond within 1 business day.</p>}
          </form>
          <div className="space-y-5">
            <a href={whatsappLink("Hi, I'm interested in TECH AIM ARMS")} target="_blank" rel="noopener noreferrer" className="block border border-[#25D366]/60 bg-brand-panel p-6">
              <MessageCircle className="text-[#25D366]" size={34} />
              <h2 className="mt-4 font-heading text-2xl font-bold text-brand-text-primary">Chat on WhatsApp</h2>
              <p className="mt-2">Get a response within 1 business day.</p>
            </a>
            <div className="border border-brand-border bg-brand-panel p-6">
              <Mail className="text-brand-crimson" />
              <p className="mt-3 text-brand-text-primary">{contactEmail}</p>
            </div>
            <div className="border border-brand-border bg-brand-panel p-6">
              <MapPin className="text-brand-crimson" />
              <p className="mt-3 text-brand-text-primary">South Africa</p>
            </div>
          </div>
        </div>
        <section className="mt-12 border-l-4 border-brand-crimson bg-brand-panel p-6 md:p-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-brand-crimson" />
            <h2 className="font-heading text-3xl font-bold text-brand-text-primary">Book a Demo</h2>
          </div>
          <p className="mt-3 text-sm">Prefer WhatsApp? Use the button above for the fastest response.</p>
        </section>
      </section>
    </>
  );
}

export default function ContactPageClient() {
  return (
    <main className="bg-brand-bg">
      <Suspense fallback={<p className="p-20 text-center">Loading...</p>}>
        <ContactFormInner />
      </Suspense>
      <ConversionStrip />
    </main>
  );
}
