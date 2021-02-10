import { UsersRepository } from '../repositories/users.repository';
import { User, UserCreationRequest } from '../types/users';

export class UsersService {
  // TODO : Inject UsersRepository
  private usersRepository: UsersRepository = new UsersRepository();

  public getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }

  public getUser(username: string): Promise<User> {
    return this.usersRepository.getUser(username);
  }

  public create(requestBody: UserCreationRequest): Promise<User> {
    return this.usersRepository.createUser(requestBody);
  }
}
