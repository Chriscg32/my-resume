
/**
 * Utilities for tracking page views and visitor data
 */

import { VisitorData } from '@/types/analytics';

/**
 * Tracks a new page view and stores analytics data
 */
export const trackPageView = (): string => {
  try {
    // Check for existing session
    const sessionId = sessionStorage.getItem('portfolioSessionId') || 
      `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Store session ID if new
    if (!sessionStorage.getItem('portfolioSessionId')) {
      sessionStorage.setItem('portfolioSessionId', sessionId);
    }
    
    const viewData: VisitorData = {
      sessionId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    // Store view data
    const existingData = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
    const updatedData = [...existingData, viewData];
    localStorage.setItem('pageViewAnalytics', JSON.stringify(updatedData));
    
    // Update view count
    const viewCount = updatedData.length;
    localStorage.setItem('pageViewCount', viewCount.toString());
    
    return sessionId;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return '';
  }
};

/**
 * Get analytics summary for admin view
 */
export const getAnalyticsSummary = () => {
  try {
    const viewData = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
    const uniqueSessionsCount = new Set(viewData.map((item: VisitorData) => item.sessionId)).size;
    
    return {
      totalViews: viewData.length,
      uniqueVisitors: uniqueSessionsCount,
      latestViews: viewData.slice(-5).reverse(),
      viewsByPage: viewData.reduce((acc: Record<string, number>, item: VisitorData) => {
        acc[item.page] = (acc[item.page] || 0) + 1;
        return acc;
      }, {})
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      latestViews: [],
      viewsByPage: {}
    };
  }
};

/**
 * Export analytics data as JSON file (admin function)
 */
export const exportAnalyticsData = () => {
  try {
    const analyticsData = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
    const contactData = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const commentsData = JSON.parse(localStorage.getItem('portfolioComments') || '[]');
    
    const exportData = {
      analytics: analyticsData,
      contacts: contactData,
      comments: commentsData,
      exportDate: new Date().toISOString(),
      summary: getAnalyticsSummary()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileName = `portfolio-data-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
    
    return true;
  } catch (error) {
    console.error('Error exporting analytics data:', error);
    return false;
  }
};
