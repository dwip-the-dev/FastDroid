import { Search, X, Info } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onAboutOpen: () => void;
}

const TopBar = ({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  onAboutOpen,
}: TopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        {!searchOpen && (
          <>
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/android-chrome-192x192.png"
                alt="FastDroid"
                className="w-7 h-7 rounded-md"
              />
              <span className="font-semibold text-foreground tracking-tight hidden sm:inline">
                FastDroid
              </span>
            </div>

            {/* Category tabs - horizontally scrollable */}
            <nav className="flex items-center gap-1 ml-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={onAboutOpen}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="About"
              >
                <Info size={18} />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
          </>
        )}

        {searchOpen && (
          <div className="flex items-center gap-2 flex-1">
            <Search size={18} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search apps..."
              autoFocus
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                onSearchChange("");
              }}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
