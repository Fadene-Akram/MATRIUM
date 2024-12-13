// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://algeriepost.rf.gd", // Backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite to remove `/api` prefix
      },
    },
  },
});
