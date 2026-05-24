"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trendData } from "@/lib/analytics-demo-data";

export default function TrendChart() {
  return (
    <div className="mt-4 h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <XAxis dataKey="shot" stroke="#2A3040" tick={{ fill: "#8A9BB5", fontSize: 11 }} />
          <YAxis domain={[9.5, 10.8]} stroke="#2A3040" tick={{ fill: "#8A9BB5", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "#111318", border: "1px solid #2A3040", borderRadius: 0 }}
            labelStyle={{ color: "#8A9BB5" }}
          />
          <Line type="monotone" dataKey="score" stroke="#3B9EFF" strokeWidth={2} dot={{ fill: "#3B9EFF", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
