import { PostsRepository } from '../repositories/posts.repository';
import { UsersRepository } from '../repositories/users.repository';
import { SearchResults } from '../types/search.results';

export class SearchService {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();

  public search(value: string, limit: number): Promise<SearchResults> {
    // TODO : Get users
    // TODO : Get hashtags
    // TODO : Get post count by description

    // TODO : Send correct promise
    return Promise.reject();
  }
}
