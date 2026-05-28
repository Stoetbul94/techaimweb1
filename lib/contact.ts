export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "arnoldbailie6@gmail.com";
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27845173783";

import { BRAND_NAME } from "@/lib/brand";

export function whatsappLink(message = `Hi, I'm interested in ${BRAND_NAME} systems`) {
  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
}
