import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import HashtagsCardSection from './HashtagsCardSection';

const hashtags = ['firsttag', 'secondtag'];

describe('When rendering HastagsCardSection', () => {
  it('Should show a valid CardActions tag with buttons when valid params are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<HashtagsCardSection hashtags={hashtags} />)
    );
    hashtags.forEach((hashtag) => {
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
