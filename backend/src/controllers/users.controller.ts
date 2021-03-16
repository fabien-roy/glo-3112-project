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
  Request,
} from 'tsoa';

import {
  UploadUserModificationParams,
  User,
  UserCreationParams,
  UserModificationParams,
} from '../types/users';
import { UsersRepository } from '../repositories/users.repository';
import { ImageService } from '../services/image.service';
import { validateAuthorizationByUsername } from './authorization';
import { PostsRepository } from '../repositories/posts.repository';

@Route('users')
export class UsersController extends Controller {
  private usersRepository: UsersRepository = new UsersRepository();
  private postsRepository: PostsRepository = new PostsRepository();
  private imageService: ImageService = new ImageService();

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
    @Request() req: any,
  ): Promise<User> {
    validateAuthorizationByUsername(username, req.user);
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

  // TODO : Rename to updateUser (and remove /upload from route) and use this one
  @Patch('{username}/upload')
  @SuccessResponse('200, OK')
  public async updateUserUpload(
    @Path() username: string,
    @Body() params: UploadUserModificationParams,
    @Request() req: any,
  ): Promise<User> {
    validateAuthorizationByUsername(username, req.user);
    if (params.avatarData) {
      return this.imageService
        .uploadAvatar(params.avatarData)
        .then((avatarReference: string) => {
          params.avatarReference = avatarReference;
          return this.updateUserWithRepository(username, params);
        });
    }

    return this.updateUserWithRepository(username, params);
  }

  private updateUserWithRepository(
    username: string,
    params: UploadUserModificationParams,
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
  public deleteUser(
    @Path() username: string,
    @Request() req: any,
  ): Promise<void> {
    validateAuthorizationByUsername(username, req.user);
    return Promise.resolve(this.postsRepository.deleteUsersTags(username))
      .then(() => {
        this.postsRepository.deleteUsersPosts(username);
      })
      .then(() => {
        this.usersRepository.deleteUser(username);
      })
      .then(() => {
        req.logout();
      })
      .then(
        () => {
          this.setStatus(204);
        },
        (err: any) => {
          throw err;
        },
      );
  }
}
