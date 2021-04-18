export interface Post {
  id: string;
  reference: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
  user: string;
  userAvatar?: string;
  createdAt: Date;
}

export interface PostCreationParams {
  data: string;
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
  after?: string;
  limit?: number;
}
