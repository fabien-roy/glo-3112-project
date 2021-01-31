import { UsersRepository } from '../repositories/users.repository';

export class UsersService {
  // TODO : Inject UsersRepository
  private usersRepository: UsersRepository = new UsersRepository();

  public get(username: string) {
    return this.usersRepository.get(username);
  }
}
