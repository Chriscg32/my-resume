
/**
 * Analytics utility for tracking and analyzing visitor data
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

/**
 * Detects potential company information from email address
 */
export const detectCompanyFromEmail = (email: string): { domain?: string; name?: string; confidence: number } | null => {
  if (!email || !email.includes('@')) return null;
  
  const personalDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
    'aol.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com'
  ];
  
  const domain = email.split('@')[1];
  if (!domain || personalDomains.includes(domain.toLowerCase())) return null;
  
  // Simple company detection algorithm
  const domainParts = domain.split('.');
  const possibleName = domainParts[0]
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    domain,
    name: possibleName,
    confidence: 0.7 // Basic confidence score
  };
};

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

export default {
  trackPageView,
  detectCompanyFromEmail,
  getAnalyticsSummary,
  exportAnalyticsData
};
