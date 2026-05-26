"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { submitSupportTicket } from "@/app/actions/support";

const faqs = [
  { q: "How quickly are shots detected?", a: "Shots are registered in under 2ms with competition-grade accuracy on all approved systems." },
  { q: "Is the system ISSF approved?", a: "No. TechAim systems are designed for ISSF-aligned training workflows, but formal ISSF approval is not currently claimed." },
  { q: "Can I integrate with third-party software?", a: "Yes. Our REST API and WebSocket feeds allow integration with range management and scoring systems." },
  { q: "What network requirements are needed?", a: "Ethernet is recommended for outdoor ranges. Bluetooth is supported for indoor 10m lanes via the control hub." },
  { q: "How do I update firmware?", a: "Download the latest firmware from the Downloads page and follow the update guide in the user manual." },
];

export default function SupportHub() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    const result = await submitSupportTicket(formData);
    setStatus(result.success ? "success" : "error");
  }

  return (
    <div className="space-y-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Knowledge Base", href: "#faq" },
          { label: "Firmware Downloads", href: "/downloads?category=firmware" },
          { label: "Video Tutorials", href: "#tutorials" },
          { label: "System Status", href: "#status" },
        ].map((link) => (
          <a key={link.label} href={link.href} className="border border-brand-border bg-brand-panel p-5 transition hover:border-brand-crimson">
            <p className="font-heading font-semibold text-brand-text-primary">{link.label}</p>
          </a>
        ))}
      </div>

      <div id="status" className="border border-brand-border bg-brand-panel p-6">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary">System Status</h2>
        <div className="mt-4 space-y-3">
          {["Cloud Sync", "API", "Documentation Portal"].map((service) => (
            <div key={service} className="flex items-center justify-between border-b border-brand-border pb-3">
              <span>{service}</span>
              <span className="flex items-center gap-2 font-mono text-xs text-brand-success">
                <span className="h-2 w-2 rounded-full bg-brand-success" />
                Operational
              </span>
            </div>
          ))}
        </div>
      </div>

      <div id="faq">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary">FAQ</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div id="tutorials">
        <h2 className="font-heading text-2xl font-bold text-brand-text-primary">Video Tutorials</h2>
        <p className="mt-3 text-sm">Installation, calibration and software setup guides — coming soon.</p>
      </div>

      <div className="border border-brand-border bg-brand-panel p-6">
        <h2 className="font-heading text-xl font-bold text-brand-text-primary">Submit Support Ticket</h2>
        <form action={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder="Full name" required aria-label="Full name" />
          <Input name="email" type="email" placeholder="Email" required aria-label="Email" />
          <Input name="company" placeholder="Company / Club" className="md:col-span-2" aria-label="Company" />
          <Input name="subject" placeholder="Subject" required className="md:col-span-2" aria-label="Subject" />
          <textarea
            name="message"
            placeholder="Describe your issue"
            required
            rows={5}
            className="md:col-span-2 border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-crimson"
            aria-label="Message"
          />
          <button type="submit" className="bg-brand-crimson px-8 py-3 font-heading text-sm font-semibold text-brand-text-primary md:col-span-2">
            Submit Ticket
          </button>
        </form>
        {status === "success" && <p className="mt-4 text-sm text-brand-success">Ticket submitted successfully. We will respond within 1 business day.</p>}
        {status === "error" && <p className="mt-4 text-sm text-brand-signal">Something went wrong. Please try again or contact us via WhatsApp.</p>}
      </div>
    </div>
  );
}
