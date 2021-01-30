import { Controller, Get, Path, Route } from 'tsoa';

import { UserService } from '../services/user.service';

@Route('users')
export class UserController extends Controller {
  @Get('{userId}')
  public async getUser(@Path() userId: number) {
    return new UserService().findById(userId);
  }
}
