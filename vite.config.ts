import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const base = process.env.GITHUB_PAGES_BASE ?? "/";
  return {
    base,
    plugins: [react()]
  };
});
