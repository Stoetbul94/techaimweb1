"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

type Phase = "bullet" | "target" | "impact" | "data";

function Bullet({ phaseRef }: { phaseRef: React.MutableRefObject<Phase> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (phaseRef.current === "bullet") {
      ref.current.position.z = -4 + (clock.elapsedTime % 3) * 2.5;
      ref.current.visible = true;
    } else {
      ref.current.visible = false;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.04, 0.04, 0.18, 16]} />
      <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

function Target({ phaseRef, opacity }: { phaseRef: React.MutableRefObject<Phase>; opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return;
    const show = phaseRef.current !== "bullet";
    groupRef.current.visible = show;
    if (show) {
      groupRef.current.rotation.y = pointer.x * 0.1 + Math.sin(clock.elapsedTime * 0.3) * 0.03;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.4}>
      <group ref={groupRef} visible={false}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.08, 128]} />
          <meshStandardMaterial color="#06080D" roughness={0.5} metalness={0.3} transparent opacity={opacity} />
        </mesh>
        {[1.9, 1.5, 1.1, 0.7, 0.35].map((r, i) => (
          <mesh key={r} position={[0, 0, 0.05]}>
            <torusGeometry args={[r, 0.008, 12, 96]} />
            <meshBasicMaterial color={i > 2 ? "#E8001E" : "#2A3040"} transparent opacity={opacity * 0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DetectionRings({ active }: { active: boolean }) {
  const rings = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!rings.current || !active) {
      if (rings.current) rings.current.visible = false;
      return;
    }
    rings.current.visible = true;
    rings.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const scale = 0.5 + ((clock.elapsedTime * 0.8 + i * 0.4) % 2) * 0.5;
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.5 - scale * 0.25);
    });
  });
  return (
    <group ref={rings} position={[0.05, -0.08, 0.15]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3 + i * 0.15, 0.004, 8, 64]} />
          <meshBasicMaterial color="#3B9EFF" transparent opacity={0.4} />
        </mesh>
      ))}
      <mesh position={[0.05, -0.08, 0.1]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#3B9EFF" emissive="#3B9EFF" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Scene({ onPhaseChange }: { onPhaseChange: (p: Phase) => void }) {
  const phaseRef = useRef<Phase>("bullet");
  const [targetOpacity, setTargetOpacity] = useState(0);
  const [ringsActive, setRingsActive] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      phaseRef.current = "data";
      const frame = requestAnimationFrame(() => {
        setTargetOpacity(1);
        setRingsActive(true);
        onPhaseChange("data");
      });
      return () => cancelAnimationFrame(frame);
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.call(() => {
      phaseRef.current = "bullet";
      onPhaseChange("bullet");
    });
    tl.to({}, { duration: 3 });
    tl.call(() => {
      phaseRef.current = "target";
      onPhaseChange("target");
    });
    tl.to({}, {
      duration: 0.8,
      onUpdate: function () {
        setTargetOpacity(this.progress());
      },
    });
    tl.call(() => {
      phaseRef.current = "impact";
      setRingsActive(true);
      onPhaseChange("impact");
    });
    tl.to({}, { duration: 1.2 });
    tl.call(() => {
      phaseRef.current = "data";
      onPhaseChange("data");
    });
    tl.to({}, { duration: 2 });
    tl.call(() => {
      setRingsActive(false);
      setTargetOpacity(0);
    });

    return () => {
      tl.kill();
    };
  }, [onPhaseChange]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[0, 5, 5]} angle={0.4} penumbra={0.8} intensity={30} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={15} color="#3B9EFF" />
      <Sparkles count={80} scale={8} size={1.5} speed={0.3} opacity={0.4} color="#3B9EFF" />
      <fog attach="fog" args={["#050505", 4, 14]} />
      <Bullet phaseRef={phaseRef} />
      <Target phaseRef={phaseRef} opacity={targetOpacity} />
      <DetectionRings active={ringsActive} />
    </>
  );
}

export default function BulletHeroScene() {
  const [phase, setPhase] = useState<Phase>("bullet");
  const onPhaseChange = useCallback((p: Phase) => setPhase(p), []);
  const showOverlay = phase === "impact" || phase === "data";
  const coords = showOverlay ? { x: 0.42, y: -0.38, score: 10.2 } : null;

  return (
    <div className="relative h-[360px] w-full overflow-hidden border border-brand-border bg-brand-panel/30 sm:h-[430px] lg:h-[560px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <Scene onPhaseChange={onPhaseChange} />
      </Canvas>
      {showOverlay && coords && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[58%] top-[48%] font-mono text-[10px] text-brand-accent">
            <p>X: {coords.x.toFixed(2)}mm</p>
            <p>Y: {coords.y.toFixed(2)}mm</p>
            <p className="mt-1 text-lg font-bold text-white">{coords.score.toFixed(1)}</p>
          </div>
          {phase === "data" && (
            <div className="absolute bottom-4 right-4 border border-brand-border bg-brand-panel/90 p-3 font-mono text-xs backdrop-blur-sm">
              <p className="text-brand-accent">LIVE SCORING</p>
              <p className="mt-1 text-white">Shot 12 · Series 2</p>
              <p className="text-brand-text">MR: 2.1mm · ES: 4.8mm</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
