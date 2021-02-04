import { UsersRepository } from '../repositories/users.repository';

export class UsersService {
  // TODO : Inject UsersRepository
  private usersRepository: UsersRepository = new UsersRepository();

  public getUser(username: string) {
    return this.usersRepository.getUser(username);
  }
}
