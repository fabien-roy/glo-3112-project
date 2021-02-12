import { PostsRepository } from '../repositories/posts.repository';
import { SavedPost, PostCreationRequest } from '../types/posts';

export class PostsService {
  private postsRepository: PostsRepository = new PostsRepository();

  public createPost(
    username: string,
    requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    return this.postsRepository.createPost(username, requestBody);
  }

  public deletePost(id: string): Promise<any> {
    return this.postsRepository.deletePost(id);
  }

  public getPosts(): Promise<SavedPost[]> {
    return this.postsRepository.getPosts();
  }

  public getUsersPosts(username: string): Promise<SavedPost[]> {
    return this.postsRepository.getUsersPosts(username);
  }
}
