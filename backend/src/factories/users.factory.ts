import { UserCreationParams, UserModificationParams } from '../types/users';
import { UserModificationParamsFactory } from './user.modification.params.factory';
import { UserCreationParamsFactory } from './user.creation.params.factory';

export class UsersFactory {
  public makeCreationParams(amountOfUsers: number): UserCreationParams[] {
    const params: UserCreationParams[] = [];

    do {
      const param = UserCreationParamsFactory.make();

      if (this.userCreationParamsAreUnique(param, params)) {
        params.push(param);
      }
    } while (params.length < amountOfUsers);

    return params;
  }

  public makeModificationParams(): UserModificationParams {
    return UserModificationParamsFactory.make();
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
}
