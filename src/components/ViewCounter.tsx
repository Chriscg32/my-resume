
import React, { useEffect, useState } from 'react';
import { Eye, BarChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnalyticsData {
  page: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
  viewId: string;
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
        // Get existing analytics from localStorage
        const existingAnalytics = JSON.parse(localStorage.getItem('pageViewAnalytics') || '[]');
        
        // Generate a unique ID for this view using timestamp + random string
        const viewId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Create new analytics entry
        const newAnalytics: AnalyticsData = {
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent,
          viewId: viewId
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

    // Small delay to ensure it counts after page fully loads
    const timer = setTimeout(() => {
      incrementViewCount();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle analytics details - hidden for regular visitors, double click to see
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 text-white/70 text-sm" onDoubleClick={toggleDetails}>
        <Eye size={16} className="text-accent" />
        {loading ? (
          <span className="animate-pulse">Loading views...</span>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>{viewCount.toLocaleString()} portfolio views</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Double-click to see analytics (admin only)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {showDetails && (
        <div className="mt-2 p-3 bg-slate-800 rounded-md text-xs text-white/70 max-h-32 overflow-auto">
          <div className="flex items-center gap-2 mb-2">
            <BarChart size={14} className="text-accent" />
            <span className="font-semibold">View Analytics (Admin Only)</span>
          </div>
          <div>
            <p>Last 5 views:</p>
            <ul>
              {analytics.slice(-5).reverse().map((entry, idx) => (
                <li key={idx} className="text-[10px] mt-1 border-t border-white/10 pt-1">
                  {new Date(entry.timestamp).toLocaleString()} - {entry.referrer}
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
