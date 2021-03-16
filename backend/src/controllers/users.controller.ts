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

@Route('users')
export class UsersController extends Controller {
  private usersRepository: UsersRepository = new UsersRepository();
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

  private async updateUserWithRepository(
    username: string,
    params: UserModificationParams,
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
