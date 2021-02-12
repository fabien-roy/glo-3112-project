import {
  Controller,
  Path,
  Body,
  Get,
  Patch,
  Delete,
  Route,
  SuccessResponse,
} from 'tsoa';

import { PostModificationParams, SavedPost } from '../types/posts';
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

  @Patch('{id}')
  @SuccessResponse('200, OK')
  public async updatePost(
    @Path() id: string,
    @Body() params: PostModificationParams,
  ): Promise<SavedPost> {
    return Promise.resolve(this.postsRepository.updatePost(id, params)).then(
      (post: SavedPost) => {
        this.setStatus(200);
        this.setHeader('Location', `/posts/${id}`);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }
}
