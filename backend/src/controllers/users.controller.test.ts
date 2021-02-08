import { UsersController } from './users.controller';
import { UserFactory } from '../util/users.factory';

const fakeUser = UserFactory.make();

jest.mock('../services/users.service', () => ({
  UsersService: class {
    public getUser(username: string) {
      return username === fakeUser.username
        ? Promise.resolve(fakeUser)
        : Promise.reject();
    }
  },
}));

// TODO : Test getting all users

// TODO : Test creation a user

describe('When getting user', () => {
  const usersController = new UsersController();

  it('Should retrieve user from service', () => {
    usersController.getUser(fakeUser.username).then((user) => {
      expect(user).toBe(fakeUser);
    });
  });

  // TODO : Test status code
});
