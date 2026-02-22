export interface AppData {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  source: string;
  downloadUrl?: string;
  releaseTag: string;
  sha256: string | null;
  lastUpdated: string;
  featured: boolean;
  tags: string[];
}
