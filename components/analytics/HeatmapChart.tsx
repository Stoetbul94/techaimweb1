"use client";

import type { ShotPoint } from "@/lib/analytics-demo-data";

interface HeatmapChartProps {
  shots: ShotPoint[];
  interactive?: boolean;
  onAddShot?: (x: number, y: number) => void;
}

export default function HeatmapChart({ shots, interactive = false, onAddShot }: HeatmapChartProps) {
  const size = 280;
  const scale = 80;

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (!interactive || !onAddShot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = size / 2;
    const cy = size / 2;
    const x = ((e.clientX - rect.left - cx) / scale);
    const y = -((e.clientY - rect.top - cy) / scale);
    onAddShot(x, y);
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto mt-4 w-full max-w-[280px] cursor-crosshair"
      onClick={handleClick}
      role="img"
      aria-label="Shot grouping heatmap"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill="#0A0D14" stroke="#2A3040" />
      {[0.9, 0.7, 0.5, 0.3, 0.15].map((r) => (
        <circle key={r} cx={size / 2} cy={size / 2} r={(size / 2 - 8) * r} fill="none" stroke="#2A3040" strokeWidth="0.5" />
      ))}
      <circle cx={size / 2} cy={size / 2} r={(size / 2 - 8) * 0.05} fill="#E8001E" opacity={0.6} />
      {shots.map((shot, i) => (
        <circle
          key={`${shot.timestamp}-${i}`}
          cx={size / 2 + shot.x * scale}
          cy={size / 2 - shot.y * scale}
          r={5}
          fill="#3B9EFF"
          opacity={0.85}
        />
      ))}
      <line x1={size / 2} y1={10} x2={size / 2} y2={size - 10} stroke="#2A3040" strokeWidth="0.5" />
      <line x1={10} y1={size / 2} x2={size - 10} y2={size / 2} stroke="#2A3040" strokeWidth="0.5" />
    </svg>
  );
}
