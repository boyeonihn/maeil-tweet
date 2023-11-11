import { Post, Comment, User } from '@prisma/client';

export interface PostWithUser extends Post {
  user: User;
}

export interface RelatedPost extends PostWithUser {
  _count: {
    likes: number;
    comments: number;
  };
}

export interface CommentWithUser extends Comment {
  user: User;
}

export interface LikeCommentCount {
  likes: number;
  comments: number;
}

export interface PostsWithLikeCount extends Post {
  _count: LikeCommentCount;
  user: User;
}
export interface PostsResponse {
  ok: boolean;
  posts: PostsWithLikeCount[];
}
