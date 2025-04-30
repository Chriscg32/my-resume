
import React from 'react';
import { BarChart, Download } from 'lucide-react';
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
  ipInfo?: {
    ip?: string;
    city?: string;
    country?: string;
  };
}

interface AnalyticsDetailsProps {
  analytics: AnalyticsData[];
  showDetails: boolean;
}

const AnalyticsDetails: React.FC<AnalyticsDetailsProps> = ({ analytics, showDetails }) => {
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

  if (!showDetails) return null;
  
  return (
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
        <p className="mb-2">Total views: <span className="font-semibold text-accent">{analytics.length}</span></p>
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
  );
};

export default AnalyticsDetails;
