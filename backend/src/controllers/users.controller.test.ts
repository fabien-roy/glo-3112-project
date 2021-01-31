import { UsersController } from './users.controller';
import { UserFactory } from '../util/users.factory';

const fakeUser = UserFactory.make();

jest.mock('../services/users.service', () => ({
  UsersService: class {
    public get(username: string) {
      return username === fakeUser.username ? fakeUser : null;
    }
  },
}));

describe('When getting user by username', () => {
  it('should retrieve user from service', () => {
    const usersController = new UsersController();

    return usersController.get(fakeUser.username).then((user) => {
      expect(user).toBe(fakeUser);
    });
  });
});
