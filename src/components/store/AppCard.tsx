import { useState } from "react";

interface App {
  id: string;
  name: string;
  version: string;
  category: string;
  size: string;
  icon: string;
}

interface AppCardProps {
  app: App;
  onClick: () => void;
}

const AppCard = ({ app, onClick }: AppCardProps) => {
  const [imgError, setImgError] = useState(false);

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

  const gradientIndex = app.name.charCodeAt(0) % fallbackGradients.length;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors text-left group"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
        {!imgError ? (
          <img
            src={app.icon}
            alt={app.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${fallbackGradients[gradientIndex]} flex items-center justify-center`}
          >
            <span className="text-lg font-bold text-white">
              {app.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">
          {app.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {app.category}
        </p>
      </div>

      {/* Version + View */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-xs font-mono text-muted-foreground">
          {app.version}
        </span>
        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View →
        </span>
      </div>
    </button>
  );
};

export default AppCard;
