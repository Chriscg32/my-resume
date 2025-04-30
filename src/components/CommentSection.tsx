
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  companyInfo?: string; // Optional field for detected company info
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAdminComments, setShowAdminComments] = useState<boolean>(false);

  useEffect(() => {
    // Load comments from local storage
    const loadComments = () => {
      try {
        const savedComments = localStorage.getItem('portfolioComments');
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    loadComments();
  }, []);

  const saveComments = (newComments: Comment[]) => {
    try {
      localStorage.setItem('portfolioComments', JSON.stringify(newComments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  const detectCompanyInfo = (emailAddress: string): string | undefined => {
    if (!emailAddress.includes('@')) return undefined;
    
    const domain = emailAddress.split('@')[1];
    // Simple detection - in reality would use a more sophisticated approach
    if (domain && !domain.includes('gmail.com') && !domain.includes('yahoo.com') && 
        !domain.includes('hotmail.com') && !domain.includes('outlook.com')) {
      return domain.split('.')[0]; // Return company name from domain
    }
    
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !commentText.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name,
        email,
        comment: commentText,
        timestamp: new Date().toISOString(),
        companyInfo: detectCompanyInfo(email)
      };
      
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      saveComments(updatedComments);
      
      // Reset form
      setName('');
      setEmail('');
      setCommentText('');
      
      setLoading(false);
      
      toast({
        title: "Comment submitted",
        description: "Thank you for your feedback!",
      });
    }, 500);
  };

  const toggleAdminView = () => {
    // Simple "admin" toggle with double-click
    setShowAdminComments(!showAdminComments);
  };

  return (
    <section className="py-12 bg-slate-900/60">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquare className="text-accent" size={24} />
          <h2 className="text-2xl font-bold text-white">Comments & Feedback</h2>
          {/* Hidden admin toggle */}
          <div className="ml-auto w-4 h-4" onDoubleClick={toggleAdminView}></div>
        </div>
        
        {/* Comments list */}
        <div className="mb-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-white/70 italic text-center py-4">Be the first to leave a comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-slate-800 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{comment.name}</h3>
                  <span className="text-xs text-white/50">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/80 mb-2">{comment.comment}</p>
                
                {/* Admin-only information */}
                {showAdminComments && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/50">
                    <p>Email: {comment.email}</p>
                    {comment.companyInfo && (
                      <p className="text-accent">Company: {comment.companyInfo}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Comment form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Leave a Comment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm text-white/70 mb-1">Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-white/70 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your email (not displayed publicly)"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm text-white/70 mb-1">Comment</label>
            <Textarea
              id="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
              placeholder="Share your thoughts or feedback..."
            />
          </div>
          
          <Button 
            type="submit" 
            className="bg-accent hover:bg-accent/90 flex items-center gap-2"
            disabled={loading}
          >
            <Send size={16} />
            <span>{loading ? 'Submitting...' : 'Submit Comment'}</span>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CommentSection;
