import { useState, useMemo } from "react";
import TopBar from "@/components/store/TopBar";
import AppCard from "@/components/store/AppCard";
import AppDetailPanel from "@/components/store/AppDetailPanel";
import Footer from "@/components/store/Footer";
import { AlertTriangle } from "lucide-react";

/* =========================
   Types
========================= */

interface AppData {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  source: string;
  downloadUrl?: string;
  releaseTag: string;
  sha256: string | null;
  lastUpdated: string;
  featured: boolean;
  tags: string[];
}

/* =========================
   Dynamic App Import (Vite)
========================= */

// Loads ALL json files inside src/data/*.json
const modules = import.meta.glob("@/data/*.json", {
  eager: true,
  import: "default",
});

const apps: AppData[] = (Object.values(modules) as AppData[])
  // basic sanity filter
  .filter((app) => app && app.id && app.name)
  // stable ordering
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

/* =========================
   Page Component
========================= */

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const isSearching = searchQuery.trim().length > 0;

  const filteredApps = useMemo(() => {
    if (!isSearching) return apps;

    const q = searchQuery.toLowerCase();

    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, isSearching]);

  const featured = useMemo(
    () => apps.filter((a) => a.featured),
    []
  );

  const renderContent = () => {
    if (isSearching) {
      return (
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            {filteredApps.length} result
            {filteredApps.length !== 1 ? "s" : ""} for "{searchQuery}"
          </h2>

          <div className="space-y-1">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => setSelectedApp(app)}
              />
            ))}

            {filteredApps.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No apps found. Try a different search.
              </p>
            )}
          </div>
        </section>
      );
    }

    switch (activeTab) {
      case "featured":
        return (
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Hot Picks
            </h2>

            <div className="space-y-1">
              {featured.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onClick={() => setSelectedApp(app)}
                />
              ))}

              {featured.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No featured apps yet.
                </p>
              )}
            </div>
          </section>
        );

      case "disclaimer":
        return (
          <div className="rounded-xl bg-card border border-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Disclaimer
              </h2>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">
                  FastDroid does not host any APK files.
                </strong>{" "}
                All download links point directly to the original developer’s
                release pages (typically GitHub Releases).
              </p>

              <p>
                We act solely as a directory and discovery service. The actual
                software is downloaded from the developer’s own infrastructure.
              </p>

              <p>
                FastDroid is not affiliated with F-Droid, Google Play, or any
                other app distribution platform. We are an independent,
                community-driven project.
              </p>

              <p>
                While we manually review every listed app, we make no guarantees
                about the safety, functionality, or legality of any software
                linked from this site.{" "}
                <strong className="text-foreground">
                  Install at your own risk.
                </strong>
              </p>

              <p>
                SHA-256 hashes are provided where available to help verify
                download integrity. Always review the source code before
                installing.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              All Apps
            </h2>

            <div className="space-y-1">
              {apps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onClick={() => setSelectedApp(app)}
                />
              ))}
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {renderContent()}
      </main>

      <Footer />

      {selectedApp && (
        <AppDetailPanel
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
};

export default Index;
