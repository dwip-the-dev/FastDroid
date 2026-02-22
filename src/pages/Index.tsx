import { useState, useMemo, useCallback, useRef } from "react";
import TopBar from "@/components/store/TopBar";
import AppCard from "@/components/store/AppCard";
import AppDetailPanel from "@/components/store/AppDetailPanel";
import Footer from "@/components/store/Footer";
import AboutDialog from "@/components/store/AboutDialog";
import CategoryGrid from "@/components/store/CategoryGrid";
import type { AppData } from "@/types/app";

const APPS_PER_PAGE = 15;

const modules = import.meta.glob("@/data/*.json", { eager: true, import: "default" });

const allApps: AppData[] = (Object.values(modules) as AppData[]).filter(
  (app) => app && app.id && app.name
);

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  let seed = Date.now() % 10000;
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 16807 + 11) % 2147483647;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledApps = shuffleArray(allApps);

const categoryList = Array.from(new Set(allApps.map((a) => a.category))).sort();
const appsByCategory: Record<string, number> = {};
allApps.forEach((a) => {
  appsByCategory[a.category] = (appsByCategory[a.category] || 0) + 1;
});

type View = "home" | "categories";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [pageDirection, setPageDirection] = useState<"left" | "right" | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const isSearching = searchQuery.trim().length > 0;

  const filteredApps = useMemo(() => {
    let list = shuffledApps;
    if (activeCategory) {
      list = list.filter((a) => a.category === activeCategory);
    }
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery, isSearching, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / APPS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedApps = useMemo(
    () => filteredApps.slice((safePage - 1) * APPS_PER_PAGE, safePage * APPS_PER_PAGE),
    [filteredApps, safePage]
  );

  const goToPage = useCallback((page: number, dir?: "left" | "right") => {
    setPageDirection(dir || (page > currentPage ? "left" : "right"));
    setCurrentPage(page);
    setAnimKey((k) => k + 1);
  }, [currentPage]);

  const handleCategorySelect = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setView("home");
    setAnimKey((k) => k + 1);
  }, []);

  const handleClearCategory = useCallback(() => {
    setActiveCategory(null);
    setCurrentPage(1);
    setAnimKey((k) => k + 1);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
    if (q.trim()) setView("home");
  }, []);

  /* Swipe support */
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && safePage < totalPages) goToPage(safePage + 1, "left");
      else if (diff < 0 && safePage > 1) goToPage(safePage - 1, "right");
    }
    setTouchStart(null);
  };

  const swipeStyle = pageDirection === "left"
    ? "animate-[page-in_0.3s_ease-out]"
    : pageDirection === "right"
    ? "animate-[page-in_0.3s_ease-out]"
    : "animate-fade-in";

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeCategory={activeCategory}
        onClearCategory={handleClearCategory}
        onAboutOpen={() => setAboutOpen(true)}
        onCategoriesOpen={() => {
          setView(view === "categories" ? "home" : "categories");
          setAnimKey((k) => k + 1);
        }}
      />

      <main
        className="flex-1 max-w-6xl mx-auto w-full px-4 py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {view === "categories" ? (
          <div key="categories" className="animate-fade-in">
            <CategoryGrid
              categories={categoryList}
              appsByCategory={appsByCategory}
              onSelect={handleCategorySelect}
            />
          </div>
        ) : (
          <div key={`page-${animKey}`} className={swipeStyle}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {isSearching
                  ? `${filteredApps.length} result${filteredApps.length !== 1 ? "s" : ""} for "${searchQuery}"`
                  : activeCategory
                  ? `${activeCategory} · ${filteredApps.length} apps`
                  : `${filteredApps.length} Apps`}
              </h2>
              {totalPages > 1 && (
                <span className="text-xs text-muted-foreground font-mono">
                  {safePage}/{totalPages}
                </span>
              )}
            </div>

            {paginatedApps.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {paginatedApps.map((app, i) => (
                  <div key={app.id} style={{ animationDelay: `${i * 30}ms` }} className="animate-fade-in opacity-0 [animation-fill-mode:forwards]">
                    <AppCard app={app} onClick={() => setSelectedApp(app)} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-12 text-center animate-fade-in">
                No apps found. Try a different search or category.
              </p>
            )}
          </div>
        )}
      </main>

      <Footer
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={(p) => goToPage(p)}
      />
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
      {selectedApp && (
        <AppDetailPanel app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </div>
  );
};

export default Index;
