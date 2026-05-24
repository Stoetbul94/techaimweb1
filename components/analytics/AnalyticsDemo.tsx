"use client";

import { useMemo, useState } from "react";
import HeatmapChart from "@/components/analytics/HeatmapChart";
import TrendChart from "@/components/analytics/TrendChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  athleteComparison,
  computeStats,
  demoShots,
  type ShotPoint,
} from "@/lib/analytics-demo-data";

export default function AnalyticsDemo() {
  const [shots, setShots] = useState<ShotPoint[]>(demoShots);
  const stats = useMemo(() => computeStats(shots), [shots]);

  function addShot(x: number, y: number) {
    const score = Math.max(8, 10.8 - Math.hypot(x, y) * 2);
    setShots((prev) => [...prev, { x, y, score, timestamp: prev.length + 1 }]);
  }

  return (
    <Tabs defaultValue="heatmap" className="mt-12">
      <TabsList>
        <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
        <TabsTrigger value="group">Group Analysis</TabsTrigger>
        <TabsTrigger value="trend">Trends</TabsTrigger>
        <TabsTrigger value="compare">Compare</TabsTrigger>
      </TabsList>
      <TabsContent value="heatmap">
        <div className="border border-brand-border bg-brand-panel p-6">
          <p className="mb-4 text-sm">Click the target to add shots</p>
          <HeatmapChart shots={shots} interactive onAddShot={addShot} />
        </div>
      </TabsContent>
      <TabsContent value="group">
        <div className="grid gap-6 md:grid-cols-2">
          <HeatmapChart shots={shots} />
          <div className="space-y-4 border border-brand-border bg-brand-panel p-6">
            <Stat label="Mean Radius" value={`${stats.meanRadius.toFixed(2)} mm`} />
            <Stat label="Extreme Spread" value={`${stats.extremeSpread.toFixed(2)} mm`} />
            <Stat label="Average Score" value={stats.averageScore.toFixed(2)} />
            <Stat label="Total Shots" value={String(stats.shotCount)} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="trend">
        <div className="border border-brand-border bg-brand-panel p-6">
          <TrendChart />
        </div>
      </TabsContent>
      <TabsContent value="compare">
        <div className="grid gap-4 md:grid-cols-2">
          {athleteComparison.map((a) => (
            <div key={a.name} className="border border-brand-border bg-brand-panel p-6">
              <h4 className="font-heading text-lg font-bold text-brand-text-primary">{a.name}</h4>
              <div className="mt-4 space-y-2 font-mono text-sm">
                <p>Avg Score: <span className="text-brand-telemetry">{a.avgScore}</span></p>
                <p>Mean Radius: <span className="text-brand-telemetry">{a.mr}mm</span></p>
                <p>Sessions: <span className="text-brand-telemetry">{a.sessions}</span></p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-brand-border pb-3">
      <span className="text-sm text-brand-text-body">{label}</span>
      <span className="font-mono text-brand-text-primary">{value}</span>
    </div>
  );
}
