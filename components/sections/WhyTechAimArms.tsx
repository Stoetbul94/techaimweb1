"use client";

import { motion } from "framer-motion";
import { BarChart3, Layers, Shield, Target } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const pillars = [
  {
    icon: Target,
    title: "Precision",
    description: "Competition-grade accuracy with sub-millimetre coordinate measurement on every shot.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Engineered for continuous operation in training and match environments, indoors and out.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Advanced performance insights — heat maps, grouping analysis, trends and session history.",
  },
  {
    icon: Layers,
    title: "Integration",
    description: "REST API, WebSocket feeds and cloud sync connect your entire range infrastructure.",
  },
];

export default function WhyTechAimArms() {
  return (
    <section className="bg-brand-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-accent">Why TECH AIM ARMS</p>
        <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-white">
          Built for performance, not just scoring
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group border border-brand-border bg-brand-panel p-6 transition-colors hover:border-brand-accent/50"
            >
              <pillar.icon className="h-8 w-8 text-brand-accent transition-transform group-hover:scale-110" />
              <h3 className="mt-5 font-heading text-xl font-bold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
