
import React from 'react';
import { useComments } from '@/hooks/use-comments';
import CommentFilters from './comments/CommentFilters';
import CommentsList from './comments/CommentsList';
import CommentForm from './comments/CommentForm';
import CommentHeader from './comments/CommentHeader';
import { SortOrder, FilterType } from '@/hooks/use-comment-filters';

const CommentSection: React.FC = () => {
  const {
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
    getFilteredAndSortedComments,
    comments,
  } = useComments();

  // Make sure we have valid comments before filtering and sorting
  const displayComments = getFilteredAndSortedComments();
  const commentCount = displayComments ? displayComments.length : 0;

  return (
    <section className="py-12 bg-slate-900/60">
      <div className="container max-w-4xl mx-auto px-4">
        <CommentHeader 
          showAdminView={showAdminView}
          onExportComments={exportComments}
          onToggleAdmin={toggleAdminView}
        />
        
        <CommentFilters 
          filter={filter}
          setFilter={(value: FilterType) => setFilter(value)}
          sortOrder={sortOrder}
          setSortOrder={(value: SortOrder) => setSortOrder(value)}
          commentCount={commentCount}
        />
        
        <CommentsList 
          comments={displayComments}
          showAdminView={showAdminView}
          onLike={handleLike}
        />
        
        <CommentForm
          name={name}
          setName={setName}
          email={email}
          handleEmailChange={handleEmailChange}
          website={website}
          setWebsite={setWebsite}
          commentText={commentText}
          setCommentText={setCommentText}
          detectedCompany={detectedCompany}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default CommentSection;
