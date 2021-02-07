export interface SavedPost {
  id: string;
  reference: string;
  description?: string;
  tags: string[];
  user: string;
  createdAt: Date;
}

export interface PostCreationRequest {
  reference: string;
  description?: string;
  tags: string[];
}
