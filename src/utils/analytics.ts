
/**
 * Analytics utility for tracking and analyzing visitor data
 * This file now serves as the main entry point for analytics functionality
 */

// Import functionality from separate modules
import { detectCompanyFromEmail, extractCompanyFromDomain } from './companyDetection';
import { trackPageView, getAnalyticsSummary, exportAnalyticsData } from './viewTracking';
export type { VisitorData } from '@/types/analytics';

// Re-export functionality
export { 
  detectCompanyFromEmail, 
  extractCompanyFromDomain,
  trackPageView,
  getAnalyticsSummary,
  exportAnalyticsData
};

// Default export for backwards compatibility
const analytics = {
  trackPageView,
  detectCompanyFromEmail,
  extractCompanyFromDomain,
  getAnalyticsSummary,
  exportAnalyticsData
};

export default analytics;
