import path from "node:path";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

export default viteConfig;
