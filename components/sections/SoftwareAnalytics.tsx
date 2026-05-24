"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Live scoring display",
  "MPI analysis",
  "Shot grouping analysis",
  "Timing analytics",
  "Athlete progression reporting",
];

export default function SoftwareAnalytics() {
  return (
    <section className="bg-brand-bg py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
      >
        <div>
          <h2 className="font-heading text-4xl font-bold text-brand-text-primary">Software & Analytics Platform</h2>
          <p className="mt-5 text-lg leading-8">
            Competition control, athlete insight, and spectator-ready scoring live in one coherent
            telemetry layer.
          </p>
          <div className="mt-8 space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-brand-text-primary">
                <CheckCircle2 size={20} className="text-brand-crimson" />
                {feature}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-brand-border bg-brand-panel p-5">
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <p className="font-heading font-semibold text-brand-text-primary">Session Analytics</p>
            <p className="text-sm text-brand-telemetry">LIVE</p>
          </div>
          <svg viewBox="0 0 520 190" className="mt-7 h-48 w-full">
            <path d="M20 150C80 118 118 132 160 104S230 76 280 92s77 35 112-5 66-48 108-34" fill="none" stroke="#3B82F6" strokeWidth="4" />
            <path d="M20 160h480M20 120h480M20 80h480M20 40h480" stroke="#333333" />
          </svg>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="border border-brand-border bg-brand-bg p-4">
              <p className="text-xs uppercase tracking-[0.18em]">Avg</p>
              <p className="mt-2 font-heading text-2xl text-brand-text-primary">10.1</p>
            </div>
            <div className="border border-brand-border bg-brand-bg p-4">
              <p className="text-xs uppercase tracking-[0.18em]">Group</p>
              <p className="mt-2 font-heading text-2xl text-brand-text-primary">18mm</p>
            </div>
            <svg viewBox="0 0 110 110" className="mx-auto h-28">
              {[48, 34, 20, 8].map((r) => (
                <circle key={r} cx="55" cy="55" r={r} fill="none" stroke="#333333" />
              ))}
              <circle cx="59" cy="51" r="3" fill="#3B82F6" />
              <circle cx="51" cy="58" r="3" fill="#3B82F6" />
              <circle cx="61" cy="61" r="3" fill="#3B82F6" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
