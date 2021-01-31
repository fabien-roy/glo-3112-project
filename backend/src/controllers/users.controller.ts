import { Controller, Get, Path, Route } from 'tsoa';

import { UsersService } from '../services/users.service';

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number) {
    return new UsersService().findById(userId);
  }
}
