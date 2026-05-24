"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trendData } from "@/lib/analytics-demo-data";
import { brandColors } from "@/lib/brand-colors";

export default function TrendChart() {
  return (
    <div className="mt-4 h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <XAxis dataKey="shot" stroke={brandColors.border} tick={{ fill: brandColors.textMuted, fontSize: 11 }} />
          <YAxis domain={[9.5, 10.8]} stroke={brandColors.border} tick={{ fill: brandColors.textMuted, fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: brandColors.panel, border: `1px solid ${brandColors.border}`, borderRadius: 0 }}
            labelStyle={{ color: brandColors.textMuted }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke={brandColors.telemetry}
            strokeWidth={2}
            dot={{ fill: brandColors.telemetry, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
