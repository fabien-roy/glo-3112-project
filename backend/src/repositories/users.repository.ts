import _ from 'lodash';
import {
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
import {
  BadRequestError,
  DuplicateEntityError,
  NotFoundEntityError,
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

    throw new NotFoundEntityError(`User ${username} doesn't exist`);
  }

  public async createUser(params: UserCreationParams): Promise<User> {
    try {
      return await Users.create({
        username: params.username,
        email: params.email,
        phoneNumber: params.phoneNumber,
        firstName: params.firstName,
        lastName: params.lastName,
      });
    } catch (err) {
      UsersRepository.throwIfDuplicateKeyError(
        err,
        params.email,
        params.phoneNumber,
        params.username,
      );
      throw new BadRequestError('Could not create user');
    }
  }

  public async updateUser(
    username: string,
    params: UserModificationParams,
  ): Promise<User> {
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
      UsersRepository.throwIfDuplicateKeyError(
        err,
        params.email,
        params.phoneNumber,
      );
      throw new BadRequestError('Could not update user');
    }

    throw new NotFoundEntityError(`User ${username} doesn't exist`);
  }

  private static throwIfDuplicateKeyError(
    err: any,
    email?: string,
    phoneNumber?: string,
    username?: string,
  ) {
    if (err.keyPattern) {
      if ('username' in err.keyPattern) {
        throw new DuplicateEntityError(`Username ${username} already in use`);
      }

      if ('email' in err.keyPattern) {
        throw new DuplicateEntityError(`Email ${email} already in use`);
      }

      if ('phoneNumber' in err.keyPattern) {
        throw new DuplicateEntityError(
          `Phone number ${phoneNumber} already in use`,
        );
      }
    }
  }
}
