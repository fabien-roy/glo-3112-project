import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostList from './PostList';
import PostCard from './PostCard';

const posts = PostFactory.make(3);

describe('When rendering PostList', () => {
  it('Should contain a post card for each post', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostList posts={posts} />));
    console.log(wrapper);
    posts.forEach((post) => {
      expect(wrapper.contains(<PostCard post={post} />)).toBeTruthy();
    });
  });

  it('Should render PostList', () => {
    render(wrapInMemoryRouter(<PostList posts={posts} />));
  });
});
