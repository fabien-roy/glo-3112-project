import { Controller, Path, Get, Delete, Route, SuccessResponse } from 'tsoa';

import { SavedPost } from '../types/posts';
import { PostsRepository } from '../repositories/posts.repository';

@Route('posts')
export class PostsController extends Controller {
  private postsRepository: PostsRepository = new PostsRepository();

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(): Promise<SavedPost[]> {
    return Promise.resolve(this.postsRepository.getPosts()).then(
      (posts: SavedPost[]) => {
        this.setStatus(200);
        return posts;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Get('{id}')
  @SuccessResponse('200, OK')
  public async getPost(@Path() id: string): Promise<SavedPost> {
    return Promise.resolve(this.postsRepository.getPost(id)).then(
      (post: SavedPost) => {
        this.setStatus(200);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Delete('{id}')
  @SuccessResponse('200, OK')
  public async deletePost(@Path() id: string): Promise<void> {
    return Promise.resolve(this.postsRepository.deletePost(id)).then(
      () => {
        this.setStatus(200);
      },
      (err) => {
        throw err;
      },
    );
  }
}
