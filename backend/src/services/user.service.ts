import User from '../models/user.model';

export class UserService {
  public findById(id: number) {
    return User.findById({ id });
  }
}
