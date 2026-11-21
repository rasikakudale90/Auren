import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // AUREN Neutral Foundation
        ivory: {
          DEFAULT: "#F7F6F2", // Warm ivory main app background
          warm: "#F7F6F2",
          soft: "#FFFDF9",   // Soft white for cards/panels/forms
          muted: "#F1F0EA",  // Muted neutral secondary surfaces
        },
        ink: {
          DEFAULT: "#242522", // Primary ink main text
          primary: "#242522",
          secondary: "#6E706A",
          muted: "#92938D",
        },
        border: {
          DEFAULT: "#E7E5DE", // Hairline borders & dividers
          subtle: "#E7E5DE",
        },

        // AUREN Brand Accent — Muted Sage
        sage: {
          DEFAULT: "#777C68", // Sage accent (primary action/selected state)
          accent: "#777C68",
          hover: "#656A58",   // Sage hover / pressed
          forest: "#354A35",  // Deep forest
          light: "#AEBAA7",   // Light sage borders / details
          fresh: "#939E6A",   // Fresh muted green highlights
          pastel: "#E3E8DC",  // Pastel sage signature surface
        },

        // AUREN Supporting Pastel Palette
        pastel: {
          sage: "#E3E8DC",
          blush: "#F2DFDA",
          peach: "#F4E3D5",
          lilac: "#E9E4F0",
          butter: "#F2EBD5",
          blue: "#E1E9ED",
          mauve: "#EADDE5",
        },

        // AUREN Editorial Warm Beige & Deep Burgundy Palette
        beige: {
          DEFAULT: "#EFECE6",
          warm: "#F5F2EB",    // Warm linen surface
          subtle: "#EFECE6",  // Oatmeal soft well / chip
          surface: "#E8E3D9", // Tactile card / table well
          border: "#DDD6C9",  // Organic warm border
        },
        burgundy: {
          DEFAULT: "#6E2639", // Deep bordeaux / rich wine focal accent
          deep: "#541B29",    // High-contrast text & urgent state
          accent: "#6E2639",  // Interactive & badge accent
          light: "#8C3549",   // Hover & active highlight
          subtle: "#FBF2F4",  // Soft delicate wine wash
          border: "#E8CAD1",  // Refined wine hairline border
        },

        // Semantic / System mappings
        background: "#F7F6F2",
        foreground: "#242522",
        card: {
          DEFAULT: "#FFFDF9",
          foreground: "#242522",
        },
        primary: {
          DEFAULT: "#777C68",
          foreground: "#FFFDF9",
        },
        secondary: {
          DEFAULT: "#F1F0EA",
          foreground: "#242522",
        },
        muted: {
          DEFAULT: "#F1F0EA",
          foreground: "#6E706A",
        },
        accent: {
          DEFAULT: "#E3E8DC",
          foreground: "#242522",
        },
        destructive: {
          DEFAULT: "#D9534F",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(36, 37, 34, 0.04)",
        card: "0 1px 3px 0 rgba(36, 37, 34, 0.05), 0 1px 2px -1px rgba(36, 37, 34, 0.05)",
        panel: "0 4px 6px -1px rgba(36, 37, 34, 0.05), 0 2px 4px -2px rgba(36, 37, 34, 0.05)",
        floating: "0 10px 15px -3px rgba(36, 37, 34, 0.08), 0 4px 6px -4px rgba(36, 37, 34, 0.04)",
        glowBurgundy: "0 0 25px -4px rgba(110, 38, 57, 0.25)",
        glowSage: "0 0 25px -4px rgba(78, 88, 65, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseAura: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.05)" },
        },
        floatSubtle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s infinite linear",
        pulseAura: "pulseAura 7s ease-in-out infinite",
        floatSubtle: "floatSubtle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
