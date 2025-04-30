
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ThumbsUp, Filter, User, Calendar, Eye, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { detectCompanyFromEmail } from '@/utils/analytics';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  companyInfo?: {
    domain?: string;
    name?: string;
    confidence?: number;
  };
  likes: number;
  userLiked?: boolean;
  website?: string;
}

const EnhancedComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
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

  const saveComments = (newComments: Comment[]) => {
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
      const newComment: Comment = {
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
        
        {/* Comment filters and sorting */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-white/70" />
            <span className="text-white/70 text-sm">Filter:</span>
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Filter comments" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All comments</SelectItem>
              <SelectItem value="withCompany">With company</SelectItem>
              <SelectItem value="withWebsite">With website</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="ml-auto flex items-center gap-2">
            <Calendar size={16} className="text-white/70" />
            <span className="text-white/70 text-sm">Sort:</span>
          </div>
          
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="mostLiked">Most liked</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="bg-slate-800">
              <Eye size={12} className="mr-1" />
              {comments.length} comments
            </Badge>
          </div>
        </div>
        
        {/* Comments list */}
        <div className="mb-8 space-y-4">
          {displayComments.length === 0 ? (
            <p className="text-white/70 italic text-center py-4">No comments found with the current filters</p>
          ) : (
            displayComments.map((comment) => (
              <div key={comment.id} className="bg-slate-800 p-4 rounded-lg">
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
                    onClick={() => handleLike(comment.id)}
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
            ))
          )}
        </div>
        
        {/* Comment form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Leave a Comment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm text-white/70 mb-1">Name*</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-white/70 mb-1">Email*</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your email (not displayed publicly)"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="website" className="block text-sm text-white/70 mb-1">Website (optional)</label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Your website URL"
              />
            </div>
          </div>
          
          {detectedCompany && (
            <div className="mb-4 p-2 bg-accent/10 border border-accent/20 rounded-md">
              <div className="flex items-center text-xs">
                <Info size={12} className="text-accent mr-1" />
                <span className="text-accent/80">Company detected: <strong>{detectedCompany.name}</strong></span>
                <Badge variant="outline" className="ml-auto text-[10px] bg-accent/5 text-accent/80">Admin only</Badge>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm text-white/70 mb-1">Comment*</label>
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

export default EnhancedComments;
