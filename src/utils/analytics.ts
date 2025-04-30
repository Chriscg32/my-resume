
/**
 * Analytics utility for tracking and analyzing visitor data
 * This file now serves as the main entry point for analytics functionality
 */

// Re-export functionality from separate modules
export { detectCompanyFromEmail, extractCompanyFromDomain } from './companyDetection';
export { trackPageView, getAnalyticsSummary, exportAnalyticsData } from './viewTracking';
export type { VisitorData } from '@/types/analytics';

// Default export for backwards compatibility
export default {
  trackPageView,
  detectCompanyFromEmail,
  extractCompanyFromDomain,
  getAnalyticsSummary,
  exportAnalyticsData
};
