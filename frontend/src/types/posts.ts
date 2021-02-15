export interface Post {
  id: string;
  reference: string;
  description?: string;
  tags: string[];
  user: string;
  createdAt: Date;
}

export interface PostCreationParams {
  reference: string;
  description?: string;
  tags: string[];
}

export interface PostModificationParams {
  description?: string;
  tags?: string[];
}
