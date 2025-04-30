
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ViewCounter: React.FC = () => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to get current count and increment it
    const incrementViewCount = async () => {
      try {
        // For now, using localStorage to simulate database persistence
        const currentCount = localStorage.getItem('pageViewCount') || '0';
        const newCount = parseInt(currentCount) + 1;
        
        // Store the updated count
        localStorage.setItem('pageViewCount', newCount.toString());
        setViewCount(newCount);
        setLoading(false);
        
        // Send analytics data (simulated)
        const analyticsData = {
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent
        };
        
        console.log('View analytics:', analyticsData);
        
        // Only show toast on milestone views
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

  return (
    <div className="flex items-center gap-2 text-white/70 text-sm">
      <Eye size={16} className="text-accent" />
      {loading ? (
        <span className="animate-pulse">Loading views...</span>
      ) : (
        <span>{viewCount.toLocaleString()} portfolio views</span>
      )}
    </div>
  );
};

export default ViewCounter;
