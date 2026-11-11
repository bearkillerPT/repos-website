import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  define: {
    // scripts/build.mjs sets BUILD_TIME once for both the browser and the server bundle
    __BUILD_TIME__: JSON.stringify(process.env.BUILD_TIME ?? new Date().toISOString()),
  },
  // The server bundle (for prerendering) has its own entry, src/entry-server.tsx
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          // 404.html is a plain page sharing the site's styles; nginx serves it for unknown addresses
          input: {
            main: path.resolve(import.meta.dirname, "index.html"),
            notFound: path.resolve(import.meta.dirname, "404.html"),
          },
        },
      },
}));
