/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d8d8dd",
          300: "#b4b4bd",
          400: "#878793",
          500: "#5b5b67",
          600: "#3f3f48",
          700: "#2d2d34",
          800: "#1d1d22",
          900: "#0e0e11",
        },
        brand: {
          DEFAULT: "#0a7b6f",
          dark: "#075c54",
          light: "#1ea394",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
