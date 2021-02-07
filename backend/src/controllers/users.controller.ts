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
  public async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('{username}')
  public async getUser(@Path() username: string) {
    return this.usersService.getUser(username); // TODO : Probably .then()
  }

  @Post()
  @SuccessResponse('201, Created')
  public createUser(@Body() requestBody: UserCreationRequest): Promise<void> {
    return Promise.resolve(this.usersService.create(requestBody)).then(
      () => {
        this.setStatus(201);
      },
      (err) => {
        throw err;
      },
    );
  }
}
