
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { detectCompanyFromEmail } from '@/utils/analytics';
import { CommentType } from '@/types/comment';
import { addComment } from '@/utils/comments-storage';

export function useCommentForm(comments: CommentType[], setComments: React.Dispatch<React.SetStateAction<CommentType[]>>) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [detectedCompany, setDetectedCompany] = useState<any>(null);

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

  return {
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
  };
}
