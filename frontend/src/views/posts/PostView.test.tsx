import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';
import useGetPost from 'hooks/useGetPost';
import PostCard from 'components/posts/PostCard';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import PostView from './PostView';

const postId = 'postId';

const somePost = {
  id: 'asdaSDasd',
  reference: 'https://picsum.photos/500',
  description: 'a description',
  tags: ['firsttag', 'secondtag'],
  user: 'testuser',
  createdAt: Date.now(),
};

const userResponse = {
  post: somePost,
  isLoading: false,
  error: null,
};

jest.mock('../../hooks/useGetPost');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

describe('When rendering Post', () => {
  beforeEach(() => {
    useGetPost.mockReturnValue(userResponse);
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
        tags={somePost.tags}
        user={somePost.user}
      />
    );
    expect(componentExists).to.be.equal(true);
  });
});
