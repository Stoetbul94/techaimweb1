"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { fadeUp } from "@/lib/motion";
import { computeStats, demoShots } from "@/lib/analytics-demo-data";

const HeatmapChart = dynamic(() => import("@/components/analytics/HeatmapChart"), { ssr: false });
const TrendChart = dynamic(() => import("@/components/analytics/TrendChart"), { ssr: false });

export default function AnalyticsShowcase() {
  const stats = computeStats(demoShots);

  return (
    <section className="bg-brand-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent">Analytics platform</p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-white">
            Turn every shot into actionable data
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8">
            Heat maps, grouping analysis, trend tracking and competition statistics — all in real time.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="border border-brand-border bg-brand-panel p-6">
            <h3 className="font-heading text-lg font-semibold text-white">Shot Grouping</h3>
            <HeatmapChart shots={demoShots} />
          </div>
          <div className="border border-brand-border bg-brand-panel p-6">
            <h3 className="font-heading text-lg font-semibold text-white">Score Trend</h3>
            <TrendChart />
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-brand-border pt-6">
              <div>
                <p className="font-mono text-xs text-brand-accent">Mean Radius</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">{stats.meanRadius.toFixed(2)}mm</p>
              </div>
              <div>
                <p className="font-mono text-xs text-brand-accent">Extreme Spread</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">{stats.extremeSpread.toFixed(2)}mm</p>
              </div>
              <div>
                <p className="font-mono text-xs text-brand-accent">Avg Score</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">{stats.averageScore.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/analytics" className="inline-block bg-brand-accent px-8 py-3 font-heading text-sm font-semibold text-[#050505]">
            Explore Analytics Platform
          </Link>
        </div>
      </div>
    </section>
  );
}
