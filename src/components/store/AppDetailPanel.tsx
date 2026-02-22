import { X, ExternalLink, Download } from "lucide-react";
import { useState } from "react";

interface AppData {
  id: string;
  name: string;
  version: string;
  category: string;
  size: string;
  icon: string;
  description: string;
  source: string;
  downloadUrl?: string;
  releaseTag: string;
  sha256: string | null;
  lastUpdated: string;
  tags: string[];
}

interface AppDetailPanelProps {
  app: AppData;
  onClose: () => void;
}

const AppDetailPanel = ({ app, onClose }: AppDetailPanelProps) => {
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

  const downloadHref = app.downloadUrl || `${app.source}/releases/tag/${app.releaseTag}`;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[hsl(var(--dim))] backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-border overflow-y-auto animate-slide-in">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">App Details</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* App Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
              {!imgError ? (
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${fallbackGradients[gradientIndex]} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">{app.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{app.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {app.category}
              </p>
            </div>
          </div>

          {/* Primary Action */}
          <div>
            <a
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Download size={16} />
              Download APK
            </a>
            <p className="text-xs text-muted-foreground mt-2 text-center font-mono">
              Source: GitHub · {app.releaseTag}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">About</h3>
            <p className="text-sm text-foreground leading-relaxed">{app.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">
                {tag}
              </span>
            ))}
          </div>

          {/* Metadata */}
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Trust & Metadata</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="text-foreground">Latest</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-foreground">{app.lastUpdated}</span>
              </div>
              {app.sha256 && (
                <div>
                  <span className="text-muted-foreground block mb-1">SHA-256</span>
                  <span className="text-foreground break-all text-[10px] leading-relaxed">{app.sha256}</span>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-2 pt-2 border-t border-border">
            <a href={app.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink size={14} />
              View source code
            </a>
            <a href={`${app.source}/issues`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink size={14} />
              Report issue
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetailPanel;
