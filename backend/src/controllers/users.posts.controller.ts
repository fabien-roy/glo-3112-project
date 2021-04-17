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
import {
  validateAuthentication,
  validateAuthorizationByUsername,
} from './authorization';
import { ImageService } from '../services/image.service';
import { PagedResults } from '../types/paged.results';
import { BadRequestError } from '../types/errors';
import { PostsRepository } from '../repositories/posts.repository';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';

@Route('users/:username/posts')
export class UsersPostsController extends Controller {
  private postsRepository: PostsRepository = new MongoPostsRepository();
  private imageService: ImageService = new ImageService();
  private readonly POSTS_LIMIT = 21;

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(
    @Path() username: string,
    @Request() req: any,
    @Query() limit = this.POSTS_LIMIT,
    /**
     * Query posts created at a <date><id> before the one provided.
     * If `after` is also provided, only `after` is used.
     */
    @Query() before: string | null = null,
    /**
     * Query posts created at a <date><id> after the one provided.
     */
    @Query() after: string | null = null,
  ): Promise<PagedResults<SavedPost>> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.getUsersPosts(username, limit, before, after),
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
    } else if (params.reference) {
      return this.createPostWithRepository(username, params);
    }

    throw new BadRequestError(
      "You must provide field 'data' or 'reference' when creating a post",
    );
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
