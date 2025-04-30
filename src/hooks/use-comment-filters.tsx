
import { useState } from 'react';
import { CommentType } from '@/types/comment';

export type SortOrder = 'newest' | 'oldest' | 'mostLiked';
export type FilterType = 'all' | 'withCompany' | 'withWebsite';

export function useCommentFilters() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [filter, setFilter] = useState<FilterType>('all');

  /**
   * Get filtered and sorted comments
   */
  const getFilteredAndSortedComments = (comments: CommentType[]) => {
    // First apply filtering
    let filteredComments = [...comments];
    
    if (filter === 'withCompany') {
      filteredComments = filteredComments.filter(comment => !!comment.companyInfo);
    } else if (filter === 'withWebsite') {
      filteredComments = filteredComments.filter(comment => !!comment.website);
    }
    
    // Then apply sorting
    return filteredComments.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortOrder === 'mostLiked') {
        return b.likes - a.likes;
      }
      return 0;
    });
  };

  return {
    sortOrder,
    setSortOrder,
    filter,
    setFilter,
    getFilteredAndSortedComments,
  };
}
