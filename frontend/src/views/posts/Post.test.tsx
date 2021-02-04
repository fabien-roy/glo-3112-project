import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';
import { expect } from 'chai';
import Post from './Post';

const postId = 'postId';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: () => ({ postId }),
}));

it('renders Post', () => {
  render(
    <MemoryRouter>
      <Post />
    </MemoryRouter>
  );
});

it('displays postId', () => {
  const wrapper = render(
    <MemoryRouter>
      <Post />
    </MemoryRouter>
  );

  expect(wrapper.text()).to.contain(postId);
});
