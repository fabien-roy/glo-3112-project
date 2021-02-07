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
}
