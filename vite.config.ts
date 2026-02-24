import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import Sitemap from "vite-plugin-sitemap"
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

function getMaintenanceStatus(lastUpdated: string): string {
  if (!lastUpdated) return "Unknown"
  const year = new Date(lastUpdated).getFullYear()
  if (year < 2022) return "Maybe Abandoned"
  if (year < 2024) return "Not updated in a while"
  return "Maintained"
}

function escapeCsv(val: string): string {
  if (!val) return ""
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

function generateInventoryCsv(): string {
  const dataDir = path.resolve(__dirname, "src/data")
  const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith(".json"))
  const header = "id,name,category,version,source,downloadUrl,lastUpdated,status"
  const rows = files.map((f: string) => {
    const d = JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf-8"))
    return [
      escapeCsv(d.id || ""),
      escapeCsv(d.name || ""),
      escapeCsv(d.category || ""),
      escapeCsv(d.releaseTag || ""),
      escapeCsv(d.source || ""),
      escapeCsv(d.downloadUrl || ""),
      escapeCsv(d.lastUpdated || ""),
      escapeCsv(getMaintenanceStatus(d.lastUpdated || "")),
    ].join(",")
  })
  return [header, ...rows].join("\n")
}

// Generate CSV into public/ so it's available in dev and copied to dist on build
const csvContent = generateInventoryCsv()
const publicDir = path.resolve(__dirname, "public")
fs.writeFileSync(path.join(publicDir, "inventory.csv"), csvContent)

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
