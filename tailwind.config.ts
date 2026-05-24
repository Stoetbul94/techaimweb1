import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#050505",
          panel: "#111318",
          deep: "#0A0C10",
          surface: "#161B24",
          accent: "#3B9EFF",
          "accent-dim": "#00C8FF",
          cyan: "#00C8FF",
          cta: "#E8001E",
          red: "#E8001E",
          text: "#8A9BB5",
          "text-bright": "#C5D0E0",
          border: "#2A3040",
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
