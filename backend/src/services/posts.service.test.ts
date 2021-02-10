import { UserFactory } from '../util/users.factory';
import { PostCreationRequestFactory, PostFactory } from '../util/posts.factory';
import { PostCreationRequest } from '../types/posts';
import { PostsService } from './posts.service';

const fakeUser = UserFactory.make();
const fakePost = PostFactory.make();
const fakePostCreationRequest = PostCreationRequestFactory.make();

jest.mock('../repositories/posts.repository', () => ({
  PostsRepository: class {
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

const postsService = new PostsService();

describe('When creating post', () => {
  it('Should creation post with repository', async () => {
    const post = await postsService.createPost(
      fakeUser.username,
      fakePostCreationRequest,
    );

    expect(post).toBe(fakePost);
  });
});
