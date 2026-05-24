"use client";

import { motion } from "framer-motion";

const shots = [
  { x: 50, y: 48, score: "10.4", delay: 0.4 },
  { x: 53, y: 51, score: "10.1", delay: 0.8 },
  { x: 47, y: 52, score: "10.3", delay: 1.2 },
  { x: 51, y: 45, score: "10.6", delay: 1.6 },
  { x: 55, y: 47, score: "10.0", delay: 2.0 },
  { x: 49, y: 55, score: "10.2", delay: 2.4 },
];

export default function ShotGroupingSimulator() {
  return (
    <section className="overflow-hidden bg-brand-bg py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
        >
          <p className="font-body text-xs uppercase tracking-[0.22em] text-brand-crimson">
            Shot grouping simulator
          </p>
          <h2 className="mt-5 font-heading text-4xl font-bold text-brand-text-primary md:text-5xl">
            See every group take shape in real time.
          </h2>
          <p className="mt-6 text-lg leading-8">
            TechAim turns each shot into immediate scoring data, grouping feedback, and MPI movement
            that coaches and athletes can act on while the session is still live.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["10.27", "Average score"],
              ["14mm", "Group diameter"],
              ["1.8mm", "MPI offset"],
            ].map(([value, label]) => (
              <div key={label} className="border border-brand-border bg-brand-panel p-4">
                <p className="font-heading text-2xl font-bold text-brand-telemetry">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: 10, y: 32 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[430px] border border-brand-border bg-[#080A0F] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-6"
          style={{ perspective: "900px" }}
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <div>
              <p className="font-heading text-lg font-semibold text-brand-text-primary">Live Group Analysis</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-text-body">Target lane 04</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-text-primary">
              <span className="h-2 w-2 rounded-full bg-brand-signal" />
              LIVE
            </div>
          </div>

          <div className="relative mx-auto mt-8 aspect-square w-full max-w-[360px]">
            <motion.div
              className="absolute inset-0"
              animate={{ rotateY: [-8, 8, -8], rotateX: [7, 3, 7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_35px_rgba(0,200,255,0.14)]">
                <defs>
                  <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A80038" stopOpacity="0.18" />
                    <stop offset="48%" stopColor="#111111" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#050505" stopOpacity="1" />
                  </radialGradient>
                </defs>
                <rect x="1" y="1" width="98" height="98" fill="url(#targetGlow)" stroke="#333333" />
                {[44, 36, 28, 20, 12, 5].map((radius) => (
                  <circle
                    key={radius}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={radius <= 12 ? "#BF1919" : "#333333"}
                    strokeWidth={radius === 5 ? 0.7 : 0.45}
                    opacity={radius <= 12 ? 0.9 : 1}
                  />
                ))}
                <path d="M50 4v92M4 50h92" stroke="#333333" strokeWidth="0.45" />
                <motion.circle
                  cx="50.8"
                  cy="49.6"
                  r="7.4"
                  fill="none"
                  stroke="#A80038"
                  strokeWidth="0.8"
                  strokeDasharray="2 1.6"
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.8, duration: 0.6 }}
                />
                {shots.map((shot, index) => (
                  <motion.g key={`${shot.x}-${shot.y}`}>
                    <motion.circle
                      cx={shot.x}
                      cy={shot.y}
                      r="1.45"
                      fill="#A80038"
                      initial={{ opacity: 0, scale: 2.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: shot.delay, duration: 0.28 }}
                    />
                    <motion.circle
                      cx={shot.x}
                      cy={shot.y}
                      r="4"
                      fill="none"
                      stroke="#A80038"
                      initial={{ opacity: 0.75, scale: 0.2 }}
                      whileInView={{ opacity: 0, scale: 1.5 }}
                      viewport={{ once: true }}
                      transition={{ delay: shot.delay, duration: 0.75 }}
                    />
                    <motion.text
                      x={shot.x + 3}
                      y={shot.y - 2}
                      fill="#8B919A"
                      fontSize="3"
                      initial={{ opacity: 0, y: 2 }}
                      whileInView={{ opacity: index > 2 ? 1 : 0.65, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: shot.delay + 0.15 }}
                    >
                      {shot.score}
                    </motion.text>
                  </motion.g>
                ))}
              </svg>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Shot 06", "10.2"],
              ["Group", "Tight"],
              ["Trend", "+0.4"],
            ].map(([label, value]) => (
              <div key={label} className="border border-brand-border bg-brand-bg p-3">
                <p className="text-[10px] uppercase tracking-[0.18em]">{label}</p>
                <p className="mt-1 font-heading text-xl font-bold text-brand-text-primary">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
