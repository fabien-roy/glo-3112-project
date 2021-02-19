import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';
import PostCard from 'components/posts/PostCard';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import useGetPost from 'hooks/posts/useGetPost';
import PostView from './PostView';

const postId = 'postId';

const somePost = {
  id: 'asdaSDasd',
  reference: 'https://picsum.photos/500',
  description: 'a description',
  hashtags: ['firsttag', 'secondtag'],
  usertags: ['firstusertag', 'secondusertag'],
  user: 'testuser',
  createdAt: Date.now(),
};

const userResponse = {
  post: somePost,
  isLoading: false,
  error: null,
};

jest.mock('hooks/posts/useGetPost');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

describe('When rendering Post', () => {
  beforeEach(() => {
    useGetPost.mockReturnValue({ userResponse });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render', () => {
    render(wrapInMemoryRouter(<PostView postId={postId} />));
  });

  it('Should display a post', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostView postId={postId} />));

    const componentExists = wrapper.containsMatchingElement(
      <PostCard
        id={somePost.id}
        description={somePost.description}
        reference={somePost.reference}
        hashtags={somePost.hashtags}
        usertags={somePost.usertags}
        user={somePost.user}
      />
    );
    expect(componentExists).to.be.equal(true);
  });
});
