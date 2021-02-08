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
import { UserCreationRequest } from '../types/users';

@Route('users')
export class UsersController extends Controller {
  // TODO : Inject UsersService
  private usersService: UsersService = new UsersService();

  @Get()
  @SuccessResponse('200, OK')
  public async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('{username}')
  @SuccessResponse('200, OK')
  public getUser(@Path() username: string) {
    return this.usersService.getUser(username);
  }

  @Post()
  @SuccessResponse('201, Created')
  public createUser(@Body() userCreationRequest: UserCreationRequest) {
    return Promise.resolve(this.usersService.create(userCreationRequest)).then(
      () => {
        this.setHeader('Location', `/users/${userCreationRequest.username}`);
      },
      (err) => {
        throw err;
      },
    );
  }
}
