"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Crosshair, Radio, Target } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const steps = [
  { icon: Target, label: "Shot Impact", desc: "Projectile contacts electronic target surface" },
  { icon: Radio, label: "Sensor Detection", desc: "Instant shot registration with sub-ms latency" },
  { icon: Crosshair, label: "Coordinate Calculation", desc: "Precise X/Y position computed in real time" },
  { icon: BarChart3, label: "Analytics Engine", desc: "Grouping, trends and performance metrics processed" },
  { icon: Activity, label: "Live Display", desc: "Scores and insights delivered to athletes and coaches" },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-brand-border bg-brand-deep py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent">How it works</p>
        <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-white">
          From impact to insight in milliseconds
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 flex flex-col gap-0 lg:flex-row lg:items-stretch lg:gap-0"
        >
          {steps.map((step, i) => (
            <motion.div key={step.label} variants={fadeUp} className="relative flex flex-1 flex-col items-center lg:px-4">
              {i < steps.length - 1 && (
                <motion.div className="absolute left-1/2 top-12 hidden h-px w-full bg-gradient-to-r from-brand-accent/50 to-transparent lg:block" />
              )}
              <div className="relative z-10 grid h-16 w-16 place-items-center border border-brand-accent bg-brand-panel">
                <step.icon className="h-7 w-7 text-brand-accent" />
              </div>
              {i < steps.length - 1 && (
                <div className="my-2 h-8 w-px bg-brand-border lg:hidden" aria-hidden="true" />
              )}
              <h3 className="mt-6 text-center font-heading text-lg font-semibold text-white">{step.label}</h3>
              <p className="mt-2 max-w-[200px] text-center text-sm leading-6">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
