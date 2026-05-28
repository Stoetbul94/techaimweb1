import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demonstration, request a quotation or contact the TECH AIM engineering team.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
