
import { CommentType } from "@/types/comment";

// Sample/default comments for new users
const sampleComments: CommentType[] = [
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

const STORAGE_KEY = 'portfolioComments';

/**
 * Load comments from local storage or create sample comments if none exist
 */
export function loadComments(): CommentType[] {
  try {
    const savedComments = localStorage.getItem(STORAGE_KEY);
    if (savedComments) {
      return JSON.parse(savedComments);
    } else {
      // Add sample comments if none exist
      saveComments(sampleComments);
      return sampleComments;
    }
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
}

/**
 * Save comments to local storage
 */
export function saveComments(comments: CommentType[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments:', error);
  }
}

/**
 * Add a new comment
 */
export function addComment(comments: CommentType[], comment: CommentType): CommentType[] {
  const newComments = [...comments, comment];
  saveComments(newComments);
  return newComments;
}

/**
 * Update like status for a comment
 */
export function toggleCommentLike(comments: CommentType[], commentId: string): CommentType[] {
  const updatedComments = comments.map(comment => {
    if (comment.id === commentId) {
      const userLiked = !comment.userLiked;
      return {
        ...comment,
        likes: userLiked ? comment.likes + 1 : comment.likes - 1,
        userLiked
      };
    }
    return comment;
  });
  
  saveComments(updatedComments);
  return updatedComments;
}

/**
 * Export comments to a downloadable file
 */
export function exportCommentsToFile(comments: CommentType[]): void {
  try {
    const dataStr = JSON.stringify(comments, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'portfolio-comments.json');
    linkElement.click();
  } catch (error) {
    console.error('Error exporting comments:', error);
  }
}
