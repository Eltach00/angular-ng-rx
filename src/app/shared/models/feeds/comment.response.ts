import { Author } from './globalFeed.response';

export interface CommentsResponse {
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
export interface CommentResponse {
  comment: Comment;
}
