"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useMouseParallax } from "@/hooks/useMouseParallax";

/* ---------- floating particles (CSS-driven) ---------- */

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const PARTICLE_SEEDS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: seededRandom(i * 7 + 1) * 100,
  y: seededRandom(i * 13 + 3) * 100,
  size: 1 + seededRandom(i * 17 + 5) * 2,
  dur: 8 + seededRandom(i * 23 + 7) * 7,
  delay: seededRandom(i * 29 + 11) * -15,
  dx: -20 + seededRandom(i * 31 + 13) * 40,
  dy: -20 + seededRandom(i * 37 + 17) * 40,
}));

function Particles() {
  const dots = PARTICLE_SEEDS;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-brand-telemetry/20 animate-[float-particle_var(--dur)_ease-in-out_var(--delay)_infinite]"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            "--dur": `${d.dur}s`,
            "--delay": `${d.delay}s`,
            "--dx": `${d.dx}px`,
            "--dy": `${d.dy}px`,
            willChange: "transform",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ---------- scan sweep ---------- */

function ScanSweep() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] animate-[scan-sweep_4s_linear_infinite]"
      aria-hidden="true"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-telemetry/15 to-transparent" />
    </div>
  );
}

/* ---------- layered target SVG ---------- */

function LayeredTarget({
  centerRef,
  redRingRef,
  pulseRefs,
}: {
  centerRef: React.RefObject<SVGCircleElement | null>;
  redRingRef: React.RefObject<SVGCircleElement | null>;
  pulseRefs: React.MutableRefObject<SVGCircleElement[]>;
}) {
  return (
    <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" aria-label="Electronic scoring target">
      <defs>
        <radialGradient id="heroTargetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.92" />
          <stop offset="42%" stopColor="#BF1919" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <filter id="heroSoftBlue">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="heroBloom">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* outer atmosphere ring */}
      <circle cx="130" cy="130" r="152" fill="none" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.5" />
      <circle cx="130" cy="130" r="136" fill="none" stroke="#232323" strokeWidth="0.7" opacity="0.6" />

      {/* main target body */}
      <circle cx="130" cy="130" r="118" fill="rgba(0,0,0,0.46)" />

      {/* scoring rings */}
      {[112, 90, 68, 46].map((radius) => (
        <circle key={radius} cx="130" cy="130" r={radius} fill="none" stroke="#202633" strokeWidth="1" />
      ))}

      {/* core glow */}
      <motion.circle
        cx="130"
        cy="130"
        r="31"
        fill="url(#heroTargetGlow)"
        animate={{ opacity: [0.35, 0.62, 0.35], scale: [1, 1.035, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "130px 130px" }}
      />

      {/* bloom layer behind center */}
      <circle cx="130" cy="130" r="28" fill="#3B82F6" opacity="0.12" filter="url(#heroBloom)" />

      {/* signal red rings */}
      <circle ref={redRingRef} cx="130" cy="130" r="36" fill="none" stroke="#BF1919" strokeWidth="1.3" opacity="0.72" />
      <circle cx="130" cy="130" r="19" fill="none" stroke="#BF1919" strokeWidth="1" opacity="0.82" />

      {/* center impact dot */}
      <circle ref={centerRef} cx="130" cy="130" r="6" fill="#3B82F6" opacity="0.2" filter="url(#heroSoftBlue)" />

      {/* detection pulse rings */}
      {[0, 1, 2].map((index) => (
        <circle
          key={index}
          ref={(node) => {
            if (node) pulseRefs.current[index] = node;
          }}
          cx="130"
          cy="130"
          r="24"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1.5"
          opacity="0"
        />
      ))}

      {/* full-width crosshairs */}
      <path d="M130 0v260M0 130h260" stroke="#8B919A" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

/* ---------- main scene ---------- */

export default function BulletHeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const projectileRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<SVGCircleElement>(null);
  const redRingRef = useRef<SVGCircleElement>(null);
  const coordinateRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<SVGCircleElement[]>([]);
  const mouse = useMouseParallax();

  useEffect(() => {
    const scene = sceneRef.current;
    const projectile = projectileRef.current;
    const target = targetRef.current;
    const glow = glowRef.current;
    const center = centerRef.current;
    const redRing = redRingRef.current;
    const coordinate = coordinateRef.current;
    const analytics = analyticsRef.current;

    if (!scene || !projectile || !target || !glow || !center || !redRing || !coordinate || !analytics) return;

    const context = gsap.context(() => {
      const resetPulse = () => {
        pulseRefs.current.forEach((ring) => {
          gsap.set(ring, { scale: 0.35, opacity: 0, transformOrigin: "50% 50%" });
        });
      };

      const reset = () => {
        gsap.set(projectile, { x: 0, autoAlpha: 0, rotate: -2, scale: 0.96 });
        gsap.set(glow, { scale: 0.4, opacity: 0 });
        gsap.set(center, { attr: { r: 6 }, opacity: 0.2 });
        gsap.set(redRing, { opacity: 0.72, attr: { "stroke-width": 1.3 } });
        gsap.set([coordinate, analytics], { autoAlpha: 0, y: 12 });
        resetPulse();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reset();
        gsap.set(glow, { scale: 1, opacity: 0.6 });
        gsap.set(center, { attr: { r: 14 }, opacity: 0.85 });
        gsap.set(redRing, { opacity: 1, attr: { "stroke-width": 2 } });
        gsap.set([coordinate, analytics], { autoAlpha: 1, y: 0 });
        return;
      }

      reset();

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, defaults: { ease: "power2.out" } });

      /* 0.0s -- projectile fires */
      tl.set(projectile, { autoAlpha: 1 }, 0)
        .to(projectile, { x: "70vw", rotate: 1.5, duration: 1.0, ease: "power1.inOut" }, 0);

      /* 1.0s -- impact: glow expands, center brightens */
      tl.to(glow, { scale: 1.2, opacity: 0.7, duration: 0.5, ease: "power3.out" }, 1.0)
        .to(center, { attr: { r: 14 }, opacity: 0.85, duration: 0.45 }, 1.0)
        .to(redRing, { opacity: 1, attr: { "stroke-width": 2.2 }, duration: 0.45 }, 1.0);

      /* 1.5s -- projectile fades */
      tl.to(projectile, { autoAlpha: 0, scale: 0.72, duration: 0.18 }, 1.5);

      /* 1.6s -- detection rings expand */
      pulseRefs.current.forEach((ring, index) => {
        tl.fromTo(
          ring,
          { scale: 0.3, opacity: 0.75, transformOrigin: "50% 50%" },
          { scale: 3.5, opacity: 0, duration: 1.4, ease: "power2.out" },
          1.6 + index * 0.12,
        );
      });

      /* 1.8s -- coordinate readout */
      tl.to(coordinate, { autoAlpha: 1, y: 0, duration: 0.25 }, 1.8);

      /* 2.0s -- analytics panel */
      tl.to(analytics, { autoAlpha: 1, y: 0, duration: 0.35 }, 2.0);

      /* 4.5s -- begin fading telemetry */
      tl.to(coordinate, { autoAlpha: 0, y: -6, duration: 0.4 }, 4.5)
        .to(analytics, { autoAlpha: 0, y: -8, duration: 0.5 }, 4.5);

      /* 5.0s -- glow contracts */
      tl.to(glow, { scale: 0.4, opacity: 0, duration: 0.4 }, 5.0)
        .to(center, { attr: { r: 6 }, opacity: 0.2, duration: 0.35 }, 5.0)
        .to(redRing, { opacity: 0.72, attr: { "stroke-width": 1.3 }, duration: 0.35 }, 5.0);

      /* 5.5s -- full reset for seamless repeat at 6s */
      tl.call(reset, undefined, 5.5);
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative h-full w-full min-h-[360px] sm:min-h-[430px] lg:min-h-[560px]"
    >
      {/* L1: particles */}
      <Particles />

      {/* L2: scan sweep */}
      <ScanSweep />

      {/* L3: impact glow (behind target) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-[3] rounded-full"
        style={{
          width: 180,
          height: 180,
          right: "calc(50% - 90px + 8%)",
          top: "calc(50% - 90px - 3%)",
          boxShadow: "0 0 80px 40px rgba(59,130,246,0.3), 0 0 160px 80px rgba(59,130,246,0.1)",
          opacity: 0,
          transform: "scale(0.4)",
          willChange: "transform, opacity",
          translate: `${mouse.x * 3}px ${mouse.y * 3}px`,
        }}
        aria-hidden="true"
      />

      {/* L3: oversized target */}
      <div
        ref={targetRef}
        className="pointer-events-none absolute z-[2]
          w-[320px] h-[320px] right-[-6%] top-[10%] opacity-25
          md:w-[400px] md:h-[400px] md:right-[-4%] md:top-[2%] md:opacity-100
          lg:w-[520px] lg:h-[520px] lg:right-[-8%] lg:top-[-6%]"
        style={{
          willChange: "transform",
          transform: `translate3d(${mouse.x * 6}px, ${mouse.y * 6}px, 0)`,
        }}
        aria-hidden="true"
      >
        <LayeredTarget centerRef={centerRef} redRingRef={redRingRef} pulseRefs={pulseRefs} />
      </div>

      {/* projectile */}
      <div
        ref={projectileRef}
        className="pointer-events-none absolute left-[5%] top-[50%] z-[4] h-[10px] w-[34px] -translate-y-1/2 opacity-0
          md:left-[8%] md:top-[48%]"
        style={{ willChange: "transform, opacity" }}
        aria-hidden="true"
      >
        <span className="absolute left-[-96px] top-1/2 h-px w-28 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#f7c948]/20 to-[#f7c948]/70 blur-[0.5px]" />
        <span className="absolute inset-y-[2px] right-0 w-8 rounded-full bg-gradient-to-r from-[#6d5b2c] via-[#f7c948] to-[#f8f1c2] shadow-[0_0_14px_rgba(247,201,72,0.35)]" />
      </div>

      {/* L4: coordinate readout */}
      <div
        ref={coordinateRef}
        className="pointer-events-none absolute z-[4] hidden border border-brand-telemetry/30 bg-[rgba(17,17,17,0.75)] px-3 py-2 font-mono text-[10px] text-brand-telemetry opacity-0 backdrop-blur-md
          md:block md:right-[28%] md:top-[38%]
          lg:right-[24%] lg:top-[35%]"
        style={{
          willChange: "transform, opacity",
          transform: `translate3d(${mouse.x * -4}px, ${mouse.y * -4}px, 0)`,
        }}
      >
        <p className="text-[9px] uppercase tracking-[0.18em] text-brand-telemetry/60">Coordinate</p>
        <p className="mt-1">X: +0.12</p>
        <p>Y: -0.08</p>
      </div>

      {/* L5: glassmorphism analytics panel */}
      <div
        ref={analyticsRef}
        className="pointer-events-none absolute z-[5] hidden w-64 border border-white/[0.06] p-5 font-mono text-xs opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl
          md:block md:bottom-8 md:right-6 md:w-56
          lg:bottom-10 lg:right-10 lg:w-64"
        style={{
          background: "rgba(17,17,17,0.8)",
          willChange: "transform, opacity",
          transform: `translate3d(${mouse.x * -8}px, ${mouse.y * -8}px, 0)`,
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-brand-telemetry">Impact Detected</p>

        <div className="mt-4 flex items-end justify-between border-b border-white/[0.06] pb-3">
          <span className="text-brand-text-muted">Score</span>
          <span className="font-heading text-3xl font-bold text-brand-text-primary">10.7</span>
        </div>

        <div className="mt-3 flex justify-between">
          <span className="text-brand-text-muted">Response Time</span>
          <span className="text-brand-telemetry">2ms</span>
        </div>

        <div className="mt-2 flex justify-between">
          <span className="text-brand-text-muted">Confidence</span>
          <span className="text-brand-text-primary">99.9%</span>
        </div>

        <div className="mt-3 border-t border-white/[0.06] pt-3">
          <p className="text-[9px] uppercase tracking-[0.18em] text-brand-text-muted">Coordinate</p>
          <div className="mt-1 flex gap-4">
            <span>X: <span className="text-brand-telemetry">+0.12</span></span>
            <span>Y: <span className="text-brand-telemetry">-0.08</span></span>
          </div>
        </div>
      </div>

      {/* ambient gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_44%,rgba(59,130,246,0.08),transparent_40%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_68%_52%,rgba(168,0,56,0.05),transparent_30%)]" aria-hidden="true" />
    </div>
  );
}
