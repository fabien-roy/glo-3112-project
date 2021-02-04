import { Controller, Get, Route } from 'tsoa';

// TODO : Remove this!
@Route('')
export class IndexController extends Controller {
  @Get('')
  public async index() {
    return { msg: 'Hello World!' };
  }

  @Get('/msg')
  public msg() {
    return { msg: 'This is a message' };
  }
}
