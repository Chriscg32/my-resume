
/**
 * Types for analytics data
 */

export interface VisitorData {
  sessionId: string;
  timestamp: string;
  page: string;
  referrer: string;
  userAgent: string;
  screenSize?: {
    width: number;
    height: number;
  };
  companyInfo?: {
    domain?: string;
    name?: string;
    confidence?: number;
  };
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  latestViews: VisitorData[];
  viewsByPage: Record<string, number>;
}
