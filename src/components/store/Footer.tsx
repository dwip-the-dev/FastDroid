import {
  AlertTriangle,
  Github,
  GitPullRequest,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
} from "lucide-react";
import { useState, useMemo } from "react";

interface FooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Footer = ({ currentPage, totalPages, onPageChange }: FooterProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  // Sliding window of max 3 page numbers
  const visiblePages = useMemo(() => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    let start = currentPage - 1;
    if (start < 1) start = 1;
    if (start + 2 > totalPages) start = totalPages - 2;
    
    return [start, start + 1, start + 2];
  }, [currentPage, totalPages]);

  return (
    <footer className="sticky bottom-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Prev
            </button>
            <div className="flex items-center gap-1">
              {visiblePages[0] > 1 && (
                <>
                  <button
                    onClick={() => onPageChange(1)}
                    className="w-8 h-8 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    1
                  </button>
                  {visiblePages[0] > 2 && (
                    <span className="w-6 text-center text-xs text-muted-foreground">…</span>
                  )}
                </>
              )}
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 rounded-md text-xs font-medium transition-all duration-200 ${
                    p === currentPage
                      ? "bg-primary text-primary-foreground scale-110"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {p}
                </button>
              ))}
              {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                  {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                    <span className="w-6 text-center text-xs text-muted-foreground">…</span>
                  )}
                  <button
                    onClick={() => onPageChange(totalPages)}
                    className="w-8 h-8 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              Next →
            </button>
          </div>
        )}

        {/* Collapsible sections */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowDisclaimer(!showDisclaimer);
                setShowSubmit(false);
              }}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <AlertTriangle className="w-3 h-3" />
              Disclaimer
              {showDisclaimer ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </button>
            <button
              onClick={() => {
                setShowSubmit(!showSubmit);
                setShowDisclaimer(false);
              }}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <GitPullRequest className="w-3 h-3" />
              Submit App
              {showSubmit ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/dwip-the-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3 h-3" />
              Source
            </a>
            <span className="text-primary">● OpenSource</span>
          </div>
        </div>

        {/* Disclaimer expand */}
        {showDisclaimer && (
          <div className="rounded-lg bg-card border border-border p-4 space-y-2 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2">
            <p>
              <strong className="text-foreground">FastDroid does not host any APK files.</strong>{" "}
              All download links point directly to the original developer's release pages.
            </p>
            <p>
              We are an independent, community-driven directory. Install at your own risk.
              SHA-256 hashes are provided where available.
            </p>
          </div>
        )}

        {/* Submit expand */}
        {showSubmit && (
          <div className="rounded-lg bg-card border border-border p-4 space-y-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2">
            <p>
              FastDroid accepts <strong className="text-foreground">open-source Android apps</strong>.
              Submissions via GitHub Pull Requests only.
            </p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <GitPullRequest className="w-3 h-3 text-primary flex-shrink-0" />
                Add a JSON file under 'src/data'
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-primary flex-shrink-0" />
                Provide a direct APK download link
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-primary flex-shrink-0" />
                Include a 512×512 PNG icon
              </li>
            </ul>
            <a
              href="https://github.com/dwip-the-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Github className="w-3 h-3" />
              Open a PR
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
