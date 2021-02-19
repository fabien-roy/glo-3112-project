import React from 'react';
import { render, mount } from 'enzyme';
import { expect } from 'chai';
import useGetUser from 'hooks/users/useGetUser';
import useGetUserPosts from 'hooks/users/useGetUserPosts';
import { UserHeader } from 'components/users/header/UserHeader';
import UserView from './UserView';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';

jest.mock('hooks/users/useGetUser');
jest.mock('hooks/users/useGetUserPosts');

const username = 'username';

const currentUser = {
  username: 'username',
  email: 'username@test.ca',
  phoneNumber: '514-444-4444',
  firstName: 'FirstName',
  lastName: 'LastName',
  description: 'This is a description',
  avatarReference: 'reference',
};

const userResponse = {
  user: currentUser,
  error: null,
  isLoading: false,
};

const firstPost = {
  id: '1',
  reference: 'reference',
  description: 'This is a post description',
  tags: ['Tag'],
  user: 'username',
  createdAt: Date.now(),
};

const userPostsResponse = {
  posts: [firstPost],
  error: null,
  isLoading: false,
};

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
        username="username"
        stats={{ totalPost: 1 }}
        fullname="FirstName LastName"
        description="This is a description"
        avatarSrc="reference"
      />
    );
    expect(componentExists).to.be.equal(true);
  });
});
