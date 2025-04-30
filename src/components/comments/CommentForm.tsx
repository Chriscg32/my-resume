
import React from 'react';
import { Send, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CommentFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  website: string;
  setWebsite: (value: string) => void;
  commentText: string;
  setCommentText: (value: string) => void;
  detectedCompany: any;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  name,
  setName,
  email,
  handleEmailChange,
  website,
  setWebsite,
  commentText,
  setCommentText,
  detectedCompany,
  loading,
  handleSubmit
}) => {
  return (
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
  );
};

export default CommentForm;
