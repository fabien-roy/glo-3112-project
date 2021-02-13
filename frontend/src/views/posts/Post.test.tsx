import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import { wrapInMemoryRouter } from '../../util/wrapInMemoryRouter';
import Post from './Post';

const postId = 'postId';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

describe('When rendering Post', () => {
  it('Should render', () => {
    render(wrapInMemoryRouter(<Post />));
  });

  it('Should display postId', () => {
    const wrapper = render(wrapInMemoryRouter(<Post />));

    expect(wrapper.text()).to.contain(postId);
  });
});
