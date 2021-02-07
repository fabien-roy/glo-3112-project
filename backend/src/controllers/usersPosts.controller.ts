import { Controller, Post, Body, Path, Route, SuccessResponse } from 'tsoa';

import { PostsService } from '../services/posts.service';
import { SavedPost, PostCreationRequest } from '../types/posts';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsService: PostsService = new PostsService();

  @Post()
  @SuccessResponse('201, Created')
  public createPost(
    @Path() username: string,
    @Body() requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    return Promise.resolve(
      this.postsService.createPost(username, requestBody),
    ).then(
      (doc) => {
        this.setStatus(201);
        this.setHeader('Location', `/users/${username}/posts/${doc.id}`);
        return doc;
      },
      (err) => {
        throw err;
      },
    );
  }
}
