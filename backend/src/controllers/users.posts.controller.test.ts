import { UserFactory } from '../util/users.factory';
import { PostCreationRequestFactory, PostFactory } from '../util/posts.factory';
import { PostCreationRequest } from '../types/posts';
import { UsersPostsController } from './users.posts.controller';

const fakeUser = UserFactory.make();
const fakePost = PostFactory.make();
const fakePostCreationRequest = PostCreationRequestFactory.make();

jest.mock('../services/posts.service', () => ({
  PostsService: class {
    public createPost(
      username: string,
      postCreationRequest: PostCreationRequest,
    ) {
      return username === fakeUser.username &&
        postCreationRequest === fakePostCreationRequest
        ? Promise.resolve(fakePost)
        : Promise.reject();
    }
  },
}));

const usersPostsController = new UsersPostsController();

describe('When creating post', () => {
  it('Should creation post with service', async () => {
    const post = await usersPostsController.createPost(
      fakeUser.username,
      fakePostCreationRequest,
    );

    expect(post).toBe(fakePost);
  });
});
