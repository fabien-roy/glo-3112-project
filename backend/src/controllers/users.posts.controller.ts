import { Controller, Post, Body, Path, Route, SuccessResponse } from 'tsoa';

import { PostsService } from '../services/posts.service';
import { PostCreationRequest } from '../types/posts';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsService: PostsService = new PostsService();

  // TODO : Test this
  @Post()
  @SuccessResponse('201, Created')
  public createPost(
    @Path() username: string,
    @Body() requestBody: PostCreationRequest,
  ) {
    return Promise.resolve(
      this.postsService.createPost(username, requestBody),
    ).then(
      (post) => {
        this.setHeader('Location', `/users/${username}/posts/${post.id}`);
      },
      (err) => {
        throw err;
      },
    );
  }
}
