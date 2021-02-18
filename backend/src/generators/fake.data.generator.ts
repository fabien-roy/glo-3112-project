import { UsersRepository } from '../repositories/users.repository';
import { UserCreationParams } from '../types/users';
import { UsersFactory } from '../factories/users.factory';
import { PostsFactory } from '../factories/posts.factory';
import { PostsRepository } from '../repositories/posts.repository';

const AMOUNT_OF_USERS = 10;
const AMOUNT_OF_POSTS_PER_USER = 2;

export class FakeDataGenerator {
  private usersFactory = new UsersFactory();
  private postsFactory = new PostsFactory();
  private usersRepository = new UsersRepository();
  private postsRepository = new PostsRepository();

  public async generateIfEmpty() {
    if (await this.databaseIsEmpty()) {
      this.createUsers();
    }
  }

  private async databaseIsEmpty() {
    const users = await this.usersRepository.getUsers();
    return users.length === 0;
  }

  private createUsers() {
    const users = this.usersFactory.makeCreationParams(AMOUNT_OF_USERS);

    users.forEach((user) =>
      this.usersRepository.createUser(user).then(async () => {
        await this.modifyUser(user);
        await this.createPosts(user);
      }),
    );
  }

  private async modifyUser(user: UserCreationParams) {
    const modificationParams = this.usersFactory.makeModificationParams();
    await this.usersRepository.updateUser(user.username, modificationParams);
  }

  private async createPosts(user: UserCreationParams) {
    for (let i = 0; i < AMOUNT_OF_POSTS_PER_USER; i++) {
      await this.createPostsForUser(user);
    }
  }

  private async createPostsForUser(user: UserCreationParams) {
    const creationParams = this.postsFactory.makeCreationParams();
    await this.postsRepository.createPost(user.username, creationParams);
  }
}
