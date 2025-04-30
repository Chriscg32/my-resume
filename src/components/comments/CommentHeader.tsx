
import React from 'react';
import { MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentHeaderProps {
  showAdminView: boolean;
  onExportComments: () => void;
  onToggleAdmin: () => void;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  showAdminView,
  onExportComments,
  onToggleAdmin
}) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <MessageSquare className="text-accent" size={24} />
      <h2 className="text-2xl font-bold text-white">Comments & Feedback</h2>
      
      {/* Hidden admin toggle */}
      <div className="ml-auto w-4 h-4" onDoubleClick={onToggleAdmin}></div>
      
      {showAdminView && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onExportComments}
          className="ml-2 flex items-center gap-1 text-xs bg-slate-800 border-accent/30 text-accent"
        >
          <Download size={14} />
          <span>Export</span>
        </Button>
      )}
    </div>
  );
};

export default CommentHeader;
