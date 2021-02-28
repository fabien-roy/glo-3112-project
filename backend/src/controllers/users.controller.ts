import {
  Controller,
  Get,
  Post,
  Body,
  Path,
  Route,
  SuccessResponse,
  Patch,
  Query,
} from 'tsoa';

import {
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
import { UsersRepository } from '../repositories/users.repository';

@Route('users')
export class UsersController extends Controller {
  private usersRepository: UsersRepository = new UsersRepository();

  @Get()
  @SuccessResponse('200, OK')
  public async getUsers(@Query() username?: string): Promise<User[]> {
    return Promise.resolve(this.usersRepository.getUsers(username || '')).then(
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
    return Promise.resolve(this.usersRepository.getUser(username)).then(
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
    @Body() userCreationRequest: UserCreationParams,
  ): Promise<User> {
    return Promise.resolve(
      this.usersRepository.createUser(userCreationRequest),
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

  @Patch('{username}')
  @SuccessResponse('200, OK')
  public async updateUser(
    @Path() username: string,
    @Body() params: UserModificationParams,
  ): Promise<User> {
    return Promise.resolve(
      this.usersRepository.updateUser(username, params),
    ).then(
      (user: User) => {
        this.setStatus(200);
        this.setHeader('Location', `/users/${username}`);
        return user;
      },
      (err) => {
        throw err;
      },
    );
  }
}
