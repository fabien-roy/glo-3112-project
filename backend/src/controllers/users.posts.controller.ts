import {
  Controller,
  Post,
  Body,
  Path,
  Route,
  SuccessResponse,
  Get,
} from 'tsoa';

import { PostCreationRequest, SavedPost } from '../types/posts';
import { PostsRepository } from '../repositories/posts.repository';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsRepository: PostsRepository = new PostsRepository();

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(@Path() username: string): Promise<SavedPost[]> {
    return Promise.resolve(this.postsRepository.getUsersPosts(username)).then(
      (posts: SavedPost[]) => {
        this.setStatus(200);
        return posts;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Post()
  @SuccessResponse('201, Created')
  public async createPost(
    @Path() username: string,
    @Body() requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    return Promise.resolve(
      this.postsRepository.createPost(username, requestBody),
    ).then(
      (post: SavedPost) => {
        this.setStatus(201);
        this.setHeader('Location', `/users/${username}/posts/${post.id}`);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }
}
