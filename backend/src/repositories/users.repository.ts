import { Users } from '../models/users.model';

// TODO : Test this
export class UsersRepository {
  // TODO : Rework this
  public getUser(username: string) {
    return Users.findOne({ username }).exec();
  }
}
