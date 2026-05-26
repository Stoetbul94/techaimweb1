"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";

function RifleModel() {
  const { scene } = useGLTF("/models/hero-rifle.glb");
  const model = useMemo(() => scene.clone(), [scene]);

  return (
    <group position={[-1.52, -0.42, 0]} rotation={[0.05, Math.PI - 0.08, -0.025]} scale={2.18}>
      <primitive object={model} />
    </group>
  );
}

function RifleLayer() {
  return (
    <Canvas camera={{ position: [0, 0.05, 5.8], fov: 42 }} dpr={[1, 1.5]} className="pointer-events-none">
      <ambientLight intensity={0.6} />
      <spotLight position={[-2.5, 3.2, 4.5]} angle={0.42} penumbra={0.85} intensity={34} color="#ffffff" />
      <pointLight position={[2.4, 1.2, 3.2]} intensity={8} color="#3B82F6" />
      <Sparkles count={55} scale={7} size={1.3} speed={0.18} opacity={0.32} color="#3B82F6" />
      <fog attach="fog" args={["#050505", 4, 12]} />
      <Suspense fallback={null}>
        <RifleModel />
      </Suspense>
    </Canvas>
  );
}

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
        <radialGradient id="targetCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.92" />
          <stop offset="42%" stopColor="#BF1919" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
        <filter id="softBlue">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <circle cx="130" cy="130" r="118" fill="rgba(0,0,0,0.46)" />
      {[112, 90, 68, 46].map((radius) => (
        <circle key={radius} cx="130" cy="130" r={radius} fill="none" stroke="#202633" strokeWidth="1" />
      ))}
      <motion.circle
        cx="130"
        cy="130"
        r="31"
        fill="url(#targetCoreGlow)"
        animate={{ opacity: [0.35, 0.62, 0.35], scale: [1, 1.035, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "130px 130px" }}
      />
      <circle ref={redRingRef} cx="130" cy="130" r="36" fill="none" stroke="#BF1919" strokeWidth="1.3" opacity="0.72" />
      <circle cx="130" cy="130" r="19" fill="none" stroke="#BF1919" strokeWidth="1" opacity="0.82" />
      <circle ref={centerRef} cx="130" cy="130" r="6" fill="#3B82F6" opacity="0.2" filter="url(#softBlue)" />
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
      <path d="M130 104v52M104 130h52" stroke="#8B919A" strokeWidth="0.7" opacity="0.4" />
    </svg>
  );
}

export default function BulletHeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const projectileRef = useRef<HTMLDivElement>(null);
  const projectileStartRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<SVGCircleElement>(null);
  const redRingRef = useRef<SVGCircleElement>(null);
  const coordinateRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const projectile = projectileRef.current;
    const projectileStart = projectileStartRef.current;
    const target = targetRef.current;
    const center = centerRef.current;
    const redRing = redRingRef.current;
    const coordinate = coordinateRef.current;
    const analytics = analyticsRef.current;

    if (!scene || !projectile || !projectileStart || !target || !center || !redRing || !coordinate || !analytics) {
      return;
    }

    const context = gsap.context(() => {
      const getTravel = () => {
        const startBox = projectileStart.getBoundingClientRect();
        const targetBox = target.getBoundingClientRect();
        return targetBox.left + targetBox.width * 0.5 - (startBox.left + 10);
      };

      const resetPulse = () => {
        pulseRefs.current.forEach((ring) => {
          gsap.set(ring, { scale: 0.35, opacity: 0, transformOrigin: "50% 50%" });
        });
      };

      const reset = () => {
        gsap.set(projectile, {
          x: 0,
          autoAlpha: 0,
          rotate: -2,
          filter: "blur(0px)",
          scale: 0.96,
        });
        gsap.set(center, { attr: { r: 6 }, opacity: 0.2 });
        gsap.set(redRing, { opacity: 0.72, attr: { "stroke-width": 1.3 } });
        gsap.set([coordinate, analytics], { autoAlpha: 0, y: 8 });
        resetPulse();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reset();
        gsap.set(projectile, { x: getTravel(), autoAlpha: 1 });
        gsap.set(center, { attr: { r: 12 }, opacity: 0.85 });
        gsap.set(redRing, { opacity: 1, attr: { "stroke-width": 2 } });
        gsap.set([coordinate, analytics], { autoAlpha: 1, y: 0 });
        return;
      }

      reset();

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.2, defaults: { ease: "power2.out" } });

      timeline
        .set(projectile, { autoAlpha: 1 }, 0)
        .to(
          projectile,
          {
            x: () => getTravel(),
            rotate: 1.5,
            filter: "blur(0.8px)",
            duration: 1.5,
            ease: "power1.inOut",
          },
          0,
        )
        .to(center, { attr: { r: 12 }, opacity: 0.82, duration: 0.45 }, 1.05)
        .to(redRing, { opacity: 1, attr: { "stroke-width": 2.2 }, duration: 0.45 }, 1.05)
        .to(projectile, { autoAlpha: 0, scale: 0.72, duration: 0.18 }, 1.5);

      pulseRefs.current.forEach((ring, index) => {
        timeline.fromTo(
          ring,
          { scale: 0.3, opacity: 0.75, transformOrigin: "50% 50%" },
          { scale: 3.25, opacity: 0, duration: 1.25, ease: "power2.out" },
          1.6 + index * 0.12,
        );
      });

      timeline
        .to(coordinate, { autoAlpha: 1, y: 0, duration: 0.22 }, 1.78)
        .to(coordinate, { autoAlpha: 0, y: -4, duration: 0.35 }, 2.45)
        .to(analytics, { autoAlpha: 1, y: 0, duration: 0.32 }, 2)
        .to(analytics, { autoAlpha: 0, y: -6, duration: 0.45 }, 4.35)
        .to(center, { attr: { r: 6 }, opacity: 0.2, duration: 0.35 }, 4.55)
        .to(redRing, { opacity: 0.72, attr: { "stroke-width": 1.3 }, duration: 0.35 }, 4.55)
        .call(reset, undefined, 5);
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <motion.div
      ref={sceneRef}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[360px] w-full min-w-0 overflow-hidden bg-brand-panel/20 sm:h-[430px] lg:h-[560px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_49%,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.28),transparent_42%,rgba(168,0,56,0.04))]" />

      <div className="absolute inset-x-0 bottom-[17%] h-[48%] sm:bottom-[18%] lg:bottom-[16%]">
        <RifleLayer />
      </div>

      <div
        ref={projectileStartRef}
        className="absolute left-[34%] top-[52%] h-1 w-1 sm:left-[36%] sm:top-[51%] lg:left-[37%]"
      />

      <div
        ref={projectileRef}
        className="pointer-events-none absolute left-[34%] top-[52%] z-20 h-[10px] w-[34px] -translate-y-1/2 opacity-0 sm:left-[36%] sm:top-[51%] lg:left-[37%]"
      >
        <span className="absolute left-[-96px] top-1/2 h-px w-28 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#f7c948]/20 to-[#f7c948]/70 blur-[0.5px]" />
        <span className="absolute inset-y-[2px] right-0 w-8 rounded-full bg-gradient-to-r from-[#6d5b2c] via-[#f7c948] to-[#f8f1c2] shadow-[0_0_14px_rgba(247,201,72,0.35)]" />
      </div>

      <div ref={targetRef} className="absolute right-[3%] top-[32%] z-10 h-[210px] w-[210px] sm:right-[4%] sm:top-[27%] sm:h-[260px] sm:w-[260px] lg:right-[2%] lg:top-[25%]">
        <LayeredTarget centerRef={centerRef} redRingRef={redRingRef} pulseRefs={pulseRefs} />
      </div>

      <div
        ref={coordinateRef}
        className="pointer-events-none absolute right-[24%] top-[42%] z-30 border border-[#3B82F6]/40 bg-black/45 px-3 py-2 font-mono text-[10px] text-[#3B82F6] opacity-0 backdrop-blur-md sm:right-[22%]"
      >
        <p>X: +0.12</p>
        <p>Y: -0.08</p>
      </div>

      <div
        ref={analyticsRef}
        className="pointer-events-none absolute bottom-5 right-4 z-30 w-48 border border-white/10 bg-black/50 p-4 font-mono text-xs text-brand-text-body opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:bottom-8 sm:right-8"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#3B82F6]">Impact Detected</p>
        <div className="mt-3 flex items-end justify-between border-b border-white/10 pb-3">
          <span className="text-brand-text-muted">Score</span>
          <span className="font-heading text-2xl font-bold text-brand-text-primary">10.7</span>
        </div>
        <div className="mt-3 flex justify-between">
          <span>Response Time</span>
          <span className="text-[#3B82F6]">2ms</span>
        </div>
      </div>
    </motion.div>
  );
}

useGLTF.preload("/models/hero-rifle.glb");
