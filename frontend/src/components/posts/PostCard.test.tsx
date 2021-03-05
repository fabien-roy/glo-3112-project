import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import PostCard from './PostCard';

const post = PostFactory.make();

describe('When rendering PostCard', () => {
  it('Should show a valid material card when valid props are passed', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostCard post={post} />));
    expect(wrapper.contains(post.description!)).toBeTruthy();
    expect(wrapper.contains(post.user)).toBeTruthy();
    expect(wrapper.contains('This post does not exist!')).toBeFalsy();
    expect(wrapper.contains('HTTP 404')).toBeFalsy();
  });

  it('Should show 404 and not an empty card when undefined props are passed', () => {
    const wrapper = mount(wrapInMemoryRouter(<PostCard post={undefined} />));

    expect(wrapper.contains(post.description!)).toBeFalsy();
    expect(wrapper.contains(post.user)).toBeFalsy();
    expect(wrapper.contains('This post does not exist!')).toBeTruthy();
    expect(wrapper.contains('HTTP 404')).toBeTruthy();
  });

  it('Should render PostCard', () => {
    render(wrapInMemoryRouter(<PostCard post={post} />));
  });
});
