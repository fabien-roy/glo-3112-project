import {
  Controller,
  Post,
  Body,
  Path,
  Route,
  SuccessResponse,
  Get,
  Request,
  Query,
} from 'tsoa';

import { PostCreationParams, SavedPost } from '../types/posts';
import { PostsRepository } from '../repositories/posts.repository';
import {
  validateAuthentication,
  validateAuthorizationByUsername,
} from './authorization';
import { ImageService } from '../services/image.service';
import { PagedResults } from '../types/paged.results';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsRepository: PostsRepository = new PostsRepository();
  private imageService: ImageService = new ImageService();

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(
    @Path() username: string,
    @Request() req: any,
    @Query() limit = 21,
    @Query() lessThan: Date | null = null,
    @Query() greaterThan: Date | null = null,
  ): Promise<PagedResults<SavedPost>> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.getUsersPosts(
        username,
        limit,
        lessThan,
        greaterThan,
      ),
    ).then(
      (posts: PagedResults<SavedPost>) => {
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
    @Body() params: PostCreationParams,
    @Request() req: any,
  ): Promise<SavedPost> {
    validateAuthorizationByUsername(username, req.user);
    if (params.data) {
      return this.imageService
        .uploadPost(params.data)
        .then((reference: string) => {
          params.reference = reference;
          return this.createPostWithRepository(username, params);
        });
    }

    return this.createPostWithRepository(username, params);
  }

  private async createPostWithRepository(
    username: string,
    params: PostCreationParams,
  ): Promise<SavedPost> {
    return Promise.resolve(
      this.postsRepository.createPost(username, params),
    ).then(
      (post: SavedPost) => {
        this.setStatus(201);
        this.setHeader('Location', `/posts/${post.id}`);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }
}
