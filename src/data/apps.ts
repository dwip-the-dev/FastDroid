// DO NOT TOUCH THIS FILE

import { AppData } from "@/types/app";

const modules = import.meta.glob<AppData>("./**.json", { eager: true, import: "default" });

const allApps: AppData[] = Object.values(modules);

// Shuffle deterministically using a seed
function seededShuffle(arr: AppData[]): AppData[] {
  const copy = [...arr];
  let seed = 42;
  for (let i = copy.length - 1; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647;
    const j = seed % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const shuffledApps = seededShuffle(allApps);

export const categoryList = [...new Set(allApps.map((a) => a.category))].sort();

export const appsByCategory: Record<string, number> = {};
for (const app of allApps) {
  appsByCategory[app.category] = (appsByCategory[app.category] || 0) + 1;
}

export function getAppSlug(app: AppData | string): string {
  const name = typeof app === "string" ? app : app.name;
  return name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getAppBySlug(slug: string): AppData | undefined {
  return allApps.find((app) => getAppSlug(app.name) === slug);
}
