import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/store/TopBar";
import AppCard from "@/components/store/AppCard";
import Footer from "@/components/store/Footer";
import AboutDialog from "@/components/store/AboutDialog";
import CategoryGrid from "@/components/store/CategoryGrid";
import {
  shuffledApps,
  categoryList,
  appsByCategory,
  getAppSlug,
} from "@/data/apps";

function getAppsPerPage() {
  if (window.innerWidth >= 1536) return 96; // ultrawide
  if (window.innerWidth >= 1280) return 72; // desktop
  if (window.innerWidth >= 1024) return 60; // laptop
  return 30; // mobile / tablet
}

type View = "home" | "categories";

const Index = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [pageDirection, setPageDirection] = useState<"left" | "right" | null>(
    null
  );
  const [animKey, setAnimKey] = useState(0);

  const [appsPerPage, setAppsPerPage] = useState(getAppsPerPage());

  useEffect(() => {
    const onResize = () => setAppsPerPage(getAppsPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApps.length / appsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedApps = useMemo(
    () =>
      filteredApps.slice(
        (safePage - 1) * appsPerPage,
        safePage * appsPerPage
      ),
    [filteredApps, safePage, appsPerPage]
  );

  const goToPage = useCallback(
    (page: number, dir?: "left" | "right") => {
      setPageDirection(dir || (page > currentPage ? "left" : "right"));
      setCurrentPage(page);
      setAnimKey((k) => k + 1);
    },
    [currentPage]
  );

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

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 60) {
      if (diff > 0 && safePage < totalPages)
        goToPage(safePage + 1, "left");
      else if (diff < 0 && safePage > 1)
        goToPage(safePage - 1, "right");
    }

    setTouchStart(null);
  };

  const swipeStyle =
    pageDirection === "left" || pageDirection === "right"
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
        className="flex-1 max-w-7xl mx-auto w-full px-4 py-6"
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
                  ? `${filteredApps.length} result${
                      filteredApps.length !== 1 ? "s" : ""
                    } for "${searchQuery}"`
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
              <div
                className="
                  grid
                  gap-3
                  [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]
                "
              >
                {paginatedApps.map((app, i) => (
                  <div
                    key={app.id}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                  >
                    <AppCard
                      app={app}
                      onClick={() =>
                        navigate(`/app/${getAppSlug(app)}`)
                      }
                    />
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
    </div>
  );
};

export default Index;
