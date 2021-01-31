import { Controller, Get, Path, Route } from 'tsoa';

import { UsersService } from '../services/users.service';

// TODO : Test this
@Route('users')
export class UsersController extends Controller {
  // TODO : Inject UsersService

  // TODO : Rework this
  @Get('{username}')
  public async get(@Path() username: string) {
    return new UsersService().get(username);
  }
}
