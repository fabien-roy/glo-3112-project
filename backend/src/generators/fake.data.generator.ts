import { UsersRepository } from '../repositories/users.repository';
import { UserCreationParamsFactory } from '../factories/user.creation.params.factory';
import { UserCreationParams } from '../types/users';

const AMOUNT_OF_USERS = 10;

export class FakeDataGenerator {
  private usersRepository = new UsersRepository();

  public async generateIfEmpty() {
    if (await this.databaseIsEmpty()) {
      const usersCreationParams = this.generateUsersCreationParams();
      await this.addUsersToRepository(usersCreationParams);
    }

    // TODO : Add avatars

    // TODO : Add posts with some usertags
  }

  private async databaseIsEmpty() {
    const users = await this.usersRepository.getUsers();
    return users.length === 0;
  }

  // TODO : Move this into a specialized factory
  private generateUsersCreationParams(): UserCreationParams[] {
    const params: UserCreationParams[] = [];

    do {
      const param = UserCreationParamsFactory.make();

      if (this.userCreationParamsAreUnique(param, params)) {
        params.push(param);
      }
    } while (params.length < AMOUNT_OF_USERS);

    return params;
  }

  private userCreationParamsAreUnique(
    param: UserCreationParams,
    params: UserCreationParams[],
  ): boolean {
    const duplicated = params.filter(
      (generated) =>
        generated.username === param.username ||
        generated.phoneNumber === param.phoneNumber ||
        generated.email === param.email,
    );

    return duplicated.length === 0;
  }

  private async addUsersToRepository(params: UserCreationParams[]) {
    await params.forEach(
      async (param) => await this.usersRepository.createUser(param),
    );
  }
}
