import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // ⚙️ fix lỗi "global is not defined"
  },
  server: {
    proxy: {
      "/food/ws": {
        target: "http://localhost:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
