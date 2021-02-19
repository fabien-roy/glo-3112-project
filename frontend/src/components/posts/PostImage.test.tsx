import React from 'react';
import { mount, render } from 'enzyme';
import { wrapInMemoryRouter } from 'util/wrapInMemoryRouter';
import PostCard from './PostCard';
import PostImage from './PostImage';

describe('When rendering PostImage', () => {
  it('Should show a valid image, assuming the link works', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<PostImage reference="https://picsum.photos/500" />)
    );

    expect(wrapper.find('.MuiCardMedia-root')).toHaveLength(1);
  });

  it('Should show nothing when undefined props are passed', () => {
    const wrapper = mount(
      wrapInMemoryRouter(<PostCard reference={undefined} />)
    );
    expect(wrapper.find('.MuiCardMedia-root')).toHaveLength(0);
  });

  it('Should render PostImage', () => {
    render(<PostImage reference={undefined} />);
  });
});
