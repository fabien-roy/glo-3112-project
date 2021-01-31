import Users from '../models/users.model';

// TODO : Test this
export class UsersService {
  // TODO : Rework this
  public get(username: string) {
    return Users.findOne({ username }).exec();
  }
}
