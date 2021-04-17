import { PagedResults } from '../types/paged.results';
import {
  CommentCreationParams,
  PostCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import { User } from '../types/users';
import { Hashtag } from '../types/hashtags';

export interface PostsRepository {
  getPosts(
    description: string,
    hashtag: string,
    limit: number,
    before: Date | null = null,
    after: Date | null = null,
  ): Promise<PagedResults<SavedPost>> {
    const matchQuery: any = {};
    if (description) {
      matchQuery['description'] = { $regex: new RegExp(description, 'i') };
    }
    if (hashtag) {
      matchQuery['hashtags'] = {
        $elemMatch: { $regex: new RegExp(hashtag, 'i') },
      };
    }

    const pageQuery: any = {};
    let sort = 'desc';
    if (before) {
      pageQuery['createdAt'] = { $lt: before };
    } else if (after) {
      pageQuery['createdAt'] = { $gt: after };
      sort = 'asc';
    }

    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...pageQuery })
      .sort({ createdAt: sort })
      .limit(limit);
    const users = await Users.find();

  getPost(id: string): Promise<SavedPost>;

  createPost(username: string, params: PostCreationParams): Promise<SavedPost>;

  updatePost(id: string, params: PostModificationParams): Promise<SavedPost>;

  deletePost(id: string): Promise<void>;

  getUsersPosts(
    username: string,
    limit: number,
    before: Date | null,
    after: Date | null,
  ): Promise<PagedResults<SavedPost>> {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }

    const matchQuery: any = { user: username };
    const pageQuery: any = {};
    let sort = 'desc';
    if (before) {
      pageQuery['createdAt'] = { $lt: before };
    } else if (after) {
      pageQuery['createdAt'] = { $gt: after };
      sort = 'asc';
    }

    const user = await Users.findOne({ username });
    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...pageQuery })
      .sort({
        createdAt: sort,
      })
      .limit(limit);

    if (sort == 'asc') {
      posts.reverse();
    }

    return {
      results: posts.map((post) => {
        const postJson = post.toJSON();
        postJson.userAvatar = user?.avatarReference;
        delete postJson.comments;
        return postJson;
      }),
      firstKey: posts.length > 0 ? posts[0].createdAt.toISOString() : null,
      lastKey:
        posts.length > 0
          ? posts[posts.length - 1].createdAt.toISOString()
          : null,
      count,
    };
  }

  private async validateUsersExistence(usernames: string[]) {
    for (const username of usernames) {
      await this.validateUserExistence(username);
    }
  }

  private async validateUserExistence(username: string) {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }
  }

  public async getHashtags(
    like: string,
    limit: number,
    after = '',
    orderBy = 'name',
  ): Promise<Hashtag[]> {
    const sortBy = orderBy === 'name' ? '_id' : orderBy;
    const sortValue = orderBy === 'name' ? 1 : -1;

    const topHashtags = await Posts.aggregate([
      { $project: { hashtags: 1 } },
      { $unwind: '$hashtags' },
      {
        $group: {
          _id: '$hashtags',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          $and: [
            { _id: { $regex: new RegExp(like, 'i') } },
            { _id: { $gt: after } },
          ],
        },
      },
      { $sort: { [sortBy]: sortValue } },
      { $limit: limit },
    ]);

  getHashtags(like: string, limit: number, after: string): Promise<Hashtag[]>;

  createComment(
    user: User,
    postId: string,
    params: CommentCreationParams,
  ): Promise<void>;

  createReaction(user: User, postId: string): Promise<void>;
}