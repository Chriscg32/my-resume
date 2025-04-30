
import React, { useState, useEffect } from 'react';
import { Database, User, Building2, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getAnalyticsSummary, exportAnalyticsData } from '@/utils/analytics';
import { CommentType } from '@/types/comment';

const AdminPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [companyVisits, setCompanyVisits] = useState<any[]>([]);
  
  // Load data when panel is visible
  useEffect(() => {
    if (visible) {
      try {
        // Get comments with company info
        const savedComments = JSON.parse(localStorage.getItem('portfolioComments') || '[]');
        setComments(savedComments);
        
        // Get analytics data
        const analytics = getAnalyticsSummary();
        setAnalyticsData(analytics);
        
        // Extract company visits from comments
        const companies = savedComments
          .filter((comment: CommentType) => comment.companyInfo)
          .map((comment: CommentType) => ({
            name: comment.companyInfo?.name || '',
            domain: comment.companyInfo?.domain || '',
            email: comment.email,
            timestamp: comment.timestamp
          }));
        
        setCompanyVisits(companies);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    }
  }, [visible]);
  
  const handleExport = () => {
    const success = exportAnalyticsData();
    if (success) {
      toast({
        title: "Data exported",
        description: "Analytics, comments and company data exported successfully",
      });
    }
  };
  
  // Secret toggle: This is hidden and only accessible via keyboard shortcut or special action
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A to toggle admin panel
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setVisible(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-auto p-4">
      <div className="container mx-auto max-w-5xl bg-slate-900 rounded-lg border border-slate-700 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Database className="text-accent" size={24} />
            <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleExport}
              className="bg-accent hover:bg-accent/80 flex items-center gap-1 text-white"
              size="sm"
            >
              <Download size={14} />
              Export All Data
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setVisible(false)}
              className="border-white/20"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
        
        {/* Analytics summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-1">
              <User size={16} className="text-accent" />
              Visitors
            </h3>
            <div className="text-2xl font-bold text-white">
              {analyticsData?.uniqueVisitors || 0}
            </div>
            <div className="text-xs text-white/60 mt-1">
              Total page views: {analyticsData?.totalViews || 0}
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-1">
              <Building2 size={16} className="text-accent" />
              Companies Detected
            </h3>
            <div className="text-2xl font-bold text-white">
              {companyVisits.length}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {companyVisits.length > 0 ? 'Latest: ' + companyVisits[0].name : 'No companies detected yet'}
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-1">
              <Mail size={16} className="text-accent" />
              Contact Emails
            </h3>
            <div className="text-2xl font-bold text-white">
              {comments.length}
            </div>
            <div className="text-xs text-white/60 mt-1">
              Hidden from public view
            </div>
          </div>
        </div>
        
        {/* Company information table */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-1">
            <Building2 size={16} className="text-accent" />
            Detected Companies
          </h3>
          
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            {companyVisits.length === 0 ? (
              <div className="p-4 text-white/60 text-center">No company information detected yet</div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-white/60 bg-slate-700">
                  <tr>
                    <th className="px-4 py-2">Company Name</th>
                    <th className="px-4 py-2">Domain</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {companyVisits.map((company, idx) => (
                    <tr key={idx} className="border-t border-slate-700 text-white/80">
                      <td className="px-4 py-2 font-medium">{company.name}</td>
                      <td className="px-4 py-2">{company.domain}</td>
                      <td className="px-4 py-2">{company.email}</td>
                      <td className="px-4 py-2">{new Date(company.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xs text-white/40">
            This admin panel is only visible to you. Access it anytime with Ctrl+Shift+A.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
