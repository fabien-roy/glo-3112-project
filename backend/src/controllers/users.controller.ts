import {
  Controller,
  Get,
  Post,
  Body,
  Path,
  Route,
  SuccessResponse,
} from 'tsoa';

import { UsersService } from '../services/users.service';
import { User, UserCreationRequest } from '../types/users';

@Route('users')
export class UsersController extends Controller {
  // TODO : Inject UsersService
  private usersService: UsersService = new UsersService();

  @Get()
  @SuccessResponse('200, OK')
  public async getUsers(): Promise<User[]> {
    return Promise.resolve(this.usersService.getUsers()).then(
      (users: User[]) => {
        this.setStatus(200);
        return users;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Get('{username}')
  @SuccessResponse('200, OK')
  public async getUser(@Path() username: string): Promise<User> {
    return Promise.resolve(this.usersService.getUser(username)).then(
      (user: User) => {
        this.setStatus(200);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Post()
  @SuccessResponse('201, Created')
  public async createUser(
    @Body() userCreationRequest: UserCreationRequest,
  ): Promise<User> {
    return Promise.resolve(
      this.usersService.createUser(userCreationRequest),
    ).then(
      (user: User) => {
        this.setStatus(201);
        this.setHeader('Location', `/users/${user.username}`);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }
}
