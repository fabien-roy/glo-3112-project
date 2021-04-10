import {
  Controller,
  Path,
  Body,
  Request,
  Get,
  Patch,
  Delete,
  Route,
  SuccessResponse,
  Query,
  Post,
} from 'tsoa';

import {
  CommentCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import {
  validateAuthentication,
  validateAuthorizationByPostId,
} from './authorization';
import { PagedResults } from '../types/paged.results';
import { PostsRepository } from '../repositories/posts.repository';
import { MongoPostsRepository } from '../repositories/mongo/mongo.posts.repository';

@Route('posts')
export class PostsController extends Controller {
  private postsRepository: PostsRepository = new MongoPostsRepository();
  private readonly POSTS_LIMIT = 21;

  @Get()
  @SuccessResponse('200, OK')
  public async getPosts(
    @Request() req: any,
    @Query() description = '',
    @Query() hashtag = '',
    @Query() limit = this.POSTS_LIMIT,
    /**
     * Query posts created at a date before the one provided.
     * If `after` is also provided, only `after` is used.
     */
    @Query() before: Date | null = null,
    /**
     * Query posts created at a date after the one provided.
     */
    @Query() after: Date | null = null,
  ): Promise<PagedResults<SavedPost>> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.getPosts(description, hashtag, limit, before, after),
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

  @Get('{id}')
  @SuccessResponse('200, OK')
  public async getPost(
    @Path() id: string,
    @Request() req: any,
  ): Promise<SavedPost> {
    validateAuthentication(req.user);
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
  public async deletePost(
    @Path() id: string,
    @Request() req: any,
  ): Promise<void> {
    await validateAuthorizationByPostId(id, req.user);
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
    @Request() req: any,
  ): Promise<SavedPost> {
    await validateAuthorizationByPostId(id, req.user);
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

  @Post(`{id}/comments`)
  @SuccessResponse('201, Created')
  public async createComment(
    @Path() id: string,
    @Body() params: CommentCreationParams,
    @Request() req: any,
  ): Promise<SavedPost> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.createComment(req.user, id, params),
    ).then(
      (post: SavedPost) => {
        this.setStatus(201);
        return post;
      },
      (err) => {
        throw err;
      },
    );
  }

  @Post(`{id}/reactions`)
  @SuccessResponse('201, Created')
  public async createReaction(
    @Path() id: string,
    @Request() req: any,
  ): Promise<void> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.createReaction(req.user, id),
    ).then(
      () => {
        this.setStatus(201);
      },
      (err) => {
        throw err;
      },
    );
  }
}
