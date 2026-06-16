import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { join } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "lumi-static-clean-article-routes",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split("?")[0] || "";
          if (url.startsWith("/bai-viet/") && !url.endsWith(".html")) {
            const cleanPath = url.replace(/^\/+/, "");
            const target = join(server.config.root, "public", cleanPath, "index.html");
            if (existsSync(target)) {
              req.url = `${url.replace(/\/$/, "")}/index.html`;
            }
          }
          next();
        });
      },
    },
  ],
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
});
