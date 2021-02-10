import { UsersRepository } from '../repositories/users.repository';
import { UserCreationRequest } from '../types/users';

export class UsersService {
  // TODO : Inject UsersRepository
  private usersRepository: UsersRepository = new UsersRepository();

  public getUsers() {
    return this.usersRepository.getUsers();
  }

  public getUser(username: string) {
    return this.usersRepository.getUser(username);
  }

  public create(requestBody: UserCreationRequest) {
    return this.usersRepository.createUser(requestBody);
  }
}
