/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Warm stone neutrals. ink-950 is the text colour, ink-600 secondary text,
        // ink-200 hairline borders, ink-50 the page ground.
        ink: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
        // Emerald accent.
        brand: {
          DEFAULT: "#047857",
          dark: "#065F46",
          light: "#34D399",
          tint: "#ECFDF5",
          line: "#D1FAE5",
        },
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        site: "1200px",
      },
      borderRadius: {
        card: "14px",
      },
      letterSpacing: {
        display: "-0.045em",
        heading: "-0.025em",
      },
    },
  },
  plugins: [],
};
