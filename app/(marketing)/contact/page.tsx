import ContactPageClient from "./ContactPageClient";
import { buildStaticPageMetadata } from "@/lib/seo-config";

export const metadata = buildStaticPageMetadata("/contact");

export default function ContactPage() {
  return <ContactPageClient />;
}
