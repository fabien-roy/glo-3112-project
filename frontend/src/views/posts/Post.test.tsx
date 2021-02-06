import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import useMemoryRouter from '../../hooks/useMemoryRouter';
import Post from './Post';

const postId = 'postId';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

it('renders Post', () => {
  render(useMemoryRouter(<Post />));
});

it('displays postId', () => {
  const wrapper = render(useMemoryRouter(<Post />));

  expect(wrapper.text()).to.contain(postId);
});
