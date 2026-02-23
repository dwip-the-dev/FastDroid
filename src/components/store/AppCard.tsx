import { useState, memo } from "react";
import type { AppData } from "@/types/app";
import LazyImage from "./LazyImage";

interface AppCardProps {
  app: AppData;
  onClick: () => void;
}

const fallbackGradients = [
  "from-emerald-600 to-teal-700",
  "from-blue-600 to-indigo-700",
  "from-orange-500 to-red-600",
  "from-violet-600 to-purple-700",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-lime-500 to-green-600",
];

const AppCard = memo(({ app, onClick }: AppCardProps) => {
  const [imgError, setImgError] = useState(false);
  const gradientIndex = app.name.charCodeAt(0) % fallbackGradients.length;

  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:bg-accent/60 border border-border/50 hover:border-border transition-all duration-200 text-center group hover:scale-[1.03] hover:shadow-lg"
    >
      <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-muted transition-transform duration-200 group-hover:scale-110">
        {!imgError ? (
          <LazyImage
            src={app.icon}
            alt={app.name}
            className="w-full h-full"
            onError={() => setImgError(true)}
            fallback={
              <div className={`w-full h-full bg-gradient-to-br ${fallbackGradients[gradientIndex]} flex items-center justify-center`}>
                <span className="text-lg font-bold text-white">{app.name.charAt(0)}</span>
              </div>
            }
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradients[gradientIndex]} flex items-center justify-center`}>
            <span className="text-lg font-bold text-white">{app.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="min-w-0 w-full">
        <h3 className="text-sm font-medium text-foreground truncate">{app.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{app.category}</p>
      </div>
    </button>
  );
});

AppCard.displayName = "AppCard";

export default AppCard;
