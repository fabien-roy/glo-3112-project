import { Users } from '../models/users.model';
import { UserCreationRequest } from '../types/users';
import { DuplicateUserError } from '../types/errors';

// TODO : Test this
export class UsersRepository {
  public getUsers() {
    return Users.find().exec();
  }

  // TODO : Rework this
  public getUser(username: string) {
    return Users.findOne({ username }).exec();
  }

  public async createUser(requestBody: UserCreationRequest) {
    try {
      return await Users.create(requestBody);
    } catch (error) {
      // TODO : throw different error depending on MongoError code
      throw new DuplicateUserError(
        `User ${requestBody.username} already exists`,
      );
    }
  }
}
