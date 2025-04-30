
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { CommentType } from '@/types/comment';
import { toggleCommentLike, exportCommentsToFile } from '@/utils/comments-storage';

export function useAdminComments(comments: CommentType[], setComments: React.Dispatch<React.SetStateAction<CommentType[]>>) {
  const [showAdminView, setShowAdminView] = useState<boolean>(false);

  const toggleAdminView = () => {
    // Simple "admin" toggle with double-click
    setShowAdminView(!showAdminView);
  };

  const handleLike = (id: string) => {
    const updatedComments = toggleCommentLike(comments, id);
    setComments(updatedComments);
    
    toast({
      description: "Your feedback has been recorded",
      duration: 2000,
    });
  };

  const exportComments = () => {
    exportCommentsToFile(comments);
    
    toast({
      title: "Comments exported",
      description: "All comments have been exported to a JSON file.",
    });
  };

  return {
    showAdminView,
    toggleAdminView,
    handleLike,
    exportComments
  };
}
