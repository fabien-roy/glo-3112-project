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
    return Posts.find({}).sort({ createdAt: 'desc' });
  }

  public async getPost(id: string): Promise<SavedPost> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError('ID is invalid');
    }

    const post = await Posts.findOne({ _id: id });

    if (post) {
      return post;
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

  public async deletePost(id: string): Promise<void> {
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

    return Posts.find({ user: username }).sort({ createdAt: 'desc' });
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