import { FilterQuery } from 'mongoose';
import { UserCreationRequestFactory, UserFactory } from '../util/users.factory';
import { Users } from '../models/users.model';
import { DuplicateUserError } from '../types/errors';
import { UsersRepository } from './users.repository';

const fakeUser = UserFactory.make();
const fakeUserCreationRequest = UserCreationRequestFactory.make();

jest
  .spyOn(Users, 'exists')
  .mockImplementation((filter: FilterQuery<any>) =>
    Promise.resolve(filter.username === fakeUser.username),
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
  it('Should creation user with repository', async () => {
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

      await expect(action).rejects.toThrow(DuplicateUserError);
    });
  });
});
