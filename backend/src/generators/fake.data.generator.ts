import { UsersRepository } from '../repositories/users.repository';
import { UserCreationParams } from '../types/users';
import { UsersFactory } from '../factories/users.factory';

const AMOUNT_OF_USERS = 10;

export class FakeDataGenerator {
  private usersFactory = new UsersFactory();
  private usersRepository = new UsersRepository();

  public async generateIfEmpty() {
    if (await this.databaseIsEmpty()) {
      const users = this.usersFactory.makeCreationParams(AMOUNT_OF_USERS);
      this.addUsersToRepository(users);

      // TODO : Add posts with some usertags
    }
  }

  private async databaseIsEmpty() {
    const users = await this.usersRepository.getUsers();
    return users.length === 0;
  }

  private addUsersToRepository(users: UserCreationParams[]) {
    users.forEach((user) =>
      this.usersRepository.createUser(user).then(async () => {
        await this.modifyUser(user);
      }),
    );
  }

  private async modifyUser(user: UserCreationParams) {
    const modificationParams = this.usersFactory.makeModificationParams();
    await this.usersRepository.updateUser(user.username, modificationParams);
  }
}
