export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "arnoldbailie6@gmail.com";
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27845173783";

export function whatsappLink(message = "Hi, I'm interested in TECH AIM ARMS systems") {
  return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
}
