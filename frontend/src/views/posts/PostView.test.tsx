import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';
import useGetPost from 'hooks/useGetPost';
import PostCard from 'components/posts/PostCard';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import PostView from './PostView';
import { PostFactory } from 'factories/PostFactory';

const postId = 'postId';
const post = PostFactory.make();

const postResponse = {
  post,
  isLoading: false,
  error: null,
};

jest.mock('hooks/useGetPost');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

describe('When rendering Post', () => {
  beforeEach(() => {
    useGetPost.mockReturnValue(postResponse);
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
        id={post.id}
        description={post.description}
        reference={post.reference}
        hashtags={post.hashtags}
        usertags={post.usertags}
        user={post.user}
      />
    );

    expect(componentExists).to.be.equal(true);
  });
});
