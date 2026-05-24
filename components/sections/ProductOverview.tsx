"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { products } from "@/lib/products";

export default function ProductOverview() {
  const featured = products.slice(0, 4);

  return (
    <section className="border-t border-brand-border bg-brand-deep py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent">Product range</p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-white">Electronic target systems</h2>
          </div>
          <Link href="/products" className="font-heading text-sm font-semibold text-brand-accent hover:underline">
            View all products →
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {featured.map((product) => (
            <motion.div key={product.slug} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
