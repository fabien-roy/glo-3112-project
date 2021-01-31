import { UsersController } from './users.controller';
import { fakeUser } from '../util/users.factory';

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
