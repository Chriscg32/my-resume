
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { detectCompanyFromEmail } from '@/utils/analytics';
import { CommentType } from '@/types/comment';
import { 
  loadComments, 
  saveComments, 
  addComment, 
  toggleCommentLike, 
  exportCommentsToFile 
} from '@/utils/comments-storage';
import { useCommentFilters } from './use-comment-filters';

export function useComments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAdminView, setShowAdminView] = useState<boolean>(false);
  const [detectedCompany, setDetectedCompany] = useState<any>(null);
  
  const { 
    sortOrder, 
    setSortOrder, 
    filter, 
    setFilter, 
    getFilteredAndSortedComments 
  } = useCommentFilters();

  useEffect(() => {
    // Load comments from local storage
    setComments(loadComments());
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    // Detect company from email
    if (emailValue) {
      const company = detectCompanyFromEmail(emailValue);
      setDetectedCompany(company);
    } else {
      setDetectedCompany(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !commentText.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newComment: CommentType = {
        id: Date.now().toString(),
        name,
        email,
        comment: commentText,
        timestamp: new Date().toISOString(),
        companyInfo: detectedCompany,
        likes: 0,
        website: website || undefined
      };
      
      const updatedComments = addComment(comments, newComment);
      setComments(updatedComments);
      
      // Reset form
      setName('');
      setEmail('');
      setWebsite('');
      setCommentText('');
      setDetectedCompany(null);
      
      setLoading(false);
      
      toast({
        title: "Comment submitted",
        description: "Thank you for your feedback!",
      });
    }, 500);
  };

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
    getFilteredAndSortedComments,
  };
}
