import { useState } from "react";
import {
  Mail,
  Zap,
  Shield,
  GitPullRequest,
  Github,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* =========================
            ABOUT FASTDROID
        ========================= */}
        <div>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <Zap className="w-4 h-4 text-primary" />
            About FastDroid
            {showAbout ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showAbout && (
            <div className="mt-3 rounded-lg bg-card border border-border p-4 space-y-3">
              <Feature
                icon={<Zap className="w-4 h-4 text-primary" />}
                title="Faster Downloads"
                text="Direct links to official developer releases. No mirrors, no waiting pages, no rebuild queues."
              />
              <Feature
                icon={<Shield className="w-4 h-4 text-primary" />}
                title="No Rebuild Delays"
                text="Unlike F-Droid, FastDroid does not rebuild apps on slow servers. What the developer ships is what you download."
              />
              <Feature
                icon={<Shield className="w-4 h-4 text-primary" />}
                title="Curated, Not Crowdsourced"
                text="Every app is manually reviewed. No fake ratings, no engagement-driven algorithms."
              />
              <Feature
                icon={<Zap className="w-4 h-4 text-primary" />}
                title="Lightweight & Private"
                text="No accounts, no trackers, no ads. Works well on slow devices and unreliable networks."
              />
            </div>
          )}
        </div>

        {/* =========================
            SUBMIT YOUR APP
        ========================= */}
        <div>
          <button
            onClick={() => setShowSubmit(!showSubmit)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <GitPullRequest className="w-4 h-4 text-primary" />
            Submit Your App
            {showSubmit ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showSubmit && (
            <div className="mt-3 rounded-lg bg-card border border-border p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                FastDroid accepts <strong className="text-foreground">open-source Android apps only. Closed source apps accepted after deep reviews.</strong>.
                Submissions are handled via GitHub Pull Requests — no email drops, no auto-listing.
              </p>

              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <GitPullRequest className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  Add a JSON file under 'src/data' describing your app
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  Provide a direct APK download link (preferably GitHub Releases)
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  Include a 512×512 PNG icon if available
                </li>
              </ul>

              <a
                href="https://github.com/dwip-the-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Github className="w-4 h-4" />
                Go to the repository & open a PR
                <ExternalLink className="w-3 h-3" />
              </a>

              <p className="text-xs text-muted-foreground">
                All submissions are reviewed manually. No auto-approval. No bots.
              </p>
            </div>
          )}
        </div>

        {/* =========================
            BOTTOM BAR
        ========================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono pt-2 border-t border-border">
          <span>FastDroid — open Android app distribution</span>

          <div className="flex items-center gap-4">
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
      </div>
    </footer>
  );
};

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{text}</p>
    </div>
  </div>
);

export default Footer;
