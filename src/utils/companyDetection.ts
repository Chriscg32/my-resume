
/**
 * Utilities for detecting company information from emails and domains
 */

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
