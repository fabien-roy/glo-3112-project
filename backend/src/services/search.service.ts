import { PostsRepository } from '../repositories/posts.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SearchResults } from '../types/search.results';
import { User, SimpleUser } from '../types/users';

export class SearchService {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();

  public async search(value: string, limit: number): Promise<SearchResults> {
    const users = await this.usersRepository.getUsers(value, limit);
    // TODO : Get hashtags
    // TODO : Get post count by description

    return SearchService.assembleSearchResults(users.results);
  }

  // TODO : Assembling and simplification should be moved
  private static assembleSearchResults(users: User[]): SearchResults {
    const simpleUsers = SearchService.simplifyUsers(users);

    return {
      users: simpleUsers,
      hashtags: [], // TODO : Assemble hashtags
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
