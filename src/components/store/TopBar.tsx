import { Search, X, Info, LayoutGrid, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string | null;
  onClearCategory: () => void;
  onAboutOpen: () => void;
  onCategoriesOpen: () => void;
}

const TopBar = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onClearCategory,
  onAboutOpen,
  onCategoriesOpen,
}: TopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        {!searchOpen && (
          <>
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/android-chrome-192x192.png"
                alt="FastDroid"
                className="w-7 h-7 rounded-md"
              />
              <span className="font-semibold text-foreground tracking-tight">
                FastDroid
              </span>
            </div>

            {activeCategory && (
              <button
                onClick={onClearCategory}
                className="ml-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-all duration-200"
              >
                {activeCategory}
                <X size={12} />
              </button>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={onCategoriesOpen}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="Categories"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={onAboutOpen}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="About"
              >
                <Info size={18} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 hover:scale-110"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
          </>
        )}

        {searchOpen && (
          <div className="flex items-center gap-2 flex-1 animate-fade-in">
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
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
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
