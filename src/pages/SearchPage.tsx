import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { shuffledApps } from "@/data/apps";
import { getAppSlug } from "@/data/apps";
import AppCard from "@/components/store/AppCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return shuffledApps.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
            <ArrowLeft size={18} />
          </button>
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            autoFocus
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        {query.trim() ? (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {results.map((app, i) => (
                  <div key={app.id} style={{ animationDelay: `${i * 30}ms` }} className="animate-fade-in opacity-0 [animation-fill-mode:forwards]">
                    <AppCard app={app} onClick={() => navigate(`/app/${getAppSlug(app)}`)} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-12 text-center">No apps found.</p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground py-12 text-center">Start typing to search...</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
