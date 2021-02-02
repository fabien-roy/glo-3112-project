import { UsersService } from './users.service';
import { UserFactory } from '../util/users.factory';

const fakeUser = UserFactory.make();

jest.mock('../repositories/users.repository', () => ({
  UsersRepository: class {
    public getUser(username: string) {
      return username === fakeUser.username ? fakeUser : null;
    }
  },
}));

const usersService = new UsersService();

describe('When getting user', () => {
  it('should retrieve user from repository', () => {
    const user = usersService.getUser(fakeUser.username);

    expect(user).toBe(fakeUser);
  });
});
