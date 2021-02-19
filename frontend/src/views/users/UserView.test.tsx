import React from 'react';
import { render, mount } from 'enzyme';
import { expect } from 'chai';
import useGetUser from 'hooks/useGetUser';
import useGetUserPosts from 'hooks/useGetUserPosts';
import { UserHeader } from 'components/users/userHeader/UserHeader';
import UserView from './UserView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import { PostFactory } from '../../factories/PostFactory';
import { UserFactory } from '../../factories/UserFactory';

const username = 'username';
const user = UserFactory.make();
const post = PostFactory.make();

const userResponse = {
  user,
  error: null,
  isLoading: false,
};

const userPostsResponse = {
  posts: [post],
  error: null,
  isLoading: false,
};

jest.mock('hooks/useGetUser');
jest.mock('hooks/useGetUserPosts');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ username }),
}));

describe('When rendering UserView', () => {
  beforeEach(() => {
    useGetUser.mockReturnValue(userResponse);
    useGetUserPosts.mockReturnValue(userPostsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(wrapInMemoryRouter(<UserView />));
  });

  it('Should display UserHeader', () => {
    const wrapper = mount(wrapInMemoryRouter(<UserView username={username} />));
    const componentExists = wrapper.containsMatchingElement(
      <UserHeader
        username={user.username}
        stats={{ totalPost: userPostsResponse.posts.length }}
        fullname={`${user.firstName} ${user.lastName}`}
        description={user.description}
        avatarSrc={user.avatarReference}
      />
    );
    expect(componentExists).to.be.equal(true);
  });
});
