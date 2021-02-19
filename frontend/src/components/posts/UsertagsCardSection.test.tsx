import React from 'react';
import { mount } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import UsertagsCardSection from './UsertagsCardSection';

const usertags = ['firstusertag', 'secondusertag'];

describe('When rendering HastagsCardSection', () => {
  it('Should show a valid CardActions tag with buttons when valid params are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<UsertagsCardSection usertags={usertags} />)
    );
    usertags.forEach((usertag) => {
      expect(wrapper.contains(usertag)).toBeTruthy();
    });
  });

  it('Should show noting when undefined props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<UsertagsCardSection usertags={undefined} />)
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('Should show noting when an empty array is passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<UsertagsCardSection usertags={[]} />)
    );
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
