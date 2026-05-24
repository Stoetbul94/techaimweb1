"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  { id: "dashboard", label: "Dashboard", title: "Live Range Dashboard", desc: "Real-time overview of all active lanes, scores and system status." },
  { id: "history", label: "Shot History", title: "Complete Shot History", desc: "Every shot recorded with coordinates, scores and timestamps." },
  { id: "athletes", label: "Athletes", title: "Athlete Management", desc: "Profiles, progression tracking and performance comparisons." },
  { id: "competitions", label: "Competitions", title: "Competition Management", desc: "Full match workflow from qualification through to finals." },
  { id: "cloud", label: "Cloud Sync", title: "Cloud Synchronisation", desc: "Session data synced across devices and range locations." },
  { id: "scoring", label: "Live Scoring", title: "Real-time Scoring", desc: "Instant score display for athletes, officials and spectators." },
  { id: "coach", label: "Coach View", title: "Coach View", desc: "Dedicated interface for monitoring and analysing athlete performance." },
  { id: "range", label: "Range Mgmt", title: "Range Management", desc: "Configure lanes, targets and network infrastructure centrally." },
  { id: "mobile", label: "Mobile", title: "Mobile Applications", desc: "iOS and Android apps for athletes and range officials." },
];

function MockDashboard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <div className="border border-brand-border bg-brand-panel">
      <div className="flex items-center gap-2 border-b border-brand-border bg-brand-surface px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-brand-crimson" />
        <div className="h-2.5 w-2.5 rounded-full bg-brand-warning" />
        <div className="h-2.5 w-2.5 rounded-full bg-brand-success" />
        <span className="ml-2 font-mono text-xs text-brand-text-body">TECH AIM ARMS — {feature.label}</span>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h4 className="font-heading text-xl font-bold text-brand-text-primary">{feature.title}</h4>
          <p className="mt-2 text-sm leading-7">{feature.desc}</p>
          <div className="mt-6 h-48 border border-brand-border bg-brand-bg">
            <svg viewBox="0 0 400 180" className="h-full w-full" aria-hidden="true">
              <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points="10,150 50,120 90,130 130,90 170,100 210,70 250,80 290,50 330,60 370,40" />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          {["Lane 1: Active", "Lane 2: Active", "Lane 3: Idle"].map((lane) => (
            <div key={lane} className="border border-brand-border p-3 font-mono text-xs">
              <span className="text-brand-telemetry">●</span> {lane}
            </div>
          ))}
          <div className="border border-brand-telemetry/30 bg-brand-telemetry/5 p-3">
            <p className="font-mono text-xs text-brand-telemetry">SESSION STATS</p>
            <p className="mt-2 font-heading text-2xl font-bold text-brand-text-primary">10.28</p>
            <p className="text-xs">Average score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureTabs() {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList className="mb-6 flex-wrap">
        {features.map((f) => (
          <TabsTrigger key={f.id} value={f.id}>{f.label}</TabsTrigger>
        ))}
      </TabsList>
      {features.map((f) => (
        <TabsContent key={f.id} value={f.id}>
          <MockDashboard feature={f} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
