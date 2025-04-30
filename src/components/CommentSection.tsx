
import React, { useState, useEffect } from 'react';
import { MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { detectCompanyFromEmail } from '@/utils/analytics';
import { CommentType } from '@/types/comment';
import CommentFilters from './comments/CommentFilters';
import CommentsList from './comments/CommentsList';
import CommentForm from './comments/CommentForm';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAdminView, setShowAdminView] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [filter, setFilter] = useState<string>("all");
  const [detectedCompany, setDetectedCompany] = useState<any>(null);

  useEffect(() => {
    // Load comments from local storage
    const loadComments = () => {
      try {
        const savedComments = localStorage.getItem('portfolioComments');
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        } else {
          // Add sample comments if none exist
          const sampleComments = [
            {
              id: "1",
              name: "Alice Johnson",
              email: "alice@example.com",
              comment: "Great portfolio! The projects show a lot of technical skill.",
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              likes: 3,
              userLiked: false
            },
            {
              id: "2",
              name: "Bob Smith",
              email: "bob@techcompany.com",
              comment: "Impressive work with AI integration. Would love to chat about potential opportunities.",
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              companyInfo: {
                domain: "techcompany.com",
                name: "Tech Company",
                confidence: 0.8
              },
              likes: 5,
              userLiked: false
            }
          ];
          setComments(sampleComments);
          localStorage.setItem('portfolioComments', JSON.stringify(sampleComments));
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    loadComments();
  }, []);

  const saveComments = (newComments: CommentType[]) => {
    try {
      localStorage.setItem('portfolioComments', JSON.stringify(newComments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

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
      
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      saveComments(updatedComments);
      
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
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        // Toggle like status
        const userLiked = !comment.userLiked;
        return {
          ...comment,
          likes: userLiked ? comment.likes + 1 : comment.likes - 1,
          userLiked
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    saveComments(updatedComments);
    
    toast({
      description: "Your feedback has been recorded",
      duration: 2000,
    });
  };

  const exportComments = () => {
    try {
      const dataStr = JSON.stringify(comments, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'portfolio-comments.json');
      linkElement.click();
      
      toast({
        title: "Comments exported",
        description: "All comments have been exported to a JSON file.",
      });
    } catch (error) {
      console.error('Error exporting comments:', error);
    }
  };

  // Function to sort and filter comments
  const getFilteredAndSortedComments = () => {
    // First apply filtering
    let filteredComments = [...comments];
    
    if (filter === "withCompany") {
      filteredComments = filteredComments.filter(comment => !!comment.companyInfo);
    } else if (filter === "withWebsite") {
      filteredComments = filteredComments.filter(comment => !!comment.website);
    }
    
    // Then apply sorting
    return filteredComments.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortOrder === "mostLiked") {
        return b.likes - a.likes;
      }
      return 0;
    });
  };

  const displayComments = getFilteredAndSortedComments();

  return (
    <section className="py-12 bg-slate-900/60">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquare className="text-accent" size={24} />
          <h2 className="text-2xl font-bold text-white">Comments & Feedback</h2>
          {/* Hidden admin toggle */}
          <div className="ml-auto w-4 h-4" onDoubleClick={toggleAdminView}></div>
          
          {showAdminView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportComments}
              className="ml-2 flex items-center gap-1 text-xs bg-slate-800 border-accent/30 text-accent"
            >
              <Download size={14} />
              <span>Export</span>
            </Button>
          )}
        </div>
        
        <CommentFilters 
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          commentCount={comments.length}
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
