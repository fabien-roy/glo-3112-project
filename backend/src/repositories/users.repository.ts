import { User, UserCreationRequest } from '../types/users';
import { DuplicateUserError, InvalidUserError } from '../types/errors';
import { Users } from '../models/users.model';

// TODO : Test this somehow
export class UsersRepository {
  public async getUsers(): Promise<User[]> {
    return Users.find().exec();
  }

  public async getUser(username: string): Promise<User> {
    const user = await Users.findOne({ username }).exec();

    if (user == null) {
      throw new InvalidUserError(`User ${username} doesn't exist`);
    }

    return user;
  }

  public async createUser(requestBody: UserCreationRequest): Promise<User> {
    if (await Users.exists({ username: requestBody.username })) {
      throw new DuplicateUserError(
        `User ${requestBody.username} already exists`,
      );
    }

    return Users.create({
      username: requestBody.username,
      email: requestBody.email,
      phoneNumber: requestBody.phoneNumber,
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
    });
  }
}
