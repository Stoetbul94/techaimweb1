"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxPosition {
  x: number;
  y: number;
}

export function useMouseParallax(enabled = true): ParallaxPosition {
  const [pos, setPos] = useState<ParallaxPosition>({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const latest = useRef<ParallaxPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      latest.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          setPos({ ...latest.current });
          raf.current = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return pos;
}
