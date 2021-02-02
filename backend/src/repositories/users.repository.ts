import { Users } from '../models/users.model';

// TODO : Test this
export class UsersRepository {
  // TODO : Rework this
  // TODO : Weirdly getting a "userId" error
  public getUser(username: string) {
    return Users.findOne({ username }).exec();
  }
}
