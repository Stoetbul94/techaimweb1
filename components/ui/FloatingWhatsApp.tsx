"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <Link
      href={whatsappLink()}
      aria-label="Chat with TECH AIM ARMS on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_24px_rgba(37,211,102,0.35)] transition hover:scale-105"
      style={{ animation: "pulse-ring 2.4s infinite" }}
    >
      <MessageCircle size={25} />
    </Link>
  );
}
