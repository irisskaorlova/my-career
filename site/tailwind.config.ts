import type { Config } from "tailwindcss";

// Цвета берутся из CSS-переменных в app/globals.css —
// менять палитру нужно там, в одном месте.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        muted: "var(--muted)",
        line: "var(--line)",
        card: "var(--card)",
      },
    },
  },
  plugins: [],
};

export default config;
