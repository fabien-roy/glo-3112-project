import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import { SavedPost, PostCreationRequest } from '../types/posts';
import { InvalidEntityError } from '../types/errors';

export class PostsRepository {
  public async getPosts(): Promise<SavedPost[]> {
    return Posts.find({}).sort({ createdAt: 'desc' });
  }

  public async createPost(
    username: string,
    requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    if (!(await Users.exists({ username }))) {
      throw new InvalidEntityError(`User ${username} doesn't exist`);
    }

    return Posts.create({
      reference: requestBody.reference,
      description: requestBody.description,
      tags: requestBody.tags,
      user: username,
    });
  }

  public async deletePost(id: string): Promise<void> {
    if (!(await Posts.exists({ _id: id }))) {
      throw new InvalidEntityError(`Post ${id} doesn't exist`);
    }

    return Posts.deleteOne({ _id: id }).exec();
  }

  public async getUsersPosts(username: string): Promise<SavedPost[]> {
    if (!(await Users.exists({ username }))) {
      throw new InvalidEntityError(`User ${username} doesn't exist`);
    }

    return Posts.find({ user: username }).sort({ createdAt: 'desc' });
  }
}
