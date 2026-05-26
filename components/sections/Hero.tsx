"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { fadeUp } from "@/lib/motion";

const BulletHeroScene = dynamic(() => import("@/components/three/BulletHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[430px] place-items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand-border border-t-brand-crimson" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-brand-bg"
      style={{ overflowX: "clip" }}
    >
      {/* background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(168,0,56,0.08),transparent_34%)]" />
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,32,48,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 pt-28 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        {/* left column: text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="relative z-20 w-full min-w-0 max-w-[21.5rem] sm:max-w-3xl"
        >
          <motion.p variants={fadeUp} className="font-body text-[11px] uppercase tracking-[0.2em] text-brand-crimson">
            Precision measurement platform
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-full font-heading text-[2.35rem] font-bold leading-[1.02] text-brand-text-primary sm:text-[clamp(2.75rem,7vw,5.5rem)] sm:leading-[0.98]"
          >
            <span className="block">Precision</span>
            <span className="block">Electronic</span>
            <span className="block">Target Systems</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-full text-base leading-7 text-brand-text-body sm:max-w-xl sm:text-lg sm:leading-8">
            Competition-grade shot detection, advanced analytics and instant feedback engineered for modern shooting
            sports.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="bg-brand-crimson px-8 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary"
            >
              Explore Products
            </Link>
            <Link
              href="/analytics"
              className="border border-white px-8 py-3 text-center font-heading text-sm font-semibold text-brand-text-primary transition hover:bg-white hover:text-black"
            >
              View Analytics Platform
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 max-w-full font-mono text-xs leading-5 text-brand-text-muted">
            Shot Detected → Measured → Analysed → Visualised → Improved Performance
          </motion.p>
        </motion.div>

        {/* right column: cinematic scene */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10 overflow-visible md:relative md:z-10 lg:min-h-[560px]"
        >
          <BulletHeroScene />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-brand-crimson"
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
}
