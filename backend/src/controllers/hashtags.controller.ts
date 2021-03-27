import { Controller, Request, Get, Route, SuccessResponse, Query } from 'tsoa';

import { Hashtag } from '../types/hashtags';
import { PostsRepository } from '../repositories/posts.repository';
import { validateAuthentication } from './authorization';

@Route('hashtags')
export class HashtagsController extends Controller {
  private postsRepository: PostsRepository = new PostsRepository();

  @Get()
  @SuccessResponse('200, OK')
  public async getHashtags(
    @Request() req: any,
    @Query() like = '',
    @Query() limit = 21,
    @Query() greaterThan = '',
    @Query() orderBy = 'name',
  ): Promise<Hashtag[]> {
    validateAuthentication(req.user);
    return Promise.resolve(
      this.postsRepository.getHashtags(like, limit, greaterThan, orderBy),
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
