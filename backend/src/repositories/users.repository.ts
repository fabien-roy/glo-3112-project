import { User, UserCreationRequest } from '../types/users';
import {
  BadRequestError,
  DuplicateEntityError,
  InvalidEntityError,
} from '../types/errors';
import { Users } from '../models/users.model';

export class UsersRepository {
  public async getUsers(): Promise<User[]> {
    return Users.find().exec();
  }

  public async getUser(username: string): Promise<User> {
    const user = await Users.findOne({ username }).exec();

    if (user == null) {
      throw new InvalidEntityError(`User ${username} doesn't exist`);
    }

    return user;
  }

  public async createUser(requestBody: UserCreationRequest): Promise<User> {
    if (await Users.exists({ username: requestBody.username })) {
      throw new DuplicateEntityError(
        `User ${requestBody.username} already exists`,
      );
    }

    if (await Users.exists({ email: requestBody.email })) {
      throw new DuplicateEntityError(
        `Email ${requestBody.email} already in use`,
      );
    }

    if (await Users.exists({ phoneNumber: requestBody.phoneNumber })) {
      throw new DuplicateEntityError(
        `Phone number ${requestBody.phoneNumber} already in use`,
      );
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
