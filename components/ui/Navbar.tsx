"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/ui/BrandLogo";
import { BRAND_NAME } from "@/lib/brand";
import { whatsappLink } from "@/lib/contact";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/software", label: "Software" },
  { href: "/analytics", label: "Analytics" },
  { href: "/downloads", label: "Downloads" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 80], ["rgba(5,5,5,0)", "rgba(5,5,5,0.92)"]);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed left-0 top-0 z-50 w-full border-b border-white/5 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <div className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2 font-body text-[12px] uppercase tracking-[0.08em] text-brand-text-body transition hover:text-brand-text-primary"
              >
                {link.label}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-px bg-brand-crimson" />
                )}
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-brand-crimson transition group-hover:scale-x-100" />
              </Link>
            );
          })}
          <Link
            href="/developers"
            className="py-2 font-body text-[12px] uppercase tracking-[0.08em] text-brand-crimson transition hover:text-brand-crimson"
          >
            API
          </Link>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact?intent=demo"
            className="border border-brand-crimson px-5 py-2.5 font-heading text-sm font-semibold text-brand-crimson transition hover:bg-brand-crimson hover:text-brand-text-primary"
          >
            Book a Demo
          </Link>
          <Link
            href={whatsappLink(`Hi, I'm interested in ${BRAND_NAME} systems`)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 place-items-center bg-brand-crimson text-brand-text-primary transition hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={20} />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center border border-brand-border text-brand-text-primary xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto bg-brand-panel px-6 py-8 xl:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl font-semibold text-brand-text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/developers" onClick={() => setOpen(false)} className="font-heading text-2xl font-semibold text-brand-crimson">
                Developers / API
              </Link>
              <Link
                href="/contact?intent=demo"
                onClick={() => setOpen(false)}
                className="mt-3 bg-brand-crimson px-5 py-3 text-center font-heading font-semibold text-brand-text-primary"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
