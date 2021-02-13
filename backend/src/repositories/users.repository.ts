import _ from 'lodash';
import {
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
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

    if (user) {
      return user;
    }

    throw new InvalidEntityError(`User ${username} doesn't exist`);
  }

  public async createUser(params: UserCreationParams): Promise<User> {
    await UsersRepository.checkForDuplicateProperties(
      params.email,
      params.phoneNumber,
      params.username,
    );

    try {
      return await Users.create({
        username: params.username,
        email: params.email,
        phoneNumber: params.phoneNumber,
        firstName: params.firstName,
        lastName: params.lastName,
      });
    } catch (err) {
      throw new BadRequestError('Cannot create user');
    }
  }

  public async updateUser(
    username: string,
    params: UserModificationParams,
  ): Promise<User> {
    await UsersRepository.checkForDuplicateProperties(
      params.email,
      params.phoneNumber,
    );

    try {
      const updatedUser = await Users.findOneAndUpdate(
        { username },
        {
          $set: _.pick(params, [
            'email',
            'phoneNumber',
            'firstName',
            'lastName',
            'description',
            'avatarReference',
          ]),
        },
        { new: true, runValidators: true },
      ).exec();
      if (updatedUser) {
        return updatedUser;
      }
    } catch (err) {
      throw new BadRequestError('Cannot update user');
    }

    throw new InvalidEntityError(`User ${username} doesn't exist`);
  }

  private static async checkForDuplicateProperties(
    email?: string,
    phoneNumber?: string,
    username?: string,
  ) {
    if (username && (await Users.exists({ username }))) {
      throw new DuplicateEntityError(`Username ${username} already in use`);
    }

    if (email && (await Users.exists({ email }))) {
      throw new DuplicateEntityError(`Email ${email} already in use`);
    }

    if (phoneNumber && (await Users.exists({ phoneNumber }))) {
      throw new DuplicateEntityError(
        `Phone number ${phoneNumber} already in use`,
      );
    }
  }
}
