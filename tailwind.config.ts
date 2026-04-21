import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./translations/**/*.{ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          /* Light mode */
          bg:          "#FAFAF8",
          sand:        "#F2EDE5",
          sandDark:    "#E8E1D6",
          navy:        "#1C2B3A",
          navyLight:   "#2D3F52",
          gold:        "#D6B47A",
          goldLight:   "#E2C48F",
          goldDark:    "#C49A60",
          stone:       "#6B6659",
          stoneLight:  "#9A9589",
          terra:       "#C4705B",
          terraLight:  "#D4907D",
          olive:       "#7A8C6E",
          /* Dark mode surfaces */
          darkBg:      "#0D1620",
          darkSurface: "#162232",
          darkCard:    "#1C2B3A",
        },
        hot:      "#DC2626",
        warm:     "#D97706",
        cold:     "#2563EB",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "aurora-1": "aurora-1 10s ease-in-out infinite",
        "aurora-2": "aurora-2 13s ease-in-out infinite",
        "aurora-3": "aurora-3 16s ease-in-out infinite",
        "fade-up":  "fade-up 0.6s ease forwards",
      },
      keyframes: {
        "aurora-1": {
          "0%,100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%":     { transform: "translate(5%, -8%) scale(1.08)" },
          "66%":     { transform: "translate(-4%, 5%) scale(0.96)" },
        },
        "aurora-2": {
          "0%,100%": { transform: "translate(0%, 0%) scale(1)" },
          "40%":     { transform: "translate(-6%, 6%) scale(1.06)" },
          "70%":     { transform: "translate(5%, -4%) scale(0.97)" },
        },
        "aurora-3": {
          "0%,100%": { transform: "translate(0%, 0%) scale(1)" },
          "25%":     { transform: "translate(4%, 4%) scale(1.04)" },
          "75%":     { transform: "translate(-5%, -5%) scale(1.02)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionProperty: {
        "colors-shadow": "color, background-color, border-color, box-shadow",
      },
    },
  },
  plugins: [],
};

export default config;
