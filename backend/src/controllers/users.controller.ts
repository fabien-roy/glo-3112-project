import { Controller, Get, Path, Route } from 'tsoa';

import { UsersService } from '../services/users.service';

@Route('users')
export class UsersController extends Controller {
  // TODO : Inject UsersService
  private usersService: UsersService = new UsersService();

  @Get('{username}')
  public async get(@Path() username: string) {
    return this.usersService.get(username);
  }
}
