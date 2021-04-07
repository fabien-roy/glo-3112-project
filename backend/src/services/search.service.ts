import { PostsRepository } from '../repositories/posts.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SearchResults } from '../types/search.results';

export class SearchService {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();

  public async search(value: string, limit: number): Promise<SearchResults> {
    const users = await this.usersRepository.getUsers(value, limit);
    const hashtags = await this.postsRepository.getHashtags(
      value,
      limit,
      '',
      'count',
    );
    const postsByDescription = await this.postsRepository.getPosts(
      value,
      '',
      limit,
    );

    return {
      users: users.results,
      hashtags,
      descriptionCount: postsByDescription.count,
    };
  }
}
