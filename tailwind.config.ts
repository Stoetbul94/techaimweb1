import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#050505",
          panel: "#111111",
          elevated: "#1A1A1A",
          surface: "#232323",
          crimson: "#A80038",
          signal: "#BF1919",
          telemetry: "#3B82F6",
          "text-primary": "#F5F5F5",
          "text-body": "#C7CBD1",
          "text-muted": "#8B919A",
          border: "#333333",
          success: "#22C55E",
          warning: "#F59E0B",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
};

export default config;
