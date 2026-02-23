// DO NOT TOUCH THIS FILE

import { AppData } from "@/types/app";

const modules = import.meta.glob<AppData>("./**/*.json", {
  eager: true,
  import: "default",
});

const allApps: AppData[] = Object.values(modules);

// Random per session seed
function getSessionSeed(): number {
  const KEY = "fastdroid-seed";
  const stored = sessionStorage.getItem(KEY);

  if (stored) return Number(stored);

  const seed = Math.floor(Math.random() * 1_000_000_000);
  sessionStorage.setItem(KEY, seed.toString());
  return seed;
}

function seededShuffle(arr: AppData[], seed: number): AppData[] {
  const copy = [...arr];
  let s = seed;

  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export const shuffledApps = seededShuffle(allApps, getSessionSeed());

export const categoryList = [...new Set(allApps.map((a) => a.category))].sort();

export const appsByCategory: Record<string, number> = {};
for (const app of allApps) {
  appsByCategory[app.category] = (appsByCategory[app.category] || 0) + 1;
}

export function getAppSlug(app: AppData | string): string {
  const name = typeof app === "string" ? app : app.name;
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAppBySlug(slug: string): AppData | undefined {
  return allApps.find((app) => getAppSlug(app.name) === slug);
}
