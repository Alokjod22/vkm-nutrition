/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          yellow: "#F59E0B",
          gold: "#D97706",
          green: "#10B981",
          emerald: "#059669",
          red: "#EF4444",
          mb: "#E11D48",
          pintola: "#D97706",
          alpino: "#059669",
          accent: "#2563EB",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
}
