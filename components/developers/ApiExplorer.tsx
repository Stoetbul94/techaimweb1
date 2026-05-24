"use client";

import { useState } from "react";
import { apiEndpoints } from "@/lib/api-spec";

export default function ApiExplorer() {
  const [selectedPath, setSelectedPath] = useState(apiEndpoints[0].path);
  const [method, setMethod] = useState(apiEndpoints[0].method);
  const endpoint = apiEndpoints.find((e) => e.path === selectedPath && e.method === method) ?? apiEndpoints[0];
  const [response, setResponse] = useState<string>("");

  function tryRequest() {
    setResponse(JSON.stringify(endpoint.responseExample, null, 2));
  }

  return (
    <div className="mt-12 border border-brand-border bg-brand-panel p-6">
      <h3 className="font-heading text-xl font-bold text-white">Interactive API Explorer</h3>
      <p className="mt-2 text-sm text-brand-text">Try endpoints with mock responses (sandbox coming soon)</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wide text-brand-accent">Endpoint</label>
          <select
            className="mt-2 w-full border border-brand-border bg-brand-bg px-3 py-2 font-mono text-sm text-white"
            value={`${method}:${selectedPath}`}
            onChange={(e) => {
              const [m, p] = e.target.value.split(":");
              setMethod(m as typeof method);
              setSelectedPath(p);
            }}
          >
            {apiEndpoints.map((ep) => (
              <option key={`${ep.method}${ep.path}`} value={`${ep.method}:${ep.path}`}>
                {ep.method} {ep.path}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={tryRequest}
            className="mt-4 bg-brand-accent px-6 py-2 font-heading text-sm font-semibold text-[#050505]"
          >
            Send Request
          </button>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-brand-accent">Response</label>
          <pre className="mt-2 max-h-64 overflow-auto border border-brand-border bg-brand-bg p-4 font-mono text-xs text-brand-text-bright">
            {response || "Click Send Request to see mock response"}
          </pre>
        </div>
      </div>
    </div>
  );
}
