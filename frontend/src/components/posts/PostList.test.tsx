import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostList from './PostList';
import PostCard from './PostCard';

const posts = PostFactory.make(3);

describe('When rendering PostList', () => {
  it('Should contain a post card for each post', () => {
    const wrapper = shallow(<PostList posts={posts} />);

    posts.forEach((post) => {
      expect(wrapper.containsMatchingElement(<PostCard post={post} />)).toEqual(
        true
      );
    });
  });

  it('Should render PostList', () => {
    render(wrapInMemoryRouter(<PostList posts={posts} />));
  });
});
