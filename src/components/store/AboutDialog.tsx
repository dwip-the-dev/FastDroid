import { X, Zap, Shield } from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: <Zap className="w-4 h-4 text-primary" />,
    title: "Faster Downloads",
    text: "Direct links to official developer releases. No mirrors, no waiting pages, no rebuild queues.",
  },
  {
    icon: <Shield className="w-4 h-4 text-primary" />,
    title: "No Rebuild Delays",
    text: "Unlike F-Droid, FastDroid does not rebuild apps on slow servers. What the developer ships is what you download.",
  },
  {
    icon: <Shield className="w-4 h-4 text-primary" />,
    title: "Curated, Not Crowdsourced",
    text: "Every app is manually reviewed. No fake ratings, no engagement-driven algorithms.",
  },
  {
    icon: <Zap className="w-4 h-4 text-primary" />,
    title: "Lightweight & Private",
    text: "No accounts, no trackers, no ads. Works well on slow devices and unreliable networks.",
  },
];

const AboutDialog = ({ open, onClose }: AboutDialogProps) => {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-[hsl(var(--dim))] backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-20 z-50 max-w-lg mx-auto bg-card border border-border rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">About FastDroid</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="mt-0.5">{f.icon}</div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutDialog;
