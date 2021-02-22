import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostCard from './PostCard';
import PostList from './PostList';

const posts = PostFactory.make(3);

describe('When rendering PostList', () => {
  it('Should contain a post card for each post', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostList posts={posts} />));

    posts.forEach((post) => {
      expect(
        wrapper.contains(
          <PostCard
            id={post._id}
            reference={post.reference}
            description={post.description}
            hashtags={post.hashtags}
            usertags={post.usertags}
            user={post.user}
            createdAt={post.createdAt}
          />
        )
      ).toBeTruthy();
    });
  });

  it('Should render PostList', () => {
    render(wrapInMemoryRouter(<PostList posts={posts} />));
  });
});
