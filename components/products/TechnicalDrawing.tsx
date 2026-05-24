export default function TechnicalDrawing() {
  return (
    <div className="border border-brand-border bg-brand-panel p-6">
      <svg viewBox="0 0 400 300" className="mx-auto w-full max-w-lg" aria-label="Technical drawing placeholder">
        <rect x="20" y="20" width="360" height="260" fill="none" stroke="#2A3040" strokeWidth="1" />
        <circle cx="200" cy="150" r="80" fill="none" stroke="#3B9EFF" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="200" cy="150" r="40" fill="none" stroke="#3B9EFF" strokeWidth="1" />
        <line x1="200" y1="70" x2="200" y2="230" stroke="#2A3040" strokeWidth="0.5" />
        <line x1="120" y1="150" x2="280" y2="150" stroke="#2A3040" strokeWidth="0.5" />
        <text x="200" y="280" textAnchor="middle" fill="#8A9BB5" fontSize="10" fontFamily="monospace">
          TECHNICAL DRAWING — CAD PLACEHOLDER
        </text>
      </svg>
    </div>
  );
}
