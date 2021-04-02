import { Controller, Request, Get, Route, SuccessResponse, Query } from 'tsoa';

import { Hashtag } from '../types/hashtags';
import { PostsRepository } from '../repositories/posts.repository';
import { validateAuthentication } from './authorization';

@Route('hashtags')
export class HashtagsController extends Controller {
  private postsRepository: PostsRepository = new PostsRepository();
  private readonly HASHTAGS_LIMIT = 21;

  @Get()
  @SuccessResponse('200, OK')
  public async getHashtags(
    @Request() req: any,
    @Query() like = '',
    @Query() limit = this.HASHTAGS_LIMIT,
    @Query() after = '',
    @Query() orderBy = 'name',
  ): Promise<Hashtag[]> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.getHashtags(like, limit, after, orderBy),
    ).then(
      (hashtags: Hashtag[]) => {
        this.setStatus(200);
        return hashtags;
      },
      (err) => {
        throw err;
      },
    );
  }
}
