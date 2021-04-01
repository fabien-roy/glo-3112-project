import _ from 'lodash';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import {
  CommentCreationParams,
  PostCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import { BadRequestError, NotFoundEntityError } from '../types/errors';
import { Hashtag } from '../types/hashtags';
import { NotificationsRepository } from './notifications.repository';
import { PagedResults } from '../types/paged.results';

export class PostsRepository {
  private notificationsRepository = new NotificationsRepository();

  public async getPosts(
    description: string,
    hashtag: string,
    limit: number,
    before: Date | null,
    after: Date | null,
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

    const timeQuery: any = {};
    let sort = 'desc';
    if (before) {
      timeQuery['createdAt'] = { $lt: before };
      sort = 'asc';
    } else if (after) {
      timeQuery['createdAt'] = { $gt: after };
    }

    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...timeQuery })
      .sort({ createdAt: sort })
      .limit(limit);
    const users = await Users.find();

    if (sort == 'asc') {
      posts.reverse();
    }

    return {
      results: posts.map((post) => {
        const postJson = post.toJSON();
        postJson.userAvatar = users.find(
          (user) => user.username === post.user,
        )?.avatarReference;
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

  public async getPost(id: string): Promise<SavedPost> {
    const post = await Posts.findOne({ _id: id });

    if (post) {
      const postJson = post.toJSON();
      const user = await Users.findOne({ username: post.user }).exec();
      if (user && user.avatarReference) {
        postJson.userAvatar = user.avatarReference;
      }
      return postJson;
    }

    throw new NotFoundEntityError(`Post ${id} doesn't exist`);
  }

  public async createPost(
    username: string,
    params: PostCreationParams,
  ): Promise<SavedPost> {
    await this.validateUserExistence(username);
    await this.validateUsersExistence(params.usertags);

    return (
      await Posts.create({
        reference: params.reference,
        description: params.description,
        hashtags: params.hashtags,
        usertags: params.usertags,
        user: username,
      })
    ).toJSON();
  }

  public async updatePost(
    id: string,
    params: PostModificationParams,
  ): Promise<SavedPost> {
    if (params.usertags) {
      await this.validateUsersExistence(params.usertags);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      {
        $set: _.pick(params, ['description', 'hashtags', 'usertags']),
      },
      { new: true, runValidators: true },
    ).exec();

    if (updatedPost) {
      const postJson = updatedPost.toJSON();
      const user = await Users.findOne({ username: updatedPost.user }).exec();
      if (user && user.avatarReference) {
        postJson.userAvatar = user.avatarReference;
      }
      return postJson;
    }

    throw new NotFoundEntityError(`Post ${id} doesn't exist`);
  }

  public async deletePost(id: string): Promise<void> {
    if (!(await Posts.exists({ _id: id }))) {
      throw new NotFoundEntityError(`Post ${id} doesn't exist`);
    }

    Posts.deleteOne({ _id: id }).exec();
  }

  public async deleteUsersPosts(username: string): Promise<any> {
    await this.validateUserExistence(username);

    return Posts.deleteMany({ user: username });
  }

  public async deleteUsersTags(username: string): Promise<any> {
    await this.validateUserExistence(username);

    return Posts.updateMany(
      { usertags: username },
      {
        $pullAll: {
          usertags: [username],
        },
      },
    );
  }

  public async getUsersPosts(
    username: string,
    limit: number,
    before: Date | null,
    after: Date | null,
  ): Promise<PagedResults<SavedPost>> {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }

    const matchQuery: any = { user: username };
    const timeQuery: any = {};
    let sort = 'desc';
    if (before) {
      timeQuery['createdAt'] = { $lt: before };
      sort = 'asc';
    } else if (after) {
      timeQuery['createdAt'] = { $gt: after };
    }

    const user = await Users.findOne({ username });
    const count = await Posts.count(matchQuery);
    const posts = await Posts.find({ ...matchQuery, ...timeQuery }).sort({
      createdAt: sort,
    });

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
    after: string,
    orderBy: string,
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

    return topHashtags.map((hashtag: any) => {
      hashtag.name = hashtag._id;
      return _.pick(hashtag, ['name', 'count']);
    });
  }

  public async createComment(
    username: string,
    id: string,
    params: CommentCreationParams,
  ): Promise<void> {
    const post = await Posts.findByIdAndUpdate(id, {
      $push: {
        comments: {
          user: username,
          text: params.text,
        },
      },
    }).exec();
    if (!post) {
      throw new NotFoundEntityError(`Post ${id} doesn't exist`);
    }
    await this.notificationsRepository.createNotification(
      post.user,
      'comment',
      username,
      id,
    );
  }

  public async createReaction(username: string, id: string): Promise<void> {
    const post = await Posts.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          { reactions: { $not: { $elemMatch: { user: username } } } },
        ],
      },
      {
        $push: {
          reactions: {
            user: username,
          },
        },
      },
    ).exec();
    if (!post) {
      throw new BadRequestError('Could not react to post');
    }
    await this.notificationsRepository.createNotification(
      post.user,
      'reaction',
      username,
      id,
    );
  }
}
