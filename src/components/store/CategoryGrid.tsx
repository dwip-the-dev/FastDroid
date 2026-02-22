interface CategoryGridProps {
  categories: string[];
  appsByCategory: Record<string, number>;
  onSelect: (category: string) => void;
}

const categoryColors = [
  "from-emerald-600/20 to-teal-700/20 border-emerald-600/30",
  "from-blue-600/20 to-indigo-700/20 border-blue-600/30",
  "from-orange-500/20 to-red-600/20 border-orange-500/30",
  "from-violet-600/20 to-purple-700/20 border-violet-600/30",
  "from-cyan-500/20 to-blue-600/20 border-cyan-500/30",
  "from-rose-500/20 to-pink-600/20 border-rose-500/30",
  "from-amber-500/20 to-orange-600/20 border-amber-500/30",
  "from-lime-500/20 to-green-600/20 border-lime-500/30",
];

const CategoryGrid = ({ categories, appsByCategory, onSelect }: CategoryGridProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`flex flex-col items-start gap-1 p-4 rounded-xl bg-gradient-to-br ${
              categoryColors[i % categoryColors.length]
            } border hover:scale-[1.04] hover:shadow-md transition-all duration-200 text-left animate-fade-in opacity-0 [animation-fill-mode:forwards]`}
          >
            <span className="text-sm font-medium text-foreground">{cat}</span>
            <span className="text-xs text-muted-foreground">
              {appsByCategory[cat] || 0} app{(appsByCategory[cat] || 0) !== 1 ? "s" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
