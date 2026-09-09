import type { Config } from "tailwindcss";

/**
 * Tailwind is bound to the CSS custom properties in app/globals.css.
 * No colour, radius or shadow exists here that is not a token there.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "640px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      max: "1440px",
    },
    extend: {
      colors: {
        ink: {
          1000: "var(--ink-1000)",
          950: "var(--ink-950)",
          900: "var(--ink-900)",
          850: "var(--ink-850)",
          800: "var(--ink-800)",
          700: "var(--ink-700)",
          600: "var(--ink-600)",
          500: "var(--ink-500)",
          450: "var(--ink-450)",
          400: "var(--ink-400)",
          350: "var(--ink-350)",
          300: "var(--ink-300)",
          200: "var(--ink-200)",
          100: "var(--ink-100)",
          50: "var(--ink-50)",
        },
        ivory: "var(--ivory)",
        paper: "var(--paper)",
        champagne: {
          200: "var(--champagne-200)",
          300: "var(--champagne-300)",
          400: "var(--champagne-400)",
          700: "var(--champagne-700)",
          850: "var(--champagne-850)",
        },
        surface: {
          canvas: "var(--surface-canvas)",
          raised: "var(--surface-raised)",
          sunken: "var(--surface-sunken)",
          hover: "var(--surface-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          accent: "var(--text-accent)",
        },
        line: {
          hairline: "var(--border-hairline)",
          strong: "var(--border-strong)",
          interactive: "var(--border-interactive)",
        },
        signal: {
          positive: "var(--signal-positive)",
          attention: "var(--signal-attention)",
          critical: "var(--signal-critical)",
        },
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        pill: "999px",
      },
      boxShadow: {
        overlay: "var(--shadow-overlay)",
        lift: "0 1px 2px rgba(0,0,0,.40), 0 8px 24px -8px rgba(0,0,0,.50)",
        none: "none",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(.2,0,0,1)",
        out: "cubic-bezier(.22,1,.36,1)",
      },
      transitionDuration: {
        micro: "120ms",
        control: "200ms",
        element: "320ms",
        scene: "520ms",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        text: "720px",
        narrow: "640px",
        default: "1240px",
        wide: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
