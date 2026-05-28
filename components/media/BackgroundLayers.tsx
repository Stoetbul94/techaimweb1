import { cn } from "@/lib/utils";

type BackgroundLayersProps = {
  variant?: "hero" | "section" | "industrial";
  className?: string;
};

/** CSS background overlays — raster assets optional in /images/backgrounds/ */
export default function BackgroundLayers({ variant = "hero", className }: BackgroundLayersProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {variant === "hero" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(168,0,56,0.08),transparent_34%)]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(26,32,48,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </>
      )}
      {variant === "section" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.06),transparent_45%)]" />
      )}
      {variant === "industrial" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg to-brand-panel" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        </>
      )}
    </div>
  );
}
