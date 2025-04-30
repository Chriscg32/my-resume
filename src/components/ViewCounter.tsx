
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AnalyticsDetails from './analytics/AnalyticsDetails';
import { useAnalytics } from '@/hooks/use-analytics';

const ViewCounter: React.FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { viewCount, loading, analytics } = useAnalytics();

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
      
      <AnalyticsDetails 
        analytics={analytics} 
        showDetails={showDetails} 
      />
    </div>
  );
};

export default ViewCounter;
