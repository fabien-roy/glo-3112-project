import React from 'react';
import { render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';

import { PostFactory } from 'factories/PostFactory';
import { UserFactory } from 'factories/UserFactory';
import useGetUsers from 'hooks/users/useGetUsers';
import useGetPosts from 'hooks/posts/useGetPosts';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';
import SearchView from './SearchView';

const users = UserFactory.make(3);
const posts = PostFactory.make(4);
// TODO : HashtagFactory would be nice.
const hashtags = [
  { name: 'peace', count: 150 },
  { name: 'love', count: 300 },
];

const usersResponse = {
  users: {
    results: users,
    firstKey: users[0].username,
    lastKey: users[users.length - 1].username,
    count: users.length,
  },
  error: null,
  isLoading: false,
};

const postsResponse = {
  posts: {
    results: posts,
    firstKey: posts[0].createdAt.toISOString(),
    lastKey: posts[posts.length - 1].createdAt.toISOString(),
    count: posts.length,
  },
  error: null,
  isLoading: false,
};

const hashtagsResponse = {
  hashtags,
  error: null,
  isLoading: false,
};

jest.mock('hooks/users/useGetUsers');
jest.mock('hooks/posts/useGetPosts');
jest.mock('hooks/hashtags/useGetHashtags');

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  const randomElement =
    '<Box><Box><Box id="content">{element}</div><div id="target" data-target-tag-name={target.tagName}></Box></Box></Box>';

  return {
    ...original,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPortal: (node: any) => randomElement,
  };
});

describe('When rendering SearchView', () => {
  beforeEach(() => {
    useGetUsers.mockReturnValue(usersResponse);
    useGetPosts.mockReturnValue(postsResponse);
    useGetHashtags.mockReturnValue(hashtagsResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(wrapInMemoryRouter(<SearchView />));
  });
});
