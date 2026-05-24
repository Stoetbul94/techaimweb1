export interface ShotPoint {
  x: number;
  y: number;
  score: number;
  timestamp: number;
}

export interface SessionStats {
  meanRadius: number;
  extremeSpread: number;
  averageScore: number;
  shotCount: number;
}

export const demoShots: ShotPoint[] = [
  { x: 0.2, y: -0.1, score: 10.4, timestamp: 1 },
  { x: -0.3, y: 0.15, score: 10.1, timestamp: 2 },
  { x: 0.1, y: 0.05, score: 10.6, timestamp: 3 },
  { x: -0.15, y: -0.2, score: 9.8, timestamp: 4 },
  { x: 0.35, y: 0.1, score: 10.2, timestamp: 5 },
  { x: -0.05, y: -0.05, score: 10.5, timestamp: 6 },
  { x: 0.25, y: -0.15, score: 10.0, timestamp: 7 },
  { x: -0.2, y: 0.25, score: 9.9, timestamp: 8 },
  { x: 0.05, y: 0.12, score: 10.3, timestamp: 9 },
  { x: -0.1, y: -0.08, score: 10.4, timestamp: 10 },
];

export const trendData = demoShots.map((s, i) => ({
  shot: i + 1,
  score: s.score,
  mr: 1.2 + Math.random() * 0.8,
}));

export const athleteComparison = [
  { name: "Athlete A", avgScore: 10.28, mr: 1.8, sessions: 24 },
  { name: "Athlete B", avgScore: 10.05, mr: 2.4, sessions: 18 },
];

export function computeStats(shots: ShotPoint[]): SessionStats {
  if (shots.length === 0) return { meanRadius: 0, extremeSpread: 0, averageScore: 0, shotCount: 0 };
  const cx = shots.reduce((s, p) => s + p.x, 0) / shots.length;
  const cy = shots.reduce((s, p) => s + p.y, 0) / shots.length;
  const distances = shots.map((p) => Math.hypot(p.x - cx, p.y - cy));
  const mr = distances.reduce((s, d) => s + d, 0) / distances.length;
  const es = Math.max(...distances) * 2;
  const avgScore = shots.reduce((s, p) => s + p.score, 0) / shots.length;
  return { meanRadius: mr, extremeSpread: es, averageScore: avgScore, shotCount: shots.length };
}
