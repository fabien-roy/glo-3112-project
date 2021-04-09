import { PagedResults } from '../types/paged.results';
import {
  CommentCreationParams,
  PostCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import { User } from '../types/users';
import { Hashtag } from '../types/hashtags';

export interface PostsRepository {
  getPosts(
    description: string,
    hashtag: string,
    limit: number,
    before?: Date | null,
    after?: Date | null,
  ): Promise<PagedResults<SavedPost>>;

  getPost(id: string): Promise<SavedPost>;

  createPost(username: string, params: PostCreationParams): Promise<SavedPost>;

  updatePost(id: string, params: PostModificationParams): Promise<SavedPost>;

  deletePost(id: string): Promise<void>;

  getUsersPosts(
    username: string,
    limit: number,
    before: Date | null,
    after: Date | null,
  ): Promise<PagedResults<SavedPost>>;

  getHashtags(like: string, limit: number, after: string): Promise<Hashtag[]>;

  createComment(
    user: User,
    postId: string,
    params: CommentCreationParams,
  ): Promise<void>;

  createReaction(user: User, postId: string): Promise<void>;
}
