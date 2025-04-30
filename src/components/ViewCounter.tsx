
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { AnalyticsSummary } from '@/types/analytics';

const ViewCounter: React.FC = () => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load view count from localStorage first for immediate feedback
    const storedCount = localStorage.getItem('portfolio-view-count');
    if (storedCount) {
      setViewCount(parseInt(storedCount, 10));
    }

    // Then try to get the actual analytics
    const fetchViewCount = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll use localStorage as our "database"
        const storedData = localStorage.getItem('portfolio-analytics');
        let analytics: AnalyticsSummary;
        
        if (storedData) {
          analytics = JSON.parse(storedData);
        } else {
          // Initialize if not exists
          analytics = {
            totalViews: 1,
            uniqueVisitors: 1,
            latestViews: [],
            viewsByPage: { '/': 1 }
          };
          localStorage.setItem('portfolio-analytics', JSON.stringify(analytics));
        }
        
        setViewCount(analytics.totalViews);
        localStorage.setItem('portfolio-view-count', analytics.totalViews.toString());
      } catch (error) {
        console.error('Failed to fetch view count:', error);
        // Fallback to a default value
        setViewCount(1);
      } finally {
        setLoading(false);
      }
    };

    fetchViewCount();
  }, []);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <Eye size={16} className="text-accent" />
      <span className="text-accent font-medium">
        {loading ? '...' : viewCount.toLocaleString()} views
      </span>
    </div>
  );
};

export default ViewCounter;
