// TODO : Find a way to rename to "Post"
export interface SavedPost {
  id: string;
  reference: string;
  description?: string;
  hashtags: string[];
  usertags: string[];
  user: string;
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
