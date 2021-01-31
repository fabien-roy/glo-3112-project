import { UsersRepository } from '../repositories/users.repository';

// TODO : Test this
export class UsersService {
  // TODO : Inject UsersRepository
  private usersRepository: UsersRepository = new UsersRepository();

  // TODO : Rework this
  public get(username: string) {
    return this.usersRepository.get(username);
  }
}
