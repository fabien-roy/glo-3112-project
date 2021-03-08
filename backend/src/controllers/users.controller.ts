import {
  Controller,
  Get,
  Post,
  Delete,
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
import { PostsRepository } from '../repositories/posts.repository';
import { logger } from '../logger';

@Route('users')
export class UsersController extends Controller {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();

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

  @Delete('{username}')
  @SuccessResponse('204, No Content')
  public deleteUser(@Path() username: string): Promise<void> {
    return Promise.resolve(
      this.postsRepository.deleteUsersTags(username)
    ).then(() => {
      this.postsRepository.deleteUsersPosts(username)
    }).then(() => {
      this.usersRepository.deleteUser(username)
    }).then(
      () => {
        this.setStatus(204);
      },
      (err) => {
        throw err;
      },
    );
  }
}
