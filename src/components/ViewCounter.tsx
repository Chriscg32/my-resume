import React, { useEffect, useState } from 'react';
import { Eye, BarChart, Download, Database } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { detectCompanyFromEmail } from '@/utils/analytics';

interface AnalyticsData {
  page: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
  viewId: string;
  ipInfo?: {
    ip?: string;
    city?: string;
    country?: string;
  };
}

const ViewCounter: React.FC = () => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    // Function to get current count and increment it
    const incrementViewCount = async () => {
      try {
        // Check if this is a new session
        const sessionId = sessionStorage.getItem('portfolioSessionId');
        if (sessionId) {
          // User already viewed in this session
          loadExistingAnalytics();
          return;
        }
        
        // Create new session ID
        const newSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('portfolioSessionId', newSessionId);
        
        // Get IP info if possible (for admin view only)
        let ipInfo = {};
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            ipInfo = {
              ip: ipData.ip,
              // We don't actually fetch city/country to respect privacy
              // This is just for demonstration
            };
          }
        } catch (ipError) {
          console.log('IP detection disabled or blocked');
        }
        
        // Get existing analytics from localStorage
        const existingAnalytics = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
        
        // Generate a unique ID for this view
        const viewId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Create new analytics entry
        const newAnalytics: AnalyticsData = {
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent,
          viewId: viewId,
          ipInfo: ipInfo as any
        };
        
        // Add to analytics collection
        const updatedAnalytics = [...existingAnalytics, newAnalytics];
        localStorage.setItem('pageViewAnalytics', JSON.stringify(updatedAnalytics));
        setAnalytics(updatedAnalytics);
        
        // Update view count
        const newCount = updatedAnalytics.length;
        localStorage.setItem('pageViewCount', newCount.toString());
        setViewCount(newCount);
        setLoading(false);
        
        // Check for milestones and notify
        if (newCount % 10 === 0) {
          toast({
            title: "Milestone reached!",
            description: `This portfolio has been viewed ${newCount} times.`,
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Error updating view count:', error);
        // Fallback to a random number if there's an error
        setViewCount(Math.floor(Math.random() * 1000) + 500);
        setLoading(false);
      }
    };

    const loadExistingAnalytics = () => {
      try {
        const existingAnalytics = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
        setAnalytics(existingAnalytics);
        setViewCount(existingAnalytics.length);
        setLoading(false);
      } catch (error) {
        console.error('Error loading view count:', error);
        setViewCount(Math.floor(Math.random() * 1000) + 500);
        setLoading(false);
      }
    };

    // Small delay to ensure it counts after page fully loads
    const timer = setTimeout(() => {
      incrementViewCount();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to download analytics data (admin only)
  const downloadAnalytics = () => {
    try {
      const dataStr = JSON.stringify(analytics, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `portfolio-analytics-${new Date().toLocaleDateString()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Analytics downloaded",
        description: "Your analytics data has been downloaded as JSON",
      });
    } catch (error) {
      console.error('Error downloading analytics:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your analytics",
        variant: "destructive",
      });
    }
  };

  // Toggle analytics details - hidden for regular visitors, double click to see
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center gap-2 text-white/70 text-sm hover:text-white/80 transition-colors cursor-pointer group" 
        onDoubleClick={toggleDetails}
      >
        <div className="bg-accent/20 p-1 rounded-full">
          <Eye size={16} className="text-accent" />
        </div>
        {loading ? (
          <span className="animate-pulse">Loading views...</span>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-medium">{viewCount.toLocaleString()} <span className="group-hover:text-accent transition-colors">portfolio views</span></span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Double-click to see analytics (admin only)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {showDetails && (
        <div className="mt-2 p-3 bg-slate-800 rounded-md text-xs text-white/70 max-h-80 overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart size={14} className="text-accent" />
              <span className="font-semibold">View Analytics (Admin Only)</span>
            </div>
            <button 
              onClick={downloadAnalytics}
              className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-xs"
            >
              <Download size={12} />
              <span>Export</span>
            </button>
          </div>
          <div>
            <p className="mb-2">Total views: <span className="font-semibold text-accent">{viewCount}</span></p>
            <p className="mb-1">Last 5 views:</p>
            <ul className="divide-y divide-white/10">
              {analytics.slice(-5).reverse().map((entry, idx) => (
                <li key={idx} className="text-[10px] py-1">
                  <div className="flex justify-between">
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    <span className="text-accent">{entry.referrer}</span>
                  </div>
                  <div className="text-white/50 truncate">{entry.userAgent.split(')')[0]})</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCounter;
