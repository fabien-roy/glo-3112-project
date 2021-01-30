import Users from '../models/users.model';

export class UsersService {
  public findById(id: number) {
    return Users.findById({ id });
  }
}
