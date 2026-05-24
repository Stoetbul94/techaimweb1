"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const shotPositions = [
  [-0.1, 0.12, 0.18],
  [0.18, -0.08, 0.42],
  [-0.24, -0.16, 0.72],
  [0.05, -0.32, 1.02],
  [0.32, 0.18, 1.32],
] as const;

function DataPulse({ delay }: { delay: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const elapsed = (clock.elapsedTime + delay) % 2.1;
    const scale = 0.75 + elapsed * 0.42;
    ringRef.current.scale.setScalar(scale);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.max(0, 0.42 - elapsed * 0.2);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0.13]}>
      <torusGeometry args={[1.55, 0.006, 12, 96]} />
      <meshBasicMaterial color="#A80038" transparent opacity={0.35} />
    </mesh>
  );
}

function TargetRig() {
  const rigRef = useRef<THREE.Group>(null);
  const shotMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#A80038", emissive: "#A80038", emissiveIntensity: 2.8 }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!rigRef.current) return;
    rigRef.current.rotation.y = -0.28 + pointer.x * 0.14 + Math.sin(clock.elapsedTime * 0.42) * 0.04;
    rigRef.current.rotation.x = 0.14 - pointer.y * 0.08 + Math.cos(clock.elapsedTime * 0.35) * 0.025;
    rigRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.025;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.55}>
      <group ref={rigRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.55, 2.55, 0.09, 128]} />
          <meshStandardMaterial color="#06080D" roughness={0.52} metalness={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.07]}>
          <cylinderGeometry args={[2.82, 2.82, 0.06, 128]} />
          <meshStandardMaterial color="#111111" roughness={0.42} metalness={0.48} />
        </mesh>
        {[2.24, 1.82, 1.4, 0.98, 0.58, 0.22].map((radius, index) => (
          <mesh key={radius} position={[0, 0, 0.08]}>
            <torusGeometry args={[radius, index > 3 ? 0.012 : 0.008, 16, 128]} />
            <meshBasicMaterial color={index > 3 ? "#BF1919" : "#333333"} transparent opacity={index > 3 ? 0.9 : 0.78} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.1]}>
          <torusGeometry args={[0.7, 0.006, 12, 96]} />
          <meshBasicMaterial color="#A80038" transparent opacity={0.42} />
        </mesh>
        <mesh position={[0, 0, 0.11]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[4.8, 0.009, 0.009]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[4.8, 0.009, 0.009]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        {shotPositions.map(([x, y, delay], index) => (
          <group key={`${x}-${y}`}>
            <mesh position={[x, y, 0.2]} material={shotMaterial}>
              <sphereGeometry args={[index === 0 ? 0.065 : 0.052, 24, 24]} />
            </mesh>
            <DataPulse delay={delay} />
          </group>
        ))}
      </group>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[3.5, 3.5, 4]} intensity={26} color="#A80038" />
      <pointLight position={[-3, -1.8, 3]} intensity={11} color="#BF1919" />
      <spotLight position={[0, 4.5, 5]} angle={0.36} penumbra={0.6} intensity={42} color="#FFFFFF" />
    </>
  );
}

export default function CinematicTargetScene() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden sm:h-[440px] lg:h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_48%)]" />
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
        <SceneLights />
        <TargetRig />
      </Canvas>
      <div className="pointer-events-none absolute left-2 top-6 hidden border border-brand-border bg-brand-panel/80 px-4 py-3 backdrop-blur-md sm:left-6 sm:block">
        <p className="font-body text-[10px] uppercase tracking-[0.22em] text-brand-text-body">Target 1</p>
        <p className="mt-1 font-heading text-4xl font-bold text-brand-telemetry">10.2</p>
      </div>
      <div className="pointer-events-none absolute bottom-8 right-2 hidden border border-brand-border bg-brand-panel/80 px-4 py-3 backdrop-blur-md sm:right-8 sm:block">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-text-primary">
          <span className="h-2 w-2 rounded-full bg-brand-telemetry shadow-[0_0_14px_rgba(59,130,246,0.8)]" />
          Live grouping
        </div>
        <p className="mt-2 text-sm text-brand-text-body">MPI offset 1.8mm · group 14mm</p>
      </div>
    </div>
  );
}
