
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
  viewId: string;
  ipInfo?: any;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  latestViews: VisitorData[];
  viewsByPage: Record<string, number>;
}

// Add this type alias for backward compatibility with ViewCounter component
export type AnalyticsData = VisitorData;
