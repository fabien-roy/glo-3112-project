export interface PostCardProps {
  id: string;
  reference: string;
  description?: string;
  tags: string[];
  user: string;
  createdAt: Date;
}
