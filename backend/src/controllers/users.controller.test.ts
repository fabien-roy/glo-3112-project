import { UsersController } from './users.controller';
import { UserCreationRequestFactory, UserFactory } from '../util/users.factory';
import { UserCreationRequest } from '../types/users';

const fakeUser = UserFactory.make();
const fakeUserCreationRequest = UserCreationRequestFactory.make();

jest.mock('../services/users.service', () => ({
  UsersService: class {
    public getUsers() {
      return Promise.resolve([fakeUser]);
    }

    public getUser(username: string) {
      return username === fakeUser.username
        ? Promise.resolve(fakeUser)
        : Promise.reject();
    }

    public createUser(userCreationRequest: UserCreationRequest) {
      return userCreationRequest === fakeUserCreationRequest
        ? Promise.resolve(fakeUser)
        : Promise.reject();
    }
  },
}));

const usersController = new UsersController();

describe('When getting users', () => {
  it('Should retrieve users from service', async () => {
    const users = await usersController.getUsers();

    expect(users).toHaveLength(1);
    expect(users).toContain(fakeUser);
  });
});

describe('When getting user', () => {
  it('Should retrieve user from service', async () => {
    const user = await usersController.getUser(fakeUser.username);

    expect(user).toBe(fakeUser);
  });
});

describe('When creating user', () => {
  it('Should creation user with service', async () => {
    const user = await usersController.createUser(fakeUserCreationRequest);

    expect(user).toBe(fakeUser);
  });
});
