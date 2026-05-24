"use client";

import { motion } from "framer-motion";
import { Cpu, Network, ShieldCheck } from "lucide-react";

const pillars = [
  ["Electronic Target Array", Cpu, "Optical sensing and tuned target arrays provide sub-millimetre scoring accuracy with durable range hardware.", ["Sub-millimetre accuracy", "Competition-grade calibration"]],
  ["Communication Network", Network, "Low-latency wired and wireless transmission keeps every firing point synchronized with control and display layers.", ["< 2ms scoring latency", "Bluetooth + Ethernet"]],
  ["Scoring Software", ShieldCheck, "Cross-platform software handles live scoring, analytics, and ISSF-aligned match workflows.", ["ISSF workflows", "Cloud-ready reporting"]],
];

export default function TechnologyPage() {
  return (
    <main className="bg-brand-bg pt-20">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-brand-cyan">Telemetry core</p>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-bold text-white md:text-7xl">
            The Technology Inside TechAim
          </h1>
        </motion.div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map(([title, Icon, body, specs]) => {
            const IconComponent = Icon as typeof Cpu;
            return (
              <motion.article
                key={title as string}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-brand-border bg-brand-panel p-6"
              >
                <IconComponent className="text-brand-cyan" size={32} />
                <h2 className="mt-5 font-heading text-2xl font-bold text-white">{title as string}</h2>
                <p className="mt-4 leading-7">{body as string}</p>
                <ul className="mt-5 space-y-2 text-sm text-brand-cyan">
                  {(specs as string[]).map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 grid gap-8 border border-brand-border bg-brand-panel p-8 lg:grid-cols-[1fr_260px]">
          <div>
            <h2 className="font-heading text-4xl font-bold text-white">Built for Olympic Standards</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8">
              ISSF approval signals that a target system has been tested for accuracy, consistency,
              scoring integrity, and competition-readiness. For buyers, it turns precision from a claim
              into an operational standard.
            </p>
          </div>
          <svg viewBox="0 0 220 220" className="mx-auto h-56">
            <circle cx="110" cy="110" r="94" fill="#0A0C10" stroke="#00C8FF" strokeWidth="3" />
            <circle cx="110" cy="110" r="66" fill="none" stroke="#2A3040" />
            <text x="110" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontWeight="700">ISSF</text>
            <text x="110" y="130" textAnchor="middle" fill="#00C8FF" fontSize="16">APPROVED</text>
          </svg>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 overflow-x-auto">
          <h2 className="font-heading text-4xl font-bold text-white">TechAim vs Traditional Scoring</h2>
          <table className="mt-8 w-full min-w-[760px] border-collapse border border-brand-border text-left">
            <thead className="bg-brand-panel text-white">
              <tr>
                {["Feature", "Traditional Paper", "Electronic (Generic)", "TechAim"].map((heading) => (
                  <th key={heading} className="border border-brand-border p-4">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Accuracy", "Response Time", "Data Analytics", "Remote Monitoring", "Upgrade Path", "Support"].map((feature) => (
                <tr key={feature}>
                  <td className="border border-brand-border p-4 text-white">{feature}</td>
                  <td className="border border-brand-border p-4">Limited</td>
                  <td className="border border-brand-border p-4">Available</td>
                  <td className="border border-brand-border p-4 text-brand-cyan">Optimized</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>
        <section className="mt-16 py-14 text-center">
          <p className="mx-auto max-w-4xl font-heading text-3xl leading-tight text-white">
            Engineered to the same exacting standards as the instruments that define precision
            industries worldwide.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em]">
            Porsche precision · Garmin telemetry · Leica engineering · Siemens industrial
          </p>
        </section>
      </section>
    </main>
  );
}
