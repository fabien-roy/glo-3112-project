import { UsersService } from './users.service';
import { UserCreationRequestFactory, UserFactory } from '../util/users.factory';
import { UserCreationRequest } from '../types/users';

const fakeUser = UserFactory.make();
const fakeUserCreationRequest = UserCreationRequestFactory.make();

jest.mock('../repositories/users.repository', () => ({
  UsersRepository: class {
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

const usersService = new UsersService();

describe('When getting users', () => {
  it('should retrieve users from repository', async () => {
    const users = await usersService.getUsers();

    expect(users).toHaveLength(1);
    expect(users).toContain(fakeUser);
  });
});

describe('When getting user', () => {
  it('should retrieve user from repository', async () => {
    const user = await usersService.getUser(fakeUser.username);

    expect(user).toBe(fakeUser);
  });
});

describe('When creating user', () => {
  it('Should creation user with repository', async () => {
    const user = await usersService.createUser(fakeUserCreationRequest);

    expect(user).toBe(fakeUser);
  });
});
