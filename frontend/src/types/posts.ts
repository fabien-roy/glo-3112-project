export interface Post {
  id: string;
  reference: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
  reactions: Reaction[];
  comments?: UserComment[];
  user: string;
  userAvatar?: string;
  createdAt: Date;
}

export interface PostCreationParams {
  data?: string;
  reference?: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
}

export interface PostModificationParams {
  description?: string;
  hashtags?: string[];
  usertags?: string[];
}

export interface PostQueryParams {
  description?: string;
  hashtag?: string;
  before?: string;
  limit?: number;
}
export interface Reaction {
  user: string;
  createdAt?: Date;
}

export interface UserComment {
  user: string;
  text: string;
  userAvatar?: string;
  createdAt?: Date;
}

export interface CommentCreationParams {
  text: string;
}
