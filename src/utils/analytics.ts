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
    'aol.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com',
    'live.com', 'msn.com', 'me.com', 'mac.com', 'googlemail.com'
  ];
  
  const domain = email.split('@')[1];
  if (!domain || personalDomains.includes(domain.toLowerCase())) return null;
  
  // Enhanced company detection algorithm
  const domainParts = domain.split('.');
  const tld = domainParts.pop(); // Get the TLD (.com, .org, etc.)
  
  // Check for known subdomains
  const knownSubdomains = ['mail', 'email', 'corp', 'work', 'company', 'business'];
  let companyPart = domainParts[0];
  
  if (domainParts.length > 1 && knownSubdomains.includes(domainParts[0].toLowerCase())) {
    companyPart = domainParts[1]; // Use the second part if first is a known subdomain
  }
  
  const possibleName = companyPart
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Calculate confidence based on domain complexity
  const confidence = domainParts.length > 1 ? 0.8 : 0.6;
    
  return {
    domain,
    name: possibleName,
    confidence
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

/**
 * Extracts potential company information from domain name
 * @param domain The domain to analyze
 * @returns Company name and confidence score
 */
export const extractCompanyFromDomain = (domain: string): { name: string; confidence: number } | null => {
  if (!domain) return null;
  
  // Remove common TLDs
  const withoutTld = domain.replace(/\.(com|org|net|io|co|gov|edu|app)$/i, '');
  
  // Split by periods and get the last part
  const parts = withoutTld.split('.');
  const baseName = parts[parts.length - 1];
  
  // Format name
  const formattedName = baseName
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    name: formattedName,
    confidence: 0.7
  };
};

export default {
  trackPageView,
  detectCompanyFromEmail,
  extractCompanyFromDomain,
  getAnalyticsSummary,
  exportAnalyticsData
};
