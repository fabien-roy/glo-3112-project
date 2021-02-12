import { Controller, Get, Route, SuccessResponse } from 'tsoa';

import { PostsService } from '../services/posts.service';
import { SavedPost } from '../types/posts';

@Route('posts')
export class PostsController extends Controller {
  private postsService: PostsService = new PostsService();

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(): Promise<SavedPost[]> {
    return Promise.resolve(this.postsService.getPosts()).then(
      (posts: SavedPost[]) => {
        this.setStatus(200);
        return posts;
      },
      (err) => {
        throw err;
      },
    );
  }
}
