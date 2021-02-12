import { Controller, Path, Get, Delete, Route, SuccessResponse } from 'tsoa';

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

  @Delete('{id}')
  @SuccessResponse('200, OK')
  public async deletePost(@Path() id: string): Promise<void> {
    return Promise.resolve(this.postsService.deletePost(id)).then(
      () => {
        this.setStatus(200);
      },
      (err) => {
        throw err;
      },
    );
  }
}
