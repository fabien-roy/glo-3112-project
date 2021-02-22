import React from 'react';
import { mount } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import { PostFactory } from 'factories/PostFactory';
import HashtagsCardSection from './HashtagsCardSection';

const post = PostFactory.make();

describe('When rendering HastagsCardSection', () => {
  it('Should show a valid CardActions tag with buttons when valid params are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<HashtagsCardSection hashtags={post.hashtags} />)
    );
    post.hashtags.forEach((hashtag) => {
      expect(wrapper.contains(hashtag)).toBeTruthy();
    });
  });

  it('Should show noting when undefined props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<HashtagsCardSection hashtags={undefined} />)
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('Should show noting when an empty array is passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<HashtagsCardSection hashtags={[]} />)
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
