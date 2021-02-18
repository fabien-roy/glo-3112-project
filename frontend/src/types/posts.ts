export interface Post {
  id: string;
  reference: string;
  description?: string;
  hashtags: string[];
  user: string;
  createdAt: Date;
}

export interface PostCreationParams {
  reference: string;
  description?: string;
  hashtags: string[];
}

export interface PostModificationParams {
  description?: string;
  hashtags?: string[];
}
