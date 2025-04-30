
import { useState, useEffect } from 'react';
import { CommentType } from '@/types/comment';
import { loadComments } from '@/utils/comments-storage';
import { useCommentFilters } from './use-comment-filters';
import { useCommentForm } from './use-comment-form';
import { useAdminComments } from './use-admin-comments';

export function useComments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  
  // Load comments from local storage on component mount
  useEffect(() => {
    setComments(loadComments());
  }, []);

  // Use the separate hooks for different functionality
  const { 
    sortOrder, 
    setSortOrder, 
    filter, 
    setFilter, 
    getFilteredAndSortedComments 
  } = useCommentFilters();

  const {
    name,
    setName,
    email,
    website,
    setWebsite,
    commentText,
    setCommentText,
    loading,
    detectedCompany,
    handleEmailChange,
    handleSubmit
  } = useCommentForm(comments, setComments);

  const {
    showAdminView,
    toggleAdminView,
    handleLike,
    exportComments
  } = useAdminComments(comments, setComments);

  // Combine and return all the functionality
  return {
    comments,
    name,
    setName,
    email,
    website,
    setWebsite,
    commentText,
    setCommentText,
    loading,
    showAdminView,
    sortOrder,
    setSortOrder,
    filter,
    setFilter,
    detectedCompany,
    handleEmailChange,
    handleSubmit,
    toggleAdminView,
    handleLike,
    exportComments,
    getFilteredAndSortedComments: () => getFilteredAndSortedComments(comments)
  };
}
