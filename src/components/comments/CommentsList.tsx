
import React from 'react';
import { CommentType } from '@/types/comment';
import CommentItem from './CommentItem';

interface CommentsListProps {
  comments: CommentType[];
  showAdminView: boolean;
  onLike: (id: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  showAdminView,
  onLike
}) => {
  return (
    <div className="mb-8 space-y-4">
      {comments.length === 0 ? (
        <p className="text-white/70 italic text-center py-4">No comments found with the current filters</p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            showAdminView={showAdminView}
            onLike={onLike}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;
