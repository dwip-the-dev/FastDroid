import { Search, X } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "all", label: "All Apps" },
  { id: "featured", label: "Hot Picks" },
  { id: "disclaimer", label: "Disclaimer" },
];

const TopBar = ({ searchQuery, onSearchChange, activeTab, onTabChange }: TopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
        {!searchOpen && (
          <>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-semibold text-foreground tracking-tight">FastDroid</span>
            </div>

            {/* Tabs */}
            <nav className="flex items-center gap-1 ml-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex-1" />
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
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
