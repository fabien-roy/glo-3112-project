import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Post from './Post';

const postId = '1234';

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
