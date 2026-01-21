import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 1px 0 rgba(255,255,255,0.06), 0 18px 40px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
