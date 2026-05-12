/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#070A12",
        panel: "#0D1220",
        line: "#22304A",
        neon: "#6D7CFF",
        cyan: "#38D5FF",
        mint: "#16E0A1",
      },
      boxShadow: {
        glow: "0 0 40px rgba(109, 124, 255, 0.22)",
      },
    },
  },
  plugins: [],
};
