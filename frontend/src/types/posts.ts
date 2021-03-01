export interface PostQueryParams {
  hashtag?: string;
  description?: string;
}

export interface Post {
  _id: string;
  reference: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
  user: string;
  userAvatar?: string;
  createdAt: Date;
}

export interface PostCreationParams {
  reference: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
}

export interface PostModificationParams {
  description?: string;
  hashtags?: string[];
  usertags?: string[];
}
