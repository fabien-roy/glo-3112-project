import { PostsRepository } from '../repositories/posts.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SearchResults } from '../types/search.results';
import { User, SimpleUser } from '../types/users';
import { Hashtag } from '../types/hashtags';

export class SearchService {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();

  public async search(value: string, limit: number): Promise<SearchResults> {
    const users = await this.usersRepository.getUsers(value, limit);
    const hashtags = await this.postsRepository.getHashtags(value, limit);
    // TODO : Get post count by description

    return SearchService.assembleSearchResults(users.results, hashtags);
  }

  // TODO : Assembling and simplification should be moved
  private static assembleSearchResults(
    users: User[],
    hashtags: Hashtag[],
  ): SearchResults {
    const simpleUsers = SearchService.simplifyUsers(users);

    return {
      users: simpleUsers,
      hashtags: hashtags,
      description: {
        count: 0, // TODO : Assemble count for description
      },
    };
  }

  private static simplifyUsers(users: User[]): SimpleUser[] {
    return users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarReference: user.avatarReference,
    }));
  }
}
