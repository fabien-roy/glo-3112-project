import Users from '../models/users.model';

// TODO : Test this
export class UsersRepository {
  // TODO : Rework this
  public get(username: string) {
    return Users.findOne({ username }).exec();
  }
}
