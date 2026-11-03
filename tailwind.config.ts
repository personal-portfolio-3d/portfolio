import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#03060D",
          bgSecondary: "#050B18",
          deepNavy: "#081426",
          panel: "#0A1425",
          card: "#0D1B30",
          surface: "#101F38",
          // Primary accents (70% blue, 20% cyan)
          electricBlue: "#168BFF",
          neonBlue: "#007BFF",
          brightCyan: "#22D3EE",
          // Secondary accents (10% violet/purple)
          deepViolet: "#6D45E8",
          neonPurple: "#925CFF",
          lavender: "#B58AFF",
          // Typography
          textPrimary: "#EDF4FF",
          textSecondary: "#A5B6D0",
          textMuted: "#71839F",
          // Borders
          borderPrimary: "#24466E",
          borderSubtle: "#1B2A40",
        },
      },
      boxShadow: {
        "neon-blue": "0 0 25px rgba(22, 139, 255, 0.55)",
        "neon-cyan": "0 0 20px rgba(34, 211, 238, 0.40)",
        "neon-violet": "0 0 20px rgba(146, 92, 255, 0.35)",
        "glass-hud": "0 8px 32px 0 rgba(3, 6, 13, 0.8)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 12px rgba(22, 139, 255, 0.65))" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.35))" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
