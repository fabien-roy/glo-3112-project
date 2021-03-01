import mongoose from 'mongoose';
import _ from 'lodash';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import {
  PostCreationParams,
  PostModificationParams,
  SavedPost,
} from '../types/posts';
import { BadRequestError, NotFoundEntityError } from '../types/errors';

export class PostsRepository {
  public async getPosts(): Promise<SavedPost[]> {
    const posts = await Posts.find({}).sort({ createdAt: 'desc' });
    const users = await Users.find();

    return posts.map((post) => {
      const postJson = post.toJSON();
      postJson.userAvatar = users.find(
        (user) => user.username === post.user,
      )?.avatarReference;
      return postJson;
    });
  }

  public async getPost(id: string): Promise<SavedPost> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('ID is invalid');
    }

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

    return Posts.create({
      reference: params.reference,
      description: params.description,
      hashtags: params.hashtags,
      usertags: params.usertags,
      user: username,
    });
  }

  public async updatePost(
    id: string,
    params: PostModificationParams,
  ): Promise<SavedPost> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('ID is invalid');
    }

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
      return updatedPost;
    }

    throw new NotFoundEntityError(`Post ${id} doesn't exist`);
  }

  public async deletePost(id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('ID is invalid');
    }

    if (!(await Posts.exists({ _id: id }))) {
      throw new NotFoundEntityError(`Post ${id} doesn't exist`);
    }

    return Posts.deleteOne({ _id: id }).exec();
  }

  public async getUsersPosts(username: string): Promise<SavedPost[]> {
    if (!(await Users.exists({ username }))) {
      throw new NotFoundEntityError(`User ${username} doesn't exist`);
    }

    const user = await Users.findOne({ username });
    const posts = await Posts.find({ user: username }).sort({
      createdAt: 'desc',
    });

    return posts.map((post) => {
      const postJson = post.toJSON();
      postJson.userAvatar = user?.avatarReference;
      return postJson;
    });
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
}
