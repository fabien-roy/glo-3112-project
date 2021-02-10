import { Users } from '../models/users.model';
import { DuplicateUserError, UserCreationRequest } from '../types/users';

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
      await Users.create(requestBody);
    } catch (error) {
      // TODO : throw different error depending on MongoError code
      throw new DuplicateUserError(
        `User ${requestBody.username} already exists`,
      );
    }
  }
}
