import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "magnetic-freely-cougar.ngrok-free.app",
      "exotic-reindeer-quick.ngrok-free.app",
    ],
    proxy: {
      "/api": {
        target: "http://141.11.190.106:15000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
