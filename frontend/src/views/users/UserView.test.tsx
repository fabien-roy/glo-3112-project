jest.mock('../../hooks/useGetUser');
jest.mock('../../hooks/useGetUserPosts');

import React from 'react';
import { render, mount } from 'enzyme';
// import { act } from 'react-test-renderer';
import {act} from 'react-dom/test-utils';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import UserView from './UserView';
import useGetUser from 'hooks/useGetUser';
import useGetUserPosts from 'hooks/useGetUserPosts';
import { UserHeader } from 'components/users/userHeader/UserHeader';

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
}

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
}

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

    const wrapper = mount(wrapInMemoryRouter(<UserView username={username}/>));

    expect(
      wrapper.containsMatchingElement(
        <UserHeader
          username='username'
          stats={{totalPost: 1}}
          fullname='FirstName LastName'
          description='This is a description'
          avatarSrc='reference'
        />
      )
    ).to.be.true;
  });
});
