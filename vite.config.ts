import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import Sitemap from "vite-plugin-sitemap"

// Import app data for dynamic routes
import fs from "fs"

function getAppSlugs(): string[] {
  const dataDir = path.resolve(__dirname, "src/data")
  try {
    const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith(".json"))
    return files.map((f: string) => {
      const data = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf-8"))
      const slug = (data.name || "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "")
      return `/app/${slug}`
    }).filter(Boolean)
  } catch {
    return []
  }
}

const dynamicRoutes = getAppSlugs()

export default defineConfig({
  server: {
    host: true,
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    Sitemap({
      hostname: "https://fastdroid.com",
      dynamicRoutes: ["/", "/home", "/search", ...dynamicRoutes],
      readable: true,
      generateRobotsTxt: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    target: "esnext",
    minify: "esbuild",
  },
})
