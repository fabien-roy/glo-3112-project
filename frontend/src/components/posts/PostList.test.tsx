import React from 'react';
import { render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostList from './PostList';

const posts = PostFactory.make(3);

describe('When rendering PostList', () => {
  it('Should render PostList', () => {
    render(wrapInMemoryRouter(<PostList posts={posts} />));
  });
});
