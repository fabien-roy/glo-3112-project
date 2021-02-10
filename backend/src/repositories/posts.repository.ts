import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import { SavedPost, PostCreationRequest } from '../types/posts';
import { InvalidUserError } from '../types/errors';

// TODO : Test this somehow
export class PostsRepository {
  public async createPost(
    username: string,
    requestBody: PostCreationRequest,
  ): Promise<SavedPost> {
    if (!(await Users.exists({ username }))) {
      throw new InvalidUserError(`User ${username} doesn't exist`);
    }

    return Posts.create({
      reference: requestBody.reference,
      description: requestBody.description,
      tags: requestBody.tags,
      user: username,
    });
  }
}
