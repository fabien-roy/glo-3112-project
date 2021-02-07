import assert from 'assert';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import { SavedPost, PostCreationRequest } from '../types/posts';
import { InvalidUserError } from '../types/errors';

export class PostsRepository {
  public async createPost(
    username: string,
    requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    if (!(await Users.exists({ username }))) {
      throw new InvalidUserError(`User ${username} doesn't exist`);
    }

    const doc = await Posts.create({
      reference: requestBody.reference,
      description: requestBody.description,
      tags: requestBody.tags,
      user: username,
    });

    assert(doc instanceof Posts);

    return {
      id: doc.id,
      reference: doc.reference,
      description: doc.description,
      tags: doc.tags,
      user: doc.user,
      createdAt: doc.createdAt,
    };
  }
}
