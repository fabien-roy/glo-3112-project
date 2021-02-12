import { FilterQuery } from 'mongoose';
import { UserFactory } from '../util/users.factory';
import { PostCreationRequestFactory, PostFactory } from '../util/posts.factory';
import { PostsRepository } from './posts.repository';
import { Users } from '../models/users.model';
import { Posts } from '../models/posts.model';
import { InvalidEntityError } from '../types/errors';

const fakeUser = UserFactory.make();
const fakePost = PostFactory.make();
const fakePostCreationRequest = PostCreationRequestFactory.make();

jest
  .spyOn(Users, 'exists')
  .mockImplementation((filter: FilterQuery<any>) =>
    Promise.resolve(filter.username === fakeUser.username),
  );

jest
  .spyOn(Posts, 'create')
  .mockImplementation((creationRequest: any) =>
    creationRequest.reference === fakePostCreationRequest.reference &&
    creationRequest.description === fakePostCreationRequest.description &&
    creationRequest.tags === fakePostCreationRequest.tags &&
    creationRequest.user === fakeUser.username
      ? Promise.resolve(fakePost)
      : Promise.reject(),
  );

const postsRepository = new PostsRepository();

describe('When creating post', () => {
  it('Should create post with repository', async () => {
    const post = await postsRepository.createPost(
      fakeUser.username,
      fakePostCreationRequest,
    );

    expect(post).toBe(fakePost);
  });
});

describe('Given invalid username', () => {
  describe('When creating post', () => {
    it('Should throw invalid user error', async () => {
      const invalidUsername = 'invalidUsername';

      const action = () =>
        postsRepository.createPost(invalidUsername, fakePostCreationRequest);

      await expect(action).rejects.toThrow(InvalidEntityError);
    });
  });
});
