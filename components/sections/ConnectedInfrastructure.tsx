"use client";

import { motion } from "framer-motion";
import { BarChart2, Monitor, Server, Tablet, Target, Wifi } from "lucide-react";

const nodes = [
  { label: "Electronic Target", Icon: Target },
  { label: "Communication Network", Icon: Wifi },
  { label: "Control Infrastructure", Icon: Server },
  { label: "Athlete Tablet", Icon: Tablet },
  { label: "Live Scoring", Icon: BarChart2 },
  { label: "Spectator Display", Icon: Monitor },
];

const stats = [
  ["< 2ms", "Scoring latency"],
  ["0.001mm", "MPI precision"],
  ["ISSF Approved", "Certification standard"],
];

export default function ConnectedInfrastructure() {
  return (
    <section className="bg-brand-bg py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <h2 className="font-heading text-4xl font-bold text-white">Connected Range Infrastructure</h2>
          <p className="mt-4 text-lg leading-8">
            Every shot travels through a low-latency scoring chain built for clubs, federations, and
            modern competitive ranges.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-6 lg:items-center">
          {nodes.map(({ label, Icon }, index) => (
            <div key={label} className="relative">
              <div className="border border-brand-cyan bg-brand-panel p-5 text-center">
                <Icon className="mx-auto text-brand-cyan" size={28} />
                <p className="mt-4 min-h-10 text-sm">{label}</p>
              </div>
              {index < nodes.length - 1 && (
                <svg
                  className="absolute -right-4 top-1/2 hidden h-4 w-8 -translate-y-1/2 lg:block"
                  viewBox="0 0 32 16"
                >
                  <path
                    d="M0 8h30"
                    stroke="#00C8FF"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    style={{ animation: "dash-flow 1.2s linear infinite" }}
                  />
                  <path d="M24 2l6 6-6 6" stroke="#00C8FF" fill="none" strokeWidth="2" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={value} className="border border-brand-border bg-brand-panel p-6">
              <p className="font-heading text-3xl font-bold text-brand-cyan">{value}</p>
              <p className="mt-2 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
