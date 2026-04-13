// SEO individual check result
export interface SeoCheckItem {
  name: string;
  score: number;
  maxScore: number;
  status: "good" | "warning" | "bad";
  message: string;
  detail?: string;
  evidence?: "confirmed" | "observed" | "experimental"; // エビデンスレベル
  action?: {
    what: string;       // 何をすればいいか（素人向け）
    difficulty: 1 | 2 | 3; // 難易度 1=自分でできる 2=制作会社に依頼 3=専門家必要
    impact: string;     // やるとどうなるか
  };
}

// SEO check result
export interface SeoResult {
  score: number;
  items: SeoCheckItem[];
  pageSeo: SeoCheckItem[];
  siteSeo: SeoCheckItem[];
  geoSeo: SeoCheckItem[];
}

// GEO/LLMO check result
export interface GeoResult {
  score: number;
  citability: { score: number; maxScore: number; details: string[] };
  aiReadability: { score: number; maxScore: number; details: string[] };
  eeat: { score: number; maxScore: number; details: string[] };
  freshness: { score: number; maxScore: number; details: string[] };
  aiSimulation: { score: number; maxScore: number; details: string[] };
  improvements: GeoImprovement[];
  siteStructure?: {
    siteType: string;
    hasBlog: boolean;
    hasServicePages: boolean;
    hasFaq: boolean;
    estimatedScale: string;
    notes: string;
  };
}

export interface GeoImprovement {
  priority: number;
  title: string;
  description: string;
  target?: "chatgpt" | "gemini" | "perplexity" | "claude" | "all";
}

// Site-wide analysis (AI perspective)
export interface SitePageScore {
  url: string;
  title: string;
  score: number;
  pageScore: number;  // pageSeo only
  geoScore: number;   // geoSeo only
}

export interface SiteAnalysis {
  pagesAnalyzed: number;
  bestPage: SitePageScore | null;
  pages: SitePageScore[];
  averageScore: number;
}

// Full analysis result
export interface AnalysisResult {
  url: string;
  analyzedAt: string;
  seo: SeoResult;
  geo: GeoResult;
  overallScore: number;
}

// Extracted page data from HTML
export interface PageData {
  url: string;
  html: string;
  title: string;
  metaDescription: string;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  headings: { level: number; text: string }[];
  jsonLd: JsonLdData[];
  canonical: string | null;
  robotsMeta: string | null;
  images: { src: string; alt: string | null }[];
  hasViewport: boolean;
  isHttps: boolean;
  semanticElements: {
    article: number;
    section: number;
    nav: number;
    main: number;
    aside: number;
    details: number;
  };
  textContent: string;
  entityDefinitions: string[];
  questionHeadings: string[];
}

export interface JsonLdData {
  type: string;
  raw: Record<string, unknown>;
}

// External resource check
export interface ExternalChecks {
  sitemapExists: boolean;
  robotsTxtExists: boolean;
  llmsTxtExists: boolean;
  aiCrawlersBlocked: string[];
  sitemap: SitemapAnalysis | null;
}

// Sitemap analysis
export interface SitemapAnalysis {
  totalPages: number;
  hasBlog: boolean;
  blogPageCount: number;
  urlPatterns: string[];
  lastModified: string | null;
  recentlyUpdated: number; // pages updated in last 90 days
  oldestUpdate: string | null;
  freshnessPct: number; // % of pages updated in last 90 days
}
