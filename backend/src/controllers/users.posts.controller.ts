import { Controller, Post, Body, Path, Route, SuccessResponse } from 'tsoa';

import { PostsService } from '../services/posts.service';
import { PostCreationRequest, SavedPost } from '../types/posts';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsService: PostsService = new PostsService();

  // TODO : Test this
  @Post()
  @SuccessResponse('201, Created')
  public async createPost(
    @Path() username: string,
    @Body() requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    return Promise.resolve(
      this.postsService.createPost(username, requestBody),
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
