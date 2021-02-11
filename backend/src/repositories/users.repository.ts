import { User, UserCreationRequest } from '../types/users';
import {
  BadRequestError,
  DuplicateUserError,
  InvalidUserError,
} from '../types/errors';
import { Users } from '../models/users.model';

export class UsersRepository {
  // TODO : Test getUsers
  public async getUsers(): Promise<User[]> {
    return Users.find().exec();
  }

  // TODO : Test getUser
  public async getUser(username: string): Promise<User> {
    const user = await Users.findOne({ username }).exec();

    if (user == null) {
      throw new InvalidUserError(`User ${username} doesn't exist`);
    }

    return user;
  }

  public async createUser(requestBody: UserCreationRequest): Promise<User> {
    const existingUser = await Users.findOne().or([
      { username: requestBody.username },
      { email: requestBody.email },
      { phoneNumber: requestBody.phoneNumber },
    ]);

    if (existingUser) {
      if (existingUser.username === requestBody.username) {
        throw new DuplicateUserError(
          `User ${requestBody.username} already exists`,
        );
      }
      if (existingUser.email === requestBody.email) {
        throw new DuplicateUserError(
          `Email ${requestBody.email} already in use`,
        );
      }
      if (existingUser.phoneNumber === requestBody.phoneNumber) {
        throw new DuplicateUserError(
          `Phone number ${requestBody.phoneNumber} already in use`,
        );
      }
    }

    try {
      return await Users.create({
        username: requestBody.username,
        email: requestBody.email,
        phoneNumber: requestBody.phoneNumber,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
      });
    } catch (err) {
      throw new BadRequestError('Cannot create user');
    }
  }
}
