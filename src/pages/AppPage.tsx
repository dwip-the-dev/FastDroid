import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { getAppBySlug, getAppSlug, shuffledApps } from "@/data/apps";
import LazyImage from "@/components/store/LazyImage";
import AppCard from "@/components/store/AppCard";

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

const AppPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const app = useMemo(() => (slug ? getAppBySlug(slug) : undefined), [slug]);

  const relatedApps = useMemo(() => {
    if (!app) return [];
    return shuffledApps
      .filter((a) => a.category === app.category && a.id !== app.id)
      .slice(0, 5);
  }, [app]);

  if (!app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">App Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const gradientIndex = app.name.charCodeAt(0) % fallbackGradients.length;
  const downloadHref = app.downloadUrl || `${app.source}/releases/tag/${app.releaseTag}`;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm font-medium text-foreground truncate">{app.name}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* App header */}
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
            <LazyImage
              src={app.icon}
              alt={app.name}
              className="w-full h-full"
              fallback={
                <div className={`w-full h-full bg-gradient-to-br ${fallbackGradients[gradientIndex]} flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-white">{app.name.charAt(0)}</span>
                </div>
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{app.category}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {app.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Download button */}
        <a
          href={downloadHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Download size={16} />
          Download APK
        </a>

        {/* About */}
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">About</h2>
          <p className="text-sm text-foreground leading-relaxed">{app.description}</p>
        </section>

        {/* Metadata */}
        <section>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Metadata</h2>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Release</span><span className="text-foreground">{app.releaseTag}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="text-foreground">{app.lastUpdated}</span></div>
            {app.sha256 && (
              <div>
                <span className="text-muted-foreground block mb-1">SHA-256</span>
                <span className="text-foreground break-all text-[10px]">{app.sha256}</span>
              </div>
            )}
          </div>
        </section>

        {/* Source */}
        <section className="pt-2 border-t border-border">
          <a href={app.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink size={14} /> View source code
          </a>
        </section>

        {/* Related */}
        {relatedApps.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">More in {app.category}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {relatedApps.map((a) => (
                <AppCard key={a.id} app={a} onClick={() => navigate(`/app/${getAppSlug(a)}`)} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AppPage;
