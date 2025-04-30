
export interface CommentType {
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
