import { FilterQuery } from 'mongoose';
import { UserCreationRequestFactory, UserFactory } from '../util/users.factory';
import { Users } from '../models/users.model';
import { DuplicateEntityError } from '../types/errors';
import { UsersRepository } from './users.repository';

const fakeUser = UserFactory.make();
const fakeUserCreationRequest = UserCreationRequestFactory.make();

jest
  .spyOn(Users, 'exists')
  .mockImplementation((filter: FilterQuery<any>) =>
    Promise.resolve(
      filter.username === fakeUser.username ||
        filter.email === fakeUser.email ||
        filter.phoneNumber === fakeUser.phoneNumber,
    ),
  );

jest
  .spyOn(Users, 'create')
  .mockImplementation((creationRequest: any) =>
    creationRequest.username === fakeUserCreationRequest.username &&
    creationRequest.email === fakeUserCreationRequest.email &&
    creationRequest.phoneNumber === fakeUserCreationRequest.phoneNumber &&
    creationRequest.firstName === fakeUserCreationRequest.firstName &&
    creationRequest.lastName === fakeUserCreationRequest.lastName
      ? Promise.resolve(fakeUser)
      : Promise.reject(),
  );

const usersRepository = new UsersRepository();

describe('When creating user', () => {
  it('Should create user with repository', async () => {
    const user = await usersRepository.createUser(fakeUserCreationRequest);

    expect(user).toBe(fakeUser);
  });
});

describe('Given existing username', () => {
  describe('When creating user', () => {
    it('Should throw duplicate user error', async () => {
      const duplicateUserCreationRequest = UserCreationRequestFactory.make();
      duplicateUserCreationRequest.username = fakeUser.username;

      const action = () =>
        usersRepository.createUser(duplicateUserCreationRequest);

      await expect(action).rejects.toThrow(DuplicateEntityError);
    });
  });
});

describe('Given existing email', () => {
  describe('When creating user', () => {
    it('Should throw duplicate user error', async () => {
      const duplicateUserCreationRequest = UserCreationRequestFactory.make();
      duplicateUserCreationRequest.email = fakeUser.email;

      const action = () =>
        usersRepository.createUser(duplicateUserCreationRequest);

      await expect(action).rejects.toThrow(DuplicateEntityError);
    });
  });
});

describe('Given existing phone number', () => {
  describe('When creating user', () => {
    it('Should throw duplicate user error', async () => {
      const duplicateUserCreationRequest = UserCreationRequestFactory.make();
      duplicateUserCreationRequest.phoneNumber = fakeUser.phoneNumber;

      const action = () =>
        usersRepository.createUser(duplicateUserCreationRequest);

      await expect(action).rejects.toThrow(DuplicateEntityError);
    });
  });
});
