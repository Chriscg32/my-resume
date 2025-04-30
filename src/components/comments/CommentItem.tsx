
import React from 'react';
import { User, ThumbsUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CommentType } from '@/types/comment';

interface CommentItemProps {
  comment: CommentType;
  showAdminView: boolean;
  onLike: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  showAdminView,
  onLike
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center">
            <User size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{comment.name}</h3>
            {comment.website && (
              <a 
                href={comment.website.startsWith('http') ? comment.website : `https://${comment.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                {comment.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
        <span className="text-xs text-white/50">
          {new Date(comment.timestamp).toLocaleDateString()}
        </span>
      </div>
      <p className="text-white/80 mb-3">{comment.comment}</p>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-1 text-xs ${comment.userLiked ? "text-accent" : "text-white/60"}`}
          onClick={() => onLike(comment.id)}
        >
          <ThumbsUp size={14} />
          <span>{comment.likes} likes</span>
        </Button>
        
        {/* Admin-only information */}
        {showAdminView && (
          <div className="text-xs text-white/50 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-slate-700 rounded-full">Email: {comment.email}</span>
            {comment.companyInfo && (
              <span className="px-2 py-1 bg-accent/20 text-accent rounded-full flex items-center gap-1">
                <Info size={10} />
                Company: {comment.companyInfo.name || comment.companyInfo.domain}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
