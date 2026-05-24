import type { Metadata } from "next";
import ConversionStrip from "@/components/layout/ConversionStrip";
import PageHero from "@/components/layout/PageHero";
import ApiExplorer from "@/components/developers/ApiExplorer";
import { apiEndpoints, webhookEvents, wsEndpoint } from "@/lib/api-spec";

export const metadata: Metadata = {
  title: "Developer API",
  description: "REST API, WebSocket feeds, webhooks and developer documentation for TECH AIM ARMS integration.",
};

export default function DevelopersPage() {
  const tags = [...new Set(apiEndpoints.flatMap((e) => e.tags))];

  return (
    <main className="bg-brand-bg">
      <PageHero
        eyebrow="Developers"
        title="API Documentation"
        description="Integrate precision scoring and analytics into your applications with our REST API and real-time WebSocket feeds."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border border-brand-border bg-brand-panel p-6">
          <h2 className="font-heading text-xl font-bold text-brand-text-primary">Authentication</h2>
          <p className="mt-3 text-sm leading-7">
            Obtain a bearer token via POST /v1/auth/token using your client credentials. Include the token in all subsequent requests:
          </p>
          <pre className="mt-4 overflow-x-auto border border-brand-border bg-brand-bg p-4 font-mono text-xs text-brand-telemetry">
            Authorization: Bearer {"{access_token}"}
          </pre>
        </div>

        {tags.map((tag) => (
          <div key={tag} className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-text-primary">{tag}</h2>
            <div className="mt-6 space-y-4">
              {apiEndpoints
                .filter((e) => e.tags.includes(tag))
                .map((ep) => (
                  <article key={`${ep.method}${ep.path}`} className="border border-brand-border bg-brand-panel p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-brand-crimson px-2 py-1 font-mono text-xs font-bold text-brand-text-primary">{ep.method}</span>
                      <code className="font-mono text-sm text-brand-text-primary">{ep.path}</code>
                    </div>
                    <p className="mt-3 text-sm">{ep.summary}</p>
                    <pre className="mt-4 overflow-x-auto border border-brand-border bg-brand-bg p-4 font-mono text-xs text-brand-text-primary">
                      {JSON.stringify(ep.responseExample, null, 2)}
                    </pre>
                  </article>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary">WebSocket — Live Scoring</h2>
          <p className="mt-3 text-sm">{wsEndpoint.description}</p>
          <code className="mt-2 block font-mono text-brand-telemetry">{wsEndpoint.path}</code>
          <pre className="mt-4 border border-brand-border bg-brand-bg p-4 font-mono text-xs text-brand-telemetry">
            {JSON.stringify(wsEndpoint.exampleMessage, null, 2)}
          </pre>
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-brand-text-primary">Webhook Events</h2>
          <div className="mt-6 divide-y divide-brand-border border border-brand-border">
            {webhookEvents.map((w) => (
              <div key={w.event} className="grid gap-2 px-4 py-3 sm:grid-cols-[200px_1fr]">
                <code className="font-mono text-sm text-brand-telemetry">{w.event}</code>
                <span className="text-sm">{w.description}</span>
              </div>
            ))}
          </div>
        </div>

        <ApiExplorer />
      </section>
      <ConversionStrip title="Need API access?" description="Contact engineering for API credentials and sandbox access." />
    </main>
  );
}
